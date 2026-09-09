"use client";

import { useState } from "react";

import { DealCard } from "@/components/deal-card";
import type { TilbudCardItem } from "@/lib/deals/types";

type TabId = "shop" | "cross" | "julevin" | "bobler";

export function BlackFridayDealTabs({
  shopDeals,
  crossDeals,
  julevinDeals,
  bubblesDeals,
}: {
  shopDeals: TilbudCardItem[];
  crossDeals: TilbudCardItem[];
  julevinDeals: TilbudCardItem[];
  bubblesDeals: TilbudCardItem[];
}) {
  const [tab, setTab] = useState<TabId>("shop");

  const tabs: { id: TabId; label: string; hint: string; deals: TilbudCardItem[] }[] = [
    {
      id: "shop",
      label: "Største rabatter i shop",
      hint: "Sorteret efter nedsættelse i butikkens feed. Før-prisen følger forhandlerens egne regler — ikke en historisk gennemsnitspris.",
      deals: shopDeals,
    },
    {
      id: "cross",
      label: "Størst prisforskel på tværs",
      hint: "Samme flaske hos flere butikker. Den grønne pil betyder, at prisen er lavere end hos en anden forhandler lige nu.",
      deals: crossDeals,
    },
    {
      id: "julevin",
      label: "Julevin på tilbud",
      hint: "Kraftigere røde der ofte matcher and og flæskesteg: Amarone, Châteauneuf, Ribera, Priorat, Rioja og lignende.",
      deals: julevinDeals,
    },
    {
      id: "bobler",
      label: "Bobler til nytår",
      hint: "Champagne, cava, crémant og anden mousserende — sorteret efter skarpeste rabat.",
      deals: bubblesDeals,
    },
  ];

  const active = tabs.find((t) => t.id === tab) ?? tabs[0];

  return (
    <section aria-labelledby="bf-feed-heading">
      <h2 id="bf-feed-heading" className="text-2xl font-semibold tracking-tight text-stone-900">
        Live vintilbud
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-stone-600">
        Opdateres fra forhandlernes feeds. Lagerstatus vises ikke her — tjek altid hos butikken, før du klikker videre.
      </p>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Tilbudskategorier">
        {tabs.map((t) => {
          const selected = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(t.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                selected
                  ? "border-rose-900 bg-rose-900 text-white"
                  : "border-stone-200 bg-white text-stone-800 hover:border-rose-300"
              }`}
            >
              {t.label}
              {t.deals.length ? ` (${t.deals.length})` : ""}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-stone-600">{active.hint}</p>

      {active.deals.length === 0 ? (
        <p className="mt-6 rounded-xl border border-stone-200 bg-stone-50 px-4 py-6 text-sm text-stone-600">
          Ingen matches i denne fane lige nu. Prøv en anden fane, eller brug pris-tjekkeren nedenfor.
        </p>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {active.deals.map((deal) => (
            <li key={deal.id}>
              <DealCard deal={deal} placement={`black-friday-${tab}`} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
