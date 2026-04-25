"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Target,
  LayoutDashboard,
  PieChart,
  PoundSterling,
  Type as TypeIcon,
  ArrowRight,
  ArrowDown,
  type LucideIcon,
} from "lucide-react";

type FlowNode = {
  id: string;
  title: string;
  hint: string;
  href: string;
  Icon: LucideIcon;
  thumbnail: ThumbnailKind;
};

type ThumbnailKind = "brief" | "channels" | "dashboard" | "deep" | "budget" | "copy";

const NODES: FlowNode[] = [
  {
    id: "brief",
    title: "Brief",
    hint: "Tell us stage, budget, audience, goal",
    href: "/brief",
    Icon: FileText,
    thumbnail: "brief",
  },
  {
    id: "mix",
    title: "Channel Mix",
    hint: "Get a proposed split, adjust it",
    href: "/channels",
    Icon: Target,
    thumbnail: "channels",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    hint: "One read across digital and physical",
    href: "/dashboard",
    Icon: LayoutDashboard,
    thumbnail: "dashboard",
  },
  {
    id: "deep",
    title: "Channel Deep-Dive",
    hint: "Diagnose what's behind the numbers",
    href: "/channels/linkedin-ads",
    Icon: PieChart,
    thumbnail: "deep",
  },
  {
    id: "budget",
    title: "Budget Reallocation",
    hint: "Approve or adjust a single move",
    href: "/budget",
    Icon: PoundSterling,
    thumbnail: "budget",
  },
];

export default function FlowPage() {
  return (
    <div className="space-y-10 pb-12">
      <header>
        <h1 className="font-display text-[36px] sm:text-[40px] leading-[1.05] text-[var(--color-ink-1)]">
          How Signal flows.
        </h1>
        <p className="mt-2 text-[15px] text-[var(--color-ink-2)] max-w-prose">
          Five steps from a fresh brief to an evidence-led budget move. Average
          path: under four minutes.
        </p>
      </header>

      <section
        aria-label="Core user flow"
        className="overflow-x-auto -mx-4 px-4 pb-2"
      >
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 min-w-max xl:min-w-0">
          {NODES.map((node, i) => (
            <div key={node.id} className="flex flex-col xl:flex-row items-center gap-3">
              <Node node={node} index={i} />
              {i < NODES.length - 1 && <Connector index={i} />}
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Utility: clarity check"
        className="rounded-2xl border border-dashed border-[var(--color-border)] p-6 sm:p-8 bg-[var(--color-surface)]"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <span
              className="size-12 rounded-lg grid place-items-center bg-[var(--color-bg)] text-[var(--color-ink-1)]"
              aria-hidden
            >
              <TypeIcon size={20} strokeWidth={1.6} />
            </span>
            <div>
              <h2 className="font-display text-[22px] text-[var(--color-ink-1)]">
                Clarity Check (utility)
              </h2>
              <p className="text-[13.5px] text-[var(--color-ink-2)] mt-1 max-w-md">
                A standalone tool for ad copy. Available from the sidebar at any
                point in the flow.
              </p>
            </div>
          </div>
          <Link
            href="/copy"
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-md bg-[var(--color-ink-1)] text-[var(--color-bg)] text-[13.5px] font-medium"
          >
            Open Clarity Check
            <ArrowRight size={13} aria-hidden />
          </Link>
        </div>
      </section>

      <p className="text-[13px] text-[var(--color-ink-3)]">
        Core task completes in five steps. Average path under four minutes.
      </p>
    </div>
  );
}

function Node({ node, index }: { node: FlowNode; index: number }) {
  const { Icon, title, hint, href } = node;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.08 }}
      className="w-[260px] xl:w-[200px]"
    >
      <Link
        href={href}
        className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow overflow-hidden"
      >
        <div className="h-[120px] border-b border-[var(--color-border)] bg-[var(--color-bg)]/50 grid place-items-center">
          <Thumbnail kind={node.thumbnail} />
        </div>
        <div className="p-4">
          <div className="text-[10.5px] uppercase tracking-[0.08em] font-mono text-[var(--color-ink-3)]">
            Step {index + 1}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Icon size={14} strokeWidth={1.7} aria-hidden className="text-[var(--color-ink-1)]" />
            <h3 className="font-display text-[18px] text-[var(--color-ink-1)] leading-tight">
              {title}
            </h3>
          </div>
          <p className="mt-1.5 text-[12.5px] text-[var(--color-ink-2)] leading-snug">
            {hint}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-[12px] text-[var(--color-ink-3)] group-hover:text-[var(--color-ink-1)]">
            Jump in
            <ArrowRight size={11} aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function Connector({ index }: { index: number }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.4 + index * 0.08 }}
        className="hidden xl:block"
      >
        <svg width={56} height={48} viewBox="0 0 56 48" aria-hidden>
          <motion.path
            d="M2 24 H 44"
            stroke="var(--color-ink-3)"
            strokeWidth={1.4}
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.08 }}
          />
          <motion.path
            d="M40 18 L 48 24 L 40 30"
            stroke="var(--color-ink-1)"
            strokeWidth={1.4}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.25, delay: 1 + index * 0.08 }}
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.4 + index * 0.08 }}
        className="xl:hidden text-[var(--color-ink-3)]"
        aria-hidden
      >
        <ArrowDown size={18} />
      </motion.div>
    </>
  );
}

