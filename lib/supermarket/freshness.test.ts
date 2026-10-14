import assert from "node:assert/strict";
import test from "node:test";
import { SERP_DESCRIPTION_MAX, SERP_TITLE_BUDGET } from "../seo/serp-meta.ts";
import { getAllChains, getChain, getChainsByGuideSlug } from "./chains.ts";
import {
  chainH1,
  chainMetaDescription,
  chainMetaTitle,
  copenhagenMonthYear,
  indexMetaTitle,
} from "./freshness.ts";

test("oktober 2026 i København, også lige efter midnat dansk tid", () => {
  const eveningBefore = copenhagenMonthYear(new Date("2026-09-30T22:30:00.000Z"));
  assert.equal(eveningBefore.month, "oktober");
  assert.equal(eveningBefore.year, 2026);

  const stillOctober = copenhagenMonthYear(new Date("2026-10-14T05:00:00.000Z"));
  assert.equal(stillOctober.month, "oktober");
  assert.equal(stillOctober.year, 2026);
});

test("november starter ved midnat dansk tid", () => {
  const parts = copenhagenMonthYear(new Date("2026-10-31T23:30:00.000Z"));
  assert.equal(parts.month, "november");
  assert.equal(parts.year, 2026);
});

test("kæde-titler holder sig inden for SERP-budgettet hele året", () => {
  const chains = getAllChains();
  assert.equal(chains.length, 6);
  assert.equal(new Set(chains.map((c) => c.slug)).size, 6);

  for (const chain of chains) {
    for (let month = 0; month < 12; month++) {
      const date = new Date(Date.UTC(2026, month, 15, 12, 0, 0));
      const title = chainMetaTitle(chain.name, date);
      const description = chainMetaDescription(chain.descriptionTemplate, date);
      assert.ok(title.length <= SERP_TITLE_BUDGET, `${chain.slug} title: ${title}`);
      assert.ok(title.includes(chain.name), title);
      assert.ok(title.includes("2026"), title);
      assert.ok(description.length <= SERP_DESCRIPTION_MAX, `${chain.slug} desc: ${description}`);
      assert.equal(description.endsWith("…"), false, description);
      assert.match(description, /2026/);
    }
  }
});

test("H1 for Netto i oktober 2026", () => {
  const date = new Date("2026-10-14T08:00:00+02:00");
  assert.equal(chainH1("Netto", date), "Bedste vin i Netto lige nu (oktober 2026)");
  assert.equal(chainMetaTitle("Netto", date), "Bedste vin i Netto lige nu (oktober 2026)");
  assert.ok(indexMetaTitle(date).includes("oktober 2026"));
  assert.ok(indexMetaTitle(date).length <= SERP_TITLE_BUDGET);
});

test("opslag og guide-banner", () => {
  assert.equal(getChain("netto")?.name, "Netto");
  assert.equal(getChain("findes-ikke"), undefined);
  const foetexBilka = getChainsByGuideSlug("bedste-vin-i-foetex-og-bilka").map((c) => c.slug);
  assert.deepEqual(foetexBilka, ["foetex", "bilka"]);
  assert.equal(getChain("netto")?.staples.some((s) => /løgismose/i.test(s.name)), false);
  assert.equal(getChain("foetex")?.staples.some((s) => s.name === "Løgismose"), true);
});
