# BUILD.md — Signal
### Full build instructions for Claude Code
*Hand this entire file to Claude Code. It reads it once, then executes phase by phase, committing to git at each phase boundary and stopping for confirmation.*

---

## 0. Who you are, what this is

You are Claude Code, executing a university coursework prototype. The course is Human-Computer Interaction at the University of Birmingham Dubai. The user is Amir Hossein Kazemkhani, a final-year Computer Science with AI student and professional AI engineer.

You are building **Signal**, a campaign planning and measurement web app for early-stage startup marketers. This is the submitted artefact for the final project, worth 50% of the module grade.

The build must:

- Feel like Linear × Stripe × Vercel — not Tailwind starter
- Be deployed live on Vercel with a shareable URL
- Pass a usability test with real non-teammate participants
- Support a heuristic evaluation against Nielsen's 10 heuristics
- Use British English spelling throughout every string, label, heading and comment

The graders care about process rigour, design quality, and evaluation — not feature count. Six polished screens beat twenty rushed screens.

---

## 1. Non-negotiables

- **British English everywhere** in UI copy and comments. "Organise", "colour", "behaviour", "favour", "prioritise", "optimise", "analyse", "personalise". Never "utilise" where "use" works.
- **TypeScript strict mode.** No `any`.
- **Tailwind utility-first.** No inline styles except Framer Motion `motion.*` props. No CSS modules.
- **No emoji as UI decoration.** Semantic icons via `lucide-react` only.
- **No Lorem Ipsum, no stock photography, no generic SaaS patterns.** Every piece of copy is written for the persona defined in Section 3.
- **Mobile-responsive down to 768px.** Not phone-first, but must not break on tablet.
- **Accessibility baseline:** AA contrast, visible keyboard focus ring, semantic HTML, `aria-label` on icon-only buttons, `prefers-reduced-motion` respected.
- **No dark mode** in this sprint. Do not build it.
- **Commit at every phase boundary** with message `feat(signal): phase <N> — <title>`.
- **After each phase, stop. Report what you built, what you deferred, and wait for confirmation before starting the next phase.**

---

## 2. Tech stack (locked)

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| Primitives | shadcn/ui |
| Motion | Framer Motion |
| Charts | Recharts |
| Icons | lucide-react |
| Fonts | Geist Sans + Geist Mono (`geist` npm) + Instrument Serif (`@fontsource/instrument-serif`) |
| AI integration | `@anthropic-ai/sdk` for the Message Clarity feature (Phase 10) |
| Deployment | Vercel |

---

## 3. Persona (do not invent details — this is from real interviews)

**John Doe.** 28, marketing lead at a mid-sized Dubai startup. Four years' experience in digital marketing and event-based promotion. Small team — him plus two. Limited budget. Juggles campaigns across digital, events, and PR simultaneously.

He defaults to digital channels because they are measurable, but he is underserved on channel-mix decisions and has no unified way to see performance across physical and digital channels. He is sceptical of flashy marketing. He believes in solution-focused messaging that leads with what the audience gains. He uses a MacBook and an iPhone. He is comfortable with Google Analytics, Canva, and basic spreadsheets. He has never used a 3D preview tool or an experiential campaign platform.

His representative quote from the research:

> "If the timing and audience aren't right, nothing else matters."

**Design every surface for John.** Not for enterprise CMOs. Not for agency creatives. Not for generic "users".

---

## 4. Research insights driving the design (from Assignment 1)

1. **The noise barrier.** Audiences actively ignore most advertising. Drivers have 3–5 seconds with a billboard. → UI must be quiet and confident, never shout.
2. **Resource constraints dictate strategy.** Early-stage marketers have no agency budget. → Every interaction must save time; every screen must surface the next decision.
3. **The measurement gap.** Physical channels have no click-through equivalent, so CMOs cut them blindly when data is absent. → The dashboard MUST treat physical and digital metrics as peers with a unified scorecard.
4. **Simplicity beats sophistication.** "Give me one line of solution value" beat every sophisticated pitch. → UI copy reflects this. Short. Plain. Benefit-led.

---

## 5. The HMW and the Design Goals

**HMW:** *How might we help an early-stage marketer plan, measure, and adjust a campaign across physical and digital channels with the same confidence and evidence on both sides?*

**Three measurable design goals:**

1. A new user completes Brief → Channel Mix → Dashboard in under 4 minutes without assistance.
2. Users identify the weakest-performing channel on the Dashboard within 15 seconds of landing on it.
3. Users accept at least one AI-suggested budget reallocation at ≥60% rate on first viewing.

These goals are what the usability test will measure.

---

## 6. The six screens

