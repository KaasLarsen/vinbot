"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getRecipeImageAlt, getRecipeImagePath } from "@/lib/recipe-images";
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
  wineChipLabel,
  wineFilterLabel,
} from "@/lib/recipe-browse";
import { difficultyLabel, formatTotalTime } from "@/lib/recipe-format";

type Props = {
  recipes: RecipeCardData[];
  initialQuery?: string;
};

const SELECT_CLASS =
  "w-full appearance-none rounded-xl border border-stone-200 bg-white px-3 py-2.5 pr-9 text-sm text-stone-900 shadow-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200";

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
          ? "border-rose-800 bg-rose-900 text-white shadow-sm"
          : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
      }`}
    >
      {children}
    </button>
  );
}

function FilterSelect<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-stone-600">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className={SELECT_CLASS}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-stone-400"
          aria-hidden
        >
          ▾
        </span>
      </div>
    </div>
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

  const tagOptions = useMemo(() => topTagsForRecipes(recipes, 2, 10), [recipes]);
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
    wine !== "alle" ||
    cuisine !== "alle" ||
    difficulty !== "alle" ||
    time !== "alle" ||
    activeTag != null ||
    query.trim().length > 0;

  const cuisineOptions = useMemo(
    () =>
      (["alle", "dansk", "fransk", "italiensk", "spansk", "schweizisk", "andet"] as const).map((c) => ({
        value: c,
        label: c === "alle" ? cuisineFilterLabel(c) : `${cuisineFilterLabel(c)} (${cuisineCounts[c]})`,
      })),
    [cuisineCounts],
  );

  const difficultyOptions = useMemo(
    () =>
      (["alle", "easy", "medium", "hard"] as const).map((d) => ({
        value: d,
        label: difficultyFilterLabel(d),
      })),
    [],
  );

  const timeOptions = useMemo(
    () =>
      (["alle", "hurtig", "mellem", "lang"] as const).map((t) => ({
        value: t,
        label: timeFilterLabel(t),
      })),
    [],
  );

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

      <section
        className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 sm:p-5"
        aria-label="Filtrér opskrifter"
      >
        <div>
          <p className="text-sm font-medium text-stone-700">Vin i retten</p>
          <div className="mt-2 flex flex-wrap gap-2" role="tablist" aria-label="Vin i retten">
            {(["alle", "rod", "hvid", "port"] as const).map((w) => (
              <FilterChip key={w} active={wine === w} onClick={() => setWine(w)}>
                {wineChipLabel(w)}
                <span className={`ml-1 tabular-nums ${wine === w ? "text-rose-200" : "text-stone-400"}`}>
                  ({wineCounts[w]})
                </span>
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <FilterSelect
            id="recipe-filter-cuisine"
            label="Køkken"
            value={cuisine}
            options={cuisineOptions}
            onChange={setCuisine}
          />
          <FilterSelect
            id="recipe-filter-difficulty"
            label="Sværhedsgrad"
            value={difficulty}
            options={difficultyOptions}
            onChange={setDifficulty}
          />
          <FilterSelect
            id="recipe-filter-time"
            label="Tid i gryden"
            value={time}
            options={timeOptions}
            onChange={setTime}
          />
        </div>

        {tagOptions.length > 0 ? (
          <details className="group mt-4 border-t border-stone-200/80 pt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-stone-700 marker:content-none hover:text-rose-900 [&::-webkit-details-marker]:hidden">
              <span>Emner og ingredienser</span>
              <span className="shrink-0 text-xs font-normal text-stone-500">
                {activeTag ? `Valgt: ${activeTag}` : `${tagOptions.length} emner`}
                <span className="ml-2 text-stone-400 group-open:rotate-180 inline-block transition-transform" aria-hidden>
                  ▾
                </span>
              </span>
            </summary>
            <div className="mt-3 flex flex-wrap gap-2">
              <FilterChip active={activeTag === null} onClick={() => setActiveTag(null)}>
                Alle emner
              </FilterChip>
              {tagOptions.map(({ tag, count }) => (
                <FilterChip
                  key={tag}
                  active={activeTag === tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                >
                  <span className="capitalize">{tag}</span>
                  <span className={`ml-1 tabular-nums ${activeTag === tag ? "text-rose-200" : "text-stone-400"}`}>
                    ({count})
                  </span>
                </FilterChip>
              ))}
            </div>
          </details>
        ) : null}

        {hasActiveFilters ? (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-stone-200/80 pt-4">
            <span className="text-xs font-medium uppercase tracking-wide text-stone-500">Aktive filtre</span>
            {query.trim() ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200">
                Søgning: «{query.trim()}»
              </span>
            ) : null}
            {wine !== "alle" ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200">
                {wineFilterLabel(wine)}
              </span>
            ) : null}
            {cuisine !== "alle" ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200">
                {cuisineFilterLabel(cuisine)}
              </span>
            ) : null}
            {difficulty !== "alle" ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200">
                {difficultyFilterLabel(difficulty)}
              </span>
            ) : null}
            {time !== "alle" ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200">
                {timeFilterLabel(time)}
              </span>
            ) : null}
            {activeTag ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium capitalize text-stone-700 ring-1 ring-stone-200">
                {activeTag}
              </span>
            ) : null}
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto text-sm font-medium text-rose-900 hover:underline"
            >
              Nulstil
            </button>
          </div>
        ) : null}
      </section>

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
                  className="group block h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-rose-200 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <Image
                      src={getRecipeImagePath(r.slug)}
                      alt={getRecipeImageAlt(r.title)}
                      fill
                      sizes="(max-width: 640px) 100vw, 384px"
                      className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-5">
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
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
