import assert from "node:assert/strict";
import test from "node:test";

import { FEEDS } from "@/lib/feeds/config";
import { WINE_COOLER_MERCHANTS } from "@/lib/search/wine-cooler";
import { isWineSearchFeed, WINE_SEARCH_FEEDS } from "@/lib/search/wine-search-feeds";

test("WINE_SEARCH_FEEDS excludes cooler mega-feeds", () => {
  for (const merchant of WINE_COOLER_MERCHANTS) {
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
  assert.ok(WINE_SEARCH_FEEDS.length >= FEEDS.length - WINE_COOLER_MERCHANTS.length);
});

test("isWineSearchFeed matches cooler list", () => {
  assert.equal(isWineSearchFeed({ merchant: "Homeshop.dk" }), false);
  assert.equal(isWineSearchFeed({ merchant: "DH Wines" }), true);
});
