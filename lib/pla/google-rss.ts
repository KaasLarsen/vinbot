import { getMerchantWineConfig, wineDetailPagePath } from "@/lib/wine-detail-pages/merchants";
import { siteUrl } from "@/lib/site";
import type { PlaCatalogItem } from "./types";

const G_NS = "http://base.google.com/ns/1.0";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatPrice(n: number, currency: string): string {
  return `${n.toFixed(2)} ${currency}`;
}

function itemXml(item: PlaCatalogItem, base: string): string {
  const cfg = getMerchantWineConfig(item.merchantId);
  const link = `${base}${wineDetailPagePath(item.merchantId, item.slug)}`;
  const desc =
    item.description.trim().slice(0, 5000) ||
    `${item.title} hos ${cfg.displayName}. Gå til butikken fra Vinbots produktside.`;
  const gtin = item.gtin && /^\d{8,14}$/.test(item.gtin) ? item.gtin : null;
  const mpn = item.mpn?.trim() || null;

  const extra: string[] = [];
  if (gtin) extra.push(`      <g:gtin>${xmlEscape(gtin)}</g:gtin>`);
  if (mpn) extra.push(`      <g:mpn>${xmlEscape(mpn.slice(0, 70))}</g:mpn>`);
  if (!gtin && !mpn) extra.push(`      <g:identifier_exists>no</g:identifier_exists>`);

  const onSale =
    item.merchantId === "dh-wines" &&
    item.referencePrice != null &&
    Number.isFinite(item.referencePrice) &&
    item.referencePrice > item.price;
  const listedPrice = onSale ? item.referencePrice! : item.price;
  const salePriceXml = onSale
    ? `\n      <g:sale_price>${xmlEscape(formatPrice(item.price, item.currency))}</g:sale_price>`
    : "";

  const productType = "Vin";

  return `    <item>
      <title>${xmlEscape(item.title)}</title>
      <link>${xmlEscape(link)}</link>
      <description>${xmlEscape(desc)}</description>
      <guid isPermaLink="false">${xmlEscape(item.offerId)}</guid>
      <g:id>${xmlEscape(item.offerId)}</g:id>
      <g:title>${xmlEscape(item.title)}</g:title>
      <g:description>${xmlEscape(desc)}</g:description>
      <g:link>${xmlEscape(link)}</g:link>
      <g:image_link>${xmlEscape(item.imageUrl)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${xmlEscape(formatPrice(listedPrice, item.currency))}</g:price>${salePriceXml}
      <g:brand>${xmlEscape(item.brand)}</g:brand>
      <g:google_product_category>499676</g:google_product_category>
      <g:product_type>${xmlEscape(productType)}</g:product_type>
      <g:custom_label_0>${xmlEscape(cfg.displayName)}</g:custom_label_0>
      <g:shipping>
        <g:country>DK</g:country>
        <g:service>Standard</g:service>
        <g:price>29.00 DKK</g:price>
      </g:shipping>
${extra.join("\n")}
    </item>`;
}

export function renderGooglePlaRss(items: PlaCatalogItem[]): string {
  const base = siteUrl.replace(/\/$/, "");
  const body = items.map((it) => itemXml(it, base)).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="${G_NS}">
  <channel>
    <title>Vinbot PLA</title>
    <link>${xmlEscape(base)}</link>
    <description>SPS Wine og DH Wines produktsider paa Vinbot med Gaa til butik.</description>
    <language>da</language>
${body}
  </channel>
</rss>
`;
}
