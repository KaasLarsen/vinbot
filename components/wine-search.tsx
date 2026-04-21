"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProductHit, SearchMeta } from "@/lib/search/types";
import { ProductCard } from "@/components/product-card";

type Chip = { label: string; q: string; max?: number };

const ALL_CHIPS: Chip[] = [
  { label: "Julemad", q: "julemad rødvin" },
  { label: "Nytår", q: "nytår champagne bobler" },
  { label: "Fisk", q: "fisk hvidvin" },
  { label: "Tapas", q: "tapas rioja" },
  { label: "Hygge", q: "hygge rødvin" },
  { label: "Romantisk", q: "romantisk middag pinot" },
  { label: "Grill", q: "grill malbec" },
  { label: "Sommer", q: "rosé sommer" },
  { label: "Påske", q: "påske hvidvin riesling" },
  { label: "Forår", q: "forår rosé sauvignon blanc" },
  { label: "Efterår", q: "efterår rødvin" },
  { label: "Under 150 kr", q: "vin", max: 150 },
];

/** Vælg chips ud fra måned (0-indexed). Rækkefølgen afgør hvad brugeren ser først. */
function seasonalChips(monthIndex: number): Chip[] {
  const pick = (...labels: string[]) =>
    labels
      .map((l) => ALL_CHIPS.find((c) => c.label === l))
      .filter((c): c is Chip => Boolean(c));

  switch (monthIndex) {
    case 0:
    case 1:
      return pick("Hygge", "Romantisk", "Fisk", "Tapas", "Under 150 kr");
    case 2:
      return pick("Forår", "Påske", "Fisk", "Romantisk", "Under 150 kr");
    case 3:
      return pick("Forår", "Påske", "Sommer", "Romantisk", "Fisk", "Under 150 kr");
    case 4:
    case 5:
      return pick("Sommer", "Grill", "Fisk", "Romantisk", "Under 150 kr");
    case 6:
    case 7:
      return pick("Sommer", "Grill", "Fisk", "Tapas", "Under 150 kr");
    case 8:
      return pick("Efterår", "Grill", "Hygge", "Tapas", "Under 150 kr");
    case 9:
      return pick("Efterår", "Hygge", "Romantisk", "Tapas", "Under 150 kr");
    case 10:
      return pick("Hygge", "Efterår", "Romantisk", "Julemad", "Under 150 kr");
    case 11:
      return pick("Julemad", "Nytår", "Hygge", "Romantisk", "Under 150 kr");
    default:
      return pick("Hygge", "Fisk", "Tapas", "Romantisk", "Under 150 kr");
  }
}

function seasonalPlaceholder(monthIndex: number): string {
  switch (monthIndex) {
    case 2:
    case 3:
      return "Fx påskefrokost, rosé, lam, hvidvin…";
    case 4:
    case 5:
    case 6:
    case 7:
      return "Fx grill, rosé, sommer, fisk, tapas…";
    case 8:
    case 9:
      return "Fx vildt, rødvin, svamperet, hygge…";
    case 10:
    case 11:
      return "Fx julemad, rødvin, nytår, champagne…";
    default:
      return "Fx hygge, sushi, julemad, champagne…";
  }
}

type ApiResponse = { source: string; products: ProductHit[]; meta: SearchMeta };

const PAGE_MORE = 10;

