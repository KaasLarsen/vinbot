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

test("pickFeaturedHomeWinesFromCatalog springer vinskabe og duftsæt over", () => {
  const catalog = [
    wine({
      slug: "cooler",
      displayTitle: "Champagnekøleskab til indbygning - WineCave 700 30S Anthracite Black",
      brand: "mQuvée",
      category: "Wine - Built-in (under counter)",
      image: "https://img/c.jpg",
    }),
    wine({
      slug: "aroma",
      displayTitle: "Le Nez du Vin - Red Wines 12 aromas - Duftsæt",
      brand: "Le Nez du Vin",
      category: "Wine",
      image: "https://img/a.jpg",
    }),
    wine({
      slug: "multi",
      displayTitle: "Artevino multifunktionsskab OXG3T199NVSD",
      brand: "Artevino",
      image: "https://img/m.jpg",
    }),
    wine({
      slug: "cooler-2",
      displayTitle: "Champagnekøleskab til indbygning 60 cm - mQuvée WineCave 700 60S",
      brand: "mQuvée",
      image: "https://img/c2.jpg",
    }),
    wine({
      slug: "white-1",
      displayTitle: "Riesling Mosel",
      category: "Hvidvin",
      description: "Serveres fra køleskab.",
      image: "https://img/w.jpg",
    }),
    wine({ slug: "spark-1", displayTitle: "Champagne Brut", category: "Champagne", image: "https://img/s.jpg" }),
    wine({ slug: "red-1", displayTitle: "Rioja Reserva", category: "Rødvin", image: "https://img/r.jpg" }),
  ];

  const picked = pickFeaturedHomeWinesFromCatalog(catalog, ["gone-slug"], ["gone-af"], 4);
  const slugs = picked.map((w) => w.slug);

  assert.deepEqual(slugs.filter((s) => ["cooler", "aroma", "multi", "cooler-2"].includes(s)), []);
  assert.ok(slugs.includes("white-1"));
  assert.ok(slugs.includes("spark-1"));
  assert.ok(slugs.includes("red-1"));
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
