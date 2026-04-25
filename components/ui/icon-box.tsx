import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";
type Tone = "default" | "accent" | "editorial" | "solid" | "muted";

const sizeMap: Record<Size, { box: string; icon: number; stroke: number }> = {
  sm: { box: "size-7 rounded-md", icon: 14, stroke: 1.7 },
  md: { box: "size-9 rounded-md", icon: 16, stroke: 1.7 },
  lg: { box: "size-12 rounded-lg", icon: 20, stroke: 1.6 },
};

const toneMap: Record<Tone, string> = {
  default: "bg-[var(--color-ink-50)] text-[var(--color-ink-900)]",
  accent: "bg-[var(--color-accent)] text-white",
  editorial: "bg-[var(--color-editorial)] text-white",
  solid: "bg-[var(--color-ink-900)] text-[var(--color-bg)]",
  muted: "bg-[var(--color-bg)] text-[var(--color-ink-600)] border border-[var(--color-border)]",
};

export type IconBoxProps = {
  Icon: LucideIcon;
  size?: Size;
  tone?: Tone;
  className?: string;
  ariaLabel?: string;
};

export function IconBox({
  Icon,
  size = "md",
  tone = "default",
  className,
  ariaLabel,
}: IconBoxProps) {
  const s = sizeMap[size];
  const t = toneMap[tone];

  return (
    <span
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={cn(
        "inline-grid place-items-center shrink-0",
        s.box,
        t,
        className,
      )}
    >
      <Icon size={s.icon} strokeWidth={s.stroke} />
    </span>
  );
}
