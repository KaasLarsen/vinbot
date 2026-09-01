"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import type { ProductHit } from "@/lib/search/types";
import {
  FOOD_PICKER_BUDGETS,
  foodPickerSearchHref,
  getFoodPickerBudget,
  getFoodPickerDish,
  type FoodPickerBudgetId,
} from "@/lib/food-picker/dishes";
import { dishesForMoment, getHomeMoment } from "@/lib/home-moment";

type ApiResponse = { source: string; products: ProductHit[] };

type FoodWinePickerProps = {
  heading?: string;
  intro?: string;
  initialDishId?: string | null;
  syncUrl?: boolean;
  className?: string;
};

function readUrlPicker(): { mad: string | null; budget: string | null } {
  if (typeof window === "undefined") return { mad: null, budget: null };
  const params = new URLSearchParams(window.location.search);
  return { mad: params.get("mad"), budget: params.get("budget") };
}

function writeUrlPicker(mad: string | null, budget: string | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (mad) url.searchParams.set("mad", mad);
  else url.searchParams.delete("mad");
  if (budget) url.searchParams.set("budget", budget);
  else url.searchParams.delete("budget");
  const next = `${url.pathname}${url.search}${url.hash}`;
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== next) {
    window.history.replaceState(null, "", next);
  }
}

export function FoodWinePicker({
  heading = "Hvad skal du spise i aften?",
  intro = "Klik på retten og budgettet — så finder Vinbot tre flasker, der er til salg hos danske forhandlere lige nu.",
  initialDishId = null,
  syncUrl = true,
  className = "",
}: FoodWinePickerProps) {
  const [dishId, setDishId] = useState<string | null>(initialDishId);
  const [budgetId, setBudgetId] = useState<FoodPickerBudgetId | null>(null);
  const [products, setProducts] = useState<ProductHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!syncUrl) {
      if (initialDishId) setDishId(initialDishId);
      return;
    }
    const fromUrl = readUrlPicker();
    setDishId(fromUrl.mad && getFoodPickerDish(fromUrl.mad) ? fromUrl.mad : initialDishId);
    const b = getFoodPickerBudget(fromUrl.budget);
    if (b) setBudgetId(b.id);
  }, [initialDishId, syncUrl]);

  const dish = getFoodPickerDish(dishId);
  const budget = getFoodPickerBudget(budgetId);

  const runSearch = useCallback(async (nextDishId: string, nextBudgetId: FoodPickerBudgetId) => {
    const d = getFoodPickerDish(nextDishId);
    const b = getFoodPickerBudget(nextBudgetId);
    if (!d || !b) return;
    setLoading(true);
    setFailed(false);
    setHasSearched(true);
    try {
      const params = new URLSearchParams({ q: d.searchQuery });
      if (b.max != null) params.set("max", String(b.max));
      if (b.min != null) params.set("min", String(b.min));
      const r = await fetch(`/api/search?${params.toString()}`);
      const json = (await r.json()) as ApiResponse;
      setProducts((json.products || []).slice(0, 3));
    } catch {
      setFailed(true);
      setProducts([]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  useEffect(() => {
    if (dishId && budgetId) void runSearch(dishId, budgetId);
  }, [dishId, budgetId, runSearch]);

  function pickDish(id: string) {
    setDishId(id);
    if (syncUrl) writeUrlPicker(id, budgetId);
  }

  function pickBudget(id: FoodPickerBudgetId) {
    setBudgetId(id);
    if (syncUrl) writeUrlPicker(dishId, id);
  }

  const searchHref = dish && budget ? foodPickerSearchHref(dish, budget) : "/";
  const dishes = dishesForMoment(getHomeMoment());

  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/90">Vin til maden</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">{heading}</h2>
      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-stone-700">{intro}</p>

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-stone-500">1. Hvad skal du spise?</p>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {dishes.map((d) => {
          const selected = d.id === dishId;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => pickDish(d.id)}
              className={`flex min-h-[4.5rem] flex-col items-center justify-center rounded-2xl border px-2 py-2.5 text-center shadow-sm transition ${
                selected
                  ? "border-rose-800 bg-rose-900 text-white ring-2 ring-rose-300"
                  : "border-stone-200/90 bg-white/95 text-stone-800 hover:border-rose-300 hover:bg-rose-50"
              }`}
            >
              <span className="text-xl leading-none" aria-hidden>
                {d.emoji}
              </span>
              <span className="mt-1 text-[11px] font-semibold leading-tight sm:text-xs">{d.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-stone-500">2. Hvad er dit budget?</p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {FOOD_PICKER_BUDGETS.map((b) => {
          const selected = b.id === budgetId;
          const disabled = !dishId;
          return (
            <button
              key={b.id}
              type="button"
              disabled={disabled}
              onClick={() => pickBudget(b.id)}
              className={`rounded-2xl border px-4 py-3 text-left shadow-sm transition ${
                disabled
                  ? "cursor-not-allowed border-stone-200 bg-stone-50 text-stone-400"
                  : selected
                    ? "border-rose-800 bg-rose-900 text-white ring-2 ring-rose-300"
                    : "border-stone-200/90 bg-white/95 text-stone-800 hover:border-rose-300 hover:bg-rose-50"
              }`}
            >
              <span className="block text-sm font-semibold">{b.label}</span>
              <span className={`mt-0.5 block text-xs ${selected && !disabled ? "text-rose-100" : "text-stone-500"}`}>
                {b.hint}
              </span>
            </button>
          );
        })}
      </div>

      <div id="vin-til-mad" ref={resultsRef} className="scroll-mt-24">
        {hasSearched && dish && budget ? (
          <section
            aria-live="polite"
            className="mt-5 rounded-2xl border border-stone-200/90 bg-white/95 p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900 sm:text-lg">
                  Tre flasker til {dish.label.toLowerCase()} · {budget.label.toLowerCase()}
                </h3>
                <p className="mt-0.5 text-sm text-stone-600">{budget.hint} · priser og lager hos forhandleren.</p>
              </div>
              <Link
                href={searchHref}
                className="hidden shrink-0 text-sm font-medium text-rose-900 hover:underline sm:inline"
              >
                Se flere forslag →
              </Link>
            </div>

            {loading ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-3" aria-busy="true">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-56 animate-pulse rounded-2xl border border-stone-200 bg-stone-50" />
                ))}
              </div>
            ) : failed || products.length === 0 ? (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-stone-800">
                <p>
                  Vi har ikke en specifik flaske på lager i det prisbånd lige nu, men snup en {dish.fallbackStyle} til
                  din {dish.label.toLowerCase()}.
                </p>
                <p className="mt-2">
                  <Link href={`/guides/${dish.guideSlug}`} className="font-semibold text-rose-900 hover:underline">
                    Læs guiden
                  </Link>
                  {" · "}
                  <Link href={searchHref} className="font-semibold text-rose-900 hover:underline">
                    Søg alligevel
                  </Link>
                </p>
              </div>
            ) : (
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {products.map((p, i) => (
                  <li key={`${p.url}-${i}`}>
                    <ProductCard product={p} placement="food-picker" />
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-3 text-xs text-stone-500">
              Annoncelinks: vi kan modtage provision — det koster dig ikke ekstra.{" "}
              <Link href={searchHref} className="font-medium text-rose-900 hover:underline sm:hidden">
                Se flere →
              </Link>
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
