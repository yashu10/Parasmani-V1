import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { CAP_ENG, CAP_HEAVY, PROCESS, alt, img } from "@/lib/content";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Headline } from "@/components/ui/Headline";
import { Crumbs } from "@/components/ui/Crumbs";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = buildMetadata({
  title: "Heavy Steel Fabrication Capabilities",
  description:
    "Heavy steel fabrication plus design and engineering from Parasmani Engineering: shop drawings, CNC data and a nine-stage process with hold points and sign-offs.",
  path: "/capabilities",
});

function List({ items }: { items: string[] }) {
  return (
    <ul className="m-0 list-none border-t-2 border-rule p-0">
      {items.map((c) => (
        <li key={c} className="flex gap-4 border-b-2 border-rule-soft py-[14px] text-[15px]">
          <span aria-hidden="true" className="flex-none font-bold text-acc">
            —
          </span>
          <span>{c}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CapabilitiesPage() {
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "About", path: "/about" }, { name: "Capabilities", path: "/capabilities" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Heavy steel fabrication, design and engineering",
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
          areaServed: "IN",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Capabilities",
            itemListElement: [...CAP_HEAVY, ...CAP_ENG].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
          },
        }}
      />
      <PageHero
        eyebrow="CAPABILITIES"
        title="ENGINEERED FOR *COMPLEXITY.*"
        image={img("W")}
        alt={alt("W")}
        titleMargin="22px 0 0"
      />

      <section data-block="stagger" className="grid border-b-2 border-rule bg-bg" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
        <div className="min-w-0 border-r-2 border-rule">
          <div className="relative h-[clamp(200px,24vw,300px)]">
            <Image src={img("G")} alt={alt("G")} fill sizes="(min-width:1000px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-gut border-t-2 border-rule py-[clamp(40px,5vw,80px)]">
            <Headline as="h2" text="HEAVY *STEEL* FABRICATION" className="h-sub mb-7" />
            <List items={CAP_HEAVY} />
          </div>
        </div>
        <div className="min-w-0">
          <div className="relative h-[clamp(200px,24vw,300px)]">
            <Image src={img("S")} alt={alt("S")} fill sizes="(min-width:1000px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-gut border-t-2 border-rule py-[clamp(40px,5vw,80px)]">
            <Headline as="h2" text="*DESIGN* & ENGINEERING" className="h-sub mb-7" />
            <List items={CAP_ENG} />
          </div>
        </div>
      </section>

      <section data-block="one" className="px-gut py-[clamp(48px,7vw,120px)]">
        <span className="eyebrow">PROCESS</span>
        <Headline as="h2" text="FROM DRAWING TO *DELIVERY*" className="h-sec mb-[14px] mt-5" />
        <p className="mb-[clamp(28px,4vw,48px)] mt-0 max-w-[58ch] text-[16px] leading-[1.55] text-mute">
          Nine controlled stages. Each carries a hold point, a document and a signature before the job moves on.
        </p>
        <ol className="m-0 list-none border-t-2 border-rule p-0">
          {PROCESS.map((p) => (
            <li
              key={p.number}
              className="grid gap-[clamp(8px,1.5vw,24px)] border-b-2 border-rule-soft py-[22px]"
              style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}
            >
              <div className="min-w-0">
                <span className="text-[13px] font-bold tracking-[0.1em] text-hl">{p.number}</span>
                <h3 className="mb-0 mt-2 text-[19px] font-bold tracking-[-0.015em]">{p.name}</h3>
              </div>
              {(
                [
                  ["HOLD POINT", p.hold],
                  ["DOCUMENT", p.doc],
                  ["SIGNATURE", p.sign],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <div className="text-[12px] font-bold tracking-[0.08em] text-soft">{k}</div>
                  <div className="mt-2 text-[16px] font-medium leading-[1.4]">{v}</div>
                </div>
              ))}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
