#!/usr/bin/env bash
# Builds the polished single HTML submission file.
# Concatenates report markdown, runs pandoc for body conversion, wraps with a
# hand-crafted template (cover, TOC, section dividers, pitch deck pages).
#
# Output: submission/HCI_FinalDesign_Group16.html
# To produce the PDF: open the HTML in Chrome, File > Print > Save as PDF
# (set Margins: None, Background graphics: ON, Paper: A4, Layout: Portrait).

set -euo pipefail

cd "$(dirname "$0")"

REPORT_OUT="/tmp/signal_report_body.html"
PITCH_OUT="/tmp/signal_pitch_body.html"
FINAL="HCI_FinalDesign_Group16.html"

# 1. Concatenate report markdown with blank-line separators between files
#    (otherwise pandoc folds the next file's `#` heading into the previous
#    paragraph as plain text).
{
  for f in \
    report/01_stage1_research.md \
    report/02_stage2_competitive_ideation.md \
    report/03_stage3_prototype_design.md \
    report/04_stage4_evaluation.md \
    report/05_stage5_iteration.md \
    report/06_stage6_reflection.md \
    report/07_references_appendix.md; do
    cat "$f"
    printf "\n\n"
  done
} > /tmp/signal_report_body.md

pandoc /tmp/signal_report_body.md -t html5 --syntax-highlighting=none > "$REPORT_OUT"
pandoc pitch/Pitch_Deck.md -t html5 --syntax-highlighting=none > "$PITCH_OUT"

# Wrap each Stage h1 in a styled stage-opener page.
python3 <<PYEOF > /tmp/signal_report_styled.html
import re

with open("$REPORT_OUT") as f:
    body = f.read()

stages = {
    "Stage 1 — Research &amp; Problem Definition": ("01", "Research & Problem", "Understanding John, his channels, and what is broken."),
    "Stage 2 — Competitive Analysis &amp; Ideation": ("02", "Analysis & Ideation", "Where the gaps are. How we converged on Signal."),
    "Stage 3 — Prototype Design": ("03", "Prototype Design", "The screens, the flow, the system."),
    "Stage 4 — Evaluation": ("04", "Evaluation", "Five participants, four tasks, ten heuristic findings."),
    "Stage 5 — Iteration": ("05", "Iteration", "Five fixes, before and after, shipped to production."),
    "Stage 6 — Reflection": ("06", "Reflection", "Five voices on what we learned."),
    "References": ("R", "References", ""),
}

# Appendix titles get a softer treatment — h2-style heading inline, no full-page break.
appendices = {
    "Appendix A — Interview Notes",
    "Appendix B — Affinity Map (FigJam)",
    "Appendix C — Crazy 8s Sketches",
    "Appendix D — Usability Test Script &amp; SUS Form",
    "Appendix E — Raw SUS Scores",
    "Appendix F — Individual Heuristic Evaluation Templates",
    "Appendix G — Live Prototype + Repository",
}

def replace_h1(m):
    raw = m.group(1).strip()
    # Normalise whitespace (pandoc may insert newlines mid-heading).
    norm = re.sub(r"\s+", " ", raw)
    norm_clean = re.sub(r"\s+", " ", norm.replace("&amp;", "&"))
    # Appendices: render as a soft h2-style heading inline (no full-page break).
    for app in appendices:
        app_clean = re.sub(r"\s+", " ", app.replace("&amp;", "&"))
        if norm_clean == app_clean:
            return f'<h2 class="appendix-heading">{norm}</h2>'
    for key, value in stages.items():
        key_clean = re.sub(r"\s+", " ", key.replace("&amp;", "&"))
        if norm_clean == key_clean:
            num, sub, hint = value
            display_title = norm
            if hint:
                return (
                    f'<section class="stage-opener">'
                    f'<div class="stage-num-big">Stage {num}</div>'
                    f'<h1 class="stage-h1">{display_title}</h1>'
                    f'<p class="stage-hint">{hint}</p>'
                    f'</section>'
                )
            return (
                f'<section class="stage-opener stage-opener--small">'
                f'<h1 class="stage-h1">{display_title}</h1>'
                f'</section>'
            )
    return m.group(0)

body_styled = re.sub(r"<h1[^>]*>(.*?)</h1>", replace_h1, body, flags=re.DOTALL)
print(body_styled)
PYEOF

# Build the final HTML.
cat > "$FINAL" <<'HTML_HEAD'
<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<title>HCI Final Design Project — Signal — Group 16</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
/* ============================================================
   PAGE GEOMETRY — force A4 portrait in print, page stack in screen
   ============================================================ */
@page {
  size: A4 portrait;
  margin: 20mm 18mm 18mm 18mm;
}
@page :first {
  margin: 0;
}

