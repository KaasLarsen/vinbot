// /api/sitemap.js
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host  = req.headers.host;
    const base  = `${proto}://${host}`.replace(/\/+$/,"");
    const today = new Date();

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

    // ---- 1) optional ekstra-ruter fra /assets/sitemap.json ----
    let extraRoutes = [];
    try {
      const r = await fetch(`${base}/assets/sitemap.json`, { cache: "no-store" });
      if (r.ok) {
        const j = await r.json();
        if (Array.isArray(j.routes)) extraRoutes = j.routes;
      }
    } catch (_) {}

    // ---- 2) auto-scan af filer i /public/... ----
    const autoRoutes = await collectFileRoutes();

    // ---- 3) saml & dedup ----
    const seen = new Set();
    const all = [...coreRoutes, ...extraRoutes, ...autoRoutes]
      .filter(Boolean)
      .map(coerceRoute)
      .filter(r => r.loc && !seen.has(r.loc) && (seen.add(r.loc) || true));

    const xml = buildSitemapXML(all, base);

    res.setHeader("content-type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=600");
    res.status(200).send(xml);
  } catch (err) {
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.status(200).send("Sitemap generation error");
  }
}

/* ---------------- helpers ---------------- */

function esc(s = "") {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isoDate(d) {
  try { return new Date(d).toISOString().slice(0,10); } catch { return new Date().toISOString().slice(0,10); }
}

function coerceRoute(x) {
  const now = new Date().toISOString().slice(0,10);
  return {
    loc:        x.loc,
    changefreq: x.changefreq || "weekly",
    priority:   x.priority != null ? x.priority : 0.5,
    lastmod:    x.lastmod ? isoDate(x.lastmod) : now
  };
}

function buildSitemapXML(entries, base) {
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

/* ---------- AUTO SCAN ---------- */
/**
 * Scanner typiske mapper i /public for .html filer:
 * - /public/pages/*.html
 * - /public/vin-til/**/index.html og *.html
 * - /public/druer/**/index.html og *.html
 * - /public/pris/**/index.html og *.html
 * - /public/anbefalinger/**/index.html og *.html
 * - /public/blog/**/index.html og *.html
 */
async function collectFileRoutes() {
  const fs = await import("fs/promises");
  const path = await import("path");

  async function statSafe(p) { try { return await fs.stat(p); } catch { return null; } }
  async function existsDir(p) { const s = await statSafe(p); return !!(s && s.isDirectory()); }

  const publicDir = path.resolve("./public");

  const scanTargets = [
    { dir: "pages",            base: "/pages",            changefreq: "yearly", priority: 0.4 },
    { dir: "vin-til",          base: "/vin-til",          changefreq: "weekly", priority: 0.8 },
    { dir: "druer",            base: "/druer",            changefreq: "weekly", priority: 0.8 },
    { dir: "pris",             base: "/pris",             changefreq: "weekly", priority: 0.7 },
    { dir: "anbefalinger",     base: "/anbefalinger",     changefreq: "weekly", priority: 0.6 },
    { dir: "blog",             base: "/blog",             changefreq: "weekly", priority: 0.5 }
  ];

  const out = [];

  // helper: rekursiv fil-scan for .html
  async function scanHtml(dirAbs, baseHref, changefreq, priority) {
    let entries = [];
    try {
      entries = await fs.readdir(dirAbs, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      const abs = path.join(dirAbs, ent.name);
      if (ent.isDirectory()) {
        await scanHtml(abs, `${baseHref}/${ent.name}`, changefreq, priority);
      } else if (ent.isFile() && ent.name.endsWith(".html")) {
        const st = await statSafe(abs);
        const lastmod = st?.mtime || new Date();
        let loc = `${baseHref}/${ent.name}`;

        // normaliser index.html → /
        loc = loc.replace(/\/index\.html$/i, "/");

        out.push({ loc, changefreq, priority, lastmod });
      }
    }
  }

  // scan /public root for sektioners index.html (hvis de er mappestruktur)
  for (const t of scanTargets) {
    const dirAbs = path.join(publicDir, t.dir);
    if (await existsDir(dirAbs)) {
      await scanHtml(dirAbs, `/${t.dir}`, t.changefreq, t.priority);
    }
  }

  // også scan /public/pages (enkeltfiler)
  const pagesAbs = path.join(publicDir, "pages");
  if (await existsDir(pagesAbs)) {
    await scanHtml(pagesAbs, "/pages", "yearly", 0.4);
  }

  // sort efter loc for konsistens
  out.sort((a,b)=> a.loc.localeCompare(b.loc));
  return out;
}
