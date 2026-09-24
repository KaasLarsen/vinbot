"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { DealCard } from "@/components/deal-card";
import type { TilbudCardItem } from "@/lib/deals/types";

const QUICK_CHIPS = ["Portvin", "Champagne", "Rosé"] as const;
const DEBOUNCE_MS = 250;

function useDebouncedValue<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), ms);
    return () => window.clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

export function HomeBestDealsSearch() {
  const inputId = useId();
  const [q, setQ] = useState("");
  const debouncedQ = useDebouncedValue(q, DEBOUNCE_MS);
  const [deals, setDeals] = useState<TilbudCardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Varm den delte feed-deal-pool ved mount (uden q) — så første søgning er hurtig.
  useEffect(() => {
    void fetch("/api/deals?type=feed&limit=1&minDiscount=15").catch(() => {
      /* ignore */
    });
  }, []);

  useEffect(() => {
    const term = debouncedQ.trim();
    if (!term) {
      setDeals([]);
      setError(null);
      setLoading(false);
      return;
    }

    const ac = new AbortController();
    setLoading(true);
    setError(null);

    void (async () => {
      try {
        // Kun feed: undgår tung cross-merchant-katalog. Pool er cachet uden q.
        const params = new URLSearchParams({
          q: term,
          type: "feed",
          limit: "3",
          minDiscount: "15",
        });
        const res = await fetch(`/api/deals?${params}`, { signal: ac.signal });
        if (!res.ok) throw new Error("fetch failed");
        const data = (await res.json()) as { feedDeals: TilbudCardItem[] };
        if (ac.signal.aborted) return;
        setDeals(data.feedDeals ?? []);
      } catch (err) {
        if (ac.signal.aborted) return;
        setDeals([]);
        setError("Kunne ikke hente tilbud. Prøv igen.");
        console.error(err);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [debouncedQ]);

  const trimmed = q.trim();
  const showResults = trimmed.length > 0;

  return (
    <section
      className="mt-8 rounded-2xl border border-rose-200/70 bg-rose-50/90 p-4 sm:p-5 lg:mt-0"
      aria-labelledby="home-best-deals-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/90">Tilbud</p>
      <h2 id="home-best-deals-heading" className="mt-1 text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">
        Bedste tilbud lige nu
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
        Skriv fx Portvin — vi viser de 3 stærkeste rabatter.
      </p>

      <div className="mt-3">
        <label htmlFor={inputId} className="sr-only">
          Søg bedste tilbud
        </label>
        <input
          id={inputId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="fx Portvin, champagne, rosé"
          autoComplete="off"
          className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2.5 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
        />
      </div>

      {!showResults ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {QUICK_CHIPS.map((chip) => (
            <li key={chip}>
              <button
                type="button"
                onClick={() => setQ(chip)}
                className="inline-flex rounded-full border border-rose-200 bg-white px-3 py-1.5 text-sm font-medium text-rose-900 shadow-sm hover:border-rose-400 hover:bg-rose-50"
              >
                {chip}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {showResults ? (
        <div className="mt-4" aria-live="polite">
          {loading ? <p className="text-sm text-stone-600">Søger tilbud…</p> : null}
          {!loading && error ? <p className="text-sm text-rose-800">{error}</p> : null}
          {!loading && !error && deals.length === 0 ? (
            <p className="text-sm text-stone-600">Ingen tilbud matcher «{trimmed}» lige nu.</p>
          ) : null}
          {!loading && deals.length > 0 ? (
            <ul className="grid gap-3">
              {deals.map((deal) => (
                <li key={deal.id}>
                  <DealCard deal={deal} placement="home-best-deals" variant="compact" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <p className="mt-3">
        <Link href="/tilbud" className="text-sm font-medium text-rose-900 hover:underline">
          Se flere tilbud →
        </Link>
      </p>
    </section>
  );
}
