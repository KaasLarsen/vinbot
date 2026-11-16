import assert from "node:assert/strict";
import test from "node:test";

import { parseForceFlag } from "./force-flag.ts";

test("parseForceFlag parses force query values", () => {
  assert.equal(parseForceFlag(null), false);
  assert.equal(parseForceFlag(undefined), false);
  assert.equal(parseForceFlag(""), false);
  assert.equal(parseForceFlag("0"), false);
  assert.equal(parseForceFlag("1"), true);
  assert.equal(parseForceFlag("true"), true);
  assert.equal(parseForceFlag("YES"), true);
});
