// Deterministic mock data for the Signal prototype. No randomness at runtime —
// trend arrays are seeded by channel id so charts read the same on every load.

export type ChannelType = "digital" | "physical" | "hybrid";

export type ChannelStatus = "healthy" | "attention" | "critical";

export type TrendPoint = {
  date: string;
  signups: number;
  spend: number;
  costPerSignup: number;
};

export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  iconKey: string;
  allocation: number;
  spend: number;
  reach: number;
  signups: number;
  costPerSignup: number;
  audienceMatch: number;
  delta7d: number;
  rationale: string;
  detail: string;
  status: ChannelStatus;
  audienceBreakdown: { segment: string; score: number }[];
  trend: TrendPoint[];
};

export type AudienceOption =
  | "Founders"
  | "Operators"
  | "Developers"
  | "Designers"
  | "Marketers"
  | "Finance"
  | "Sales"
  | "Students";

export type Goal = {
  id: "awareness" | "signups" | "conversions" | "attendance";
  label: string;
  blurb: string;
};

const DAYS = 30;

// Tiny seeded PRNG so each channel gets a stable, distinct trend shape.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildTrend(
  seedKey: string,
  baseSignups: number,
  baseSpend: number,
  weekendDip: boolean,
): TrendPoint[] {
  const seed = Array.from(seedKey).reduce(
    (acc, c) => acc + c.charCodeAt(0),
    0,
  );
  const rand = seeded(seed);
  const today = new Date("2026-04-25T00:00:00Z");
  const points: TrendPoint[] = [];
  for (let i = DAYS - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    const dow = d.getUTCDay();
    const isWeekend = dow === 0 || dow === 6;
    const noise = 0.85 + rand() * 0.3; // 0.85–1.15
    const dip = weekendDip && isWeekend ? 0.55 : 1;
    const drift = 1 + (DAYS - i) * 0.005; // mild upward drift
    const signups = Math.max(0, Math.round(baseSignups * noise * dip * drift));
    const spend = Math.max(0, Math.round(baseSpend * noise * (isWeekend ? 0.7 : 1)));
    const costPerSignup = signups > 0 ? +(spend / signups).toFixed(2) : 0;
    points.push({
      date: d.toISOString().slice(0, 10),
      signups,
      spend,
      costPerSignup,
    });
  }
  return points;
}

