# Stage 5 — Iteration

> **Prioritisation principle.** Per the rubric: fix first issues that are both **high severity AND observed in usability testing**. Of the ten Stage 4 issues, the five below satisfy that joint criterion. Five further issues sit below the threshold and are documented as known limitations in `INTERACTIVITY_AUDIT.md` for the next iteration.

All five fixes are in the live prototype at https://signal-drab-xi.vercel.app and in commit `d2f03c9` on the master branch. Before/after screenshots in `submission/materials/screenshots/`.

## 5.1 Top 5 Issues — Before / After

| # | Issue | Original (broken) | Revised (shipped) | Why it failed | Heuristic |
|---|---|---|---|---|---|
| 1 | **Date-range tabs were a false affordance** [Dashboard] | `7d / Last 30 days / Campaign` SegmentedTabs visually toggled the active pill, but no downstream component received the `range` value. KPI tiles, table, alerts, chart all rendered from a single static dataset. | Threaded `range` as a prop through every downstream surface. Added three range-aware aggregations to `lib/mock-data.ts`: `rangeMetrics`, `rangeChannelMetrics`, `combinedTrendRange`. Selecting a tab now redraws every number, sparkline and chart line on the page. Chart title updates. Subtitle reads the chosen range. | 5/5 testers attempted the tabs; none realised data hadn't changed. T3: "Wait, did anything happen? In other tools when I switch ranges everything redraws." Severity 4 — the most prominent date-driven control on the most-used surface. | **H1** Visibility of System Status |
| 2 | **"View in platform" button wired to nothing** [Channel deep-dive] | Header button labelled "View in platform" with `<ExternalLink>` icon; no `onClick`, no `href`. Clicking did nothing. | Extracted into `components/channels/platform-link-button.tsx`; on click shows a 3.5s toast: *"In production this opens the [view in platform] in a new tab. Prototype demo — no live link."* `role="status"`, `aria-live="polite"` for screen readers. | Icon promised behaviour the prototype could not keep. T1 attempted to click during Task 1 warm-up. Two options were "remove" or "make honest about prototype state"; we chose the latter because the affordance is correct for production. | **H2** Match Real World |
| 3 | **"Dismiss" button on recommendation did nothing** [Channel deep-dive] | Recommendation panel with two buttons: "Review in Budget" (worked) and "Dismiss" (no handler). | `components/channels/recommendation-panel.tsx` with local `dismissed` state and Framer Motion `AnimatePresence`. Click Dismiss → panel collapses, replaced by a status row + Undo (`<Undo2>` icon) that restores it. | 3/5 testers expected Dismiss to clear the panel. T3: "I just clicked Dismiss to make it go away, but it's still here?" Destructive action requires a recovery path. | **H3** User Control & Freedom |
| 4 | **"Adjust" toggle flipped a label without revealing anything** [Budget] | Adjust/Done-adjusting toggle's `adjustOpen` state was set on click but never consumed; slider always visible. | Slider visibility now gated on `adjustOpen`. Default: compact summary row "Suggested: £1,800/mo. Press Adjust to fine-tune." Click Adjust → slider reveal with `height: 0 → auto`; label flips. Done adjusting collapses back. | T3: "I clicked Adjust and... nothing happened? But the button changed?" Mode switch with no recognition cue — state without behaviour. | **H6** Recognition rather than Recall |
| 5 | **Decline reason captured but silently discarded** [Budget] | Decline modal asked "Why are you declining?" with a textarea; the value was captured in state but never displayed back. | `submitDecline` reads the trimmed reason and incorporates it into the toast: *"Noted — '[reason]'. We'll factor it in next week."* If empty, generic "Decline noted." | T1 and T2 expected the reason "captured somewhere." Input invited then silently thrown away. Same root cause as HE-4. | **H1** Visibility of System Status |

## 5.2 Patterns across the iteration

Three of the five fixes (Issues 1, 3, 4) share a structural pattern we have named the **false affordance** — a control that visibly changes its own state on click but produces no observable effect on data outside itself. This is uniquely damaging because it teaches the user the interface is dishonest; once a user notices one false affordance they doubt every other control on the page.

We took two structural countermeasures beyond the spot-fixes:

1. **`INTERACTIVITY_AUDIT.md`** — a complete enumeration of every interactive element on every page, classified Wired / Partial / Dead with `file:line` references. We reviewed every row before closing Stage 5. Lives in the repo root as a regression check for future iterations.
2. **`INTERACTIVITY.md`** — a one-page contract future contributors must satisfy before declaring any UI task done. Six explicit rules, a pre-merge checklist, a heuristic-mapping table. Intent: the false-affordance pattern cannot return without someone explicitly violating a written rule.

## 5.3 Backlog — issues not fixed this round

Five issues sit below the "fix first" threshold (severity ≤ 2 and observed by ≤1 tester):

- HE-7 — Cmd+Enter to score *(½ day)*
- HE-9 — Copy-to-clipboard on Clarity rewrite *(½ day)*
- HE-10 — Better empty state on `/budget` *(½ day)*
- IS-01 — Disambiguate audience-match number with cursor + tooltip *(½ hour)*
- IS-03 — Explanatory tooltip on cost-per-signup for non-marketers *(½ hour)*

Total deferred: ~1.5 developer-days. None are submission blockers; all are real future-version improvements.
