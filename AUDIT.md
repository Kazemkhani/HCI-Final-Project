# Signal — Visual & Functional Audit (v1)

**Date:** 25 April 2026
**Scope:** Full codebase + live deployment at https://signal-drab-xi.vercel.app
**Method:** code-level walk-through (every file under `app/`, `components/`, `lib/`) plus user-reported screenshot evidence.

This document is the source of issues. The system that fixes them is `DESIGN.md`. The implementation order is `IMPLEMENTATION_PLAN.md`.

---

## Critical (must fix before any further work)

### C1 — Brief budget desyncs from channel-mix total

**Where:** `lib/brief-store.ts` + `lib/mix-store.ts`.
**Symptom:** screenshot shows "Budget £32.3k / month" in the brief sidebar while "Total £10,000 / mo" sits directly below it in the proposed-mix block. Same screen, two different numbers for the same concept.
**Cause:** `mix-store.total` is initialised once from `CHANNELS.allocation` sum (£10,000) at module load. It is never recomputed when `brief-store.budget` changes. The two stores are independent.
**Fix:** Remove `total` from `mix-store` state; derive on read (`Object.values(allocations).reduce((a,b)=>a+b, 0)`). On `brief-store.setBudget(n)`, call a `mix-store.scaleTo(n)` action that proportionally rescales each channel's allocation. Persist version bump to invalidate stale state.

### C2 — Channel-card audience-match bar collides with allocation slider

**Where:** `app/(signal)/channels/page.tsx` ChannelCard component (~lines 313–349).
**Symptom:** a `h-1.5` solid black "Audience match" bar sits 12px above a green range-slider track of nearly identical visual scale. The eye reads them as connected — as if the slider adjusts the audience match.
**Fix:** Replace audience match bar with a 28px `RadialScore` next to the score number. Move slider into a clearly separated "Adjust allocation" zone with `border-t` divider and explicit `min`/`max` value labels.

### C3 — Status colour `attention` is hardcoded `#B45309` in five places

**Where:** `lib/mock-data.ts:403`, `app/(signal)/dashboard/page.tsx:159`, `components/dashboard/alerts.tsx:31`, `components/dashboard/trend-chart.tsx:31`, `app/(signal)/copy/page.tsx:344`.
**Symptom:** changing the warning colour requires editing five files. Some uses use the `--color-warning` variable correctly; the inconsistency means the colour can drift.
**Fix:** All five → `var(--color-warning)`.

---

## Major

### M1 — `font-display` (Instrument Serif italic) used 18 times across the app

CLAUDE.md/BUILD.md state "use rarely, hero moments only." Current usage extends to `<h2>` section headings, modal titles, card titles, even the rewrite *body* on `/copy`. The serif has lost its specialness because it is the default heading style. Fix: reduce to **one display element per route**, only on the hero `<h1>`. All other headings → `text-lg` Geist Sans 600.

**Affected:** `dashboard/page.tsx` (Greeting `h1` keeps; "Cross-channel read" loses, empty state loses), `alerts.tsx`, `trend-chart.tsx`, `deep-dive-charts.tsx`, `channels/page.tsx` brief card heading, `channels/[id]/page.tsx` Recommendation `h2`, `budget/page.tsx` decline modal, `copy/page.tsx` rewrite body and empty state, `flow/page.tsx` Clarity Check section + node titles.

### M2 — 23 distinct font-size values, no scale

`text-[10px]` through `text-[48px]`, including half-pixel `text-[10.5px]`/`text-[12.5px]`/`text-[13.5px]`. Fix: collapse to the 7-step scale defined in DESIGN.md §1.2.

### M3 — IconBox pattern duplicated 11 times

`size-7/9/12 rounded-md/lg grid place-items-center` appears with subtly different background colours and ARIA across 11 locations. Fix: introduce `<IconBox size tone />` primitive at `components/ui/icon-box.tsx`. Replace all instances.

### M4 — Tab-switcher implemented twice

`dashboard/page.tsx` date-range tabs and `trend-chart.tsx` metric tabs are byte-for-byte the same UI with different state hooks. Fix: extract `<SegmentedTabs />` primitive.

### M5 — Disclosure (collapse/expand) implemented twice with drift

`channels/page.tsx` (`duration: 0.18`) and `budget/page.tsx` (`duration: 0.2`) both implement Framer height-collapse. Fix: shared `<Disclosure />` component.

### M6 — Trend chart palette uses hardcoded hexes by index

`trend-chart.tsx` `palette` array assigns colours by channel index, not channel id. Reordering channels would shift colour assignments. Fix: replace with channel-id → series-token mapping per DESIGN.md §1.1 Signal 5 palette.

### M7 — Deep-dive bar chart always renders `--color-ink-1` regardless of channel

`deep-dive-charts.tsx:169` `<Bar fill="var(--color-ink-1)" />` is constant. The audience-match bars on the LinkedIn deep-dive show identically to the Podcast deep-dive — the channel's identity is not preserved. Fix: pass channel.type and resolve to `--ch-digital/physical/hybrid`.

### M8 — Tooltip styling diverges across three chart components

