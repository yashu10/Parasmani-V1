"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, ABOUT_SUB } from "@/lib/site";

export function DesktopNav() {
  const pathname = usePathname();
  const isActive = (href: string, group?: boolean) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/") || (!!group && ABOUT_SUB.some((s) => pathname === s.href));

  return (
    <ul className="m-0 flex flex-1 list-none items-center justify-end gap-[clamp(10px,1.4vw,20px)] p-0">
      {NAV.map((n) => {
        const active = isActive(n.href, !!n.children);
        return (
          <li key={n.href} className="group relative flex h-[84px] items-center">
            <Link
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
              aria-haspopup={n.children ? "true" : undefined}
              className="relative flex items-center gap-[6px] whitespace-nowrap py-2 text-[11px] font-semibold tracking-[0.04em]"
            >
              {n.label}
              {n.children && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
              {active && <span className="animate-sweep absolute inset-x-0 bottom-0 h-[2px] bg-hl" />}
            </Link>
            {n.children && (
              <ul className="animate-drop absolute left-[-20px] top-full z-[120] m-0 hidden min-w-[260px] list-none flex-col border-2 border-t-hl border-rule-strong bg-bg p-0 shadow-[0_18px_40px_rgba(0,0,0,0.25)] group-focus-within:flex group-hover:flex">
                {n.children.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      aria-current={pathname === s.href ? "page" : undefined}
                      className="flex items-center gap-3 whitespace-nowrap border-b-2 border-rule-faint px-5 py-4 text-[12px] font-bold tracking-[0.06em] text-ink hover:bg-bg2 hover:text-hl"
                    >
                      <span className={`block h-[6px] w-[6px] flex-none ${pathname === s.href ? "bg-hl" : "bg-transparent"}`} />
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
  );
}
