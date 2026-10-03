"use client";

import { useEffect, useState } from "react";
import { FoodWinePicker } from "@/components/food-wine-picker";
import { HomeLabelScanButton } from "@/components/home-label-scan-button";
import { HomeWineSearch } from "@/components/home-wine-search";
import { hasHomeSearchQuery, subscribeHomeSearchUrl } from "@/lib/home-search-url";

type Panel = "food" | "search" | null;

function panelFromLocation(): Panel {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  if (hasHomeSearchQuery() || window.location.hash === "#home-wine-search") return "search";
  if (params.get("mad")) return "food";
  return null;
}

/** Sekundære indgange under AI-bjælken. Foldet sammen, medmindre URL peger på mad eller søgning. */
export function HomeHeroSecondary({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<Panel>(null);

  useEffect(() => {
    setOpen(panelFromLocation());
    return subscribeHomeSearchUrl(() => {
      if (hasHomeSearchQuery() || window.location.hash === "#home-wine-search") {
        setOpen("search");
      }
    });
  }, []);

  function toggle(panel: Exclude<Panel, null>) {
    setOpen((current) => (current === panel ? null : panel));
  }

  const linkClass = (active: boolean) =>
    `font-medium underline-offset-2 hover:text-rose-900 hover:underline ${
      active ? "text-rose-900" : "text-stone-700"
    }`;

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <button
          type="button"
          aria-expanded={open === "food"}
          aria-controls="home-food-picker"
          onClick={() => toggle("food")}
          className={linkClass(open === "food")}
        >
          Hvad skal du spise?
        </button>
        <HomeLabelScanButton />
        <button
          type="button"
          aria-expanded={open === "search"}
          aria-controls="home-wine-search"
          onClick={() => toggle("search")}
          className={linkClass(open === "search")}
        >
          Søg flaske, drue eller budget
        </button>
      </div>

      {open === "food" ? (
        <div
          id="home-food-picker"
          className="mt-4 max-w-3xl rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg ring-1 ring-rose-200/50 sm:p-5"
        >
          <FoodWinePicker />
        </div>
      ) : null}

      {open === "search" ? (
        <div className="relative z-10 mt-4 max-w-xl">
          <HomeWineSearch
            controlsClassName="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm"
            resultsClassName="mt-3 rounded-xl border border-white/80 bg-white/95 p-4 shadow-sm sm:p-5"
          />
        </div>
      ) : null}
    </div>
  );
}
