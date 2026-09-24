import assert from "node:assert/strict";
import { test } from "node:test";

import {
  pickFeaturedHomeWinesFromCatalog,
  wineLooksAlcoholFree,
} from "./featured-slugs.ts";
import type { CanonicalWine } from "./types.ts";

function wine(partial: Partial<CanonicalWine> & Pick<CanonicalWine, "slug" | "displayTitle">): CanonicalWine {
  return {
    id: partial.id ?? `id:${partial.slug}`,
    slug: partial.slug,
    displayTitle: partial.displayTitle,
    brand: partial.brand ?? "",
    category: partial.category ?? "",
    description: partial.description ?? null,
    alternateListingTitles: partial.alternateListingTitles ?? [],
    image: partial.image ?? null,
    gtin: partial.gtin ?? null,
    mpn: partial.mpn ?? null,
    offers: partial.offers ?? [{ merchant: "Test", tier: "paid", price: 100, currency: "DKK", url: "https://ex", listingTitle: partial.displayTitle }],
    updated: partial.updated ?? "2026-01-01",
  };
}

test("wineLooksAlcoholFree matches titel og 0,0 %", () => {
  assert.equal(wineLooksAlcoholFree(wine({ slug: "a", displayTitle: "Alkoholfri bobler" })), true);
  assert.equal(wineLooksAlcoholFree(wine({ slug: "b", displayTitle: "Vin 0,0 %" })), true);
  assert.equal(wineLooksAlcoholFree(wine({ slug: "c", displayTitle: "Pinot Noir 2020" })), false);
});

test("pickFeaturedHomeWinesFromCatalog fylder op når kuraterede slug'e mangler", () => {
  const catalog = [
    wine({ slug: "af-tea", displayTitle: "Alkoholfri Tea", category: "Mousserende", image: "https://img/af.jpg" }),
    wine({ slug: "white-1", displayTitle: "Riesling Mosel", category: "Hvidvin", image: "https://img/w.jpg" }),
    wine({ slug: "spark-1", displayTitle: "Champagne Brut", category: "Champagne", image: "https://img/s.jpg" }),
    wine({ slug: "red-1", displayTitle: "Rioja Reserva", category: "Rødvin", image: "https://img/r.jpg" }),
    wine({ slug: "no-img", displayTitle: "Uden billede", category: "Rødvin", image: null }),
  ];

  const picked = pickFeaturedHomeWinesFromCatalog(
    catalog,
    ["gone-slug-1", "gone-slug-2", "gone-slug-3"],
    ["also-gone-af"],
    4,
  );

  assert.equal(picked.length, 4);
  assert.ok(picked.some(wineLooksAlcoholFree));
  assert.ok(picked.every((w) => Boolean(w.image)));
  assert.deepEqual(
    picked.map((w) => w.slug).sort(),
    ["af-tea", "red-1", "spark-1", "white-1"].sort(),
  );
});

test("pickFeaturedHomeWinesFromCatalog respekterer kuraterede slug'e først", () => {
  const catalog = [
    wine({ slug: "curated-af", displayTitle: "Alkoholfri curated", image: "https://img/af.jpg" }),
    wine({ slug: "curated-white", displayTitle: "Hvid curated", category: "Hvidvin", image: "https://img/w.jpg" }),
    wine({ slug: "other-red", displayTitle: "Anden rød", category: "Rødvin", image: "https://img/r.jpg" }),
  ];

  const picked = pickFeaturedHomeWinesFromCatalog(
    catalog,
    ["curated-white", "missing"],
    ["curated-af"],
    4,
  );

  assert.equal(picked[0]?.slug, "curated-af");
  assert.equal(picked[1]?.slug, "curated-white");
  assert.equal(picked[2]?.slug, "other-red");
  assert.equal(picked.length, 3);
});
