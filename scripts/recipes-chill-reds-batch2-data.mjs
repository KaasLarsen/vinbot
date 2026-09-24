/** Chill Your Reds recipes batch 2: café, snacks, vegetar (6). */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  "grillet-kyllingebryst-estragon-kold-rodvin":
    "Lyst fjerkræ, estragon og sommersalat — afkølet Cabernet Franc fra Loire (eller let gamay).",
  "charcuteribraet-med-kold-rodvin":
    "Skinke, salami og paté møder syrerig rødvin ved 12 °C — fedtet smelter, syren renser.",
  "tarte-flambee-med-gedeost":
    "Hvid pizza / tarte flambée med kartoffel og gedeost — løftes af afkølet rødvin.",
  "luksus-hotdogs-med-rodvinsloeg":
    "Hotdogs med rødvinssløgkompot og uhøjtidelig kold rød — gerne papvin på terrassen.",
  "grillede-portobello-med-parmesan":
    "Umami-svampe og parmesan-crunch — let rødvinssyre på terrassen.",
  "svamperisotto-med-kold-pinot":
    "Cremet svamperisotto med afkølet, jordbær-noteret Pinot Noir — ikke Barolo-tung stil.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "rodvin-til-terrassen": [
    { slug: "charcuteribraet-med-kold-rodvin", label: "Charcuteribræt med kold rødvin" },
    { slug: "tarte-flambee-med-gedeost", label: "Tarte flambée med gedeost" },
    { slug: "luksus-hotdogs-med-rodvinsloeg", label: "Luksus-hotdogs med rødvinssløg" },
    { slug: "grillede-portobello-med-parmesan", label: "Grillede portobello med parmesan" },
  ],
  "chill-your-reds": [
    { slug: "charcuteribraet-med-kold-rodvin", label: "Charcuteribræt" },
    { slug: "svamperisotto-med-kold-pinot", label: "Svamperisotto med kold pinot" },
    { slug: "grillet-kyllingebryst-estragon-kold-rodvin", label: "Kylling med estragon" },
  ],
  "afkoelt-roedvin": [
    { slug: "charcuteribraet-med-kold-rodvin", label: "Charcuteribræt" },
    { slug: "tarte-flambee-med-gedeost", label: "Tarte flambée" },
    { slug: "svamperisotto-med-kold-pinot", label: "Svamperisotto med kold pinot" },
  ],
  "20-minutter-i-koeleskabet-roedvin": [
    { slug: "luksus-hotdogs-med-rodvinsloeg", label: "Luksus-hotdogs" },
    { slug: "charcuteribraet-med-kold-rodvin", label: "Charcuteribræt" },
  ],
  "vin-til-kylling": [
    { slug: "grillet-kyllingebryst-estragon-kold-rodvin", label: "Kylling estragon + kold rød" },
  ],
  "vin-til-svampe": [
    { slug: "grillede-portobello-med-parmesan", label: "Portobello med parmesan" },
    { slug: "svamperisotto-med-kold-pinot", label: "Svamperisotto med kold pinot" },
  ],
  "vin-til-pizza": [
    { slug: "tarte-flambee-med-gedeost", label: "Tarte flambée med gedeost" },
  ],
  "top-5-druer-til-koeleskabet": [
    { slug: "svamperisotto-med-kold-pinot", label: "Risotto + Pinot" },
    { slug: "charcuteribraet-med-kold-rodvin", label: "Charcuteri + Gamay" },
  ],
};

