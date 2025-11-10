// /api/search.js
export const config = { runtime: "nodejs" };

/**
 * Søg i Partner-ads feeds (med robuste billedfelter) + fallback til butikker uden feed.
 * - Proxy billeder via /api/img for stabil indlæsning
 * - Filtrér produkter uden billede (men prøv kort at berige med OpenGraph først)
 * - Klog match: synonymer + titel/description/kategori/brand (diakritik-insensitiv)
 */
export default async function handler(req, res) {
  try {
    const q = (req.query.q || "").toString().trim();
    const mock = req.query.mock === "1";
    if (!q && !mock) return json(res, { products: [] });

    if (mock) {
      return json(res, {
        products: [
          {
            merchant: "Mere om Vin",
            title: "Barolo 2019 – Testprodukt",
            price: 159,
            currency: "DKK",
            image: "/api/img?src=" + encodeURIComponent("https://via.placeholder.com/256x256.png?text=Barolo"),
            url: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537"
          }
        ]
      });
    }

    // === FEEDS (Partner-ads) ===
    const FEEDS = [
      { merchant: "Mere om Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
      { merchant: "Winther Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
      { merchant: "Vinea",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" }
    ];

    const headers = {
      "cache-control": "no-cache",
      "user-agent": "VinbotFetcher/1.3 (+https://vinbot.dk)",
      "referer": "https://vinbot.dk/"
    };

    const queryTerms = expandQuery(q);

    // Hent alle feeds
    const results = await Promise.all(
      FEEDS.map(async ({ merchant, url }) => {
        try {
          const r = await fetch(url, { headers });
          const xml = await r.text();
          const all = parseXmlProducts(xml, merchant);

          // match + tag billede via proxy
          const hits = all
            .filter(p => queryTerms.some(t => p._search.includes(t)))
            .map(p => p.image ? { ...p, image: proxyImg(resolveUrl(p.image, p.url)) } : p)
            .slice(0, 24);

          return hits;
        } catch (e) {
          console.error("Feed error", merchant, e?.message || e);
          return [];
        }
      })
    );

    // Saml og sorter
    let feedProducts = results.flat();
    feedProducts = scoreAndSort(feedProducts, queryTerms);

    // Forsøg at berige et lille udsnit UDEN billede via OpenGraph
    const withoutImg = feedProducts.filter(p => !p.image).slice(0, 6);
    if (withoutImg.length) {
      try {
        const enriched = await enrichWithOpenGraph(withoutImg, headers);
        const enrichedMap = new Map(enriched.map(e => [e.url, e]));
        feedProducts = feedProducts.map(p => {
          if (p.image) return p;
          const e = enrichedMap.get(p.url);
          if (e && e.image) return { ...p, image: proxyImg(resolveUrl(e.image, p.url)), price: p.price ?? (e.price ? toNumber(e.price) : null) };
          return p;
        });
      } catch {
        // ignore og enrichment
      }
    }

    // Filtrér produkter uden billede (nu efter enrichment)
    feedProducts = feedProducts.filter(p => p.image);

    if (feedProducts.length) {
      return json(res, { products: feedProducts.slice(0, 24) });
    }

    // === Fallback: butikker uden feed (merchants.json) + OpenGraph-billeder ===
    const merchants = await getMerchants(req).catch(() => []);
    const baseLinks = merchants.map(m => {
      const href = (m.search || "").includes("{Q}")
        ? m.search.replace("{Q}", encodeURIComponent(q))
        : (m.search || m.home || m.url || "");
      return {
        merchant: m.name || m.host || "Ukendt butik",
        title: `${q} hos ${m.name || m.host}`,
        price: null, currency: "DKK",
        image: null,
        url: href,
        _page: href
      };
    });

    const enriched = await enrichWithOpenGraph(baseLinks.slice(0, 12), headers).catch(() => baseLinks);
    const withImages = enriched
      .map(it => it.image ? { ...it, image: proxyImg(resolveUrl(it.image, it._page)) } : it)
      .filter(it => it.image); // kun med billede

    // hvis intet billede overhovedet, returnér de rå links (så der er noget)
    if (!withImages.length) {
      return json(res, { products: baseLinks.slice(0, 12) });
    }

    return json(res, { products: withImages.slice(0, 24) });

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
function stripCdata(s=""){
  return s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}
function pickTag(block, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  return m ? decodeHTMLEntities(stripCdata(m[1].trim())) : "";
}
function pickTagOneOf(block, tags) {
  for (const t of tags) {
    const v = pickTag(block, t);
    if (v) return v;
  }
  return "";
}
function pickFirstMatch(block, regexes) {
  for (const re of regexes) {
    const m = block.match(re);
    if (m) return decodeHTMLEntities(stripCdata(m[1].trim()));
  }
  return "";
}

function parseXmlProducts(xml, merchant) {
  const out = [];
  const blocks = xml.split(/<product>/i).slice(1).map(b => b.split(/<\/product>/i)[0]);
  for (const block of blocks) {
    const title = pickTagOneOf(block, ["name", "title"]);
    const desc  = pickTagOneOf(block, ["description", "shortdescription", "longdescription", "long_description"]);
    const category = pickTagOneOf(block, ["categorypath", "category", "categories"]);
    const brand = pickTagOneOf(block, ["brand", "manufacturer", "producer", "vendor"]);

    // Prisfelter (flere varianter på tværs af shops)
    const priceStr = pickTagOneOf(block, [
      "price", "price_inc_vat", "price_with_vat", "saleprice", "ourprice", "current_price", "price_old"
    ]);
    const currency = pickTagOneOf(block, ["currency", "currency_iso"]) || "DKK";

    // URL (deeplink/link)
    const url = pickTagOneOf(block, ["deeplink", "link", "producturl", "url"]);

    // BILLEDE: mange mulige feltnavne + nested <images><image>
    let image = pickTagOneOf(block, [
      "imageurl", "image_url", "image", "largeimage", "large_image", "picture", "picture_url", "img", "imgurl", "thumbnail", "thumb", "smallimage"
    ]);

    if (!image) {
      // prøve at finde første billede i <images> … <image>…</image> … </images>
      image = pickFirstMatch(block, [
        /<images>[\s\S]*?<image>([\s\S]*?)<\/image>[\s\S]*?<\/images>/i,
        /<additionalimage>([\s\S]*?)<\/additionalimage>/i
      ]);
    }

    if (!title || !url) continue;

    const price = toNumber(priceStr);

    out.push({
      merchant, title, desc, category, brand, price, currency,
      image: image || "", // kan være tomt – forsøger vi at berige senere
      url,
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
    // lille bonus for at have billede
    if (p.image) sc += 2;
    return -sc; // lavere er bedre
  };
  return [...items].sort((a, b) => score(a) - score(b) || (a.price ?? 9e9) - (b.price ?? 9e9));
}

function proxyImg(src) {
  return `/api/img?src=${encodeURIComponent(src)}`;
}
function resolveUrl(maybe, pageUrl) {
  try { return new URL(maybe, pageUrl).toString(); } catch { return maybe; }
}

// Merchants uden feed
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
      { name: "Den Sidste Flaske", host: "densidsteflaske.dk", search: "https://densidsteflaske.dk/search?q={Q}" },
      { name: "Winesommelier", host: "winesommelier.dk", search: "https://winesommelier.dk/?s={Q}" }
    ];
  }
}

// OpenGraph enrichment (til få items uden billede)
async function enrichWithOpenGraph(items, headers) {
  const tasks = items.map(async it => {
    try {
      const r = await fetch(it.url, { headers });
      const html = await r.text();
      const ogImg = pickMeta(html, /(property|name)=["']og:image["']/i);
      const twImg = pickMeta(html, /(property|name)=["']twitter:image["']/i);
      const price = pickMeta(html, /(property|name)=["']product:price:amount["']/i) || findPriceInText(html);
      return { ...it, image: ogImg || twImg || null, price: it.price ?? (price ? toNumber(price) : null) };
    } catch {
      return it;
    }
  });
  return Promise.all(tasks);
}
function pickMeta(html, attrRe) {
  const m = html.match(new RegExp(`<meta[^>]+${attrRe.source}[^>]+content=["']([^"']+)["']`, "i"));
  return m ? m[1] : null;
}
function findPriceInText(html) {
  const m = html.replace(/\s+/g, " ").match(/(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)\s?kr/i);
  return m ? m[1] : null;
}
