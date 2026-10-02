import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { MACHINES, alt, img } from "@/lib/content";
import { Headline } from "@/components/ui/Headline";
import { Crumbs } from "@/components/ui/Crumbs";
import { Metrics } from "@/components/ui/Metrics";
import { PendingFlag } from "@/components/ui/PendingFlag";

export const metadata = buildMetadata({
  title: "Fabrication Plant & Machinery",
  description:
    "See the Parasmani Engineering plant: CNC plasma cutting, beam-line drilling, SAW welding lines, shot blasting, a painting bay and a twin-beam gantry crane.",
  path: "/facility",
});

export default function FacilityPage() {
  return (
    <div data-anim="screen">
      <Crumbs trail={[{ name: "About", path: "/about" }, { name: "Facility", path: "/facility" }]} />
      <section className="relative flex min-h-[clamp(320px,42vw,500px)] items-end border-b-2 border-rule">
        <Image
          src={img("A")}
          alt={alt("A")}
          fill
          priority
          sizes="100vw"
          quality={60}
          className="object-cover"
        />
        <div className="px-gut relative max-w-[720px] border-r-2 border-t-2 border-rule bg-bg py-[clamp(32px,4vw,64px)]">
          <span className="eyebrow">FACILITY</span>
          <Headline
            as="h1"
            words
            text="WHERE ENGINEERING BECOMES *REAL.*"
            className="mb-0 mt-[18px] font-bold leading-[0.92] tracking-[-0.045em]"
            style={{ fontSize: "clamp(30px,4.4vw,64px)" }}
          />
        </div>
      </section>

      <Metrics />

      <div data-block="one" className="px-gut pt-[clamp(48px,7vw,120px)]">
        <Headline as="h2" text="PLANT & *MACHINERY*" className="h-sec mb-[14px]" />
        <p className="mb-[clamp(28px,4vw,48px)] mt-0 max-w-[54ch] text-[16px] leading-[1.55] text-mute">
          Machine specifications are published only once verified against the asset register.
        </p>
      </div>
      <ul data-block="stagger" className="m-0 grid list-none border-t-2 border-rule bg-bg p-0" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
        {MACHINES.map((m) => (
          <li key={m.name} className="min-w-0 border-b-2 border-r-2 border-rule">
            <div className="relative h-[clamp(150px,16vw,200px)]">
              <Image src={m.img} alt={m.alt} fill sizes="(min-width:1200px) 25vw, (min-width:700px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="border-t-2 border-rule px-[clamp(16px,2.5vw,28px)] py-[22px]">
              <h3 className="m-0 text-[16px] font-bold leading-[1.2] tracking-[-0.015em]">{m.name}</h3>
              <p className="mb-0 mt-[10px] text-[13px] leading-[1.5] text-mute">{m.fn}</p>
              <div className="mt-[14px]">
                <PendingFlag muted>SPECIFICATIONS PENDING VERIFICATION</PendingFlag>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
