import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

type Flag = {
  type: "self-focus" | "hedge" | "jargon" | "feature-over-benefit" | "length";
  phrase: string;
  fix: string;
};

type ClarityResult = {
  score: number;
  selfFocusCount: number;
  benefitMentionCount: number;
  readingAge: number;
  flags: Flag[];
  rewrite: string;
};

const SYSTEM_PROMPT = `You are a ruthless marketing editor. Score ad copy for clarity for an early-stage startup audience that is sceptical, time-starved, and tired of self-promotional marketing. Return JSON only — no prose, no markdown fences, no preamble. Use British English in any rewrite. The exact JSON shape:

{
  "score": 0-100,
  "selfFocusCount": integer,
  "benefitMentionCount": integer,
  "readingAge": integer,
  "flags": [
    { "type": "self-focus" | "hedge" | "jargon" | "feature-over-benefit" | "length", "phrase": "...", "fix": "..." }
  ],
  "rewrite": "A tighter rewrite that leads with the user's gain, in British English, under 40 words."
}

Score reflects how readable, audience-led, and benefit-led the copy is. 70+ is publishable, 40–69 needs work, below 40 is a rebuild. Cap flags at 5.`;

function tryParse(raw: string): ClarityResult | null {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "");
  try {
    return JSON.parse(cleaned) as ClarityResult;
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1)) as ClarityResult;
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing the API key. Add ANTHROPIC_API_KEY." },
      { status: 500 },
    );
  }

  let body: { copy?: string; goal?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const copy = (body.copy ?? "").trim();
  const goal = (body.goal ?? "user signups").trim();
  if (!copy) {
    return NextResponse.json(
      { error: "Paste some copy first." },
      { status: 400 },
    );
  }
  if (copy.length > 4000) {
    return NextResponse.json(
      { error: "That's a lot of copy. Trim to under 4,000 characters." },
      { status: 400 },
    );
  }

  const anthropic = new Anthropic({ apiKey });
  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 800,
      temperature: 0.3,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Goal: ${goal}\n\nCopy:\n"""\n${copy}\n"""`,
        },
      ],
    });

    const first = response.content.find(
      (b): b is Anthropic.TextBlock => b.type === "text",
    );
    if (!first) {
      return NextResponse.json(
        { error: "Empty response. Try again." },
        { status: 502 },
      );
    }
    const parsed = tryParse(first.text);
    if (!parsed) {
      return NextResponse.json(
        { error: "Couldn't read the response. Try again in a moment." },
        { status: 502 },
      );
    }
    return NextResponse.json(parsed satisfies ClarityResult);
  } catch (err) {
    const message =
      err instanceof Anthropic.APIError ? err.message : "Upstream error.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
