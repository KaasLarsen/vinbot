#!/usr/bin/env node
/**
 * Tilføj PriceRunner til drinks uden widget under "## Vin i drinken"
 * og flyt sektionen lige efter intro.
 *
 * Dry-run: node scripts/add-pricerunner-drinks.mjs
 * Write:   node scripts/add-pricerunner-drinks.mjs --write [--limit=100]
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("content/drinks");
const WRITE = process.argv.includes("--write");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Number(limitArg.split("=")[1]) : 200;
const SECTION = "Vin i drinken";

/** @type {{ key: string, title: string, re: RegExp }[]} */
const WINE_RULES = [
  { key: "grahams-10-tawny", title: "Portvin — Graham's 10 Year Tawny", re: /portvin|\btawny\b|\bport\b|ruby port|white port|px\b|pedro ximenez/ },
  { key: "faustino-1-gran-reserva", title: "Rioja — Faustino I Gran Reserva", re: /rioja|tempranillo|tinto de verano|kalimotxo|\brødvin\b|\brodvin\b|red wine|gluehwein|gløgg|new york sour|devil|sangria(?!\s*blanca)/ },
  { key: "trapiche-oak-cask-malbec", title: "Malbec — Trapiche Oak Cask", re: /malbec|cabernet|bordeaux|\bmerlot\b/ },
  { key: "fontodi-chianti-classico", title: "Chianti Classico — Fontodi", re: /chianti|barolo|chinato/ },
  { key: "duc-de-foix-cava-brut", title: "Cava — Duc de Foix Brut", re: /\bcava\b|\bchampagne\b|french 75|air mail|kir royal|mousserende|sparkling/ },
  { key: "scavi-ray-prosecco-doc", title: "Prosecco — Scavi & Ray DOC", re: /\bprosecco\b|sbagliato|\bhugo\b|limoncello|\baperol\b/ },
  { key: "ribeauville-cremant-alsace", title: "Crémant — Ribeauvillé Alsace", re: /cr[eé]mant|\bros[eé]\b|fros[eé]|rebujito|bicicletta/ },
  { key: "louis-jadot-pinot-noir", title: "Pinot Noir — Louis Jadot", re: /pinot noir|\bbourgogne\b|beaujolais|\bgamay\b/ },
  { key: "guigal-cotes-du-rhone-rouge", title: "Côtes du Rhône — Guigal", re: /rh[oô]ne|\bgrenache\b|\bsyrah\b|\bgarnacha\b/ },
  { key: "chablis-la-pierrelee", title: "Chablis — La Pierrelée", re: /chablis|hvidvin|white wine|muscadet|sauvignon|albari|aligot|spritzer|mojito|sangria blanca|elderflower|vermouth|sherry|fino|amontillado|manzanilla|sake|lillet|dubonnet|bamboo|adonis|verdejo|riesling|grüner/ },
];

const SLUG_HINTS = [
  { key: "grahams-10-tawny", title: "Portvin — Graham's 10 Year Tawny", re: /port|tawny|px-/ },
  { key: "duc-de-foix-cava-brut", title: "Cava — Duc de Foix Brut", re: /champagne|french-7|air-mail|kir-royal|sparkling|cava|nytaars|bowle/ },
  { key: "scavi-ray-prosecco-doc", title: "Prosecco — Scavi & Ray DOC", re: /spritz|prosecco|sbagliato|hugo|limoncello|mimosa|bellini|rossini/ },
  { key: "ribeauville-cremant-alsace", title: "Crémant — Ribeauvillé Alsace", re: /rose|frose|rebujito|bicicletta|pink|watermelon/ },
  { key: "faustino-1-gran-reserva", title: "Rioja — Faustino I Gran Reserva", re: /sangria|kalimotxo|tinto|red-wine|gluehwein|paloma|new-york-sour|devil/ },
  { key: "chablis-la-pierrelee", title: "Chablis — La Pierrelée", re: /white-wine|hvidvin|sherry|fino|bamboo|adonis|vermouth|sake|spritzer|mojito|lillet|dubonnet|elderflower|sangria-blanca/ },
];

function walkFiles(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkFiles(p, acc);
    else if (/\.(mdx|tsx|ts|md)$/.test(name)) acc.push(p);
  }
  return acc;
}

function splitFrontmatter(raw) {
  if (!raw.startsWith("---\n")) return null;
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) return null;
  return { fm: raw.slice(0, end + 5), body: raw.slice(end + 5), fmInner: raw.slice(4, end) };
}

function fmBlock(fmInner, key) {
  const lines = fmInner.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`${key}:`));
  if (start === -1) return "";
  const out = [lines[start]];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^[a-zA-Z]/.test(lines[i])) break;
    out.push(lines[i]);
  }
  return out.join("\n");
}

function matchRules(hay, rules) {
  for (const r of rules) {
    if (r.re.test(hay)) return { key: r.key, title: r.title };
  }
  return null;
}

/** Kun stil/søgeord — ikke guideSlug (fx …-spritz-og-drikke giver falske hits). */
function wineHay(block) {
  return block
    .split("\n")
    .filter((l) => /^\s+(style|searchQuery|label|amount):/i.test(l))
    .join("\n")
    .toLowerCase();
}

