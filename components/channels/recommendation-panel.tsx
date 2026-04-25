"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Undo2 } from "lucide-react";

export function RecommendationPanel({
  title,
  evidence,
  reviewHref,
  channelId,
}: {
  title: string;
  evidence: ReactNode;
  reviewHref: string;
  channelId: string;
}) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {dismissed ? (
        <motion.section
          key="dismissed"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex items-center justify-between gap-4"
          role="status"
          aria-live="polite"
        >
          <div>
            <div className="text-[13px] font-medium text-[var(--color-ink-1)]">
              Recommendation dismissed.
            </div>
            <div className="text-[12.5px] text-[var(--color-ink-3)]">
              We&apos;ll hold off on this one. You can bring it back below.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(false)}
            className="h-9 px-3 rounded-md text-[13px] text-[var(--color-ink-1)] inline-flex items-center gap-1.5 hover:bg-[var(--color-bg)]"
          >
            <Undo2 size={13} aria-hidden />
            Undo
          </button>
        </motion.section>
      ) : (
        <motion.section
          key="active"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6 lg:p-8"
        >
          <span className="text-[11px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
            Recommendation
          </span>
          <h2 className="text-[20px] font-semibold tracking-[-0.01em] mt-1 text-[var(--color-ink-900)] leading-snug max-w-prose">
            {title}
          </h2>
          {evidence}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={reviewHref}
              className="h-10 px-4 rounded-md bg-[var(--color-accent)] text-white text-[14px] font-semibold inline-flex items-center gap-1.5 hover:translate-y-[-1px] transition-transform"
            >
              Review in Budget
            </Link>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label={`Dismiss recommendation for ${channelId}`}
              className="h-10 px-4 rounded-md text-[14px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)] hover:bg-[var(--color-bg)]"
            >
              Dismiss
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
