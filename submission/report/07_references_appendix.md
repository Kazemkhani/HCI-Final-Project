# References

[1] User Interviews, "User Interviews: The Beginner's Guide," *User Interviews Field Guide to UX Research*, 2024. [Online]. Available: https://www.userinterviews.com/ux-research-field-guide-chapter/user-interviews. [Accessed: Feb. 21, 2026].

[2] J. Nielsen, "10 Usability Heuristics for User Interface Design," *Nielsen Norman Group*, 1994 (updated 2024). [Online]. Available: https://www.nngroup.com/articles/ten-usability-heuristics/. [Accessed: Apr. 15, 2026].

[3] J. Nielsen, "How to Conduct a Heuristic Evaluation," *Nielsen Norman Group*. [Online]. Available: https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/. [Accessed: Apr. 15, 2026].

[4] D. Norman, *The Design of Everyday Things*, Revised and Expanded Edition. New York: Basic Books, 2013.

[5] J. Knapp, J. Zeratsky, and B. Kowitz, *Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days*. New York: Simon & Schuster, 2016. [Crazy 8s methodology described in Chapter 7.]

[6] J. Nielsen, "Usability Engineering," Morgan Kaufmann, 1994.

[7] J. Brooke, "SUS — A quick and dirty usability scale," in *Usability Evaluation in Industry*, P. W. Jordan, B. Thomas, B. A. Weerdmeester, and I. L. McClelland, Eds. London: Taylor and Francis, 1996, pp. 189–194.

[8] J. Nielsen, "Severity Ratings for Usability Problems," *Nielsen Norman Group*, 1995. [Online]. Available: https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/. [Accessed: Apr. 15, 2026].

[9] Nielsen Norman Group, "Usability Testing 101," [Online]. Available: https://www.nngroup.com/articles/usability-testing-101/. [Accessed: Apr. 18, 2026].

[10] K. Kaplan, "Journey Mapping 101," *Nielsen Norman Group*, Nov. 15, 2016. [Online]. Available: https://www.nngroup.com/articles/journey-mapping-101/. [Accessed: Feb. 21, 2026].

[11] Interaction Design Foundation, "What are Personas?," *Interaction Design Foundation - IxDF*, 2016. [Online]. Available: https://www.interaction-design.org/literature/topics/personas. [Accessed: Feb. 21, 2026].

[12] S. Schreiber, "Affinity Mapping: How to Synthesize User Research Data in 5 Steps," *User Interviews*, Jan. 4, 2025. [Online]. Available: https://www.userinterviews.com/blog/affinity-mapping-ux-research-data-synthesis. [Accessed: Feb. 21, 2026].

[13] K. Laghari, "Week 08: Evaluation and Testing Methods," HCI Course Lecture Slides, University of Birmingham Dubai, 2025–2026.

---

# Appendix A — Interview Notes

The four research interviews from Assignment 1 carry forward into the Final Project unchanged. Per-interview tables (Date & Time, Medium, Objectives, Key Findings, Notable Quotes, Observations, Unresolved Issues) are reproduced verbatim in `Group16_Assignment1.pdf`, pages 6–9. The synthesised per-participant narratives below capture the load-bearing quotes and the design implication each one drove.

### P1 — Founder, trust-sensitive industry (personal finance)

P1's startup was in personal finance, an industry where trust matters disproportionately. He found online channels weak early on and emphasised in-person trust-building. His views on what makes outdoor advertising memorable were precise: minimal design, single-line text, intrigue.

> **"Once you see very basic [ads] which is really just a blank background and then one text, seen by everyone."**
>
> **"If it truly caught your attention or you thought that it was creative, you're going to read it again. You're going to probably remember the brand."**
>
> **"Most of them you drive past, you walk past the first time whilst categorising in your head as another ad, offer, sales, whatever."**

**Implication for Signal.** P1's "categorise and ignore" loop is the noise barrier we now address through Clarity Check (`/copy`), which scores ad copy against the *one thing the audience gains*.

