#!/usr/bin/env node
/** Batch 80→110: opret 31 nye opskrifts-MDX-filer og opdater guide-recipe-links. */
import fs from "node:fs";
import path from "node:path";

const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");
const GUIDE_LINKS_PATH = path.join(process.cwd(), "lib", "growth", "guide-recipe-links.ts");
const UPDATED = "2026-06-10";

function yamlQuote(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function yamlList(items, indent = 0) {
  const pad = " ".repeat(indent);
  return items.map((i) => `${pad}- ${yamlQuote(i)}`).join("\n");
}

function buildExpansion(r) {
  const dish = r.title.split("—")[0].trim();
  const guides = r.relatedGuides
    .slice(0, 2)
    .map((g) => `[${g}](/guides/${g})`)
    .join(" · ");
  const specific = SLUG_EXPANSIONS[r.slug] ?? "";
  return `## Planlægning og råvarer

${dish} med vin i gryden starter med at vælge rigtig flaske til ${r.wineInRecipe.amount.toLowerCase()}. ${r.wineInRecipe.style} giver den syre og frugt, som retten har brug for — det er ikke snik-snak, men smagsbalance mod fedt, salt og krydderier. Læs ${guides} og [madlavning med vin i sauce](/guides/sadan-bruger-du-vin-til-sauce-og-simren) for baggrund. Opskriften er til ${r.servings} personer; prep og koketid følger frontmatter.

${specific}

## Smagsbalance og justering

Smag til undervejs: mangler dybde, reducer saucen længere. For tung ret, tilsæt frisk syre — citron, eddike eller urter. Vin i gryden skal smage integreret, aldrig rå alkohol. Samme princip som [lasagne med rødvin](/opskrifter/lasagne-med-rodvin) og [spanske kødboller i rødvinsauce](/opskrifter/spansk-koedboller-i-rodvinsauce). Til glasset: [${r.wineToDrink.label}](/guides/${r.wineToDrink.guideSlug}) — match syre og frugt til det, du har i gryden. Mange retter smager bedre næste dag; se opbevaring ovenfor.`;
}

/** Ekstra slug-specifik tekst (~80 ord) for ≥400 ord i body. */
const SLUG_EXPANSIONS = {
  "nachos-med-rodvinskaesesovs":
    "Nachos tåler ikke at stå længe efter gratinering — saml fadet lige før gæsterne spiser. Brug gerne to ostetyper for stretch og smag. Rødvinsreduktionen kan laves forud og varmes med fløde ved samling.",
  "shawarma-kylling-med-hvidvin":
    "Shawarma-marinen trænger bedst ind natten over i køleskab. Skær kylling i ens strimler — tykkere strimler kræver længere stegning og kan blive tørre i kanten. Varm pitabrød inden fyldning.",
  "burger-med-rodvinsglace":
    "Form bøffer med let hånd — tætpakket kød bliver tungt. Lad bøffer hvile 2 minutter efter stegning før glace hældes over. Glace kan laves i forvejen og varmes med smør ved servering.",
  "carbonara-med-hvidvin":
    "Brug frisk pecorino og rigtig guanciale hvis muligt — bacon er nødløsning. Tag panden helt af varme før æg tilsættes; brug varm, ikke kogende bund. Server straks — carbonara venter ikke.",
  "pho-kylling-med-hvidvin":
    "Klar bouillon er vietnamesisk ideal — si tålmodigt. Stjerneanis og kanel skal være hele — de giver aroma uden grit. Fiskesauce tilsættes til sidst i små mængder.",
  "ramen-kylling-med-hvidvin":
    "Skum bouillonen for klar suppe. Miso-rør i til sidst på lavere varme. Æg koges præcis — iskyl for let skrælning. Nori lægges på ved servering, ikke i gryden.",
  "tacos-med-rodvin-okse":
    "Okse skal falde fra hinanden efter simring — gaffel-test. Reducer sauce til glasur der klæber til kød. Varm tortillas i tør pande eller over gasblus for fleksibilitet.",
  "couscous-kylling-med-hvidvin":
    "Couscous damper i grydens restvarme — tag den fra varme og lad stå under låg. Rist krydderier i olie før væske. Frisk persille og citron til sidst.",
  "karrykylling-med-hvidvin":
    "Steg karrypasta i fedt før væske — det frigør aroma. Halvtør riesling matcher medium styrke. Basmatiris skylles for løs konsistens.",
  "ceviche-med-hvidvin":
    "Brug sushi-kvalitets fisk. Marinér kort — fisk skal stadig have tekstur. Server på kolde tallerkener. Mango og chili skærer igennem syre.",
  "sild-i-hvidvinseddike":
    "Lage skal være kold før sild lægges i. Tynde løgringe trækker bedre. Marinér minimum 24 timer — gerne 48. Rugbrød og smør er klassisk.",
  "quiche-med-hvidvin":
    "Forbag bund med bagepapir og tør bønner. Æggeblanding må ikke boble — pisk jævnt. Hvil quiche 10 min efter ovn — skærer pænere.",
  "pad-thai-med-hvidvin":
    "Wok skal være rygende varm. Nudler blødes, ikke koges færdige. Tamarind opløses i hvidvin før wok. Peanuts ristes frisk.",
  "bouillabaisse-med-hvidvin":
    "Tilsæt fisk efter fasthed — torsk først, blød fisk til sidst. Safran blødes i lun vin. Rouille på ristet brød er obligatorisk for mange.",
  "kylling-cacciatore-med-rodvin":
    "Brun kylling i dele — fond i gryden. Oliven tilsættes sent. Sangiovese eller chianti er tradition. Server med brød til sauce.",
  "fasan-med-rodvin":
    "Fasan tåler ikke overkogning — brug termometer. Bacon giver fedt magert kød mangler. Sauce si'es for silkeblød glace.",
  "grydestegt-kylling-med-hvidvin":
    "Låg de første 45 min for saft; tag låg af til sidst for sprød hud. Hvil kylling 10 min. Sauce reduceres fra grydevæske.",
  "fiskefilet-citron-hvidvin":
    "Tør fisk før stegning. Steg i smør uden at bevæge for meget før skorpe. Smør piskes i saucen til sidst — emulsion.",
  "grillet-laks-hvidvin-dressing":
    "Reducer hvidvin til dressing — rå vin er hård. Laks grilles skind ned. Dild frisk, ikke tør. Asparges grilles med laks.",
  "kebab-spyd-med-rodvin":
    "Marinér minimum 4 timer. Skær ens tern for jævn grilling. Lad kød hvile efter grill. Varm pita inden fyldning.",
  "falafel-tallerken-med-hvidvin":
    "Falafel steges sprøde — blød falafel er kedelig. Hummus glattes med olie på top. Tahin fortyndes langsomt.",
  "lammegryde-mynte-hvidvin":
    "Skulder giver mørhed ved lang simring. Frisk mynte til sidst — tør i gryden. Couscous damper i restvarme.",
  "andebaer-portvin-sauce":
    "Skind steges ned til sprød — pas på fedt. Portvin reduceres til glace. And hviler 5 min før skæring.",
  "aeblekage-hvidvin-karamel":
    "Syrlige æbler balancerer sød bund. Karamel tilsæt vin langsomt — sprøjt. Bund vendes mens varm.",
  "risalamande-med-hvidvin":
    "Grød afkøles helt før fløde. Gem helt mandel til juleleg. Kirsebærsauce varm ved siden af.",
  "shakshuka-med-hvidvin":
    "Sauce skal være tyk nok til at holde æg. Låg på til stegte hvider, runny gul. Feta til sidst.",
  "gnocchi-rodvinssauce":
    "Gnocchi koges til de flyder — straks op. Sauce skal klæbe, ikke svømme. Parmesan rives ved bordet.",
  "pesto-pasta-hvidvin":
    "Pesto må ikke koges — varm ved samling. Pastavand er vigtigt. Cherrytomater rå til kontrast.",
  "vegetar-gryderet-rodvin":
    "Linser tilsættes efter rodfrugter. Simr på lav varme. Smager bedre dagen efter.",
  "wok-rejer-hvidvin":
    "Rejer tørres — våde rejer koger. Max 3 min i wok. Sesam ristes til topping.",
  "dim-sum-kylling-hvidvin":
    "Fyld ikke for meget — dumplings brister. Damp 12 min uden at åbne. Soja og chili-olie ved siden af.",
};

function buildBody(r) {
  const tips = r.tips.map(([t, d]) => `- **${t}:** ${d}`).join("\n");
  const mistakes = r.mistakes.map((m) => `- ${m}`).join("\n");
  return `${r.intro}

## ${r.whyTitle}

${r.why}

## Tips til perfekt resultat

${tips}

## Tilbehør og servering

${r.serving}

## Fejl at undgå

${mistakes}

## Opbevaring og variationer

${r.storage}

## Vin i glasset

${r.glass}

${buildExpansion(r)}

${buildClosing(r)}
`;
}

function buildClosing(r) {
  const tagStr = r.tags.filter((t) => t !== "opskrift").join(", ");
  return `## Afsluttende bemærkninger

Opskriften hører hjemme i kategorierne ${tagStr} — og viser, at vin i gryden ikke kun er til franske klassikere. ${r.wineInRecipe.note} Første gang du laver retten, følg mængden vin nøje; derefter kan du justere efter smag. Smag saucen eller fyldet, før du serverer, og spørg dig selv om der mangler syre, salt eller frugt — små justeringer gør stor forskel.

Har du rester af samme flaske, brug den i glasset via [${r.wineToDrink.label}](/guides/${r.wineToDrink.guideSlug}). Alternativt søg efter vine med samme profil: ${r.wineInRecipe.style.toLowerCase()}. Læs også de relaterede guider i frontmatter for flere parringsidéer. God appetit — og læs trinene én gang igennem, før du starter, så kogetiden falder naturligt.`;
}

function buildMdx(r) {
  const fm = `---
title: ${yamlQuote(r.title)}
description: ${yamlQuote(r.description)}
slug: ${r.slug}
updated: ${yamlQuote(UPDATED)}
tags: [${r.tags.map(yamlQuote).join(", ")}]
prepTime: ${yamlQuote(r.prepTime)}
cookTime: ${yamlQuote(r.cookTime)}
servings: ${r.servings}
difficulty: ${r.difficulty}
wineInRecipe:
  style: ${yamlQuote(r.wineInRecipe.style)}
  amount: ${yamlQuote(r.wineInRecipe.amount)}
  note: ${yamlQuote(r.wineInRecipe.note)}
wineToDrink:
  guideSlug: ${r.wineToDrink.guideSlug}
  searchQuery: ${yamlQuote(r.wineToDrink.searchQuery)}
  searchMax: ${r.wineToDrink.searchMax}
  label: ${yamlQuote(r.wineToDrink.label)}
relatedGuides:
${yamlList(r.relatedGuides, 2)}
ingredients:
${yamlList(r.ingredients, 2)}
instructions:
${yamlList(r.instructions, 2)}
---

${buildBody(r)}`;
  return fm;
}

function countBodyWords(mdx) {
  const parts = mdx.split("---");
  const body = parts.slice(2).join("---").trim();
  return body.split(/\s+/).filter(Boolean).length;
}

const RECIPES = [
  {
    slug: "nachos-med-rodvinskaesesovs",
    title: "Nachos med rødvinskaesesovs — festmad med dybde",
    description: "Sprøde nachos med hjemmelavet ostesovs reduceret med rødvin, bønner og jalapeños. Opskrift til 4–6 som hovedret eller deleret.",
    tags: ["opskrift", "mexicansk", "nachos", "rødvin", "hverdag"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Ung, syrlig rødvin — tempranillo, gamay eller pinot noir",
      amount: "100 ml i kaesesovsens reduktion",
      note: "Rødvin giver frugt og syre til ost — kog ind før fløde så saucen ikke smager af alkohol.",
    },
    wineToDrink: {
      guideSlug: "vin-til-nachos",
      searchQuery: "nachos tempranillo gamay rødvin",
      searchMax: 120,
      label: "vin til nachos",
    },
    relatedGuides: ["vin-til-nachos", "vin-til-tacos", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "300 g tortillachips",
      "200 g revet cheddar og 100 g revet mozzarella",
      "100 ml ung rødvin",
      "2 dl fløde",
      "1 spsk smør",
      "1 spsk hvedemel",
      "1 dåse sorte bønner, drænet",
      "2 jalapeños i skiver",
      "1 rød løg i tern",
      "2 tomater i tern (pico de gallo)",
      "1 avocado i tern",
      "2 spsk creme fraiche",
      "Salt, peber og spansk paprika",
    ],
    instructions: [
      "Smelt smør, pisk mel i og tilsæt fløde under piskning. Kog 3 minutter.",
      "Hæld rødvin i og lad reducere 2–3 minutter til tyk creme.",
      "Rør ost i i portioner til smeltet sauce. Smag til med salt, peber og paprika.",
      "Fordel chips på fad, drys bønner og løg. Hæld halvdelen af ostesovs over.",
      "Gentag lag af chips og sauce. Top med jalapeños og resten af osten.",
      "Gratinér ved 200 °C i 8–10 minutter til bobler og gyldne kanter.",
      "Server med pico de gallo, avocado og creme fraiche.",
    ],
    intro: `Nachos med rødvinskaesesovs er mere end fredagssnack: sprøde tortillachips, cremet ost og en sauce med **frugtig dybde fra rødvin** i stedet for kun fløde og processed ost. Rødvin reduceres med fløde og smør, så syren skærer igennem fedt fra ost og guacamole — samme princip som i [chili con carne med rødvin](/opskrifter/chili-con-carne-med-rodvin). Det er festmad der stadig kan laves på 35 minutter, og som gør rest-rødvin til noget andet end gårsdagens glas.`,
    whyTitle: "Hvorfor rødvin i kaesesovs",
    why: `Ostesovs uden syre bliver tung og ensformig — især med cheddar og fløde. **Ung rødvin** tilfører frugt, let syre og struktur, så nachos ikke kun smager salt og fedt. Lad vinen koge ind i flødebasen før osten røres i; alkoholen fordamper, og frugten koncentreres. Tempranillo, gamay eller pinot noir fungerer bedst — undgå tunge, egetræsdrukne vine der kan give bitter eftersmag ved reduktion. Læs mere i [guide til madlavning med vin](/guides/sadan-bruger-du-vin-til-sauce-og-simren) og [vin til nachos](/guides/vin-til-nachos).`,
    tips: [
      ["Sprøde chips", "Brug tykke, stærke chips der tåler sauce — tynde chips bliver soggy i midten."],
      ["Lag", "Byg i to lag så ostesovs fordeler sig jævnt — ellers tør midten."],
      ["Rødvin", "Kog vinen 2–3 minutter i fløde før ost — rå alkohol-smag ødelægger nachos."],
      ["Gratinering", "Kort tid i ovnen — chips skal stadig knase under det smeltede lag."],
    ],
    serving: `Server nachos direkte fra fadet mens osten bobler. Tilbehør: guacamole, pico de gallo og creme fraiche dæmper chili og salt. Som deleret til 6 personer med [tacos med okse og rødvin](/opskrifter/tacos-med-rodvin-okse) og lime-dresset salat. Én flaske ung rødvin til bordet er passende — se [vin til tacos](/guides/vin-til-tacos).`,
    mistakes: [
      "For meget væske i sauce — vandige nachos i bunden af fadet.",
      "At springe reduktion over — flad ostesovs uden frugt.",
      "For længe i ovnen — brændte kanter og bløde chips overalt.",
      "Tung shiraz eller ung cabernet — bitter sauce til ost.",
    ],
    storage: `Nachos smager bedst frisk — genopvarmning gør chips bløde. Lav sauce og topping for sig; saml før servering. Sauce holder 3 dage i køleskab og kan bruges til burger eller gratin. **Variation:** Tilsæt hakket okse stegt med paprika, eller brug halvtør riesling i stedet for rødvin til mildere syre.`,
    glass: `Match gryde og glas: ung, syrlig rød med frugt til salt og ost — se [vin til nachos](/guides/vin-til-nachos). Gamay, tempranillo eller let zinfandel er sikre valg til jalapeños og guacamole.`,
  },
  {
    slug: "shawarma-kylling-med-hvidvin",
    title: "Shawarma-kylling med hvidvin — marinade og sauce",
    description: "Kylling marineret i krydderier og hvidvin, grillet eller stegt — server i pitabrød med tahin og salat. Opskrift til 4.",
    tags: ["opskrift", "mellemøstlig", "kylling", "hvidvin", "grill"],
    prepTime: "PT20M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin med syre — sauvignon blanc, pinot grigio eller albariño",
      amount: "150 ml i marinade + 50 ml i tahinsauce",
      note: "Hvidvin giver syre til yoghurt og krydderier — marinér mindst 2 timer.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kebab-og-shawarma",
      searchQuery: "shawarma kylling hvidvin riesling",
      searchMax: 120,
      label: "vin til shawarma",
    },
    relatedGuides: ["vin-til-kebab-og-shawarma", "vin-til-krydret-og-staerk-mad", "vin-til-kylling-og-lyst-koed"],
    ingredients: [
      "700 g kyllingelår uden ben i strimler",
      "150 ml tør hvidvin",
      "3 spsk olivenolie",
      "2 spsk citronsaft",
      "2 tsk spisskummen, koriander og paprika",
      "1 tsk kanel og allehånde",
      "4 fed hvidløg, revet",
      "Salt og peber",
      "50 ml hvidvin til tahinsauce",
      "3 spsk tahin rørt med 2 spsk vand og citron",
      "4 pitabrød, salat, tomat, rødløg og persille",
    ],
    instructions: [
      "Bland hvidvin, olie, citron, krydderier, hvidløg, salt og peber. Marinér kylling 2–8 timer.",
      "Steg kylling på høj varme i 8–10 minutter til gylden og gennemstegt — hvil 5 min.",
      "Rør tahin med vand, citron og 50 ml hvidvin til cremet sauce. Smag til.",
      "Varm pitabrød. Fyld med kylling, salat, tomat, løg og tahinsauce.",
      "Top med persille og evt. sumak. Server med pommes frites eller bulgur.",
    ],
    intro: `Shawarma-kylling med hvidvin er hverdags-luksus fra Mellemøstens gadekøkken: saftige strimler med krydderier, citron og **hvidvin i marinade og tahinsauce** der giver syre mod fed yoghurt og stegeskorpe. Det er ikke [wok-kylling med hvidvin](/opskrifter/wok-kylling-med-hvidvin), men samme europæiske trick — vin i gryden for balance. Server i pitabrød med salat og tahin, eller som tallerken med pommes — perfekt til [vin til kebab og shawarma](/guides/vin-til-kebab-og-shawarma).`,
    whyTitle: "Hvorfor hvidvin til shawarma",
    why: `Shawarma har **fedt, salt, krydderier og syrlig sauce** — uden frisk syre bliver kyllingen flad. Hvidvin i marinade gennemtrænger kødet og giver citrus-agtig friskhed sammen med citron. Ekstra hvidvin i tahinsauce gør den lettere og mindre tung end ren tahin. Brug tør, syrlig hvidvin — sauvignon blanc, pinot grigio eller albariño. Halvtør riesling kan bruges til mildere krydring. Marinér mindst to timer; natten over giver bedst resultat.`,
    tips: [
      ["Kyllingelår", "Lår er saftigere end bryst til shawarma — bryst kræver kortere stegning."],
      ["Høj varme", "Steg hårdt for stegeskorpe — shawarma skal have karamelliserede kanter."],
      ["Marinade", "Gem ikke rå marinade til sauce — kog den ned med ekstra vin hvis du vil bruge den."],
      ["Tahin", "Fortyn tahin langsomt med vand og vin — ellers klumper den."],
    ],
    serving: `Server som durum, pitabrød eller tallerken med pommes, hvid løg og pickles. Til fest: kombiner med [kebab-spyd med rødvin](/opskrifter/kebab-spyd-med-rodvin) og [falafel-tallerken med hvidvin](/opskrifter/falafel-tallerken-med-hvidvin). Frisk grøn salat med citron skærer igennem fedt.`,
    mistakes: [
      "For kort marinade — krydderier og vin når ikke ind i kødet.",
      "For lav stegning — kogt kylling uden stegeskorpe.",
      "Tung, egetræs-hvidvin — dominerer tahin og krydderier.",
      "At servere kold kylling — saften samler sig; lun kylling smager bedst.",
    ],
    storage: `Marineret rå kylling holder 24 timer i køleskab. Tilberedt kylling 3 dage — genvarm i pande. Tahinsauce 4 dage. Pitabrød fyldes først ved servering. **Variation:** Tilsæt harissa til marinade, eller brug lammekød i samme opskrift.`,
    glass: `Frisk hvid med syre eller let halvtør riesling til krydderier og tahin — se [vin til kebab og shawarma](/guides/vin-til-kebab-og-shawarma). Undgå tung chardonnay med meget eg.`,
  },
  {
    slug: "burger-med-rodvinsglace",
    title: "Burger med rødvinsglace — hjemmelavet bøf og dyb sauce",
    description: "Saftig bøfburger med rødvinsglace, cheddar og sprøde løg. Opskrift til 4 personer med ung rødvin i glace og glasset.",
    tags: ["opskrift", "burger", "rødvin", "oksekød", "hverdag"],
    prepTime: "PT20M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Ung rødvin med syre — gamay, pinot noir eller merlot",
      amount: "200 ml til rødvinsglace",
      note: "Glace reduceres med oksefond til sirup — vinen er selve saucen til burgeren.",
    },
    wineToDrink: { guideSlug: "vin-til-burger", searchQuery: "burger gamay pinot noir rødvin", searchMax: 150, label: "vin til burger" },
    relatedGuides: ["vin-til-burger", "sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-oksekoed"],
    ingredients: [
      "600 g hakket oksekød (15–20 % fedt)",
      "4 burgerboller",
      "200 ml ung rødvin",
      "150 ml oksefond",
      "1 spsk smør",
      "4 skiver cheddar",
      "2 rødløg i ringe, stegt sprøde",
      "Salat, tomat, pickles og sennep",
      "Salt og peber",
    ],
    instructions: [
      "Form bøffer, krydr med salt og peber. Steg 3–4 minutter pr. side til ønsket stegning.",
      "Tag bøffer ud. Hæld rødvin i panden, skrab bunden. Kog 3 minutter.",
      "Tilsæt fond, reducer til tyk glace på 5–8 minutter. Pisk smør i. Smag til.",
      "Grill boller kort. Byg burger: salat, bøf, cheddar, løg, glace, pickles.",
      "Server med pommes frites og ekstra glace ved siden af.",
    ],
    intro: `Burger med rødvinsglace løfter hverdagsmaden fra fastfood til restaurant-niveau: saftig bøf, smeltet cheddar og en **koncentreret rødvinsglace** der samler stegeskorpe, fond og frugt i én sauce. Det er samme reduktions-princip som [rødvinsauce til bøf](/opskrifter/roedvinssauce-til-boef) og [peberbøf med rødvinsauce](/opskrifter/peberboef-med-rodvinsauce) — vin i gryden, ikke kun i glasset. Se [vin til burger](/guides/vin-til-burger) for parring til dressing og pickles.`,
    whyTitle: "Hvorfor rødvinsglace på burger",
    why: `Burger har **fedt, salt, sød bolle og syrlige pickles** — uden syre og frugt dominerer ost og mayo. Rødvinsglace tilfører koncentreret syre og dybde fra stegeskorpe og fond. Ung gamay, pinot noir eller merlot reduceres til sirup — alkohol fordamper, tanniner blødes. Undgå meget tunge vine; glace skal være sødmefuld og syrlig, ikke bitter. Læs [madlavning med vin i sauce](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Bøf", "Hård stegning uden at presse — saft forbliver i kødet."],
      ["Glace", "Reducer til sirup der dækker skeen — for tynd glace løber af burgeren."],
      ["Stegeskorpe", "Skrab panden — fond er smagen i glace."],
      ["Ost", "Læg cheddar på bøffen de sidste 30 sekunder under låg."],
    ],
    serving: `Server med pommes frites, coleslaw eller salat med vinaigrette. Til fest: mini-burgers med samme glace. Kombiner med [nachos med rødvinskaesesovs](/opskrifter/nachos-med-rodvinskaesesovs) til amerikansk aften.`,
    mistakes: ["For tynd glace — løber ud over tallerkenen.", "For høj varme på reduktion — brændt smag.", "At springe fond over — flad glace uden dybde.", "Tung shiraz — bitter glace til sød bolle."],
    storage: `Bøffer smager bedst frisk. Glace holder 5 dage i køleskab — varm blidt. **Variation:** Tilsæt grøn peber til glace, eller byg med blåskimmelost i stedet for cheddar.`,
    glass: `Let rød med syre og moden frugt — gamay, pinot eller ung merlot. Se [vin til burger](/guides/vin-til-burger).`,
  },
  {
    slug: "carbonara-med-hvidvin",
    title: "Carbonara med hvidvin — cremet pasta uden fløde",
    description: "Klassisk carbonara med guanciale, pecorino og æg — hvidvin i stedet for vand giver syre til saucen. Opskrift til 4.",
    tags: ["opskrift", "italiensk", "pasta", "hvidvin", "hverdag"],
    prepTime: "PT15M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin — pinot grigio, vermentino eller frisk chardonnay",
      amount: "80 ml i saucen ved samling",
      note: "Hvidvin erstatter dele af pastavand og giver syre til æg og ost — kog ind på lav varme.",
    },
    wineToDrink: { guideSlug: "vin-til-pizza-og-pasta", searchQuery: "carbonara pinot grigio hvidvin", searchMax: 120, label: "vin til carbonara" },
    relatedGuides: ["vin-til-pizza-og-pasta", "vin-til-italiensk-mad", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "400 g spaghetti",
      "150 g guanciale eller pancetta i tern",
      "3 hele æg + 2 ekstra blommer",
      "100 g revet pecorino romano",
      "80 ml tør hvidvin",
      "Sort peber fra kværn",
      "Salt til pastavand",
    ],
    instructions: [
      "Kog pasta al dente. Gem 2 dl pastavand.",
      "Steg guanciale sprødt uden olie. Tag panden fra varme.",
      "Pisk æg, blommer, pecorino og peber i skål.",
      "Hæld hvidvin i guanciale-pande, kog 1 minut. Tilsæt pasta og 1 dl pastavand.",
      "Rør æggeblanding i på lav varme — saucen må ikke curdle. Server med peber og ost.",
    ],
    intro: `Carbonara med hvidvin er en diskret opgradering af romklassikeren: guanciale, pecorino og silkeblød æg-sauce med **frisk syre fra hvidvin** i stedet for kun stærk pastavand. Det ligner ikke [risotto med hvidvin](/opskrifter/risotto-med-hvidvin), men deler logikken — europæisk vin i gryden giver balance. Ingen fløde; æg og ost binder saucen. Se [vin til pizza og pasta](/guides/vin-til-pizza-og-pasta).`,
    whyTitle: "Hvorfor hvidvin i carbonara",
    why: `Carbonara er **fed, salt og cremet** — uden syre bliver den tung. Hvidvin tilfører citrus og mineralitet der løfter pecorino og guanciale. Tilsæt vin efter stegning og lad den koge 1 minut før pasta røres i; alkohol fordamper. Brug tør pinot grigio eller vermentino — undgå tung, egetræs-chardonnay. Sauces samling sker på lav varme så æg ikke curdler.`,
    tips: [
      ["Temperatur", "Panden må ikke være for varm når æg tilsættes — ellers curdler saucen."],
      ["Pastavand", "Stivelse i pastavand er vigtig — gem vandet til samling."],
      ["Guanciale", "Steg sprødt — fedtet er smagsbæreren."],
      ["Pecorino", "Riv fint — store stykker smelter ujævnt."],
    ],
    serving: `Server straks med ekstra pecorino og groft peber. Grøn salat med citron som eneste tilbehør — retten er mættende. Til italiensk aften med [pesto-pasta med hvidvin](/opskrifter/pesto-pasta-hvidvin) og [gnocchi i rødvinsauce](/opskrifter/gnocchi-rodvinssauce).`,
    mistakes: ["For høj varme ved æg — scrambled carbonara.", "Fløde i saucen — ikke autentisk og tung.", "At springe vindampning over — rå alkohol-smag.", "For lidt pastavand — tør pasta uden cremet sauce."],
    storage: `Carbonara smager bedst frisk — genopvarmning ødelægger æg-sauce. **Variation:** Tilsæt sort trøffel eller erstat pecorino med halv parmesan.`,
    glass: `Frisk hvid med syre — pinot grigio, vermentino eller falanghina. Se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
  },
  {
    slug: "pho-kylling-med-hvidvin",
    title: "Pho med kylling og hvidvin — aromatisk bouillon",
    description: "Vietnamesisk pho med kylling, stjerneanis og hvidvin i bouillonen. Opskrift til 4 med frisk urter og risnudler.",
    tags: ["opskrift", "vietnamesisk", "suppe", "kylling", "hvidvin"],
    prepTime: "PT25M",
    cookTime: "PT45M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin med syre — riesling, pinot grigio eller albariño",
      amount: "150 ml i bouillonen",
      note: "Hvidvin tilføjes efter krydderier og koges ind — giver frisk syre til aromatisk fond.",
    },
    wineToDrink: { guideSlug: "vin-til-pho", searchQuery: "pho kylling riesling halvtør hvidvin", searchMax: 120, label: "vin til pho" },
    relatedGuides: ["vin-til-pho", "vin-til-asiatisk-mad", "vin-til-suppe"],
    ingredients: [
      "600 g kyllingebryst med ben",
      "1,5 l vand",
      "150 ml tør hvidvin",
      "2 stjerneanis, 1 kanelstang, 3 hele nelliker",
      "1 løg, halveret og grillet",
      "5 cm frisk ingefær, skivet",
      "2 spsk fiskesauce",
      "300 g risnudler",
      "Forårsløg, koriander, lime, bønnespirer og thailandsk basilikum",
    ],
    instructions: [
      "Kog kylling, vand, ingefær, løg og krydderier 30 minutter. Skum overfladen.",
      "Hæld hvidvin i og kog 10 minutter til kylling er mør. Tag kylling ud, riv kødet.",
      "Si bouillon. Smag til med fiskesauce.",
      "Kog nudler efter anvisning. Fordel i skåle med kylling og bouillon.",
      "Server med urter, lime og chili ved siden af.",
    ],
    intro: `Pho med kylling og hvidvin er vietnamesisk suppekunst med europæisk twist: aromatisk bouillon med stjerneanis, ingefær og **hvidvin der giver frisk syre** til dyb fond. Det adskiller sig fra [kyllingesuppe med hvidvin](/opskrifter/kyllingesuppe-med-hvidvin) ved krydderier og nudler, men deler vin-i-gryden-princippet. Se [vin til pho](/guides/vin-til-pho) for glasvalg til urter og fiskesauce.`,
    whyTitle: "Hvorfor hvidvin i pho-bouillon",
    why: `Pho har **umami, krydderier og fedt fra kylling** — bouillon skal være dyb men ikke tung. Hvidvin tilfører syre og frugt der balancerer stjerneanis og fiskesauce. Tilsæt vin efter grundkogning og lad den koge ind 10 minutter. Riesling, pinot grigio eller albariño fungerer bedst. Undgå egetræs-tunge vine — de kæmper mod ingefær og basilikum.`,
    tips: [
      ["Grill løg", "Grillede løg giver dybde — rå løg giver skarp smag."],
      ["Skum", "Skum bouillon for klar suppe — vietnamesisk tradition."],
      ["Urter", "Server urter og lime ved siden af — ikke i gryden."],
      ["Nudler", "Kog nudler separat — ellers bliver bouillon stivelses-tung."],
    ],
    serving: `Server pho i dybe skåle med friske urter, bønnespirer og lime. Tilbehør: hoisin og sriracha på bordet. Som asiatisk menu med [ramen med kylling og hvidvin](/opskrifter/ramen-kylling-med-hvidvin) og [pad thai med hvidvin](/opskrifter/pad-thai-med-hvidvin).`,
    mistakes: ["For kort kogning — flad bouillon uden dybde.", "For meget fiskesauce — salt uden balance.", "Hvidvin for tidligt — fordamper aromatiske olier.", "Nudler i gryden — bløde nudler ved servering."],
    storage: `Bouillon holder 3 dage — fedt skummes ved genopvarmning. Kylling og nudler opbevares separat. **Variation:** Brug okseknogle i stedet for kylling til pho bo-stil.`,
    glass: `Halvtør riesling eller frisk hvid med syre til krydderier og urter — se [vin til pho](/guides/vin-til-pho).`,
  },
  {
    slug: "ramen-kylling-med-hvidvin",
    title: "Ramen med kylling og hvidvin — hjemmelavet bouillon",
    description: "Japansk-inspireret ramen med kyllingebouillon, hvidvin, miso og blødkogt æg. Opskrift til 4.",
    tags: ["opskrift", "japansk", "suppe", "kylling", "hvidvin"],
    prepTime: "PT30M",
    cookTime: "PT60M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin — riesling, pinot grigio eller sake-alternativ hvid",
      amount: "120 ml i bouillonen",
      note: "Hvidvin koges ind med miso og kylling — giver syre til fed bouillon.",
    },
    wineToDrink: { guideSlug: "vin-til-ramen", searchQuery: "ramen kylling riesling hvidvin", searchMax: 120, label: "vin til ramen" },
    relatedGuides: ["vin-til-ramen", "vin-til-asiatisk-mad", "vin-til-japansk-mad"],
    ingredients: [
      "700 g kyllingelår",
      "1,2 l vand",
      "120 ml tør hvidvin",
      "3 spsk miso-pasta",
      "2 spsk sojasauce",
      "4 æg til blødkogning",
      "400 g ramen-nudler",
      "4 forårsløg, nori, sesam og bønnespirer",
      "1 spsk sesamolie",
    ],
    instructions: [
      "Kog kyllingelår i vand 40 minutter. Tag kød ud, si bouillon.",
      "Hæld hvidvin i bouillon, kog 10 minutter. Rør miso og soja i.",
      "Kog æg 6½ minut, kyl og halvér. Kog nudler separat.",
      "Fordel nudler, kylling, bouillon og æg i skåle.",
      "Top med forårsløg, nori, sesam og sesamolie.",
    ],
    intro: `Ramen med kylling og hvidvin bringer japansk gadekøkken hjem: fed kyllingebouillon, miso, blødkogt æg og **hvidvin der giver syre** til umami-tung suppe. Det er beslægtet med [pho med kylling og hvidvin](/opskrifter/pho-kylling-med-hvidvin), men med miso og nori i stedet for stjerneanis. Se [vin til ramen](/guides/vin-til-ramen) og [vin til asiatisk mad](/guides/vin-til-asiatisk-mad).`,
    whyTitle: "Hvorfor hvidvin i ramen-bouillon",
    why: `Ramen-bouillon er **fed, salt og umami-tung** fra miso og kylling. Hvidvin tilfører frisk syre og frugt der forhindrer suppen i at blive tung. Tilsæt vin efter kylling er kogt ud og lad den koge ind 10 minutter. Riesling eller pinot grigio er ideelle — undgå søde dessertvine. Miso røres i til sidst så probiotika ikke dræbes ved høj kogning.`,
    tips: [
      ["Kyllingelår", "Lår giver fed bouillon — bryst bliver tørt ved lang kogning."],
      ["Miso", "Rør miso i til sidst på lavere varme — bevarer dybde."],
      ["Æg", "6½ minut giver blød gul — iskyl straks."],
      ["Nudler", "Al dente — nudler fortsætter i varm bouillon."],
    ],
    serving: `Server straks i dybe skåle. Tilbehør: kimchi, edamame eller gyoza. Asiatisk menu med [dim sum med kylling og hvidvin](/opskrifter/dim-sum-kylling-hvidvin) og [wok-rejer med hvidvin](/opskrifter/wok-rejer-hvidvin).`,
    mistakes: ["For kort bouillon — flad smag.", "Miso ved kraftig kogning — bitter suppe.", "For tynd bouillon — vandig ramen.", "At blande nudler for tidligt — bløde nudler."],
    storage: `Bouillon 3 dage — nudler og æg opbevares separat. **Variation:** Tilsæt chili-olie eller svinebryst i stedet for kylling.`,
    glass: `Halvtør riesling eller frisk hvid — se [vin til ramen](/guides/vin-til-ramen).`,
  },
  {
    slug: "tacos-med-rodvin-okse",
    title: "Tacos med okse og rødvin — mørt kød i tortilla",
    description: "Langtidsstegt okse med rødvin, krydderier og friske tacos. Opskrift til 6 med salsa og lime.",
    tags: ["opskrift", "mexicansk", "tacos", "rødvin", "oksekød"],
    prepTime: "PT20M",
    cookTime: "PT180M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Ung rødvin — tempranillo, zinfandel eller malbec",
      amount: "300 ml til braisering",
      note: "Okse braiseres mørt i rødvin med fond — vinen er cooking liquid.",
    },
    wineToDrink: { guideSlug: "vin-til-tacos", searchQuery: "tacos okse tempranillo rødvin", searchMax: 150, label: "vin til tacos" },
    relatedGuides: ["vin-til-tacos", "vin-til-mexicansk-mad", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "800 g oksebov eller short ribs",
      "300 ml ung rødvin",
      "200 ml oksefond",
      "2 spsk tomatpuré",
      "1 løg, 3 fed hvidløg",
      "2 tsk spisskummen, røget paprika og oregano",
      "12 majs-tortillas",
      "Salsa, lime, koriander, rødløg og avocado",
    ],
    instructions: [
      "Brun okse i gryde. Tag ud. Steg løg og hvidløg.",
      "Tilsæt tomatpuré, krydderier, rødvin og fond. Læg okse tilbage.",
      "Simr under låg 2,5–3 timer til mørt. Træk kød fra med gaffel.",
      "Reducér sauce hvis nødvendigt. Varm tortillas.",
      "Fyld med okse, salsa, løg, koriander og lime.",
    ],
    intro: `Tacos med okse og rødvin er mexicansk braisering: mørt kød trukket fra efter timer i **rødvin og krydderier**, serveret i varme tortillas med salsa og lime. Det minder om [chili con carne med rødvin](/opskrifter/chili-con-carne-med-rodvin) og [estofado](/opskrifter/estofado-oksestuvning-i-rodvin) — vin simrer med kød til dybde. Se [vin til tacos](/guides/vin-til-tacos).`,
    whyTitle: "Hvorfor rødvin til taco-okse",
    why: `Okse til tacos skal være **mørt og smagsfuldt** — rødvin giver syre og frugt der mørner kød sammen med fond. Tempranillo, zinfandel eller malbec simrer 2–3 timer; alkohol fordamper, kødet absorberer smag. Sauce reduceres til glasur der klæber til kødet. Undgå meget tannin-tunge vine — bitter eftersmag i reduktion.`,
    tips: [
      ["Skæring", "Short ribs eller bov — fedt og collagen giver mørhed."],
      ["Bruning", "Brun hårdt — stegeskorpe er smag i sauce."],
      ["Simring", "Lav varme under låg — kødet skal falde fra hinanden."],
      ["Tortillas", "Varm dem tør — bløde tortillas knækker ikke."],
    ],
    serving: `Server som taco-bar med salsa, lime og koriander. Til mexicansk aften med [nachos med rødvinskaesesovs](/opskrifter/nachos-med-rodvinskaesesovs).`,
    mistakes: ["For kort simring — sejt kød.", "For tynd sauce — vandige tacos.", "For tung rødvin — bitter sauce.", "Kold tortilla — knækker og smager rå."],
    storage: `Okse holder 4 dage — smager bedre dagen efter. Fryses i portioner. **Variation:** Brug svinekam eller jackfruit til vegetar-version.`,
    glass: `Ung, frugtig rød med syre — tempranillo eller zinfandel. Se [vin til tacos](/guides/vin-til-tacos).`,
  },
  {
    slug: "couscous-kylling-med-hvidvin",
    title: "Couscous med kylling og hvidvin — nordafrikansk gryderet",
    description: "Saftig kylling med grøntsager, couscous og hvidvin i gryden. Opskrift til 4 med urter og citron.",
    tags: ["opskrift", "marokkansk", "kylling", "hvidvin", "gryderet"],
    prepTime: "PT20M",
    cookTime: "PT40M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: { style: "Tør hvidvin — pinot grigio, vermentino eller albariño", amount: "150 ml i gryden", note: "Hvidvin simrer med kylling og grøntsager — giver syre til krydderier." },
    wineToDrink: { guideSlug: "vin-til-asiatisk-mad", searchQuery: "couscous kylling hvidvin", searchMax: 120, label: "vin til couscous" },
    relatedGuides: ["vin-til-asiatisk-mad", "vin-til-kylling-og-lyst-koed", "vin-til-mellemoestlig-mad"],
    ingredients: ["600 g kyllingelår", "150 ml tør hvidvin", "300 g couscous", "2 gulerødder", "1 squash", "1 løg", "2 tsk spisskummen og koriander", "400 ml kyllingefond", "Persille, citron og oliven"],
    instructions: ["Brun kylling. Steg løg og grøntsager.", "Tilsæt krydderier, hvidvin og fond. Simr 25 min.", "Tilsæt couscous, læg låg 10 min.", "Fluff couscous. Server med persille og citron."],
    intro: `Couscous med kylling og hvidvin er nordafrikansk gryderet i én pande: saftig kylling, grøntsager og fluffet couscous med **hvidvin der giver syre** til spisskummen og fond. Det minder om [fennikelkylling med hvidvin](/opskrifter/fennikelkylling-med-hvidvin) i vin-i-gryden-logik. Se [vin til asiatisk mad](/guides/vin-til-asiatisk-mad) og mellemøstlige retter.`,
    whyTitle: "Hvorfor hvidvin i couscous-gryde",
    why: `Couscous-gryderetter har **krydderier, fond og fedt fra kylling** — hvidvin tilfører frisk syre og frugt der balancerer spisskummen. Tilsæt vin efter bruning og lad den simre ind. Tør pinot grigio eller vermentino fungerer bedst. Couscous dampes i samme gryde og absorberer væske og smag.`,
    tips: [["Kylling", "Lår giver saft — bryst kræver kortere tid."], ["Couscous", "Tag gryden fra varme — couscous damper i restvarme."], ["Krydderier", "Rist spisskummen kort — frigør aroma."], ["Citron", "Frisk citron ved servering løfter retten."]],
    serving: `Server med harissa, oliven og grøn salat. Til fest med [shakshuka med hvidvin](/opskrifter/shakshuka-med-hvidvin) og [falafel-tallerken](/opskrifter/falafel-tallerken-med-hvidvin).`,
    mistakes: ["For meget væske — grød couscous.", "For kort simring — rå krydderier.", "At blande couscous for tidligt — klumper.", "Tung chardonnay — dominerer krydderier."],
    storage: `Holder 3 dage — genvarm med lidt fond. **Variation:** Brug lammekød eller kikærter til vegetar.`,
    glass: `Frisk hvid med syre — pinot grigio eller albariño.`,
  },
  {
    slug: "karrykylling-med-hvidvin",
    title: "Karrykylling med hvidvin — cremet indisk-inspireret ret",
    description: "Kylling i karrysauce med kokos, hvidvin og friske urter. Opskrift til 4 med basmatiris.",
    tags: ["opskrift", "indisk", "kylling", "hvidvin", "karry"],
    prepTime: "PT20M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: { style: "Halvtør riesling eller tør hvidvin med syre", amount: "100 ml i saucen", note: "Hvidvin giver syre til kokos og karry — kog ind før fløde." },
    wineToDrink: { guideSlug: "vin-til-karryretter", searchQuery: "karry kylling riesling halvtør", searchMax: 120, label: "vin til karry" },
    relatedGuides: ["vin-til-karryretter", "vin-til-indisk-mad", "vin-til-kylling-og-lyst-koed"],
    ingredients: ["600 g kyllingebryst i tern", "100 ml hvidvin", "2 spsk karrypasta", "200 ml kokosmælk", "1 løg", "2 tomater", "2 spsk olie", "Frisk koriander og basmatiris"],
    instructions: ["Steg løg og karrypasta. Tilsæt kylling og brun.", "Hæld hvidvin i, kog 2 min. Tilsæt tomater og kokos.", "Simr 20 min. Server med ris og koriander."],
    intro: `Karrykylling med hvidvin balancerer **fed kokos og stærk karry** med syre fra hvidvin — europæisk vin i gryden til indisk-inspireret hverdagsmad. Se [vin til karryretter](/guides/vin-til-karryretter) og [wok-kylling med hvidvin](/opskrifter/wok-kylling-med-hvidvin) for lignende logik.`,
    whyTitle: "Hvorfor hvidvin i karry",
    why: `Karry med kokos er **fed og krydret** — uden syre bliver saucen tung. Hvidvin tilfører friskhed; halvtør riesling matcher mild til medium styrke. Kog vinen ind før kokosmælk. Undgå meget søde vine — de kæmper mod karry.`,
    tips: [["Karrypasta", "Steg karrypasta i olie — frigør aroma."], ["Kylling", "Skær ens — jævn tilberedning."], ["Kokos", "Tilsæt til sidst — undgå at koge fra."], ["Syre", "Lime ved servering hvis saucen er tung."]],
    serving: `Basmatiris, naan og mango-chutney. Med [couscous med kylling](/opskrifter/couscous-kylling-med-hvidvin) til fusion-menu.`,
    mistakes: ["For meget karry — dominerer vin.", "At springe vindampning over.", "For høj varme på kokos — skiller.", "Tør hvid uden frugt — flad balance."],
    storage: `3 dage i køleskab — smager bedre næste dag. Fryses. **Variation:** Brug linser i stedet for kylling.`,
    glass: `Halvtør riesling eller gewürztraminer — se [vin til karryretter](/guides/vin-til-karryretter).`,
  },
  {
    slug: "ceviche-med-hvidvin",
    title: "Ceviche med hvidvin — fisk marineret med citrus og vin",
    description: "Frisk ceviche med hvid fisk, lime, hvidvin og chili. Opskrift til 4 som forret eller let hovedret.",
    tags: ["opskrift", "peruviansk", "fisk", "hvidvin", "forret"],
    prepTime: "PT25M",
    cookTime: "PT0M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: { style: "Meget tør hvidvin — sauvignon blanc, albariño eller pinot grigio", amount: "80 ml i marinade", note: "Hvidvin supplerer lime — fisk 'koges' i syre, ikke varme." },
    wineToDrink: { guideSlug: "vin-til-ceviche", searchQuery: "ceviche sauvignon blanc hvidvin", searchMax: 120, label: "vin til ceviche" },
    relatedGuides: ["vin-til-ceviche", "vin-til-fisk-og-skaldyr", "vin-til-peruviansk-mad"],
    ingredients: ["400 g frisk torsk eller kullerfilet", "80 ml tør hvidvin", "Saft af 4 lime", "1 rød chili", "1 rødløg", "1 mango", "Koriander, salt og sød kartoffel"],
    instructions: ["Skær fisk i tern. Bland med lime, hvidvin, salt og chili.", "Marinér 20–30 min i køleskab.", "Tilsæt finthakket løg, mango og koriander.", "Server med sød kartoffel og tortillachips."],
    intro: `Ceviche med hvidvin er peruviansk friskhed: rå fisk 'kogt' i **lime og tør hvidvin** med chili og koriander. Vin supplerer citrus med mineralitet — se [vin til ceviche](/guides/vin-til-ceviche) og [gravad laks med hvidvin](/opskrifter/gravad-laks-med-hvidvin) for vin-til-ra-fisk-logik.`,
    whyTitle: "Hvorfor hvidvin i ceviche",
    why: `Ceviche lever af **syre og friskhed** — hvidvin tilføjer ekstra lag af citrus og mineralitet uden at overdøve lime. Brug meget tør sauvignon blanc eller albariño. Marinér kort — fisk skal ikke blive gummiagtig. Server icekold.`,
    tips: [["Frisk fisk", "Sushi-kvalitet — ceviche spises rå."], ["Marinade", "20–30 min max — fisk skal stadig have tekstur."], ["Lime", "Friskpresset — flaske-lime er flad."], ["Servering", "Kold tallerken — varme ødelægger ceviche."]],
    serving: `Som forret med tortillachips og sød kartoffel. Hovedret med [rejer i hvidvin](/opskrifter/rejer-i-hvidvin).`,
    mistakes: ["For lang marinade — gummiagtig fisk.", "Sød hvidvin — klumpet smag.", "Varm fisk — ikke ceviche.", "For lidt salt — flad smag."],
    storage: `Spises samme dag — ceviche holder ikke. **Variation:** Tilsæt rejer eller avocado.`,
    glass: `Meget tør hvid — sauvignon blanc eller albariño. Se [vin til ceviche](/guides/vin-til-ceviche).`,
  },
  {
    slug: "sild-i-hvidvinseddike",
    title: "Sild i hvidvinseddike — klassisk nordisk forret",
    description: "Marinerede sild i hvidvinseddike med løg, dild og peber. Opskrift til 6 som julefrokost eller smørrebrød.",
    tags: ["opskrift", "dansk", "sild", "hvidvin", "julefrokost"],
    prepTime: "PT30M",
    cookTime: "PT10M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: { style: "Tør hvidvin — riesling, albariño eller dansk hvid", amount: "200 ml i eddike-lage", note: "Hvidvin er halvdelen af eddike-blandingen — giver frugt til sild." },
    wineToDrink: { guideSlug: "vin-til-sild", searchQuery: "sild hvidvin akvavit snaps", searchMax: 120, label: "vin til sild" },
    relatedGuides: ["vin-til-sild", "vin-til-julefrokost", "vin-til-smorrebrod"],
    ingredients: ["6 rensede sildfileter", "200 ml tør hvidvin", "100 ml hvidvinseddike", "2 rødløg i ringe", "1 bund dild", "10 peberkorn", "1 spsk sukker", "Skiver af rugbrød og smør"],
    instructions: ["Kog eddike, hvidvin, sukker og peber — afkøl.", "Læg sild i skål med løg og dild.", "Hæld kold lage over. Marinér 24–48 timer.", "Server på rugbrød med løg og dild."],
    intro: `Sild i hvidvinseddike er nordisk klassiker til julefrokost og smørrebrød: sød-syrlig lage med **hvidvin og eddike** der mørner sild og giver frugt. Se [stegte sild i hvidvin](/opskrifter/stegte-sild-i-hvidvin) og [vin til sild](/guides/vin-til-sild).`,
    whyTitle: "Hvorfor hvidvin i sild-lage",
    why: `Sild har **stærk smag og fedt** — hvidvinseddike alene kan være hård. Hvidvin blødgør eddike med frugt og giver dybde. Halv vin, halv eddike er klassisk nordisk ratio. Marinér minimum 24 timer.`,
    tips: [["Sild", "Rensede fileter — eller køb færdigrenset."], ["Lage", "Skal være kold før sild tilsættes."], ["Løg", "Tynde ringe — rå løg i lage."], ["Tid", "48 timer giver bedst smag."]],
    serving: `På rugbrød med smør, løg og dild. Til julefrokost med [risalamande med hvidvin](/opskrifter/risalamande-med-hvidvin) og [æblekage med hvidvin-karamel](/opskrifter/aeblekage-hvidvin-karamel).`,
    mistakes: ["Varm lage på sild — koger fisken.", "For kort marinade — rå eddike-smag.", "For meget sukker — slører sild.", "Sød hvidvin — for blid lage."],
    storage: `Holder 1 uge i køleskab — smager bedre efter 2 dage. **Variation:** Tilsæt sennepfrø eller karse.`,
    glass: `Tør hvid eller akvavit — se [vin til sild](/guides/vin-til-sild) og [vin til julefrokost](/guides/vin-til-julefrokost).`,
  },
  {
    slug: "quiche-med-hvidvin",
    title: "Quiche med hvidvin — sprød tærte med bacon og ost",
    description: "Klassisk quiche Lorraine med hvidvin i æggeblandingen. Opskrift til 6 som frokost eller forret.",
    tags: ["opskrift", "fransk", "tærte", "hvidvin", "brunch"],
    prepTime: "PT25M",
    cookTime: "PT40M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: { style: "Tør hvidvin — chablis, pinot blanc eller muscadet", amount: "3 spsk i æggeblandingen", note: "Hvidvin giver syre til æg, fløde og ost — fordeler smagen jævnt." },
    wineToDrink: { guideSlug: "vin-til-quiche", searchQuery: "quiche chablis hvidvin", searchMax: 120, label: "vin til quiche" },
    relatedGuides: ["vin-til-quiche", "vin-til-brunch", "vin-til-fransk-mad"],
    ingredients: ["1 butterdejsbund", "200 g bacon", "150 g revet gruyère", "4 æg", "2 dl fløde", "3 spsk tør hvidvin", "Muskat, salt og peber", "Grøn salat"],
    instructions: ["Forbag bund 10 min ved 180 °C.", "Steg bacon sprødt. Fordel bacon og ost i bund.", "Pisk æg, fløde, hvidvin og krydderier.", "Hæld over. Bag 35 min til sat centrum.", "Hvil 10 min. Server med salat."],
    intro: `Quiche med hvidvin er fransk frokostklassiker: sprød butterdejs, bacon, gruyère og **hvidvin i æggeblandingen** der giver syre til fløde og ost. Se [vin til quiche](/guides/vin-til-quiche) og [tarteletter i hvidvin](/opskrifter/tarteletter-i-hvidvin).`,
    whyTitle: "Hvorfor hvidvin i quiche",
    why: `Quiche er **fed og cremet** fra fløde og ost — hvidvin tilfører syre og friskhed. Tilsæt til æggeblandingen før bagning; alkohol fordamper i ovnen. Chablis eller muscadet er traditionelle valg.`,
    tips: [["Bund", "Forbag med bagepapir og bønner — undgå våd bund."], ["Æg", "Pisk uden for meget luft — quiche er ikke soufflé."], ["Hvile", "10 min efter ovn — skærer pænere."], ["Ost", "Gruyère giver nødde — parmesan kan blandes."]],
    serving: `Lun eller stuetemperatur med grøn salat. Brunch med [shakshuka med hvidvin](/opskrifter/shakshuka-med-hvidvin).`,
    mistakes: ["Våd bund — for lidt forbagning.", "For meget fyld — løber over.", "For høj ovn — brændt top, rå centrum.", "At springe hvile over — våd skive."],
    storage: `3 dage i køleskab — genvarm ved 160 °C. Fryses. **Variation:** Spinat og feta i stedet for bacon.`,
    glass: `Tør hvid — chablis eller muscadet. Se [vin til quiche](/guides/vin-til-quiche).`,
  },
  {
    slug: "pad-thai-med-hvidvin",
    title: "Pad thai med hvidvin — wok-nudler med syre",
    description: "Thailandske risnudler med rejer, tamarind og hvidvin i saucen. Opskrift til 4.",
    tags: ["opskrift", "thai", "nudler", "hvidvin", "wok"],
    prepTime: "PT20M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: { style: "Tør hvidvin — pinot grigio, riesling eller albariño", amount: "80 ml i saucen", note: "Hvidvin erstatter dele af væske og giver syre til tamarind og fiskesauce." },
    wineToDrink: { guideSlug: "vin-til-asiatisk-mad", searchQuery: "pad thai riesling hvidvin", searchMax: 120, label: "vin til pad thai" },
    relatedGuides: ["vin-til-asiatisk-mad", "vin-til-thai-mad", "vin-til-wok"],
    ingredients: ["300 g risnudler", "80 ml hvidvin", "200 g rejer", "2 æg", "3 spsk tamarind", "2 spsk fiskesauce", "Bønnespirer, forårsløg, peanuts og lime"],
    instructions: ["Blød nudler 20 min. Bland tamarind, fiskesauce og hvidvin.", "Wok på høj varme: rejer, æg, nudler, sauce.", "Rør 3 min. Top med spirer, peanuts og lime."],
    intro: `Pad thai med hvidvin er thailandsk wok-klassiker med **europæisk syre** fra hvidvin i stedet for kun tamarind. Se [wok-kylling med hvidvin](/opskrifter/wok-kylling-med-hvidvin) og [vin til asiatisk mad](/guides/vin-til-asiatisk-mad).`,
    whyTitle: "Hvorfor hvidvin i pad thai",
    why: `Pad thai balancerer **sødt, surt, salt og umami** — hvidvin tilfører ekstra syre og frugt. Tilsæt til saucen og lad koge ind på høj varme. Undgå søde vine — tamarind og palm sukker giver allerede sødme.`,
    tips: [["Wok", "Høj varme — kog ikke nudler."], ["Nudler", "Blød før wok — ellers ujævn."], ["Tamarind", "Pasten opløses i hvidvin før wok."], ["Peanuts", "Rist — frisk crunch."]],
    serving: `Med lime og ekstra fiskesauce. Thai-menu med [wok-rejer med hvidvin](/opskrifter/wok-rejer-hvidvin).`,
    mistakes: ["For våd wok — kogte nudler.", "For lidt syre — flad pad thai.", "Sød hvidvin — ubalanceret.", "For mange nudler — klumpet."],
    storage: `Spises frisk — nudler bliver bløde. **Variation:** Tofu i stedet for rejer.`,
    glass: `Halvtør riesling — se [vin til thai-mad](/guides/vin-til-thai-mad).`,
  },
  {
    slug: "bouillabaisse-med-hvidvin",
    title: "Bouillabaisse med hvidvin — provencalsk fiskesuppe",
    description: "Klassisk bouillabaisse med blandede fisk, safran og hvidvin i bouillon. Opskrift til 6.",
    tags: ["opskrift", "fransk", "fisk", "hvidvin", "suppe"],
    prepTime: "PT30M",
    cookTime: "PT45M",
    servings: 6,
    difficulty: "hard",
    wineInRecipe: { style: "Tør hvidvin fra Provence — rosé eller marsanne-blend", amount: "250 ml i bouillonen", note: "Hvidvin er base sammen med fiskfond — safran og tomater bygger ovenpå." },
    wineToDrink: { guideSlug: "vin-til-fisk-og-skaldyr", searchQuery: "bouillabaisse provence hvidvin rosé", searchMax: 150, label: "vin til bouillabaisse" },
    relatedGuides: ["vin-til-fisk-og-skaldyr", "vin-til-provencalsk-mad", "vin-til-suppe"],
    ingredients: ["800 g blandede fisk og rejer", "250 ml tør hvidvin", "500 ml fiskfond", "1 dåse hakkede tomater", "1 fennel", "Pinje safran", "4 fed hvidløg", "Rouille, brød og persille"],
    instructions: ["Steg fennikel, løg og hvidløg. Tilsæt tomater og safran.", "Hæld hvidvin og fond i. Kog 20 min.", "Tilsæt fast fisk, derefter delikat fisk og rejer.", "Simr 8 min. Server med rouille og brød."],
    intro: `Bouillabaisse med hvidvin er provencalsk fiskesuppe: safran, tomater og **hvidvin i bouillon** med blandede fisk. Se [fisk i hvidvinsauce](/opskrifter/fisk-i-hvidvinsauce) og [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr).`,
    whyTitle: "Hvorfor hvidvin i bouillabaisse",
    why: `Bouillabaisse kræver **syre og mineralitet** i bouillon — hvidvin er traditionel base sammen med fiskfond. Provence-vin matcher safran og tomater. Kog fisk kort — overkogning giver gummiagtig tekstur.`,
    tips: [["Fisk", "Fast fisk først — delikat til sidst."], ["Safran", "Blød i lidt varm vin før tilsætning."], ["Rouille", "Hjemmelavet — aioli med safran og chili."], ["Brød", "Ristet — dyp i bouillon."]],
    serving: `I dybe skåle med rouille på brød. Festmenu med [ceviche med hvidvin](/opskrifter/ceviche-med-hvidvin).`,
    mistakes: ["Overkogt fisk — falder fra hinanden.", "For lidt safran — flad bouillon.", "Sød hvidvin — forkert profil.", "For meget tomat — dominerer fisk."],
    storage: `Bouillon 2 dage — fisk tilberedes frisk. **Variation:** Muslinger og blåmuslinger i stedet for rejer.`,
    glass: `Provence rosé eller tør hvid — se [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr).`,
  },
  {
    slug: "kylling-cacciatore-med-rodvin",
    title: "Kylling cacciatore med rødvin — italiensk gryderet",
    description: "Kylling simret med tomater, oliven, kapris og rødvin. Opskrift til 4 med brød.",
    tags: ["opskrift", "italiensk", "kylling", "rødvin", "gryderet"],
    prepTime: "PT20M",
    cookTime: "PT50M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: { style: "Ung sangiovese, chianti eller montepulciano", amount: "200 ml i gryden", note: "Rødvin simrer med tomater og kylling — klassisk cacciatore-metode." },
    wineToDrink: { guideSlug: "vin-til-italiensk-mad", searchQuery: "cacciatore chianti sangiovese", searchMax: 120, label: "vin til cacciatore" },
    relatedGuides: ["vin-til-italiensk-mad", "vin-til-kylling-og-lyst-koed", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: ["1 hel kylling i 8 dele", "200 ml rødvin", "400 g hakkede tomater", "1 peberfrugt", "Oliven, kapris, rosmarin", "2 spsk olivenolie"],
    instructions: ["Brun kylling. Tag ud.", "Steg peber og løg. Tilsæt vin, tomater, oliven.", "Læg kylling tilbage. Simr 40 min.", "Server med brød og persille."],
    intro: `Kylling cacciatore med rødvin er italiensk landskøkken: kylling simret i **tomater og rødvin** med oliven og kapris. Som [coq au vin](/opskrifter/coq-au-vin) og [braiseret kylling med rødvin](/opskrifter/braiseret-kylling-med-rodvin). Se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
    whyTitle: "Hvorfor rødvin i cacciatore",
    why: `Cacciatore kræver **syre og frugt** fra rødvin til tomater og kylling. Sangiovese eller chianti er traditionelt. Simr 40 minutter under låg — kylling skal være mør og sauce tyk.`,
    tips: [["Kylling", "Med ben — mere smag end filet."], ["Bruning", "Brun alle dele — fond i gryden."], ["Oliven", "Tilsæt sidst — undgå bitter."], ["Sauce", "Reducer til sidst uden låg."]],
    serving: `Med brød til sauce og grøn salat. Italiensk aften med [gnocchi i rødvinsauce](/opskrifter/gnocchi-rodvinssauce).`,
    mistakes: ["For kort simring — sej kylling.", "For tung rødvin — bitter sauce.", "At springe bruning over.", "For meget kapris — dominerer."],
    storage: `3 dage — smager bedre dagen efter. **Variation:** Kanin i stedet for kylling.`,
    glass: `Chianti eller sangiovese — se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
  },
  {
    slug: "fasan-med-rodvin",
    title: "Fasan med rødvin — klassisk vildtret",
    description: "Hel fasan eller bryst braiseret i rødvin med svampe og bacon. Opskrift til 4.",
    tags: ["opskrift", "vildt", "fasan", "rødvin", "gryderet"],
    prepTime: "PT25M",
    cookTime: "PT60M",
    servings: 4,
    difficulty: "hard",
    wineInRecipe: { style: "Moden pinot noir, burgundisk rød eller gamay", amount: "300 ml til braisering", note: "Fasan braiseres mørt i rødvin — vildt kræver moden, blød rød." },
    wineToDrink: { guideSlug: "vin-til-vildt", searchQuery: "fasan pinot noir vildt rødvin", searchMax: 150, label: "vin til fasan" },
    relatedGuides: ["vin-til-vildt", "sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-gryderet"],
    ingredients: ["1 fasan i 4 dele (eller 4 bryst)", "300 ml moden rødvin", "150 ml vildtfond", "100 g bacon", "200 g svampe", "1 løg", "Timian og laurbær"],
    instructions: ["Brun fasan og bacon. Tag ud.", "Steg svampe og løg. Tilsæt vin og fond.", "Læg fasan tilbage. Simr 50 min.", "Si sauce, reducer. Server med rodfrugter."],
    intro: `Fasan med rødvin er klassisk vildtret: magert kød braiseret i **moden rødvin** med svampe og bacon. Se [coq au vin](/opskrifter/coq-au-vin) og [vin til vildt](/guides/vin-til-vildt).`,
    whyTitle: "Hvorfor rødvin til fasan",
    why: `Fasan er **magert og aromatisk** — rødvin mørner kødet og giver saft. Moden pinot noir eller burgundisk rød med blød tannin — undgå ung, hård cabernet. Bacon tilføjer fedt fasan mangler.`,
    tips: [["Vildt", "Fasan skal ikke overstege — tørt kød."], ["Marinade", "Marinér natten over i vin for ekstra mørhed."], ["Sauce", "Si og reducer — silkeblød glace."], ["Tilbehør", "Rodfrugter braiseret i samme gryde."]],
    serving: `Med braiserede rodfrugter og rødkål. Festmenu til jagtsæson.`,
    mistakes: ["Overkogt fasan — tørt kød.", "Ung tannin-tung rød — bitter sauce.", "For kort braisering — sejt.", "For lidt fedt — magert kød uden bacon."],
    storage: `2 dage — vildt smager bedre næste dag. **Variation:** And eller rødvinge i samme metode.`,
    glass: `Moden pinot noir eller burgund — se [vin til vildt](/guides/vin-til-vildt).`,
  },
  {
    slug: "grydestegt-kylling-med-hvidvin",
    title: "Grydestegt kylling med hvidvin — saftig hel kylling",
    description: "Hel kylling stegt i gryde med hvidvin, citron og urter. Opskrift til 4.",
    tags: ["opskrift", "kylling", "hvidvin", "gryderet", "hverdag"],
    prepTime: "PT15M",
    cookTime: "PT75M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: { style: "Tør hvidvin — chardonnay, viognier eller albariño", amount: "250 ml i gryden", note: "Hvidvin damper og simrer kylling mør — klassisk fransk teknik." },
    wineToDrink: { guideSlug: "vin-til-kylling-og-lyst-koed", searchQuery: "grydestegt kylling hvidvin", searchMax: 120, label: "vin til grydestegt kylling" },
    relatedGuides: ["vin-til-kylling-og-lyst-koed", "sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-fransk-mad"],
    ingredients: ["1 hel kylling ca. 1,4 kg", "250 ml tør hvidvin", "2 citroner", "4 fed hvidløg", "Timian, rosmarin og smør", "Salt og peber"],
    instructions: ["Brun kylling i gryde. Tilsæt hvidløg, urter og citron.", "Hæld hvidvin i. Læg låg.", "Simr/steg 60–70 min til 74 °C i lår.", "Hvil 10 min. Server med sauce."],
    intro: `Grydestegt kylling med hvidvin er fransk hverdagskunst: hel kylling mør efter simring i **hvidvin, citron og urter**. Se [stuvet kylling med hvidvin](/opskrifter/stuvet-kylling-med-hvidvin) og [citronkylling i hvidvin](/opskrifter/citronkylling-i-hvidvin).`,
    whyTitle: "Hvorfor hvidvin til grydestegt kylling",
    why: `Grydestegning kræver **væske og syre** — hvidvin damper kylling saftig og giver sauce. Citron og urter supplerer. Tør chardonnay eller albariño — undgå sød vin.`,
    tips: [["Temperatur", "74 °C i lår — saftig uden rå."], ["Låg", "Låg de første 45 min — sprød hud til sidst uden låg."], ["Hvile", "10 min — saften fordeler sig."], ["Sauce", "Reducer til sidst — koncentreret smag."]],
    serving: `Med kartofler og grøn salat. Søndagsmad med [kylling cacciatore](/opskrifter/kylling-cacciatore-med-rodvin).`,
    mistakes: ["For høj varme — tør kylling.", "For lidt væske — brænder fast.", "Ingen hvile — tør skæring.", "Sød hvidvin — klistret sauce."],
    storage: `3 dage — kylling genvarmes ved 160 °C. **Variation:** Tilsæt oliven og tomater til provence-stil.`,
    glass: `Tør hvid — chardonnay eller viognier. Se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
  },
  {
    slug: "fiskefilet-citron-hvidvin",
    title: "Fiskefilet med citron og hvidvin — klassisk hverdagsret",
    description: "Paneret eller stegt fiskefilet i hvidvinsauce med citron og persille. Opskrift til 4.",
    tags: ["opskrift", "fisk", "hvidvin", "hverdag", "fransk"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: { style: "Tør hvidvin — muscadet, sauvignon blanc eller pinot blanc", amount: "150 ml i saucen", note: "Hvidvinsauce laves i samme pande som fisk — stegeskorpe er smag." },
    wineToDrink: { guideSlug: "vin-til-fisk-og-skaldyr", searchQuery: "fiskefilet citron hvidvin", searchMax: 120, label: "vin til fiskefilet" },
    relatedGuides: ["vin-til-fisk-og-skaldyr", "vin-til-torsk", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: ["4 fiskefileter (torsk eller kuller)", "150 ml tør hvidvin", "1 dl fiskfond", "Saft af 1 citron", "2 spsk smør", "Persille, salt og peber"],
    instructions: ["Krydr og steg fisk 3 min pr. side. Tag ud.", "Hæld hvidvin og fond i. Reducer 3 min.", "Pisk smør og citron i. Tilsæt persille.", "Læg fisk tilbage 1 min. Server med kartofler."],
    intro: `Fiskefilet med citron og hvidvin er fransk hverdagsklassiker: stegt fisk i **hvidvinsauce med citron og persille**. Se [torsk i hvidvin](/opskrifter/torsk-i-hvidvin) og [fisk i hvidvinsauce](/opskrifter/fisk-i-hvidvinsauce).`,
    whyTitle: "Hvorfor hvidvin til fiskefilet",
    why: `Fisk har **delikat smag** — hvidvinsauce tilfører syre og smør uden at overdøve. Lav sauce i samme pande som fisk — fond fra stegeskorpe. Muscadet eller sauvignon blanc er ideelle.`,
    tips: [["Fisk", "Tør fileter — ellers koger de i stedet for steger."], ["Pande", "Ikke overfyld — sprød skorpe."], ["Sauce", "Smør til sidst — silkeblød emulsion."], ["Citron", "Frisk ved servering."]],
    serving: `Med kogte kartofler og grøn salat. Med [grillet laks med hvidvindressing](/opskrifter/grillet-laks-hvidvin-dressing).`,
    mistakes: ["Overstegt fisk — tør og falder fra.", "For tynd sauce — vandig.", "For høj varme på smør — brændt.", "Sød hvidvin — forkert profil."],
    storage: `Spises frisk — fisk genopvarmes dårligt. **Variation:** Kapris og oliven i saucen.`,
    glass: `Muscadet eller sauvignon blanc — se [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr).`,
  },
  {
    slug: "grillet-laks-hvidvin-dressing",
    title: "Grillet laks med hvidvindressing — sommerret",
    description: "Grillet laks med dressing af hvidvin, dild og sennep. Opskrift til 4.",
    tags: ["opskrift", "fisk", "laks", "hvidvin", "grill"],
    prepTime: "PT15M",
    cookTime: "PT12M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: { style: "Tør hvidvin — sauvignon blanc, albariño eller pinot grigio", amount: "100 ml i dressing", note: "Hvidvin reduceres med sennep og dild — dressing til varm laks." },
    wineToDrink: { guideSlug: "vin-til-laks", searchQuery: "grillet laks hvidvin pinot noir", searchMax: 120, label: "vin til laks" },
    relatedGuides: ["vin-til-laks", "vin-til-grillet-fisk", "vin-til-fisk-og-skaldyr"],
    ingredients: ["4 laksfileter", "100 ml hvidvin", "2 spsk sennep", "1 bund dild", "2 spsk olivenolie", "Citron, salt og peber", "Asparges til tilbehør"],
    instructions: ["Reducer hvidvin til halv. Afkøl.", "Pisk med sennep, dild, olie og citron.", "Grill laks 4 min pr. side.", "Top med dressing og dild. Server med asparges."],
    intro: `Grillet laks med hvidvindressing er sommer på tallerken: fed laks med **syrlig dressing reduceret fra hvidvin** og dild. Se [laks i hvidvin](/opskrifter/laks-i-hvidvin) og [gravad laks med hvidvin](/opskrifter/gravad-laks-med-hvidvin). [Vin til laks](/guides/vin-til-laks).`,
    whyTitle: "Hvorfor hvidvin i laks-dressing",
    why: `Laks er **fed og rig** — hvidvindressing skærer igennem med syre og urter. Reducer vin først — koncentrerer frugt. Sauvignon blanc eller albariño matcher dild og sennep.`,
    tips: [["Laks", "Skind ned — sprød skorpe."], ["Grill", "Høj varme kort tid — rosé midte."], ["Dressing", "Reducer vin — rå alkohol i dressing er hård."], ["Dild", "Frisk — tør dild er svag."]],
    serving: `Med nye kartofler og asparges. Sommer-menu med [fiskefilet citron-hvidvin](/opskrifter/fiskefilet-citron-hvidvin).`,
    mistakes: ["Overgrillet laks — tør.", "For tynd dressing — løber af.", "Rå hvidvin i dressing — skarp smag.", "For meget sennep — dominerer."],
    storage: `Spises frisk. Dressing 3 dage i køleskab. **Variation:** Tilsæt kapris til dressing.`,
    glass: `Sauvignon blanc eller let pinot noir — se [vin til laks](/guides/vin-til-laks).`,
  },
  {
    slug: "kebab-spyd-med-rodvin",
    title: "Kebab-spyd med rødvin — marinade til grill",
    description: "Lam eller okse på spyd marineret i rødvin, paprika og spidskommen. Opskrift til 4.",
    tags: ["opskrift", "kebab", "grill", "rødvin", "mellemøstlig"],
    prepTime: "PT20M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: { style: "Ung rødvin — gamay, tempranillo eller pinot noir", amount: "150 ml i marinade", note: "Rødvin mørner kød og giver frugt til krydderier — grill på høj varme." },
    wineToDrink: { guideSlug: "vin-til-kebab-og-shawarma", searchQuery: "kebab spyd rødvin grill", searchMax: 120, label: "vin til kebab" },
    relatedGuides: ["vin-til-kebab-og-shawarma", "vin-til-grill-og-bbq", "vin-til-krydret-og-staerk-mad"],
    ingredients: ["600 g lammekød eller okse i tern", "150 ml ung rødvin", "2 tsk paprika og spisskummen", "3 fed hvidløg", "Pitabrød, tzatziki og salat"],
    instructions: ["Marinér kød 4 timer i rødvin og krydderier.", "Skær på spyd. Grill 10–12 min.", "Server i pitabrød med tzatziki og salat."],
    intro: `Kebab-spyd med rødvin er grill-kebab derhjemme: mørt kød marineret i **rødvin og krydderier**, grillet på spyd. Se [shawarma-kylling med hvidvin](/opskrifter/shawarma-kylling-med-hvidvin) og [vin til kebab](/guides/vin-til-kebab-og-shawarma).`,
    whyTitle: "Hvorfor rødvin i kebab-marinade",
    why: `Kebab har **krydderier og fedt** — rødvin mørner kød og tilføjer frugt. Ung gamay eller tempranillo — marinér 4+ timer. Grill hårdt for stegeskorpe.`,
    tips: [["Kød", "Lam er klassisk — okse fungerer også."], ["Spyd", "Ikke pres kød — saft forsvinder."], ["Marinade", "Gem ikke rå marinade — kog ned hvis genbrug."], ["Grill", "Høj varme — karamelliserede kanter."]],
    serving: `Med pommes, salat og hvidløgsauce. Kebab-aften med [falafel-tallerken](/opskrifter/falafel-tallerken-med-hvidvin).`,
    mistakes: ["For kort marinade — flad smag.", "For tung rødvin — bitter.", "Overgrillet — tørt kød.", "Kold pita — fyld falder ud."],
    storage: `Marineret kød 24 timer. Tilberedt 3 dage. **Variation:** Kylling på samme spyd.`,
    glass: `Ung, frugtig rød — gamay eller tempranillo. Se [vin til kebab](/guides/vin-til-kebab-og-shawarma).`,
  },
  {
    slug: "falafel-tallerken-med-hvidvin",
    title: "Falafel-tallerken med hvidvin — hummus og salat",
    description: "Sprød falafel med hummus, salat og hvidvin i tahinsauce. Opskrift til 4.",
    tags: ["opskrift", "mellemøstlig", "vegetar", "hvidvin", "hverdag"],
    prepTime: "PT30M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: { style: "Tør hvidvin — pinot grigio, albariño eller assyrtiko", amount: "60 ml i tahinsauce", note: "Hvidvin i tahin giver syre til hummus og falafel — let og frisk." },
    wineToDrink: { guideSlug: "vin-til-falafel-og-hummus", searchQuery: "falafel hummus hvidvin", searchMax: 120, label: "vin til falafel" },
    relatedGuides: ["vin-til-falafel-og-hummus", "vin-til-vegetar-og-gront", "vin-til-mellemoestlig-mad"],
    ingredients: ["400 g falafel (hjemmelavet eller købt)", "200 g hummus", "60 ml hvidvin i tahinsauce", "Salat, tomat, agurk og pitabrød", "Tahin, citron og olivenolie"],
    instructions: ["Bland tahin med citron, hvidvin og vand.", "Steg falafel sprød.", "Anret tallerken: hummus, falafel, salat, tahin.", "Server med pitabrød og oliven."],
    intro: `Falafel-tallerken med hvidvin er mellemøstlig vegetarmad: sprød falafel, hummus og **tahinsauce med hvidvin** der giver syre til belug linser og sesam. Se [vin til falafel og hummus](/guides/vin-til-falafel-og-hummus).`,
    whyTitle: "Hvorfor hvidvin til falafel",
    why: `Falafel og hummus er **fedt og krydret** — hvidvin i tahin giver frisk syre. Tør pinot grigio eller albariño — diskret, ikke dominerende. Server med frisk salat og citron.`,
    tips: [["Falafel", "Steg sprød — blød falafel er kedelig."], ["Hummus", "Rør olivenolie på top — klassisk."], ["Tahin", "Fortyn langsomt — undgå klumper."], ["Salat", "Frisk og sprød — kontrast til falafel."]],
    serving: `Som hovedret eller deleret. Med [shawarma-kylling](/opskrifter/shawarma-kylling-med-hvidvin) til mix-tallerken.`,
    mistakes: ["For tung tahin — tør mund.", "Sød hvidvin — ubalanceret.", "Våd falafel — steg længere.", "For lidt citron — flad smag."],
    storage: `Falafel 3 dage — genvarm i ovn. Tahin 4 dage. **Variation:** Rødbede-hummus.`,
    glass: `Frisk hvid med syre — se [vin til falafel](/guides/vin-til-falafel-og-hummus).`,
  },
  {
    slug: "lammegryde-mynte-hvidvin",
    title: "Lammegryde med mynte og hvidvin — nordafrikansk inspireret",
    description: "Lammekød simret med mynte, citron og hvidvin. Opskrift til 4 med couscous.",
    tags: ["opskrift", "lam", "hvidvin", "gryderet", "mynte"],
    prepTime: "PT20M",
    cookTime: "PT90M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: { style: "Tør hvidvin — assyrtiko, albariño eller pinot grigio", amount: "200 ml i gryden", note: "Hvidvin simrer med lam og mynte — giver syre til fedt kød." },
    wineToDrink: { guideSlug: "vin-til-lam", searchQuery: "lam mynte hvidvin", searchMax: 120, label: "vin til lam" },
    relatedGuides: ["vin-til-lam", "vin-til-mellemoestlig-mad", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: ["800 g lammeskulder i tern", "200 ml hvidvin", "Frisk mynte og citron", "1 løg, 2 gulerødder", "500 ml lammefond", "Couscous til servering"],
    instructions: ["Brun lam. Steg løg og gulerødder.", "Tilsæt hvidvin, fond, mynte og citron.", "Simr 1,5 time til mørt.", "Server med couscous og frisk mynte."],
    intro: `Lammegryde med mynte og hvidvin er aromatisk gryderet: mørt lam i **hvidvin med mynte og citron**. Se [lammekoteletter i rødvin](/opskrifter/lammekoteletter-i-rodvin) og [vin til lam](/guides/vin-til-lam).`,
    whyTitle: "Hvorfor hvidvin til lammegryde",
    why: `Lam har **stærk smag og fedt** — hvidvin med mynte giver frisk syre. Simr 1,5 time til mørt. Assyrtiko eller albariño matcher mynte og citron bedre end tung rød.`,
    tips: [["Skæring", "Skulder — collagen giver mørhed."], ["Mynte", "Frisk til sidst — tør mynte i simring."], ["Simring", "Lav varme under låg."], ["Citron", "Skal og saft — aromatisk dybde."]],
    serving: `Med couscous og grøn salat. Med [kebab-spyd](/opskrifter/kebab-spyd-med-rodvin) til lam-menu.`,
    mistakes: ["For kort simring — sejt lam.", "For meget mynte — bedøvende.", "Tung hvidvin — dominerer.", "For høj varme — tørt kød."],
    storage: `4 dage — smager bedre dagen efter. Fryses. **Variation:** Tilsæt oliven og abrikos.`,
    glass: `Tør hvid eller let rød — se [vin til lam](/guides/vin-til-lam).`,
  },
  {
    slug: "andebaer-portvin-sauce",
    title: "Andebryst med portvinsauce — festret med frugt",
    description: "Stegt andebryst med portvinsauce, appelsin og timian. Opskrift til 4.",
    tags: ["opskrift", "and", "portvin", "fest", "fransk"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "hard",
    wineInRecipe: { style: "Ruby eller tawny portvin — eller moden rød port", amount: "100 ml i saucen", note: "Portvin reduceres med andefond — klassisk fransk teknik til and." },
    wineToDrink: { guideSlug: "vin-til-and", searchQuery: "andebryst portvin pinot noir", searchMax: 150, label: "vin til and" },
    relatedGuides: ["vin-til-and", "vin-til-gaas", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: ["4 andebryst", "100 ml portvin", "100 ml andefond", "Saft af 1 appelsin", "Timian, salt og peber", "Rødkål og kartoffelpuré"],
    instructions: ["Skær andebryst, steg skind ned til sprød.", "Tag ud. Hæld portvin i, reducer.", "Tilsæt fond og appelsin. Kog til glace.", "Skær and, server med sauce."],
    intro: `Andebryst med portvinsauce er festklassiker: sprødt skind og **portvin reduceret til glace** med appelsin. Se [andesteg med port og hvidvin](/opskrifter/andesteg-med-port-og-hvidvin) og [vin til and](/guides/vin-til-and).`,
    whyTitle: "Hvorfor portvin til and",
    why: `And har **fedt og gamey smag** — portvin giver sødme og frugt der balancerer. Ruby port reduceres med fond — alkohol fordamper, koncentreret glace. Undgå for sød tawny til hovedsauce — ruby er klassisk.`,
    tips: [["Skind", "Steg skind ned — sprød uden at brænde."], ["Hvile", "And hviler 5 min — saft fordeler sig."], ["Glace", "Reducer til sirup — tynd sauce løber."], ["Appelsin", "Frisk saft — syre mod fedt."]],
    serving: `Med rødkål og kartoffelpuré. Julemenu med [risalamande](/opskrifter/risalamande-med-hvidvin).`,
    mistakes: ["Overstegt and — tør bryst.", "For sød sauce — ubalanceret.", "Ingen hvile — tør skæring.", "For tynd glace — ingen dybde."],
    storage: `And 2 dage — genvarm skind i ovn. Sauce 3 dage. **Variation:** Kirsebær i stedet for appelsin.`,
    glass: `Pinot noir eller port til ost — se [vin til and](/guides/vin-til-and).`,
  },
  {
    slug: "aeblekage-hvidvin-karamel",
    title: "Æblekage med hvidvin-karamel — dansk dessert",
    description: "Sprød æblekage med karamel reduceret med hvidvin og flødeskum. Opskrift til 6.",
    tags: ["opskrift", "dessert", "æble", "hvidvin", "julefrokost"],
    prepTime: "PT30M",
    cookTime: "PT45M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: { style: "Halvtør riesling eller æble-inspireret hvidvin", amount: "100 ml i karamellen", note: "Hvidvin i karamel giver syre til sødme — dansk dessert-twist." },
    wineToDrink: { guideSlug: "vin-til-julefrokost", searchQuery: "æblekage dessertvin riesling", searchMax: 120, label: "vin til æblekage" },
    relatedGuides: ["vin-til-julefrokost", "vin-til-dessert-og-kransekage", "vin-til-aebleskiver"],
    ingredients: ["6 æbler", "200 g smør og 200 g sukker til bund", "150 g mel", "100 ml halvtør hvidvin", "2 dl pisket fløde", "Kanel"],
    instructions: ["Kog sukker til karamel. Tilsæt hvidvin — pas på sprøjt.", "Bland bund af smør, sukker, mel.", "Bag æbler med kanel. Vend bund.", "Server med flødeskum og hvidvin-karamel."],
    intro: `Æblekage med hvidvin-karamel er opgraderet dansk klassiker: sprød bund, bagte æbler og **karamel med hvidvin** der giver syre til sødme. Se [vin til julefrokost](/guides/vin-til-julefrokost) og [æbleskiver-guide](/guides/vin-til-aebleskiver).`,
    whyTitle: "Hvorfor hvidvin i karamel",
    why: `Æblekage er **sød og fed** — hvidvin i karamel tilføjer syre og frugt. Halvtør riesling matcher æbler. Tilsæt forsigtigt — karamel sprøjter. Syre balancerer flødeskum.`,
    tips: [["Karamel", "Tilsæt vin langsomt — brændingsfare."], ["Æbler", "Syrlige æbler — balance til sød bund."], ["Bund", "Vend mens varm — ellers knækker."], ["Fløde", "Pisk stiv — kontrast til varm kage."]],
    serving: `Lun med flødeskum. Dessert efter [sild i hvidvinseddike](/opskrifter/sild-i-hvidvinseddike).`,
    mistakes: ["Brændt karamel — bitter.", "For sød uden syre — tung dessert.", "Blød bund — for lidt bagning.", "Tør hvid uden frugt — flad karamel."],
    storage: `2 dage — genvarm bund i ovn. Karamel 5 dage. **Variation:** Pærer i stedet for æbler.`,
    glass: `Halvtør riesling eller dessertvin — se [vin til julefrokost](/guides/vin-til-julefrokost).`,
  },
  {
    slug: "risalamande-med-hvidvin",
    title: "Risalamande med hvidvin — juleklassiker med twist",
    description: "Risalamande med hvidvin i risgrød og kirsebærsauce. Opskrift til 8.",
    tags: ["opskrift", "dessert", "julefrokost", "hvidvin", "ris"],
    prepTime: "PT30M",
    cookTime: "PT40M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: { style: "Halvtør hvidvin — riesling eller mousserende", amount: "100 ml i risgrød", note: "Hvidvin koges ind i risgrød — frisk syre til fløde og mandel." },
    wineToDrink: { guideSlug: "vin-til-julefrokost", searchQuery: "risalamande julevin mousserende", searchMax: 120, label: "vin til risalamande" },
    relatedGuides: ["vin-til-julefrokost", "vin-til-julemad-den-store-guide", "vin-til-dessert-og-kransekage"],
    ingredients: ["2 dl grødris", "1 l mælk", "100 ml halvtør hvidvin", "2 dl pisket fløde", "100 g hakkede mandel", "1 helt mandel", "Kirsebærsauce"],
    instructions: ["Kog ris i mælk. Tilsæt hvidvin de sidste 10 min.", "Afkøl. Vend fløde og mandel i.", "Gem helt mandel. Server med kirsebærsauce."],
    intro: `Risalamande med hvidvin er julefrokost med twist: cremet risgrød med **hvidvin kogt ind** i stedet for kun vanilje — syre til fløde og mandel. Se [vin til julefrokost](/guides/vin-til-julefrokost).`,
    whyTitle: "Hvorfor hvidvin i risalamande",
    why: `Risalamande er **fed og sød** — hvidvin i grød giver frisk syre. Halvtør riesling koges ind de sidste 10 minutter. Mandel og fløde balanceres — klassisk juleleg med helt mandel.`,
    tips: [["Ris", "Al dente — grød må ikke være grød."], ["Afkøling", "Fuldstændig afkøl før fløde — ellers smelter."], ["Mandel", "Gem helt mandel til leg."], ["Sauce", "Varm kirsebærsauce ved siden af."]],
    serving: `Som julefrokost-dessert med [æblekage hvidvin-karamel](/opskrifter/aeblekage-hvidvin-karamel).`,
    mistakes: ["Våd grød — for meget mælk.", "Varm fløde i varm grød — smelter.", "Tør hvid uden frugt.", "For tidlig servering — ris skal sætte sig."],
    storage: `2 dage i køleskab. **Variation:** Tilsæt appelsinskal til grød.`,
    glass: `Mousserende eller halvtør hvid — se [vin til julefrokost](/guides/vin-til-julefrokost).`,
  },
  {
    slug: "shakshuka-med-hvidvin",
    title: "Shakshuka med hvidvin — æg i tomatsauce",
    description: "Nordafrikansk shakshuka med hvidvin i tomatsaucen og pocherede æg. Opskrift til 4.",
    tags: ["opskrift", "mellemøstlig", "æg", "hvidvin", "brunch"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: { style: "Tør hvidvin — pinot grigio, vermentino eller albariño", amount: "100 ml i tomatsauce", note: "Hvidvin giver syre til tomater og krydderier — kog ind før æg." },
    wineToDrink: { guideSlug: "vin-til-shakshuka", searchQuery: "shakshuka hvidvin rosé", searchMax: 120, label: "vin til shakshuka" },
    relatedGuides: ["vin-til-shakshuka", "vin-til-vegetar-og-gront", "vin-til-brunch"],
    ingredients: ["400 g hakkede tomater", "100 ml hvidvin", "4 æg", "1 peberfrugt", "Spisskummen, paprika og hvidløg", "Feta og brød"],
    instructions: ["Steg peber, løg og krydderier.", "Tilsæt tomater og hvidvin. Simr 15 min.", "Slå æg i. Læg låg 8 min.", "Top med feta. Server med brød."],
    intro: `Shakshuka med hvidvin er brunch-klassiker: pocherede æg i **tomatsauce med hvidvin** og krydderier. Se [vin til shakshuka](/guides/vin-til-shakshuka) og [ratatouille med hvidvin](/opskrifter/ratatouille-med-hvidvin).`,
    whyTitle: "Hvorfor hvidvin i shakshuka",
    why: `Shakshuka har **tomater, krydderier og æg** — hvidvin tilfører syre til søde tomater. Kog ind før æg slås i. Tør pinot grigio — undgå tung chardonnay.`,
    tips: [["Æg", "Låg på — stegte æggehvider, runny gul."], ["Sauce", "Tyk nok til at holde æg — kog ind."], ["Feta", "Tilsæt til sidst — salt og cremet."], ["Brød", "Surdej — dyp i sauce."]],
    serving: `Direkte fra gryde med brød. Brunch med [quiche med hvidvin](/opskrifter/quiche-med-hvidvin).`,
    mistakes: ["For vandig sauce — æg svømmer.", "Overstegte æg — hårde gul.", "For lidt krydderi — flad smag.", "Rå hvidvin-smag — kog ind."],
    storage: `Spises frisk — æg genopvarmes dårligt. **Variation:** Tilsæt chorizo til non-vegetar.`,
    glass: `Rosé eller frisk hvid — se [vin til shakshuka](/guides/vin-til-shakshuka).`,
  },
  {
    slug: "gnocchi-rodvinssauce",
    title: "Gnocchi i rødvinsauce — italiensk komfort",
    description: "Kartoffelgnocchi i rødvinsauce med parmesan og urter. Opskrift til 4.",
    tags: ["opskrift", "italiensk", "pasta", "rødvin", "vegetar"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: { style: "Ung sangiovese, chianti eller barbera", amount: "150 ml i saucen", note: "Rødvinsauce til gnocchi — samme logik som ragù med kortere tid." },
    wineToDrink: { guideSlug: "vin-til-pizza-og-pasta", searchQuery: "gnocchi chianti rødvin", searchMax: 120, label: "vin til gnocchi" },
    relatedGuides: ["vin-til-pizza-og-pasta", "vin-til-italiensk-mad", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: ["500 g gnocchi", "150 ml rødvin", "200 g hakkede tomater", "50 g parmesan", "Hvidløg, rosmarin og olivenolie"],
    instructions: ["Kog gnocchi. Tag ud.", "Steg hvidløg. Tilsæt vin, tomater.", "Simr 10 min. Vend gnocchi i.", "Server med parmesan og rosmarin."],
    intro: `Gnocchi i rødvinsauce er italiensk komfort: bløde kartoffelklumper i **rødvins-tomatsauce** med parmesan. Se [bolognese med rødvin](/opskrifter/bolognese-med-rodvin) og [lasagne med rødvin](/opskrifter/lasagne-med-rodvin).`,
    whyTitle: "Hvorfor rødvin til gnocchi",
    why: `Gnocchi er **mild og stivelsesrig** — rødvinsauce giver syre og dybde. Sangiovese eller barbera simrer kort med tomater. Undgå at overkoge gnocchi — de falder fra hinanden.`,
    tips: [["Gnocchi", "Kog til de flyder — straks ud."], ["Sauce", "Tyk nok til at klæbe — reducer."], ["Parmesan", "Riv ved servering — ikke i gryden."], ["Urter", "Frisk rosmarin til sidst."]],
    serving: `Med grøn salat. Italiensk aften med [pesto-pasta hvidvin](/opskrifter/pesto-pasta-hvidvin).`,
    mistakes: ["Overkogte gnocchi — grød.", "For tynd sauce — vandig.", "Bitter rødvin — ung cabernet.", "For meget sauce — drukner gnocchi."],
    storage: `Spises frisk — gnocchi bliver bløde. **Variation:** Ricotta-gnocchi.`,
    glass: `Chianti eller barbera — se [vin til pizza og pasta](/guides/vin-til-pizza-og-pasta).`,
  },
  {
    slug: "pesto-pasta-hvidvin",
    title: "Pesto-pasta med hvidvin — frisk sommerret",
    description: "Pasta med basilikumpesto og hvidvin i pastavandet og saucen. Opskrift til 4.",
    tags: ["opskrift", "italiensk", "pasta", "hvidvin", "sommer"],
    prepTime: "PT15M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: { style: "Tør hvidvin — vermentino, pinot grigio eller falanghina", amount: "80 ml i saucen", note: "Hvidvin løfter pesto med syre — tilsæt ved samling af pasta." },
    wineToDrink: { guideSlug: "vin-til-pizza-og-pasta", searchQuery: "pesto pasta vermentino hvidvin", searchMax: 120, label: "vin til pesto-pasta" },
    relatedGuides: ["vin-til-pizza-og-pasta", "vin-til-italiensk-mad", "vin-til-sommer"],
    ingredients: ["400 g pasta", "80 ml hvidvin", "4 spsk pesto", "50 g parmesan", "Cherrytomater og pinjekerner", "Olivenolie"],
    instructions: ["Kog pasta. Gem pastavand.", "Varm pesto med hvidvin og pastavand.", "Vend pasta i. Tilsæt parmesan.", "Top med tomater og pinjekerner."],
    intro: `Pesto-pasta med hvidvin er sommer på tallerken: frisk basilikumpesto med **hvidvin der giver syre** til olie og ost. Se [carbonara med hvidvin](/opskrifter/carbonara-med-hvidvin) og [vin til pizza og pasta](/guides/vin-til-pizza-og-pasta).`,
    whyTitle: "Hvorfor hvidvin i pesto-pasta",
    why: `Pesto er **fed fra olie, ost og nødder** — hvidvin tilfører frisk syre. Tilsæt ved samling med pastavand — stivelse binder. Vermentino eller pinot grigio — ikke tung chardonnay.`,
    tips: [["Pesto", "Hjemmelavet eller kvalitets-købt — basilikum frisk."], ["Pastavand", "Saltet — smag til saucen."], ["Tomater", "Rå cherry — kontrast til varm pasta."], ["Pinjekerner", "Rist — ekstra nødde."]],
    serving: `Med grøn salat. Sommer-menu med [grillet laks](/opskrifter/grillet-laks-hvidvin-dressing).`,
    mistakes: ["For meget pesto — tung og salt.", "Ingen pastavand — tør pasta.", "Overvarmet pesto — bitter basilikum.", "Sød hvidvin — ubalanceret."],
    storage: `Spises frisk — pesto mister farve. **Variation:** Zucchini-bånd med samme sauce.`,
    glass: `Vermentino eller pinot grigio — se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
  },
  {
    slug: "vegetar-gryderet-rodvin",
    title: "Vegetar-gryderet med rødvin — rodfrugter og bælgfrugter",
    description: "Vegetar-gryderet med rodfrugter, linser og rødvin. Opskrift til 6.",
    tags: ["opskrift", "vegetar", "rødvin", "gryderet", "vinter"],
    prepTime: "PT20M",
    cookTime: "PT50M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: { style: "Ung rødvin — gamay, pinot noir eller côtes du rhône", amount: "250 ml i gryden", note: "Rødvin simrer med rodfrugter og linser — dybde uden kød." },
    wineToDrink: { guideSlug: "vin-til-vegetar-og-gront", searchQuery: "vegetar gryderet gamay rødvin", searchMax: 120, label: "vin til vegetar-gryderet" },
    relatedGuides: ["vin-til-vegetar-og-gront", "vin-til-gryderet", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: ["2 gulerødder, 2 pastinakker, 1 squash", "200 g røde linser", "250 ml rødvin", "400 g hakkede tomater", "Timian, rosmarin og olivenolie"],
    instructions: ["Steg rodfrugter. Tilsæt linser, vin og tomater.", "Simr 40 min til møre. Smag til.", "Server med brød og persille."],
    intro: `Vegetar-gryderet med rødvin er vintermad uden kød: rodfrugter, linser og **rødvin der simrer dybde** i gryden. Se [ratatouille med hvidvin](/opskrifter/ratatouille-med-hvidvin) og [vin til vegetar og grønt](/guides/vin-til-vegetar-og-gront).`,
    whyTitle: "Hvorfor rødvin i vegetar-gryderet",
    why: `Vegetariske gryderetter mangler ofte **umami fra kød** — rødvin tilfører frugt, syre og dybde. Gamay eller pinot simrer med tomater og linser. Samme princip som [boeuf bourguignon](/opskrifter/boeuf-bourguignon) uden okse.`,
    tips: [["Linser", "Røde linser koger hurtigt — tilsæt efter rodfrugter."], ["Rodfrugter", "Ens skæring — jævn mørhed."], ["Simring", "Lav varme — smag udvikler sig."], ["Urter", "Frisk persille ved servering."]],
    serving: `Med brød og grøn salat. Med [shakshuka med hvidvin](/opskrifter/shakshuka-med-hvidvin) til vegetar-menu.`,
    mistakes: ["For kort simring — hårde rodfrugter.", "For tung rødvin — bitter.", "For meget væske — suppe i stedet for gryderet.", "For lidt salt — flad smag."],
    storage: `4 dage — smager bedre dagen efter. Fryses. **Variation:** Tilsæt svamp og porrer.`,
    glass: `Ung gamay eller pinot — se [vin til vegetar og grønt](/guides/vin-til-vegetar-og-gront).`,
  },
  {
    slug: "wok-rejer-hvidvin",
    title: "Wok-rejer med hvidvin — hurtig ret med ingefær",
    description: "Rejer wok-stegt med hvidvin, ingefær og forårsløg. Opskrift til 4.",
    tags: ["opskrift", "rejer", "hvidvin", "wok", "asiatisk"],
    prepTime: "PT15M",
    cookTime: "PT10M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: { style: "Tør hvidvin — riesling, pinot grigio eller albariño", amount: "100 ml i saucen", note: "Hvidvin erstatter dele af soja — frisk syre til rejer." },
    wineToDrink: { guideSlug: "vin-til-wok", searchQuery: "wok rejer hvidvin riesling", searchMax: 120, label: "vin til wok-rejer" },
    relatedGuides: ["vin-til-wok", "vin-til-rejer", "vin-til-asiatisk-mad"],
    ingredients: ["400 g rejer", "100 ml hvidvin", "2 spsk soja", "Ingefær, hvidløg og forårsløg", "Sesamolie og jasminris"],
    instructions: ["Wok på høj varme. Steg ingefær og hvidløg.", "Tilsæt rejer 2 min. Hæld hvidvin i.", "Tilsæt soja. Rør 1 min.", "Top med forårsløg og sesam. Server med ris."],
    intro: `Wok-rejer med hvidvin er hurtig asiatisk ret: saftige rejer i **hvidvin og ingefær** på få minutter. Se [rejer i hvidvin](/opskrifter/rejer-i-hvidvin) og [wok-kylling med hvidvin](/opskrifter/wok-kylling-med-hvidvin). [Vin til wok](/guides/vin-til-wok).`,
    whyTitle: "Hvorfor hvidvin til wok-rejer",
    why: `Rejer har **delikat, sød smag** — hvidvin giver syre uden at overdøve. Høj varme, kort tid — alkohol fordamper på sekunder. Riesling eller pinot grigio — undgå tung egetræs-hvid.`,
    tips: [["Rejer", "Tør rejer — ellers koger de."], ["Wok", "Høj varme — rejer skal være pink."], ["Tid", "Max 3 min total — gummiagtige rejer er oversteget."], ["Sesam", "Ristet sesam til topping."]],
    serving: `Med jasminris og lime. Thai-menu med [pad thai](/opskrifter/pad-thai-med-hvidvin).`,
    mistakes: ["Overstegte rejer — gummiagtige.", "For våd wok — kogte rejer.", "For meget soja — salt uden balance.", "Lav varme — kogt wok."],
    storage: `Spises straks — rejer genopvarmes dårligt. **Variation:** Chili og cashew.`,
    glass: `Riesling eller albariño — se [vin til wok](/guides/vin-til-wok).`,
  },
  {
    slug: "dim-sum-kylling-hvidvin",
    title: "Dim sum med kylling og hvidvin — dampede dumplings",
    description: "Hjemmelavede kyllinge-dumplings med hvidvin i fyldet. Opskrift til 4.",
    tags: ["opskrift", "kinesisk", "dim sum", "kylling", "hvidvin"],
    prepTime: "PT45M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "hard",
    wineInRecipe: { style: "Tør hvidvin — pinot grigio, riesling eller albariño", amount: "2 spsk i kyllingefyld", note: "Hvidvin i fyld giver saft og syre — dampning bevarer smag." },
    wineToDrink: { guideSlug: "vin-til-sushi", searchQuery: "dim sum kylling riesling hvidvin", searchMax: 120, label: "vin til dim sum" },
    relatedGuides: ["vin-til-sushi", "vin-til-dim-sum", "vin-til-asiatisk-mad"],
    ingredients: ["300 g kylling, finthakket", "2 spsk hvidvin", "1 spsk soja og sesamolie", "30 wonton- eller dumpling-skær", "Forårsløg og ingefær", "Sojasauce til dipping"],
    instructions: ["Bland kylling, hvidvin, soja, ingefær og forårsløg.", "Fyld skær, fold dumplings.", "Damp 12 min i bambuskurv.", "Server med soja og chili-olie."],
    intro: `Dim sum med kylling og hvidvin er hjemmelavet kinesisk klassiker: dampede dumplings med **hvidvin i saftigt kyllingefyld**. Se [vin til sushi](/guides/vin-til-sushi) og [vin til dim sum](/guides/vin-til-dim-sum).`,
    whyTitle: "Hvorfor hvidvin i dim sum-fyld",
    why: `Kyllingefyld til dumplings skal være **saftigt** — hvidvin tilfører væske og syre. Dampning bevarer saft; alkohol fordamper. Finthakket kylling og forårsløg — klassisk siu mai-stil hjemme.`,
    tips: [["Fyld", "Ikke overfyld — dumplings brister ved dampning."], ["Fold", "Tæt lukning — væske bliver inde."], ["Damp", "Kogende vand — 12 min uden at åbne."], ["Dej", "Færdigkøbte skær sparer tid."]],
    serving: `Som forret eller deleret med [ramen kylling hvidvin](/opskrifter/ramen-kylling-med-hvidvin).`,
    mistakes: ["Overfyldt dumpling — brister.", "For tykt fyld — rå kylling i midten.", "For kort dampning — rå dej.", "For meget hvidvin — vådt fyld."],
    storage: `Rå dumplings fryses — damp fra frossen +5 min. Tilberedte samme dag. **Variation:** Rejer i halvdelen af fyldet.`,
    glass: `Riesling eller pinot grigio — se [vin til sushi](/guides/vin-til-sushi).`,
  },
];

const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-nachos": [{ slug: "nachos-med-rodvinskaesesovs", label: "Nachos med rødvinskaesesovs" }],
  "vin-til-kebab-og-shawarma": [
    { slug: "shawarma-kylling-med-hvidvin", label: "Shawarma-kylling med hvidvin" },
    { slug: "kebab-spyd-med-rodvin", label: "Kebab-spyd med rødvin" },
  ],
  "vin-til-burger": [{ slug: "burger-med-rodvinsglace", label: "Burger med rødvinsglace" }],
  "vin-til-pho": [{ slug: "pho-kylling-med-hvidvin", label: "Pho med kylling og hvidvin" }],
  "vin-til-ramen": [{ slug: "ramen-kylling-med-hvidvin", label: "Ramen med kylling og hvidvin" }],
  "vin-til-tacos": [{ slug: "tacos-med-rodvin-okse", label: "Tacos med okse og rødvin" }],
  "vin-til-karryretter": [{ slug: "karrykylling-med-hvidvin", label: "Karrykylling med hvidvin" }],
  "vin-til-ceviche": [{ slug: "ceviche-med-hvidvin", label: "Ceviche med hvidvin" }],
  "vin-til-quiche": [{ slug: "quiche-med-hvidvin", label: "Quiche med hvidvin" }],
  "vin-til-sild": [{ slug: "sild-i-hvidvinseddike", label: "Sild i hvidvinseddike" }],
  "vin-til-falafel-og-hummus": [{ slug: "falafel-tallerken-med-hvidvin", label: "Falafel-tallerken med hvidvin" }],
  "vin-til-lam": [{ slug: "lammegryde-mynte-hvidvin", label: "Lammegryde med mynte og hvidvin" }],
  "vin-til-asiatisk-mad": [
    { slug: "pad-thai-med-hvidvin", label: "Pad thai med hvidvin" },
    { slug: "dim-sum-kylling-hvidvin", label: "Dim sum med kylling og hvidvin" },
    { slug: "couscous-kylling-med-hvidvin", label: "Couscous med kylling og hvidvin" },
    { slug: "pho-kylling-med-hvidvin", label: "Pho med kylling og hvidvin" },
    { slug: "ramen-kylling-med-hvidvin", label: "Ramen med kylling og hvidvin" },
  ],
  "vin-til-wok": [
    { slug: "wok-rejer-hvidvin", label: "Wok-rejer med hvidvin" },
    { slug: "wok-kylling-med-hvidvin", label: "Wok-kylling med hvidvin" },
  ],
  "vin-til-vegetar-og-gront": [
    { slug: "vegetar-gryderet-rodvin", label: "Vegetar-gryderet med rødvin" },
    { slug: "shakshuka-med-hvidvin", label: "Shakshuka med hvidvin" },
  ],
  "vin-til-julefrokost": [
    { slug: "risalamande-med-hvidvin", label: "Risalamande med hvidvin" },
    { slug: "aeblekage-hvidvin-karamel", label: "Æblekage med hvidvin-karamel" },
    { slug: "sild-i-hvidvinseddike", label: "Sild i hvidvinseddike" },
  ],
  "vin-til-laks": [{ slug: "grillet-laks-hvidvin-dressing", label: "Grillet laks med hvidvindressing" }],
  "vin-til-sushi": [{ slug: "dim-sum-kylling-hvidvin", label: "Dim sum med kylling og hvidvin" }],
};

