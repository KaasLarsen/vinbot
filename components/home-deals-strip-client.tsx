"use client";

import Link from "next/link";
import { useMemo } from "react";

import { DealCard } from "@/components/deal-card";
import type { TilbudCardItem } from "@/lib/deals/types";
import { rankByTaste } from "@/lib/taste/vector";
import { useTasteProfile } from "@/lib/taste/use-taste-profile";

export function HomeDealsStripClient({ cards }: { cards: TilbudCardItem[] }) {
  const { ready, vector } = useTasteProfile();

  const ordered = useMemo(() => {
    if (!ready || !vector) return cards.slice(0, 8);
    return rankByTaste(
      cards,
      (d) => `${d.title} ${d.brand}`,
      (d) => d.discountPercent,
      vector,
    ).slice(0, 8);
  }, [cards, ready, vector]);

  if (ordered.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="home-deals-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="home-deals-heading" className="text-xl font-semibold tracking-tight text-stone-900">
            Aktuelle vin-tilbud
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            {ready
              ? "Rabatter rangeret efter din smagsprofil — opdateres ca. hver 6. time."
              : "Automatisk fra feeds — opdateres ca. hver 6. time."}
          </p>
        </div>
        <Link href="/tilbud" className="text-sm font-medium text-rose-900 hover:underline">
          Se alle tilbud →
        </Link>
      </div>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ordered.map((deal) => (
          <li key={deal.id}>
            <DealCard deal={deal} placement="home-deals" />
          </li>
        ))}
      </ul>
    </section>
  );
}
