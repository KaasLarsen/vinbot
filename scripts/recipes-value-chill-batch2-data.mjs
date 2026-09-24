/** Value Plays + Chill gap recipes batch 2 (6). */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  "grillet-unghanebryst-brombaer-rodvinssauce":
    "Let sommer-kylling/unghane med brombær-rødvinssauce — kold Zweigelt i glasset. Adskilt fra andebryst-versionen.",
  "sprode-gyoza-med-kold-rodvin":
    "Stegte gyoza som café-snack med ung frugtdrevet rødvin ved 12 °C — chill-red pairing, ikke sake/riesling-fokus.",
  "grillet-halloumi-hvidvins-honningglace":
    "Halloumi/talagani med hvidvins-honningglace — salt ost brudt af vinens syre. Mere glaze-fokus end grillet-halloumi-med-hvidvin.",
  "pica-pau":
    "Portugisisk selskabssnack: møre oksebidder i sauce af hvidvin, øl, sennep og pickles.",
  "ameijoas-a-bulhao-pato":
    "Lissabon-klassiker: venusmuslinger i hvidvin, hvidløg, smør og koriander.",
  "keftedakia-med-rodvin":
    "Græske kødboller med mynte og oregano — fars trukket med rødvin før stegning.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "chill-your-reds": [
    { slug: "grillet-unghanebryst-brombaer-rodvinssauce", label: "Unghanebryst med brombær" },
    { slug: "sprode-gyoza-med-kold-rodvin", label: "Sprøde gyoza med kold rødvin" },
  ],
  "rodvin-til-terrassen": [
    { slug: "sprode-gyoza-med-kold-rodvin", label: "Sprøde gyoza med kold rødvin" },
    { slug: "grillet-halloumi-hvidvins-honningglace", label: "Halloumi med honningglace" },
  ],
  "vinho-verde-vs-alvarinho": [
    { slug: "ameijoas-a-bulhao-pato", label: "Amêijoas à Bulhão Pato" },
    { slug: "pica-pau", label: "Pica-pau" },
  ],
  "vinregion-portugal": [
    { slug: "ameijoas-a-bulhao-pato", label: "Amêijoas à Bulhão Pato" },
    { slug: "pica-pau", label: "Pica-pau" },
  ],
  "graesk-meze-braet": [
    { slug: "keftedakia-med-rodvin", label: "Keftedakia" },
    { slug: "grillet-halloumi-hvidvins-honningglace", label: "Halloumi med honningglace" },
  ],
  "vin-til-graesk-mad": [
    { slug: "keftedakia-med-rodvin", label: "Keftedakia" },
    { slug: "grillet-halloumi-hvidvins-honningglace", label: "Halloumi med honningglace" },
  ],
  "xinomavro-og-touriga-nacional": [
    { slug: "keftedakia-med-rodvin", label: "Keftedakia" },
  ],
  "farvel-sancerre-goddag-assyrtiko": [
    { slug: "grillet-halloumi-hvidvins-honningglace", label: "Halloumi med honningglace" },
  ],
  "vin-til-kylling": [
    { slug: "grillet-unghanebryst-brombaer-rodvinssauce", label: "Unghanebryst med brombær" },
  ],
};

