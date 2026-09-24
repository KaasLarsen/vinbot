import assert from "node:assert/strict";
import test from "node:test";
import {
  getHomeMoment,
  resolveHomeMomentId,
  copenhagenParts,
  pickFeaturedDrinkSlugs,
  pickFeaturedRecipeSlugs,
} from "./home-moment.ts";

function idAt(iso: string) {
  return getHomeMoment(new Date(iso)).id;
}

test("jul on Christmas Eve", () => {
  assert.equal(idAt("2026-12-24T12:00:00+01:00"), "jul");
});

test("nytår after Christmas", () => {
  assert.equal(idAt("2026-12-30T12:00:00+01:00"), "nytaar");
  assert.equal(idAt("2026-01-03T12:00:00+01:00"), "nytaar");
});

test("fastelavn in early February", () => {
  assert.equal(idAt("2026-02-10T12:00:00+01:00"), "fastelavn");
});

test("påske window", () => {
  assert.equal(idAt("2026-04-05T12:00:00+02:00"), "paaske");
});

test("konfirmation in ISO weeks 18–24", () => {
  const parts = copenhagenParts(new Date("2026-05-13T12:00:00+02:00"));
  assert.ok(parts.isoWeek >= 18 && parts.isoWeek <= 24);
  assert.equal(resolveHomeMomentId(parts), "konfirmation");
  assert.equal(idAt("2026-05-13T12:00:00+02:00"), "konfirmation");
});

test("Mortensaften window", () => {
  assert.equal(idAt("2026-11-10T12:00:00+01:00"), "mortens");
});

test("Friday takeaway beats grill season", () => {
  assert.equal(idAt("2026-07-10T15:00:00+02:00"), "friday");
});

test("Sunday simmer", () => {
  assert.equal(idAt("2026-07-12T10:00:00+02:00"), "sunday");
});

test("midweek July is grill", () => {
  assert.equal(idAt("2026-07-08T12:00:00+02:00"), "grill");
});

test("October weekday is efterår", () => {
  assert.equal(idAt("2026-10-07T12:00:00+02:00"), "efteraar");
});

test("late January weekday is vinter", () => {
  assert.equal(idAt("2026-01-20T12:00:00+01:00"), "vinter");
});

test("early March weekday is forår", () => {
  assert.equal(idAt("2026-03-10T12:00:00+01:00"), "foraar");
});

test("moment includes three home links and dish order", () => {
  const m = getHomeMoment(new Date("2026-12-24T12:00:00+01:00"));
  assert.equal(m.links.length, 3);
  assert.equal(m.dishIds[0], "flaeskesteg");
  assert.ok(m.recipeSlugs.length >= 3);
  assert.ok(m.drinkSlugs.length >= 3);
});

test("pickFeaturedRecipeSlugs rotates by isoWeek", () => {
  const pool = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const w1 = pickFeaturedRecipeSlugs(pool, 1);
  const w2 = pickFeaturedRecipeSlugs(pool, 2);
  assert.equal(w1.length, 4);
  assert.equal(w2.length, 4);
  assert.notDeepEqual(w1, w2);
  assert.deepEqual(pickFeaturedRecipeSlugs(pool, 1), w1);
});

test("pickFeaturedDrinkSlugs rotates by isoWeek", () => {
  const pool = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const w1 = pickFeaturedDrinkSlugs(pool, 1);
  const w2 = pickFeaturedDrinkSlugs(pool, 2);
  assert.equal(w1.length, 4);
  assert.equal(w2.length, 4);
  assert.notDeepEqual(w1, w2);
  assert.deepEqual(pickFeaturedDrinkSlugs(pool, 1), w1);
});

test("efterår featured recipes change across ISO weeks", () => {
  // Wed 2026-09-23 = week 39, Wed 2026-09-30 = week 40 — both efterår
  const a = getHomeMoment(new Date("2026-09-23T12:00:00+02:00"));
  const b = getHomeMoment(new Date("2026-09-30T12:00:00+02:00"));
  assert.equal(a.id, "efteraar");
  assert.equal(b.id, "efteraar");
  assert.equal(a.recipeSlugs.length, 4);
  assert.equal(b.recipeSlugs.length, 4);
  assert.notDeepEqual(a.recipeSlugs, b.recipeSlugs);
  assert.equal(a.drinkSlugs.length, 4);
  assert.equal(b.drinkSlugs.length, 4);
  assert.notDeepEqual(a.drinkSlugs, b.drinkSlugs);
});

test("same timestamp yields same featured slugs", () => {
  const iso = "2026-09-23T12:00:00+02:00";
  assert.deepEqual(getHomeMoment(new Date(iso)).recipeSlugs, getHomeMoment(new Date(iso)).recipeSlugs);
  assert.deepEqual(getHomeMoment(new Date(iso)).drinkSlugs, getHomeMoment(new Date(iso)).drinkSlugs);
});