### P2 — Startup founder, tech-leaning

P2 ran two startups and spoke with conviction about what doesn't work. His preferred hierarchy: Google/YouTube ads, sponsored YouTubers, social media. Physical channels were a "later-stage activity" once the product reached ~1M users. Three formats he considered outright outdated: TV/OTT ads (skipped), in-store sampling (low conversion), static LinkedIn banners (scrolled past).

> **"It doesn't matter if you use the application. It matters how many people visit my website, my portal, the terminal."**
>
> **"A lot of time the marketing lacks because they just recursively speak of themselves."**
>
> **"Give me one line of solution that why I should spend my next three hours with you."**

**Implication for Signal.** P2's signups-as-the-primary-metric framing is reflected in the dashboard's KPI tiles — Spend, Signups, Cost per Signup, Audience Match. P2's "one line of solution" demand is operationalised in Clarity Check.

### P3 — Management academic & comms professional

P3 had 15+ years in marketing communications and PR, plus an academic perspective. She corrected our framing repeatedly — marketing is broader than advertising, and "promotional mix" is the right vocabulary. PR could deliver media value at minimal cost when managed well. No one-size-fits-all approach.

> **"How can you cut through the noise? We're all exposed to so much advertising and communication and messages all the time."**
>
> **"Sometimes a simple message can be highly effective rather than something very sophisticated."**
>
> **"Advertising is only one tool in the toolbox."**

**Implication for Signal.** P3's "it depends" stance shaped our refusal to ship a one-click "best channel" oracle. The `/channels` page surfaces a *proposed* mix with rationale and lets John adjust — keeping the human in the loop.

### P4 — Senior creative / advertising professional

P4 had the deepest hands-on experience, including technical detail (CMYK, TIFF, PPI, bleed). He named the structural shift driving the industry: his CMO cuts outdoor budgets because digital provides measurable data. He told the Carrefour story — replacing physical leaflets with digital QR codes failed because users distrust unsolicited QR scans, and the client reverted to print. He flagged Apple's "That's privacy" billboard as the high-water mark of creative simplicity.

> **"Our CMO asked us to reduce the number of outdoor activities because it's too costly and we don't have clear data."**
>
> **"You only have around 3 to 5 seconds to deliver your message."**
>
> **"When you see something physical you just grab it, when you see a QR code you get suspicious."**
>
> **"Simplicity is creativity. Less is more."**

**Implication for Signal.** P4's evidence is the single strongest justification for the `/dashboard` cross-channel read. The reason outdoor budgets get cut is not that outdoor doesn't work — it is that *no equivalent of clickthrough rates exists*. Signal's dashboard is, in effect, a digital-equivalent metric layer over physical channels.

# Appendix B — Affinity Map, Journey Map, Long-form Problem Statements, Deferred HMWs

### B.1 Affinity Map (FigJam)

The affinity map produced during the Assignment 1 session is hosted at the FigJam link cited in Assignment 1's appendix. A screenshot of the board is reproduced as **Figure B-1**.

### B.2 Affinity Themes — Full Evidence

**Theme 1 — The "Noise" Barrier.** P3 described being "bombarded" with noise. P2 stated users "scroll past" LinkedIn banners, "skip" TV ads, and ignore in-store sampling. P4 quantified it: drivers get "3 to 5 seconds" per billboard, and in Egypt described a "jungle of billboards" where nothing registers. P1 confirmed it from the viewer's side: "most of them you drive past, categorising as another ad."

**Theme 2 — Resource Constraints.** P2 would not consider physical advertising until reaching ~1M users, since digital cost is "near negligible." P3 highlighted constraints include "capability and staff," not just budget — citing ~£100k for a Financial Times full-page ad. P3 advised exhausting "affordable options first." P4 reported his CMO cut outdoor budgets because outdoor is "too costly" with no data, while digital is "way cheaper and provides insight data."

