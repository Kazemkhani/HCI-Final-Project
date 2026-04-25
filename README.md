# Signal

A campaign planning and measurement web app for early-stage startup marketers. HCI Final Project, University of Birmingham Dubai.

> Live: **https://signal-drab-xi.vercel.app**

## Stack

- Next.js 16 (App Router) on the Turbopack default
- TypeScript strict
- Tailwind CSS v4 with `@theme` tokens
- shadcn/ui primitives (Slate base) + custom Signal theme
- Framer Motion for transitions
- Recharts for line / bar charts
- `@anthropic-ai/sdk` for the `/copy` Message Clarity check
- Geist Sans / Mono + Instrument Serif

## Local development

```bash
pnpm install
cp .env.local.example .env.local
# add your ANTHROPIC_API_KEY to .env.local
pnpm dev
```

The `/copy` route requires `ANTHROPIC_API_KEY` to be set. Without it the route returns a 500 with a friendly message.

## Build

```bash
pnpm build
pnpm lint
```

## Routes

| Route | Purpose |
|---|---|
| `/` | redirect → `/dashboard` |
| `/dashboard` | Hero — unified cross-channel dashboard |
| `/brief` | 4-step progressive form |
| `/channels` | Channel mix with rationale and live rebalance |
| `/channels/[id]` | Per-channel deep-dive with recommendation |
| `/budget` | Single budget reallocation with evidence |
| `/copy` | Message clarity check — real Anthropic API |
| `/flow` | User flow diagram, first-class screen |

## Deployment

Vercel project. Set `ANTHROPIC_API_KEY` in both Preview and Production environments before the first deploy.

## Design invariants

See `CLAUDE.md` at repo root.
