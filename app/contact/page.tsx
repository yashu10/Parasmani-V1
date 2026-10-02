import { buildMetadata, orgAddressLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { alt, img } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Headline } from "@/components/ui/Headline";
import { Crumbs } from "@/components/ui/Crumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Placeholder } from "@/components/ui/Placeholder";
import { RfqForm } from "@/components/RfqForm";

export const metadata = buildMetadata({
  title: "Contact & Request a Quote",
  description:
    "Send drawings, BOQ and tonnage to Parasmani Engineering for a detailed quote. Works and registered office at Village Vani, Viramgam, Ahmedabad, Gujarat 382150.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "Contact", path: "/contact" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Parasmani Engineering",
          url: `${SITE.url}/contact`,
          mainEntity: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
            email: SITE.email,
            telephone: "+919879795382",
            address: orgAddressLd,
          },
        }}
      />
      <PageHero
        eyebrow="CONTACT"
        title="LET'S ENGINEER YOUR *NEXT PROJECT.*"
        image={img("Z")}
        alt={alt("Z")}
        intro="Share your project requirements, drawings or BOQ and our team can review the scope."
        size="clamp(34px,5vw,72px)"
        titleMax="22ch"
      />

      <section className="grid border-b-2 border-rule bg-bg" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))" }}>
        <div data-block="one" className="px-gut relative min-w-0 border-r-2 border-rule py-[clamp(40px,5vw,80px)]">
          <Headline as="h2" text="REQUEST FOR *QUOTE*" className="mb-[clamp(24px,3vw,36px)] mt-0 text-[clamp(20px,2.4vw,28px)] font-bold tracking-[-0.025em]" />
          <RfqForm />
        </div>
        <div data-block="one" className="min-w-0">
          <div className="px-gut border-b-2 border-rule py-[clamp(32px,4vw,56px)]">
            <h2 className="m-0 text-[11px] font-semibold tracking-[0.14em] text-acc">WORKS &amp; REGISTERED OFFICE</h2>
            <address className="mb-0 mt-[18px] max-w-[38ch] text-[16px] not-italic leading-[1.6]">
              {SITE.name}
              <br />
              {SITE.address.street},
              <br />
              {SITE.address.district}, {SITE.address.region} {SITE.address.postal}, India
            </address>
          </div>
          <div className="grid border-b-2 border-rule" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
            <div className="px-gut min-w-0 border-r-2 border-rule py-[clamp(32px,4vw,56px)]">
              <h2 className="m-0 text-[11px] font-semibold tracking-[0.14em] text-acc">PHONE</h2>
              <a href={SITE.phoneHref} className="mt-4 block text-[clamp(17px,1.9vw,22px)] font-bold tracking-[-0.02em]">
                {SITE.phone}
              </a>
            </div>
            <div className="px-gut min-w-0 py-[clamp(32px,4vw,56px)]">
              <h2 className="m-0 text-[11px] font-semibold tracking-[0.14em] text-acc">EMAIL</h2>
              <a href={`mailto:${SITE.email}`} className="mt-4 block break-all text-[15px] font-bold tracking-[-0.01em]">
                {SITE.email}
              </a>
            </div>
          </div>
          <Placeholder label="Works location map / gate photograph — to be supplied" className="h-[clamp(260px,30vw,380px)]" />
        </div>
      </section>
    </div>
  );
}
