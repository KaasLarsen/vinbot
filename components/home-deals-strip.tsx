import Link from "next/link";

import { DealCard } from "@/components/deal-card";
import { listCrossMerchantDeals } from "@/lib/deals/cross-merchant";
import { listFeedDeals } from "@/lib/deals/engine";
import { crossMerchantDealToCard, feedDealToCard } from "@/lib/deals/types";

export async function HomeDealsStrip() {
  const [feedDealsRaw, crossDealsRaw] = await Promise.all([
    listFeedDeals({ limit: 6, minDiscount: 15 }),
    listCrossMerchantDeals({ limit: 6, minSavingsPercent: 20 }),
  ]);

  const cards = [
    ...feedDealsRaw.map(feedDealToCard),
    ...crossDealsRaw.map(crossMerchantDealToCard),
  ]
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 6);

  if (cards.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="home-deals-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="home-deals-heading" className="text-xl font-semibold tracking-tight text-stone-900">
            Aktuelle vin-tilbud
          </h2>
          <p className="mt-1 text-sm text-stone-600">Automatisk fra feeds — opdateres ca. hver 6. time.</p>
        </div>
        <Link href="/tilbud" className="text-sm font-medium text-rose-900 hover:underline">
          Se alle tilbud →
        </Link>
      </div>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((deal) => (
          <li key={deal.id}>
            <DealCard deal={deal} placement="home-deals" />
          </li>
        ))}
      </ul>
    </section>
  );
}
