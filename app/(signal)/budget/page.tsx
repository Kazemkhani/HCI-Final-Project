"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Check,
  TrendingDown,
  Target,
  Sparkles,
  AlertTriangle,
  Briefcase,
  Mic,
} from "lucide-react";
import {
  CHANNEL_BY_ID,
  formatGBP,
  formatGBPCompact,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function BudgetPage() {
  return (
    <Suspense fallback={<BudgetSkeleton />}>
      <BudgetInner />
    </Suspense>
  );
}

function BudgetSkeleton() {
  return (
    <div className="max-w-[760px] mx-auto pb-12">
      <div className="h-10 w-2/3 rounded-md shimmer mb-3" />
      <div className="h-5 w-1/3 rounded-md shimmer" />
      <div className="mt-8 h-[260px] rounded-2xl shimmer" />
    </div>
  );
}

function BudgetInner() {
  const router = useRouter();
  const params = useSearchParams();
  const sourceId = params.get("source") ?? "linkedin-ads";
  const destId = params.get("dest") ?? "podcast-sponsorship";
  const initialAmount = Math.max(
    500,
    Math.min(3000, Number(params.get("amount") ?? 1800)),
  );

  const source = CHANNEL_BY_ID[sourceId];
  const dest = CHANNEL_BY_ID[destId];

  const [amount, setAmount] = useState<number>(initialAmount);
  const [openRisk, setOpenRisk] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");
  const [declineOpen, setDeclineOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  if (!source || !dest) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-[36px]">No moves to review.</h1>
        <p className="mt-2 text-[var(--color-ink-2)]">
          You&apos;ll see one here when the data warrants it.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center gap-1.5 h-10 px-4 rounded-md bg-[var(--color-ink-1)] text-[var(--color-bg)] text-[14px] font-medium"
        >
          Back to dashboard <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    );
  }

  const sourceAfter = Math.max(0, source.allocation - amount);
  const destAfter = dest.allocation + amount;

  const approve = () => {
    if (state !== "idle") return;
    setState("submitting");
    setTimeout(() => {
      setState("done");
      setTimeout(() => router.push("/dashboard"), 1100);
    }, 950);
  };

  const submitDecline = () => {
    setDeclineOpen(false);
    setToast("Decline noted. We won't suggest this move again this week.");
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="max-w-[760px] mx-auto pb-12">
      <header className="mb-8">
        <h1 className="font-display text-[36px] leading-[1.05] text-[var(--color-ink-1)]">
          A move worth making.
        </h1>
        <p className="mt-2 text-[15px] text-[var(--color-ink-2)]">
          Based on 14 days of data across your channels.
        </p>
      </header>

      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6 sm:p-8">
        <FlowVisual
          sourceName={source.name}
          sourceBefore={source.allocation}
          sourceAfter={sourceAfter}
          destName={dest.name}
          destBefore={dest.allocation}
          destAfter={destAfter}
          amount={amount}
          SourceIcon={Briefcase}
          DestIcon={Mic}
        />

        <div className="mt-8">
          <div className="flex items-center justify-between text-[12px] text-[var(--color-ink-3)] mb-2">
            <label htmlFor="amount" className="font-mono uppercase tracking-[0.06em]">
              Amount to move
            </label>
            <span className="font-mono tabular-nums text-[var(--color-ink-1)] text-[14px]">
              {formatGBP(amount).replace(".00", "")} / mo
            </span>
          </div>
          <input
            id="amount"
            type="range"
            min={500}
            max={3000}
            step={50}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            aria-label="Amount to reallocate"
            className="w-full accent-[var(--color-accent)]"
          />
          <div className="flex justify-between text-[11px] text-[var(--color-ink-3)] font-mono mt-1.5">
            <span>£500</span>
            <span>£1.5k</span>
            <span>£3k</span>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6 sm:p-8">
        <h2 className="text-[12px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
          Why we&apos;d do this
        </h2>
        <ul className="mt-4 space-y-4">
          <Evidence
            Icon={TrendingDown}
            headline="Cheaper acquisition by 2.2×"
            body={`Podcast cost per signup is £8.58 vs LinkedIn £18.75 across the last 14 days. Even a partial move pays back in week one.`}
          />
          <Evidence
            Icon={Target}
            headline="Closer-matched audience"
            body={`Podcast audience match is 88 vs 72 — your founders and operators index higher there.`}
          />
          <Evidence
            Icon={Sparkles}
            headline="Trends are pulling apart"
            body={`Podcast signups +14% week-on-week, LinkedIn -8%. The longer you wait, the less the move is worth.`}
          />
        </ul>
      </section>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenRisk((s) => !s)}
          aria-expanded={openRisk}
          className="w-full px-6 sm:px-8 py-4 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <span className="size-7 rounded-md grid place-items-center bg-[var(--color-bg)] text-[var(--color-ink-1)]">
              <AlertTriangle size={14} strokeWidth={1.7} aria-hidden />
            </span>
            <div>
              <div className="text-[14px] font-medium">Things to watch</div>
              <div className="text-[12.5px] text-[var(--color-ink-3)]">
                Two caveats before you approve.
              </div>
            </div>
          </div>
          <ChevronDown
            size={14}
            aria-hidden
            className={cn(
              "transition-transform text-[var(--color-ink-3)]",
              openRisk && "rotate-180",
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {openRisk && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <ul className="px-6 sm:px-8 pb-6 space-y-3 text-[13.5px] text-[var(--color-ink-2)]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 rounded-full bg-[var(--color-ink-3)] shrink-0" />
                  Podcast inventory books two weeks out — there&apos;s an
                  execution lag before this spend lands.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1 rounded-full bg-[var(--color-ink-3)] shrink-0" />
                  LinkedIn Ads serves your retargeting lists. Don&apos;t reduce
                  below £2,000/mo or your retarget audience decays.
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="mt-8 sticky bottom-6">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] px-4 py-3">
          <button
            type="button"
            onClick={() => setDeclineOpen(true)}
            className="h-10 px-2 text-[13px] text-[var(--color-ink-3)] hover:text-[var(--color-ink-1)]"
          >
            Decline
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAdjustOpen((s) => !s)}
              className="h-10 px-3 rounded-md text-[13px] text-[var(--color-ink-1)] hover:bg-[var(--color-bg)]"
            >
              {adjustOpen ? "Done adjusting" : "Adjust"}
            </button>
            <AnimatePresence mode="wait" initial={false}>
              {state === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-10 px-4 rounded-md bg-[var(--color-accent)] text-white text-[13.5px] font-medium inline-flex items-center gap-2"
                >
                  <Check size={14} strokeWidth={2.4} aria-hidden />
                  Done. I&apos;ll watch it for 7 days.
                </motion.div>
              ) : (
                <motion.button
                  key="approve"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="button"
                  onClick={approve}
                  disabled={state === "submitting"}
                  aria-busy={state === "submitting"}
                  className={cn(
                    "h-10 px-4 rounded-md bg-[var(--color-accent)] text-white text-[13.5px] font-semibold inline-flex items-center gap-1.5",
                    state === "submitting" && "opacity-90",
                  )}
                >
                  {state === "submitting" ? (
                    <>Approving…</>
                  ) : (
                    <>
                      Approve move <ArrowRight size={14} aria-hidden />
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {declineOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 grid place-items-center z-50 p-4"
            onClick={() => setDeclineOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-surface)] rounded-2xl shadow-[var(--shadow-md)] p-6 max-w-[420px] w-full"
            >
              <h3 className="font-display text-[20px] text-[var(--color-ink-1)]">
                Why are you declining?
              </h3>
              <p className="mt-1 text-[13px] text-[var(--color-ink-2)]">
                We&apos;ll learn from this for the next suggestion.
              </p>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Tell us in one line — &quot;I want to wait a week&quot; works."
                rows={3}
                className="mt-4 w-full rounded-md border border-[var(--color-border)] p-3 text-[14px] focus:outline-none focus:border-[var(--color-ink-2)]"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeclineOpen(false)}
                  className="h-9 px-3 text-[13px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitDecline}
                  className="h-9 px-3 rounded-md bg-[var(--color-ink-1)] text-[var(--color-bg)] text-[13px] font-medium"
                >
                  Confirm decline
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-md bg-[var(--color-ink-1)] text-[var(--color-bg)] text-[13px] shadow-[var(--shadow-md)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FlowVisual({
  sourceName,
  sourceBefore,
  sourceAfter,
  destName,
  destBefore,
  destAfter,
  amount,
  SourceIcon,
  DestIcon,
}: {
  sourceName: string;
  sourceBefore: number;
  sourceAfter: number;
  destName: string;
  destBefore: number;
  destAfter: number;
  amount: number;
  SourceIcon: typeof Briefcase;
  DestIcon: typeof Mic;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-5 sm:gap-3 items-center">
      <FlowNode
        Icon={SourceIcon}
        name={sourceName}
        before={sourceBefore}
        after={sourceAfter}
        tone="from"
      />

      <div className="flex flex-col items-center justify-center gap-2 py-2">
        <svg
          width="120"
          height="40"
          viewBox="0 0 120 40"
          aria-hidden
          className="hidden sm:block"
        >
          <motion.path
            d="M2 20 H 110"
            stroke="var(--color-ink-3)"
            strokeWidth={1.4}
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <motion.path
            d="M104 14 L 116 20 L 104 26"
            stroke="var(--color-ink-1)"
            strokeWidth={1.4}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono tabular-nums text-[20px] text-[var(--color-ink-1)] font-medium"
        >
          {formatGBPCompact(amount)}
          <span className="text-[12px] text-[var(--color-ink-3)] ml-1">/ mo</span>
        </motion.div>
      </div>

      <FlowNode
        Icon={DestIcon}
        name={destName}
        before={destBefore}
        after={destAfter}
        tone="to"
      />
    </div>
  );
}

function FlowNode({
  Icon,
  name,
  before,
  after,
  tone,
}: {
  Icon: typeof Briefcase;
  name: string;
  before: number;
  after: number;
  tone: "from" | "to";
}) {
  const colour =
    tone === "from" ? "var(--color-ink-1)" : "var(--color-accent)";
  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4">
      <div className="flex items-center gap-2.5">
        <div
          className="size-8 rounded-md grid place-items-center text-white"
          style={{ background: colour }}
          aria-hidden
        >
          <Icon size={15} strokeWidth={1.7} />
        </div>
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
            {tone === "from" ? "From" : "To"}
          </div>
          <div className="text-[13px] font-medium text-[var(--color-ink-1)] leading-tight">
            {name}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2 font-mono tabular-nums">
        <span className="text-[12px] text-[var(--color-ink-3)] line-through">
          {formatGBPCompact(before)}
        </span>
        <ArrowRight size={11} className="text-[var(--color-ink-3)]" aria-hidden />
        <span className="text-[18px] text-[var(--color-ink-1)] font-medium">
          {formatGBPCompact(after)}
        </span>
        <span className="text-[10px] text-[var(--color-ink-3)] uppercase tracking-[0.08em]">
          / mo
        </span>
      </div>
    </article>
  );
}

function Evidence({
  Icon,
  headline,
  body,
}: {
  Icon: typeof TrendingDown;
  headline: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="size-7 rounded-md grid place-items-center bg-[var(--color-bg)] text-[var(--color-ink-1)] shrink-0"
        aria-hidden
      >
        <Icon size={14} strokeWidth={1.6} />
      </span>
      <div>
        <div className="text-[14px] font-medium text-[var(--color-ink-1)]">
          {headline}
        </div>
        <p className="text-[13px] text-[var(--color-ink-2)] leading-snug">
          {body}
        </p>
      </div>
    </li>
  );
}
