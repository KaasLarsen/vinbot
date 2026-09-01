import assert from "node:assert/strict";
import test from "node:test";
import { getHomeMoment, resolveHomeMomentId, copenhagenParts } from "./home-moment.ts";

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
});
