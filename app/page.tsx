import Image from "next/image";
import Link from "next/link";
import { buildMetadata, orgAddressLd } from "@/lib/seo";
import { SITE, flags } from "@/lib/site";
import { CAP_ENG, CAP_HEAVY, INDUSTRIES, PROJECTS, TICKER, VMP, WHY, alt, img } from "@/lib/content";
import { Headline } from "@/components/ui/Headline";
import { JsonLd } from "@/components/ui/JsonLd";
import { Metrics } from "@/components/ui/Metrics";
import { ClientsGrid } from "@/components/ui/ClientsGrid";
import { FilmButton } from "@/components/FilmModal";

export const metadata = buildMetadata({
  title: "Parasmani Engineering — Heavy Steel Fabrication in Gujarat",
  absoluteTitle: true,
  description:
    "Parasmani Engineering Pvt. Ltd. delivers engineering, CNC production, welding, surface treatment and inspection under one roof from Viramgam, Gujarat.",
  path: "/",
});

const ldGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}${SITE.logo}`,
      email: SITE.email,
      telephone: "+919879795382",
      address: orgAddressLd,
      contactPoint: [
        { "@type": "ContactPoint", contactType: "sales", telephone: "+919879795382", email: SITE.email, areaServed: "IN", availableLanguage: ["en"] },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#localbusiness`,
      name: SITE.name,
      url: SITE.url,
      image: `${SITE.url}/images/stock/U.jpg`,
      telephone: "+919879795382",
      email: SITE.email,
      address: orgAddressLd,
      parentOrganization: { "@id": `${SITE.url}/#organization` },
    },
  ],
};

const sectionHead = "mb-[clamp(28px,4vw,48px)] flex flex-wrap items-baseline justify-between gap-6";

