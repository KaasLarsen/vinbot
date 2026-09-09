import assert from "node:assert/strict";
import test from "node:test";

import { calculateSeasonWineQuantity } from "./season.ts";

test("juleaften for 6 voksne matcher guidetabellen med buffer", () => {
  const r = calculateSeasonWineQuantity({ guests: 6, event: "juleaften" });
  assert.equal(r.breakdown.welcomeBubbles >= 1, true);
  assert.equal(r.breakdown.red >= 2, true);
  assert.equal(r.breakdown.dessert >= 1, true);
  assert.equal(r.breakdown.white, 0);
  assert.equal(r.totalBottles >= 4, true);
  assert.equal(r.totalBottles <= 8, true);
});

test("juleaften runder op og skalerer med gæster", () => {
  const four = calculateSeasonWineQuantity({ guests: 4, event: "juleaften" });
  const twelve = calculateSeasonWineQuantity({ guests: 12, event: "juleaften" });
  assert.equal(four.breakdown.red >= 2, true);
  assert.equal(twelve.totalBottles > four.totalBottles, true);
  assert.equal(twelve.breakdown.welcomeBubbles >= 2, true);
});

test("nytår for 6 har velkomst, hvid, rød og midnat", () => {
  const r = calculateSeasonWineQuantity({ guests: 6, event: "nytaar" });
  assert.equal(r.breakdown.welcomeBubbles >= 1, true);
  assert.equal(r.breakdown.white >= 2, true);
  assert.equal(r.breakdown.red >= 3, true);
  assert.equal(r.breakdown.dessert >= 1, true);
});

test("julefrokost inkluderer hvidvin", () => {
  const r = calculateSeasonWineQuantity({ guests: 8, event: "julefrokost" });
  assert.equal(r.breakdown.white >= 2, true);
  assert.equal(r.breakdown.red >= 2, true);
});
