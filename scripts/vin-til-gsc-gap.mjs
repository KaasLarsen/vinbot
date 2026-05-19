#!/usr/bin/env node
/**
 * Finder "vin til …"-forespørgsler fra en Search Console Performance CSV der ikke matcher en eksisterende guide-slug.
 *
 * Sådan får du CSV:
 * GSC → Effektivitet → Søgeresultater → Eksporter (eller Ekspérér) → download forespørgsler.
 *
 * Brug:
 *   node scripts/vin-til-gsc-gap.mjs ~/Downloads/Queries.csv
 *   node scripts/vin-til-gsc-gap.mjs ~/Downloads/Queries.csv --min-impressions=10
 *
 * Kolonne med søgeord findes automatisk (Query / Forespørgsel / Top queries osv.).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function asciiSlugPart(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuote = !inQuote;
      continue;
    }
    if (!inQuote && c === ",") {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += c;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function detectQueryColumnIndex(headerCells) {
  const lowered = headerCells.map((h) => h.toLowerCase().trim());
  const candidates = [
    "top queries",
    "mest anvendte forespørgsler",
    "query",
    "forespørgsel",
    "forespoergsel",
    "populære forespørgsel",
    "queries",
  ];
  for (let i = 0; i < lowered.length; i++) {
    const h = lowered[i];
    if (!h) continue;
    if (candidates.some((c) => h === c || h.includes(c))) return i;
  }
  return 0;
}

function detectMetricIndices(headerCells) {
  const lowered = headerCells.map((h) => h.toLowerCase().trim());
  const idx = (needle) => lowered.findIndex((h) => h === needle || h.includes(needle));
  return {
    clicks: idx("clicks") >= 0 ? idx("clicks") : idx("klik"),
    impressions:
      idx("impressions") >= 0
        ? idx("impressions")
        : idx("eksponeringer") >= 0
          ? idx("eksponeringer")
          : idx("visninger"),
  };
}

function loadVinTilSlugs(guidesDir) {
  return fs
    .readdirSync(guidesDir)
    .filter((f) => f.startsWith("vin-til-") && f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function slugSuffix(slug) {
  return slug.startsWith("vin-til-") ? slug.slice("vin-til-".length) : slug;
}

function tokensFromHyphen(s) {
  return s.split("-").filter(Boolean);
}

/**
 * @returns {"exact" | "weak" | null, slug?: string}
 */
function matchQueryToSlug(queryTail, slugs) {
  const tailSlug = asciiSlugPart(queryTail);
  if (!tailSlug) return { tier: null };

  const direct = `vin-til-${tailSlug}`;
  if (slugs.has(direct)) return { tier: "exact", slug: direct };

  let bestWeak = null;
  let bestScore = 0;
  const tailTok = tokensFromHyphen(tailSlug);

  for (const slug of slugs) {
    const suf = slugSuffix(slug);
    const sufHyphen = suf;
    if (tailSlug === sufHyphen || sufHyphen.startsWith(`${tailSlug}-`) || tailSlug.startsWith(`${sufHyphen}-`)) {
      return { tier: "exact", slug };
    }

    const sufTok = tokensFromHyphen(sufHyphen);
    if (!sufTok.length || !tailTok.length) continue;

    let overlap = 0;
    for (const t of tailTok) {
      if (sufTok.some((s) => s === t || s.includes(t) || t.includes(s))) overlap++;
    }
    const score = overlap / Math.max(tailTok.length, sufTok.length);
    if (score > bestScore) {
      bestScore = score;
      bestWeak = slug;
    }
  }

  if (bestScore >= 0.45 && bestWeak) return { tier: "weak", slug: bestWeak };
  return { tier: null };
}

function main() {
  const argv = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const flags = Object.fromEntries(
    process.argv
      .filter((a) => a.startsWith("--"))
      .map((a) => {
        const [k, v] = a.slice(2).split("=");
        return [k, v === undefined ? true : v];
      }),
  );

  const minImp = Number(flags["min-impressions"] ?? flags.m ?? 1) || 1;

  const csvPath = argv[0];
  if (!csvPath || !fs.existsSync(csvPath)) {
    console.error(
      "Brug: node scripts/vin-til-gsc-gap.mjs <sti-til-gsc-queries.csv> [--min-impressions=10]\n",
    );
    process.exit(1);
  }

  const guidesDir = path.join(__dirname, "../content/guides");
  const slugList = loadVinTilSlugs(guidesDir);
  const slugSet = new Set(slugList);

  const raw = fs.readFileSync(csvPath, "utf8");
  /** Strip BOM */
  const text = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  if (!lines.length) {
    console.error("Tom CSV.");
    process.exit(1);
  }

  const header = parseCsvLine(lines[0]);
  const qIdx = detectQueryColumnIndex(header);
  const { clicks: clIdx, impressions: imIdx } = detectMetricIndices(header);

  const vinTilRe = /\bvin\s+til\b/i;

  const rows = [];
  for (let li = 1; li < lines.length; li++) {
    const cells = parseCsvLine(lines[li]);
    const q = (cells[qIdx] || "").trim();
    if (!q || !vinTilRe.test(q)) continue;

    const clicks = clIdx >= 0 ? Number((cells[clIdx] || "").replace(/\s/g, "").replace(",", ".")) || 0 : 0;
    const impressions =
      imIdx >= 0 ? Number((cells[imIdx] || "").replace(/\s/g, "").replace(",", ".")) || 0 : 0;

    if (impressions < minImp) continue;

    const m = q.match(/\bvin\s+til\s+(.+)$/i);
    const tail = m ? m[1].trim() : "";

    /** Meget generiske — typisk dækket af hub eller hovedguide */
    if (!tail || /^(mad|vin\b)/i.test(tail)) continue;

    const hit = matchQueryToSlug(tail, slugSet);
    rows.push({ query: q, tail, clicks, impressions, tier: hit.tier, slug: hit.slug });
  }

  rows.sort((a, b) => b.impressions - a.impressions);

  const gaps = rows.filter((r) => r.tier === null);
  const weak = rows.filter((r) => r.tier === "weak");

  console.log(`Guides fundet: ${slugSet.size} (vin-til-*.mdx)`);
  console.log(`Rækker med "vin til …" (min. ${minImp} visninger): ${rows.length}`);
  console.log(`Mulige huller (ingen match): ${gaps.length}`);
  console.log(`Svage match (tjek manuelt): ${weak.length}\n`);

  console.log("--- Huller (prioritet ≈ visninger) ---");
  for (const r of gaps.slice(0, 80)) {
    console.log(
      `${r.impressions}\tvisn.\t${r.clicks}\tklik\t${r.query}\t→ foreslået slug: vin-til-${asciiSlugPart(r.tail)}`,
    );
  }
  if (gaps.length > 80) console.log(`… +${gaps.length - 80} flere`);

  console.log("\n--- Svage match (kan være OK — dubletter eller formulering) ---");
  for (const r of weak.slice(0, 40)) {
    console.log(`${r.impressions}\tvisn.\t${r.query}\t→ ${r.slug}`);
  }
  if (weak.length > 40) console.log(`… +${weak.length - 40} flere`);
}

main();
