/** Bubbles Any Day recipes batch 2. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  "smash-burger-med-troffelmayo":
    "Smash burger med cheddar og trøffelmayo — Crémant eller champagne under 300 kr tæmmer fedme og salt skorpe.",
  "sprode-foraarsruller-med-bobler":
    "Sprøde forårsruller (friture) — tør mousserende vin som ganerenser.",
  "gougeres":
    "Franske oste-vandbakkelser med gruyère — Champagne-regionens snack. Crémant/Cava i glasset.",
  "luksus-nachos-med-cava":
    "Nachos med cheddar og jalapeños — iskold Cava/Prosecco Brut. Adskilt fra rødvin-osteversionen.",
  "kartoffelchips-med-stenbiderrogn":
    "Chips, cremefraiche og stenbiderrogn — hurtig dekadence med Brut Nature.",
  "cava-svamperisotto":
    "Svamperisotto afkogt med Cava i stedet for stille hvidvin — lettere, syrerig struktur.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "friture-og-bobler": [
    { slug: "sprode-foraarsruller-med-bobler", label: "Sprøde forårsruller" },
    { slug: "kartoffelchips-med-stenbiderrogn", label: "Chips med stenbiderrogn" },
  ],
  "bobler-paa-en-tirsdag": [
    { slug: "smash-burger-med-troffelmayo", label: "Smash burger med trøffelmayo" },
    { slug: "luksus-nachos-med-cava", label: "Nachos med Cava" },
    { slug: "gougeres", label: "Gougères" },
  ],
  "hverdags-bobler": [
    { slug: "smash-burger-med-troffelmayo", label: "Smash burger" },
    { slug: "luksus-nachos-med-cava", label: "Nachos med Cava" },
    { slug: "gougeres", label: "Gougères" },
    { slug: "cava-svamperisotto", label: "Cava-svamperisotto" },
  ],
  "champagne-til-mad": [
    { slug: "gougeres", label: "Gougères" },
    { slug: "smash-burger-med-troffelmayo", label: "Smash burger" },
    { slug: "kartoffelchips-med-stenbiderrogn", label: "Chips med stenbiderrogn" },
  ],
  "bedste-champagne-under-300-kr": [
    { slug: "smash-burger-med-troffelmayo", label: "Smash burger med trøffelmayo" },
  ],
  "bobler-til-takeaway-og-fastfood": [
    { slug: "smash-burger-med-troffelmayo", label: "Smash burger" },
    { slug: "sprode-foraarsruller-med-bobler", label: "Forårsruller" },
  ],
  "hverdagsbobler-under-100-til-mad": [
    { slug: "luksus-nachos-med-cava", label: "Nachos med Cava" },
  ],
};

export const RECIPES = [
  r({
    slug: "smash-burger-med-troffelmayo",
    title: "Smash burger med trøffelmayo",
    description:
      "Smash burger med cheddar og trøffelmayo — Crémant eller champagne under 300 kr. Opskrift til 4.",
    tags: ["opskrift", "burger", "smash", "trøffel", "bobler", "bistro"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Crémant eller Champagne Brut — til glasset",
      amount: "Flaske Crémant/Champagne",
      note: "Salt skorpe, cheddar og fed mayo tæmmes af bobler med lidt dybde.",
    },
    wineToDrink: {
      guideSlug: "bedste-champagne-under-300-kr",
      searchQuery: "crémant champagne brut burger",
      searchMax: 150,
      label: "champagne under 300 kr",
    },
    relatedGuides: [
      "bedste-champagne-under-300-kr",
      "bobler-paa-en-tirsdag",
      "vin-til-burger",
      "hverdags-bobler",
      "champagne-til-mad",
    ],
    ingredients: [
      "600 g hakket oksekød (gerne 20 % fedt)",
      "4 boller",
      "4 skiver cheddar",
      "Trøffelmayo: 1 dl mayo + 1 tsk trøffelolie",
      "Salat, syltede agurker, løg",
      "Salt, peber, smør til bolle",
      "Flaske Crémant eller Champagne Brut",
    ],
    instructions: [
      "Form 8 løse bolde. Hot pande: smash fladt, steg 1–2 min, vend, ost på, 30 sek.",
      "Rist boller i smør. Smør trøffelmayo. Samle med 2 smash-patty pr. burger.",
      "Server med iskold Crémant — eller champagne under 300 kr til luksus-tirsdag.",
    ],
    intro: `**Smash burger med trøffelmayo** er salt skorpe, cheddar og fed mayo — tæmmet af mousserende vin med lidt alder/dybde. Bubbles Any Day på bistro-niveau: [champagne under 300 kr](/guides/bedste-champagne-under-300-kr) eller god Crémant.`,
    why: `Maillard-skorpe + mayo = **syrebehov**. Bobler klarer det bedre end tung rød. Læs [bobler på en tirsdag](/guides/bobler-paa-en-tirsdag).`,
    tips: [
      ["Smash hårdt", "Tynd = mere skorpe."],
      ["Ikke overarbejd fars", "Løs = saftig."],
      ["Trøffelolie", "Sparsomt — ellers parfume."],
      ["Cava?", "Ja til hverdag."],
    ],
    serving: `Fritter eller [løgringe i bobledej](/opskrifter/loegeringe-i-bobledej).`,
    mistakes: [
      "Tyk steakhouse-bøf i stedet for smash.",
      "Sød prosecco.",
      "For meget trøffelolie.",
      "Lun champagne.",
    ],
    storage: `Steg friskt.`,
    glass: `Crémant/Champagne Brut 6–9 °C.`,
    faq: [
      ["Uden trøffel?", "Almindelig mayo + dijon."],
      ["Dobbelt smash?", "Ja — opskriften er dobbelt."],
      ["Øl?", "Også godt — bobler er pointen her."],
    ],
  }),

  r({
    slug: "sprode-foraarsruller-med-bobler",
    title: "Sprøde forårsruller med bobler",
    description:
      "Friturestegte forårsruller — tør mousserende vin som ganerenser. Opskrift til 4 som snack.",
    tags: ["opskrift", "asiatisk", "friture", "bobler", "snack", "foraarsruller"],
    prepTime: "PT25M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Brut Cava eller Crémant — til glasset",
      amount: "Flaske Brut",
      note: "Sprød friture + sødsuret dip = knastørre bobler.",
    },
    wineToDrink: {
      guideSlug: "friture-og-bobler",
      searchQuery: "cava brut forårsruller",
      searchMax: 120,
      label: "friture og bobler",
    },
    relatedGuides: [
      "friture-og-bobler",
      "bobler-til-takeaway-og-fastfood",
      "vin-til-asiatisk-mad",
      "hverdags-bobler",
    ],
    ingredients: [
      "12 forårsrulle-ark (eller frozen forårsruller)",
      "Fyld: 200 g hakket kød eller tofu, kål, gulerod, forårsløg, soja, ingefær",
      "Olie til friture",
      "Dip: sød chili eller soja-eddike",
      "Flaske Cava/Crémant Brut",
    ],
    instructions: [
      "Sauter fyld, afkøl. Rul i ark (eller brug frozen).",
      "Fritér 170 °C til gyldne (3–5 min).",
      "Server med dip og iskold Brut — boblerne klipper olie og sød dip.",
    ],
    intro: `**Sprøde forårsruller med bobler** er det asiatiske friture-indslag i [friture og bobler](/guides/friture-og-bobler)-universet. Sød chili + olie møder **knastør Cava**.`,
    why: `Sød dip uden syre i glasset = klæbrig. Brut nulstiller. Læs [bobler til takeaway](/guides/bobler-til-takeaway-og-fastfood).`,
    tips: [
      ["Frozen", "Helt OK til tirsdag."],
      ["Dip", "Syrlig > kun sød."],
      ["Vin", "Brut."],
      ["Taquitos?", "Samme vin-logik."],
    ],
    serving: `Snack eller forret.`,
    mistakes: [
      "Sød prosecco.",
      "Olie for kold — fedtet.",
      "At overfylde rullerne.",
      "Lun cava.",
    ],
    storage: `Bedst frisk. Ovngenopvarm 200 °C.`,
    glass: `Cava Brut 6–9 °C.`,
    faq: [
      ["Vegetar?", "Ja — tofu/grønt."],
      ["Dampede ruller?", "Anden stil — bobler stadig fine."],
      ["Øl?", "Lager — bobler er skarpere."],
    ],
  }),

  r({
    slug: "gougeres",
    title: "Gougères (franske ostevandbakkelser)",
    description:
      "Luftige oste-vandbakkelser med gruyère — Champagne-regionens snack. Opskrift til ca. 30 stk.",
    tags: ["opskrift", "snack", "fransk", "ost", "champagne", "bobler", "gougères"],
    prepTime: "PT20M",
    cookTime: "PT30M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Crémant eller Champagne Brut — til glasset (tradition)",
      amount: "Flaske til servering",
      note: "Gougères serveres klassisk til champagne i Champagne — Crémant/Cava virker til hverdag.",
    },
    wineToDrink: {
      guideSlug: "champagne-til-mad",
      searchQuery: "crémant champagne gougères",
      searchMax: 150,
      label: "champagne til mad",
    },
    relatedGuides: [
      "champagne-til-mad",
      "bobler-paa-en-tirsdag",
      "hverdags-bobler",
      "cremant-vs-champagne",
    ],
    ingredients: [
      "2 dl vand",
      "80 g smør",
      "1 tsk salt",
      "125 g hvedemel",
      "4 æg",
      "100 g revet gruyère eller comté",
      "Peber, evt. muskatnød",
      "Flaske Crémant/Champagne Brut",
    ],
    instructions: [
      "Kog vand, smør og salt. Tag af — rør mel i til dej slipper. Afkøl lidt.",
      "Rør æg i ét ad gangen. Rør ost og peber i.",
      "Sprøjt eller ske små toppe på bagepapir. Bag 200 °C 20–25 minutter til oppustede og gyldne. Åbn ovn 2 min — tørre.",
      "Server lune med bobler.",
    ],
    intro: `**Gougères** er Champagne-regionens oste-snack: luftige vandbakkelser med gruyère. Traditionelt til champagne — på en tirsdag: [Crémant](/guides/cremant-vs-champagne) eller god Cava. Bubbles Any Day-aperitif.`,
    why: `Salt ost + smørdej = **syre og bobler**. Læs [champagne til mad](/guides/champagne-til-mad).`,
    tips: [
      ["Æg", "Dejen skal skinne og falde i V fra skeen."],
      ["Ost", "Gruyère er klassisk."],
      ["Spis lune", "Bedst lige fra ovn."],
      ["Fryse", "Rå eller bagte — bag fra frossen."],
    ],
    serving: `Aperitif før middag.`,
    mistakes: [
      "At åbne ovnen for tidligt — falder sammen.",
      "For lidt æg — flade.",
      "Sød mousserende.",
      "At servere kolde og gummiagtige.",
    ],
    storage: `Fryse 1 måned. Genopvarm 180 °C 5 min.`,
    glass: `Crémant/Champagne Brut 6–9 °C.`,
    faq: [
      ["Comté?", "Ja."],
      ["Uden ost?", "Så er det chou — anden snack."],
      ["Cava?", "Ja til hverdag."],
    ],
  }),

  r({
    slug: "luksus-nachos-med-cava",
    title: "Luksus-nachos med Cava",
    description:
      "Nachos med cheddar og jalapeños — iskold Cava eller Prosecco Brut. Opskrift til 4.",
    tags: ["opskrift", "nachos", "cava", "bobler", "snack", "tex-mex"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Cava eller Prosecco Brut — til glasset",
      amount: "Flaske Brut",
      note: "Ost og chili bridges af frugtig, iskold Brut — ikke rødvin-osteversionen.",
    },
    wineToDrink: {
      guideSlug: "hverdagsbobler-under-100-til-mad",
      searchQuery: "cava brut nachos",
      searchMax: 120,
      label: "hverdagsbobler under 100 til mad",
    },
    relatedGuides: [
      "hverdagsbobler-under-100-til-mad",
      "bobler-paa-en-tirsdag",
      "hverdags-bobler",
      "vin-til-mexicansk-mad-og-tacos",
    ],
    ingredients: [
      "200 g tortillachips",
      "200 g cheddar, revet",
      "1 dl creme fraiche",
      "Jalapeños, salsa, forårsløg",
      "Evt. bønner eller hakket kød",
      "Flaske Cava/Prosecco Brut",
    ],
    instructions: [
      "Fordel chips på bradepande. Ost + toppings. Bag 200 °C 8–10 minutter til boblende.",
      "Creme fraiche og forårsløg over.",
      "Server med iskold Brut — slurk efter chili-bid.",
    ],
    intro: `**Luksus-nachos med Cava** er ost, salt og jalapeño — bridged af frugtig, iskold Brut. Adskilt fra [nachos med rødvinsost](/opskrifter/nachos-med-rodvinskaesesovs): her er boblerne pointen.`,
    why: `Chili + fed ost = **kulsyre hjælper**. Læs [hverdagsbobler under 100 til mad](/guides/hverdagsbobler-under-100-til-mad).`,
    tips: [
      ["Brut", "Extra Dry bliver klæbrig med chili."],
      ["Ikke for lang i ovn", "Chips brænder."],
      ["Isspand", "Ja."],
      ["Guacamole?", "Ja — fedme elsker bobler."],
    ],
    serving: `Delebord / film-aften.`,
    mistakes: [
      "Sød prosecco.",
      "Lun cava.",
      "For våd salsa — soggy chips.",
      "Tung rødvin.",
    ],
    storage: `Spis med det samme.`,
    glass: `Cava Brut 6–9 °C.`,
    faq: [
      ["Uden chili?", "Stadig godt."],
      ["Øl?", "Classic — bobler er sjovere her."],
      ["Mousserende rosé?", "Ja."],
    ],
  }),

  r({
    slug: "kartoffelchips-med-stenbiderrogn",
    title: "Kartoffelchips med stenbiderrogn",
    description:
      "Chips, cremefraiche og stenbiderrogn — hurtig dekadence med Brut Nature. Opskrift til 4 som snack.",
    tags: ["opskrift", "snack", "stenbiderrogn", "bobler", "caviar", "luksus", "hverdag"],
    prepTime: "PT5M",
    cookTime: "PT0M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Brut Nature eller Extra Brut — stringente bobler",
      amount: "Flaske til servering",
      note: "Salt rogn + fed creme kræver knastørre, stringente bobler.",
    },
    wineToDrink: {
      guideSlug: "friture-og-bobler",
      searchQuery: "brut nature champagne cava chips",
      searchMax: 120,
      label: "friture og bobler",
    },
    relatedGuides: [
      "friture-og-bobler",
      "champagne-til-mad",
      "bobler-paa-en-tirsdag",
      "hverdags-bobler",
    ],
    ingredients: [
      "1 pose gode saltede kartoffelchips",
      "1,5 dl creme fraiche",
      "50–80 g stenbiderrogn (eller anden fiskerogn)",
      "Purløg, peber",
      "Evt. citronskal",
      "Flaske Brut Nature / Extra Brut",
    ],
    instructions: [
      "Læg chips på fad. Top hver med creme fraiche og rogn.",
      "Purløg og peber.",
      "Server straks med iskold Brut Nature.",
    ],
    intro: `**Kartoffelchips med stenbiderrogn** er den hurtigste dekadente hverdags-snack: salt, fed creme og rogn — med **stringente bobler**. Bubbles Any Day på 5 minutter.`,
    why: `Rogn + creme = **maksimal syrebehov**. Brut Nature skærer rent. Læs [champagne til mad](/guides/champagne-til-mad).`,
    tips: [
      ["Chips", "Tykke, ikke for fedtede."],
      ["Rogn", "Kold fra køl."],
      ["Vin", "Jo tørrere, jo bedre."],
      ["Caviar?", "Samme logik — dyrere."],
    ],
    serving: `Aperitif / nytår midt i ugen.`,
    mistakes: [
      "Sød mousserende.",
      "Varm rogn.",
      "For meget creme — drukner.",
      "Lun champagne.",
    ],
    storage: `Samle lige før servering.`,
    glass: `Brut Nature 6–8 °C.`,
    faq: [
      ["Stenbider vs. laksrogn?", "Begge virker."],
      ["Cava Nature?", "Ja — value."],
      ["Uden rogn?", "Så er det bare chips — stadig bobler."],
    ],
  }),

  r({
    slug: "cava-svamperisotto",
    title: "Cava-svamperisotto",
    description:
      "Svamperisotto hvor risen afkoges med Cava i stedet for stille hvidvin. Opskrift til 4.",
    tags: ["opskrift", "risotto", "svampe", "cava", "bobler", "italiensk"],
    prepTime: "PT15M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Cava Brut — i risotto + glasset",
      amount: "2–2,5 dl Cava",
      note: "Cava giver lettere, syrerig struktur vs. stille hvidvin eller pinot-risotto.",
    },
    wineToDrink: {
      guideSlug: "hverdags-bobler",
      searchQuery: "cava brut risotto svampe",
      searchMax: 120,
      label: "hverdags-bobler",
    },
    relatedGuides: [
      "hverdags-bobler",
      "bobler-paa-en-tirsdag",
      "vin-til-svampe",
      "champagne-til-mad",
    ],
    ingredients: [
      "320 g risotto-ris",
      "300 g blandede svampe",
      "2–2,5 dl Cava Brut",
      "1 l varm grøntsagsfond",
      "1 skalotteløg",
      "40 g smør + olie",
      "50 g parmesan",
      "Timian, salt, peber",
    ],
    instructions: [
      "Sauter svampe — tag op. Sauter skalotteløg og ris.",
      "Hæld Cava i — rør til absorberet (boblerne lægger sig).",
      "Tilsæt fond ladevis ca. 18 minutter. Rør svampe, smør og parmesan i.",
      "Server med et glas af samme Cava.",
    ],
    intro: `**Cava-svamperisotto** erstatter stille hvidvin med **syrerig Cava** — lettere struktur, mere «lift». Adskilt fra [risotto med hvidvin](/opskrifter/risotto-med-hvidvin) og [svamperisotto med kold pinot](/opskrifter/svamperisotto-med-kold-pinot).`,
    why: `Cavas syre holder risottoen **appetitlig** uden tunghed. Læs [hverdags-bobler](/guides/hverdags-bobler).`,
    tips: [
      ["Brut", "Ikke sød."],
      ["Fond", "Varm."],
      ["Restbobler", "Drik til — flad Cava er kun til gryden."],
      ["Svampe", "Brun dem ordentligt."],
    ],
    serving: `Forret eller hovedret med salat.`,
    mistakes: [
      "Sød cava — slikket risotto.",
      "At koge al Cava væk før fond — mangler syre.",
      "For lidt omrøring.",
      "Tung rødvin i glasset.",
    ],
    storage: `Bedst frisk. Genopvarm med fond.`,
    glass: `Cava Brut 6–9 °C.`,
    faq: [
      ["Prosecco?", "Brut — mere frugt."],
      ["Champagne?", "Luksusversion."],
      ["Uden ost?", "Mere smør — stadig god."],
    ],
  }),
];
