import { METRICS } from "@/lib/content";
import { flags } from "@/lib/site";
import { PendingFlag } from "./PendingFlag";

/** Unverified numbers: rendered only while NEXT_PUBLIC_SHOW_PENDING=1. */
export function Metrics({ block = true }: { block?: boolean }) {
  if (!flags.showPending) return null;
  return (
    <div
      data-block={block ? "stagger" : undefined}
      className="grid border-b-2 border-rule"
      style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}
    >
      {METRICS.map((m) => (
        <div key={m.label} className="px-gut min-w-0 border-r-2 border-rule py-[clamp(28px,4vw,48px)]">
          <div className="flex flex-wrap items-baseline gap-2">
            <span data-count="1" className="text-[clamp(32px,4vw,52px)] font-bold leading-[0.92] tracking-[-0.045em]">
              {m.value}
            </span>
            <span className="text-[15px] font-semibold tracking-[0.04em] text-mute">{m.unit}</span>
          </div>
          <div className="mt-3 text-[11px] font-semibold tracking-[0.04em]">{m.label}</div>
          <div className="mt-[14px]">
            <PendingFlag />
          </div>
        </div>
      ))}
    </div>
  );
}