**Theme 3 — The Measurement Gap.** P2 relies solely on "signups and logins" as success metrics. P3 noted her organisation "hired an independent company" to measure PR value, a cost most startups cannot afford, and that "if things are not working you pull them immediately." P4 provided the most direct evidence: his CMO shifted budget to digital specifically because outdoor provides no "clickthrough rates or insight data."

**Theme 4 — Simplicity vs. Stakeholder Pressure.** P1 recalled the most memorable ads as "a blank background and then one text." P2 criticised brands that "recursively speak of themselves" and demanded "one line of solution." P3 cited the Guinness campaign with a black background, single finger, logo as proof that "a simple message can be highly effective." P4 referenced Apple's "That's Privacy" billboard: "simplicity is creativity, less is more." P4 also described clients who force-fit logos, QR codes and excessive details onto billboards — including one who demanded a QR code on a highway billboard, impractical for drivers at speed.

### B.3 Journey Map — Full Table

Synthesised from patterns across all four interviews. The map describes the common experience our participants reported when promoting an early-stage business, organised across five sequential stages.

| Stage | Understanding the Audience | Choosing Channels | Crafting the Message | Executing the Campaign | Measuring & Adapting |
|---|---|---|---|---|---|
| **Actions** | Researches who customers are, what media they consume, where they are receptive. Explores competitors and industry norms. | Evaluates promotional mix options based on budget and audience fit. Weighs digital vs physical vs PR vs events. Considers a tiered approach starting with affordable channels. | Develops messaging focused on what the audience gains rather than self-promotion. Aims for simplicity and clarity over production sophistication. | Launches across chosen channels. Attends conferences with booths and pitches. Posts on digital platforms. Coordinates with freelancers or publications for PR. | Monitors engagement analytics. Tracks signups and logins as primary metrics. Pulls underperforming channels immediately. |
| **Thoughts** | "Where is my audience and what are they actually exposed to?" | "What can I afford that will actually reach them?" | "How do I stand out when everyone is competing for attention?" | "Is the timing right for this audience?" | "Is this actually converting or am I wasting money?" |
| **Emotions** | Uncertain, overwhelmed by the number of channels. | Anxious about budget allocation. | Frustrated knowing most formats get ignored. | Hopeful but stressed; limited control once a campaign is live. | Relieved if metrics are positive; discouraged if spend was wasted. |
| **Pain Points** | No standard answer for which channels work. | Resource constraints limit options. | Hard to cut through noise with limited budget. | Conferences time-intensive; PR requires journalist relationships; outdoor requires municipality approval. | Difficult to attribute results across channels. No unified view. |
| **Touchpoints** | Customer research, industry reports, social media analysis. | Team discussions, vendor outreach, free credits. | Messaging drafts, slogans, press releases, creatives. | Conference booths, Google/YouTube ads, social posts, PR articles. | Platform analytics, engagement metrics, signup tracking. |
| **Opportunities** | Help users identify where their audience is most receptive. | Simplify channel selection by budget + audience match. | Enable users to preview how messaging will land before spend. | Reduce dependency on third parties for non-digital formats. | **Unified way to measure effectiveness across channels.** |

### B.4 Problem Statements — Long-form

**PS1 — Channel Selection Overwhelm.** As John, a marketing lead at an early-stage startup, I want to identify which communication channels my target audience is most receptive to, but the sheer number of available channels and constantly shifting platform landscape makes comparison overwhelming because no standard framework exists for matching channels to specific audience segments, resulting in decision paralysis and defaulting to familiar digital channels even when they may be ineffective for the target audience. *Evidence: P3, P3, P2, P4.*

**PS2 — Resource Constraints Limiting Promotional Mix.** As John, I want to execute a balanced multi-channel promotional strategy, but the high cost and specialist expertise required for traditional advertising channels makes diversification inaccessible because small teams lack both the financial resources and the operational capability to manage multiple channel types simultaneously, resulting in over-reliance on a narrow set of affordable digital channels that may not reach the intended audience. *Evidence: P3, P3, P2, P4.*

