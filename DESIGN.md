# Signal — Design System

**Version 2.0** · 25 April 2026

This is the canonical visual system for Signal. Every value in the codebase ultimately maps back to a rule in this document. If a screen, component, or token disagrees with this file, it is the screen that is wrong.

The system draws on Linear, Stripe, Vercel, and Notion — not as templates to clone, but as proof points for what restraint, hierarchy, and density discipline look like in shipped B2B software.

---

## 0. First principles

1. **Greyscale first.** Hierarchy is established through size, weight, and contrast — never through colour. Colour is added last and only when it carries meaning.
2. **One emphasis lever at a time.** Large *or* bold *or* dark — never all three on the same element.
3. **Most surfaces are flat.** Shadow appears only on floating layers (popovers, modals, command palette) and only at one defined elevation.
4. **Numbers are right-aligned, body text is left-aligned.** Table number columns use tabular numerals.
5. **Density follows persona.** John is a power user — we err compact, not comfortable. Inset padding always smaller than block spacing.
6. **Empty space is the cheapest design element.** Before adding decoration, double the padding.
7. **Animate intent, not data.** State transitions animate. Data refreshes do not — animating a number that just changed creates uncertainty about whether the value is real.

---

## 1. Foundations

### 1.1 Colour

#### Neutral ramp (10 stops, OKLCH-grounded warm grey)

| Token            | Hex       | Use                                                             |
|------------------|-----------|-----------------------------------------------------------------|
| `--ink-0`        | `#FFFFFF` | Surfaces (cards, dropdowns, sheets)                             |
| `--bg`           | `#FAFAF7` | Page background — warm off-white, never pure white              |
| `--ink-50`       | `#F4F4F0` | Subtle row hover, secondary surface                             |
| `--ink-100`      | `#E9E8E2` | Strong border, divider on bright surface                        |
| `--ink-200`      | `#D4D3CC` | Disabled control track                                          |
| `--ink-300`      | `#B5B5AD` | Tertiary text on dark, decorative ticks                         |
| `--ink-400`      | `#8A8A82` | Tertiary text                                                   |
| `--ink-500`      | `#6E6E66` | Quiet metadata                                                  |
| `--ink-600`      | `#4A4A44` | Secondary text                                                  |
| `--ink-900`      | `#0A0A0A` | Primary text, primary inverse surface                           |

`--border` aliases `--ink-100`. Borders are 1px solid at this token; never lower.

#### Accent

`--accent` `#10B981` — signal green. Used for: primary CTA fill, focus ring, positive deltas, "go" status. **Never** as a decorative tint.

`--accent-soft` `#ECFDF5` — accent on surface (light tint of green for positive status pills).

#### Editorial (display only)

`--editorial` `#6D28D9` — used **exclusively** for `Instrument Serif` italic moments. Never on UI controls. Never on charts.

#### Status

| Token              | Hex       | Use                                                       |
|--------------------|-----------|-----------------------------------------------------------|
| `--success`        | `#10B981` | Healthy state badges (= `--accent`)                       |
| `--success-soft`   | `#ECFDF5` | Background of success pill                                |
| `--warning`        | `#B45309` | Attention state badges                                    |
| `--warning-soft`   | `#FEF3C7` | Background of warning pill                                |
| `--negative`       | `#DC2626` | Critical state, error text                                |
| `--negative-soft`  | `#FEF2F2` | Background of error pill                                  |

#### Channel-type encoding

Used in: dashboard table left-edge bar, channel mix bar, deep-dive header chip, channel cards, channel deep-dive bar chart fill.

| Type     | Token         | Hex       |
|----------|---------------|-----------|
| Digital  | `--ch-digital`| `#0A0A0A` |
| Physical | `--ch-physical`| `#6D28D9`|
| Hybrid   | `--ch-hybrid` | `#10B981` |

#### Multi-series chart palette (Signal 5)

For the dashboard 30-day trend chart and any future multi-series visual. Hue-balanced, alternating bolder/milder, all tested for protanopia and deuteranopia per Cloudscape methodology.

