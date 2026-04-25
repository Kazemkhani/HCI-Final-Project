"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { CHANNELS, combinedTrend } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Metric = "signups" | "spend" | "costPerSignup";

const metricLabels: Record<Metric, string> = {
  signups: "Signups",
  spend: "Spend",
  costPerSignup: "£ / signup",
};

const palette = [
  "#0A0A0A",
  "#6D28D9",
  "#10B981",
  "#4A4A4A",
  "#B45309",
];

export function TrendChart() {
  const [metric, setMetric] = useState<Metric>("signups");
  const [hovered, setHovered] = useState<string | null>(null);

  const data = combinedTrend(metric);

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] p-6">
      <header className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h2 className="font-display text-[20px] text-[var(--color-ink-1)]">
            30-day trend
          </h2>
          <p className="text-[13px] text-[var(--color-ink-2)]">
            One line per channel. Hover to focus.
          </p>
        </div>
        <div
          role="tablist"
          className="inline-flex h-9 rounded-md bg-[var(--color-bg)] p-1 text-[12px]"
        >
          {(Object.keys(metricLabels) as Metric[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={metric === m}
              onClick={() => setMetric(m)}
              className={cn(
                "px-3 h-7 rounded-[5px] font-medium transition-colors",
                metric === m
                  ? "bg-[var(--color-surface)] text-[var(--color-ink-1)] shadow-[0_1px_2px_rgba(10,10,10,0.06)]"
                  : "text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]",
              )}
            >
              {metricLabels[m]}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-[12px]">
        {CHANNELS.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(c.id)}
            onBlur={() => setHovered(null)}
            className="inline-flex items-center gap-1.5 text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]"
          >
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{
                background:
                  hovered === c.id ? "var(--color-accent)" : palette[i],
              }}
            />
            {c.name}
          </button>
        ))}
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
          >
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              minTickGap={32}
              tickFormatter={(d: string) =>
                new Date(d).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={42}
              allowDecimals={false}
              tickFormatter={(n: number) =>
                metric === "spend"
                  ? n >= 1000
                    ? `£${(n / 1000).toFixed(1)}k`
                    : `£${n}`
                  : metric === "costPerSignup"
                    ? `£${n}`
                    : `${n}`
              }
            />
            <Tooltip
              content={(props) => <ChartTooltip {...props} metric={metric} />}
            />
            {CHANNELS.map((c, i) => (
              <Line
                key={c.id}
                dataKey={c.id}
                type="monotone"
                stroke={hovered === c.id ? "var(--color-accent)" : palette[i]}
                strokeWidth={hovered === c.id ? 2.2 : 1.4}
                strokeOpacity={hovered && hovered !== c.id ? 0.25 : 1}
                dot={false}
                isAnimationActive={false}
                name={c.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

type ChartTooltipProps = TooltipContentProps<ValueType, NameType> & {
  metric: Metric;
};

function formatTooltipValue(v: ValueType | undefined, metric: Metric): string {
  const n = typeof v === "number" ? v : Number(Array.isArray(v) ? v[0] : v);
  if (Number.isNaN(n)) return String(v ?? "");
  return n.toFixed(metric === "costPerSignup" ? 2 : 0);
}

function ChartTooltip({
  active,
  label,
  payload,
  metric,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const date = label
    ? new Date(String(label)).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    : "";
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] p-3 min-w-[200px]">
      <div className="text-[11px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)] mb-2">
        {date}
      </div>
      <div className="space-y-1">
        {payload.map((p) => (
          <div
            key={String(p.dataKey)}
            className="flex items-center justify-between gap-4 text-[12px]"
          >
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ background: p.color }}
              />
              <span className="text-[var(--color-ink-2)]">{p.name}</span>
            </span>
            <span className="font-mono tabular-nums text-[var(--color-ink-1)]">
              {metric === "spend" || metric === "costPerSignup" ? "£" : ""}
              {formatTooltipValue(p.value, metric)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
