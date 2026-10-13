import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { messageHasBeerIntent } from "./beer-intent.ts";

describe("messageHasBeerIntent", () => {
  it("genkender chip og eksplicit øl", () => {
    assert.equal(
      messageHasBeerIntent("Specialøl til maden — hvad passer til grillkød eller en kraftig gryderet?"),
      true,
    );
    assert.equal(messageHasBeerIntent("Har I en IPA til burger?"), true);
    assert.equal(messageHasBeerIntent("stout til andesteg"), true);
  });

  it("lader almindelige vin-spørgsmål være vin", () => {
    assert.equal(messageHasBeerIntent("Rester af grillkød og salat. Rød eller hvid?"), false);
    assert.equal(messageHasBeerIntent("Hverdagsvin under 100 kr til pasta"), false);
  });
});
