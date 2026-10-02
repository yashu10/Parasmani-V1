"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { ALLOWED_EXT, MAX_FILE_BYTES, rfqSchema, type RfqState } from "@/lib/rfq";

// Best-effort in-memory limiter (per server instance). Use Upstash/Vercel KV for hard limits.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

const LABELS: Record<string, string> = {
  name: "Name",
  company: "Company",
  designation: "Designation",
  email: "Email",
  mobile: "Mobile",
  location: "Project location",
  tonnage: "Required tonnage",
  grade: "Material grade",
  delivery: "Expected delivery",
  inspection: "Inspection agency",
  scope: "Scope of work",
};

export async function submitRfq(_prev: RfqState, formData: FormData): Promise<RfqState> {
  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (String(formData.get("website") ?? "").trim() !== "") return { status: "ok" };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) {
    return { status: "error", message: "Too many requests. Please try again in a few minutes." };
  }

  const raw = Object.fromEntries(Object.keys(LABELS).map((k) => [k, String(formData.get(k) ?? "")]));
  const parsed = rfqSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0]);
      if (!errors[k]) errors[k] = issue.message;
    }
    return { status: "error", errors, message: "Please check the highlighted fields and try again." };
  }
  const data = parsed.data;

  const attachments: { filename: string; content: Buffer }[] = [];
  const file = formData.get("drawing");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXT.includes(ext)) {
      return { status: "error", errors: { drawing: "Upload a PDF, DWG, XLS, XLSX or ZIP file." } };
    }
    if (file.size > MAX_FILE_BYTES) {
      return { status: "error", errors: { drawing: "File is too large (max 4 MB). Email larger files to us directly." } };
    }
    attachments.push({ filename: file.name.replace(/[^\w.\- ]/g, "_"), content: Buffer.from(await file.arrayBuffer()) });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RFQ_TO_EMAIL;
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[RFQ — email not configured, logging only]", data);
      return { status: "ok" };
    }
    console.error("RFQ received but RESEND_API_KEY / RFQ_TO_EMAIL are not set.");
    return { status: "error", message: "We could not send your request right now. Please email or call us directly." };
  }

  const text = Object.entries(LABELS)
    .map(([k, label]) => `${label}: ${(data as Record<string, string>)[k] || "-"}`)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RFQ_FROM_EMAIL || "PEPL Website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: data.email,
      subject: `RFQ — ${data.company} (${data.name})`,
      text,
      attachments,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("RFQ send failed", e);
    return { status: "error", message: "We could not send your request right now. Please email or call us directly." };
  }
  return { status: "ok" };
}
