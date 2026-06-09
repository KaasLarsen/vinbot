#!/usr/bin/env node
/**
 * Erstatter identiske «Strategier for bedst værdi»-afsnit i bedste-*-under-* guides
 * med drue- og pris-specifik tekst.
 *
 * Kør: node scripts/diversify-bedste-strategier.mjs
 * Dry-run: node scripts/diversify-bedste-strategier.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guidesDir = path.join(__dirname, "../content/guides");
const dryRun = process.argv.includes("--dry-run");
const TODAY = "2026-05-26";
const KOEB = "[køb vin online](/guides/koeb-vin-online-sadan-holder-du-styr-paa-det)";

const PRODUCER_TAIL =
  / De fleste har \*\*både basis- og top-etiketter\*\* i sortimentet — og deres basis-vine matcher ofte \*\*\d+ kr-klassen\*\* med tydelig stil og ren udførelse\. Undgå \*\*supermarkeds-eksklusive labels\*\* uden klar producent-angivelse; her er det ofte uigennemsigtige blends fra industriel bulk-produktion\./g;

/** Unikt strategi-afsnit pr. slug — erstatning for copy-paste-blokke. */
const STRATEGIER_BY_SLUG = {
  "bedste-cabernet-sauvignon-under-100-kr": `Under 100 kr slår **Haut-Médoc**, **Côtes de Castillon** og **Maipo Reserva** ofte generiske «cabernet»-etiketter. Køb **6-flaskers kasser** ved tilbud, drik inden for **2–3 år**, og luft flasken **30 minutter** hvis tanninen føles hård til hverdagsmad. Se ${KOEB} for tilbudsjagt.`,
  "bedste-cabernet-sauvignon-under-150-kr": `I 100–150 kr-klassen er **junior-crus** fra kendte Médoc-châteaux og **Reserva** fra seriøse chilenske huse det sikreste valg. Sammenlign **Côtes de Bourg** med **Margaux satellite**-appellationer — samme drue, lavere prestige-pris. Undgå «Grand Vin»-marketing uden klassifikation; tjek hellere **årgang** og producentens basislinje.`,
  "bedste-cabernet-sauvignon-under-200-kr": `Ved 200 kr er forskellen mellem producenter i **Pauillac**, **Margaux** og **Napa** markant — læs korte anmeldelser før du køber. **Ældre årgange** (5–8 år) kan være mere drikkemodne end nye releases til samme pris. Overvej **Cru Bourgeois** med moden årgang frem for ung Grand Cru-marketing.`,
  "bedste-chardonnay-under-100-kr": `Hold dig til **Mâcon-Villages**, **Limoux** og **Limestone Coast** chardonnay med tydelig syre — ikke fad-tunge «Reserve»-navne uden region. **Køleskab 8–10 °C** og drik ungt; under 100 kr vinder friskhed over kompleksitet. Kassekøb giver ofte bedst pris på hverdags-hvid.`,
  "bedste-chardonnay-under-150-kr": `**Petit Chablis**, **Saint-Véran** og **Russian River** «entry»-flasker er sweet spot for chardonnay omkring 150 kr. Kig efter **sur lie** og **ståltank** på etiketten hvis du vil have frisk stil — ikke alle vine i klassen er fad-drevne. Én god producent med to prisniveauer (village vs. premier cru light) giver ofte bedre value end ukendt brand.`,
  "bedste-chenin-blanc-under-150-kr": `**Saumur**, **Anjou** og **Swartland** chenin under 150 kr slår ofte dyrere Vouvray på marketing. Tjek om flasken er **sec**, **demi-sec** eller **moelleux** — halvtør chenin er fantastisk til krydret mad, men overrasker hvis du forventede knastør hvid. Køb **nyere årgange**; chenin har brug for frisk syre i denne prisklasse.`,
  "bedste-grenache-under-100-kr": `**Côtes du Rhône Villages**, **Campo de Borja** og **Fitou** leverer mere grenache-karakter for pengene end prestige-navne på etiketten. Flaskerne er til **gryderet og grill** — køb **3–4 ens** til simren, ikke én dyr «gæsteflaske». Drik **13–15 °C**; for varm grenache smager alkoholstung.`,
  "bedste-grenache-under-150-kr": `**Gigondas**, **Vacqueyras** og **Montsant** er det rigtige upgrade fra 100 kr — ikke billigt Châteauneuf. Sammenlign **Rhône** med **Priorat-blends** i samme pris: Priorat giver mere struktur, Rhône mere saft. Junior-etiketter fra **Perrin**, **Guigal** og **Palacios** er ofte bedre value end ukendte «Reserva».`,
  "bedste-malbec-under-100-kr": `**Luján de Cuyo** og **Uco Valley** «entry»-malbec slår ofte «Reserva»-navne uden tydelig oprindelse. Argentinsk malbec under 100 kr er **ungdomsvin** — køb til **bøf, burger og chili** inden for et år. Kassekøb ved tilbud giver typisk 15–20 % rabat på hverdagsflasker.`,
  "bedste-malbec-under-150-kr": `Ved 150 kr kan du kigge mod **single-vineyard** og **Reserva** fra Mendoza med tydelig frugt og blødere tannin. **Cahors** (fransk malbec) giver ofte mere peber og syre til samme pris som argentinsk «frugtbombe». Sammenlign årgange: malbec fra **varme år** kan virke overmoden — vælg friskere årgang til sommergrill.`,
  "bedste-merlot-under-100-kr": `**Côtes de Bourg**, **Lalande-de-Pomerol** og **Colchagua** merlot giver blød frugt uden tung pris. Undgå «smooth merlot»-marketing uden appellation — det er ofte bulk. Server **14–16 °C** til pasta og svinekød; merlot under 100 kr skal være **drikkebar med det samme**.`,
  "bedste-merlot-under-150-kr": `**Saint-Émilion Grand Cru** (ikke Premier Grand Cru) og **Pomerol satellite**-appellationer er det naturlige skridt op fra 100 kr. Kig efter **merlot-cabernet blends** med syre frem for 100 % merlot uden struktur. Junior-vine fra **Jean-Pierre Moueix**-relaterede huse og seriøse bordeaux-négociants holder ofte kvaliteten i 150 kr-klassen.`,
  "bedste-pinot-grigio-under-100-kr": `Vælg **DOC** med underregion (**delle Venezie** er OK, **Alto Adige** er bedre) frem for generisk «Pinot Grigio Italy». Flasken skal smage af **citrus og salt** — ikke kun «let og neutral». Køb til **fisk, salat og aperitivo**; drik **8–10 °C** inden for et år.`,
  "bedste-pinot-grigio-under-150-kr": `**Alto Adige DOC**, **Friuli** og **Oregon pinot gris** åbner mere tekstur og bitter citrus omkring 150 kr. Sammenlign med **pinot gris fra Alsace** i samme pris — Alsace giver mere fedme, Italien mere kant. Én producent med **village**-betegnelse slår ofte supermarkeds-«premium»-label.`,
  "bedste-pinot-noir-under-150-kr": `**Oregon**, **Marlborough** og **Bourgogne Côte Chalonnaise** pinot under 150 kr er ofte mere frugtfuld end entry-level Côte de Nuits. Køb til **kylling, svampe og laks** — ikke tunge bøffer. **Let afkøling (14–16 °C)** gør pinot mere præcis; for varm pinot smager «varm juice».`,
  "bedste-pinot-noir-under-250-kr": `Ved 250 kr er **Villages** og **Premier Cru**-niveau i Bourgogne eller **single-vineyard** fra Oregon det reelle spil — ikke generisk «Reserve». Køb **2–3 år gamle årgange** hvor muligt; ung premier cru kan være lukket. Opbevar køligt og mørk; pinot på dette niveau falder hurtigt ved dårlig lagring.`,
  "bedste-riesling-under-100-kr": `Hold dig til **trocken** og **Kabinett trocken** fra **Mosel**, **Nahe** og **Pfalz** — tjek etiketten for sødme. Tysk riesling under 100 kr er **madvin til asiatisk og fisk**; køb ungt og køligt. Kassekøb af **én producent** giver bedre stilkonsistens end blandet tilbudshylder.`,
  "bedste-riesling-under-150-kr": `**Spätlese trocken**, **Alsace** og **Clare Valley** riesling i 100–150 kr-klassen kræver at du vælger **tør vs. halvtør** bevidst. **GG** og **Erste Lage** er sjældent reelt under 150 kr — sats på **Gutswein** og **Village** med god producent. Én flaske til mad, én til at forstå **mineral vs. frugt** i stilen.`,
  "bedste-sangiovese-under-100-kr": `**Chianti Classico** (ikke Riserva) og **Rosso di Montalcino** er de sikreste sangiovese-køb under 100 kr. Flasken skal have **syre til tomat** — undgå «soft» supermarkeds-Chianti uden DOC. Køb **3 flasker** til pasta og pizza; sangiovese er hverdagsvin, ikke lagervin i denne pris.`,
  "bedste-sangiovese-under-150-kr": `**Riserva** fra Chianti Classico og **Brunello-adjacent** vine (Rosso, ikke Brunello) er upgrade-punktet ved 150 kr. Sammenlign **Montalcino** med **Montepulciano** — samme drue, forskellig tyngde. Kig efter **sangiovese grosso**-betegnelser og undgå «Toscano IGT» uden tydelig struktur.`,
  "bedste-sauvignon-blanc-under-100-kr": `**Touraine**, **Pays d'Oc** og **Marlborough** «entry» sauvignon giver mere friskhed for pengene end prestige Sancerre i samme pris. Drik **8–10 °C** inden for **12 måneder** — sauvignon falder hurtigt. Køb til **grønne salater, fisk og brunch**; undgå fad-sauvignon under 100 kr.`,
  "bedste-sauvignon-blanc-under-150-kr": `**Sancerre** og **Pouilly-Fumé** «village»-niveau samt **Casablanca** (Chile) er sweet spot omkring 150 kr. Sammenlign **Loire** (sten og citrus) med **New Zealand** (tropisk frugt) til samme ret — det er to forskellige vine til samme pris. Producent med **single-vineyard** i Marlborough slår ofte generisk «Reserve».`,
  "bedste-syrah-under-100-kr": `**Côtes du Rhône**, **Crozes-Hermitage** «light» og **McLaren Vale** entry shiraz giver peber og frugt uden tung pris. Undgå **overmoden australsk shiraz** i varme årgange — den smager syltet til hverdagsmad. Køb til **grill, gryderet og BBQ**; syrah under 100 kr skal have **frisk afslutning**.`,
  "bedste-syrah-under-150-kr": `**Saint-Joseph**, **Cornas** «junior» og **Swartland** syrah er det rigtige skridt op fra 100 kr — ikke billig Hermitage-marketing. Sammenlign **nord-Rhône** (peber, syre) med **Barossa** (frugt, alkohol) til din mad. **Én flaske med luftning** (dekanter eller karaffel 45 min.) kan løfte 150 kr-syrah markant.`,
  "bedste-tempranillo-under-100-kr": `**Rioja Crianza** og **Ribera del Duero Roble** er de bedste tempranillo-køb under 100 kr — tjek **ældningsgrad** (Crianza vs. Reserva). Flasken er klar til **tapas, lam og simregryde**; spar Reserva til 150 kr+. Køb **spansk DOC** med producentnavn, ikke «Tinto»-generika.`,
  "bedste-tempranillo-under-150-kr": `**Rioja Reserva** og **Crianza** fra top-bodegas i Ribera er kernen ved 150 kr. Sammenlign **ældring i fad** (12 vs. 24 måneder) — mere fad er ikke altid bedre til let mad. **Gran Reserva** under 200 kr findes, men kræver at årgangen er frisk nok til at undgå oxidativ stil.`,
  "bedste-albarino-under-150-kr": `**Rías Baixas** med underzone (**Val do Salnés**) og **Alvarinho** fra Minho (Portugal) giver salt, citrus og struktur omkring 150 kr. Drik **8–10 °C** til **skaldyr, sushi og grillet fisk** inden for **18 måneder**. Sammenlign én spansk og én portugisisk flaske — samme drue, forskellig tekstur.`,
};

