// /api/search.js
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const q = (req.query.q || "").toString().trim();
    const mock = req.query.mock === "1";
    if (!q && !mock) return json(res, { products: [] });

    // --- MOCK test (hurtig UI-test uden feeds) ---
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
            title: "Langhe Nebbiolo – Testprodukt",
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

    const queryTerms = expandQuery(q); // fx ["barolo","nebbiolo"]

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

    // ---- Fallback til butikker uden feed ----
    if (!scored.length) {
      const merchants = await getMerchants(req).catch(() => []);
      const links = merchants.map(m => {
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
      return json(res, { products: links.slice(0, 24) });
    }

    // ---- Returnér feed-hits ----
    return json(res, { products: scored.slice(0, 24) });

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

// Synonymer
const SYNONYMS = {
  "barolo": ["nebbiolo"],
  "rioja": ["tempranillo"],
  "ribera": ["tempranillo", "ribera del duero"],
  "chianti": ["sangiovese"],
  "shiraz": ["syrah"],
  "cremant": ["crémant"],
  "rose": ["rosé"]
};

function normalize(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // fjern diakritik
    .replace(/\s+/g, " ")
    .trim();
}

function expandQuery(q) {
  const base = normalize(q);
  const terms = new Set([base]);
  Object.keys(SYNONYMS).forEach(k => {
    if (base.includes(k)) SYNONYMS[k].forEach(s => terms.add(normalize(s)));
  });
  return Array.from(terms);
}

function toNumber(s) {
  if (!s) return null;
  const n = s.replace(/\s/g, "").replace(/\./g, "").replace(/,/g, ".");
  const v = parseFloat(n);
  return Number.isFinite(v) ? v : null;
}

function decodeHTMLEntities(t) {
  return t
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function pickTag(block, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  return m ? decodeHTMLEntities(m[1].trim()) : "";
}

function parseXmlProducts(xml, merchant) {
  const out = [];
  const blocks = xml.split(/<product>/i).slice(1).map(b => b.split(/<\/product>/i)[0]);
  for (const block of blocks) {
    const title    = pickTag(block, "name") || pickTag(block, "title");
    const desc     = pickTag(block, "description") || pickTag(block, "shortdescription") || "";
    const category = pickTag(block, "categorypath") || pickTag(block, "category") || "";
    const brand    = pickTag(block, "brand") || pickTag(block, "manufacturer") || "";
    const priceStr = pickTag(block, "price") || pickTag(block, "price_inc_vat") || pickTag(block, "price_old");
    const currency = pickTag(block, "currency") || "DKK";
    const image    = pickTag(block, "imageurl") || pickTag(block, "image");
    const url      = pickTag(block, "deeplink") || pickTag(block, "link");
    if (!title || !url) continue;
    const price = toNumber(priceStr);
    out.push({
      merchant, title, desc, category, brand, price, currency, image, url,
      _search: normalize([title, desc, category, brand].filter(Boolean).join(" "))
    });
  }
  return out;
}

function scoreAndSort(items, queryTerms) {
  const titleNorm = (s) => normalize(s || "");
  const score = (p) => {
    let sc = 0;
    const s = p._search || "";
    queryTerms.forEach(t => { if (s.includes(t)) sc += 10; });
    if (p.title && titleNorm(p.title).includes(queryTerms[0])) sc += 5;
    if (p.price != null) sc += 1;
    return -sc;
  };
  return [...items].sort((a, b) => score(a) - score(b) || (a.price ?? 9e9) - (b.price ?? 9e9));
}

// Henter merchants.json eller fallback-liste
async function getMerchants(req) {
  try {
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host  = req.headers.host;
    const base  = `${proto}://${host}`;
    const r = await fetch(`${base}/assets/merchants.json`, { headers: { "cache-control": "no-cache" } });
    if (!r.ok) throw new Error("merchants.json not found");
    const arr = await r.json();
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [
      { name: "Barlife", host: "barlife.dk", search: "https://www.barlife.dk/search/{Q}" },
      { name: "D'Wine", host: "d-wine.dk", search: "https://d-wine.dk/?s={Q}&post_type=product" },
      { name: "Beer Me", host: "beer-me.dk", search: "https://www.beer-me.dk/search/{Q}" },
      { name: "Fantombryg", host: "fantombryg.dk", search: "https://fantombryg.dk/search?q={Q}" },
      { name: "Herslev Bryghus", host: "herslevbryghus.dk", search: "https://herslevbryghus.dk/search?q={Q}" },
      { name: "Johnsen Wine", host: "johnsenwine.dk", search: "https://www.johnsenwine.dk/?s={Q}&post_type=product" },
      { name: "SPS Wine", host: "spswine.dk", search: "https://www.spswine.dk/?s={Q}&post_type=product" },
      { name: "Den Sidste Flaske", host: "densidsteflaske.dk", search: "https://densidsteflaske.dk/search?q={Q}" },
      { name: "Mere om Vin", host: "mereomvin.dk", search: "https://mereomvin.dk/?s={Q}&post_type=product" },
      { name: "Vinea", host: "vinea.dk", search: "https://vinea.dk/search?q={Q}" },
      { name: "Winther Vin", host: "winthervin.dk", search: "https://winthervin.dk/?s={Q}&post_type=product" },
      { name: "Winesommelier", host: "winesommelier.dk", search: "https://winesommelier.dk/?s={Q}" }
    ];
  }
}
