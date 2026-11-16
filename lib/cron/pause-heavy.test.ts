import assert from "node:assert/strict";
import test from "node:test";

import { isHeavyWorkPaused } from "./pause-heavy.ts";

test("isHeavyWorkPaused reads VINBOT_PAUSE_HEAVY", () => {
  const prev = process.env.VINBOT_PAUSE_HEAVY;
  try {
    delete process.env.VINBOT_PAUSE_HEAVY;
    assert.equal(isHeavyWorkPaused(), false);

    process.env.VINBOT_PAUSE_HEAVY = "1";
    assert.equal(isHeavyWorkPaused(), true);

    process.env.VINBOT_PAUSE_HEAVY = "true";
    assert.equal(isHeavyWorkPaused(), true);

    process.env.VINBOT_PAUSE_HEAVY = "0";
    assert.equal(isHeavyWorkPaused(), false);
  } finally {
    if (prev === undefined) delete process.env.VINBOT_PAUSE_HEAVY;
    else process.env.VINBOT_PAUSE_HEAVY = prev;
  }
});
