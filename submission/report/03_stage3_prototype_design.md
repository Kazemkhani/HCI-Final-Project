# Stage 3 — Prototype Design

> **Live prototype:** https://signal-drab-xi.vercel.app
> **Repository:** https://github.com/Kazemkhani/HCI-Final-Project
> **Stack:** Next.js 16 (App Router), TypeScript strict, Tailwind v4, shadcn/ui, Framer Motion, Recharts, Anthropic SDK for `/copy`. Deployed on Vercel.

## 3.1 Design Principles

Five principles, derived from the Stage 1 insights and design goals, committed before any screen was drawn:

1. **The dashboard is the product.** Everything else exists to populate or act on it. *(Insight 1, Design Goal 1.)*
2. **Physical channels render identically to digital ones.** Every row template, KPI tile and chart accepts a podcast sponsorship the same way it accepts a LinkedIn ad. No "secondary channels" tier at the data-model level. *(PS4.)*
3. **The act-on-insight loop is one click away.** Each dashboard alert contains a CTA that lands the user on a pre-populated `/budget` recommendation. *(Insight 2, Design Goal 2.)*
4. **Evidence is presented before conclusions.** No "AI ✨ recommends" boxes. The `/budget` page shows three pieces of evidence above the recommended action. *(P3's "it depends".)*
5. **British English, persona-first copy.** UI copy is written for John specifically. Eight words beat sixteen. *(Clarity Check measures this as a failure mode.)*

## 3.2 Annotated Key Screens

The prototype has seven routes; the four load-bearing ones are documented below. The remainder (`/brief`, `/flow`, `/style-guide`) are described in **Appendix G** with screenshots in `submission/materials/screenshots/`.

### Screen 1 — `/dashboard` (Hero) → PS4, Design Goal 1

Four KPI tiles (Spend, Signups, Cost per Signup, Audience Match), cross-channel comparison table, alerts panel, multi-channel trend chart.

- **Date-range tabs (top right).** SegmentedTabs control; the active tab drives every downstream widget on the page (Stage-5 fix; original was a false affordance).
- **KPI delta with directional colour.** Up/down arrow + green/red — Nielsen H1, the user knows whether the change is good news without reading the label.
- **Status bar on every row.** Left-edge stripe (green / amber / red), redundantly encoded as a screen-reader label per WCAG 1.4.1.
- **Alert with embedded CTA.** "LinkedIn Ads cost per signup is up 8%" → "Review reallocation →" deep-links to `/budget?source=…&dest=…&amount=…`, pre-populated. Closes Principle 3 in one click.
- **Trend chart channel-coloured lines** match the row status-bar colours (Gestalt similarity [4]); hover dims non-focused lines.

### Screen 2 — `/channels` (Mix and Rebalance) → PS1, PS2, HMW1, HMW4

Five channel cards, each with thumbnail, status pill, allocation, audience-match radial, "Why this channel" rationale, and a slider that proportionally rebalances the others (Zustand store).

- **Audience-match radial.** Tone reflects the score (≥80 green, 60–79 amber, <60 red). Replaced an earlier thick black bar that visually collided with the slider — Stage 5 fix.
- **"Adjust monthly allocation" zone.** Slider in a bordered region with min/max labels — telling the user this is a different *kind* of control from the buttons elsewhere.
- **Live mix bar (sidebar).** Stacked horizontal bar of the current mix, animated by Framer Motion as sliders move (Nielsen H1).
- **Sticky CTA footer.** "Launch campaign" sticks to the viewport bottom, reachable without scrolling regardless of card count.

### Screen 3 — `/budget` (Single Move) → PS4, Design Goal 2, HMW10

A focused page that proposes one budget move at a time. Top: source → destination flow with before/after monetary values. Middle: three pieces of evidence. Bottom: sticky Decline / Adjust / Approve.

- **Flow visualisation.** Source channel left, destination right, animated arrow with the move amount; each card shows `before → after` with the old value struck through.
- **"Adjust" toggle gates the slider.** Hidden by default; clicking "Adjust" reveals it. Stage-5 fix — the original toggle's label flipped without any panel ever opening (false affordance).
- **Evidence is above the action.** Three evidence rows above the sticky footer — the user must scroll past them before reaching Approve. Slows the decision in the right place.
- **Decline modal echoes the reason.** The textarea's content is echoed in the confirmation toast — fixing a Stage-4 finding where input was silently discarded.
- **Things to watch.** Risk-caveat disclosure ("Podcast inventory books two weeks out") folded by default so caveats don't compete with primary evidence.

### Screen 4 — `/copy` (Clarity Check) → PS3, PS5, Design Goal 3, HMW6

Two-pane: input on the left, result on the right. The user picks a goal, pastes ad copy, clicks "Score it." A real call to the Anthropic API (Claude Sonnet 4.5) returns a 0–100 clarity score, a one-sentence verdict, and a tightened rewrite.

- **Live API integration.** `app/api/clarity/route.ts` calls `@anthropic-ai/sdk` with `claude-sonnet-4-5`. Real, not simulated.
- **Cancel during loading.** "Score it" transforms into Cancel while in flight, wired to an AbortController (Nielsen H3).
- **Mid-band score colour.** A score of 65 reads as warning amber, not green or red — Stage-4 heuristic-eval fix.
- **Try-again on error.** API errors render an inline error state with a "Try again" button that re-fires the same input. Form fields are not wiped (Nielsen H9).

## 3.3 User Flow

The prototype is optimised for the five-step path `/brief → /channels → /dashboard → (/budget | /channels/[id] | /copy) → /dashboard`. The full diagram is documented graphically on `/flow`.

**Path length.** Brief to approved budget move = five surfaces. Stage 4 measured average path-completion at ~3 minutes 50 seconds.

**Clarity Check is intentionally orthogonal.** Reachable from the sidebar at any point; does not require the brief or any other state. P2's "give me one line of solution" can be tested in isolation.

## 3.4 Style Guide

A complete in-product style guide ships as a live route at **`/style-guide`** — it renders the actual tokens the app uses, so it cannot drift out of sync with a static PDF. Three tabs: System (colour ramp, type scale, 8px spacing grid, radii, elevation, motion), Components (buttons, status pills, IconBox, Disclosure, SegmentedTabs, EmptyState, RadialScore), Data Viz (Signal 5 chart palette — id-mapped, not index-mapped, so a channel's colour is stable across sort orders).

**Token summary:**

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#FAFAF7` | Warm off-white background |
| `--color-accent` | `#10B981` | CTAs, focus, positive deltas |
| `--color-warning` | `#D97706` | "Attention" status |
| `--color-negative` | `#DC2626` | "Critical" status |
| `--color-editorial` | `#6D28D9` | Serif display moments only |
| Display font | Instrument Serif italic | Hero h1 only |
| Body font | Geist Sans 400/500/600 | Everything else |
| Numbers | Geist Mono `tabular-nums` | KPIs, table cells |
| Spacing grid | `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` | Strict 8px |

**Forbidden patterns:** gradient hero backgrounds; "AI ✨" badges (we use the Anthropic API but don't advertise it); stock photography (lucide-react icons only).

**Accessibility baseline** (verified in Stage 4): WCAG 2.2 AA contrast on every text/background pair; 2px focus ring with 2px offset on every interactive element; `aria-label` on all icon-only buttons; full keyboard completion (Tab + Enter); `prefers-reduced-motion: reduce` honoured.
