// scripts/gen-sitemap-manifest.js
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

const TARGETS = [
  { dir: "pages",        base: "/pages",        changefreq: "yearly", priority: 0.4 },
  { dir: "vin-til",      base: "/vin-til",      changefreq: "weekly", priority: 0.8 },
  { dir: "druer",        base: "/druer",        changefreq: "weekly", priority: 0.8 },
  { dir: "pris",         base: "/pris",         changefreq: "weekly", priority: 0.7 },
  { dir: "anbefalinger", base: "/anbefalinger", changefreq: "weekly", priority: 0.6 },
  { dir: "blog",         base: "/blog",         changefreq: "weekly", priority: 0.5 }
];

const out = [];

function scanDir(absDir, baseHref, changefreq, priority) {
  if (!fs.existsSync(absDir)) return;
  for (const name of fs.readdirSync(absDir, { withFileTypes: true })) {
    const abs = path.join(absDir, name.name);
    if (name.isDirectory()) {
      scanDir(abs, `${baseHref}/${name.name}`, changefreq, priority);
    } else if (name.isFile() && name.name.endsWith(".html")) {
      let loc = `${baseHref}/${name.name}`.replace(/\/index\.html$/i, "/");
      out.push({ loc, changefreq, priority });
    }
  }
}

for (const t of TARGETS) {
  scanDir(path.join(PUBLIC_DIR, t.dir), `/${t.dir}`, t.changefreq, t.priority);
}

// også roden: /public/*.html
for (const name of (fs.existsSync(PUBLIC_DIR) ? fs.readdirSync(PUBLIC_DIR, { withFileTypes: true }) : [])) {
  if (name.isFile() && name.name.endsWith(".html")) {
    const loc = `/${name.name}`.replace(/\/?index\.html$/i, "/");
    out.push({ loc, changefreq: "weekly", priority: 0.7 });
  }
}

// dedup + sort
const seen = new Set();
const routes = out.filter(r => !seen.has(r.loc) && (seen.add(r.loc) || true))
                  .sort((a,b) => a.loc.localeCompare(b.loc));

const targetFile = path.resolve(PUBLIC_DIR, "assets", "sitemap.json");
fs.mkdirSync(path.dirname(targetFile), { recursive: true });
fs.writeFileSync(targetFile, JSON.stringify({ routes }, null, 2), "utf8");

console.log(`Wrote ${routes.length} routes to /public/assets/sitemap.json`);