const PRODUCER_TAIL_BY_SLUG = {
  "bedste-cabernet-sauvignon-under-100-kr":
    " Basis-cuvées fra store Médoc-huse og Maipo-producenter er ofte bedre value end ukendte «Reserve»-navne — tjek **appellation** på etiketten.",
  "bedste-cabernet-sauvignon-under-150-kr":
    " Junior-etiketter fra **classified growths** og **Reserva**-linjer fra Chile holder ofte 150 kr-niveauet med tydelig cabernet-frugt.",
  "bedste-cabernet-sauvignon-under-200-kr":
    " På 200 kr er **producentens track record** vigtigere end appellation-navn alene — læs korte noter om årgang før køb.",
  "bedste-chardonnay-under-100-kr":
    " Mâcon-producenter med **ståltank**-stil leverer ofte renere value end fad-tunge «Reserve»-labels i supermarkeder.",
  "bedste-chardonnay-under-150-kr":
    " **Petit Chablis** og **village Bourgogne** fra kendte négociants er det sikre mellemtrin før premier cru.",
  "bedste-chenin-blanc-under-150-kr":
    " Loire-producenter med tydelig **sec/demi-sec**-markering på etiketten undgår de fleste fejlkøb i klassen.",
  "bedste-grenache-under-100-kr":
    " Rhône-négociants med **Villages**-betegnelse slår ofte bulk-grenache med smart etiketdesign.",
  "bedste-grenache-under-150-kr":
    " **Gigondas** og **Vacqueyras** fra seriøse domainer giver ofte mere terroir end et billigt Châteauneuf-navn.",
  "bedste-malbec-under-100-kr":
    " Mendoza-huse med **tydelig subregion** (Luján, Uco) på etiketten er mere pålidelige end generisk «Argentina Malbec».",
  "bedste-malbec-under-150-kr":
    " **Reserva** fra etablerede Mendoza-bodegas og **Cahors** fra Frankrig er de to stilarter værd at sammenligne i 150 kr-klassen.",
  "bedste-merlot-under-100-kr":
    " **Côtes de Bourg** og seriøse bordeaux-négociants giver ofte blødere, mere drikkebar merlot end «smooth red»-generika.",
  "bedste-merlot-under-150-kr":
    " **Saint-Émilion**-producenter med **Grand Cru** (ikke Premier) status er sweet spot før prisen løber op.",
  "bedste-pinot-grigio-under-100-kr":
    " **Alto Adige** og **Friuli** på etiketten signalerer ofte mere kant end generisk norditaliensk pinot grigio.",
  "bedste-pinot-grigio-under-150-kr":
    " Producent med **single-village** DOC slår ofte «premium»-linjer uden geografisk præcision.",
  "bedste-pinot-noir-under-150-kr":
    " **Oregon** og **Marlborough** pinot giver ofte mere frugt for pengene end entry-level Bourgogne.",
  "bedste-pinot-noir-under-250-kr":
    " Ved 250 kr er **årgang og lagring** vigtigere end etiket-præstige — tjek forhandlerens opbevaring.",
  "bedste-riesling-under-100-kr":
    " Tyske **VDP**- og **Prädikat**-producenter med **trocken** på etiketten er det sikreste filter under 100 kr.",
  "bedste-riesling-under-150-kr":
    " **Gutswein** og **Village** fra Mosel og Alsace slår ofte flashy «Grand Cru»-marketing i samme pris.",
  "bedste-sangiovese-under-100-kr":
    " **Chianti Classico**-producenter med **Gallo Nero**-logo og tydelig **DOCG** er det første filter.",
  "bedste-sangiovese-under-150-kr":
    " **Riserva** og **Rosso di Montalcino** fra kendte cantine er upgrade-stien — ikke ukendt «Toscano»-blend.",
  "bedste-sauvignon-blanc-under-100-kr":
    " Loire- og Marlborough-producenter med **AOC/DOC** og høstår på etiketten holder bedre friskhed.",
  "bedste-sauvignon-blanc-under-150-kr":
    " **Sancerre** og **Pouilly-Fumé** fra cooperative eller domaine med village-navn er det naturlige 150 kr-valg.",
  "bedste-syrah-under-100-kr":
    " Rhône-négociants (**Guigal**, **Delas**) og australske huse med **regional** betegnelse slår generisk shiraz.",
  "bedste-syrah-under-150-kr":
    " **Saint-Joseph** og **Cornas**-producenter giver ofte mere peber og syre end Barossa «fruit bombs» i samme pris.",
  "bedste-tempranillo-under-100-kr":
    " **Rioja** og **Ribera**-bodegas med **Crianza/Roble** og tydelig ældring på etiketten er det sikre valg.",
  "bedste-tempranillo-under-150-kr":
    " **Reserva**-linjer fra etablerede spanske huse er sweet spot — tjek **fad- og flaskemodning** på bagsiden.",
  "bedste-albarino-under-150-kr":
    " **Rías Baixas**-producenter med **subzone** (fx Val do Salnés) på etiketten giver ofte mere salinitet og syre.",
};

