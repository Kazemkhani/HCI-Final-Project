"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Info } from "lucide-react";

export function PlatformLinkButton({ label }: { label: string }) {
  const [toast, setToast] = useState<string | null>(null);

  const open = () => {
    setToast(`In production this opens the ${label.toLowerCase()} in a new tab. Prototype demo — no live link.`);
    window.setTimeout(() => setToast(null), 3500);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Open ${label}`}
        className="h-9 px-3.5 rounded-md border border-[var(--color-border)] text-[13px] font-medium text-[var(--color-ink-1)] hover:bg-[var(--color-bg)] inline-flex items-center gap-1.5"
      >
        {label}
        <ExternalLink size={12} aria-hidden />
      </button>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-md bg-[var(--color-ink-1)] text-[var(--color-bg)] text-[13px] shadow-[var(--shadow-md)] inline-flex items-center gap-2 max-w-[420px] text-center"
          >
            <Info size={13} aria-hidden />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