/* ============================================================
   ROOT TOKENS
   ============================================================ */
:root {
  --ink-900: #0b1220;
  --ink-800: #1e293b;
  --ink-700: #334155;
  --ink-600: #475569;
  --ink-500: #64748b;
  --ink-400: #94a3b8;
  --ink-300: #cbd5e1;
  --ink-200: #e2e8f0;
  --ink-100: #f1f5f9;
  --ink-50:  #f8fafc;
  --bg:      #ffffff;
  --accent-900: #0c1c4d;
  --accent-800: #1e3a8a;
  --accent-700: #1d4ed8;
  --accent-600: #2563eb;
  --accent-500: #3b82f6;
  --accent-100: #dbeafe;
  --accent-50:  #eff6ff;
  --signal-green: #10b981;
  --warn:        #d97706;
  --neg:         #dc2626;
  --serif: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  --sans:  'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif;
  --mono:  'JetBrains Mono', Menlo, Consolas, monospace;
  --rad:    3mm;
  --rad-sm: 2mm;
  --shadow: 0 6mm 18mm rgba(15, 23, 42, 0.10), 0 2mm 6mm rgba(15, 23, 42, 0.05);
}

* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

html, body {
  margin: 0;
  padding: 0;
  font-family: var(--sans);
  font-size: 10pt;
  line-height: 1.6;
  color: var(--ink-800);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'ss01', 'cv11';
}

p { margin: 0 0 0.6em 0; }
a { color: var(--accent-700); text-decoration: underline; text-underline-offset: 2px; text-decoration-thickness: 0.5pt; }
strong { color: var(--ink-900); font-weight: 600; }
em { font-style: italic; }

/* ============================================================
   SCREEN MODE — page stack with shadow for browser preview
   ============================================================ */
@media screen {
  html, body {
    overflow-x: hidden;
    max-width: 100vw;
  }
  body {
    background: #e2e8f0;
    padding: 18mm 0;
    margin: 0;
  }
  /* Every page-shaped section (including .body) shares the same width and padding */
  .page, section.cover, section.pitch-cover, section.slide,
  .front-matter, .toc-page, .body {
    background: white;
    width: min(210mm, calc(100vw - 24px));
    margin: 0 auto 6mm auto;
    box-shadow: var(--shadow);
    padding: 20mm 18mm;
    min-height: 297mm;
    box-sizing: border-box;
    overflow: hidden;
  }
  /* Cover keeps its own padding and gets the responsive width override */
  section.cover {
    padding: 24mm 22mm 22mm 22mm;
    width: min(210mm, calc(100vw - 24px));
    max-width: calc(100vw - 24px);
    height: auto;
    min-height: min(297mm, calc((100vw - 24px) * 1.414));
    max-height: none;
    margin: 0 auto 6mm auto;
  }
  /* Stand-alone stage-openers (outside .body) match the page-stack */
  body > section.stage-opener {
    background: white;
    width: min(210mm, calc(100vw - 24px));
    margin: 0 auto 6mm auto;
    box-shadow: var(--shadow);
    min-height: 297mm;
    box-sizing: border-box;
    overflow: hidden;
  }
  /* Stage-openers nested inside .body break out of body padding to look full-bleed */
  .body section.stage-opener {
    margin: 12mm -18mm 16mm -18mm;
    width: auto;
    min-height: 0;
    box-shadow: none;
    box-sizing: border-box;
  }
  .body > section.stage-opener:first-child { margin-top: -20mm; }
  /* Children of .body never overflow */
  .body > * { max-width: 100%; box-sizing: border-box; }
  .body table { max-width: 100%; width: 100% !important; }
  .body img { max-width: 100%; height: auto; }
  pre { white-space: pre-wrap; word-wrap: break-word; }
}

@media print {
  body { background: white; padding: 0; margin: 0; }
  .page, .front-matter, .toc-page {
    margin: 0; box-shadow: none; min-height: 0; padding: 0;
  }
  /* cover, stage-opener, pitch-cover, slide keep their padding so they
     fill the page properly under print's @page margin: 0 (only first page) */
  section.cover { box-shadow: none; margin: 0; }
  .stage-opener:not(.stage-opener--small) { box-shadow: none; margin: 0; }
  section.pitch-cover, section.slide { box-shadow: none; margin: 0; }
  .body { box-shadow: none; padding: 0; margin: 0; width: auto; min-height: 0; overflow: visible; background: transparent; }
  /* Reset the screen-mode negative margins on stage-openers inside .body for print */
  .body section.stage-opener { margin: 0; width: 100%; min-height: 0; }
}

/* ============================================================
   COVER PAGE
   ============================================================ */
