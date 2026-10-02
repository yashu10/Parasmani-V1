"use client";

import { useEffect, useState, type ComponentType } from "react";

/** Loads GSAP + ScrollTrigger in its own chunk, after hydration has settled. */
export function MotionLoader() {
  const [Cmp, setCmp] = useState<ComponentType | null>(null);
  useEffect(() => {
    let cancelled = false;
    const load = () => import("./Motion").then((m) => !cancelled && setCmp(() => m.Motion));
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(load, { timeout: 600 }) : window.setTimeout(load, 150);
    return () => {
      cancelled = true;
      if (!w.requestIdleCallback) clearTimeout(id);
    };
  }, []);
  return Cmp ? <Cmp /> : null;
}
