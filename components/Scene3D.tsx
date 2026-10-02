"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { BG_VARIANT } from "@/lib/site";
import type { BgHandle } from "@/lib/bg/scene";

export default function Scene3D() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const handle = useRef<BgHandle | null>(null);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const latest = useRef({ pathname, theme: resolvedTheme });
  latest.current = { pathname, theme: resolvedTheme };

  useEffect(() => {
    let cancelled = false;
    let idle = 0;
    const start = async () => {
      const { mountBackground } = await import("@/lib/bg/scene");
      if (cancelled || !canvas.current) return;
      handle.current = mountBackground(canvas.current);
      handle.current.setVariant(BG_VARIANT[latest.current.pathname] ?? 0);
      handle.current.setTheme(latest.current.theme === "light" ? "light" : "dark");
    };
    // start after first paint
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (ric) idle = ric(start);
    else idle = window.setTimeout(start, 400);
    return () => {
      cancelled = true;
      if (!ric) clearTimeout(idle);
      handle.current?.dispose();
      handle.current = null;
    };
  }, []);

  useEffect(() => {
    handle.current?.setVariant(BG_VARIANT[pathname] ?? 0);
  }, [pathname]);
  useEffect(() => {
    handle.current?.setTheme(resolvedTheme === "light" ? "light" : "dark");
  }, [resolvedTheme]);

  return <canvas ref={canvas} aria-hidden="true" className="fixed inset-0 z-0 block h-screen w-screen" />;
}