**PS3 — Cutting Through Noise.** As John, I want my messaging to capture audience attention and be remembered, but the oversaturated advertising landscape across every channel makes standing out extremely difficult because audiences are exposed to constant competing messages and have developed habits of skipping or ignoring most advertising formats, resulting in a tendency to avoid experimental formats and default to safe but oversaturated channels. *Evidence: P3, P2, P4, P4.*

**PS4 — Measuring Effectiveness Across Channels.** As John, I want to accurately measure which channels are driving results, but the lack of unified performance data across physical and digital channels makes attribution unclear because outdoor and PR channels provide no equivalent of digital clickthrough rates or engagement metrics, resulting in continued investment in underperforming channels due to inability to justify cutting them. *Evidence: P3, P3, P2, P4.*

**PS5 — Messaging That Resonates.** As John, I want to communicate clear value that resonates with my audience, but clients and stakeholders demanding comprehensive product information on limited-format media makes messaging cluttered because the pressure to promote leads to force-fitting logos, calls to action and excessive details rather than articulating what the audience gains, resulting in a pattern of compromising on simplicity to appease stakeholders. *Evidence: P2, P2, P3, P4, P4.*

### B.5 Deferred HMW Questions

The six HMW questions below were generated alongside the seven listed in Section 1.7 but are not directly addressed by the prototype this iteration. They are tracked for future work.

- HMW3 *(PS1, behaviour change)*: How might we help John move from channel guesswork to evidence-based channel selection?
- HMW7 *(PS3, behaviour change)*: How might we help John identify which formats his specific audience is least likely to ignore?
- HMW8 *(PS3, emotion)*: How might we reduce the discouragement John feels when campaigns fail to register despite significant effort?
- HMW11 *(PS5, cognitive load)*: How might we simplify the process of distilling a campaign message down to a single clear value proposition? *(partially addressed by `/copy`)*
- HMW12 *(PS5, behaviour change)*: How might we help John resist stakeholder pressure to overload campaign messaging with excessive information?
- HMW13 *(PS5, emotion)*: How might we help John feel confident in choosing message simplicity over comprehensiveness?

# Appendix C — Crazy 8s Sketches

Photographs of each member's A4 Crazy 8s sheets are held in the team archive (`submission/materials/crazy8s/`). The narrative descriptions below — written from each member's panel sheet — are the textual reading aid for the marker.

### Aquib Palampalliyali — Concept: "Channel Health Stripes"

A horizontal stripe pattern on every channel row: green / amber / red, with thickness proportional to weekly spend. Status reads at a glance without numbers. *Best panel from Aquib's 8 was sketch #5; the eight quick concepts also included a chord-diagram channel attributor (#1), an audience-match radial gauge (#3), and a weekly digest email (#7).*

### Aman Riyas — Concept: "Single-Move Recommendation Card"

A full-width card on the dashboard that says "Move £1,800 from LinkedIn Ads to Podcast" with three pieces of evidence and an Approve/Decline button — no settings page, no spreadsheet. *Best panel was sketch #4. Other concepts included a side-by-side ad-copy A/B (#2), a Slack-bot weekly nudge (#6), and a campaign-day timeline (#8).*

### Heng Cheng — Concept: "Brief-as-Conversation"

A four-step progressive form that asks four questions one at a time, like a conversation. Each step uses big tap targets, no scroll. The brief produces the channel mix at the end. *Best panel was sketch #2. Other concepts included a heat-map calendar of campaign moments (#3), a sound-wave-style attention indicator on the trend chart (#5), and a sticky-note Kanban (#7).*

### Alagappan Alagappan — Concept: "Clarity Check Verdict"

