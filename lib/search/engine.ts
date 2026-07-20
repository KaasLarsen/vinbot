import { FEEDS, feedTier } from "@/lib/feeds/config";
import type { ProductHit, SearchMeta, SearchResult } from "./types";
import { expandQuery, normalizeUrl, parsePriceFilter, productEligibleForWineSearch, proxyImg, score } from "./helpers";
import { getCachedFeedProducts } from "./fetch-feed";
import { detectMerchantIntent } from "./merchant-intent";
import { brandTermsBeyondFormat, productIsBagInBox, productMatchesWineFormat, wineFormatIntentFromQuery } from "./wine-format";
import { productMatchesWineStyle, wineStyleIntentFromQuery } from "./wine-style";

const RESULT_CAP = 48;
/** Højere loft når brugeren browser én butiks sortiment. */
const BROWSE_RESULT_CAP = 120;
/** Antal top-resultater vi forsøger at diversificere (dækker 3/5 første visning + "Se flere"). */
const DIVERSIFY_PREFIX = 12;
/** Foretræk forskellige butikker i top; hæves kun hvis der ikke er nok butikker. */
const DIVERSIFY_PREFERRED_MAX_PER_MERCHANT = 1;
/** Hård grænse: undgå 3 fra samme butik når alternativer findes. */
const DIVERSIFY_ABSOLUTE_MAX_PER_MERCHANT = 2;
/** Gratis butikker skal matche tydeligt bedre for at overhale betalende partnere. */
const FREE_TIER_SCORE_PENALTY = 8;

function diversifyTopByMerchant(items: ProductHit[], prefixCount: number): ProductHit[] {
  if (items.length <= 1) return items;

  const target = Math.min(prefixCount, items.length);
  const picked = new Set<number>();
  const counts = new Map<string, number>();
  const out: ProductHit[] = [];

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

  // Pass 1: én pr. butik når muligt (bevarer score-rækkefølge ved at scanne hele listen).
  fill(DIVERSIFY_PREFERRED_MAX_PER_MERCHANT);
  // Pass 2: tillad én ekstra pr. butik før vi giver op på diversitet.
  if (out.length < target) fill(DIVERSIFY_ABSOLUTE_MAX_PER_MERCHANT);
  // Pass 3: kun når få butikker matcher — fyld resten i ren relevans-rækkefølge.
  if (out.length < target) fill(Number.POSITIVE_INFINITY);

  const rest = items.filter((_, i) => !picked.has(i));
  return [...out, ...rest];
}

function emptyMeta(partial?: Partial<SearchMeta>): SearchMeta {
  return {
    feeds_total: FEEDS.length,
    feeds_ok: 0,
    feeds_failed: 0,
    priceMin: null,
    priceMax: null,
    matched_before_cap: 0,
    results_capped: false,
    merchant_browse: null,
    merchant_browse_tier: null,
    ...partial,
  };
}

function toHits(products: Awaited<ReturnType<typeof getCachedFeedProducts>>): ProductHit[] {
  return products.map((p) => {
    const img = normalizeUrl(p.image, p.url);
    return img ? { ...p, image: proxyImg(img) } : { ...p, image: null };
  });
}

function applyPriceFilter<T extends { price: number | null }>(
  products: T[],
  priceMin: number | null,
  priceMax: number | null,
): T[] {
  if (priceMin == null && priceMax == null) return products;
  return products.filter((p) => {
    if (p.price == null) return false;
    if (priceMin != null && p.price < priceMin) return false;
    if (priceMax != null && p.price > priceMax) return false;
    return true;
  });
}

