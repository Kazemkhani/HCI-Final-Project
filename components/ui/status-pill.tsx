import { cn } from "@/lib/utils";

export type StatusTone = "healthy" | "attention" | "critical";

const toneMap: Record<
  StatusTone,
  { bg: string; fg: string; dot: string; label: string }
> = {
  healthy: {
    bg: "bg-[var(--color-success-soft)]",
    fg: "text-[var(--color-success)]",
    dot: "bg-[var(--color-success)]",
    label: "On track",
  },
  attention: {
    bg: "bg-[var(--color-warning-soft)]",
    fg: "text-[var(--color-warning)]",
    dot: "bg-[var(--color-warning)]",
    label: "Attention",
  },
  critical: {
    bg: "bg-[var(--color-negative-soft)]",
    fg: "text-[var(--color-negative)]",
    dot: "bg-[var(--color-negative)]",
    label: "Critical",
  },
};

export function StatusPill({
  tone,
  label,
  className,
}: {
  tone: StatusTone;
  label?: string;
  className?: string;
}) {
  const t = toneMap[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-[22px] px-2 rounded-full text-[11px] font-medium tracking-[0.02em]",
        t.bg,
        t.fg,
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", t.dot)} />
      {label ?? t.label}
    </span>
  );
}
