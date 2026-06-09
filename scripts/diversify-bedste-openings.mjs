#!/usr/bin/env node
/**
 * Erstatter identiske «Forventning»-afsnit og lager-faldgrube-sætninger
 * i bedste-*-under-* guides med drue- og pris-specifik tekst.
 *
 * Kør: node scripts/diversify-bedste-openings.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guidesDir = path.join(__dirname, "../content/guides");
const dryRun = process.argv.includes("--dry-run");
const TODAY = "2026-05-26";

const LAGER_BOILERPLATE =
  / Husk også at \*\*tjekke forhandlerens årgang og lagerbeholdning\*\* — en vin der står for længe på lager hos en butik der ikke har klimakontrol, kan være trykket selv om prisen er fin\./g;

/** Unikt «Forventning»-afsnit (kun brødtekst under heading). */
const FORVENTNING_BY_SLUG = {
  "bedste-cabernet-sauvignon-under-100-kr":
    "I 70–100 kr-klassen handler cabernet om **struktur uden prestige**: Haut-Médoc, Castillon og seriøse chilenske Reserva giver ofte mere tannin og mørke bær end smarte blend-navne. Flasken skal være **drikkebar med kort luftning** — ikke lagervin. Forvent hverdagskvalitet til bøf og gryderet.",
  "bedste-cabernet-sauvignon-under-150-kr":
    "Mellem 100 og 150 kr begynder **junior-crus** og ordentlige Médoc/Chile-vine at smage af sted og årgang. Her får du typisk **klar cabernet-frugt**, moden tannin og vin der tåler **1–3 års lagring** i køleskabet. Sweet spot til søndagsbøf uden prestige-pris.",
  "bedste-cabernet-sauvignon-under-200-kr":
    "Ved 200 kr er du i **seriøs hverdags-/festcabernet**: tydelig geografi, ofte **12–18 måneders fad** og vine der kan stå **2–5 år**. Forvent ceder, mørke bær og tannin der kan luftes frem — ikke bulk med «Reserve»-stempel uden appellation.",
  "bedste-chardonnay-under-100-kr":
    "Under 100 kr vinder chardonnay på **syre og friskhed**, ikke fad: Mâcon-Villages, Limoux og australsk «unwooded» slår ofte cremet supermarkeds-chardonnay. Flasken er **ungdomsvin til fisk og kylling** — køb den til at drikke inden for et år, ikke til kælderen.",
  "bedste-chardonnay-under-150-kr":
    "100–150 kr åbner **Petit Chablis**, Saint-Véran og Oregon-entry med tydeligere sted og håndværk. Du kan vælge mellem **stålfrisk** og **let fad** — begge dele findes i klassen. Her begynder chardonnay at føles som en beslutning, ikke bare «hvid vin».",
  "bedste-chenin-blanc-under-150-kr":
    "I 100–150 kr-klassen viser chenin sin styrke: **sec, demi-sec eller moelleux** — tre forskellige vine til tre forskellige retter. Loire og Swartland leverer ofte mere karakter end dyrere marketing-Vouvray. Læs sødme-markeringen før du køber.",
  "bedste-grenache-under-100-kr":
    "Grenache under 100 kr er **gryde- og grillvin**: varm frugt, blød tannin og lav prestige-pris fra Rhône Villages, Campo de Borja eller Sardinien. Forvent saft og krydderi — ikke kompleks lagringsvin. Køb til simren og pizza, ikke til samling.",
  "bedste-grenache-under-150-kr":
    "Ved 150 kr kan grenache vise **Gigondas- og Vacqueyras-karakter** uden Châteauneuf-pris. Her møder du ofte **mere peber, urter og struktur** end i 100 kr-klassen — stadig madvenlig, men med tydeligere sydlig identitet.",
  "bedste-malbec-under-100-kr":
    "Malbec under 100 kr er **argentinsk hverdagsrød** i sin bedste form: mørk frugt, blød midte, lav tannin-stress. Mendoza-basisvine er bygget til **bøf, burger og grill** — drik ungt. Undgå «premium»-navne uden subregion på etiketten.",
  "bedste-malbec-under-150-kr":
    "100–150 kr giver adgang til **Reserva** og **single-vineyard** malbec med tydeligere frugt og finere afslutning. Sammenlign Mendoza med **Cahors** i samme pris — fransk malbec er ofte mere pebret og syrlig. Her er druen værd at nørde lidt.",
  "bedste-merlot-under-100-kr":
    "Merlot under 100 kr skal være **blød, frugtig og umiddelbar** — Côtes de Bourg, Lalande-de-Pomerol eller seriøs Chile-merlot. Perfekt til pasta og svinekød. Forvent venlig struktur, ikke dyb lagringsprofil.",
  "bedste-merlot-under-150-kr":
    "I 150 kr-klassen åbner **Saint-Émilion Grand Cru** (ikke Premier) og Pomerol-satellitter med mere lag og finesse. Merlot får her plads til **chokolade, blomme og blødere tannin** uden at blive tung. God mellemting til gæstemiddag.",
  "bedste-pinot-grigio-under-100-kr":
    "Pinot grigio under 100 kr er **aperitivo- og fiskevin**: citrus, salt og lav kompleksitet. Alto Adige og Friuli slår generisk norditaliensk bulk. Drik **køligt og ungt** — flasken falder hurtigt efter et år på hylden.",
  "bedste-pinot-grigio-under-150-kr":
    "Ved 150 kr får pinot grigio **mere tekstur og bitter citrus** — især fra Alto Adige, Friuli og Oregon pinot gris. Sammenlign med Alsace pinot gris: samme drue, mere fedme. Her begynder hvidvinen at have personlighed.",
  "bedste-pinot-noir-under-150-kr":
    "Pinot noir omkring 150 kr er **madpinot**, ikke prestige-pinot: Oregon, Marlborough og Bourgogne Chalonnaise giver rødbær og silke uden Côte de Nuits-pris. Forvent frugt frem for kompleks lagring — perfekt til kylling og svampe.",
  "bedste-pinot-noir-under-250-kr":
    "250 kr er **Bourgogne Villages/Premier Cru** eller Oregon single-vineyard-territorium. Her betaler du for **terroir, lavt udbytte og lagringspotentiale** — ikke bare druenavnet. Flasken fortjener kølig opbevaring og kan udvikle sig **5–8 år**.",
  "bedste-riesling-under-100-kr":
    "Riesling under 100 kr handler om **trocken og frisk syre** fra Mosel, Nahe eller Pfalz — ikke sød supermarkeds-riesling. Flasken er **madvin til asiatisk og fisk**. Tjek altid om vinen er tør (*trocken*) før køb.",
  "bedste-riesling-under-150-kr":
    "100–150 kr åbner **bedre tyske Gutswein**, Alsace og Clare Valley med tydeligere mineral og frugt. Her kan du vælge **tør, feinherb eller let sød** bevidst. Riesling viser i denne klasse, hvorfor den er en af verdens mest alsidige druer.",
  "bedste-sangiovese-under-100-kr":
    "Sangiovese under 100 kr er **Chianti Classico og Rosso di Montalcino** til hverdagspris: syre, kirsebær og tomat-venlig struktur. Flasken skal være **drikkebar nu** til pasta og pizza — ikke gemt til lagring.",
  "bedste-sangiovese-under-150-kr":
    "Ved 150 kr kommer **Riserva Chianti** og Rosso di Montalcino med mere dybde og fad uden Brunello-pris. Sangiovese får her **mere tannin og urter** — stadig italiensk madvin, men med mere pondus til gæster.",
  "bedste-sauvignon-blanc-under-100-kr":
    "Sauvignon under 100 kr skal smage **frisk og grøn** — Touraine, Pays d'Oc eller Marlborough entry. Det er brunch-, salat- og fiskevin. Drik inden for **12 måneder**; sauvignon mister aromatik hurtigt.",
  "bedste-sauvignon-blanc-under-150-kr":
    "150 kr bringer **Sancerre/Pouilly-Fumé village** eller seriøs Marlborough single-vineyard. Loire giver sten og citrus; New Zealand tropisk frugt — to stilarter til samme pris. Vælg efter mad, ikke efter hype.",
  "bedste-syrah-under-100-kr":
    "Syrah under 100 kr er **grill- og grydevin**: Côtes du Rhône, Crozes-light eller australsk shiraz med peber og frugt. Undgå overmoden «fruit bomb» i varme årgange. Drik **let afkølet** til BBQ og simregryde.",
  "bedste-syrah-under-150-kr":
    "100–150 kr åbner **Saint-Joseph**, Cornas-junior og Swartland syrah med mere peber og struktur. Nord-Rhône giver syre; Barossa giver frugt — begge findes i klassen. Her begynder syrah at føles som en bevidst stilvalg.",
  "bedste-tempranillo-under-100-kr":
    "Tempranillo under 100 kr er **Rioja Crianza og Ribera Roble**: moden frugt, blid struktur, klar madmatch til tapas og lam. Flasken er klar nu — Reserva hører til 150 kr+. Tjek **Crianza vs. Joven** på etiketten.",
  "bedste-tempranillo-under-150-kr":
    "Ved 150 kr får du **Rioja Reserva** og seriøs Ribera med **tydelig fad og længere modning**. Tempranillo viser her vanilje, læder og moden frugt uden Gran Reserva-pris. God til gæster og simregryde.",
  "bedste-albarino-under-150-kr":
    "Albariño omkring 150 kr er **skaldyr- og sommerhvid** med salt, citrus og struktur fra Rías Baixas eller Minho. Flasken skal være **knastør og kølig** — perfekt til grillfisk og sushi. Drik ungt for max salinitet.",
};