function replaceStrategierSection(body, newParagraph) {
  const heading = "## Strategier for bedst værdi";
  const start = body.indexOf(`\n${heading}\n`);
  if (start === -1) return null;
  const sectionStart = start + 1;
  const after = body.slice(sectionStart + heading.length + 1);
  const next = after.search(/\n## /);
  const sectionEnd = next === -1 ? body.length : sectionStart + heading.length + 1 + next;
  const replacement = `${heading}\n\n${newParagraph}\n`;
  return body.slice(0, sectionStart) + replacement + body.slice(sectionEnd);
}

let changed = 0;

for (const [slug, strategi] of Object.entries(STRATEGIER_BY_SLUG)) {
  const fp = path.join(guidesDir, `${slug}.mdx`);
  if (!fs.existsSync(fp)) {
    console.warn(`Mangler: ${slug}`);
    continue;
  }
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);
  let newContent = replaceStrategierSection(content, strategi);
  if (!newContent) continue;

  const tail = PRODUCER_TAIL_BY_SLUG[slug];
  if (tail && PRODUCER_TAIL.test(content)) {
    PRODUCER_TAIL.lastIndex = 0;
    newContent = newContent.replace(PRODUCER_TAIL, tail);
  }

  if (newContent.trim() === content.trim()) continue;

  if (!dryRun) {
    data.updated = TODAY;
    fs.writeFileSync(fp, matter.stringify(newContent, data));
  }
  changed++;
}

console.log(dryRun ? `[dry-run] Ville opdatere ${changed} bedste-guides` : `Opdateret ${changed} bedste-guides`);
