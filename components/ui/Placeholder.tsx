export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center bg-bg2 p-4 text-center text-[11px] font-semibold tracking-[0.1em] text-mute ${className}`}
    >
      {label.toUpperCase()}
    </div>
  );
}