A two-pane layout — original ad copy on the left, score plus tightened rewrite on the right. Score is large, single-axis (0–100), with a verdict word above ("Clear," "Mid-pack," "Needs work"). *Best panel was sketch #6. Other concepts included a budget-burn-rate fuel gauge (#1), a competitor benchmark grid (#4), an inbox-style alerts feed (#8).*

### Amir Hossein Kazemkhani — Concept: "One-Read Dashboard with Status Bar"

A single dashboard view with four KPI tiles up top, a cross-channel comparison table below, and a left-edge coloured status bar on each row. The whole thing reads in 10 seconds. *Best panel was sketch #1 (drawn first, most refined). Other concepts included a flow-diagram of the user journey (#3), a budget-reallocation slider with before/after (#4), an audience-match radar (#6), and a Stripe-style settings page rejected as "too generic" (#8).*

# Appendix D — Usability Test Script & SUS Form

The full participant brief, task script, and the SUS questionnaire form are reproduced in the project repository as `submission/materials/usability_test_kit.md`.

# Appendix E — Raw SUS Scores

The SUS questionnaire was administered as the final activity of each usability session: 10 items, alternating positive/negative phrasing, 5-point Likert scale per Brooke (1996) [7]. Conversion to the 0–100 score follows the standard formula `((sum of (positive items − 1)) + (sum of (5 − negative items))) × 2.5`.

**Per-participant raw scores.**

| Participant | I1 | I2 | I3 | I4 | I5 | I6 | I7 | I8 | I9 | I10 | SUS Score |
|---|---|---|---|---|---|---|---|---|---|---|---|
| T1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | **100** |
| T2 | 4 | 2 | 4 | 2 | 4 | 2 | 4 | 2 | 4 | 2 | **75** |
| T3 | 5 | 2 | 4 | 1 | 5 | 1 | 4 | 2 | 5 | 1 | **90** |
| T4 | 4 | 3 | 3 | 2 | 4 | 2 | 4 | 3 | 4 | 2 | **67.5** |
| T5 | 5 | 1 | 4 | 2 | 4 | 1 | 5 | 1 | 4 | 1 | **90** |

**Group average: 84.5 / 100.**

A SUS score above 68 is "above average" by industry benchmark [7]; above 80 is in the top quartile. Signal's 84.5 places it in that top quartile. We attribute the result to (a) the persona-narrow copy decisions, (b) the absence of interruptive paywalls or upsells common in commercial competitors, and (c) the deliberate use of native form controls (range slider, textarea) rather than custom widgets that would have introduced learnability friction.

**Methodological caveat — pre vs. post-fix split.** T1, T2 and T3 evaluated the prototype *before* we shipped the Stage 5 fixes; T4 and T5 saw the post-fix prototype. We retained all five scores in the group average rather than discarding the pre-fix sessions, because doing so would inflate the headline number. T1's session was most affected — she scored 100 despite hitting the date-range-tab false-affordance, because she did not realise she had hit a bug. In her words after the session: *"I assumed it was just slow to load."* The score therefore reflects the prototype's overall feel as much as its current technical state. If we re-tested T1, T2 and T3 on the post-fix build we would expect the average to rise; we have not done so and have not claimed otherwise.

**Lowest-score interpretation (T4, 67.5).** T4 had no marketing background and consistently rated Item 7 ("imagine that most people would learn to use this very quickly") generously while marking Item 4 ("would need help to use it") harshly. The interpretation is that domain unfamiliarity, not interface friction, drove the score down — useful signal that Signal works best for marketers and would benefit from explanatory affordances (tooltip on cost-per-signup, currency benchmark on the dashboard) for adjacent personas.

# Appendix F — Heuristic Evaluation: Full Issue Tables + Individual Templates

The Stage 4.4 body shows HE-1 to HE-5 as a summary row table. Full per-issue tables (heuristic, severity, evaluators, description, recommendation, status) for all ten issues are reproduced below.

### Issue HE-1: Date-range tabs change pill but produce no downstream effect [Dashboard]

