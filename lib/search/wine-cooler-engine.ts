import { FEEDS } from "@/lib/feeds/config";
import type { ProductHit, SearchResult } from "./types";
import { expandWineCoolerQuery, foldDa, productIsWineCooler, VINKOLESKABET_MERCHANT, wineCoolerSearchHayMatchesTerm } from "./wine-cooler";
import { normalizeUrl, parsePriceFilter, proxyImg, score } from "./helpers";
import { getCachedFeedProducts } from "./fetch-feed";

const RESULT_CAP = 48;

const vinkoleskabetFeed = FEEDS.find((f) => f.merchant === VINKOLESKABET_MERCHANT);
if (!vinkoleskabetFeed) {
  throw new Error(`Feed config missing for ${VINKOLESKABET_MERCHANT}`);
}
const VINKOLESKABET_FEED = vinkoleskabetFeed;

export async function runWineCoolerSearch(qRaw: string, budgetMaxParam: number | null): Promise<SearchResult> {
  const priceFilter = parsePriceFilter(qRaw, budgetMaxParam);
  const { min: priceMin, max: priceMax } = priceFilter;
  const terms = expandWineCoolerQuery(qRaw);

  let feeds_ok = 0;
  let feeds_failed = 0;

  try {
    let products = await getCachedFeedProducts(VINKOLESKABET_FEED);
    products = products.filter(productIsWineCooler);

    if (priceMin != null || priceMax != null) {
      products = products.filter((p) => {
        if (p.price == null) return false;
        if (priceMin != null && p.price < priceMin) return false;
        if (priceMax != null && p.price > priceMax) return false;
        return true;
      });
    }

    const query = foldDa(qRaw);
    const matches =
      query.length === 0
        ? products
        : products.filter((p) => terms.some((t) => wineCoolerSearchHayMatchesTerm(p._search || "", t)));

    const withProxy: ProductHit[] = matches.map((p) => {
      const img = normalizeUrl(p.image, p.url);
      return img ? { ...p, image: proxyImg(img) } : { ...p, image: null };
    });

    let items = withProxy.sort((a, b) => {
      const sa = score(a, terms);
      const sb = score(b, terms);
      return sb - sa || (a.image ? 0 : 1) - (b.image ? 0 : 1) || (a.price ?? 9e9) - (b.price ?? 9e9);
    });

    feeds_ok = 1;

    const matched_before_cap = items.length;
    const results_capped = matched_before_cap > RESULT_CAP;
    items = items.slice(0, RESULT_CAP);

    const meta = {
      feeds_total: 1,
      feeds_ok,
      feeds_failed,
      priceMin,
      priceMax,
      matched_before_cap,
      results_capped,
    };

    if (items.length) return { source: "feed", products: items, meta };
    return { source: "fallback", products: [], meta };
  } catch (err) {
    feeds_failed = 1;
    console.error(`[wine-cooler-search] feed FAILED:`, err instanceof Error ? err.message : err);
    return {
      source: "error",
      products: [],
      meta: {
        feeds_total: 1,
        feeds_ok: 0,
        feeds_failed: 1,
        priceMin: priceFilter.min,
        priceMax: priceFilter.max,
        matched_before_cap: 0,
        results_capped: false,
      },
    };
  }
}
