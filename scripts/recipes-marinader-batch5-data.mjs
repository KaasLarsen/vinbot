/** Data: vinmarinader — batch 5 (lam/vildt + fisk). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "madeira-allehaandemarinade":
    "Madeira + allehånde + nellike + appelsinskal til vildsvin/vildt til gryde. 12–24 timer. Kog altid restmarinade — gamey råvare.",
  "rodvin-hvidloeg-rosmarinmarinade-til-lam":
    "Samme logik som okse-rosmarin, men til lammelår: 6–12 timer. Rosmarin + rødvin + hvidløg. Se [lammesteg med rødvin](/opskrifter/lammesteg-med-rodvin-rosmarin).",
  "hvidvins-dildmarinade":
    "Sauvignon Blanc + dild + citronskal + rapsolie til laks. 30–90 min max — fisk «koger» i syre. Dup tørt ved stegning.",
  "lime-hvidvins-cevichemarinade":
    "Hvidvin + lime + rødløg + koriander til hvid fisk — kort «marinade» 20–40 min. Server kold.",
  "ingefaer-chili-hvidvinsmarinade":
    "Hvidvin + ingefær + chili + citrongræs til kongerejer på spyd. 20–45 min. Meget kort — rejer bliver gummi.",
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
    slug: "madeira-allehaandemarinade",
    title: "Madeira- og allehåndemarinade",
    description:
      "Madeira, allehånde, nellike og appelsinskal — varm, krydret marinade til vildsvin og vildt til gryde. Til ca. 1 kg kød.",
    tags: ["opskrift", "marinade", "vildt", "madeira", "krydderi", "gryde"],
    wineInRecipe: {
      style: "Madeira — Sercial eller Verdelho (tør til medium)",
      amount: "2 dl Madeira",
      note: "Madeira tåler varme og giver nøddeagtig dybde; allehånde og nellike matcher vildsvin.",
    },
    wineToDrink: {
      guideSlug: "vin-til-vildt",
      searchQuery: "vildsvin madeira syrah",
      searchMax: 200,
      label: "vin til vildsvin",
    },
    relatedGuides: [
      "hvad-er-madeira-vin",
      "vin-til-vildt",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-gryderet",
    ],
    ingredients: [
      "2 dl Madeira (Sercial eller Verdelho)",
      "1 tsk hele allehånde, knuste",
      "4 hele nelliker",
      "Skal af 1 appelsin (uden hvid pith)",
      "2 spsk olivenolie",
      "1 løg, skiveskåret",
      "2 fed hvidløg, knuste",
      "1 laurbærblad",
      "1 tsk salt",
      "1 kg vildsvin, hjort i tern eller andet vildt til gryde",
    ],
    instructions: [
      "Bland Madeira, allehånde, nelliker, appelsinskal, olie, løg, hvidløg, laurbær og salt.",
      "Læg kød i. Mariner 12–24 timer i køleskab.",
      "Tag op, si krydderier af overfladen. Dup tørt og brun kød.",
      "Simr i gryde med kogt, siet marinade — som [glaseret skinke med Madeirasauce](/opskrifter/glaseret-skinke-med-madeirasauce).",
      "Fjern nelliker og laurbær før servering.",
    ],
    intro: `**Madeira- og allehåndemarinade** er grydevildt med historie: tør Madeira, allehånde og appelsin til vildsvin og hjort. I familie med [glaseret skinke med Madeirasauce](/opskrifter/glaseret-skinke-med-madeirasauce) og [vildtgryde med portvin](/opskrifter/vildtgryde-med-portvin-og-enebaer). Læs [hvad er Madeira-vin](/guides/hvad-er-madeira-vin).`,
    why: `Madeira er **oxidativt stabil** og giver dybde uden at falme i lang simring. Krydderier er klassiske til vildsvin. Se [vin til vildt](/guides/vin-til-vildt).`,
    tips: [
      ["Tør Madeira", "Sød Madeira kun til dessertfinish."],
      ["Si krydderier", "Hele nelliker i tanden er ubehageligt."],
      ["Brun først", "Maillard + marinade = dybde."],
      ["Lang simring", "Marinaden er start — ikke slutning."],
    ],
    serving: `Polenta, rodfrugter eller kartoffelmos. Syrah eller Madeira i glasset.`,
    mistakes: [
      "For sød Madeira — klumpet gryde.",
      "For mange nelliker — medicin.",
      "At bruge rå marinade uden kogning.",
      "For kort tid på sejt vildsvin.",
    ],
    storage: `Marinade 4 dage. Marineret kød 48 timer.`,
    glass: `Syrah, Rhône eller glas Madeira — se [hvad er Madeira](/guides/hvad-er-madeira-vin).`,
    faq: [
      ["Til okse?", "Ja — braiseret okse, 8–12 timer."],
      ["Til skinke?", "Ja — som juleskinke-inspireret base."],
      ["Uden Madeira?", "Sherry + bouillon — anden profil."],
      ["Fryse?", "Marinere efter optøning."],
    ],
  }),

  r({
    slug: "rodvin-hvidloeg-rosmarinmarinade-til-lam",
    title: "Rødvin-, hvidløgs- og rosmarinmarinade til lam",
    description:
      "Kraftig rødvin, hvidløg og frisk rosmarin — klassisk marinade til lammelår og lammesteg. Til ca. 1,5 kg lam.",
    tags: ["opskrift", "marinade", "lam", "rødvin", "rosmarin", "hvidløg"],
    servings: 6,
    wineInRecipe: {
      style: "Kraftig rødvin — Rioja, Syrah eller Cabernet-Merlot",
      amount: "3 dl rødvin",
      note: "Samme princip som okse-rosmarin: syre mørner; rosmarin og hvidløg klæder lammets smag.",
    },
    wineToDrink: {
      guideSlug: "vin-til-lam",
      searchQuery: "lammesteg rioja syrah rosmarin",
      searchMax: 200,
      label: "vin til lam",
    },
    relatedGuides: [
      "vin-til-lam",
      "vin-til-grill-og-bbq",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-oksekoed",
    ],
    ingredients: [
      "3 dl kraftig rødvin",
      "6 fed hvidløg, knuste",
      "4 kviste frisk rosmarin",
      "3 spsk olivenolie",
      "1 spsk balsamico (evt.)",
      "1 tsk salt",
      "1 tsk peber",
      "1,5 kg lammelår, lammesteg eller skulder",
    ],
    instructions: [
      "Bland rødvin, hvidløg, rosmarin, olie, evt. balsamico, salt og peber.",
      "Rids fedtkant på steg. Læg lam i pose med marinade.",
      "Mariner 6–12 timer (gerne natten over). Vend.",
      "Tag op 45 min før ovn. Dup tørt. Fjern rosmarinkviste.",
      "Ovnsteg eller grill som [lammesteg med rødvin og rosmarin](/opskrifter/lammesteg-med-rodvin-rosmarin).",
    ],
    intro: `**Rødvin-, hvidløgs- og rosmarinmarinade til lam** er [klassisk rødvins-rosmarin](/opskrifter/klassisk-rodvins-rosmarinmarinade) flyttet til fåret: cabernet/rioja, hvidløg og rosmarin til lår og steg. Direkte søster til [lammesteg med rødvin og rosmarin](/opskrifter/lammesteg-med-rodvin-rosmarin). Se [vin til lam](/guides/vin-til-lam).`,
    why: `Lam tåler **kraftig rødvin og urter** som okse, men med kortere mørning på skiver. Rosmarin er naturligt par til lam. Se [sådan bruger du vin](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Hele rosmarinkviste", "Nem at fjerne før varme."],
      ["Natten over", "Fint til hele lår — ikke til tern til grill."],
      ["Balsamico", "Valgfri syre og farve."],
      ["Hvil kød", "15 min efter ovn."],
    ],
    serving: `Rosmarinkartofler, grønne bønner og Rioja. Evt. [portvin-mynte-lammemarinade](/opskrifter/portvin-mynte-lammemarinade) til koteletter.`,
    mistakes: [
      "For lang marinade på tern — grødet.",
      "At stege med våd overflade.",
      "Tung dessertvin — for sød.",
      "Rosmarin på max varme — bitter.",
    ],
    storage: `Marinade 3 dage. Marineret lam 36 timer.`,
    glass: `Rioja, Syrah eller Rhône — se [vin til lam](/guides/vin-til-lam).`,
    faq: [
      ["Forskel fra okse-version?", "Samme opskrift — kortere tid på tyndt lam."],
      ["Til lammekoteletter?", "4–6 timer."],
      ["Til okse?", "Ja — se [klassisk rosmarin](/opskrifter/klassisk-rodvins-rosmarinmarinade)."],
      ["Uden balsamico?", "Lidt rødvinseddike."],
    ],
  }),

  r({
    slug: "hvidvins-dildmarinade",
    title: "Hvidvins- og dildmarinade",
    description:
      "Sauvignon Blanc, frisk dild, citronskal og rapsolie — nordisk marinade til laks og fiskefileter. Til ca. 600 g fisk.",
    tags: ["opskrift", "marinade", "fisk", "laks", "hvidvin", "dild"],
    wineInRecipe: {
      style: "Sauvignon Blanc eller tør, urtet hvidvin",
      amount: "1½ dl hvidvin",
      note: "Kort tid — syre og dild aromatiserer uden at «koger» fisken.",
    },
    wineToDrink: {
      guideSlug: "vin-til-laks",
      searchQuery: "laks dild sauvignon blanc",
      searchMax: 200,
      label: "vin til laks",
    },
    relatedGuides: [
      "vin-til-laks",
      "vin-til-lys-fisk",
      "vin-til-fisk-og-skaldyr",
      "vin-til-grillet-fisk",
    ],
    ingredients: [
      "1½ dl Sauvignon Blanc",
      "1 lille bundt dild, groft hakket",
      "Skal af 1 citron",
      "3 spsk rapsolie",
      "1 spsk hvidvinseddike",
      "1 tsk salt",
      "½ tsk peber",
      "600 g laks (filet med skind) eller ørred",
    ],
    instructions: [
      "Bland hvidvin, dild, citronskal, olie, eddike, salt og peber.",
      "Læg fisk i lav skål med marinade — skind op hvis stegning.",
      "Mariner 30–90 min kølet — vend én gang.",
      "Tag op, dup tørt. Steg, grill eller ovn.",
      "Server med citron og frisk dild — som [hvidvins-safransauce til laks](/opskrifter/hvidvins-safransauce-til-laks) uden sauce.",
    ],
    intro: `**Hvidvins- og dildmarinade** er dansk sommer til laks: Sauvignon, dild og citron. Lettere end [dampet laks med rosévinssauce](/opskrifter/dampet-laks-med-rosevinssauce), mere vin end [hvidvinsdampet torsk](/opskrifter/hvidvinsdampet-torsk-med-porrer-og-safran). Se [vin til laks](/guides/vin-til-laks).`,
    why: `Fisk mørner **hurtigt** — kort marinade giver aroma uden melet tekstur. Dild og Sauvignon deler grøn, syrlig profil. Se [vin til grillet fisk](/guides/vin-til-grillet-fisk).`,
    tips: [
      ["Max 90 min", "Længere «grøder» laksen."],
      ["Dup tørt", "Skorpe på pande/grill."],
      ["Skind ned", "Ved stegning for sprødhed."],
      ["Frisk dild", "Dryss over ved servering."],
    ],
    serving: `Nye kartofler, agurkesalat og grøn salat. Sauvignon i glasset.`,
    mistakes: [
      "Natten over — uædel tekstur.",
      "For meget eddike — «ceviche-effekt».",
      "Våd fisk på pande — damper.",
      "Tung egetræs-chardonnay — dominerer dild.",
    ],
    storage: `Marinade 2 dage uden fisk. Marineret fisk skal tilberedes samme dag.`,
    glass: `Sauvignon Blanc eller Sancerre — se [vin til laks](/guides/vin-til-laks).`,
    faq: [
      ["Til torsk?", "Ja — 20–40 min, endnu kortere."],
      ["Til røget laks?", "Nej — brug som dip uden lang tid."],
      ["Uden skind?", "Reducer tid til 20–30 min."],
      ["Grill?", "Ja — medium, oliet rist."],
    ],
  }),

  r({
    slug: "lime-hvidvins-cevichemarinade",
    title: "Lime- og hvidvins-cevichemarinade",
    description:
      "Tør hvidvin, lime, rødløg og koriander — kold marinade til hvid fisk og rejer (ceviche-inspireret). Til ca. 500 g fisk.",
    tags: ["opskrift", "marinade", "fisk", "ceviche", "hvidvin", "lime"],
    wineInRecipe: {
      style: "Tør, syrlig hvidvin — Albariño, Vinho Verde eller Txakoli",
      amount: "1 dl hvidvin + lime",
      note: "Vin udvider ceviche-profilen; lime og løg giver den klassiske «marinering» — hold tid kort.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ceviche",
      searchQuery: "ceviche albarino txakoli lime",
      searchMax: 200,
      label: "vin til ceviche",
    },
    relatedGuides: [
      "vin-til-ceviche",
      "vin-til-lys-fisk",
      "vin-til-fisk-og-skaldyr",
      "vin-til-peruviansk-mad",
    ],
    ingredients: [
      "1 dl tør hvidvin",
      "Saft af 3 lime",
      "1 rødløg, fint skiveskåret",
      "1 håndfuld koriander, hakket",
      "1 grøn chili, finthakket (valgfri)",
      "1 tsk salt",
      "500 g meget frisk torsk, kulmule, fladfisk eller rejer",
    ],
    instructions: [
      "Bland hvidvin, limesaft, løg, koriander, chili og salt.",
      "Skær fisk i tern (eller rejer halve). Dæk med marinade.",
      "Mariner 20–40 min kølet — fisk skal være opaque, ikke gummi.",
      "Server straks kold med tortilla chips eller søde kartofler.",
      "Tilsæt ikke olie før servering — friskhed først.",
    ],
    intro: `**Lime- og hvidvins-cevichemarinade** er ceviche med vin i billedet: lime, rødløg og hvidvin til rå fisk tern. Friskere end [zuppa di pesce](/opskrifter/zuppa-di-pesce), koldere end [hvidvinsdampet torsk](/opskrifter/hvidvinsdampet-torsk-en-papillote). Se [vin til ceviche](/guides/vin-til-ceviche).`,
    why: `Lime «denaturerer» protein; **hvidvin tilføjer syre og frugt** uden at erstatte citrus. Kort tid bevarer tekstur. Se [vin til lys fisk](/guides/vin-til-lys-fisk).`,
    tips: [
      ["Sashimi-kvalitet", "Kun ultr frisk fisk."],
      ["20–40 min", "Smag undervejs — tykkelse tæller."],
      ["Kold skål", "Servering skal være kold."],
      ["Albariño", "Perfekt match i glasset."],
    ],
    serving: `Avocado, majs og ekstra lime. Txakoli eller Albariño.`,
    mistakes: [
      "For lang tid — gummi-fisk.",
      "For lidt salt — flad ceviche.",
      "Tung, egetræs-hvidvin i skålen — bitter.",
      "Fisk der ikke er til rå servering.",
    ],
    storage: `Tilbered og spis samme dag — gem ikke rå ceviche.`,
    glass: `Albariño, Txakoli eller Vinho Verde — se [vin til ceviche](/guides/vin-til-ceviche).`,
    faq: [
      ["Er det helt rå?", "Ja — som ceviche; brug sushi-kvalitet."],
      ["Kun lime uden vin?", "Ja — klassisk; vin er twist."],
      ["Til rejer?", "Ja — 15–25 min."],
      ["Med kokos?", "Tilsæt mælk efter — ikke i syre-skål længe."],
    ],
  }),

  r({
    slug: "ingefaer-chili-hvidvinsmarinade",
    title: "Ingefær-, chili- og hvidvinsmarinade",
    description:
      "Tør hvidvin, ingefær, chili og citrongræs — asiatisk marinade til kongerejer på spyd. Til ca. 500 g rejer.",
    tags: ["opskrift", "marinade", "rejer", "hvidvin", "ingefær", "grill"],
    wineInRecipe: {
      style: "Tør hvidvin — Riesling, Pinot Grigio eller Chenin Blanc",
      amount: "1 dl hvidvin",
      note: "Meget kort marinade — vin og ingefær aromatiserer uden at gøre rejer gummi.",
    },
    wineToDrink: {
      guideSlug: "vin-til-rejer",
      searchQuery: "kongerejer riesling ingefaer grill",
      searchMax: 200,
      label: "vin til rejer",
    },
    relatedGuides: [
      "vin-til-rejer",
      "vin-til-fisk-og-skaldyr",
      "vin-til-asiatisk-mad",
      "vin-til-grillet-fisk",
    ],
    ingredients: [
      "1 dl tør hvidvin",
      "2 spsk revet ingefær",
      "1 rød chili, finthakket",
      "1 stængel citrongræs, hvid del, knust",
      "2 spsk sojasauce",
      "1 spsk sesamolie",
      "1 tsk honning",
      "500 g store rejer (skal på)",
    ],
    instructions: [
      "Bland hvidvin, ingefær, chili, citrongræs, soja, sesamolie og honning.",
      "Vend rejer i. Mariner 20–45 min kølet — ikke længere.",
      "Træk på spyd med løg og peber.",
      "Dup let. Grill eller steg 1–2 min per side.",
      "Server med lime — som [rejer i hvidvin](/opskrifter/rejer-i-hvidvin) på grill.",
    ],
    intro: `**Ingefær-, chili- og hvidvinsmarinade** er grill-rejer med vin: ingefær, citrongræs og hvidvin til kongerejer. Asiatisk som [asiatisk rødvin-ingefær](/opskrifter/asiatisk-rodvin-ingefaermarinade), men til skaldyr og hvidvin. Se [vin til rejer](/guides/vin-til-rejer).`,
    why: `Rejer **mørner på minutter**. Hvidvin giver syre; ingefær og citrongræs er klassisk til skaldyr. Soja og sesam binder. Se [vin til asiatisk mad](/guides/vin-til-asiatisk-mad).`,
    tips: [
      ["Max 45 min", "Ellers gummi."],
      ["Store rejer", "Bedre på spyd end små."],
      ["Høj varme, kort tid", "Rejer bliver hurtigt gummi."],
      ["Skal på", "Beskytter kødet."],
    ],
    serving: `Jasminris, edamame og [gambas al Jerez](/opskrifter/gambas-al-jerez) som varm companion.`,
    mistakes: [
      "Overnat — uædel.",
      "For meget soja — salt og mørk farve.",
      "At grille kolde, våde rejer.",
      "For mild chili uden ingefær — fladt.",
    ],
    storage: `Marinade 2 dage uden rejer. Marinerede rejer skal tilberedes med det samme.`,
    glass: `Riesling eller Chenin — se [vin til rejer](/guides/vin-til-rejer).`,
    faq: [
      ["Til kylling?", "Ja — 2–4 timer, som [wok-kylling](/opskrifter/wok-kylling-med-hvidvin)."],
      ["Uden sesam?", "Brug rapsolie + 1 tsk sesamfrø."],
      ["Til scallops?", "Ja — 15–20 min max."],
      ["Alkoholfri?", "Lime + bouillon — kortere tid."],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "hvad-er-madeira-vin": [
    { slug: "madeira-allehaandemarinade", label: "Madeira-marinade" },
  ],
  "vin-til-vildt": [
    { slug: "madeira-allehaandemarinade", label: "Allehånde-vildt" },
  ],
  "vin-til-gryderet": [
    { slug: "madeira-allehaandemarinade", label: "Madeira-gryde" },
  ],
  "vin-til-lam": [
    { slug: "rodvin-hvidloeg-rosmarinmarinade-til-lam", label: "Rosmarin til lam" },
  ],
  "vin-til-laks": [
    { slug: "hvidvins-dildmarinade", label: "Dildmarinade" },
  ],
  "vin-til-lys-fisk": [
    { slug: "hvidvins-dildmarinade", label: "Hvidvin-dild" },
    { slug: "lime-hvidvins-cevichemarinade", label: "Ceviche-marinade" },
  ],
  "vin-til-ceviche": [
    { slug: "lime-hvidvins-cevichemarinade", label: "Lime-hvidvin" },
  ],
  "vin-til-rejer": [
    { slug: "ingefaer-chili-hvidvinsmarinade", label: "Ingefær-chili" },
  ],
  "vin-til-fisk-og-skaldyr": [
    { slug: "hvidvins-dildmarinade", label: "Dild-laks" },
    { slug: "ingefaer-chili-hvidvinsmarinade", label: "Rejemarinade" },
  ],
  "vin-til-grillet-fisk": [
    { slug: "hvidvins-dildmarinade", label: "Grillet laks" },
    { slug: "ingefaer-chili-hvidvinsmarinade", label: "Grillede rejer" },
  ],
  "vin-til-asiatisk-mad": [
    { slug: "ingefaer-chili-hvidvinsmarinade", label: "Ingefær-rejer" },
  ],
  "vin-til-grill-og-bbq": [
    { slug: "ingefaer-chili-hvidvinsmarinade", label: "Rejespyd" },
  ],
};