`trend-chart` tooltip has min-width and date header; `deep-dive-charts` area-tooltip has no min-width and a smaller date format; bar-tooltip omits the colour swatch entirely. Fix: shared `<ChartTooltip />` component.

### M9 — `aria-sort` missing on table headers

`channel-table.tsx` sort buttons announce only the column label. Screen readers cannot tell whether a column is sorted, or in which direction. Fix: add `aria-sort` on `<th>` derived from sort state.

### M10 — Tablist on trend chart has no `aria-label`

`trend-chart.tsx:53` `<div role="tablist">` has no label. The dashboard's range tablist is correct.

### M11 — Modal focus management missing

Budget decline modal (`budget/page.tsx`) renders `role="dialog" aria-modal="true"` but no focus trap, no autofocus, no Escape handler. Keyboard user is stranded behind the overlay. Fix: use shadcn's `Dialog` primitive (already installed) which handles focus correctly.

### M12 — Channel-mix sticky CTA breaks at 768–1023px

The footer uses `lg:ml-64` to clear the sidebar, but at 768–1023px the sidebar is hidden and the top-nav is double-row. The CTA may overlap the last channel card. Fix: remove the lg-only offset; stretch full width with proper `pb-32` clearance on the page.

### M13 — `/channels` two-column layout missing intermediate breakpoint

Jumps from 1-col (<1024px) to `[340px_1fr]` (≥1024px). At 768–1023px the brief sidebar stacks above five cards, pushing primary content far below the fold. Fix: add `md:grid-cols-[280px_1fr]`.

### M14 — `--color-editorial` and `--color-physical` are the same value but separate tokens

`#6D28D9` lives in two tokens with overlapping semantics. Confuses the design rule "editorial = serif moments only." Fix: keep a single `--ch-physical` token, separate `--editorial` clearly distinguished by intent (rare display moment) — but in this rebuild both happen to share #6D28D9, which is acceptable.

### M15 — `text-rendering: optimizeLegibility` (American spelling)

CSS keyword, not UI copy. Acceptable but noted.

### M16 — Flow page restates the same fact twice

"Five steps from a fresh brief… Average path: under four minutes." appears in the page lead and again at the page footer. Delete the duplicate.

### M17 — Slider `max={9000}` hardcoded in ChannelCard

When brief budget is £32.3k, slider caps at £9,000 silently. Fix: derive `max` from current total minus floor.

### M18 — Channel mix proposed-mix segmented bar shows only 3 distinct colours for 5 channels

The bar segments use `typeColour` which only has 3 values (digital/physical/hybrid). Two channels share black, two share purple — visual ambiguity in the legend below. Fix: switch to Signal 5 palette mapped by channel id for this bar specifically.

---

## Minor

### m1 — Off-grid spacing (`px-3.5`, `gap-0.5`)

Multiple instances. Fix: snap to grid.

### m2 — Shimmer gradient uses raw `rgba()` instead of border token

`globals.css:168–176`. Fix: switch to `--border` reference.

### m3 — Sidebar overflow on short viewports

`sticky top-0 h-screen` with no `overflow-y-auto`. Fix: add overflow scroll.

### m4 — Avatar `aria-hidden` with no SR-only label

Sidebar and TopNav avatar both `aria-hidden`. Fix: add SR-only "Logged in as John Doe" text.

### m5 — Half-pixel sizes

`text-[10.5px]`, `text-[12.5px]`, `text-[13.5px]` x ~12 occurrences. Fix: round to scale.

### m6 — `var(--color-warning-soft, #FEF3C7)` redundant fallback

Fix: drop the fallback hex.

### m7 — Sparkline has no chart `margin` prop

`sparkline.tsx`. Fix: explicit `{ top: 2, right: 2, bottom: 2, left: 2 }`.

### m8 — Step indicator string "STEP 1 OF 4" hard-coded uppercase characters

Should use CSS `uppercase` transform on lower-case source text to preserve i18n potential.

---

## Design-system gaps (no consistent rule today)

1. **No type scale.** 23 ad-hoc font sizes.
2. **No spacing audit.** Several off-grid values pass through.
3. **No icon-box primitive.**
4. **No `<ChartTooltip />` primitive.**
5. **No `<SegmentedTabs />` primitive.**
6. **No `<Disclosure />` primitive.**
7. **No `<EmptyState />` primitive.**
8. **No `<StatusPill />` primitive.**
9. **Colour palette under-specified** — only 3 channel colours for 5 channels, only 1 mid-grey.

`DESIGN.md` defines all of these.

---

## Quick-win fix order (highest impact first)

1. **C1** — state desync (1 user-visible bug, eliminates a screen-of-doubt)
2. **C2** — channel-card visual collision (the most cognitively damaging issue)
3. **C3** — status colour token unification (touches 5 files, pure cleanup)
4. **M1** — font-display cull (single highest-leverage visual restraint)
5. **M2** + **M5** — type scale + half-pixel cull (system rigour)
6. **M3** — IconBox primitive
7. **M6** + **M7** + **M18** — chart palette unification with Signal 5
8. **M4** + **M5** + **M8** — extract SegmentedTabs / Disclosure / ChartTooltip
9. **M9** + **M10** + **M11** — a11y fixes (tablist, sort, modal focus)
10. **M12** + **M13** — responsive break fixes
