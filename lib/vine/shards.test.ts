import assert from "node:assert/strict";
import { test } from "node:test";

import { WINE_SHARD_COUNT, wineShardIndex } from "./shards.ts";

test("wineShardIndex er stabil og inden for shard-antallet", () => {
  const slug = "riesling-2024-riesling-l-dr-loosen-515ff401";
  const index = wineShardIndex(slug);
  assert.equal(wineShardIndex(slug), index);
  assert.ok(index >= 0 && index < WINE_SHARD_COUNT);
});

test("opslag finder vinen i dens shard og ikke i de andre", () => {
  const wines = [{ slug: "alpha-wine" }, { slug: "beta-wine" }, { slug: "gamma-wine-reserva" }];
  const shards = Array.from({ length: WINE_SHARD_COUNT }, () => [] as { slug: string }[]);
  for (const wine of wines) shards[wineShardIndex(wine.slug)].push(wine);

  for (const wine of wines) {
    const index = wineShardIndex(wine.slug);
    assert.equal(shards[index].find((item) => item.slug === wine.slug)?.slug, wine.slug);
    for (let i = 0; i < WINE_SHARD_COUNT; i++) {
      if (i === index) continue;
      assert.equal(
        shards[i].some((item) => item.slug === wine.slug),
        false,
      );
    }
  }
});