export function WineSearch({ initialQuery }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery?.trim() || "");
  const [max, setMax] = useState<string>("");
  const monthIndex = useMemo(() => new Date().getMonth(), []);
  const chips = useMemo(() => seasonalChips(monthIndex), [monthIndex]);
  const placeholder = useMemo(() => seasonalPlaceholder(monthIndex), [monthIndex]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** Antal bedste match der vises først: 3 eller 5 */
  const [firstCount, setFirstCount] = useState<3 | 5>(3);
  /** Hvor mange gange brugeren har trykket "Se flere" (+PAGE_MORE pr. gang) */
  const [moreSteps, setMoreSteps] = useState(0);

  const maxNum = useMemo(() => {
    const n = parseInt(max, 10);
    return Number.isFinite(n) ? n : null;
  }, [max]);

  const search = useCallback(
    async (query: string, budget?: number | null) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ q: query });
        if (budget != null && Number.isFinite(budget)) params.set("max", String(budget));
        const r = await fetch(`/api/search?${params.toString()}`);
        const json = (await r.json()) as ApiResponse;
        setData(json);
      } catch {
        setError("Kunne ikke hente resultater. Prøv igen.");
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const iq = initialQuery?.trim();
    if (iq) void search(iq, null);
  }, [initialQuery, search]);

  const products = data?.products ?? [];
  const total = products.length;

  useEffect(() => {
    setMoreSteps(0);
  }, [data]);

  const visibleCount = useMemo(() => {
    if (!total) return 0;
    const cap = firstCount + moreSteps * PAGE_MORE;
    return Math.min(cap, total);
  }, [total, firstCount, moreSteps]);

  const visibleProducts = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
  const canLoadMore = total > 0 && visibleCount < total;

  return (
    <div className="space-y-6">
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void search(q, maxNum);
        }}
      >
        <div className="flex-1">
          <label htmlFor="wine-q" className="block text-sm font-medium text-stone-700">
            Hvad leder du efter?
          </label>
          <input
            id="wine-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-rose-900/20 focus:border-rose-900 focus:ring-2"
          />
        </div>
        <div className="w-full sm:w-40">
          <label htmlFor="wine-max" className="block text-sm font-medium text-stone-700">
            Max pris (valgfri)
          </label>
          <input
            id="wine-max"
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="Fx150"
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none focus:border-rose-900 focus:ring-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-rose-900 px-6 py-3 font-semibold text-white shadow-sm hover:bg-rose-950 disabled:opacity-60"
        >
          {loading ? "Søger…" : "Søg vin"}
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => {
              setQ(c.q);
              if (c.max) setMax(String(c.max));
              else setMax("");
              void search(c.q, c.max ?? null);
            }}
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-800 shadow-sm hover:border-rose-300 hover:bg-rose-50"
          >
            {c.label}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      {data && (
        <div className="space-y-4">
          <p className="text-sm text-stone-600">
            {total
              ? `Vi har fundet ${total} foreslåede vine på tværs af forhandlere — vist efter bedste match. Tjek altid pris og levering hos butikken.`
              : "Ingen vine matchede lige nu — prøv fx “rødvin”, “champagne” eller en drue du kender."}
          </p>

          {total > 0 && (
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <span className="text-sm font-medium text-stone-700">Start med</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFirstCount(3)}
                  aria-pressed={firstCount === 3}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    firstCount === 3
                      ? "border-rose-900 bg-rose-900 text-white"
                      : "border-stone-200 bg-white text-stone-800 hover:border-rose-300"
                  }`}
                >
                  3 bedste match
                </button>
                <button
                  type="button"
                  onClick={() => setFirstCount(5)}
                  aria-pressed={firstCount === 5}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    firstCount === 5
                      ? "border-rose-900 bg-rose-900 text-white"
                      : "border-stone-200 bg-white text-stone-800 hover:border-rose-300"
                  }`}
                >
                  5 bedste match
                </button>
              </div>
            </div>
          )}

          {total > 0 && (
            <p className="text-sm text-stone-500">
              Viser {visibleCount} af {total}
              {visibleCount < total ? " — der er flere at udforske." : "."}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((p, i) => (
              <ProductCard key={`${p.url}-${i}`} product={p} />
            ))}
          </div>

          {canLoadMore && (
            <div className="flex flex-col items-center gap-1 pt-2">
              <button
                type="button"
                onClick={() => setMoreSteps((s) => s + 1)}
                className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm hover:border-rose-400 hover:bg-rose-50"
              >
                Se flere muligheder
              </button>
              <p className="text-xs text-stone-500">
                +{Math.min(PAGE_MORE, total - visibleCount)} næste
                {total - visibleCount > PAGE_MORE ? ` · ${total - visibleCount} i alt tilbage` : ""}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
