import { buildMetadata } from "@/lib/seo";
import { LEADERS, VALUES, alt, img } from "@/lib/content";
import { flags } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Headline } from "@/components/ui/Headline";
import { ClientsGrid } from "@/components/ui/ClientsGrid";
import { Crumbs } from "@/components/ui/Crumbs";
import { Placeholder } from "@/components/ui/Placeholder";
import { PendingFlag } from "@/components/ui/PendingFlag";

export const metadata = buildMetadata({
  title: "About Us: Values & Leadership",
  description:
    "Parasmani Engineering is built on four values: integrity, ownership, excellence and care. Read our vision, mission, purpose and meet the leadership team.",
  path: "/about",
});

export default function AboutPage() {
  const leaders = LEADERS.filter((l) => !l.pending || flags.showPending);
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "About", path: "/about" }]} />
      <PageHero
        eyebrow="ABOUT"
        title="AN ORGANISATION BUILT ON *FOUR VALUES.*"
        image={img("B")}
        alt={alt("B")}
        size="clamp(34px,5vw,72px)"
        titleMax="20ch"
        titleMargin="22px 0 0"
      />

      <section data-block="stagger" className="grid border-b-2 border-rule bg-bg" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
        {VALUES.map((v) => (
          <div key={v.name} className="px-gut min-w-0 border-r-2 border-rule py-[clamp(32px,4vw,56px)]">
            <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-bold tracking-[-0.025em] text-acc">{v.name}</h2>
            <p className="mb-0 mt-4 text-[14px] leading-[1.55] text-soft">{v.meaning}</p>
          </div>
        ))}
      </section>

      <section data-block="stagger" className="grid border-b-2 border-rule" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
        <div className="px-gut min-w-0 border-r-2 border-rule py-[clamp(40px,5vw,80px)]">
          <h2 className="m-0 text-[11px] font-semibold tracking-[0.14em] text-acc">VISION</h2>
          <p className="mb-0 mt-[22px] text-[clamp(18px,2vw,25px)] font-bold leading-[1.22] tracking-[-0.025em]">
            To become the world&apos;s most admired, result-driven, referred and preferred fabrication engineering organisation.
          </p>
        </div>
        <div className="px-gut min-w-0 border-r-2 border-rule py-[clamp(40px,5vw,80px)]">
          <h2 className="m-0 text-[11px] font-semibold tracking-[0.14em] text-acc">MISSION</h2>
          <p className="mb-0 mt-[22px] text-[16px] leading-[1.55] text-soft">
            Deliver engineered steel solutions through disciplined processes, capable people, technology and uncompromising quality.
          </p>
        </div>
        <div className="px-gut min-w-0 py-[clamp(40px,5vw,80px)]">
          <h2 className="m-0 text-[11px] font-semibold tracking-[0.14em] text-acc">PURPOSE</h2>
          <p className="mb-0 mt-[22px] text-[16px] leading-[1.55] text-soft">
            To transform engineering requirements into reliable, manufacturable and deliverable steel solutions.
          </p>
        </div>
      </section>

      <div data-block="one" className="px-gut pt-[clamp(48px,7vw,120px)]">
        <Headline as="h2" text="*LEADERSHIP*" className="h-sec mb-[clamp(28px,4vw,48px)]" />
      </div>
      <div data-block="stagger" className="grid border-y-2 border-rule bg-bg" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        {leaders.map((l) => (
          <article key={l.role} className="min-w-0 border-r-2 border-rule">
            <Placeholder label={`${l.role} — portrait to be supplied`} className="h-[clamp(220px,26vw,320px)]" />
            <div className="border-t-2 border-rule px-[clamp(16px,2.5vw,32px)] py-6">
              <h3 className="m-0 text-[10px] font-semibold tracking-[0.1em] text-acc">{l.role}</h3>
              <p className="mb-0 mt-[10px] text-[20px] font-bold tracking-[-0.02em]">{l.name}</p>
              {l.pending && (
                <div className="mt-3">
                  <PendingFlag />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <section data-block="one" className="bg-brand px-gut py-[clamp(56px,9vw,150px)] text-white">
        <blockquote className="m-0">
          <Headline
            as="p"
            words
            text="ENGINEER WITH INTEGRITY. EXECUTE WITH OWNERSHIP. DELIVER WITH EXCELLENCE. CARE THROUGHOUT."
            className="m-0 max-w-[22ch] font-bold leading-[0.94] tracking-[-0.045em]"
            style={{ fontSize: "clamp(28px,5vw,72px)" }}
          />
          <footer className="mt-9 text-[11px] font-semibold tracking-[0.14em] text-white">CMD STATEMENT · DAXESH SONI</footer>
        </blockquote>
      </section>

      <section data-block="one" className="px-gut border-t-2 border-rule bg-bg py-[clamp(48px,7vw,120px)]">
        <span className="eyebrow">TRUSTED BY</span>
        <Headline as="h2" text="*CLIENTS* & PROJECT PARTNERS" className="h-sec mb-[clamp(28px,4vw,48px)] mt-5" />
        <ClientsGrid large />
      </section>
    </div>
  );
}
