/** Data: 30 vinmarinader — batch 2 (okse + svinekød). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "syrlig-rodvin-balsamicomarinade":
    "Syrlig marinade til seje udskæringer som hanger steak / nyretappe. Balsamico + dijon binder; oregano giver middelhavsprofil. 4–8 timer er nok.",
  "hvidvins-sennepsmarinade":
    "Tør hvidvin, grov sennep, honning og timian. Klassiker til svinemørbrad og koteletter — 2–6 timer. Dup tørt før stegning, så sennepen ikke brænder.",
  "sherry-appelsinmarinade":
    "Fino eller Amontillado + frisk appelsin. Ideel til svinekæber og skinkeculotte. Undgå cream sherry — for sød.",
  "italiensk-hvidvins-salviemarinade":
    "Pinot Grigio, masser af salvie, hvidløg og olivenolie. Til svinekoteletter på ben — 2–4 timer. Salvie brænder let: fjern blade før høj varme.",
  "rodvins-paprikamarinade":
    "Frugtig rødvin, røget paprika, hvidløgspulver og brun farin. Base til spareribs og pulled pork før ovn/grill.",
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
    slug: "syrlig-rodvin-balsamicomarinade",
    title: "Syrlig rødvin- og balsamicomarinade",
    description:
      "Rødvin, mørk balsamico, dijonsennep og oregano — syrlig marinade til hanger steak og seje okseudskæringer. Til ca. 800 g kød.",
    tags: ["opskrift", "marinade", "oksekød", "rødvin", "balsamico", "grill"],
    wineInRecipe: {
      style: "Frugtig rødvin med syre — sangiovese, tempranillo eller merlot",
      amount: "2 dl rødvin + balsamico",
      note: "Syren fra vin og balsamico mørner seje fibre; dijon binder marinade til kødet.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boeff",
      searchQuery: "sangiovese tempranillo hanger steak",
      searchMax: 200,
      label: "vin til bøf",
    },
    relatedGuides: [
      "vin-til-boeff",
      "vin-til-oksekoed",
      "vin-til-grill-og-bbq",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 dl frugtig rødvin",
      "3 spsk mørk balsamico",
      "1 spsk dijonsennep",
      "2 spsk olivenolie",
      "1 tsk tørret oregano",
      "2 fed hvidløg, knuste",
      "1 tsk salt",
      "½ tsk peber",
      "800 g hanger steak, flank eller bavette",
    ],
    instructions: [
      "Pisk rødvin, balsamico, dijon, olie, oregano, hvidløg, salt og peber sammen.",
      "Læg kødet i pose. Hæld marinade over. Pres luft ud.",
      "Mariner 4–8 timer i køleskab (max 12 til tynde udskæringer).",
      "Tag op 20–30 min før. Dup tørt. Grill eller steg på høj varme.",
      "Reducer evt. kogt restmarinade til glaze.",
    ],
    intro: `**Syrlig rødvin- og balsamicomarinade** er til seje, smagfulde udskæringer som hanger steak — mere syre end [klassisk rødvins-rosmarinmarinade](/opskrifter/klassisk-rodvins-rosmarinmarinade), tættere på [balsamico-rødvinsmarineret oksemørbrad](/opskrifter/balsamico-rodvinsmarineret-oksemoerbrad). Dijon binder; oregano giver middelhavstoner.`,
    why: `Sejt kød har brug for **syre**. Rødvin + balsamico mørner; sennep hjælper marinaden til at hænge på. Se [vin til bøf](/guides/vin-til-boeff).`,
    tips: [
      ["Kort nok", "Over 12 timer kan gøre overfladen grødet."],
      ["Høj varme", "Hanger/flank vil have hurtig stegning."],
      ["Skær på tværs", "Af fibrene efter stegning."],
      ["Dijon", "Milder balsamicoens skarphed."],
    ],
    serving: `Grill med salat eller [glaserede skalotteløg](/opskrifter/balsamico-rodvinsglaserede-skalotteloeg).`,
    mistakes: [
      "For lang marinade.",
      "For billig balsamico — bitter.",
      "Vådt kød på panden.",
      "At genbruge rå marinade uden kogning.",
    ],
    storage: `Marinade 3 dage. Marineret kød 24 timer.`,
    glass: `Sangiovese, Tempranillo eller Merlot — se [vin til grill](/guides/vin-til-grill-og-bbq).`,
    faq: [
      ["Til mørbrad?", "Ja, men kortere tid (2–4 timer) — den er allerede mør."],
      ["Uden dijon?", "Brug grov sennep eller mere olie."],
      ["Hvid balsamico?", "Mildere — øg mængden lidt."],
      ["Til kalv?", "Ja — 3–6 timer."],
    ],
  }),

  r({
    slug: "hvidvins-sennepsmarinade",
    title: "Hvidvins- og sennepsmarinade",
    description:
      "Tør hvidvin, grov sennep, honning og timian — den ultimative marinade til svinemørbrad og koteletter. Til ca. 800 g kød.",
    tags: ["opskrift", "marinade", "svinekød", "hvidvin", "sennep", "mørbrad"],
    wineInRecipe: {
      style: "Tør hvidvin — Chardonnay, Pinot Blanc eller Riesling tør",
      amount: "2 dl hvidvin",
      note: "Hvidvinens syre mørner; sennep og honning giver skorpe og sødme-balance.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinemoerbrad",
      searchQuery: "svinemørbrad chardonnay riesling sennep",
      searchMax: 200,
      label: "vin til svinemørbrad",
    },
    relatedGuides: [
      "vin-til-svinemoerbrad",
      "vin-til-svinekoed",
      "vin-til-grill-og-bbq",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 dl tør hvidvin",
      "2 spsk grov sennep",
      "1 spsk honning",
      "2 spsk olivenolie",
      "2 kviste timian",
      "2 fed hvidløg, knuste",
      "1 tsk salt",
      "½ tsk peber",
      "800 g svinemørbrad eller koteletter",
    ],
    instructions: [
      "Rør hvidvin, sennep, honning, olie, timian, hvidløg, salt og peber sammen.",
      "Vend kødet i. Mariner 2–6 timer i køleskab.",
      "Tag op 20 min før. Dup godt tørt — sennep brænder ellers.",
      "Steg, grill eller ovnsteg. Brug kogt restmarinade som let sauce.",
    ],
    intro: `**Hvidvins- og sennepsmarinade** er svinets bedste ven — saftig mørbrad og koteletter med skorpe. Passer til [svinekoteletter med sennep og hvidvin](/opskrifter/svinekoteletter-med-sennep-og-hvidvin) og [hvidvinsmarineret svinekam](/opskrifter/hvidvinsmarineret-svinekam).`,
    why: `Sennep + vin = **syre, varme og binding**. Honning balancerer og hjælper karamellisering. Se [vin til svinemørbrad](/guides/vin-til-svinemoerbrad).`,
    tips: [
      ["Dup tørt", "Vigtigst for sennepsmarinader."],
      ["Grov sennep", "Bedre tekstur end glat dijon alene."],
      ["Ikke overnight på tynde koteletter", "2–4 timer er nok."],
      ["Rest", "Samme hvidvin i glasset."],
    ],
    serving: `Kartoffelsalat, æbler eller grønne bønner. Se også [æble-hvidvinsmarinade](/opskrifter/aeble-hvidvinsmarinade) til flæskesteg.`,
    mistakes: [
      "At stege med tyk sennepslag — brændt.",
      "For sød vin — klaimatisk.",
      "Salt for sent — mindre mørning.",
      "Genbrug rå marinade.",
    ],
    storage: `Marinade 3 dage. Marineret kød 24 timer.`,
    glass: `Chardonnay eller tør Riesling — se [vin til svinekød](/guides/vin-til-svinekoed).`,
    faq: [
      ["Til kylling?", "Ja — 1–4 timer."],
      ["Uden honning?", "Lidt sukker eller undlad."],
      ["Dijon i stedet?", "Ja — mildere resultat."],
      ["Til grill?", "Ja — medium varme."],
    ],
  }),

  r({
    slug: "sherry-appelsinmarinade",
    title: "Sherry- og appelsinmarinade",
    description:
      "Tør Fino eller Amontillado, frisk appelsinsaft, skal og hvidløg — marinade til svinekæber og skinkeculotte. Til ca. 800 g kød.",
    tags: ["opskrift", "marinade", "svinekød", "sherry", "appelsin", "culotte"],
    wineInRecipe: {
      style: "Tør sherry — Fino eller Amontillado",
      amount: "1½ dl sherry + appelsin",
      note: "Sherry giver nøddeagtig dybde; appelsin syre og frugt til fedt svinekød.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "svinekæber sherry amontillado",
      searchMax: 200,
      label: "vin til svinekød",
    },
    relatedGuides: [
      "hvad-er-sherry-vin",
      "vin-til-svinekoed",
      "vin-til-tapas",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1½ dl tør sherry (Fino eller Amontillado)",
      "Saft af 1 appelsin",
      "1 tsk finrevet appelsinskal",
      "3 fed hvidløg, knuste",
      "2 spsk olivenolie",
      "1 tsk salt",
      "½ tsk peber",
      "Evt. 1 kvist timian",
      "800 g svinekæber, culotte eller skinkesteg",
    ],
    instructions: [
      "Bland sherry, appelsinsaft, skal, hvidløg, olie, salt, peber og evt. timian.",
      "Læg kødet i. Mariner 4–12 timer (kæber gerne natten over).",
      "Tag op, dup tørt. Brun og braiser, eller ovnsteg culotte.",
      "Brug den siede marinade (kogt) i saucen.",
    ],
    intro: `**Sherry- og appelsinmarinade** er spansk inspireret — tør sherry, citrus og hvidløg til svinekæber og culotte. I familie med [svinekæber i rødvinssky](/opskrifter/svinekaebber-i-rodvinssky) og [gambas al Jerez](/opskrifter/gambas-al-jerez), bare som marinade-base.`,
    why: `Fino/Amontillado har **syre og nøddeagtige noter**, der klæder fedt svinekød. Appelsin løfter. Se [hvad er sherry](/guides/hvad-er-sherry-vin).`,
    tips: [
      ["Kun tør sherry", "Cream er for sød."],
      ["Frisk saft", "Ikke kun koncentrat."],
      ["Skal uden hvid pith", "Ellers bitter."],
      ["Kog marinade", "Før den går i sauce."],
    ],
    serving: `Svinekæber med kartoffelmos, eller culotte med rodfrugter.`,
    mistakes: [
      "Cream sherry — for sødt.",
      "For lang marinade på tynde skiver.",
      "At glemme at brunne før braisering.",
      "Kemisk appelsinaroma — brug frisk.",
    ],
    storage: `Marinade 3 dage. Marineret kød 24–36 timer.`,
    glass: `Amontillado til tapas, eller frugtig rødvin til culotte — se [vin til svinekød](/guides/vin-til-svinekoed).`,
    faq: [
      ["Fino vs Amontillado?", "Fino er lettere; Amontillado dybere."],
      ["Til and?", "Ja — 4–8 timer."],
      ["Uden alkohol?", "Appelsin + lagereddike — anden profil."],
      ["Kan jeg bruge Cointreau?", "Nej som base — for sød/alkoholstærk."],
    ],
  }),

  r({
    slug: "italiensk-hvidvins-salviemarinade",
    title: "Italiensk hvidvins- og salviemarinade",
    description:
      "Tør hvidvin, frisk salvie, hvidløg og olivenolie — marinade til svinekoteletter på ben. Til ca. 800 g kød.",
    tags: ["opskrift", "marinade", "svinekød", "hvidvin", "salvie", "italiensk"],
    wineInRecipe: {
      style: "Tør italiensk hvidvin — Pinot Grigio, Verdicchio eller Soave",
      amount: "2 dl hvidvin",
      note: "Hvidvin og salvie er klassisk italiensk duo til svinekød — alkohol bærer urtearomaen ind.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "svinekoteletter pinot grigio salvie",
      searchMax: 200,
      label: "vin til svinekød",
    },
    relatedGuides: [
      "vin-til-svinekoed",
      "vin-til-italiensk-mad",
      "vin-til-grill-og-bbq",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 dl tør hvidvin (Pinot Grigio el.lign.)",
      "1 lille bundt frisk salvie (ca. 15 blade)",
      "4 fed hvidløg, skivede",
      "3 spsk god olivenolie",
      "1 tsk salt",
      "½ tsk peber",
      "Evt. ½ citronskal",
      "4 svinekoteletter på ben (ca. 800 g)",
    ],
    instructions: [
      "Hak halvdelen af salvien. Bland med vin, hvidløg, olie, salt, peber og evt. citronskal.",
      "Læg koteletter og hele salvieblade i. Mariner 2–4 timer.",
      "Tag op, fjern hele blade, dup tørt.",
      "Steg eller grill. Pensl med lidt frisk olie og salvie til sidst.",
    ],
    intro: `**Italiensk hvidvins- og salviemarinade** er saltimbocca-universet uden skinke — salvie, hvidvin og olie til koteletter på ben. Se også [saltimbocca alla Romana](/opskrifter/saltimbocca-alla-romana) og [svinekoteletter med sennep](/opskrifter/svinekoteletter-med-sennep-og-hvidvin).`,
    why: `Salvie er fedtopløselig — **olie + vin** får aromaen ind. Pinot Grigio holder profilen let. Se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
    tips: [
      ["Fjern blade før høj varme", "Salvie brænder bittert."],
      ["Korte tider", "2–4 timer er nok."],
      ["God olie", "Den smager med."],
      ["Ben-koteletter", "Saftigere end uden ben."],
    ],
    serving: `Grillede grøntsager, citron og frisk salvie. Hvidvin i glasset.`,
    mistakes: [
      "At stege salvien sort.",
      "For lang marinade — bitter urtesmag.",
      "Billig olie — flad smag.",
      "For høj grill uden tørring.",
    ],
    storage: `Marinade 2 dage. Marineret kød samme dag eller næste.`,
    glass: `Pinot Grigio eller Verdicchio — se [vin til svinekød](/guides/vin-til-svinekoed).`,
    faq: [
      ["Tørret salvie?", "Halvér mængden — frisk er bedre."],
      ["Til kalv?", "Ja — klassisk kombination."],
      ["Kan jeg tilsætte citron?", "Ja — lidt saft eller skal."],
      ["Til hele kam?", "Ja — 6–8 timer, vend undervejs."],
    ],
  }),

  r({
    slug: "rodvins-paprikamarinade",
    title: "Rødvins- og paprikamarinade",
    description:
      "Frugtig rødvin, røget paprika, hvidløgspulver og brun farin — marinade til spareribs og pulled pork. Til ca. 1 kg kød.",
    tags: ["opskrift", "marinade", "svinekød", "rødvin", "paprika", "ribs", "grill"],
    servings: 6,
    wineInRecipe: {
      style: "Frugtig rødvin — Zinfandel, Shiraz eller Tempranillo",
      amount: "2½ dl rødvin",
      note: "Rødvin + røget paprika + farin bygger BBQ-profil før lav-og-lang stegning.",
    },
    wineToDrink: {
      guideSlug: "vin-til-pulled-pork",
      searchQuery: "pulled pork zinfandel shiraz ribs",
      searchMax: 200,
      label: "vin til pulled pork",
    },
    relatedGuides: [
      "vin-til-pulled-pork",
      "vin-til-grill-og-bbq",
      "vin-til-svinekoed",
      "vin-til-amerikansk-comfort-mad",
    ],
    ingredients: [
      "2½ dl frugtig rødvin",
      "2 spsk røget paprika",
      "1 spsk hvidløgspulver",
      "2 spsk brun farin",
      "2 spsk olie",
      "1 tsk salt",
      "1 tsk peber",
      "Evt. 1 tsk chilipulver",
      "1 kg spareribs eller skuldersvin til pulled pork",
    ],
    instructions: [
      "Rør rødvin, paprika, hvidløgspulver, farin, olie, salt, peber og evt. chili.",
      "Massér ind i kødet. Mariner 4–12 timer (gerne natten over).",
      "Tag op, lad overskydende dryppe af. Ovnsteg / grill lav og langt, eller følg [pulled pork med rødvin](/opskrifter/pulled-pork-med-rodvin).",
      "Pensl med ekstra marinade (kogt) de sidste 30 minutter.",
    ],
    intro: `**Rødvins- og paprikamarinade** er BBQ-basen til ribs og pulled pork — røget paprika, farin og frugtig rødvin. Match til [pulled pork med rødvin](/opskrifter/pulled-pork-med-rodvin) og [rødvin-soya-glaze](/opskrifter/rodvin-soya-glaze) til pensling.`,
    why: `Paprika + vin giver **røg, farve og syre**. Farin hjælper bark/skorpe. Se [vin til pulled pork](/guides/vin-til-pulled-pork).`,
    tips: [
      ["Røget paprika", "Sød paprika er fladere."],
      ["Massage", "Gnid godt ind i ribs."],
      ["Lav og lang", "Marinaden er start — ikke hele tilberedningen."],
      ["Kog pensling", "Fødevaresikkerhed."],
    ],
    serving: `Coleslaw, boller eller kartofler. Zinfandel i glasset.`,
    mistakes: [
      "For meget farin — brændt bark.",
      "Kun sød paprika uden røg.",
      "For kort marinade på tyk skulder.",
      "Høj varme hele vejen — tørt kød.",
    ],
    storage: `Marinade 3 dage. Marineret kød 24 timer.`,
    glass: `Zinfandel eller Shiraz — se [vin til grill](/guides/vin-til-grill-og-bbq).`,
    faq: [
      ["Til kyllingevinger?", "Ja — 2–4 timer."],
      ["Uden farin?", "Lidt honning i stedet."],
      ["Frisk hvidløg?", "Ja — 2–3 fed hakket."],
      ["Kan den fryses på kødet?", "Hellere marinere efter optøning."],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-boeff": [
    { slug: "syrlig-rodvin-balsamicomarinade", label: "Syrlig rødvin-balsamicomarinade" },
  ],
  "vin-til-oksekoed": [
    { slug: "syrlig-rodvin-balsamicomarinade", label: "Syrlig balsamicomarinade" },
  ],
  "vin-til-svinemoerbrad": [
    { slug: "hvidvins-sennepsmarinade", label: "Hvidvins-sennepsmarinade" },
  ],
  "vin-til-svinekoed": [
    { slug: "hvidvins-sennepsmarinade", label: "Hvidvins-sennepsmarinade" },
    { slug: "sherry-appelsinmarinade", label: "Sherry-appelsinmarinade" },
    { slug: "italiensk-hvidvins-salviemarinade", label: "Salviemarinade" },
    { slug: "rodvins-paprikamarinade", label: "Rødvins-paprikamarinade" },
  ],
  "hvad-er-sherry-vin": [
    { slug: "sherry-appelsinmarinade", label: "Sherry-appelsinmarinade" },
  ],
  "vin-til-pulled-pork": [
    { slug: "rodvins-paprikamarinade", label: "Rødvins-paprikamarinade" },
  ],
  "vin-til-grill-og-bbq": [
    { slug: "syrlig-rodvin-balsamicomarinade", label: "Balsamicomarinade" },
    { slug: "rodvins-paprikamarinade", label: "Paprikamarinade" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "italiensk-hvidvins-salviemarinade", label: "Salviemarinade" },
  ],
};