function updateGuideRecipeLinks(additions) {
  let content = fs.readFileSync(GUIDE_LINKS_PATH, "utf8");
  let added = 0;

  for (const [guideSlug, links] of Object.entries(additions)) {
    for (const link of links) {
      if (content.includes(`slug: "${link.slug}"`) && content.includes(`"${guideSlug}"`)) continue;
      const keyRe = new RegExp(`"${guideSlug}":\\s*\\[`);
      if (keyRe.test(content)) {
        const insertRe = new RegExp(`("${guideSlug}":\\s*\\[[\\s\\S]*?)(\\n  \\],)`);
        if (insertRe.test(content) && !content.match(new RegExp(`"${guideSlug}":[\\s\\S]*?slug: "${link.slug}"`))) {
          content = content.replace(
            insertRe,
            `$1\n    { slug: "${link.slug}", label: ${JSON.stringify(link.label)} },$2`
          );
          added++;
        }
      } else {
        const closing = content.lastIndexOf("\n};");
        const entry = `  "${guideSlug}": [\n    { slug: "${link.slug}", label: ${JSON.stringify(link.label)} },\n  ],\n`;
        content = content.slice(0, closing) + entry + content.slice(closing);
        added++;
      }
    }
  }

  fs.writeFileSync(GUIDE_LINKS_PATH, content);
  return added;
}

