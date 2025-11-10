export const config = { runtime: "nodejs" };

/**
 * Intent-aware produktsøgning:
 * - Omsæt mad/følelse/lejlighed → vin-søgeord
 * - Parse budget (under/max)
 * - Hent FLASKER fra Partner-ads feeds (XML + CSV/TSV)
 * - Normalisér & proxy billeder via /api/img
 * - Returnér kun produkter; butikssider kun hvis slet ingen produkter findes
 */
export default async function handler(req, res) {
  try {
    const qRaw = (req.query.q || "").toString().trim();
    if (!qRaw) return send(res, { products: [] });

    const proto = req.headers["x-forwarded-proto"] || "https";
    const host  = req.headers.host;
    const base  = `${proto}://${host}`;

    // --- Hent brugerhensigt + budget ---
    const { terms, budgetMax } = deriveSearchPlan(qRaw);

    // Partner-ads feeds du har givet
    const FEEDS = [
      { merchant: "Mere om Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
      { merchant: "Winther Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
      { merchant: "Vinea",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" }
    ];

    const headers = {
      "user-agent": UA,
      "referer": base,                               // vigtigt for Partner-ads
      "accept": "text/xml,application/xml,text/plain,*/*",
      "cache-control": "no-cache",
    };

    // --- Hent og pars alle feeds (XML ELLER CSV/TSV) ---
    const lists = await Promise.all(
      FEEDS.map(async ({ merchant, url }) => {
        try {
          const r = await fetch(url, { headers, redirect: "follow" });
          const text = await r.text();

          let products = looksLikeXML(text)
            ? parseXMLProducts(text, merchant)
            : parseCSVProducts(text, merchant);

          // Budgetfilter (hvis angivet)
          if (budgetMax != null) {
            products = products.filter(p => p.price != null && p.price <= budgetMax);
          }

          // Intent-match på tværs af alle afledte vin-terms
          const matches = products
            .filter(p => p.title && p.url)
            .filter(p => terms.some(t => p._search.includes(t)));

          // Normalisér & proxy billeder
          const withImg = matches.map(p => {
            const img = normalizeUrl(p.image, p.url);
            return img ? { ...p, image: proxyImg(img) } : { ...p, image: null };
          });

          return withImg;
        } catch (e) {
          console.error("feed_error", merchant, e?.message || e);
          return [];
        }
      })
    );

    // Saml + berig få uden billede via OpenGraph
    let items = lists.flat();

    const noImg = items.filter(p => !p.image).slice(0, 8);
    if (noImg.length) {
      try {
        const enriched = await enrichWithOpenGraph(noImg, headers);
        const map = new Map(enriched.map(e => [e.url, e]));
        items = items.map(p => {
          if (p.image) return p;
          const e = map.get(p.url);
          const img = e?.image ? normalizeUrl(e.image, p.url) : null;
          return img ? { ...p, image: proxyImg(img), price: p.price ?? (e.price ? toNumber(e.price) : null) } : p;
        });
      } catch {}
    }

    // Kun produkter med billede → lækkert grid
    items = items.filter(p => p.image);

    // Sortér: bedst intent-match først, derefter laveste pris
    items = scoreAndSort(items, terms).slice(0, 40);

    if (items.length) {
      return send(res, { products: items, source: "feed-intent", budgetMax });
    }

    // --- Fallback: butikssider (kun hvis slet ingen produkter) ---
    const merchants = await getMerchants(base).catch(() => []);
    const baseLinks = merchants.map(m => {
      const href = (m.search || "").includes("{Q}")
        ? m.search.replace("{Q}", encodeURIComponent(qRaw))
        : (m.search || m.home || m.url || "");
      return {
        merchant: m.name || m.host || "Ukendt butik",
        title: `${qRaw} hos ${m.name || m.host}`,
        url: href, image: null, price: null, currency: "DKK", _page: href
      };
    });

    const enriched = await enrichWithOpenGraph(baseLinks.slice(0, 12), headers).catch(() => baseLinks);
    const withImg = enriched
      .map(it => {
        const img = it.image ? normalizeUrl(it.image, it._page) : null;
        return img ? { ...it, image: proxyImg(img) } : it;
      })
      .filter(it => it.image);

    return send(res, { products: withImg.slice(0, 24), source: "fallback" });
  } catch (err) {
    console.error("search_failed", err?.message || err);
    return send(res, { products: [], error: "search_failed" }, 200);
  }
}

/* ---------------- Intent & budget ---------------- */

const FOOD_TO_WINES = {
  "ost": ["portvin", "riesling", "chardonnay", "sauternes"],
  "pizza": ["chianti", "barbera", "primitivo"],
  "bøf": ["cabernet sauvignon", "syrah", "barolo"],
  "oksekød": ["cabernet", "syrah", "malbec"],
  "lam": ["syrah", "rioja", "ribera del duero"],
  "svin": ["pinot noir", "riesling"],
  "fisk": ["riesling", "chablis", "albariño"],
  "tapas": ["rioja", "garnacha", "cava"],
  "sushi": ["riesling", "sauvignon blanc", "crémant"],
  "dessert": ["sauternes", "portvin", "muscato", "moscato"]
};
const MOOD_TO_WINES = {
  "sommer": ["rosé", "sauvignon blanc", "crémant"],
  "terrasse": ["rosé", "cava", "prosecco"],
  "hygge": ["primitivo", "zinfandel", "malbec"],
  "romantisk": ["pinot noir", "champagne"]
};
const SYNONYMS = {
  "barolo": ["nebbiolo"], "rioja": ["tempranillo"], "ribera": ["tempranillo","ribera del duero"],
  "chianti": ["sangiovese"], "shiraz": ["syrah"], "cremant": ["crémant"], "rose": ["rosé"],
  "cab": ["cabernet"], "cabernet": ["cabernet sauvignon"]
};

function deriveSearchPlan(qRaw){
  const q = normalize(qRaw);
  const terms = new Set([q]);

  // mad/følelse → vinsæt
  Object.keys(FOOD_TO_WINES).forEach(k => { if (q.includes(k)) FOOD_TO_WINES[k].forEach(v => terms.add(normalize(v))); });
  Object.keys(MOOD_TO_WINES).forEach(k => { if (q.includes(k)) MOOD_TO_WINES[k].forEach(v => terms.add(normalize(v))); });

  // eksisterende synonymer
  Object.keys(SYNONYMS).forEach(k => { if (q.includes(k)) SYNONYMS[k].forEach(v => terms.add(normalize(v))); });

  // Hvis ingen kendte ord… så split q i tokens (simple fallback)
  if (terms.size === 1) {
    q.split(/\s+/).forEach(t => t && terms.add(t));
  }

  // Budget (under 150, max 200, billig/budget)
  let budgetMax = null;
  const m = q.match(/(?:under|max)\s*(\d{2,4})\s*kr/);
  if (m) budgetMax = parseInt(m[1], 10);
  if (/billig|budget/.test(q)) budgetMax = Math.min(budgetMax ?? 9999, 100);

  return { terms: Array.from(terms), budgetMax };
}

/* ---------------- Parsere & helpers ---------------- */

function send(res, obj, status = 200){ res.setHeader("content-type","application/json; charset=utf-8"); res.status(status).json(obj); }

const UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

function normalize(s=""){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim(); }
function toNumber(s){ if(!s) return null; const n=s.replace(/\s/g,"").replace(/\./g,"").replace(/,/g,"."); const v=parseFloat(n); return Number.isFinite(v)?v:null; }
function decodeHTMLEntities(t){ return (t||"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'"); }
function stripCdata(s=""){ return s.replace(/^<!\[CDATA\[/,"").replace(/\]\]>$/,""); }
function looksLikeXML(txt){ return /<\?xml|<rss|<feed|<products|<product|<channel|<item/i.test(txt); }
function proxyImg(src){ return `/api/img?src=${encodeURIComponent(src)}`; }
function normalizeUrl(maybe, pageUrl){
  if (!maybe) return null;
  let s = maybe.trim().replace(/&amp;/g,"&");
  if (s.startsWith("//")) s = "https:" + s;
  try { new URL(s); return s; } catch {}
  if (pageUrl) { try { return new URL(s, pageUrl).toString(); } catch {} }
  return null;
}

/* --- XML --- */
function parseXMLProducts(xml, merchant){
  const out=[];
  const rows = splitBlocks(xml, "product").length ? splitBlocks(xml, "product") : splitBlocks(xml, "item");
  for (const b of rows){
    const title = pickOne(b, ["name","title"]);
    const desc  = pickOne(b, ["description","shortdescription","longdescription","long_description","content:encoded"]);
    const category = pickOne(b, ["categorypath","category","categories"]);
    const brand = pickOne(b, ["brand","manufacturer","producer","vendor","creator"]);

    const priceStr = pickOne(b, ["price","price_inc_vat","price_with_vat","saleprice","ourprice","current_price","g:price","price_old"]);
    const price = toNumber(cleanPrice(priceStr));
    const currency = pickOne(b, ["currency","currency_iso"]) || extractCurrency(priceStr) || "DKK";

    const url = pickOne(b, ["deeplink","link","producturl","url","g:link"]);

    let image = pickOne(b, [
      "imageurl","image_url","image","largeimage","large_image","g:image_link",
      "picture","picture_url","img","imgurl","thumbnail","thumb","smallimage","enclosure url"
    ]);
    if (!image) {
      image = pickFirstMatch(b,[
        /<images>[\s\S]*?<image>([\s\\S]*?)<\/image>[\s\\S]*?<\/images>/i,
        /<additionalimage>([\s\\S]*?)<\/additionalimage>/i,
        /<media:content[^>]+url=["']([^"']+)["']/i
      ]);
    }

    if (!title || !url) continue;

    out.push({
      merchant, title, desc, category, brand, price, currency,
      image: image || "", url,
      _search: normalize([title, desc, category, brand].filter(Boolean).join(" "))
    });
  }
  return out;
}
function splitBlocks(xml, tag){
  return xml.split(new RegExp(`<${tag}\\b[^>]*>`, "i"))
            .slice(1)
            .map(b => b.split(new RegExp(`</${tag}>`, "i"))[0]);
}
function pickTag(block, tag){
  const m = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`,"i"));
  return m ? decodeHTMLEntities(stripCdata(m[1].trim())) : "";
}
function pickOne(block, tags){
  for (const t of tags){
    if (t.includes(" ")){ const [el, attr]=t.split(" "); const m=block.match(new RegExp(`<${el}[^>]*${attr}=["']([^"']+)["'][^>]*>`,"i")); if (m) return decodeHTMLEntities(stripCdata(m[1].trim())); continue; }
    const v = pickTag(block, t); if (v) return v;
  }
  return "";
}
function pickFirstMatch(block, regs){ for (const re of regs){ const m=block.match(re); if(m) return decodeHTMLEntities(stripCdata(m[1].trim())); } return ""; }
function cleanPrice(s){ return (s||"").replace(/[A-Z]{3}/ig,"").replace(/kr\./ig,"kr").trim(); }
function extractCurrency(s){ const m=(s||"").match(/\b([A-Z]{3})\b/); if(m) return m[1]; if(/\skr/.test(s||"")) return "DKK"; return null; }

/* --- CSV/TSV --- */
function parseCSVProducts(text, merchant){
  const head=text.slice(0,1024);
  const delim = head.includes("\t") ? "\t" : (head.includes(";") ? ";" : ",");
  const rows = parseCSV(text, delim);

  const headers = rows.shift()?.map(n => n.toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9:_-]/g,"")) || [];
  const idx = name => {
    const map = {
      title: ["name","title","productname","product","navn"],
      url: ["deeplink","link","producturl","url"],
      image: ["imageurl","image_url","image","largeimage","large_image","picture","picture_url","img","imgurl","thumbnail","thumb","smallimage","g:image_link","image_link"],
      price: ["price","price_inc_vat","pricewithvat","saleprice","ourprice","current_price","g:price","pris","price_old"],
      currency: ["currency","currency_iso","valuta"],
      brand: ["brand","manufacturer","producer","vendor"]
    };
    for (const k of map[name]) { const i=headers.indexOf(k); if(i!==-1) return i; }
    return -1;
  };

  const it=idx("title"), iu=idx("url"), ii=idx("image"), ip=idx("price"), ic=idx("currency"), ib=idx("brand");
  const out=[];
  for (const r of rows){
    const title=r[it]||"", url=r[iu]||"", image=r[ii]||"", price=toNumber(r[ip]||""), currency=r[ic]||"DKK", brand=r[ib]||"";
    if (!title || !url) continue;
    out.push({ merchant, title, desc:"", category:"", brand, price, currency, image, url, _search: normalize([title,brand].join(" ")) });
  }
  return out;
}
function parseCSV(text, delim){
  const rows=[]; let f=""; let row=[]; let q=false; const d=delim;
  for (let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(q){ if(c==='"'&&n==='"'){f+='"';i++;continue;} if(c==='"'){q=false;continue;} f+=c; continue; }
    if(c==='"'){q=true;continue;}
    if(c===d){row.push(f);f="";continue;}
    if(c==='\n'){row.push(f);rows.push(row);f="";row=[];continue;}
    if(c==='\r'){continue;}
    f+=c;
  }
  if (f.length || row.length){ row.push(f); rows.push(row); }
  return rows.filter(r => r.some(x => (x||"").trim().length));
}

/* --- Fallback merchants (used only when zero products) --- */
async function getMerchants(base){
  try{
    const r=await fetch(`${base}/assets/merchants.json`,{headers:{"cache-control":"no-cache"}});
    if(!r.ok) throw 0; const arr=await r.json(); return Array.isArray(arr)?arr:[];
  }catch{
    return [
      { name:"Barlife", host:"barlife.dk", search:"https://www.barlife.dk/search/{Q}" },
      { name:"D'Wine", host:"d-wine.dk", search:"https://d-wine.dk/?s={Q}&post_type=product" },
      { name:"Beer Me", host:"beer-me.dk", search:"https://www.beer-me.dk/search/{Q}" },
      { name:"Den Sidste Flaske", host:"densidsteflaske.dk", search:"https://densidsteflaske.dk/search?q={Q}" },
      { name:"Winesommelier", host:"winesommelier.dk", search:"https://winesommelier.dk/?s={Q}" }
    ];
  }
}

/* --- OpenGraph enrichment (billede) --- */
async function enrichWithOpenGraph(items, headers){
  const tasks = items.map(async it=>{
    try{
      const r = await fetch(it.url, { headers, redirect:"follow" });
      const html = await r.text();
      const ogImg = pickMeta(html, /(property|name)=["']og:image["']/i);
      const twImg = pickMeta(html, /(property|name)=["']twitter:image["']/i);
      return { ...it, image: ogImg || twImg || null };
    }catch{ return it; }
  });
  return Promise.all(tasks);
}
function pickMeta(html, attrRe){
  const m = html.match(new RegExp(`<meta[^>]+${attrRe.source}[^>]+content=["']([^"']+)["']`,"i"));
  return m ? m[1] : null;
}

/* --- Scoring --- */
function scoreAndSort(items, terms){
  const norm=(s)=>normalize(s||"");
  const score=(p)=>{ let sc=0; const s=p._search||""; terms.forEach(t=>{ if(s.includes(t)) sc+=10; });
    if(p.title && norm(p.title).includes(terms[0])) sc+=5;
    if(p.price!=null) sc+=1;
    if(p.image) sc+=2;
    return -sc;
  };
  return [...items].sort((a,b)=> score(a)-score(b) || (a.price??9e9)-(b.price??9e9));
}
