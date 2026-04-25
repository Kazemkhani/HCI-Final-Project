"use client";

import { cn } from "@/lib/utils";

export type SegmentedTab<T extends string> = {
  id: T;
  label: string;
};

export function SegmentedTabs<T extends string>({
  tabs,
  value,
  onChange,
  ariaLabel,
  size = "md",
  className,
}: {
  tabs: SegmentedTab<T>[];
  value: T;
  onChange: (id: T) => void;
  ariaLabel: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const heights =
    size === "sm"
      ? { outer: "h-8 p-0.5", inner: "h-7 px-2.5 text-[12px]" }
      : { outer: "h-9 p-1", inner: "h-7 px-3 text-[12px]" };
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex rounded-md bg-[var(--color-ink-50)] border border-[var(--color-border)]",
        heights.outer,
        className,
      )}
    >
      {tabs.map((t) => {
        const active = value === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={cn(
              "rounded-[5px] font-medium transition-colors",
              heights.inner,
              active
                ? "bg-[var(--color-ink-0)] text-[var(--color-ink-900)] shadow-[0_1px_2px_rgba(10,10,10,0.06)]"
                : "text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
