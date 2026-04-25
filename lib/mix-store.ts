"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CHANNELS } from "@/lib/mock-data";

type Allocations = Record<string, number>;

const MIN_PER_CHANNEL = 100;

const INITIAL_ALLOCATIONS: Allocations = Object.fromEntries(
  CHANNELS.map((c) => [c.id, c.allocation]),
);

const INITIAL_TOTAL = Object.values(INITIAL_ALLOCATIONS).reduce(
  (a, b) => a + b,
  0,
);

function totalOf(allocations: Allocations): number {
  return Object.values(allocations).reduce((a, b) => a + b, 0);
}

export type MixState = {
  allocations: Allocations;
  setAllocation: (id: string, value: number) => void;
  scaleTo: (newTotal: number) => void;
  reset: () => void;
};

export const useMixStore = create<MixState>()(
  persist(
    (set, get) => ({
      allocations: INITIAL_ALLOCATIONS,
      setAllocation: (id, raw) => {
        const { allocations } = get();
        const total = totalOf(allocations);
        const others = Object.keys(allocations).filter((k) => k !== id);
        const otherTotalCurrent = others.reduce(
          (a, k) => a + allocations[k],
          0,
        );

        const maxForId = Math.max(
          MIN_PER_CHANNEL,
          total - others.length * MIN_PER_CHANNEL,
        );
        const next = Math.max(MIN_PER_CHANNEL, Math.min(raw, maxForId));
        const remaining = total - next;

        let updated: Allocations;
        if (otherTotalCurrent === 0) {
          const each = Math.round(remaining / others.length);
          updated = Object.fromEntries(others.map((k) => [k, each]));
        } else {
          updated = Object.fromEntries(
            others.map((k) => {
              const share = allocations[k] / otherTotalCurrent;
              return [
                k,
                Math.max(MIN_PER_CHANNEL, Math.round(remaining * share)),
              ];
            }),
          );
        }
        const drift =
          remaining - Object.values(updated).reduce((a, b) => a + b, 0);
        if (drift !== 0 && others.length > 0) {
          const largest = others.reduce((a, b) =>
            updated[a] >= updated[b] ? a : b,
          );
          updated[largest] += drift;
        }
        set({ allocations: { ...updated, [id]: next } });
      },
      scaleTo: (newTotal) => {
        if (newTotal <= 0) return;
        const { allocations } = get();
        const currentTotal = totalOf(allocations);
        if (currentTotal === newTotal) return;

        const ratio = newTotal / currentTotal;
        const ids = Object.keys(allocations);
        const scaled: Allocations = Object.fromEntries(
          ids.map((id) => [
            id,
            Math.max(MIN_PER_CHANNEL, Math.round(allocations[id] * ratio)),
          ]),
        );
        // Reconcile rounding drift onto the largest channel.
        const drift = newTotal - totalOf(scaled);
        if (drift !== 0) {
          const largest = ids.reduce((a, b) =>
            scaled[a] >= scaled[b] ? a : b,
          );
          scaled[largest] += drift;
        }
        set({ allocations: scaled });
      },
      reset: () =>
        set({
          allocations: INITIAL_ALLOCATIONS,
        }),
    }),
    {
      name: "signal-mix",
      version: 3,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useMixTotal(): number {
  return useMixStore((s) => totalOf(s.allocations));
}

export { INITIAL_TOTAL, MIN_PER_CHANNEL };
