import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="px-gut py-[clamp(80px,12vw,200px)]">
      <span className="eyebrow">404</span>
      <h1 className="mb-6 mt-5 text-[clamp(38px,5.6vw,82px)] font-bold leading-[0.92] tracking-[-0.045em]">
        PAGE NOT <span className="text-hl">FOUND.</span>
      </h1>
      <p className="mb-8 mt-0 max-w-[50ch] text-[16px] leading-[1.55] text-soft">The page you are looking for has moved or does not exist.</p>
      <Link href="/" className="btn btn-primary min-h-14 px-[26px] py-[18px] text-[12px]">
        BACK TO HOME
      </Link>
    </section>
  );
}
