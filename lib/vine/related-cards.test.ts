import assert from "node:assert/strict";
import { test } from "node:test";

import { attachRelatedCards, pickRelatedWines } from "./related-wines.ts";
import type { CanonicalWine } from "./types.ts";

function wine(partial: {
  slug: string;
  displayTitle: string;
  category: string;
  brand: string;
  price: number;
}): CanonicalWine {
  return {
    id: `id:${partial.slug}`,
    slug: partial.slug,
    displayTitle: partial.displayTitle,
    brand: partial.brand,
    category: partial.category,
    description: null,
    alternateListingTitles: [],
    image: null,
    gtin: null,
    mpn: null,
    offers: [
      {
        merchant: "Test",
        tier: "paid",
        price: partial.price,
        currency: "DKK",
        url: "https://example.test/vin",
        listingTitle: partial.displayTitle,
      },
    ],
    updated: "2026-01-01T00:00:00.000Z",
  };
}

test("forudberegnede related-kort matcher pickRelatedWines", () => {
  const wines = [
    wine({
      slug: "rioja-reserva",
      displayTitle: "Rioja Reserva",
      category: "Rødvin",
      brand: "Ondarre",
      price: 120,
    }),
    wine({
      slug: "rioja-crianza",
      displayTitle: "Rioja Crianza",
      category: "Rødvin",
      brand: "Ondarre",
      price: 110,
    }),
    wine({
      slug: "chablis",
      displayTitle: "Chablis",
      category: "Hvidvin",
      brand: "Test",
      price: 130,
    }),
  ];

  const withRelated = attachRelatedCards(wines, 2);
  const expected = pickRelatedWines(wines[0], wines, { limit: 2 }).map((item) => item.slug);
  assert.deepEqual(
    withRelated[0].related?.map((item) => item.slug),
    expected,
  );
  assert.equal(withRelated[0].related?.[0]?.fromPrice, 110);
  assert.equal(withRelated[0].related?.[0]?.offerCount, 1);
});
