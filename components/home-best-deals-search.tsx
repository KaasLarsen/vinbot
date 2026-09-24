"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

import { DealCard } from "@/components/deal-card";
import type { DealSearchItem } from "@/lib/deals/types";

const QUICK_CHIPS = ["Portvin", "Champagne", "Rosé"] as const;

function topMatches(index: DealSearchItem[], q: string, limit: number): DealSearchItem[] {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return index
    .filter((d) => d.s.includes(t) || d.title.toLowerCase().includes(t) || d.brand.toLowerCase().includes(t))
    .sort((a, b) => b.discountPercent - a.discountPercent || a.salePrice - b.salePrice)
    .slice(0, limit);
}

export function HomeBestDealsSearch({ index }: { index: DealSearchItem[] }) {
  const inputId = useId();
  const [q, setQ] = useState("");

  const deals = useMemo(() => topMatches(index, q, 3), [index, q]);

  const trimmed = q.trim();
  const showResults = trimmed.length > 0;

  return (
    <section
      className="mt-8 min-w-0 max-w-full overflow-x-clip rounded-2xl border border-rose-200/70 bg-rose-50/90 p-4 sm:p-5 lg:mt-0"
      aria-labelledby="home-best-deals-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/90">Tilbud</p>
      <h2 id="home-best-deals-heading" className="mt-1 text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">
        Bedste tilbud lige nu
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
        Skriv fx Portvin — vi viser de 3 stærkeste rabatter.
      </p>

      <div className="mt-3 min-w-0">
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
          enterKeyHint="search"
          // text-base (16px): undgår iOS Safari zoom ved fokus
          className="w-full max-w-full rounded-xl border border-rose-200 bg-white px-3 py-2.5 text-base text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
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
        <div className="mt-4 min-w-0" aria-live="polite">
          {deals.length === 0 ? (
            <p className="text-sm text-stone-600">Ingen tilbud matcher «{trimmed}» lige nu.</p>
          ) : (
            <ul className="grid min-w-0 gap-3">
              {deals.map((deal) => {
                const { s: _s, ...card } = deal;
                return (
                  <li key={card.id} className="min-w-0">
                    <DealCard deal={card} placement="home-best-deals" variant="compact" />
                  </li>
                );
              })}
            </ul>
          )}
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
