"use client";

import {
  Briefcase,
  Mic,
  Search,
  ArrowRight,
  Check,
  Sparkles,
  Target,
  PoundSterling,
  TrendingDown,
} from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { StatusPill } from "@/components/ui/status-pill";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { Disclosure } from "@/components/ui/disclosure";
import { EmptyState } from "@/components/ui/empty-state";
import { useState } from "react";

type Tab = "system" | "components" | "data";

const tabs: { id: Tab; label: string }[] = [
  { id: "system", label: "System" },
  { id: "components", label: "Components" },
  { id: "data", label: "Data viz" },
];

export default function StyleGuide() {
  const [tab, setTab] = useState<Tab>("system");

  return (
    <div className="space-y-12 pb-16">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-[40px] sm:text-[48px] leading-[1.05] text-[var(--color-ink-900)]">
            The system, on screen.
          </h1>
          <p className="mt-2 text-[14px] text-[var(--color-ink-600)] max-w-prose">
            Every Signal screen is built from these tokens and components.
            Specifications live in <code>DESIGN.md</code>; this page is the
            running expression of them.
          </p>
        </div>
        <SegmentedTabs
          ariaLabel="Style guide section"
          tabs={tabs}
          value={tab}
          onChange={setTab}
        />
      </header>

      {tab === "system" && <SystemSection />}
      {tab === "components" && <ComponentsSection />}
      {tab === "data" && <DataSection />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* System (tokens)                                                             */
/* -------------------------------------------------------------------------- */

function SystemSection() {
  return (
    <div className="space-y-12">
      <Block
        title="Neutral ramp"
        body="A warm 10-step grey scale, pure neutral with a subtle ivory shift. Pure black is reserved for ink-900; every text colour, border, and surface comes from this scale."
      >
        <div className="grid grid-cols-5 gap-3 max-w-3xl">
          {[
            { token: "--color-ink-0", hex: "#FFFFFF", label: "ink-0" },
            { token: "--color-bg", hex: "#FAFAF7", label: "bg" },
            { token: "--color-ink-50", hex: "#F4F4F0", label: "ink-50" },
            { token: "--color-ink-100", hex: "#E9E8E2", label: "ink-100" },
            { token: "--color-ink-200", hex: "#D4D3CC", label: "ink-200" },
            { token: "--color-ink-300", hex: "#B5B5AD", label: "ink-300" },
            { token: "--color-ink-400", hex: "#8A8A82", label: "ink-400" },
            { token: "--color-ink-500", hex: "#6E6E66", label: "ink-500" },
            { token: "--color-ink-600", hex: "#4A4A44", label: "ink-600" },
            { token: "--color-ink-900", hex: "#0A0A0A", label: "ink-900" },
          ].map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </Block>

      <Block
        title="Accent and editorial"
        body="One accent (signal green) and one editorial (violet, for the Instrument Serif italic moments). Status colours below."
      >
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-3xl">
          <Swatch token="--color-accent" hex="#10B981" label="accent" />
          <Swatch
            token="--color-accent-soft"
            hex="#ECFDF5"
            label="accent-soft"
          />
          <Swatch
            token="--color-editorial"
            hex="#6D28D9"
            label="editorial"
          />
          <Swatch token="--color-warning" hex="#B45309" label="warning" />
          <Swatch token="--color-negative" hex="#DC2626" label="negative" />
        </div>
      </Block>

      <Block
        title="Channel-type encoding"
        body="Channel-type colour stays consistent across table indicators, mix bars, deep-dive headers, and bar charts."
      >
        <div className="grid grid-cols-3 gap-3 max-w-xl">
          <Swatch
            token="--color-ch-digital"
            hex="#0A0A0A"
            label="ch-digital"
          />
          <Swatch
            token="--color-ch-physical"
            hex="#6D28D9"
            label="ch-physical"
          />
          <Swatch token="--color-ch-hybrid" hex="#10B981" label="ch-hybrid" />
        </div>
      </Block>

      <Block
        title="Chart palette — Signal 5"
        body="Multi-series chart colours are mapped by channel id, not array index. The Podcast line stays green even when the table is sorted by cost-per-signup. Hue-balanced for 8% colour-vision deficiency per Cloudscape methodology."
      >
        <div className="grid grid-cols-5 gap-3 max-w-3xl">
          <Swatch token="--color-series-1" hex="#0A0A0A" label="series-1" />
          <Swatch token="--color-series-2" hex="#10B981" label="series-2" />
          <Swatch token="--color-series-3" hex="#6D28D9" label="series-3" />
          <Swatch token="--color-series-4" hex="#B45309" label="series-4" />
          <Swatch token="--color-series-5" hex="#0F766E" label="series-5" />
        </div>
      </Block>

      <Block
        title="Type scale"
        body="Six steps for UI plus one display moment. Display is reserved for a single hero-level heading per route — never on section headings, card titles, or modal labels."
      >
        <div className="space-y-1 max-w-2xl">
          <TypeRow cls="t-meta" name="t-meta · 11/16/500" sample="LABELLED FOR THE SCAN" />
          <TypeRow cls="t-xs" name="t-xs · 12/16/400" sample="Helper, axis ticks, hint copy." />
          <TypeRow cls="t-sm" name="t-sm · 13/18/400" sample="Secondary body, table cells." />
          <TypeRow cls="t-base" name="t-base · 14/20/500" sample="Primary UI text, buttons, nav." />
          <TypeRow cls="t-md" name="t-md · 16/24/500" sample="Card titles, lead paragraphs." />
          <TypeRow cls="t-lg" name="t-lg · 20/28/600" sample="Section headings." />
          <TypeRow cls="t-xl" name="t-xl · 24/30/600" sample="Page titles." />
          <TypeRow
            cls="t-display"
            name="t-display · 36–44 italic"
            sample="Here's the mix we'd run."
          />
        </div>
      </Block>

      <Block
        title="Spacing"
        body="Strict 8-grid: 4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128. Half-pixel sizes are forbidden."
      >
        <div className="flex items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48, 64].map((px) => (
            <div key={px} className="flex flex-col items-center gap-2">
              <div
                style={{ height: px, width: px }}
                className="bg-[var(--color-ink-900)] rounded-sm"
              />
              <span className="t-meta text-[var(--color-ink-400)]">{px}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block
        title="Radius and elevation"
        body="Cards default to flat. Shadow appears only on floating layers: tooltips, modals, popovers."
      >
        <div className="flex flex-wrap gap-4">
          <Demo label="radius-sm 6">
            <div className="size-16 rounded-[6px] bg-[var(--color-ink-100)]" />
          </Demo>
          <Demo label="radius-md 8">
            <div className="size-16 rounded-[8px] bg-[var(--color-ink-100)]" />
          </Demo>
          <Demo label="radius-lg 12">
            <div className="size-16 rounded-[12px] bg-[var(--color-ink-100)]" />
          </Demo>
          <Demo label="shadow-sm (hover)">
            <div className="size-16 rounded-[8px] bg-[var(--color-ink-0)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]" />
          </Demo>
          <Demo label="shadow-md (modal)">
            <div className="size-16 rounded-[8px] bg-[var(--color-ink-0)] border border-[var(--color-border)] shadow-[var(--shadow-md)]" />
          </Demo>
        </div>
      </Block>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
/* -------------------------------------------------------------------------- */

function ComponentsSection() {
  return (
    <div className="space-y-12">
      <Block
        title="Buttons"
        body="One primary slot per surface. Default for standard CTAs, ghost for tertiary."
      >
        <div className="flex flex-wrap items-center gap-3">
          <button className="h-10 px-4 rounded-md bg-[var(--color-accent)] text-white text-[13.5px] font-semibold">
            Primary action
          </button>
          <button className="h-10 px-4 rounded-md bg-[var(--color-ink-900)] text-[var(--color-bg)] text-[13.5px] font-medium">
            Default
          </button>
          <button className="h-10 px-4 rounded-md border border-[var(--color-border)] bg-[var(--color-ink-0)] text-[var(--color-ink-900)] text-[13.5px] font-medium">
            Outline
          </button>
          <button className="h-10 px-4 rounded-md text-[13.5px] font-medium text-[var(--color-ink-600)] hover:bg-[var(--color-ink-50)]">
            Ghost
          </button>
          <button className="h-10 px-4 rounded-md bg-[var(--color-negative)] text-white text-[13.5px] font-medium">
            Destructive
          </button>
        </div>
      </Block>

      <Block
        title="Status pills"
        body="Status communicated by colour AND label/dot for accessibility."
      >
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill tone="healthy" />
          <StatusPill tone="attention" />
          <StatusPill tone="critical" />
        </div>
      </Block>

      <Block
        title="IconBox"
        body="Square icon container in three sizes and five tones. Replaces 11+ inline duplications previously scattered across the codebase."
      >
        <div className="flex flex-wrap items-center gap-3">
          <IconBox Icon={Briefcase} size="sm" tone="default" ariaLabel="Default" />
          <IconBox Icon={Mic} size="md" tone="muted" ariaLabel="Muted" />
          <IconBox Icon={Search} size="lg" tone="solid" ariaLabel="Solid" />
          <IconBox Icon={Target} size="lg" tone="accent" ariaLabel="Accent" />
          <IconBox Icon={Sparkles} size="lg" tone="editorial" ariaLabel="Editorial" />
        </div>
      </Block>

      <Block
        title="Inputs"
        body="36–40px height, 6px radius. Accent green focus ring at 2px offset."
      >
        <div className="flex flex-col gap-3 max-w-sm">
          <label className="t-meta text-[var(--color-ink-400)]">Email</label>
          <input
            type="email"
            placeholder="you@company.com"
            className="h-10 px-3 rounded-md border border-[var(--color-border)] bg-[var(--color-ink-0)] text-[14px] focus:outline-none focus:border-[var(--color-ink-600)]"
          />
        </div>
      </Block>

      <Block
        title="Disclosure"
        body="Collapse/expand pattern shared across channel cards and risk panels."
      >
        <div className="max-w-md rounded-md border border-[var(--color-border)] bg-[var(--color-ink-0)] p-4">
          <Disclosure
            trigger={
              <span className="text-[14px] font-medium text-[var(--color-ink-900)]">
                Why this channel
              </span>
            }
          >
            <p className="pt-3 text-[13px] text-[var(--color-ink-600)] leading-relaxed">
              Sponsored content targeting senior titles at companies with
              10–250 staff. CPM has crept up 18% over the last fortnight.
            </p>
          </Disclosure>
        </div>
      </Block>

      <Block
        title="Empty state"
        body="No illustration. Single icon + heading + body + one primary action. Per Linear/Stripe/Vercel B2B convention."
      >
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-ink-0)]">
          <EmptyState
            Icon={Target}
            title="Nothing running yet."
            body="Start with a brief and we'll build the channel mix."
            action={{ label: "Start with a brief", href: "/brief" }}
          />
        </div>
      </Block>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Data viz                                                                    */
/* -------------------------------------------------------------------------- */

function DataSection() {
  return (
    <div className="space-y-12">
      <Block
        title="Chart rules"
        body="One ruleset for every chart in the system."
      >
        <ul className="space-y-2 text-[13.5px] text-[var(--color-ink-600)] max-w-prose">
          <li className="flex gap-2">
            <span className="t-meta text-[var(--color-ink-400)] shrink-0 w-32">
              Gridlines
            </span>
            <span>1px stroke, dashed 2 4, opacity 0.7. Horizontal only.</span>
          </li>
          <li className="flex gap-2">
            <span className="t-meta text-[var(--color-ink-400)] shrink-0 w-32">
              Axes
            </span>
            <span>No axis line. Tick labels 11px ink-400, tabular-nums.</span>
          </li>
          <li className="flex gap-2">
            <span className="t-meta text-[var(--color-ink-400)] shrink-0 w-32">
              Tooltip
            </span>
            <span>Single shared component. ink-0 surface, border, shadow-md.</span>
          </li>
          <li className="flex gap-2">
            <span className="t-meta text-[var(--color-ink-400)] shrink-0 w-32">
              Legend
            </span>
            <span>Line+dot SVG swatches, never circle-only.</span>
          </li>
          <li className="flex gap-2">
            <span className="t-meta text-[var(--color-ink-400)] shrink-0 w-32">
              Animation
            </span>
            <span>Initial entrance only. Subsequent updates do not animate.</span>
          </li>
          <li className="flex gap-2">
            <span className="t-meta text-[var(--color-ink-400)] shrink-0 w-32">
              Mapping
            </span>
            <span>Series colour by channel id (Signal 5), not by array index.</span>
          </li>
        </ul>
      </Block>

      <Block
        title="Forbidden patterns"
        body="Things we will not ship."
      >
        <ul className="space-y-2 text-[13.5px] text-[var(--color-ink-600)] max-w-prose">
          {[
            "Two horizontal bars at the same visual scale stacked within one card",
            "font-display on anything other than a route's single hero <h1>",
            "Hardcoded hex/rgba where a token exists",
            "Half-pixel font sizes (text-[10.5px] etc.)",
            "Off-grid spacing (px-3.5, gap-0.5)",
            "Status indicated by colour alone",
            "Animating numbers on data refresh",
            "Empty-state illustrations",
            "Pie or donut charts for 5+ segments",
            "Gauges (use bullet charts or radials instead)",
          ].map((s) => (
            <li key={s} className="flex items-start gap-2">
              <span className="mt-1.5 size-1 rounded-full bg-[var(--color-negative)] shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </Block>

      <Block
        title="Motion"
        body="Easing tokens used across the system."
      >
        <div className="space-y-2 max-w-sm">
          <MotionRow label="Micro · 120ms" />
          <MotionRow label="Small · 180ms" />
          <MotionRow label="Medium · 240ms" />
          <MotionRow label="Page · 320ms" />
        </div>
      </Block>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function Block({
  title,
  body,
  children,
}: {
  title: string;
  body?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[var(--color-ink-900)]">
        {title}
      </h2>
      {body && (
        <p className="mt-1 text-[13.5px] text-[var(--color-ink-600)] max-w-prose">
          {body}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Swatch({
  token,
  hex,
  label,
}: {
  token: string;
  hex: string;
  label: string;
}) {
  return (
    <div
      className="rounded-md border border-[var(--color-border)] overflow-hidden bg-[var(--color-ink-0)]"
      title={token}
    >
      <div className="h-16" style={{ background: hex }} />
      <div className="p-2.5">
        <div className="text-[12px] font-medium text-[var(--color-ink-900)]">
          {label}
        </div>
        <div className="text-[10.5px] font-mono text-[var(--color-ink-400)] mt-0.5 truncate">
          {hex}
        </div>
      </div>
    </div>
  );
}

function TypeRow({
  cls,
  name,
  sample,
}: {
  cls: string;
  name: string;
  sample: string;
}) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-4 py-2 border-b border-[var(--color-border)] last:border-b-0 items-baseline">
      <span className="t-meta text-[var(--color-ink-400)]">{name}</span>
      <span className={cls}>{sample}</span>
    </div>
  );
}

function Demo({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="t-meta text-[var(--color-ink-400)]">{label}</span>
    </div>
  );
}

function MotionRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-ink-0)] px-3 py-2">
      <span className="text-[13px] text-[var(--color-ink-900)]">{label}</span>
      <span className="t-meta text-[var(--color-ink-400)]">ease-out-expo</span>
    </div>
  );
}

// Suppress unused-import warning for icons referenced only in commented examples
const _unused = { ArrowRight, Check, PoundSterling, TrendingDown };
void _unused;
