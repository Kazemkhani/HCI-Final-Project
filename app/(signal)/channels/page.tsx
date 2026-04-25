"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHydrated } from "@/lib/use-hydrated";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
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
import { useMixStore } from "@/lib/mix-store";
import {
  CHANNELS,
  GOAL_OPTIONS,
  TYPE_LABEL,
  formatGBP,
  formatGBPCompact,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Mic,
  Search,
  Users,
  Newspaper,
};

const typeColour: Record<string, string> = {
  digital: "var(--color-ink-1)",
  physical: "var(--color-editorial)",
  hybrid: "var(--color-accent)",
};

export default function ChannelMixPage() {
  const router = useRouter();
  const { stage, budget, audiences, customAudience, goal, launched } = useBriefStore();
  const { allocations, total, setAllocation } = useMixStore();
  const hydrated = useHydrated();
  const [launching, setLaunching] = useState(false);

  if (hydrated && !launched) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-[36px] text-[var(--color-ink-1)]">
          Start with a brief first.
        </h1>
        <p className="mt-2 text-[15px] text-[var(--color-ink-2)] max-w-sm">
          We need a few details about your campaign before we can suggest a mix.
        </p>
        <Link
          href="/brief"
          className="mt-6 inline-flex items-center gap-1.5 h-10 px-4 rounded-md bg-[var(--color-ink-1)] text-[var(--color-bg)] text-[14px] font-medium"
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
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 pb-24">
      <aside className="lg:sticky lg:top-8 self-start">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-[20px] text-[var(--color-ink-1)]">
              Your brief
            </h2>
            <Link
              href="/brief"
              className="text-[12px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)] inline-flex items-center gap-1"
            >
              <Pencil size={12} aria-hidden /> Edit
            </Link>
          </div>
          <dl className="space-y-3 text-[13px]">
            <Row label="Stage" value={stage} />
            <Row label="Budget" value={`${formatGBPCompact(budget)} / month`} />
            <Row label="Audience" value={audienceLabel} />
            <Row label="Goal" value={goalLabel} />
          </dl>

          <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
            <div className="text-[11px] uppercase tracking-[0.06em] text-[var(--color-ink-3)] font-mono">
              Proposed mix
            </div>
            <MixBar allocations={allocations} total={total} />
            <div className="flex items-center justify-between mt-3 text-[12px] text-[var(--color-ink-2)] tabular-nums">
              <span>Total</span>
              <span className="font-mono text-[var(--color-ink-1)]">
                {formatGBP(total)} / mo
              </span>
            </div>
          </div>
        </div>
      </aside>

      <section>
        <header className="mb-6">
          <h1 className="font-display text-[36px] leading-[1.05] text-[var(--color-ink-1)]">
            Here&apos;s the mix we&apos;d run.
          </h1>
          <p className="mt-2 text-[15px] text-[var(--color-ink-2)]">
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
                Icon={Icon}
                onChange={(n) => setAllocation(c.id, n)}
              />
            );
          })}
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-30 lg:right-10">
        <AnimatePresence mode="wait" initial={false}>
          {launching ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="h-11 px-5 rounded-full bg-[var(--color-accent)] text-white text-[14px] font-medium shadow-[0_8px_28px_rgba(16,185,129,0.32)] inline-flex items-center gap-2"
            >
              <Check size={15} strokeWidth={2.4} aria-hidden />
              Launched. Watching the numbers.
            </motion.div>
          ) : (
            <motion.button
              key="cta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              type="button"
              onClick={handleLaunch}
              className="h-11 px-5 rounded-full bg-[var(--color-accent)] text-white text-[14px] font-semibold shadow-[0_8px_28px_rgba(16,185,129,0.28)] inline-flex items-center gap-2 hover:translate-y-[-1px] transition-transform"
            >
              Launch campaign
              <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-[var(--color-ink-3)]">{label}</dt>
      <dd className="text-[var(--color-ink-1)] font-mono text-right max-w-[60%]">
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
    <div className="mt-3">
      <div
        className="flex h-2.5 rounded-full overflow-hidden bg-[var(--color-bg)]"
        role="img"
        aria-label="Allocation by channel"
      >
        {CHANNELS.map((c, i) => {
          const v = allocations[c.id] ?? c.allocation;
          const pct = (v / total) * 100;
          return (
            <motion.div
              key={c.id}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 220, damping: 28, delay: i * 0.05 }}
              style={{ background: typeColour[c.type] }}
              className="h-full"
              title={`${c.name}: ${pct.toFixed(0)}%`}
            />
          );
        })}
      </div>
      <div className="mt-3 space-y-1.5">
        {CHANNELS.map((c) => {
          const v = allocations[c.id] ?? c.allocation;
          const pct = Math.round((v / total) * 100);
          return (
            <div
              key={c.id}
              className="flex items-center justify-between text-[12px] text-[var(--color-ink-2)]"
            >
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-2 rounded-full shrink-0"
                  style={{ background: typeColour[c.type] }}
                />
                <span className="truncate max-w-[170px]">{c.name}</span>
              </span>
              <span className="font-mono tabular-nums">{pct}%</span>
            </div>
          );
        })}
      </div>
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
  Icon,
  onChange,
}: ChannelCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] overflow-hidden">
      <div className="p-5 grid grid-cols-[48px_1fr_auto] gap-4 items-start">
        <div
          className="size-12 rounded-lg grid place-items-center text-white shrink-0"
          style={{ background: typeColour[type] }}
          aria-hidden
        >
          <Icon size={20} strokeWidth={1.6} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[16px] font-semibold text-[var(--color-ink-1)]">
              {name}
            </h3>
            <span className="text-[10.5px] uppercase tracking-[0.08em] text-[var(--color-ink-3)] font-mono">
              {TYPE_LABEL[type]}
            </span>
          </div>
          <p className="mt-1 text-[13.5px] text-[var(--color-ink-2)] leading-snug">
            {rationale}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 max-w-[260px]">
              <div className="flex items-center justify-between text-[11px] text-[var(--color-ink-3)] mb-1">
                <span>Audience match</span>
                <span className="font-mono">{audienceMatch}</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--color-bg)] overflow-hidden">
                <div
                  className="h-full bg-[var(--color-ink-1)]"
                  style={{ width: `${audienceMatch}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-[26px] tabular-nums text-[var(--color-ink-1)] leading-none">
            {formatGBPCompact(allocation)}
          </div>
          <div className="text-[11px] text-[var(--color-ink-3)] mt-1">
            {pct}% of mix
          </div>
        </div>
      </div>

      <div className="px-5 pb-4">
        <input
          type="range"
          min={100}
          max={9000}
          step={100}
          value={allocation}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`Allocation for ${name}`}
          className="w-full accent-[var(--color-accent)]"
        />
      </div>

      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-controls={`detail-${id}`}
        className="w-full px-5 h-10 border-t border-[var(--color-border)] flex items-center justify-between text-[12.5px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]"
      >
        <span>Why this channel</span>
        <ChevronDown
          size={14}
          aria-hidden
          className={cn(
            "transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`detail-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[13.5px] text-[var(--color-ink-2)] leading-relaxed">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
