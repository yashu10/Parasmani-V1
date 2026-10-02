import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CERTS, DOWNLOADS, alt, img } from "@/lib/content";
import { flags } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Headline } from "@/components/ui/Headline";
import { Crumbs } from "@/components/ui/Crumbs";

export const metadata = buildMetadata({
  title: "Quality, Certifications & Inspection",
  description:
    "Quality at Parasmani Engineering is controlled by procedure: welder qualifications, NDT, hold points and dispatch records, with third-party inspection welcome.",
  path: "/quality",
});

export default function QualityPage() {
  const certs = CERTS.filter((c) => !c.pending || flags.showPending);
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "About", path: "/about" }, { name: "Quality", path: "/quality" }]} />
      <PageHero
        eyebrow="QUALITY"
        title="QUALITY IS ENGINEERED INTO *EVERY STAGE.*"
        image={img("Q")}
        alt={alt("Q")}
        intro="Welder qualifications, NDT, hold points and dispatch documentation are controlled by procedure. Third-party and client inspection are accommodated at any stage."
        size="clamp(30px,4.4vw,64px)"
      />

      <section data-block="one" className="px-gut border-b-2 border-rule py-[clamp(48px,7vw,120px)]">
        <Headline as="h2" text="*CERTIFICATIONS* & APPROVALS" className="h-sub mb-[clamp(24px,3vw,40px)]" />
        <ul className="m-0 list-none border-t-2 border-rule p-0">
          {certs.map((c) => (
            <li
              key={c.name}
              className="grid items-baseline gap-[clamp(8px,1.5vw,24px)] border-b-2 border-rule-soft py-5"
              style={{ gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}
            >
              <h3 className="m-0 min-w-0 text-[17px] font-bold tracking-[-0.02em]">{c.name}</h3>
              <div className="min-w-0">
                <span className="inline-block border border-ink/30 px-[9px] py-[5px] text-[10px] font-semibold tracking-[0.08em] text-soft">{c.status}</span>
              </div>
              <div className="min-w-0 text-[14px] text-mute">{c.evidence}</div>
              <div className="min-w-0 text-[13px] font-semibold text-acc">{c.download}</div>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-5 text-[12px] leading-[1.55] text-mute">Only formally held certificates are published. No approval is implied until verified.</p>
      </section>

      <div data-block="one" id="downloads" className="px-gut pt-[clamp(48px,7vw,120px)]">
        <Headline as="h2" text="*DOWNLOADS*" className="h-sub mb-[clamp(24px,3vw,40px)]" />
      </div>
      <ul data-block="stagger" className="m-0 grid list-none border-y-2 border-rule bg-bg p-0" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}>
        {DOWNLOADS.map((d) => (
          <li key={d.name} className="min-w-0 border-r-2 border-rule">
            <Link href="/contact" className="card block min-h-14 px-[clamp(16px,2.5vw,32px)] py-[clamp(28px,3.5vw,44px)] hover:bg-bg2">
              <div className="text-[17px] font-bold tracking-[-0.02em]">{d.name}</div>
              <div className="mt-[10px] text-[10px] font-semibold tracking-[0.1em] text-acc">{d.meta} · REQUEST COPY →</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
