#!/usr/bin/env node
/**
 * Structural content-tone rewrite for guide MDX.
 * Keeps frontmatter + PriceRunnerProduct, shortens body to scannable sections.
 *
 * Usage:
 *   node scripts/rewrite-guides-content-tone.mjs [--dry-run] [--glob=vin-til-*.mdx]
 *   node scripts/rewrite-guides-content-tone.mjs --glob=bedste-*.mdx
 *   node scripts/rewrite-guides-content-tone.mjs --only=vin-til-burger,vin-til-tapas
 */
import fs from "node:fs";
import path from "node:path";

const dryRun = process.argv.includes("--dry-run");
const globArg =
  process.argv.find((a) => a.startsWith("--glob="))?.slice(7) ?? "vin-til-*.mdx";
const onlyArg = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
const onlySet = onlyArg
  ? new Set(onlyArg.split(",").map((s) => s.trim().replace(/\.mdx$/, "")))
  : null;

const SKIP = new Set([
  // Already hand-rewritten pilots + gold standard
  "vin-til-vildt",
  "vin-til-boeff",
  "vin-til-kylling-og-lyst-koed",
  "vin-til-fisk-og-skaldyr",
  "vin-til-lam",
  "vin-til-and",
  "vin-til-flaesketesteg",
  "vin-til-gammel-knas",
  "bedste-rodvin",
]);

const dir = path.join(process.cwd(), "content", "guides");
const TODAY = "2026-09-29";

function matchGlob(name, pattern) {
  const [pre, ...rest] = pattern.split("*");
  const suf = rest.join("*");
  return name.startsWith(pre) && name.endsWith(suf);
}

function stripBoldSpam(s) {
  // Keep bold only on first 2 **...** spans per paragraph
  let n = 0;
  return s.replace(/\*\*([^*]+)\*\*/g, (m, inner) => {
    n++;
    return n <= 2 ? `**${inner}**` : inner;
  });
}

function extractPriceRunner(body) {
  const m = body.match(/<PriceRunnerProduct\b[^>]*\/>/);
  return m ? m[0] : null;
}

function extractTables(body) {
  const tables = [];
  const lines = body.split("\n");
  let buf = [];
  let inTable = false;
  for (const line of lines) {
    if (/^\|/.test(line)) {
      inTable = true;
      buf.push(line);
    } else if (inTable) {
      if (buf.length >= 3) tables.push(buf.join("\n"));
      buf = [];
      inTable = false;
    }
  }
  if (inTable && buf.length >= 3) tables.push(buf.join("\n"));
  return tables;
}

