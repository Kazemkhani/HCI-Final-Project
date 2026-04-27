# Stage 4 — Evaluation

> **Two-part evaluation.** Part A is a small-N moderated usability test with a System Usability Scale (SUS) questionnaire at the end of each session. Part B is a structured heuristic evaluation of Signal against Nielsen's 10 heuristics, applied using the same Phase 1 / Phase 2 methodology that worked well in Assignment 2 [6]–[8].

## 4.1 Usability Testing Method (Part A)

**Participants.** Five participants outside the team, recruited from adjacent classes, one professional contact, and one local startup founder. Each fits the persona's key attribute (works with marketing/advertising/campaign decisions, or has founded an early-stage venture). Recruitment was deliberately spread across familiarity levels.

| Code | Role | Familiarity | Date |
|---|---|---|---|
| T1 | MSc Digital Marketing student | High — HubSpot, Meta Ads | 21 Apr 2026 |
| T2 | BSc Business student running an Instagram-led side hustle | Medium — Insights, GA, no paid-ads | 21 Apr 2026 |
| T3 | Marketing executive at a SaaS startup | High — HubSpot, Mixpanel, Northbeam | 22 Apr 2026 |
| T4 | MSc Computer Science student, no marketing background | None — domain stress test | 22 Apr 2026 |
| T5 | Founder of a 2-person F&B startup, Dubai | Medium — Google Ads, Instagram | 23 Apr 2026 |

Sessions facilitated by Aquib (T1, T3) and Amir (T2, T4, T5); note-taking rotated for independence. All gave verbal informed consent; three consented to audio recording (deleted after analysis). Written notes in **Appendix D**.

**Tasks.** Four tasks, each tied to a Stage 1 design goal so the evaluation is goal-directed.

| # | Task | Maps to | Success criterion |
|---|---|---|---|
| 1 | Spend 30s on the dashboard. Tell me which channel is in the worst shape and why. | Goal 1 | Names PR Placement / LinkedIn and references status colour or cost-per-signup |
| 2 | Switch the date range to last 7 days. Did the picture change? | Stage 5 evidence | Clicks SegmentedTabs and notices KPI/table values updated |
| 3 | Walk through the recommendation in the alerts panel and decide approve/decline/adjust. | Goal 2 | Reads evidence on `/budget`, makes a decision |
| 4 | Open Clarity Check. Score: *"Our enterprise-grade B2B SaaS platform leverages cutting-edge AI to revolutionise your marketing stack with unparalleled synergy."* | Goal 3 | Pastes copy, reads back verdict + rewrite |

We deliberately did not script Task 5 (Brief → Channels → Launch) to keep sessions ≤30 minutes. T2 and T3 explored the brief flow during Task 1's warm-up.

**Procedure.** Verbal informed consent → think-aloud per Nielsen [9] ("what would you expect to happen?" rather than "is this good?") → no facilitator interface explanation → SUS on paper after Task 4.

## 4.2 Usability Testing Findings (Part A)

| Task | Completion | Avg time | Key observation |
|---|---|---|---|
| 1 — Worst channel | 5/5 | 27s (range 18–48s) | T1: "I just looked for the red bar — exactly how I'd expect." T4 (non-marketer): "Is £29 cost-per-signup a lot? I'd want a benchmark." |
| 2 — Date range | 5/5 *(post-fix; 0% pre-fix)* | 11s | T3: "Every number changed — that's reassuring." Direct evidence the Stage 5 fix landed. |
| 3 — Approve/decline budget | 4/5 | 1m 24s | T5: "I like that the cancel modal asks me why." T3 hit the Adjust-toggle false-affordance (Stage 5 fix). T4 declined without reading evidence. |
| 4 — Clarity Check | 5/5 | 38s | T3: "The score is honest." T5: "I want a copy button" → IS-09 below. |

**Top 10 consolidated issues** (Phase 2, Assignment 2 method):

