"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = "expo.out"; // == cubic-bezier(0.16, 1, 0.3, 1)

/**
 * Scroll reveals, headline word-rise and count-up.
 * Server HTML is fully visible/readable; hidden-before-reveal styles apply only
 * under `html.js` + prefers-reduced-motion: no-preference (see globals.css).
 */
export function Motion() {
  const pathname = usePathname();
  const first = useRef(true);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        html.classList.remove("js");
        return;
      }
      html.dataset.motionReady = "1";

      if (!first.current) {
        gsap.fromTo(
          '[data-anim="screen"]',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.5, ease: EASE, clearProps: "transform" },
        );
      }
      first.current = false;

      document.querySelectorAll<HTMLElement>("[data-block]").forEach((block) => {
        const stagger = block.dataset.block === "stagger";
        const targets = stagger ? Array.from(block.children) : [block];
        ScrollTrigger.create({
          trigger: block,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.fromTo(
              targets,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger: stagger ? 0.06 : 0, overwrite: "auto" },
            ),
        });
      });

      document.querySelectorAll<HTMLElement>("[data-words]").forEach((el) => {
        const words = el.querySelectorAll("[data-word]");
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.fromTo(words, { yPercent: 105 }, { yPercent: 0, duration: 0.75, ease: EASE, stagger: 0.045 }),
        });
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const raw = (el.textContent || "").trim();
        if (!/^[\d,]+$/.test(raw)) return;
        const end = parseInt(raw.replace(/,/g, ""), 10);
        if (!isFinite(end) || end < 10) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            el.style.display = "inline-block";
            el.style.minWidth = `${el.offsetWidth}px`;
            const o = { v: 0 };
            gsap.to(o, {
              v: end,
              duration: 1.1,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = Math.round(o.v).toLocaleString("en-IN");
              },
              onComplete: () => {
                el.textContent = raw;
              },
            });
          },
        });
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { dependencies: [pathname] },
  );

  return null;
}
