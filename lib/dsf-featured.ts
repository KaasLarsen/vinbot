/**
 * @deprecated Brug `@/lib/merchant-featured-picks` — beholdt som tynd re-export.
 */
import {
  dsfFeaturedPicks as getDsfPicks,
  type MerchantFeaturedPick,
} from "@/lib/merchant-featured-picks";

export type DsfFeaturedPick = Omit<MerchantFeaturedPick, "merchantId">;

export const dsfFeaturedPicks: DsfFeaturedPick[] = getDsfPicks().map(({ merchantId: _m, ...rest }) => rest);
