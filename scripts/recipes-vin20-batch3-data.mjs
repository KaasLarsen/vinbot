/** Data: 20 nye vinretter — batch 3 (sidste 3 desserter). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "rodvinssorbet-med-brombaer":
    "Reducer rødvin med sukker og brombær, si, køl og frys. Smag til før frysning — for sød bliver flad, for syrlig bliver skarp. Rør undervejs eller brug ismaskine.",
  "tarte-tatin-med-hvidvinskaramel":
    "Karamel koges med lidt syrlig hvidvin, så sødmen balances. Æbler lægges tæt, dej ovenpå, bag og vend. Arbejd hurtigt ved vending — karamel er meget varm.",
  "moscato-pocherede-ferskner":
    "Vælg modne men faste ferskner. Pocher blidt i Moscato d'Asti med lidt sukker og vanilje. Server lune eller kolde med siruppen.",
};

function r(opts) {
  return {
    slug: opts.slug,
    title: opts.title,
    description: opts.description,
    tags: opts.tags,
    prepTime: opts.prepTime ?? "PT20M",
    cookTime: opts.cookTime ?? "PT40M",
    servings: opts.servings ?? 4,
    difficulty: opts.difficulty ?? "medium",
    wineInRecipe: opts.wineInRecipe,
    wineToDrink: opts.wineToDrink,
    relatedGuides: opts.relatedGuides,
    ingredients: opts.ingredients,
    instructions: opts.instructions,
    intro: opts.intro,
    whyTitle: opts.whyTitle ?? "Hvorfor vin i retten",
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
    slug: "rodvinssorbet-med-brombaer",
    title: "Rødvinssorbet med brombær",
    description:
      "Dyb, mørkelilla issorbet af reduceret rødvin og modne brombær. Opskrift til 6 — intens efterårsdessert.",
    tags: ["opskrift", "dessert", "sorbet", "rødvin", "brombær", "efterår", "is"],
    prepTime: "PT20M",
    cookTime: "PT20M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin — merlot, zinfandel, ung tempranillo eller grenache",
      amount: "5 dl rødvin",
      note: "Rødvin koges ind med brombær og sukker til en koncentreret base, der fryses til sorbet.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "portvin dessertvin brombær rødvin sorbet",
      searchMax: 180,
      label: "vin til bærdessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "bedste-dessertvin",
      "portvin-til-chokolade",
    ],
    ingredients: [
      "5 dl frugtig rødvin",
      "400 g brombær (friske eller frosne)",
      "150 g sukker",
      "Saft af 1 citron",
      "1 kanelstang (valgfrit)",
      "Evt. 1 spsk vodka (blødere scoop)",
    ],
    instructions: [
      "Kog rødvin, sukker, brombær og kanel 10–12 minutter, til bærrene er møre og væsken er reduceret lidt.",
      "Fjern kanel. Blend og si gennem en fin si. Rør citronsaft (og evt. vodka) i. Smag til — skal være lidt for sød.",
      "Køl helt. Kern i ismaskine, eller frys i bakke og rør med gaffel hver 30–40 min i 3–4 timer.",
      "Server straks, eller frys lufttæt. Tag ud 5–10 min før servering.",
    ],
    intro: `**Rødvinssorbet med brombær** er den mørke, intense efterårsis, hvor reduceret rødvin og brombær bliver til sorbet. Tættere på [Moscato-sorbet](/opskrifter/moscato-dasti-sorbet) i teknik, men med rødvinens dybde — og et søskende til [plommetrifli med rødvinssirup](/opskrifter/plommetrifli-med-rodvinssirup).`,
    why: `Brombær og rødvin deler **mørk frugt og syre**. Reduktion koncentrerer smagen; frysning dæmper sødme. Citron holder det skarpt. Se [dessertvin](/guides/bedste-dessertvin).`,
    tips: [
      ["Si godt", "Frø fra brombær er irriterende i is."],
      ["For sød base", "Frysning dæmper sødme."],
      ["Vodka", "Valgfri — blødere tekstur."],
      ["Ismaskine", "Finest resultat."],
    ],
    serving: `Server med friske bær, et stænk port eller alene. Passer efter vildt eller and.`,
    mistakes: [
      "For lidt sukker — iset, hård sorbet.",
      "At springe si over — frøet is.",
      "Meget tannin-tung vin — bitter eftersmag.",
      "At servere lige fra dybfrys — for hård.",
    ],
    storage: `Fryser 1 uge. Bedst inden for 3–4 dage.`,
    glass: `Tawny port eller samme stil frugtig rød — se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      [
        "Andre bær?",
        "Blåbær eller solbær virker. Jordbær bliver lysere.",
      ],
      [
        "Uden ismaskine?",
        "Ja — frys og rør med gaffel flere gange.",
      ],
      [
        "Alkohol i den færdige sorbet?",
        "Noget forsvinder ikke ved frysning.",
      ],
      [
        "Kan jeg bruge portvin?",
        "Delvist — bland port og vand/rødvin, ellers bliver den for sød og tung.",
      ],
    ],
  }),

  r({
    slug: "tarte-tatin-med-hvidvinskaramel",
    title: "Tarte Tatin med hvidvinskaramel",
    description:
      "Klassisk fransk æblekage vendt på hovedet, hvor karamellen koges med syrlig hvidvin. Opskrift til 6–8.",
    tags: ["opskrift", "dessert", "tarte tatin", "æbler", "hvidvin", "karamel", "fransk", "bagning"],
    prepTime: "PT25M",
    cookTime: "PT45M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Syrlig tør hvidvin — Sauvignon Blanc, Chablis, Chenin Blanc eller Riesling tør",
      amount: "½–1 dl i karamellen",
      note: "Hvidvin i karamellen balancerer sukkersødme med syre — klassisk Tatin med et vinøst twist.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "tarte tatin cider calvados chenin dessertvin",
      searchMax: 180,
      label: "vin til æbledessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "bedste-dessertvin",
      "vin-til-crepes-og-pandekager",
    ],
    ingredients: [
      "6–8 faste æbler (fx Belle de Boskoop eller Granny Smith)",
      "150 g sukker",
      "60 g smør",
      "½–1 dl tør, syrlig hvidvin",
      "1 pakke butterdej (ca. 250 g) eller hjemmelavet",
      "1 tsk vaniljesukker eller ½ vaniljestang",
      "Flødeskum eller creme fraiche til servering",
    ],
    instructions: [
      "Forvarm ovn til 190 °C. Skræl æbler, skær i kvarte, fjern kernehus.",
      "Smelt sukker i en ovnfast pande (ca. 24 cm) til gylden karamel. Tag af. Rør smør i. Hæld hvidvin i forsigtigt — det bruser. Kog 1 minut til blank. Drys vanilje over.",
      "Læg æbler tæt i karamellen, snitside op. Lad boble 5 minutter på komfur.",
      "Rul dej ud, læg over æblerne, stik kanterne ned. Prik med gaffel.",
      "Bag 30–35 minutter, til dejen er gylden. Vent 5 minutter. Vend ud på fad. Server lun.",
    ],
    intro: `**Tarte Tatin med hvidvinskaramel** er den franske klassiker, hvor karamellen får et skvæt syrlig hvidvin, så sødmen ikke bliver klaimatisk. Tæt på [æbletærte med calvados](/opskrifter/aebletaerte-med-calvados-og-hvidvin) og [æblekage med hvidvin-karamel](/opskrifter/aeblekage-hvidvin-karamel) — her er det den vendte Tatin-form, der er pointen.`,
    why: `Karamel er sød og bitter. **Syrlig hvidvin** skærer igennem og giver dybde uden at smage af rå alkohol, når den er kogt ind. Se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    tips: [
      ["Faste æbler", "Ellers bliver de mos under bagning."],
      ["Pas på damp", "Vin i karamel bruser kraftigt."],
      ["Vend mens den er lun", "For kold = sidder fast. For hot = farligt."],
      ["Butterdej", "Kold fra køleskab — lettere at håndtere."],
    ],
    serving: `Lun med creme fraiche, vaniljeis eller calvados-fløde. Drik Chenin eller cider til.`,
    mistakes: [
      "For mørk karamel — bitter.",
      "For bløde æbler — grød.",
      "At vende for sent — sidder fast i panden.",
      "Sød hvidvin i karamel — for klaimatisk.",
    ],
    storage: `Bedst samme dag. Køleskab 2 dage — genvarm i ovn 160 °C 10 min.`,
    glass: `Chenin Blanc, Coteaux du Layon eller cider — se [dessertvin](/guides/bedste-dessertvin).`,
    faq: [
      [
        "Kan jeg bruge rødvin?",
        "Ja — mørkere karamel. Hvidvin er klassiskere til æbler.",
      ],
      [
        "Uden vin?",
        "Klassisk Tatin med kun smør og sukker. Vinen er balancen.",
      ],
      [
        "Pærer i stedet?",
        "Ja — samme metode. Se også [pærer i hvidvin](/opskrifter/paerer-i-hvidvin-og-safran).",
      ],
      [
        "Hjemmelavet dej?",
        "Mørdej eller butterdej — butterdej er nemmest.",
      ],
    ],
  }),

  r({
    slug: "moscato-pocherede-ferskner",
    title: "Moscato-pocherede ferskner",
    description:
      "Ferskner pocheret i sød Moscato d'Asti til let sommerdessert. Opskrift til 4 — frisk, aromatisk og festlig.",
    tags: ["opskrift", "dessert", "fersken", "moscato", "mousserende", "sommer", "italiensk"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Moscato d'Asti — sød, let mousserende italiensk hvidvin",
      amount: "5 dl Moscato d'Asti",
      note: "Moscato er både pocheringsvæske og smag — blomster, fersken og let sødme.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "moscato d asti fersken dessertvin",
      searchMax: 180,
      label: "vin til ferskendessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "bedste-dessertvin",
      "vin-til-italiensk-mad",
    ],
    ingredients: [
      "4 modne men faste ferskner",
      "5 dl Moscato d'Asti",
      "50 g sukker (mindre hvis Moscato er meget sød)",
      "½ vaniljestang eller 1 tsk vaniljesukker",
      "Skræl af ½ citron",
      "Evt. mascarpone eller vaniljeis til servering",
    ],
    instructions: [
      "Skær et kryds i ferskenskindet. Blanchér 30–60 sekunder i kogende vand, køl i isvand, træk skindet af (valgfrit).",
      "Læg ferskner, Moscato, sukker, vanilje og citronskræl i en gryde. Væsken skal næsten dække.",
      "Simr blidt 10–15 minutter, til fersknerne er møre men hele. Vend forsigtigt.",
      "Tag ferskner op. Kog væsken ind 5–8 minutter til let sirup. Hæld over. Køl eller server lune.",
    ],
    intro: `**Moscato-pocherede ferskner** er den lette sommerdessert, hvor friske ferskner trækker smag fra sød, mousserende Moscato d'Asti. Friskere end [hvidvinsbagede ferskner](/opskrifter/hvidvinsbagede-fersken) — her er det pochering i glasset af vin, ikke ovn. Par med [Moscato-sorbet](/opskrifter/moscato-dasti-sorbet) til dobbelt Moscato-menu.`,
    why: `Moscato og fersken spejler hinanden: **blomster, sødme, aroma**. Blid pochering bevarer frugten; reduktion giver sirup. Se [dessertvin](/guides/bedste-dessertvin).`,
    tips: [
      ["Faste ferskner", "For bløde falder fra hinanden."],
      ["Lavt simmer", "Ikke hård kogning."],
      ["Skræl valgfrit", "Pænere uden — mere rustikt med."],
      ["Sirup", "Skal coat'e en ske."],
    ],
    serving: `Med mascarpone, vaniljeis eller mandelflager. Server med et glas kold Moscato.`,
    mistakes: [
      "For hård kogning — mosede ferskner.",
      "Umodne ferskner — syrlige og hårde.",
      "At smide siruppen ud — det er smagen.",
      "Meget sød vin + for meget sukker — klaimatisk.",
    ],
    storage: `Køleskab 3 dage i sirup. Server kolde eller lun lidt. Frys ikke.`,
    glass: `Samme Moscato d'Asti — se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      [
        "Nektariner i stedet?",
        "Ja — samme metode, ofte uden skrælning.",
      ],
      [
        "Uden Moscato?",
        "Sød Riesling eller Prosecco Extra Dry + lidt ekstra sukker.",
      ],
      [
        "Forskel på de bagte ferskner?",
        "Bagte = ovn og tør hvidvin. Disse = pochering i Moscato.",
      ],
      [
        "Til ostebordet?",
        "Ja — især til blåskimmel eller frisk gedeost.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-dessert-og-kransekage": [
    { slug: "rodvinssorbet-med-brombaer", label: "Rødvinssorbet med brombær" },
    { slug: "tarte-tatin-med-hvidvinskaramel", label: "Tarte Tatin med hvidvinskaramel" },
    { slug: "moscato-pocherede-ferskner", label: "Moscato-pocherede ferskner" },
  ],
  "bedste-dessertvin": [
    { slug: "rodvinssorbet-med-brombaer", label: "Rødvinssorbet med brombær" },
    { slug: "tarte-tatin-med-hvidvinskaramel", label: "Tarte Tatin med hvidvinskaramel" },
    { slug: "moscato-pocherede-ferskner", label: "Moscato-pocherede ferskner" },
  ],
  "portvin-til-chokolade": [
    { slug: "rodvinssorbet-med-brombaer", label: "Rødvinssorbet med brombær" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "moscato-pocherede-ferskner", label: "Moscato-pocherede ferskner" },
  ],
  "vin-til-crepes-og-pandekager": [
    { slug: "tarte-tatin-med-hvidvinskaramel", label: "Tarte Tatin med hvidvinskaramel" },
  ],
};
