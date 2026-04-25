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
import { CHANNELS, CHANNEL_SERIES, combinedTrend } from "@/lib/mock-data";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { ChartTooltip } from "@/components/dashboard/chart-tooltip";

type Metric = "signups" | "spend" | "costPerSignup";

const metricTabs: { id: Metric; label: string }[] = [
  { id: "signups", label: "Signups" },
  { id: "spend", label: "Spend" },
  { id: "costPerSignup", label: "£ / signup" },
];

export function TrendChart() {
  const [metric, setMetric] = useState<Metric>("signups");
  const [hovered, setHovered] = useState<string | null>(null);

  const data = combinedTrend(metric);

  const tooltipFormat =
    metric === "spend"
      ? { prefix: "£", decimals: 0 }
      : metric === "costPerSignup"
        ? { prefix: "£", decimals: 2 }
        : { decimals: 0 };

  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-ink-0)] p-6">
      <header className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[var(--color-ink-900)]">
            30-day trend
          </h2>
          <p className="text-[13px] text-[var(--color-ink-600)]">
            One line per channel. Hover to focus.
          </p>
        </div>
        <SegmentedTabs
          ariaLabel="Trend metric"
          tabs={metricTabs}
          value={metric}
          onChange={setMetric}
        />
      </header>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4 text-[12px]">
        {CHANNELS.map((c) => {
          const isHovered = hovered === c.id;
          const colour = isHovered
            ? "var(--color-accent)"
            : CHANNEL_SERIES[c.id];
          return (
            <button
              key={c.id}
              type="button"
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(c.id)}
              onBlur={() => setHovered(null)}
              aria-pressed={isHovered}
              aria-label={`Highlight ${c.name} on chart`}
              className="group inline-flex items-center gap-2 text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]"
            >
              <svg
                aria-hidden
                width={20}
                height={8}
                viewBox="0 0 20 8"
                className="shrink-0"
              >
                <line
                  x1={0}
                  y1={4}
                  x2={20}
                  y2={4}
                  stroke={colour}
                  strokeWidth={isHovered ? 2.2 : 1.6}
                />
                <circle cx={10} cy={4} r={2.2} fill={colour} />
              </svg>
              {c.name}
            </button>
          );
        })}
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
              width={44}
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
              cursor={{ stroke: "var(--color-border)" }}
              content={(props) => (
                <ChartTooltip
                  {...props}
                  format={tooltipFormat}
                  labelFormatter={(label) =>
                    label
                      ? new Date(String(label)).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })
                      : ""
                  }
                />
              )}
            />
            {CHANNELS.map((c) => (
              <Line
                key={c.id}
                dataKey={c.id}
                type="monotone"
                stroke={
                  hovered === c.id
                    ? "var(--color-accent)"
                    : CHANNEL_SERIES[c.id]
                }
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
