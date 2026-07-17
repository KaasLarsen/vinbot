#!/usr/bin/env node
/**
 * Audit affiliate feeds for sale vs reference price coverage.
 *   node scripts/audit-feed-deals.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/** Minimal feed list — mirrors lib/feeds/config.ts merchants + urls. */
const configText = fs.readFileSync(path.join(root, "lib/feeds/config.ts"), "utf8");
/** @type {{ merchant: string; url: string }[]} */
const FEEDS = [];
const feedRe = /\{\s*merchant:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"/g;
let feedMatch;
while ((feedMatch = feedRe.exec(configText))) {
  FEEDS.push({ merchant: feedMatch[1], url: feedMatch[2] });
}

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

const SALE_TAGS = [
  "nypris",
  "saleprice",
  "ourprice",
  "current_price",
  "price_inc_vat",
  "price_with_vat",
  "g_price",
  "pris",
  "price",
];
const REF_TAGS = [
  "glpris",
  "gl_pris",
  "price_old",
  "oldprice",
  "original_price",
  "list_price",
  "vejl_pris",
  "for_pris",
  "foer_pris",
  "normalprice",
  "regular_price",
  "gammelpris",
  "gammel_pris",
];

function pickTag(block, tag) {
  const m = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? m[1].trim() : "";
}

function pickOne(block, tags) {
  for (const t of tags) {
    const v = pickTag(block, t);
    if (v) return v;
  }
  return "";
}

function toNumber(s) {
  if (!s) return null;
  let str = String(s).trim().replace(/\s*(kr\.?|dkk)\s*$/i, "").replace(/\s/g, "");
  if (/^\d+,\d+$/.test(str)) str = str.replace(",", ".");
  const v = parseFloat(str.replace(/[^\d.]/g, ""));
  return Number.isFinite(v) ? v : null;
}

function computeDiscount(sale, ref) {
  if (sale == null || ref == null || ref <= sale) return null;
  const pct = Math.round(((ref - sale) / ref) * 100);
  return pct >= 5 ? pct : null;
}

function splitBlocks(xml, tag) {
  return xml
    .split(new RegExp(`<${tag}\\b[^>]*>`, "i"))
    .slice(1)
    .map((b) => b.split(new RegExp(`</${tag}>`, "i"))[0]);
}

function auditXml(text, merchant) {
  let blocks = splitBlocks(text, "product");
  if (!blocks.length) blocks = splitBlocks(text, "item");
  if (!blocks.length) blocks = splitBlocks(text, "produkt");

  let total = 0;
  let withSale = 0;
  let withRef = 0;
  let withBoth = 0;
  let withDeal = 0;
  const saleFields = new Set();
  const refFields = new Set();

  for (const b of blocks) {
    const title = pickOne(b, ["name", "title", "g_title", "produktnavn"]);
    const url = pickOne(b, ["deeplink", "link", "producturl", "url", "g_link", "vareurl"]);
    if (!title || !url) continue;
    total++;

    let saleStr = "";
    for (const t of SALE_TAGS) {
      const v = pickTag(b, t);
      if (v) {
        saleStr = v;
        saleFields.add(t);
        break;
      }
    }
    let refStr = "";
    for (const t of REF_TAGS) {
      const v = pickTag(b, t);
      if (v) {
        refStr = v;
        refFields.add(t);
        break;
      }
    }

    const sale = toNumber(saleStr);
    const ref = toNumber(refStr);
    if (sale != null) withSale++;
    if (ref != null) withRef++;
    if (sale != null && ref != null) withBoth++;
    if (computeDiscount(sale, ref) != null) withDeal++;
  }

  return { merchant, total, withSale, withRef, withBoth, withDeal, saleFields: [...saleFields], refFields: [...refFields] };
}

async function main() {
  /** @type {ReturnType<typeof auditXml>[]} */
  const results = [];

  for (const feed of FEEDS) {
    try {
      const r = await fetch(feed.url, {
        headers: { "user-agent": UA, accept: "text/xml,application/xml,*/*" },
        redirect: "follow",
      });
      const text = await r.text();
      const looksXml = /<\?xml|<rss|<feed|<product|<produkt/i.test(text);
      if (!looksXml) {
        results.push({
          merchant: feed.merchant,
          total: 0,
          withSale: 0,
          withRef: 0,
          withBoth: 0,
          withDeal: 0,
          saleFields: [],
          refFields: [],
          note: "non-xml",
        });
        continue;
      }
      results.push(auditXml(text, feed.merchant));
    } catch (err) {
      results.push({
        merchant: feed.merchant,
        total: 0,
        withSale: 0,
        withRef: 0,
        withBoth: 0,
        withDeal: 0,
        saleFields: [],
        refFields: [],
        note: err instanceof Error ? err.message : "fetch failed",
      });
    }
  }

  console.log("Vinbot feed deal audit\n");
  let grandTotal = 0;
  let grandBoth = 0;
  let grandDeal = 0;

  for (const r of results) {
    grandTotal += r.total;
    grandBoth += r.withBoth;
    grandDeal += r.withDeal;
    const pctBoth = r.total ? Math.round((r.withBoth / r.total) * 100) : 0;
    const pctDeal = r.total ? Math.round((r.withDeal / r.total) * 100) : 0;
    console.log(`${r.merchant}`);
    console.log(`  products: ${r.total}  both prices: ${r.withBoth} (${pctBoth}%)  deals≥5%: ${r.withDeal} (${pctDeal}%)`);
    if (r.saleFields?.length) console.log(`  sale fields: ${r.saleFields.join(", ")}`);
    if (r.refFields?.length) console.log(`  ref fields: ${r.refFields.join(", ")}`);
    if (r.note) console.log(`  note: ${r.note}`);
    console.log("");
  }

  const overallBoth = grandTotal ? Math.round((grandBoth / grandTotal) * 100) : 0;
  const overallDeal = grandTotal ? Math.round((grandDeal / grandTotal) * 100) : 0;
  console.log(`TOTAL: ${grandTotal} products, ${grandBoth} with both prices (${overallBoth}%), ${grandDeal} deals (${overallDeal}%)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
