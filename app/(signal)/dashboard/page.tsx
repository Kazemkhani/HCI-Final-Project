"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  PoundSterling,
  Users2,
  ReceiptText,
  Target,
  AlertCircle,
} from "lucide-react";
import { MetricTile } from "@/components/dashboard/metric-tile";
import { Sparkline } from "@/components/dashboard/sparkline";
import { RadialScore } from "@/components/dashboard/radial-score";
import { ChannelTable } from "@/components/dashboard/channel-table";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { DashboardAlerts } from "@/components/dashboard/alerts";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { EmptyState } from "@/components/ui/empty-state";
import {
  WORKSPACE,
  formatGBP,
  formatNumber,
  rangeMetrics,
  rangeChannelMetrics,
  type RangeKey,
} from "@/lib/mock-data";

const RANGES: { id: RangeKey; label: string }[] = [
  { id: "7d", label: "7d" },
  { id: "30d", label: "Last 30 days" },
  { id: "campaign", label: "Campaign" },
];

const RANGE_SUBTITLE: Record<RangeKey, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  campaign: `Day 14 of 42`,
};

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardInner />
    </Suspense>
  );
}

function DashboardInner() {
  const params = useSearchParams();
  const demo = params.get("demo");
  const [range, setRange] = useState<RangeKey>("30d");
  const { monthlyBudget, user, channels } = WORKSPACE;

  if (demo === "empty") return <EmptyDashboard />;
  if (demo === "error") return <ErrorDashboard />;

  const m = rangeMetrics(range);
  const podcastSpark = rangeChannelMetrics(channels[1], range).spark;
  const linkedinChannel = rangeChannelMetrics(channels[0], range);
  const cpsSpark = channels[0].trend
    .slice(-podcastSpark.length)
    .map((p) => ({ v: p.costPerSignup }));
  void linkedinChannel;

  const spendHint =
    range === "7d"
      ? `of ${formatGBP(m.spendCap).replace(".00", "")} pace this week`
      : range === "campaign"
        ? `of ${formatGBP(m.spendCap).replace(".00", "")} planned across the campaign`
        : `of ${formatGBP(monthlyBudget).replace(".00", "")} this month`;
  const signupHintText =
    range === "7d" ? "vs prior week" : range === "30d" ? "vs prior month" : "vs first half of campaign";

  return (
    <div className="space-y-8">
      <header className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="font-display text-[36px] sm:text-[44px] leading-[1.05] text-[var(--color-ink-900)]">
            <Greeting name={user.firstName} />
          </h1>
          <p className="mt-2 text-[14px] text-[var(--color-ink-600)]">
            {RANGE_SUBTITLE[range]}. Here&apos;s what your{" "}
            {formatGBP(monthlyBudget).replace(".00", "")} is doing.
          </p>
        </div>
        <SegmentedTabs
          ariaLabel="Date range"
          tabs={RANGES}
          value={range}
          onChange={setRange}
        />
      </header>

      <section
        aria-label="Headline metrics"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricTile
          index={0}
          label="Spend"
          value={formatGBP(m.spend).replace(".00", "")}
          hint={spendHint}
          progress={{ value: m.spend, max: m.spendCap }}
          Icon={PoundSterling}
        />
        <MetricTile
          index={1}
          label="Signups"
          value={formatNumber(m.signups)}
          delta={{ value: m.signupsDelta, positiveIsGood: true }}
          hint={signupHintText}
          spark={<Sparkline data={podcastSpark} positive={m.signupsDelta >= 0} />}
          Icon={Users2}
        />
        <MetricTile
          index={2}
          label="Cost per signup"
          value={`£${m.costPerSignup.toFixed(2)}`}
          delta={{ value: m.cpsDelta, positiveIsGood: false }}
          hint="lower is better"
          spark={<Sparkline data={cpsSpark} positive={m.cpsDelta < 0} />}
          Icon={ReceiptText}
        />
        <MetricTile
          index={3}
          label="Audience match"
          value={`${m.audienceMatch} / 100`}
          hint="weighted across channels"
          Icon={Target}
          spark={
            <div className="ml-auto pr-2">
              <RadialScore
                value={m.audienceMatch}
                size={36}
                stroke={3.5}
                fillColour="var(--color-accent)"
              />
            </div>
          }
        />
      </section>

      <section aria-label="Cross-channel comparison" className="space-y-3">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[var(--color-ink-900)]">
              Cross-channel read
            </h2>
            <p className="text-[13px] text-[var(--color-ink-600)]">
              Physical and digital, side by side. The bar on the left signals
              health.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-[var(--color-ink-500)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[var(--color-success)]" />
              On track
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[var(--color-warning)]" />
              Attention
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[var(--color-negative)]" />
              Critical
            </span>
          </div>
        </div>
        <ChannelTable range={range} />
      </section>

      <DashboardAlerts />

      <TrendChart range={range} />
    </div>
  );
}

function EmptyDashboard() {
  return (
    <EmptyState
      Icon={Target}
      title="Nothing running yet."
      body="Start with a brief. We'll build the channel mix, then this page comes to life."
      action={{ label: "Start with a brief", href: "/brief" }}
    />
  );
}

function ErrorDashboard() {
  return (
    <EmptyState
      Icon={AlertCircle}
      title="Can't read the numbers right now."
      body="Refresh in a moment. If it keeps happening, we'll let you know in the inbox."
    />
  );
}

function Greeting({ name }: { name: string }) {
  const hour = typeof window !== "undefined" ? new Date().getHours() : 9;
  const word =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {word}, {name}.
    </motion.span>
  );
}
