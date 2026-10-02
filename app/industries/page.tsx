import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { INDUSTRIES, alt, img } from "@/lib/content";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Crumbs } from "@/components/ui/Crumbs";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "Steel fabrication for power, steel and metals, infrastructure, cement, railways, EPC, oil and gas, solar, defence and more. See the sectors Parasmani serves.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "Industries", path: "/industries" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Industries served by Parasmani Engineering",
          itemListElement: INDUSTRIES.map((i, k) => ({
            "@type": "ListItem",
            position: k + 1,
            name: i.name,
            url: `${SITE.url}/industries#${i.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          })),
        }}
      />
      <PageHero
        eyebrow="INDUSTRIES"
        title="ENGINEERED FOR *INDUSTRY.*"
        image={img("H")}
        alt={alt("H")}
        titleMargin="22px 0 0"
      />
      {INDUSTRIES.map((i) => (
        <section
          key={i.name}
          id={i.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          data-block="one"
          className="grid border-b-2 border-rule bg-bg"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}
        >
          <div className="relative min-h-[clamp(240px,26vw,340px)] min-w-0 border-r-2 border-rule">
            <Image src={i.img} alt={i.alt} fill sizes="(min-width:1000px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-gut min-w-0 py-[clamp(40px,5vw,90px)]">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-acc">{i.num}</span>
            <h2 className="mb-5 mt-4 text-[clamp(24px,3vw,40px)] font-bold leading-none tracking-[-0.025em]">{i.nameUpper}</h2>
            <p className="mb-7 mt-0 max-w-[48ch] text-[16px] leading-[1.55] text-soft">{i.long}</p>
            <Link href="/projects" className="btn btn-outline min-h-[52px] px-[22px] py-4 text-[11px]">
              VIEW RELATED PROJECTS
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}