export default function HomePage() {
  return (
    <div data-anim="screen">
      <JsonLd data={ldGraph} />

      {/* Hero */}
      <section
        className="relative grid min-h-[min(88vh,820px)] overflow-hidden border-b-2 border-rule"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))" }}
      >
        <Image
          src={img("U")}
          alt={alt("U")}
          fill
          priority
          sizes="100vw"
          quality={60}
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(var(--bg-rgb),0.94) 0%, rgba(var(--bg-rgb),0.82) 38%, rgba(var(--bg-rgb),0.25) 72%, rgba(var(--bg-rgb),0.05) 100%)",
          }}
        />
        <div className="px-gut relative z-[1] flex min-w-0 flex-col justify-center gap-7 py-[clamp(48px,7vw,110px)]">
          <span className="eyebrow">PARASMANI ENGINEERING PVT. LTD.</span>
          <Headline
            as="h1"
            words
            text="ENGINEERING STEEL. BUILDING *POSSIBILITY.*"
            className="m-0 font-bold leading-[0.92] tracking-[-0.045em]"
            style={{ fontSize: "clamp(38px,5.6vw,82px)" }}
          />
          <p className="m-0 max-w-[50ch] text-[clamp(15px,1.3vw,18px)] leading-[1.55] text-soft">
            Engineering, detailing, CNC production, welding, surface treatment and inspection under one roof and one plan.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/capabilities" className="btn btn-primary min-h-14 px-[26px] py-[18px] text-[12px]">
              EXPLORE CAPABILITIES
            </Link>
            <Link href="/contact" className="btn btn-outline min-h-14 px-[26px] py-[18px] text-[12px]">
              REQUEST A QUOTE
            </Link>
          </div>
          {flags.bg3d && <span className="text-[10px] font-semibold tracking-[0.12em] text-mute">DRAG THE BACKGROUND TO ORBIT</span>}
        </div>
        <div className="pointer-events-none relative z-[1] min-h-[400px] min-w-0">
          <FilmButton />
        </div>
      </section>

      {/* Ticker */}
      <div aria-hidden="true" className="overflow-hidden border-b-2 border-rule bg-brand">
        <div className="animate-marquee flex w-max">
          {[...TICKER, ...TICKER].map((w, i) => (
            <span key={i} className="flex items-center gap-[22px] whitespace-nowrap px-[22px] py-[14px] text-[11px] font-bold tracking-[0.14em] text-white">
              {w}
              <span className="block h-[6px] w-[6px] bg-bg" />
            </span>
          ))}
        </div>
      </div>

      {flags.showPending && (
        <>
          <div data-block="one" className="px-gut pt-[clamp(24px,3vw,40px)]">
            <h2 className="m-0 text-[11px] font-semibold tracking-[0.14em]">PEPL AT A GLANCE</h2>
          </div>
          <div className="mt-[clamp(20px,3vw,32px)] border-t-2 border-rule">
            <Metrics />
          </div>
        </>
      )}

      {/* Vision / Mission / Purpose */}
      <section data-block="stagger" className="grid border-b-2 border-rule bg-bg" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
        <div className="px-gut min-w-0 border-r-2 border-rule py-[clamp(48px,7vw,100px)]">
          <span className="eyebrow">WHO WE ARE</span>
          <h2 className="mb-0 mt-5 text-[11px] font-semibold tracking-[0.14em] text-acc">VISION</h2>
          <p className="mb-0 mt-4 max-w-[34ch] text-[clamp(20px,2.4vw,30px)] font-bold leading-[1.2] tracking-[-0.025em]">{VMP.vision}</p>
          <Link href="/about" className="btn btn-outline mt-9 min-h-[52px] px-[22px] py-4 text-[11px]">
            MORE ABOUT PEPL
          </Link>
        </div>
        <div className="min-w-0">
          <div className="px-gut border-b-2 border-rule py-[clamp(32px,4vw,56px)]">
            <h2 className="m-0 text-[11px] font-semibold tracking-[0.14em] text-acc">MISSION</h2>
            <p className="mb-0 mt-4 max-w-[46ch] text-[clamp(16px,1.5vw,19px)] font-medium leading-[1.45] text-soft">{VMP.mission}</p>
          </div>
          <div className="px-gut py-[clamp(32px,4vw,56px)]">
            <h2 className="m-0 text-[11px] font-semibold tracking-[0.14em] text-acc">PURPOSE</h2>
            <p className="mb-0 mt-4 max-w-[46ch] text-[clamp(16px,1.5vw,19px)] font-medium leading-[1.45] text-soft">{VMP.purpose}</p>
          </div>
        </div>
      </section>

      {/* 01 Capability */}
      <section data-block="stagger" className="grid border-b-2 border-rule bg-bg" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
        <div className="px-gut min-w-0 border-r-2 border-rule py-[clamp(48px,7vw,120px)]">
          <span className="eyebrow">01 — CAPABILITY</span>
          <Headline as="h2" text="ENGINEERING + *FABRICATION*" className="h-sec mt-5" />
          <div className="mt-9 border-t-2 border-rule">
            <h3 className="m-0 pb-3 pt-5 text-[11px] font-semibold tracking-[0.14em] text-acc">HEAVY STEEL FABRICATION</h3>
            <ul className="m-0 list-none p-0">
              {CAP_HEAVY.map((c) => (
                <li key={c} className="border-b border-rule-soft py-[11px] text-[15px]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-gut flex min-w-0 flex-col py-[clamp(48px,7vw,120px)]">
          <div className="relative mb-9 h-[clamp(180px,22vw,300px)]">
            <Image src={img("O")} alt={alt("O")} fill sizes="(min-width:1200px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="border-t-2 border-rule">
            <h3 className="m-0 pb-3 pt-5 text-[11px] font-semibold tracking-[0.14em] text-acc">DESIGN &amp; ENGINEERING</h3>
            <ul className="m-0 list-none p-0">
              {CAP_ENG.map((c) => (
                <li key={c} className="border-b border-rule-soft py-[11px] text-[15px]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 02 Sectors */}
      <div data-block="one" className="px-gut pt-[clamp(48px,7vw,120px)]">
        <div className={sectionHead}>
          <div>
            <span className="eyebrow">02 — SECTORS</span>
            <Headline as="h2" text="*INDUSTRIES* WE SERVE" className="h-sec mt-5" />
          </div>
          <Link href="/industries" className="btn btn-outline min-h-[52px] px-[22px] py-4 text-[11px]">
            ALL INDUSTRIES
          </Link>
        </div>
      </div>
      <ul
        data-block="stagger"
        className="m-0 grid list-none border-t-2 border-rule bg-bg p-0"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}
      >
        {INDUSTRIES.map((i) => (
          <li key={i.name} className="min-w-0 border-b-2 border-r-2 border-rule">
            <Link href="/industries" className="card block h-full w-full hover:bg-bg2">
              <div className="relative h-[clamp(130px,14vw,180px)]">
                <Image src={i.img} alt={i.alt} fill sizes="(min-width:1200px) 25vw, (min-width:700px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="border-t-2 border-rule px-[clamp(16px,2vw,24px)] py-5">
                <span className="text-[10px] font-semibold tracking-[0.1em] text-acc">{i.num}</span>
                <h3 className="mb-0 mt-2 text-[15px] font-bold tracking-[-0.01em]">{i.name}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* 03 Evidence */}
      <div data-block="one" className="px-gut pt-[clamp(48px,7vw,120px)]">
        <div className={sectionHead}>
          <div>
            <span className="eyebrow">03 — EVIDENCE</span>
            <Headline as="h2" text="SELECTED *PROJECTS*" className="h-sec mt-5" />
          </div>
          <Link href="/projects" className="btn btn-outline min-h-[52px] px-[22px] py-4 text-[11px]">
            VIEW ALL PROJECTS
          </Link>
        </div>
      </div>
      <div
        data-block="stagger"
        className="grid border-y-2 border-rule bg-bg"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
      >
        {PROJECTS.slice(0, 3).map((p) => (
          <article key={p.num} className="min-w-0 border-r-2 border-rule">
            <div className="relative h-[clamp(180px,20vw,240px)]">
              <Image src={p.img} alt={p.alt} fill sizes="(min-width:1000px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="border-t-2 border-rule px-[clamp(16px,2.5vw,32px)] py-[clamp(24px,3vw,36px)]">
              <span className="text-[10px] font-semibold tracking-[0.1em] text-acc">
                {p.num} · {p.industry}
              </span>
              <h3 className="mb-[22px] mt-[14px] text-[19px] font-bold leading-[1.15] tracking-[-0.02em]">{p.title}</h3>
              <dl className="m-0 text-[13px]">
                {(
                  [
                    ["Client", p.client],
                    ["Scope", p.scope],
                    ["Quantity", p.qty],
                    ["Location", p.location],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-rule-soft py-[9px]">
                    <dt className="text-mute">{k}</dt>
                    <dd className="m-0 text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>

      {/* 04 Rationale + clients */}
      <section data-block="stagger" className="grid border-b-2 border-rule" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
        <div className="px-gut min-w-0 border-r-2 border-rule py-[clamp(48px,7vw,120px)]">
          <span className="eyebrow">04 — RATIONALE</span>
          <Headline as="h2" text="WHY PARTNER WITH *PEPL?*" className="h-sec mb-9 mt-5" />
          <ul className="m-0 list-none border-t-2 border-rule p-0">
            {WHY.map((w) => (
              <li key={w.title} className="border-b-2 border-rule py-5">
                <h3 className="m-0 text-[13px] font-bold tracking-[0.04em]">{w.title}</h3>
                <p className="mb-0 mt-2 max-w-[48ch] text-[14px] leading-[1.55] text-mute">{w.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <div className="px-gut border-b-2 border-rule py-[clamp(48px,7vw,120px)]">
            <Headline as="h2" text="*CLIENTS* & PROJECT PARTNERS" className="mb-7 mt-0 text-[clamp(22px,2.6vw,32px)] font-bold leading-none tracking-[-0.025em]" />
            <ClientsGrid />
          </div>
          {flags.showCareers && (
            <div className="px-gut py-[clamp(48px,7vw,120px)]">
              <Headline as="h2" text="BUILD THE *NEXT PROJECT* WITH US." className="mb-[10px] mt-0 text-[clamp(22px,2.6vw,32px)] font-bold leading-none tracking-[-0.025em]" />
              <p className="mb-7 mt-0 max-w-[42ch] text-[15px] leading-[1.55] text-mute">Ownership is a job description here.</p>
              <Link href="/careers" className="btn btn-outline min-h-14 px-[26px] py-[18px] text-[12px]">
                VIEW OPEN POSITIONS
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
