/** Greece value: spanakopita, pastitsio, feta saganaki. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  "spanakopita-med-hvidvin":
    "Klassisk græsk spinat-feta-tærte i filodej. Et skvæt hvidvin i fyldet; Moschofilero eller Assyrtiko i glasset.",
  "pastitsio-med-rodvin":
    "Græsk «lasagne»: pastarør, kødsauce med rødvin, béchamel. Agiorgitiko eller Xinomavro til.",
  "feta-saganaki":
    "Stegt/gratineret feta med citron og oregano — taverna-snack. Assyrtiko i glasset. Adskilt fra rejer-saganaki.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "moschofilero-druen": [
    { slug: "spanakopita-med-hvidvin", label: "Spanakopita" },
    { slug: "feta-saganaki", label: "Feta saganaki" },
  ],
  "agiorgitiko-druen": [
    { slug: "pastitsio-med-rodvin", label: "Pastitsio" },
  ],
  "xinomavro-druen": [
    { slug: "pastitsio-med-rodvin", label: "Pastitsio" },
  ],
  "assyrtiko-druen": [
    { slug: "feta-saganaki", label: "Feta saganaki" },
    { slug: "spanakopita-med-hvidvin", label: "Spanakopita" },
  ],
  "graesk-meze-braet": [
    { slug: "feta-saganaki", label: "Feta saganaki" },
    { slug: "spanakopita-med-hvidvin", label: "Spanakopita" },
  ],
  "vin-til-graesk-mad": [
    { slug: "spanakopita-med-hvidvin", label: "Spanakopita" },
    { slug: "pastitsio-med-rodvin", label: "Pastitsio" },
    { slug: "feta-saganaki", label: "Feta saganaki" },
  ],
  "farvel-sancerre-goddag-assyrtiko": [
    { slug: "feta-saganaki", label: "Feta saganaki" },
  ],
  "vin-til-feta": [
    { slug: "feta-saganaki", label: "Feta saganaki" },
    { slug: "spanakopita-med-hvidvin", label: "Spanakopita" },
  ],
};

export const RECIPES = [
  r({
    slug: "spanakopita-med-hvidvin",
    title: "Spanakopita med hvidvin",
    description:
      "Græsk spinat- og fetatærte i filodej — med et skvæt hvidvin i fyldet. Opskrift til 6.",
    tags: ["opskrift", "grækenland", "spanakopita", "feta", "spinat", "hvidvin", "meze"],
    prepTime: "PT30M",
    cookTime: "PT45M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Moschofilero eller Assyrtiko — tør græsk hvidvin",
      amount: "0,75 dl hvidvin i fyld + flaske til servering",
      note: "Lidt vin i spinatfyldet løfter feta; i glasset: Moschofilero (blomst) eller Assyrtiko (mineral).",
    },
    wineToDrink: {
      guideSlug: "moschofilero-druen",
      searchQuery: "moschofilero spanakopita",
      searchMax: 150,
      label: "Moschofilero",
    },
    relatedGuides: [
      "moschofilero-druen",
      "assyrtiko-druen",
      "graesk-meze-braet",
      "vin-til-graesk-mad",
      "vin-til-feta",
    ],
    ingredients: [
      "500 g frisk spinat (eller 400 g frossen, presset tør)",
      "250 g feta, smuldret",
      "0,75 dl tør hvidvin",
      "1 bundt forårsløg eller 1 lille løg",
      "2 æg",
      "2 spsk dild eller mynte",
      "10–12 ark filodej",
      "100 g smeltet smør eller olivenolie til pensling",
      "Salt, peber, muskatnød",
    ],
    instructions: [
      "Sauter løg. Tilsæt spinat, til den synker. Hæld vin i — damp væk. Afkøl. Pres overskydende væske ud.",
      "Rør feta, æg, urter og peber i. Smag til (feta er salt).",
      "Læg halvdelen af filo i bradepande under pensling mellem lag. Fordel fyld. Resten af filo ovenpå. Rids i firkanter.",
      "Bag 180 °C i 35–45 minutter til gylden. Hvile 10 minutter. Server med Moschofilero eller Assyrtiko.",
    ],
    intro: `**Spanakopita** er den græske spinat-feta-pie i sprød filodej. Et skvæt hvidvin i fyldet giver dybde — og i glasset vinder [Moschofilero](/guides/moschofilero-druen) eller [Assyrtiko](/guides/assyrtiko-druen). Perfekt meze: [græsk meze-bræt](/guides/graesk-meze-braet).`,
    why: `Feta + spinat kræver **syrlig, aromatisk hvid**. Læs [vin til feta](/guides/vin-til-feta).`,
    tips: [
      ["Pres spinat", "Ellers soggy bunde."],
      ["Filo", "Hold dækket med fugtig klud — tørrer hurtigt."],
      ["Vin", "Moschofilero til blomst; Assyrtiko til mineral."],
      ["Make-ahead", "Kan bages og genopvarmes."],
    ],
    serving: `Salat, tzatziki, oliven.`,
    mistakes: [
      "Vådt fyld.",
      "At glemme at pensle filo — tørt og kedeligt.",
      "Tung rødvin.",
      "For meget salt oveni feta.",
    ],
    storage: `Køleskab 2 dage. Ovngenopvarm 160 °C.`,
    glass: `Moschofilero 8–10 °C — eller Assyrtiko.`,
    faq: [
      ["Uden vin i fyld?", "Ja — lidt citronsaft."],
      ["Puff pastry?", "Anden tekstur — filo er klassisk."],
      ["Vegan?", "Tofu-feta + plantemargarine."],
    ],
  }),

  r({
    slug: "pastitsio-med-rodvin",
    title: "Pastitsio med rødvin",
    description:
      "Græsk ovnpasta med kødsauce, rødvin og béchamel — «lasagne» fra Peloponnes. Opskrift til 6.",
    tags: ["opskrift", "grækenland", "pastitsio", "pasta", "rødvin", "ovn"],
    prepTime: "PT30M",
    cookTime: "PT75M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Agiorgitiko eller anden frugtig græsk rødvin",
      amount: "2 dl rødvin",
      note: "Rødvin i kødsaucen; i glasset: Agiorgitiko (blød) eller Xinomavro (mere struktur).",
    },
    wineToDrink: {
      guideSlug: "agiorgitiko-druen",
      searchQuery: "agiorgitiko nemea pastitsio",
      searchMax: 150,
      label: "Agiorgitiko",
    },
    relatedGuides: [
      "agiorgitiko-druen",
      "xinomavro-druen",
      "vin-til-graesk-mad",
      "vin-til-moussaka",
    ],
    ingredients: [
      "400 g pastitsio-/bucatini-rør eller penne",
      "500 g hakket okse eller lam",
      "2 dl rødvin",
      "400 g hakkede tomater",
      "1 løg, 2 fed hvidløg",
      "1 tsk kanel, 1 tsk oregano",
      "Béchamel: 50 g smør, 50 g mel, 7 dl mælk, 2 æggeblommer, muskat, 50 g ost",
      "Revét kefalotyri eller parmesan",
      "Olivenolie, salt, peber",
    ],
    instructions: [
      "Sauter løg og kød. Hæld vin i — kog ind. Tilsæt tomat, kanel, oregano. Simr 25–30 minutter.",
      "Kog pasta al dente. Béchamel: lav roux, pisk mælk i, kog tyk. Af varmen: æggeblommer, ost, muskat.",
      "Læg pasta i bradepande, kødsauce, béchamel. Ost på toppen.",
      "Bag 180 °C i 35–45 minutter til gylden. Hvile 15 minutter. Server med Agiorgitiko.",
    ],
    intro: `**Pastitsio** er Grækenlands ovnpasta: rør, krydret kødsauce med rødvin og et tæppe af béchamel. Tæt på lasagne — men med **kanel og græsk signatur**. Vin: [Agiorgitiko](/guides/agiorgitiko-druen) eller [Xinomavro](/guides/xinomavro-druen). Søsterret: [moussaka](/opskrifter/moussaka-med-rodvin).`,
    why: `Kanel + tomat + kød spejler **Agiorgitikos krydrede kirsebær**. Læs [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    tips: [
      ["Hvile", "Skærer pænere efter 15 min."],
      ["Kanel", "Diskret — ikke kage."],
      ["Vin", "Nemea til hverdag; Naoussa til fest."],
      ["Pasta", "Rør holder fyldet."],
    ],
    serving: `Grøn salat. Familiemiddag.`,
    mistakes: [
      "Vandig kødsauce.",
      "At skære for tidligt — falder fra hinanden.",
      "For meget kanel.",
      "Let hvidvin til — for spinkel.",
    ],
    storage: `Køleskab 3 dage. Frys i portioner.`,
    glass: `Agiorgitiko 15–17 °C — eller Xinomavro 16–18 °C.`,
    faq: [
      ["Uden béchamel?", "Ikke pastitsio — så er det en anden ret."],
      ["Lam?", "Klassisk og godt."],
      ["Make-ahead?", "Ja — bag dagen efter."],
    ],
  }),

  r({
    slug: "feta-saganaki",
    title: "Feta Saganaki",
    description:
      "Stegt eller gratineret feta med citron og oregano — taverna-meze. Opskrift til 4 som forret.",
    tags: ["opskrift", "grækenland", "feta", "saganaki", "meze", "vegetar"],
    prepTime: "PT5M",
    cookTime: "PT10M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Assyrtiko — tør, mineralsk (til glasset; evt. skvæt i panden)",
      amount: "Flaske til servering (+ 1 spsk hvidvin valgfri)",
      note: "Ostens salt møder Assyrtikos syre. Adskilt fra rejer-saganaki.",
    },
    wineToDrink: {
      guideSlug: "assyrtiko-druen",
      searchQuery: "assyrtiko feta saganaki",
      searchMax: 120,
      label: "Assyrtiko",
    },
    relatedGuides: [
      "assyrtiko-druen",
      "farvel-sancerre-goddag-assyrtiko",
      "graesk-meze-braet",
      "vin-til-feta",
      "moschofilero-druen",
    ],
    ingredients: [
      "300–400 g feta i én blok (ikke smuldret)",
      "2 spsk olivenolie",
      "1 tsk oregano",
      "Saft af ½ citron",
      "Evt. 1 spsk honning eller sesam",
      "Peber, brød",
    ],
    instructions: [
      "Varm olie i lille ovnfast pande. Læg feta i. Steg 1–2 minutter, vend forsigtigt — eller sæt hele panden under grill/broil 3–5 minutter, til kanterne bobler.",
      "Dryp citron og oregano over. Evt. honning.",
      "Server straks med brød.",
      "Skænk iskold Assyrtiko.",
    ],
    intro: `**Feta Saganaki** er tavernaens oste-hit: feta stegt eller gratineret, til den er **varm og boblende**, med citron og oregano. «Saganaki» er panden — samme navn som [rejer saganaki](/opskrifter/rejer-saganaki), men her er osten stjernen.`,
    why: `Salt feta kræver **syrlig hvidvin**. [Assyrtiko](/guides/assyrtiko-druen) er value-kongen. Læs [vin til feta](/guides/vin-til-feta).`,
    tips: [
      ["Hel blok", "Smuldret feta smelter væk."],
      ["Ikke for lang", "Skal holde formen."],
      ["Brød", "Obligatorisk."],
      ["Honning", "Valgfri sød kontrast."],
    ],
    serving: `Meze med oliven og [spanakopita](/opskrifter/spanakopita-med-hvidvin).`,
    mistakes: [
      "At bruge billig «salatost» der ikke er ægte feta.",
      "At stege til den er væk.",
      "Lun vin.",
      "At glemme citron — flat.",
    ],
    storage: `Spis med det samme.`,
    glass: `Assyrtiko 8–10 °C — alternativ: Moschofilero.`,
    faq: [
      ["Flamberet med ouzo?", "Nogle tavernaer gør det — forsigtigt."],
      ["Halloumi i stedet?", "Se [halloumi-honningglace](/opskrifter/grillet-halloumi-hvidvins-honningglace)."],
      ["Ovnstegt kun?", "Ja — 200 °C i 8–10 min i olivenolie."],
    ],
  }),
];
