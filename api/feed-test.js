export const config = { runtime: "nodejs" };

const FEEDS = {
  mere:   { name: "Mere om Vin", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
  winther:{ name: "Winther Vin", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
  vinea:  { name: "Vinea",       url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" },
};

export default async function handler(req,res){
  const key = (req.query.feed||"mere").toString().toLowerCase();
  const feed = FEEDS[key] || FEEDS.mere;

  const base = `${req.headers["x-forwarded-proto"]||"https"}://${req.headers.host}`;
  const headers = { "user-agent": UA, "referer": base, "accept":"text/xml,application/xml,text/plain,*/*" };

  try{
    const r = await fetch(feed.url, { headers, redirect: "follow" });
    const status = r.status;
    const text = await r.text();

    const rows = splitBlocks(text,"product").length ? splitBlocks(text,"product") : splitBlocks(text,"item");
    const sample = rows.slice(0,5).map(b => ({
      title: pickOne(b,["name","title"]) || null,
      url:   pickOne(b,["deeplink","link","producturl","url","g:link"]) || null,
      image: pickOne(b,["imageurl","image_url","image","largeimage","large_image","g:image_link","picture","picture_url","img","imgurl","thumbnail"]) || null
    }));

    res.setHeader("content-type","application/json; charset=utf-8");
    res.status(200).json({ok:true, feed:feed.name, http_status:status, rows:rows.length, sample});
  }catch(e){
    res.status(200).json({ok:false, error:String(e), feed:feed.name});
  }
}

const UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
function splitBlocks(xml, tag){ return xml.split(new RegExp(`<${tag}\\b[^>]*>`,"i")).slice(1).map(b=>b.split(new RegExp(`</${tag}>`,"i"))[0]); }
function pickTag(block, tag){ const m=block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`,"i")); return m?m[1].trim():""; }
function pickOne(block, tags){ for(const t of tags){ const v=pickTag(block,t); if(v) return v; } return ""; }
