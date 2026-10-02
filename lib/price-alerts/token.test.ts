import assert from "node:assert/strict";
import test from "node:test";

import { signPriceAlertToken, verifyPriceAlertToken } from "./token.ts";

const ALERT_ID = "11111111-2222-4333-8444-555555555555";

test("afmeldings-token kan verificeres og afvises ved ændring", () => {
  process.env.PRICE_ALERT_TOKEN_SECRET = "test-secret";
  const token = signPriceAlertToken(ALERT_ID);
  assert.equal(verifyPriceAlertToken(token), ALERT_ID);
  assert.equal(verifyPriceAlertToken(`${token}x`), null);
  assert.equal(verifyPriceAlertToken("ikke-et-token"), null);
  delete process.env.PRICE_ALERT_TOKEN_SECRET;
});
