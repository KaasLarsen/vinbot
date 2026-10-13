#!/usr/bin/env node
/**
 * Tilføj PriceRunner til top-N opskrifter (inbound-link proxy) uden widget.
 * Matcher primært wineToDrink / wineInRecipe, indsætter under "## Vin i glasset"
 * og flytter sektionen lige efter intro.
 *
 * Dry-run: node scripts/add-pricerunner-top-recipes.mjs
 * Write:   node scripts/add-pricerunner-top-recipes.mjs --write [--limit=50]
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("content/recipes");
const WRITE = process.argv.includes("--write");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Number(limitArg.split("=")[1]) : 50;

/** @type {{ key: string, title: string, re: RegExp }[]} */
const WINE_RULES = [
  { key: "grahams-10-tawny", title: "Portvin — Graham's 10 Year Tawny", re: /portvin|\btawny\b|\bport\b|dessertvin|risalamande/ },
  { key: "duc-de-foix-cava-brut", title: "Cava — Duc de Foix Brut", re: /\bcava\b|champagne|østers|oesters/ },
  { key: "scavi-ray-prosecco-doc", title: "Prosecco — Scavi & Ray DOC", re: /prosecco/ },
  { key: "ribeauville-cremant-alsace", title: "Crémant — Ribeauvillé Alsace", re: /cr[eé]mant|mousserende|ros[eé]vin|ros[eé]\b/ },
  { key: "fontodi-chianti-classico", title: "Chianti Classico — Fontodi", re: /chianti|sangiovese|toskana|bolognese|ossobuco/ },
  { key: "san-marzano-primitivo", title: "Primitivo — San Marzano", re: /primitivo|zinfandel|ripasso|amarone/ },
  { key: "faustino-1-gran-reserva", title: "Rioja — Faustino I Gran Reserva", re: /rioja|tempranillo/ },
  { key: "louis-jadot-pinot-noir", title: "Pinot Noir — Louis Jadot", re: /pinot noir|bourgogne|bourguignon|gamay|beaujolais|coq.?au.?vin/ },
  { key: "guigal-cotes-du-rhone-rouge", title: "Côtes du Rhône — Guigal", re: /c[oô]tes du rh[oô]ne|rh[oô]ne|grenache|syrah.*rh/ },
  { key: "chateau-maucoil-cdr-villages", title: "Côtes du Rhône Villages — Château Maucoil", re: /cdr villages|rhône villages/ },
  { key: "trapiche-oak-cask-malbec", title: "Malbec — Trapiche Oak Cask", re: /malbec|cabernet|bordeaux|merlot|entrecote|entrecôte|côte de bœuf|cote de boeuf|peberboef/ },
  { key: "chateau-tanunda-grand-shiraz", title: "Shiraz — Château Tanunda", re: /shiraz|\bsyrah\b/ },
  { key: "chablis-la-pierrelee", title: "Chablis — La Pierrelée", re: /chablis|muscadet|albari|albarino|sauvignon|pinot grigio|verdejo|hvidvin|skaldyr|muslinger|rejer|fisk/ },
];

const DISH_HINTS = [
  { key: "grahams-10-tawny", title: "Portvin — Graham's 10 Year Tawny", re: /risalamande|paerer-i-rodvin|pærer|port-og|charcuteri|roedvinsgele|syltede-roedloeg|rose-syltede/ },
  { key: "faustino-1-gran-reserva", title: "Rioja — Faustino I Gran Reserva", re: /chorizo|tapas|estofado|paella/ },
  { key: "fontodi-chianti-classico", title: "Chianti Classico — Fontodi", re: /bolognese|ossobuco|tiramisu|caprese|risotto/ },
  { key: "louis-jadot-pinot-noir", title: "Pinot Noir — Louis Jadot", re: /andesteg|juleand|coq-au-vin|boeuf-bourguignon|flaesketesteg|poulet|sticky-pork|svinekaeb|citronkylling|stuvet-kylling|grillet-laks|dampet-laks|roedkaal/ },
  { key: "trapiche-oak-cask-malbec", title: "Malbec — Trapiche Oak Cask", re: /cote-de-boeuf|entrecote|peberboef|roedvinssauce-til-boef|chili-con-carne|pulled-pork/ },
  { key: "chablis-la-pierrelee", title: "Chablis — La Pierrelée", re: /muslinger|rejer|torsk|fisk-i-hvidvin|zabaglione|ceviche|vongole|gravad|wok-kylling|asparges|halloumi|ratatouille|oliven|frikadeller|kartoffel|falafel|caprese|paella/ },
  { key: "ribeauville-cremant-alsace", title: "Crémant — Ribeauvillé Alsace", re: /halloumi|brune-kartoffler|oesters|østers/ },
  { key: "san-marzano-primitivo", title: "Primitivo — San Marzano", re: /flaesketesteg|andesteg|juleand|pulled-pork|chorizo/ },
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

function pickProduct(slug, fmInner, body) {
  const drink = fmBlock(fmInner, "wineToDrink").toLowerCase();
  const inRecipe = fmBlock(fmInner, "wineInRecipe").toLowerCase();
  const vinGlas = (body.match(/## Vin i glasset[\s\S]*?(?=^## |$)/m)?.[0] || "").toLowerCase();
  const slugHay = slug.toLowerCase();

  return (
    matchRules(drink, WINE_RULES) ||
    matchRules(inRecipe, WINE_RULES) ||
    matchRules(vinGlas, WINE_RULES) ||
    matchRules(slugHay, DISH_HINTS) ||
    matchRules(`${slugHay}\n${drink}\n${inRecipe}`, DISH_HINTS) ||
    (/hvidvin|fisk|skaldyr|muslinger|rejer/.test(`${slugHay} ${drink} ${inRecipe}`)
      ? { key: "chablis-la-pierrelee", title: "Chablis — La Pierrelée" }
      : { key: "guigal-cotes-du-rhone-rouge", title: "Côtes du Rhône — Guigal" })
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
      if (t.includes(`/opskrifter/${s}`)) counts[s] += 1;
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
  const existing = extractSection(body, "Vin i glasset");

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
    vinBlock = `## Vin i glasset\n\nAnbefalet vin til retten.${guideBit}\n\n${widgetLine}\n\n`;
  }

  const newBody = insertAfterIntro(body, vinBlock);
  const next = parts.fm + newBody;
  const out = next.endsWith("\n") ? next : `${next}\n`;

  if (WRITE) fs.writeFileSync(filePath, out, "utf8");
  written += 1;
  console.log(`${WRITE ? "added" : "would-add"}: ${slug} (links=${links}) → ${product.key}`);
}

console.log(`\nlimit=${LIMIT} written=${written} write=${WRITE}`);
