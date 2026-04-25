"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import { CHANNEL_SERIES, type Channel } from "@/lib/mock-data";

type Props = {
  channel: Channel;
  targetCps: number;
};

export function DeepDiveCharts({ channel, targetCps }: Props) {
  const data = channel.trend.map((p) => ({
    date: p.date,
    cps: p.costPerSignup,
    overTarget: p.costPerSignup > targetCps ? p.costPerSignup : null,
  }));

  const channelColour = CHANNEL_SERIES[channel.id] ?? "var(--color-ink-900)";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
      <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-ink-0)] p-6">
        <header className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-[var(--color-ink-900)]">
              Daily cost per signup
            </h2>
            <p className="text-[13px] text-[var(--color-ink-600)]">
              Threshold marks your campaign target of £{targetCps.toFixed(2)}.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 t-meta text-[var(--color-ink-400)] shrink-0">
            <span
              className="block h-px w-5 border-t border-dashed border-[var(--color-ink-400)]"
              aria-hidden
            />
            Target
          </span>
        </header>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="overTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-negative)"
                    stopOpacity={0.18}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-negative)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
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
                tickFormatter={(v: number) => `£${v}`}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-border)" }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const v = payload[0].value;
                  const num = typeof v === "number" ? v : Number(v);
                  return (
                    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-ink-0)] shadow-[var(--shadow-md)] p-3 text-[12px]">
                      <div className="t-meta text-[var(--color-ink-400)] mb-1">
                        {label
                          ? new Date(String(label)).toLocaleDateString(
                              "en-GB",
                              { day: "numeric", month: "short" },
                            )
                          : ""}
                      </div>
                      <div className="font-mono text-[14px] tabular-nums text-[var(--color-ink-900)]">
                        £{num.toFixed(2)}
                      </div>
                    </div>
                  );
                }}
              />
              <ReferenceLine
                y={targetCps}
                stroke="var(--color-ink-400)"
                strokeDasharray="4 4"
              />
              <Area
                type="monotone"
                dataKey="overTarget"
                stroke="none"
                fill="url(#overTarget)"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="cps"
                stroke={channelColour}
                strokeWidth={1.8}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-ink-0)] p-6">
        <header className="mb-4">
          <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-[var(--color-ink-900)]">
            Audience match
          </h2>
          <p className="text-[13px] text-[var(--color-ink-600)]">
            By segment, scored 0–100.
          </p>
        </header>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={channel.audienceBreakdown}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 4, bottom: 0 }}
            >
              <CartesianGrid stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                type="category"
                dataKey="segment"
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0];
                  return (
                    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-ink-0)] shadow-[var(--shadow-md)] p-3 text-[12px]">
                      <div className="font-medium text-[var(--color-ink-900)]">
                        {p.payload.segment}
                      </div>
                      <div className="font-mono tabular-nums text-[var(--color-ink-600)]">
                        Match: {p.value}
                      </div>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="score"
                fill={channelColour}
                radius={[0, 4, 4, 0]}
                maxBarSize={14}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
