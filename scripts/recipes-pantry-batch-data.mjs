/** Vin-pantry / kondimenter — net-nye fra 20-listen. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  "rodvinssennep":
    "Grov sennep hvor frøene trækker i frugtig rødvin og rødvinseddike — uden øl. Adskilt fra oel-rodvinssennep.",
  "rodvinssauce-essens":
    "Koncentreret base af rødvin, skalotteløg og timian til frysning i isterninger — hverdags-pandesky.",
  "hvidvins-bearnaiseessens":
    "Hård reduktion af hvidvin, hvidvinseddike, skalotteløg og estragon — grundlag til béarnaise.",
  "glace-de-viande-med-rodvin":
    "Klassisk oksefond reduceret med rødvin til blank, tyk glace — naturlig umami.",
  "hindbaer-rodvinseddike":
    "Infused eddike af rødvinseddike og hindbær — base til sommerdressinger. Bygger på hjemmelavet vineddike.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vinost-pantry-5-flasker": [
    { slug: "rodvinssauce-essens", label: "Rødvinssauce-essens" },
    { slug: "hvidvins-bearnaiseessens", label: "Béarnaiseessens" },
    { slug: "rodvinssennep", label: "Rødvinssennep" },
    { slug: "glace-de-viande-med-rodvin", label: "Glace de viande" },
    { slug: "portvins-baconmarmelade", label: "Portvins-baconmarmelade" },
    { slug: "hvidvins-hvidloegsconfit", label: "Hvidløgsconfit" },
    { slug: "sherrysyltede-sennepsfro", label: "Sherrysyltede sennepsfrø" },
    { slug: "hvidvins-jalapenorelish", label: "Jalapeñorelish" },
    { slug: "aegte-teriyakisauce", label: "Ægte teriyaki" },
  ],
  "vin-som-naturlig-smagsforstaerker": [
    { slug: "rodvinssauce-essens", label: "Rødvinssauce-essens" },
    { slug: "glace-de-viande-med-rodvin", label: "Glace de viande" },
    { slug: "hvidvins-bearnaiseessens", label: "Béarnaiseessens" },
  ],
  "byg-din-egen-eddikemor": [
    { slug: "hindbaer-rodvinseddike", label: "Hindbær-rødvinseddike" },
    { slug: "hvidvinssyltede-gronne-tomater", label: "Hvidvinssyltede grønne tomater" },
    { slug: "sherrysyltede-sennepsfro", label: "Sherrysyltede sennepsfrø" },
  ],
  "naturlig-konservering-med-vin-og-eddike": [
    { slug: "hindbaer-rodvinseddike", label: "Hindbær-rødvinseddike" },
    { slug: "hvidvinssyltede-gronne-tomater", label: "Syltede grønne tomater" },
    { slug: "rodvinssennep", label: "Rødvinssennep" },
    { slug: "hvidvins-jalapenorelish", label: "Jalapeñorelish" },
    { slug: "rodvinssirup-med-vanilje", label: "Rødvinssirup" },
  ],
  "kemien-i-marinering-med-vin": [
    { slug: "hvidvins-bearnaiseessens", label: "Béarnaiseessens (reduktion)" },
    { slug: "rodvinssauce-essens", label: "Rødvinssauce-essens" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "rodvinssauce-essens", label: "Rødvinssauce-essens" },
    { slug: "glace-de-viande-med-rodvin", label: "Glace de viande" },
    { slug: "hvidvins-bearnaiseessens", label: "Béarnaiseessens" },
  ],
};

export const RECIPES = [
  r({
    slug: "rodvinssennep",
    title: "Hjemmelavet rødvinssennep",
    description:
      "Grov sennep fra bunden: sennepsfrø trukket i frugtig rødvin og rødvinseddike. Opskrift til ca. 2 glas.",
    tags: ["opskrift", "tilbehør", "sennep", "rødvin", "pantry", "vegetar"],
    prepTime: "PT15M",
    cookTime: "PT10M",
    servings: 12,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig tør rødvin — Grenache, Merlot eller Côtes du Rhône",
      amount: "1,5 dl rødvin + 3 spsk rødvinseddike",
      note: "Kun vin og eddike — ingen øl. Adskilt fra øl-rødvinssennep.",
    },
    wineToDrink: {
      guideSlug: "vinost-pantry-5-flasker",
      searchQuery: "rødvin sennep charcuteri",
      searchMax: 120,
      label: "vinøst pantry",
    },
    relatedGuides: [
      "vinost-pantry-5-flasker",
      "naturlig-konservering-med-vin-og-eddike",
      "vin-til-smorrebrod",
      "vin-til-burger",
    ],
    ingredients: [
      "80 g gule sennepsfrø",
      "40 g brune sennepsfrø",
      "1,5 dl frugtig rødvin",
      "3 spsk rødvinseddike (gerne hjemmelavet)",
      "1 spsk honning eller brun farin",
      "1 tsk salt",
      "Evt. 1/2 tsk gurkemeje",
    ],
    instructions: [
      "Bland sennepsfrø med rødvin i en skål. Træk mindst 8 timer, gerne natten over, i køleskab.",
      "Blend med eddike, honning og salt til ønsket grovhed.",
      "Hæld i glas. Hvile 1–2 dage i køleskab før bedste smag.",
      "Opbevar koldt. Rør før brug.",
    ],
    intro: `**Hjemmelavet rødvinssennep** er den rene vin-version: frøene trækker i **rødvin og rødvinseddike** — uden øl. Søskende til [øl- og rødvinssennep](/opskrifter/oel-rodvinssennep), som har mere pub-dybde. Læs [vinøst pantry](/guides/vinost-pantry-5-flasker).`,
    why: `Rødvin giver **frugt og farve**; eddike giver syre og holdbarhed. Se [konservering](/guides/naturlig-konservering-med-vin-og-eddike).`,
    tips: [
      ["Træk natten over", "Ellers hårde frø."],
      ["Grov blend", "Pulse — ikke smoothie."],
      ["Hvile", "Skarphed blødes op efter 1–2 dage."],
      ["Hjemmelavet eddike", "Fra [eddikemor](/guides/byg-din-egen-eddikemor)."],
    ],
    serving: `Pølser, burger, smørrebrød, ost. Ved siden af [sherrysyltede sennepsfrø](/opskrifter/sherrysyltede-sennepsfro).`,
    mistakes: [
      "At springe trækketiden over.",
      "For meget honning — dessert-sennep.",
      "Metal-låg direkte på sennep (kan reagere) — brug plast/indsats.",
      "At bruge sød port i stedet for tør rød.",
    ],
    storage: `Køleskab 1–2 måneder.`,
    glass: `Samme frugtige rødvin — eller øl til pølser.`,
    faq: [
      ["Med øl?", "[Øl-rødvinssennep](/opskrifter/oel-rodvinssennep)."],
      ["Kun gule frø?", "Mildere — tilføj gerne brune."],
      ["Eddike fra scratch?", "[Byg eddikemor](/guides/byg-din-egen-eddikemor)."],
    ],
  }),

  r({
    slug: "rodvinssauce-essens",
    title: "Hjemmelavet rødvinssauce-essens",
    description:
      "Koncentreret base af rødvin, skalotteløg og timian — frys i isterninger til hverdagens pandesky. Opskrift til ca. 3 dl.",
    tags: ["opskrift", "sauce", "rødvin", "pantry", "essens", "meal prep"],
    prepTime: "PT10M",
    cookTime: "PT45M",
    servings: 12,
    difficulty: "easy",
    wineInRecipe: {
      style: "Kraftig tør rødvin — Côtes du Rhône, Merlot, Cabernet-blend",
      amount: "5 dl rødvin",
      note: "Reduceres hårdt til koncentreret essens — ikke færdig sauce.",
    },
    wineToDrink: {
      guideSlug: "vin-som-naturlig-smagsforstaerker",
      searchQuery: "côtes du rhône madlavning",
      searchMax: 120,
      label: "vin som smagsforstærker",
    },
    relatedGuides: [
      "vin-som-naturlig-smagsforstaerker",
      "vinost-pantry-5-flasker",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "hvilken-vin-til-madlavning-sovs",
    ],
    ingredients: [
      "5 dl kraftig rødvin",
      "3 skalotteløg, finthakkede",
      "1 spsk olivenolie eller smør",
      "4 kviste timian",
      "1 laurbærblad",
      "1 tsk sort peberkorn",
      "1 spsk tomatpuré (valgfri, for farve/umami)",
      "Evt. 1 fed hvidløg",
    ],
    instructions: [
      "Sautér skalotteløg (og evt. hvidløg) i fedtstof 5–7 min til bløde.",
      "Tilsæt tomatpuré hvis brugt — rist 1 min. Hæld rødvin i. Tilsæt timian, laurbær, peber.",
      "Kog kraftigt ind til ca. 1/3 volumen (tykt, aromatiskt koncentrat), 25–40 min. Skum evt. af.",
      "Si. Afkøl. Hæld i isterningebakke. Frys. Opbevar terninger i pose.",
      "Brug: 1–2 terninger i pandesky + smør/fond efter stegning.",
    ],
    intro: `**Rødvinssauce-essens** er farvel til pulverposer: en **hård reduktion**, du fryser i isterninger og smider i pandeskyen på hverdage. Læs [vin som smagsforstærker](/guides/vin-som-naturlig-smagsforstaerker) og [vinøst pantry](/guides/vinost-pantry-5-flasker).`,
    why: `Koncentration = **umami og syre på lager**. Alkohol fordamper; aroma bliver. Se [sauce og simren](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Drikkeværdig vin", "Fejl smager igennem ved reduktion."],
      ["Ikke salt i essensen", "Salt panden ved brug."],
      ["Terning-størrelse", "Ca. 1 spsk pr. terning."],
      ["Label posen", "Dato + «rødvin-essens»."],
    ],
    serving: `Bøf, hakkebøf, svinekoteletter, svampe. Kombiner med [glace de viande](/opskrifter/glace-de-viande-med-rodvin) for ekstra body.`,
    mistakes: [
      "At stoppe for tidligt — tynd «vin-vand».",
      "At brænde skalotteløg.",
      "At salte før frysning (begrænser anvendelse).",
      "Madlavningsvin med tilsat salt.",
    ],
    storage: `Fryser 3–4 måneder. Køleskab 5 dage.`,
    glass: `Samme stil rødvin til retten du laver.`,
    faq: [
      ["Uden tomatpuré?", "Ja — lysere essens."],
      ["Hvidvins-essens?", "Samme metode med hvid — eller [béarnaiseessens](/opskrifter/hvidvins-bearnaiseessens)."],
      ["Fond i stedet?", "Du kan tilsætte 1 dl fond midtvejs — mere klassisk demi."],
    ],
  }),

  r({
    slug: "hvidvins-bearnaiseessens",
    title: "Hvidvins-béarnaiseessens fra bunden",
    description:
      "Hård reduktion af tør hvidvin, hvidvinseddike, skalotteløg og estragon — grundlag til ægte béarnaise. Opskrift til ca. 0,8 dl.",
    tags: ["opskrift", "sauce", "hvidvin", "bearnaise", "pantry", "essens", "estragon"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Sauvignon Blanc, Muscadet eller Chenin",
      amount: "2 dl hvidvin + 0,5 dl hvidvinseddike",
      note: "Reduceres til koncentreret estragon-syrebase — ikke færdig sauce.",
    },
    wineToDrink: {
      guideSlug: "vinost-pantry-5-flasker",
      searchQuery: "sauvignon blanc bearnaise",
      searchMax: 120,
      label: "vinøst pantry",
    },
    relatedGuides: [
      "vinost-pantry-5-flasker",
      "vin-som-naturlig-smagsforstaerker",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "kemien-i-marinering-med-vin",
    ],
    ingredients: [
      "2 dl tør hvidvin",
      "0,5 dl hvidvinseddike",
      "2 skalotteløg, finthakkede",
      "4–5 kviste frisk estragon (stængler + blade)",
      "4–5 sort peberkorn, let knuste",
      "Evt. 1 kvist basilikum eller kørvel",
    ],
    instructions: [
      "Kom vin, eddike, skalotteløg, estragonstængler (spar nogle blade), peber i gryde.",
      "Kog ind til ca. 2–3 spsk tyk, aromatisk reduktion (15–25 min).",
      "Si hårdt — pres væske ud af løg/urter. Afkøl.",
      "Frys i isterninger eller små glas. Til béarnaise: brug som syrebase med æggeblomme + smør — se bearnaisesauce-med-hvidvin.",
    ],
    intro: `**Hvidvins-béarnaiseessens** er den **hårde reduktion**, professionelle køkkener har på lager: vin, eddike, skalotteløg, estragon — kogt ind til syre-bombe. Færdig sauce: [bearnaisesauce med hvidvin](/opskrifter/bearnaisesauce-med-hvidvin). Læs [vinøst pantry](/guides/vinost-pantry-5-flasker).`,
    why: `Uden denne reduktion smager béarnaise fladt. Essensen = **kontrol** og hurtigere sauce på hverdage.`,
    tips: [
      ["Stængler i gryden", "Blade til sidst i den færdige sauce."],
      ["Hård reduktion", "Skal være sirupsagtig syre — ikke tynd."],
      ["Si godt", "Ellers bitterhed fra peber/løg."],
      ["Frys småt", "1 terning ≈ 1 sauce til 2 personer."],
    ],
    serving: `Base til béarnaise, hollandaise-varianter, eller skvæt i smørsauce til fisk.`,
    mistakes: [
      "At bruge tørret estragon som eneste urt (fladere).",
      "For lidt reduktion.",
      "At tilsætte smør her — det er essens, ikke sauce.",
      "Sød hvidvin.",
    ],
    storage: `Fryser 3 måneder. Køleskab 1 uge.`,
    glass: `Sauvignon eller Champagne til bøf + béarnaise.`,
    faq: [
      ["Færdig béarnaise?", "[Bearnaisesauce-med-hvidvin](/opskrifter/bearnaisesauce-med-hvidvin)."],
      ["Uden estragon?", "Ikke béarnaise — så er det bare vin-eddike-reduktion."],
      ["Klar estragoneddike?", "Kan erstatte del af eddiken."],
    ],
  }),

  r({
    slug: "glace-de-viande-med-rodvin",
    title: "Ægte glace de viande med rødvin",
    description:
      "Oksefond reduceret i timevis med rødvin til tyk, blank umami-glace. Opskrift til ca. 2–3 dl glace.",
    tags: ["opskrift", "sauce", "rødvin", "fond", "glace", "pantry", "fransk"],
    prepTime: "PT30M",
    cookTime: "PT8H",
    servings: 16,
    difficulty: "hard",
    wineInRecipe: {
      style: "Kraftig rødvin — Bordeaux-blend, Syrah eller Côtes du Rhône",
      amount: "5 dl rødvin (i fond/reduktion)",
      note: "Rødvin koges ind med oksefond til blank glace — naturlig umami.",
    },
    wineToDrink: {
      guideSlug: "vin-som-naturlig-smagsforstaerker",
      searchQuery: "bordeaux oksekød sauce",
      searchMax: 150,
      label: "vin som smagsforstærker",
    },
    relatedGuides: [
      "vin-som-naturlig-smagsforstaerker",
      "vinost-pantry-5-flasker",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-oksekoed",
    ],
    ingredients: [
      "2 kg okseben (marv + led), evt. lidt kødrester",
      "2 løg, 2 gulerødder, 2 selleristilke",
      "2 spsk tomatpuré",
      "5 dl rødvin",
      "Koldt vand til at dække",
      "Timian, laurbær, peberkorn",
      "Olie til bruning",
    ],
    instructions: [
      "Brun ben i ovn 220 °C 45–60 min til dybt brune. Brun grøntsager i gryde/ovn.",
      "Kom ben og grønt i stor gryde. Tilsæt tomatpuré, rist kort. Hæld rødvin i — kog 5 min. Dæk med vand. Urter.",
      "Simr meget blidt 6–8 timer (skum af). Si. Skil fedt fra (køl).",
      "Reducér fonden til tyk, blank glace der coat'er skeen (kan tage 1–2 timer). Smag — kraftig umami.",
      "Hæld i små forme/isterninger. Frys.",
    ],
    intro: `**Glace de viande med rødvin** er den klassiske **okse-umami** på lager: ben, tid og rødvin reduceret til blank gelé. Tungere end [rødvinssauce-essens](/opskrifter/rodvinssauce-essens) — her er kollagen stjernen. Læs [vin som smagsforstærker](/guides/vin-som-naturlig-smagsforstaerker).`,
    why: `Langsom ekstraktion + reduktion = **naturlig glutamat og krop** uden pulver. Vin løfter aroma og syre.`,
    tips: [
      ["Blidt simmer", "Hård kog = uklar bitter fond."],
      ["Fedt af", "Ellers fedtet glace."],
      ["Terninger", "1 terning løfter en pandesauce."],
      ["Weekend-projekt", "Ikke hverdags-45-min."],
    ],
    serving: `Opløs i pandesky til bøf, eller pensl grillkød. Kombiner med [portvinsglace](/opskrifter/portvinsglace) til sødere finish.`,
    mistakes: [
      "At salte fonden hårdt før reduktion.",
      "For lidt bruning af ben.",
      "At bruge kun vand uden vin — mangler aroma.",
      "At give op før glace er tyk.",
    ],
    storage: `Fryser 4–6 måneder. Køleskab 5 dage (gelé).`,
    glass: `Bordeaux eller Syrah til den ret, du glace'r.`,
    faq: [
      ["Kyllingeben?", "Så er det glace de volaille — fin, men anden smag."],
      ["Trykkoger?", "Ja til fond — reducér stadig åbent bagefter."],
      ["Købt fond?", "Kan reduceres med vin — kortere, mindre «ægte»."],
    ],
  }),

  r({
    slug: "hindbaer-rodvinseddike",
    title: "Hindbær- og rødvinseddike",
    description:
      "Infused eddike af rødvinseddike og friske hindbær — base til sommerens salatdressinger. Opskrift til ca. 4 dl.",
    tags: ["opskrift", "eddike", "hindbær", "rødvin", "pantry", "vegetar", "fermentering"],
    prepTime: "PT15M",
    cookTime: "PT10M",
    servings: 16,
    difficulty: "easy",
    wineInRecipe: {
      style: "Rødvinseddike (gerne hjemmelavet) + frugt",
      amount: "4 dl rødvinseddike + 200 g hindbær",
      note: "Hindbær infuserer eddiken — brug egen vineddike fra eddikemor hvis muligt.",
    },
    wineToDrink: {
      guideSlug: "byg-din-egen-eddikemor",
      searchQuery: "rosé salat hindbær",
      searchMax: 100,
      label: "byg din egen eddikemor",
    },
    relatedGuides: [
      "byg-din-egen-eddikemor",
      "naturlig-konservering-med-vin-og-eddike",
      "vinost-pantry-5-flasker",
      "vin-tiktok-trends-spicy-sauvy-og-vineddike",
    ],
    ingredients: [
      "4 dl rødvinseddike",
      "200 g friske eller frosne hindbær",
      "1 spsk sukker eller honning (valgfri)",
      "Evt. 1 strimmel citronskal",
    ],
    instructions: [
      "Bring eddike næsten i kog. Hæld over hindbær i rent glas. Tilsæt sukker og evt. skal.",
      "Luk, køl. Træk 3–7 dage i køleskab — ryst dagligt.",
      "Si gennem klæde. Flask. Smag til — mere sukker hvis skarp.",
      "Brug i vinaigrette (3 dele olie : 1 del eddike) eller til [råmarineret spidskål](/opskrifter/raamarineret-spidskaalssalat).",
    ],
    intro: `**Hindbær- og rødvinseddike** er sommerens infused eddike: friske bær møder **rødvinseddike** — gerne fra din egen [eddikemor](/guides/byg-din-egen-eddikemor). Læs [naturlig konservering](/guides/naturlig-konservering-med-vin-og-eddike).`,
    why: `Infusion giver **frugt og farve** uden at miste eddikens konserverende syre.`,
    tips: [
      ["Rene bær", "Undgå mug."],
      ["Ikke for lang infusion", "Bitterhed efter 2+ uger."],
      ["Hjemmelavet base", "Blødere end industri-eddike."],
      ["Label", "Dato på flasken."],
    ],
    serving: `Salat, marinade til and/kylling, skvæt i soda, til [rosé-hindbærcoulis](/opskrifter/rose-hindbaercoulis)-agtige desserter (syrligere).`,
    mistakes: [
      "At bruge sød balsamico som base (anden stil).",
      "Metal-låg uden indsats.",
      "At lade bær stå i måneder.",
      "For lav syre (fortyndet) — dårligere holdbarhed.",
    ],
    storage: `Køleskab 3–6 måneder efter si.`,
    glass: `Rosé eller Sauvignon til salaten.`,
    faq: [
      ["Uden egen eddike?", "God købt rødvinseddike virker."],
      ["Andre bær?", "Brombær, solbær — samme metode."],
      ["Varm infusion?", "Kort opvarmning hjælper; lang kogning dræber friskhed."],
    ],
  }),
];
