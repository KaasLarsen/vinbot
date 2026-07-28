"use client";

import { Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

function HomeFeedStripsGateInner({ children }: { children: ReactNode }) {
  const q = useSearchParams().get("q");
  if (q?.trim()) return null;
  return <>{children}</>;
}

/**
 * Skjuler feed-strips ved aktiv søgning (?q=) — samme logik som før, men uden searchParams på serveren.
 * Synkront script i page.tsx sætter data-vinbot-home-q før paint, så der ikke flashes indhold.
 */
export function HomeFeedStripsGate({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <HomeFeedStripsGateInner>{children}</HomeFeedStripsGateInner>
    </Suspense>
  );
}
