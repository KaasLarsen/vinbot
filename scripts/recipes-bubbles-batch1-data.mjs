/** Bubbles Any Day recipes batch 1. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  "fried-chicken-med-bobler":
    "Sprød friturekylling — den ultimative test af hverdagsbobler. Brut Cava/Crémant skærer fedt og panering.",
  "loegeringe-i-bobledej":
    "Løgringe hvor delen af væsken i dejen er kold mousserende vin — luftig skorpe. Adskilt fra loegeringe-i-hvidvinsdej.",
  "hotdogs-med-cava":
    "Gourmet-hotdogs med crunch — parret med uformel Cava. Adskilt fra hotdogs med rødvinssløg.",
  "pizza-bianca-mousserende-rose":
    "Hvid pizza med kartoffel, gedeost og rosmarin — tør mousserende rosé i glasset.",
  "flaesketestegssandwich-med-pet-nat":
    "Rest-flæskesteg i sandwich med svær og rødkål — frugtig pét-nat ved siden.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "bobler-paa-en-tirsdag": [
    { slug: "fried-chicken-med-bobler", label: "Fried chicken med bobler" },
    { slug: "hotdogs-med-cava", label: "Hotdogs med Cava" },
    { slug: "pizza-bianca-mousserende-rose", label: "Pizza bianca" },
  ],
  "friture-og-bobler": [
    { slug: "fried-chicken-med-bobler", label: "Fried chicken" },
    { slug: "loegeringe-i-bobledej", label: "Løgringe i bobledej" },
  ],
  "hverdags-bobler": [
    { slug: "fried-chicken-med-bobler", label: "Fried chicken" },
    { slug: "hotdogs-med-cava", label: "Hotdogs med Cava" },
    { slug: "flaesketestegssandwich-med-pet-nat", label: "Flæskestegssandwich" },
  ],
  "hverdagsbobler-under-100-til-mad": [
    { slug: "fried-chicken-med-bobler", label: "Fried chicken" },
    { slug: "hotdogs-med-cava", label: "Hotdogs med Cava" },
  ],
  "bobler-til-takeaway-og-fastfood": [
    { slug: "fried-chicken-med-bobler", label: "Fried chicken" },
    { slug: "pizza-bianca-mousserende-rose", label: "Pizza bianca" },
  ],
  "pet-nat-for-begyndere": [
    { slug: "flaesketestegssandwich-med-pet-nat", label: "Flæskestegssandwich med pét-nat" },
  ],
  "rosevin-med-bobler": [
    { slug: "pizza-bianca-mousserende-rose", label: "Pizza bianca med mousserende rosé" },
  ],
};

export const RECIPES = [
  r({
    slug: "fried-chicken-med-bobler",
    title: "Fried chicken med bobler",
    description:
      "Klassisk sprød friturekylling — parret med knastør Cava eller Crémant. Opskrift til 4.",
    tags: ["opskrift", "kylling", "friture", "bobler", "cava", "hverdag"],
    prepTime: "PT20M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Brut Cava eller Crémant — til glasset (evt. skvæt i kærnemælk)",
      amount: "Flaske Brut + evt. 0,5 dl i marinade",
      note: "Boblerne i glasset er stjernen; valgfri boble i kærnemælksmarinade.",
    },
    wineToDrink: {
      guideSlug: "friture-og-bobler",
      searchQuery: "cava brut fried chicken",
      searchMax: 150,
      label: "friture og bobler",
    },
    relatedGuides: [
      "friture-og-bobler",
      "bobler-paa-en-tirsdag",
      "hverdags-bobler",
      "hverdagsbobler-under-100-til-mad",
    ],
    ingredients: [
      "1 kg kyllingelår/-vinger",
      "3 dl kærnemælk (+ evt. 0,5 dl Brut Cava)",
      "2 dl mel, 1 dl majsstivelse",
      "1 tsk paprika, hvidløgspulver, salt, peber, cayenne",
      "Olie til friture",
      "Flaske Cava/Crémant Brut (iskold)",
    ],
    instructions: [
      "Mariner kylling i kærnemælk (+ evt. bobler) 1–4 timer.",
      "Vend i krydret melblanding. Fritér 165–175 °C til gylden og throughstegt (ca. 10–14 min).",
      "Dryp af på rist. Salt.",
      "Server med iskold Brut Cava — slurk mellem hver bid.",
    ],
    intro: `**Fried chicken med bobler** er Bubbles Any Day-testen: ultrasprødt, fedt ydre møder [kulsyre og syre](/guides/bobler-paa-en-tirsdag), der renser munden. Læs [friture og bobler](/guides/friture-og-bobler).`,
    why: `Panering + olie kræver **Brut**, ikke sød Prosecco. Læs [hverdagsbobler under 100 til mad](/guides/hverdagsbobler-under-100-til-mad).`,
    tips: [
      ["Temp", "Olie ikke for hot — brændt skorpe, rå midte."],
      ["Hvile", "Rist > køkkenrulle (holder sprødere)."],
      ["Vin", "6–9 °C."],
      ["Rest", "Ovnsprød næste dag."],
    ],
    serving: `Coleslaw, pickles, hot sauce.`,
    mistakes: [
      "Extra Dry Prosecco — for sødt.",
      "Lun cava.",
      "Overfyldt frituregryde.",
      "At springe marinaden over.",
    ],
    storage: `Køleskab 2 dage. Genopvarm i ovn 180 °C.`,
    glass: `Cava/Crémant Brut 6–9 °C.`,
    faq: [
      ["Ovnstege?", "Kan — mindre sprød."],
      ["Champagne?", "Ja til fest — [under 300 kr](/guides/bedste-champagne-under-300-kr)."],
      ["Beer-can chicken?", "Anden stil."],
    ],
  }),

  r({
    slug: "loegeringe-i-bobledej",
    title: "Sprøde løgringe i bobledej",
    description:
      "Løgringe i frituredej med kold mousserende vin — luftig, sprød skorpe. Opskrift til 4 som snack.",
    tags: ["opskrift", "snack", "friture", "bobler", "løg", "cava"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Kold Brut Cava/Prosecco i dejen + samme stil i glasset",
      amount: "2 dl mousserende vin i dej",
      note: "Boblerne i dejen giver luft; resten af flasken drikkes til.",
    },
    wineToDrink: {
      guideSlug: "friture-og-bobler",
      searchQuery: "cava brut snack friture",
      searchMax: 120,
      label: "friture og bobler",
    },
    relatedGuides: [
      "friture-og-bobler",
      "bobler-paa-en-tirsdag",
      "hverdags-bobler",
    ],
    ingredients: [
      "2 store løg, skåret i ringe",
      "2 dl mel",
      "1 tsk bagepulver",
      "2 dl kold Brut Cava eller Prosecco",
      "1 tsk salt, peber, paprika",
      "Olie til friture",
      "Dip: mayo + citron eller ranch",
    ],
    instructions: [
      "Adskil løgringe. Pisk mel, bagepulver, salt og kold boblevin til tyk pandekage-dej (ikke overpisk).",
      "Dyp ringe, fritér 175 °C 2–3 minutter til gyldne. Dryp af.",
      "Salt straks. Server med dip og resten af flasken iskold.",
    ],
    intro: `**Løgringe i bobledej** erstatter mælk/øl med **kold mousserende vin** — skorpen bliver luftig og sprød. Adskilt fra [løgringe i hvidvinsdej](/opskrifter/loegeringe-i-hvidvinsdej): her er boblerne i dejen.`,
    why: `CO₂ i dejen = **luftlommer**; samme vin i glasset renser fedt. Læs [friture og bobler](/guides/friture-og-bobler).`,
    tips: [
      ["Kold vin", "Varm dej bliver tung."],
      ["Ikke overpisk", "Gluten = sej."],
      ["Tynde ringe", "Sprødere."],
      ["Spis straks", "Mister crunch."],
    ],
    serving: `Snack til 4 eller side til burger.`,
    mistakes: [
      "Varm boblevin i dej.",
      "For tyk dej — klumpet.",
      "Sød Prosecco i glasset.",
      "At stable dem våde.",
    ],
    storage: `Bedst frisk. Genopvarm i ovn 200 °C kort.`,
    glass: `Samme Brut 6–9 °C.`,
    faq: [
      ["Øl i stedet?", "Klassisk — bobler er sjovere."],
      ["Glutenfri?", "GF-mel + bagepulver."],
      ["Uden friture?", "Airfryer med olie-spray — mindre boble-effekt."],
    ],
  }),

  r({
    slug: "hotdogs-med-cava",
    title: "Gourmet-hotdogs med Cava",
    description:
      "Hotdogs med kvalitetspølse, sennep og sylt — uformel Cava i glasset. Opskrift til 4.",
    tags: ["opskrift", "hotdogs", "cava", "bobler", "hverdag", "street food"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Cava Brut — til glasset",
      amount: "Flaske Cava Brut",
      note: "Salt, fedt og sennep tæmmes af knastør Cava — ikke rødvinssløg-versionen.",
    },
    wineToDrink: {
      guideSlug: "hverdagsbobler-under-100-til-mad",
      searchQuery: "cava brut hotdog",
      searchMax: 120,
      label: "hverdagsbobler under 100 til mad",
    },
    relatedGuides: [
      "hverdagsbobler-under-100-til-mad",
      "bobler-paa-en-tirsdag",
      "hverdags-bobler",
      "bobler-til-takeaway-og-fastfood",
    ],
    ingredients: [
      "4 gode pølser",
      "4 brioche- eller hotdog-boller",
      "Sennep, ketchup, syltede agurker",
      "Sprøde løg eller chips til crunch",
      "Rå løg, chili mayo (valgfri)",
      "Flaske Cava Brut (iskold)",
    ],
    instructions: [
      "Steg/grill pølser. Rist boller.",
      "Samle med sennep, sylt og crunch.",
      "Skænk Cava Brut — slurk mellem bidderne.",
    ],
    intro: `**Gourmet-hotdogs med Cava** er street food møder [hverdagsbobler](/guides/hverdags-bobler). Adskilt fra [hotdogs med rødvinssløg](/opskrifter/luksus-hotdogs-med-rodvinsloeg) — her er det **knastør Cava**, der klipper salt og sennep.`,
    why: `Sennep + fedt = **syrebehov**. Brut Cava leverer. Læs [bobler på en tirsdag](/guides/bobler-paa-en-tirsdag).`,
    tips: [
      ["Brut", "Ikke Extra Dry."],
      ["Crunch", "Tekstur er halvdelen."],
      ["Køl", "Isspand på bordet."],
      ["Pølse", "Kvalitet mærkes."],
    ],
    serving: `Chips, coleslaw.`,
    mistakes: [
      "Sød prosecco.",
      "Lun cava.",
      "Klamme boller.",
      "Kun ketchup uden syre.",
    ],
    storage: `Samle friskt.`,
    glass: `Cava Brut 6–9 °C.`,
    faq: [
      ["Prosecco?", "Kun Brut."],
      ["Vegetar?", "Ja."],
      ["Champagne?", "Overkill — men sjovt."],
    ],
  }),

  r({
    slug: "pizza-bianca-mousserende-rose",
    title: "Pizza bianca med kartoffel, ged og mousserende rosé",
    description:
      "Hvid pizza med kartoffel, gedeost og rosmarin — tør mousserende rosé i glasset. Opskrift til 4.",
    tags: ["opskrift", "pizza", "bobler", "rosé", "gedeost", "bistro"],
    prepTime: "PT25M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør mousserende rosé (Cava/Crémant rosé) — til glasset",
      amount: "Flaske mousserende rosé Brut",
      note: "Ost og olie balanceres af tørre bobler — ikke tung chianti.",
    },
    wineToDrink: {
      guideSlug: "rosevin-med-bobler",
      searchQuery: "mousserende rosé cava brut pizza",
      searchMax: 150,
      label: "rosévin med bobler",
    },
    relatedGuides: [
      "rosevin-med-bobler",
      "bobler-paa-en-tirsdag",
      "vin-til-pizza",
      "hverdags-bobler",
    ],
    ingredients: [
      "1 pizza-/butterdej",
      "150 g creme fraiche eller ricotta",
      "1 kogt kartoffel, tyndt skåret",
      "100 g gedeost",
      "Rosmarin, olivenolie, salt, peber",
      "Evt. spekeskinke",
      "Flaske tør mousserende rosé",
    ],
    instructions: [
      "Varm ovn til 250 °C. Rul dej tynd. Smør creme fraiche.",
      "Fordel kartoffel, gedeost, rosmarin, olie. Bag 8–12 minutter til sprød.",
      "Server med iskold mousserende rosé Brut.",
    ],
    intro: `**Pizza bianca med kartoffel og ged** er den hvide pizzas fedme — ost og olie — balanceret af **tør mousserende rosé**. Tæt på [tarte flambée](/opskrifter/tarte-flambee-med-gedeost), men med bobler i glasset som Bubbles Any Day-vinkel.`,
    why: `Fedme + urter = **syre og bobler**. Læs [rosévin med bobler](/guides/rosevin-med-bobler).`,
    tips: [
      ["Tynd dej", "Sprød bund."],
      ["Brut rosé", "Ikke sød."],
      ["Kartoffel", "For-kogt — ellers rå."],
      ["Høj varme", "Vigtigt."],
    ],
    serving: `Salat. Bistro-aften.`,
    mistakes: [
      "Sød mousserende.",
      "For tyk dej.",
      "Lav ovntemperatur.",
      "Tung rødvin.",
    ],
    storage: `Bedst frisk.`,
    glass: `Mousserende rosé Brut 6–9 °C.`,
    faq: [
      ["Still rosé?", "OK — bobler er sjovere."],
      ["Mozzarella?", "Ja — mindre «ged»."],
      ["Crémant blanc?", "Også godt."],
    ],
  }),

  r({
    slug: "flaesketestegssandwich-med-pet-nat",
    title: "Flæskestegssandwich med pét-nat",
    description:
      "Rest-flæskesteg med svær og syrlig rødkål i bolle — frugtig pét-nat i glasset. Opskrift til 4.",
    tags: ["opskrift", "flæskesteg", "sandwich", "pét-nat", "bobler", "hverdag", "rester"],
    prepTime: "PT15M",
    cookTime: "PT10M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig, tør pét-nat — til glasset",
      amount: "Flaske pét-nat",
      note: "Salt svær + fedt kød + syrlig kål = pét-nats frugt og syre.",
    },
    wineToDrink: {
      guideSlug: "pet-nat-for-begyndere",
      searchQuery: "pet nat flæskesteg",
      searchMax: 120,
      label: "pét-nat for begyndere",
    },
    relatedGuides: [
      "pet-nat-for-begyndere",
      "hvad-er-pet-nat",
      "bobler-paa-en-tirsdag",
      "hverdags-bobler",
      "vin-til-flaesketesteg",
    ],
    ingredients: [
      "400 g rest flæskesteg, skivet",
      "Sprøde svær",
      "4 boller",
      "2 dl syrlig rødkål",
      "Sennep eller remoulade",
      "Flaske frugtig pét-nat (kølet)",
    ],
    instructions: [
      "Varm kødet og svær i ovn 180 °C 5–8 minutter.",
      "Samle sandwich: sennep, kød, kål, svær.",
      "Server med pét-nat — åbn forsigtigt, hæld langsomt.",
    ],
    intro: `**Flæskestegssandwich med pét-nat** genbruger weekendens steg til en hverdagsaften — med [pét-nat](/guides/pet-nat-for-begyndere) som den uformelle boble. Salt, fedt og syrlig kål elsker frugtig mousse.`,
    why: `Pét-nat giver **frugt og syre** uden champagne-stivhed. Læs [hvad er pét-nat](/guides/hvad-er-pet-nat).`,
    tips: [
      ["Svær", "Genopvarm separat så den forbliver sprød."],
      ["Kål", "Skal være syrlig."],
      ["Pét-nat", "Køl godt — kan være livlig."],
      ["Cava i stedet?", "Ja — mere klassisk."],
    ],
    serving: `Chips eller råkost.`,
    mistakes: [
      "Sød mousserende.",
      "Varm, slap svær.",
      "At ryste pét-nat-flasken.",
      "For lidt syre i tilbehør.",
    ],
    storage: `Samle friskt. Kød 2–3 dage i køl.`,
    glass: `Pét-nat 6–10 °C.`,
    faq: [
      ["Uden rester?", "Steg en lille kamsteg."],
      ["Cava?", "Perfekt plan B."],
      ["Remoulade?", "Klassisk DK — virker med bobler."],
    ],
  }),
];