| # | Screen | Route | Hero element |
|---|---|---|---|
| 1 | Brief & Audience | `/brief` | 4-step progressive form |
| 2 | Channel Mix | `/channels` | Mix bar + per-channel rationale cards |
| 3 | Unified Dashboard (HERO) | `/dashboard` | Cross-channel metric grid + 30-day trend + alerts |
| 4 | Channel Deep-Dive | `/channels/[id]` | Audience match + daily trend + recommendation |
| 5 | Budget Reallocation | `/budget` | Source → destination flow with evidence |
| 6 | Message Clarity Check | `/copy` | Real Claude API clarity score + flags |

Plus an auxiliary `/flow` route showing the user flow diagram as a first-class screen (Stage 3 requirement).

Core user journey for usability testing: 1 → 2 → 3 → 4 → 5. Screen 6 is a standalone utility accessible from the nav.

---

## 7. Design tokens (strict — do not deviate)

### Colour
```
--bg:        #FAFAF7   /* warm off-white */
--surface:   #FFFFFF
--ink-1:     #0A0A0A   /* primary text */
--ink-2:     #4A4A4A   /* secondary text */
--ink-3:     #8A8A8A   /* tertiary text */
--border:    #E5E5E2
--accent:    #10B981   /* signal green — CTAs, focus ring, positive deltas */
--negative:  #DC2626
--editorial: #6D28D9   /* serif display moments only, use rarely */
```

### Typography
- Body / UI: Geist Sans, weights 400 / 500 / 600
- Display: Instrument Serif, 400, italic for hero moments — class `.font-display`
- Mono (for numbers): Geist Mono

### Spacing
Strict 8px grid. Permitted values: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Nothing else.

### Elevation (two levels only)
- `shadow-sm`: `0 1px 2px rgba(10,10,10,0.04)` — cards
- `shadow-md`: `0 4px 16px rgba(10,10,10,0.06)` — modals, popovers

### Radius
- Inputs, buttons: `8px`
- Cards: `12px`
- Modals: `16px`

### Motion
- Default spring: `{ stiffness: 260, damping: 30 }`
- Entrance: fade + 4px rise, 200ms ease-out
- Always honour `prefers-reduced-motion: reduce` — disable non-essential motion
- Never use linear ease on UI elements

---

## 8. Copy conventions

Every piece of UI copy must:

- Be written for John. Not "users". Speak plainly about his work.
- Lead with the user's gain, not the product's feature.
- Prefer 8 words over 16. If a label needs a tooltip, the label is wrong.
- Use British English spelling.
- Never use "utilise" where "use" works. Never use "leverage" as a verb.

Examples you will apply:

- ❌ "Multi-channel campaign orchestration platform" → ✅ "Run every channel from one place"
- ❌ "Leverage AI to optimise your spend" → ✅ "Move budget to what's working"
- ❌ "Welcome back, user!" → ✅ "Morning, John"
- ❌ "Your dashboard is empty" → ✅ "Nothing running yet. Start with a brief."

---

## 9. Forbidden patterns

- Gradient hero backgrounds
- Stock photographs of smiling diverse teams
- Emoji as UI decoration
- "AI ✨" badges or sparkle icons
- Generic SaaS pricing cards
- Placeholder avatars as filler
- Dashboard tiles that show a metric without a delta, context, or trend
- Buttons without a clear destination
- Progress bars longer than the underlying action takes
- Fake loading spinners for instant operations

---

## 10. Acceptance checklist — run before marking any screen "done"

1. Real mock data, no placeholders
2. Empty / loading / populated / error states all implemented where relevant
3. Keyboard `Tab` order sensible; focus ring visible on every interactive element
4. Primary action above the fold
5. Renders cleanly at 1440px, 1280px, and 768px
6. All text meets WCAG AA contrast against its background
7. Motion respects `prefers-reduced-motion`
8. No `console.log`, no TODO comments, no unused imports
9. Build passes (`pnpm build`) with zero warnings
10. `pnpm lint` clean

---

# PHASE 0 — Prerequisites

**Goal:** project scaffolded, dependencies installed, environment clean.

## Steps

1. In the working directory, run:

```bash
pnpm create next-app@latest signal --typescript --tailwind --app --no-src-dir --import-alias "@/*" --use-pnpm
cd signal
pnpm dlx shadcn@latest init
```

When shadcn prompts for a base colour, pick **Slate**. When it asks about CSS variables, say yes.

2. Install dependencies:

```bash
pnpm add framer-motion recharts lucide-react geist @fontsource/instrument-serif @anthropic-ai/sdk clsx
pnpm add -D @types/node
```

3. Add shadcn primitives we will customise:

```bash
pnpm dlx shadcn@latest add button card input label slider badge dialog separator tabs toggle-group tooltip
```

4. Initialise git, commit:

```bash
git init
git add .
git commit -m "chore: scaffold signal"
```

**Stop. Report: scaffold complete, list of files in the repo, confirm `pnpm dev` runs on localhost:3000. Wait for confirmation.**

---

# PHASE 1 — CLAUDE.md, design tokens, base layout

**Goal:** establish the invariants every later phase depends on.

