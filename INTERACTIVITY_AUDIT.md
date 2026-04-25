# Signal — Interactivity Audit

**Purpose:** Prove every visible control is causally wired to a state change the user can see. False affordances (controls that look operable but do nothing) directly fail the rubric for the Clickable Prototype (10 marks) and Nielsen heuristic #1 (Visibility of System Status).

**Definitions**
- **Wired** — clicking causes a *visible* state change to data outside the control itself (numbers update, panel opens, navigation happens, modal shows).
- **Partial** — control updates internal state (active class, controlled value) but no downstream data reads from that state. **Treat as bug.**
- **Dead** — no handler, or handler does nothing useful.

---

## Findings

### /dashboard

| Element | File:Line | Wired? | Evidence |
|---|---|---|---|
| Date-range tabs `7d / Last 30 days / Campaign` | dashboard/page.tsx:67–73 | **PARTIAL** | `setRange` runs, but no child receives `range` as a prop. KPIs/table/chart/alerts hardwired to one mock set. |
| Channel-table sort headers (×7) | channel-table.tsx:89–105 | Wired | `sorted` useMemo re-derives from `[sortKey, asc]`. |
| Channel name links (×5 rows) | channel-table.tsx:141–145 | Wired | Navigates to `/channels/[id]`. |
| Trend-chart metric tabs `Signups / Spend / £/signup` | trend-chart.tsx:49–54 | Wired | `combinedTrend(metric)` recomputes on metric change. |
| Trend-chart legend buttons (×5) | trend-chart.tsx:64–95 | Wired | `hovered` drives stroke opacity per series. |
| Alert CTAs (`Review reallocation`, `Decide`) | alerts.tsx:77–83 | Wired | Navigates to `/budget` and `/channels/pr-placement`. |
| Empty-state CTA `Start with a brief` (`?demo=empty`) | dashboard/page.tsx:163 | Wired | Navigates to `/brief`. |

### /channels

| Element | File:Line | Wired? | Evidence |
|---|---|---|---|
| Allocation sliders (×5) | channels/page.tsx:366–379 | Wired | Updates Zustand mix-store; sidebar bar + readouts react. |
| `Launch campaign` button | channels/page.tsx:207–219 | Wired | Loading state then `router.push("/dashboard")`. |
| `Edit` brief link | channels/page.tsx:95–99 | Wired | Navigates to `/brief`. |
| `Why this channel` disclosures (×5) | channels/page.tsx:382–393 | Wired | Animated expand/collapse. |
| `Build the brief` link | channels/page.tsx:68–71 | Wired | Navigates to `/brief`. |

### /channels/[id]

| Element | File:Line | Wired? | Evidence |
|---|---|---|---|
| `View in platform` button | channels/[id]/page.tsx:115–121 | **DEAD** | No `onClick`, no `href`. ExternalLink icon implies it opens a URL. |
| `Review in Budget` link | channels/[id]/page.tsx:229–234 | Wired | Pre-fills `/budget?source&dest&amount`. |
| `Dismiss` button (recommendation) | channels/[id]/page.tsx:235–240 | **DEAD** | No handler. Recommendation panel cannot be dismissed. |
| Breadcrumb `Dashboard` | channels/[id]/page.tsx:55–58 | Wired | Navigates to `/dashboard`. |
| Breadcrumb `Channels` | channels/[id]/page.tsx:62–64 | **MISLABELLED** | Points to `/dashboard`. Should point to `/channels` (or be removed since `/channels` is launch-only). |

### /brief

| Element | File:Line | Wired? | Evidence |
|---|---|---|---|
| Stage option buttons (4) | brief/page.tsx:143–157 | Wired | `useBriefStore.setStage`. |
| Budget slider | brief/page.tsx:358–366 | Wired | Calls `useMixStore.scaleTo` to redistribute. |
| Budget quick-pick chips (4) | brief/page.tsx:370–378 | Wired | Same path as slider. |
| Audience tag buttons (8) | brief/page.tsx:167–184 | Wired | `toggleAudience` to store. |
| Custom-audience input + `Add` | brief/page.tsx:191–209 | Wired | Two-phase: typing local, Add commits to store. |
| `remove` link (custom audience) | brief/page.tsx:214–219 | Wired | Clears in store. |
| Goal option buttons (4) | brief/page.tsx:231–265 | Wired | `setGoal`. |
| `Back` / `Next` | brief/page.tsx:273–299 | Wired | Step navigation with `canContinue` gate. |
| `Propose my channel mix` | brief/page.tsx:301–323 | Wired | Marks launched, navigates to `/channels`. |

### /budget

| Element | File:Line | Wired? | Evidence |
|---|---|---|---|
| Amount-to-move slider | budget/page.tsx:132–140 | Wired | Drives `sourceAfter` / `destAfter` recompute live. |
| `Things to watch` disclosure | budget/page.tsx:175–199 | Wired | AnimatePresence collapse/expand. |
| `Decline` | budget/page.tsx:229–234 | Wired | Opens decline modal. |
| `Adjust` / `Done adjusting` toggle | budget/page.tsx:237–242 | **PARTIAL** | Label flips but `adjustOpen` is never read elsewhere. |
| `Approve move` | budget/page.tsx:257–278 | Wired | Loading → success → `/dashboard`. **Limitation:** does not actually mutate the mix store, so the dashboard does not reflect the move. |
| Decline modal `Cancel` / `Confirm decline` | budget/page.tsx:318–329 | Wired | Closes / closes+toast. |
| Decline modal textarea | budget/page.tsx:309–315 | **PARTIAL** | `declineReason` is captured but never displayed, sent, or surfaced. |
| Backdrop click closes modal | budget/page.tsx:293 | Wired | Closes (inner panel stops propagation). |

