import { NextResponse } from "next/server";

import { listCrossMerchantDeals } from "@/lib/deals/cross-merchant";
import { listFeedDeals } from "@/lib/deals/engine";
import { crossMerchantDealToCard, feedDealToCard } from "@/lib/deals/types";

export const maxDuration = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "all";
  const minDiscount = Number(url.searchParams.get("minDiscount") || "15");
  const maxPrice = url.searchParams.get("maxPrice");
  const merchant = url.searchParams.get("merchant") || undefined;
  const limit = Math.min(Number(url.searchParams.get("limit") || "48"), 96);

  const opts = {
    minDiscount: Number.isFinite(minDiscount) ? minDiscount : 15,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    merchant,
    limit,
  };

  const [feedDeals, crossDeals] = await Promise.all([
    type === "cross" ? Promise.resolve([]) : listFeedDeals(opts),
    type === "feed"
      ? Promise.resolve([])
      : listCrossMerchantDeals({
          limit,
          minSavingsPercent: opts.minDiscount,
          minSavingsAmount: 20,
        }),
  ]);

  return NextResponse.json({
    feedDeals: feedDeals.map(feedDealToCard),
    crossDeals: crossDeals.map(crossMerchantDealToCard),
    meta: { type, ...opts },
  });
}
