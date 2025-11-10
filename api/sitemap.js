export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host  = req.headers.host;
    const base  = `${proto}://${host}`.replace(/\/+$/,"");
    const now   = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Faste sider du har i dag
    const coreRoutes = [
      { loc: "/",                   changefreq: "daily",  priority: 1.0 },
      { loc: "/vin-til/",           changefreq: "weekly", priority: 0.9 },
      { loc: "/druer/",             changefreq: "weekly", priority: 0.8 },
      { loc: "/pris/",              changefreq: "weekly", priority: 0.7 },
      { loc: "/anbefalinger/",      changefreq: "weekly", priority: 0.6 },
      { loc: "/blog/",              changefreq: "weekly", priority: 0.5 },
      { loc: "/pages/om-os.html",   changefreq: "yearly", priority: 0.4 },
      { loc: "/pages/kontakt.html", changefreq: "yearly", priority: 0.3 },
      { loc: "/pages/betingelser.html", changefreq: "yearly", priority: 0.2 },
      { loc: "/pages/privatliv.html",   changefreq: "yearly", priority: 0.2 }
    ];

    // Valgfri: udvid fra en JSON-fil i repoet (ingen fejl hvis den ikke findes)
    // Eksempel på /assets/sitemap.json:
    // {
    //   "routes": [
    //     { "loc": "/vin-til/pizza/", "changefreq":"monthly", "priority": 0.7, "lastmod": "2025-11-05" },
    //     { "loc": "/druer/barolo/",  "changefreq":"monthly", "priority": 0.7 }
    //   ]
    // }
    let extraRoutes = [];
    try {
      const r = await fetch(`${base}/assets/sitemap.json`, { cache: "no-store" });
      if (r.ok) {
        const j = await r.json();
        if (Array.isArray(j.routes)) extraRoutes = j.routes;
      }
    } catch (_) {}

    // Sammensæt & dedup
    const seen = new Set();
    const all = [...coreRoutes, ...extraRoutes]
      .filter(Boolean)
      .filter(x => x.loc && !seen.has(x.loc) && (seen.add(x.loc) || true))
      .map(x => ({
        loc:       x.loc.startsWith("http") ? x.loc : `${base}${x.loc}`,
        changefreq: x.changefreq || "weekly",
        priority:   x.priority   != null ? x.priority : 0.5,
        lastmod:    x.lastmod    || now
      }));

    const xml = buildSitemap(all);

    res.setHeader("content-type", "application/xml; charset=utf-8");
    // Cache i 6 timer i CDN, men revalidate hurtigt i baggrunden
    res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=600");
    res.status(200).send(xml);
  } catch (err) {
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.status(200).send("Sitemap generation error");
  }
}

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildSitemap(entries) {
  const urls = entries.map(e => `
  <url>
    <loc>${esc(e.loc)}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${Number(e.priority).toFixed(1)}</priority>
    <lastmod>${e.lastmod}</lastmod>
  </url>`).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
