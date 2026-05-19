import { productJsonLdGtinFields } from "@/lib/gtin-validation";

const PRODUCER_PREFIX =
  /^(Château|Chateau|Domaine|Weingut|Weinhof|Tenuta|Bodega|Cantina|Castello|Quinta|Casa|Clos|Mas|Maison|Fattoria|Borgo|Cantine|Cooperativa|Kellerei|Winery|Vignoble|Chateau)/i;

const STYLE_SUFFIX =
  /\b(tinto|blanc|rouge|brut|sec|demi|extra|trocken|halbtrocken|feinherb|dry|sweet|dolce|amabile|spumante|frizzante|mousserende|sparkling|still|nv)\b\s*$/i;

const GENERIC_WINE_WORDS = new Set(
  [
    "salento",
    "trocken",
    "originale",
    "rheingau",
    "riesling",
    "primitivo",
    "susumaniello",
    "alte",
    "reben",
    "rose",
    "rosé",
    "red",
    "white",
    "vin",
    "wine",
    "tinto",
    "blanc",
    "rouge",
    "aperitivo",
    "mousserende",
    "rodvin",
    "hvidvin",
    "rødvin",
  ].map((w) => w.toLowerCase()),
);

/** Shopify `/products/{slug}` — bruges som sku i JSON-LD når GTIN mangler. */
export function shopifyProductSlugFromUrl(url: string): string | null {
  const m = url.match(/\/products\/([^/?#]+)/i);
  if (!m?.[1]) return null;
  try {
    return decodeURIComponent(m[1]).trim().slice(0, 128) || null;
  } catch {
    return m[1].trim().slice(0, 128) || null;
  }
}

function stripVintageAndTail(title: string): string {
  return title
    .replace(/\b(19|20)\d{2}\b.*$/i, "")
    .replace(/\bNV\b.*$/i, "")
    .replace(/\s[-|–—]\s.*$/, "")
    .replace(STYLE_SUFFIX, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Gæt producent/brand fra vintitel når feeds ikke leverer brand.
 * Konservativ heuristik — bedre end tomt brand-felt i Merchant Listings.
 */
export function inferWineProducerBrand(title: string): string | null {
  const t = title.trim();
  if (!t) return null;

  const weinhof = t.match(/^(Weinhof\s+\d+)/i);
  if (weinhof) return weinhof[1].trim();

  if (PRODUCER_PREFIX.test(t)) {
    const words = t.split(/\s+/);
    const chunk = words.slice(0, Math.min(3, words.length)).join(" ");
    const cleaned = stripVintageAndTail(chunk);
    if (cleaned.length >= 3) return cleaned;
  }

  const main = stripVintageAndTail(t.split(/\s[-|–—]\s/)[0] ?? t);
  if (main.length >= 3 && main.length <= 48) {
    const words = main.split(/\s+/);
    if (words.length <= 4) return main;
    if (words.length >= 2) return words.slice(0, 2).join(" ");
  }

  const words = stripVintageAndTail(t).split(/\s+/).filter(Boolean);
  for (let i = words.length - 1; i >= 0; i--) {
    const w = words[i];
    if (!/^[A-ZÆØÅ][\w''-]{2,}$/.test(w)) continue;
    if (GENERIC_WINE_WORDS.has(w.toLowerCase())) continue;
    return w;
  }

  if (words[0] && words[0].length >= 3) {
    return words.length >= 2 && words[1].length <= 4 ? `${words[0]} ${words[1]}` : words[0];
  }

  return null;
}

export function resolveProductBrandForJsonLd(opts: {
  brand?: string | null;
  titles?: readonly string[];
}): string | null {
  const direct = opts.brand?.trim();
  if (direct) return direct;

  for (const title of opts.titles ?? []) {
    const inferred = inferWineProducerBrand(title);
    if (inferred) return inferred;
  }

  return null;
}

/** GTIN/EAN + mpn/sku til schema.org Product — undgå falske GTIN. */
export function productJsonLdIdentifierFields(opts: {
  gtin?: string | null;
  mpn?: string | null;
  sku?: string | null;
}): Record<string, string> {
  const out: Record<string, string> = { ...productJsonLdGtinFields(opts.gtin) };

  const hasGtin = "gtin13" in out || "gtin12" in out || "gtin8" in out || "gtin14" in out;
  if (hasGtin) return out;

  const mpn = opts.mpn?.trim();
  if (mpn) {
    out.mpn = mpn.length > 128 ? mpn.slice(0, 128) : mpn;
    return out;
  }

  if (!out.sku) {
    const sku = opts.sku?.trim();
    if (sku) out.sku = sku.length > 128 ? sku.slice(0, 128) : sku;
  }

  return out;
}
