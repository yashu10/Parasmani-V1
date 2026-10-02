import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { RDSO_DOCS, alt, img } from "@/lib/content";
import { RDSO_BASE } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Headline } from "@/components/ui/Headline";
import { Crumbs } from "@/components/ui/Crumbs";

export const metadata = buildMetadata({
  title: "RDSO Approval Under Process",
  description:
    "Parasmani Engineering's RDSO vendor approval is under process. Review the 12 supporting documents on record, from registration and plant layout to NDT reports.",
  path: "/rdso-approval",
});

const tone = { hl: "text-hl", acc: "text-acc", mute: "text-mute" } as const;

export default function RdsoPage() {
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "RDSO Approval", path: "/rdso-approval" }]} />
      <PageHero
        eyebrow="RDSO · INDIAN RAILWAYS"
        title="RDSO APPROVAL *UNDER PROCESS.*"
        image={img("rail-hero")}
        alt={alt("rail-hero")}
        intro="Vendor and fabrication profile, with the technical documentation submitted in support of our RDSO approval application."
      />

      <section data-block="stagger" className="grid border-b-2 border-rule bg-bg" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        <div className="px-gut min-w-0 border-r-2 border-rule py-[clamp(28px,4vw,48px)]">
          <h2 className="m-0 text-[12px] font-bold tracking-[0.08em] text-soft">DOCUMENTS ON RECORD</h2>
          <div data-count="1" className="mt-[10px] text-[clamp(40px,5vw,64px)] font-extrabold leading-none tracking-[-0.04em]">
            {RDSO_DOCS.length}
          </div>
        </div>
        <div className="px-gut min-w-0 border-r-2 border-rule py-[clamp(28px,4vw,48px)]">
          <h2 className="m-0 text-[12px] font-bold tracking-[0.08em] text-soft">APPLICATION STATUS</h2>
          <div className="mt-[14px] flex items-center gap-3 text-[clamp(20px,2.2vw,28px)] font-extrabold tracking-[-0.02em] text-hl">
            <span className="block h-3 w-3 bg-hl" />
            UNDER PROCESS
          </div>
        </div>
        <div className="px-gut min-w-0 py-[clamp(28px,4vw,48px)]">
          <h2 className="m-0 text-[12px] font-bold tracking-[0.08em] text-soft">REGISTRATION ID</h2>
          <p className="mb-0 mt-[14px] text-[16px] leading-[1.5]">To be published on approval.</p>
        </div>
      </section>

      <div data-block="stagger" className="grid border-b-2 border-rule bg-bg" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))" }}>
        {(
          [
            ["rail-1"],
            ["rail-2"],
            ["rail-3"],
          ] as const
        ).map(([k]) => (
          <div key={k} className="relative h-[clamp(220px,24vw,320px)] min-w-0 border-r-2 border-rule">
            <Image src={img(k)} alt={alt(k)} fill sizes="(min-width:900px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <section className="px-gut bg-bg py-[clamp(48px,7vw,120px)]">
        <div data-block="one">
          <span className="eyebrow">SUBMISSION FILE</span>
          <Headline as="h2" text="DOCUMENTS ON *RECORD*" className="h-sec mb-[14px] mt-5" />
          <p className="mb-[clamp(28px,4vw,48px)] mt-0 max-w-[60ch] text-[16px] leading-[1.55] text-soft">
            Every supporting document submitted for RDSO vendor approval. Open any available file to view or download it.
          </p>
        </div>
        <ul
          data-block="stagger"
          className="m-0 grid list-none border-l-2 border-t-2 border-rule p-0"
          style={{ gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))" }}
        >
          {RDSO_DOCS.map((d) => (
            <li key={d.num} className="flex min-w-0 flex-col gap-[14px] border-b-2 border-r-2 border-rule px-[clamp(16px,2.4vw,28px)] py-[clamp(24px,3vw,36px)]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-bold tracking-[0.1em] text-hl">{d.num}</span>
                <span className={`text-[11px] font-bold tracking-[0.08em] ${tone[d.tone as keyof typeof tone]}`}>{d.status}</span>
              </div>
              <h3 className="m-0 text-[19px] font-bold leading-[1.2] tracking-[-0.015em]">{d.name}</h3>
              <p className="m-0 flex-1 text-[15px] leading-[1.5] text-soft">{d.desc}</p>
              {d.file ? (
                <a
                  href={RDSO_BASE + d.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline justify-between px-4 py-[14px] text-[12px]"
                  aria-label={`View document: ${d.name} (opens in a new tab)`}
                >
                  VIEW DOCUMENT
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              ) : (
                <Link href="/contact" className="btn btn-ghost justify-between px-4 py-[14px] text-[12px]">
                  REQUEST COPY
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
