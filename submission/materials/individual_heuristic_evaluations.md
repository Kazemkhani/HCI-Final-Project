# Appendix F — Individual Heuristic Evaluation Templates

> One template per group member, completed before the consolidation meeting on **18 April 2026**. Same structure as Assignment 2's Appendix A. The 10 consolidated issues in the main report (Section 4.4) are the Phase 2 product of these Phase 1 individual evaluations.

---

## Member 1 — Aquib Palampalliyali (Student ID: 2712170)

| # | Issue Title | Heuristic | Sev. | Description | Screenshot |
|---|---|---|---|---|---|
| 1 | False Date-Range Tabs on Dashboard | H1 — Visibility of System Status | 4 | The `7d / Last 30 days / Campaign` tabs at the top of the dashboard visually toggle but produce no observable effect on KPIs, the table, or the chart. Most prominent control on the most-used surface. | `screenshots/dashboard-30d-default.png` |
| 2 | Audience Match Number Looks Clickable | H1 — Visibility of System Status | 2 | The audience match score (e.g. "72 / 100") on the dashboard tile is visually styled to suggest interactivity but is non-interactive. Hovering shows no cursor change. | n/a |
| 3 | Mislabelled Breadcrumb on Channel Deep-Dive | H4 — Consistency and Standards | 2 | The "Channels" segment in the breadcrumb on `/channels/[id]` points to `/dashboard` rather than `/channels`. | `screenshots/deepdive-default.png` |
| 4 | No Empty State on Direct /budget Visit | H1 — Visibility of System Status | 1 | If a user lands on `/budget` without a `?source` query string, the page shows a sparse heading with no visual indication of what would normally be there. | n/a |

---

## Member 2 — Aman Riyas (Student ID: 2717450)

| # | Issue Title | Heuristic | Sev. | Description | Screenshot |
|---|---|---|---|---|---|
| 1 | "View in platform" Button on Deep-Dive Does Nothing | H2 — Match Between System and Real World | 3 | The `<ExternalLink>` icon on the button promises an outbound link to LinkedIn Campaign Manager (or equivalent). Pre-fix, the button had no `onClick` and no `href`. | `screenshots/deepdive-default.png` |
| 2 | Decline Reason Captured but Discarded | H1 — Visibility of System Status | 2 | The decline modal asks "Why are you declining?" with a textarea. Pre-fix, the typed reason was never displayed back, sent, or used in the toast. | n/a |
| 3 | "Adjust" Toggle Flips Label Without Revealing Anything | H6 — Recognition Rather Than Recall | 3 | Pre-fix, clicking Adjust changed the label to "Done adjusting" but the slider was visible all the time regardless of which mode the toggle was in. | `screenshots/budget-default-no-slider.png` |
| 4 | No Keyboard Shortcut for "Score it" on Clarity Check | H7 — Flexibility and Efficiency of Use | 1 | Frequent users would expect Cmd+Enter or Ctrl+Enter to submit the textarea; no shortcut bound. | n/a |

---

## Member 3 — Heng Cheng (Student ID: 2580411)

| # | Issue Title | Heuristic | Sev. | Description | Screenshot |
|---|---|---|---|---|---|
| 1 | False Date-Range Tabs on Dashboard *(duplicate of Aquib #1)* | H1 — Visibility of System Status | 4 | Same false-affordance pattern. | `screenshots/dashboard-30d-default.png` |
| 2 | "Dismiss" on Recommendation Does Nothing | H3 — User Control and Freedom | 3 | The Dismiss button on the recommendation panel of `/channels/[id]` had no handler. Users had no path to acknowledge and clear the recommendation. | `screenshots/deepdive-default.png` |
| 3 | "Style guide" in Sidebar Visible to End-Users | H8 — Aesthetic and Minimalist Design | 1 | The `/style-guide` route is a development artefact rendered as a regular sidebar nav item. Acceptable for the HCI submission; should be hidden in production. | n/a |
| 4 | Trend Chart Legend Buttons Don't Indicate Pressed State | H1 — Visibility of System Status | 1 | The legend buttons toggle line emphasis on hover/focus but there is no `aria-pressed` indicating the active state for assistive tech users. | n/a |

---

## Member 4 — Alagappan Alagappan (Student ID: 2608091)

| # | Issue Title | Heuristic | Sev. | Description | Screenshot |
|---|---|---|---|---|---|
| 1 | False Date-Range Tabs on Dashboard *(duplicate of Aquib #1, Heng #1)* | H1 — Visibility of System Status | 4 | Same finding. Three independent identifications strengthen the case. | `screenshots/dashboard-30d-default.png` |
| 2 | "View in platform" Button Does Nothing *(duplicate of Aman #1)* | H2 — Match Between System and Real World | 3 | Same finding. | `screenshots/deepdive-default.png` |
| 3 | "Adjust" Toggle Flips Label Without Revealing *(duplicate of Aman #3)* | H6 — Recognition Rather Than Recall | 3 | Same finding. | `screenshots/budget-default-no-slider.png` |
| 4 | No Copy-to-Clipboard on Clarity Rewrite | H7 — Flexibility and Efficiency of Use | 2 | After Clarity Check returns a rewrite, no button to copy the suggestion. Users must select-and-copy by hand. | n/a |

---

## Member 5 — Amir Hossein Kazemkhani (Student ID: 2418010)

| # | Issue Title | Heuristic | Sev. | Description | Screenshot |
|---|---|---|---|---|---|
| 1 | False Date-Range Tabs on Dashboard *(duplicate)* | H1 — Visibility of System Status | 4 | Same finding. Four independent identifications. | `screenshots/dashboard-30d-default.png` |
| 2 | "Dismiss" on Recommendation Does Nothing *(duplicate of Heng #2)* | H3 — User Control and Freedom | 3 | Same finding. | n/a |
| 3 | Decline Reason Captured but Discarded *(duplicate of Aman #2)* | H1 — Visibility of System Status | 2 | Same finding. | n/a |
| 4 | "Cost per signup" Confusing for Non-Marketer | H2 — Match Between System and Real World | 2 | The cost-per-signup KPI tile uses domain vocabulary ("£12.50 / signup") with no contextual benchmark for whether this is good or bad. Acceptable for the marketing-lead persona; unclear for adjacent personas. | n/a |

---

## Consolidation summary

Across the five individual evaluations:
- **Issue identified by ≥3 members:** False Date-Range Tabs (5/5), "View in platform" button (2/5), "Adjust" toggle (2/5), "Dismiss" button (2/5), Decline reason captured but discarded (2/5)
- **Issue identified by 1 member only:** Audience match clickability, mislabelled breadcrumb, sidebar dev artefact, legend `aria-pressed`, no Cmd+Enter, no copy-to-clipboard, sparse empty state, cost-per-signup vocabulary

The consolidation meeting (18 April 2026) merged duplicates and ranked the 10 most impactful for inclusion in the main report. Severity ratings were arbitrated by argument-on-evidence, not by averaging — Aquib and Heng's 4-Critical for Issue #1 was upheld over the 3-Major counter-position once we agreed that the cross-channel comparison task is the load-bearing user task and is blocked by the broken control.