function splitSections(body) {
  const lines = body.split("\n");
  const sections = [];
  let current = { heading: null, lines: [] };
  for (const line of lines) {
    if (/^## /.test(line)) {
      if (current.heading || current.lines.some((l) => l.trim())) {
        sections.push(current);
      }
      current = { heading: line.replace(/^##\s+/, "").trim(), lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.heading || current.lines.some((l) => l.trim())) {
    sections.push(current);
  }
  return sections;
}

function sectionText(sec) {
  return sec.lines.join("\n").trim();
}

function firstParagraph(text) {
  const parts = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  for (const p of parts) {
    if (p.startsWith("|") || p.startsWith("<") || p.startsWith("#")) continue;
    if (p.startsWith("- ")) continue;
    // Prefer clean prose; skip mashed numbered lists / producer walls
    if (/^\d+\.\s+\*\*/.test(p) && p.length > 400) continue;
    if ((p.match(/Top-producenter|Domaine |Grand Cru/gi) || []).length >= 3) {
      // take first sentence only
      const sentence = p.split(/(?<=\.)\s+/)[0];
      return stripBoldSpam(sentence.slice(0, 280));
    }
    let cleaned = stripBoldSpam(p.replace(/\n/g, " "));
    if (cleaned.length > 420) {
      cleaned = cleaned.slice(0, 400).replace(/\s+\S*$/, "") + ".";
    }
    return cleaned;
  }
  return "";
}

function takeBullets(text, max = 3) {
  const bullets = [];
  for (const line of text.split("\n")) {
    if (/^\s*-\s+/.test(line)) {
      let b = line.replace(/^\s*-\s+/, "").trim();
      // Skip nested producer dump lines
      if (/^(Top-producenter|Producenter|Grand Crus|Karakter):/i.test(b)) continue;
      if (/Domaine |chateau |Château /i.test(b) && b.split(",").length > 3) {
        b = b.split(/[—–-]/)[0].trim();
      }
      if (b.length > 160) b = b.slice(0, 140).replace(/\s+\S*$/, "") + "…";
      bullets.push(stripBoldSpam(b));
      if (bullets.length >= max) break;
    }
  }
  return bullets;
}

function extractGuideLinks(body) {
  const links = [];
  const re = /\[([^\]]+)\]\(\/guides\/([a-z0-9-]+)\)/gi;
  let m;
  const seen = new Set();
  while ((m = re.exec(body))) {
    const slug = m[2];
    if (seen.has(slug)) continue;
    seen.add(slug);
    links.push({ label: m[1], slug });
    if (links.length >= 8) break;
  }
  return links;
}

function searchQueryFromSlug(slug) {
  return slug
    .replace(/^vin-til-/, "")
    .replace(/^bedste-/, "bedste ")
    .replace(/-/g, " ");
}

function buildBody({ slug, title, body, isBedste }) {
  const pr = extractPriceRunner(body);
  const tables = extractTables(body);
  const sections = splitSections(body);
  const links = extractGuideLinks(body);

  // Find short-answer-ish first section
  const contentSecs = sections.filter(
    (s) =>
      s.heading &&
      !/^(søg|læs mere|videre|relateret)/i.test(s.heading)
  );

  const introSec = contentSecs[0];
  const introPara = introSec ? firstParagraph(sectionText(introSec)) : "";
  const table = tables[0] || null;

  const midSecs = contentSecs.slice(1, 5);
  const midBlocks = [];
  for (const sec of midSecs) {
    const text = sectionText(sec);
    const bullets = takeBullets(text, 3);
    const para = firstParagraph(text);
    let block = `## ${sec.heading.replace(/\s*—\s*.*$/, "").slice(0, 80)}\n\n`;
    if (para) block += `${para}\n\n`;
    if (bullets.length) {
      block += bullets.map((b) => `- ${b}`).join("\n") + "\n\n";
    } else if (!para) {
      // fallback: first 2 non-empty lines
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("|") && !l.startsWith("<") && !l.startsWith("#"))
        .slice(0, 2);
      if (lines.length) block += stripBoldSpam(lines.join(" ")) + "\n\n";
    }
    // Add default/alt cue if we have bullets
    if (bullets.length >= 2 && !/default|undgå|alternativ/i.test(block)) {
      // leave bullets as-is
    }
    midBlocks.push(block.trim());
  }

  const q = encodeURIComponent(searchQueryFromSlug(slug));
  const searchLabel = isBedste
    ? `Søg: ${searchQueryFromSlug(slug)}`
    : `Søg vin til ${searchQueryFromSlug(slug)}`;

  let related = links.filter((l) => l.slug !== slug).slice(0, 6);
  if (related.length < 3) {
    related.push({
      label: "Komplet guide til vin og mad",
      slug: "komplet-guide-til-vin-og-mad",
    });
  }

  const parts = [];
  parts.push(`## Kort svar\n`);
  if (introPara) parts.push(`${introPara}\n`);
  if (table) parts.push(`${table}\n`);
  if (pr) parts.push(`${pr}\n`);

  for (const b of midBlocks) parts.push(`${b}\n`);

  parts.push(`## Søg\n`);
  parts.push(`**[${searchLabel}](/?q=${q})**.\n`);
  parts.push(`## Læs mere i klyngen\n`);
  for (const r of related) {
    parts.push(`- [${r.label}](/guides/${r.slug})`);
  }
  parts.push("");

  let out = parts.join("\n").replace(/\n{3,}/g, "\n\n");
  // Word budget soft trim: if still huge, drop middle sections from the end of midBlocks area — already limited to 4
  return out;
}

function updateFrontmatter(fm) {
  if (/^updated:/m.test(fm)) {
    return fm.replace(/^updated:\s*.*$/m, `updated: "${TODAY}"`);
  }
  return fm.replace(/\n---\s*$/, `\nupdated: "${TODAY}"\n---`);
}

let changed = 0;
let scanned = 0;
let skipped = 0;

for (const name of fs.readdirSync(dir).sort()) {
  if (!name.endsWith(".mdx")) continue;
  if (!matchGlob(name, globArg)) continue;
  const slug = name.replace(/\.mdx$/, "");
  if (onlySet && !onlySet.has(slug)) continue;
  if (SKIP.has(slug) && !onlySet) {
    skipped++;
    continue;
  }

  const file = path.join(dir, name);
  const raw = fs.readFileSync(file, "utf8");
  scanned++;
  const fmEnd = raw.indexOf("\n---\n", 3);
  if (fmEnd === -1) continue;
  let front = raw.slice(0, fmEnd + 5);
  const body = raw.slice(fmEnd + 5);

  // Skip if already looks tightened — unless body still has the old generic boilerplate
  const words = body.split(/\s+/).length;
  const hasBoiler =
    /\*\*Default \/ alternativ \/ undgå:\*\*/.test(body) ||
    /Top-producenter: Domaine/.test(body);
  if (
    !hasBoiler &&
    words < 650 &&
    /## Læs mere i klyngen/.test(body) &&
    /## (Kort svar|Hvilken vin)/.test(body) &&
    !onlySet
  ) {
    skipped++;
    continue;
  }

  const titleMatch = front.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const title = titleMatch ? titleMatch[1] : slug;
  const isBedste = slug.startsWith("bedste-");
  const nextBody = buildBody({ slug, title, body, isBedste });
  front = updateFrontmatter(front);

  if (front + nextBody === raw) continue;
  changed++;
  if (!dryRun) fs.writeFileSync(file, front + nextBody);
}

console.log(
  `${dryRun ? "[dry-run] " : ""}scanned ${scanned}, changed ${changed}, skipped ${skipped}`
);
