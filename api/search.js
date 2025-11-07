// /api/search.js
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const q = (req.query.q || "").toString().trim();
    const mock = req.query.mock === "1";
    if (!q && !mock) return json(res, { products: [] });

    if (mock) {
      return json(res, {
        products: [
          { merchant: "Mere om Vin", title: "Barolo 2019 – Testprodukt", price: 159, currency: "DKK", image: "https://via.placeholder.com/256x256.png?text=Barolo", url: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537" },
          { merchant: "Winther Vin", title: "Langhe Nebbiolo – Testprodukt", price: 129, currency: "DKK", image: "https://via.placeholder.com/256x256.png?text=Nebbiolo", url: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537" }
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
      "user-agent": "VinbotFetcher/1.1 (+https://vinbot.dk)",
      "referer": "https://vinbot.dk/"
    };

    const queryTerms = expandQuery(q); // fx ["barolo","nebbiolo"]

    // ---- Hent feeds og match ----
    const results = await Promise.all(
      FEEDS.map(async ({ merchant, url }) => {
        try {
          const r = await fetch(url, { headers });
          const xml = await r.text();
          const all = parseXmlProducts(xml, merchant);
          const hits = all
            .filter(p => queryTerms.some(t => p._search.includes(t)))
            .slice(0, 12);
          return hits;
        } catch (e) {
          console.error("Feed error", merchant, e?.message || e);
          return [];
        }
      })
    );

    const feedProducts = results.flat();
    const scored = scoreAndSort(feedProducts, queryTerms);

    if (scored.length) {
      return json(res, { products: scored.slice(0, 24) });
    }

    // ---- Fallback: butikker uden feed (beriget med OpenGraph) ----
    const merchants = await getMerchants(req).catch(() => []);
    const baseLinks = merchants.map(m => {
      const href = (m.search || "").includes("{Q}")
        ? m.search.replace("{Q}", encodeURIComponent(q))
        : (m.search || m.home || m.url || "");
      return {
        merchant: m.name || m.host || "Ukendt butik",
        title: `${q} hos ${m.name || m.host}`,
        price: null,
        currency: "DKK",
        image: null,
        url: href,
        source: "merchant"
      };
    });

    const enriched = await enrichWithOpenGraph(baseLinks.slice(0, 10), headers).catch(() => baseLinks);
    return json(res, { products: [...enriched, ...baseLinks.slice(10, 24)] });

  } catch (err) {
    console.error("search_failed", err?.message || err);
    return json(res, { products: [] });
  }
}

/* ------------------------- helpers ------------------------- */

function json(res, obj, status = 200) {
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.status(status).json(obj);
}

const SYNONYMS = {
  "barolo": ["nebbiolo"],
  "rioja": ["tempranillo"],
  "ribera": ["tempranillo","ribera del duero"],
  "chianti": ["sangiovese"],
  "shiraz": ["syrah"],
  "cremant": ["crémant"],
  "rose": ["rosé"]
};

function normalize(str=""){
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/\s+/g," ").trim();
}
function expandQuery(q){
  const base = normalize(q);
  const terms = new Set([base]);
  Object.keys(SYNONYMS).forEach(k=>{
    if (base.includes(k)) SYNONYMS[k].forEach(s=>terms.add(normalize(s)));
  });
  return Array.from(terms);
}
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
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? decodeHTMLEntities(m[1].trim()) : "";
}
function parseXmlProducts(xml, merchant){
  const out = [];
  const blocks = xml.split(/<product>/i).slice(1).map(b=>b.split(/<\/product>/i)[0]);
  for (const block of blocks){
    const title    = pickTag(block,"name") || pickTag(block,"title");
    const desc     = pickTag(block,"description") || pickTag(block,"shortdescription") || "";
    const category = pickTag(block,"categorypath") || pickTag(block,"category") || "";
    const brand    = pickTag(block,"brand") || pickTag(block,"manufacturer") || "";
    const priceStr = pickTag(block,"price") || pickTag(block,"price_inc_vat") || pickTag(block,"price_old");
    const currency = pickTag(block,"currency") || "DKK";
    const image    = pickTag(block,"imageurl") || pickTag(block,"image");
    const url      = pickTag(block,"deeplink") || pickTag(block,"link");
    if (!title || !url) continue;
    const price = toNumber(priceStr);
    out.push({
      merchant, title, desc, category, brand, price, currency, image, url,
      _search: normalize([title, desc, category, brand].filter(Boolean).join(" "))
    });
  }
  return out;
}
function scoreAndSort(items, queryTerms){
  const titleNorm = (s)=>normalize(s||"");
  const score = (p)=>{
    const s = p._search || "";
    let sc = 0;
    queryTerms.forEach(t=>{ if (s.includes(t)) sc += 10; });
    if (p.title && titleNorm(p.title).includes(queryTerms[0])) sc += 5;
    if (p.price != null) sc += 1;
    return -sc;
  };
  return [...items].sort((a,b)=> score(a)-score(b) || (a.price??9e9)-(b.price??9e9));
}

// Hent merchants.json eller fallback-liste
async function getMerchants(req){
  try{
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host  = req.headers.host;
    const base  = `${proto}://${host}`;
    const r = await fetch(`${base}/assets/merchants.json`, { headers: { "cache-control": "no-cache" } });
    if (!r.ok) throw new Error("merchants.json not found");
    const arr = await r.json();
    return Array.isArray(arr) ? arr : [];
  }catch{
    return [
      { name: "Barlife", host: "barlife.dk", search: "https://www.barlife.dk/search/{Q}" },
      { name: "D'Wine", host: "d-wine.dk", search: "https://d-wine.dk/?s={Q}&post_type=product" },
      { name: "Beer Me", host: "beer-me.dk", search: "https://www.beer-me.dk/search/{Q}" },
      { name: "Den Sidste Flaske", host: "densidsteflaske.dk", search: "https://densidsteflaske.dk/search?q={Q}" },
      { name: "Winther Vin", host: "winthervin.dk", search: "https://winthervin.dk/?s={Q}&post_type=product" },
      { name: "Winesommelier", host: "winesommelier.dk", search: "https://winesommelier.dk/?s={Q}" }
    ];
  }
}

// Berig fallback-links med OpenGraph (billede + evt. pris)
async function enrichWithOpenGraph(items, headers){
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(), 6000);

  const enriched = await Promise.all(items.map(async it=>{
    try{
      const r = await fetch(it.url, { headers, signal: controller.signal });
      const html = await r.text();
      const ogImage = pickMeta(html, /(property|name)=["']og:image["']/i);
      const twImage = pickMeta(html, /(property|name)=["']twitter:image["']/i);
      const price   = pickMeta(html, /(property|name)=["']product:price:amount["']/i) || findPriceInText(html);
      return {
        ...it,
        image: it.image || ogImage || twImage || null,
        price: it.price ?? (price ? toNumber(price) : null)
      };
    }catch{
      return it;
    }
  }));

  clearTimeout(timeout);
  return enriched;
}
function pickMeta(html, attrRe){
  const m = html.match(new RegExp(`<meta[^>]+${attrRe.source}[^>]+content=["']([^"']+)["']`, "i"));
  return m ? m[1] : null;
}
function findPriceInText(html){
  const m = html.replace(/\s+/g," ").match(/(\d{1,3}(\.\d{3})*(,\d{2})?)\s?kr/i);
  return m ? m[1] : null;
}
