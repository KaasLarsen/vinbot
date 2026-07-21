#!/usr/bin/env node
/**
 * Erstatter identiske H2-overskrifter i bedste-*-under-* guides med
 * drue- og pris-specifikke overskrifter (samme indhold, unikke overskrifter).
 *
 * Kør: node scripts/diversify-bedste-headings.mjs
 * Dry-run: node scripts/diversify-bedste-headings.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guidesDir = path.join(__dirname, "../content/guides");
const dryRun = process.argv.includes("--dry-run");
const TODAY = "2026-07-21";

/** @typedef {{ regioner: string; producenter: string; retter: string; strategier: string; faldgruber: string; sammenlign: string }} HeadingSet */

/** @type {Record<string, HeadingSet>} */
const HEADINGS_BY_SLUG = {
  "bedste-albarino-under-150-kr": {
    regioner: "Rías Baixas og Minho — hvor saliniteten er højest",
    producenter: "Bodegas og quintaer værd at kende",
    retter: "Albariño til skaldyr, sushi og grillfisk",
    strategier: "Sådan vælger du flaske omkring 150 kr",
    faldgruber: "Typiske fejlkøb i albariño-hylden",
    sammenlign: "Find albariño på tværs af danske forhandlere",
  },
  "bedste-cabernet-sauvignon-under-100-kr": {
    regioner: "Médoc, Castillon og Maipo under 100 kr",
    producenter: "Négociants og Reserva-linjer der leverer",
    retter: "Cabernet til bøf, gryderet og burger",
    strategier: "Købsstrategi for hverdags-cabernet",
    faldgruber: "Hvad du bør undgå under 100 kr",
    sammenlign: "Sammenlign cabernet-priser på Vinbot",
  },
  "bedste-cabernet-sauvignon-under-150-kr": {
    regioner: "Junior-crus og seriøs Chile i 150 kr-klassen",
    producenter: "Châteaux og bodegas med basislinjer der holder",
    retter: "Cabernet til søndagsbøf og gæstemiddag",
    strategier: "Value-tips mellem 100 og 150 kr",
    faldgruber: "Marketing-fælder i 150 kr-cabernet",
    sammenlign: "Find bedst pris på cabernet under 150 kr",
  },
  "bedste-cabernet-sauvignon-under-200-kr": {
    regioner: "Pauillac, Margaux og Napa uden prestige-pris",
    producenter: "Classified growths og Reserva der kan stå 2–5 år",
    retter: "Cabernet til festbord og tungere kød",
    strategier: "Årgang og luftning i 200 kr-klassen",
    faldgruber: "Når «Grand Vin» er ren markedsføring",
    sammenlign: "Sammenlign 200 kr-cabernet hos danske shops",
  },
  "bedste-chardonnay-under-100-kr": {
    regioner: "Mâcon, Limoux og limestone-Coast under 100 kr",
    producenter: "Ståltank-producenter der vinder på syre",
    retter: "Chardonnay til fisk, kylling og mild ost",
    strategier: "Friskhed før fad — shoppetips under 100 kr",
    faldgruber: "Cremet bulk og fad-tunge Reserve-navne",
    sammenlign: "Søg chardonnay under 100 kr på Vinbot",
  },
  "bedste-chardonnay-under-150-kr": {
    regioner: "Petit Chablis, Saint-Véran og Oregon-entry",
    producenter: "Négociants og village-linjer værd at følge",
    retter: "Chardonnay til skaldyr, cremet pasta og flødesauce",
    strategier: "Stål vs. let fad — sådan vælger du stil",
    faldgruber: "Overpris på Napa og basis-bourgogne",
    sammenlign: "Sammenlign chardonnay under 150 kr",
  },
  "bedste-chenin-blanc-under-150-kr": {
    regioner: "Saumur, Anjou og Swartland i 150 kr-klassen",
    producenter: "Loire- og Swartland-huse med klar sødme-markering",
    retter: "Chenin til krydret mad, ost og asiatisk",
    strategier: "Sec, demi-sec eller moelleux — vælg bevidst",
    faldgruber: "Fejlkøb når sødmen ikke står på etiketten",
    sammenlign: "Find chenin blanc under 150 kr",
  },
  "bedste-grenache-under-100-kr": {
    regioner: "Rhône Villages, Campo de Borja og Fitou",
    producenter: "Négociants og spanske huse til hverdagspris",
    retter: "Grenache til gryderet, pizza og grill",
    strategier: "Kassekøb og drikketemperatur under 100 kr",
    faldgruber: "Prestige-navne uden indhold i prisklassen",
    sammenlign: "Søg grenache under 100 kr",
  },
  "bedste-grenache-under-150-kr": {
    regioner: "Gigondas, Vacqueyras og Montsant",
    producenter: "Perrin, Guigal og Priorat-blends værd at kende",
    retter: "Grenache til lam, gryderet og sydlig mad",
    strategier: "Rhône vs. Priorat — samme pris, forskellig stil",
    faldgruber: "Billigt Châteauneuf-marketing uden terroir",
    sammenlign: "Sammenlign grenache under 150 kr",
  },
  "bedste-malbec-under-100-kr": {
    regioner: "Luján de Cuyo og Uco Valley entry",
    producenter: "Mendoza-huse med tydelig subregion",
    retter: "Malbec til bøf, burger og chili",
    strategier: "Ungdomsvin — køb til at drikke inden et år",
    faldgruber: "«Premium» uden oprindelse på etiketten",
    sammenlign: "Find malbec under 100 kr på Vinbot",
  },
  "bedste-malbec-under-150-kr": {
    regioner: "Mendoza Reserva og Cahors i samme prisklasse",
    producenter: "Single-vineyard og franske malbec-domæner",
    retter: "Malbec til grill, bøf og peberretter",
    strategier: "Argentina vs. Cahors — vælg efter mad",
    faldgruber: "Overmodne varme årgange og Reserve-navne",
    sammenlign: "Sammenlign malbec under 150 kr",
  },
  "bedste-merlot-under-100-kr": {
    regioner: "Côtes de Bourg, Lalande-de-Pomerol og Colchagua",
    producenter: "Bordeaux-négociants med blød basislinje",
    retter: "Merlot til pasta, svinekød og hverdagsmad",
    strategier: "Drikkebar nu — shoppetips under 100 kr",
    faldgruber: "«Smooth merlot» uden appellation",
    sammenlign: "Søg merlot under 100 kr",
  },
  "bedste-merlot-under-150-kr": {
    regioner: "Saint-Émilion Grand Cru og Pomerol-satellitter",
    producenter: "Moueix-relaterede huse og seriøse négociants",
    retter: "Merlot til gæstemiddag og cremet sauce",
    strategier: "Blends vs. 100 % merlot i 150 kr-klassen",
    faldgruber: "Premier Grand Cru-marketing uden indhold",
    sammenlign: "Find merlot under 150 kr",
  },
  "bedste-pinot-grigio-under-100-kr": {
    regioner: "Alto Adige, Friuli og delle Venezie",
    producenter: "DOC-producenter med underregion på etiketten",
    retter: "Pinot grigio til fisk, salat og aperitivo",
    strategier: "Citrus og salt — sådan shopper du under 100 kr",
    faldgruber: "Generisk «Pinot Grigio Italy» uden kant",
    sammenlign: "Sammenlign pinot grigio under 100 kr",
  },
  "bedste-pinot-grigio-under-150-kr": {
    regioner: "Alto Adige, Friuli og Oregon pinot gris",
    producenter: "Village-DOC og Alsace-gris til samme pris",
    retter: "Pinot grigio med tekstur til fisk og brunch",
    strategier: "Italien vs. Alsace — to stilarter i 150 kr",
    faldgruber: "«Premium»-labels uden geografisk præcision",
    sammenlign: "Find pinot grigio under 150 kr",
  },
  "bedste-pinot-noir-under-150-kr": {
    regioner: "Oregon, Marlborough og Côte Chalonnaise",
    producenter: "Entry-pinot der slår billig Côte de Nuits",
    retter: "Pinot til kylling, svampe og laks",
    strategier: "Madpinot — afkøling og årgang omkring 150 kr",
    faldgruber: "Prestige-pinot uden frugt i prisklassen",
    sammenlign: "Søg pinot noir under 150 kr",
  },
  "bedste-pinot-noir-under-250-kr": {
    regioner: "Bourgogne Villages, Premier Cru og Oregon single-vineyard",
    producenter: "Domæner med lagringspotentiale i 250 kr-klassen",
    retter: "Pinot til festbord og finere kødretter",
    strategier: "Årgang, lagring og opbevaring ved 250 kr",
    faldgruber: "Reserve-navne uden terroir eller årgangskontrol",
    sammenlign: "Sammenlign pinot noir under 250 kr",
  },
  "bedste-riesling-under-100-kr": {
    regioner: "Mosel, Nahe og Pfalz trocken under 100 kr",
    producenter: "VDP- og Prädikat-huse med trocken-markering",
    retter: "Riesling til asiatisk mad, fisk og sushi",
    strategier: "Trocken-filteret — det vigtigste shoppetip",
    faldgruber: "Sød supermarkeds-riesling uden markering",
    sammenlign: "Find riesling under 100 kr",
  },
  "bedste-riesling-under-150-kr": {
    regioner: "Tysk Gutswein, Alsace og Clare Valley",
    producenter: "Village- og Spätlese trocken-producenter",
    retter: "Riesling til krydret mad og skaldyr",
    strategier: "Tør, feinherb eller let sød — vælg efter ret",
    faldgruber: "GG-marketing der ikke matcher prisen",
    sammenlign: "Sammenlign riesling under 150 kr",
  },
  "bedste-sangiovese-under-100-kr": {
    regioner: "Chianti Classico og Rosso di Montalcino",
    producenter: "Cantine med Gallo Nero og tydelig DOCG",
    retter: "Sangiovese til pasta, pizza og tomatretter",
    strategier: "Hverdags-sangiovese — køb flere flasker",
    faldgruber: "Blød supermarkeds-Chianti uden DOC",
    sammenlign: "Søg sangiovese under 100 kr",
  },
  "bedste-sangiovese-under-150-kr": {
    regioner: "Chianti Riserva og Rosso di Montalcino upgrade",
    producenter: "Riserva-linjer og Brunello-adjacent cantine",
    retter: "Sangiovese til lasagne, bistecca og gæster",
    strategier: "Montalcino vs. Montepulciano i 150 kr",
    faldgruber: "Toscano IGT uden struktur",
    sammenlign: "Find sangiovese under 150 kr",
  },
  "bedste-sauvignon-blanc-under-100-kr": {
    regioner: "Touraine, Pays d'Oc og Marlborough entry",
    producenter: "Loire- og NZ-huse med frisk AOC/DOC",
    retter: "Sauvignon til salat, fisk og brunch",
    strategier: "Drik ungt — shoppetips under 100 kr",
    faldgruber: "Fad-sauvignon og gamle flasker i klassen",
    sammenlign: "Sammenlign sauvignon blanc under 100 kr",
  },
  "bedste-sauvignon-blanc-under-150-kr": {
    regioner: "Sancerre, Pouilly-Fumé og Casablanca",
    producenter: "Village-Loire og Marlborough single-vineyard",
    retter: "Sauvignon til gedeost, asparges og skaldyr",
    strategier: "Loire vs. New Zealand — vælg efter mad",
    faldgruber: "Prestige Sancerre uden village-kvalitet",
    sammenlign: "Find sauvignon blanc under 150 kr",
  },
  "bedste-syrah-under-100-kr": {
    regioner: "Côtes du Rhône, Crozes-light og McLaren Vale",
    producenter: "Guigal, Delas og regional australsk shiraz",
    retter: "Syrah til grill, BBQ og simregryde",
    strategier: "Peber og frugt — shoppetips under 100 kr",
    faldgruber: "Overmoden fruit bomb i varme årgange",
    sammenlign: "Søg syrah under 100 kr",
  },
  "bedste-syrah-under-150-kr": {
    regioner: "Saint-Joseph, Cornas-junior og Swartland",
    producenter: "Nord-Rhône-domæner og Swartland-huse",
    retter: "Syrah til peberretter, lam og festgrill",
    strategier: "Nord-Rhône vs. Barossa i 150 kr-klassen",
    faldgruber: "Billig Hermitage-marketing uden peber",
    sammenlign: "Sammenlign syrah under 150 kr",
  },
  "bedste-tempranillo-under-100-kr": {
    regioner: "Rioja Crianza og Ribera del Duero Roble",
    producenter: "Bodegas med tydelig ældringsgrad på etiketten",
    retter: "Tempranillo til tapas, lam og gryderet",
    strategier: "Crianza vs. Joven — det vigtigste filter",
    faldgruber: "Generisk «Tinto» uden DOC",
    sammenlign: "Find tempranillo under 100 kr",
  },
  "bedste-tempranillo-under-150-kr": {
    regioner: "Rioja Reserva og seriøs Ribera",
    producenter: "Top-bodegas med fad- og flaskemodning",
    retter: "Tempranillo til gæster, simren og oksekød",
    strategier: "12 vs. 24 måneders fad — vælg efter mad",
    faldgruber: "Gran Reserva der er for oxidativ til prisen",
    sammenlign: "Sammenlign tempranillo under 150 kr",
  },
};

