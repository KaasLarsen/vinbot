"use client";

import { useEffect, useState, type ReactNode } from "react";

import { hasHomeSearchQuery, subscribeHomeSearchUrl } from "@/lib/home-search-url";

/**
 * Skjuler feed-strips ved aktiv søgning (?q=) — samme logik som før, men uden searchParams på serveren.
 * Synkront script i page.tsx sætter data-vinbot-home-q før paint, så der ikke flashes indhold.
 */
export function HomeFeedStripsGate({ children }: { children: ReactNode }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const sync = () => setHide(hasHomeSearchQuery());
    sync();
    return subscribeHomeSearchUrl(sync);
  }, []);

  if (hide) return null;
  return <>{children}</>;
}
