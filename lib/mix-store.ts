"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CHANNELS } from "@/lib/mock-data";

type Allocations = Record<string, number>;

const initialAllocations: Allocations = Object.fromEntries(
  CHANNELS.map((c) => [c.id, c.allocation]),
);

const MIN_PER_CHANNEL = 100;

export type MixState = {
  allocations: Allocations;
  total: number;
  setAllocation: (id: string, value: number) => void;
  reset: () => void;
};

export const useMixStore = create<MixState>()(
  persist(
    (set, get) => ({
      allocations: initialAllocations,
      total: Object.values(initialAllocations).reduce((a, b) => a + b, 0),
      setAllocation: (id, raw) => {
        const { allocations, total } = get();
        const others = Object.keys(allocations).filter((k) => k !== id);
        const otherTotalCurrent = others.reduce(
          (a, k) => a + allocations[k],
          0,
        );

        // Hard cap: cannot exceed total minus the floor reserved for others.
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
              return [k, Math.max(MIN_PER_CHANNEL, Math.round(remaining * share))];
            }),
          );
        }
        // Re-balance rounding drift onto the largest of the others.
        const drift =
          remaining -
          Object.values(updated).reduce((a, b) => a + b, 0);
        if (drift !== 0 && others.length > 0) {
          const largest = others.reduce((a, b) =>
            updated[a] >= updated[b] ? a : b,
          );
          updated[largest] += drift;
        }
        set({ allocations: { ...updated, [id]: next } });
      },
      reset: () =>
        set({
          allocations: initialAllocations,
          total: Object.values(initialAllocations).reduce((a, b) => a + b, 0),
        }),
    }),
    {
      name: "signal-mix",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
