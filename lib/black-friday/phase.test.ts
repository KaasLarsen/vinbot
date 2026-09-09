import assert from "node:assert/strict";
import test from "node:test";

import { blackFridayYmd, blackFridayWindow, resolveBlackFridayPhase } from "./phase.ts";

test("Black Friday 2026 is 27 November", () => {
  assert.deepEqual(blackFridayYmd(2026), { year: 2026, month: 11, day: 27 });
  const w = blackFridayWindow(2026);
  assert.deepEqual(w.blackWeekMonday, { year: 2026, month: 11, day: 23 });
  assert.deepEqual(w.cyberMonday, { year: 2026, month: 11, day: 30 });
});

test("9 September is prelude (SEO-optakt)", () => {
  assert.equal(resolveBlackFridayPhase({ year: 2026, month: 9, day: 9 }), "prelude");
});

test("15 October is prelude", () => {
  assert.equal(resolveBlackFridayPhase({ year: 2026, month: 10, day: 15 }), "prelude");
});

test("Black Friday week is live", () => {
  assert.equal(resolveBlackFridayPhase({ year: 2026, month: 11, day: 23 }), "live");
  assert.equal(resolveBlackFridayPhase({ year: 2026, month: 11, day: 27 }), "live");
  assert.equal(resolveBlackFridayPhase({ year: 2026, month: 11, day: 30 }), "live");
});

test("2 December is offseason", () => {
  assert.equal(resolveBlackFridayPhase({ year: 2026, month: 12, day: 2 }), "offseason");
});
