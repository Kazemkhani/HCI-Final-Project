# Usability Test Kit — Signal

> Run this kit with **3–5 participants outside your team**. Each session ≤ 30 minutes. Total field time roughly 3 hours of facilitator time across all sessions.

## A — Participant brief (read aloud verbatim)

> "Hi, thanks for taking part. We're testing a campaign-planning tool called Signal that we built for a course. I'm not testing you — I'm testing the design. There are no wrong answers, and any confusion you hit is useful for us, not embarrassing for you.
>
> I'm going to ask you to complete four short tasks while talking out loud. Tell me what you're looking at, what you'd expect to happen if you clicked something, and what you're confused by. Don't ask me what to do — if you're unsure, tell me what you'd guess. At the end I'll give you a short questionnaire about your overall experience.
>
> The whole thing should take 25–30 minutes. You can stop at any time. We're not recording video; I'm taking written notes only. Are you happy to start?"

If they ask "is this good?" or "am I doing this right?" — answer: *"What would you expect to happen?"*

## B — Pre-task setup

- Prototype URL open in a fresh browser tab: `https://signal-drab-xi.vercel.app/dashboard`
- Browser zoom 100%, viewport ≥ 1280px wide. (If using laptop, full screen.)
- Clear browser localStorage to ensure no leftover Brief state. (DevTools → Application → Local Storage → clear)
- Notepad ready. Stopwatch on phone.
- Have the SUS form (Section E) printed or open as a Google Form.

## C — Tasks (read each one aloud one at a time)

### Task 1 — "Which channel is in the worst shape?"
> "You're a marketing lead at an early-stage startup. You log into Signal in the morning. Spend 30 seconds on this dashboard. Tell me which channel is in the worst shape and why."

**What to record:**
- Time on task (start when participant looks at screen, stop when they answer)
- Whether they referenced status colour, cost-per-signup, or something else
- Any place they hovered, clicked, or asked about that didn't go anywhere

**Success criterion:** Names PR Placement (or LinkedIn Ads as second-worst) and references the status colour or cost-per-signup as evidence.

### Task 2 — Date range
> "From the same dashboard, switch the date range to the last 7 days. Did the picture change?"

**What to record:**
- Whether they found the date-range tabs (top right of `/dashboard`)
- Whether they noticed the numbers updated, or assumed nothing happened
- Any expectation they voiced about what *should* change

**Success criterion:** Successfully clicks the SegmentedTabs and notices the KPIs / table values updated.

### Task 3 — Approve / decline a move
> "There's a recommendation in the alerts panel. Walk through it and decide whether to approve, decline, or adjust the move."

**What to record:**
- Whether they read the evidence before deciding
- What they did with the Adjust button, if anything
- If they declined, what they typed in the modal — and whether they noticed the toast message echoes their input

**Success criterion:** Clicks "Review reallocation," reads at least one piece of evidence on `/budget`, makes a decision (approve, adjust, or decline). Confidence in the decision is the qualitative signal.

### Task 4 — Score ad copy
> "Open the Clarity Check tool from the sidebar. Score this ad copy: *'Our enterprise-grade B2B SaaS platform leverages cutting-edge AI to revolutionise your marketing stack with unparalleled synergy.'* What does the tool tell you?"

**What to record:**
- Time from clicking "Score it" to participant reading back the verdict
- Whether they understood the score, the verdict word, and the rewrite
- Whether they tried to do anything with the rewrite (copy it, save it)

**Success criterion:** Pastes copy, clicks Score it, reads back the verdict and the rewrite.

## D — Wrap-up questions (verbal, before SUS)

Ask each one and write down the answer in 1–2 sentences:

1. *"What were you expecting to happen that didn't?"*
2. *"What was the most useful thing on the dashboard?"*
3. *"What was the most confusing thing?"*
4. *"If this were a real tool, would you use it? Why or why not?"*

## E — System Usability Scale (SUS)

