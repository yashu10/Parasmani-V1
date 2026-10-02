import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { PROJECTS, alt, img } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Crumbs } from "@/components/ui/Crumbs";

export const metadata = buildMetadata({
  title: "Steel Fabrication Projects",
  description:
    "Selected steel fabrication projects from Parasmani Engineering across power, infrastructure, industrial and EPC sectors, tracked from engineering to dispatch.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "Projects", path: "/projects" }]} />
      <PageHero
        eyebrow="PROJECTS"
        title="PROJECTS ARE THE *PROOF.*"
        image={img("A")}
        alt={alt("A")}
        intro={'Project information will be added after verification. Unconfirmed fields are shown as "To be confirmed" rather than estimated.'}
        introTone="mute"
        titleMargin="22px 0 18px"
      />
      {PROJECTS.map((p) => (
        <article key={p.num} data-block="one" className="border-b-2 border-rule bg-bg">
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
            <div className="px-gut min-w-0 border-r-2 border-rule py-[clamp(40px,5vw,80px)]">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-acc">PROJECT {p.num}</span>
              <h2 className="mb-7 mt-4 text-[clamp(22px,2.8vw,36px)] font-bold leading-none tracking-[-0.025em]">{p.title}</h2>
              <dl className="m-0 border-t-2 border-rule text-[14px]">
                {(
                  [
                    ["Client", p.client],
                    ["Industry", p.industry],
                    ["Scope", p.scope],
                    ["Quantity", p.qty],
                    ["Location", p.location],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-rule-soft py-3">
                    <dt className="text-mute">{k}</dt>
                    <dd className="m-0 text-right font-semibold">{v}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-mute">Status</dt>
                  <dd className="m-0 border border-ink/30 px-2 py-1 text-right text-[11px] font-semibold tracking-[0.06em]">{p.status}</dd>
                </div>
              </dl>
            </div>
            <div className="relative min-h-[clamp(260px,30vw,380px)] min-w-0">
              <Image src={p.img} alt={p.alt} fill sizes="(min-width:1000px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
          <ul className="m-0 grid list-none border-t-2 border-rule p-0" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))" }}>
            {p.stages.map((s) => (
              <li key={s.name} className="min-w-0 border-r-2 border-rule">
                <div className="relative h-[clamp(110px,12vw,150px)]">
                  <Image src={s.img} alt={s.alt} fill sizes="(min-width:1000px) 20vw, 50vw" className="object-cover" />
                </div>
                <h3 className="m-0 border-t-2 border-rule px-4 py-3 text-[10px] font-semibold tracking-[0.1em]">{s.name}</h3>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
