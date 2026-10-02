"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitRfq } from "@/app/contact/actions";
import { ALLOWED_EXT, EMAIL_RE, MAX_FILE_BYTES, type RfqState } from "@/lib/rfq";

const FIELDS = [
  ["name", "NAME *", "text", "Full name", true, "name"],
  ["company", "COMPANY *", "text", "Organisation", true, "organization"],
  ["designation", "DESIGNATION", "text", "e.g. Manager — Procurement", false, "organization-title"],
  ["email", "EMAIL *", "email", "name@company.com", true, "email"],
  ["mobile", "MOBILE *", "tel", "+91", true, "tel"],
  ["location", "PROJECT LOCATION", "text", "City, State", false, "off"],
  ["tonnage", "REQUIRED TONNAGE", "number", "e.g. 900", false, "off"],
  ["grade", "MATERIAL GRADE", "text", "e.g. IS 2062 E250 BR", false, "off"],
  ["delivery", "EXPECTED DELIVERY", "date", "", false, "off"],
  ["inspection", "INSPECTION AGENCY", "text", "TPI agency, if any", false, "off"],
] as const;

function validate(k: string, val: string): string {
  const v = val.trim();
  if (k === "scope") return v ? "" : "Scope of work is required.";
  if (!v) return "This field is required.";
  if (k === "email" && !EMAIL_RE.test(v)) return "Enter a valid email address.";
  if (k === "mobile" && v.replace(/\D/g, "").length < 10) return "Enter a valid mobile number.";
  return "";
}

const REQUIRED = ["name", "company", "email", "mobile", "scope"];
const initial: RfqState = { status: "idle" };

export function RfqForm() {
  const [state, action, pending] = useActionState(submitRfq, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const [vals, setVals] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (state.status === "ok") {
      formRef.current?.reset();
      setVals({});
      setTouched(false);
      setFileName("");
    }
  }, [state]);

  const errorFor = (k: string) => {
    if (touched && REQUIRED.includes(k)) {
      const e = validate(k, vals[k] ?? "");
      if (e) return e;
    }
    return state.errors?.[k] ?? "";
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setTouched(true);
    const bad = REQUIRED.some((k) => validate(k, vals[k] ?? "")) || !!fileError;
    if (bad) e.preventDefault();
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setFileError("");
    setFileName(f?.name ?? "");
    if (!f) return;
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXT.includes(ext)) setFileError("Upload a PDF, DWG, XLS, XLSX or ZIP file.");
    else if (f.size > MAX_FILE_BYTES) setFileError("File is too large (max 4 MB). Email larger files to us directly.");
  };

  const anyInvalid = touched && REQUIRED.some((k) => validate(k, vals[k] ?? ""));
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVals((v) => ({ ...v, [k]: e.target.value }));

  return (
    <form ref={formRef} action={action} onSubmit={onSubmit} noValidate aria-label="Request for quote">
      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        {FIELDS.map(([id, label, type, placeholder, required, ac]) => {
          const err = errorFor(id);
          return (
            <div key={id} className="min-w-0">
              <label htmlFor={`rfq-${id}`} className="field-label">
                {label}
              </label>
              <input
                id={`rfq-${id}`}
                name={id}
                type={type}
                placeholder={placeholder}
                autoComplete={ac}
                inputMode={id === "tonnage" ? "decimal" : undefined}
                aria-required={required}
                aria-invalid={err ? "true" : "false"}
                aria-describedby={err ? `rfq-${id}-err` : undefined}
                value={vals[id] ?? ""}
                onChange={set(id)}
                className="field"
              />
              {err && (
                <span id={`rfq-${id}-err`} className="field-error">
                  {err}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <label htmlFor="rfq-scope" className="field-label">
          SCOPE OF WORK *
        </label>
        <textarea
          id="rfq-scope"
          name="scope"
          rows={4}
          placeholder="Fabrication only / fabrication + surface treatment / supply + erection…"
          aria-required="true"
          aria-invalid={errorFor("scope") ? "true" : "false"}
          aria-describedby={errorFor("scope") ? "rfq-scope-err" : undefined}
          value={vals.scope ?? ""}
          onChange={set("scope")}
          className="field resize-y"
        />
        {errorFor("scope") && (
          <span id="rfq-scope-err" className="field-error">
            {errorFor("scope")}
          </span>
        )}
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 border-2 border-dashed border-ink/30 px-[clamp(16px,2.5vw,28px)] py-[clamp(28px,4vw,44px)]">
        <div className="text-[15px] font-bold tracking-[-0.015em]">DRAWING / BOQ</div>
        <p className="mb-[18px] mt-2 text-[13px] leading-[1.5] text-mute">PDF, DWG, XLS, XLSX or ZIP · max 4 MB</p>
        <label className="btn btn-outline min-h-[52px] cursor-pointer px-[22px] py-4 text-[11px] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-acc">
          CHOOSE FILE
          <input type="file" name="drawing" accept=".pdf,.dwg,.xls,.xlsx,.zip" onChange={onFile} className="sr-only" aria-describedby="rfq-drawing-err" />
        </label>
        {fileName && <div className="mt-[14px] text-[12px] font-semibold text-mute">{fileName}</div>}
        {(fileError || state.errors?.drawing) && (
          <span id="rfq-drawing-err" className="field-error">
            {fileError || state.errors?.drawing}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary mt-6 min-h-[60px] w-full px-[26px] py-5 text-[13px] disabled:opacity-60"
      >
        {pending ? "SENDING…" : "SUBMIT RFQ"}
      </button>

      <div aria-live="polite">
        {(anyInvalid || state.status === "error") && (
          <div role="alert" className="mt-[18px] border-2 border-acc px-5 py-4 text-[13px] font-semibold text-acc">
            {state.status === "error" && state.message && !anyInvalid ? state.message : "Please check the highlighted fields and try again."}
          </div>
        )}
        {state.status === "ok" && (
          <div role="status" className="mt-[18px] border-2 border-ink bg-bg2 px-5 py-4 text-[13px] font-semibold">
            Thank you. Your RFQ has been received. Our team will review the submitted information.
          </div>
        )}
      </div>
    </form>
  );
}