async function runMerchantBrowse(
  qRaw: string,
  budgetMaxParam: number | null,
  merchant: string,
  remainingQuery: string,
): Promise<SearchResult> {
  const feed = FEEDS.find((f) => f.merchant === merchant);
  const priceFilter = parsePriceFilter(qRaw, budgetMaxParam);
  const priceMin = priceFilter.min;
  const priceMax = priceFilter.max;
  const tier = feed ? feedTier(feed) : null;

  const baseMeta = emptyMeta({
    priceMin,
    priceMax,
    merchant_browse: merchant,
    merchant_browse_tier: tier,
  });

  if (!feed) {
    return { source: "fallback", products: [], meta: baseMeta };
  }

  let feeds_ok = 0;
  let feeds_failed = 0;
  let products: ProductHit[] = [];

  const remaining = remainingQuery.trim();
  const terms = remaining ? expandQuery(remaining) : [];
  const styleIntent = wineStyleIntentFromQuery(qRaw);
  const formatIntent = wineFormatIntentFromQuery(qRaw);
  /** Tom remaining (eller kun prisord → expandQuery ≈ "vin"): vis hele sortimentet. */
  const browseAll =
    !remaining ||
    (terms.length === 1 &&
      terms[0] === "vin" &&
      !wineStyleIntentFromQuery(remaining) &&
      !wineFormatIntentFromQuery(remaining));

  try {
    let raw = await getCachedFeedProducts(feed);
    raw = applyPriceFilter(raw, priceMin, priceMax);

    const matches = raw.filter((p) => {
      if (!productEligibleForWineSearch(p)) return false;
      if (styleIntent && !productMatchesWineStyle(p, styleIntent)) return false;
      if (formatIntent && !productMatchesWineFormat(p, formatIntent)) return false;
      if (browseAll) return true;
      if (formatIntent === "bag-in-box") {
        const brandTerms = brandTermsBeyondFormat(terms);
        const hay = p._search || "";
        if (brandTerms.length > 0) return brandTerms.some((t) => hay.includes(t));
        return terms.some((t) => hay.includes(t)) || productIsBagInBox(p);
      }
      return terms.some((t) => (p._search || "").includes(t));
    });

    products = toHits(matches);
    feeds_ok = 1;
  } catch (err) {
    feeds_failed = 1;
    console.error(`[search] merchant browse FAILED for ${merchant}:`, err instanceof Error ? err.message : err);
  }

  if (browseAll) {
    products.sort(
      (a, b) =>
        (a.price ?? 9e9) - (b.price ?? 9e9) ||
        (a.image ? 0 : 1) - (b.image ? 0 : 1) ||
        a.title.localeCompare(b.title, "da"),
    );
  } else {
    products.sort((a, b) => {
      const bibBoost = (p: ProductHit) =>
        formatIntent === "bag-in-box" && productIsBagInBox(p) ? 30 : 0;
      const sa = score(a, terms) + bibBoost(a);
      const sb = score(b, terms) + bibBoost(b);
      return sb - sa || (a.image ? 0 : 1) - (b.image ? 0 : 1) || (a.price ?? 9e9) - (b.price ?? 9e9);
    });
  }

  const matched_before_cap = products.length;
  const results_capped = matched_before_cap > BROWSE_RESULT_CAP;
  products = products.slice(0, BROWSE_RESULT_CAP);

  const meta = emptyMeta({
    feeds_ok,
    feeds_failed,
    priceMin,
    priceMax,
    matched_before_cap,
    results_capped,
    merchant_browse: merchant,
    merchant_browse_tier: tier,
  });

  if (products.length) return { source: "feed", products, meta };
  return { source: "fallback", products: [], meta };
}

export async function runSearch(qRaw: string, budgetMaxParam: number | null): Promise<SearchResult> {
  const merchantIntent = detectMerchantIntent(qRaw);
  if (merchantIntent) {
    return runMerchantBrowse(qRaw, budgetMaxParam, merchantIntent.merchant, merchantIntent.remainingQuery);
  }

  const priceFilter = parsePriceFilter(qRaw, budgetMaxParam);
  const priceMin = priceFilter.min;
  const priceMax = priceFilter.max;

  const terms = expandQuery(qRaw);
  const styleIntent = wineStyleIntentFromQuery(qRaw);
  const formatIntent = wineFormatIntentFromQuery(qRaw);
  let feeds_ok = 0;
  let feeds_failed = 0;

  const lists = await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        let products = await getCachedFeedProducts(feed);
        products = applyPriceFilter(products, priceMin, priceMax);

        if (!products.length) {
          feeds_ok++;
          return [];
        }

        const matches = products.filter((p) => {
          if (!productEligibleForWineSearch(p)) return false;
          if (styleIntent && !productMatchesWineStyle(p, styleIntent)) return false;
          if (formatIntent && !productMatchesWineFormat(p, formatIntent)) return false;
          if (formatIntent === "bag-in-box") {
            const brandTerms = brandTermsBeyondFormat(terms);
            const hay = p._search || "";
            if (brandTerms.length > 0) {
              return brandTerms.some((t) => hay.includes(t));
            }
            return terms.some((t) => hay.includes(t)) || productIsBagInBox(p);
          }
          return terms.some((t) => (p._search || "").includes(t));
        });

        if (!matches.length) {
          feeds_ok++;
          return [];
        }

        feeds_ok++;
        return toHits(matches);
      } catch (err) {
        feeds_failed++;
        console.error(`[search] feed FAILED for ${feed.merchant}:`, err instanceof Error ? err.message : err);
        return [];
      }
    }),
  );

  let items = lists.flat();

  items = items.sort((a, b) => {
    const bibBoost = (p: ProductHit) =>
      formatIntent === "bag-in-box" && productIsBagInBox(p) ? 30 : 0;
    const tierPenalty = (p: ProductHit) => (p.tier === "free" ? FREE_TIER_SCORE_PENALTY : 0);
    const sa = score(a, terms) + bibBoost(a) - tierPenalty(a);
    const sb = score(b, terms) + bibBoost(b) - tierPenalty(b);
    return (
      sb - sa ||
      (a.tier === "free" ? 1 : 0) - (b.tier === "free" ? 1 : 0) ||
      (a.image ? 0 : 1) - (b.image ? 0 : 1) ||
      (a.price ?? 9e9) - (b.price ?? 9e9)
    );
  });

  items = diversifyTopByMerchant(items, DIVERSIFY_PREFIX);

  const matched_before_cap = items.length;
  const results_capped = matched_before_cap > RESULT_CAP;
  items = items.slice(0, RESULT_CAP);

  const meta = emptyMeta({
    feeds_ok,
    feeds_failed,
    priceMin,
    priceMax,
    matched_before_cap,
    results_capped,
  });

  if (items.length) return { source: "feed", products: items, meta };
  return { source: "fallback", products: [], meta };
}
