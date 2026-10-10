/**
 * Clerk.io / Taster Wine JSON-feeds (`ClerkProvider`).
 * Holdes uden `@/`-imports, så node --test kan køre det direkte.
 */
import { ensurePartnerAdsKlikUid } from "../partner-ads-links.ts";
import type { FeedProduct } from "./types.ts";

export function looksLikeJSON(txt: string): boolean {
  const t = (txt || "").trimStart();
  return t.startsWith("{") || t.startsWith("[");
}

function normalize(s = ""): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeBarcodeDigits(raw: string | null | undefined): string | null {
  const d = String(raw ?? "").replace(/\D/g, "");
  return d.length >= 8 ? d : null;
}

function toNumber(s: string | null | undefined): number | null {
  if (!s) return null;
  let str = String(s).trim();
  str = str.replace(/\s*(kr\.?|dkk)\s*$/i, "").replace(/\s/g, "");
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(str)) {
    str = str.replace(/\./g, "").replace(",", ".");
    const v = parseFloat(str);
    return Number.isFinite(v) ? v : null;
  }
  if (/^\d+,\d+$/.test(str)) {
    const v = parseFloat(str.replace(",", "."));
    return Number.isFinite(v) ? v : null;
  }
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(str)) {
    const v = parseFloat(str.replace(/,/g, ""));
    return Number.isFinite(v) ? v : null;
  }
  const v = parseFloat(str);
  return Number.isFinite(v) ? v : null;
}

function computeDiscountPercent(sale: number | null, reference: number | null): number | null {
  if (sale == null || reference == null || reference <= sale) return null;
  const pct = Math.round(((reference - sale) / reference) * 100);
  return pct >= 5 ? pct : null;
}

function looksLikeHttpUrl(s: string): boolean {
  const t = (s || "").trim();
  return /^https?:\/\//i.test(t) && !/[<>]/.test(t);
}

function jsonString(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v.trim();
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return "";
}

function jsonNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") return toNumber(v);
  return null;
}

/** Positiv pris — `list_price: 0` i Clerk-feeds betyder «ingen listepris». */
function jsonPositivePrice(v: unknown): number | null {
  const n = jsonNumber(v);
  return n != null && n > 0 ? n : null;
}

function jsonCategory(v: unknown): string {
  if (Array.isArray(v)) return v.map(jsonString).filter(Boolean).join(", ");
  return jsonString(v);
}

function jsonFirstEan(v: unknown): string | null {
  const candidates = Array.isArray(v) ? v : v != null ? [v] : [];
  for (const c of candidates) {
    const gtin = normalizeBarcodeDigits(jsonString(c));
    if (gtin) return gtin;
  }
  return null;
}

function isJsonItemBlocked(v: unknown): boolean {
  const s = jsonString(v).toLowerCase();
  return s === "ja" || s === "yes" || s === "true" || s === "1";
}

/**
 * Pris: brug `priceWithVat` (ikke `price`, som typisk er ekskl. moms).
 */
export function parseJSONProducts(text: string, merchant: string): FeedProduct[] {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return [];
  }

  const products: unknown[] = Array.isArray(data)
    ? data
    : data && typeof data === "object" && Array.isArray((data as { products?: unknown }).products)
      ? (data as { products: unknown[] }).products
      : [];

  const out: FeedProduct[] = [];
  for (const raw of products) {
    if (!raw || typeof raw !== "object") continue;
    const p = raw as Record<string, unknown>;
    if (isJsonItemBlocked(p.itemBlocked)) continue;

    const title = jsonString(p.name) || jsonString(p.title) || jsonString(p.itemName);
    const url = jsonString(p.url) || jsonString(p.link) || jsonString(p.deeplink);
    if (!title || !url) continue;

    const image = jsonString(p.image) || jsonString(p.image_url) || jsonString(p.imageUrl);
    const salePrice =
      jsonPositivePrice(p.priceWithVat) ??
      jsonPositivePrice(p.price_with_vat) ??
      jsonPositivePrice(p.price);
    const referencePrice =
      jsonPositivePrice(p.regularPriceWithVat) ??
      jsonPositivePrice(p.regular_price_with_vat) ??
      jsonPositivePrice(p.list_price) ??
      jsonPositivePrice(p.regularPrice);
    const discountPercent = computeDiscountPercent(salePrice, referencePrice);

    const brand = jsonString(p.brandName) || jsonString(p.brand);
    const category =
      jsonCategory(p.category) ||
      jsonString(p.primary_category_name) ||
      jsonString(p.productType);
    const desc =
      jsonString(p.short_description) ||
      jsonString(p.description) ||
      jsonString(p.inGlassDescription);
    const currency = jsonString(p.currency_code) || jsonString(p.currency) || "DKK";
    const gtin = jsonFirstEan(p.eAN) ?? jsonFirstEan(p.ean) ?? jsonFirstEan(p.gtin);
    const mpnRaw = jsonString(p.sku) || jsonString(p.mpn);
    const mpn = mpnRaw || null;

    out.push({
      merchant,
      tier: "paid",
      title,
      desc,
      category,
      brand,
      gtin,
      mpn,
      price: salePrice,
      salePrice,
      referencePrice,
      discountPercent,
      currency,
      image: looksLikeHttpUrl(image) ? image : "",
      url: ensurePartnerAdsKlikUid(url),
      _search: normalize([title, desc, category, brand, merchant].filter(Boolean).join(" ")),
    });
  }
  return out;
}
