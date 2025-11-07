// /api/search.js
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const q = (req.query.q || "").toString().trim();
    const mock = req.query.mock === "1";
    if (!q && !mock) return json(res, { products: [] });

    // ---- MOCK DATA til test ----
    if (mock) {
      return json(res, {
        products: [
          {
            merchant: "Mere om Vin",
            title: "Barolo 2019 – Testprodukt",
            price: 159,
            currency: "DKK",
            image: "https://via.placeholder.com/256x256.png?text=Barolo",
            url: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537"
          },
          {
            merchant: "Winther Vin",
            title: "Nebbiolo Langhe – Testprodukt",
            price: 129,
            currency: "DKK",
            image: "https://via.placeholder.com/256x256.png?text=Nebbiolo",
            url: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537"
          }
        ]
      });
    }

    // ---- FEEDS ----
    const FEEDS = [
      { merchant: "Mere om Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
      { merchant: "Winther Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
      { merchant: "Vinea",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" }
    ];

    const headers = {
      "cache-control": "no-cache",
      "user-agent": "VinbotFetcher/1.0 (+https://vinbot.dk)",
      "referer": "https://vinbot.dk/"
    };

    const results = await Promise.all(FEEDS.map(async ({ merchant, url }) => {
      try {
        const r = await fetch(url, { headers });
        const xml = await r.text();
        const all = parseXmlProducts(xml, merchant);
        const hits = all.filter(p => includesCI(p.title, q)).slice(0, 6);
        return hits;
      } catch (e) {
        console.error("Feed error", merchant, e);
        return [];
      }
    }));

    const products = results.flat().sort((a,b)=>(a.price??9e9)-(b.price??9e9));
    return json(res, { products });
  } catch (err) {
    console.error("search_failed", err);
    return json(res, { products: [] });
  }
}

function json(res, obj, status=200) {
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.status(status).json(obj);
}

// -------- XML parsing helpers ----------
function includesCI(str, q){ return (str||"").toLowerCase().includes((q||"").toLowerCase()); }
function toNumber(s){
  if (!s) return null;
  const n = s.replace(/\s/g,"").replace(/\./g,"").replace(/,/g,".");
  const v = parseFloat(n);
  return Number.isFinite(v) ? v : null;
}
function decodeHTMLEntities(t){
  return t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")
          .replace(/&quot;/g,'"').replace(/&#039;/g,"'");
}
function pickTag(block, tag){
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  return m ? decodeHTMLEntities(m[1].trim()) : "";
}
function parseXmlProducts(xml, merchant){
  const out = [];
  const blocks = xml.split(/<product>/i).slice(1).map(b => b.split(/<\/product>/i)[0]);
  for (const block of blocks) {
    const title    = pickTag(block, "name") || pickTag(block, "title");
    const priceStr = pickTag(block, "price") || pickTag(block, "price_inc_vat") || pickTag(block, "price_old");
    const currency = pickTag(block, "currency") || "DKK";
    const image    = pickTag(block, "imageurl") || pickTag(block, "image");
    const url      = pickTag(block, "deeplink") || pickTag(block, "link");
    if (!title || !url) continue;
    const price = toNumber(priceStr);
    out.push({ merchant, title, price, currency, image, url });
  }
  return out;
}
