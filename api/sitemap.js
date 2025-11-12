// /api/sitemap.js (ROBUST AUTO)
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host  = req.headers.host;
    const base  = `${proto}://${host}`.replace(/\/+$/,"");
    const today = new Date().toISOString().slice(0,10);

    const coreRoutes = [
      { loc: "/",                   changefreq: "daily",  priority: 1.0, lastmod: today },
      { loc: "/vin-til/",           changefreq: "weekly", priority: 0.9, lastmod: today },
      { loc: "/druer/",             changefreq: "weekly", priority: 0.8, lastmod: today },
      { loc: "/pris/",              changefreq: "weekly", priority: 0.7, lastmod: today },
      { loc: "/anbefalinger/",      changefreq: "weekly", priority: 0.6, lastmod: today },
      { loc: "/blog/",              changefreq: "weekly", priority: 0.5, lastmod: today },
      { loc: "/pages/om-os.html",   changefreq: "yearly", priority: 0.4, lastmod: today },
      { loc: "/pages/kontakt.html", changefreq: "yearly", priority: 0.3, lastmod: today },
      { loc: "/pages/betingelser.html", changefreq: "yearly", priority: 0.2, lastmod: today },
      { loc: "/pages/privatliv.html",   changefreq: "yearly", priority: 0.2, lastmod: today }
    ];

    // valgfri JSON-udvidelser
    let extraRoutes = [];
    try {
      const r = await fetch(`${base}/assets/sitemap.json`, { cache: "no-store" });
      if (r.ok) {
        const j = await r.json();
        if (Array.isArray(j.routes)) extraRoutes = j.routes;
      }
    } catch {}

    // auto-scan af /public
    const autoRoutes = await safeCollectFileRoutes();

    // saml + dedup
    const seen = new Set();
    const all = [...coreRoutes, ...extraRoutes, ...autoRoutes]
      .filter(Boolean)
      .map(coerceRoute)
      .filter(r => r.loc && !seen.has(r.loc) && (seen.add(r.loc) || true));

    const xml = buildXML(all, base);
    res.setHeader("content-type","application/xml; charset=utf-8");
    res.setHeader("Cache-Control","public, s-maxage=21600, stale-while-revalidate=600");
    res.status(200).send(xml);
  } catch (e) {
    res.setHeader("content-type","text/plain; charset=utf-8");
    res.status(200).send("Sitemap generation error");
  }
}

/* -------- helpers -------- */
function esc(s=""){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function iso(d){ try { return new Date(d).toISOString().slice(0,10); } catch { return new Date().toISOString().slice(0,10); } }
function coerceRoute(x){
  return {
    loc: x.loc,
    changefreq: x.changefreq || "weekly",
    priority: x.priority != null ? x.priority : 0.5,
    lastmod: x.lastmod ? iso(x.lastmod) : iso(new Date())
  };
}
function buildXML(entries, base){
  const urls = entries.map(e => `
  <url>
    <loc>${esc(e.loc.startsWith("http") ? e.loc : `${base}${e.loc}`)}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${Number(e.priority).toFixed(1)}</priority>
    <lastmod>${e.lastmod}</lastmod>
  </url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// indpak scanning i try/catch så endpoint aldrig crasher
async function safeCollectFileRoutes(){
  try { return await collectFileRoutes(); } catch { return []; }
}

async function collectFileRoutes(){
  const fs = await import("fs/promises");
  const path = await import("path");
  const cwd = process.cwd(); // Vercel/Node serverless root
  const publicDir = path.join(cwd, "public");

  async function statSafe(p){ try { return await fs.stat(p); } catch { return null; } }
  async function isDir(p){ const s = await statSafe(p); return !!(s && s.isDirectory()); }

  const targets = [
    { dir: "pages",            base: "/pages",            changefreq: "yearly", priority: 0.4 },
    { dir: "vin-til",          base: "/vin-til",          changefreq: "weekly", priority: 0.8 },
    { dir: "druer",            base: "/druer",            changefreq: "weekly", priority: 0.8 },
    { dir: "pris",             base: "/pris",             changefreq: "weekly", priority: 0.7 },
    { dir: "anbefalinger",     base: "/anbefalinger",     changefreq: "weekly", priority: 0.6 },
    { dir: "blog",             base: "/blog",             changefreq: "weekly", priority: 0.5 }
  ];

  const out = [];

  async function scanHtml(absDir, baseHref, changefreq, priority){
    let entries = [];
    try {
      entries = await fs.readdir(absDir, { withFileTypes: true });
    } catch { return; }

    for (const ent of entries){
      const abs = path.join(absDir, ent.name);
      if (ent.isDirectory()){
        await scanHtml(abs, `${baseHref}/${ent.name}`, changefreq, priority);
      } else if (ent.isFile() && ent.name.endsWith(".html")){
        const st = await statSafe(abs);
        let loc = `${baseHref}/${ent.name}`.replace(/\/index\.html$/i, "/");
        out.push({ loc, changefreq, priority, lastmod: st?.mtime || new Date() });
      }
    }
  }

  for (const t of targets){
    const abs = path.join(publicDir, t.dir);
    if (await isDir(abs)) await scanHtml(abs, `/${t.dir}`, t.changefreq, t.priority);
  }

  // også rod: /public/*.html (hvis du har statiske undersider der)
  let rootEntries = [];
  try {
    rootEntries = await fs.readdir(publicDir, { withFileTypes: true });
  } catch {}

  for (const ent of rootEntries){
    if (ent.isFile() && ent.name.endsWith(".html")){
      const abs = path.join(publicDir, ent.name);
      const st = await statSafe(abs);
      const loc = `/${ent.name}`.replace(/\/?index\.html$/i, "/");
      out.push({ loc, changefreq: "weekly", priority: 0.7, lastmod: st?.mtime || new Date() });
    }
  }

  out.sort((a,b)=> a.loc.localeCompare(b.loc));
  return out;
}
