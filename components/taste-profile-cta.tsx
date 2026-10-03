"use client";

import { useState } from "react";
import { TasteProfileWizard } from "@/components/taste-profile-wizard";
import { useTasteProfile } from "@/lib/taste/use-taste-profile";
import type { TasteCandidate } from "@/lib/taste/types";

const EMPTY_CANDIDATES: TasteCandidate[] = [];

export function TasteProfileCta({
  className = "",
  initialCandidates = EMPTY_CANDIDATES,
  variant = "button",
}: {
  className?: string;
  initialCandidates?: TasteCandidate[];
  variant?: "button" | "line";
}) {
  const { ready } = useTasteProfile();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={className}>
        {variant === "line" ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-sm text-stone-600 underline-offset-2 hover:text-rose-900 hover:underline"
          >
            {ready ? "Tilpasset din smag · Rediger" : "Lav din smagsprofil"}
          </button>
        ) : ready ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white/95 px-3 py-2 text-sm font-medium text-rose-950 shadow-sm hover:border-rose-400 hover:bg-rose-50"
          >
            Rediger smagsprofil
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-800"
          >
            Lav din smagsprofil (30 sek)
          </button>
        )}
      </div>
      <TasteProfileWizard
        open={open}
        onClose={() => setOpen(false)}
        initialCandidates={initialCandidates}
      />
    </>
  );
}
