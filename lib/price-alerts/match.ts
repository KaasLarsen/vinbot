/** Grænse der matcher tilbudssiden: kun tydelige partner-rabatter. */
export const PRICE_ALERT_MIN_DISCOUNT = 15;
/** Partnerpris skal være højst 90 % af baseline (mindst 10 % fald). */
export const PRICE_ALERT_DROP_RATIO = 0.9;
export const PRICE_ALERT_DROP_KR = 20;
export const PRICE_ALERT_DEDUP_MS = 14 * 24 * 60 * 60 * 1000;
export const PRICE_ALERT_MAX_PER_EMAIL = 20;
export const PRICE_ALERT_MAX_SENDS_PER_RUN = 40;
export const PRICE_ALERT_MAX_OFFERS_PER_MAIL = 3;

export type AlertOffer = {
  merchant: string;
  tier: "paid" | "free";
  price: number | null;
  url: string;
  referencePrice?: number | null;
  discountPercent?: number | null;
};

export type AlertSendRecord = {
  merchant: string;
  price: number;
  kind: "sent" | "seed";
  sentAt: number;
};

export type PriceAlertCandidate = {
  merchant: string;
  price: number;
  url: string;
  discountPercent: number | null;
  referencePrice: number | null;
  reason: "discount" | "drop";
};

export function priceKey(price: number): number {
  return Math.round(price * 100) / 100;
}

export function minPaidPrice(offers: AlertOffer[]): number | null {
  const prices = offers
    .filter((o) => o.tier === "paid" && typeof o.price === "number")
    .map((o) => o.price as number);
  if (prices.length === 0) return null;
  return priceKey(Math.min(...prices));
}

function isHttpsUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isSuppressed(sends: AlertSendRecord[], merchant: string, price: number, now: number): boolean {
  const key = priceKey(price);
  return sends.some((s) => {
    if (s.merchant !== merchant || priceKey(s.price) !== key) return false;
    if (s.kind === "seed") return true;
    return now - s.sentAt < PRICE_ALERT_DEDUP_MS;
  });
}

/**
 * Betalte tilbud der bør udløse en mail.
 * Seed-rækker (tilstanden ved tilmelding) undertrykker samme butik+pris for altid.
 * Afsendte mails undertrykkes i 14 dage.
 */
export function qualifyingOffers(
  offers: AlertOffer[],
  baselineMinPaidPrice: number | null,
  now: number,
  recentSends: AlertSendRecord[],
): PriceAlertCandidate[] {
  const out: PriceAlertCandidate[] = [];

  for (const offer of offers) {
    if (offer.tier !== "paid" || typeof offer.price !== "number") continue;
    if (!isHttpsUrl(offer.url)) continue;

    const price = priceKey(offer.price);
    const discount =
      typeof offer.discountPercent === "number" && offer.discountPercent >= PRICE_ALERT_MIN_DISCOUNT
        ? offer.discountPercent
        : null;
    const baseline =
      typeof baselineMinPaidPrice === "number" && Number.isFinite(baselineMinPaidPrice)
        ? priceKey(baselineMinPaidPrice)
        : null;
    const dropped =
      baseline != null &&
      price <= priceKey(baseline * PRICE_ALERT_DROP_RATIO) &&
      baseline - price >= PRICE_ALERT_DROP_KR;

    if (discount == null && !dropped) continue;
    if (isSuppressed(recentSends, offer.merchant, price, now)) continue;

    out.push({
      merchant: offer.merchant,
      price,
      url: offer.url,
      discountPercent: discount,
      referencePrice: typeof offer.referencePrice === "number" ? priceKey(offer.referencePrice) : null,
      reason: discount != null ? "discount" : "drop",
    });
  }

  out.sort((a, b) => {
    const da = a.discountPercent ?? 0;
    const db = b.discountPercent ?? 0;
    return db - da || a.price - b.price || a.merchant.localeCompare(b.merchant, "da");
  });

  return out;
}

export function currentPaidDeal(offers: AlertOffer[]): {
  merchant: string;
  price: number;
  discountPercent: number | null;
} | null {
  const [best] = qualifyingOffers(offers, null, 0, []);
  if (!best || best.discountPercent == null) return null;
  return {
    merchant: best.merchant,
    price: best.price,
    discountPercent: best.discountPercent,
  };
}
