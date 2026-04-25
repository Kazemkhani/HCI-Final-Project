"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type MetricTileProps = {
  label: string;
  value: string;
  delta?: { value: number; positiveIsGood: boolean; suffix?: string };
  hint?: string;
  spark?: React.ReactNode;
  progress?: { value: number; max: number };
  Icon?: LucideIcon;
  index?: number;
};

export function MetricTile({
  label,
  value,
  delta,
  hint,
  spark,
  progress,
  Icon,
  index = 0,
}: MetricTileProps) {
  const isPositive = delta ? delta.value > 0 : false;
  const isGood = delta
    ? (isPositive && delta.positiveIsGood) ||
      (!isPositive && !delta.positiveIsGood)
    : true;

  return (
    <motion.article
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.05 }}
      className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-5 overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="text-[10.5px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
          {label}
        </span>
        {Icon && (
          <Icon
            size={14}
            strokeWidth={1.6}
            className="text-[var(--color-ink-3)]"
            aria-hidden
          />
        )}
      </div>

      <div className="font-mono text-[30px] tabular-nums leading-none text-[var(--color-ink-1)]">
        {value}
      </div>

      {(delta || hint) && (
        <div className="mt-2 flex items-center gap-2 text-[12px]">
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium",
                isGood
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-negative)]",
              )}
            >
              {isPositive ? (
                <ArrowUpRight size={13} strokeWidth={2.2} aria-hidden />
              ) : (
                <ArrowDownRight size={13} strokeWidth={2.2} aria-hidden />
              )}
              <span className="tabular-nums">
                {Math.abs(delta.value)}
                {delta.suffix ?? "%"}
              </span>
            </span>
          )}
          {hint && (
            <span className="text-[var(--color-ink-3)]">{hint}</span>
          )}
        </div>
      )}

      {progress && (
        <div className="mt-4">
          <div className="h-1.5 rounded-full bg-[var(--color-bg)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, (progress.value / progress.max) * 100)}%`,
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="h-full bg-[var(--color-ink-1)]"
            />
          </div>
        </div>
      )}

      {spark && (
        <div className="mt-4 -mx-5 -mb-5 px-1 pt-2 pb-1 h-12 flex items-end">
          {spark}
        </div>
      )}
    </motion.article>
  );
}
