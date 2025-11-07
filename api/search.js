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
          { merchant:"Mere om Vin", title:"Barolo 2019 – Testprodukt", price:159, currency:"DKK",
            image:"/api/img?src=" + encodeURIComponent("https://via.placeholder.com/256x256.png?text=Barolo"),
            url:"https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537" }
        ]
      });
    }

    const FEEDS = [
      { merchant:"Mere om Vin", url:"https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
      { merchant:"Winther Vin", url:"https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
      { merchant:"Vinea",       url:"https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" }
    ];

    const headers = {
      "cache-control":"no-cache",
      "user-agent":"VinbotFetcher/1.2 (+https://vinbot.dk)",
      "referer":"https://vinbot.dk/"
    };

    const queryTerms = expandQuery(q);

    // --- FEEDS ---
    const feedResults = await Promise.all(FEEDS.map(async ({ merchant, url }) => {
      try {
        const r = await fetch(url, { headers });
        const xml = await r.text();
        const all = parseXmlProducts(xml, merchant);
        const hits = all.filter(p => queryTerms.some(t => p._search.includes(t))).slice(0, 16);
        // proxy billede
        hits.forEach(h => { if (h.image) h.image = "/api/img?src=" + encodeURIComponent(h.image); });
        return hits;
      } catch {
        return [];
      }
    }));

    const feedProducts = feedResults.flat();
    const scored = scoreAndSort(feedProducts, queryTerms);

    if (scored.length) return json(res, { products: scored.slice(0, 24) });

    // --- Fallback: butikker uden feed + OpenGraph, fix relative URLs + image proxy ---
    const merchants = await getMerchants(req).catch(() => []);
    const baseLinks = merchants.map(m => {
      const href = (m.search || "").includes("{Q}")
        ? m.search.replace("{Q}", encodeURIComponent(q))
        : (m.search || m.home || m.url || "");
      return { merchant: m.name || m.host || "Ukendt butik", title: `${q} hos ${m.name || m.host}`,
               price:null, currency:"DKK", image:null, url:href, _page: href };
    });

    const enriched = await enrichWithOpenGraph(baseLinks.slice(0, 10), headers).catch(() => baseLinks);
    enriched.forEach(it => { if (it.image) it.image = "/api/img?src=" + encodeURIComponent(resolveUrl(it.image, it._page)); });
    return json(res, { products: [...enriched, ...baseLinks.slice(10, 24)] });

  } catch {
    return json(res, { products: [] });
  }
}

/* -------- helpers -------- */
function json(res, obj, status=200){ res.setHeader("content-type","application/json; charset=utf-8"); res.status(status).json(obj); }

const SYNONYMS = { barolo:["nebbiolo"], rioja:["tempranillo"], ribera:["tempranillo","ribera del duero"], chianti:["sangiovese"], shiraz:["syrah"], cremant:["crémant"], rose:["rosé"] };

function normalize(s=""){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim(); }
function expandQuery(q){ const base=normalize(q); const t=new Set([base]); Object.keys(SYNONYMS).forEach(k=>{ if(base.includes(k)) SYNONYMS[k].forEach(s=>t.add(normalize(s))); }); return [...t]; }
function toNumber(s){ if(!s) return null; const n=s.replace(/\s/g,"").replace(/\./g,"").replace(/,/g,"."); const v=parseFloat(n); return Number.isFinite(v)?v:null; }
function decodeHTMLEntities(t){ return t.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'"); }
function pickTag(block, tag){ const m=block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`,"i")); return m?decodeHTMLEntities(m[1].trim()):""; }
function parseXmlProducts(xml, merchant){
  const out=[]; const blocks=xml.split(/<product>/i).slice(1).map(b=>b.split(/<\/product>/i)[0]);
  for(const block of blocks){
    const title=pickTag(block,"name")||pickTag(block,"title");
    const desc=pickTag(block,"description")||pickTag(block,"shortdescription")||"";
    const category=pickTag(block,"categorypath")||pickTag(block,"category")||"";
    const brand=pickTag(block,"brand")||pickTag(block,"manufacturer")||"";
    const priceStr=pickTag(block,"price")||pickTag(block,"price_inc_vat")||pickTag(block,"price_old");
    const currency=pickTag(block,"currency")||"DKK";
    const image=pickTag(block,"imageurl")||pickTag(block,"image");
    const url=pickTag(block,"deeplink")||pickTag(block,"link");
    if(!title||!url) continue;
    const price=toNumber(priceStr);
    out.push({ merchant, title, desc, category, brand, price, currency, image, url,
      _search: normalize([title, desc, category, brand].filter(Boolean).join(" ")) });
  }
  return out;
}
function scoreAndSort(items, terms){
  const norm=(s)=>normalize(s||"");
  const score=(p)=>{ let sc=0; const s=p._search||""; terms.forEach(t=>{ if(s.includes(t)) sc+=10; }); if(p.title && norm(p.title).includes(terms[0])) sc+=5; if(p.price!=null) sc+=1; return -sc; };
  return [...items].sort((a,b)=> score(a)-score(b) || (a.price??9e9)-(b.price??9e9));
}
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
async function enrichWithOpenGraph(items, headers){
  const tasks = items.map(async it=>{
    try{
      const r = await fetch(it.url, { headers }); const html = await r.text();
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
  const m = html.replace(/\s+/g," ").match(/(\d{1,3}(\.\d{3})*(,\d{2})?)\s?kr/i);
  return m ? m[1] : null;
}
function resolveUrl(maybe, pageUrl){
  try { return new URL(maybe, pageUrl).toString(); } catch { return maybe; }
}
