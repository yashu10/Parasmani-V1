import { z } from "zod";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_FILE_BYTES = 4 * 1024 * 1024; // Vercel request bodies are capped at ~4.5 MB
export const ALLOWED_EXT = ["pdf", "dwg", "xls", "xlsx", "zip"];

const req = "This field is required.";
const opt = z.string().trim().max(300).optional().default("");

export const rfqSchema = z.object({
  name: z.string().trim().min(1, req).max(200),
  company: z.string().trim().min(1, req).max(200),
  designation: opt,
  email: z.string().trim().min(1, req).regex(EMAIL_RE, "Enter a valid email address.").max(200),
  mobile: z
    .string()
    .trim()
    .min(1, req)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a valid mobile number.")
    .refine((v) => v.length <= 30, "Enter a valid mobile number."),
  location: opt,
  tonnage: opt,
  grade: opt,
  delivery: opt,
  inspection: opt,
  scope: z.string().trim().min(1, "Scope of work is required.").max(5000),
});

export type RfqState = {
  status: "idle" | "ok" | "error";
  errors?: Record<string, string>;
  message?: string;
};
