"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProductHit, SearchMeta } from "@/lib/search/types";
import { ProductCard } from "@/components/product-card";

export type WineCoolerSearchChip = { label: string; q: string; max?: number };

const COOLER_CHIPS: WineCoolerSearchChip[] = [
  { label: "Integrerbar 60 cm", q: "integrerbar 60 winekeeper winecave" },
  { label: "Fritstående kompakt", q: "fritstående 15 18 flasker" },
  { label: "To temperaturzoner", q: "to temperaturzoner" },
  { label: "WineKeeper", q: "winekeeper integrerbar" },
  { label: "mQuvée WineCave", q: "winecave 700 indbygning" },
  { label: "Stor lagring", q: "vinlagring 150 flasker" },
  { label: "Under 10.000 kr", q: "vinkøleskab", max: 10000 },
  { label: "Push/pull dør", q: "push pull exclusive" },
];

type ApiResponse = { source: string; products: ProductHit[]; meta: SearchMeta };

const PAGE_MORE = 12;

function ChipButtons({
  chips,
  onPick,
}: {
  chips: WineCoolerSearchChip[];
  onPick: (chip: WineCoolerSearchChip) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label="Søgeforslag til vinkøleskabe">
      {chips.map((c) => (
        <button
          key={c.label}
          type="button"
          role="listitem"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onPick(c)}
          className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-800 shadow-sm transition hover:border-rose-400 hover:bg-rose-50 hover:text-rose-950"
        >
          {c.label}
          {c.max != null ? <span className="text-stone-500"> · max {c.max.toLocaleString("da-DK")} kr</span> : null}
        </button>
      ))}
    </div>
  );
}

export function WineCoolerSearch({
  initialQuery = "vinkøleskab",
  productCardPlacement = "vinkoleskabe-search",
}: {
  initialQuery?: string;
  productCardPlacement?: string;
}) {
  const [q, setQ] = useState(initialQuery.trim());
  const [max, setMax] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [moreSteps, setMoreSteps] = useState(0);
  const [lastQuery, setLastQuery] = useState("");

  const maxNum = useMemo(() => {
    const n = parseInt(max, 10);
    return Number.isFinite(n) ? n : null;
  }, [max]);

  const search = useCallback(async (query: string, budget?: number | null) => {
    setLoading(true);
    setError(null);
    setLastQuery(query);
    setMoreSteps(0);
    try {
      const params = new URLSearchParams({ q: query });
      if (budget != null && Number.isFinite(budget)) params.set("max", String(budget));
      const r = await fetch(`/api/search/wine-coolers?${params.toString()}`);
      const json = (await r.json()) as ApiResponse;
      setData(json);
    } catch {
      setError("Kunne ikke hente resultater. Prøv igen.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const runChipSearch = useCallback(
    (chip: WineCoolerSearchChip) => {
      setQ(chip.q);
      if (chip.max != null) setMax(String(chip.max));
      else setMax("");
      void search(chip.q, chip.max ?? null);
    },
    [search],
  );

  useEffect(() => {
    const iq = initialQuery?.trim();
    if (iq) void search(iq, null);
  }, [initialQuery, search]);

  const products = data?.products ?? [];
  const total = products.length;
  const visibleCount = Math.min(9 + moreSteps * PAGE_MORE, total);
  const visibleProducts = products.slice(0, visibleCount);
  const canLoadMore = visibleCount < total;

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
          <label htmlFor="cooler-q" className="block text-sm font-medium text-stone-700">
            Søg vinkøleskab
          </label>
          <input
            id="cooler-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Fx integrerbar, 50 flasker, winekeeper, to zoner…"
            autoComplete="off"
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-rose-900/20 focus:border-rose-900 focus:ring-2"
          />
        </div>
        <div className="w-full sm:w-44">
          <label htmlFor="cooler-max" className="block text-sm font-medium text-stone-700">
            Max pris (valgfri)
          </label>
          <input
            id="cooler-max"
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="Fx 15000"
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none focus:border-rose-900 focus:ring-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-rose-900 px-6 py-3 font-semibold text-white shadow-sm hover:bg-rose-950 disabled:opacity-60"
        >
          {loading ? "Søger…" : "Søg"}
        </button>
      </form>

      <div className="rounded-xl border border-stone-200/80 bg-stone-50/60 px-3 py-3 sm:px-4">
        <p className="text-sm text-stone-600">
          <span className="font-medium text-stone-800">Typiske behov</span> — klik for at søge med det samme
        </p>
        <div className="mt-2">
          <ChipButtons chips={COOLER_CHIPS} onPick={runChipSearch} />
        </div>
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      {data ? (
        <div className="space-y-4">
          {total === 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-700">
              <p className="font-medium text-stone-900">Ingen vinkøleskabe matchede lige nu.</p>
              <p className="mt-2">
                Prøv færre ord — fx <strong>integrerbar</strong>, <strong>fritstående</strong> eller et mærke som{" "}
                <strong>WineKeeper</strong>. Du kan også{" "}
                <Link href="/guides/vinkoleskabe-sadan-vaelger-du" className="font-medium text-rose-900 underline">
                  læse købsguiden
                </Link>{" "}
                og søge igen bagefter.
              </p>
            </div>
          ) : (
            <p className="text-sm text-stone-600">
              {data.meta?.results_capped
                ? `${total}+ vinkøleskabe fra Vinkøleskabet.dk (viser de ${total} bedste match). Tjek mål, levering og garanti hos forhandleren.`
                : `${total} vinkøleskabe fra Vinkøleskabet.dk — sorteret efter bedste match. Tjek mål, levering og garanti hos forhandleren.`}
              {lastQuery ? <> Søgning: «{lastQuery}».</> : null}
            </p>
          )}

          {total > 0 ? (
            <>
              <p className="text-sm text-stone-500">
                Viser {visibleCount} af {total}
                {canLoadMore ? " — scroll videre eller load flere." : "."}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((p, i) => (
                  <ProductCard key={`${p.url}-${i}`} product={p} placement={productCardPlacement} />
                ))}
              </div>
              {canLoadMore ? (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMoreSteps((s) => s + 1)}
                    className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm hover:border-rose-400 hover:bg-rose-50"
                  >
                    Vis flere vinkøleskabe
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
