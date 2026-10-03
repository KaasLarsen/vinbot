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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-stone-500 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
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

  const foodOpen = open === "food";
  const searchOpen = open === "search";

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={foodOpen}
        aria-controls="home-food-picker"
        onClick={() => toggle("food")}
        className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3.5 text-left shadow-md ring-1 ring-rose-200/50 transition hover:bg-white hover:ring-rose-300/70 sm:px-5"
      >
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-stone-900 sm:text-base">
            Hvad skal du spise?
          </span>
          <span className="mt-0.5 block text-xs text-stone-600 sm:text-sm">
            Vælg ret og budget — få tre flasker hos danske forhandlere
          </span>
        </span>
        <Chevron open={foodOpen} />
      </button>

      {foodOpen ? (
        <div
          id="home-food-picker"
          className="mt-3 max-w-3xl rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg ring-1 ring-rose-200/50 sm:p-5"
        >
          <FoodWinePicker />
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <HomeLabelScanButton />
        <button
          type="button"
          aria-expanded={searchOpen}
          aria-controls="home-wine-search"
          onClick={() => toggle("search")}
          className={`font-medium underline-offset-2 hover:text-rose-900 hover:underline ${
            searchOpen ? "text-rose-900" : "text-stone-700"
          }`}
        >
          Søg flaske, drue eller budget
        </button>
      </div>

      {searchOpen ? (
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