section.cover {
  width: 210mm;
  height: 297mm;
  min-height: 297mm;
  max-height: 297mm;
  margin: 0 auto;
  padding: 24mm 22mm 22mm 22mm;
  box-sizing: border-box;
  background:
    radial-gradient(ellipse at 80% 0%, rgba(59, 130, 246, 0.45), transparent 50%),
    radial-gradient(ellipse at 0% 100%, rgba(16, 185, 129, 0.18), transparent 45%),
    linear-gradient(160deg, #0b1220 0%, #0c1c4d 50%, #1e3a8a 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  page-break-after: always;
  break-after: page;
  overflow: hidden;
  position: relative;
}

.cover-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-family: var(--mono);
  font-size: 8pt;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
}

.cover-eyebrow {
  font-family: var(--mono);
  font-size: 9pt;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(255,255,255,0.65);
  margin-bottom: 14mm;
}

.cover-title {
  font-family: var(--serif);
  font-style: italic;
  font-size: 88pt;
  line-height: 0.92;
  margin: 0 0 6mm 0;
  letter-spacing: -0.01em;
  font-weight: 400;
}

.cover-title .dot { color: var(--signal-green); }

.cover-subtitle {
  font-family: var(--serif);
  font-style: italic;
  font-size: 22pt;
  line-height: 1.18;
  font-weight: 400;
  color: rgba(255,255,255,0.92);
  margin: 0 0 8mm 0;
  max-width: 150mm;
}

.cover-tagline {
  font-size: 11pt;
  color: rgba(255,255,255,0.62);
  font-weight: 400;
  max-width: 150mm;
  line-height: 1.55;
  margin: 0;
}

.cover-prototype-url {
  margin-top: 12mm;
  display: inline-block;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.18);
  padding: 5mm 7mm;
  border-radius: var(--rad);
  backdrop-filter: blur(8px);
}
.cover-prototype-url .label {
  display: block;
  font-family: var(--mono);
  font-size: 7.5pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.50);
  margin-bottom: 2mm;
}
.cover-prototype-url .url {
  font-family: var(--mono);
  font-size: 11pt;
  color: white;
  font-weight: 500;
}

.cover-meta {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6mm 10mm;
  padding-top: 7mm;
  border-top: 1px solid rgba(255,255,255,0.20);
}

.cover-meta dt {
  font-family: var(--mono);
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
  font-size: 7.5pt;
  letter-spacing: 0.12em;
  margin-bottom: 1.5mm;
  font-weight: 500;
}
.cover-meta dd {
  margin: 0 0 4mm 0;
  font-size: 10pt;
  font-weight: 500;
  color: white;
  line-height: 1.4;
}

.cover-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-family: var(--mono);
  font-size: 7.5pt;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}

/* ============================================================
   FRONT MATTER (Authorship, Manifesto, TOC, Intro)
   ============================================================ */
.front-matter {
  page-break-before: always;
}

.front-matter h1 {
  font-size: 28pt;
  font-weight: 700;
  letter-spacing: -0.018em;
  color: var(--ink-900);
  margin: 0 0 4mm 0;
  padding: 0 0 4mm 0;
  border-bottom: 0.4mm solid var(--accent-700);
  page-break-after: avoid;
}

/* the second h1 in a front-matter section forces a new page */
.front-matter h1 + p,
.front-matter h1 + h2,
.front-matter h1 + table { margin-top: 4mm; }

.front-matter h1:not(:first-child) {
  page-break-before: always;
  margin-top: 0;
}

.front-matter h2 {
  font-size: 13pt;
  font-weight: 600;
  color: var(--ink-900);
  margin: 8mm 0 2mm 0;
  page-break-after: avoid;
}

/* ============================================================
   TABLE OF CONTENTS — leader dots
   ============================================================ */
.toc-page { page-break-before: always; }
.toc-page h1 {
  font-size: 28pt;
  font-weight: 700;
  letter-spacing: -0.018em;
  color: var(--ink-900);
  margin: 0 0 8mm 0;
  padding: 0 0 4mm 0;
  border-bottom: 0.4mm solid var(--accent-700);
}

.toc-list { list-style: none; padding: 0; margin: 0; }
.toc-list li { display: flex; align-items: baseline; margin: 0; padding: 1.5mm 0; line-height: 1.4; }
.toc-list .toc-section {
  font-weight: 700;
  color: var(--accent-800);
  font-size: 11pt;
  margin-top: 4mm;
  padding-top: 2mm;
  border-top: 0.2mm solid var(--ink-200);
}
.toc-list .toc-section:first-child { border-top: none; margin-top: 0; padding-top: 0; }
.toc-list .toc-sub {
  padding-left: 6mm;
  font-size: 10pt;
  color: var(--ink-700);
  font-weight: 400;
}
.toc-label { flex: 0 0 auto; }
.toc-leader {
  flex: 1 1 auto;
  border-bottom: 0.15mm dotted var(--ink-300);
  margin: 0 2mm 0.4em 2mm;
  height: 0;
  align-self: center;
}
.toc-page-num { flex: 0 0 auto; font-family: var(--mono); color: var(--ink-500); font-variant-numeric: tabular-nums; font-size: 9pt; }

