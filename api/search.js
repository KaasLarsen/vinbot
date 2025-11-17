export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const qRaw = (req.query.q || "").toString().trim();

    // Evt. max fra frontend (chips / "under 150 kr" osv.)
    const budgetMaxParam = req.query.max ? parseInt(req.query.max, 10) : null;

    // Parse pris-interval fra selve søgeteksten (fx "100-150 kr")
    const priceFilter = parsePriceFilter(qRaw, budgetMaxParam);
    const priceMin = priceFilter.min;
    const priceMax = priceFilter.max;

    const FEEDS = [
      { merchant: "Mere om Vin",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
      { merchant: "Winther Vin",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
      { merchant: "Vinea",              url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" },
      { merchant: "Barlife",            url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=46609&feedid=651" },
      { merchant: "DH Wines",           url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=108173&feedid=3461" },
      { merchant: "D’Wine",             url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=92927&feedid=2455" },
      { merchant: "Gourmetshoppen",     url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=80950&feedid=1925" },
      { merchant: "Johnsen Vine",       url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=114732&feedid=4073" },
      { merchant: "SPS Wine",           url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=112662&feedid=3860" },
      { merchant: "Westjysk Smag",      url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=91648&feedid=2398" },
      { merchant: "Winesommelier",      url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=114219&feedid=4021" }
    ];

    const headers = {
      "user-agent": UA,
      "accept": "text/xml,application/xml,text/plain,text/csv,*/*",
    };

    const terms = expandQuery(qRaw);
    let feeds_ok = 0, feeds_failed = 0;

    const lists = await Promise.all(
      FEEDS.map(async ({ merchant, url }) => {
        try {
          const r = await fetch(url, { headers, redirect: "follow" });
          const buf = await r.arrayBuffer();
          const text = decodeText(buf);

          let products = looksLikeXML(text)
            ? parseXMLProducts(text, merchant)
            : parseCSVProducts(text, merchant);

          // 1) Filtrér til vin-lignende produkter
          products = products.filter(isWineLike);

          // 2) Filtrér på pris-interval, hvis vi har noget at gå efter
          if (priceMin != null || priceMax != null) {
            products = products.filter(p => {
              if (p.price == null) return false;
              if (priceMin != null && p.price < priceMin) return false;
              if (priceMax != null && p.price > priceMax) return false;
              return true;
            });
          }

          // Ingen produkter tilbage i dette feed → bare skip feedet
          if (!products.length) {
            feeds_ok++;
            return [];
          }

          // match bredt – men kun på vin-produkter
          let matches = products.filter(p =>
            terms.some(t => (p._search || "").includes(t))
          );

          // hvis ingen match for denne butik → lad den være tom (ingen random crap)
          if (!matches.length) {
            feeds_ok++;
            return [];
          }

          // proxy billede
          matches = matches.map(p => {
            const img = normalizeUrl(p.image, p.url);
            return img ? { ...p, image: proxyImg(img) } : { ...p, image: null };
          });

          feeds_ok++;
          return matches;
        } catch {
          feeds_failed++;
          return [];
        }
      })
    );

    let items = lists.flat();

    // sortér: matchscore, billede, pris
    items = items
      .sort((a, b) => {
        const sa = score(a, terms), sb = score(b, terms);
        return (
          sb - sa ||
          (a.image ? 0 : 1) - (b.image ? 0 : 1) ||
          (a.price ?? 9e9) - (b.price ?? 9e9)
        );
      })
      .slice(0, 48); // kan sættes ned til 12 hvis du vil vise færre pr. kald

    const meta = {
      feeds_total: FEEDS.length,
      feeds_ok,
      feeds_failed,
      priceMin,
      priceMax
    };

    if (items.length) return send(res, { source: "feed", products: items, meta });
    return send(res, { source: "fallback", products: [], meta });
  } catch (e) {
    return send(
      res,
      { source: "error", products: [], meta: { feeds_total: 0, feeds_ok: 0, feeds_failed: 0 } },
      200
    );
  }
}

/* ---------- helpers ---------- */
function send(res, obj, status = 200) {
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.status(status).json(obj);
}

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

/* === Prisforståelse fra fri tekst === */
function parsePriceFilter(qRaw, budgetMaxParam) {
  const txt = (qRaw || "").toLowerCase();

  let min = null;
  let max = null;

  // Interval: "100-150 kr", "100 – 150 kr"
  let m = txt.match(/(\d{2,5})\s*[-–]\s*(\d{2,5})\s*kr/);
  if (m) {
    const a = parseInt(m[1], 10);
    const b = parseInt(m[2], 10);
    min = Math.min(a, b);
    max = Math.max(a, b);
  }

  // "fra 100 til 150 kr", "mellem 80 og 120 kr"
  if (!m) {
    m = txt.match(/(?:fra|mellem)\s*(\d{2,5})\s*(?:til|og)\s*(\d{2,5})\s*kr/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      min = Math.min(a, b);
      max = Math.max(a, b);
    }
  }

  // "under 150 kr", "max 150 kr"
  if (max == null) {
    m = txt.match(/(?:under|max)\s*(\d{2,5})\s*kr/);
    if (m) {
      max = parseInt(m[1], 10);
    }
  }

  // "mindst 100 kr", "over 200 kr", "fra 100 kr"
  if (min == null) {
    m = txt.match(/(?:mindst|over|fra)\s*(\d{2,5})\s*kr/);
    if (m) {
      min = parseInt(m[1], 10);
    }
  }

  // Hvis frontend har sendt en max, så lad den "vinde"
  if (budgetMaxParam != null) {
    if (max == null || budgetMaxParam < max) {
      max = budgetMaxParam;
    }
  }

  // Simpel "billig/budget" fallback hvis intet max
  if (max == null && /billig|budget/.test(txt)) {
    max = 100;
  }

  return { min, max };
}

/* === Vin-/ikke-vin-filtret (opdateret) === */
function isWineLike(p) {
  const text = (
    (p.title || "") + " " +
    (p.desc || "") + " " +
    (p.category || "")
  ).toLowerCase();

  // Ting vi ALDRIG vil vise – selv hvis der står "vin" i teksten
  const hardNegative = [
    // Glas & udstyr
    "glas", "vinglas", "wine glass", "ølglas", "champagneglas",
    "karaffel", "karafel", "dekanter", "decanter",
    "vinreol", "vinskab", "vinholder",
    "oplukker", "proptrækker", "korkskruer",
    "iskøler", "vinkøler",
    "shotglas", "shotsglas",
    "cocktailglas", "martiniglas",

    // Random non-vin crap
    "kosteskaft", "fejekost", "kost", "fejeblad", "moppe", "spand"
  ];

  if (hardNegative.some(w => text.includes(w))) {
    return false;
  }

  const positive = [
    "vin", "wine",
    "rødvin", "hvidvin", "dessertvin", "mousserende", "sparkling",
    "riesling", "chardonnay", "sauvignon", "sauvignon blanc",
    "pinot", "pinot noir", "nebbiolo", "barolo",
    "cabernet", "cabernet sauvignon", "merlot", "malbec",
    "tempranillo", "zinfandel", "primitivo",
    "bordeaux", "bourgogne", "burgundy", "chianti",
    "valpolicella", "amarone", "ripasso",
    "rioja", "ribera del duero", "ribera",
    "cava", "prosecco", "champagne", "crémant", "cremant", "spumante",
    "moscato", "sauternes", "portvin", "port", "sherry",
    "tinto", "rosso", "rouge", "blanc", "rosé", "rose"
  ];

  const negative = [
    "øl", "oel", "beer", "bryg", "brew",
    "gin", "rum", "rom", "whisky", "whiskey", "vodka", "tequila",
    "cognac", "brandy",
    "likør", "liqueur", "akvavit", "snaps",
    "gavekurv", "gavekurve", "gaveæske", "gaveboks",
    "chokolade", "kaffe",
    "sirup", "sodavand", "lemonade"
  ];

  const hasPos = positive.some(w => text.includes(w));
  const hasNeg = negative.some(w => text.includes(w));

  // Hvis det tydeligt ligner øl/spirits/chokolade osv. og IKKE har stærke vin-signaler → ud
  if (hasNeg && !hasPos) return false;

  // Hvis der hverken er vin-signaler eller ordet vin/wine overhovedet → ud
  if (!hasPos && !/vin|wine/.test(text)) {
    return false;
  }

  // Ellers accepterer vi det
  return true;
}

/* -------- INTENT/SYNONYMER (backenden) -------- */
function expandQuery(q) {
  const base = normalize(q);

  // Ord der ikke hjælper søgningen (stopord)
  const stopwords = new Set([
    "vin", "vine",
    "til", "for", "med", "og", "eller",
    "en", "et", "den", "det", "de"
  ]);

  const eq = {
    barolo: ["nebbiolo"], nebbiolo: ["barolo"],
    rioja: ["tempranillo"], tempranillo: ["rioja"],
    ribera: ["ribera del duero", "tempranillo"],
    "ribera del duero": ["ribera", "tempranillo"],
    shiraz: ["syrah"], syrah: ["shiraz"],
    rose: ["rosé"], "rosé": ["rose"],
    cab: ["cabernet", "cabernet sauvignon"],
    cabernet: ["cab", "cabernet sauvignon"],
    "cabernet sauvignon": ["cab", "cabernet"]
  };

  const set = new Set();

  // 1) Normale søgeord + drue-synonymer
  base.split(/\s+/).forEach(t => {
    if (!t) return;
    const n = normalize(t);
    if (stopwords.has(n)) return; // skip fx "vin", "til"
    set.add(n);
    (eq[n] || []).forEach(x => set.add(normalize(x)));
  });

  // 2) Intent-baserede ekstra termer (vin til juleaften/nytår/bøf/fisk/tapas osv.)
  intentTermsFromQuery(q).forEach(term => {
    set.add(normalize(term));
  });

  // 3) Fallback – hvis alt blev filtreret væk, så søg i det mindste på "vin"
  if (!set.size) {
    set.add("vin");
  }

  return Array.from(set);
}

function intentTermsFromQuery(q = "") {
  const txt = q.toLowerCase();
  const out = [];

  // --- JULEAFTEN / JULEMAD / ANDE-/FLÆSKESTEG ---
  if (/(juleaften|julemad|flæskesteg|flaeskesteg|andesteg|andebryst|juleand|ribbensteg|julefrokost)/.test(txt)) {
    out.push(
      "rødvin",
      "pinot noir",
      "bourgogne",
      "valpolicella",
      "amarone",
      "barolo",
      "rioja",
      "cotes du rhone"
    );
  }

  // --- NYTÅRSAFTEN / NYTÅR ---
  if (/(nytår|nytaar|nytarsaften|nytaarsaften|nytårsaften)/.test(txt)) {
    out.push(
      "champagne",
      "cava",
      "prosecco",
      "cremant",
      "crémant",
      "sparkling",
      "mousserende"
    );
  }

  // --- BØF / OKSEKØD / STEAK ---
  if (/(bøf|bof|boef|oksekød|oksekoed|oksekod|steak|entrecote|entrecôte|ribeye|rib-eye)/.test(txt)) {
    out.push(
      "cabernet sauvignon",
      "malbec",
      "barolo",
      "bordeaux",
      "syrah",
      "shiraz",
      "rioja"
    );
  }

  // --- SVINEKØD / GRIS / KAM-/FLÆSKESTEG ---
  if (/(svinekød|svinekoed|svinekod|gris|kamsteg|flæskesteg|flaeskesteg)/.test(txt)) {
    out.push(
      "pinot noir",
      "bourgogne",
      "cotes du rhone",
      "chianti"
    );
  }

  // --- FISK & SKALDYR ---
  if (/(fisk|torsk|kuller|kabelau|kabeljau|laks|ørred|orred|rejer|skaldyr|muslinger|østers|oesters)/.test(txt)) {
    out.push(
      "hvidvin",
      "riesling",
      "sauvignon blanc",
      "chardonnay",
      "albariño",
      "albarino",
      "chablis"
    );
  }

  // --- TAPAS / OST / CHARCUTERI ---
  if (/(tapas|ostebord|oste|ost|charcuteri|pølsebord|pølse|pålæg|palaeg)/.test(txt)) {
    out.push(
      "cava",
      "rioja",
      "tempranillo",
      "garnacha",
      "sherry"
    );
  }

  return out;
}

function normalize(s = "") {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ======= OPDATERET PRIS-PARSER ======= */
function toNumber(s) {
  if (!s) return null;
  let str = String(s).trim();

  // fjern valuta/labels og whitespace
  str = str
    .replace(/\s*(kr\.?|dkk)\s*$/i, "")
    .replace(/\s/g, "");

  // 1) EU-format: 1.234,56 eller 12.345
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(str)) {
    str = str.replace(/\./g, "").replace(",", ".");
    const v = parseFloat(str);
    return Number.isFinite(v) ? v : null;
  }

  // 2) DK decimal med komma: 849,00
  if (/^\d+,\d+$/.test(str)) {
    const v = parseFloat(str.replace(",", "."));
    return Number.isFinite(v) ? v : null;
  }

  // 3) US-format med komma som tusinder: 1,234.56
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(str)) {
    const v = parseFloat(str.replace(/,/g, ""));
    return Number.isFinite(v) ? v : null;
  }

  // 4) Plain "849.00" eller "849"
  const v = parseFloat(str);
  return Number.isFinite(v) ? v : null;
}

/* øvrige helpers: decode, parsere, score osv. – uændret fra før */

function decodeHTMLEntities(t){
  return (t||"")
    .replace(/&amp;/g,"&")
    .replace(/&lt;/g,"<")
    .replace(/&gt;/g,">")
    .replace(/&quot;/g,'"')
    .replace(/&#039;/g,"'");
}
function stripCdata(s=""){
  return s.replace(/^<!\[CDATA\[/,"").replace(/\]\]>$/,"");
}
function looksLikeXML(txt){
  return /<\?xml|<rss|<feed|<channel|<products|<product|<item|<produkter|<produkt/i.test(txt);
}
function proxyImg(src){
  return `/api/img?src=${encodeURIComponent(src)}`;
}
function normalizeUrl(maybe, pageUrl){
  if(!maybe) return null;
  let s = maybe.trim().replace(/&amp;/g,"&");
  if(s.startsWith("//")) s="https:"+s;
  try{
    new URL(s);
    return s;
  }catch{}
  try{
    return new URL(s,pageUrl).toString();
  }catch{}
  return null;
}
function score(p, terms){
  const s=p._search||"";
  let sc=0;
  terms.forEach(t=>{ if(s.includes(t)) sc+=5; });
  if(p.title && terms.some(t => (p.title||"").toLowerCase().includes(t))) sc+=3;
  if(p.image) sc+=2;
  if(p.price!=null) sc+=1;
  return sc;
}
function decodeText(buf){
  try{
    const head = new TextDecoder("utf-8").decode(buf.slice(0, 200));
    const m = head.match(/encoding=["']([^"']+)["']/i);
    const enc = (m ? m[1] : "utf-8").toLowerCase();
    if (enc.includes("8859") || enc.includes("latin1")) {
      return new TextDecoder("iso-8859-1").decode(buf);
    }
    return new TextDecoder("utf-8").decode(buf);
  }catch{
    return new TextDecoder("utf-8").decode(buf);
  }
}

/* ---------- XML parser (inkl. danske tags) ---------- */
function parseXMLProducts(xml, merchant){
  const out=[];
  // Fjern namespaces (g:image_link -> g_image_link)
  let txt = xml
    .replace(/<([a-z0-9]+):/ig, "<$1_")
    .replace(/<\/([a-z0-9]+):/ig, "</$1_");
  // Kendte blokke inkl. dansk
  let blocks = splitBlocks(txt,"product");
  if (!blocks.length) blocks = splitBlocks(txt,"item");
  if (!blocks.length) blocks = splitBlocks(txt,"produkt");
  if (!blocks.length) blocks = genericXmlBlocks(
    txt,
    ["product","item","row","entry","offer","record","node","produkt"],
    ["deeplink","link","producturl","url","g_link","vareurl"]
  );

  for (const b of blocks){
    const title = pickOne(b, ["name","title","g_title","produktnavn"]);
    const desc  = pickOne(b, ["description","shortdescription","longdescription","long_description","content_encoded","beskrivelse"]);
    const category = pickOne(b, ["categorypath","category","categories","kategorinavn"]);
    const brand = pickOne(b, ["brand","manufacturer","producer","vendor","creator","forhandler"]);

    const priceStr = pickOne(b, ["price","price_inc_vat","price_with_vat","saleprice","ourprice","current_price","g_price","price_old","pris","nypris"]);
    const price = toNumber(cleanPrice(priceStr));
    const currency = pickOne(b, ["currency","currency_iso"]) || extractCurrency(priceStr) || "DKK";

    const url = pickOne(b, ["deeplink","link","producturl","url","g_link","vareurl"]);
    let image = pickOne(b, ["imageurl","image_url","image","largeimage","large_image","g_image_link","picture","picture_url","img","imgurl","thumbnail","thumb","smallimage","enclosure url","billedurl"]);
    if (!image) image = pickFirstMatch(b,[
      /<images>[\s\S]*?<image>([\s\S]*?)<\/image>[\s\S]*?<\/images>/i,
      /<additionalimage>([\s\S]*?)<\/additionalimage>/i,
      /<media_content[^>]+url=["']([^"']+)["']/i
    ]);

    if (!title || !url) continue;

    out.push({
      merchant,
      title: decodeHTMLEntities(title),
      desc: decodeHTMLEntities(desc),
      category: decodeHTMLEntities(category),
      brand: decodeHTMLEntities(brand),
      price,
      currency,
      image: image || "",
      url,
      _search: normalize([title, desc, category, brand].filter(Boolean).join(" "))
    });
  }
  return out;
}
function splitBlocks(xml, tag){
  return xml
    .split(new RegExp(`<${tag}\\b[^>]*>`,"i"))
    .slice(1)
    .map(b=>b.split(new RegExp(`</${tag}>`,"i"))[0]);
}
function pickTag(block, tag){
  const m=block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`,"i"));
  return m?decodeHTMLEntities(stripCdata(m[1].trim())):"";
}
function pickOne(block, tags){
  for(const t of tags){
    const v=pickTag(block,t);
    if(v) return v;
  }
  return "";
}
function pickFirstMatch(block, regs){
  for(const re of regs){
    const m=block.match(re);
    if(m) return decodeHTMLEntities(stripCdata(m[1].trim()));
  }
  return "";
}
function cleanPrice(s){
  return (s||"").replace(/[A-Z]{3}/ig,"").replace(/kr\./ig,"kr").trim();
}
function extractCurrency(s){
  const m=(s||"").match(/\b([A-Z]{3})\b/);
  if(m) return m[1];
  if(/\skr/.test(s||"")) return "DKK";
  return null;
}
function genericXmlBlocks(xml, containers, urlFields){
  const out=[];
  const openRe = new RegExp(`<(${containers.join("|")})\\b[^>]*>`,"ig");
  let m;
  while ((m=openRe.exec(xml))){
    const tag = m[1];
    const start = m.index + m[0].length;
    const closeRe = new RegExp(`</${tag}>`,"ig");
    closeRe.lastIndex = start;
    const close = closeRe.exec(xml);
    if (!close) continue;
    const block = xml.slice(m.index, close.index + close[0].length);
    const hasUrl = urlFields.some(f => new RegExp(`<${f}\\b[^>]*>`,"i").test(block));
    if (hasUrl) out.push(block);
    openRe.lastIndex = close.index + close[0].length;
  }
  if (!out.length){
    const urlRe = new RegExp(`<(${urlFields.join("|")})\\b[^>]*>([\\s\\S]*?)<\\/\\1>`,"ig");
    let mu;
    while ((mu=urlRe.exec(xml))){
      const start = Math.max(0, mu.index - 800);
      const end   = Math.min(xml.length, urlRe.lastIndex + 800);
      out.push(xml.slice(start,end));
    }
  }
  return out;
}

/* ---------- CSV/TSV parser ---------- */
function parseCSVProducts(text, merchant){
  const head=text.slice(0,1024);
  const delim = head.includes("\t") ? "\t" : (head.includes(";") ? ";" : ",");
  const rows = parseCSV(text, delim);
  const headers = rows.shift()?.map(n=>n.toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9:_-]/g,""))||[];
  const pick=(names)=>{ for(const n of names){ const i=headers.indexOf(n); if(i!==-1) return i; } return -1; };
  const it=pick(["name","title","productname","product","navn","produktnavn"]);
  const iu=pick(["deeplink","link","producturl","url","vareurl"]);
  const ii=pick(["imageurl","image_url","image","largeimage","large_image","picture","picture_url","img","imgurl","thumbnail","thumb","smallimage","g:image_link","image_link","billedurl"]);
  const ip=pick(["price","price_inc_vat","pricewithvat","saleprice","ourprice","current_price","g:price","pris","price_old","nypris"]);
  const ic=pick(["currency","currency_iso","valuta"]);
  const ib=pick(["brand","manufacturer","producer","vendor","forhandler"]);
  const out=[];
  for(const r of rows){
    const title=r[it]||"", url=r[iu]||"", image=r[ii]||"", price=toNumber(r[ip]||""), currency=r[ic]||"DKK", brand=r[ib]||"";
    if(!title || !url) continue;
    out.push({
      merchant,
      title,
      desc:"",
      category:"",
      brand,
      price,
      currency,
      image,
      url,
      _search: normalize([title,brand].join(" "))
    });
  }
  return out;
}
function parseCSV(text, delim){
  const rows=[]; let f="", row=[], q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(q){
      if(c==='"'&&n==='"'){f+='"';i++;continue;}
      if(c==='"'){q=false;continue;}
      f+=c;
      continue;
    }
    if(c==='"'){q=true;continue;}
    if(c===delim){row.push(f);f="";continue;}
    if(c==='\n'){row.push(f);rows.push(row);f="";row=[];continue;}
    if(c==='\r'){continue;}
    f+=c;
  }
  if(f.length||row.length){ row.push(f); rows.push(row); }
  return rows.filter(r=>r.some(x=>(x||"").trim().length));
}