export const RECIPES = [
  r({
    slug: "grillet-unghanebryst-brombaer-rodvinssauce",
    title: "Grillet unghanebryst med brombær- og rødvinssauce",
    description:
      "Let sommer-fjerkræ med brombær-rødvinssauce — kold Zweigelt i glasset. Opskrift til 4.",
    tags: ["opskrift", "kylling", "unghane", "brombær", "rødvin", "chillable", "sommer"],
    prepTime: "PT15M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Let rødvin — Zweigelt, Gamay eller Pinot til sauce + glas ved 12–14 °C",
      amount: "2 dl let rødvin",
      note: "Brombær + let rødvin i saucen; samme stil serveres kold (ikke tung cabernet).",
    },
    wineToDrink: {
      guideSlug: "chill-your-reds",
      searchQuery: "zweigelt kylling brombær",
      searchMax: 150,
      label: "Chill Your Reds",
    },
    relatedGuides: [
      "chill-your-reds",
      "vin-til-kylling",
      "top-5-druer-til-koeleskabet",
      "afkoelt-roedvin",
    ],
    ingredients: [
      "4 unghane- eller kyllingebryst",
      "200 g brombær (friske eller frosne)",
      "2 dl let rødvin",
      "1 skalotteløg",
      "1 spsk ribsgelé eller honning",
      "30 g smør",
      "Olivenolie, timian, salt, peber",
    ],
    instructions: [
      "Grill eller steg bryst 5–7 min pr. side. Hvile.",
      "Sauter skalotteløg. Hæld vin i med halvdelen af bærrene og gele. Kog ind 8–10 minutter. Si gerne. Pisk smør i. Rør resten af bærrene i hele.",
      "Skær kød i skiver. Hæld sauce over.",
      "Server med Zweigelt/Gamay ved 12–14 °C.",
    ],
    intro: `**Grillet unghanebryst med brombær- og rødvinssauce** er let sommer-fjerkræ, hvor bærsyre og [kold rødvin](/guides/chill-your-reds) spiller sammen. Adskilt fra [andebryst med brombær](/opskrifter/andebryst-med-brombaer-rodvinssauce) — her er det lyst kød og chill-red i glasset.`,
    why: `Zweigelt/Gamay har **frugt uden tung tannin**. Læs [vin til kylling](/guides/vin-til-kylling).`,
    tips: [
      ["Ikke oversteg", "Bryst tørrer."],
      ["Bær", "Spar nogle hele til pynt."],
      ["Vin", "Let stil — [20 min i køl](/guides/20-minutter-i-koeleskabet-roedvin)."],
      ["Unghane", "Kyllingebryst er fint alternativ."],
    ],
    serving: `Sommersalat, nye kartofler.`,
    mistakes: [
      "Tung rødvin i sauce og glas.",
      "Lun vin.",
      "For sød sauce uden syre.",
      "At koge bærrene itu i 30 min.",
    ],
    storage: `Sauce 2 dage. Kød friskt.`,
    glass: `Zweigelt eller Gamay 12–14 °C.`,
    faq: [
      ["Blåbær?", "Ja."],
      ["And?", "Brug andebryst-opskriften."],
      ["Uden gele?", "Mere reduktion."],
    ],
  }),

  r({
    slug: "sprode-gyoza-med-kold-rodvin",
    title: "Sprøde gyoza-dumplings med kold rødvin",
    description:
      "Stegte svinegyoza som café-snack — ung frugtdrevet rødvin ved 12 °C. Opskrift til 4 som snack.",
    tags: ["opskrift", "gyoza", "asiatisk", "chillable", "rødvin", "snack", "café"],
    prepTime: "PT30M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Ung, frugtdrevet rød — Gamay, Zweigelt eller let Pinot ved 12 °C",
      amount: "Flaske til servering (+ 1 spsk i dip valgfri)",
      note: "Retten er chill-red-parring: sprød gyoza + kold frugtbombe. Ikke sake-fokus.",
    },
    wineToDrink: {
      guideSlug: "rodvin-til-terrassen",
      searchQuery: "gamay gyoza chillable",
      searchMax: 120,
      label: "rødvin til terrassen",
    },
    relatedGuides: [
      "rodvin-til-terrassen",
      "chill-your-reds",
      "vin-til-asiatisk-mad",
      "20-minutter-i-koeleskabet-roedvin",
    ],
    ingredients: [
      "24 gyoza-skind (eller færdige frozen gyoza)",
      "250 g hakket svinekød",
      "2 forårsløg, 1 spsk ingefær, 1 fed hvidløg",
      "1 spsk soja, 1 tsk sesamolie",
      "Olie til stegning, ½ dl vand til damp",
      "Dip: soja, riseddike, chili",
      "Flaske ung Gamay/Zweigelt (kølet til 12 °C)",
    ],
    instructions: [
      "Rør fyld. Læg 1 tsk i hvert skind — fold og luk tæt. (Eller brug frozen.)",
      "Steg i olie bund-nedved 2–3 minutter til gylden. Hæld vand i, låg på 3–4 minutter. Tag låg af — sprød bund.",
      "Server med dip.",
      "Skænk rødvin ved 12 °C — frugt mod fedt og soja.",
    ],
    intro: `**Sprøde gyoza med kold rødvin** er den asiatiske café-snack i [Chill Your Reds](/guides/chill-your-reds)-universet. Adskilt fra [gyoza med riesling](/opskrifter/gyoza-svinekoed-med-riesling) og [sake-dampede gyoza](/opskrifter/gyoza-dampet-i-sake) — her er **12-graders frugtrød** pointen.`,
    why: `Soja + svinefedt mødes af **syrlig rød frugt** uden tannin-kamp. Læs [rødvin til terrassen](/guides/rodvin-til-terrassen).`,
    tips: [
      ["Sprød bund", "Nok olie først."],
      ["Frozen", "Helt legitimt til snack."],
      ["Vin", "Ung, ingen fad."],
      ["Dip", "Hold den syrlig."],
    ],
    serving: `Snack til 4 eller forret til 2.`,
    mistakes: [
      "Kraftig cabernet.",
      "Lun vin.",
      "Våde gyoza uden sprød bund.",
      "For vådt fyld — sprænger.",
    ],
    storage: `Fyldte rå gyoza kan fryses. Steg fra frossen.`,
    glass: `Gamay/Zweigelt 12 °C.`,
    faq: [
      ["Vegetar-fyld?", "Tofu + kål."],
      ["Bobler i stedet?", "Også godt."],
      ["Riesling?", "Klassisk — men så er det en anden artikel."],
    ],
  }),

  r({
    slug: "grillet-halloumi-hvidvins-honningglace",
    title: "Grillet halloumi med hvidvins- og honningglace",
    description:
      "Salt halloumi/talagani med hvidvins-honningglace — cypriotisk/græsk hot snack. Opskrift til 4.",
    tags: ["opskrift", "halloumi", "grækenland", "hvidvin", "honning", "meze", "vegetar"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Assyrtiko eller Sauvignon",
      amount: "1 dl hvidvin + honning til glaze",
      note: "Vin og honning koges til glaze; ostens salt brydes af syre.",
    },
    wineToDrink: {
      guideSlug: "farvel-sancerre-goddag-assyrtiko",
      searchQuery: "assyrtiko halloumi",
      searchMax: 120,
      label: "Assyrtiko",
    },
    relatedGuides: [
      "farvel-sancerre-goddag-assyrtiko",
      "graesk-meze-braet",
      "vin-til-graesk-mad",
      "rodvin-til-terrassen",
    ],
    ingredients: [
      "400 g halloumi (eller talagani)",
      "1 dl tør hvidvin",
      "2 spsk honning",
      "1 tsk citronsaft",
      "1 tsk oregano",
      "Olivenolie, sort peber",
      "Evt. sesamfrø",
    ],
    instructions: [
      "Glaze: kog vin og honning ind til tyk sirup (5–8 min). Rør citron og oregano i.",
      "Skær halloumi i skiver. Grill/steg i olie 2–3 min pr. side til gylden.",
      "Pensl eller dryp glaze over. Peber og sesam.",
      "Server straks med kold Assyrtiko.",
    ],
    intro: `**Grillet halloumi med hvidvins- og honningglace** er den cypriotisk/græske hot snack: salt ost brudt af vinens syre og honningens sødme. Mere glaze-drevet end [grillet halloumi med hvidvin](/opskrifter/grillet-halloumi-med-hvidvin).`,
    why: `Salt + sød + syre = **klassisk meze-balance**. Læs [græsk meze-bræt](/guides/graesk-meze-braet).`,
    tips: [
      ["Ikke for tyk glaze", "Skal dryppe, ikke karamel-klump."],
      ["Halloumi", "Tør overfladen — bedre stegeskorpe."],
      ["Talagani", "Græsk grillost — samme metode."],
      ["Vin", "Assyrtiko værdisætter retten."],
    ],
    serving: `Meze med oliven og salat.`,
    mistakes: [
      "At brænde honningglazen.",
      "At overstege ost — gummi.",
      "For sød glaze uden citron.",
      "Lun hvidvin.",
    ],
    storage: `Glaze 1 uge i køl. Ost frisk.`,
    glass: `Assyrtiko 8–11 °C.`,
    faq: [
      ["Feta i stedet?", "Nej — smelter. Brug halloumi."],
      ["Vegan?", "Grill-tofu + samme glaze."],
      ["Rødvin-glace?", "Muligt — anden stil til chill-red."],
    ],
  }),

  r({
    slug: "pica-pau",
    title: "Pica-Pau (portugisisk selskabssnack)",
    description:
      "Møre oksebidder i syrlig sauce af hvidvin, øl, sennep og pickles. Opskrift til 4 som tapas.",
    tags: ["opskrift", "portugal", "oksekød", "tapas", "hvidvin", "snack"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin (Vinho Verde/Alvarinho) + lagerøl",
      amount: "1,5 dl hvidvin + 1 dl øl",
      note: "Klassisk pica-pau-sauce: vin, øl, sennep og syltede pickles.",
    },
    wineToDrink: {
      guideSlug: "vinho-verde-vs-alvarinho",
      searchQuery: "vinho verde tapas portugal",
      searchMax: 150,
      label: "Vinho Verde",
    },
    relatedGuides: [
      "vinho-verde-vs-alvarinho",
      "vinregion-portugal",
      "vin-til-tapas",
    ],
    ingredients: [
      "500 g oksefilet eller mørbrad i små tern",
      "1,5 dl tør hvidvin",
      "1 dl lagerøl",
      "2 spsk dijonsennep",
      "1 dl cornichoner/pickles, skåret",
      "2 fed hvidløg, 1 skalotteløg",
      "1 spsk smør + olie",
      "Persille, salt, peber, paprika",
    ],
    instructions: [
      "Steg kødet hurtigt i hot pande i hold — brunet, stadig rosa. Tag op.",
      "Sauter skalotteløg og hvidløg. Hæld vin og øl i — skrab. Rør sennep i. Kog 3–4 minutter.",
      "Tilsæt pickles og kød. Varm igennem 1–2 minutter. Smør i. Persille.",
      "Server med brød og kold Vinho Verde.",
    ],
    intro: `**Pica-Pau** er Portugals selskabssnack: små, møre oksebidder i en **syrlig, intens** sauce af hvidvin, øl, sennep og pickles. Navnet betyder «spætte» — man hakker til med tandstikker.`,
    why: `Sennep + pickles + vin = **syre**, der matcher Vinho Verde. Læs [Vinho Verde vs. Alvarinho](/guides/vinho-verde-vs-alvarinho).`,
    tips: [
      ["Ikke gennemsteg", "Små bidder bliver tørre."],
      ["Pickles", "Gerne søde-syrlige."],
      ["Brød", "Obligatorisk."],
      ["Tandstikkere", "Autentisk servering."],
    ],
    serving: `Tapas med oliven og chips.`,
    mistakes: [
      "Gråt, overstegt kød.",
      "For tynd sauce.",
      "At glemme sennep.",
      "Tung rødvin i glasset.",
    ],
    storage: `Bedst frisk. Rester 1 dag.`,
    glass: `Vinho Verde 8–10 °C.`,
    faq: [
      ["Uden øl?", "Mere vin + fond."],
      ["Svinekød?", "Ja — traditionelt findes variationer."],
      ["Chiliflager?", "Gerne."],
    ],
  }),

  r({
    slug: "ameijoas-a-bulhao-pato",
    title: "Amêijoas à Bulhão Pato",
    description:
      "Portugisiske venusmuslinger i hvidvin, hvidløg, smør og koriander — Lissabon-café. Opskrift til 4.",
    tags: ["opskrift", "portugal", "muslinger", "hvidvin", "koriander", "café"],
    prepTime: "PT15M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Vinho Verde eller Alvarinho",
      amount: "2,5 dl hvidvin",
      note: "Essensen af Lissabon: muslinger, hvidløg, smør, koriander, hvidvin.",
    },
    wineToDrink: {
      guideSlug: "vinho-verde-vs-alvarinho",
      searchQuery: "vinho verde muslinger lisboa",
      searchMax: 150,
      label: "Vinho Verde",
    },
    relatedGuides: [
      "vinho-verde-vs-alvarinho",
      "vinregion-portugal",
      "vin-til-fisk-og-skaldyr",
    ],
    ingredients: [
      "1,5 kg venusmuslinger eller hjertemuslinger, rensede",
      "2,5 dl tør hvidvin",
      "4 fed hvidløg, finthakkede",
      "50 g smør",
      "2 spsk olivenolie",
      "1 stor bundt frisk koriander",
      "Citron, salt, peber",
    ],
    instructions: [
      "Sauter hvidløg i olie/smør 30 sekunder uden at brune.",
      "Hæld vin i — kog op. Tilsæt muslinger. Låg på 4–6 minutter, til de åbner.",
      "Ryst gryden. Rør masser af hakket koriander i. Citron og peber.",
      "Server med brød og samme hvidvin kold.",
    ],
    intro: `**Amêijoas à Bulhão Pato** er selve essensen af Lissabons caféer: muslinger dampet i hvidvin med **oceaner af hvidløg**, smør og frisk koriander. Opkaldt efter digteren Bulhão Pato.`,
    why: `Koriander + hvidløg + hav = **Vinho Verde-territorium**. Læs [Vinho Verde vs. Alvarinho](/guides/vinho-verde-vs-alvarinho).`,
    tips: [
      ["Koriander", "Meget — det er signaturen."],
      ["Hvidløg", "Finthakket, ikke brændt."],
      ["Brød", "Til at dyppe."],
      ["Venusmuslinger", "Hjertemuslinger virker også."],
    ],
    serving: `Forret eller let aftensmad.`,
    mistakes: [
      "At brune hvidløget bittert.",
      "For lidt koriander.",
      "Persille i stedet — anden ret.",
      "At servere uden brød.",
    ],
    storage: `Spis med det samme.`,
    glass: `Vinho Verde eller Alvarinho 8–11 °C.`,
    faq: [
      ["Blåmuslinger?", "Ja."],
      ["Uden smør?", "Kun olie — stadig god."],
      ["Chili?", "Nogle caféer tilsætter — valgfrit."],
    ],
  }),

  r({
    slug: "keftedakia-med-rodvin",
    title: "Keftedakia (græske kødboller) med rødvin",
    description:
      "Sprøde græske kødboller med mynte og oregano — fars marineret med rødvin. Opskrift til 4.",
    tags: ["opskrift", "grækenland", "kødboller", "rødvin", "meze", "mynte"],
    prepTime: "PT25M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Let græsk rød (Xinomavro-blend) eller anden frugtig rødvin",
      amount: "0,75 dl rødvin i fars + flaske til servering",
      note: "Rødvin i farsen giver saftighed; i glasset: Xinomavro eller kold Gamay til meze.",
    },
    wineToDrink: {
      guideSlug: "xinomavro-og-touriga-nacional",
      searchQuery: "xinomavro græsk mad kødboller",
      searchMax: 150,
      label: "Xinomavro",
    },
    relatedGuides: [
      "xinomavro-og-touriga-nacional",
      "graesk-meze-braet",
      "vin-til-graesk-mad",
      "chill-your-reds",
    ],
    ingredients: [
      "500 g hakket lam eller okse/lam-blanding",
      "0,75 dl rødvin",
      "1 lille løg, finthakket",
      "2 fed hvidløg",
      "2 spsk rasp eller udblødt brød",
      "1 æg",
      "2 spsk frisk mynte, 1 spsk oregano",
      "Olivenolie til stegning",
      "Salt, peber, citron",
    ],
    instructions: [
      "Rør fars med vin, løg, hvidløg, rasp, æg, urter, salt og peber. Træk 20–30 minutter.",
      "Form små bolde. Steg i olie, til sprøde og gennemstegte (8–10 min).",
      "Dryp citron over.",
      "Server med tzatziki og Xinomavro — eller kold Gamay til terrasse-meze.",
    ],
    intro: `**Keftedakia med rødvin** er græske mini-kødboller med mynte og oregano, hvor farsen trækker med en sjat rødvin. Perfekt på [meze-brættet](/guides/graesk-meze-braet) — og et møde mellem value-rød ([Xinomavro](/guides/xinomavro-og-touriga-nacional)) og evt. [chill-red](/guides/chill-your-reds).`,
    why: `Vin i fars = **saftighed**; mynte = græsk signatur. Læs [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    tips: [
      ["Små bolde", "Meze-størrelse."],
      ["Mynte", "Frisk — ikke kun tørret."],
      ["Lam", "Mest autentisk."],
      ["Trækketid", "20 min gør forskel."],
    ],
    serving: `Tzatziki, citron, pitabrød.`,
    mistakes: [
      "For store bolde — tørre indeni.",
      "At springe urter over.",
      "For meget vin — våd fars.",
      "At stege for lavt — ikke sprøde.",
    ],
    storage: `Køleskab 2 dage. Frys rå eller stegte.`,
    glass: `Xinomavro 16 °C — eller Gamay 12 °C til snack.`,
    faq: [
      ["Kun okse?", "Ja."],
      ["Ovnstegt?", "200 °C 15–18 min — pensl olie."],
      ["Uden vin?", "Lidt mælk i fars."],
    ],
  }),
];
