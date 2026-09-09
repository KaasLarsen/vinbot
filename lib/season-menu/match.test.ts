import assert from "node:assert/strict";
import test from "node:test";

import type { MatchableDeal } from "./match.ts";
import { pickDealForRole, scoreDealForRole } from "./match.ts";
import { rolesForMenu } from "./roles.ts";

function card(partial: Partial<MatchableDeal> & Pick<MatchableDeal, "id" | "title">): MatchableDeal {
  return {
    kind: "feed",
    brand: "",
    merchant: "Testvin",
    image: null,
    url: `https://example.com/${partial.id}`,
    salePrice: 139,
    referencePrice: 199,
    discountPercent: 30,
    ...partial,
  };
}

const classicRoles = rolesForMenu({
  event: "juleaften",
  redStyle: "classic",
  welcomeBubbles: 1,
  white: 0,
  red: 3,
  dessert: 1,
});

const kraftigRoles = rolesForMenu({
  event: "juleaften",
  redStyle: "kraftig",
  welcomeBubbles: 1,
  white: 0,
  red: 3,
  dessert: 1,
});

test("classic rød foretrækker pinot over amarone", () => {
  const red = classicRoles.find((r) => r.id === "red")!;
  const pinot = card({ id: "p", title: "Bourgogne Pinot Noir 2022" });
  const amarone = card({ id: "a", title: "Amarone della Valpolicella" });
  assert.equal(scoreDealForRole(pinot, red) > scoreDealForRole(amarone, red), true);
});

test("kraftig rød matcher amarone", () => {
  const red = kraftigRoles.find((r) => r.id === "red")!;
  const amarone = card({ id: "a", title: "Amarone Classico" });
  const pinot = card({ id: "p", title: "Pinot Noir Alsace" });
  assert.equal(scoreDealForRole(amarone, red) > scoreDealForRole(pinot, red), true);
});

test("dessert matcher tawny og ignorerer tør rød", () => {
  const dessert = classicRoles.find((r) => r.id === "dessert")!;
  const tawny = card({ id: "t", title: "Tawny Port 10 Years" });
  const chianti = card({ id: "c", title: "Chianti Classico" });
  assert.equal(scoreDealForRole(tawny, dessert) >= 0, true);
  assert.equal(scoreDealForRole(chianti, dessert) < 0, true);
});

test("budgetfilter dropper flasker over max", () => {
  const red = classicRoles.find((r) => r.id === "red")!;
  const cheap = card({ id: "c", title: "Chianti Classico", salePrice: 89 });
  const pricey = card({ id: "x", title: "Chianti Riserva", salePrice: 249 });
  const pick = pickDealForRole([pricey, cheap], red, "hverdag", new Set(), new Set());
  assert.equal(pick?.id, "c");
});

test("velkomst matcher cava", () => {
  const welcome = classicRoles.find((r) => r.id === "welcome")!;
  const cava = card({ id: "b", title: "Cava Brut Reserva" });
  assert.equal(scoreDealForRole(cava, welcome) >= 0, true);
});
