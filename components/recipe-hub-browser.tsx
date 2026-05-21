"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import type {
  RecipeCardData,
  RecipeCuisineFilter,
  RecipeDifficultyFilter,
  RecipeTimeFilter,
  RecipeWineFilter,
} from "@/lib/recipe-browse";
import {
  classifyRecipeCuisine,
  classifyRecipeTime,
  classifyRecipeWine,
  countRecipesByCuisine,
  countRecipesByWine,
  cuisineFilterLabel,
  difficultyFilterLabel,
  recipeMatchesSearch,
  timeFilterLabel,
  topTagsForRecipes,
  wineBadgeLabel,
  wineFilterLabel,
} from "@/lib/recipe-browse";
import { difficultyLabel, formatTotalTime } from "@/lib/recipe-format";

type Props = {
  recipes: RecipeCardData[];
  initialQuery?: string;
};

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active
          ? "border-rose-800 bg-rose-900 text-white"
          : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
      }`}
    >
      {children}
    </button>
  );
}

export function RecipeHubBrowser({ recipes, initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery.trim());
  const [wine, setWine] = useState<RecipeWineFilter>("alle");
  const [cuisine, setCuisine] = useState<RecipeCuisineFilter>("alle");
  const [difficulty, setDifficulty] = useState<RecipeDifficultyFilter>("alle");
  const [time, setTime] = useState<RecipeTimeFilter>("alle");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    setQuery(initialQuery.trim());
  }, [initialQuery]);

  const tagOptions = useMemo(() => topTagsForRecipes(recipes, 2), [recipes]);
  const wineCounts = useMemo(() => countRecipesByWine(recipes), [recipes]);
  const cuisineCounts = useMemo(() => countRecipesByCuisine(recipes), [recipes]);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (wine !== "alle" && classifyRecipeWine(r.tags) !== wine) return false;
      if (cuisine !== "alle" && classifyRecipeCuisine(r.tags) !== cuisine) return false;
      if (difficulty !== "alle" && r.difficulty !== difficulty) return false;
      if (time !== "alle" && classifyRecipeTime(r.prepTime, r.cookTime) !== time) return false;
      if (activeTag && !(r.tags || []).some((t) => t.toLowerCase() === activeTag)) return false;
      return recipeMatchesSearch(r, query);
    });
  }, [recipes, wine, cuisine, difficulty, time, activeTag, query]);

  const hasActiveFilters =
    wine !== "alle" || cuisine !== "alle" || difficulty !== "alle" || time !== "alle" || activeTag != null || query.trim().length > 0;

  function clearFilters() {
    setQuery("");
    setWine("alle");
    setCuisine("alle");
    setDifficulty("alle");
    setTime("alle");
    setActiveTag(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <label htmlFor="recipe-hub-search" className="sr-only">
            Søg i opskrifter
          </label>
          <input
            id="recipe-hub-search"
            type="search"
            autoComplete="off"
            placeholder="Søg efter ret, køkken, kød, fisk…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <p className="shrink-0 text-sm text-stone-600">
          Viser <span className="font-medium text-stone-800">{filtered.length}</span> af {recipes.length}
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">Vin i retten</p>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Vin i retten">
          {(["alle", "rod", "hvid", "port"] as const).map((w) => (
            <FilterChip key={w} active={wine === w} onClick={() => setWine(w)}>
              {wineFilterLabel(w)}
              <span className={`ml-1 tabular-nums ${wine === w ? "text-rose-200" : "text-stone-400"}`}>
                ({wineCounts[w]})
              </span>
            </FilterChip>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">Køkken</p>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Køkken">
          {(["alle", "dansk", "fransk", "italiensk", "spansk", "schweizisk", "andet"] as const).map((c) => (
            <FilterChip key={c} active={cuisine === c} onClick={() => setCuisine(c)}>
              {cuisineFilterLabel(c)}
              <span className={`ml-1 tabular-nums ${cuisine === c ? "text-rose-200" : "text-stone-400"}`}>
                ({cuisineCounts[c]})
              </span>
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">Sværhedsgrad</p>
          <div className="flex flex-wrap gap-2">
            {(["alle", "easy", "medium", "hard"] as const).map((d) => (
              <FilterChip key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>
                {difficultyFilterLabel(d)}
              </FilterChip>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">Tid i gryden</p>
          <div className="flex flex-wrap gap-2">
            {(["alle", "hurtig", "mellem", "lang"] as const).map((t) => (
              <FilterChip key={t} active={time === t} onClick={() => setTime(t)}>
                {timeFilterLabel(t)}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {tagOptions.length > 0 ? (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">Emner</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                activeTag === null
                  ? "border-stone-600 bg-stone-800 text-white"
                  : "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100"
              }`}
            >
              Alle emner
            </button>
            {tagOptions.map(({ tag, count }) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize transition ${
                  activeTag === tag
                    ? "border-rose-700 bg-rose-50 text-rose-950"
                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                }`}
              >
                {tag}
                <span className="ml-0.5 text-stone-400">({count})</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {hasActiveFilters ? (
        <p className="text-sm text-stone-600">
          <button type="button" onClick={clearFilters} className="font-medium text-rose-900 hover:underline">
            Nulstil filtre
          </button>
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-200 bg-stone-50 px-4 py-8 text-center text-stone-600">
          Ingen opskrifter matcher filtrene. Prøv at fjerne et filter eller søg på noget andet.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((r) => {
            const wineType = classifyRecipeWine(r.tags);
            const cuisineType = classifyRecipeCuisine(r.tags);
            const totalTime = formatTotalTime(r.prepTime, r.cookTime);
            const diff = difficultyLabel(r.difficulty);
            return (
              <li key={r.slug}>
                <Link
                  href={`/opskrifter/${r.slug}`}
                  className="block h-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-rose-200 hover:shadow-md"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-md bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-900">
                      {wineBadgeLabel(wineType)}
                    </span>
                    {cuisineType !== "andet" ? (
                      <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700">
                        {cuisineFilterLabel(cuisineType)}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-stone-900">{r.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-stone-600">{r.description}</p>
                  <p className="mt-3 text-xs text-stone-500">
                    {[
                      r.servings ? `${r.servings} pers.` : null,
                      totalTime ? `ca. ${totalTime}` : null,
                      diff,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
