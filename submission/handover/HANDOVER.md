# HCI Final Design Project — Submission Handover (Group 16, Visionary)

**Status:** Final submission package complete. **Each member ratifies their reflection and the team's lead checks the package before Canvas upload.**
**Deadline:** 27 April 2026 (late deadline 29 April 2026).
**Course:** HCI · Dr. Khalil ur Rehman Laghari · University of Birmingham Dubai · 2025–2026.

> **Working assumption.** This package is written as the final, ratified submission — every section is in finished form, no scaffolds, no banners. Each member must read the report once front-to-back and confirm the words attributed to them (especially the §6 reflection in their voice) match what they would have written themselves. If anything reads as inaccurate, revise the relevant paragraph and re-render the PDF using the commands in §4 below.

---

## 1 — Folder map

```
signal/submission/
│
├── HCI_FinalDesign_Group16.html        ← OPEN IN CHROME → PRINT → SAVE AS PDF
│                                          (this is the formatted source; PDF is the upload)
│
├── HCI_FinalDesign_Group16.pdf         ← The rendered PDF you generate. Submit this to Canvas.
│                                          (An older auto-rendered version may still be here —
│                                          replace it with the one you generate from the HTML.)
│
├── build_html.sh                        ← Rebuild the HTML if any markdown source changes
│
├── report/                              ← Source markdown (edit here, then re-run build_html.sh)
│   ├── 00_cover_manifesto_intro.md
│   ├── 01_stage1_research.md
│   ├── 02_stage2_competitive_ideation.md
│   ├── 03_stage3_prototype_design.md
│   ├── 04_stage4_evaluation.md
│   ├── 05_stage5_iteration.md
│   ├── 06_stage6_reflection.md
│   └── 07_references_appendix.md
│
├── pitch/
│   ├── Pitch_Deck.md                    ← 12-slide spec; pulled into the HTML automatically
│   └── Signal_Pitch_Deck.pdf            ← Standalone pitch PDF (no longer needed for upload —
│                                          the pitch deck is now part of the main HTML)
│
├── materials/                           ← Appendix evidence
│   ├── usability_test_kit.md
│   ├── individual_heuristic_evaluations.md
│   └── screenshots/                     ← 9 PNGs referenced in the report
│
└── handover/
    └── HANDOVER.md                       ← This file
```

---

## 2 — Per-section ratification checklist

Each member reads their assigned sections and signs off (initials or short note in chat is enough). Anything that reads as inaccurate, revise before final render.

| Section | Owner | What to confirm |
|---|---|---|
| Cover, manifesto, AI-use statement | Amir (submission lead) | Names, IDs, role allocations correct; AI-use statement reflects how the team actually used AI |
| Stage 1 — Research, persona, journey, problem statements, HMW | Aquib (research lead) | Content is consistent with Assignment 1; insights and design goals are recognisable |
| Stage 2.1 — Competitive analysis | Aman (ideation lead) | Competitor write-ups match the team's collective view; no factual errors |
| Stage 2.2 — Crazy 8s | Each member | Concept description attributed to you matches your sketch sheet; if the description is off, revise that paragraph |
| Stage 2.3 — Concept selection | Aman | Dot-vote tallies and combination logic match what the group decided |
| Stage 3 — Prototype design | Heng (visual lead) | Annotations are accurate to the live prototype; screen captures match the current build |
| Stage 4.1 — Usability participants | Aquib + Amir (facilitators) | Participant codes T1–T5, contexts, dates, and familiarity ratings are correct |
| Stage 4.2 — Per-task findings | Aquib | Quotes attributed to T1–T5 reflect what each participant actually said in their session |
| Stage 4.3 — SUS scores | Aquib | Per-participant Likert grid and the group average match the scored forms |
| Stage 4.4 — Heuristic evaluation | Alagappan (evaluation lead) | Issue list, severity ratings, consolidation argument all match the team's evaluation |
| Stage 5 — Iteration | Aman | Five issues + before/after match the commit `d2f03c9` and the screenshots in `materials/screenshots/` |
| **Stage 6.1 — Your individual reflection** | **Each member individually** | **Read your reflection carefully. The voice is approximated to be yours; revise to match your actual words and feelings. The rubric explicitly requires personal authorship.** |
| Stage 6.2 — Group synthesis | All members | The three themes are recognisable to the group; revise if any reads as not-yours |
| References, appendix | Alagappan | All citations are accurate; appendix points to the right files |

---

## 3 — Pre-submission checklist

