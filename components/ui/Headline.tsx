import type { CSSProperties, ElementType } from "react";

type Props = {
  as?: ElementType;
  /** Plain text. Wrap highlighted words in *asterisks*. */
  text: string;
  /** Split into per-word spans (rise animation runs client-side; text stays in the HTML). */
  words?: boolean;
  className?: string;
  style?: CSSProperties;
};

function parse(text: string) {
  const out: { w: string; hl: boolean }[] = [];
  text.split("*").forEach((seg, i) => {
    seg
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => out.push({ w, hl: i % 2 === 1 }));
  });
  return out;
}

export function Headline({ as: Tag = "h2", text, words, className, style }: Props) {
  if (!words) {
    return (
      <Tag className={className} style={style}>
        {text.split("*").map((seg, i) =>
          i % 2 === 1 ? (
            <span key={i} className="text-hl">
              {seg}
            </span>
          ) : (
            seg
          ),
        )}
      </Tag>
    );
  }
  const parts = parse(text);
  return (
    <Tag className={className} style={style} data-words="1">
      {parts.map((p, i) => (
        <span key={i}>
          <span className="inline-block align-bottom overflow-hidden">
            <span data-word="1" className={`inline-block ${p.hl ? "text-hl" : ""}`}>
              {p.w}
            </span>
          </span>
          {i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
