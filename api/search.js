// /api/search.js
export const config = { runtime: "nodejs" };

/**
 * Returnér FLASKER (enkelt-produkter) med billede/pris fra Partner-ads feeds.
 * - Understøtter <product> og <item> som rodtag for produkter.
 * - Masser af alternative feltnavne for image, link, pris, osv.
 * - Alle billeder proxys via /api/img for stabil indlæsning.
 * - Fallback: butiks-søgesider (med OG-billeder) KUN hvis ingen feed-hits.
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
            title: "Barolo DOCG 2019 – Test",
            price: 179,
            currency: "DKK",
            image: proxyImg("https://via.placeholder.com/300x300.png?text=Barolo"),
            url: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537"
          }
        ]
      });
    }

    // === FEEDS du har givet ===
    const FEEDS = [
      { merchant: "Mere om Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
      { merchant: "Winther Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
      { merchant: "Vinea",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" }
    ];

    const headers = {
      "cache-control": "no-cache",
      "user-agent": UA,
      "referer": "https://vinbot.dk/"
    };

    const terms = expandQuery(q);

    // --- Hent feeds parallelt ---
    const results = await Promise.all(
      FEEDS.map(async ({ merchant, url }) => {
        try {
          const r = await fetch(url, { headers });
          const xml = await r.text();
          const all = parseProducts(xml, merchant); // ← FLASKER
          const hits = all
            .filter(p => terms.some(t => p._search.includes(t)))  // match
            .map(p => {
              // normalisér + proxy billede
              const img = normalizeUrl(p.image, p.url);
              return img ? { ...p, image: proxyImg(img) } : { ...p, image: null };
            })
            .filter(p => p.title && p.url) // sikre validt produkt
            .slice(0, 60); // tag lidt flere, vi filtrerer senere
          return hits;
        } catch (e) {
          console.error("Feed error", merchant, e?.message || e);
          return [];
        }
      })
    );

    // Saml, berig enkelte uden billede, fjern dem uden billede, sorter og returnér
    let products = results.flat();

    // Prøv at berige få uden billede via OpenGraph
    const noImg = products.filter(p => !p.image).slice(0, 8);
    if (noImg.length) {
      try {
        const enriched = await enrichWithOpenGraph(noImg, headers);
        const map = new Map(enriched.map(e => [e.url, e]));
        products = products.map(p => {
          if (p.image) return p;
          const e = map.get(p.url);
          const img = e?.image ? normalizeUrl(e.image, p.url) : null;
          return img ? { ...p, image: proxyImg(img), price: p.price ?? (e.price ? toNumber(e.price) : null) } : p;
        });
      } catch {}
    }

    // Kun produkter med billede for et lækkert grid
    products = products.filter(p => p.image);

    // Sortér: bedste match først, billigst indenfor samme score
    products = scoreAndSort(products, terms).slice(0, 30);

    if (products.length) {
      return json(res, { products });
    }

    // === Fallback: butikker uden feed (viser butik-søgesider med OG-billede) ===
    const merchants = await getMerchants(req).catch(() => []);
    const baseLinks = merchants.map(m => {
      const href = (m.search || "").includes("{Q}")
        ? m.search.replace("{Q}", encodeURIComponent(q))
        : (m.search || m.home || m.url || "");
      return { merchant: m.name || m.host || "Ukendt butik", title: `${q} hos ${m.name || m.host}`, url: href, price: null, currency: "DKK", image: null, _page: href };
    });

    const enriched = await enrichWithOpenGraph(baseLinks.slice(0, 12), headers).catch(() => baseLinks);
    const withImg = enriched
      .map(it => {
        const img = it.image ? normalizeUrl(it.image, it._page) : null;
        return img ? { ...it, image: proxyImg(img) } : it;
      })
      .filter(it => it.image);

    if (!withImg.length) return json(res, { products: baseLinks.slice(0, 12) });
    return json(res, { products: withImg.slice(0, 24) });

  } catch (err) {
    console.error("search_failed", err?.message || err);
    return json(res, { products: [] });
  }
}

/* ---------------- helpers ---------------- */
function json(res, obj, status=200){ res.setHeader("content-type","application/json; charset=utf-8"); res.status(status).json(obj); }

const UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const SYNONYMS = { barolo:["nebbiolo"], rioja:["tempranillo"], ribera:["tempranillo","ribera del duero"], chianti:["sangiovese"], shiraz:["syrah"], cremant:["crémant"], rose:["rosé"] };
function normalize(s=""){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim(); }
function expandQuery(q){ const base=normalize(q); const t=new Set([base]); Object.keys(SYNONYMS).forEach(k=>{ if(base.includes(k)) SYNONYMS[k].forEach(s=>t.add(normalize(s))); }); return [...t]; }
function toNumber(s){ if(!s) return null; const n=s.replace(/\s/g,"").replace(/\./g,"").replace(/,/g,"."); const v=parseFloat(n); return Number.isFinite(v)?v:null; }
function decodeHTMLEntities(t){ return t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'"); }
function stripCdata(s=""){ return s.replace(/^<!\[CDATA\[/,"").replace(/\]\]>$/,""); }

/* Robust product-parser:
   - Del på både <product> og RSS <item>
   - Flerfelts billed- og prishåndtering
*/
function parseProducts(xml, merchant){
  const out=[];

  const prodBlocks = splitBlocks(xml, "product");
  const itemBlocks = splitBlocks(xml, "item");
  const blocks = prodBlocks.length ? prodBlocks : itemBlocks;

  for (const b of blocks){
    const title = pickOne(b, ["name","title"]);
    const desc  = pickOne(b, ["description","shortdescription","longdescription","long_description","content:encoded"]);
    const category = pickOne(b, ["categorypath","category","categories"]);
    const brand = pickOne(b, ["brand","manufacturer","producer","vendor","creator"]);

    const priceStr = pickOne(b, ["price","price_inc_vat","price_with_vat","saleprice","ourprice","current_price","g:price","price_old"]);
    const currency = pickOne(b, ["currency","currency_iso"]) || extractCurrency(priceStr) || "DKK";

    const url = pickOne(b, ["deeplink","link","producturl","url","g:link"]);

    // IMAGE: mange varianter + nested
    let image = pickOne(b, [
      "imageurl","image_url","image","largeimage","large_image","g:image_link",
      "picture","picture_url","img","imgurl","thumbnail","thumb","smallimage","enclosure url"
    ]);
    if (!image) {
      image = pickFirstMatch(b,[
        /<images>[\s\S]*?<image>([\s\S]*?)<\/image>[\s\S]*?<\/images>/i,
        /<additionalimage>([\s\S]*?)<\/additionalimage>/i,
        /<media:content[^>]+url=["']([^"']+)["']/i
      ]);
    }

    if (!title || !url) continue;
    const price = toNumber(cleanPrice(priceStr));

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
  const m = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? decodeHTMLEntities(stripCdata(m[1].trim())) : "";
}
function pickOne(block, tags){
  for (const t of tags){
    // special-case: attributes på fx <enclosure url="...">
    if (t.includes(" ")){ // fx "enclosure url"
      const [el, attr] = t.split(" ");
      const m = block.match(new RegExp(`<${el}[^>]*${attr}=["']([^"']+)["'][^>]*>`, "i"));
      if (m) return decodeHTMLEntities(stripCdata(m[1].trim()));
      continue;
    }
    const v = pickTag(block, t);
    if (v) return v;
  }
  return "";
}
function pickFirstMatch(block, regexes){
  for (const re of regexes){
    const m = block.match(re);
    if (m) return decodeHTMLEntities(stripCdata(m[1].trim()));
  }
  return "";
}
function cleanPrice(s){ return (s||"").replace(/[A-Z]{3}/ig,"").replace(/kr\./ig,"kr").trim(); }
function extractCurrency(s){
  const m=(s||"").match(/\b([A-Z]{3})\b/); if (m) return m[1];
  if (/\skr/.test(s||"")) return "DKK";
  return null;
}

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

function normalizeUrl(maybe, pageUrl){
  if (!maybe) return null;
  let s = maybe.trim().replace(/&amp;/g,"&");
  if (s.startsWith("//")) s = "https:" + s;
  try{ new URL(s); return s; }catch{}
  if (pageUrl){
    try{ return new URL(s, pageUrl).toString(); }catch{}
  }
  return null;
}
function proxyImg(src){ return `/api/img?src=${encodeURIComponent(src)}`; }

// Merchants uden feed (bruges kun som fallback)
async function getMerchants(req){
  try{
    const base=`${req.headers["x-forwarded-proto"]||"https"}://${req.headers.host}`;
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

// OpenGraph enrichment (hurtig, lille batch)
async function enrichWithOpenGraph(items, headers){
  const tasks = items.map(async it=>{
    try{
      const r = await fetch(it.url, { headers, redirect:"follow" });
      const html = await r.text();
      const ogImg = pickMeta(html, /(property|name)=["']og:image["']/i);
      const twImg = pickMeta(html, /(property|name)=["']twitter:image["']/i);
      const price = pickMeta(html, /(property|name)=["']product:price:amount["']/i) || findPriceInText(html);
      return { ...it, image: ogImg || twImg || null, price: it.price ?? (price ? toNumber(price) : null) };
    }catch{ return it; }
  });
  return Promise.all(tasks);
}
function pickMeta(html, attrRe){
  const m = html.match(new RegExp(`<meta[^>]+${attrRe.source}[^>]+content=["']([^"']+)["']`,"i"));
  return m ? m[1] : null;
}
function findPriceInText(html){
  const m = html.replace(/\s+/g," ").match(/(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)\s?kr/i);
  return m ? m[1] : null;
}
