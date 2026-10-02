import { listCrossMerchantDeals } from "@/lib/deals/cross-merchant";
import { listFeedDeals } from "@/lib/deals/engine";
import { crossMerchantDealToCard, feedDealToCard } from "@/lib/deals/types";
import { HomeDealsStripClient } from "@/components/home-deals-strip-client";

export async function HomeDealsStrip() {
  const [feedDealsRaw, crossDealsRaw] = await Promise.all([
    listFeedDeals({ limit: 16, minDiscount: 15 }),
    listCrossMerchantDeals({ limit: 16, minSavingsPercent: 20 }),
  ]);

  const cards = [
    ...feedDealsRaw.map(feedDealToCard),
    ...crossDealsRaw.map(crossMerchantDealToCard),
  ].sort((a, b) => b.discountPercent - a.discountPercent);

  if (cards.length === 0) return null;

  return <HomeDealsStripClient cards={cards} />;
}
