# HCI Final Design Project

**Course:** Human–Computer Interaction (HCI)
**Instructor:** Dr. Khalil ur Rehman Laghari
**University:** University of Birmingham Dubai · 2025–2026
**Group Number:** 16
**Group Name:** Visionary
**Submission Date:** 27 April 2026
**Project:** Signal — One dashboard, every channel, one clear read

## Team Members

| Name | Student ID |
|---|---|
| Aquib Palampalliyali | 2712170 |
| Aman Riyas | 2717450 |
| Heng Cheng | 2580411 |
| Alagappan Alagappan | 2608091 |
| Amir Hossein Kazemkhani | 2418010 |

---

## Authorship & AI Use Statement

In line with the course's AI Use Policy (Final Project Assignment, p.11), the team used generative AI tools to assist with drafting written sections of this report. The user research, persona, journey map, problem statements, How-Might-We questions (Stage 1), the prototype itself (Stage 3), the heuristic evaluation (Stage 4 Part B), the iteration fixes (Stage 5), and every individual reflection (Stage 6) are the team's own work — reviewed, edited, and owned by the members named on the cover page. Where AI assisted with phrasing or structuring, every line was read, revised, and signed off by a named team member before inclusion.

The Stage 1 evidence base was conducted by the team in February 2026 under informed consent, originally documented in Assignment 1, and is reproduced and extended here per the rubric's explicit allowance for continuing from Assignment 1. The Stage 4 usability sessions were conducted by the team between 21–23 April 2026 with five participants outside the group; participant codes T1–T5 are anonymised per our consent process. The repository at https://github.com/Kazemkhani/HCI-Final-Project carries the full commit trail, including `INTERACTIVITY_AUDIT.md` and `INTERACTIVITY.md` — the working documents that drove Stage 5 — for any claim that the marker wishes to verify.

---

## Team Manifesto

Roles rotated across the project to ensure every member touched research, design, evaluation, and reflection. The table below records primary responsibilities and individual contributions to the Signal final deliverable; this builds on, but is distinct from, the role assignments in Assignments 1 and 2.

| Member | Primary Role on Final Project | Contributions |
|---|---|---|
| Aquib Palampalliyali | Research Lead — Stage 1 + Stage 4 Part A | Re-cut interview evidence into the Stage 1 traceability matrix, recruited and ran usability testing sessions, scored SUS responses, drafted Sections 4.1 and 4.2 of this report. |
| Aman Riyas | Ideation Lead — Stage 2 + Stage 5 | Ran the Crazy 8s workshop, facilitated dot-voting, drafted the competitive analysis section, owns the Stage 5 before/after iteration write-up using evidence from Stage 4. |
| Heng Cheng | Visual Design Lead — Stage 3 | Annotated the prototype screen captures, rendered the user-flow diagram, owns the consolidation of the live `/style-guide` route into the report's Style Guide section. |
| Alagappan Alagappan | Evaluation Lead — Stage 4 Part B + QA | Led the heuristic evaluation of Signal mapped to Nielsen's 10 heuristics, compiled the consolidated issues table, ran rubric coverage QA on the final PDF. |
| Amir Hossein Kazemkhani | Prototype & Submission Lead | Built the coded front-end prototype (Next.js, deployed to Vercel), led the interactivity audit and bug-fix cycle that drove Stage 5 evidence, owns final formatting and Canvas upload. |

> **Decision-making:** Disagreements were resolved by structured discussion first; if no consensus emerged within 10 minutes, we used dot voting (3 votes per member) on impact × feasibility. This pattern is identical to the consolidation method we used in Assignment 2 and worked well there.

---

## Table of Contents

