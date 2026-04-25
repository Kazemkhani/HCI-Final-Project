# Signal — Build Invariants

This file is the source of truth for any future Claude Code session in this repo. Read it before touching any UI.

## Identity

Signal is a campaign planning and measurement web app for early-stage startup marketers, built as a HCI coursework prototype at the University of Birmingham Dubai. The persona is **John Doe**, marketing lead at a Dubai startup with a £10k/month budget across digital, events and PR. Design every surface for John, not generic users.

The aesthetic bar is **Linear × Stripe × Vercel** — quiet, confident, evidence-led. Never look like a Tailwind starter.

## Non-negotiables

- **British English everywhere.** "Organise", "colour", "behaviour", "favour", "prioritise", "optimise", "analyse". Never "utilise" where "use" works.
- **TypeScript strict.** No `any`.
- **Tailwind utility-first.** No CSS modules, no inline styles except Framer Motion `motion.*` props.
- **Icons via lucide-react only.** No emoji as UI decoration. No "AI ✨" badges.
- **Mobile-responsive down to 768px.** Sidebar collapses to top nav under `lg`.
- **Accessibility baseline:** AA contrast, visible focus ring, semantic HTML, `aria-label` on icon-only buttons, `prefers-reduced-motion` respected.
- **No dark mode** in this sprint. Do not build it.

## Tech stack (locked)

Next.js 16 (App Router), TypeScript strict, Tailwind v4, shadcn/ui primitives, Framer Motion, Recharts, lucide-react, Geist Sans/Mono + Instrument Serif, `@anthropic-ai/sdk` for the `/copy` route, deployed on Vercel.

## Design tokens (strict)

Colours, fonts, spacing, radii, shadows — see `app/globals.css`. The 8px spacing grid is strict: permitted values `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

- `--color-bg`: warm off-white background `#FAFAF7`
- `--color-accent`: signal green `#10B981` — CTAs, focus, positive deltas
- `--color-editorial`: `#6D28D9` — serif display moments only
- `--color-negative`: `#DC2626`

Type:

- Body: Geist Sans, 400 / 500 / 600
- Display: Instrument Serif italic, class `.font-display` — for hero moments only, use sparingly
- Numbers: Geist Mono, `tabular-nums`

Motion default spring: `{ stiffness: 260, damping: 30 }`. Entrance: fade + 4px rise, 200ms ease-out. Always honour `prefers-reduced-motion`.

## Copy conventions

Write for John, not "users". Lead with what he gains, not what the product does. 8 words beat 16. Examples:

- ❌ "Multi-channel campaign orchestration platform" → ✅ "Run every channel from one place"
- ❌ "Leverage AI to optimise your spend" → ✅ "Move budget to what's working"
- ❌ "Welcome back, user!" → ✅ "Morning, John"

## Forbidden

- Gradient hero backgrounds
- Stock photographs
- Emoji as UI decoration
- "AI ✨" badges
- Generic SaaS pricing cards
- Dashboard tiles without delta or context
- Buttons without a clear destination
- Fake loading spinners for instant operations
- Lorem Ipsum or placeholder filler

## Acceptance — every screen

1. Real mock data (see `lib/mock-data.ts`)
2. Empty / loading / populated / error states implemented where relevant
3. Tab order sensible, focus ring visible
4. Primary action above the fold
5. Renders cleanly at 1440 / 1280 / 768
6. WCAG AA contrast on every text/background pair
7. Motion respects `prefers-reduced-motion`
8. No `console.log`, no TODO comments, no unused imports
9. `pnpm build` clean, zero warnings
10. `pnpm lint` clean

## Routes

| Route | Purpose |
|---|---|
| `/` | redirect → `/dashboard` |
| `/dashboard` | Hero — unified cross-channel dashboard |
| `/brief` | 4-step progressive form |
| `/channels` | Channel mix with rationale and live rebalance |
| `/channels/[id]` | Per-channel deep-dive with recommendation |
| `/budget` | Single budget reallocation with evidence |
| `/copy` | Message clarity check (real Anthropic API) |
| `/flow` | User flow diagram, first-class screen |
