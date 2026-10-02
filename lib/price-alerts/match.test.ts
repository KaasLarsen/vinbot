import assert from "node:assert/strict";
import test from "node:test";

import {
  PRICE_ALERT_DEDUP_MS,
  currentPaidDeal,
  minPaidPrice,
  qualifyingOffers,
  type AlertOffer,
} from "./match.ts";

const now = Date.UTC(2026, 9, 2, 12, 0, 0);

function offer(partial: Partial<AlertOffer> & Pick<AlertOffer, "merchant" | "price">): AlertOffer {
  return {
    merchant: partial.merchant,
    tier: partial.tier ?? "paid",
    price: partial.price,
    url: partial.url ?? "https://butik.example/vin",
    referencePrice: partial.referencePrice ?? null,
    discountPercent: partial.discountPercent ?? null,
  };
}

test("minPaidPrice ignorerer gratis listninger", () => {
  assert.equal(
    minPaidPrice([
      offer({ merchant: "Gratis", tier: "free", price: 40 }),
      offer({ merchant: "Partner", price: 120 }),
    ]),
    120,
  );
  assert.equal(minPaidPrice([offer({ merchant: "Gratis", tier: "free", price: 40 })]), null);
});

test("kun betalt rabat på mindst 15 procent udløser tilbud", () => {
  const offers = [
    offer({ merchant: "Lille", price: 90, discountPercent: 14, referencePrice: 105 }),
    offer({ merchant: "Stor", price: 80, discountPercent: 20, referencePrice: 100 }),
    offer({ merchant: "Gratis", tier: "free", price: 50, discountPercent: 40, referencePrice: 90 }),
  ];
  const hits = qualifyingOffers(offers, 100, now, []);
  assert.deepEqual(
    hits.map((h) => h.merchant),
    ["Stor"],
  );
  assert.equal(currentPaidDeal(offers)?.merchant, "Stor");
});

test("prisfald uden førpris kræver mindst 10 procent og 20 kr under baseline", () => {
  const offers = [offer({ merchant: "Partner", price: 180 })];
  assert.equal(qualifyingOffers(offers, 200, now, []).length, 1);
  assert.equal(qualifyingOffers([offer({ merchant: "Partner", price: 90 })], 100, now, []).length, 0);
  assert.equal(qualifyingOffers([offer({ merchant: "Partner", price: 185 })], 200, now, []).length, 0);
});

test("seed blokerer samme butik og pris, sendte mails kun i 14 dage", () => {
  const offers = [offer({ merchant: "Partner", price: 80, discountPercent: 20, referencePrice: 100 })];
  const seeded = qualifyingOffers(offers, 100, now, [
    { merchant: "Partner", price: 80, kind: "seed", sentAt: now - PRICE_ALERT_DEDUP_MS * 3 },
  ]);
  assert.equal(seeded.length, 0);

  const recent = qualifyingOffers(offers, 100, now, [
    { merchant: "Partner", price: 80, kind: "sent", sentAt: now - PRICE_ALERT_DEDUP_MS + 1000 },
  ]);
  assert.equal(recent.length, 0);

  const expired = qualifyingOffers(offers, 100, now, [
    { merchant: "Partner", price: 80, kind: "sent", sentAt: now - PRICE_ALERT_DEDUP_MS - 1000 },
  ]);
  assert.equal(expired.length, 1);

  const newPrice = qualifyingOffers(
    [offer({ merchant: "Partner", price: 70, discountPercent: 30, referencePrice: 100 })],
    100,
    now,
    [{ merchant: "Partner", price: 80, kind: "seed", sentAt: now }],
  );
  assert.equal(newPrice.length, 1);
  assert.equal(newPrice[0]?.price, 70);
});

test("http-links tages ikke med", () => {
  const hits = qualifyingOffers(
    [offer({ merchant: "Partner", price: 50, discountPercent: 50, url: "http://butik.example/vin" })],
    100,
    now,
    [],
  );
  assert.equal(hits.length, 0);
});
