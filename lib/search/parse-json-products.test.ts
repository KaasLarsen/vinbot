import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { looksLikeJSON, parseJSONProducts } from "./parse-json-products.ts";

const SAMPLE = JSON.stringify({
  products: [
    {
      id: "1",
      name: "Château Tour du Vieux Castel AOC Saint-Emilion Grand Cru",
      short_description: "Kraftig og aromatisk vin fra Bordeaux.",
      description: "",
      price: 119.2,
      priceWithVat: 149.0,
      regularPriceWithVat: 204.0,
      list_price: 0.0,
      image: "https://backoffice.taster-wine.com/Images/0111787.png",
      url: "https://www.oskar-davidsen.dk/produkter/chateau-tour-du-vieux-castel-0111787",
      brandName: "Château Tour du Vieux Castel",
      category: "Rødvin",
      currency_code: "DKK",
      eAN: ["3701647802657", "3701647802640"],
      sku: "0111787",
      itemBlocked: "Nej",
    },
    {
      id: "2",
      name: "Saint James Rhum, Imperial Blanc",
      price: 167.8,
      priceWithVat: 209.75,
      regularPriceWithVat: 209.75,
      image: "https://backoffice.taster-wine.com/Images/4011271.png",
      url: "https://www.oskar-davidsen.dk/produkter/saint-james-rhum-imp-blanc-4011271",
      category: ["Spiritus", "Rom"],
      currency_code: "DKK",
      eAN: ["3147699101186"],
      itemBlocked: "Nej",
    },
    {
      id: "3",
      name: "Blokeret flaske",
      priceWithVat: 100,
      url: "https://www.oskar-davidsen.dk/produkter/blocked",
      image: "https://backoffice.taster-wine.com/Images/x.png",
      category: "Rødvin",
      itemBlocked: "Ja",
    },
  ],
});

describe("parseJSONProducts (Clerk/Taster)", () => {
  it("detects JSON feeds", () => {
    assert.equal(looksLikeJSON(SAMPLE), true);
    assert.equal(looksLikeJSON('{"products":[]}'), true);
    assert.equal(looksLikeJSON("  [1]"), true);
    assert.equal(looksLikeJSON("<?xml"), false);
  });

  it("maps priceWithVat, EAN and skips blocked items", () => {
    const products = parseJSONProducts(SAMPLE, "Oskar Davidsen");
    assert.equal(products.length, 2);

    const wine = products[0];
    assert.equal(wine.merchant, "Oskar Davidsen");
    assert.equal(wine.title, "Château Tour du Vieux Castel AOC Saint-Emilion Grand Cru");
    assert.equal(wine.price, 149);
    assert.equal(wine.salePrice, 149);
    assert.equal(wine.referencePrice, 204);
    assert.equal(wine.discountPercent, 27);
    assert.equal(wine.currency, "DKK");
    assert.equal(wine.gtin, "3701647802657");
    assert.equal(wine.brand, "Château Tour du Vieux Castel");
    assert.equal(wine.category, "Rødvin");
    assert.equal(wine.image, "https://backoffice.taster-wine.com/Images/0111787.png");
    assert.match(wine.url, /oskar-davidsen\.dk/);
    assert.ok(wine._search.includes("bordeaux") || wine._search.includes("rodvin"));

    const rum = products[1];
    assert.equal(rum.price, 209.75);
    assert.equal(rum.category, "Spiritus, Rom");
    assert.equal(rum.gtin, "3147699101186");
  });

  it("does not use excl-VAT price when priceWithVat is present", () => {
    const products = parseJSONProducts(SAMPLE, "Oskar Davidsen");
    assert.notEqual(products[0].price, 119.2);
    assert.equal(products[0].price, 149);
  });
});
