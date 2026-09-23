/** Data: 3 huller — svampesuppe Madeira, hvidvins-minestrone, figner i portvinssirup. */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "cremet-svampesuppe-med-madeira":
    "Bland champignon med lidt vilde svampe (kantarel/shiitake). Brun hårdt før Madeira — det giver dybde. Madeira reduceres, før fløde går i.",
  "minestrone-di-verdure-med-hvidvin":
    "Sommerlig minestrone: sprød italiensk hvidvin i stedet for rødvin. Lettere end [minestrone med rødvin](/opskrifter/minestrone-med-rodvin). Brug sæsongrønt og kort pastakogning.",
  "figner-i-krydret-portvinssirup":
    "Friske eller tørrede figner pocheres i ruby/tawny port med kanel, stjerneanis og vanilje til blank sirup. Til is eller ostebord — ikke det samme som [portvinsglaserede figner med gedeost](/opskrifter/portvinsglaserede-figner-med-gedeost).",
};

function r(opts) {
  return {
    slug: opts.slug,
    title: opts.title,
    description: opts.description,
    tags: opts.tags,
    prepTime: opts.prepTime ?? "PT15M",
    cookTime: opts.cookTime ?? "PT30M",
    servings: opts.servings ?? 4,
    difficulty: opts.difficulty ?? "easy",
    wineInRecipe: opts.wineInRecipe,
    wineToDrink: opts.wineToDrink,
    relatedGuides: opts.relatedGuides,
    ingredients: opts.ingredients,
    instructions: opts.instructions,
    intro: opts.intro,
    whyTitle: opts.whyTitle ?? "Hvorfor vin i opskriften",
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
    slug: "cremet-svampesuppe-med-madeira",
    title: "Cremet svampesuppe med Madeira",
    description:
      "Intens cremet svampesuppe med Madeira, skalotteløg og fløde — efterårsklassiker med karamelliseret umami. Opskrift til 4 personer.",
    tags: ["opskrift", "suppe", "svampe", "madeira", "efterår", "cremet", "forret"],
    prepTime: "PT20M",
    cookTime: "PT35M",
    wineInRecipe: {
      style: "Madeira — Rainwater, Sercial eller Bual (halvtør til medium)",
      amount: "1 dl Madeira",
      note: "Madeira afkoges med de brunede svampe og giver karamelliseret dybde, før fløden monteres.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svampe",
      searchQuery: "svampesuppe pinot noir chardonnay madeira",
      searchMax: 200,
      label: "vin til svampe",
    },
    relatedGuides: [
      "vin-til-svampe",
      "hvad-er-madeira-vin",
      "vin-til-suppe",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "500 g blandede svampe (champignon + gerne kantarel/shiitake)",
      "2 skalotteløg, finthakkede",
      "2 fed hvidløg, finthakkede",
      "2 spsk smør + 1 spsk olie",
      "1 dl Madeira",
      "8 dl grøntsags- eller kyllingefond",
      "2 dl piskefløde",
      "1 kvist timian",
      "Salt og peber",
      "Evt. lidt citronsaft eller sherryeddike til slut",
      "Frisk persille til pynt",
    ],
    instructions: [
      "Rens og skær svampene. Brun i hold i smør/olie på høj varme, til de er gyldne og har afgivet væske (8–10 min).",
      "Tilsæt skalotteløg og hvidløg. Sauter 2–3 min.",
      "Hæld Madeira i. Kog ind til næsten tørt — skrab panden.",
      "Tilsæt fond og timian. Simr 15 minutter.",
      "Fjern timian. Blend glat (eller delvist for tekstur). Tilsæt fløde, varm op uden at koge hårdt.",
      "Smag til med salt, peber og evt. citron. Server med persille og et drys brunede svampeskiver.",
    ],
    intro: `**Cremet svampesuppe med Madeira** er efterårsforretten med dyb, karamelliseret umami. Madeira løfter mere end almindelig hvidvin — tæt på [svampesovs med hvidvin](/opskrifter/svampesovs-med-hvidvin) og [svampe bourguignon](/opskrifter/svampe-bourguignon), bare som fløjlsblød suppe. Se også [jordskokkesuppe med hvidvinsreduktion](/opskrifter/jordskokkesuppe-med-hvidvinsreduktion).`,
    whyTitle: "Hvorfor Madeira i suppen",
    why: `Madeira har **oxideret dybde og let sødme**, der matcher svampenes umami. Den reduceres, før fløde går i, så alkoholen forsvinder og smagen bliver koncentreret. Se [hvad er Madeira](/guides/hvad-er-madeira-vin).`,
    tips: [
      ["Brun i hold", "Ellers koger svampene i egen saft."],
      ["Madeira-type", "Halvtør (Rainwater/Sercial) er bedst — meget sød Malmsey kan dominerere."],
      ["Blend delvist", "Lidt bidder giver bedre mundfølelse."],
      ["Syrlig slutning", "En dråbe citron eller eddike åbner fløden."],
    ],
    serving: `Som forret med brød, eller let hovedret med salat. Til glasset: Pinot Noir eller fadlagret Chardonnay — se [vin til svampe](/guides/vin-til-svampe).`,
    mistakes: [
      "At springe bruningen over — grå, flad suppe.",
      "At koge hårdt efter fløde — skiller.",
      "For sød dessert-Madeira alene.",
      "For lidt salt — svampe kræver smagning.",
    ],
    storage: `3 dage kølet. Genopvarm forsigtigt. Fryses uden fløde bedst; tilsæt fløde ved opvarmning.`,
    glass: `Pinot Noir, let Syrah eller Chardonnay — se [vin til suppe](/guides/vin-til-suppe). Lille Madeira som aperitif er også oplagt.`,
    faq: [
      [
        "Kun champignon?",
        "Ja — tilsæt gerne tørrede Karl Johan opblødt i fond for ekstra dybde.",
      ],
      [
        "Uden fløde?",
        "Brug havre- eller kokosfløde, eller blend ekstra svampe + kartoffel.",
      ],
      [
        "Portvin i stedet?",
        "Ja — ruby/tawny. Lidt sødere resultat. Se også [portvinssauce](/opskrifter/portvinssauce-til-oksemoerbrad).",
      ],
      [
        "Kan den laves dagen før?",
        "Ja — smager ofte bedre næste dag.",
      ],
    ],
  }),

  r({
    slug: "minestrone-di-verdure-med-hvidvin",
    title: "Minestrone di Verdure med hvidvin",
    description:
      "Let sommerlig minestrone med italiensk hvidvin, sæsongrønt, bønner og pasta — vegetarisk grøntsagssuppe. Opskrift til 6 personer.",
    tags: ["opskrift", "suppe", "minestrone", "hvidvin", "italiensk", "vegetar", "sommer"],
    prepTime: "PT20M",
    cookTime: "PT40M",
    servings: 6,
    wineInRecipe: {
      style: "Sprød italiensk hvidvin — Pinot Grigio, Vermentino eller Soave",
      amount: "1½ dl hvidvin",
      note: "Hvidvin erstatter den klassiske rødvin — lettere, friskere base til sommergrønt.",
    },
    wineToDrink: {
      guideSlug: "vin-til-italiensk-mad",
      searchQuery: "minestrone pinot grigio vermentino vegetar",
      searchMax: 200,
      label: "vin til italiensk grøntsagssuppe",
    },
    relatedGuides: [
      "vin-til-italiensk-mad",
      "vin-til-suppe",
      "vin-til-vegetariske-og-veganske-retter",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1½ dl tør italiensk hvidvin",
      "1 løg, hakket",
      "2 gulerødder i tern",
      "2 selleristilke i tern",
      "1 zucchini i tern",
      "100 g grønne bønner i stykker",
      "1 dåse hakkede tomater (400 g)",
      "1 dåse cannellini- eller hvide bønner, skyllede",
      "1 l grøntsagsfond",
      "80 g lille pasta (ditalini/orzo)",
      "2 spsk olivenolie",
      "2 fed hvidløg",
      "1 kvist rosmarin + 1 laurbærblad",
      "Salt, peber, frisk basilikum eller persille",
      "Evt. parmesan til servering",
    ],
    instructions: [
      "Sauter løg, gulerod og selleri i olie 5–7 min (soffritto).",
      "Tilsæt hvidløg, zucchini og grønne bønner. Steg 2 min.",
      "Hæld hvidvin i. Kog 2–3 min, så alkoholen fordamper.",
      "Tilsæt tomater, fond, rosmarin og laurbær. Simr 15–20 min.",
      "Tilsæt hvide bønner og pasta. Kog til pastaen er al dente (8–10 min).",
      "Fjern laurbær/rosmarin. Smag til. Server med urter, olie og evt. parmesan.",
    ],
    intro: `**Minestrone di Verdure med hvidvin** er den lettere, sommerlige kusine til [minestrone med rødvin](/opskrifter/minestrone-med-rodvin). Sprød Pinot Grigio/Vermentino i stedet for sangiovese — mere havefrisk, mindre tung. Klassisk italiensk grøntsagssuppe med bønner og pasta.`,
    whyTitle: "Hvorfor hvidvin i minestronen",
    why: `Hvidvin giver **syre og friskhed** uden rødvinens farve og tannin. Den passer til lyse grøntsager og sommerborde. Se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
    tips: [
      ["Sæsongrønt", "Byt zucchini med asparges om foråret, græskar om efteråret."],
      ["Pasta til sidst", "Ellers bliver den grødet ved genopvarmning — kog evt. separat."],
      ["Parmesanskorpe", "En skorpe i gryden giver umami (fjern før servering)."],
      ["Ikke for lang simring", "Grøntsagerne skal have bid."],
    ],
    serving: `Brød, pesto-klat eller olivenolie. Samme italienske hvidvin i glasset.`,
    mistakes: [
      "For meget pasta — æder bouillonen.",
      "At bruge sød hvidvin.",
      "At koge grøntsagerne totalt bløde.",
      "At salte før bønner/fond er smagt til.",
    ],
    storage: `3–4 dage kølet. Pasta suger væske — tilsæt fond ved genopvarmning. Fryses bedst uden pasta.`,
    glass: `Pinot Grigio, Vermentino eller Soave — se [vin til vegetar](/guides/vin-til-vegetariske-og-veganske-retter).`,
    faq: [
      [
        "Forskel på rødvins-minestrone?",
        "Rødvin er kraftigere og mere vinterlig. Hvidvin er lysere og sommerlig.",
      ],
      [
        "Uden pasta?",
        "Ja — tilsæt ekstra bønner eller kartofler.",
      ],
      [
        "Vegan?",
        "Spring parmesan over — brug næringsgær eller pesto uden ost.",
      ],
      [
        "Kan jeg bruge rødvin alligevel?",
        "Ja — så er det nærmere [minestrone med rødvin](/opskrifter/minestrone-med-rodvin).",
      ],
    ],
  }),

  r({
    slug: "figner-i-krydret-portvinssirup",
    title: "Figner i krydret portvinssirup",
    description:
      "Figner pocheret i portvin med kanel, stjerneanis og vanilje — blank sirup til is eller ostebord. Opskrift til 4–6 personer.",
    tags: ["opskrift", "dessert", "figner", "portvin", "sirup", "ostebord", "efterår"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    servings: 6,
    wineInRecipe: {
      style: "Rød portvin — ruby eller tawny",
      amount: "3 dl portvin",
      note: "Portvin reduceres med sukker og krydderier til en blank pocheringssirup omkring fignerne.",
    },
    wineToDrink: {
      guideSlug: "portvin-til-ost",
      searchQuery: "portvin figner dessert ostebord",
      searchMax: 200,
      label: "portvin til figner",
    },
    relatedGuides: [
      "portvin-til-ost",
      "bedste-portvin",
      "hvad-er-portvin",
      "vin-til-dessert-og-kransekage",
    ],
    ingredients: [
      "8–12 friske figner (eller 200 g tørrede, opblødte)",
      "3 dl rød portvin",
      "3–4 spsk rørsukker (smag til — port er sød)",
      "1 kanelstang",
      "1 stjerneanis",
      "½ vaniljestang (eller 1 tsk vaniljesukker)",
      "Evt. 1 strimmel appelsinskal",
      "Evt. 1 tsk balsamico til slut",
    ],
    instructions: [
      "Kom port, sukker, kanel, stjerneanis, vanilje og evt. appelsinskal i en gryde. Bring i let kog, til sukkeret er opløst.",
      "Læg fignerne i (halverede hvis store). Simr forsigtigt 10–15 minutter, til de er møre men holder formen. Tørrede: 15–20 min.",
      "Tag fignerne op. Kog lagen ind 5–8 minutter til blank, tyk sirup. Smag til — evt. balsamico for syre.",
      "Hæld siruppen over fignerne. Server lune eller afkølede. Fjern hele krydderier før servering.",
    ],
    intro: `**Figner i krydret portvinssirup** er pocheringen til is og ostebord — kanel, stjerneanis og vanilje i reduceret port. Anderledes end [portvinsglaserede figner med gedeost](/opskrifter/portvinsglaserede-figner-med-gedeost) (hurtig tapas-glasur) og [figner og dadler i rødvin](/opskrifter/figner-og-dadler-i-rodvin). Her er siruppen hovedrollen.`,
    whyTitle: "Hvorfor portvin til fignerne",
    why: `Portvin og figner er klassisk: **sødme møder sødme**, krydderierne giver jule-/efterårsdybde. Reduktionen bliver en sirup, der også klæder vaniljeis. Se [portvin til ost](/guides/portvin-til-ost).`,
    tips: [
      ["Friske vs tørrede", "Friske er smukkere; tørrede suger mere sirup."],
      ["Ikke for hård kog", "Fignerne skal holde formen."],
      ["Sirup-tykkelse", "Skal coat'e en ske."],
      ["Ostebord", "Blåskimmel, brie eller chèvre."],
    ],
    serving: `Vaniljeis, yoghurt, pandekager eller ostebord. Drys hakkede pistacier eller mandler over. Se [portvinsglaserede dadler](/opskrifter/portvinsglaserede-dadler-med-bacon) til salt kontrast.`,
    mistakes: [
      "For meget sukker oveni sød port.",
      "At koge fignerne i stykker.",
      "At glemme at reducere lagen — tynd og kedelig.",
      "Dyr vintage port — spild; brug god ruby/tawny.",
    ],
    storage: `1 uge kølet i glasset med sirup. Serveres kolde eller lune. Sirup fryses fint.`,
    glass: `Samme port, eller tawny til osten — se [bedste portvin](/guides/bedste-portvin).`,
    faq: [
      [
        "Uden friske figner?",
        "Tørrede figner eller blommer. Blommer: lidt kortere tid.",
      ],
      [
        "Kan jeg bruge rødvin?",
        "Ja — tilsæt mere sukker. Se også [figner og dadler i rødvin](/opskrifter/figner-og-dadler-i-rodvin).",
      ],
      [
        "Til is på forhånd?",
        "Lav dagen før — smagen sætter sig.",
      ],
      [
        "Med gedeost?",
        "Ja — eller gå til den hurtige [glasur-version](/opskrifter/portvinsglaserede-figner-med-gedeost).",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-svampe": [
    { slug: "cremet-svampesuppe-med-madeira", label: "Cremet svampesuppe med Madeira" },
  ],
  "hvad-er-madeira-vin": [
    { slug: "cremet-svampesuppe-med-madeira", label: "Svampesuppe med Madeira" },
  ],
  "vin-til-suppe": [
    { slug: "cremet-svampesuppe-med-madeira", label: "Svampesuppe med Madeira" },
    { slug: "minestrone-di-verdure-med-hvidvin", label: "Minestrone med hvidvin" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "minestrone-di-verdure-med-hvidvin", label: "Minestrone di Verdure" },
  ],
  "vin-til-vegetariske-og-veganske-retter": [
    { slug: "minestrone-di-verdure-med-hvidvin", label: "Minestrone med hvidvin" },
  ],
  "portvin-til-ost": [
    { slug: "figner-i-krydret-portvinssirup", label: "Figner i portvinssirup" },
  ],
  "bedste-portvin": [
    { slug: "figner-i-krydret-portvinssirup", label: "Figner i portvinssirup" },
  ],
  "vin-til-dessert-og-kransekage": [
    { slug: "figner-i-krydret-portvinssirup", label: "Figner i portvinssirup" },
  ],
};
