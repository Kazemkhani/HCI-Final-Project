"use client";

import { motion } from "framer-motion";

type Props = {
  value: number;
  size?: number;
  stroke?: number;
  trackColour?: string;
  fillColour?: string;
};

export function RadialScore({
  value,
  size = 28,
  stroke = 3,
  trackColour = "var(--color-border)",
  fillColour = "var(--color-ink-1)",
}: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(100, value)) / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Score ${value} out of 100`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={trackColour}
        strokeWidth={stroke}
        fill="none"
      />
      <motion.circle
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={fillColour}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeLinecap="round"
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
