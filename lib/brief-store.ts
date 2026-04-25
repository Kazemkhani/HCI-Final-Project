"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AudienceOption, Goal } from "@/lib/mock-data";

export type BriefState = {
  stage: "Pre-seed" | "Seed" | "Series A" | "Series B+";
  budget: number;
  audiences: AudienceOption[];
  customAudience: string;
  goal: Goal["id"];
  step: 1 | 2 | 3 | 4;
  launched: boolean;
  setStage: (stage: BriefState["stage"]) => void;
  setBudget: (budget: number) => void;
  toggleAudience: (a: AudienceOption) => void;
  setCustomAudience: (s: string) => void;
  setGoal: (g: Goal["id"]) => void;
  setStep: (s: BriefState["step"]) => void;
  markLaunched: () => void;
  reset: () => void;
};

const DEFAULT: Omit<
  BriefState,
  | "setStage"
  | "setBudget"
  | "toggleAudience"
  | "setCustomAudience"
  | "setGoal"
  | "setStep"
  | "markLaunched"
  | "reset"
> = {
  stage: "Series A",
  budget: 10000,
  audiences: ["Founders", "Operators"],
  customAudience: "",
  goal: "signups",
  step: 1,
  launched: false,
};

export const useBriefStore = create<BriefState>()(
  persist(
    (set) => ({
      ...DEFAULT,
      setStage: (stage) => set({ stage }),
      setBudget: (budget) => set({ budget }),
      toggleAudience: (a) =>
        set((s) => ({
          audiences: s.audiences.includes(a)
            ? s.audiences.filter((x) => x !== a)
            : [...s.audiences, a],
        })),
      setCustomAudience: (s) => set({ customAudience: s }),
      setGoal: (g) => set({ goal: g }),
      setStep: (step) => set({ step }),
      markLaunched: () => set({ launched: true }),
      reset: () => set({ ...DEFAULT }),
    }),
    {
      name: "signal-brief",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
