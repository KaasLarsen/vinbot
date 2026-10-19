"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProductHit, SearchMeta } from "@/lib/search/types";
import { ProductCard } from "@/components/product-card";

export type SpiritsSearchChip = { label: string; q: string; max?: number };

const SPIRITS_CHIPS: SpiritsSearchChip[] = [
  { label: "Rom", q: "rom" },
  { label: "Gin", q: "gin" },
  { label: "Whisky", q: "whisky" },
  { label: "Likør", q: "likør" },
  { label: "Vodka", q: "vodka" },
  { label: "Under 300 kr", q: "spiritus", max: 300 },
];

type ApiResponse = { source: string; products: ProductHit[]; meta: SearchMeta };

const PAGE_MORE = 12;

function ChipButtons({
  chips,
  onPick,
}: {
  chips: SpiritsSearchChip[];
  onPick: (chip: SpiritsSearchChip) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label="Søgeforslag til spiritus">
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

export function SpiritsSearch({
  initialQuery = "",
  productCardPlacement = "spiritus-search",
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
      const r = await fetch(`/api/search/spirits?${params.toString()}`);
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
    (chip: SpiritsSearchChip) => {
      setQ(chip.q);
      if (chip.max != null) setMax(String(chip.max));
      else setMax("");
      void search(chip.q, chip.max ?? null);
    },
    [search],
  );

  useEffect(() => {
    void search(initialQuery?.trim() ?? "", null);
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
          <label htmlFor="spirits-q" className="block text-sm font-medium text-stone-700">
            Søg spiritus
          </label>
          <input
            id="spirits-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Fx rom, gin, whisky, Great Dane, Herbie…"
            autoComplete="off"
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-rose-900/20 focus:border-rose-900 focus:ring-2"
          />
        </div>
        <div className="w-full sm:w-44">
          <label htmlFor="spirits-max" className="block text-sm font-medium text-stone-700">
            Max pris (valgfri)
          </label>
          <input
            id="spirits-max"
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="Fx 300"
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
          <span className="font-medium text-stone-800">Populære valg</span> — klik for at søge med det samme
        </p>
        <div className="mt-2">
          <ChipButtons chips={SPIRITS_CHIPS} onPick={runChipSearch} />
        </div>
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      {data ? (
        <div className="space-y-4">
          {total === 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-700">
              <p className="font-medium text-stone-900">Ingen spiritus matchede lige nu.</p>
              <p className="mt-2">
                Prøv færre ord — fx <strong>rom</strong>, <strong>gin</strong> eller <strong>whisky</strong>. Se også{" "}
                <Link href="/drinks" className="font-medium text-rose-900 underline">
                  drinks med vin
                </Link>{" "}
                hvis du leder efter cocktails.
              </p>
            </div>
          ) : (
            <p className="text-sm text-stone-600">
              {data.meta?.results_capped
                ? `${total}+ flasker fra danske spiritus-shops (viser de ${total} bedste match). Tjek pris, lager og levering hos forhandleren.`
                : `${total} flasker fra danske spiritus-shops — sorteret efter bedste match. Tjek pris, lager og levering hos forhandleren.`}
              {lastQuery ? <> Søgning: «{lastQuery}».</> : null}
            </p>
          )}

          {total > 0 ? (
            <>
              <p className="text-sm text-stone-500">
                Viser {visibleCount} af {total}
                {canLoadMore ? " — scroll videre eller load flere." : "."}
              </p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
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
                    Vis flere flasker
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
