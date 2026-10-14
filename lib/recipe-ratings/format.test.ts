import assert from "node:assert/strict";
import test from "node:test";

import { formatRatingLabel, summarizeRatings } from "./format.ts";

test("ingen stemmer giver Ingen anmeldelser", () => {
  assert.equal(formatRatingLabel({ average: null, count: 0 }), "Ingen anmeldelser");
});

test("gennemsnit rundes til én decimal og ental bøjes", () => {
  assert.deepEqual(summarizeRatings([5]), { average: 5, count: 1 });
  assert.equal(formatRatingLabel({ average: 5, count: 1 }), "5,0 fra 1 stemme");
  assert.deepEqual(summarizeRatings([1, 2, 5]), { average: 2.7, count: 3 });
  assert.equal(formatRatingLabel({ average: 2.7, count: 3 }), "2,7 fra 3 stemmer");
});
