"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

type SparklineProps = {
  data: { v: number }[];
  positive?: boolean;
};

export function Sparkline({ data, positive = true }: SparklineProps) {
  return (
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={data}>
        <Line
          dataKey="v"
          type="monotone"
          stroke={positive ? "var(--color-accent)" : "var(--color-negative)"}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