/* ============================================================
   STAGE OPENER PAGES — full-bleed with big italic stage number
   ============================================================ */
/* Stage-openers are now compact inline banners (no forced page break, no full-page splash). */
.stage-opener {
  page-break-before: always;
  break-before: page;
  page-break-after: avoid;
  break-after: avoid;
  background: linear-gradient(180deg, var(--accent-50) 0%, white 100%);
  display: block;
  min-height: 0;
  padding: 8mm 0 6mm 0;
  margin: 0 0 6mm 0;
  border-bottom: 0.4mm solid var(--accent-700);
}
.stage-opener-inner { display: block; }

.stage-opener .stage-num-big {
  font-family: var(--serif);
  font-style: italic;
  font-size: 28pt;
  font-weight: 400;
  line-height: 1;
  color: var(--accent-700);
  margin: 0 0 2mm 0;
  letter-spacing: -0.01em;
  display: inline-block;
}

.stage-opener .stage-h1 {
  font-size: 22pt;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--ink-900);
  margin: 0 0 2mm 0;
  border: none;
  padding: 0;
  page-break-after: avoid;
  break-after: avoid;
  line-height: 1.15;
}

.stage-opener .stage-hint {
  font-family: var(--serif);
  font-style: italic;
  font-size: 12pt;
  color: var(--ink-600);
  margin: 0;
  max-width: 130mm;
  line-height: 1.4;
}

.stage-opener--small {
  background: white;
  min-height: 0;
  padding: 0;
  page-break-before: always;
  page-break-after: avoid;
}
.stage-opener--small .stage-h1 {
  font-size: 28pt;
  margin: 0 0 8mm 0;
  padding: 0 0 4mm 0;
  border-bottom: 0.4mm solid var(--accent-700);
  page-break-before: always !important;
  break-before: page !important;
}

/* ============================================================
   BODY TYPOGRAPHY
   ============================================================ */
.body h1 {
  font-size: 24pt;
  font-weight: 700;
  letter-spacing: -0.018em;
  color: var(--ink-900);
  margin: 0 0 4mm 0;
  padding: 0 0 3mm 0;
  border-bottom: 0.4mm solid var(--accent-700);
  page-break-before: always;
  page-break-after: avoid;
}
.body > section.stage-opener:first-child { page-break-before: auto; }

h2 {
  font-size: 14pt;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--accent-800);
  margin: 8mm 0 2mm 0;
  page-break-after: avoid;
}

h2.appendix-heading {
  font-size: 16pt;
  font-weight: 700;
  color: var(--ink-900);
  margin: 8mm 0 3mm 0;
  padding: 0 0 2mm 0;
  border-bottom: 0.3mm solid var(--accent-700);
  page-break-after: avoid;
  page-break-before: auto;
}

h3 {
  font-size: 11.5pt;
  font-weight: 600;
  color: var(--ink-900);
  margin: 6mm 0 1.5mm 0;
  page-break-after: avoid;
  letter-spacing: -0.005em;
}

h4 {
  font-size: 10.5pt;
  font-weight: 600;
  color: var(--ink-800);
  margin: 4mm 0 1mm 0;
  page-break-after: avoid;
}

/* ============================================================
   TABLES
   ============================================================ */
table {
  border-collapse: collapse;
  width: 100%;
  margin: 3mm 0 5mm 0;
  font-size: 9pt;
  page-break-inside: auto;
  border: 0.2mm solid var(--ink-200);
}
thead { display: table-header-group; }
tr { page-break-inside: avoid; }
th {
  background: var(--accent-800);
  color: white;
  font-weight: 600;
  text-align: left;
  padding: 2.5mm 3mm;
  font-size: 8.5pt;
  letter-spacing: 0.01em;
  border: none;
  vertical-align: top;
}
td {
  padding: 2.5mm 3mm;
  border-bottom: 0.15mm solid var(--ink-200);
  vertical-align: top;
  line-height: 1.5;
  background: white;
}
tr:nth-child(even) td { background: var(--ink-50); }

/* ============================================================
   BLOCKQUOTES / CALLOUTS
   ============================================================ */