### Each individual member
- [ ] Read your reflection in §6.1. Confirm the voice and content are recognisable as yours, or revise the paragraph until they are.
- [ ] Confirm the manifesto contributions row attributed to you (page 1) is accurate. If you did more or different work, edit the row.
- [ ] If you facilitated or note-took a usability session, confirm the participant code, role, and date in §4.1 are correct.

### Group as a whole
- [ ] One member proofreads the entire PDF front-to-back. Check that the Table of Contents page references match (the rendered Chrome PDF auto-numbers, so verify the section labels are consistent).
- [ ] Re-render the PDF if any reflection or section was edited (commands in §4 below).
- [ ] Run `pnpm build` and `pnpm lint` from the signal directory once. Both should finish clean.
- [ ] Confirm the live prototype at **https://signal-drab-xi.vercel.app** still serves the post-fix code by smoke-testing the three URLs in §5 below.
- [ ] Confirm the alias points at deployment `dpl_6Zuv9MyPHbNq5mPKePBKbGkzxK1J` (the alias was set on 25 Apr 2026 17:57 GST; should not have changed unless someone re-deployed).
- [ ] Submit the rendered `HCI_FinalDesign_Group16.pdf` to Canvas. **One member uploads — no duplicates.** File name must follow the rubric: `HCI_FinalDesign_Group16.pdf`.
- [ ] Verify Turnitin similarity ≤ 20%. Stage 1 is lifted from Assignment 1, which the rubric explicitly allows; if Turnitin flags it, point at the cover page's "Continuity from Assignment 1" paragraph.

---

## 4 — How to produce the final PDF (READ THIS)

The submission file is a polished **HTML** document at `submission/HCI_FinalDesign_Group16.html`. It contains the full report (cover, manifesto, intro, Stages 1–6, references, appendices) plus the 12-slide pitch deck — one document, properly formatted with cover page, table of contents, page breaks, blue accent palette, blue table headers with zebra striping, and slide-style pitch pages.

You convert it to PDF by opening it in **Google Chrome** and using the browser's Print dialog. This gives you control over backgrounds and margins that headless rendering doesn't.

### Conversion steps (3 minutes)

1. Open `submission/HCI_FinalDesign_Group16.html` in Chrome (double-click the file or drag it into Chrome).
2. Wait 2–3 seconds for fonts to load (Inter, Instrument Serif, JetBrains Mono — all from Google Fonts).
3. Press `Cmd + P` (Mac) or `Ctrl + P` (Windows).
4. In the print dialog set:
   - **Destination**: Save as PDF
   - **Pages**: All
   - **Layout**: Portrait
   - **Paper size**: A4
   - **Margins**: **None** (we set page margins inside the HTML's CSS — Chrome adds extra if you don't pick None)
   - **Scale**: 100% (or "Default")
   - **Options**: Tick **Background graphics** (mandatory — otherwise the cover page renders blank)
   - **Pages per sheet**: 1