// --- Main ---
const force = process.argv.includes("--force");

if (!fs.existsSync(RECIPES_DIR)) fs.mkdirSync(RECIPES_DIR, { recursive: true });

const created = [];
const skipped = [];
const wordCounts = [];

for (const recipe of RECIPES) {
  const filePath = path.join(RECIPES_DIR, `${recipe.slug}.mdx`);
  if (fs.existsSync(filePath) && !force) {
    skipped.push(recipe.slug);
    continue;
  }
  const mdx = buildMdx(recipe);
  const words = countBodyWords(mdx);
  if (words < 400) {
    console.warn(`WARN: ${recipe.slug} har kun ${words} ord i body (krav: ≥400)`);
  }
  fs.writeFileSync(filePath, mdx);
  created.push(recipe.slug);
  wordCounts.push({ slug: recipe.slug, words });
}

const linksAdded = updateGuideRecipeLinks(GUIDE_RECIPE_ADDITIONS);

console.log(`\nOpskrifter: ${created.length} oprettet, ${skipped.length} sprunget over (fandtes).`);
console.log(`Guide-recipe-links: ${linksAdded} nye links tilføjet.\n`);

if (created.length) {
  console.log("Oprettede filer:");
  for (const { slug, words } of wordCounts) {
    console.log(`  - ${slug}.mdx (${words} ord)`);
  }
}

const sample = wordCounts.slice(0, 3);
if (sample.length) {
  console.log("\nOrdoptælling (stikprøve):");
  for (const s of sample) console.log(`  ${s.slug}: ${s.words} ord`);
}

if (created.length !== 31 && skipped.length === 0) {
  console.error(`FEJL: Forventede 31 nye filer, oprettede ${created.length}.`);
  process.exit(1);
}