| Field | Value |
|---|---|
| Heuristic | H1 — Visibility of System Status |
| Severity | 4 — Critical (pre-fix); 0 — Not a problem (post-fix) |
| Evaluators | All five members independently |
| Description | Pre-fix: clicking the `7d / Last 30 days / Campaign` SegmentedTabs visually toggled the active pill, but the value was not consumed by any downstream component. KPI tiles, the cross-channel table, the alerts panel, the trend chart and all sparklines were hardwired to a single static dataset. The most prominent data-driven control on the dashboard was a false affordance. |
| Recommendation | Pass `range` as a prop to every downstream surface; add range-aware aggregations to `lib/mock-data.ts` (`rangeMetrics`, `rangeChannelMetrics`, `combinedTrendRange`); recompute and rerender on tab change. |
| Status | **Fixed.** See Stage 5.1, Issue 1. |

### Issue HE-2: Inadequate platform-link affordance on channel deep-dive [Channel deep-dive]

| Field | Value |
|---|---|
| Heuristic | H2 — Match between System and Real World |
| Severity | 3 — Major (pre-fix); 1 — Cosmetic (post-fix) |
| Evaluators | Three members |
| Description | The "View in platform" button on `/channels/[id]` carried an `<ExternalLink>` icon strongly implying it would open the LinkedIn Campaign Manager (or equivalent platform) in a new tab. Pre-fix it had no `onClick` and no `href`. Clicking did nothing — the icon was a lie. |
| Recommendation | Wire the button to a toast that explicitly tells the user this is a prototype demo and the link is not live, OR remove the button. We chose the toast pattern (`components/channels/platform-link-button.tsx`) because the affordance itself is correct for production; only the link target is missing. |
| Status | **Fixed.** See Stage 5.1, Issue 2. |

### Issue HE-3: Recommendation cannot be dismissed [Channel deep-dive]

| Field | Value |
|---|---|
| Heuristic | H3 — User Control and Freedom |
| Severity | 3 — Major (pre-fix); 0 — Not a problem (post-fix) |
| Evaluators | Two members + observed in usability testing (T3) |
| Description | The "Dismiss" button on the recommendation panel had no handler; users who wanted to acknowledge and clear the recommendation had no path. |
| Recommendation | Wire dismiss to a local-state toggle that collapses the recommendation panel into a minimal "Recommendation dismissed" row with an Undo affordance. We retained the panel in DOM rather than removing it so the user can recover their action. |
| Status | **Fixed.** See Stage 5.1, Issue 3. |

### Issue HE-4: Decline reason captured but never surfaced [Budget]

| Field | Value |
|---|---|
| Heuristic | H1 — Visibility of System Status |
| Severity | 2 — Minor (pre-fix); 0 — Not a problem (post-fix) |
| Evaluators | Two members + observed in usability testing (T1, T2) |
| Description | The decline modal asked "Why are you declining?" with a textarea. The text was captured in component state but never displayed back, sent to an API, or used in any downstream message. The user's reason was silently discarded. |
| Recommendation | Echo the reason in the confirmation toast. If empty, show the generic "Decline noted" message. |
| Status | **Fixed.** See Stage 5.1, Issue 5. |

### Issue HE-5: Mislabelled breadcrumb [Channel deep-dive]

| Field | Value |
|---|---|
| Heuristic | H4 — Consistency and Standards |
| Severity | 2 — Minor (pre-fix); 0 — Not a problem (post-fix) |
| Evaluators | One member |
| Description | The "Channels" segment of the breadcrumb pointed to `/dashboard`, not `/channels`. A user clicking "Channels" expected to return to the channel mix; landed on the dashboard instead. |
| Recommendation | Point the breadcrumb at the correct route. |
| Status | **Fixed.** Trivial one-line change. |

### Issue HE-6: "Adjust" toggle flips label without revealing anything [Budget]

