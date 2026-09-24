/** Value Plays PT/GR + Chill reds gap recipes batch 1 (6). */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  "arroz-de-marisco":
    "Portugisisk skaldyrsrisotto med tomat, hvidvin, koriander, rejer og muslinger — saftigere end klassisk risotto. Alvarinho eller Vinho Verde i gryden.",
  "dampede-hjertemuslinger-feta-assyrtiko":
    "Græsk salt-syrlig muslingevariant: Assyrtiko i gryden, samme vin iskold i glasset, feta og oregano.",
  "rejer-saganaki":
    "Store rejer i boblende tomatsauce med hvidvin/ouzo og smeltet feta — taverna-klassiker.",
  "polvo-a-lagareiro":
    "Portugisisk blæksprutte bagt med oceaner af olivenolie, hvidløg og hvidvin — knuste kartofler ved siden.",
  "psarosoupa-graesk-fiskesuppe":
    "Let græsk fiskesuppe på hvidvins- og citronbouillon med friske urter.",
  "sliders-med-barbera-glaze":
    "Miniburgere penslet med syrerig Barbera-rødvinssirup — adskilt fra sliders-med-fritter (her er glazen stjernen).",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vinho-verde-vs-alvarinho": [
    { slug: "arroz-de-marisco", label: "Arroz de marisco" },
    { slug: "polvo-a-lagareiro", label: "Polvo à Lagareiro" },
  ],
  "farvel-sancerre-goddag-assyrtiko": [
    { slug: "dampede-hjertemuslinger-feta-assyrtiko", label: "Hjertemuslinger med feta" },
    { slug: "rejer-saganaki", label: "Rejer saganaki" },
    { slug: "psarosoupa-graesk-fiskesuppe", label: "Psarosoupa" },
  ],
  "graesk-meze-braet": [
    { slug: "rejer-saganaki", label: "Rejer saganaki" },
    { slug: "dampede-hjertemuslinger-feta-assyrtiko", label: "Hjertemuslinger med feta" },
  ],
  "vin-til-graesk-mad": [
    { slug: "rejer-saganaki", label: "Rejer saganaki" },
    { slug: "psarosoupa-graesk-fiskesuppe", label: "Psarosoupa" },
    { slug: "dampede-hjertemuslinger-feta-assyrtiko", label: "Hjertemuslinger med feta" },
  ],
  "vinregion-portugal": [
    { slug: "arroz-de-marisco", label: "Arroz de marisco" },
    { slug: "polvo-a-lagareiro", label: "Polvo à Lagareiro" },
  ],
  "chill-your-reds": [
    { slug: "sliders-med-barbera-glaze", label: "Sliders med Barbera-glaze" },
  ],
  "top-5-druer-til-koeleskabet": [
    { slug: "sliders-med-barbera-glaze", label: "Sliders med Barbera-glaze" },
  ],
  "vin-til-burger": [
    { slug: "sliders-med-barbera-glaze", label: "Sliders med Barbera-glaze" },
  ],
};

