import { revalidateTag } from "next/cache";

import { recordDailyPriceSnapshot } from "@/lib/black-friday/price-snapshots";
import { dispatchPriceAlerts } from "@/lib/price-alerts/dispatch";
import {
  warmPopularSearchQueries,
  warmSearchFeeds,
  type WarmPopularSearchResult,
} from "@/lib/search/warm-popular";
import { warmFeaturedWineSlugs } from "@/lib/cron/warm-featured";
import { warmWineCatalog } from "@/lib/vine/catalog";
import type { WineCatalog } from "@/lib/vine/types";

export { warmFeaturedWineSlugs } from "@/lib/cron/warm-featured";

export type WarmFeedsTimings = {
  invalidateMs: number;
  feedsMs: number;
  catalogMs: number;
  featuredMs: number;
  priceMs: number;
  searchMs: number;
  totalMs: number;
};

export type WarmFeedsResult = {
  forced: boolean;
  revalidated: boolean;
  tag: "vinbot-feeds";
  catalogWines: number;
  catalogGeneratedAt: string | null;
  featuredWarmed: string[];
  featuredFailed: string[];
  priceSnapshot: Awaited<ReturnType<typeof recordDailyPriceSnapshot>> | null;
  priceAlerts:
    | { considered: number; sent: number; skipped: number; failed: number }
    | { error: string }
    | null;
  searchWarm: WarmPopularSearchResult | { error: string };
  timings: WarmFeedsTimings;
};

export type WarmFeedsOptions = {
  /** Kun natlig force-cron: invalider tag og rebuild. Daglige crons warmer uden stampede. */
  force?: boolean;
  includeFeatured?: boolean;
  includePriceSideEffects?: boolean;
};

function msSince(start: number): number {
  return Math.max(0, Date.now() - start);
}

/**
 * Fælles warm efter feed-ændring / periodisk keep-warm.
 * Rækkefølge: (valgfri invalidate) → feeds → katalog → featured → price → populære searches.
 * `force: false` (default): ingen revalidateTag — undgår cold-cache stampede under trafik.
 */
export async function warmAfterFeedChange(opts: WarmFeedsOptions = {}): Promise<WarmFeedsResult> {
  const force = Boolean(opts.force);
  const includeFeatured = opts.includeFeatured !== false;
  const includePriceSideEffects = Boolean(opts.includePriceSideEffects);
  const totalStart = Date.now();

  let invalidateMs = 0;
  if (force) {
    const t0 = Date.now();
    revalidateTag("vinbot-feeds", "max");
    invalidateMs = msSince(t0);
  }

  const feedsStart = Date.now();
  let feeds: WarmPopularSearchResult["feeds"] = [];
  try {
    feeds = await warmSearchFeeds();
  } catch (err) {
    console.error("warmSearchFeeds:", err);
    feeds = [];
  }
  const feedsMs = msSince(feedsStart);

  const catalogStart = Date.now();
  let catalog: WineCatalog | null = null;
  try {
    catalog = await warmWineCatalog();
  } catch (err) {
    console.error("warmWineCatalog:", err);
  }
  const catalogMs = msSince(catalogStart);

  let featuredWarmed: string[] = [];
  let featuredFailed: string[] = [];
  let featuredMs = 0;
  if (includeFeatured) {
    const featuredStart = Date.now();
    const featured = await warmFeaturedWineSlugs();
    featuredWarmed = featured.warmed;
    featuredFailed = featured.failed;
    featuredMs = msSince(featuredStart);
  }

  let priceSnapshot: WarmFeedsResult["priceSnapshot"] = null;
  let priceAlerts: WarmFeedsResult["priceAlerts"] = null;
  let priceMs = 0;
  if (includePriceSideEffects && catalog) {
    const priceStart = Date.now();
    try {
      priceSnapshot = await recordDailyPriceSnapshot(catalog);
    } catch (err) {
      console.error("recordDailyPriceSnapshot:", err);
      priceSnapshot = null;
    }
    try {
      priceAlerts = await dispatchPriceAlerts(catalog);
    } catch (err) {
      console.error("dispatchPriceAlerts:", err);
      priceAlerts = { error: "dispatch failed" };
    }
    priceMs = msSince(priceStart);
  }

  const searchStart = Date.now();
  let searchWarm: WarmPopularSearchResult | { error: string };
  try {
    const queries = await warmPopularSearchQueries();
    searchWarm = { feeds, wine: queries.wine, spirits: queries.spirits };
  } catch (err) {
    console.error("warmPopularSearchQueries:", err);
    searchWarm = { error: "warm search failed" };
  }
  const searchMs = msSince(searchStart);

  return {
    forced: force,
    revalidated: force,
    tag: "vinbot-feeds",
    catalogWines: catalog?.wines.length ?? 0,
    catalogGeneratedAt: catalog?.generatedAt ?? null,
    featuredWarmed,
    featuredFailed,
    priceSnapshot,
    priceAlerts,
    searchWarm,
    timings: {
      invalidateMs,
      feedsMs,
      catalogMs,
      featuredMs,
      priceMs,
      searchMs,
      totalMs: msSince(totalStart),
    },
  };
}
