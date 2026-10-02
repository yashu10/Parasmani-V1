import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { CHAIN, TECH, alt, img } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Crumbs } from "@/components/ui/Crumbs";

export const metadata = buildMetadata({
  title: "CNC & Digital Fabrication Technology",
  description:
    "One data chain from engineering model to digital record: CNC technology, 3D modelling, CAD/CAM, production monitoring and quality traceability at Parasmani.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "About", path: "/about" }, { name: "Technology", path: "/technology" }]} />
      <PageHero
        eyebrow="TECHNOLOGY"
        title="ONE DATA CHAIN. *NOTHING RE-TYPED.*"
        image={img("S")}
        alt={alt("S")}
        intro="Engineering information should flow into production without unnecessary manual re-entry."
      />

      <ol
        data-block="stagger"
        className="m-0 grid list-none border-b-2 border-rule bg-bg p-0"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))" }}
      >
        {CHAIN.map((s) => (
          <li key={s.num} className="min-w-0 border-r-2 border-rule px-[clamp(16px,2.5vw,28px)] py-[clamp(28px,3.5vw,44px)]">
            <div className="text-[11px] font-semibold tracking-[0.1em] text-acc">{s.num}</div>
            <div className="mt-[14px] text-[15px] font-bold leading-[1.2] tracking-[-0.015em]">{s.name}</div>
          </li>
        ))}
      </ol>

      <section data-block="stagger" className="grid border-b-2 border-rule" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
        {TECH.map((t) => (
          <div key={t.num} className="px-gut min-w-0 border-b-2 border-r-2 border-rule py-[clamp(32px,4vw,56px)]">
            <div className="text-[11px] font-semibold tracking-[0.1em] text-acc">{t.num}</div>
            <h2 className="mb-[10px] mt-[14px] text-[18px] font-bold tracking-[-0.02em]">{t.name}</h2>
            <p className="m-0 text-[14px] leading-[1.55] text-mute">{t.body}</p>
          </div>
        ))}
      </section>

      <div data-block="one" className="relative h-[clamp(260px,34vw,440px)]">
        <Image src={img("U")} alt={alt("U")} fill sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}