blockquote {
  background: var(--accent-50);
  border-left: 0.8mm solid var(--accent-600);
  margin: 4mm 0;
  padding: 3mm 5mm;
  border-radius: var(--rad-sm);
  page-break-inside: avoid;
  color: var(--ink-800);
}
blockquote p { margin: 0 0 1.5mm 0; }
blockquote p:last-child { margin-bottom: 0; }
blockquote em { font-style: italic; color: var(--ink-700); }

.callout {
  background: var(--accent-50);
  border-left: 0.8mm solid var(--accent-600);
  padding: 3mm 5mm;
  margin: 4mm 0;
  border-radius: var(--rad-sm);
  font-size: 10pt;
  page-break-inside: avoid;
}
.callout strong { color: var(--accent-800); }

/* ============================================================
   LISTS
   ============================================================ */
ul, ol { margin: 1mm 0 4mm 0; padding-left: 6mm; }
li { margin: 0.6mm 0; line-height: 1.55; }
ul ul, ol ol, ul ol, ol ul { margin-bottom: 1mm; }

/* ============================================================
   CODE
   ============================================================ */
code {
  font-family: var(--mono);
  font-size: 8.5pt;
  background: var(--ink-100);
  padding: 0.3mm 1.5mm;
  border-radius: 1mm;
  border: 0.15mm solid var(--ink-200);
  color: var(--ink-800);
}
pre {
  font-family: var(--mono);
  font-size: 8pt;
  background: var(--ink-50);
  padding: 3mm 4mm;
  border-radius: var(--rad-sm);
  border: 0.15mm solid var(--ink-200);
  overflow-x: auto;
  page-break-inside: avoid;
  line-height: 1.55;
  margin: 3mm 0;
  color: var(--ink-800);
}
pre code { background: transparent; border: none; padding: 0; }

/* ============================================================
   MISC
   ============================================================ */
hr { border: none; border-top: 0.15mm solid var(--ink-200); margin: 6mm 0; }
img { max-width: 100%; height: auto; }
.byline { font-size: 9pt; color: var(--ink-500); margin: 0 0 3mm 0; }

/* ============================================================
   PITCH DECK
   ============================================================ */
section.pitch-cover {
  page-break-before: always !important;
  break-before: page !important;
  page-break-after: always !important;
  break-after: page !important;
  min-height: 245mm;
  background: linear-gradient(180deg, var(--accent-50), white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 22mm;
}
.pitch-cover .label {
  font-family: var(--mono);
  font-size: 9pt;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--accent-700);
  margin: 0 0 8mm 0;
}
.pitch-cover .title {
  font-family: var(--serif);
  font-style: italic;
  font-size: 96pt;
  color: var(--ink-900);
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin: 0;
  font-weight: 400;
}
.pitch-cover .sub {
  font-family: var(--serif);
  font-style: italic;
  font-size: 18pt;
  color: var(--ink-600);
  margin-top: 8mm;
  max-width: 150mm;
  line-height: 1.35;
}

section.slide {
  page-break-before: always !important;
  break-before: page !important;
  page-break-after: always !important;
  break-after: page !important;
  min-height: 240mm;
  display: flex;
  flex-direction: column;
  padding: 4mm 0;
}
section.slide:last-of-type {
  page-break-after: auto !important;
  break-after: auto !important;
}

.slide-num {
  font-family: var(--mono);
  font-size: 8.5pt;
  color: var(--ink-500);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 5mm 0;
}

.slide h2 {
  font-family: var(--serif);
  font-style: italic;
  font-size: 44pt;
  font-weight: 400;
  color: var(--ink-900);
  border: none;
  margin: 0 0 8mm 0;
  line-height: 1.0;
  letter-spacing: -0.02em;
  padding: 0;
}

.slide-body {
  flex: 1;
  font-size: 12pt;
  line-height: 1.6;
  color: var(--ink-800);
}
.slide-body p { font-size: 12pt; margin: 0 0 4mm 0; }
.slide-body table { font-size: 10.5pt; }
.slide-body ul, .slide-body ol { font-size: 12pt; padding-left: 8mm; }
.slide-body li { margin: 1.5mm 0; }
.slide-body strong { color: var(--accent-800); }

.slide-footer {
  border-top: 0.2mm solid var(--ink-200);
  padding-top: 3mm;
  font-family: var(--mono);
  font-size: 8pt;
  color: var(--ink-500);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
}

/* ============================================================
   PAGE FOOTERS via @page running content
   ============================================================ */
@page {
  @bottom-left {
    content: "HCI Final Design Project · Group 16 · Visionary";
    font-family: 'Inter', sans-serif;
    font-size: 7.5pt;
    color: #94a3b8;
  }
  @bottom-right {
    content: "Page " counter(page);
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.5pt;
    color: #94a3b8;
  }
  @top-right {
    content: "Signal · One dashboard, every channel, one clear read.";
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-size: 7.5pt;
    color: #cbd5e1;
  }
}
@page :first {
  @bottom-left { content: none; }
  @bottom-right { content: none; }
  @top-right { content: none; }
}
</style>
</head>
<body>
HTML_HEAD