| Section | Page |
|---|---|
| Team Manifesto | 1 |
| Introduction | 3 |
| 1.1 Project Scope | 3 |
| 1.2 Continuity from Assignment 1 | 3 |
| **Stage 1 — Research & Problem Definition** | 4 |
| 1.1 Research Method | 4 |
| 1.2 Participants | 4 |
| 1.3 Interview Findings | 5 |
| 1.4 Affinity Diagram & Themes | 7 |
| 1.5 Persona — John Doe | 8 |
| 1.6 Journey Map | 9 |
| 1.7 Problem Statements | 10 |
| 1.8 How Might We | 11 |
| 1.9 Insights and Design Goals | 12 |
| **Stage 2 — Competitive Analysis & Ideation** | 13 |
| 2.1 Competitive Landscape | 13 |
| 2.2 Crazy 8s — Individual Sketches | 16 |
| 2.3 Concept Selection | 18 |
| **Stage 3 — Prototype Design** | 19 |
| 3.1 Design Principles | 19 |
| 3.2 Annotated Key Screens | 20 |
| 3.3 User Flow | 23 |
| 3.4 Style Guide | 24 |
| **Stage 4 — Evaluation** | 25 |
| 4.1 Usability Testing Method | 25 |
| 4.2 Usability Testing Findings | 26 |
| 4.3 SUS Score | 27 |
| 4.4 Heuristic Evaluation | 28 |
| **Stage 5 — Iteration** | 31 |
| 5.1 Top 5 Issues — Before / After | 31 |
| **Stage 6 — Reflection** | 34 |
| 6.1 Individual Reflections | 34 |
| 6.2 Group Synthesis | 36 |
| References | 37 |
| Appendix A — Interview Notes | 38 |
| Appendix B — Affinity Map (FigJam) | 39 |
| Appendix C — Crazy 8s Sketches | 40 |
| Appendix D — Usability Test Script & SUS Form | 41 |
| Appendix E — Raw SUS Scores | 42 |

---

## Introduction

### 1.1 Project Scope

Signal is a campaign planning and measurement web app for marketing professionals at early-stage businesses. It addresses the persistent problem we identified in Assignment 1: marketers like our persona John Doe juggle multiple advertising channels — digital, physical, and hybrid — but lack a single, trustworthy view that tells them whether their spend is working. Our Final Design Project takes the validated problem space from Assignment 1 forward into a complete design solution: ideated against competitive alternatives, prototyped as a working coded front-end, evaluated through both heuristic review and usability testing with real participants, and iterated on the basis of evaluation findings.

The prototype lives at **https://signal-drab-xi.vercel.app**. The repository is open at **https://github.com/Kazemkhani/HCI-Final-Project**. This report is the rigorous account of how every design decision was made and what evidence drove each one.

### 1.2 Continuity from Assignment 1

Per the Final Project rubric, we continued the direction set in Assignment 1 rather than starting fresh. Assignment 1 produced a validated persona (John Doe, marketing lead at a Dubai startup) and five problem statements, four of which Signal directly addresses. The mapping from A1 problem statement to Signal feature is shown below; this table is the load-bearing traceability claim for our entire project.

| A1 Problem Statement | Signal feature addressing it |
|---|---|
| **PS1 — Channel Selection Overwhelm:** "no standard framework for matching channels to audiences" | `/channels` page with proposed mix, audience-match score, and live rebalance |
| **PS2 — Resource Constraints Limiting Promotional Mix:** small teams default to a narrow set of digital channels | `/brief` 4-step wizard that produces a £-budget mix across digital, physical, and hybrid in under three minutes |
| **PS3 — Cutting Through Noise:** "audiences are exposed to constant competing messages" | `/copy` Clarity Check using the Anthropic API to score ad copy against a stated goal |
| **PS4 — Measuring Effectiveness Across Channels:** physical channels provide no equivalent of digital metrics | `/dashboard` cross-channel read with a single status colour per channel and a cross-channel trend chart — **the hero feature of Signal** |
| **PS5 — Messaging That Resonates:** "force-fitting logos, calls to action, and excessive details" | `/copy` route's verdict-and-suggestion pattern that explicitly rewards simpler messaging |

We did not pursue PS5's narrower stakeholder-pressure angle as a separate surface in this iteration; the Clarity Check addresses the symptom (cluttered messaging) rather than the underlying social dynamic. This is the only material direction change from A1; we explain it in Stage 5.
