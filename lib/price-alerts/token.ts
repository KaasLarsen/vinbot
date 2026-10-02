import { createHmac, timingSafeEqual } from "node:crypto";

/** Signer afmeldingslinks. Eget secret, ellers samme nøgle som feed-cron. */
export function priceAlertTokenSecret(): string | null {
  const secret = process.env.PRICE_ALERT_TOKEN_SECRET?.trim() || process.env.CRON_SECRET?.trim();
  return secret || null;
}

export function signPriceAlertToken(alertId: string): string {
  const secret = priceAlertTokenSecret();
  if (!secret) {
    throw new Error("PRICE_ALERT_TOKEN_SECRET eller CRON_SECRET mangler");
  }
  const sig = createHmac("sha256", secret).update(alertId).digest("base64url");
  return `${alertId}.${sig}`;
}

export function verifyPriceAlertToken(token: string): string | null {
  const secret = priceAlertTokenSecret();
  if (!secret) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const alertId = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^[0-9a-f-]{36}$/i.test(alertId) || !sig) return null;
  const expected = createHmac("sha256", secret).update(alertId).digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return null;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return null;
  return alertId;
}