# ----- Cover page ---------------------------------------------------------
cat >> "$FINAL" <<'COVER'
<section class="cover">
  <div class="cover-top">
    <div>HCI Final Design Project · 2025–2026</div>
    <div>University of Birmingham Dubai</div>
  </div>

  <div class="cover-mid">
    <div class="cover-eyebrow">Group 16 · Visionary</div>
    <h1 class="cover-title">Signal<span class="dot">.</span></h1>
    <div class="cover-subtitle">One dashboard, every channel, one clear read.</div>
    <p class="cover-tagline">A campaign-planning and measurement web app for marketing leads at early-stage startups, built as a coded clickable prototype for the Final Design Project.</p>
    <div class="cover-prototype-url">
      <span class="label">Live Prototype</span>
      <span class="url">signal-drab-xi.vercel.app</span>
    </div>
  </div>

  <div>
    <dl class="cover-meta">
      <div><dt>Course</dt><dd>Human–Computer Interaction</dd></div>
      <div><dt>Instructor</dt><dd>Dr. Khalil ur Rehman Laghari</dd></div>
      <div><dt>Submission</dt><dd>27 April 2026</dd></div>
      <div><dt>Group</dt><dd>16 · Visionary</dd></div>
      <div><dt>Members (5)</dt><dd>Aquib Palampalliyali · Aman Riyas · Heng Cheng · Alagappan Alagappan · Amir Hossein Kazemkhani</dd></div>
      <div><dt>Repository</dt><dd>github.com/Kazemkhani/HCI-Final-Project</dd></div>
    </dl>
    <div class="cover-bottom" style="margin-top: 4mm;">
      <div>HCI_FinalDesign_Group16.pdf</div>
      <div>Research → Design → Evaluation → Iteration</div>
    </div>
  </div>
</section>
COVER

# ----- Authorship + Manifesto + TOC + Introduction ------------------------
cat >> "$FINAL" <<'FRONTMATTER'
<section class="front-matter">
  <h1>Authorship &amp; AI Use</h1>
  <p>In line with the course's AI Use Policy (Final Project Assignment, page 11), the team used generative AI tools to assist with drafting written sections of this report. The user research, persona, journey map, problem statements, How-Might-We questions (Stage 1), the prototype itself (Stage 3), the heuristic evaluation (Stage 4 Part B), the iteration fixes (Stage 5), and every individual reflection (Stage 6) are the team's own work — reviewed, edited, and owned by the members named on the cover page. Where AI assisted with phrasing or structuring, every line was read, revised, and signed off by a named team member before inclusion.</p>
  <p>The Stage 1 evidence base was conducted by the team in February 2026 under informed consent, originally documented in Assignment 1, and is reproduced and extended here per the rubric's explicit allowance for continuing from Assignment 1. The Stage 4 usability sessions were conducted by the team between 21–23 April 2026 with five participants outside the group; participant codes T1–T5 are anonymised per our consent process. The repository at <a href="https://github.com/Kazemkhani/HCI-Final-Project">github.com/Kazemkhani/HCI-Final-Project</a> carries the full commit trail, including <code>INTERACTIVITY_AUDIT.md</code> and <code>INTERACTIVITY.md</code> — the working documents that drove Stage 5 — for any claim that the marker wishes to verify.</p>
</section>

<section class="front-matter">
  <h1>Team Manifesto</h1>
  <p class="byline">Roles rotated across the project to ensure every member touched research, design, evaluation, and reflection.</p>
  <table>
    <thead><tr><th style="width:23%">Member</th><th style="width:30%">Primary Role</th><th>Contributions</th></tr></thead>
    <tbody>
      <tr><td><strong>Aquib Palampalliyali</strong></td><td>Research Lead — Stage 1 + Stage 4 Part A</td><td>Re-cut interview evidence into the Stage 1 traceability matrix, recruited and ran usability testing sessions, scored SUS responses, drafted Sections 4.1 and 4.2.</td></tr>
      <tr><td><strong>Aman Riyas</strong></td><td>Ideation Lead — Stage 2 + Stage 5</td><td>Ran the Crazy 8s workshop, facilitated dot-voting, drafted the competitive analysis section, owns the Stage 5 before/after iteration write-up.</td></tr>
      <tr><td><strong>Heng Cheng</strong></td><td>Visual Design Lead — Stage 3</td><td>Annotated the prototype screen captures, rendered the user-flow diagram, owns the consolidation of the live <code>/style-guide</code> route into the report's Style Guide section.</td></tr>
      <tr><td><strong>Alagappan Alagappan</strong></td><td>Evaluation Lead — Stage 4 Part B + QA</td><td>Led the heuristic evaluation of Signal mapped to Nielsen's 10 heuristics, compiled the consolidated issues table, ran rubric coverage QA on the final PDF.</td></tr>
      <tr><td><strong>Amir Hossein Kazemkhani</strong></td><td>Prototype &amp; Submission Lead</td><td>Built the coded front-end prototype (Next.js, deployed to Vercel), led the interactivity audit and bug-fix cycle that drove Stage 5 evidence, owns final formatting and Canvas upload.</td></tr>
    </tbody>
  </table>
  <div class="callout"><strong>Decision-making.</strong> Disagreements were resolved by structured discussion first; if no consensus emerged within ten minutes, we used dot voting (3 votes per member) on impact × feasibility — the same protocol that worked well in Assignment 2.</div>
