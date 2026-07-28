"use client";

import { useEffect, useState, type ReactNode } from "react";

function hasUrlQuery(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(new URLSearchParams(window.location.search).get("q")?.trim());
}

/**
 * Skjuler feed-strips ved aktiv søgning (?q=) — samme logik som før, men uden searchParams på serveren.
 * Synkront script i page.tsx sætter data-vinbot-home-q før paint, så der ikke flashes indhold.
 */
export function HomeFeedStripsGate({ children }: { children: ReactNode }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(hasUrlQuery());
  }, []);

  if (hide) return null;
  return <>{children}</>;
}
