import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { heuristicWineChatPlan } from "./fallback.ts";

describe("heuristicWineChatPlan", () => {
  it("foreslår både rød og hvid til grillkød + salat", () => {
    const plan = heuristicWineChatPlan("Rester af grillkød og salat. Rød eller hvid?");
    assert.ok(plan.searchQueries.length >= 2);
    assert.match(plan.searchQueries.join(" "), /rød|hvid|grill|salat/i);
    assert.match(plan.reply, /Begge|rød|hvid/i);
    assert.equal(plan.budgetMax, null);
  });

  it("læser budget under X kr", () => {
    const plan = heuristicWineChatPlan("kylling og gedeost under 120 kr");
    assert.equal(plan.budgetMax, 120);
    assert.ok(plan.searchQueries.some((q) => /hvid|vin til/i.test(q)));
    assert.match(plan.reply, /120/);
  });

  it("finder bobler til fest", () => {
    const plan = heuristicWineChatPlan("Vi skal have bobler til festen");
    assert.ok(plan.searchQueries.some((q) => /prosecco|cava|bobler|mousserende/i.test(q)));
    assert.match(plan.reply, /bobler|prosecco|cava/i);
  });
});
