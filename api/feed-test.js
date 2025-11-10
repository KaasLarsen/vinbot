export const config = { runtime: "nodejs" };

const FEEDS = {
  mere:   { name: "Mere om Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
  winther:{ name: "Winther Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
  vinea:  { name: "Vinea",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" },
};

export default async function handler(req,res){
  const key = (req.query.feed||"mere").toString().toLowerCase();
  const feed = FEEDS[key] || FEEDS.mere;

  const useProxy = String(req.query.proxy||"") === "1";
  const forceRaw = String(req.query.raw||"") === "1";

  const headers = {
    "user-agent": UA,
    "accept": "text/xml,application/xml,text/plain,text/csv,*/*",
  };
  const fetchUrl = useProxy
    ? "https://r.jina.ai/http://" + feed.url.replace(/^https?:\/\//,"")
    : feed.url;

  try{
    const r = await fetch(fetchUrl, { headers, redirect: "follow" });
    const status = r.status;
    const text = await r.text();

    // Hvis brugeren beder om raw, eller vores parser ikke finder noget -> vis råt udsnit
    if (forceRaw) {
      res.setHeader("content-type","text/plain; charset=utf-8");
      return res.status(200).send(text.slice(0, 4000));
    }

    const looksXML = /<\?xml|<rss|<feed|<channel|<products|<product|<item/i.test(text);
    let rows=0, sample=[], headersOut=[], type="";

    if (looksXML) {
      type = "xml";
      // Prøv kendte blokke
      let blocks = splitBlocks(text,"product");
      if (!blocks.length) blocks = splitBlocks(text,"item");
      if (!blocks.length) {
        // Generisk: find blokke omkring et URL-felt (deeplink/link/producturl/url)
        blocks = genericXmlBlocks(text, ["product","item","row","entry","offer","record","node"], ["deeplink","link","producturl","url","g:link"]);
      }
      rows = blocks.length;
      sample = blocks.slice(0,5).map(b=>({
        title: pickOne(b,["name","title","g:title"]) || null,
        url:   pickOne(b,["deeplink","link","producturl","url","g:link"]) || null,
        image: pickOne(b,["imageurl","image_url","image","largeimage","g:image_link","picture","picture_url","img","imgurl","thumbnail"]) || null,
        price: pickOne(b,["price","price_inc_vat","price_with_vat","saleprice","g:price","pris"]) || null,
      }));
    } else {
      type = "csv/tsv";
      const head=text.slice(0,1024);
      const delim = head.includes("\t") ? "\t" : (head.includes(";") ? ";" : ",");
      const rowsArr = parseCSV(text, delim);
      headersOut = rowsArr[0] || [];
      const body = rowsArr.slice(1);
      rows = body.length;
      const h = headersOut.map(h=>h.toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9:_-]/g,""));
      const idx = (names)=>{ for(const n of names){ const i=h.indexOf(n); if(i!==-1) return i; } return -1; };
      sample = body.slice(0,5).map(r=>({
        title: r[idx(["name","title","productname","product","navn"])] || null,
        url:   r[idx(["deeplink","link","producturl","url"])] || null,
        image: r[idx(["imageurl","image_url","image","largeimage","picture","picture_url","img","imgurl","thumbnail","g:image_link","image_link"])] || null,
        price: r[idx(["price","price_inc_vat","pricewithvat","saleprice","ourprice","current_price","g:price","pris"])] || null,
      }));
    }

    // Auto-RAW fallback hvis rækker = 0 (så du ser feed-toppen uden at tilføje ?raw=1)
    if (rows === 0) {
      res.setHeader("content-type","application/json; charset=utf-8");
      return res.status(200).json({
        ok:true, feed:feed.name, http_status:status, type, rows, headers: headersOut.slice(0,20),
        sample,
        hint:"rows=0 → open same URL with &raw=1 to view the first 4000 chars and identify tag names"
      });
    }

    res.setHeader("content-type","application/json; charset=utf-8");
    res.status(200).json({ ok:true, feed:feed.name, http_status:status, type, rows, headers: headersOut.slice(0,20), sample });
  }catch(e){
    res.status(200).json({ ok:false, feed:feed.name, error:String(e) });
  }
}

const UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

/* ---- XML helpers ---- */
function splitBlocks(xml, tag){ return xml.split(new RegExp(`<${tag}\\b[^>]*>`,"i")).slice(1).map(b=>b.split(new RegExp(`</${tag}>`,"i"))[0]); }
function pickTag(block, tag){ const m=block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`,"i")); return m?m[1].trim():""; }
function pickOne(block, tags){ for(const t of tags){ const v=pickTag(block,t); if(v) return v; } return ""; }
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
    const hasUrl = urlFields.some(f => new RegExp(`<${f}\\b[^>]*>`,`i`).test(block));
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

/* ---- CSV helper ---- */
function parseCSV(text, delim){
  const rows=[]; let f="", row=[], q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(q){ if(c==='"'&&n==='"'){f+='"';i++;continue;} if(c==='"'){q=false;continue;} f+=c; continue; }
    if(c==='"'){q=true;continue;}
    if(c===delim){row.push(f);f="";continue;}
    if(c==='\n'){row.push(f);rows.push(row);f="";row=[];continue;}
    if(c==='\r'){continue;}
    f+=c;
  }
  if(f.length||row.length){ row.push(f); rows.push(row); }
  return rows.filter(r=>r.some(x=>(x||"").trim().length));
}