## Files to create

### `CLAUDE.md` (repo root)

Copy sections 1–10 of this BUILD.md into CLAUDE.md, trimmed. This is the file future Claude Code sessions read first to stay on-brand.

### `app/globals.css` (replace existing)

Define the tokens from Section 7 as CSS custom properties on `:root`. Keep Tailwind's `@tailwind` directives at the top. Map Tailwind theme values to the CSS variables via the `@theme` block (Tailwind v4 syntax). Example skeleton:

```css
@import "tailwindcss";

@theme {
  --color-bg: #FAFAF7;
  --color-surface: #FFFFFF;
  --color-ink-1: #0A0A0A;
  --color-ink-2: #4A4A4A;
  --color-ink-3: #8A8A8A;
  --color-border: #E5E5E2;
  --color-accent: #10B981;
  --color-negative: #DC2626;
  --color-editorial: #6D28D9;

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-display: "Instrument Serif", serif;

  --radius-btn: 8px;
  --radius-card: 12px;
  --radius-modal: 16px;

  --shadow-sm: 0 1px 2px rgba(10,10,10,0.04);
  --shadow-md: 0 4px 16px rgba(10,10,10,0.06);
}

html, body { background: var(--color-bg); color: var(--color-ink-1); }
body { font-family: var(--font-sans); font-feature-settings: "ss01", "cv11"; }
.font-display { font-family: var(--font-display); font-style: italic; }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### `app/layout.tsx`

Load Geist Sans and Geist Mono via `geist/font/sans` and `geist/font/mono`. Import `@fontsource/instrument-serif`. Apply `${GeistSans.variable} ${GeistMono.variable}` to the `<html>`. Set `<body>` language to `en-GB`. Metadata: title "Signal", description "One dashboard, every channel, one clear read."

### `app/(signal)/layout.tsx`

App shell. Two regions:

- **Left sidebar**, 256px fixed:
  - At top: wordmark "Signal" in `.font-display`, size 28px, letter-spacing -0.02em
  - Below, nav links with lucide icons: Brief (`FileText`), Channels (`Target`), Dashboard (`LayoutDashboard`), Budget (`PoundSterling`), Copy (`Type`), Flow (`GitBranch`)
  - Nav links 14px Geist Sans, 500 weight, 10px icon gap, 40px tall
  - Active link: `bg-[var(--color-bg)]` wash + left-edge 2px accent bar, ink-1 text
  - Inactive: ink-2 text, hover → ink-1
  - At bottom: workspace badge "Acme Productivity" in a rounded card with the user initial "JD" in a 28px square
- **Main region**, fills remaining width, 32px padding, max-width 1200px centred when viewport > 1600px

### `app/page.tsx`

Redirects to `/dashboard` by default (John is returning, not first-time).

## Commit

`feat(signal): phase 1 — tokens, layout, CLAUDE.md`

**Stop. Report and wait.**

---

# PHASE 2 — Mock data

**Goal:** realistic, evocative mock data that powers every screen without a backend.

## `lib/mock-data.ts`

Export a single `WORKSPACE` object with:

- **Workspace:** name "Acme Productivity", plan "Series A SaaS", monthly budget £10,000, currency "GBP", launched date
- **User:** John Doe, initials "JD", role "Marketing Lead"
- **Audience:** "Founders and early operators, 25–40, English-speaking, on LinkedIn and podcasts"
- **Campaign:** one active campaign called "Q2 Launch — Acme 2.0", running 21 days so far, 42 days total
- **Channels:** 5 channels with this shape:

```ts
type Channel = {
  id: string; name: string; type: "digital" | "physical" | "hybrid";
  iconKey: string; // lucide icon name
  allocation: number; // pounds per month
  spend: number; // pounds spent so far
  reach: number;
  signups: number;
  costPerSignup: number;
  audienceMatch: number; // 0–100
  delta7d: number; // +/- percent
  rationale: string; // one-sentence reason Signal suggested this channel
  status: "healthy" | "attention" | "critical";
  trend: { date: string; signups: number; spend: number }[]; // 30 days
};
```

Five channels with realistic numbers:

1. **LinkedIn Ads** (digital) — £4,500 allocation, £3,150 spent, 42,000 reach, 168 signups, £18.75 per signup, 72 audience match, -8% 7-day delta, rationale "Founders and operators live here. Cost per qualified signup trending up.", status "attention"
2. **Podcast Sponsorship** (hybrid) — £2,500 allocation, £1,750 spent, 28,000 reach, 204 signups, £8.58 per signup, 88 audience match, +14% 7-day delta, rationale "Your audience listens weekly. Strongest channel by cost per signup.", status "healthy"
3. **Google Search** (digital) — £1,500 allocation, £1,050 spent, 9,400 reach, 96 signups, £10.94 per signup, 61 audience match, +2% 7-day delta, rationale "Captures intent from people actively searching.", status "healthy"
4. **Industry Conference — SaaStr Europa** (physical) — £1,000 allocation (booth + travel), £1,000 spent, 1,200 reach, 24 signups, £41.67 per signup, 85 audience match, 0% delta, rationale "High-intent face time with ICP. Higher cost per signup but stronger downstream.", status "attention"
5. **PR Placement** (physical) — £500 allocation, £350 spent, 14,000 reach, 12 signups, £29.17 per signup, 54 audience match, -3% delta, rationale "Brand credibility, weak on direct attribution.", status "critical"

Generate the 30-day `trend` arrays with sensible day-over-day variance (5–15% noise, weekend dips for B2B channels).

Also export:

- `CHANNEL_LIBRARY`: a longer list of 12 channel options the recommender can choose from (add Twitter/X, Reddit, Display, Out-of-Home, Email Newsletter, YouTube pre-roll, Affiliate, others — each with a one-line description)
- `STAGE_OPTIONS`: ["Pre-seed", "Seed", "Series A", "Series B+"]
- `AUDIENCE_OPTIONS`: ["Founders", "Operators", "Developers", "Designers", "Marketers", "Finance", "Sales", "Students"]
- `GOAL_OPTIONS`: four options with one-line explainers as shown in Phase 3

## Commit

`feat(signal): phase 2 — mock data`

**Stop. Report and wait.**

---

# PHASE 3 — Screen 1: Brief & Audience (`/brief`)

**Goal:** in under 90 seconds, John tells Signal his stage, budget, audience, and goal, and gets taken to the Channel Mix screen.

## Layout

- Centre column, `max-width: 560px`, vertically centred on desktop
- Single-panel progressive disclosure. Step indicator above: "Step 2 of 4" in Geist Mono 12px ink-3
- Panel title in Instrument Serif 32px italic
- Four steps, one at a time, Framer Motion transition (x: 16 → 0, opacity 0 → 1, 200ms spring)
- Back / Next buttons at the foot, Next becomes "Propose my channel mix" on step 4

## Step content

**Step 1 — Stage.** Title: "Where are you?" Sub: "So we can match the channels that work at your scale."
Chip group with the four STAGE_OPTIONS. Default-selected: "Series A".

**Step 2 — Budget.** Title: "How much per month?" Sub: "We'll split it across the channels most likely to pay back."
Slider £500 to £50,000, steps of £250. Tick marks labelled at £1k / £5k / £10k / £25k. Large numeric readout in Geist Mono 48px, animates on change. Default: £10,000.

**Step 3 — Audience.** Title: "Who are you trying to reach?" Sub: "Pick any that apply, or add your own."
Chip multi-select from AUDIENCE_OPTIONS + a free-text "Other" input below with a "+ Add" button. Default-selected: "Founders", "Operators".

**Step 4 — Goal.** Title: "What are you optimising for?" Sub: "This decides how we measure success."
Four large cards with icons and one-line explainers:
- **Brand awareness** — "Get remembered by the right people"
- **User signups** — "Bring people to your product"
- **Paid conversions** — "Turn interest into revenue"
- **Event attendance** — "Fill a room"

Default: "User signups".

## On submit

Button label: "Propose my channel mix". Disable during a 700ms simulated delay with a shimmer shadow pulse on the submit button. Then `router.push('/channels')`.

## States

- Form state persisted via a Zustand store in `lib/brief-store.ts` so the Channel Mix screen can read the brief
- On back navigation from `/channels`, form re-enters with the same values

## Commit

`feat(signal): phase 3 — brief screen`

**Stop. Report and wait.**

---

# PHASE 4 — Screen 2: Channel Mix (`/channels`)

**Goal:** show Signal's recommended mix for the brief, explain why each channel is in, let John adjust, then confirm to launch.

## Layout

Two-column on desktop, single-column below 1024px.

**Left column (sticky, 340px):** brief summary card.

- "Your brief" heading, Instrument Serif italic 20px
- Stage, budget, audience, goal as label-value rows in Geist Mono for values
- "Edit" link back to `/brief`
- Below: a stacked horizontal bar visualising the proposed allocation across channels. Each segment coloured per channel, labelled with percentage. This bar animates in on mount (width from 0 → target with spring).

**Right column:** channel rationale cards, one per proposed channel.

Each card:

- Lucide icon (48px) on the left in a rounded square of the channel's type colour (digital = ink-1, physical = editorial, hybrid = accent)
- Channel name in 18px 600 weight
- Type tag (digital / physical / hybrid) in 12px uppercase letter-spaced
- Allocation in Geist Mono 28px, editable inline on click (steppers at sides or drag-to-adjust numeric)
- One-line rationale in ink-2
- Audience match as a small horizontal meter with the score
- Collapse/expand chevron revealing richer explainer paragraph

Changing an allocation in any card live-rebalances the others (other cards' allocations adjust proportionally to keep total constant). The top stacked bar animates accordingly.

## Footer action

Sticky bottom-right button: "Launch campaign" — primary, accent green. On click, 1200ms transition with a subtle confetti-less celebratory state: button morphs into a success pill "Launched. Watching the numbers." then navigates to `/dashboard` after 900ms.

## Empty state

If someone lands on `/channels` without a brief (direct URL), show a minimal empty state: Instrument Serif "Start with a brief first." with a button back to `/brief`.

## Commit

`feat(signal): phase 4 — channel mix`

**Stop. Report and wait.**

---

# PHASE 5 — Screen 3: Unified Dashboard (`/dashboard`) — HERO

**Goal:** the one screen that sells the pitch deck. John opens it on day 14 and in 15 seconds knows what is working, what is not, and what to do about it.

## Layout

Full-width within the main region. Sections from top to bottom:

### A. Header band

- Greeting line in Instrument Serif 36px italic: "Good morning, John."
- Below, Geist Sans 16px ink-2: "Day 14 of 42. Here's what your £10k is doing."
- Right side: a subtle date range selector, default "Last 30 days", options 7d / 30d / Campaign

### B. Metric grid (MetricTile components, 4 across on desktop)

Four tiles:

1. **Spend to date** — £6,300 / £10,000 monthly allocation, mini progress bar underneath
2. **Signups** — 504 total, +12% vs previous week sparkline
3. **Cost per signup** — £12.50, -8% (negative delta is good for cost — show in accent green with a down-arrow)
4. **Audience match (weighted)** — 74 / 100, with a tiny radial indicator

Every tile: label (ink-3 12px letter-spaced uppercase), value (Geist Mono 32px ink-1), delta (accent/negative 12px with direction arrow), optional sparkline or radial.

### C. Cross-channel comparison — the differentiator

A table-meets-chart hybrid. One row per channel, columns:

| Channel | Type | Allocation | Spend | Signups | £/signup | Match | 7-day trend |
|---|---|---|---|---|---|---|---|
| (icon + name) | badge | £4.5k | £3,150 | 168 | £18.75 | 72 | mini line |

Sortable headers. Click a row → navigate to `/channels/[id]`.

Subtle row-level status indicator on the far left edge: thin 2px bar — green (healthy), amber (attention), red (critical).

### D. Signal's alerts (the "what to do about it" moment)

A card labelled "Signal noticed" — Instrument Serif italic label.
One or two alert items, each in its own sub-card:

- "LinkedIn Ads cost per signup is up 8% this week. Podcast is 2.2× cheaper on a closer-matched audience." → button "Review reallocation" → `/budget`
- "PR placement has delivered 12 signups on £350 spend. Attribution is weak — consider retiring or doubling down." → button "Decide"

### E. 30-day trend chart

Full-width Recharts line chart, multi-line (one per channel), Y = daily signups, X = date. Toggle above the chart switches Y between "Signups", "Spend", "Cost per signup". Line colours neutral (ink-1 variants) with the channel under hover getting the accent colour and a tooltip card.

## States

- **Empty** (no campaign): Instrument Serif "Nothing running yet. Start with a brief." + button. Still show the layout chrome (chart becomes a skeleton).
- **Loading** (first mount): metric tiles skeleton-shimmer for 600ms then populate with a Framer Motion staggered entrance (50ms delay per tile).
- **Error** (if mock data fails): single card, friendly ink-2 copy "Can't read the numbers right now. Refresh in a moment."

## Commit

`feat(signal): phase 5 — dashboard hero`

**Stop. Report and wait.**

---

# PHASE 6 — Screen 4: Channel Deep-Dive (`/channels/[id]`)

**Goal:** John clicks a channel row and understands in 20 seconds what is happening inside that channel and what Signal thinks he should do.

## Layout

Top breadcrumb: Dashboard › Channels › LinkedIn Ads

### Header

- Channel icon + name in Instrument Serif 32px
- Status pill ("Attention" — amber)
- Right: "View in LinkedIn" button (inert link, this is a prototype)

### Three-column summary row

Each a small card:

- **Spend & pace** — spent / allocation, pace indicator (on-pace, ahead, behind)
- **Signups & cost** — total signups, cost per signup, 7-day delta
- **Audience match** — score with a tiny radial, and a one-line explainer ("Founders: 82, Operators: 62 — tilt toward founders is working")

### Daily trend chart

Recharts line, Y = cost per signup, X = last 30 days. Threshold line at the campaign's target CPS. Zones shaded faintly when over threshold.

### Audience match breakdown

A small horizontal bar chart: each audience segment (Founders, Operators, Developers, etc.) as a row, with the channel's match score per segment. Hover shows the signal contributing.

### Signal's recommendation (card)

The card is the punchline of this screen. Format:

- Instrument Serif italic label: "What we'd do"
- Body 16px ink-1: "Move £1,800/month from LinkedIn Ads to Podcast Sponsorship."
- Evidence list (three short bullets), each with a lucide icon:
  - **Cheaper acquisition** — Podcast CPS £8.58 vs LinkedIn £18.75 (2.2× better)
  - **Better audience match** — Podcast 88 vs LinkedIn 72 on your ICP
  - **Rising trend** — Podcast signups +14% WoW, LinkedIn -8%
- Two buttons side by side: "Review in Budget" (primary, links `/budget?source=linkedin-ads&dest=podcast&amount=1800`) and "Dismiss" (ghost)

## States

- 404 if channel id doesn't exist
- Loading skeleton for the charts

## Commit

`feat(signal): phase 6 — channel deep-dive`

**Stop. Report and wait.**

---

# PHASE 7 — Screen 5: Budget Reallocation (`/budget`)

**Goal:** John reviews a specific proposed move, sees the evidence, and either approves or adjusts the amount.

## Layout

Centred, `max-width: 760px`.

### Header

- "A move worth making" in Instrument Serif italic 32px
- Sub: "Based on 14 days of data across your channels"

### The move visual

Big, calm, visual. A horizontal flow with three nodes:

`[From: LinkedIn Ads £4,500/mo]`  →  `£1,800/mo`  →  `[To: Podcast Sponsorship £2,500/mo → £4,300/mo]`

Animated on mount: the arrow draws left to right, the amount counts up. Use a subtle `motion.path` stroke-dashoffset animation.

Below the flow: an editable slider for the amount (£500–£3,000), live-updating the from and to figures.

### Evidence block

Three rows, each with a lucide icon, headline, and a one-sentence explainer. Same content as Phase 6 evidence, slightly expanded.

### Risk panel

A collapsed card titled "Things to watch" with, when expanded:

- "Podcast inventory books 2 weeks out — execution lag"
- "LinkedIn Ads serves retargeting — don't reduce below £2k/mo or retarget list decays"

### Primary actions

Two-button row sticky at the bottom of the panel:

- **Approve move** (primary, accent) — triggers a 1000ms loading state, then a success pill: "Done. I'll watch the numbers for 7 days." then `router.push('/dashboard')`
- **Adjust** — opens a subtle editing mode right there on the amount slider, no page change
- **Decline** (ghost link) — logs a decline reason modal, toast on confirm

## Empty state

If arrived here directly with no suggested move, show: "No moves to review. You'll see one here when the data warrants it." with a link back to Dashboard.

## Commit

`feat(signal): phase 7 — budget reallocation`

**Stop. Report and wait.**

---

# PHASE 8 — Screen 6: Message Clarity Check (`/copy`) — with real Claude API

**Goal:** John pastes ad copy and gets real, actionable feedback from an actual LLM on clarity, self-focus, and audience-benefit framing.

## Architecture

Next.js route handler at `app/api/clarity/route.ts` that takes `{ copy: string, goal: string }` and returns `{ score: number (0–100), flags: Flag[], rewrite: string }`.

The route handler calls Anthropic's API server-side using the `ANTHROPIC_API_KEY` env var, with a prompt that reads:

> You are a ruthless marketing editor. Score this ad copy for clarity for an early-stage startup audience that is sceptical, time-starved, and tired of self-promotional marketing. Return JSON only, no prose, with this exact shape:
>
> ```json
> {
>   "score": 0-100,
>   "selfFocusCount": integer,
>   "benefitMentionCount": integer,
>   "readingAge": integer,
>   "flags": [
>     { "type": "self-focus" | "hedge" | "jargon" | "feature-over-benefit" | "length", "phrase": "...", "fix": "..." }
>   ],
>   "rewrite": "A tighter rewrite that leads with the user's gain, in British English, under 40 words."
> }
> ```
>
> Goal: {{goal}}. Copy: {{copy}}.

Model: `claude-sonnet-4-5` or latest. Max tokens 800. Temperature 0.3.

## Layout

Two-column, 50/50 on desktop.

**Left:** a large textarea (min-height 260px) with placeholder "Paste your ad copy here. Short or long, doesn't matter." Below it a disabled chip row preview of detected flags (populates after scoring). Primary button "Score it".

**Right:** result panel.

- Big circular score dial (0–100) with the score counting up on mount, coloured by band (red <40, amber 40–70, green 70+)
- Three small stat tiles: "Talks about you" (self-focus count), "Talks about them" (benefit mentions), "Reading age"
- Flag list — each flag a card with the phrase (highlighted), type tag, and proposed fix
- "Claude's rewrite" block in Instrument Serif italic 18px — the LLM's tighter version

## States

- Empty: a short primer in the right panel with two example prompts John can try
- Loading: skeleton + shimmer on the right panel for up to 6 seconds, cancel button
- Error: "Couldn't read this one. Try again in a moment." — no tech jargon

## Environment

Add `.env.local` with `ANTHROPIC_API_KEY=<placeholder>` and include `.env.local` in `.gitignore`. Add a README note telling Amir to set the Vercel env var before deploy.

## Commit

`feat(signal): phase 8 — message clarity with claude api`

**Stop. Report and wait.**

---

# PHASE 9 — User Flow screen (`/flow`)

**Goal:** Stage 3 of the rubric requires a "user flow diagram". Render it as a first-class screen inside the prototype, not a PDF appendix.

## Layout

Full-width main region, scrollable. Title "How Signal flows" in Instrument Serif italic 36px.

A horizontally-oriented flow diagram, built from HTML + SVG (no external diagramming library). Five nodes in a row, connected by animated arrows:

`Brief` → `Channel Mix` → `Dashboard` → `Channel Deep-Dive` → `Budget Reallocation`

Each node:
- Screen name
- Thumbnail — a scaled-down (400×250) stylised sketch of that screen, or a captured screenshot placed as a static asset later
- One-line "what happens here"
- Link to jump to that screen

Below the flow: a secondary loop showing `/copy` as a utility linked from anywhere in the main flow.

Caption at the bottom: "Core task completes in five steps. Average path: under 4 minutes."

## Commit

`feat(signal): phase 9 — user flow diagram`

**Stop. Report and wait.**

---

# PHASE 10 — Polish pass: states, responsive, motion, a11y

**Goal:** across every screen, verify every state, every breakpoint, every accessibility basic.

## Per-screen sweep

For each of `/brief`, `/channels`, `/dashboard`, `/channels/[id]`, `/budget`, `/copy`, `/flow`:

- Verify empty / loading / populated / error states
- Verify keyboard navigation: Tab reaches every interactive element in logical order, Enter activates, Escape closes modals
- Verify focus ring visible and distinguishable
- Verify contrast on every text/background pair via WCAG AA (4.5:1 body, 3:1 large text)
- Verify `aria-label` on all icon-only buttons
- Verify `<main>` landmark, one `<h1>` per screen, sensible heading hierarchy
- Verify images/charts have text alternatives or `role="img"` with `aria-label`

## Responsive

- 1440px (hero breakpoint) — perfect
- 1280px (laptop) — no horizontal scroll, no overlap
- 1024px (small laptop / tablet landscape) — sidebar can collapse to icons only via a toggle
- 768px (tablet portrait) — sidebar becomes a top nav; dashboard tiles stack 2×2

## Motion audit

- All transitions < 300ms, spring or ease-out
- Nothing animates under `prefers-reduced-motion`
- No parallax, no infinite loops, no attention-stealing motion

## Nits to kill

- Remove any `console.log`
- Remove any `TODO` comment (either do it or delete the line)
- Ensure favicon is the Signal wordmark mark (simple SVG: a small filled circle in accent green)

## Commit

`chore(signal): phase 10 — polish pass`

**Stop. Report. Wait.**

---

# PHASE 11 — Deploy to Vercel

**Goal:** live URL.

## Steps

1. Create a Vercel project from the repo
2. Add `ANTHROPIC_API_KEY` as an environment variable on Vercel (Preview and Production)
3. Set the framework preset to Next.js, build command `pnpm build`, output `.next`
4. Deploy. Confirm the live URL loads all seven routes
5. Test the `/copy` screen with a real API call from the deployed URL
6. Add the URL to the top of README.md

## Commit

`chore(signal): phase 11 — vercel deployment`

**Stop. Report the URL and wait.**

---

# PHASE 12 — Self-critique and targeted fixes

**Goal:** run a senior-designer critique on every screen and fix the top three issues.

## Self-critique prompt (run against the deployed URL)

Imagine you are a senior product designer at Linear. For each of the seven routes (`/brief`, `/channels`, `/dashboard`, `/channels/[id]`, `/budget`, `/copy`, `/flow`), list the single most damaging design flaw — the one thing a Linear designer would call out on first look. Rank all seven flaws by damage-per-fix-minute. Fix the top three only. Skip the rest.

For each fix, commit separately:

`refactor(signal): polish — <screen> — <short description>`

## Commit (after fixes)

`refactor(signal): phase 12 — critique fixes`

**Stop. Report and wait.**

---

# DONE

Report back with:

1. Live Vercel URL
2. Repo structure tree (just the `app/`, `components/`, `lib/`, `styles/` folders)
3. List of every route built and which interaction states are implemented per route
4. List of any deferred work
5. Any warnings or issues the user should know before running usability tests

---

# Appendix A — Manual tasks (for the humans, not Claude Code)

These cannot be done by Claude Code. They are on Amir and the team, scheduled into the 72 hours:

### A1. Individual Crazy 8s sketches (all five members, 20 minutes each)

The brief requires each team member to personally do a Crazy 8s. Amir can do his now, on paper, 8 minutes timed, one interface idea per panel. Photograph. Upload to the group drive. The other four members must each do their own. This is individual work — not group work. Each team member's sketches go into Appendix A of the report under that member's name.

### A2. Group ideation synthesis (30 minutes, group call)

After all five Crazy 8s are uploaded, run a 30-minute group call: share screens, dot-vote three ideas each, settle on why Signal is the chosen concept. Document the dot-vote with a photo or a table. Goes into Section 2 of the report.

### A3. Usability testing (1–2 hours total)

Once the Vercel URL is live, recruit 3–5 people who are NOT teammates. Dubai-based fellow students outside the group are fine, or any professional marketer they know. Give each the test script from Appendix B. Measure completion / partial / fail per task. Record time on task with a phone stopwatch. Administer the SUS at the end. Note verbal feedback.

### A4. Heuristic evaluation (1 hour, all five members)

Each member independently evaluates the live Signal prototype against Nielsen's 10 heuristics and scores severity 0–4 per issue. This is the same method they used in A2, applied to their own build. Consolidate into one table. Minimum two weeks before deadline ideally, but realistically within the 72-hour window.

### A5. Iteration (2 hours)

Pick the top 3–5 issues from A3 + A4 combined. For each, capture a before screenshot, apply the fix (Amir), capture an after screenshot. Document the rationale linked to the evaluation finding and the Nielsen heuristic. Goes into Stage 5 of the report.

### A6. Report assembly (Aquib, Aman, Alagappan — parallel to A5)

Use the template Aquib already prepared. Drop screenshots from the Signal prototype into Stage 3. Reference the affinity map photo from A1 in Stage 1. Reference the user flow diagram from `/flow` in Stage 3. Reference the SUS scores from A3 in Stage 4. Reference the before/after screenshots from A5 in Stage 5.

### A7. Individual reflections (every member, 200–300 words each)

Each member writes their own reflection. These must not be written by AI — the brief says so explicitly. Address the four prompts in Stage 6 of the brief. Be specific — describe a moment, an assumption that was wrong, a decision you changed.

### A8. Group reflection synthesis (30 minutes, group call)

After individual reflections are written, meet, identify 2–3 shared themes. Write a 300–500 word group synthesis. Goes into Stage 6 of the report.

### A9. Pitch deck (Aman, leaning on the live prototype for visuals)

Minimum 12 slides as per the brief's structure. Pull screenshots from the live Signal URL. Embed a 30-second screen recording of the core flow on the "Prototype Screens" slides for impact.

### A10. Submission packaging

- Rename the final PDF: `HCI_FinalDesign_Group16.pdf`
- Check Turnitin similarity < 20%
- One group member uploads to Canvas by 27 April 2026. Late fallback 29 April.

---

# Appendix B — Usability test script

Print one copy per participant or read it out loud verbatim.

**Preamble (1 minute):**
> "Thank you for helping. You are about to use Signal, a tool for marketers. Imagine you are a marketing lead at an early-stage startup with ten thousand pounds a month to spend on advertising. I will give you five tasks. Please think aloud as you go — if you are unsure what to click, tell me what you expected to happen rather than asking me. I am testing the design, not you. Nothing you do can break anything."

**Task 1 (target 90s):** "Set up your campaign brief for a new product launch."

**Task 2 (target 60s):** "Review the channel mix Signal proposes. Adjust at least one channel."

**Task 3 (target 30s):** "Your campaign has been running for two weeks. Which channel is underperforming?"

**Task 4 (target 45s):** "Drill into that channel and tell me what Signal recommends."

**Task 5 (target 30s):** "Accept the budget reallocation."

**Post-task open question:** "What would stop you from using this tomorrow?"

**Then:** hand over the SUS (Appendix C).

For each task, record: success / partial / fail, time in seconds, errors or confusion points in the participant's own words.

---

# Appendix C — SUS questionnaire (standard)

Rate each statement 1 (strongly disagree) to 5 (strongly agree):

1. I think that I would like to use Signal frequently.
2. I found Signal unnecessarily complex.
3. I thought Signal was easy to use.
4. I think that I would need the support of a technical person to be able to use Signal.
5. I found the various functions in Signal were well integrated.
6. I thought there was too much inconsistency in Signal.
7. I would imagine that most people would learn to use Signal very quickly.
8. I found Signal very cumbersome to use.
9. I felt very confident using Signal.
10. I needed to learn a lot of things before I could get going with Signal.

**Scoring:** For odd items, score = response − 1. For even items, score = 5 − response. Sum all, multiply by 2.5. Result is 0–100. Above 68 is above average. Above 80 is top-decile. Report individual scores and the mean across all participants.

---

# Appendix D — Heuristic evaluation table (reuse from A2)

For each issue identified:

| # | Issue title | Nielsen heuristic | Severity (0–4) | Screen/element | Observed in usability test? | Suggested fix |
|---|---|---|---|---|---|---|

Target 8–12 consolidated issues across all five evaluators. Use A2's methodology.

---

# End of BUILD.md