/** Unik afslutning i «Faldgruber» — erstatter lager-boilerplate. */
const LAGER_ERSTATNING_BY_SLUG = {
  "bedste-cabernet-sauvignon-under-100-kr":
    " Tjek **årgang på etiketten** hos forhandleren — ung cabernet under 100 kr skal helst ikke have stået et år i varmt butikslager.",
  "bedste-cabernet-sauvignon-under-150-kr":
    " Spørg forhandleren om **lagring** — 150 kr-cabernet kan allerede være drikkemodne og bør ikke stå for varmt.",
  "bedste-cabernet-sauvignon-under-200-kr":
    " Ved 200 kr kan **2–4 år gammel årgang** være bedre køb end nyeste release — sammenlign årgange i søgeresultatet.",
  "bedste-chardonnay-under-100-kr":
    " Hvidvin under 100 kr skal være **frisk** — undgå flasker med uklar årgang eller gulnende etiket i butikken.",
  "bedste-chardonnay-under-150-kr":
    " **Petit Chablis** og village-chardonnay holder bedst, når de er **1–3 år gamle** — for gammel hvid kan miste frugt.",
  "bedste-chenin-blanc-under-150-kr":
    " Chenin er følsom over for varme — køb fra forhandler med **køligt vinlager** eller kort transportvej.",
  "bedste-grenache-under-100-kr":
    " Grenache under 100 kr tåler ikke **hed butikshyld** — varm flaske smager alkoholstungere end nødvendigt.",
  "bedste-grenache-under-150-kr":
    " Sammenlign **årgang** — grenache fra meget varme år kan føles overmoden allerede i 150 kr-klassen.",
  "bedste-malbec-under-100-kr":
    " Argentinsk malbec under 100 kr er **ungdomsvin** — køb den til at drikke inden for 12–18 måneder.",
  "bedste-malbec-under-150-kr":
    " Reserva malbec bør have **tydelig årgang** — undgå flasker, hvor butikken ikke kan bekræfte lagring.",
  "bedste-merlot-under-100-kr":
    " Merlot under 100 kr falder hurtigt ved varme — vælg forhandler med **temperaturkontrol** når muligt.",
  "bedste-merlot-under-150-kr":
    " 150 kr-merlot fra Bordeaux kan være **moden nok til at drikke nu** — tjek om årgangen er 3–5 år.",
  "bedste-pinot-grigio-under-100-kr":
    " Pinot grigio mister aromatik hurtigt — køb **nyeste årgang** og undgå flasker med bleget etiket i sol.",
  "bedste-pinot-grigio-under-150-kr":
    " Alto Adige-pinot holder længere end bulk — men **2+ år på hylden** er stadig et rødt flag.",
  "bedste-pinot-noir-under-150-kr":
    " Pinot under 150 kr er **følsom** — kølig transport og frisk årgang betyder mere end ved tunge røde.",
  "bedste-pinot-noir-under-250-kr":
    " Ved 250 kr er **opbevaring afgørende** — pinot fra varm butik kan allerede være udviklet for hurtigt.",
  "bedste-riesling-under-100-kr":
    " Tysk riesling under 100 kr skal være **knastør og ung** — halvtør restlager i butikken smager fladt.",
  "bedste-riesling-under-150-kr":
    " Sammenlign **Kabinett trocken**-årgange — riesling i 150 kr-klassen lever af frisk syre.",
  "bedste-sangiovese-under-100-kr":
    " Chianti under 100 kr er **ungdomsvin** — undgå meget gamle årgange til hverdagspris i ukendt butik.",
  "bedste-sangiovese-under-150-kr":
    " Riserva sangiovese skal have **balanceret modning** — spørg om årgang, hvis etiketten er slidt.",
  "bedste-sauvignon-blanc-under-100-kr":
    " Sauvignon mister duft hurtigt — køb **ny høst** og drik inden for et år efter køb.",
  "bedste-sauvignon-blanc-under-150-kr":
    " Sancerre ved 150 kr skal smage **frisk** — gul etiket og varm hyld er tegn på for gammel flaske.",
  "bedste-syrah-under-100-kr":
    " Syrah/shiraz under 100 kr i **varme årgange** kan virke syltet — vælg køligere årgang eller Rhône.",
  "bedste-syrah-under-150-kr":
    " 150 kr-syrah fra Barossa kan være **alkoholtung** — nord-Rhône giver ofte mere balance til mad.",
  "bedste-tempranillo-under-100-kr":
    " Rioja Crianza skal være **drikkebar** — meget gammel Crianza til 80 kr er sjældent et godt tegn.",
  "bedste-tempranillo-under-150-kr":
    " Reserva tempranillo kræver **frisk årgang eller korrekt lagring** — fad kan dominere, hvis vinen er varmslået.",
  "bedste-albarino-under-150-kr":
    " Albariño lever af **friskhed og salt** — køb ny årgang og hold flasken kølig indtil servering.",
};

