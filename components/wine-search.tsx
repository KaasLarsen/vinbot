"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProductHit, SearchMeta } from "@/lib/search/types";
import { ProductCard } from "@/components/product-card";

const CHIPS: { label: string; q: string; max?: number }[] = [
  { label: "Julemad", q: "julemad rødvin" },
  { label: "Nytår", q: "nytår champagne bobler" },
  { label: "Fisk", q: "fisk hvidvin" },
  { label: "Tapas", q: "tapas rioja" },
  { label: "Hygge", q: "hygge rødvin" },
  { label: "Romantisk", q: "romantisk middag pinot" },
  { label: "Grill", q: "grill malbec" },
  { label: "Under 150 kr", q: "vin", max: 150 },
];

type ApiResponse = { source: string; products: ProductHit[]; meta: SearchMeta };

export function WineSearch({ initialQuery }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery?.trim() || "pinot noir");
  const [max, setMax] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

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
            placeholder="Fx hygge, sushi, julemad, champagne…"
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
        {CHIPS.map((c) => (
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
            {data.products.length
              ? `Viser ${data.products.length} forslag fra feeds (${data.meta.feeds_ok}/${data.meta.feeds_total} feeds svarede).`
              : "Ingen produkter matchede — prøv bredere ord som “rødvin”, “champagne” eller en drue."}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.products.map((p, i) => (
              <ProductCard key={`${p.url}-${i}`} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