export const RECIPES = [
  r({
    slug: "grillet-kyllingebryst-estragon-kold-rodvin",
    title: "Grillet kyllingebryst med estragon og kold rødvin",
    description:
      "Lyst fjerkræ, estragon og sommersalat — afkølet Cabernet Franc eller Gamay. Opskrift til 4.",
    tags: ["opskrift", "kylling", "estragon", "grill", "chillable", "sommer", "loire"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Let Cabernet Franc (Loire) eller Gamay — til marinade/glas ved 12–14 °C",
      amount: "100 ml let rødvin",
      note: "Vin i estragonmarinade; samme stil serveres kold til salat og grillkylling.",
    },
    wineToDrink: {
      guideSlug: "chill-your-reds",
      searchQuery: "cabernet franc loire kylling",
      searchMax: 150,
      label: "Chill Your Reds",
    },
    relatedGuides: [
      "chill-your-reds",
      "vin-til-kylling",
      "rodvin-til-terrassen",
      "afkoelt-roedvin",
    ],
    ingredients: [
      "4 kyllingebryst",
      "100 ml let rødvin (Cabernet Franc eller Gamay)",
      "2 spsk olivenolie",
      "1 bundt frisk estragon",
      "1 fed hvidløg",
      "Saft af ½ citron",
      "Sommersalat (salat, agurk, radise, ærter)",
      "Salt, peber",
    ],
    instructions: [
      "Mariner kylling 20–60 minutter i vin, olie, hakket estragon, hvidløg, citron, salt og peber.",
      "Grill eller steg 5–7 minutter pr. side til gennemstegt. Hvile 5 minutter. Skær i skiver.",
      "Anret på sommersalat med ekstra estragon.",
      "Server med samme vintype ved 12–14 °C.",
    ],
    intro: `**Grillet kyllingebryst med estragon og kold rødvin** er den lette sommerudgave af estragon-kylling: ikke tung flødesauce, men grill, salat og [afkølet Cabernet Franc](/guides/chill-your-reds) fra Loire. Adskilt fra [poulet à l'estragon](/opskrifter/poulet-a-lestragon).`,
    why: `Loire Cabernet Franc har **grøn urte-kant**, der spejler estragon — kølig servering holder den appetitlig. Læs [vin til kylling](/guides/vin-til-kylling).`,
    tips: [
      ["Ikke oversteg", "Bryst tørrer hurtigt."],
      ["Estragon", "Frisk — tør er bleg."],
      ["Vin", "Chinon/Bourgueil let stil, eller Beaujolais."],
      ["Salat", "Dressing med lidt af marinaden."],
    ],
    serving: `Nye kartofler eller baguette. Terrasse: [rødvin til terrassen](/guides/rodvin-til-terrassen).`,
    mistakes: [
      "Tung bordeaux til let kylling.",
      "Lun vin.",
      "Kun tørret estragon.",
      "At springe hvile over.",
    ],
    storage: `Kylling køleskab 2 dage. Spis salat frisk.`,
    glass: `Cabernet Franc eller Gamay 12–14 °C.`,
    faq: [
      ["Lår i stedet?", "Ja — længere grilltid."],
      ["Hvidvin?", "Sauvignon — også godt, anden stil."],
      ["Uden grill?", "Stegepande eller ovn 200 °C."],
    ],
  }),

  r({
    slug: "charcuteribraet-med-kold-rodvin",
    title: "Det ultimative charcuteribræt med kold rødvin",
    description:
      "Skinke, salami og paté til syrerig rødvin ved 12 °C. Opskrift/assembly til 4–6.",
    tags: ["opskrift", "charcuteri", "tapas", "chillable", "aperitif", "sommer"],
    prepTime: "PT20M",
    cookTime: "PT0M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Gamay, Zweigelt eller let Pinot — til glasset ved 12 °C",
      amount: "Flaske til servering (+ evt. rødvingelé)",
      note: "Brættet er assembly; vinen er stjernen. Evt. [rødvingelé til charcuteri](/opskrifter/roedvinsgele-til-charcuteri).",
    },
    wineToDrink: {
      guideSlug: "rodvin-til-terrassen",
      searchQuery: "beaujolais charcuteri chillable",
      searchMax: 150,
      label: "rødvin til terrassen",
    },
    relatedGuides: [
      "rodvin-til-terrassen",
      "chill-your-reds",
      "20-minutter-i-koeleskabet-roedvin",
      "afkoelt-roedvin",
      "top-5-druer-til-koeleskabet",
    ],
    ingredients: [
      "150 g parmaskinke eller serrano",
      "150 g salami eller spegepølse",
      "1 lille paté eller terrine",
      "100 g mild ost (fx comté eller brie)",
      "Cornichoner, oliven, sennep",
      "Gode kiks eller baguette",
      "Evt. rødvingelé eller figenkompot",
      "Flaske let rødvin (kølet til 12 °C)",
    ],
    instructions: [
      "Tag charcuteri ud 15 minutter før — ikke iskoldt kød.",
      "Anret løst på bræt: kød, ost, pickles, brød. Undgå kaos — grupper smagene.",
      "Sæt vinen i køleskab 20 minutter (eller isspand 10 min).",
      "Server: fedt kød + slurk syrerig rød = mundren.",
    ],
    intro: `**Det ultimative charcuteribræt med kold rødvin** er Chill Your Reds i snack-form: fedtet i skinke og salami smelter, når det møder **læskende syre ved 12 °C**. Mere end [rødvingelé](/opskrifter/roedvinsgele-til-charcuteri) — her er hele brættet + vinen.`,
    why: `Lav-tannin rød **renser** uden at tørre munden. Læs [rødvin til terrassen](/guides/rodvin-til-terrassen).`,
    tips: [
      ["Vin først", "Køl før gæsterne kommer."],
      ["Ikke for saltrige pølser alene", "Balance med ost og sødt."],
      ["Mængde", "80–100 g kød pr. person som aperitif."],
      ["Glas", "Tulip — ikke shotglas."],
    ],
    serving: `Aperitif på terrassen. Følg op med grill eller pizza.`,
    mistakes: [
      "Kraftig cabernet — bitter med salt kød.",
      "Lun vin.",
      "Kun tørre kiks uden fedt/syre-kontrast.",
      "At stable alt i én bunke.",
    ],
    storage: `Anret friskt. Rester køleskab 1–2 dage.`,
    glass: `Gamay/Zweigelt/Pinot 12 °C — [20 min i køl](/guides/20-minutter-i-koeleskabet-roedvin).`,
    faq: [
      ["Vegetar-bræt?", "Ost, nødder, grillede grøntsager — samme vin."],
      ["Bobler i stedet?", "Cava brut — også godt."],
      ["Papvin?", "Ja til flokken — hold den kold."],
    ],
  }),

  r({
    slug: "tarte-flambee-med-gedeost",
    title: "Tarte flambée med kartoffel og gedeost",
    description:
      "Sprød hvid pizza / flammekuche med kartoffel og gedeost — løftet af afkølet rødvin. Opskrift til 4.",
    tags: ["opskrift", "pizza", "tarte flambée", "gedeost", "chillable", "fransk"],
    prepTime: "PT25M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Let Pinot Noir, Gamay eller Cabernet Franc — til glasset ved 12 °C",
      amount: "Flaske til servering",
      note: "Ingen tomat — derfor chill-rød frem for tung chianti. Ost og spæk/creme kalder på syre.",
    },
    wineToDrink: {
      guideSlug: "rodvin-til-terrassen",
      searchQuery: "pinot noir tarte flambee gedeost",
      searchMax: 150,
      label: "rødvin til terrassen",
    },
    relatedGuides: [
      "rodvin-til-terrassen",
      "vin-til-pizza",
      "chill-your-reds",
      "afkoelt-roedvin",
    ],
    ingredients: [
      "1 pizza-/butterdej (eller hjemmelavet tarte flambée-dej)",
      "150 g creme fraiche",
      "1 stort løg, tyndt skåret",
      "1 kogt kartoffel, tyndt skåret",
      "100 g gedeost (chevre)",
      "50 g bacon eller lardons (valgfri)",
      "Timian, peber, olie",
      "Flaske let rødvin (kølet)",
    ],
    instructions: [
      "Varm ovn til 250 °C (eller så højt som muligt). Rul dejen tynd.",
      "Smør creme fraiche. Fordel løg, kartoffel, bacon og pillede gedeost-klatter. Timian.",
      "Bag 8–12 minutter til boblende og sprød.",
      "Server straks med kold pinot/gamay/cab franc.",
    ],
    intro: `**Tarte flambée med kartoffel og gedeost** er den salte, sprøde «hvide pizza», der løftes af [afkølet rødvin](/guides/afkoelt-roedvin). Uden tomat passer chill-rød bedre end tung italiensk rød.`,
    why: `Gedeost + creme kræver **syre**; kulden gør vinen til aperitif. Læs [vin til pizza](/guides/vin-til-pizza).`,
    tips: [
      ["Tynd dej", "Ellers brødagtig."],
      ["Høj varme", "Sprød bund."],
      ["Vin", "Alsace-pinot eller Loire cab franc er klassisk."],
      ["Vegetar", "Spring bacon over."],
    ],
    serving: `Grøn salat. Terrasse-aften.`,
    mistakes: [
      "For tyk dej.",
      "Lav ovntemperatur.",
      "Tung rødvin.",
      "For meget creme — soggy.",
    ],
    storage: `Bedst frisk. Genopvarm i ovn, ikke mikro.`,
    glass: `Pinot/Gamay/Cab Franc 12 °C — [rødvin til terrassen](/guides/rodvin-til-terrassen).`,
    faq: [
      ["Færdig pizza-bund?", "Ja i nøden."],
      ["Hvidvin?", "Riesling tør — også Alsace-match."],
      ["Uden kartoffel?", "Klassisk kun løg + bacon + creme."],
    ],
  }),

  r({
    slug: "luksus-hotdogs-med-rodvinsloeg",
    title: "Luksus-hotdogs med rødvinssløgkompot",
    description:
      "Hotdogs med rødvinssløg og uhøjtidelig iskold rødvin — gerne fra kassen. Opskrift til 4.",
    tags: ["opskrift", "hotdogs", "rødvin", "chillable", "hverdag", "terrasse", "papvin"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Uhøjtidelig let rødvin eller papvin — til løg + glas ved 11–14 °C",
      amount: "2 dl rødvin til løgkompot + kold vin til servering",
      note: "Løg koges ind i rødvin; samme stil serveres iskold — papvin er legitimt.",
    },
    wineToDrink: {
      guideSlug: "20-minutter-i-koeleskabet-roedvin",
      searchQuery: "papvin let rødvin grill",
      searchMax: 120,
      label: "20 minutter i køleskabet",
    },
    relatedGuides: [
      "20-minutter-i-koeleskabet-roedvin",
      "rodvin-til-terrassen",
      "temperatur-guide-papvin",
      "chill-your-reds",
    ],
    ingredients: [
      "4 gode pølser (wiener eller grillpølse)",
      "4 brioche- eller hotdog-boller",
      "2 store rødløg, skåret",
      "2 dl let rødvin",
      "1 spsk sukker",
      "1 spsk balsamico eller eddike",
      "Senep, ketchup eller chili mayo",
      "Sprøde løg eller pickles",
    ],
    instructions: [
      "Sauter løg i olie 5 minutter. Tilsæt sukker, vin og balsamico. Kog ind 15–20 minutter til kompot. Smag til.",
      "Steg eller grill pølser. Rist boller.",
      "Samle hotdogs med løgkompot og toppings.",
      "Server med iskold uhøjtidelig rød (flaske eller pap).",
    ],
    intro: `**Luksus-hotdogs med rødvinssløgkompot** gør hverdagsmaden vinøs: søde-syrlige løg kogt i rødvin, og en **kold, uhøjtidelig rød** ved siden — gerne papvin på terrassen. Ren [Chill Your Reds](/guides/chill-your-reds)-energi.`,
    why: `Kompotten spejler **frugt og syre** i glasset. Læs [20 minutter i køleskabet](/guides/20-minutter-i-koeleskabet-roedvin).`,
    tips: [
      ["Løg", "Skal være blanke og søde — ikke brændte."],
      ["Vin til kompot", "Billig let rød er fin."],
      ["Papvin", "Hold den kold i isspand."],
      ["Pølse", "Kvalitet mærkes."],
    ],
    serving: `Fritter eller chips. Fodboldaften / havefest.`,
    mistakes: [
      "Kraftig amarone-agtig vin — for tung.",
      "Vandtæt kompot — kog længere.",
      "Lun vin i glasset.",
      "Klamme boller uden ristning.",
    ],
    storage: `Løgkompot køleskab 4 dage. Frys 1 måned.`,
    glass: `Let rød 11–14 °C — se [temperatur-guide papvin](/guides/temperatur-guide-papvin).`,
    faq: [
      ["Vegetar-pølse?", "Ja — samme løg."],
      ["Øl i stedet?", "Klassisk — men så er det en anden artikel."],
      ["Hvidløg i løg?", "Ja — 1 fed."],
    ],
  }),

  r({
    slug: "grillede-portobello-med-parmesan",
    title: "Grillede portobellosvampe med parmesan-crunch",
    description:
      "Umami-portobello med parmesan-crunch — let rødvinssyre på terrassen. Opskrift til 4.",
    tags: ["opskrift", "svampe", "vegetar", "grill", "parmesan", "chillable", "terrasse"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Let Pinot Noir eller Gamay — til pensling + glas ved 12–14 °C",
      amount: "50 ml let rødvin",
      note: "Pensel svampe med olie og et skvæt rødvin; server resten kold.",
    },
    wineToDrink: {
      guideSlug: "rodvin-til-terrassen",
      searchQuery: "pinot noir svampe vegetar",
      searchMax: 150,
      label: "rødvin til terrassen",
    },
    relatedGuides: [
      "rodvin-til-terrassen",
      "vin-til-svampe",
      "chill-your-reds",
      "vin-til-vegetariske-og-veganske-retter",
    ],
    ingredients: [
      "4 store portobellosvampe",
      "50 ml let rødvin",
      "2 spsk olivenolie",
      "1 fed hvidløg, presset",
      "60 g parmesan, groft revet",
      "2 spsk rasp (valgfri til crunch)",
      "Timian, salt, peber",
      "Rucola til servering",
    ],
    instructions: [
      "Tag stilke ud. Pensl hatte med olie, vin, hvidløg, salt og peber.",
      "Grill eller steg 4–5 minutter pr. side.",
      "Drys parmesan (+ rasp) på. Grill/broil 1–2 minutter til crunch.",
      "Server på rucola med kold pinot eller gamay.",
    ],
    intro: `**Grillede portobellosvampe med parmesan-crunch** er vegetar-umami til [kold rødvin på terrassen](/guides/rodvin-til-terrassen): svampenes dybde + ostens salt kalder på **let rødvinssyre**.`,
    why: `Pinot spejler **jord og kirsebær** i svampe. Læs [vin til svampe](/guides/vin-til-svampe).`,
    tips: [
      ["Ikke vask svampe under vand", "Tør af."],
      ["Høj varme", "Stegesmag."],
      ["Parmesan", "Groft revet = crunch."],
      ["Vin", "20 min i køl."],
    ],
    serving: `Forret eller let hovedret med brød.`,
    mistakes: [
      "Tung barolo — for meget.",
      "Vandede svampe.",
      "Lun vin.",
      "At brænde osten sort.",
    ],
    storage: `Bedst frisk.`,
    glass: `Pinot/Gamay 12–14 °C.`,
    faq: [
      ["Vegan?", "Nutritional yeast i stedet for parmesan."],
      ["Ovnstegt?", "220 °C 15 min."],
      ["Andre svampe?", "Kongesvamp — samme metode."],
    ],
  }),

  r({
    slug: "svamperisotto-med-kold-pinot",
    title: "Cremet svamperisotto med kold Pinot Noir",
    description:
      "Svamperisotto der normalt får hvidvin — her med afkølet, jordbær-noteret Pinot Noir i glasset. Opskrift til 4.",
    tags: ["opskrift", "risotto", "svampe", "pinot noir", "chillable", "vegetar", "italiensk"],
    prepTime: "PT15M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Let Pinot Noir — lidt i risotto + resten kold i glasset",
      amount: "1,5 dl pinot noir",
      note: "Risottoen får pinot i stedet for (eller ud over) hvidvin; glasset serveres ved 12–14 °C — ikke Barolo-stil.",
    },
    wineToDrink: {
      guideSlug: "chill-your-reds",
      searchQuery: "pinot noir svamperisotto",
      searchMax: 150,
      label: "Chill Your Reds",
    },
    relatedGuides: [
      "chill-your-reds",
      "vin-til-svampe",
      "afkoelt-roedvin",
      "top-5-druer-til-koeleskabet",
    ],
    ingredients: [
      "320 g risotto-ris (arborio/carnaroli)",
      "300 g blandede svampe",
      "1,5 dl let Pinot Noir",
      "1 l varm grøntsags- eller hønsefond",
      "1 skalotteløg",
      "40 g smør + 1 spsk olie",
      "50 g parmesan",
      "Timian, salt, peber",
    ],
    instructions: [
      "Sauter svampe til gyldne. Tag op. Sauter skalotteløg, tilsæt ris — blank.",
      "Hæld pinot i — rør til absorberet. Tilsæt fond ladevis under omrøring ca. 18 minutter.",
      "Rør svampe, smør og parmesan i. Smag til.",
      "Server med samme pinot ved 12–14 °C (ikke lun).",
    ],
    intro: `**Cremet svamperisotto med kold Pinot Noir** vender forventningen: mange laver risotto med hvidvin ([risotto med hvidvin](/opskrifter/risotto-med-hvidvin)), og tung [Barolo-risotto](/opskrifter/risotto-med-rodvin-barolo) findes også. Her er midtervejen — **let pinot i gryden** og **kold pinot i glasset**, der blæser gæsterne bagover.`,
    why: `Jordbær-noter i kølig pinot spejler **svampeumami** uden Barolo-tyngde. Læs [Chill Your Reds](/guides/chill-your-reds).`,
    tips: [
      ["Fond", "Varm — ellers går kogningen i stå."],
      ["Pinot", "Let stil — ikke tung nye verden."],
      ["Konsistens", "All'onda — blød bølge."],
      ["Glas", "Samme flaske kølt 20 min."],
    ],
    serving: `Forret eller hovedret. Salat ved siden.`,
    mistakes: [
      "Amarone/Barolo — for kraftig her.",
      "Lun pinot i glasset — mister wow.",
      "At skylle ris — mist stivelse.",
      "For lidt omrøring — klumpet.",
    ],
    storage: `Risotto er bedst frisk. Genopvarm med fond.`,
    glass: `Pinot Noir 12–14 °C — [top 5 druer](/guides/top-5-druer-til-koeleskabet).`,
    faq: [
      ["Kun hvidvin i risotto?", "Klassisk — men prøv pinot."],
      ["Vegan?", "Uden parmesan/smør — plantemargarine + gærflager."],
      ["Tørrede svampe?", "Udblød — brug væsken i fond."],
    ],
  }),
];