| Token        | Hex       | Default channel       |
|--------------|-----------|-----------------------|
| `--series-1` | `#0A0A0A` | LinkedIn Ads          |
| `--series-2` | `#10B981` | Podcast Sponsorship   |
| `--series-3` | `#6D28D9` | Google Search         |
| `--series-4` | `#B45309` | SaaStr Europa         |
| `--series-5` | `#0F766E` | PR Placement          |

Each series is mapped by **channel id**, not by index, so the colour sticks to the channel even after sorting/reordering.

---

### 1.2 Typography

**Body / UI:** Geist Sans, weights 400 / 500 / 600. Body text uses `font-feature-settings: "ss01", "cv11"` for Geist's recommended stylistic set.

**Display:** Instrument Serif italic 400 — class `.font-display`. **Reserved for the page-level hero title only.** Maximum one display element per route. Never used on `<h2>`/`<h3>`/`<h4>`. Never used in cards or panels.

**Mono / numerals:** Geist Mono, with `font-variant-numeric: tabular-nums` enforced. Used for every numeric value: currency, counts, percentages, dates, timers.

#### Type scale (6 steps + 1 display)

| Token         | px / line-height | Weight | Use                                                            |
|---------------|------------------|--------|----------------------------------------------------------------|
| `text-meta`   | 11 / 16          | 500    | Uppercase labels, table headers, captions; letter-spacing 0.06em |
| `text-xs`     | 12 / 16          | 400    | Hints, helper text, axis ticks                                  |
| `text-sm`     | 13 / 18          | 400    | Secondary body, table cells                                     |
| `text-base`   | 14 / 20          | 500    | Primary UI text, buttons, nav, body                             |
| `text-md`     | 16 / 24          | 500    | Card titles, lead paragraphs                                    |
| `text-lg`     | 20 / 28          | 600    | Section headings (replacing former `font-display` H2 use)       |
| `text-xl`     | 24 / 30          | 600    | Page titles (non-display routes)                                |
| `text-display`| 36 / 40          | 400    | Hero titles only — Instrument Serif italic                      |

**Half-pixel sizes are forbidden.** Any leftover `text-[10.5px]`, `text-[12.5px]`, `text-[13.5px]` is rounded to the nearest scale step.

**Letter-spacing rules:**
- Display (Instrument Serif): `-0.01em`
- `text-xl` headings: `-0.015em`
- `text-meta` uppercase labels: `+0.06em`
- All other body: default `0`

---

### 1.3 Spacing — strict 8 grid

