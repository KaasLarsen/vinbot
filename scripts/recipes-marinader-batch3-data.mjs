/** Data: vinmarinader — batch 3 (svin + fjerkræ). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "hvidvins-citron-oreganomarinade":
    "Assyrtiko eller tør græsk hvidvin + citron + oregano. Souvlaki-svinekød: 3–6 timer. Dup tørt før grill — citron brænder let.",
  "aeble-hvidvinsmarinade":
    "Æblejuice + tør hvidvin + ingefær og salvie til flæskesteg/svinekam. 6–12 timer eller natten over. Skær fedtkant for bedre indtrængning.",
  "provencal-hvidvins-hvidloegsmarinade":
    "Provence-hvidvin, herbes de Provence og masser af hvidløg til kyllingelår. 4–8 timer. Fjern brændte urter før høj varme.",
  "rose-jordbaermarinade":
    "Tør rosé + purerede jordbær + mynte og hvidvinseddike til kyllingebryst. 2–4 timer max — frugt og syre mørner hurtigt.",
  "marsala-svampemarinade":
    "Marsala + porcini + skalotteløg til kyllingefilet. 2–4 timer. Dup tørt — sød vin karamelliserer. Se [chicken Marsala](/opskrifter/chicken-marsala).",
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
    slug: "hvidvins-citron-oreganomarinade",
    title: "Hvidvins-, citron- og oreganomarinade",
    description:
      "Tør hvidvin, citron, oregano og olivenolie — græsk souvlaki-inspireret marinade til svinespyd og koteletter. Til ca. 800 g kød.",
    tags: ["opskrift", "marinade", "svinekød", "hvidvin", "citron", "grill", "souvlaki"],
    wineInRecipe: {
      style: "Tør, syrlig hvidvin — Assyrtiko, Pinot Grigio eller Vermentino",
      amount: "2 dl hvidvin + citron",
      note: "Vin og citron mørner; oregano og olie bærer middelhavs-aroma ind i svinekød til grill.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "souvlaki assyrtiko pinot grigio grill",
      searchMax: 200,
      label: "vin til græsk-inspireret svinekød",
    },
    relatedGuides: [
      "vin-til-svinekoed",
      "vin-til-grill-og-bbq",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-kylling-og-lyst-koed",
    ],
    ingredients: [
      "2 dl tør hvidvin",
      "Saft og skal af 1 citron",
      "2 spsk tørret oregano (eller 3 spsk frisk)",
      "3 spsk olivenolie",
      "3 fed hvidløg, knuste",
      "1 tsk salt",
      "½ tsk peber",
      "Evt. ½ tsk spidskommen",
      "800 g svinekød til spyd (nakkefilet, kotelet el.lign.)",
    ],
    instructions: [
      "Pisk hvidvin, citronsaft, citronskal, oregano, olie, hvidløg, salt, peber og evt. spidskommen.",
      "Skær kød i tern eller flade skiver. Læg i pose med marinade.",
      "Mariner 3–6 timer i køleskab. Vend et par gange.",
      "Tag op 20 min før. Træk på spyd eller læg fladt. Dup tørt.",
      "Grill på medium-høj varme til gennemstegt med let skorpe.",
    ],
    intro: `**Hvidvins-, citron- og oreganomarinade** er souvlaki-universet på dansk gris: syrlig hvidvin, citron og oregano til spyd og grill. Lettere end [hvidvins-sennepsmarinade](/opskrifter/hvidvins-sennepsmarinade), mere citrus end [italiensk salviemarinade](/opskrifter/italiensk-hvidvins-salviemarinade). Server med tzatziki og pitabrød — se [vin til grill](/guides/vin-til-grill-og-bbq).`,
    why: `Citron + hvidvin giver **syre til mørning**; oregano og olie er klassisk græsk trio til fedt svinekød. Alkoholen hjælper aromatiske olier ind. Se [vin til svinekød](/guides/vin-til-svinekoed).`,
    tips: [
      ["Tør citronskal", "Kun det gule — undgå bitter hvid pith."],
      ["Ikke for længe", "Over 8 timer kan «kog» citron-overfladen."],
      ["Spyd", "Lad kød og grønt skifte på spydet."],
      ["Restvin", "Samme syrlige hvidvin i glasset."],
    ],
    serving: `Grillede svinespyd med salat, feta og citron. Kylling tåler samme marinade 2–4 timer — se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    mistakes: [
      "For lang marinade på tynde skiver.",
      "At grille vådt kød — ingen skorpe.",
      "Kun sød hvidvin — klaimatisk til citron.",
      "Genbrug rå marinade uden kogning.",
    ],
    storage: `Marinade 3 dage kølet. Marineret kød 24 timer.`,
    glass: `Assyrtiko, Vermentino eller tør rosé — se [vin til grill](/guides/vin-til-grill-og-bbq).`,
    faq: [
      ["Til lam?", "Ja — 4–6 timer, god match til oregano."],
      ["Frisk oregano?", "Ja — dobbelt mængde, finthakket."],
      ["Uden alkohol?", "Citron + lagereddike — anden dybde."],
      ["Til ovn?", "Ja — 200 °C til gennemstegt."],
    ],
  }),

  r({
    slug: "aeble-hvidvinsmarinade",
    title: "Æble- og hvidvinsmarinade",
    description:
      "Tør hvidvin, æblejuice, ingefær og salvie — frugtig marinade til flæskesteg, svinekam og roast pork. Til ca. 1,2 kg svinesteg.",
    tags: ["opskrift", "marinade", "svinekød", "hvidvin", "æble", "flæskesteg"],
    servings: 6,
    wineInRecipe: {
      style: "Tør hvidvin — Riesling tør, Chenin Blanc eller Pinot Blanc",
      amount: "2 dl hvidvin + 1 dl æblejuice",
      note: "Æble og hvidvin giver frugt-syre; ingefær og salvie balancerer fedt svinesteg.",
    },
    wineToDrink: {
      guideSlug: "vin-til-stegt-flaesk",
      searchQuery: "flæskesteg riesling chenin æble",
      searchMax: 200,
      label: "vin til flæskesteg",
    },
    relatedGuides: [
      "vin-til-stegt-flaesk",
      "vin-til-svinekoed",
      "vin-til-svinekam",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 dl tør hvidvin",
      "1 dl ufiltreret æblejuice (helst sur)",
      "1 spsk revet frisk ingefær",
      "6–8 salvieblade, groft hakket",
      "2 spsk raps- eller olivenolie",
      "2 fed hvidløg, skivede",
      "1½ tsk salt",
      "½ tsk peber",
      "1,2 kg svinekam, flæskesteg eller skulder",
    ],
    instructions: [
      "Bland hvidvin, æblejuice, ingefær, salvie, olie, hvidløg, salt og peber.",
      "Rids svinestegens skorpe let. Gnid marinade ind — også under fedtkanten.",
      "Mariner 6–12 timer (gerne natten over) i køleskab.",
      "Tag op 45 min før ovn. Dup overskydende væske af — gem til reduktion.",
      "Ovnsteg efter din flæskestegs-metode. Pensl med kogt marinade de sidste 20 min.",
    ],
    intro: `**Æble- og hvidvinsmarinade** er den nordiske roast porks frugtige cousin: sur æblejuice, tør hvidvin og salvie til [hvidvinsmarineret svinekam](/opskrifter/hvidvinsmarineret-svinekam) og flæskesteg. Mindre sennep end [hvidvins-sennepsmarinade](/opskrifter/hvidvins-sennepsmarinade) — mere efterår. Se [vin til stegt flæsk](/guides/vin-til-stegt-flaesk).`,
    why: `Æblejuice og hvidvin giver **frugt og syre** mod svinestegens fedme. Ingefær varmer; salvie klæder svinekød. Se [vin til svinekam](/guides/vin-til-svinekam).`,
    tips: [
      ["Sur æblejuice", "Undgå kun sød nektar."],
      ["Skorpe", "Salt skorpen separat hvis du vil have ekstra sprød."],
      ["Reduktion", "Kog restmarinade til let glaze."],
      ["Tyk steg", "12 timer er fint — tynde koteletter kortere."],
    ],
    serving: `Flæskesteg med brun sauce, æblekompot og sprød skorpe. Riesling i glasset.`,
    mistakes: [
      "For sød æblejuice — klistret overflade.",
      "At stege med våd skorpe — damp i stedet for sprød.",
      "For meget ingefær — dominerer.",
      "At pensle med rå marinade.",
    ],
    storage: `Marinade 3 dage. Marineret steg 24–36 timer.`,
    glass: `Tør Riesling eller Chenin — se [vin til stegt flæsk](/guides/vin-til-stegt-flaesk).`,
    faq: [
      ["Til pulled pork?", "Ja — 8–12 timer på skulder."],
      ["Tørret salvie?", "Halv mængde — frisk er bedst."],
      ["Uden æblejuice?", "Cider + lidt honning."],
      ["Til and?", "Ja — kortere tid, 4–6 timer."],
    ],
  }),

  r({
    slug: "provencal-hvidvins-hvidloegsmarinade",
    title: "Provencalsk hvidvins- og hvidløgsmarinade",
    description:
      "Tør Provence-hvidvin, herbes de Provence, hvidløg og olivenolie — marinade til saftige kyllingelår. Til ca. 1 kg kylling.",
    tags: ["opskrift", "marinade", "kylling", "hvidvin", "provence", "hvidløg", "grill"],
    wineInRecipe: {
      style: "Tør sydfransk hvidvin — Vermentino, Rolle eller Côtes de Provence blanc",
      amount: "2 dl hvidvin",
      note: "Hvidvin bærer urter og hvidløg ind; olie giver skorpe og fedtopløselige aromaer.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kylling-og-lyst-koed",
      searchQuery: "kyllingelår provence vermentino hvidløg",
      searchMax: 200,
      label: "vin til provencalsk kylling",
    },
    relatedGuides: [
      "vin-til-kylling-og-lyst-koed",
      "vin-til-grill-og-bbq",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-klassisk-fransk-mad",
    ],
    ingredients: [
      "2 dl tør hvidvin",
      "1½ spsk herbes de Provence",
      "6 fed hvidløg, fintrevet eller presset",
      "4 spsk olivenolie",
      "Saft af ½ citron",
      "1 tsk salt",
      "½ tsk peber",
      "Evt. 1 kvist frisk timian",
      "1 kg kyllingelår med ben (eller lår uden ben)",
    ],
    instructions: [
      "Rør hvidvin, herbes, hvidløg, olie, citron, salt, peber og timian.",
      "Læg kylling i pose. Massér marinade ind under skindet hvor muligt.",
      "Mariner 4–8 timer i køleskab.",
      "Tag op 30 min før. Dup tørt. Grill eller ovn 200 °C til gennemstegt.",
      "Pensl med olie og frisk urter til sidst — undgå brændt hvidløg.",
    ],
    intro: `**Provencalsk hvidvins- og hvidløgsmarinade** er sol i skålen: Vermentino, herbes de Provence og masser af hvidløg til kyllingelår. I samme boldgade som [kylling i hvidvinssauce](/opskrifter/kylling-i-hvidvinssauce-med-porrer-og-vindruer), bare som grill-base. Se [wok-kylling med hvidvin](/opskrifter/wok-kylling-med-hvidvin) for asiatisk kontrast.`,
    why: `Provence-hvidvin er **aromatisk og tør** — perfekt til urter uden at gøre kyllingen sød. Hvidløg + olie = klassisk grillprofil. Se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    tips: [
      ["Under skindet", "Bedste smagsindtrængning på lår."],
      ["Medium grill", "Hvidløg brænder på max varme."],
      ["Ben med", "Saftigere end filet alene."],
      ["Frisk citron", "Press over ved servering."],
    ],
    serving: `Ratatouille, salade niçoise eller grillede grøntsager. Rosé fra Provence i glasset.`,
    mistakes: [
      "For høj grill — sort hvidløg.",
      "For lang marinade på filet — grødet.",
      "Kun tørret urt uden citron — fladt.",
      "Våd kylling på pande — ingen skorpe.",
    ],
    storage: `Marinade 2 dage. Marineret kylling 24 timer.`,
    glass: `Provence blanc eller let rosé — se [vin til grill](/guides/vin-til-grill-og-bbq).`,
    faq: [
      ["Til kalkun?", "Ja — 6–10 timer på bryst/skiver."],
      ["Hjemmelavet herbes?", "Timian, rosmarin, oregano, laurbær."],
      ["Til ovn hele kylling?", "Ja — 4–6 timer med vend."],
      ["Uden alkohol?", "Hvidvin-eddike + bouillon — kortere tid."],
    ],
  }),

  r({
    slug: "rose-jordbaermarinade",
    title: "Rosé- og jordbærmarinade",
    description:
      "Tør rosé, purerede jordbær, mynte og hvidvinseddike — sommerlig marinade til grillede kyllingebryster. Til ca. 600 g kylling.",
    tags: ["opskrift", "marinade", "kylling", "rosé", "jordbær", "grill", "sommer"],
    wineInRecipe: {
      style: "Tør rosé — Provence, Loire eller spansk rosado",
      amount: "1½ dl rosé + jordbær",
      note: "Rosé og jordbær giver frugt og syre; eddike holder balancen skarp til lyst kyllingekød.",
    },
    wineToDrink: {
      guideSlug: "rosevin-til-grill",
      searchQuery: "kylling rosé jordbær grill sommer",
      searchMax: 200,
      label: "rosé til grill",
    },
    relatedGuides: [
      "rosevin-til-grill",
      "rosevin-til-mad-og-sommer",
      "bedste-rosevin",
      "vin-til-kylling-og-lyst-koed",
    ],
    ingredients: [
      "1½ dl tør rosé",
      "150 g friske jordbær, purerede (si evt.)",
      "1 spsk hvidvinseddike",
      "2 spsk olivenolie",
      "8 mynteblade, finthakket",
      "1 tsk honning",
      "1 tsk salt",
      "½ tsk peber",
      "600 g kyllingebryst (hel eller flade skiver)",
    ],
    instructions: [
      "Pisk rosé, jordbærpuré, eddike, olie, mynte, honning, salt og peber.",
      "Læg kylling i marinade. 2–4 timer i køleskab — ikke længere.",
      "Tag op 15 min før. Dup godt tørt — frugtsukker brænder.",
      "Grill eller steg på medium varme til 72 °C kerne.",
      "Server med friske jordbær og mynte — pensl ikke med rå marinade.",
    ],
    intro: `**Rosé- og jordbærmarinade** er sommer på grillen: tør rosé, jordbær og mynte til kyllingebryst. Lighter end [dampet laks med rosévinssauce](/opskrifter/dampet-laks-med-rosevinssauce) — samme vinidé til fjerkræ. Læs [rosévin til grill](/guides/rosevin-til-grill) og [bedste rosévin](/guides/bedste-rosevin).`,
    why: `Jordbær + rosé giver **frugt uden tung sødme** når vinen er tør. Eddike og mynte holder det friskt. Kort tid — syre mørner hurtigt. Se [rosévin til mad og sommer](/guides/rosevin-til-mad-og-sommer).`,
    tips: [
      ["Si puré", "Færre frø på grillen."],
      ["Kort marinade", "Over 4 timer → grødet bryst."],
      ["Tør rosé", "Sød rosé giver karamel i stedet for friskhed."],
      ["Kerne 72 °C", "Saftigt uden tørt."],
    ],
    serving: `Grøn salat, nye kartofler og ekstra rosé. Evt. [cremet pastasalat med melon](/opskrifter/cremet-pastasalat-med-melon-og-parma).`,
    mistakes: [
      "Natten over — kylling bliver melet.",
      "For sød rosé — klaimatisk.",
      "Høj varme med våd overflade.",
      "Rå jordbær-marinade som sauce uden kogning.",
    ],
    storage: `Marinade 1–2 dage. Marineret kylling samme dag.`,
    glass: `Tør Provence-rosé — se [rosévin til grill](/guides/rosevin-til-grill).`,
    faq: [
      ["Frosne jordbær?", "Ja — tø og purér, lidt ekstra eddike."],
      ["Til laks?", "Ja — 30–60 min, meget kort."],
      ["Uden honning?", "Lidt mere rosé eller agave."],
      ["Til kalkunbryst?", "Ja — 2–3 timer, skiver."],
    ],
  }),

  r({
    slug: "marsala-svampemarinade",
    title: "Marsala- og svampemarinade",
    description:
      "Marsala, tørret porcini, skalotteløg og olie — siciliansk marinade til kyllingefilet. Til ca. 700 g kylling.",
    tags: ["opskrift", "marinade", "kylling", "marsala", "svampe", "italiensk"],
    wineInRecipe: {
      style: "Tør Marsala — Fine eller Superiore (ikke dessert)",
      amount: "1½ dl Marsala + porcini",
      note: "Marsala og porcini giver umami; skalotteløg og olie binder til mager kyllingefilet.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kylling-og-lyst-koed",
      searchQuery: "chicken marsala nero d avola chardonnay",
      searchMax: 200,
      label: "vin til Marsala-kylling",
    },
    relatedGuides: [
      "vin-til-kylling-og-lyst-koed",
      "vin-til-svampe",
      "vin-til-italiensk-mad",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1½ dl tør Marsala",
      "2 spsk fintrevet tørret porcini (eller 1 dl blødt, hakket)",
      "2 skalotteløg, finthakket",
      "3 spsk olivenolie",
      "1 spsk persille, hakket",
      "1 tsk salt",
      "½ tsk peber",
      "Evt. 1 spsk hvidvinseddike",
      "700 g kyllingefilet eller indrefilet",
    ],
    instructions: [
      "Rør Marsala, porcini, skalotteløg, olie, persille, salt, peber og evt. eddike.",
      "Skær filet i skiver eller strimler. Vend i marinade.",
      "Mariner 2–4 timer i køleskab.",
      "Tag op, dup tørt. Steg eller grill hurtigt — finish som [chicken Marsala](/opskrifter/chicken-marsala) med kogt marinade.",
      "Reducer restmarinade 5 min og vend kylling i saucen.",
    ],
    intro: `**Marsala- og svampemarinade** er forspillet til [chicken Marsala](/opskrifter/chicken-marsala): tør Marsala, porcini og skalotteløg til filet. Dybere end [provencalsk hvidløgsmarinade](/opskrifter/provencal-hvidvins-hvidloegsmarinade) — mere umami. Se [vin til svampe](/guides/vin-til-svampe).`,
    why: `Marsala har **nøddeagtig koncentration**; porcini forstærker umami. Vin mørner og løfter svampen ind i kylling. Se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
    tips: [
      ["Tør Marsala", "Sweet Marsala er til dessert — for sød her."],
      ["Blød porcini", "Gem blødgivningsvand si't til reduktion."],
      ["Hurtig stegning", "Filet tørrer på lav varme."],
      ["Dup tørt", "Sukker i Marsala karamelliserer bedre tørt."],
    ],
    serving: `Pasta, polenta eller [svampetoast med hvidvin](/opskrifter/svampetoast-med-hvidvin-og-timian). Nero d'Avola eller Chardonnay i glasset.`,
    mistakes: [
      "Dessert-Marsala — for sødt.",
      "For lang marinade på tynde strimler.",
      "At stege i kold pande med våd kylling.",
      "Hele porcini-stykker — tyggegummi.",
    ],
    storage: `Marinade 3 dage. Marineret kylling 24 timer.`,
    glass: `Nero d'Avola eller struktureret hvidvin — se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    faq: [
      ["Til svinekotelet?", "Ja — 3–5 timer."],
      ["Frisk svamp?", "Erstat porcini med shiitake + lidt ekstra Marsala."],
      ["Uden Marsala?", "Sherry + svamp — anden profil."],
      ["Til kalv?", "Klassisk — 2–4 timer."],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-svinekoed": [
    { slug: "hvidvins-citron-oreganomarinade", label: "Citron-oreganomarinade" },
    { slug: "aeble-hvidvinsmarinade", label: "Æble-hvidvinsmarinade" },
  ],
  "vin-til-stegt-flaesk": [
    { slug: "aeble-hvidvinsmarinade", label: "Æble-hvidvinsmarinade" },
  ],
  "vin-til-svinekam": [
    { slug: "aeble-hvidvinsmarinade", label: "Æble-hvidvinsmarinade" },
  ],
  "vin-til-grill-og-bbq": [
    { slug: "hvidvins-citron-oreganomarinade", label: "Souvlaki-marinade" },
    { slug: "provencal-hvidvins-hvidloegsmarinade", label: "Provence-kylling" },
    { slug: "rose-jordbaermarinade", label: "Rosé-jordbær" },
  ],
  "vin-til-kylling-og-lyst-koed": [
    { slug: "provencal-hvidvins-hvidloegsmarinade", label: "Provencalsk marinade" },
    { slug: "rose-jordbaermarinade", label: "Rosé-jordbær" },
    { slug: "marsala-svampemarinade", label: "Marsala-svampe" },
  ],
  "rosevin-til-grill": [
    { slug: "rose-jordbaermarinade", label: "Jordbærmarinade" },
  ],
  "rosevin-til-mad-og-sommer": [
    { slug: "rose-jordbaermarinade", label: "Rosé-jordbær" },
  ],
  "bedste-rosevin": [
    { slug: "rose-jordbaermarinade", label: "Marinade med rosé" },
  ],
  "vin-til-svampe": [
    { slug: "marsala-svampemarinade", label: "Marsala-porcini" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "marsala-svampemarinade", label: "Marsala-marinade" },
  ],
};