function replaceForventning(body, paragraph) {
  const headingMatch = body.match(/## Forventning ved[^\n]+/);
  if (!headingMatch) return null;
  const re = /## Forventning ved[^\n]+\n\n[\s\S]*?\n## /;
  if (!re.test(body)) return null;
  return body.replace(re, `${headingMatch[0]}\n\n${paragraph}\n\n## `);
}

let changed = 0;

for (const slug of Object.keys(FORVENTNING_BY_SLUG)) {
  const fp = path.join(guidesDir, `${slug}.mdx`);
  if (!fs.existsSync(fp)) {
    console.warn(`Mangler: ${slug}`);
    continue;
  }
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);
  let newContent = replaceForventning(content, FORVENTNING_BY_SLUG[slug]);
  if (!newContent) continue;

  const lager = LAGER_ERSTATNING_BY_SLUG[slug];
  if (lager && LAGER_BOILERPLATE.test(content)) {
    LAGER_BOILERPLATE.lastIndex = 0;
    newContent = newContent.replace(LAGER_BOILERPLATE, lager);
  }

  if (newContent.trim() === content.trim()) continue;

  if (!dryRun) {
    data.updated = TODAY;
    fs.writeFileSync(fp, matter.stringify(newContent, data));
  }
  changed++;
}

console.log(dryRun ? `[dry-run] Ville opdatere ${changed} guides` : `Opdateret ${changed} guides`);