export const CHANNELS: Channel[] = [
  {
    id: "linkedin-ads",
    name: "LinkedIn Ads",
    type: "digital",
    iconKey: "Briefcase",
    allocation: 4500,
    spend: 3150,
    reach: 42000,
    signups: 168,
    costPerSignup: 18.75,
    audienceMatch: 72,
    delta7d: -8,
    rationale:
      "Founders and operators live here. Cost per qualified signup trending up.",
    detail:
      "Sponsored content targeting senior titles at companies with 10–250 staff. CPM has crept up 18% over the last fortnight as more advertisers compete for the same ICP.",
    status: "attention",
    audienceBreakdown: [
      { segment: "Founders", score: 82 },
      { segment: "Operators", score: 62 },
      { segment: "Marketers", score: 71 },
      { segment: "Sales", score: 58 },
    ],
    trend: buildTrend("linkedin-ads", 6, 105, true),
  },
  {
    id: "podcast-sponsorship",
    name: "Podcast Sponsorship",
    type: "hybrid",
    iconKey: "Mic",
    allocation: 2500,
    spend: 1750,
    reach: 28000,
    signups: 204,
    costPerSignup: 8.58,
    audienceMatch: 88,
    delta7d: 14,
    rationale:
      "Your audience listens weekly. Strongest channel by cost per signup.",
    detail:
      "Mid-roll reads on three operator-focused shows. Direct-response code adoption is high; downstream activation rate beats LinkedIn by 1.6×.",
    status: "healthy",
    audienceBreakdown: [
      { segment: "Founders", score: 91 },
      { segment: "Operators", score: 86 },
      { segment: "Developers", score: 64 },
      { segment: "Marketers", score: 70 },
    ],
    trend: buildTrend("podcast-sponsorship", 7, 58, false),
  },
  {
    id: "google-search",
    name: "Google Search",
    type: "digital",
    iconKey: "Search",
    allocation: 1500,
    spend: 1050,
    reach: 9400,
    signups: 96,
    costPerSignup: 10.94,
    audienceMatch: 61,
    delta7d: 2,
    rationale: "Captures intent from people actively searching.",
    detail:
      "Brand and high-intent generic terms. Brand traffic converts at 14%, generic at 4%. Quality score 8/10.",
    status: "healthy",
    audienceBreakdown: [
      { segment: "Founders", score: 58 },
      { segment: "Operators", score: 65 },
      { segment: "Marketers", score: 60 },
      { segment: "Sales", score: 61 },
    ],
    trend: buildTrend("google-search", 3.2, 35, true),
  },
  {
    id: "saastr-europa",
    name: "Industry Conference — SaaStr Europa",
    type: "physical",
    iconKey: "Users",
    allocation: 1000,
    spend: 1000,
    reach: 1200,
    signups: 24,
    costPerSignup: 41.67,
    audienceMatch: 85,
    delta7d: 0,
    rationale:
      "High-intent face time with ICP. Higher cost per signup but stronger downstream.",
    detail:
      "Booth plus two speaker dinners. 24 signups already, but 47 tracked conversations are still in qualification — closer to £21 per qualified signup if half convert.",
    status: "attention",
    audienceBreakdown: [
      { segment: "Founders", score: 88 },
      { segment: "Operators", score: 84 },
      { segment: "Marketers", score: 72 },
      { segment: "Finance", score: 68 },
    ],
    trend: buildTrend("saastr-europa", 0.8, 33, false),
  },
  {
    id: "pr-placement",
    name: "PR Placement",
    type: "physical",
    iconKey: "Newspaper",
    allocation: 500,
    spend: 350,
    reach: 14000,
    signups: 12,
    costPerSignup: 29.17,
    audienceMatch: 54,
    delta7d: -3,
    rationale: "Brand credibility, weak on direct attribution.",
    detail:
      "One feature in TechRadar plus two trade outlets. Direct signups are weak; assisted-conversion lift is unmeasured.",
    status: "critical",
    audienceBreakdown: [
      { segment: "Founders", score: 60 },
      { segment: "Operators", score: 55 },
      { segment: "Marketers", score: 51 },
      { segment: "Sales", score: 50 },
    ],
    trend: buildTrend("pr-placement", 0.4, 12, true),
  },
];

export type ChannelLibraryItem = {
  id: string;
  name: string;
  type: ChannelType;
  iconKey: string;
  blurb: string;
};

export const CHANNEL_LIBRARY: ChannelLibraryItem[] = [
  {
    id: "linkedin-ads",
    name: "LinkedIn Ads",
    type: "digital",
    iconKey: "Briefcase",
    blurb: "Reach senior titles by company size and seniority.",
  },
  {
    id: "podcast-sponsorship",
    name: "Podcast Sponsorship",
    type: "hybrid",
    iconKey: "Mic",
    blurb: "Trust-led mid-roll reads on shows your buyers already listen to.",
  },
  {
    id: "google-search",
    name: "Google Search",
    type: "digital",
    iconKey: "Search",
    blurb: "Capture demand the moment someone types your category.",
  },
  {
    id: "twitter-x",
    name: "X (Twitter)",
    type: "digital",
    iconKey: "MessageSquare",
    blurb: "Founder reach when your team can sustain the posting cadence.",
  },
  {
    id: "reddit-ads",
    name: "Reddit Ads",
    type: "digital",
    iconKey: "MessagesSquare",
    blurb: "Subreddit-targeted ads for niche professional audiences.",
  },
  {
    id: "display",
    name: "Programmatic Display",
    type: "digital",
    iconKey: "MonitorPlay",
    blurb: "Cheap reach. Useful only for retargeting in early-stage budgets.",
  },
  {
    id: "ooh",
    name: "Out-of-Home",
    type: "physical",
    iconKey: "Building2",
    blurb: "City-cluster billboards. Drivers have three to five seconds.",
  },
  {
    id: "newsletter",
    name: "Email Newsletter Sponsorship",
    type: "digital",
    iconKey: "Mail",
    blurb: "Curated audiences, easy to measure with promo codes.",
  },
  {
    id: "youtube-preroll",
    name: "YouTube Pre-Roll",
    type: "digital",
    iconKey: "PlaySquare",
    blurb: "Skippable 6–15s spots; works for product demos with motion.",
  },
  {
    id: "affiliate",
    name: "Affiliate / Referral",
    type: "hybrid",
    iconKey: "Handshake",
    blurb: "Pay only on conversion. Slow to spin up, durable once flowing.",
  },
  {
    id: "saastr-europa",
    name: "Industry Conference — SaaStr Europa",
    type: "physical",
    iconKey: "Users",
    blurb: "Two days face-to-face with your ICP. Books up months out.",
  },
  {
    id: "pr-placement",
    name: "PR Placement",
    type: "physical",
    iconKey: "Newspaper",
    blurb: "Editorial credibility. Hard to attribute, easy to over-spend on.",
  },
];

