# Stage 2 — Competitive Analysis & Ideation

## 2.1 Competitive Landscape

We analysed three commercial products in or adjacent to Signal's problem space. Each was evaluated against the rubric's three lenses: **what works**, **what fails**, **opportunities for Signal**, with Nielsen heuristics and Gestalt principles cited where relevant [2], [3].

### 2.1.1 HubSpot Marketing Hub

*All-in-one marketing automation, mid-market and growth-stage.*

| What works | What fails | Opportunity for Signal |
|---|---|---|
| Single-source-of-truth campaign reporting (the cross-channel read Signal aspires to). Strong information scent — every tile shows a delta with directional arrow and contextual framing (Nielsen H1). Editorial rigour in attribution: first-touch / last-touch / linear models exposed transparently. | Monstrous IA (H8) — first-time marketing lead at a 5-person startup faces a 14-item sidebar, six paid upgrades. No first-class home for outdoor/experiential channels — paid ads UTM tracking covers Google/LinkedIn/Facebook well; everything else is "Other" (PS4 replicated inside the tool that claims to fix it). Cross-channel reporting gated at £750/month "Marketing Hub Professional" — a hard wall for the persona. | Be opinionated where HubSpot is configurable. Treat physical channels as first-class. Single consolidated dashboard, not 14 sidebar items. Cross-channel compare available by default, not paid-tier. |

### 2.1.2 Mixpanel

*Product analytics, used heavily by SaaS startups for funnel analysis.*

| What works | What fails | Opportunity for Signal |
|---|---|---|
| Time-to-first-insight is short — sane chart on selection of any event (Signal mirrors this in `/brief`'s pre-filled budget slider). Segmentation done well — Breakdown menu slices any metric by any property in one click; related controls cluster (Gestalt common region [4]). Cohorts are first-class — saving and reusing supports the "decision agility" insight. | Built for a single-channel reality; structurally unable to compare a podcast sponsorship to a LinkedIn ad — data isn't in the same database. Marketers must export to spreadsheets to reconstruct cross-channel — the failure mode Signal exists to fix. Interface is for analysts, not marketing leads (H6) — query language exposes funnel/event semantics requiring training. No spend or budget reallocation surface. | Borrow the "graph on first selection" defaults and Breakdown segmentation, but stay in marketing-lead vocabulary (channels, signups, audience match) not product-analyst vocabulary. Close the act-on-insight loop with `/budget`. |

### 2.1.3 Northbeam

*Marketing measurement for direct-to-consumer brands, multi-touch attribution.*

| What works | What fails | Opportunity for Signal |
|---|---|---|
| Single hero metric per view — "Cost per New Customer" leads, not buried among nine secondary tiles. Honest about confidence — annotates attribution with confidence intervals; tells the user when data is sparse (addresses P3's concern that marketers default to confident-looking numbers). Excellent empty states — clear "what to do first" prompts, never an empty grid. | Locked to e-commerce and ads — podcast sponsorships, in-person events, PR placements absent or shoehorned into "offline" (PS4 again, inside a tool whose positioning claims to fix it). Onboarding requires Shopify + Meta Ads account — the persona we design for cannot use Northbeam at all. Visual density high; context buried behind hover states (H1 partial violation). | Match the hero-metric clarity and confidence-honesty without the e-commerce-only assumption. Design explicitly for the £10k/month, mixed-channels, no-Shopify reality of smaller-stage clients. |

### 2.1.4 Cross-Cutting Opportunities

Three positioning gaps:

1. **No tool treats physical channels as first-class.** Signal's `/dashboard` table puts LinkedIn Ads, Podcast Sponsorship and SaaStr Europa on the same row template — a structural commitment, not a UI choice.
2. **No tool closes the analyse-to-act loop in one surface.** Mixpanel tells; HubSpot reports; Northbeam attributes. None propose a specific budget move with evidence and a single approve/decline. Signal's `/budget` is the differentiator.
3. **No tool serves the £10k/month marketing lead.** All three are priced and configured for in-house teams of 5–50. Signal's defaults assume a one-person operation.

## 2.2 Crazy 8s — Individual Sketches

Standard Crazy 8s protocol [5] — A4 folded into 8 panels, 60 seconds per panel, no refining. Run **22 March 2026**, re-run **15 April 2026** once the early prototype revealed which surfaces still needed shaping. Photographs of all ten sheets and full per-member panel descriptions in **Appendix C**.

| Member | Best-panel concept | One-line description |
|---|---|---|
| Aquib Palampalliyali | Channel Health Stripes | Horizontal green/amber/red stripes per channel row, thickness proportional to weekly spend. |
| Aman Riyas | Single-Move Recommendation Card | Full-width card: "Move £1,800 from LinkedIn Ads to Podcast" + 3 evidence rows + Approve/Decline. |
| Heng Cheng | Brief-as-Conversation | 4-step progressive form, one question at a time, produces the channel mix. |
| Alagappan Alagappan | Clarity Check Verdict | Two-pane: original ad copy left; 0–100 score plus tightened rewrite right. |
| Amir Hossein Kazemkhani | One-Read Dashboard with Status Bar | 4 KPI tiles + cross-channel table + left-edge coloured status bar. Reads in 10 seconds. |

## 2.3 Concept Selection

We dot-voted on the five "best panel" concepts (3 votes per member, 15 total):

| Concept | Author | Votes |
|---|---|---|
| One-Read Dashboard with Status Bar | Amir | 5 |
| Single-Move Recommendation Card | Aman | 4 |
| Channel Health Stripes | Aquib | 3 |
| Clarity Check Verdict | Alagappan | 2 |
| Brief-as-Conversation | Heng | 1 |

Rather than pick one, we noticed the top three could be combined: One-Read Dashboard provides the surface, Recommendation Card lives inside as the act-on-insight CTA, Channel Health Stripes are the row-level visual encoding. Clarity Check Verdict became a utility route (`/copy`) — distinct task, not dashboard-bound. Brief-as-Conversation became `/brief` because the dashboard needs *something* to populate before it can render a meaningful state.

The combined concept is **Signal**:

> Signal is one dashboard that gives John an honest read across every channel, alerts him when something needs his attention, and walks him through a single budget move at a time — with the evidence and the caveats — until he approves it. Plus a separate Clarity Check that scores a piece of ad copy in under six seconds.

**Rationale for the combined concept:** maps to four of the five A1 problem statements (PS1 channels, PS3 noise, PS4 measurement, PS5 messaging — PS2 implicit in the £10k default and no external tooling); buildable as a coded prototype in two weeks; testable in a 30-minute usability session, each surface a discrete task. Dot-vote and combination minutes from 15 April 2026 in **Appendix C**.