export const RECIPES = [
  r({
    slug: "arroz-de-marisco",
    title: "Arroz de Marisco",
    description:
      "Saftig portugisisk skaldyrsrisotto med tomat, hvidvin, koriander, rejer og muslinger. Opskrift til 4.",
    tags: ["opskrift", "portugal", "skaldyr", "ris", "hvidvin", "rejer", "muslinger"],
    prepTime: "PT25M",
    cookTime: "PT40M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Alvarinho eller frisk Vinho Verde — tør hvidvin",
      amount: "2,5 dl hvidvin",
      note: "Hvidvin giver syre til den saftige ris; samme stil i glasset.",
    },
    wineToDrink: {
      guideSlug: "vinho-verde-vs-alvarinho",
      searchQuery: "alvarinho skaldyr portugal",
      searchMax: 180,
      label: "Vinho Verde vs. Alvarinho",
    },
    relatedGuides: [
      "vinho-verde-vs-alvarinho",
      "vinregion-portugal",
      "vin-til-fisk-og-skaldyr",
    ],
    ingredients: [
      "300 g risotto- eller carolino-ris",
      "300 g rejer (gerne med skal til fond)",
      "500 g muslinger, rensede",
      "1 dl tomatpuré eller 200 g hakkede tomater",
      "2,5 dl tør hvidvin (Alvarinho/Vinho Verde)",
      "1 l fiskefond eller vand + rejeskalsfond",
      "1 løg, 3 fed hvidløg",
      "1 rød peberfrugt",
      "Frisk koriander, olivenolie, salt, peber, citron",
    ],
    instructions: [
      "Sauter løg, hvidløg og peber i olie. Tilsæt tomat — kog 5 minutter. Rør ris i.",
      "Hæld vin i — lad det boble ind. Tilsæt varm fond ladevis under omrøring, til risen er næsten mør (ca. 18 min). Retten skal være **saftig**, ikke tør risotto.",
      "Læg muslinger og rejer i. Låg på 4–6 minutter, til muslingerne åbner. Smag til.",
      "Drys koriander over. Server med citron og kold Alvarinho.",
    ],
    intro: `**Arroz de Marisco** er Portugals ikoniske, **saftige** skaldyrsris — mere gryde end tør risotto. Tomat, hvidvin, koriander og masser af rejer og muslinger. Value-play: [Alvarinho](/guides/vinho-verde-vs-alvarinho) i gryden og i glasset.`,
    why: `Hvidvinens syre holder den rige skaldyrsfond **appetitlig**. Læs [vinregion Portugal](/guides/vinregion-portugal).`,
    tips: [
      ["Saftig", "Mere væske end klassisk risotto — det er meningen."],
      ["Muslinger", "Smides uåbnede ud."],
      ["Koriander", "Frisk til sidst — ikke tørret."],
      ["Carolino-ris", "Portugisisk klassiker; arborio virker."],
    ],
    serving: `Salat, brød. Café-stemning i Lissabon-stil.`,
    mistakes: [
      "For tør ris — tilsæt mere fond.",
      "At overkoge skaldyr.",
      "Sød hvidvin — forkert.",
      "At glemme koriander — mister den portugisiske signatur.",
    ],
    storage: `Bedst frisk. Rester 1 dag i køl — ris suger væske.`,
    glass: `Alvarinho 8–11 °C — se [Vinho Verde vs. Alvarinho](/guides/vinho-verde-vs-alvarinho).`,
    faq: [
      ["Uden tomat?", "Mere hvid — anden stil (arroz de marisco branco)."],
      ["Blæksprutte?", "Ja — kom den i tidligere."],
      ["Vinho Verde i glasset?", "Ja til lettere version."],
    ],
  }),

  r({
    slug: "dampede-hjertemuslinger-feta-assyrtiko",
    title: "Dampede hjertemuslinger med feta og Assyrtiko",
    description:
      "Græsk, salt-syrlig muslinger med feta — Assyrtiko i gryden og iskold i glasset. Opskrift til 4.",
    tags: ["opskrift", "grækenland", "muslinger", "feta", "assyrtiko", "hvidvin", "meze"],
    prepTime: "PT15M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Assyrtiko — tør, mineralisk græsk hvidvin",
      amount: "2,5 dl Assyrtiko",
      note: "Samme vin i gryden og iskold i glasset — vulkansk syre møder salt musling.",
    },
    wineToDrink: {
      guideSlug: "farvel-sancerre-goddag-assyrtiko",
      searchQuery: "assyrtiko muslinger feta",
      searchMax: 150,
      label: "Assyrtiko (value vs. Sancerre)",
    },
    relatedGuides: [
      "farvel-sancerre-goddag-assyrtiko",
      "graesk-meze-braet",
      "vin-til-graesk-mad",
      "assyrtiko-druen",
    ],
    ingredients: [
      "1,5 kg hjertemuslinger eller blåmuslinger, rensede",
      "2,5 dl Assyrtiko",
      "150 g feta, smuldret",
      "3 fed hvidløg, skivet",
      "2 spsk olivenolie",
      "1 spsk oregano (helst græsk)",
      "Citron, persille, peber",
    ],
    instructions: [
      "Sauter hvidløg i olie 30 sekunder. Hæld Assyrtiko i — kog op.",
      "Tilsæt muslinger. Låg på 4–6 minutter, til de åbner. Ryst gryden.",
      "Tag af varmen. Drys feta, oregano og persille over — lad fetaen blive lunken.",
      "Server med brød og samme Assyrtiko iskold.",
    ],
    intro: `**Dampede hjertemuslinger med feta og Assyrtiko** er den græske, salt-syrlige udgave af muslinger: vin i gryden, **samme flaske iskold i glasset**. Mere meze end [muslinger i hvidvin](/opskrifter/muslinger-i-hvidvin).`,
    why: `Assyrtikos **mineralitet** spejler havet; feta giver salt. Læs [farvel Sancerre, goddag Assyrtiko](/guides/farvel-sancerre-goddag-assyrtiko).`,
    tips: [
      ["Rens", "Kasser åbne muslinger før kog."],
      ["Feta", "Til sidst — smelter ellers helt væk."],
      ["Vin", "Santorini til wow, fastland til hverdag."],
      ["Brød", "Obligatorisk til saucen."],
    ],
    serving: `Meze-bræt: se [græsk meze-bræt](/guides/graesk-meze-braet).`,
    mistakes: [
      "At koge efter feta for længe.",
      "Sød hvidvin.",
      "At servere vinen lun.",
      "For lidt oregano.",
    ],
    storage: `Spis med det samme.`,
    glass: `Assyrtiko 8–10 °C.`,
    faq: [
      ["Blåmuslinger?", "Ja — samme metode."],
      ["Ouzo?", "1 spsk til sidst — anis-kant."],
      ["Uden feta?", "Stadig god — mere klassisk damp."],
    ],
  }),

  r({
    slug: "rejer-saganaki",
    title: "Rejer Saganaki",
    description:
      "Store rejer i boblende tomatsauce med hvidvin (eller ouzo) og smeltet feta. Opskrift til 4.",
    tags: ["opskrift", "grækenland", "rejer", "feta", "tomat", "hvidvin", "meze"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør græsk hvidvin (Assyrtiko) eller et skvæt ouzo",
      amount: "1,5 dl hvidvin (+ evt. 1 spsk ouzo)",
      note: "Vin reduceres i tomatsaucen; ouzo er valgfri taverna-finish.",
    },
    wineToDrink: {
      guideSlug: "farvel-sancerre-goddag-assyrtiko",
      searchQuery: "assyrtiko rejer saganaki",
      searchMax: 150,
      label: "Assyrtiko",
    },
    relatedGuides: [
      "farvel-sancerre-goddag-assyrtiko",
      "graesk-meze-braet",
      "vin-til-graesk-mad",
    ],
    ingredients: [
      "600 g store rejer, pillede (hale på)",
      "400 g hakkede tomater",
      "1,5 dl tør hvidvin",
      "1 spsk ouzo (valgfri)",
      "1 løg, 3 fed hvidløg",
      "200 g feta",
      "1 tsk oregano, chiliflager efter smag",
      "Olivenolie, persille, salt, peber",
    ],
    instructions: [
      "Sauter løg og hvidløg i olie. Tilsæt tomat, oregano og chili. Hæld vin i. Simr 12–15 minutter til tyk.",
      "Læg rejer i — kog 3–4 minutter, til de er rosa. Evt. ouzo i.",
      "Læg feta-skiver ovenpå. Grill/broil eller låg på, til fetaen smelter og bobler.",
      "Drys persille. Server med brød og kold Assyrtiko.",
    ],
    intro: `**Rejer Saganaki** er tavernaens hit: rejer i intens tomatsauce, hvidvin (eller ouzo) og **smeltet feta**. Perfekt meze — se [græsk meze-bræt](/guides/graesk-meze-braet).`,
    why: `Tomat + feta kræver **syrlig hvidvin**. Assyrtiko er value-valget. Læs [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    tips: [
      ["Store rejer", "Små bliver gummi."],
      ["Sauce", "Skal være koncentreret før rejerne går i."],
      ["Feta", "Helst i skiver til smeltning."],
      ["Ouzo", "Valgfri — 1 spsk er nok."],
    ],
    serving: `Forret eller hovedret med salat.`,
    mistakes: [
      "At koge rejer 10 min — seje.",
      "Vandig sauce.",
      "Sød vin.",
      "At glemme brød.",
    ],
    storage: `Bedst frisk. Sauce uden rejer kan laves forud.`,
    glass: `Assyrtiko 8–11 °C.`,
    faq: [
      ["Uden ouzo?", "Ja — kun hvidvin."],
      ["Ovnstegt feta?", "Ja — 220 °C i 5 min."],
      ["Kylling?", "Anden ret — hold dig til rejer her."],
    ],
  }),

  r({
    slug: "polvo-a-lagareiro",
    title: "Polvo à Lagareiro",
    description:
      "Klassisk portugisisk blæksprutte bagt med olivenolie, hvidløg og hvidvin — knuste kartofler. Opskrift til 4.",
    tags: ["opskrift", "portugal", "blæksprutte", "hvidvin", "olivenolie", "bagt"],
    prepTime: "PT20M",
    cookTime: "PT90M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Alvarinho eller anden tør portugisisk hvidvin",
      amount: "1,5 dl hvidvin",
      note: "Hvidvin og masser af olivenolie — lagareiro betyder «oliemølle-stil».",
    },
    wineToDrink: {
      guideSlug: "vinho-verde-vs-alvarinho",
      searchQuery: "alvarinho blæksprutte portugal",
      searchMax: 150,
      label: "Alvarinho",
    },
    relatedGuides: [
      "vinho-verde-vs-alvarinho",
      "vinregion-portugal",
      "vin-til-fisk-og-skaldyr",
    ],
    ingredients: [
      "1 blæksprutte (ca. 1,5–2 kg), renset — eller 800 g arme",
      "1,5 dl tør hvidvin",
      "1,5 dl god olivenolie",
      "8 fed hvidløg, knuste",
      "800 g kartofler",
      "1 laurbærblad, paprika, salt, peber, persille",
      "Citron",
    ],
    instructions: [
      "Kog blæksprutte mør i saltet vand med laurbær (45–70 min afhængig af størrelse). Afkøl. Skær i stykker.",
      "Kog kartofler næsten møre. Læg i bradepande, knus let med næven. Drys salt.",
      "Læg blæksprutte ovenpå. Fordel hvidløg, vin, olie og paprika. Bag 220 °C i 20–25 minutter, til boblende og gylden.",
      "Drys persille. Server med citron og kold Alvarinho.",
    ],
    intro: `**Polvo à Lagareiro** er Portugals blæksprutte med **oceaner af olivenolie**, hvidløg og en sjat hvidvin — serveret med knuste kartofler. Anden klassiker end [polbo à feira](/opskrifter/polbo-a-feira-med-albarino) (galicisk messe-stil).`,
    why: `Olivenolie + hav kræver **syrlig hvid**. Alvarinho er value-valget. Læs [Vinho Verde vs. Alvarinho](/guides/vinho-verde-vs-alvarinho).`,
    tips: [
      ["Mørhed", "Test med kniv — skal være mør før bagning."],
      ["Olie", "Spar ikke — det er retten."],
      ["Kartofler", "Knustes, ikke mos."],
      ["Frossen blæksprutte", "Virker — tø optøet."],
    ],
    serving: `Grøn salat, brød til olien.`,
    mistakes: [
      "At bage sej blæksprutte — kog den mør først.",
      "For lidt olie.",
      "Sød vin.",
      "At skære for småt før kog — bliver tørt.",
    ],
    storage: `Rester 1–2 dage. Genopvarm i ovn med ekstra olie.`,
    glass: `Alvarinho 8–11 °C.`,
    faq: [
      ["Kun arme?", "Ja — kortere kogetid."],
      ["Vinagre?", "Nogle opskrifter har eddike — 1 spsk OK."],
      ["Vinho Verde?", "Ja til lettere bord."],
    ],
  }),

  r({
    slug: "psarosoupa-graesk-fiskesuppe",
    title: "Psarosoupa (græsk fiskesuppe)",
    description:
      "Let, intens græsk fiskesuppe på hvidvins- og citronbouillon med friske urter. Opskrift til 4.",
    tags: ["opskrift", "grækenland", "suppe", "fisk", "hvidvin", "citron"],
    prepTime: "PT20M",
    cookTime: "PT40M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Assyrtiko eller anden tør, syrerig hvidvin",
      amount: "2 dl hvidvin",
      note: "Hvidvin + citron bygger bouillonen — let men intens.",
    },
    wineToDrink: {
      guideSlug: "farvel-sancerre-goddag-assyrtiko",
      searchQuery: "assyrtiko fiskesuppe",
      searchMax: 120,
      label: "Assyrtiko",
    },
    relatedGuides: [
      "farvel-sancerre-goddag-assyrtiko",
      "vin-til-graesk-mad",
      "vin-til-fisk-og-skaldyr",
    ],
    ingredients: [
      "600 g hvid fisk (torsk, sej, havkat) i stykker",
      "2 dl tør hvidvin",
      "1,2 l fiskefond eller vand",
      "2 gulerødder, 2 selleristængler, 1 løg",
      "2 kartofler",
      "Saft af 1 citron",
      "2 spsk olivenolie",
      "Dild, persille, salt, peber",
      "Evt. 1 æggeblomme til avgolemono-finish (valgfri)",
    ],
    instructions: [
      "Sauter grøntsager i olie. Hæld vin i — kog 2 minutter. Tilsæt fond og kartofler. Simr 20 minutter.",
      "Læg fisk i. Pocher blidt 6–8 minutter. Smag til med citron, salt og peber.",
      "Valgfri avgolemono: pisk æggeblomme med citron, temperer med bouillon, rør i af varmen.",
      "Drys urter. Server med brød og kold Assyrtiko.",
    ],
    intro: `**Psarosoupa** er den lette, intense græske fiskesuppe: hvidvin, citron og urter — ikke tung bisque. Value-match: [Assyrtiko](/guides/farvel-sancerre-goddag-assyrtiko).`,
    why: `Citron + vin = **klar syre**, der løfter fisken. Læs [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    tips: [
      ["Ikke koge fisken itu", "Blid pocherering."],
      ["Avgolemono", "Valgfri cremet finish."],
      ["Fond", "Hjemmelavet af fiskehoveder er guld."],
      ["Urter", "Frisk dild er græsk signatur."],
    ],
    serving: `Forret eller let aftensmad.`,
    mistakes: [
      "At koge fisk 20 min — falder fra hinanden.",
      "For lidt citron — flat.",
      "Kraftig rødvin i glasset.",
      "At salte fonden for tidligt.",
    ],
    storage: `Køleskab 1 dag. Genopvarm blidt.`,
    glass: `Assyrtiko 8–11 °C.`,
    faq: [
      ["Skaldyr i?", "Ja — muslinger sidst."],
      ["Uden vin?", "Mere citron + fond."],
      ["Avgolemono obligatorisk?", "Nej — klassisk klar version er fin."],
    ],
  }),

  r({
    slug: "sliders-med-barbera-glaze",
    title: "Sliders med Barbera-glaze",
    description:
      "Miniburgere penslet med syrerig Barbera-rødvinssirup — chill-red fredagsmad. Opskrift til 4.",
    tags: ["opskrift", "burger", "sliders", "barbera", "glaze", "chillable", "rødvin"],
    prepTime: "PT20M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Barbera — til glaze + glasset ved 12–14 °C",
      amount: "2,5 dl Barbera til glaze",
      note: "Barbera koges til sirup-glaze; samme stil serveres kold til sliders.",
    },
    wineToDrink: {
      guideSlug: "chill-your-reds",
      searchQuery: "barbera burger chillable",
      searchMax: 150,
      label: "Chill Your Reds",
    },
    relatedGuides: [
      "chill-your-reds",
      "top-5-druer-til-koeleskabet",
      "vin-til-burger",
      "20-minutter-i-koeleskabet-roedvin",
    ],
    ingredients: [
      "500 g hakket oksekød",
      "8 mini-boller",
      "2,5 dl Barbera",
      "1 spsk sukker eller honning",
      "1 spsk balsamico",
      "1 skalotteløg",
      "Ost, salat, pickles",
      "Salt, peber, olie",
    ],
    instructions: [
      "Glaze: sauter skalotteløg. Hæld Barbera, sukker og balsamico i. Kog ind til tyk sirup (12–15 min). Smag til.",
      "Form 8 bøffer. Steg 2–3 min pr. side. Pensl glaze på de sidste 30 sekunder.",
      "Samle sliders. Evt. ekstra glaze til dyp.",
      "Server med Barbera ved 12–14 °C.",
    ],
    intro: `**Sliders med Barbera-glaze** er chill-red-fredagsmad, hvor **syrerig rødvinssirup** pensles på bøfferne. Adskilt fra [sliders med fritter og Barbera](/opskrifter/sliders-med-fritter-og-barbera) — her er glazen stjernen, ikke fritterne.`,
    why: `Barberas syre i glaze **klipper fedme**. Kold vin i glasset fuldfører. Læs [Chill Your Reds](/guides/chill-your-reds).`,
    tips: [
      ["Glaze", "Skal coat'e skeen."],
      ["Pensling", "Sent — sukker brænder."],
      ["Vin", "20 min i køl."],
      ["Mini", "Ikke for tykke bøffer."],
    ],
    serving: `Pickles, chips eller salat.`,
    mistakes: [
      "For tynd glaze.",
      "At brænde sukkeret.",
      "Lun Barbera i glasset.",
      "Kraftig cabernet som glaze — bitter.",
    ],
    storage: `Glaze køleskab 1 uge. Bøffer friske.`,
    glass: `Barbera 12–14 °C — [20 min i køl](/guides/20-minutter-i-koeleskabet-roedvin).`,
    faq: [
      ["Pinot-glaze?", "Ja — mildere."],
      ["Uden sukker?", "Længere reduktion."],
      ["Kyllingesliders?", "Samme glaze."],
    ],
  }),
];
