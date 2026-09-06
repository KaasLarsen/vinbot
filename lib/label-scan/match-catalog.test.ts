import assert from "node:assert/strict";
import test from "node:test";
import {
  matchCatalogFromLabelText,
  queryFromTokens,
  tokenizeLabelText,
} from "./match-catalog.ts";
import type { CanonicalWine } from "../vine/types.ts";

function wine(
  partial: Partial<CanonicalWine> & Pick<CanonicalWine, "slug" | "displayTitle">,
): CanonicalWine {
  return {
    id: partial.id ?? `sig:${partial.slug}`,
    slug: partial.slug,
    displayTitle: partial.displayTitle,
    brand: partial.brand ?? "",
    category: partial.category ?? "Rødvin",
    description: null,
    alternateListingTitles: partial.alternateListingTitles ?? [],
    image: null,
    gtin: partial.gtin ?? null,
    mpn: null,
    offers: partial.offers ?? [
      {
        merchant: "Test",
        tier: "paid",
        price: 129,
        currency: "DKK",
        url: "https://example.com",
        listingTitle: partial.displayTitle,
      },
    ],
    updated: "2026-01-01T00:00:00.000Z",
  };
}

test("tokenizeLabelText drops stopwords and finds barcode", () => {
  const { tokens, barcode } = tokenizeLabelText(
    "Château Margaux 2018 Rouge Appellation 75 cl 5701234567890",
  );
  assert.equal(barcode, "5701234567890");
  assert.ok(tokens.includes("margaux"));
  assert.ok(!tokens.includes("rouge"));
  assert.ok(!tokens.includes("appellation"));
});

test("GTIN match wins immediately", () => {
  const wines = [
    wine({ slug: "anden-vin", displayTitle: "Anden Vin", gtin: "1111111111111" }),
    wine({ slug: "target", displayTitle: "Target Vin", gtin: "5701234567890" }),
  ];
  const result = matchCatalogFromLabelText(wines, "etiket tekst 5701234567890 mere");
  assert.equal(result.match?.slug, "target");
  assert.equal(result.query, "5701234567890");
});

test("title+brand tokens pick the right wine", () => {
  const wines = [
    wine({
      slug: "barolo-poet",
      displayTitle: "Il Poeta Barolo DOCG",
      brand: "Fratelli",
      alternateListingTitles: ["Il Poeta Barolo 2019"],
    }),
    wine({
      slug: "chianti-basic",
      displayTitle: "Chianti Classico",
      brand: "Antinori",
    }),
  ];
  const result = matchCatalogFromLabelText(
    wines,
    "Fratelli Il Poeta Barolo DOCG 2019 Piemonte Italy contains sulphites",
  );
  assert.equal(result.match?.slug, "barolo-poet");
  assert.ok(result.query.length > 0);
});

test("weak / ambiguous text yields no strong match", () => {
  const wines = [
    wine({ slug: "a", displayTitle: "Rødvin Husets", brand: "Hus" }),
    wine({ slug: "b", displayTitle: "Rødvin Slot", brand: "Slot" }),
  ];
  const result = matchCatalogFromLabelText(wines, "vin rouge 75 cl");
  assert.equal(result.match, null);
});

test("queryFromTokens prefers longer tokens", () => {
  const q = queryFromTokens(["rio", "nebbiolo", "barolo", "piemonte"], "x");
  assert.ok(q.includes("nebbiolo") || q.includes("barolo"));
});
