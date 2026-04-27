# Stage 1 — Research & Problem Definition

> Section 1 ports Assignment 1 evidence forward verbatim where the underlying claim has not changed; new content (design goals, evolution-from-A1) is marked.

## 1.1 Research Method & Participants

We used semi-structured interviews — a fixed three-band funnel of broad-to-specific questions with flexibility to probe unexpected leads, well suited to discovery research [1]. Four professionals across role, seniority and proximity to the problem space were interviewed 17–20 February 2026. All gave informed consent; data was anonymised P1–P4. Two interviews ran online due to scheduling constraints, approved by the course instructor. Full Q1–Q10 instrument and transcripts in **Appendix A**.

| Code | Role | Experience | Date | Duration |
|---|---|---|---|---|
| P1 | Founder, personal finance | 4 yrs | 17 Feb | 11 min |
| P2 | Startup founder, tech-leaning | 2 startups | 18 Feb | 13 min |
| P3 | Management academic + comms | 15+ yrs | 18 Feb | 30 min |
| P4 | Senior creative / advertising | 15+ yrs | 20 Feb | 40 min |

## 1.2 Interview Findings

The synthesis below names the load-bearing evidence each participant contributed. Per-interview tables and verbatim quote sets in **Appendix A**.

| # | Load-bearing evidence | Reflected in Signal as |
|---|---|---|
| P1 | "Categorise-and-ignore" loop on outdoor — most ads mentally filed before being read | Clarity Check (`/copy`) — scores ad copy on the *one thing the audience gains* |
| P2 | Signups-as-primary-metric: "It doesn't matter if you use the application. It matters how many people visit" | Dashboard KPI tiles — Spend, Signups, Cost per Signup, Audience Match |
| P3 | "It depends" stance — refused single-best-channel framing; insisted on context-dependent mix with human in the loop | `/channels` surfaces a *proposed* mix with rationale; John adjusts |
| P4 | CMO cuts outdoor not because it doesn't work but because *no equivalent of clickthrough rates exists* | Cross-channel `/dashboard` — digital-equivalent metric layer over physical channels |

## 1.3 Affinity Themes

Silent-affinity protocol: each member wrote one sticky per observation; we clustered without speaking, then labelled. Full FigJam board in **Appendix B**. Four themes promoted from six clusters:

1. **The "Noise" Barrier and Attention Scarcity.** Audiences ignore most advertising; the attention window is shrinking on every channel. *(P1, P2, P3, P4)*
2. **Resource Constraints Dictate Channel Strategy.** Financial and staffing limits force early-stage businesses toward digital regardless of audience fit. *(P2, P3, P4)*
3. **The Measurement Gap and Decision Agility.** Tension between needing to validate ROI and being unable to measure non-digital channels drives reactive decisions and a structural shift to digital. *(P2, P3, P4)*
4. **Messaging Simplicity vs. Stakeholder Pressure.** All four converged on simplicity as the property of effective messaging; stakeholder pressure consistently undermines it. *(P1, P2, P3, P4)*

## 1.4 Persona — John Doe

Synthesised from patterns across all four interviews. Every detail traces to interview evidence.

| Field | Description |
|---|---|
| Name | John Doe — 28-year-old marketing lead, Dubai Marina |
| Background | BBA, 4 yrs experience, mid-sized Dubai startup, team of two, juggles multiple campaigns with limited budget |
| Goals | Build brand awareness efficiently; find the right channels for the right audience at the right time; prove ROI to founders/investors |
| Pain points | Overwhelmed by noise; budget excludes expensive channels; struggles to attribute results across non-digital formats |
| Behaviours | Defaults to digital because measurable; sceptical of flashy ads; pulls underperforming campaigns fast |
| Tools | Google Analytics, social-media management software, Canva, MacBook + iPhone |
| Key quote | *"Time is actually money. If the timing and audience aren't right, nothing else matters."* |

## 1.5 Journey Map

