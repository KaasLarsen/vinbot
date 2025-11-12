// scripts/gen-sitemap-manifest.js
// Scanner /public for HTML-filer og genererer /public/assets/sitemap.json

const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

// Sektioner vi vil scanne rekursivt.
// "base" er URL-prefix, "dir" er mappe i /public.
const TARGETS = [
  { dir: "",              base: "/",                changefreq: "weekly", priority: 0.8 }, // roden (index.html)
  { dir: "pages",         base: "/pages",           changefreq: "yearly", priority: 0.4 }, // dine statiske sider + undermapper
  { dir: "vin-til",       base: "/vin-til",         changefreq: "weekly", priority: 0.8 },
  { dir: "druer",         base: "/druer",           changefreq: "weekly", priority: 0.8 },
  { dir: "pris",          base: "/pris",            changefreq: "weekly", priority: 0.7 },
  { dir: "anbefalinger",  base: "/anbefalinger",    changefreq: "weekly", priority: 0.6 },
  { dir: "blog",          base: "/blog",            changefreq: "weekly", priority: 0.5 }
];

const out = [];

function toLastmod(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return new Date(stat.mtime).toISOString().slice(0, 10); // YYYY-MM-DD
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

// Konverterer filsti til URL:
//  - /something/index.html  → /something/
//  - /something/page.html   → /something/page.html
function fileToLoc(baseHref, relFile) {
  let loc = path.posix.join(baseHref, relFile).replace(/\\/g, "/");
  loc = loc.replace(/\/+/g, "/");
  if (/\/index\.html?$/i.test(loc)) {
    loc = loc.replace(/index\.html?$/i, "");
    if (!loc.endsWith("/")) loc += "/";
  }
  return loc;
}

function scanRec(absDir, baseHref, changefreq, priority, subPath = "") {
  if (!fs.existsSync(absDir)) return;
  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  for (const e of entries) {
    const abs = path.join(absDir, e.name);
    const rel = subPath ? path.posix.join(subPath, e.name) : e.name;

    if (e.isDirectory()) {
      scanRec(abs, baseHref, changefreq, priority, rel);
    } else if (e.isFile() && /\.html?$/i.test(e.name)) {
      const loc = fileToLoc(baseHref, rel);
      out.push({
        loc,
        changefreq,
        priority,
        lastmod: toLastmod(abs)
      });
    }
  }
}

(function run() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error("❌ public/ directory not found.");
    process.exit(1);
  }

  for (const t of TARGETS) {
    const dirAbs = path.join(PUBLIC_DIR, t.dir);
    const baseHref = t.base || "/";
    scanRec(dirAbs, baseHref, t.changefreq, t.priority);
  }

  // Dedup + sort + skriv
  const seen = new Set();
  const routes = out
    .filter(r => r.loc && !seen.has(r.loc) && (seen.add(r.loc) || true))
    .sort((a, b) => a.loc.localeCompare(b.loc));

  const targetFile = path.resolve(PUBLIC_DIR, "assets", "sitemap.json");
  fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  fs.writeFileSync(targetFile, JSON.stringify({ routes }, null, 2), "utf8");

  console.log(`✅ Wrote ${routes.length} routes to /public/assets/sitemap.json`);
})();
