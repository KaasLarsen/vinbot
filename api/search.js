export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  const qRaw = (req.query.q || "").toString().trim();
  const budgetMax = req.query.max ? parseInt(req.query.max, 10) : null;

  const proto = req.headers["x-forwarded-proto"] || "https";
  const host  = req.headers.host;
  const base  = `${proto}://${host}`;

  const FEEDS = [
    { merchant: "Mere om Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
    { merchant: "Winther Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
    { merchant: "Vinea",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" }
  ];

  const headers = {
    "user-agent": UA,
    "referer": base,
    "accept": "text/xml,application/xml,text/plain,*/*",
    "cache-control": "no-cache",
  };

  try {
    const terms = expandQuery(qRaw);
    let feeds_ok=0, feeds_failed=0;

    const lists = await Promise.all(FEEDS.map(async ({ merchant, url }) => {
      try{
        const r = await fetch(url, { headers, redirect: "follow" });
        const text = await r.text();

        let products = looksLikeXML(text) ? parseXMLProducts(text, merchant) : parseCSVProducts(text, merchant);

        if (budgetMax != null) products = products.filter(p => p.price != null && p.price <= budgetMax);

        // STRIKT match først
        let matches = products.filter(p => terms.some(t => (p._search||"").includes(t)));

        // hvis intet: vis top-n fra feed (for at bevise liv)
        if (!matches.length) matches = products.slice(0, 20);

        // normaliser billeder (kan være tomme; frontend viser placeholder)
        matches = matches.map(p => {
          const img = normalizeUrl(p.image, p.url);
          return img ? { ...p, image: proxyImg(img) } : { ...p, image: null };
        });

        feeds_ok+=1;
        return matches;
      }catch(e){
        feeds_failed+=1;
        return [];
      }
    }));

    let items = lists.flat();

    // let scoren favorisere term-titel, lav pris, har billede
    items = items.sort((a,b)=>{
      const sa = score(a, terms), sb = score(b, terms);
      return sb - sa || (a.price??9e9) - (b.price??9e9);
    }).slice(0, 48);

    const meta = { feeds_total: FEEDS.length, feeds_ok, feeds_failed };

    if (items.length) return send(res, { source: "feed", products: items, meta });

    // fallback: butikssider med billeder via OG
    const merchants = await getMerchants(base).catch(()=>[]);
    const baseLinks = merchants.map(m=>{
      const href=(m.search||"").includes("{Q}") ? m.search.replace("{Q}",encodeURIComponent(qRaw)) : (m.search||m.home||m.url||"");
      return { merchant:m.name||m.host||"Ukendt butik", title:`${qRaw} hos ${m.name||m.host}`, url:href, image:null, price:null, _page:href };
    });

    const enriched = await enrichWithOpenGraph(baseLinks.slice(0,12), headers).catch(()=>baseLinks);
    const withImg = enriched.map(it=>{
      const img = it.image ? normalizeUrl(it.image, it._page) : null;
      return img ? { ...it, image: proxyImg(img) } : it;
    }).filter(it=>it.image);

    return send(res, { source:"fallback", products: withImg.slice(0,24), meta });
  } catch(err){
    console.error("search_failed", err?.message || err);
    return send(res, { source:"error", products: [], meta:{feeds_total:0,feeds_ok:0,feeds_failed:0} }, 200);
  }
}

/* ---------- helpers ---------- */
function send(res, obj, status=200){ res.setHeader("content-type","application/json; charset=utf-8"); res.status(status).json(obj); }
const UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

function expandQuery(q){
  const base = normalize(q);
  const eq = {
    barolo:["nebbiolo"], nebbiolo:["barolo"],
    rioja:["tempranillo"], tempranillo:["rioja"],
    ribera:["ribera del duero","tempranillo"], "ribera del duero":["ribera","tempranillo"],
    shiraz:["syrah"], syrah:["shiraz"],
    rose:["rosé"], "rosé":["rose"],
    cab:["cabernet","cabernet sauvignon"], cabernet:["cab","cabernet sauvignon"], "cabernet sauvignon":["cab","cabernet"]
  };
  const set = new Set();
  base.split(/\s+/).forEach(t=>{ if(!t) return; set.add(normalize(t)); (eq[t]||[]).forEach(x=>set.add(normalize(x))); });
  return Array.from(set);
}
function normalize(s=""){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim(); }
function toNumber(s){ if(!s) return null; const n=s.replace(/\s/g,"").replace(/\./g,"").replace(/,/g,"."); const v=parseFloat(n); return Number.isFinite(v)?v:null; }
function decodeHTMLEntities(t){ return (t||"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'"); }
function stripCdata(s=""){ return s.replace(/^<!\[CDATA\[/,"").replace(/\]\]>$/,""); }
function looksLikeXML(txt){ return /<\?xml|<rss|<feed|<products|<product|<channel|<item/i.test(txt); }
function proxyImg(src){ return `/api/img?src=${encodeURIComponent(src)}`; }
function normalizeUrl(maybe, pageUrl){ if(!maybe) return null; let s=maybe.trim().replace(/&amp;/g,"&"); if(s.startsWith("//")) s="https:"+s; try{ new URL(s); return s; }catch{} try{ return new URL(s,pageUrl).toString(); }catch{} return null; }

function score(p, terms){
  const s = (p._search||"");
  let sc = 0;
  terms.forEach(t => { if (s.includes(t)) sc += 5; });
  if (p.title && terms.some(t => p.title.toLowerCase().includes(t))) sc += 3;
  if (p.image) sc += 2;
  if (p.price != null) sc += 1;
  return sc;
}

/* --- XML --- */
function parseXMLProducts(xml, merchant){
  const out=[];
  const rows = splitBlocks(xml,"product").length ? splitBlocks(xml,"product") : splitBlocks(xml,"item");
  for(const b of rows){
    const title = pickOne(b,["name","title"]);
    const desc  = pickOne(b,["description","shortdescription","longdescription","long_description","content:encoded"]);
    const category = pickOne(b,["categorypath","category","categories"]);
    const brand = pickOne(b,["brand","manufacturer","producer","vendor","creator"]);

    const priceStr = pickOne(b,["price","price_inc_vat","price_with_vat","saleprice","ourprice","current_price","g:price","price_old"]);
    const price = toNumber(cleanPrice(priceStr));
    const currency = pickOne(b,["currency","currency_iso"]) || extractCurrency(priceStr) || "DKK";

    const url = pickOne(b,["deeplink","link","producturl","url","g:link"]);

    let image = pickOne(b,["imageurl","image_url","image","largeimage","large_image","g:image_link","picture","picture_url","img","imgurl","thumbnail","thumb","smallimage","enclosure url"]);
    if(!image){
      image = pickFirstMatch(b,[
        /<images>[\s\S]*?<image>([\s\S]*?)<\/image>[\s\S]*?<\/images>/i,
        /<additionalimage>([\s\S]*?)<\/additionalimage>/i,
        /<media:content[^>]+url=["']([^"']+)["']/i
      ]);
    }
    if(!title || !url) continue;
    out.push({ merchant, title, desc, category, brand, price, currency, image: image||"", url,
      _search: normalize([title,desc,category,brand].filter(Boolean).join(" ")) });
  }
  return out;
}
function splitBlocks(xml, tag){ return xml.split(new RegExp(`<${tag}\\b[^>]*>`,"i")).slice(1).map(b=>b.split(new RegExp(`</${tag}>`,"i"))[0]); }
function pickTag(block, tag){ const m=block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`,"i")); return m?decodeHTMLEntities(stripCdata(m[1].trim())):""; }
function pickOne(block, tags){ for(const t of tags){ const v=pickTag(block,t); if(v) return v; } return ""; }
function pickFirstMatch(block, regs){ for(const re of regs){ const m=block.match(re); if(m) return decodeHTMLEntities(stripCdata(m[1].trim())); } return ""; }
function cleanPrice(s){ return (s||"").replace(/[A-Z]{3}/ig,"").replace(/kr\./ig,"kr").trim(); }
function extractCurrency(s){ const m=(s||"").match(/\b([A-Z]{3})\b/); if(m) return m[1]; if(/\skr/.test(s||"")) return "DKK"; return null; }

/* --- CSV/TSV --- */
function parseCSVProducts(text, merchant){
  const head=text.slice(0,1024);
  const delim = head.includes("\t") ? "\t" : (head.includes(";") ? ";" : ",");
  const rows = parseCSV(text, delim);
  const headers = rows.shift()?.map(n=>n.toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9:_-]/g,""))||[];
  const idx = mapIndex(headers);
  const out=[];
  for(const r of rows){
    const title=r[idx.title]||"", url=r[idx.url]||"", image=r[idx.image]||"", price=toNumber(r[idx.price]||""), currency=r[idx.curr]||"DKK", brand=r[idx.brand]||"";
    if(!title || !url) continue;
    out.push({ merchant, title, desc:"", category:"", brand, price, currency, image, url,
      _search: normalize([title,brand].join(" ")) });
  }
  return out;
}
function mapIndex(h){
  const pick=(names)=>{ for(const n of names){ const i=h.indexOf(n); if(i!==-1) return i; } return -1; };
  return {
    title: pick(["name","title","productname","product","navn"]),
    url:   pick(["deeplink","link","producturl","url"]),
    image: pick(["imageurl","image_url","image","largeimage","large_image","picture","picture_url","img","imgurl","thumbnail","thumb","smallimage","g:image_link","image_link"]),
    price: pick(["price","price_inc_vat","pricewithvat","saleprice","ourprice","current_price","g:price","pris","price_old"]),
    curr:  pick(["currency","currency_iso","valuta"]),
    brand: pick(["brand","manufacturer","producer","vendor"])
  };
}
function parseCSV(text, delim){
  const rows=[]; let f=""; let row=[]; let q=false; const d=delim;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(q){ if(c==='"'&&n==='"'){f+='"';i++;continue;} if(c==='"'){q=false;continue;} f+=c; continue; }
    if(c==='"'){q=true;continue;}
    if(c===d){row.push(f);f="";continue;}
    if(c==='\n'){row.push(f);rows.push(row);f="";row=[];continue;}
    if(c==='\r'){continue;}
    f+=c;
  }
  if(f.length||row.length){ row.push(f); rows.push(row); }
  return rows.filter(r=>r.some(x=>(x||"").trim().length));
}

/* --- fallback merchants --- */
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
async function enrichWithOpenGraph(items, headers){
  const tasks = items.map(async it=>{
    try{
      const r=await fetch(it.url,{headers,redirect:"follow"}); const html=await r.text();
      const og = pickMeta(html,/(property|name)=["']og:image["']/i) || pickMeta(html,/(property|name)=["']twitter:image["']/i);
      return { ...it, image: og||null };
    }catch{ return it; }
  });
  return Promise.all(tasks);
}
function pickMeta(html, attrRe){
  const m = html.match(new RegExp(`<meta[^>]+${attrRe.source}[^>]+content=["']([^"']+)["']`,"i")); return m?m[1]:null;
}
