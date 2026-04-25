"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowUp, ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  CHANNELS,
  STATUS_COLOUR,
  STATUS_LABEL,
  TYPE_LABEL,
  formatGBP,
  formatGBPCompact,
  formatNumber,
  rangeChannelMetrics,
  type Channel,
  type RangeKey,
} from "@/lib/mock-data";
import { Sparkline } from "@/components/dashboard/sparkline";
import { cn } from "@/lib/utils";

type SortKey =
  | "name"
  | "type"
  | "allocation"
  | "spend"
  | "signups"
  | "costPerSignup"
  | "audienceMatch";

const headers: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "name", label: "Channel" },
  { key: "type", label: "Type" },
  { key: "allocation", label: "Allocation £", align: "right" },
  { key: "spend", label: "Spend £", align: "right" },
  { key: "signups", label: "Signups", align: "right" },
  { key: "costPerSignup", label: "£ / signup", align: "right" },
  { key: "audienceMatch", label: "Match", align: "right" },
];

const TREND_COL_LABEL: Record<RangeKey, string> = {
  "7d": "7-day",
  "30d": "30-day",
  campaign: "Campaign",
};

type Row = {
  channel: Channel;
  name: string;
  type: Channel["type"];
  allocation: number;
  spend: number;
  signups: number;
  costPerSignup: number;
  audienceMatch: number;
  delta: number;
  spark: { v: number }[];
};

export function ChannelTable({ range }: { range: RangeKey }) {
  const [sortKey, setSortKey] = useState<SortKey>("costPerSignup");
  const [asc, setAsc] = useState(true);

  const rows: Row[] = useMemo(() => {
    return CHANNELS.map((channel) => {
      const m = rangeChannelMetrics(channel, range);
      return {
        channel,
        name: channel.name,
        type: channel.type,
        allocation: channel.allocation,
        spend: m.spend,
        signups: m.signups,
        costPerSignup: m.costPerSignup,
        audienceMatch: channel.audienceMatch,
        delta: m.delta,
        spark: m.spark,
      };
    });
  }, [range]);

  const sorted = useMemo(() => {
    const arr = [...rows];
    arr.sort((a, b) => {
      const av = a[sortKey] as string | number;
      const bv = b[sortKey] as string | number;
      if (typeof av === "number" && typeof bv === "number") {
        return asc ? av - bv : bv - av;
      }
      return asc
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [rows, sortKey, asc]);

  const toggle = (k: SortKey) => {
    if (sortKey === k) setAsc((s) => !s);
    else {
      setSortKey(k);
      setAsc(true);
    }
  };

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-ink-0)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr>
              {headers.map((h) => {
                const sortState =
                  sortKey === h.key
                    ? asc
                      ? "ascending"
                      : "descending"
                    : "none";
                return (
                  <th
                    key={h.key}
                    scope="col"
                    aria-sort={sortState}
                    className={cn(
                      "h-9 px-4 first:pl-6 last:pr-6 text-left font-normal",
                      "t-meta text-[var(--color-ink-400)]",
                      h.align === "right" && "text-right",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(h.key)}
                      className={cn(
                        "inline-flex items-center gap-1 hover:text-[var(--color-ink-900)] transition-colors uppercase",
                        h.align === "right" && "flex-row-reverse",
                      )}
                      aria-label={`Sort by ${h.label}`}
                    >
                      {h.label}
                      {sortKey === h.key &&
                        (asc ? (
                          <ArrowUp size={10} aria-hidden />
                        ) : (
                          <ArrowDown size={10} aria-hidden />
                        ))}
                    </button>
                  </th>
                );
              })}
              <th
                scope="col"
                className="h-9 px-4 pr-6 text-right t-meta text-[var(--color-ink-400)] font-normal"
              >
                {TREND_COL_LABEL[range]}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <ChannelRow key={row.channel.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChannelRow({ row }: { row: Row }) {
  const { channel, spend, signups, costPerSignup, delta, spark } = row;
  return (
    <tr className="border-t border-[var(--color-border)] hover:bg-[var(--color-ink-50)] transition-colors group">
      <td className="px-4 pl-6 py-3 relative">
        <span
          aria-hidden
          className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
          style={{ background: STATUS_COLOUR[channel.status] }}
        />
        <span className="sr-only">
          Status: {STATUS_LABEL[channel.status]}.
        </span>
        <Link
          href={`/channels/${channel.id}`}
          className="text-[var(--color-ink-900)] font-medium hover:underline underline-offset-2"
        >
          {channel.name}
        </Link>
      </td>
      <td className="px-4 py-3">
        <span className="t-meta text-[var(--color-ink-500)]">
          {TYPE_LABEL[channel.type]}
        </span>
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums text-[var(--color-ink-900)]">
        {formatGBPCompact(channel.allocation)}
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums text-[var(--color-ink-900)]">
        {formatGBP(spend)}
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums text-[var(--color-ink-900)]">
        {formatNumber(signups)}
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums text-[var(--color-ink-900)]">
        £{costPerSignup.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-right">
        <span className="font-mono tabular-nums text-[var(--color-ink-900)]">
          {channel.audienceMatch}
        </span>
      </td>
      <td className="px-4 pr-6 py-3 text-right">
        <div className="ml-auto flex items-center justify-end gap-2 w-[120px]">
          <span
            className={cn(
              "text-[11px] tabular-nums inline-flex items-center gap-0.5 font-mono",
              delta > 0
                ? "text-[var(--color-success)]"
                : delta < 0
                  ? "text-[var(--color-negative)]"
                  : "text-[var(--color-ink-400)]",
            )}
          >
            {delta > 0 ? (
              <ArrowUpRight size={11} strokeWidth={2.2} aria-hidden />
            ) : delta < 0 ? (
              <ArrowDownRight size={11} strokeWidth={2.2} aria-hidden />
            ) : null}
            {Math.abs(delta)}%
          </span>
          <div className="w-16 h-6">
            <Sparkline data={spark} positive={delta >= 0} />
          </div>
        </div>
      </td>
    </tr>
  );
}
