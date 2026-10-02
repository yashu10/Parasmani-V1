"use client";

import { useEffect, useRef, useState } from "react";

export function FilmButton() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const opener = openerRef.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="btn pointer-events-auto absolute bottom-0 left-0 z-[1] min-h-[52px] gap-3 border-0 bg-brand px-[22px] py-4 text-[11px] tracking-[0.08em] text-white hover:!bg-hl"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="6,4 20,12 6,20" />
        </svg>
        PLAY PLANT FILM
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Plant film"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          className="fixed inset-0 z-[210] flex items-center justify-center p-[clamp(16px,4vw,48px)]"
          style={{ background: "rgba(var(--bg3-rgb),0.95)" }}
        >
          <div className="w-full max-w-[1100px]">
            <div className="flex items-center justify-between gap-4 pb-4">
              <span className="text-[11px] font-semibold tracking-[0.14em] text-ink">PEPL PLANT FILM</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="btn btn-outline h-12 w-12 justify-center p-0"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>
            <div className="relative flex aspect-video items-center justify-center border-2 border-ink bg-bg3">
              <div className="p-[clamp(20px,4vw,48px)] text-left">
                <div className="text-[clamp(18px,2.6vw,28px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">PLANT FILM — TO BE CONFIRMED</div>
                <p className="mb-0 mt-3 max-w-[46ch] text-[14px] leading-[1.55] text-mute">
                  Drop the final plant film into this frame. Placeholder — no video asset has been supplied.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
