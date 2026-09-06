"use client";

import { useEffect, useState } from "react";

import { WineSearch } from "@/components/wine-search";

type HomeWineSearchProps = {
  controlsClassName?: string;
  resultsClassName?: string;
};

export const HOME_WINE_SEARCH_EVENT = "vinbot:home-search";

function readUrlSearch(): { q?: string; initialMax?: number } {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") ?? undefined;
  const maxRaw = params.get("max");
  const parsedMax = maxRaw != null ? parseInt(maxRaw, 10) : Number.NaN;
  const initialMax = Number.isFinite(parsedMax) ? parsedMax : undefined;
  return { q, initialMax };
}

function scrollHomeSearchIntoView() {
  if (typeof document === "undefined") return;
  if (window.location.hash !== "#home-wine-search") return;
  requestAnimationFrame(() => {
    document.getElementById("home-wine-search")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

/** Læser ?q= og ?max= på klienten så forsiden kan caches statisk uden searchParams på serveren. */
export function HomeWineSearch({ controlsClassName, resultsClassName }: HomeWineSearchProps) {
  const [urlSearch, setUrlSearch] = useState<{ q?: string; initialMax?: number }>({});

  useEffect(() => {
    const sync = () => {
      setUrlSearch(readUrlSearch());
      scrollHomeSearchIntoView();
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener(HOME_WINE_SEARCH_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(HOME_WINE_SEARCH_EVENT, sync);
    };
  }, []);

  return (
    <div id="home-wine-search">
      <WineSearch
        initialQuery={urlSearch.q}
        initialMax={urlSearch.initialMax}
        controlsClassName={controlsClassName}
        resultsClassName={resultsClassName}
      />
    </div>
  );
}