</section>

<section class="toc-page">
  <h1>Table of Contents</h1>
  <ul class="toc-list">
    <li class="toc-section"><span class="toc-label">Authorship &amp; AI Use</span><span class="toc-leader"></span><span class="toc-page-num">2</span></li>
    <li class="toc-section"><span class="toc-label">Team Manifesto</span><span class="toc-leader"></span><span class="toc-page-num">3</span></li>
    <li class="toc-section"><span class="toc-label">Introduction</span><span class="toc-leader"></span><span class="toc-page-num">5</span></li>
    <li class="toc-sub"><span class="toc-label">1.1 Project Scope</span><span class="toc-leader"></span><span class="toc-page-num">5</span></li>
    <li class="toc-sub"><span class="toc-label">1.2 Continuity from Assignment 1</span><span class="toc-leader"></span><span class="toc-page-num">5</span></li>

    <li class="toc-section"><span class="toc-label">Stage 1 — Research &amp; Problem Definition</span><span class="toc-leader"></span><span class="toc-page-num">7</span></li>
    <li class="toc-sub"><span class="toc-label">1.1 Research Method · 1.2 Participants · 1.3 Interview Findings</span><span class="toc-leader"></span><span class="toc-page-num">8</span></li>
    <li class="toc-sub"><span class="toc-label">1.4 Affinity Themes · 1.5 Persona · 1.6 Journey Map</span><span class="toc-leader"></span><span class="toc-page-num">11</span></li>
    <li class="toc-sub"><span class="toc-label">1.7 Problem Statements · 1.8 HMW · 1.9 Insights &amp; Goals</span><span class="toc-leader"></span><span class="toc-page-num">14</span></li>

    <li class="toc-section"><span class="toc-label">Stage 2 — Competitive Analysis &amp; Ideation</span><span class="toc-leader"></span><span class="toc-page-num">17</span></li>
    <li class="toc-sub"><span class="toc-label">2.1 Competitive Landscape · 2.2 Crazy 8s · 2.3 Concept Selection</span><span class="toc-leader"></span><span class="toc-page-num">18</span></li>

    <li class="toc-section"><span class="toc-label">Stage 3 — Prototype Design</span><span class="toc-leader"></span><span class="toc-page-num">22</span></li>
    <li class="toc-sub"><span class="toc-label">3.1 Principles · 3.2 Annotated Screens · 3.3 Flow · 3.4 Style Guide</span><span class="toc-leader"></span><span class="toc-page-num">23</span></li>

    <li class="toc-section"><span class="toc-label">Stage 4 — Evaluation</span><span class="toc-leader"></span><span class="toc-page-num">28</span></li>
    <li class="toc-sub"><span class="toc-label">4.1–4.3 Usability Testing · SUS · 4.4 Heuristic Evaluation</span><span class="toc-leader"></span><span class="toc-page-num">29</span></li>

    <li class="toc-section"><span class="toc-label">Stage 5 — Iteration</span><span class="toc-leader"></span><span class="toc-page-num">36</span></li>
    <li class="toc-sub"><span class="toc-label">5.1 Top 5 Before/After · 5.2 Patterns · 5.3 Deferred</span><span class="toc-leader"></span><span class="toc-page-num">37</span></li>

    <li class="toc-section"><span class="toc-label">Stage 6 — Reflection</span><span class="toc-leader"></span><span class="toc-page-num">41</span></li>
    <li class="toc-sub"><span class="toc-label">6.1 Five Individual Reflections · 6.2 Group Synthesis</span><span class="toc-leader"></span><span class="toc-page-num">42</span></li>

    <li class="toc-section"><span class="toc-label">References</span><span class="toc-leader"></span><span class="toc-page-num">47</span></li>
    <li class="toc-section"><span class="toc-label">Appendices A — G</span><span class="toc-leader"></span><span class="toc-page-num">48</span></li>
    <li class="toc-section"><span class="toc-label">Pitch Deck — 12 Slides</span><span class="toc-leader"></span><span class="toc-page-num">52</span></li>
  </ul>
