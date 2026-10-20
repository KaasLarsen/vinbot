import assert from "node:assert/strict";
import { test } from "node:test";

import { searchCacheKey } from "./cache-key.ts";

test("ens søgninger deler cache-nøgle", () => {
  assert.equal(searchCacheKey("Pinot  Noir", null, null), searchCacheKey("pinot noir", null, null));
  assert.equal(searchCacheKey("  chianti ", 50, 150), "chianti|50|150");
});

test("budget indgår i cache-nøglen", () => {
  assert.notEqual(searchCacheKey("pinot noir", null, 100), searchCacheKey("pinot noir", null, 150));
  assert.notEqual(searchCacheKey("pinot noir", 40, null), searchCacheKey("pinot noir", null, null));
});

test("ugyldigt budget behandles som intet budget", () => {
  assert.equal(searchCacheKey("pinot", Number.NaN, null), searchCacheKey("pinot", null, null));
});