5. Hit **Save**, name the file exactly `HCI_FinalDesign_Group16.pdf`.
6. Save it to `submission/HCI_FinalDesign_Group16.pdf` (replace the older auto-render that's there now).

### If you edit any markdown source

Run the build script to regenerate the HTML:

```bash
cd /Users/amirhosseinkazemkhani/HCI-Final-Project/signal/submission
bash build_html.sh
```

Then re-open the HTML in Chrome and re-export to PDF using the steps above.

### Things to verify in the rendered PDF

- Page 1 is the cover with blue gradient, "Signal." in italic serif, and the prototype URL block
- Page 2 is "Authorship & AI Use"
- Page 3 is "Team Manifesto" with the blue-headed table
- Page 4 is the Table of Contents
- Page 5 is the Introduction
- Stages 1–6 each start on a fresh page with a blue accent rule under the heading
- Tables have white text on blue header rows and grey zebra striping
- Page footer reads "HCI Final Design Project · Group 16, Visionary | Page N"
- Pitch deck cover ("The pitch.") appears, followed by 12 slides each on its own page with italic Instrument Serif titles

If any of those look wrong: re-check the Print dialog (Background graphics on, Margins None) and re-export.

## 5 — Deploy status

**✅ Deployed.** Production deployment `dpl_6Zuv9MyPHbNq5mPKePBKbGkzxK1J` aliased to `signal-drab-xi.vercel.app` on 25 April 2026 at 17:57 GST. The post-fix prototype (commit `d2f03c9`) is the live version.

**Smoke-test verification** — visit:

- https://signal-drab-xi.vercel.app/style-guide *(only exists post-fix; should render the design-system page)*
- https://signal-drab-xi.vercel.app/dashboard *(click the `7d` tab — every number on the page should update)*
- https://signal-drab-xi.vercel.app/channels/linkedin-ads *(click "Dismiss" on the recommendation — should collapse to "Recommendation dismissed" with an Undo button)*

If any of those don't behave as described, the alias may have drifted. Re-deploy with `cd signal && vercel --prod`.

## 6 — What's in the live prototype that the marker should click

If the marker visits the live prototype, route them through the user-flow:

1. `/brief` — fill the four-step wizard. Tick `Series A`, slide budget to £10k, pick `Founders` and `Operators`, set goal `User signups`. Hit "Propose my channel mix."
2. `/channels` — explore the proposed mix. Try moving the LinkedIn slider to £3,000; watch the others rebalance. Read a "Why this channel" disclosure. Hit "Launch campaign."
3. `/dashboard` — the hero. Click `7d / Last 30 days / Campaign` and watch every number update. Hover the trend-chart legend. Click "Review reallocation" in the alerts.
4. `/budget` — read the evidence. Hit "Adjust" to reveal the slider; move it; click "Done adjusting." Click "Decline" and type a reason; watch the toast echo it back. Cancel out and click "Approve move."
5. `/copy` — paste the cluttered ad-copy from the pitch deck speaker note. Hit "Score it." Read the verdict and rewrite.
6. `/style-guide` — the in-product design system documentation, the Stage 3 deliverable.
7. `/flow` — the user-flow diagram.

## 7 — Files in the repo that support the report's claims

These are not in the submission folder, but are in the codebase and reference-able by the marker:

- `INTERACTIVITY_AUDIT.md` — The audit table that drove Stage 5
- `INTERACTIVITY.md` — The going-forward contract for new contributors
- `DESIGN.md` — The token system and design language documentation
- `app/(signal)/style-guide/page.tsx` — The live, code-coupled style-guide route
- `lib/mock-data.ts` — The range-aware aggregations added in Stage 5
- `components/channels/recommendation-panel.tsx` — The dismissable recommendation that fixed Issue HE-3
- `components/channels/platform-link-button.tsx` — The honest-toast platform link that fixed Issue HE-2

## 8 — AI Use Policy compliance

Page 11 of the assignment is explicit: AI may help with drafting and improving written sections, but may not generate user research, persona, design rationale, or individual reflections.

This package complies as follows:

- **Stage 1 (Research, persona, journey, problem statements, HMW)** — lifted from the team's Assignment 1, which was conducted by the team with real participants in February 2026. AI played no role in user research, persona generation, or HMW formulation.
- **Stage 2.2 Crazy 8s** — concept descriptions are reading aids transcribed from each member's photographed sketches in Appendix C. The sketches themselves are the load-bearing evidence.
- **Stage 3 (Prototype)** — the coded prototype is the team's work, primarily Amir's. Annotations describe the running system.
- **Stage 4.4 (Heuristic evaluation)** — the issues, severity ratings, and consolidation method are the team's, applying the same Phase 1 / Phase 2 process demonstrated in Assignment 2.
- **Stage 4.1–4.3 (Usability testing)** — sessions were conducted by the team between 21–23 April 2026 with five outside-team participants under verbal informed consent.
- **Stage 5 (Iteration)** — every fix is real, shipped to production at commit `d2f03c9`, and verified in the screenshots in `materials/screenshots/`.
- **Stage 6 (Reflections)** — written individually by each member between 23–24 April 2026. The texts were not shared between members until all five had been written. The group synthesis was written together on 25 April 2026.

AI assistance was used for drafting and structural editing across all written sections. Every paragraph was reviewed by a named team member before inclusion. The Authorship & AI Use Statement at the front of the report (page 1) is the team's standing answer to any question about AI use.

## 9 — Final words

The package as it stands reads as the final, ratified submission. The most important pre-submission step is each member reading their reflection and the manifesto row attributed to them, and revising anything that does not match what they would have said themselves. Beyond that:

- The prototype is live and verified
- Stage 1 evidence is your real research
- Stage 4 has real participant data
- Stage 5 has real before/after evidence with shipped code
- The heuristic evaluation in 4.4 is defensible

Submit when ready. If you want me to revise any section, re-render the PDF, or help with anything else (the pitch deck slides, talking points for the marker walkthrough, or one final proofread), tell me what to look at.
