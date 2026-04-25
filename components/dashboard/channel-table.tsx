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
  type Channel,
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
  { key: "audienceMatch", label: "Match / 100", align: "right" },
];

export function ChannelTable() {
  const [sortKey, setSortKey] = useState<SortKey>("costPerSignup");
  const [asc, setAsc] = useState(true);

  const sorted = useMemo(() => {
    const arr = [...CHANNELS];
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
  }, [sortKey, asc]);

  const toggle = (k: SortKey) => {
    if (sortKey === k) setAsc((s) => !s);
    else {
      setSortKey(k);
      setAsc(true);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.06em] text-[var(--color-ink-3)] font-mono">
              {headers.map((h) => (
                <th
                  key={h.key}
                  scope="col"
                  className={cn(
                    "h-11 px-4 first:pl-6 last:pr-6 text-left font-normal",
                    h.align === "right" && "text-right",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(h.key)}
                    className="inline-flex items-center gap-1 hover:text-[var(--color-ink-1)] transition-colors"
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
              ))}
              <th
                scope="col"
                className="h-11 px-4 pr-6 text-right text-[11px] uppercase tracking-[0.06em] text-[var(--color-ink-3)] font-normal"
              >
                7-day
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <ChannelRow key={c.id} channel={c} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChannelRow({ channel }: { channel: Channel }) {
  const trendData = channel.trend.slice(-14).map((p) => ({ v: p.signups }));
  return (
    <tr className="border-t border-[var(--color-border)] hover:bg-[var(--color-bg)]/40 transition-colors group">
      <td className="px-4 pl-6 py-3 relative">
        <span
          aria-hidden
          className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
          style={{ background: STATUS_COLOUR[channel.status] }}
          title={STATUS_LABEL[channel.status]}
        />
        <Link
          href={`/channels/${channel.id}`}
          className="text-[var(--color-ink-1)] font-medium group-hover:underline"
        >
          {channel.name}
        </Link>
      </td>
      <td className="px-4 py-3">
        <span className="text-[10.5px] uppercase tracking-[0.08em] text-[var(--color-ink-2)] font-mono">
          {TYPE_LABEL[channel.type]}
        </span>
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums">
        {formatGBPCompact(channel.allocation)}
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums">
        {formatGBP(channel.spend)}
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums">
        {formatNumber(channel.signups)}
      </td>
      <td className="px-4 py-3 text-right font-mono tabular-nums">
        £{channel.costPerSignup.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-right">
        <span className="font-mono tabular-nums">{channel.audienceMatch}</span>
      </td>
      <td className="px-4 pr-6 py-3 text-right">
        <div className="ml-auto flex items-center justify-end gap-2 w-[120px]">
          <span
            className={cn(
              "text-[11px] tabular-nums inline-flex items-center gap-0.5",
              channel.delta7d >= 0
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-negative)]",
            )}
          >
            {channel.delta7d >= 0 ? (
              <ArrowUpRight size={11} strokeWidth={2.2} aria-hidden />
            ) : (
              <ArrowDownRight size={11} strokeWidth={2.2} aria-hidden />
            )}
            {Math.abs(channel.delta7d)}%
          </span>
          <div className="w-16 h-6">
            <Sparkline data={trendData} positive={channel.delta7d >= 0} />
          </div>
        </div>
      </td>
    </tr>
  );
}