### /copy

| Element | File:Line | Wired? | Evidence |
|---|---|---|---|
| Goal `<select>` | copy/page.tsx:109–119 | Wired | Sent in `/api/clarity` body. |
| Ad-copy `<textarea>` | copy/page.tsx:122–129 | Wired | Body of API call; gates `Score it` button. |
| Example chips (input panel ×2) | copy/page.tsx:134–141 | Wired | Fills textarea. |
| Example chips (results-empty panel ×2) | copy/page.tsx:315–328 | Wired | Same. |
| `Score it` | copy/page.tsx:154–174 | Wired | Calls Anthropic via route handler. |
| `Cancel` (during loading) | copy/page.tsx:145–152 | Wired | `controller.abort()`. |
| `Try again` (error state) | copy/page.tsx:200–204 | Wired | Re-fires `score`. |

### /flow

| Element | File:Line | Wired? | Evidence |
|---|---|---|---|
| Flow node cards (×5) | flow/page.tsx:143–170 | Wired | Each navigates to its target route. |
| `Open Clarity Check` | flow/page.tsx:120–125 | Wired | Navigates to `/copy`. |

### /style-guide

| Element | File:Line | Wired? | Evidence |
|---|---|---|---|
| Section tabs `System / Components / Data viz` | style-guide/page.tsx:45–51 | Wired | Conditional rendering swaps the section. |
| Disclosure demo | style-guide/page.tsx:277–291 | Wired | Real disclosure component preview. |
| `Start with a brief` empty-state demo | style-guide/page.tsx:298–305 | Wired | Navigates. |
| Button-style specimens | style-guide/page.tsx:217–232 | Intentionally inert | Pattern-library specimens, not product controls. **Action:** label them "specimen" and disable. |

### Shell (Sidebar / TopNav)

| Element | File:Line | Wired? | Evidence |
|---|---|---|---|
| Logo links | sidebar.tsx:43–50, top-nav.tsx:39–46 | Wired | Navigate to `/dashboard`. |
| Nav links (×7) | sidebar.tsx:54–81, top-nav.tsx:60–81 | Wired | Navigate; `aria-current` correct. |
| Sidebar user card | sidebar.tsx:84–103 | Cosmetic | Not a button, but looks interactive. **Action:** acceptable as-is for prototype. |

---

## Severity Ranking (Worst Rubric Hits)

| # | Control | Route | Severity | Why |
|---|---|---|---|---|
| 1 | Date-range tabs (7d / 30d / Campaign) | /dashboard | **Critical** | Highest-traffic surface. First control any assessor will click. Active-state lies; nothing downstream changes. |
| 2 | `View in platform` button | /channels/[id] | **High** | ExternalLink icon implies navigation. Above the fold on every deep-dive. |
| 3 | `Dismiss` (recommendation) | /channels/[id] | **High** | Primary acknowledgement affordance on the recommendation panel. |
| 4 | Breadcrumb `Channels` → `/dashboard` | /channels/[id] | **Medium** | Mislabel. User clicks "Channels", lands on Dashboard. |
| 5 | `Adjust` toggle | /budget | **Medium** | Label changes but no panel opens. Implies mode switch. |
| 6 | Decline-modal textarea | /budget | **Medium** | Asks why, then silently discards the answer. |
| 7 | Style-guide button specimens | /style-guide | **Negligible** | Pattern library. Ok if labelled. |

## Stage-4 Heuristic-Violation Summary (formatted for the rubric table)

| Heuristic violated | Issue description | Screen / element | Severity (0–4) | Observed in test? | Suggested fix |
|---|---|---|---|---|---|
| H1 Visibility of system status | Date-range tabs change active pill but produce no data change | Dashboard, top-right segmented control | 4 | Yes (this conversation) | Wire `range` to KPIs, alerts, table sparks, trend chart; switch mock dataset by range. |
| H2 Match between system and real world | "View in platform" labelled like an outbound link but does nothing | Channel deep-dive header | 3 | Yes | Either link to a placeholder URL with a "demo" tooltip, or remove the button. |
| H3 User control and freedom | "Dismiss" on the recommendation does not dismiss | Channel deep-dive recommendation | 3 | Yes | Hide the recommendation panel on dismiss; show subtle undo affordance. |
| H4 Consistency and standards | Breadcrumb "Channels" navigates to /dashboard | Channel deep-dive breadcrumb | 2 | Yes | Point to `/channels` (or remove the segment if /channels is launch-gated). |
| H6 Recognition rather than recall | "Adjust" label flips state without revealing what was hidden | Budget page primary actions | 2 | Yes | Either gate the slider on `adjustOpen` or remove the toggle. |
| H1 Visibility of system status | Decline reason captured but never echoed back | Budget decline modal | 2 | Yes | Echo the reason in the toast, or remove the textarea if not used. |

---

## Process change to prevent recurrence

See `INTERACTIVITY.md` — every visible control must:

1. Have a documented onClick/onChange / Link href.
2. Have a single line in the audit table proving an *observable* downstream effect (not just internal state).
3. Be exercised by a Playwright walk-through before any "done" claim.

Anything that fails (1) or (2) is removed, not left as a false affordance.