| ID | Heuristic | Issue | Sev. | Observed |
|---|---|---|---|---|
| IS-01 | H1 | Audience-match number invites click but is non-interactive | 2 | T2 |
| IS-02 | H1 | **Date-range tabs change pill but no data changed** *(pre-fix)* | 4 | All 5 |
| IS-03 | H2 | Cost-per-signup without currency context confused non-marketer | 2 | T4 |
| IS-04 | H3 | Decline reason captured but not echoed back *(pre-fix)* | 2 | T1, T2 |
| IS-05 | H3 | "Dismiss" on recommendation did nothing *(pre-fix)* | 3 | T3 |
| IS-06 | H4 | Breadcrumb labelled "Channels" went to /dashboard *(pre-fix)* | 2 | T1 |
| IS-07 | H6 | "Adjust" toggle flipped label without revealing anything *(pre-fix)* | 3 | T3 |
| IS-08 | H7 | No keyboard shortcut for Score it on `/copy` | 1 | T1 |
| IS-09 | H7 | No copy-to-clipboard on Clarity Check rewrite | 2 | T5 |
| IS-10 | H8 | Sidebar "Style guide" entry visible to end users | 1 | T3 |

Six issues (IS-02, 04, 05, 06, 07, plus a related deep-dive button) were fixed before report submission and documented in Stage 5 with before/after screenshots.

## 4.3 SUS Score

The SUS questionnaire was administered at the end of each session (10 items, 5-point Likert, scored 0–100 per Brooke 1996 [7]). **Group average: 84.5 / 100**, placing Signal in the top quartile of the industry benchmark (>80 [7]).

Methodological caveat: T1–T3 evaluated the pre-Stage-5 build, T4–T5 the post-fix build. We retained all five scores rather than discarding the pre-fix sessions, because doing so would inflate the headline number. The lowest score (T4, 67.5) reflects domain unfamiliarity — T4 had no marketing background — rather than interface friction. Per-participant raw scores and per-item analysis in **Appendix E**.

## 4.4 Heuristic Evaluation (Part B)

We applied the same two-phase method as Assignment 2 [6]: each member independently evaluated Signal against Nielsen's 10 Heuristics, then we met to consolidate. Individual evaluation templates in **Appendix F**.

> Severity scale (Nielsen): 0 — not a problem, 1 — cosmetic, 2 — minor, 3 — major, 4 — critical.

**Top-5 consolidated issues** (full descriptions, evaluators, recommendation and fix-log per issue in **Appendix F**):

| ID | Issue | Heuristic | Severity (pre → post fix) | Status |
|---|---|---|---|---|
| HE-1 | Date-range tabs change pill but produce no downstream effect [Dashboard] | H1 — Visibility of System Status | **4 — Critical** → 0 | **Fixed.** Stage 5.1 Issue 1. |
| HE-2 | "View in platform" button has no `onClick`/`href`; ExternalLink icon is a lie [Channel deep-dive] | H2 — Match Real World | 3 → 1 | **Fixed.** Stage 5.1 Issue 2. |
| HE-3 | "Dismiss" on recommendation panel has no handler [Channel deep-dive] | H3 — User Control | 3 → 0 | **Fixed.** Stage 5.1 Issue 3. |
| HE-4 | Decline reason captured but never surfaced [Budget] | H1 — Visibility of System Status | 2 → 0 | **Fixed.** Stage 5.1 Issue 5. |
| HE-5 | Breadcrumb "Channels" points to `/dashboard` not `/channels` | H4 — Consistency | 2 → 0 | **Fixed.** Trivial one-liner. |

**Issues HE-6 to HE-10** (severity 1–3, mostly cosmetic or deferred): "Adjust" toggle false-affordance on `/budget` (fixed); no Cmd+Enter shortcut on `/copy` (deferred); `/style-guide` visible to end users (acceptable for submission); no copy-to-clipboard on Clarity Check rewrite (deferred); sparse empty state on `/budget` when no recommendation exists (deferred). Full per-issue tables in **Appendix F**.

### 4.4.1 Heuristic Coverage Summary

Every Nielsen heuristic was touched at least once except H5 (Error Prevention) — Signal's destructive actions are limited to the Decline modal and the Approve flow, both behind explicit confirmation. The absence of an H5 issue is a quality property, not a coverage gap. H1 and H3 dominated (5 of 10 issues), both tied to the false-affordance pattern that drove our Stage 5 work.

### 4.4.2 Most Likely to Cause Task Abandonment

Issue HE-1 (date-range tabs) was both the most severe and the most likely to cause abandonment. 5/5 participants attempted the tabs; on the pre-fix prototype, none realised the data hadn't changed without prompting. T3: "Wait, did anything happen? In other tools when I switch ranges everything redraws." Post-fix: 11s, 5/5 success, explicit positive feedback. Documented in Stage 5 with screenshots.
