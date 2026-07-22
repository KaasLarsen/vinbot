"use client";

import { useMemo, useState } from "react";

import { DealCarousel } from "@/components/deal-carousel";
import { DealCard } from "@/components/deal-card";
import type { TilbudCardItem } from "@/lib/deals/types";

type DealTab = "alle" | "feed" | "cross";

const PRICE_OPTIONS = [
  { value: "", label: "Alle priser" },
  { value: "100", label: "Under 100 kr" },
  { value: "150", label: "Under 150 kr" },
  { value: "200", label: "Under 200 kr" },
  { value: "300", label: "Under 300 kr" },
] as const;

export function TilbudPageSections({
  featured,
  topFeedDeals,
  crossDealsCarousel,
  budgetDeals,
  feedDeals,
  crossDeals,
  merchants,
}: {
  featured: TilbudCardItem[];
  topFeedDeals: TilbudCardItem[];
  crossDealsCarousel: TilbudCardItem[];
  budgetDeals: TilbudCardItem[];
  feedDeals: TilbudCardItem[];
  crossDeals: TilbudCardItem[];
  merchants: string[];
}) {
  return (
    <div className="space-y-14">
      {featured.length > 0 ? (
        <section aria-labelledby="tilbud-featured-heading">
          <h2 id="tilbud-featured-heading" className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
            I fokus lige nu
          </h2>
          <p className="mt-1 text-sm text-stone-600">De stærkeste rabatter vi ser i feeds lige nu — opdateres ca. hver 6. time.</p>
          <ul className="mt-5 grid gap-5 lg:grid-cols-2">
            {featured.map((deal) => (
              <li key={deal.id}>
                <DealCard deal={deal} placement="tilbud-featured" variant="featured" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <DealCarousel
        id="tilbud-top-rabat"
        title="Største rabatter i shop"
        description="Varer med tydelig før-pris og nedsættelse hos den enkelte forhandler."
        deals={topFeedDeals}
        placement="tilbud-carousel-top"
      />

      <DealCarousel
        id="tilbud-cross"
        title="Billigst på tværs af butikker"
        description="Samme flaske findes hos flere forhandlere — her er den største prisforskel lige nu."
        deals={crossDealsCarousel}
        placement="tilbud-carousel-cross"
      />

      <DealCarousel
        id="tilbud-budget"
        title="Gode tilbud under 150 kr"
        description="Hverdagsvine og små fund til terrasse, mad og hygge — filtreret på pris og rabat."
        deals={budgetDeals}
        placement="tilbud-carousel-budget"
      />

      <TilbudBrowseAll feedDeals={feedDeals} crossDeals={crossDeals} merchants={merchants} />
    </div>
  );
}

function TilbudBrowseAll({
  feedDeals,
  crossDeals,
  merchants,
}: {
  feedDeals: TilbudCardItem[];
  crossDeals: TilbudCardItem[];
  merchants: string[];
}) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<DealTab>("alle");
  const [merchant, setMerchant] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [bigDiscountOnly, setBigDiscountOnly] = useState(false);

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
    const maxPrice = priceMax ? Number(priceMax) : null;
    const minDiscount = bigDiscountOnly ? 25 : 10;

    return allDeals.filter((d) => {
      if (tab === "feed" && d.kind !== "feed") return false;
      if (tab === "cross" && d.kind !== "cross") return false;
      if (merchant && d.merchant !== merchant) return false;
      if (d.discountPercent < minDiscount) return false;
      if (maxPrice != null && d.salePrice > maxPrice) return false;
      if (!t) return true;
      return (
        d.title.toLowerCase().includes(t) ||
        d.brand.toLowerCase().includes(t) ||
        d.merchant.toLowerCase().includes(t)
      );
    });
  }, [allDeals, tab, merchant, priceMax, bigDiscountOnly, q]);

  const tabs: { id: DealTab; label: string; count: number }[] = [
    { id: "alle", label: "Alle", count: allDeals.length },
    {
      id: "feed",
      label: "Nedsatte i shop",
      count: allDeals.filter((d) => d.kind === "feed").length,
    },
    {
      id: "cross",
      label: "Billigst på tværs",
      count: allDeals.filter((d) => d.kind === "cross").length,
    },
  ];

  return (
    <section className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm sm:p-8" aria-labelledby="tilbud-browse-heading">
      <h2 id="tilbud-browse-heading" className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
        Søg og filtrér alle tilbud
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Brug fanerne til at skelne mellem butikkens egen nedsættelse og prisforskel på tværs af forhandlere.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-stone-100 pb-4">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === item.id
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {item.label}
            <span className={`ml-1.5 tabular-nums ${tab === item.id ? "text-stone-300" : "text-stone-500"}`}>
              ({item.count})
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <label htmlFor="tilbud-q" className="sr-only">
            Søg
          </label>
          <input
            id="tilbud-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Søg på vin, producent eller butik…"
            className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-stone-900 outline-none transition focus:border-rose-900 focus:bg-white focus:ring-2 focus:ring-rose-900/15"
          />
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="tilbud-price" className="sr-only">
            Pris
          </label>
          <select
            id="tilbud-price"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-rose-900 focus:ring-2 focus:ring-rose-900/15"
          >
            {PRICE_OPTIONS.map((o) => (
              <option key={o.value || "all"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-4">
          <label htmlFor="tilbud-merchant" className="sr-only">
            Forhandler
          </label>
          <select
            id="tilbud-merchant"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 outline-none focus:border-rose-900 focus:ring-2 focus:ring-rose-900/15"
          >
            <option value="">Alle forhandlere</option>
            {merchants.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-stone-700">
        <input
          type="checkbox"
          checked={bigDiscountOnly}
          onChange={(e) => setBigDiscountOnly(e.target.checked)}
          className="size-4 rounded border-stone-300 text-rose-900 focus:ring-rose-900/30"
        />
        Vis kun store rabatter (25 % eller mere)
      </label>

      <p className="mt-5 text-sm text-stone-600">
        {filtered.length === 0
          ? "Ingen tilbud matcher — prøv at fjerne filtre eller søg bredere."
          : `${filtered.length} tilbud matcher · priser fra affiliate-feeds`}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((deal) => (
            <li key={deal.id}>
              <DealCard deal={deal} placement="tilbud-browse" />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
