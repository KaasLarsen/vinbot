#!/usr/bin/env node
/**
 * Udvider bedste-* guides under 400 ord med drue-specifikke afsnit (unikke per slug).
 * Mål: ≥520 ord for indeksering (MIN_INDEXABLE_WORDS = 400 + buffer).
 *
 * Kør: node scripts/expand-thin-bedste-guides.mjs
 * Dry-run: node scripts/expand-thin-bedste-guides.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import readingTime from "reading-time";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guidesDir = path.join(__dirname, "../content/guides");
const dryRun = process.argv.includes("--dry-run");
const TODAY = "2026-07-19";
const MIN_WORDS = 400;
const TARGET = 520;

/** Unikt afsnit per slug — undgå boilerplate fra expand-guides-400-600.mjs */
const UNIQUE_SECTION = {
  "bedste-merlot-under-100-kr": {
    heading: "## Merlot til hverdagsretter i Danmark",
    body: `Til **frikadeller**, **forloren hare** og **pasta med kødsovs** er merlot under 100 kr et sikkert valg: blød frugt uden hård tannin. **Côtes de Bourg** og **Colchagua**-flasker fra danske netbutikker holder typisk 2–3 år — køb frisk årgang (2022–2024) frem for gammel restparti på hylden. Sammenlign [vin til frikadeller](/guides/vin-til-frikadeller) og [bedste rødvin under 100 kr](/guides/bedste-rodvin-under-100-kr) hvis du vil have bredere valg end ren merlot.`,
  },
  "bedste-merlot-under-150-kr": {
    heading: "## Upgrade fra 100 til 150 kr",
    body: `Springet fra 100 til 150 kr giver ofte **Saint-Émilion Grand Cru**-niveau eller **Pomerol-satellitter** med mere moden frugt og blødere finish. Det mærkes især til **oksesteg**, **kalv** og **lagret ost**. Tjek årgang på etiketten: merlot i denne klasse kan stå 3–5 år, men drik gerne indenfor 2 år efter køb hvis flasken står varmt hjemme.`,
  },
  "bedste-sauvignon-blanc-under-100-kr": {
    heading: "## Sauvignon til dansk sommer og fisk",
    body: `**Touraine** og **Marlborough entry** passer til **gravad laks**, **røget makrel** og **grøn salat** — klassiske danske sommerretter. Sauvignon under 100 kr skal drikkes **ung** (indenfor 1–2 år); aromatikken falder hurtigt efter åbning, så gem resten i køleskab med prop og drik indenfor 2 dage. Se [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr) for bredere hvidvalg.`,
  },
  "bedste-sauvignon-blanc-under-150-kr": {
    heading: "## Loire vs. New Zealand i 150 kr-klassen",
    body: `Vælg **Sancerre village** for sten og citrus til **muslinger** og **gedeost**, eller **seriøs Marlborough** for tropisk frugt til **kylling** og **asiatisk salat**. Prisforskellen mellem forhandlere kan være 30–50 kr på samme årgang — brug Vinbots søgning før du låser indkøb. [Sauvignon blanc-druen](/guides/sauvignon-blanc-druen) forklarer stilforskelle dybere.`,
  },
  "bedste-albarino-under-150-kr": {
    heading: "## Albariño til skaldyr og tapas",
    body: `**Rías Baixas** albariño med salt og citrus er bygget til **rejer**, **muslinger** og **ceviche** — perfekt til dansk sommer og julefrokostens skaldyrsretter. Under 150 kr: kig efter **Val do Salnés**-producenter frem for generiske «Spanish white». Server **8–10 °C**; for kold vin skjuler saliniteten sig.`,
  },
  "bedste-sangiovese-under-100-kr": {
    heading: "## Chianti til pasta og pizza",
    body: `**Chianti Classico** og **Rosso di Montalcino** under 100 kr er hverdagshelte til **tomatsauce**, **pizza** og **lasagne**. Syren skærer gennem ost og fedme — derfor sangiovese slår blød merlot på mange italienske retter. Undgå «Reserva»-marketing under 90 kr uden DOC/GDOCG; se [vin til pizza og pasta](/guides/vin-til-pizza-og-pasta).`,
  },
  "bedste-sangiovese-under-150-kr": {
    heading: "## Riserva og gæstemiddag",
    body: `I 100–150 kr-klassen kan **Chianti Riserva** og **seriøs Rosso di Montalcino** bære **bøf**, **vildt** og **hård ost** bedre end basis-Chianti. Flasken kan ofte stå 1–2 år, men sangiovese er ikke lagringsvin som Barolo — drik indenfor 3–4 år fra årgang.`,
  },
  "bedste-grenache-under-100-kr": {
    heading: "## Grenache til grill og gryde",
    body: `**Campo de Borja**, **Côtes du Rhône** og **Navarra** grenache giver moden bærfrugt til **grillpølser**, **spareribs** og **gryderet**. Grenache tåler let afkøling (14–15 °C) om sommeren. Sammenlign med [vin til grill og BBQ](/guides/vin-til-grill-og-bbq) hvis menuen er fed og røget.`,
  },
  "bedste-grenache-under-150-kr": {
    heading: "## Rhône-villages og madmatch",
    body: `**Gigondas**, **Vacqueyras** og **Montsant** under 150 kr giver mere peber og urter end basis-grenache — ideelt til **lam**, **svinekam** og **BBQ med sød glasur**. Tjek alkoholprocenten: grenache over 14,5 % kan føles varm i glasset på en hed terrasse.`,
  },
  "bedste-chenin-blanc-under-150-kr": {
    heading: "## Tør, halvtør eller sød?",
    body: `Chenin under 150 kr findes som **sec**, **demi-sec** og **moelleux** — læs etiketten før køb. **Tør chenin** (Loire, Swartland) til **fisk** og **salat**; **off-dry** til **krydret mad** og **blå ost**. Halvtør chenin til stærk thai overrasker ofte positivt; se [riesling til asiatisk mad](/guides/riesling-til-asiatisk-mad) for sammenligning.`,
  },
  "bedste-riesling-under-100-kr": {
    heading: "## Trocken til asiatisk takeaway",
    body: `**Mosel**, **Nahe** og **Pfalz trocken** under 100 kr er blandt de bedste hverdagsvine til **thai**, **vietnamesisk** og **sushi** — syre og let sødme balancerer chili og soja. Tjek **«trocken»** eller **«dry»** på etiketten; halvtør riesling kan dominere milde retter. [Vin til thai mad](/guides/vin-til-thai-mad) går dybere i parring.`,
  },
  "bedste-riesling-under-150-kr": {
    heading: "## Gutswein og Alsace i praksis",
    body: `**Gutswein** fra Mosel og **Alsace** riesling i 100–150 kr giver mineral og frugt til **fisk**, **flæskesteg** (hvidvin-version) og **ostebord**. Ældre årgange på tilbud kan være gode køb, men riesling under 150 kr drikkes bedst indenfor 3–5 år — undtagen søde stilarter.`,
  },
  "bedste-malbec-under-100-kr": {
    heading: "## Malbec til bøf og burger",
    body: `**Luján de Cuyo** og **Uco Valley** malbec under 100 kr er klassisk til **hakket bøf**, **burger** og **entrecôte**. Moden frugt og blød struktur kræver ikke karaffel — server 16–17 °C. Undgå «premium blend» uden Mendoza-oprindelse; se [malbec til bøf](/guides/malbec-til-boef) og [vin til bøf](/guides/vin-til-boeff).`,
  },
  "bedste-malbec-under-150-kr": {
    heading: "## Reserva og grillfest",
    body: `Malbec 100–150 kr med **Reserva**-lagring giver mere dybde til **grillet okse** og **lammekoteletter**. Cahors (fransk malbec) er pebret alternativ til argentinsk frugt — prøv begge til samme ret og mærk forskellen. Sammenlign pris på [tilbud](/tilbud) før stor indkøbsrunde.`,
  },
  "bedste-syrah-under-100-kr": {
    heading: "## Rhône til hverdagskød",
    body: `**Côtes du Rhône** og **Crozes-Hermitage entry** under 100 kr leverer peber og mør bær til **svinekød**, **pizza** og **gryderet**. Undgå overmoden «fruit bomb» shiraz fra meget varme år — de kan smage varme og alkoholstærke. [Syrah-druen](/guides/syrah-druen) og [vin til grill](/guides/vin-til-grill-og-bbq) supplerer.`,
  },
  "bedste-syrah-under-150-kr": {
    heading: "## Nord-Rhône peber vs. Barossa frugt",
    body: `I 150 kr-klassen kan du vælge mellem **Saint-Joseph**-stil (peber, syre) og **seriøs Barossa** (moden frugt). Første til **lam** og **svampe**; sidste til **BBQ** og **burgere**. Afkøl let syrah om sommeren — 15–16 °C tæmmer alkoholfornemmelsen.`,
  },
  "bedste-chardonnay-under-100-kr": {
    heading: "## Unwooded chardonnay til fisk",
    body: `**Mâcon**, **Limoux** og **unwooded Australien** under 100 kr passer til **torsk**, **laks** og **kylling i flødesauce** uden at dominere. Undgå tung, varm-climate fad-chardonnay i denne pris — den bliver smør-tung. Se [chardonnay til fisk](/guides/chardonnay-til-fisk) og [vin til torsk](/guides/vin-til-torsk).`,
  },
  "bedste-tempranillo-under-100-kr": {
    heading: "## Rioja Crianza til tapas",
    body: `**Rioja Crianza** og **Ribera Roble** under 100 kr er tapas- og **pintxo**-venlige: moden frugt, blød tannin, vanilje fra kort fad. Perfekt til **chorizo**, **manchego** og **patatas bravas**. Drik ung — Crianza er ikke lagringsvin. [Vin til tapas](/guides/vin-til-tapas) og [spansk mad](/guides/vin-til-spansk-mad).`,
  },
  "bedste-tempranillo-under-150-kr": {
    heading: "## Reserva til gæster",
    body: `**Rioja Reserva** og **seriøs Ribera** i 100–150 kr tåler **okse**, **lam** og **juleand** bedre end Crianza. Tjek **årgang**: Reserva fra 2018–2020 kan være moden nu; yngre årgange kan trænge 6–12 måneders hvile. Sammenlign [bedste spansk rødvin](/guides/bedste-spansk-rodvin).`,
  },
  "bedste-cabernet-sauvignon-under-100-kr": {
    heading: "## Cabernet uden Bordeaux-pris",
    body: `**Haut-Médoc**, **Castillon** og **Maipo** cabernet under 100 kr giver struktur til **bøf** og **burger** uden Côte de Pauillac-pris. Undgå «smooth red blend» uden appellation. Flasken skal have **tydelig frugt** — hvis den kun smager af fad og tørhed, er det ofte bulk. [Cabernet sauvignon-druen](/guides/cabernet-sauvignon-druen).`,
  },
  "bedste-cabernet-sauvignon-under-150-kr": {
    heading: "## Junior-Médoc og Chile-Reserva",
    body: `100–150 kr cabernet: **Médoc Cru Bourgeois-niveau**, **Colchagua Reserva** og **Coonawarra entry** giver mere lag og blåbær end basis-appellationer. Server 16–17 °C til rødt kød; afkøl ikke for meget — cabernet mister frugt under 14 °C.`,
  },
  "bedste-cabernet-sauvignon-under-200-kr": {
    heading: "## Når budgettet rækker til fest",
    body: `Under 200 kr åbner **Cru Bourgeois**, **modne Napa entry** og **seriøs Chile-Gran Reserva**. Flasken her fortjener **dekantering 30–60 min** ved ung tannin. Gem til **oksesteg**, **vildt** og **gæstemiddag** — ikke hverdagsgryde. [Vin til oksekød](/guides/vin-til-oksekoed).`,
  },
  "bedste-pinot-grigio-under-100-kr": {
    heading: "## Pinot grigio til let mad",
    body: `**Alto Adige** og **Friuli** pinot grigio under 100 kr slår generisk norditaliensk bulk med mere bitter mandel og struktur. Ideel til **salat**, **fisk filet** og **let pasta**. Drik **8–10 °C**; pinot grigio mister charme når den står lunken på terrassen.`,
  },
  "bedste-pinot-grigio-under-150-kr": {
    heading: "## Pinot gris med mere krop",
    body: `100–150 kr: **Oregon pinot gris** og **Alsace pinot blanc/gris** giver mere tekstur til **flødesauce**, **skaldyr** og **oste**. Sammenlign med [bedste hvidvin under 150 kr](/guides/bedste-hvidvin-under-150-kr) hvis du vil overveje chardonnay og albariño i samme pris.`,
  },
  "bedste-pinot-noir-under-150-kr": {
    heading: "## Madpinot til kylling og svampe",
    body: `**Oregon**, **Marlborough** og **Bourgogne Chalonnaise** pinot under 150 kr er bygget til **kylling**, **and**, **svampe** og **laks** (lettere stegning). Undgå ung, ekstrakt-tung pinot — den skal føles **silkeblød**, ikke tør. Se [pinot noir-druen](/guides/pinot-noir-druen) og [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
  },
};

function insertBeforeAnchor(body, section) {
  const block = `\n${section.heading}\n\n${section.body}\n`;
  const anchors = [
    "\n## Sammenlign",
    "\n## Søg",
    "\n## Læs mere",
  ];
  for (const a of anchors) {
    const i = body.indexOf(a);
    if (i !== -1) return body.slice(0, i) + block + body.slice(i);
  }
  return body.trimEnd() + block;
}

let updated = 0;
let skipped = 0;

for (const file of fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"))) {
  const slug = file.replace(/\.mdx$/, "");
  const section = UNIQUE_SECTION[slug];
  if (!section) continue;

  const fp = path.join(guidesDir, file);
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);
  const words = readingTime(content).words;

  if (words >= MIN_WORDS && words >= TARGET) {
    skipped++;
    continue;
  }
  if (content.includes(section.heading)) {
    skipped++;
    continue;
  }

  const newContent = insertBeforeAnchor(content, section);
  const newWords = readingTime(newContent).words;

  if (!dryRun) {
    data.updated = TODAY;
    fs.writeFileSync(fp, matter.stringify(newContent, data));
  }
  updated++;
  console.log(`${dryRun ? "[dry] " : ""}${slug}: ${words} → ${newWords} ord`);
}

console.log(dryRun ? `Dry-run: ${updated} ville opdateres, ${skipped} sprunget over` : `Opdateret ${updated} guides, sprunget over ${skipped}`);
