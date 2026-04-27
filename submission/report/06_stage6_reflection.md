# Stage 6 — Reflection

> Each member wrote independently 23–24 April 2026; texts were not shared until all five were written, to keep voices independent. The §6.2 group synthesis was written collectively on 25 April after we had read all five.

## 6.1 Individual Reflections

### Aquib Palampalliyali

I came into Assignment 1 expecting the four interviews to confirm what we already suspected — and the lesson I keep is that the *opposite* is what makes research worthwhile. P3 and P4 agreed on almost nothing tactically; the spread of opinions was the actual finding, and Themes 2 and 3 came from mapping the disagreement rather than resolving it. My hardest stage was running the usability sessions: with Signal I had to actively bite my tongue when T2 hovered over the audience-match number. Nielsen's "what would you expect to happen?" worked as a discipline only after I'd said it ten times. Next time, I'd run a pilot session before recruiting the full five — T1's encounter with the date-range-tab bug was the cost of not having one.

### Aman Riyas

Crazy 8s sounded gimmicky to me. By panel four I had changed my mind: the timer pushed me past the recommendation card I had half-imagined, into a Slack-bot digest and a campaign-day timeline I would never have generated with unlimited time. Quantity unlocks quality. The most important moment was the post-vote realisation that three of the top concepts could be combined — One-Read Dashboard + Recommendation Card + Channel Health Stripes were not three competing products but three pieces of one. I argued for picking a winner and was wrong. Stage 5's priority list also taught me how little came from designer intuition: the rubric's "fix first what's severe AND observed" rule kept us off two days of polish.

### Heng Cheng

I came in expecting the design system to be my deliverable — colours, type, components. The HCI process kept correcting me: in Stage 1 it was the persona, in Stage 2 the concept, in Stage 3 the *rationale* behind every annotated screen. Polish is the substrate, not the deliverable. My hardest stage was annotating screens: I had to throw out a first set that described visuals ("16px corner radius") and rewrite them as rationale ("groups four numbers because the persona's mental model is a four-number health check"). The biggest surprise was that the live `/style-guide` route turned out to be a stronger artefact than a static PDF — code cannot drift out of sync. Next time I'd start the visual system from a list of *forbidden* patterns rather than approved ones.

### Alagappan Alagappan

Coming out of Assignment 2's heuristic evaluation of someone else's product, I assumed the methodology would transfer to Signal mechanically. It mostly did — but evaluating your own team's product is a different exercise. The temptation to defend a design decision rather than name a usability failure is constant; I caught myself reaching for "yes but" three times in the first hour and set a personal rule: no buts in the issue table. The most useful half-hour of the project was the consolidation argument over HE-1's severity (Critical vs. Major). The discussion, not the vote, made the rating defensible — I'll repeat that argument-on-evidence protocol in every review I run from now on. Next time I'd run two heuristic evaluations: one before usability testing, one after.

### Amir Hossein Kazemkhani

Building Signal as a coded front-end rather than a Figma mock was deliberate, and I'd do it again — but a coded prototype tempts the builder into shipping things that *function* without *signalling* their function. The date-range tabs were the cleanest example: they worked as a React state machine but didn't work as a usability affordance because nothing else on the page changed. My hardest moment was Aquib relaying T1's "the tabs don't do anything." My first reaction was defensive; it took ten minutes to accept she was right and that I'd built the exact bug I had been writing against in `INTERACTIVITY.md`. The fix took two hours. What was hard was admitting it. Next time the interactivity audit goes *before* the sessions, not after.

## 6.2 Group Synthesis

Three threads ran across the five reflections.

**Theme 1 — Disagreement is the data.** Aquib on the P3/P4 spread; Alagappan on the HE-1 severity argument; Aman on the dot-vote-and-combine decision. In each case the temptation was to resolve disagreement fast; in each case the disagreement was the most useful artefact in that stage. By Stage 4 we had reorganised meetings to deliberately surface disagreement — always asking for the dissenting view before voting, always recording the reasoning behind a severity rating, never just the rating. In research-led design, agreement is often premature.

**Theme 2 — Coded prototypes hide bugs paper prototypes do not have.** Amir names this directly; it is implicit in Aman's pre-evaluation taste-driven change list and Heng's late realisation about `/style-guide`. A coded prototype creates surfaces that look complete because the code compiles, not because the design works. Paper forces every interaction to be articulated in writing, which exposes false affordances at the design stage rather than the test stage. Our intermediate solution — `INTERACTIVITY_AUDIT.md` — adds paper-prototype discipline on top of a coded one.

**Theme 3 — The hardest part of HCI is admitting the user is right.** Aquib on the temptation to explain; Amir on the defensive reaction to "the tabs don't do anything"; Alagappan on the difficulty of evaluating his own team's product. The designer's mental model is necessarily different from the user's; HCI is the discipline of surfacing the gap rather than rationalising it away. Two practices helped us specifically: think-aloud's "what would you expect to happen?" framing, and the rule that severity must be argued from evidence rather than asserted.

**Three things we would do differently.** Run one pilot usability session before recruiting the full pool *(Aquib)*; run two heuristic evaluations rather than one *(Alagappan)*; start the visual system from a list of *forbidden* patterns rather than approved ones *(Heng)*. If we had four more weeks, we would prototype on paper first.
