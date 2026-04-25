"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Target,
  Type as TypeIcon,
  AlertCircle,
  Wand2,
  CircleStop,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Flag = {
  type: "self-focus" | "hedge" | "jargon" | "feature-over-benefit" | "length";
  phrase: string;
  fix: string;
};

type ClarityResult = {
  score: number;
  selfFocusCount: number;
  benefitMentionCount: number;
  readingAge: number;
  flags: Flag[];
  rewrite: string;
};

const FLAG_LABEL: Record<Flag["type"], string> = {
  "self-focus": "Talks about you",
  hedge: "Hedge",
  jargon: "Jargon",
  "feature-over-benefit": "Feature, not benefit",
  length: "Too long",
};

const EXAMPLES = [
  {
    label: "Generic SaaS",
    copy:
      "Acme is a leading workflow platform that empowers teams to leverage their full potential through cutting-edge AI orchestration. Sign up today.",
  },
  {
    label: "Tighter",
    copy:
      "Cut your weekly status updates from two hours to ten minutes. Acme writes them for you. Free for the first month.",
  },
];

export default function CopyPage() {
  const [copy, setCopy] = useState("");
  const [goal, setGoal] = useState("user signups");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClarityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const score = async () => {
    if (!copy.trim() || loading) return;
    setError(null);
    setResult(null);
    setLoading(true);
    const ac = new AbortController();
    setController(ac);
    try {
      const res = await fetch("/api/clarity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ copy, goal }),
        signal: ac.signal,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Couldn't read this one.");
      setResult(data as ClarityResult);
    } catch (e) {
      if ((e as { name?: string }).name === "AbortError") return;
      setError(
        (e as Error).message ?? "Couldn't read this one. Try again in a moment.",
      );
    } finally {
      setLoading(false);
      setController(null);
    }
  };

  const cancel = () => {
    controller?.abort();
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6">
        <header className="mb-5">
          <h1 className="font-display text-[28px] text-[var(--color-ink-1)]">
            Will it land?
          </h1>
          <p className="mt-1 text-[14px] text-[var(--color-ink-2)]">
            Paste your ad copy. We&apos;ll score it on clarity, self-focus, and
            audience benefit, then rewrite it.
          </p>
        </header>

        <div className="mb-3 flex items-center justify-between gap-3">
          <label htmlFor="goal" className="text-[12px] text-[var(--color-ink-3)] font-mono uppercase tracking-[0.06em]">
            Goal
          </label>
          <select
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="h-8 px-2 rounded-md border border-[var(--color-border)] text-[13px] bg-[var(--color-surface)]"
          >
            <option value="brand awareness">Brand awareness</option>
            <option value="user signups">User signups</option>
            <option value="paid conversions">Paid conversions</option>
            <option value="event attendance">Event attendance</option>
          </select>
        </div>

        <textarea
          value={copy}
          onChange={(e) => setCopy(e.target.value)}
          rows={10}
          placeholder="Paste your ad copy here. Short or long, doesn't matter."
          aria-label="Ad copy"
          className="w-full min-h-[260px] rounded-md border border-[var(--color-border)] p-4 text-[15px] leading-relaxed focus:outline-none focus:border-[var(--color-ink-2)] resize-y"
        />

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => setCopy(ex.copy)}
                className="text-[12px] px-2.5 h-7 rounded-md border border-dashed border-[var(--color-border)] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]"
              >
                {ex.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {loading && (
              <button
                type="button"
                onClick={cancel}
                className="h-9 px-3 text-[13px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)] inline-flex items-center gap-1.5"
              >
                <CircleStop size={13} aria-hidden /> Cancel
              </button>
            )}
            <button
              type="button"
              onClick={score}
              disabled={!copy.trim() || loading}
              className={cn(
                "h-10 px-4 rounded-md bg-[var(--color-ink-1)] text-[var(--color-bg)] text-[14px] font-semibold inline-flex items-center gap-1.5",
                (!copy.trim() || loading) && "opacity-60 cursor-not-allowed",
              )}
            >
              {loading ? (
                <>
                  <Sparkles size={14} className="animate-pulse" aria-hidden />
                  Scoring…
                </>
              ) : (
                <>
                  Score it <Sparkles size={14} aria-hidden />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      <section
        aria-live="polite"
        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6 min-h-[420px]"
      >
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <AlertCircle
                size={20}
                className="text-[var(--color-negative)] mb-3"
                aria-hidden
              />
              <p className="text-[14px] text-[var(--color-ink-1)] max-w-xs">
                {error}
              </p>
              <button
                type="button"
                onClick={score}
                className="mt-4 h-9 px-3 rounded-md text-[13px] text-[var(--color-ink-1)] underline"
              >
                Try again
              </button>
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="h-[120px] w-[120px] mx-auto rounded-full shimmer" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 rounded-md shimmer" />
                <div className="h-16 rounded-md shimmer" />
                <div className="h-16 rounded-md shimmer" />
              </div>
              <div className="h-20 rounded-md shimmer" />
              <div className="h-32 rounded-md shimmer" />
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <ScoreDial value={result.score} />

              <div className="grid grid-cols-3 gap-3">
                <Stat
                  label="Talks about you"
                  value={result.selfFocusCount}
                  bad={result.selfFocusCount > 2}
                />
                <Stat
                  label="Talks about them"
                  value={result.benefitMentionCount}
                  bad={result.benefitMentionCount === 0}
                  good={result.benefitMentionCount >= 2}
                />
                <Stat
                  label="Reading age"
                  value={result.readingAge}
                  bad={result.readingAge > 14}
                />
              </div>

              {result.flags.length > 0 && (
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)] mb-2">
                    What to fix
                  </h3>
                  <ul className="space-y-2">
                    {result.flags.map((f, i) => (
                      <li
                        key={`${f.type}-${i}`}
                        className="rounded-md border border-[var(--color-border)] p-3"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10.5px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
                            {FLAG_LABEL[f.type] ?? f.type}
                          </span>
                        </div>
                        <div className="text-[13.5px] text-[var(--color-ink-1)]">
                          <span className="bg-[var(--color-warning-soft,#FEF3C7)] px-1 py-0.5 rounded">
                            “{f.phrase}”
                          </span>
                        </div>
                        <p className="mt-1.5 text-[13px] text-[var(--color-ink-2)]">
                          {f.fix}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.rewrite && (
                <div className="rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-bg)]/40">
                  <div className="flex items-center gap-1.5 mb-2 text-[11px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
                    <Wand2 size={11} aria-hidden /> Claude&apos;s rewrite
                  </div>
                  <p className="font-display text-[18px] leading-snug text-[var(--color-ink-1)]">
                    {result.rewrite}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center py-12 max-w-sm mx-auto"
            >
              <TypeIcon
                size={20}
                className="text-[var(--color-ink-3)] mb-3"
                aria-hidden
              />
              <h2 className="font-display text-[22px] text-[var(--color-ink-1)]">
                Try a line.
              </h2>
              <p className="mt-2 text-[13px] text-[var(--color-ink-2)]">
                We score self-focus, hedging, jargon, and feature-versus-benefit
                framing. Nothing is sent until you click Score.
              </p>
              <div className="mt-5 flex flex-col gap-2 w-full">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    onClick={() => setCopy(ex.copy)}
                    className="text-left rounded-md border border-[var(--color-border)] p-3 hover:bg-[var(--color-bg)]/60"
                  >
                    <div className="text-[10.5px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)] mb-1">
                      {ex.label}
                    </div>
                    <div className="text-[13px] text-[var(--color-ink-2)] leading-snug">
                      {ex.copy.slice(0, 100)}
                      {ex.copy.length > 100 ? "…" : ""}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function ScoreDial({ value }: { value: number }) {
  const colour =
    value < 40
      ? "var(--color-negative)"
      : value < 70
        ? "#B45309"
        : "var(--color-accent)";
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(100, value)) / 100);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={140} height={140} viewBox="0 0 140 140">
          <circle
            cx={70}
            cy={70}
            r={r}
            stroke="var(--color-border)"
            strokeWidth={6}
            fill="none"
          />
          <motion.circle
            cx={70}
            cy={70}
            r={r}
            stroke={colour}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            fill="none"
            transform="rotate(-90 70 70)"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <CountUp value={value} className="font-mono text-[34px] tabular-nums leading-none" />
            <div className="text-[10.5px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)] mt-1">
              Clarity
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 text-[12.5px] text-[var(--color-ink-2)] inline-flex items-center gap-1.5">
        <Target size={12} aria-hidden />
        {value < 40 ? "Rebuild" : value < 70 ? "Needs work" : "Publishable"}
      </div>
    </div>
  );
}

function CountUp({ value, className }: { value: number; className?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {value}
    </motion.span>
  );
}

function Stat({
  label,
  value,
  good,
  bad,
}: {
  label: string;
  value: number;
  good?: boolean;
  bad?: boolean;
}) {
  const colour = good
    ? "text-[var(--color-accent)]"
    : bad
      ? "text-[var(--color-negative)]"
      : "text-[var(--color-ink-1)]";
  return (
    <div className="rounded-md border border-[var(--color-border)] p-3">
      <div className="text-[10.5px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
        {label}
      </div>
      <div className={cn("font-mono tabular-nums text-[24px] mt-1", colour)}>
        {value}
      </div>
    </div>
  );
}
