import assert from "node:assert/strict";
import test from "node:test";

import {
  PARTNER_ADS_UID_DAGENS,
  copenhagenDateKey,
  pickDagensFromPool,
} from "./dagens-shared.ts";
import { ensurePartnerAdsKlikUid } from "../partner-ads-links.ts";
import type { DealHit } from "../search/types.ts";

function fakeDeal(partial: Partial<DealHit> & Pick<DealHit, "title" | "discountPercent">): DealHit {
  return {
    merchant: partial.merchant ?? "Test Vin",
    tier: partial.tier ?? "paid",
    title: partial.title,
    desc: "",
    category: "",
    brand: "",
    gtin: null,
    mpn: null,
    price: partial.salePrice ?? 99,
    salePrice: partial.salePrice ?? 99,
    referencePrice: partial.referencePrice ?? 199,
    discountPercent: partial.discountPercent,
    currency: "DKK",
    image: partial.image ?? "https://example.com/wine.jpg",
    url: partial.url ?? "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537&bannerid=1&uid=vinbot",
    _search: "",
  };
}

test("PARTNER_ADS_UID_DAGENS has no slash", () => {
  assert.equal(PARTNER_ADS_UID_DAGENS.includes("/"), false);
  assert.equal(PARTNER_ADS_UID_DAGENS, "vinbot_dagens");
});

test("copenhagenDateKey returns YYYY-MM-DD", () => {
  const key = copenhagenDateKey(new Date("2026-10-13T12:00:00Z"));
  assert.match(key, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(key, "2026-10-13");
});

test("ensurePartnerAdsKlikUid can set vinbot_dagens", () => {
  const href =
    "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537&bannerid=76708&uid=vinbot&htmlurl=https%3A%2F%2Fexample.com%2Fwine";
  const out = ensurePartnerAdsKlikUid(href, PARTNER_ADS_UID_DAGENS);
  const u = new URL(out);
  assert.equal(u.searchParams.get("uid"), "vinbot_dagens");
});

test("pickDagensFromPool skips free tier and missing images", () => {
  const pick = pickDagensFromPool(
    [
      fakeDeal({ title: "Free wine", tier: "free", discountPercent: 80 }),
      fakeDeal({ title: "No image", discountPercent: 70, image: "" }),
      fakeDeal({ title: "Winner", discountPercent: 40 }),
    ],
    "2026-10-13",
  );
  assert.equal(pick?.title, "Winner");
});

test("pickDagensFromPool is stable for same day key", () => {
  const pool = [
    fakeDeal({ title: "A", discountPercent: 50, salePrice: 100 }),
    fakeDeal({ title: "B", discountPercent: 45, salePrice: 90 }),
    fakeDeal({ title: "C", discountPercent: 40, salePrice: 80 }),
    fakeDeal({ title: "D", discountPercent: 35, salePrice: 70 }),
    fakeDeal({ title: "E", discountPercent: 30, salePrice: 60 }),
  ];
  const a = pickDagensFromPool(pool, "2026-10-13");
  const b = pickDagensFromPool(pool, "2026-10-13");
  assert.equal(a?.title, b?.title);
});
