/** Chill Your Reds deepen: sticky Zweigelt + grillpølser + Schiava-bræt. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  "sticky-pork-belly-med-kold-zweigelt":
    "Sticky svinebryst med sød-salt glaze — eksplicit parret med kold Zweigelt ved 12 °C. Adskilt fra Shaoxing-versionen: her er chill-red i fokus.",
  "grillpoelser-med-kold-zweigelt":
    "Grillpølser, sennep og brød — saftig kold Zweigelt eller Gamay. Uhøjtidelig chill-red hverdag.",
  "speck-braet-med-schiava":
    "Alto Adige-snack: speck, ost, knækbrød — Schiava ved 12–14 °C.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "zweigelt-druen": [
    { slug: "sticky-pork-belly-med-kold-zweigelt", label: "Sticky pork med kold Zweigelt" },
    { slug: "grillpoelser-med-kold-zweigelt", label: "Grillpølser med kold Zweigelt" },
  ],
  "schiava-druen": [
    { slug: "speck-braet-med-schiava", label: "Speck-bræt med Schiava" },
  ],
  "frappato-druen": [
    { slug: "sticky-pork-belly-med-kold-zweigelt", label: "Sticky pork (alt: Frappato)" },
  ],
  "chill-your-reds": [
    { slug: "sticky-pork-belly-med-kold-zweigelt", label: "Sticky pork med kold Zweigelt" },
    { slug: "grillpoelser-med-kold-zweigelt", label: "Grillpølser med kold Zweigelt" },
    { slug: "speck-braet-med-schiava", label: "Speck-bræt med Schiava" },
  ],
  "top-5-druer-til-koeleskabet": [
    { slug: "sticky-pork-belly-med-kold-zweigelt", label: "Sticky pork + Zweigelt" },
    { slug: "speck-braet-med-schiava", label: "Speck + Schiava" },
  ],
  "rodvin-til-terrassen": [
    { slug: "grillpoelser-med-kold-zweigelt", label: "Grillpølser med kold Zweigelt" },
    { slug: "speck-braet-med-schiava", label: "Speck-bræt med Schiava" },
  ],
  "20-minutter-i-koeleskabet-roedvin": [
    { slug: "grillpoelser-med-kold-zweigelt", label: "Grillpølser med kold Zweigelt" },
  ],
  "afkoelt-roedvin": [
    { slug: "sticky-pork-belly-med-kold-zweigelt", label: "Sticky pork med kold Zweigelt" },
  ],
};

export const RECIPES = [
  r({
    slug: "sticky-pork-belly-med-kold-zweigelt",
    title: "Sticky pork belly med kold Zweigelt",
    description:
      "Klæbrigt svinebryst med sød-salt glaze — serveret med Zweigelt ved 12 °C. Opskrift til 4.",
    tags: ["opskrift", "svinekød", "sticky", "zweigelt", "chillable", "asiatisk", "grill"],
    prepTime: "PT20M",
    cookTime: "PT150M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Zweigelt — ung, frugtig; også et skvæt i glaze valgfrit",
      amount: "0,5 dl Zweigelt i glaze + flaske til servering ved 12 °C",
      note: "Glazen er sød-salt; glasset er kold Zweigelt uden fad. Adskilt fra sticky-pork-belly-med-shaoxing.",
    },
    wineToDrink: {
      guideSlug: "zweigelt-druen",
      searchQuery: "zweigelt sticky pork chillable",
      searchMax: 150,
      label: "Zweigelt",
    },
    relatedGuides: [
      "zweigelt-druen",
      "chill-your-reds",
      "top-5-druer-til-koeleskabet",
      "afkoelt-roedvin",
      "vin-til-asiatisk-mad",
    ],
    ingredients: [
      "1 kg svinebryst med svær, i stykker",
      "1 dl soja",
      "3 spsk honning eller brunt sukker",
      "2 spsk hoisin eller BBQ-sauce",
      "0,5 dl Zweigelt eller vand",
      "2 fed hvidløg, 1 spsk ingefær",
      "1 spsk riseddike eller æbleeddike",
      "Sesam, forårsløg",
      "Flaske ung Zweigelt (kølet)",
    ],
    instructions: [
      "Brun svinebryst. Læg i bradepande. Pisk glaze af soja, honning, hoisin, vin, hvidløg, ingefær og eddike. Hæld over.",
      "Dæk og braiser 150 °C i ca. 2 timer, til mør. Tag låg af, pensl, grill/broil 5–10 minutter til sticky og karamelliseret.",
      "Drys sesam og forårsløg.",
      "Server med ris og Zweigelt ved 12 °C ([20 min i køl](/guides/20-minutter-i-koeleskabet-roedvin)).",
    ],
    intro: `**Sticky pork belly med kold Zweigelt** er Chill Your Reds møder asiatisk sød-salt: klæbrigt svinebryst kræver **primærfrugt og nul tung fad**. Adskilt fra [sticky pork med Shaoxing](/opskrifter/sticky-pork-belly-med-shaoxing) — her er [Zweigelt](/guides/zweigelt-druen) i glasset pointen.`,
    why: `Sød glaze + fedt mødes af **kirsebærsyre** i kølig Zweigelt. Læs [Chill Your Reds](/guides/chill-your-reds).`,
    tips: [
      ["Svær", "Tør og salt — sprødere finish."],
      ["Vin", "Ung Zweigelt — ikke reserve."],
      ["Temp", "12 °C. Lun = sprittet."],
      ["Alternativ", "Gamay eller let Frappato."],
    ],
    serving: `Ris, agurkesalat, chili.`,
    mistakes: [
      "Tung cabernet.",
      "Lun Zweigelt.",
      "For lidt syre i glaze — slik.",
      "At brænde glazen sort.",
    ],
    storage: `Køleskab 3 dage. Genopvarm i ovn.`,
    glass: `Zweigelt 12–14 °C — [Zweigelt-druen](/guides/zweigelt-druen).`,
    faq: [
      ["Shaoxing i glaze?", "Ja — se den anden sticky-opskrift; glasset kan stadig være Zweigelt."],
      ["Airfryer?", "Efter braising — til sticky finish."],
      ["Gamay i stedet?", "Ja — klassisk chill-swap."],
    ],
  }),

  r({
    slug: "grillpoelser-med-kold-zweigelt",
    title: "Grillpølser med kold Zweigelt",
    description:
      "Grillpølser, sennep og brød — saftig Zweigelt eller Gamay ved 12 °C. Opskrift til 4.",
    tags: ["opskrift", "grill", "pølser", "zweigelt", "chillable", "hverdag", "terrasse"],
    prepTime: "PT10M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Zweigelt eller Gamay — til glasset ved 12 °C",
      amount: "Flaske til servering",
      note: "Ingen vin i gryden nødvendig — chill-red er glassets job til fed pølse og sennep.",
    },
    wineToDrink: {
      guideSlug: "rodvin-til-terrassen",
      searchQuery: "zweigelt grillpølser",
      searchMax: 120,
      label: "rødvin til terrassen",
    },
    relatedGuides: [
      "rodvin-til-terrassen",
      "zweigelt-druen",
      "chill-your-reds",
      "20-minutter-i-koeleskabet-roedvin",
      "den-store-grillguide",
    ],
    ingredients: [
      "8 gode grillpølser",
      "4–8 pølsebrød eller baguette",
      "Sennep, ketchup, rå løg",
      "Surkål eller pickles (valgfri)",
      "Flaske ung Zweigelt eller Beaujolais (kølet)",
    ],
    instructions: [
      "Sæt vinen i køleskab 20 minutter før grill.",
      "Grill pølser til sprøde og gennemvarme. Rist brød.",
      "Server med sennep og løg.",
      "Skænk Zweigelt/Gamay ved 12 °C — syren klipper fedtet.",
    ],
    intro: `**Grillpølser med kold Zweigelt** er den uhøjtidelige chill-red-aften: fed pølse, sennep, brød — og [Zweigelt](/guides/zweigelt-druen) lige fra køleskabet. Ren [terrasse-logik](/guides/rodvin-til-terrassen).`,
    why: `Pølsefedt + sennep kræver **syrlig frugt**, ikke tannin. Læs [20 minutter i køleskabet](/guides/20-minutter-i-koeleskabet-roedvin).`,
    tips: [
      ["Pølsekvalitet", "Mærkes."],
      ["Vin", "Under 13,5 %."],
      ["Isspand", "Hold flasken kold på grillen."],
      ["Alternativ", "Schiava eller Gamay."],
    ],
    serving: `Chips, salat, grillmajs.`,
    mistakes: [
      "Amarone til pølser.",
      "Lun rødvin.",
      "Kun sodavand — misser pointen.",
      "Udbrændte pølser.",
    ],
    storage: `Pølser friske. Vin: drik samme aften.`,
    glass: `Zweigelt 12 °C.`,
    faq: [
      ["Vegetar-pølser?", "Samme vin."],
      ["Øl i stedet?", "Klassisk — men så er det en anden guide."],
      ["Papvin?", "Ja — hold den kold."],
    ],
  }),

  r({
    slug: "speck-braet-med-schiava",
    title: "Speck-bræt med Schiava",
    description:
      "Alto Adige-snackbræt med speck, ost og knækbrød — Schiava ved 12–14 °C. Opskrift til 4.",
    tags: ["opskrift", "speck", "schiava", "alto adige", "chillable", "aperitif", "charcuteri"],
    prepTime: "PT15M",
    cookTime: "PT0M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Schiava / Vernatsch — lys Alto Adige-rød ved 12–14 °C",
      amount: "Flaske til servering",
      note: "Assembly-bræt: speck + Schiava er det alpine chill-match.",
    },
    wineToDrink: {
      guideSlug: "schiava-druen",
      searchQuery: "schiava vernatsch speck",
      searchMax: 120,
      label: "Schiava",
    },
    relatedGuides: [
      "schiava-druen",
      "chill-your-reds",
      "rodvin-til-terrassen",
      "top-5-druer-til-koeleskabet",
    ],
    ingredients: [
      "200 g speck eller røget skinke, tyndt skåret",
      "150 g mild ost (fx bergkäse, fontina eller mild cheddar)",
      "Knækbrød eller rugbrød",
      "Cornichoner, radiser, æbleskiver",
      "Evt. peberrod eller sennep",
      "Flaske Schiava/Vernatsch (kølet)",
    ],
    instructions: [
      "Anret speck, ost, brød og pickles på bræt.",
      "Køl Schiava 20 minutter til ca. 12–14 °C.",
      "Server: fedt speck + slurk lys, mandelagtig rød.",
    ],
    intro: `**Speck-bræt med Schiava** er Alto Adige på 15 minutter: røget speck, ost og [Schiava](/guides/schiava-druen) lige fra køleskabet. Mere alpint end det generelle [charcuteribræt](/opskrifter/charcuteribraet-med-kold-rodvin).`,
    why: `Schiavas **lave tannin og mandel-finish** klipper salt røg. Læs [Chill Your Reds](/guides/chill-your-reds).`,
    tips: [
      ["Speck", "Tyndt — smelter på tungen."],
      ["Vin", "Lys i glasset = rigtig stil."],
      ["Temp", "12–14 °C."],
      ["Æble", "Syrlig kontrast til fedt."],
    ],
    serving: `Aperitif før alpine retter eller grill.`,
    mistakes: [
      "Tung Amarone.",
      "Lun Schiava.",
      "Kun tørre kiks uden fedt.",
      "For tykke speck-skiver.",
    ],
    storage: `Anret friskt.`,
    glass: `Schiava 12–14 °C — [Schiava-druen](/guides/schiava-druen).`,
    faq: [
      ["Parma i stedet?", "Ja — stadig godt med Schiava."],
      ["Zweigelt?", "Også fint — mere kirsebær."],
      ["Bobler?", "Cuvée brut — anden stemning."],
    ],
  }),
];
