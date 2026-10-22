import assert from "node:assert/strict";
import test from "node:test";

import { FEEDS } from "@/lib/feeds/config";
import { WINE_COOLER_MERCHANTS } from "@/lib/search/wine-cooler";
import { WINE_GLASS_MERCHANTS } from "@/lib/search/wine-glass";
import { isWineSearchFeed, WINE_SEARCH_FEEDS } from "@/lib/search/wine-search-feeds";

test("WINE_SEARCH_FEEDS excludes cooler and glass mega-feeds", () => {
  for (const merchant of [...WINE_COOLER_MERCHANTS, ...WINE_GLASS_MERCHANTS]) {
    assert.equal(
      WINE_SEARCH_FEEDS.some((f) => f.merchant === merchant),
      false,
      `${merchant} should not be in wine search feeds`,
    );
  }
});

test("WINE_SEARCH_FEEDS keeps wine shops", () => {
  assert.ok(WINE_SEARCH_FEEDS.some((f) => f.merchant === "Johnsen Vine"));
  assert.ok(WINE_SEARCH_FEEDS.some((f) => f.merchant === "Winther Vin"));
  assert.ok(WINE_SEARCH_FEEDS.length < FEEDS.length);
  const excluded = WINE_COOLER_MERCHANTS.length + WINE_GLASS_MERCHANTS.length;
  assert.equal(WINE_SEARCH_FEEDS.length, FEEDS.length - excluded);
});

test("isWineSearchFeed matches cooler and glass lists", () => {
  assert.equal(isWineSearchFeed({ merchant: "Homeshop.dk" }), false);
  assert.equal(isWineSearchFeed({ merchant: "Likehome.dk" }), false);
  assert.equal(isWineSearchFeed({ merchant: "DH Wines" }), true);
});
