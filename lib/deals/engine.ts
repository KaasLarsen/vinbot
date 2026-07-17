import { unstable_cache } from "next/cache";

import { FEEDS } from "@/lib/feeds/config";
import { getCachedFeedProducts } from "@/lib/search/fetch-feed";
import { normalizeUrl, productEligibleForWineSearch, proxyImg } from "@/lib/search/helpers";
import type { DealHit } from "@/lib/search/types";

const DEFAULT_MIN_DISCOUNT = 15;
const DEFAULT_LIMIT = 48;
const DIVERSIFY_PREFIX = 12;
const DIVERSIFY_PREFERRED_MAX_PER_MERCHANT = 1;
const DIVERSIFY_ABSOLUTE_MAX_PER_MERCHANT = 2;

export type ListFeedDealsOptions = {
  minDiscount?: number;
  maxPrice?: number;
  merchant?: string;
  limit?: number;
};

function diversifyTopByMerchant(items: DealHit[], prefixCount: number): DealHit[] {
  if (items.length <= 1) return items;

  const target = Math.min(prefixCount, items.length);
  const picked = new Set<number>();
  const counts = new Map<string, number>();
  const out: DealHit[] = [];

  const fill = (maxPerMerchant: number) => {
    for (let i = 0; i < items.length && out.length < target; i++) {
      if (picked.has(i)) continue;
      const m = items[i].merchant || "";
      const countForMerchant = counts.get(m) ?? 0;
      if (countForMerchant >= maxPerMerchant) continue;
      counts.set(m, countForMerchant + 1);
      picked.add(i);
      out.push(items[i]);
    }
  };

  fill(DIVERSIFY_PREFERRED_MAX_PER_MERCHANT);
  if (out.length < target) fill(DIVERSIFY_ABSOLUTE_MAX_PER_MERCHANT);
  if (out.length < target) fill(Number.POSITIVE_INFINITY);

  const rest = items.filter((_, i) => !picked.has(i));
  return [...out, ...rest];
}

async function buildFeedDeals(opts: ListFeedDealsOptions = {}): Promise<DealHit[]> {
  const minDiscount = opts.minDiscount ?? DEFAULT_MIN_DISCOUNT;
  const maxPrice = opts.maxPrice ?? null;
  const merchantFilter = opts.merchant?.trim() || null;
  const limit = opts.limit ?? DEFAULT_LIMIT;

  const lists = await Promise.all(
    FEEDS.map(async (feed) => {
      if (merchantFilter && feed.merchant !== merchantFilter) return [] as DealHit[];
      try {
        const products = await getCachedFeedProducts(feed);
        return products
          .filter((p) => {
            if (!productEligibleForWineSearch(p)) return false;
            if (p.discountPercent == null || p.discountPercent < minDiscount) return false;
            if (p.salePrice == null || p.referencePrice == null) return false;
            if (maxPrice != null && p.salePrice > maxPrice) return false;
            return true;
          })
          .map((p) => {
            const img = normalizeUrl(p.image, p.url);
            const image = img ? proxyImg(img) : null;
            return {
              ...p,
              image,
              referencePrice: p.referencePrice!,
              discountPercent: p.discountPercent!,
            } satisfies DealHit;
          });
      } catch {
        return [] as DealHit[];
      }
    }),
  );

  let items = lists.flat();
  items.sort(
    (a, b) =>
      b.discountPercent - a.discountPercent ||
      (a.salePrice ?? 9e9) - (b.salePrice ?? 9e9) ||
      (a.image ? 0 : 1) - (b.image ? 0 : 1),
  );

  items = diversifyTopByMerchant(items, DIVERSIFY_PREFIX);
  return items.slice(0, limit);
}

const getCachedFeedDeals = unstable_cache(
  (optsJson: string) => buildFeedDeals(JSON.parse(optsJson) as ListFeedDealsOptions),
  ["vinbot-feed-deals-v1"],
  { revalidate: 21600, tags: ["vinbot-feeds"] },
);

export async function listFeedDeals(opts: ListFeedDealsOptions = {}): Promise<DealHit[]> {
  return getCachedFeedDeals(JSON.stringify(opts));
}

/** Unikke forhandlere med mindst ét feed-tilbud. */
export async function listDealMerchants(): Promise<string[]> {
  const deals = await listFeedDeals({ limit: 200, minDiscount: 10 });
  return [...new Set(deals.map((d) => d.merchant))].sort((a, b) => a.localeCompare(b, "da"));
}