</section>

<section class="front-matter">
  <h1>Introduction</h1>
  <h2>1.1 Project Scope</h2>
  <p>Signal is a campaign planning and measurement web app for marketing professionals at early-stage businesses. It addresses the persistent problem we identified in Assignment 1: marketers like our persona John Doe juggle multiple advertising channels — digital, physical, and hybrid — but lack a single, trustworthy view that tells them whether their spend is working. Our Final Design Project takes the validated problem space from Assignment 1 forward into a complete design solution: ideated against competitive alternatives, prototyped as a working coded front-end, evaluated through both heuristic review and usability testing with real participants, and iterated on the basis of evaluation findings.</p>
  <p>The prototype lives at <a href="https://signal-drab-xi.vercel.app"><strong>signal-drab-xi.vercel.app</strong></a>. The repository is open at <a href="https://github.com/Kazemkhani/HCI-Final-Project">github.com/Kazemkhani/HCI-Final-Project</a>. This report is the rigorous account of how every design decision was made and what evidence drove each one.</p>

  <h2>1.2 Continuity from Assignment 1</h2>
  <p>Per the Final Project rubric, we continued the direction set in Assignment 1 rather than starting fresh. Assignment 1 produced a validated persona (John Doe, marketing lead at a Dubai startup) and five problem statements, four of which Signal directly addresses. The mapping from A1 problem statement to Signal feature is shown below; this table is the load-bearing traceability claim for our entire project.</p>
  <table>
    <thead><tr><th style="width:48%">A1 Problem Statement</th><th>Signal feature addressing it</th></tr></thead>
    <tbody>
      <tr><td><strong>PS1 — Channel Selection Overwhelm</strong><br><em>"no standard framework for matching channels to audiences"</em></td><td><code>/channels</code> page with proposed mix, audience-match score, and live rebalance</td></tr>
      <tr><td><strong>PS2 — Resource Constraints Limiting Promotional Mix</strong><br><em>small teams default to a narrow set of digital channels</em></td><td><code>/brief</code> 4-step wizard that produces a £-budget mix across digital, physical, and hybrid in under three minutes</td></tr>
      <tr><td><strong>PS3 — Cutting Through Noise</strong><br><em>"audiences are exposed to constant competing messages"</em></td><td><code>/copy</code> Clarity Check using the Anthropic API to score ad copy against a stated goal</td></tr>
      <tr><td><strong>PS4 — Measuring Effectiveness Across Channels</strong><br><em>physical channels provide no equivalent of digital metrics</em></td><td><code>/dashboard</code> cross-channel read with a single status colour per channel and a multi-channel trend chart — <strong>the hero feature of Signal</strong></td></tr>
      <tr><td><strong>PS5 — Messaging That Resonates</strong><br><em>"force-fitting logos, calls to action, and excessive details"</em></td><td><code>/copy</code> route's verdict-and-suggestion pattern that explicitly rewards simpler messaging</td></tr>
    </tbody>
  </table>
  <p>We did not pursue PS5's narrower stakeholder-pressure angle as a separate surface in this iteration; the Clarity Check addresses the symptom (cluttered messaging) rather than the underlying social dynamic. This is the only material direction change from A1; we explain it in Stage 5.</p>
</section>

<div class="body">
FRONTMATTER

# ----- Body content (Stages 1-6 + references + appendix) ------------------
cat /tmp/signal_report_styled.html >> "$FINAL"

cat >> "$FINAL" <<'BODY_CLOSE'
</div>

<!-- ============================ Pitch Deck divider ============================== -->
<!-- The 12-slide pitch deck is built as a separate landscape 16:9 deck and is -->
<!-- merged into the final submission PDF after this divider page. -->
<section class="pitch-cover">
  <div class="label">Deliverable 3 · Pitch Deck · 10 marks</div>
  <div class="title">The pitch.</div>
  <div class="sub">The 12-slide pitch deck follows on the next pages, presented in landscape 16:9 format. It makes the case for Signal as we would pitch to a product manager or hackathon judge.</div>
</section>
BODY_CLOSE

cat >> "$FINAL" <<'HTML_TAIL'
</body>
</html>
HTML_TAIL

echo ""
echo "Built: $(pwd)/$FINAL"
echo "Open in Chrome → File → Print → Save as PDF."
echo "Recommended: Layout Portrait, Paper A4, Margins None, Background graphics ON, Scale 100%."
