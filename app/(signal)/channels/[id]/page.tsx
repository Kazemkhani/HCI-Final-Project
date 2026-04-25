import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Briefcase,
  Mic,
  Search,
  Users,
  Newspaper,
  ExternalLink,
  TrendingDown,
  Target as TargetIcon,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  CHANNEL_BY_ID,
  STATUS_COLOUR,
  STATUS_LABEL,
  TYPE_LABEL,
  formatGBP,
  formatGBPCompact,
  formatNumber,
} from "@/lib/mock-data";
import { DeepDiveCharts } from "@/components/dashboard/deep-dive-charts";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Mic,
  Search,
  Users,
  Newspaper,
};

export default async function ChannelDeepDivePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const channel = CHANNEL_BY_ID[id];
  if (!channel) notFound();

  const Icon = iconMap[channel.iconKey] ?? Briefcase;
  const targetCps = 12.5;
  const remaining = channel.allocation - channel.spend;
  const pacePercent = (channel.spend / channel.allocation) * 100;

  return (
    <div className="space-y-8 pb-12">
      <nav
        aria-label="Breadcrumb"
        className="text-[12.5px] text-[var(--color-ink-3)] flex items-center gap-1"
      >
        <Link
          href="/dashboard"
          className="hover:text-[var(--color-ink-1)]"
        >
          Dashboard
        </Link>
        <ChevronRight size={12} aria-hidden />
        <Link href="/dashboard" className="hover:text-[var(--color-ink-1)]">
          Channels
        </Link>
        <ChevronRight size={12} aria-hidden />
        <span className="text-[var(--color-ink-1)]">{channel.name}</span>
      </nav>

      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div
            className="size-12 rounded-lg grid place-items-center text-white"
            style={{
              background:
                channel.type === "digital"
                  ? "var(--color-ink-1)"
                  : channel.type === "physical"
                    ? "var(--color-editorial)"
                    : "var(--color-accent)",
            }}
            aria-hidden
          >
            <Icon size={20} strokeWidth={1.6} />
          </div>
          <div>
            <h1 className="font-display text-[32px] leading-tight text-[var(--color-ink-1)]">
              {channel.name}
            </h1>
            <div className="mt-1 flex items-center gap-3">
              <span
                className="inline-flex items-center gap-1.5 h-6 px-2 rounded-full text-[11px] font-medium"
                style={{
                  background:
                    channel.status === "healthy"
                      ? "rgba(16,185,129,0.12)"
                      : channel.status === "attention"
                        ? "rgba(180,83,9,0.12)"
                        : "rgba(220,38,38,0.10)",
                  color: STATUS_COLOUR[channel.status],
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: STATUS_COLOUR[channel.status] }}
                  aria-hidden
                />
                {STATUS_LABEL[channel.status]}
              </span>
              <span className="text-[11px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
                {TYPE_LABEL[channel.type]}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="h-9 px-3.5 rounded-md border border-[var(--color-border)] text-[13px] font-medium text-[var(--color-ink-1)] hover:bg-[var(--color-bg)] inline-flex items-center gap-1.5"
        >
          View in {channel.type === "physical" ? "venue brief" : "platform"}
          <ExternalLink size={12} aria-hidden />
        </button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard label="Spend & pace">
          <div className="flex items-baseline gap-2 font-mono tabular-nums">
            <span className="text-[24px] text-[var(--color-ink-1)]">
              {formatGBP(channel.spend).replace(".00", "")}
            </span>
            <span className="text-[13px] text-[var(--color-ink-3)]">
              of {formatGBPCompact(channel.allocation)}
            </span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-[var(--color-bg)] overflow-hidden">
            <div
              className="h-full bg-[var(--color-ink-1)]"
              style={{ width: `${Math.min(100, pacePercent)}%` }}
            />
          </div>
          <div className="mt-2 text-[12px] text-[var(--color-ink-2)]">
            {pacePercent < 50
              ? "Behind pace — fine if intentional."
              : pacePercent < 90
                ? "On pace for the month."
                : "Nearly out of budget for the month."}
            {remaining > 0 && (
              <span className="text-[var(--color-ink-3)]">
                {" "}
                {formatGBPCompact(remaining)} left.
              </span>
            )}
          </div>
        </SummaryCard>

        <SummaryCard label="Signups & cost">
          <div className="flex items-baseline gap-2 font-mono tabular-nums">
            <span className="text-[24px] text-[var(--color-ink-1)]">
              {formatNumber(channel.signups)}
            </span>
            <span className="text-[13px] text-[var(--color-ink-3)]">
              signups
            </span>
          </div>
          <div className="mt-2 text-[13px] text-[var(--color-ink-2)]">
            <span className="font-mono">£{channel.costPerSignup.toFixed(2)}</span>{" "}
            per signup
          </div>
          <div
            className={`mt-2 text-[12px] font-medium ${
              channel.delta7d >= 0
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-negative)]"
            }`}
          >
            {channel.delta7d >= 0 ? "+" : ""}
            {channel.delta7d}% vs previous week
          </div>
        </SummaryCard>

        <SummaryCard label="Audience match">
          <div className="flex items-center gap-3">
            <div className="font-mono tabular-nums text-[24px] text-[var(--color-ink-1)]">
              {channel.audienceMatch}
            </div>
            <span className="text-[13px] text-[var(--color-ink-3)]">/ 100</span>
          </div>
          <p className="mt-2 text-[12.5px] text-[var(--color-ink-2)] leading-snug">
            {channel.audienceBreakdown
              .slice(0, 2)
              .map((b) => `${b.segment}: ${b.score}`)
              .join(", ")}
            {" — tilt toward "}
            {channel.audienceBreakdown[0].segment.toLowerCase()} is{" "}
            {channel.delta7d >= 0 ? "working" : "softening"}.
          </p>
        </SummaryCard>
      </section>

      <DeepDiveCharts channel={channel} targetCps={targetCps} />

      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6 lg:p-8">
        <span className="text-[11px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
          Recommendation
        </span>
        <h2 className="font-display text-[22px] mt-1 text-[var(--color-ink-1)]">
          {recommendationFor(channel.id)}
        </h2>

        <ul className="mt-5 space-y-3 max-w-prose">
          {evidenceFor(channel).map(({ Icon: EI, headline, body }) => (
            <li key={headline} className="flex items-start gap-3">
              <span
                className="size-7 rounded-md grid place-items-center bg-[var(--color-bg)] shrink-0 text-[var(--color-ink-1)]"
                aria-hidden
              >
                <EI size={14} strokeWidth={1.6} />
              </span>
              <div>
                <div className="text-[14px] font-medium text-[var(--color-ink-1)]">
                  {headline}
                </div>
                <p className="text-[13px] text-[var(--color-ink-2)]">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/budget?source=${channel.id}&dest=podcast-sponsorship&amount=1800`}
            className="h-10 px-4 rounded-md bg-[var(--color-accent)] text-white text-[14px] font-semibold inline-flex items-center gap-1.5 hover:translate-y-[-1px] transition-transform"
          >
            Review in Budget
          </Link>
          <button
            type="button"
            className="h-10 px-4 rounded-md text-[14px] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]"
          >
            Dismiss
          </button>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-5">
      <div className="text-[10.5px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)] mb-3">
        {label}
      </div>
      {children}
    </article>
  );
}

function recommendationFor(id: string): string {
  if (id === "linkedin-ads")
    return "Move £1,800 / month from LinkedIn Ads to Podcast Sponsorship.";
  if (id === "podcast-sponsorship")
    return "Add £900 / month and lock another show before inventory tightens.";
  if (id === "pr-placement")
    return "Cap PR at £350 / month or pause until attribution is in place.";
  if (id === "google-search")
    return "Hold the line. Quality score and CPL are healthy.";
  if (id === "saastr-europa")
    return "Wait for the qualification follow-ups before re-rating this one.";
  return "Steady on.";
}

function evidenceFor(channel: { id: string; costPerSignup: number; delta7d: number; audienceMatch: number }) {
  if (channel.id === "linkedin-ads") {
    return [
      {
        Icon: TrendingDown,
        headline: "Cheaper acquisition",
        body: "Podcast cost per signup is £8.58 vs LinkedIn £18.75 — 2.2× better on the same audience.",
      },
      {
        Icon: TargetIcon,
        headline: "Better audience match",
        body: "Podcast scores 88 vs LinkedIn 72 on your ICP. Matching tilts toward founders, where podcast is strongest.",
      },
      {
        Icon: Sparkles,
        headline: "Rising trend",
        body: "Podcast signups +14% week-on-week, LinkedIn -8%. Inertia of the last fortnight argues for a small move now.",
      },
    ];
  }
  return [
    {
      Icon: TargetIcon,
      headline: "Audience match",
      body: `Currently ${channel.audienceMatch}/100 across your tracked segments.`,
    },
    {
      Icon: Sparkles,
      headline: "Recent trend",
      body: `${channel.delta7d >= 0 ? "+" : ""}${channel.delta7d}% week-on-week. Cost per signup £${channel.costPerSignup.toFixed(2)}.`,
    },
  ];
}