Administer immediately after Task 4. Ten items, alternating positive/negative. Likert 1 (Strongly disagree) to 5 (Strongly agree). The wording below is the standard Brooke 1996 scale, with one minor word change ("system" → "tool") for participant comprehension.

> Thinking about the tool you just used:

| # | Statement | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 1 | I think that I would like to use this tool frequently | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2 | I found the tool unnecessarily complex | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3 | I thought the tool was easy to use | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4 | I think that I would need the support of a technical person to be able to use this tool | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5 | I found the various functions in this tool were well integrated | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6 | I thought there was too much inconsistency in this tool | ☐ | ☐ | ☐ | ☐ | ☐ |
| 7 | I would imagine that most people would learn to use this tool very quickly | ☐ | ☐ | ☐ | ☐ | ☐ |
| 8 | I found the tool very cumbersome to use | ☐ | ☐ | ☐ | ☐ | ☐ |
| 9 | I felt very confident using the tool | ☐ | ☐ | ☐ | ☐ | ☐ |
| 10 | I needed to learn a lot of things before I could get going with this tool | ☐ | ☐ | ☐ | ☐ | ☐ |

### F — Scoring SUS

For each participant:

1. For odd-numbered items (1, 3, 5, 7, 9): score = (response - 1)
2. For even-numbered items (2, 4, 6, 8, 10): score = (5 - response)
3. Sum all 10 contributions (range 0–40)
4. Multiply the sum by 2.5
5. Final SUS score is 0–100

Example: All 5s on odd items, all 1s on even items → odd contributes (4×5=20), even contributes (4×5=20), sum = 40, × 2.5 = **100**.

Industry benchmark: above 68 = above average. Above 80 = top quartile.

### G — Per-session notes template (one per participant)

```
PARTICIPANT CODE:        ____  (T1, T2, T3, T4, T5)
DATE / TIME:             ______________________________
FACILITATOR:             ______________________________
ROLE / CONTEXT:          ______________________________
MARKETING TOOL FAMILIARITY: ☐ None  ☐ Some  ☐ High

TASK 1 — Worst channel
  Time on task:          _____ seconds
  Answer:                ______________________________
  Evidence cited:        ______________________________
  Notes:                 ______________________________

TASK 2 — Date range
  Time on task:          _____ seconds
  Found the tabs:        ☐ Yes  ☐ Yes after prompt  ☐ No
  Noticed data changed:  ☐ Yes  ☐ No
  Notes:                 ______________________________

TASK 3 — Approve / decline / adjust
  Time on task:          _____ seconds
  Read evidence:         ☐ Yes  ☐ Partial  ☐ No
  Action taken:          ☐ Approve  ☐ Adjust  ☐ Decline
  Decline reason typed:  ______________________________
  Echoed in toast:       ☐ Yes (verified)  ☐ No
  Notes:                 ______________________________

TASK 4 — Clarity Check
  Time on task:          _____ seconds
  Understood verdict:    ☐ Yes  ☐ Partial  ☐ No
  Tried to copy/save:    ☐ Yes  ☐ No
  Notes:                 ______________________________

WRAP-UP RESPONSES:
  1. Expected but didn't happen:   ___________________
  2. Most useful:                  ___________________
  3. Most confusing:               ___________________
  4. Would they use it:            ___________________

SUS SCORES (Q1–Q10):  __ __ __ __ __ __ __ __ __ __
SUS TOTAL (0–100):    _____
```

### H — Group consolidation

After all sessions are complete:
- Aggregate the four task times
- Calculate group average SUS (= sum of individual scores / N)
- Sort observed issues by frequency (how many sessions saw each)
- Cross-reference with the heuristic evaluation in `report/04_stage4_evaluation.md` Section 4.4 — overlap is your top-priority list

The Stage 5 priority rule: *fix issues that are both high-severity AND observed in usability testing first*. Stage 4's "fix first" criterion is what produced the Top 5 Issues list in Stage 5.
