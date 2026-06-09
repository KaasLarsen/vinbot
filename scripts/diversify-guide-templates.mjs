#!/usr/bin/env node
/**
 * Fjerner identiske skabelonafsnit fra bulk-udvidelsen (expand-guides-400-600.mjs)
 * og retter åbenlyse copy-paste-fejl i bedste-*-guides.
 *
 * Guiderne beholdes — kun boilerplate og fejlretninger.
 * Kør: node scripts/diversify-guide-templates.mjs
 * Dry-run: node scripts/diversify-guide-templates.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import readingTime from "reading-time";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guidesDir = path.join(__dirname, "../content/guides");
const dryRun = process.argv.includes("--dry-run");
const TODAY = "2026-05-26";

/** Afsnit indsat af expand-guides-400-600.mjs — næsten ordret ens på 100+ sider. */
const BOILERPLATE_HEADINGS = [
  "## Budget, temperatur og fejl",
  "## Sådan tester du matchet hjemme",
  "## Flasken til mad — ikke kun til glasset",
  "## Konkret dansk hverdag ved bordet",
  "## Smag og mad i praksis",
  "## Opskrifter med vin i gryden",
  "## Hvorfor det betyder noget i praksis",
  "## Regionen på tallerkenen",
  "## Næste skridt til middagen",
  "## Praktisk på Vinbot",
];

const BOURGOGNE_BOILERPLATE =
  / Kigger du fx på \*\*Bourgogne chardonnay\*\*, er \*\*Mâconnais\*\* og \*\*Côte Chalonnaise\*\* typisk bedre value end Côte de Beaune i dette niveau\./g;

/** Erstat forkert Bourgogne-sætning med drue-/stil-specifik value-tip. */
const VALUE_TIP_BY_KEY = [
  { match: /riesling/i, tip: " I samme prisklasse giver **Pfalz** og **Nahe** ofte mere ren riesling for pengene end prestige-Rheingau-etiketter." },
  { match: /grenache|garnacha/i, tip: " **Gigondas** og **Vacqueyras** leverer ofte mere karakter end et billigt Châteauneuf-navn på etiketten." },
  { match: /syrah|shiraz/i, tip: " **Crozes-Hermitage** og **Saint-Joseph** er typisk bedre value end Hermitage i denne prisklasse." },
  { match: /sangiovese|chianti/i, tip: " **Rosso di Montalcino** og **Chianti Classico** (ikke Riserva) er ofte det sikreste value-valg for sangiovese." },
  { match: /tempranillo|rioja/i, tip: " **Crianza** fra mindre bodegas i Rioja og Ribera slår ofte store brands på marketing alene." },
  { match: /malbec/i, tip: " **Luján de Cuyo** og **Uco Valley**-basisvin slår ofte «premium» etiketter uden klar oprindelse." },
  { match: /cabernet/i, tip: " **Haut-Médoc** og **Maipo**-basisappellationer giver ofte mere cabernet for pengene end smarte blend-navne." },
  { match: /merlot/i, tip: " **Côtes de Bourg** og **Lalande-de-Pomerol** er ofte bedre merlot-value end dyre højre-bred-etiketter." },
  { match: /pinot-noir/i, tip: " **Oregon** og **Marlborough** pinot kan slå entry-level Bourgogne på pris uden at ofre frugt." },
  { match: /chardonnay/i, tip: " **Mâconnais** og **Côte Chalonnaise** er her det rigtige value-sammenligningspunkt — ikke Côte de Beaune." },
  { match: /sauvignon/i, tip: " **Touraine** og **Pays d'Oc** sauvignon giver ofte mere friskhed for pengene end prestige Sancerre i samme pris." },
  { match: /pinot-grigio|pinot grigio/i, tip: " **Alto Adige** og **Friuli** pinot grigio har ofte mere struktur end generisk norditaliensk bulk." },
  { match: /chenin/i, tip: " **Saumur** og **Anjou** chenin slår ofte Vouvray-premium på marketing i samme prisniveau." },
  { match: /albariño|albarino/i, tip: " **Rías Baixas** subzoner som **Val do Salnés** giver ofte mere salinitet end generiske DO-etiketter." },
  { match: /gamay/i, tip: " **Régnié** og **Chiroubles** er ofte bedre gamay-value end de mest hypede cru-navne." },
];

function valueTipForSlug(slug, title) {
  const hay = `${slug} ${title}`;
  for (const { match, tip } of VALUE_TIP_BY_KEY) {
    if (match.test(hay)) return tip;
  }
  return "";
}

function removeSection(body, heading) {
  let result = body;
  while (true) {
    const needle = `\n${heading}\n`;
    let idx = result.indexOf(needle);
    if (idx === -1 && result.startsWith(`${heading}\n`)) {
      idx = 0;
    }
    if (idx === -1) break;

    const sectionStart = idx === 0 ? 0 : idx + 1;
    const afterHeading = result.indexOf("\n", sectionStart + heading.length) + 1;
    const rest = result.slice(afterHeading);
    const nextMatch = rest.search(/\n## /);
    const sectionEnd = nextMatch === -1 ? result.length : afterHeading + nextMatch;
    result = (result.slice(0, sectionStart) + result.slice(sectionEnd)).replace(/\n{3,}/g, "\n\n");
  }
  return result.trim();
}

function stripBoilerplate(content) {
  let c = content;
  for (const h of BOILERPLATE_HEADINGS) {
    c = removeSection(c, h);
  }
  return c.replace(/\n{3,}/g, "\n\n").trim();
}

function fixBedsteCopyPaste(content, slug, title) {
  if (!slug.startsWith("bedste-")) return content;
  const tip = valueTipForSlug(slug, title);
  return content.replace(BOURGOGNE_BOILERPLATE, tip);
}

const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"));
let changed = 0;
const samples = [];

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const fp = path.join(guidesDir, file);
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);

  const hadBoilerplate = BOILERPLATE_HEADINGS.some((h) => content.includes(h));
  const hadBourgogne = BOURGOGNE_BOILERPLATE.test(content);
  BOURGOGNE_BOILERPLATE.lastIndex = 0;

  if (!hadBoilerplate && !hadBourgogne) continue;

  let newContent = stripBoilerplate(content);
  newContent = fixBedsteCopyPaste(newContent, slug, data.title ?? slug);

  if (newContent === content.trim()) continue;

  const before = readingTime(content).words;
  const after = readingTime(newContent).words;

  if (!dryRun) {
    data.updated = TODAY;
    fs.writeFileSync(fp, matter.stringify(newContent, data));
  }

  changed++;
  if (samples.length < 8) {
    samples.push({ slug, before, after, removedBoilerplate: hadBoilerplate, fixedBourgogne: hadBourgogne });
  }
}

console.log(dryRun ? `[dry-run] Ville opdatere ${changed} guides` : `Opdateret ${changed} guides`);
for (const s of samples) {
  console.log(`  ${s.slug}: ${s.before} → ${s.after} ord`);
}
if (changed > samples.length) {
  console.log(`  … og ${changed - samples.length} flere`);
}
