# Signal — Pitch Deck

> **Format reminder.** The rubric demands minimum 12 slides. Each slide below is a content brief: title, body, and the visual anchor. Build the deck in your tool of choice (Google Slides / Keynote / PowerPoint) using these as the per-slide spec. Visual style: Linear × Stripe × Vercel — quiet, confident, evidence-led. Aspect ratio 16:9. Body text 24pt minimum, headings 48–60pt.

---

## Slide 1 — Problem

**Title:** *Marketing leads can't tell which channels are working.*

**Body (one sentence):** Every early-stage startup juggles six channels for a £10,000 monthly budget — but no tool gives them a single, honest read across digital and physical.

**Stat anchor:** *4 out of 4* marketing professionals we interviewed independently named the measurement gap as their primary pain point. P4's CMO cuts outdoor budget specifically because outdoor "provides no clickthrough rates or insight data."

**Visual:** Side-by-side dashboards from competitor tools (HubSpot, Mixpanel, Northbeam) — each showing rich digital data and *no row* for podcast sponsorships, billboards, or events.

---

## Slide 2 — Target User & Persona

**Title:** *Meet John Doe — marketing lead at a Dubai startup.*

**Body:**
- 28 years old, 4 years' experience
- Manages a £10,000/month budget across digital, physical, and hybrid channels
- Team of two — no specialist analyst
- Defaults to digital because it's measurable
- Pulls underperforming campaigns immediately

**Quote anchor:** *"Time is actually money. If the timing and audience aren't right, nothing else matters."*

**Visual:** Persona card from Stage 1 — photo placeholder, role, budget, key quote.

---

## Slide 3 — Key Insights

**Title:** *Three insights that drove the design.*

**Body:**
1. **The measurement gap is the root cause, not channel choice.** Physical channels are cut not because they don't work, but because they don't *report* in the same vocabulary as digital. (Source: P3, P4)
2. **Decision agility is asymmetric.** Marketers kill underperforming channels fast; reallocating spend takes weeks. (Source: P3, P2)
3. **Simplicity is universally demanded — and procedurally defeated.** Every interview converged on simplicity, then named the stakeholder pressure that destroys it. (Source: P1, P2, P3, P4)

**Visual:** Three cards, one insight each, with the supporting quote underneath.

---

## Slide 4 — Design Challenge

**Title:** *How might we...*

**Body (centered, large type):**

> *"How might we help time-pressed marketing leads at early-stage startups make confident, evidence-led decisions across physical and digital channels — without specialist tooling or external measurement firms?"*

**Visual:** Large quote-mark serif treatment. Below, three Design Goals as a small footer:
- DG1 — Compare across channels in <10s on a single screen
- DG2 — Approve a budget move in <90s with evidence
- DG3 — Score ad copy in <6s

---

## Slide 5 — Competitive Landscape

**Title:** *What exists, what's missing.*

**Body (matrix):**

|  | Cross-channel data | Physical channels first-class | Act-on-insight loop | £10k/mo persona |
|---|---|---|---|---|
| HubSpot | ✓ | ✗ | Partial | ✗ (£750/mo) |
| Mixpanel | ✗ | ✗ | ✗ | ✗ |
| Northbeam | ✓ | ✗ | ✗ | ✗ (e-commerce only) |
| **Signal** | ✓ | **✓** | **✓** | **✓** |

**Visual:** The 4×4 matrix, with Signal's row in the brand accent green.

---

## Slide 6 — Concept

**Title:** *Signal — one dashboard, every channel, one clear read.*

**Body:** Signal is one dashboard that gives John an honest read across every channel, alerts him when something needs his attention, and walks him through a single budget move at a time — with the evidence and the caveats — until he approves it. Plus a separate Clarity Check that scores ad copy in under six seconds.

**Visual:** Hero shot of `/dashboard` rendered at 1440px — the four KPI tiles, the cross-channel table with status colours, the alerts panel, the trend chart.

---

## Slide 7 — Prototype Screen 1: Dashboard

**Title:** *The dashboard is the product.*

**Body (callouts on the screen):**
- A — Date range tabs (drive every number on the page)
- B — Four KPI tiles with directional deltas
- C — Cross-channel table with left-edge status stripes
- D — Alerts with embedded act-on-insight CTA
- E — Multi-channel trend chart, channel-coloured

**Visual:** Dashboard screenshot (`materials/screenshots/dashboard-30d-default.png`) with annotation callouts overlaid.

---

## Slide 8 — Prototype Screen 2: Budget Move

**Title:** *One move at a time — with the evidence.*

**Body:**
- Visual flow from source to destination, before → after
- Three pieces of evidence above the action
- Risk caveats in a fold-out disclosure
- Approve / Adjust / Decline — every action gated by intent

**Visual:** `/budget` screenshot with annotations — the flow visual, the evidence list, the sticky CTA footer.

---

## Slide 9 — User Flow

**Title:** *Five steps from a fresh brief to an approved budget move.*

**Body (small):**
- Average path-completion time (measured): **3 min 50 sec**
- Average SUS score (n=5): **84.5 / 100** (top quartile per Brooke 1996)

**Visual:** The flow diagram from Stage 3.3 — Brief → Channels → Dashboard → Channel deep-dive → Budget. Or a screenshot of the live `/flow` route.

---

## Slide 10 — Usability Findings

**Title:** *What we found, and what surprised us.*

**Body:**

| Finding | What it told us |
|---|---|
| 5/5 testers named PR Placement as the worst channel within 30 seconds | Status colour + position on the table works |
| 0/5 testers noticed the date-range tabs did nothing on the pre-fix prototype | False affordance was completely undetectable to the user |
| Lowest SUS score (67.5) came from the non-marketer, not the experienced ones | Domain unfamiliarity ≠ interface friction |

**Visual:** Three findings as cards, with a quote from the most relevant tester under each.

---

## Slide 11 — Improvements (Before / After)

**Title:** *Five fixes from one round of evaluation.*

**Body (table):**

| # | Issue | Heuristic | Severity |
|---|---|---|---|
| 1 | Date-range tabs change pill but data didn't | H1 | 4 → 0 |
| 2 | "View in platform" button did nothing | H2 | 3 → 1 |
| 3 | "Dismiss" button didn't dismiss | H3 | 3 → 0 |
| 4 | "Adjust" toggle revealed nothing | H6 | 3 → 0 |
| 5 | Decline reason silently discarded | H1 | 2 → 0 |

**Visual:** Before/after pair for Issue 1 (the dashboard at 30d on the left, the same dashboard at 7d on the right with every number changed) — the most striking visual evidence.

---

## Slide 12 — Value & Next Steps

**Title:** *Why this matters, and what we'd do next.*

**Body:**
- *For the persona:* faster decisions on a tighter budget, with an honest read across every channel
- *For the assignment:* a 50-mark project grounded in real research, real testing, and real iteration
- *Next iteration would:* live ad-platform integration (LinkedIn / Google Ads APIs), an ML-suggested-move engine replacing the static rules, mobile-app companion for on-the-go decisions

**Visual:** Live prototype URL in large type — *signal-drab-xi.vercel.app* — with a QR code.

**Closing line:** *"One dashboard, every channel, one clear read."*

---

## Speaker notes (optional)

If you have time for opening remarks:
> *"This project began with one piece of evidence from one interview — the moment P4's CMO cut their outdoor advertising budget because it didn't produce clickthrough rates. We built Signal because that's not actually a problem with outdoor advertising. It's a problem with how outdoor advertising gets measured. Signal closes that gap."*
