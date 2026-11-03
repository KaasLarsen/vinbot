import assert from "node:assert/strict";
import test from "node:test";

import { pickWineSitemapSlugs, WINE_SITEMAP_SLUG_LIMIT } from "./sitemap-slugs.ts";

test("WINE_SITEMAP_SLUG_LIMIT er 500", () => {
  assert.equal(WINE_SITEMAP_SLUG_LIMIT, 500);
});

test("pickWineSitemapSlugs: featured først, derefter billed-vine, capped", () => {
  const wines = [
    { slug: "z-image", image: "https://example.com/z.jpg" },
    { slug: "a-image", image: "https://example.com/a.jpg" },
    { slug: "featured-one", image: null },
    { slug: "no-image", image: null },
    { slug: "b-image", image: "https://example.com/b.jpg" },
  ];
  const picked = pickWineSitemapSlugs(wines, ["featured-one", "missing-featured"], 3);
  assert.deepEqual(picked, ["featured-one", "a-image", "b-image"]);
});

test("pickWineSitemapSlugs: tomt katalog", () => {
  assert.deepEqual(pickWineSitemapSlugs([], ["x"], 10), []);
});
