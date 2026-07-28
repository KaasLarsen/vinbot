"use client";

import { useEffect, useState, type ReactNode } from "react";

import { WineSearch } from "@/components/wine-search";

type HomeWineSearchProps = {
  controlsClassName?: string;
  resultsClassName?: string;
};

function readUrlSearch(): { q?: string; initialMax?: number } {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") ?? undefined;
  const maxRaw = params.get("max");
  const parsedMax = maxRaw != null ? parseInt(maxRaw, 10) : Number.NaN;
  const initialMax = Number.isFinite(parsedMax) ? parsedMax : undefined;
  return { q, initialMax };
}

/** Læser ?q= og ?max= på klienten så forsiden kan caches statisk uden searchParams på serveren. */
export function HomeWineSearch({ controlsClassName, resultsClassName }: HomeWineSearchProps) {
  const [urlSearch, setUrlSearch] = useState<{ q?: string; initialMax?: number }>({});

  useEffect(() => {
    setUrlSearch(readUrlSearch());
  }, []);

  return (
    <WineSearch
      initialQuery={urlSearch.q}
      initialMax={urlSearch.initialMax}
      controlsClassName={controlsClassName}
      resultsClassName={resultsClassName}
    />
  );
}
