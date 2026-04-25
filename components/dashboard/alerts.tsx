"use client";

import Link from "next/link";
import { TrendingDown, AlertOctagon, ArrowRight, Sparkles } from "lucide-react";

const alerts = [
  {
    id: "linkedin-vs-podcast",
    Icon: TrendingDown,
    title: "LinkedIn Ads cost per signup is up 8% this week.",
    body: "Podcast is 2.2× cheaper on a closer-matched audience. We can move part of the spend.",
    cta: { label: "Review reallocation", href: "/budget" },
    tone: "attention" as const,
  },
  {
    id: "pr-soft",
    Icon: AlertOctagon,
    title: "PR placement has delivered 12 signups on £350 spend.",
    body: "Attribution is weak — consider retiring or doubling down with a UTM agreement.",
    cta: { label: "Decide", href: "/channels/pr-placement" },
    tone: "critical" as const,
  },
];

const toneIcon: Record<"attention" | "critical", string> = {
  attention: "var(--color-warning)",
  critical: "var(--color-negative)",
};

const toneBg: Record<"attention" | "critical", string> = {
  attention: "var(--color-warning-soft)",
  critical: "var(--color-negative-soft)",
};

export function DashboardAlerts() {
  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-ink-0)] p-6">
      <header className="mb-4 flex items-center gap-2">
        <Sparkles
          size={14}
          strokeWidth={1.6}
          className="text-[var(--color-accent)]"
          aria-hidden
        />
        <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[var(--color-ink-900)]">
          Signal noticed
        </h2>
        <span className="text-[12px] text-[var(--color-ink-500)]">
          · Two things worth your time today.
        </span>
      </header>

      <ul className="space-y-3">
        {alerts.map(({ id, Icon, title, body, cta, tone }) => (
          <li
            key={id}
            className="rounded-md border border-[var(--color-border)] p-4 flex items-start gap-4 bg-[var(--color-ink-50)]/50"
          >
            <span
              className="size-9 rounded-md grid place-items-center shrink-0 border border-[var(--color-border)]"
              style={{
                color: toneIcon[tone],
                background: toneBg[tone],
              }}
              aria-hidden
            >
              <Icon size={16} strokeWidth={1.7} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium text-[var(--color-ink-900)] leading-snug">
                {title}
              </div>
              <p className="text-[13px] text-[var(--color-ink-600)] mt-0.5 leading-snug">
                {body}
              </p>
            </div>
            <Link
              href={cta.href}
              className="shrink-0 inline-flex items-center gap-1 h-8 px-3 rounded-md text-[12.5px] font-medium bg-[var(--color-ink-900)] text-[var(--color-bg)] hover:translate-x-px transition-transform"
            >
              {cta.label}
              <ArrowRight size={12} aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