Permitted values, in pixels: `4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128`. The `20` step is added (vs the BUILD.md's `4/8/12/16/24/32/48/64/96/128`) because Linear's spacing system uses 20 as a transitional step between 16 and 24, and several screens benefit from it.

Off-grid spacing values are forbidden. No `px-3.5`, no `gap-0.5`, no `mt-7`. If a value isn't on the scale, the layout is wrong, not the scale.

**Rule of thumb:** inset padding ≤ block spacing. A card with 16px inset padding sits 24px from its neighbour.

---

### 1.4 Radius

| Token             | Value | Use                          |
|-------------------|-------|------------------------------|
| `--radius-pill`   | 9999  | Status pills, chips          |
| `--radius-sm`     | 6     | Buttons, inputs              |
| `--radius-md`     | 8     | Cards, panels                |
| `--radius-lg`     | 12    | Modal containers             |

The previous `8 / 12 / 16` system collapsed buttons and cards onto the same radius, which broke the visual difference between control and container. The new 6/8/12 split solves this.

---

### 1.5 Elevation

Two levels only, both reserved for genuinely floating layers.

| Token       | Value                                | Use                              |
|-------------|--------------------------------------|----------------------------------|
| `shadow-sm` | `0 1px 2px rgba(10,10,10,0.04)`      | Cards on hover only              |
| `shadow-md` | `0 8px 24px rgba(10,10,10,0.08)`     | Modals, popovers, command palette|

**Default card surface is flat** — `1px solid var(--border)` only, no shadow. This is Linear's pattern. Cards earn shadow on hover; they don't wear it at rest.

---

### 1.6 Motion

#### Durations

| Class           | Duration   | Use                                  |
|-----------------|------------|--------------------------------------|
| Micro           | 120ms      | Hover, focus, button press           |
| Small           | 180ms      | Toggle, chip select, dropdown open   |
| Medium          | 240ms      | Modal open, panel collapse           |
| Page            | 320ms      | Route transitions                    |

#### Easing

- **Entrance:** `cubic-bezier(0.16, 1, 0.3, 1)` — Vercel's "ease-out-expo" feel
- **Exit:** `cubic-bezier(0.4, 0, 1, 1)` — sharper accelerating exit
- **State change** (colour, opacity): `linear` — no easing on values that have no physical analogy
- **Spring (Framer):** `{ type: "spring", stiffness: 320, damping: 30 }` for cards entering, slider thumbs

#### Forbidden

- `ease-in-out` on any UI micro-interaction (feels mechanical)
- Animating numbers on data refresh (creates uncertainty)
- Animating table row height on filter changes
- Parallax, infinite loops, attention-stealing motion

#### `prefers-reduced-motion`

All non-essential motion disables to `0.01ms`. Already enforced globally in `app/globals.css`.

---

## 2. Components

### 2.1 Button

**Sizes:** `sm` 28px / `md` 36px / `lg` 40px. The previous build used 40px everywhere, which crowds dense surfaces. New default is `md`.

**Variants:**
- **Primary** — `bg-[var(--accent)] text-white`. Used for the *one* most important action on a screen (Launch, Approve, Score it).
- **Default** — `bg-[var(--ink-900)] text-[var(--bg)]`. Standard call to action.
- **Outline** — `border border-[var(--border)] bg-transparent text-[var(--ink-900)]`. Secondary actions.
- **Ghost** — text only, hover adds `bg-[var(--ink-50)]`. Tertiary.
- **Destructive** — `bg-[var(--negative)] text-white`. Reserved for permanent removals; never the primary slot.

**Focus ring:** `outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px;`. WCAG 2.2 SC 2.4.11 compliant.

**Icon-only buttons** require `aria-label`. Minimum hit target 32×32px (we relax from MD3's 48 because this is desktop B2B).

### 2.2 Input

40px height, 13px text, 8px horizontal padding, 1px `--border`, 6px radius. Focus replaces the border with `--accent` and adds the standard outline ring.

**Label** sits 4px above the input, `text-meta` style. Required fields unmarked; optional fields explicitly marked `(optional)` in `--ink-400`.

### 2.3 Card

Base: `bg-[var(--ink-0)] border border-[var(--border)] rounded-[var(--radius-md)]`. No shadow at rest. Inset padding always one of: `16, 20, 24` depending on content density.

**Card titles:** `text-md` weight 500. **Never** `font-display`.

### 2.4 Status pill

Pill shape (`--radius-pill`), 22px tall, 8px horizontal padding, `text-meta` upper-case label.

| State        | Background       | Foreground   | Dot       |
|--------------|------------------|--------------|-----------|
| Healthy      | `--success-soft` | `--success`  | `--success` |
| Attention    | `--warning-soft` | `--warning`  | `--warning` |
| Critical     | `--negative-soft`| `--negative` | `--negative`|

Status is communicated by the dot **and** the label — never colour-only. Colour-blind friendly.

### 2.5 Chip / segmented control

28px tall, 12px horizontal padding, `text-sm`, `--radius-sm`, 1px `--border`. Selected state: solid `--ink-900` fill, white text. Hover: border darkens to `--ink-200`.

### 2.6 Slider (range input)

40px tall total reaction area, but the visual track is 4px tall, accent green fill from min, `--ink-200` empty. Thumb 16px circle, `--ink-900` fill, white border, focus-visible ring.

**Sliders are never paired with passive bars at the same visual scale.** The Audience-match-bar/Allocation-slider collision in the previous build is the canonical example of what to avoid.

### 2.7 Table

- Row height: 44px (compact-comfortable balance for our data)
- Header row 36px, `text-meta` uppercase, `--ink-400` text, no background fill
- Numbers right-aligned, currency right-aligned, names left-aligned
- Hover: `bg-[var(--ink-50)]` row tint
- Sort indicator: chevron at right edge of header on hover; only the active direction visible when sorted; sort state announced via `aria-sort`
- Status indication: 2px left-edge bar in status colour **plus** an `aria-label` text equivalent
- No zebra. No vertical separators.

### 2.8 IconBox

Standardised primitive for the "rounded square containing an icon" pattern. Variants:

| Size | Box   | Icon | Use                           |
|------|-------|------|-------------------------------|
| `sm` | 28px  | 14   | Avatars, evidence row markers |
| `md` | 36px  | 16   | Inline list icons             |
| `lg` | 48px  | 20   | Channel headers, hero icons   |

Tones: `default` (bg-50, ink-900), `accent` (accent fill, white icon), `editorial` (editorial fill, white icon), `solid` (ink-900 fill, white icon).

Replaces 11+ inline duplications found across the codebase.

### 2.9 Empty state

Icon (24–32px in `--ink-400`) → `text-xl` heading naming the object → `text-sm` secondary line acknowledging the user's state → one primary CTA. **No illustration.** Per Stripe / Linear / Vercel convention for B2B: illustration is a consumer pattern.

---

## 3. Charts

All charts share these rules:

- **Gridlines:** 1px stroke, `--border`, `stroke-dasharray: 2 4`. **Horizontal only** — vertical gridlines forbidden on time-series.
- **Axes:** no axis line. Tick labels at `text-xs` in `--ink-400`. No tick marks. `tabular-nums` mandatory.
- **Tooltips:** unified `<ChartTooltip />` component. White surface, `--border`, `shadow-md`, 12px padding. Date header in `text-meta`, then per-series rows with colour swatch, name, right-aligned value.
- **Legends:** line-style swatches (line + dot), 20×8px SVG, never circle-only. Legend entries are buttons that highlight the series on hover/focus (`aria-pressed` for state).
- **Animations:** initial entrance fade-in 200ms; subsequent updates do **not** animate (decision-support data must read truthfully).

Multi-series charts use the **Signal 5** palette mapped by channel id. Hovered series shifts to `--accent` only when the legend interaction is active (provides preattentive emphasis without colour change masking the natural mapping).

---

## 4. Copy

- British English. Audited for `optimize`, `color`, `behavior`, `favorite`, `analyze`, `utilize` — none allowed.
- Lead with the user's gain, not the product's feature. "Move budget to what's working" beats "AI-powered budget optimisation".
- 8 words preferred over 16. If a label needs a tooltip, the label is wrong.
- No "AI ✨" badges, no sparkles, no Lorem.
- No duplicate facts on the same screen — if a sentence is true twice, delete one.

---

## 5. Information architecture

- **Primary action position:** top-right of the screen header. (Linear/Stripe/Vercel convention.)
- **Page hero:** display-italic H1 + secondary 14px subhead. Maximum one display element per route.
- **Section heading:** `text-lg` weight 600, plain Geist Sans. Never display.
- **Card heading:** `text-md` weight 500.
- **Table column header:** `text-meta` uppercase.
- **Sidebar nav item:** 36px tall, 14px text, 12px gap to icon.

---

## 6. Accessibility

- WCAG 2.2 AA enforced: 4.5:1 body, 3:1 large text, 3:1 non-text contrast on UI components, 2px focus indicator at 2px offset.
- Status never communicated by colour alone — always paired with text label, dot, or icon.
- All icon-only buttons carry `aria-label`.
- Tables expose sort state via `aria-sort` on the header cell.
- Tablists carry `aria-label`.
- Modals manage focus on open and close, trap Tab inside, close on Escape.
- `prefers-reduced-motion` disables all non-essential animation.

---

## 7. State model rule

Two stores (`brief-store`, `mix-store`) must be reconciled. The brief budget is the single source of truth; mix `total` is **always derived** from `Object.values(allocations).reduce((a,b)=>a+b, 0)`. Persisted state migrations bump the version when shape changes.

---

## 8. Forbidden patterns (Signal-specific)

In addition to BUILD.md's existing forbidden list:

- Two horizontal bars of the same visual weight stacked within a card.
- `font-display` on any element except the route's single hero `<h1>`.
- Hardcoded hex/rgba where a token exists.
- Half-pixel font sizes (`text-[10.5px]`, etc.).
- Off-grid spacing values.
- Status indicated only by colour.
- Animating data on refresh.
- Empty-state illustrations.
- Pie or donut charts for 5+ segments.
- Gauges. Bullet charts or radial scores instead.
