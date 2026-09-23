/** Data: vinmarinader — batch 4 (fjerkræ + lam/vildt). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "chili-lime-hvidvinsmarinade":
    "Tør hvidvin + lime + chili + spidskommen til mexicanske kyllingeskiver. 2–4 timer. Dup tørt — chili brænder på max grill.",
  "hvidvins-estragonmarinade":
    "Hvidvin, frisk estragon, dijon og skalotteløg — klassisk til vildtkylling/perlehøne. 4–6 timer. Se [poulet à l'estragon](/opskrifter/poulet-a-lestragon).",
  "hvidvins-karrymarinade":
    "Hvidvin + gul karry + honning til kyllingespyd. 3–5 timer. Balancer karry med syre — for meget honning brænder.",
  "rodvin-enebaermarinade":
    "Kraftig rødvin, knuste enebær, laurbær og timian til hjort/dådyr. 8–24 timer på ben/skiver. Si enebær før stegning.",
  "portvin-mynte-lammemarinade":
    "Ruby port + mynte + hvidløg til lammekoteletter. 4–8 timer. Port er sød — dup tørt og medium varme.",
};

function r(opts) {
  return {
    slug: opts.slug,
    title: opts.title,
    description: opts.description,
    tags: opts.tags,
    prepTime: opts.prepTime ?? "PT10M",
    cookTime: opts.cookTime ?? "PT0M",
    servings: opts.servings ?? 4,
    difficulty: opts.difficulty ?? "easy",
    wineInRecipe: opts.wineInRecipe,
    wineToDrink: opts.wineToDrink,
    relatedGuides: opts.relatedGuides,
    ingredients: opts.ingredients,
    instructions: opts.instructions,
    intro: opts.intro,
    whyTitle: opts.whyTitle ?? "Hvorfor vin i marinaden",
    why: opts.why,
    tips: opts.tips,
    serving: opts.serving,
    mistakes: opts.mistakes,
    storage: opts.storage,
    glass: opts.glass,
    faq: opts.faq,
  };
}

export const RECIPES = [
  r({
    slug: "chili-lime-hvidvinsmarinade",
    title: "Chili-, lime- og hvidvinsmarinade",
    description:
      "Tør hvidvin, lime, chili, koriander og spidskommen — mexicansk marinade til kylling og tacos. Til ca. 800 g kylling.",
    tags: ["opskrift", "marinade", "kylling", "hvidvin", "lime", "chili", "mexicansk"],
    wineInRecipe: {
      style: "Tør, frisk hvidvin — Sauvignon Blanc, Verdejo eller Grüner Veltliner",
      amount: "2 dl hvidvin + lime",
      note: "Hvidvin og lime mørner; chili og spidskommen giver varme uden at dominere syren.",
    },
    wineToDrink: {
      guideSlug: "vin-til-mexicansk-mad",
      searchQuery: "kylling tacos lime chili gruner veltliner",
      searchMax: 200,
      label: "vin til mexicansk kylling",
    },
    relatedGuides: [
      "vin-til-mexicansk-mad",
      "vin-til-kylling-og-lyst-koed",
      "vin-til-grill-og-bbq",
      "vin-til-krydret-og-staerk-mad",
    ],
    ingredients: [
      "2 dl tør hvidvin",
      "Saft af 2 lime + 1 tsk finrevet skal",
      "1–2 røde chili, finthakket (fjern frø for mild)",
      "1 håndfuld frisk koriander, hakket",
      "1 tsk spidskommen, ristet",
      "2 spsk olie",
      "2 fed hvidløg, knuste",
      "1 tsk salt",
      "800 g kylling (lår, bryst eller spyd)",
    ],
    instructions: [
      "Pisk hvidvin, limesaft, skal, chili, koriander, spidskommen, olie, hvidløg og salt.",
      "Skær kylling i strimler eller tern. Mariner 2–4 timer kølet.",
      "Tag op 15 min før. Dup tørt.",
      "Grill, steg wok-hurtigt eller ovn 200 °C.",
      "Server med lime, koriander og tortillas.",
    ],
    intro: `**Chili-, lime- og hvidvinsmarinade** er taco-aften i marinadeform: syrlig hvidvin, lime og chili til kylling. Friskere end [morbradgryde med paprika og hvidvin](/opskrifter/morbradgryde-med-paprika-og-hvidvin), mere vin end ren citrus. Se [vin til mexicansk mad](/guides/vin-til-mexicansk-mad) og [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    why: `Lime + hvidvin giver **syre til mørning**; spidskommen og chili matcher mexicanske krydderier. Tør hvidvin undgår sød klump. Se [vin til krydret mad](/guides/vin-til-krydret-og-staerk-mad).`,
    tips: [
      ["Rist spidskommen", "Mere nøddeagtigt aroma."],
      ["Frø ude", "Mildere chili uden at miste smag."],
      ["Kort tid på bryst", "2 timer max til tynde skiver."],
      ["Glasset", "Grüner eller Sauvignon med lime."],
    ],
    serving: `Tacos, nachos eller salatbowl. Evt. [vin til nachos](/guides/vin-til-nachos) som inspiration til drikkevare.`,
    mistakes: [
      "For meget chili — dækker lime.",
      "Natten over på bryst — tørt.",
      "Sød hvidvin — klaimatisk.",
      "Grill max uden tørring — brændt chili.",
    ],
    storage: `Marinade 2 dage. Marineret kylling 24 timer.`,
    glass: `Grüner Veltliner eller Sauvignon Blanc — se [vin til mexicansk mad](/guides/vin-til-mexicansk-mad).`,
    faq: [
      ["Til svinekød?", "Ja — carnitas-stil, 4–6 timer."],
      ["Til rejer?", "30–45 min — meget kort."],
      ["Røget paprika?", "Ja — 1 tsk ekstra dybde."],
      ["Uden vin?", "Lime + øl — kortere marinade."],
    ],
  }),

  r({
    slug: "hvidvins-estragonmarinade",
    title: "Hvidvins- og estragonmarinade",
    description:
      "Tør hvidvin, frisk estragon, dijon og skalotteløg — fransk marinade til perlehøne og kyllingebryst. Til ca. 800 g fjerkræ.",
    tags: ["opskrift", "marinade", "kylling", "hvidvin", "estragon", "fransk"],
    wineInRecipe: {
      style: "Tør hvidvin — Chablis, Muscadet eller Sancerre",
      amount: "2 dl hvidvin",
      note: "Estragon elsker syre; hvidvin og dijon binder skalotteløg og urten til lyst kød.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kylling-og-lyst-koed",
      searchQuery: "estragon kylling chablis sancerre",
      searchMax: 200,
      label: "vin til estragon-kylling",
    },
    relatedGuides: [
      "vin-til-kylling-og-lyst-koed",
      "vin-til-klassisk-fransk-mad",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-kalkun",
    ],
    ingredients: [
      "2 dl tør hvidvin",
      "1 lille bundt frisk estragon (ca. 15 blade)",
      "1 spsk dijonsennep",
      "2 skalotteløg, finthakket",
      "3 spsk smør smeltet eller olivenolie",
      "1 tsk salt",
      "½ tsk peber",
      "800 g kyllingebryst eller perlehøne (parteret)",
    ],
    instructions: [
      "Hak halvdelen af estragonen. Bland med vin, dijon, skalotteløg, olie/smør, salt og peber.",
      "Læg fjerkræ i marinade med hele estragonkviste.",
      "Mariner 4–6 timer i køleskab.",
      "Tag op, fjern kviste, dup tørt. Steg i pande eller ovn.",
      "Finish som [poulet à l'estragon](/opskrifter/poulet-a-lestragon) med kogt marinade.",
    ],
    intro: `**Hvidvins- og estragonmarinade** er den klassiske franske urtemarinade — Chablis, dijon og estragon til kylling og perlehøne. Forløber til [poulet à l'estragon](/opskrifter/poulet-a-lestragon). Finere end [provencalsk hvidløgsmarinade](/opskrifter/provencal-hvidvins-hvidloegsmarinade). Se [vin til klassisk fransk mad](/guides/vin-til-klassisk-fransk-mad).`,
    why: `Estragon har **anis-lignende noter**, der løftes af syre og alkohol. Skalotteløg og dijon giver dybde uden tung sauce. Se [vin til kalkun](/guides/vin-til-kalkun) for festfjerkræ.`,
    tips: [
      ["Frisk estragon", "Tørret kræver halv mængde — svagere."],
      ["Perlehøne", "Lidt længere tid end kyllingebryst."],
      ["Smør finish", "Pensl med smør og estragon efter stegning."],
      ["Ikke kog estragon", "Tilsæt frisk ved servering."],
    ],
    serving: `Kartoffelmos, haricots verts og hvidvin i glasset.`,
    mistakes: [
      "For gammel tørret estragon — flad smag.",
      "For lang marinade på tyndt bryst.",
      "At brænde dijon på max varme.",
      "Genbrug rå marinade.",
    ],
    storage: `Marinade 2 dage. Marineret kylling 24 timer.`,
    glass: `Chablis eller Sancerre — se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    faq: [
      ["Til kalkun?", "Ja — bryst 4–6 timer."],
      ["Uden dijon?", "Grov sennep + ekstra eddike."],
      ["Til fisk?", "Ja — laks/kuller, 1–2 timer."],
      ["Erstatning for estragon?", "Basilikum + lidt fennikelfrø — anden ret."],
    ],
  }),

  r({
    slug: "hvidvins-karrymarinade",
    title: "Hvidvins- og karrymarinade",
    description:
      "Tør hvidvin, gul karry, hvidløg og honning — mild, gylden marinade til kyllingespyd. Til ca. 800 g kylling.",
    tags: ["opskrift", "marinade", "kylling", "hvidvin", "karry", "grill"],
    wineInRecipe: {
      style: "Tør hvidvin — Riesling, Pinot Grigio eller Viognier",
      amount: "2 dl hvidvin",
      note: "Hvidvin holder karry frisk; honning balancerer uden at gøre marinaden tung.",
    },
    wineToDrink: {
      guideSlug: "vin-til-karryretter",
      searchQuery: "kylling karry riesling gewurztraminer",
      searchMax: 200,
      label: "vin til karry",
    },
    relatedGuides: [
      "vin-til-karryretter",
      "vin-til-kylling-og-lyst-koed",
      "vin-til-grill-og-bbq",
      "vin-til-asiatisk-mad",
    ],
    ingredients: [
      "2 dl tør hvidvin",
      "2 spsk gul karrypasta (eller 1 spsk pulver + 1 spsk vand)",
      "2 spsk honning",
      "3 fed hvidløg, revet",
      "2 spsk olie",
      "1 spsk citronsaft",
      "1 tsk salt",
      "800 g kylling til spyd (lår el. bryst)",
    ],
    instructions: [
      "Rør hvidvin, karry, honning, hvidløg, olie, citron og salt til jævn masse.",
      "Skær kylling i tern. Mariner 3–5 timer kølet.",
      "Træk på spyd med løg og peberfrugt.",
      "Dup tørt. Grill medium til gennemstegt.",
      "Pensl med kogt marinade hvis ønsket.",
    ],
    intro: `**Hvidvins- og karrymarinade** er grill-karry uden kokos: hvidvin, gul karry og honning til spyd. Lettere end [tom kha gai med hvidvin](/opskrifter/tom-kha-gai-med-hvidvin). Se [vin til karryretter](/guides/vin-til-karryretter) og [wok-kylling med hvidvin](/opskrifter/wok-kylling-med-hvidvin).`,
    why: `Karry i **syrlig hvidvin** mørner og aromatiserer uden fed kokos. Honning hjælper karamellisering på grill. Se [vin til asiatisk mad](/guides/vin-til-asiatisk-mad).`,
    tips: [
      ["Gul karry", "Mildere end rød — bedre til vin."],
      ["Citron", "Holder honningen frisk."],
      ["Lår på spyd", "Tåler længere end bryst."],
      ["Riesling", "Klassisk karry-parring i glasset."],
    ],
    serving: `Jasminris, syltet agurk og salat. Gewürztraminer eller Riesling.`,
    mistakes: [
      "For meget honning — brændt spyd.",
      "Rød karry uden justering — for stærk til hvidvin.",
      "Våd kylling på grill.",
      "Overnat på bryst — tørt.",
    ],
    storage: `Marinade 3 dage. Marineret kylling 24 timer.`,
    glass: `Off-dry Riesling eller Gewürztraminer — se [vin til karry](/guides/vin-til-karryretter).`,
    faq: [
      ["Til tofu?", "Ja — 2–3 timer, skær i blokke."],
      ["Kokosmælk?", "Tilsæt efter marinade — ikke i rå skål til lang tid."],
      ["Til lam?", "Ja — 6–8 timer, skiver."],
      ["Uden honning?", "Lidt brun farin eller mango-chutney."],
    ],
  }),

  r({
    slug: "rodvin-enebaermarinade",
    title: "Rødvin- og enebærmarinade",
    description:
      "Kraftig rødvin, knuste enebær, laurbær og timian — nordisk marinade til hjort, dådyr og vildtkød. Til ca. 1 kg kød.",
    tags: ["opskrift", "marinade", "vildt", "rødvin", "enebær", "hjort"],
    wineInRecipe: {
      style: "Kraftig rødvin — Cabernet, Syrah eller gamay til gryde",
      amount: "3 dl rødvin + enebær",
      note: "Rødvin mørner vildt; enebær og laurbær er klassisk nordisk vildtsmag.",
    },
    wineToDrink: {
      guideSlug: "vin-til-vildt",
      searchQuery: "hjort enebaer pinot noir syrah",
      searchMax: 200,
      label: "vin til vildt",
    },
    relatedGuides: [
      "vin-til-vildt",
      "vin-til-dyreryg",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-grill-og-bbq",
    ],
    ingredients: [
      "3 dl kraftig rødvin",
      "1 spsk grønne enebær, let knuste",
      "2 laurbærblade",
      "2 kviste timian",
      "2 spsk olivenolie",
      "1 løg, skiveskåret",
      "2 fed hvidløg, knuste",
      "1 tsk salt",
      "1 tsk peber",
      "1 kg hjortebov, dådyrskiver eller vildtkød med ben",
    ],
    instructions: [
      "Bland rødvin, enebær, laurbær, timian, olie, løg, hvidløg, salt og peber.",
      "Læg kød i. Mariner 8–24 timer i køleskab — vend.",
      "Tag op, si enebær og laurbær af overfladen. Dup tørt.",
      "Brun kød, braiser eller grill indirekte til mør.",
      "Brug siet, kogt marinade i [vildtgryde med portvin og enebær](/opskrifter/vildtgryde-med-portvin-og-enebaer)-stil sauce.",
    ],
    intro: `**Rødvin- og enebærmarinade** er skoven på tallerkenen: cabernet/syrah, enebær og timian til hjort og dådyr. Tæt på [vildtgryde med portvin og enebær](/opskrifter/vildtgryde-med-portvin-og-enebaer) og [klassisk rødvins-rosmarin](/opskrifter/klassisk-rodvins-rosmarinmarinade) — mere vildt end okse. Se [vin til vildt](/guides/vin-til-vildt).`,
    why: `Vildtkød er magert og **tåler lang mørning**. Enebær og rødvin er traditionelt par; syre bryder gamey noter. Se [vin til dyreryg](/guides/vin-til-dyreryg).`,
    tips: [
      ["Knus enebær", "Ikke pulver — bitter hvis for fint."],
      ["Si før varme", "Hele bær kan brænde."],
      ["Lang tid", "Ben og skank 18–24 timer."],
      ["Dup tørt", "Skorpe ved bruning."],
    ],
    serving: `Tyttebær, rodfrugter og viltsauce. Pinot noir eller syrah.`,
    mistakes: [
      "For mange enebær — medicin-agtigt.",
      "For sød rødvin — klumpet smag.",
      "At stege med hele bær på — bitter.",
      "For kort tid på seje skank.",
    ],
    storage: `Marinade 3 dage. Marineret vildt 48 timer max.`,
    glass: `Pinot noir, Syrah eller Rhône — se [vin til vildt](/guides/vin-til-vildt).`,
    faq: [
      ["Til okse?", "Ja — men kortere tid, 4–8 timer."],
      ["Tørre enebær?", "Halv mængde, knus let."],
      ["Til and?", "Nej — for tung; brug [portvinsmarinade](/opskrifter/portvins-hvidloegsmarinade)."],
      ["Frys marineret?", "Hellere marinere efter optøning."],
    ],
  }),

  r({
    slug: "portvin-mynte-lammemarinade",
    title: "Portvin-, mynte- og lammemarinade",
    description:
      "Ruby portvin, frisk mynte, hvidløg og olie — sød-salt marinade til lammekoteletter. Til ca. 800 g lam.",
    tags: ["opskrift", "marinade", "lam", "portvin", "mynte", "grill"],
    wineInRecipe: {
      style: "Ruby portvin — frugtig, ikke for gammel tawny",
      amount: "1½ dl portvin",
      note: "Port giver sødme og farve; mynte og hvidløg klæder lammets smag.",
    },
    wineToDrink: {
      guideSlug: "vin-til-lam",
      searchQuery: "lammekoteletter portvin mynte rioja",
      searchMax: 200,
      label: "vin til lam",
    },
    relatedGuides: [
      "vin-til-lam",
      "bedste-portvin",
      "hvad-er-portvin",
      "vin-til-grill-og-bbq",
    ],
    ingredients: [
      "1½ dl ruby portvin",
      "1 håndfuld frisk mynte, hakket",
      "4 fed hvidløg, knuste",
      "3 spsk olivenolie",
      "1 spsk hvidvinseddike",
      "1 tsk salt",
      "1 tsk peber",
      "800 g lammekoteletter eller rack",
    ],
    instructions: [
      "Rør port, mynte, hvidløg, olie, eddike, salt og peber.",
      "Læg koteletter i. Mariner 4–8 timer kølet.",
      "Tag op 20 min før. Dup tørt.",
      "Grill eller steg medium — lam skal gerne være lyserødt indeni.",
      "Hvil 5 min. Top med frisk mynte.",
    ],
    intro: `**Portvin-, mynte- og lammemarinade** er britisk grillklassiker i dansk udgave: ruby port, mynte og hvidløg til koteletter. Komplementerer [lammesteg med rødvin og rosmarin](/opskrifter/lammesteg-med-rodvin-rosmarin) og [portvins-hvidløgsmarinade](/opskrifter/portvins-hvidloegsmarinade) til okse. Se [hvad er portvin](/guides/hvad-er-portvin).`,
    why: `Port koncentrerer **frugt og sødme** mod lammets gamey fedme. Mynte giver friskhed; eddike holder balancen. Se [vin til lam](/guides/vin-til-lam).`,
    tips: [
      ["Ruby port", "Tawny er nøddet — fint, men anden profil."],
      ["Frisk mynte", "Tilsæt ekstra rå ved servering."],
      ["Medium stegning", "Port brænder på max varme."],
      ["Eddike", "Undgår for sød marinade."],
    ],
    serving: `Mint sauce, nye kartofler og grøn salat. Rioja eller Rhône i glasset.`,
    mistakes: [
      "For gammel, sød port — dessertprofil.",
      "For lang marinade — «kogt» overflade.",
      "At stege kold fra køleskab — ujævn.",
      "Pensling med rå port-marinade.",
    ],
    storage: `Marinade 3 dage. Marineret lam 24 timer.`,
    glass: `Rioja, Syrah eller ung Bordeaux — se [bedste portvin](/guides/bedste-portvin) til efter maden.`,
    faq: [
      ["Til lammesteg?", "Ja — 6–10 timer, vend."],
      ["Til okse?", "Ja — kortere, som [portvinsmarinade](/opskrifter/portvins-hvidloegsmarinade)."],
      ["Uden port?", "Rødvin + 1 spsk honning."],
      ["Til grillfest?", "Perfekt — se [vin til grill](/guides/vin-til-grill-og-bbq)."],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-mexicansk-mad": [
    { slug: "chili-lime-hvidvinsmarinade", label: "Chili-lime-marinade" },
  ],
  "vin-til-kylling-og-lyst-koed": [
    { slug: "chili-lime-hvidvinsmarinade", label: "Chili-lime" },
    { slug: "hvidvins-estragonmarinade", label: "Estragonmarinade" },
    { slug: "hvidvins-karrymarinade", label: "Karrymarinade" },
  ],
  "vin-til-kalkun": [
    { slug: "hvidvins-estragonmarinade", label: "Estragon til fjerkræ" },
  ],
  "vin-til-karryretter": [
    { slug: "hvidvins-karrymarinade", label: "Hvidvins-karry" },
  ],
  "vin-til-vildt": [
    { slug: "rodvin-enebaermarinade", label: "Enebærmarinade" },
  ],
  "vin-til-dyreryg": [
    { slug: "rodvin-enebaermarinade", label: "Rødvin-enebær" },
  ],
  "vin-til-lam": [
    { slug: "portvin-mynte-lammemarinade", label: "Port-mynte-lam" },
  ],
  "bedste-portvin": [
    { slug: "portvin-mynte-lammemarinade", label: "Portvin til lam" },
  ],
  "hvad-er-portvin": [
    { slug: "portvin-mynte-lammemarinade", label: "Port i marinade" },
  ],
  "vin-til-grill-og-bbq": [
    { slug: "chili-lime-hvidvinsmarinade", label: "Mexicanske spyd" },
    { slug: "hvidvins-karrymarinade", label: "Karryspyd" },
    { slug: "portvin-mynte-lammemarinade", label: "Lammekoteletter" },
  ],
  "vin-til-asiatisk-mad": [
    { slug: "hvidvins-karrymarinade", label: "Karrymarinade" },
  ],
};
