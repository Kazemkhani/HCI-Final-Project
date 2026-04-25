"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PoundSterling,
  Users2,
  ReceiptText,
  Target,
} from "lucide-react";
import { MetricTile } from "@/components/dashboard/metric-tile";
import { Sparkline } from "@/components/dashboard/sparkline";
import { RadialScore } from "@/components/dashboard/radial-score";
import { ChannelTable } from "@/components/dashboard/channel-table";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { DashboardAlerts } from "@/components/dashboard/alerts";
import { WORKSPACE, formatGBP, formatNumber } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Range = "7d" | "30d" | "campaign";

const RANGES: { id: Range; label: string }[] = [
  { id: "7d", label: "7d" },
  { id: "30d", label: "Last 30 days" },
  { id: "campaign", label: "Campaign" },
];

export default function DashboardPage() {
  const [range, setRange] = useState<Range>("30d");
  const { campaign, monthlyBudget, user, channels } = WORKSPACE;

  const signupSpark = channels[1].trend
    .slice(-14)
    .map((p) => ({ v: p.signups }));
  const cpsSpark = channels[0].trend
    .slice(-14)
    .map((p) => ({ v: p.costPerSignup }));

  return (
    <div className="space-y-8">
      <header className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="font-display text-[36px] sm:text-[40px] leading-[1.05] text-[var(--color-ink-1)]">
            <Greeting name={user.firstName} />
          </h1>
          <p className="mt-2 text-[15px] text-[var(--color-ink-2)]">
            Day {campaign.daysRunning} of {campaign.daysTotal}. Here&apos;s what
            your {formatGBP(monthlyBudget).replace(".00", "")} is doing.
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Date range"
          className="inline-flex h-9 rounded-md bg-[var(--color-bg)] p-1 text-[12px]"
        >
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={range === r.id}
              onClick={() => setRange(r.id)}
              className={cn(
                "px-3 h-7 rounded-[5px] font-medium transition-colors",
                range === r.id
                  ? "bg-[var(--color-surface)] text-[var(--color-ink-1)] shadow-[0_1px_2px_rgba(10,10,10,0.06)]"
                  : "text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </header>

      <section
        aria-label="Headline metrics"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricTile
          index={0}
          label="Spend to date"
          value={formatGBP(campaign.spendToDate).replace(".00", "")}
          hint={`of ${formatGBP(monthlyBudget).replace(".00", "")} this month`}
          progress={{ value: campaign.spendToDate, max: monthlyBudget }}
          Icon={PoundSterling}
        />
        <MetricTile
          index={1}
          label="Signups"
          value={formatNumber(campaign.signups)}
          delta={{ value: 12, positiveIsGood: true }}
          hint="vs last week"
          spark={<Sparkline data={signupSpark} positive />}
          Icon={Users2}
        />
        <MetricTile
          index={2}
          label="Cost per signup"
          value={`£${campaign.costPerSignupAvg.toFixed(2)}`}
          delta={{ value: -8, positiveIsGood: false }}
          hint="lower is better"
          spark={<Sparkline data={cpsSpark} positive={false} />}
          Icon={ReceiptText}
        />
        <MetricTile
          index={3}
          label="Audience match"
          value={`${campaign.weightedAudienceMatch} / 100`}
          hint="weighted across channels"
          Icon={Target}
          spark={
            <div className="ml-auto pr-2">
              <RadialScore
                value={campaign.weightedAudienceMatch}
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
            <h2 className="font-display text-[24px] text-[var(--color-ink-1)]">
              Cross-channel read
            </h2>
            <p className="text-[13.5px] text-[var(--color-ink-2)]">
              Physical and digital, side by side. The bar on the left signals
              health.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11.5px] text-[var(--color-ink-3)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[var(--color-accent)]" />
              On track
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#B45309]" />
              Attention
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[var(--color-negative)]" />
              Critical
            </span>
          </div>
        </div>
        <ChannelTable />
      </section>

      <DashboardAlerts />

      <TrendChart />
    </div>
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
