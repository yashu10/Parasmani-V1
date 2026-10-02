"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, ABOUT_SUB, SITE } from "@/lib/site";

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const inAbout = ABOUT_SUB.some((s) => s.href === pathname);
  const [aboutOpen, setAboutOpen] = useState<boolean | undefined>(undefined);
  const aboutShown = aboutOpen ?? inAbout;

  useEffect(() => {
    setOpen(false);
    setAboutOpen(undefined);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="btn btn-outline h-12 w-12 justify-center border-ink p-0"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-bg">
          <div className="px-gut flex h-[84px] flex-none items-center justify-between border-b-2 border-rule">
            <span className="text-[15px] font-extrabold tracking-[-0.01em]">PARASMANI ENGINEERING</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="btn btn-outline h-12 w-12 justify-center border-ink p-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className="m-0 flex list-none flex-col p-0">
              {NAV.map((n) => {
                const active = n.href === "/" ? pathname === "/" : pathname === n.href || (!!n.children && inAbout);
                return (
                  <li key={n.href} className="flex flex-col border-b-2 border-rule">
                    <div className="flex items-stretch">
                      <Link
                        href={n.href}
                        className="px-gut flex min-h-16 flex-1 items-center justify-between gap-4 py-5 text-[22px] font-bold tracking-[-0.02em] hover:bg-bg2 hover:text-hl"
                      >
                        <span>{n.label}</span>
                        {active && <span className="h-3 w-3 flex-none bg-hl" />}
                      </Link>
                      {n.children && (
                        <button
                          type="button"
                          onClick={() => setAboutOpen(!aboutShown)}
                          aria-label="Show About pages"
                          aria-expanded={aboutShown}
                          className="flex w-[72px] flex-none items-center justify-center border-0 border-l-2 border-rule hover:bg-bg2 hover:text-hl"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="square"
                            style={{ transition: "transform .3s cubic-bezier(0.16,1,0.3,1)", transform: aboutShown ? "rotate(180deg)" : "none" }}
                            aria-hidden="true"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {n.children && aboutShown && (
                      <ul className="animate-drop m-0 flex list-none flex-col border-t-2 border-hl bg-bg2 p-0">
                        {n.children.map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              className="flex min-h-14 items-center gap-[14px] border-b-2 border-rule-faint px-[clamp(32px,6vw,56px)] py-4 text-[17px] font-bold tracking-[0.02em] text-ink hover:text-hl"
                            >
                              <span className={`block h-2 w-2 flex-none border-2 border-hl ${pathname === s.href ? "bg-hl" : "bg-transparent"}`} />
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="px-gut flex flex-col gap-4 py-[clamp(24px,5vw,40px)]">
            <Link href="/contact" className="btn btn-primary min-h-14 px-6 py-5 text-[14px]">
              REQUEST A QUOTE
            </Link>
            <div className="text-[13px] leading-[1.8] text-mute">
              {SITE.phone}
              <br />
              {SITE.email}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
