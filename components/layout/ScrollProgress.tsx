"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!bar.current) return;
      const doc = document.scrollingElement || document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      bar.current.style.width = `${span > 0 ? (window.scrollY / span) * 100 : 0}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden="true" className="sticky top-[84px] z-[99] h-[2px] bg-rule-soft">
      <div ref={bar} className="h-[2px] w-0 bg-brand" />
    </div>
  );
}
