"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getRecipeImageAlt, getRecipeImagePath } from "@/lib/recipe-images";
import type {
  RecipeCardData,
  RecipeCuisineFilter,
  RecipeDifficultyFilter,
  RecipeRoleFilter,
  RecipeTimeFilter,
  RecipeWineFilter,
} from "@/lib/recipe-browse";
import {
  classifyRecipeCuisine,
  classifyRecipeTime,
  classifyRecipeWine,
  countRecipesByCuisine,
  countRecipesByRole,
  countRecipesByWine,
  cuisineFilterLabel,
  difficultyFilterLabel,
  recipeMatchesSearch,
  recipeRoleLabel,
  roleFilterLabel,
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

const SELECT_CLASS =
  "w-full min-w-0 appearance-none rounded-xl border border-stone-200 bg-white px-3 py-2.5 pr-9 text-sm text-stone-900 shadow-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200";

const ROLE_CHIP_CLASS =
  "rounded-xl border px-3.5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200";

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
    <div className="min-w-[9.5rem] flex-1">
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
  const [role, setRole] = useState<RecipeRoleFilter>("alle");
  const [wine, setWine] = useState<RecipeWineFilter>("alle");
  const [cuisine, setCuisine] = useState<RecipeCuisineFilter>("alle");
  const [difficulty, setDifficulty] = useState<RecipeDifficultyFilter>("alle");
  const [time, setTime] = useState<RecipeTimeFilter>("alle");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    setQuery(initialQuery.trim());
  }, [initialQuery]);

  const tagOptions = useMemo(() => topTagsForRecipes(recipes, 2, 10), [recipes]);
  const roleCounts = useMemo(() => countRecipesByRole(recipes), [recipes]);
  const wineCounts = useMemo(() => countRecipesByWine(recipes), [recipes]);
  const cuisineCounts = useMemo(() => countRecipesByCuisine(recipes), [recipes]);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (role !== "alle" && r.recipeRole !== role) return false;
      if (wine !== "alle" && classifyRecipeWine(r.tags) !== wine) return false;
      if (cuisine !== "alle" && classifyRecipeCuisine(r.tags) !== cuisine) return false;
      if (difficulty !== "alle" && r.difficulty !== difficulty) return false;
      if (time !== "alle" && classifyRecipeTime(r.prepTime, r.cookTime) !== time) return false;
      if (activeTag && !(r.tags || []).some((t) => t.toLowerCase() === activeTag)) return false;
      return recipeMatchesSearch(r, query);
    });
  }, [recipes, role, wine, cuisine, difficulty, time, activeTag, query]);

  const hasActiveFilters =
    role !== "alle" ||
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

  const wineOptions = useMemo(
    () =>
      (["alle", "rod", "hvid", "port"] as const).map((w) => ({
        value: w,
        label: w === "alle" ? wineFilterLabel(w) : `${wineFilterLabel(w)} (${wineCounts[w]})`,
      })),
    [wineCounts],
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

  const tagSelectOptions = useMemo(
    () => [
      { value: "alle", label: "Alle emner" },
      ...tagOptions.map(({ tag, count }) => ({
        value: tag,
        label: `${tag.charAt(0).toUpperCase()}${tag.slice(1)} (${count})`,
      })),
    ],
    [tagOptions],
  );

  const roleOptions = useMemo(
    () =>
      (["alle", "cooking", "pairing"] as const).map((r) => ({
        value: r,
        label: `${roleFilterLabel(r)} (${roleCounts[r]})`,
      })),
    [roleCounts],
  );

  function clearFilters() {
    setQuery("");
    setRole("alle");
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

      <div role="group" aria-label="Opskriftstype" className="flex flex-wrap gap-2">
        {roleOptions.map((o) => {
          const active = role === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => setRole(o.value)}
              className={
                active
                  ? `${ROLE_CHIP_CLASS} border-rose-300 bg-rose-50 text-rose-950`
                  : `${ROLE_CHIP_CLASS} border-stone-200 bg-white text-stone-700 hover:border-rose-200 hover:bg-rose-50/50`
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-end gap-3" aria-label="Filtrér opskrifter">
        <FilterSelect
          id="recipe-filter-wine"
          label="Vintype"
          value={wine}
          options={wineOptions}
          onChange={setWine}
        />
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
          label="Tid"
          value={time}
          options={timeOptions}
          onChange={setTime}
        />
        {tagOptions.length > 0 ? (
          <FilterSelect
            id="recipe-filter-tag"
            label="Emne"
            value={activeTag ?? "alle"}
            options={tagSelectOptions}
            onChange={(value) => setActiveTag(value === "alle" ? null : value)}
          />
        ) : null}
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="shrink-0 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-rose-900 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
          >
            Nulstil
          </button>
        ) : null}
      </div>

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
            const isPairing = r.recipeRole === "pairing";
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
                      <span
                        className={
                          isPairing
                            ? "rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-900"
                            : "rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-900"
                        }
                      >
                        {recipeRoleLabel(r.recipeRole)}
                      </span>
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
