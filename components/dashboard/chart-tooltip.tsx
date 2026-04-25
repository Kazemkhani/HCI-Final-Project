"use client";

import type { TooltipContentProps } from "recharts/types/component/Tooltip";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type FormatCfg = {
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

type Props = TooltipContentProps<ValueType, NameType> & {
  format?: FormatCfg;
  labelFormatter?: (label: string | number | undefined) => string;
};

function formatValue(v: ValueType | undefined, cfg: FormatCfg): string {
  const num =
    typeof v === "number"
      ? v
      : Number(Array.isArray(v) ? v[0] : v);
  if (Number.isNaN(num)) return String(v ?? "");
  return `${cfg.prefix ?? ""}${num.toFixed(cfg.decimals ?? 0)}${cfg.suffix ?? ""}`;
}

export function ChartTooltip({
  active,
  payload,
  label,
  format = {},
  labelFormatter,
}: Props) {
  if (!active || !payload?.length) return null;

  const headerText = labelFormatter
    ? labelFormatter(label)
    : label
      ? String(label)
      : "";

  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-ink-0)] shadow-[var(--shadow-md)] p-3 min-w-[180px]">
      {headerText && (
        <div className="t-meta text-[var(--color-ink-400)] mb-2">
          {headerText}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((p, i) => (
          <div
            key={`${p.dataKey ?? i}`}
            className="flex items-center justify-between gap-4 text-[12px]"
          >
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="size-2 rounded-full shrink-0"
                style={{ background: p.color }}
              />
              <span className="text-[var(--color-ink-600)]">{p.name}</span>
            </span>
            <span className="font-mono tabular-nums text-[var(--color-ink-900)]">
              {formatValue(p.value, format)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
