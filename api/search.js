// /api/search.js
// Node 18 på Vercel har global fetch. CommonJS export for maksimal kompatibilitet.

module.exports = async (req, res) => {
  try {
    const q = (req.query.q || "").toString().trim();
    if (!q) return res.status(200).json({ products: [] });

    const FEEDS = [
      { merchant: "Mere om Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
      { merchant: "Winther Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
      { merchant: "Vinea",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" },
    ];

    // helper: parse <product> blocks (Partner-ads XML)
    const parseXmlProducts = (xml, merchant) => {
      const out = [];
      const blocks = xml.split(/<product>/i).slice(1).map(b => b.split(/<\/product>/i)[0]);
      for (const block of blocks) {
        const pick = (tag) => {
          const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
          return m ? decodeHTMLEntities(m[1].trim()) : "";
        };
        const title    = pick("name") || pick("title");
        const priceStr = pick("price") || pick("price_inc_vat") || pick("price_old");
        const currency = pick("currency") || "DKK";
        const image    = pick("imageurl") || pick("image");
        const url      = pick("deeplink") || pick("link");
        if (!title || !url) continue;
        const price = toNumber(priceStr);
        out.push({ merchant, title, price, currency, image, url });
      }
      return out;
    };

    const fetchOne = async ({ merchant, url }) => {
      try {
        const r = await fetch(url, { headers: { "cache-control": "no-cache" } });
        const xml = await r.text();
        const all = parseXmlProducts(xml, merchant);
        const hits = all.filter(p => includesCI(p.title, q)).slice(0, 6);
        return hits;
      } catch (e) {
        console.error("Feed error", merchant, e);
        return [];
      }
    };

    const perMerchant = await Promise.all(FEEDS.map(fetchOne));
    const products = perMerchant.flat().sort((a, b) => (a.price ?? 9e9) - (b.price ?? 9e9));

    // tillad CORS til dit domæne hvis nødvendigt
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({ products });
  } catch (err) {
    console.error("search_failed", err);
    res.status(200).json({ products: [] }); // returnér tom i stedet for 500, så UI ikke “dør”
  }
};

function includesCI(str, q){ return (str||"").toLowerCase().includes((q||"").toLowerCase()); }
function toNumber(s){
  if (!s) return null;
  const n = s.replace(/\s/g,"").replace(/\./g,"").replace(/,/g,".");
  const v = parseFloat(n);
  return Number.isFinite(v) ? v : null;
}
function decodeHTMLEntities(t){
  return t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'");
}