function Thumbnail({ kind }: { kind: ThumbnailKind }) {
  switch (kind) {
    case "brief":
      return (
        <svg width={140} height={80} viewBox="0 0 140 80" aria-hidden>
          <rect x="22" y="14" width="96" height="6" rx="2" fill="var(--color-ink-1)" />
          <rect x="22" y="28" width="60" height="4" rx="2" fill="var(--color-ink-3)" />
          <rect x="22" y="44" width="22" height="14" rx="3" fill="var(--color-ink-1)" />
          <rect x="48" y="44" width="22" height="14" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" />
          <rect x="74" y="44" width="22" height="14" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" />
        </svg>
      );
    case "channels":
      return (
        <svg width={140} height={80} viewBox="0 0 140 80" aria-hidden>
          <rect x="14" y="14" width="40" height="40" rx="6" fill="var(--color-bg)" stroke="var(--color-border)" />
          <rect x="58" y="14" width="68" height="10" rx="3" fill="var(--color-ink-1)" />
          <rect x="58" y="28" width="50" height="6" rx="3" fill="var(--color-ink-3)" />
          <rect x="58" y="40" width="40" height="14" rx="3" fill="var(--color-accent)" />
        </svg>
      );
    case "dashboard":
      return (
        <svg width={140} height={80} viewBox="0 0 140 80" aria-hidden>
          <rect x="10" y="10" width="28" height="22" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" />
          <rect x="42" y="10" width="28" height="22" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" />
          <rect x="74" y="10" width="28" height="22" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" />
          <rect x="106" y="10" width="22" height="22" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" />
          <polyline points="12,60 30,52 50,56 72,46 96,50 124,40" fill="none" stroke="var(--color-ink-1)" strokeWidth="1.6" />
        </svg>
      );
    case "deep":
      return (
        <svg width={140} height={80} viewBox="0 0 140 80" aria-hidden>
          <circle cx="40" cy="40" r="22" fill="var(--color-bg)" stroke="var(--color-border)" />
          <path d="M40 40 L 40 18 A 22 22 0 0 1 62 40 Z" fill="var(--color-accent)" />
          <rect x="76" y="22" width="52" height="6" rx="3" fill="var(--color-ink-1)" />
          <rect x="76" y="34" width="44" height="4" rx="2" fill="var(--color-ink-3)" />
          <rect x="76" y="44" width="36" height="4" rx="2" fill="var(--color-ink-3)" />
        </svg>
      );
    case "budget":
      return (
        <svg width={140} height={80} viewBox="0 0 140 80" aria-hidden>
          <rect x="14" y="26" width="40" height="28" rx="4" fill="var(--color-bg)" stroke="var(--color-border)" />
          <rect x="86" y="26" width="40" height="28" rx="4" fill="var(--color-bg)" stroke="var(--color-accent)" />
          <path d="M58 40 H 80" stroke="var(--color-ink-3)" strokeWidth="1.4" strokeDasharray="3 3" />
          <path d="M76 36 L 82 40 L 76 44" stroke="var(--color-ink-1)" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case "copy":
      return (
        <svg width={140} height={80} viewBox="0 0 140 80" aria-hidden>
          <rect x="10" y="14" width="58" height="50" rx="4" fill="var(--color-bg)" stroke="var(--color-border)" />
          <rect x="78" y="14" width="50" height="50" rx="4" fill="var(--color-bg)" stroke="var(--color-border)" />
          <circle cx="103" cy="38" r="10" fill="var(--color-accent)" />
        </svg>
      );
    default:
      return null;
  }
}
