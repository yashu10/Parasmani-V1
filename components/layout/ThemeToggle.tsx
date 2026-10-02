"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Icon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
  </svg>
);

export function ThemeToggle({ compact }: { compact?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const light = mounted && resolvedTheme === "light";
  return (
    <button
      type="button"
      onClick={() => setTheme(light ? "dark" : "light")}
      aria-pressed={light}
      aria-label="Toggle light and dark theme"
      className={
        compact
          ? "btn btn-outline h-12 w-12 justify-center border-ink/40 p-0"
          : "btn btn-outline ml-2 gap-2 border-ink/40 px-[14px] py-[10px] text-[11px] whitespace-nowrap"
      }
    >
      <Icon size={compact ? 20 : 16} />
      {!compact && (light ? "DARK" : "LIGHT")}
    </button>
  );
}