function pickProduct(slug, fmInner, body) {
  const drink = wineHay(fmBlock(fmInner, "wineToDrink"));
  const inRecipe = wineHay(fmBlock(fmInner, "wineInRecipe"));
  const vinSec = (body.match(new RegExp(`## ${SECTION}[\\s\\S]*?(?=^## |$)`, "m"))?.[0] || "").toLowerCase();
  const slugHay = slug.toLowerCase();

  return (
    matchRules(drink, WINE_RULES) ||
    matchRules(inRecipe, WINE_RULES) ||
    matchRules(slugHay, SLUG_HINTS) ||
    matchRules(vinSec, WINE_RULES) ||
    (/spritz|prosecco|bobler|cava|mousserende/.test(slugHay)
      ? { key: "scavi-ray-prosecco-doc", title: "Prosecco — Scavi & Ray DOC" }
      : /hvidvin|white|sherry|fino|spritzer|mojito/.test(`${slugHay} ${drink}`)
        ? { key: "chablis-la-pierrelee", title: "Chablis — La Pierrelée" }
        : { key: "faustino-1-gran-reserva", title: "Rioja — Faustino I Gran Reserva" })
  );
}

function extractSection(body, heading) {
  const re = new RegExp(`^## ${heading}\\s*\\n[\\s\\S]*?(?=^## |$)`, "m");
  const m = body.match(re);
  if (!m) return null;
  return { block: m[0], index: m.index, length: m[0].length };
}

function headingFor(productTitle, label) {
  const short = label?.replace(/^["']|["']$/g, "").trim();
  if (short && short.length < 55) return `${productTitle} — ${short}`;
  return productTitle;
}

function insertAfterIntro(bodyWithoutBlock, block) {
  const trimmedBlock = block.replace(/\s+$/, "") + "\n\n";
  const firstHeading = bodyWithoutBlock.search(/^## /m);
  if (firstHeading === -1) {
    return bodyWithoutBlock.replace(/\s+$/, "") + "\n\n" + trimmedBlock;
  }
  const intro = bodyWithoutBlock.slice(0, firstHeading).replace(/\s+$/, "");
  const rest = bodyWithoutBlock.slice(firstHeading);
  return `${intro}\n\n${trimmedBlock}${rest}`;
}

function rankWithoutPr() {
  const all = fs.readdirSync(ROOT).filter((f) => f.endsWith(".mdx"));
  const without = [];
  for (const f of all) {
    const slug = f.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(ROOT, f), "utf8");
    if (!raw.includes("<PriceRunnerProduct")) without.push(slug);
  }
  const corpus = [...walkFiles("content"), ...walkFiles("app"), ...walkFiles("components")];
  const counts = Object.fromEntries(without.map((s) => [s, 0]));
  for (const f of corpus) {
    let t;
    try {
      t = fs.readFileSync(f, "utf8");
    } catch {
      continue;
    }
    for (const s of without) {
      if (t.includes(`/drinks/${s}`) || t.includes(`/opskrifter/${s}`)) counts[s] += 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, LIMIT)
    .map(([slug, links]) => ({ slug, links }));
}

const ranked = rankWithoutPr();
let written = 0;

for (const { slug, links } of ranked) {
  const filePath = path.join(ROOT, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  if (raw.includes("<PriceRunnerProduct")) continue;

  const parts = splitFrontmatter(raw);
  if (!parts) {
    console.log(`skip-no-fm: ${slug}`);
    continue;
  }

  const labelMatch = parts.fmInner.match(/label:\s*["']?([^"'\n]+)/);
  const product = pickProduct(slug, parts.fmInner, parts.body);
  const heading = headingFor(product.title, labelMatch?.[1]);
  const safeHeading = heading.replace(/"/g, "").replace(/\s+/g, " ").trim();
  const widgetLine = `<PriceRunnerProduct productKey="${product.key}" heading="${safeHeading}" />`;

  let body = parts.body;
  const existing = extractSection(body, SECTION);

  let vinBlock;
  if (existing) {
    const core = existing.block.replace(/\s+$/, "");
    if (core.includes("<PriceRunnerProduct")) {
      console.log(`skip-has-pr: ${slug}`);
      continue;
    }
    vinBlock = `${core}\n\n${widgetLine}\n\n`;
    body = body.slice(0, existing.index) + body.slice(existing.index + existing.length);
  } else {
    const guideMatch = parts.fmInner.match(/guideSlug:\s*([a-z0-9-]+)/);
    const guideBit = guideMatch ? ` Se [relateret guide](/guides/${guideMatch[1]}).` : "";
    vinBlock = `## ${SECTION}\n\nAnbefalet vin til drinken.${guideBit}\n\n${widgetLine}\n\n`;
  }

  const newBody = insertAfterIntro(body, vinBlock);
  const next = parts.fm + newBody;
  const out = next.endsWith("\n") ? next : `${next}\n`;

  if (WRITE) fs.writeFileSync(filePath, out, "utf8");
  written += 1;
  console.log(`${WRITE ? "added" : "would-add"}: ${slug} (links=${links}) → ${product.key}`);
}

console.log(`\nlimit=${LIMIT} written=${written} write=${WRITE}`);
