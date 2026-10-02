import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-bg3 text-ink">
      <div className="px-gut border-b-2 border-rule pb-[clamp(32px,4vw,56px)] pt-[clamp(48px,6vw,90px)]">
        <p className="m-0 text-[clamp(30px,6vw,86px)] font-bold leading-[0.92] tracking-[-0.045em]">ENGINEERED TO DELIVER.</p>
        <p className="mb-0 mt-6 text-[11px] font-semibold tracking-[0.14em] text-acc">INTEGRITY · OWNERSHIP · EXCELLENCE · CARE</p>
      </div>
      <div className="px-gut grid gap-[clamp(28px,4vw,48px)] py-[clamp(40px,5vw,72px)]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))" }}>
        <nav aria-label="Footer">
          <h2 className="mb-5 mt-0 text-[11px] font-semibold tracking-[0.14em] text-mute">NAVIGATE</h2>
          <ul className="m-0 grid list-none gap-[10px] p-0">
            {FOOTER_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="w-fit text-[12px] font-semibold tracking-[0.04em]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-5 mt-0 text-[11px] font-semibold tracking-[0.14em] text-mute">CONTACT</h2>
          <address className="text-[13px] not-italic leading-[1.9]">
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <br />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.district}, {SITE.address.region} {SITE.address.postal}
          </address>
        </div>
        <div>
          <h2 className="mb-5 mt-0 text-[11px] font-semibold tracking-[0.14em] text-mute">LEGAL</h2>
          <ul className="m-0 grid list-none gap-[10px] p-0 text-[13px] text-mute">
            <li>Privacy Policy — to be published</li>
            <li>Terms — to be published</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-5 mt-0 text-[11px] font-semibold tracking-[0.14em] text-mute">ORGANISATION</h2>
          <p className="m-0 max-w-[34ch] text-[13px] leading-[1.7] text-mute">
            Parasmani Engineering Pvt. Ltd. — a fabrication engineering organisation delivering engineered steel for India&apos;s infrastructure and industrial sectors.
          </p>
        </div>
      </div>
      <div className="px-gut border-t-2 border-acc py-5 text-[10px] font-semibold tracking-[0.1em] text-mute">© PARASMANI ENGINEERING PVT. LTD.</div>
    </footer>
  );
}
