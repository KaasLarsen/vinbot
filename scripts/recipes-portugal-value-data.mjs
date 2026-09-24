/** Portugal value plays: bifana, prego, cataplana. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  bifana:
    "Lissabon/Porto-gadekøkken: tynde svinekoteletter i hvidvins-hvidløgsmarinade, serveret i bolle. Vinho Verde eller let øl — ikke tung Douro.",
  "prego-sandwich":
    "Portugisisk bøfsandwich: mør okse i hvidløg og hvidvin/vinagrete, i bolle. Douro til glasset hvis du vil have rød — ellers Alvarinho.",
  "cataplana-med-hvidvin":
    "Algarve-skaldyrsgryde i cataplana (eller tung låg): fisk, skaldyr, hvidvin, peberfrugt. Alvarinho er value-valget.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "douro-vs-dao": [
    { slug: "prego-sandwich", label: "Prego-sandwich" },
    { slug: "bifana", label: "Bifana" },
  ],
  "vinho-verde-vs-alvarinho": [
    { slug: "bifana", label: "Bifana" },
    { slug: "cataplana-med-hvidvin", label: "Cataplana" },
  ],
  "vin-til-portugisisk-mad": [
    { slug: "bifana", label: "Bifana" },
    { slug: "prego-sandwich", label: "Prego" },
    { slug: "cataplana-med-hvidvin", label: "Cataplana" },
  ],
  "vinregion-portugal": [
    { slug: "bifana", label: "Bifana" },
    { slug: "prego-sandwich", label: "Prego" },
    { slug: "cataplana-med-hvidvin", label: "Cataplana" },
  ],
  "vin-til-fisk-og-skaldyr": [
    { slug: "cataplana-med-hvidvin", label: "Cataplana" },
  ],
};

export const RECIPES = [
  r({
    slug: "bifana",
    title: "Bifana (portugisisk svinesandwich)",
    description:
      "Tynde svinekoteletter i hvidvins-hvidløgsmarinade — klassisk portugisisk gadesandwich. Opskrift til 4.",
    tags: ["opskrift", "portugal", "svinekød", "sandwich", "hvidvin", "gadekøkken"],
    prepTime: "PT20M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Vinho Verde eller anden tør, let hvidvin",
      amount: "2 dl hvidvin",
      note: "Vin + hvidløg + piri-piri i marinade/sauce; i glasset: iskold Vinho Verde.",
    },
    wineToDrink: {
      guideSlug: "vinho-verde-vs-alvarinho",
      searchQuery: "vinho verde bifana",
      searchMax: 150,
      label: "Vinho Verde",
    },
    relatedGuides: [
      "vinho-verde-vs-alvarinho",
      "vin-til-portugisisk-mad",
      "vinregion-portugal",
      "douro-vs-dao",
    ],
    ingredients: [
      "600 g svinemørbrad eller koteletter, skåret meget tyndt",
      "2 dl tør hvidvin (Vinho Verde)",
      "6 fed hvidløg, knuste",
      "1 dl lagerøl (valgfri, klassisk i nogle versioner)",
      "1 spsk piri-piri eller chiliflager",
      "2 laurbærblade, 1 tsk paprika",
      "4 bløde boller (papo seco-stil)",
      "Senep, salt, peber, olie",
    ],
    instructions: [
      "Bank kødet tyndt. Mariner 30–60 minutter i vin, hvidløg, laurbær, paprika, chili, salt og peber.",
      "Steg kødet hurtigt i hot pande med olie. Hæld resten af marinaden (+ evt. øl) i — kog 5–8 minutter til sauce.",
      "Læg kød i boller. Dryp sauce over. Senep efter smag.",
      "Server med iskold Vinho Verde.",
    ],
    intro: `**Bifana** er Portugals svinesandwich: tyndt kød, **hvidløg, hvidvin og piri-piri**, i en blød bolle. Gadekøkken fra Lissabon til Porto — og et oplagt match til [Vinho Verde](/guides/vinho-verde-vs-alvarinho).`,
    why: `Fedt svin + hvidløg kræver **syrlig, let hvid** — ikke tung Douro. Læs [vin til portugisisk mad](/guides/vin-til-portugisisk-mad).`,
    tips: [
      ["Tyndt kød", "Bank det — ellers sej sandwich."],
      ["Sauce", "Skal være nok til at væde bollen."],
      ["Piri-piri", "Efter humør."],
      ["Bollee", "Blød — ikke ciabatta-hård."],
    ],
    serving: `Pommes eller chips. Sennep på bordet.`,
    mistakes: [
      "For tykt kød.",
      "Tung rødvin i glasset.",
      "At tørste bollen uden sauce.",
      "At brænde hvidløget i marinaden.",
    ],
    storage: `Kød + sauce 1 dag i køl. Samle friskt.`,
    glass: `Vinho Verde 8–10 °C — se [Vinho Verde vs. Alvarinho](/guides/vinho-verde-vs-alvarinho).`,
    faq: [
      ["Uden øl?", "Kun vin — stadig klassisk."],
      ["Kylling?", "Muligt — anden ret."],
      ["Rødvin?", "Kun hvis meget let og kold — hellere Vinho Verde."],
    ],
  }),

  r({
    slug: "prego-sandwich",
    title: "Prego (portugisisk bøfsandwich)",
    description:
      "Mør okse med hvidløg i bolle — Madeira/Lissabon-klassiker. Opskrift til 4.",
    tags: ["opskrift", "portugal", "oksekød", "sandwich", "hvidvin", "hvidløg"],
    prepTime: "PT15M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin til deglaze — Douro eller Dão rød til glasset valgfrit",
      amount: "1 dl hvidvin",
      note: "Hvidløg + vin i panden; til glasset: Alvarinho eller en frugtig Douro/Dão.",
    },
    wineToDrink: {
      guideSlug: "douro-vs-dao",
      searchQuery: "douro prego bøf",
      searchMax: 150,
      label: "Douro vs. Dão",
    },
    relatedGuides: [
      "douro-vs-dao",
      "vin-til-portugisisk-mad",
      "vin-til-boeff",
      "vinregion-portugal",
    ],
    ingredients: [
      "4 tynde oksefilet- eller culotte-steaks (á ca. 120 g)",
      "4 fed hvidløg, skivet",
      "1 dl tør hvidvin",
      "2 spsk smør + olie",
      "4 bløde boller",
      "Senep, salt, peber",
      "Evt. salatblad",
    ],
    instructions: [
      "Salt og peber kødet. Steg i hot pande 1–2 min pr. side (rosa midte). Tag op.",
      "Sauter hvidløg kort i smør. Hæld vin i — skrab. Kog 1 minut til glans.",
      "Læg kød i boller. Hæld hvidløgs-vin over. Senep.",
      "Server med Douro (kraft) eller Dão (elegant) — eller Alvarinho hvis du vil holde det lyst.",
    ],
    intro: `**Prego** er den portugisiske bøfsandwich: mør okse, **masses af hvidløg**, et skvæt vin, i bolle. Enkel — og et godt pejlemærke til [Douro vs. Dão](/guides/douro-vs-dao), hvis du vil have rød til.`,
    why: `Hvidløg + okse tåler **frugtig rød** eller frisk hvid. Læs [vin til bøf](/guides/vin-til-boeff) og [portugisisk mad](/guides/vin-til-portugisisk-mad).`,
    tips: [
      ["Tyndt kød", "Hurtig stegning."],
      ["Hvidløg", "Ikke brændt — gyldent."],
      ["Bollee", "Gerne ristet let."],
      ["Madeira-version", "Ofte serveret efter seafood — samme teknik."],
    ],
    serving: `Pommes, salat. Café-stil.`,
    mistakes: [
      "Gennemstegt, tørt kød.",
      "Bittert brændt hvidløg.",
      "For tung Amarone-agtig vin.",
      "Hård bolle der river ganen.",
    ],
    storage: `Bedst frisk.`,
    glass: `Douro 16–18 °C eller Dão 15–17 °C — [Douro vs. Dão](/guides/douro-vs-dao).`,
    faq: [
      ["Bifana vs. prego?", "Bifana = svin; prego = okse."],
      ["Kun hvidvin i glasset?", "Alvarinho — især efter fisk."],
      ["Ost?", "Ikke klassisk."],
    ],
  }),

  r({
    slug: "cataplana-med-hvidvin",
    title: "Cataplana med hvidvin",
    description:
      "Algarve-skaldyrsgryde med fisk, muslinger, rejer og hvidvin — i cataplana eller tung låggryde. Opskrift til 4.",
    tags: ["opskrift", "portugal", "skaldyr", "fisk", "hvidvin", "algarve", "gryde"],
    prepTime: "PT25M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Alvarinho eller frisk Vinho Verde",
      amount: "2,5 dl hvidvin",
      note: "Hvidvin damper skaldyr og fisk i den lukkede cataplana — samme stil i glasset.",
    },
    wineToDrink: {
      guideSlug: "vinho-verde-vs-alvarinho",
      searchQuery: "alvarinho cataplana algarve",
      searchMax: 180,
      label: "Alvarinho",
    },
    relatedGuides: [
      "vinho-verde-vs-alvarinho",
      "vin-til-portugisisk-mad",
      "vin-til-fisk-og-skaldyr",
      "vinregion-portugal",
    ],
    ingredients: [
      "400 g hvid fisk i stykker",
      "300 g rejer",
      "500 g muslinger, rensede",
      "1 chouriço eller mild chorizo, skivet (valgfri)",
      "2,5 dl tør hvidvin",
      "1 løg, 1 rød peber, 2 tomater",
      "3 fed hvidløg",
      "1 dl fiskefond eller vand",
      "Koriander, olivenolie, paprika, salt, peber",
      "Citron, brød",
    ],
    instructions: [
      "Sauter løg, peber, hvidløg og evt. chouriço i olie i cataplana/gryde. Tilsæt tomat og paprika.",
      "Hæld vin og fond i. Læg fisk og rejer i. Muslinger øverst. Luk låg.",
      "Simr 12–15 minutter, til muslingerne åbner og fisken er mør. Ryst forsigtigt.",
      "Drys koriander. Server med brød og kold Alvarinho.",
    ],
    intro: `**Cataplana** er Algarves ikoniske skaldyrsgryde — opkaldt efter den **muslingeformede kobbergryde**. Fisk, rejer, muslinger, hvidvin og peberfrugt under låg. Uden ægte cataplana: brug en **tung gryde med tæt låg**. Adskilt fra [caldeirada](/opskrifter/caldeirada-med-hvidvin) (mere fiskesuppe-agtig) og [arroz de marisco](/opskrifter/arroz-de-marisco).`,
    why: `Lukket damp + hvidvin = **intensiv skaldyrssmag** uden fløde. Læs [vin til portugisisk mad](/guides/vin-til-portugisisk-mad).`,
    tips: [
      ["Låg", "Skal være tæt — ellers fordamper magien."],
      ["Chouriço", "Valgfri røget kant."],
      ["Muslinger", "Uåbnede smides ud."],
      ["Vin", "Alvarinho > generisk hvid."],
    ],
    serving: `Brød, citron, grøn salat.`,
    mistakes: [
      "At åbne låget hvert minut.",
      "At overkoge fisken.",
      "Tung rødvin.",
      "For lidt væske — brænder på.",
    ],
    storage: `Bedst frisk. Rester 1 dag — genopvarm blidt.`,
    glass: `Alvarinho 8–11 °C — [Vinho Verde vs. Alvarinho](/guides/vinho-verde-vs-alvarinho).`,
    faq: [
      ["Uden cataplana-gryde?", "Ja — tung låggryde."],
      ["Kun fisk?", "Ja — skip skaldyr."],
      ["Douro i glasset?", "Nej — for tungt. Se [Douro vs. Dão](/guides/douro-vs-dao)."],
    ],
  }),
];
