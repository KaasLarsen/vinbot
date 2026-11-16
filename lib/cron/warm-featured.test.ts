import assert from "node:assert/strict";
import test from "node:test";

import { warmFeaturedWineSlugs } from "./warm-featured.ts";

test("warmFeaturedWineSlugs with empty list does no HTTP and returns empty", async () => {
  const result = await warmFeaturedWineSlugs([]);
  assert.deepEqual(result, { warmed: [], failed: [] });
});
