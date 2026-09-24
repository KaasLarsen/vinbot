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
  DRINK_HUB_CLASSICS,
  DRINK_HUB_INTENTS,
  EMPTY_DRINK_HUB_FILTERS,
  buildDrinkHubHref,
  classifyDrinkStyle,
  drinkHubIntentIsActive,
  drinkMatchesFilters,
  drinkStyleBadgeClass,
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

const STYLE_CHIP_CLASS =
  "rounded-xl border px-3.5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200";

const INTENT_CHIP_CLASS =
  "rounded-2xl border px-3.5 py-2.5 text-left text-sm shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200";

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

  function clearFilters() {
    updateFilters(EMPTY_DRINK_HUB_FILTERS);
  }

  function applyIntent(intent: (typeof DRINK_HUB_INTENTS)[number]) {
    const active = drinkHubIntentIsActive(intent, filters);
    if (active) {
      clearFilters();
      return;
    }
    const next: DrinkHubFilterState = {
      ...EMPTY_DRINK_HUB_FILTERS,
      ...intent.filters,
      q: intent.filters.q ?? "",
      wine: intent.filters.wine ?? "alle",
      style: intent.filters.style ?? "alle",
    };
    updateFilters(next);
    if (typeof document !== "undefined") {
      document.getElementById("alle-drinks")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const filtered = useMemo(
    () => drinks.filter((d) => drinkMatchesFilters(d, filters)).sort((a, b) => a.title.localeCompare(b.title, "da")),
    [drinks, filters],
  );

  const hasActiveFilters =
    filters.q.trim().length > 0 || filters.wine !== "alle" || filters.style !== "alle";

  return (
    <div className="space-y-8">
      <section
        className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 sm:p-5"
        aria-labelledby="drink-intent-heading"
      >
        <h2 id="drink-intent-heading" className="text-lg font-semibold text-stone-900">
          Hvad leder du efter?
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Vælg et spor — så filtrerer vi listen. Du kan stadig søge og finjustere nedenfor.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {DRINK_HUB_INTENTS.map((intent) => {
            const active = drinkHubIntentIsActive(intent, filters);
            return (
              <li key={intent.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => applyIntent(intent)}
                  className={
                    active
                      ? `${INTENT_CHIP_CLASS} w-full border-rose-300 bg-white text-rose-950 ring-1 ring-rose-200`
                      : `${INTENT_CHIP_CLASS} w-full border-stone-200/90 bg-white text-stone-800 hover:border-rose-300 hover:bg-rose-50`
                  }
                >
                  <span className="font-semibold">{intent.label}</span>
                  <span className="mt-0.5 block text-xs font-normal text-stone-500">{intent.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {children}

      <section aria-labelledby="alle-drinks-heading" id="alle-drinks">
        <h2 id="alle-drinks-heading" className="text-xl font-semibold tracking-tight text-stone-900">
          Alle drinks
        </h2>
        <p className="mt-1 text-sm text-stone-600">Søg, filtrér efter vintype og stil — eller browse hele kataloget.</p>

        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-stone-50/60 p-4 sm:flex-row sm:flex-wrap sm:items-end">
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
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm font-medium text-rose-900 shadow-sm hover:border-rose-300 hover:bg-rose-50"
            >
              Nulstil
            </button>
          )}
        </div>

        <div role="group" aria-label="Stil" className="mt-4 flex flex-wrap gap-2">
          {STYLE_OPTIONS.map((s) => {
            const active = filters.style === s;
            return (
              <button
                key={s}
                type="button"
                aria-pressed={active}
                onClick={() => updateFilters({ ...filters, style: s })}
                className={
                  active
                    ? `${STYLE_CHIP_CLASS} border-rose-300 bg-rose-50 text-rose-950`
                    : `${STYLE_CHIP_CLASS} border-stone-200 bg-white text-stone-700 hover:border-rose-200 hover:bg-rose-50/50`
                }
              >
                {styleFilterLabel(s)}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-stone-600">
          Viser <span className="font-medium text-stone-800">{filtered.length}</span> af {drinks.length} drinks
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-stone-200 bg-stone-50 px-4 py-8 text-center">
            <p className="text-stone-600">Ingen drinks matcher filtrene. Prøv at nulstille eller søge bredere.</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-rose-900 shadow-sm hover:border-rose-300 hover:bg-rose-50"
                >
                  Nulstil filtre
                </button>
              ) : null}
              <ul className="flex flex-wrap justify-center gap-2">
                {DRINK_HUB_CLASSICS.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block rounded-full border border-stone-200 bg-white px-3 py-1 text-sm font-medium text-rose-900 hover:border-rose-300 hover:bg-rose-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => {
              const time = formatDrinkTotalTime(d.prepTime, d.cookTime);
              const diff = difficultyLabel(d.difficulty);
              const style = classifyDrinkStyle(d.tags);
              return (
                <li key={d.slug}>
                  <Link
                    href={`/drinks/${d.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-rose-200 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <Image
                        src={getDrinkImagePath(d.slug)}
                        alt={getDrinkImageAlt(d.title)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <span className={drinkStyleBadgeClass(style)}>{styleFilterLabel(style)}</span>
                      <h3 className="mt-2 text-base font-semibold text-stone-900 group-hover:text-rose-950">
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