Synthesised from patterns across all four interviews. Five sequential stages; the full action / thought / emotion / pain / touchpoint table is in **Appendix B**.

The map identifies five intervention points. Signal addresses three on the prototype's primary surfaces:

- **Choosing Channels →** `/brief` and `/channels`
- **Crafting the Message →** `/copy` (Clarity Check)
- **Measuring & Adapting →** `/dashboard` and `/budget`

The remaining two (Understanding the Audience, Executing the Campaign) are out of scope for this iteration, explained in Stage 6's reflection.

## 1.6 Problem Statements

Five problem statements in the form `As [persona], I want [job] but [obstacle] because [root cause], resulting in [consequence]`. Each cites at least two pieces of interview evidence; full long-form statements in **Appendix B**.

| # | Headline | Evidence |
|---|---|---|
| **PS1** | Channel selection overwhelm — too many channels, no standard framework, decision paralysis | P3, P2, P4 |
| **PS2** | Resource constraints — high cost and specialist expertise gate diversification | P3, P2, P4 |
| **PS3** | Cutting through noise — oversaturated landscape, audiences habitually skip ads | P3, P2, P4 |
| **PS4** | Measurement gap — no unified data across physical and digital, attribution unclear | P3, P2, P4 |
| **PS5** | Messaging simplicity — stakeholders pressure messaging into clutter | P2, P3, P4 |

## 1.7 How Might We

Thirteen HMW questions across cognitive, behavioural, emotional, speed/time and trust dimensions. The seven below are the ones Signal's prototype directly answers; the remaining six (deferred) are listed in **Appendix B**.

- **Reduce the cognitive effort of comparing channels for a specific audience** *(PS1)* → `/channels` proposed mix + audience-match score
- **Increase confidence that a channel will reach the intended audience before committing spend** *(PS1)* → `/channels` per-channel rationale + 14-day trend
- **Enable effective multi-channel promotion within startup budget and team constraints** *(PS2)* → `/brief` sub-3-minute flow
- **Help John diversify beyond familiar digital channels without specialist expertise** *(PS2)* → hybrid and physical channels in the proposed mix
- **Capture attention within the 3–5 seconds audiences give** *(PS3)* → `/copy` Clarity Check
- **Make campaign performance across physical and digital channels comparable without external measurement firms** *(PS4)* → core thesis of `/dashboard`
- **Help John make confident budget reallocation decisions when attribution data is incomplete** *(PS4)* → `/budget`'s evidence-led recommendation flow

## 1.8 Insights and Design Goals

Three load-bearing insights, each tied to a measurable design goal Signal is assessed against.

**Insight 1 — The Measurement Gap is the Root Cause.** Physical channels are not abandoned because they don't work but because they don't *report* in the same vocabulary as digital. We design for *cross-channel comparability* before any single channel.
→ **Design Goal 1.** Compare cost-per-signup, signups and audience match across digital, physical and hybrid channels on a single screen, no scrolling, under 10 seconds. *(Evaluated in Stage 4: Task 2.)*

**Insight 2 — Decision Agility is Asymmetric.** All four participants pulled underperforming channels immediately, but none described a clean process for *moving* spend. We design the *budget reallocation* surface as a first-class flow.
→ **Design Goal 2.** Review and approve a recommended budget move, with evidence and risk caveats, without leaving a single page, under 90 seconds. *(Evaluated in Stage 4: Task 3.)*

**Insight 3 — Simplicity is Universally Demanded but Procedurally Defeated.** All four named simplicity as the property of effective messaging; one named stakeholder pressure as the structural reason it loses. We design a tool that *takes the side of simplicity*.
→ **Design Goal 3.** Receive a structured verdict (0–100 score + one-sentence diagnosis + tighter rewrite) on ad copy under 6 seconds. *(Evaluated in Stage 4: Task 4.)*

**Design Challenge.** *How might we help time-pressed marketing leads at early-stage startups make confident, evidence-led decisions across physical and digital channels — without specialist tooling or external measurement firms?*