const OLD = {
  regioner: "## Regioner der leverer mest for pengene",
  producenter: "## Sikre producenter og etiketter",
  retter: "## Retter og anvendelse",
  strategier: "## Strategier for bedst værdi",
  faldgruber: "## Faldgruber i prisklassen",
  sammenlign: "## Sammenlign prisen på tværs af forhandlere",
};

let changed = 0;
let skipped = 0;

for (const [slug, headings] of Object.entries(HEADINGS_BY_SLUG)) {
  const fp = path.join(guidesDir, `${slug}.mdx`);
  if (!fs.existsSync(fp)) {
    console.warn(`Mangler: ${slug}`);
    skipped++;
    continue;
  }
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);
  let next = content;
  const replacements = [
    [OLD.regioner, `## ${headings.regioner}`],
    [OLD.producenter, `## ${headings.producenter}`],
    [OLD.retter, `## ${headings.retter}`],
    [OLD.strategier, `## ${headings.strategier}`],
    [OLD.faldgruber, `## ${headings.faldgruber}`],
    [OLD.sammenlign, `## ${headings.sammenlign}`],
  ];

  let hits = 0;
  for (const [from, to] of replacements) {
    if (next.includes(from)) {
      next = next.replace(from, to);
      hits++;
    }
  }

  if (hits === 0 || next === content) {
    skipped++;
    continue;
  }

  if (!dryRun) {
    data.updated = TODAY;
    fs.writeFileSync(fp, matter.stringify(next, data));
  }
  console.log(`${dryRun ? "[dry] " : ""}${slug}: ${hits} overskrifter`);
  changed++;
}

console.log(
  dryRun
    ? `\n[dry-run] Ville opdatere ${changed} guides (${skipped} sprunget over)`
    : `\nOpdateret ${changed} bedste-guides (${skipped} sprunget over)`,
);
