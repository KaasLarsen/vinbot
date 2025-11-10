// /api/feed-test.js
export const config = { runtime: "nodejs" };
export default async function handler(req,res){
  const url = "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182"; // Mere om Vin
  const headers = {
    "user-agent":"Mozilla/5.0 Chrome/124",
    "referer": `${req.headers["x-forwarded-proto"]||"https"}://${req.headers.host}`,
    "accept":"text/xml,application/xml,text/plain,*/*"
  };
  try{
    const r = await fetch(url,{headers,redirect:"follow"});
    const xml = await r.text();
    const rows = xml.split(/<product>|<item>/i).slice(1).map(b=>b.split(/<\/product>|<\/item>/i)[0]);
    const take = rows.slice(0,5).map(b=>{
      const val = tag=>{ const m=b.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`,"i")); return m?m[1].trim():""; };
      const any = (...ts)=>{ for(const t of ts){ const v=val(t); if(v) return v; } return ""; };
      return {
        title:any("name","title"),
        url:any("deeplink","link","producturl","url"),
        image:any("imageurl","image_url","image","largeimage","large_image","g:image_link","picture","picture_url","img","imgurl","thumbnail","thumb","smallimage")
      };
    });
    res.setHeader("content-type","application/json; charset=utf-8");
    res.status(200).json({ok:true,count:rows.length,sample:take});
  }catch(e){
    res.status(200).json({ok:false,error:String(e)});
  }
}
