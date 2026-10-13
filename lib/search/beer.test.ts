import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { expandBeerQuery, isBeerLike, productEligibleForBeerSearch } from "./beer.ts";

describe("isBeerLike / productEligibleForBeerSearch", () => {
  it("genkender øl og afviser vin", () => {
    assert.equal(
      isBeerLike({ title: "Mikkeller IPA 33 cl", category: "Beer", brand: "Mikkeller", desc: "" }),
      true,
    );
    assert.equal(
      productEligibleForBeerSearch({
        title: "To Øl Black Malts & Body Salts Stout",
        category: "Stout",
        brand: "To Øl",
        desc: "",
      }),
      true,
    );
    assert.equal(
      isBeerLike({ title: "Barolo DOCG 2019", category: "Rødvin", brand: "", desc: "" }),
      false,
    );
  });
});

describe("expandBeerQuery", () => {
  it("udvider grill til ipa", () => {
    const terms = expandBeerQuery("øl til grill");
    assert.ok(terms.some((t) => t.includes("ipa") || t.includes("pale")));
  });
});
