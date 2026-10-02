"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Default "Image" background. The photo is decorative, so it is requested only after the
 * page has loaded — it must never compete with the hero image (LCP) for bandwidth.
 */
export function SiteBackground() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(go, 100);
      return () => clearTimeout(id);
    }
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);
  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 z-0">
        {ready && (
          <Image
            src="/images/stock/prefab-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={40}
            className="animate-[pepl-fade_0.8s_ease_both] object-cover"
          />
        )}
      </div>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[rgba(var(--bg-rgb),0.88)]" />
    </>
  );
}
