import { flags } from "@/lib/site";

/** Renders only while NEXT_PUBLIC_SHOW_PENDING=1. */
export function PendingFlag({ children = "PENDING VERIFICATION", muted }: { children?: React.ReactNode; muted?: boolean }) {
  if (!flags.showPending) return null;
  return (
    <span
      className="pending-badge"
      style={muted ? { borderColor: "rgba(var(--ink-rgb), 0.3)", color: "var(--mute)" } : undefined}
    >
      {children}
    </span>
  );
}
