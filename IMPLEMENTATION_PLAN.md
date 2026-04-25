# Signal — Redesign Implementation Plan

**Date:** 25 April 2026
**Source documents:** `DESIGN.md` (system), `AUDIT.md` (issues).
**Output:** clean working tree at the end of every step, all in branch `main`. Commit per logical unit, deploy at the end.

---

## R1 — State model fix (critical)

**Files:**
- `lib/mix-store.ts`
- `lib/brief-store.ts`
- `app/(signal)/channels/page.tsx` (consumer of `total`)
- `components/dashboard/*.tsx` (any consumers)

**Changes:**
1. Remove `total` from `MixState`. Replace with derived selector `useMixTotal()`.
2. Add `scaleTo(newBudget)` action that proportionally rescales `allocations` while preserving the relative split.
3. In `brief-store.setBudget`, call `useMixStore.getState().scaleTo(n)` after the budget update.
4. In ChannelCard slider, derive `max` from `total - (otherChannels * MIN_PER_CHANNEL)`.
5. Bump persist `version` to 3 to flush stale state.

**Acceptance:** changing budget on `/brief` immediately updates the proposed-mix total on `/channels`. Sliders cap correctly at any budget.

---

## R2 — Design tokens v2

**Files:** `app/globals.css`, `lib/mock-data.ts` (palette mapping).

**Changes:**
1. Replace `:root` colour block with the 10-stop neutral ramp + accent + status + ch-* + series-* tokens from DESIGN.md §1.
2. Replace ad-hoc shadcn aliases to map onto the new ramp.
3. Add Tailwind v4 utility classes for the type scale: `.text-meta`, `.text-xs`, `.text-sm`, `.text-base`, `.text-md`, `.text-lg`, `.text-xl`, `.text-display`. Each carries size + line-height + letter-spacing + weight.
4. Add `--radius-pill/sm/md/lg` tokens.
5. Update `--shadow-md` to the deeper `0 8px 24px rgba(10,10,10,0.08)`.
6. Add easing tokens: `--ease-out-expo`, `--ease-in-sharp`.
7. Move shimmer gradient to use `--border` reference.

**Acceptance:** every value used in components maps back to a token. No raw hex/rem/px in components except where a token does not yet exist.

---

## R3 — Shared component primitives

**New files:**
- `components/ui/icon-box.tsx`
- `components/ui/segmented-tabs.tsx`
- `components/ui/disclosure.tsx`
- `components/ui/empty-state.tsx`
- `components/ui/status-pill.tsx`
- `components/dashboard/chart-tooltip.tsx`

**Acceptance:** each primitive replaces ≥2 inline duplications. Storybook-style props (size, tone, etc).

---

## R4 — Channel-card redesign (the C2 critical fix)

**Files:** `app/(signal)/channels/page.tsx` ChannelCard component.

**Changes:**
1. Replace `<h3>` channel name + `<span>` type tag with: name (text-md weight 500) + StatusPill if non-healthy + IconBox lg.
2. Replace audience-match horizontal bar with a 32px RadialScore + numeric badge.
3. Move slider into a clearly bordered sub-section labelled "Adjust monthly allocation" with min/max value labels.
4. Replace channel-mix top sidebar bar to use Signal 5 colours.

**Acceptance:** screenshot test passes — no two horizontal bars sit at identical visual scale within any one card.

---

## R5 — Dashboard polish

**Files:** `components/dashboard/*.tsx`, `app/(signal)/dashboard/page.tsx`.

**Changes:**
1. Trend chart: switch palette to Signal 5 (id-mapped). Adopt shared ChartTooltip. Tabs use SegmentedTabs primitive.
2. Channel table: sort buttons gain `aria-sort`. Hover state cleaner. Status bar gets text equivalent on the row for screen readers.
3. Metric tiles: type rationalised onto scale.
4. Alerts: section heading drops `font-display`, becomes `text-lg` weight 600. Alert IconBox uses primitive.

**Acceptance:** dashboard reads at a glance; chart legend and table both communicate channel identity consistently.

---

## R6 — Brief / Budget / Deep-Dive / Copy / Flow polish

**Files:** the remaining route pages.

**Changes per screen:**
- **Brief:** `font-display` only on the page hero (which is currently the step `<h1>` — fine). Goal cards' default-selected state stronger. Step indicator uses pill-shaped pips.
- **Budget:** decline modal swapped to shadcn Dialog (focus trap, Esc handler). Flow visual tightened: directional arrow becomes more legible, source/destination cards use IconBox primitive.
- **Deep-dive:** Recommendation `<h2>` drops display. Audience-match bar chart uses channel.type colour. Audience match bars right-anchor numeric labels.
- **Copy:** rewrite block drops display body — uses `text-md` italic Geist Sans. Score dial keeps display moment? No — keep the dial but lose extraneous serif on the section header.
- **Flow:** Clarity Check section heading drops display. Duplicate caption removed. Node titles to Geist Sans.

---

## R7 — A11y & responsive sweep

**Changes:**
1. `aria-label` on every tablist.
2. `aria-sort` on every sortable `<th>`.
3. `aria-pressed` on legend highlight buttons.
4. Sidebar avatar gets SR-only "Logged in as John Doe" text.
5. Modal focus trap on Decline dialog (via shadcn Dialog).
6. Sidebar `overflow-y-auto`.
7. `/channels` adds `md:grid-cols-[280px_1fr]` intermediate breakpoint.
8. Channel-mix sticky CTA loses `lg:ml-64`, becomes full-width with proper page padding.

**Acceptance:** axe-core clean run on every route. Tab order sensible. Esc closes modals. Reduced-motion still honoured.

---

## R8 — Style guide route (`/style-guide`)

For Stage 3 of the report ("design style guide" requirement). Single page rendering: type scale, neutral ramp, accent + status colours, channel palette, chart palette, components (Button, Input, IconBox, StatusPill, SegmentedTabs, EmptyState).

**Acceptance:** produces a screenshot-friendly page that documents the entire system on screen, suitable for inclusion in the report and the pitch deck.

---

## R9 — Final verification + redeploy

1. `pnpm build` clean
2. `pnpm lint` clean
3. axe-core scan clean per route
4. Playwright screenshot pass at 1440 / 1280 / 768
5. Manual interaction pass: brief → channels → dashboard → channel deep-dive → budget → /copy → /flow
6. `vercel deploy --prod`
7. Post final live URL + new screenshots

---

## Sequencing note

R1/R2 land first — they're foundational. R3 (primitives) before R4–R6 (consumers). R7 last because some a11y fixes need the new primitives.

Branch strategy: all on `main` (this is a coursework prototype, not a long-running project). Commit per atomic unit. Deploy once at end.
