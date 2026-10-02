import Image from "next/image";
import { Headline } from "./Headline";

type Props = {
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  intro?: string;
  introTone?: "soft" | "mute";
  /** font-size clamp for the h1 */
  size?: string;
  titleMax?: string;
  titleMargin?: string;
};

export function PageHero({
  eyebrow,
  title,
  image,
  alt,
  intro,
  introTone = "soft",
  size = "clamp(38px,5.6vw,82px)",
  titleMax,
  titleMargin = "22px 0 24px",
}: Props) {
  return (
    <section className="relative flex min-h-[clamp(420px,62vh,640px)] items-end overflow-hidden border-b-2 border-rule">
      <Image src={image} alt={alt} fill priority sizes="100vw" quality={60} className="object-cover" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(var(--bg-rgb),0.94) 0%, rgba(var(--bg-rgb),0.8) 42%, rgba(var(--bg-rgb),0.2) 78%, rgba(var(--bg-rgb),0.05) 100%)",
        }}
      />
      <div className="px-gut relative z-[1] min-w-0 max-w-[980px] py-[clamp(56px,8vw,140px)]">
        <span className="eyebrow">{eyebrow}</span>
        <Headline
          as="h1"
          words
          text={title}
          className="font-bold leading-[0.92] tracking-[-0.045em]"
          style={{ fontSize: size, margin: titleMargin, maxWidth: titleMax }}
        />
        {intro && (
          <p
            className={`m-0 max-w-[56ch] text-[clamp(15px,1.3vw,18px)] leading-[1.55] ${introTone === "soft" ? "text-soft" : "text-mute"}`}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
