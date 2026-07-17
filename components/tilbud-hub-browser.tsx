"use client";

import { useMemo, useState } from "react";

import { DealCard } from "@/components/deal-card";
import type { TilbudCardItem } from "@/lib/deals/types";

type DealKindFilter = "alle" | "feed" | "cross";

const PRICE_CHIPS = [
  { id: "all", label: "Alle priser", max: null as number | null },
  { id: "under100", label: "Under 100 kr", max: 100 },
  { id: "under150", label: "Under 150 kr", max: 150 },
  { id: "under200", label: "Under 200 kr", max: 200 },
] as const;

export function TilbudHubBrowser({
  feedDeals,
  crossDeals,
  merchants,
}: {
  feedDeals: TilbudCardItem[];
  crossDeals: TilbudCardItem[];
  merchants: string[];
}) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<DealKindFilter>("alle");
  const [merchant, setMerchant] = useState("");
  const [minDiscount, setMinDiscount] = useState(15);
  const [priceMax, setPriceMax] = useState<number | null>(null);

  const allDeals = useMemo(() => {
    const seen = new Set<string>();
    const merged: TilbudCardItem[] = [];
    for (const d of [...feedDeals, ...crossDeals]) {
      if (seen.has(d.id)) continue;
      seen.add(d.id);
      merged.push(d);
    }
    return merged.sort((a, b) => b.discountPercent - a.discountPercent || a.salePrice - b.salePrice);
  }, [feedDeals, crossDeals]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return allDeals.filter((d) => {
      if (kind !== "alle" && d.kind !== kind) return false;
      if (merchant && d.merchant !== merchant) return false;
      if (d.discountPercent < minDiscount) return false;
      if (priceMax != null && d.salePrice > priceMax) return false;
      if (!t) return true;
      return (
        d.title.toLowerCase().includes(t) ||
        d.brand.toLowerCase().includes(t) ||
        d.merchant.toLowerCase().includes(t)
      );
    });
  }, [allDeals, kind, merchant, minDiscount, priceMax, q]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <label htmlFor="tilbud-q" className="block text-sm font-medium text-stone-700">
            Søg i tilbud
          </label>
          <input
            id="tilbud-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Fx drue, producent, forhandler…"
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-rose-900/20 focus:border-rose-900 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="tilbud-merchant" className="block text-sm font-medium text-stone-700">
            Forhandler
          </label>
          <select
            id="tilbud-merchant"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-stone-900 shadow-sm"
          >
            <option value="">Alle</option>
            {merchants.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tilbud-min-discount" className="block text-sm font-medium text-stone-700">
            Min. rabat
          </label>
          <select
            id="tilbud-min-discount"
            value={minDiscount}
            onChange={(e) => setMinDiscount(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-stone-900 shadow-sm"
          >
            <option value={10}>10 %+</option>
            <option value={15}>15 %+</option>
            <option value={20}>20 %+</option>
            <option value={30}>30 %+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: "alle", label: "Alle tilbud" },
            { id: "feed", label: "Nedsatte i shop" },
            { id: "cross", label: "Billigst på tværs" },
          ] as const
        ).map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setKind(chip.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              kind === chip.id
                ? "bg-rose-900 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {PRICE_CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setPriceMax(chip.max)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              priceMax === chip.max
                ? "bg-stone-800 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-stone-600">
        {filtered.length === 0
          ? "Ingen tilbud matcher filtrene lige nu — prøv lavere rabatkrav eller fjern forhandler-filter."
          : `${filtered.length} tilbud vises · priser opdateres ca. hver 6. time`}
      </p>

      {filtered.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((deal) => (
            <li key={deal.id}>
              <DealCard deal={deal} placement="tilbud-hub" />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