export const STAGE_OPTIONS = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B+",
] as const;

export const AUDIENCE_OPTIONS: AudienceOption[] = [
  "Founders",
  "Operators",
  "Developers",
  "Designers",
  "Marketers",
  "Finance",
  "Sales",
  "Students",
];

export const GOAL_OPTIONS: Goal[] = [
  {
    id: "awareness",
    label: "Brand awareness",
    blurb: "Get remembered by the right people",
  },
  {
    id: "signups",
    label: "User signups",
    blurb: "Bring people to your product",
  },
  {
    id: "conversions",
    label: "Paid conversions",
    blurb: "Turn interest into revenue",
  },
  {
    id: "attendance",
    label: "Event attendance",
    blurb: "Fill a room",
  },
];

export const WORKSPACE = {
  name: "Acme Productivity",
  plan: "Series A SaaS",
  monthlyBudget: 10000,
  currency: "GBP",
  launchedOn: "2026-04-11",
  user: {
    name: "John Doe",
    initials: "JD",
    role: "Marketing Lead",
    firstName: "John",
  },
  audience:
    "Founders and early operators, 25–40, English-speaking, on LinkedIn and podcasts",
  campaign: {
    name: "Q2 Launch — Acme 2.0",
    daysRunning: 14,
    daysTotal: 42,
    spendToDate: 6300,
    signups: 504,
    costPerSignupAvg: 12.5,
    weightedAudienceMatch: 74,
  },
  channels: CHANNELS,
} as const;

export type Workspace = typeof WORKSPACE;

export const CHANNEL_BY_ID: Record<string, Channel> = Object.fromEntries(
  CHANNELS.map((c) => [c.id, c]),
);

export const TYPE_LABEL: Record<ChannelType, string> = {
  digital: "Digital",
  physical: "Physical",
  hybrid: "Hybrid",
};

export const STATUS_LABEL: Record<ChannelStatus, string> = {
  healthy: "On track",
  attention: "Attention",
  critical: "Critical",
};

export const STATUS_COLOUR: Record<ChannelStatus, string> = {
  healthy: "var(--color-accent)",
  attention: "#B45309",
  critical: "var(--color-negative)",
};

// Aggregated trend across all channels (used on the dashboard chart toggles).
export function combinedTrend(metric: "signups" | "spend" | "costPerSignup") {
  const dates = CHANNELS[0].trend.map((p) => p.date);
  return dates.map((date, i) => {
    const row: Record<string, string | number> = { date };
    for (const ch of CHANNELS) {
      row[ch.id] = ch.trend[i][metric];
    }
    return row;
  });
}

export function formatGBP(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatGBPCompact(value: number): string {
  if (value >= 1000) {
    const k = value / 1000;
    return `£${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
  }
  return `£${value}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-GB").format(value);
}
