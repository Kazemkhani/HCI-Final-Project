"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Users,
  PoundSterling,
  Megaphone,
  Sparkles,
  CalendarCheck,
  ArrowLeft,
  ArrowRight,
  Plus,
  Check,
} from "lucide-react";
import { useBriefStore } from "@/lib/brief-store";
import {
  STAGE_OPTIONS,
  AUDIENCE_OPTIONS,
  GOAL_OPTIONS,
  formatGBPCompact,
  type AudienceOption,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const stepTitles = [
  "Where are you?",
  "How much per month?",
  "Who are you trying to reach?",
  "What are you optimising for?",
];

const stepSubs = [
  "So we can match the channels that work at your scale.",
  "We'll split it across the channels most likely to pay back.",
  "Pick any that apply, or add your own.",
  "This decides how we measure success.",
];

const goalIcons = {
  awareness: Megaphone,
  signups: Sparkles,
  conversions: PoundSterling,
  attendance: CalendarCheck,
} as const;

export default function BriefPage() {
  const router = useRouter();
  const {
    stage,
    budget,
    audiences,
    customAudience,
    goal,
    step,
    setStage,
    setBudget,
    toggleAudience,
    setCustomAudience,
    setGoal,
    setStep,
    markLaunched,
  } = useBriefStore();

  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [otherInput, setOtherInput] = useState("");

  useEffect(() => setHydrated(true), []);

  const next = () => {
    if (step < 4) setStep(((step as number) + 1) as 1 | 2 | 3 | 4);
  };
  const back = () => {
    if (step > 1) setStep(((step as number) - 1) as 1 | 2 | 3 | 4);
  };

  const submit = () => {
    if (submitting) return;
    setSubmitting(true);
    markLaunched();
    setTimeout(() => router.push("/channels"), 700);
  };

  const totalAudiences = useMemo(() => {
    const arr = [...audiences];
    if (customAudience) arr.push(customAudience as AudienceOption);
    return arr;
  }, [audiences, customAudience]);

  const canContinue =
    step === 1
      ? !!stage
      : step === 2
        ? budget >= 500
        : step === 3
          ? totalAudiences.length > 0
          : !!goal;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-[560px]">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[12px] text-[var(--color-ink-3)] tracking-[0.06em]">
            STEP {step} OF 4
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((n) => (
              <span
                key={n}
                className={cn(
                  "h-[3px] w-8 rounded-full transition-colors",
                  n <= step
                    ? "bg-[var(--color-ink-1)]"
                    : "bg-[var(--color-border)]",
                )}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-8 md:p-10">
          {hydrated && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              >
                <h1 className="font-display text-[32px] leading-[1.1] text-[var(--color-ink-1)]">
                  {stepTitles[step - 1]}
                </h1>
                <p className="mt-2 text-[15px] text-[var(--color-ink-2)]">
                  {stepSubs[step - 1]}
                </p>

                <div className="mt-8">
                  {step === 1 && (
                    <div className="flex flex-wrap gap-2">
                      {STAGE_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStage(s)}
                          className={cn(
                            "h-10 px-4 rounded-md border text-[14px] font-medium transition-all",
                            stage === s
                              ? "bg-[var(--color-ink-1)] text-[var(--color-bg)] border-[var(--color-ink-1)]"
                              : "bg-[var(--color-surface)] text-[var(--color-ink-1)] border-[var(--color-border)] hover:border-[var(--color-ink-2)]",
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <BudgetSlider value={budget} onChange={setBudget} />
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {AUDIENCE_OPTIONS.map((a) => {
                          const selected = audiences.includes(a);
                          return (
                            <button
                              key={a}
                              type="button"
                              onClick={() => toggleAudience(a)}
                              className={cn(
                                "h-10 px-4 rounded-md border text-[14px] font-medium transition-all inline-flex items-center gap-1.5",
                                selected
                                  ? "bg-[var(--color-ink-1)] text-[var(--color-bg)] border-[var(--color-ink-1)]"
                                  : "bg-[var(--color-surface)] text-[var(--color-ink-1)] border-[var(--color-border)] hover:border-[var(--color-ink-2)]",
                              )}
                            >
                              {selected && (
                                <Check size={13} strokeWidth={2.4} aria-hidden />
                              )}
                              {a}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <input
                          type="text"
                          value={otherInput}
                          onChange={(e) => setOtherInput(e.target.value)}
                          placeholder="Other audience…"
                          aria-label="Other audience"
                          className="flex-1 h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[14px] focus:outline-none focus:border-[var(--color-ink-2)]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (otherInput.trim()) {
                              setCustomAudience(otherInput.trim());
                              setOtherInput("");
                            }
                          }}
                          className="h-10 px-4 rounded-md border border-[var(--color-border)] text-[14px] font-medium text-[var(--color-ink-1)] hover:bg-[var(--color-bg)] inline-flex items-center gap-1.5"
                        >
                          <Plus size={14} aria-hidden /> Add
                        </button>
                      </div>
                      {customAudience && (
                        <div className="text-[13px] text-[var(--color-ink-2)]">
                          Custom: <span className="text-[var(--color-ink-1)] font-medium">{customAudience}</span>{" "}
                          <button
                            type="button"
                            onClick={() => setCustomAudience("")}
                            className="underline text-[var(--color-ink-3)] hover:text-[var(--color-ink-1)]"
                          >
                            remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 4 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {GOAL_OPTIONS.map((g) => {
                        const Icon = goalIcons[g.id];
                        const selected = goal === g.id;
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setGoal(g.id)}
                            className={cn(
                              "text-left p-4 rounded-xl border transition-all flex items-start gap-3",
                              selected
                                ? "border-[var(--color-ink-1)] bg-[var(--color-bg)]"
                                : "border-[var(--color-border)] hover:border-[var(--color-ink-2)]",
                            )}
                          >
                            <div
                              className={cn(
                                "size-9 rounded-md grid place-items-center shrink-0",
                                selected
                                  ? "bg-[var(--color-ink-1)] text-[var(--color-bg)]"
                                  : "bg-[var(--color-bg)] text-[var(--color-ink-1)]",
                              )}
                            >
                              <Icon size={16} strokeWidth={1.75} aria-hidden />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[15px] font-medium">
                                {g.label}
                              </div>
                              <div className="text-[13px] text-[var(--color-ink-2)] mt-0.5">
                                {g.blurb}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className={cn(
                "h-10 px-3 inline-flex items-center gap-1.5 text-[14px] font-medium rounded-md transition-colors",
                step === 1
                  ? "text-[var(--color-ink-3)] cursor-not-allowed"
                  : "text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]",
              )}
            >
              <ArrowLeft size={14} aria-hidden /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                disabled={!canContinue}
                className={cn(
                  "h-10 px-4 inline-flex items-center gap-1.5 text-[14px] font-medium rounded-md transition-all",
                  canContinue
                    ? "bg-[var(--color-ink-1)] text-[var(--color-bg)] hover:translate-x-px"
                    : "bg-[var(--color-bg)] text-[var(--color-ink-3)] cursor-not-allowed",
                )}
              >
                Next <ArrowRight size={14} aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={!canContinue || submitting}
                aria-busy={submitting}
                className={cn(
                  "relative h-10 px-5 inline-flex items-center gap-1.5 text-[14px] font-semibold rounded-md transition-all",
                  "bg-[var(--color-accent)] text-white",
                  submitting && "shadow-[0_0_0_4px_rgba(16,185,129,0.18)]",
                  !canContinue && "opacity-50 cursor-not-allowed",
                )}
              >
                {submitting ? (
                  <>
                    <Target size={14} aria-hidden /> Mixing channels…
                  </>
                ) : (
                  <>
                    Propose my channel mix <ArrowRight size={14} aria-hidden />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-[12px] text-[var(--color-ink-3)]">
          We use this to plan, not to send anything anywhere.
        </div>
      </div>
    </div>
  );
}

function BudgetSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const min = 500;
  const max = 50000;
  const step = 250;
  const ticks = [1000, 5000, 10000, 25000];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="font-mono text-[44px] sm:text-[48px] leading-none text-[var(--color-ink-1)] tabular-nums">
          {formatGBPCompact(value)}
        </div>
        <div className="text-[12px] text-[var(--color-ink-3)] mt-1">
          per month
        </div>
      </div>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Monthly budget"
          className="w-full accent-[var(--color-accent)]"
        />
        <div className="flex justify-between mt-3 text-[11px] text-[var(--color-ink-3)] font-mono">
          {ticks.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onChange(t)}
              className="hover:text-[var(--color-ink-1)] transition-colors"
            >
              {formatGBPCompact(t)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
