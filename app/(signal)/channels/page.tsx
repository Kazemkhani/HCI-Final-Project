"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHydrated } from "@/lib/use-hydrated";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Mic,
  Search,
  Users,
  Newspaper,
  ArrowRight,
  Pencil,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useBriefStore } from "@/lib/brief-store";
import { useMixStore, useMixTotal } from "@/lib/mix-store";
import {
  CHANNELS,
  CHANNEL_SERIES,
  GOAL_OPTIONS,
  TYPE_LABEL,
  formatGBP,
  formatGBPCompact,
} from "@/lib/mock-data";
import { IconBox } from "@/components/ui/icon-box";
import { Disclosure } from "@/components/ui/disclosure";
import { RadialScore } from "@/components/dashboard/radial-score";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Mic,
  Search,
  Users,
  Newspaper,
};

const typeTone: Record<string, "solid" | "editorial" | "accent"> = {
  digital: "solid",
  physical: "editorial",
  hybrid: "accent",
};

export default function ChannelMixPage() {
  const router = useRouter();
  const { stage, budget, audiences, customAudience, goal, launched } =
    useBriefStore();
  const allocations = useMixStore((s) => s.allocations);
  const setAllocation = useMixStore((s) => s.setAllocation);
  const total = useMixTotal();
  const hydrated = useHydrated();
  const [launching, setLaunching] = useState(false);

  if (hydrated && !launched) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-[36px] text-[var(--color-ink-900)]">
          Start with a brief first.
        </h1>
        <p className="mt-2 text-[14px] text-[var(--color-ink-600)] max-w-sm">
          We need a few details about your campaign before we can suggest a
          mix.
        </p>
        <Link
          href="/brief"
          className="mt-6 inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-[var(--color-ink-900)] text-[var(--color-bg)] text-[13.5px] font-medium"
        >
          Build the brief <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    );
  }

  const goalLabel = GOAL_OPTIONS.find((g) => g.id === goal)?.label ?? "—";
  const audienceLabel =
    [...audiences, customAudience].filter(Boolean).join(", ") || "—";

  const handleLaunch = () => {
    if (launching) return;
    setLaunching(true);
    setTimeout(() => router.push("/dashboard"), 1100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 pb-32">
      <aside className="md:sticky md:top-8 self-start">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-ink-0)] p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="t-meta text-[var(--color-ink-400)]">
              Your brief
            </span>
            <Link
              href="/brief"
              className="text-[12px] text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] inline-flex items-center gap-1"
            >
              <Pencil size={12} aria-hidden /> Edit
            </Link>
          </div>
          <dl className="space-y-2.5 text-[13px]">
            <Row label="Stage" value={stage} />
            <Row
              label="Budget"
              value={`${formatGBPCompact(budget)} / month`}
            />
            <Row label="Audience" value={audienceLabel} />
            <Row label="Goal" value={goalLabel} />
          </dl>

          <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between mb-3">
              <span className="t-meta text-[var(--color-ink-400)]">
                Proposed mix
              </span>
              <span className="font-mono tabular-nums text-[12px] text-[var(--color-ink-900)]">
                {formatGBP(total)} / mo
              </span>
            </div>
            <MixBar allocations={allocations} total={total} />
            <ul className="mt-3 space-y-1.5">
              {CHANNELS.map((c) => {
                const v = allocations[c.id] ?? c.allocation;
                const pct = Math.round((v / total) * 100);
                return (
                  <li
                    key={c.id}
                    className="flex items-center justify-between text-[12px] text-[var(--color-ink-600)]"
                  >
                    <span className="inline-flex items-center gap-2 min-w-0">
                      <span
                        aria-hidden
                        className="size-2 rounded-full shrink-0"
                        style={{ background: CHANNEL_SERIES[c.id] }}
                      />
                      <span className="truncate">{c.name}</span>
                    </span>
                    <span className="font-mono tabular-nums shrink-0">
                      {pct}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>

      <section>
        <header className="mb-6">
          <h1 className="font-display text-[36px] lg:text-[44px] leading-[1.05] text-[var(--color-ink-900)]">
            Here&apos;s the mix we&apos;d run.
          </h1>
          <p className="mt-2 text-[14px] text-[var(--color-ink-600)] max-w-prose">
            Five channels, weighted to your audience and goal. Adjust any one
            and the others rebalance.
          </p>
        </header>

        <div className="space-y-3">
          {CHANNELS.map((c) => {
            const Icon = iconMap[c.iconKey] ?? Briefcase;
            const value = allocations[c.id] ?? c.allocation;
            const pct = Math.round((value / total) * 100);
            return (
              <ChannelCard
                key={c.id}
                id={c.id}
                name={c.name}
                type={c.type}
                rationale={c.rationale}
                detail={c.detail}
                audienceMatch={c.audienceMatch}
                allocation={value}
                pct={pct}
                total={total}
                Icon={Icon}
                onChange={(n) => setAllocation(c.id, n)}
              />
            );
          })}
        </div>
      </section>

      <div className="fixed bottom-0 inset-x-0 z-30 pointer-events-none">
        <div className="bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/85 to-transparent h-20" />
        <div className="bg-[var(--color-bg)] border-t border-[var(--color-border)] py-3 px-4 sm:px-6 lg:px-8 lg:ml-64">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 pointer-events-auto">
            <p className="hidden sm:block text-[13px] text-[var(--color-ink-600)] max-w-md">
              Happy with the mix? You can still adjust later.
            </p>
            <AnimatePresence mode="wait" initial={false}>
              {launching ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="ml-auto h-10 px-4 rounded-md bg-[var(--color-accent)] text-white text-[13.5px] font-medium inline-flex items-center gap-2"
                >
                  <Check size={14} strokeWidth={2.4} aria-hidden />
                  Launched. Watching the numbers.
                </motion.div>
              ) : (
                <motion.button
                  key="cta"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  onClick={handleLaunch}
                  className="ml-auto h-10 px-4 rounded-md bg-[var(--color-accent)] text-white text-[13.5px] font-semibold inline-flex items-center gap-1.5 hover:translate-y-[-1px] transition-transform"
                >
                  Launch campaign
                  <ArrowRight size={14} strokeWidth={2.2} aria-hidden />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-[var(--color-ink-400)]">{label}</dt>
      <dd className="text-[var(--color-ink-900)] font-mono text-right max-w-[60%] truncate">
        {value}
      </dd>
    </div>
  );
}

function MixBar({
  allocations,
  total,
}: {
  allocations: Record<string, number>;
  total: number;
}) {
  return (
    <div
      className="flex h-2 rounded-full overflow-hidden bg-[var(--color-ink-50)]"
      role="img"
      aria-label="Allocation by channel, segmented by share of total budget"
    >
      {CHANNELS.map((c, i) => {
        const v = allocations[c.id] ?? c.allocation;
        const pct = (v / total) * 100;
        return (
          <motion.div
            key={c.id}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 28,
              delay: i * 0.04,
            }}
            style={{ background: CHANNEL_SERIES[c.id] }}
            className="h-full"
            title={`${c.name}: ${pct.toFixed(0)}%`}
          />
        );
      })}
    </div>
  );
}

type ChannelCardProps = {
  id: string;
  name: string;
  type: "digital" | "physical" | "hybrid";
  rationale: string;
  detail: string;
  audienceMatch: number;
  allocation: number;
  pct: number;
  total: number;
  Icon: LucideIcon;
  onChange: (n: number) => void;
};

function ChannelCard({
  id,
  name,
  type,
  rationale,
  detail,
  audienceMatch,
  allocation,
  pct,
  total,
  Icon,
  onChange,
}: ChannelCardProps) {
  const sliderMax = Math.max(100, total - 4 * 100);
  const sliderMin = 100;
  const sliderStep = total >= 20000 ? 250 : 100;
  const matchTone =
    audienceMatch >= 75
      ? "var(--color-success)"
      : audienceMatch >= 60
        ? "var(--color-warning)"
        : "var(--color-negative)";

  return (
    <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-ink-0)] overflow-hidden transition-shadow hover:shadow-[var(--shadow-sm)]">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <IconBox Icon={Icon} size="lg" tone={typeTone[type]} />

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="text-[16px] font-semibold text-[var(--color-ink-900)] leading-tight">
                {name}
              </h3>
              <span className="t-meta text-[var(--color-ink-400)]">
                {TYPE_LABEL[type]}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-[var(--color-ink-600)] leading-snug max-w-prose">
              {rationale}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-[12px]">
              <RadialScore
                value={audienceMatch}
                size={20}
                stroke={2.5}
                fillColour={matchTone}
              />
              <span className="text-[var(--color-ink-400)]">
                Audience match
              </span>
              <span className="font-mono tabular-nums text-[var(--color-ink-900)] font-medium">
                {audienceMatch}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="font-mono text-[24px] tabular-nums text-[var(--color-ink-900)] leading-none">
              {formatGBPCompact(allocation)}
            </div>
            <div className="text-[11px] text-[var(--color-ink-400)] mt-1 font-mono">
              {pct}% of mix
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-[var(--color-border)] bg-[var(--color-ink-50)]/40">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-ink-400)] mb-2">
          <span className="t-meta">Adjust monthly allocation</span>
          <span className="font-mono tabular-nums">
            {formatGBPCompact(sliderMin)} — {formatGBPCompact(sliderMax)}
          </span>
        </div>
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={sliderStep}
          value={Math.min(allocation, sliderMax)}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`Adjust monthly allocation for ${name}`}
          aria-valuemin={sliderMin}
          aria-valuemax={sliderMax}
          aria-valuenow={allocation}
          aria-valuetext={`${formatGBP(allocation)} per month`}
          className="w-full"
        />
      </div>

      <Disclosure
        className="border-t border-[var(--color-border)]"
        trigger={
          <span className="px-5 h-10 flex items-center text-[12.5px] text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] w-full">
            Why this channel
          </span>
        }
      >
        <p className="px-5 pb-5 pt-1 text-[13px] text-[var(--color-ink-600)] leading-relaxed max-w-prose">
          {detail}
        </p>
      </Disclosure>

      {/* Wired ID for future a11y references */}
      <span hidden id={`channel-${id}-summary`} />
    </article>
  );
}
