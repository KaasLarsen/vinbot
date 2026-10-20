import assert from "node:assert/strict";
import { test } from "node:test";

import { listGuides } from "./guide-index.ts";

test("listGuides returnerer samme liste ved andet kald", () => {
  const first = listGuides();
  const second = listGuides();
  assert.equal(first, second);
  assert.ok(first.length > 100);
  assert.ok(first.every((guide) => guide.slug.length > 0));
});
