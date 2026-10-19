import assert from "node:assert/strict";
import { test } from "node:test";

import { expandSpiritsQuery, productIsSpiritLike } from "./spirits.ts";

test("productIsSpiritLike genkender rom, gin og whisky", () => {
  assert.equal(
    productIsSpiritLike({ title: "Great Dane Rum (70cl)", category: "Lagret rom", desc: "" }),
    true,
  );
  assert.equal(
    productIsSpiritLike({ title: "Herbie Gin Original (70cl)", category: "Gin", desc: "" }),
    true,
  );
  assert.equal(
    productIsSpiritLike({ title: "Lagavulin 16 Year Old Whisky", category: "Whisky", desc: "" }),
    true,
  );
  assert.equal(
    productIsSpiritLike({ title: "Great Dane Rum", category: "Lagret rom", desc: "Aged rum" }),
    true,
  );
});

test("productIsSpiritLike afviser champagne, plakater og øl (vinsøgningen skal ikke få dem som spiritus)", () => {
  assert.equal(
    productIsSpiritLike({ title: "Champagne Brut", category: "Champagne", desc: "" }),
    false,
  );
  assert.equal(
    productIsSpiritLike({ title: "Gin plakat (30×50 cm)", category: "Merchandise", desc: "" }),
    false,
  );
  assert.equal(
    productIsSpiritLike({ title: "IPA Craft Beer 33cl", category: "Craft beer", desc: "" }),
    false,
  );
  /* Ren spiritus — productEligibleForWineSearch kalder productIsSpiritLike og afviser. */
  assert.equal(
    productIsSpiritLike({ title: "Herbie Pink Gin (70cl)", category: "Gin", desc: "Dansk gin" }),
    true,
  );
  assert.equal(
    productIsSpiritLike({ title: "Riesling Mosel", category: "Hvidvin", desc: "" }),
    false,
  );
});

test("expandSpiritsQuery synker rom/rum og whisky/whiskey", () => {
  const rom = expandSpiritsQuery("rom");
  assert.ok(rom.includes("rom"));
  assert.ok(rom.includes("rum"));

  const whisky = expandSpiritsQuery("whisky");
  assert.ok(whisky.includes("whisky"));
  assert.ok(whisky.includes("whiskey"));

  const empty = expandSpiritsQuery("");
  assert.ok(empty.includes("gin"));
  assert.ok(empty.includes("rom"));
});
