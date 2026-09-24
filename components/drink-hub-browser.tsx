"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getDrinkImageAlt, getDrinkImagePath } from "@/lib/drink-images";
import type {
  DrinkCardData,
  DrinkHubFilterState,
  DrinkStyleFilter,
  DrinkWineFilter,
} from "@/lib/drink-browse";
import {
  EMPTY_DRINK_HUB_FILTERS,
  buildDrinkHubHref,
  drinkMatchesFilters,
  formatDrinkTotalTime,
  styleFilterLabel,
  wineFilterLabel,
} from "@/lib/drink-browse";
import { difficultyLabel } from "@/lib/recipe-format";

type Props = {
  drinks: DrinkCardData[];
  initialFilters?: DrinkHubFilterState;
  children?: ReactNode;
};

const SELECT_CLASS =
  "w-full min-w-0 appearance-none rounded-xl border border-stone-200 bg-white px-3 py-2.5 pr-9 text-sm text-stone-900 shadow-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200";

const WINE_OPTIONS: DrinkWineFilter[] = ["alle", "bobler", "rod", "hvid", "rose", "port", "sherry"];
const STYLE_OPTIONS: DrinkStyleFilter[] = ["alle", "spritz", "cocktail", "bowle", "varm", "aperitif"];

export function DrinkHubBrowser({
  drinks,
  initialFilters = EMPTY_DRINK_HUB_FILTERS,
  children,
}: Props) {
  const [filters, setFilters] = useState<DrinkHubFilterState>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters.q, initialFilters.wine, initialFilters.style]);

  function updateFilters(next: DrinkHubFilterState) {
    setFilters(next);
    const href = buildDrinkHubHref(next);
    const current = `${window.location.pathname}${window.location.search}`;
    if (window.location.pathname !== "/drinks") return;
    if (current !== href) window.history.replaceState(null, "", href);
  }

  const filtered = useMemo(
    () => drinks.filter((d) => drinkMatchesFilters(d, filters)).sort((a, b) => a.title.localeCompare(b.title, "da")),
    [drinks, filters],
  );

  return (
    <div className="space-y-8">
      {children}

      <section aria-labelledby="alle-drinks-heading" id="alle-drinks">
        <h2 id="alle-drinks-heading" className="sr-only">
          Alle drinks
        </h2>

        <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-stone-50/60 p-4 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="min-w-[12rem] flex-1">
            <label htmlFor="drink-q" className="mb-1.5 block text-xs font-medium text-stone-600">
              Søg
            </label>
            <input
              id="drink-q"
              type="search"
              value={filters.q}
              onChange={(e) => updateFilters({ ...filters, q: e.target.value })}
              placeholder="Aperol, sangria, port…"
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 shadow-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
          <div className="min-w-[9.5rem] flex-1">
            <label htmlFor="drink-wine" className="mb-1.5 block text-xs font-medium text-stone-600">
              Vintype
            </label>
            <div className="relative">
              <select
                id="drink-wine"
                value={filters.wine}
                onChange={(e) =>
                  updateFilters({ ...filters, wine: e.target.value as DrinkWineFilter })
                }
                className={SELECT_CLASS}
              >
                {WINE_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {wineFilterLabel(w)}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-400" aria-hidden>
                ▾
              </span>
            </div>
          </div>
          <div className="min-w-[9.5rem] flex-1">
            <label htmlFor="drink-style" className="mb-1.5 block text-xs font-medium text-stone-600">
              Stil
            </label>
            <div className="relative">
              <select
                id="drink-style"
                value={filters.style}
                onChange={(e) =>
                  updateFilters({ ...filters, style: e.target.value as DrinkStyleFilter })
                }
                className={SELECT_CLASS}
              >
                {STYLE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {styleFilterLabel(s)}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-400" aria-hidden>
                ▾
              </span>
            </div>
          </div>
          {(filters.q || filters.wine !== "alle" || filters.style !== "alle") && (
            <button
              type="button"
              onClick={() => updateFilters(EMPTY_DRINK_HUB_FILTERS)}
              className="rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Nulstil
            </button>
          )}
        </div>

        <p className="mt-4 text-sm text-stone-600">
          Viser {filtered.length} af {drinks.length} drinks
        </p>

        {filtered.length === 0 ? (
          <p className="mt-6 text-stone-600">Ingen drinks matcher filtrene. Prøv at nulstille eller søge bredere.</p>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => {
              const time = formatDrinkTotalTime(d.prepTime, d.cookTime);
              const diff = difficultyLabel(d.difficulty);
              return (
                <li key={d.slug}>
                  <Link
                    href={`/drinks/${d.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-rose-200 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] bg-stone-100">
                      <Image
                        src={getDrinkImagePath(d.slug)}
                        alt={getDrinkImageAlt(d.title)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-base font-semibold text-stone-900 group-hover:text-rose-950">
                        {d.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-stone-600">{d.description}</p>
                      <p className="mt-auto pt-3 text-xs text-stone-500">
                        {[time, diff, d.servings ? `${d.servings} glas` : null].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
