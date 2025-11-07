// /api/search.js  — Vercel Serverless Function
// Finder produkter i Partner-ads feeds og returnerer { products: [...] } med billede/price/link
// Prototype: enkel XML-parser (nok til Partner-ads' standardformat)

export default async function handler(req, res) {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.status(200).json({ products: [] });

    // 🔗 DINE FEEDS (kan udvides løbende)
    const FEEDS = [
      {
        merchant: "Mere om Vin",
        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182"
      },
      {
        merchant: "Winther Vin",
        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766"
      },
      {
        merchant: "Vinea",
        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767"
      }
    ];

    // Hjælper: meget enkel XML-ekstraktion pr. <product>…</product>
    const parseXmlProducts = (xml, merchant) => {
      const out = [];
      const productBlocks = xml.split(/<\/?product>/i).filter(s => s.trim()).filter((_,i)=> i%2===1);
      for (const block of productBlocks) {
        const pick = (tag) => {
          const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
          return m ? decodeHTMLEntities(m[1].trim()) : "";
        };
        const name = pick("name") || pick("title");
        const priceStr = pick("price") || pick("price_inc_vat") || pick("price_old") || "";
        const currency = pick("currency") || "DKK";
        const image = pick("imageurl") || pick("image") || "";
        const deeplink = pick("deeplink") || pick("link") || "";

        if (!name || !deeplink) continue;
        const price = toNumber(priceStr);
        out.push({ merchant, title: name, price, currency, image, url: deeplink });
      }
      return out;
    };

    const resultsPerMerchant = await Promise.all(
      FEEDS.map(async ({ merchant, url }) => {
        try {
          const r = await fetch(url, { headers: { "cache-control": "no-cache" } });
          const xml = await r.text();
          const all = parseXmlProducts(xml, merchant);
          // simpel match: søg i titel (case-insensitive)
          const hits = all.filter(p => includesCI(p.title, q)).slice(0, 6);
          return hits;
        } catch (e) {
          console.error("Feed error", merchant, e);
          return [];
        }
      })
    );

    // Kun faktiske hits
    const products = resultsPerMerchant.flat();

    // sortér: billigst først inden for samme merchant, ellers bare som fundet
    products.sort((a, b) => (a.price || 9e9) - (b.price || 9e9));

    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ products: [], error: "search_failed" });
  }
}

// utils
function includesCI(str, q) { return (str || "").toLowerCase().includes((q || "").toLowerCase()); }
function toNumber(s) {
  if (!s) return null;
  // fjerner tusindtalsseparatorer og bruger punkt som decimal
  const n = s.replace(/\s/g, "").replace(/\./g, "").replace(/,/g, ".");
  const v = parseFloat(n);
  return Number.isFinite(v) ? v : null;
}
function decodeHTMLEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}
