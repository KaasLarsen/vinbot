"use client";

import { useEffect, useState } from "react";

import { WineSearch } from "@/components/wine-search";
import {
  HOME_WINE_SEARCH_EVENT,
  readHomeSearchUrl,
  subscribeHomeSearchUrl,
} from "@/lib/home-search-url";

type HomeWineSearchProps = {
  controlsClassName?: string;
  resultsClassName?: string;
};

export { HOME_WINE_SEARCH_EVENT };

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
  // Læs URL synkront ved første klient-render (hard reload efter etiket-scan).
  const [urlSearch, setUrlSearch] = useState<{ q?: string; initialMax?: number }>(() =>
    typeof window !== "undefined" ? readHomeSearchUrl() : {},
  );

  useEffect(() => {
    const sync = () => {
      setUrlSearch(readHomeSearchUrl());
      scrollHomeSearchIntoView();
    };
    sync();
    return subscribeHomeSearchUrl(sync);
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
