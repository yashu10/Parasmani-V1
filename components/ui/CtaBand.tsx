import Link from "next/link";
import { Headline } from "./Headline";

export function CtaBand() {
  return (
    <section data-block="one" className="px-gut bg-brand py-[clamp(56px,9vw,150px)] text-white">
      <Headline
        as="h2"
        words
        text="YOUR DRAWINGS. OUR STEEL. *DELIVERED ON TIME.*"
        className="mb-6 mt-0 max-w-[20ch] font-bold leading-[0.92] tracking-[-0.045em]"
        style={{ fontSize: "clamp(30px,6vw,86px)" }}
      />
      <p className="mb-9 mt-0 max-w-[52ch] text-[clamp(15px,1.3vw,18px)] leading-[1.55] text-white">
        Send us your drawings and tonnage. Our engineering team replies with a detailed quote within 48 hours.
      </p>
      <div className="flex flex-wrap gap-[14px]">
        <Link href="/contact" className="btn btn-white min-h-[60px] px-7 py-5 text-[13px]">
          REQUEST A QUOTE
        </Link>
        <Link href="/quality#downloads" className="btn btn-white-outline min-h-[60px] px-7 py-5 text-[13px]">
          COMPANY PROFILE
        </Link>
      </div>
    </section>
  );
}
