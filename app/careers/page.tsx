import { buildMetadata } from "@/lib/seo";
import { ROLES, alt, img } from "@/lib/content";
import { flags } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Headline } from "@/components/ui/Headline";
import { Crumbs } from "@/components/ui/Crumbs";

export const metadata = buildMetadata({
  title: "Careers in Steel Fabrication",
  description:
    "Join Parasmani Engineering in Viramgam, Gujarat. Roles in engineering, production, welding, quality, planning and projects. Ownership is a job description here.",
  path: "/careers",
  // Hidden from nav/sitemap and noindex until NEXT_PUBLIC_SHOW_CAREERS=1
  noindex: !flags.showCareers,
});

export default function CareersPage() {
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "Careers", path: "/careers" }]} />
      <PageHero
        eyebrow="CAREERS"
        title="*OWNERSHIP* IS A JOB DESCRIPTION HERE."
        image={img("K")}
        alt={alt("K")}
        intro="PEPL is building its engineering, production and quality functions. Write to us with the role in the subject line."
      />
      <section data-block="one" className="px-gut bg-bg py-[clamp(48px,7vw,120px)]">
        <div className="mb-[clamp(24px,3vw,40px)] flex flex-wrap items-end justify-between gap-6">
          <Headline as="h2" text="OPEN *ROLES*" className="h-sec" />
          <span className="text-[13px] font-semibold tracking-[0.06em] text-soft">ALL ROLES · VIRAMGAM, GUJARAT</span>
        </div>
        <ul className="m-0 list-none border-t-2 border-rule-strong p-0">
          {ROLES.map((r) => (
            <li
              key={r.num}
              className="grid items-center gap-[clamp(12px,2vw,32px)] border-b-2 border-rule-soft py-[22px]"
              style={{ gridTemplateColumns: "minmax(32px,48px) minmax(0,2fr) minmax(0,1fr) auto" }}
            >
              <span className="text-[13px] font-bold tracking-[0.1em] text-hl">{r.num}</span>
              <h3 className="m-0 min-w-0 text-[clamp(17px,1.6vw,21px)] font-bold leading-[1.2] tracking-[-0.015em]">{r.role}</h3>
              <div className="min-w-0 text-[15px] text-soft">{r.department}</div>
              <a href={r.mailto} className="btn btn-outline gap-[10px] whitespace-nowrap px-[18px] py-3 text-[12px]" aria-label={`Apply for ${r.role}`}>
                APPLY
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
