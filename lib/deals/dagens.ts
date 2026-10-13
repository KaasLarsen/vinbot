import { ensurePartnerAdsKlikUid } from "@/lib/partner-ads-links";
import { listFeedDeals } from "@/lib/deals/engine";
import {
  PARTNER_ADS_UID_DAGENS,
  copenhagenDateKey,
  pickDagensFromPool,
} from "@/lib/deals/dagens-shared";
import { feedDealToCard, type TilbudCardItem } from "@/lib/deals/types";

export { PARTNER_ADS_UID_DAGENS, copenhagenDateKey } from "@/lib/deals/dagens-shared";

const MIN_DISCOUNT_PREFERRED = 20;
const MIN_DISCOUNT_FALLBACK = 12;

/**
 * Dagens bedste affiliate-tilbud til forsiden-popup.
 * Vælger blandt top-rabatter (kun betalte feeds med billede), stabilt pr. dansk kalenderdag.
 * Partner-Ads-klik får `uid=vinbot_dagens`.
 */
export async function getDagensTilbud(
  date: Date = new Date(),
): Promise<TilbudCardItem | null> {
  const dayKey = copenhagenDateKey(date);

  let pool = await listFeedDeals({ limit: 48, minDiscount: MIN_DISCOUNT_PREFERRED });
  let pick = pickDagensFromPool(pool, dayKey);

  if (!pick) {
    pool = await listFeedDeals({ limit: 64, minDiscount: MIN_DISCOUNT_FALLBACK });
    pick = pickDagensFromPool(pool, dayKey);
  }

  if (!pick) return null;

  const card = feedDealToCard(pick);
  return {
    ...card,
    url: ensurePartnerAdsKlikUid(card.url, PARTNER_ADS_UID_DAGENS),
  };
}
