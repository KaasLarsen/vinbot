export const config = { runtime: "nodejs" };

const FEEDS = {
  mere:   { name: "Mere om Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
  winther:{ name: "Winther Vin",  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
  vinea:  { name: "Vinea",        url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" },
};

export default async function handler(req,res){
  const key = (req.query.feed||"mere").toString().toLowerCase();
  const feed = FEEDS[key] || FEEDS.mere;
  const raw  = String(req.query.raw||"") === "1";

  const base = `${req.headers["x-forwarded-proto"]||"https"}://${req.headers.host}`;
  const headers = { "user-agent": UA, "referer": base, "accept":"text/xml,application/xml,text/plain,text/csv,*/*" };

  try{
    const r = await fetch(feed.url, { headers, redirect: "follow" });
    const status = r.status;
    const text = await r.text();

    if (raw) {
      res.setHeader("content-type","text/plain; charset=utf-8");
      return res.status(200).send(text.slice(0, 4000));
    }

    const looksXML = /<\?xml|<rss|<feed|<products|<product|<channel|<item/i.test(text);

    let rows=0, sample=[], headersOut=[], type="";
    if (looksXML) {
      type = "xml";
      const blocks = splitBlocks(text,"product").length ? splitBlocks(text,"product") : splitBlocks(text,"item");
      rows = blocks.length;
      sample = blocks.slice(0,5).map(b=>({
        title: pickOne(b,["name","title"]) || null,
        url:   pickOne(b,["deeplink","link","producturl","url","g:link"]) || null,
        image: pickOne(b,["imageurl","image_url","image","largeimage","large_image","g:image_link","picture","picture_url","img","imgurl","thumbnail"]) || null,
        price: pickOne(b,["price","price_inc_vat","saleprice","g:price"]) || null,
      }));
    } else {
      type = "csv/tsv";
      const head=text.slice(0,1024);
      const delim = head.includes("\t") ? "\t" : (head.includes(";") ? ";" : ",");
      const rowsArr = parseCSV(text, delim);
      headersOut = rowsArr[0] || [];
      const body = rowsArr.slice(1);
      rows = body.length;
      sample = body.slice(0,5).map(r=>{
        const h = headersOut.map(h=>h.toLowerCase().replace(/\s+/g,"").replace(/[^a-z0-9:_-]/g,""));
        const idx = (names)=>{ for(const n of names){ const i=h.indexOf(n); if(i!==-1) return i; } return -1; };
        return {
          title: r[idx(["name","title","productname","product","navn"])] || null,
          url:   r[idx(["deeplink","link","producturl","url"])] || null,
          image: r[idx(["imageurl","image_url","image","largeimage","large_image","picture","picture_url","img","imgurl","thumbnail","g:image_link","image_link"])] || null,
          price: r[idx(["price","price_inc_vat","pricewithvat","saleprice","ourprice","current_price","g:price","pris"])] || null,
        };
      });
    }

    res.setHeader("content-type","application/json; charset=utf-8");
    res.status(200).json({
      ok:true, feed:feed.name, http_status:status, type, rows, headers: headersOut.slice(0,20),
      sample
    });
  }catch(e){
    res.status(200).json({ok:false, feed:feed.name, error:String(e)});
  }
}

const UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

/* utils for xml */
function splitBlocks(xml, tag){ return xml.split(new RegExp(`<${tag}\\b[^>]*>`,"i")).slice(1).map(b=>b.split(new RegExp(`</${tag}>`,"i"))[0]); }
function pickTag(block, tag){ const m=block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`,"i")); return m?m[1].trim():""; }
function pickOne(block, tags){ for(const t of tags){ const v=pickTag(block,t); if(v) return v; } return ""; }
/* utils for csv */
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