| Field | Value |
|---|---|
| Heuristic | H6 — Recognition rather than Recall |
| Severity | 3 — Major (pre-fix); 0 — Not a problem (post-fix) |
| Evaluators | Two members + observed in usability testing (T3) |
| Description | The "Adjust" / "Done adjusting" toggle's `adjustOpen` state was set on click, but never consumed by any other component. The slider was always visible regardless of the toggle's state. The label change implied a mode switch that didn't exist. |
| Recommendation | Either gate the slider visibility on `adjustOpen` (chosen) or remove the toggle. |
| Status | **Fixed.** See Stage 5.1, Issue 4. |

### Issue HE-7: No keyboard shortcut for "Score it" [Copy]

| Field | Value |
|---|---|
| Heuristic | H7 — Flexibility and Efficiency of Use |
| Severity | 1 — Cosmetic |
| Evaluators | One member + observed in usability testing (T1) |
| Description | After typing into the textarea, the user must reach for the mouse to press "Score it." A frequent user (T1) noted Cmd+Enter is the convention in chat-style interfaces. |
| Recommendation | Bind `Cmd+Enter` (Mac) and `Ctrl+Enter` (Windows) to the Score it action when the textarea is focused. Add a hint chip on the button. |
| Status | **Deferred.** Logged in `INTERACTIVITY_AUDIT.md` for the next iteration. |

### Issue HE-8: Sidebar "Style guide" entry visible to end-users [Shell]

| Field | Value |
|---|---|
| Heuristic | H8 — Aesthetic and Minimalist Design |
| Severity | 1 — Cosmetic |
| Evaluators | Two members |
| Description | The `/style-guide` route is a development artefact rendered as a normal sidebar nav item. End users have no reason to see this in production. |
| Recommendation | Behind a `?dev` query string in production, or remove from the production sidebar entirely. For the HCI submission, we elected to keep it visible — it is part of the deliverable for the marker. |
| Status | **Acceptable for submission. Production change deferred.** |

### Issue HE-9: Clarity Check rewrite has no copy-to-clipboard [Copy]

| Field | Value |
|---|---|
| Heuristic | H7 — Flexibility and Efficiency of Use |
| Severity | 2 — Minor |
| Evaluators | One member + observed in usability testing (T5) |
| Description | After Clarity Check returns a tightened rewrite, the user must select-and-copy by hand. T5 explicitly named this — "I want to be able to save the rewrite for later." |
| Recommendation | Add a small "Copy" icon button next to the rewrite block; show a 2-second "Copied" confirmation. |
| Status | **Deferred.** |

### Issue HE-10: No empty state on `/budget` if no recommendation exists [Budget]

| Field | Value |
|---|---|
| Heuristic | H1 — Visibility of System Status |
| Severity | 1 — Cosmetic |
| Evaluators | One member |
| Description | If a user navigates directly to `/budget` without a `?source` and `?dest` query string, the page renders an empty-state heading "No moves to review" with a "Back to dashboard" link. This is correct, but the empty state is sparse — a screenshot of what *would* be shown would be more useful. |
| Recommendation | Add a faded screenshot / illustration of a move card behind the empty-state heading, with a tooltip "Recommendations appear when our model spots a likely-positive move." |
| Status | **Deferred.** |

### Individual Evaluation Templates

Each member's individual heuristic evaluation template (Phase 1, before consolidation) is reproduced in the materials folder as `submission/materials/individual_heuristic_evaluations.md`.

# Appendix G — Live Prototype + Repository

| Artefact | URL |
|---|---|
| Live prototype | https://signal-drab-xi.vercel.app |
| Style guide route | https://signal-drab-xi.vercel.app/style-guide |
| User flow diagram | https://signal-drab-xi.vercel.app/flow |
| GitHub repository | https://github.com/Kazemkhani/HCI-Final-Project |
| Stage 5 commit | `d2f03c9` — fix(signal): wire every dead control — interactivity audit + fixes |
