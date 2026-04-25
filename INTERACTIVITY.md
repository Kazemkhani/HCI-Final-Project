# Interactivity Contract

> Every visible control on every page must do something a user can see. Anything else is a **false affordance** and a direct rubric loss against the Clickable Prototype mark (10) and Nielsen heuristic #1 (Visibility of System Status).
>
> This file is the gate before any "done" claim. If a fix can't be added to the table in `INTERACTIVITY_AUDIT.md` with an `Wired` row and Playwright evidence, it isn't done.

## Rules

1. **No dead handlers.** Every `<button>` must have an `onClick` that produces an *observable* downstream change — DOM, navigation, store mutation, network call, modal/disclosure toggle, or visible toast. Cosmetic state (active class, label flip) on its own is **not enough**.
2. **No mislabelled navigation.** A `<Link>` labelled `Channels` must point to `/channels`, not `/dashboard`. A breadcrumb segment maps to its name.
3. **No unread input.** If a `<textarea>` or `<input>` is shown, its value must be displayed back, sent to an API, or used in a downstream calculation. Discarded input is a false affordance.
4. **Tabs must drive data.** A SegmentedTabs / tablist whose active value is not a prop on at least one downstream component is broken — even if the active pill animates correctly.
5. **Toggles must gate something.** A button that flips between "X" and "Done X" must hide or reveal a panel; otherwise remove the toggle and keep the panel always open or always closed.
6. **Specimens must be `<span>` or `<div>`, not `<button>`.** Pattern-library demonstrations on `/style-guide` use non-interactive elements with `role="group"` and an `aria-label` declaring them specimens.

## Pre-merge / pre-deploy checklist

Before claiming any UI task complete, walk this list against the page you touched:

- [ ] Open `INTERACTIVITY_AUDIT.md`. Add or update a row for every control on the page you modified.
- [ ] For each row, the `Wired?` column must say **Wired**, with `Evidence` describing the observable downstream effect.
- [ ] Click each control in the running app. Confirm a *non-control* element on the page changes (number, panel, route, toast, chart line, table row).
- [ ] Run `pnpm lint && pnpm build` — both must finish clean.
- [ ] Verify keyboard accessibility: every control reachable by Tab, focus ring visible, Enter/Space triggers the same effect as click.
- [ ] Verify against `prefers-reduced-motion`: no animation forces a visual gap that breaks comprehension.

## How to find dead controls fast

```bash
# buttons with no onClick attribute (heuristic — review hits manually)
rg -n '<button(?:\s[^>]*)?>' app components | rg -v 'onClick|aria-haspopup'

# Links pointing to a path that no longer exists
rg -n 'href="/[a-z-]+' app components | sort -u
```

## Heuristic mapping

When the audit finds a problem, capture it in `INTERACTIVITY_AUDIT.md` formatted exactly like the Stage-4 heuristic-evaluation table required by the assignment rubric:

| Heuristic violated | Issue description | Screen / element | Severity (0–4) | Observed in test? | Suggested fix |

Common heuristic mappings for interactivity defects:

- **H1 Visibility of system status** — control state changes but underlying data does not (false affordance).
- **H2 Match between system and real world** — `ExternalLink` icon implies outbound nav with no destination.
- **H3 User control and freedom** — no "Dismiss" / "Undo" / "Cancel" path for an action a user might want to reverse.
- **H4 Consistency and standards** — labels that don't match destination (breadcrumb mislabel).
- **H6 Recognition rather than recall** — toggle labels imply mode without revealing scope.
- **H9 Help users recognise, diagnose, recover from errors** — silently-discarded input or no error surface for a failed call.

## Red lines

- Any control I can click that does nothing observable: **fix or delete before merge.**
- Any `// TODO` next to an interactive element: **finish or delete before merge.**
- Any handler whose body is `() => {}`: **fix or delete before merge.**

The cost of fixing five dead controls before submission is one afternoon. The cost of an assessor finding one is two marks straight off the prototype score and a second hit on the heuristic-evaluation rubric for failing your own audit.
