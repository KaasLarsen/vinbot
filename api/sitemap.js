// /api/sitemap.js (MINIMAL TEST)
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host  = req.headers.host;
  const base  = `${proto}://${host}`.replace(/\/+$/,"");
  const today = new Date().toISOString().slice(0,10);

  const core = [
    "/", "/vin-til/", "/druer/", "/pris/", "/anbefalinger/", "/blog/",
    "/pages/om-os.html","/pages/kontakt.html","/pages/betingelser.html","/pages/privatliv.html"
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${core.map(u => `
  <url>
    <loc>${base}${u}</loc>
    <changefreq>${u === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${u === "/" ? "1.0" : "0.7"}</priority>
    <lastmod>${today}</lastmod>
  </url>`).join("")}
</urlset>`;

  res.setHeader("content-type","application/xml; charset=utf-8");
  res.status(200).send(xml);
}
