#!/usr/bin/env node
/**
 * Opdaterer frontmatter description på guides med dårlig SERP-CTR:
 * - copy-paste bedste-*-under-* skabelon
 * - beskrivelser over 160 tegn (komprimeres til 2 sætninger)
 *
 * Kør: node scripts/improve-guide-serp-descriptions.mjs
 * Dry-run: node scripts/improve-guide-serp-descriptions.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guidesDir = path.join(__dirname, "../content/guides");
const dryRun = process.argv.includes("--dry-run");
const TODAY = "2026-06-09";

// Inline copy of bedste map + helpers (keep in sync with lib/seo/serp-meta.ts)
const SERP_MAX = 155;
const GENERIC_BEDSTE =
  /Bedste .+ under \d+ kr:\s*hvor finder du reel kvalitet,\s*hvilke producenter er sikre valg og hvad du skal undgå/i;

const BEDSTE_SERP = {
  "bedste-albarino-under-150-kr":
    "Albariño under 150 kr: Rías Baixas og Minho med salt og citrus til skaldyr. Danske producenter, regioner og typiske fejl i prisklassen.",
  "bedste-cabernet-sauvignon-under-100-kr":
    "Cabernet under 100 kr: Haut-Médoc, Castillon og Maipo slår smarte blend-navne. Hvor du får mest struktur for pengene — og hvad du skal undgå.",
  "bedste-cabernet-sauvignon-under-150-kr":
    "Cabernet 100–150 kr: junior-Médoc og seriøs Chile-Reserva med tydelig frugt. Regioner, producenter og faldgruber forklaret på dansk.",
  "bedste-cabernet-sauvignon-under-200-kr":
    "Cabernet under 200 kr: Cru Bourgeois, modne årgange og seriøse Napa-entry. Sådan vælger du uden at betale for prestige-marketing.",
  "bedste-chardonnay-under-100-kr":
    "Chardonnay under 100 kr: Mâcon, Limoux og unwooded Australien slår fad-tung supermarkeds-hvid. Friske flasker til fisk og hverdag.",
  "bedste-chardonnay-under-150-kr":
    "Chardonnay 100–150 kr: Petit Chablis, Saint-Véran og Oregon-entry. Stål eller fad — sådan finder du den rigtige stil til maden.",
  "bedste-chenin-blanc-under-150-kr":
    "Chenin under 150 kr: Loire og Swartland med sec, demi-sec eller moelleux. Tjek sødme på etiketten — og undgå fejlkøb til mad.",
  "bedste-grenache-under-100-kr":
    "Grenache under 100 kr: Rhône Villages, Borja og Fitou til gryde og grill. Varm frugt uden Châteauneuf-pris — producenter og faldgruber.",
  "bedste-grenache-under-150-kr":
    "Grenache 100–150 kr: Gigondas, Vacqueyras og Montsant med mere peber og urter. Upgrade fra hverdagsflasken uden prestige-etiket.",
  "bedste-malbec-under-100-kr":
    "Malbec under 100 kr: Mendoza Luján og Uco til bøf og burger. Mørk frugt, blød struktur — undgå «premium» uden subregion.",
  "bedste-malbec-under-150-kr":
    "Malbec 100–150 kr: Reserva Mendoza eller pebret Cahors til grill. Sammenlign stilarter, producenter og årgang før du køber.",
  "bedste-merlot-under-100-kr":
    "Merlot under 100 kr: Côtes de Bourg og blød Chile-merlot til pasta og svinekød. Venlig frugt uden tung tannin-stress.",
  "bedste-merlot-under-150-kr":
    "Merlot 100–150 kr: Saint-Émilion Grand Cru og Pomerol-satellitter med mere lag. Regioner, flasker og faldgruber på dansk.",
  "bedste-pinot-grigio-under-100-kr":
    "Pinot grigio under 100 kr: Alto Adige og Friuli slår generisk norditaliensk bulk. Frisk aperitivo-hvid til fisk og salat.",
  "bedste-pinot-grigio-under-150-kr":
    "Pinot grigio 100–150 kr: mere tekstur fra Alto Adige, Friuli eller Oregon pinot gris. Sådan vælger du mellem let og struktureret.",
  "bedste-pinot-noir-under-150-kr":
    "Pinot noir 100–150 kr: Oregon, Marlborough og Bourgogne Chalonnaise til kylling og svampe. Madpinot uden Côte de Nuits-pris.",
  "bedste-pinot-noir-under-250-kr":
    "Pinot noir under 250 kr: Villages, Premier Cru og Oregon single-vineyard. Lagring, årgang og opbevaring forklaret for danske købere.",
  "bedste-riesling-under-100-kr":
    "Riesling under 100 kr: tør Mosel, Nahe og Pfalz til asiatisk mad og fisk. Tjek trocken på etiketten — undgå halvtør overraskelse.",
  "bedste-riesling-under-150-kr":
    "Riesling 100–150 kr: Gutswein, Alsace og Clare Valley med mineral og frugt. Tør, feinherb eller sød — vælg bevidst til retten.",
  "bedste-sangiovese-under-100-kr":
    "Sangiovese under 100 kr: Chianti Classico og Rosso di Montalcino til pasta og pizza. Syre og kirsebær uden Riserva-pris.",
  "bedste-sangiovese-under-150-kr":
    "Sangiovese 100–150 kr: Riserva Chianti og Rosso med mere fad og struktur. Italiensk hverdagsrød til gæster — producenter og tips.",
  "bedste-sauvignon-blanc-under-100-kr":
    "Sauvignon under 100 kr: Touraine, Pays d'Oc og Marlborough entry til salat og fisk. Frisk hvid — drik ung for max aromatik.",
  "bedste-sauvignon-blanc-under-150-kr":
    "Sauvignon 100–150 kr: Sancerre village eller seriøs Marlborough. Loire sten vs. NZ tropisk frugt — samme pris, to stilarter.",
  "bedste-syrah-under-100-kr":
    "Syrah under 100 kr: Côtes du Rhône og Crozes til grill og gryde. Peber og frugt uden overmoden shiraz-bombe fra varme år.",
  "bedste-syrah-under-150-kr":
    "Syrah 100–150 kr: Saint-Joseph, Cornas-junior eller Swartland med mere struktur. Nord-Rhône peber vs. Barossa frugt — vælg til mad.",
  "bedste-tempranillo-under-100-kr":
    "Tempranillo under 100 kr: Rioja Crianza og Ribera Roble til tapas og lam. Moden frugt nu — spar Reserva til 150 kr+.",
  "bedste-tempranillo-under-150-kr":
    "Tempranillo 100–150 kr: Rioja Reserva og seriøs Ribera med tydelig fad. Ældring, producenter og faldgruber på dansk.",
};

function truncate(text, max = SERP_MAX) {
  const c = text.replace(/\s+/g, " ").trim();
  if (c.length <= max) return c;
  const slice = c.slice(0, max - 1);
  const sp = slice.lastIndexOf(" ");
  return `${(sp > max * 0.6 ? slice.slice(0, sp) : slice).trim()}…`;
}

function improveDescription(slug, title, desc) {
  const cleaned = desc.replace(/\s+/g, " ").trim();

  if (BEDSTE_SERP[slug] || (slug.startsWith("bedste-") && slug.includes("-under-") && GENERIC_BEDSTE.test(cleaned))) {
    return BEDSTE_SERP[slug] ?? truncate(`${title.split(":")[0]}: dansk guide til regioner, producenter og faldgruber.`);
  }

  if (cleaned.length > 160) {
    const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length >= 2) {
      const two = truncate(`${sentences[0]} ${sentences[1]}`, SERP_MAX);
      if (two.length < cleaned.length) return two;
    }
    return truncate(cleaned);
  }

  return null;
}

let changed = 0;
for (const file of fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"))) {
  const slug = file.replace(/\.mdx$/, "");
  const fp = path.join(guidesDir, file);
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);
  const next = improveDescription(slug, data.title ?? slug, data.description ?? "");
  if (!next || next === data.description?.replace(/\s+/g, " ").trim()) continue;

  if (!dryRun) {
    data.description = next;
    data.updated = TODAY;
    fs.writeFileSync(fp, matter.stringify(content, data));
  }
  changed++;
  if (changed <= 5) console.log(`${slug}: ${(data.description?.length ?? 0)} → ${next.length} tegn`);
}

console.log(dryRun ? `[dry-run] Ville opdatere ${changed} guides` : `Opdateret ${changed} guides`);
