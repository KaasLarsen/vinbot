/** Data: Top 30 vinretter — batch 3 (jul/hedvin + dessert-huller). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "kyllingeleverparfait-med-portvinsgele":
    "Blend levermousse silkeblød og si den. Portvinsgelé laves separat og hældes over, når moussen er kold og stiv — ellers synker geleen ned. Sæt gerne natten over før servering.",
  "roedkaal-med-portvin":
    "Portvin balancerer eddikens syre og giver dybde uden at gøre rødkålen dessert-sød. Simr længe nok til at kålen er mør, men stadig har bid. Smager bedre dagen efter.",
  "andebryst-med-portvins-og-figneglasering":
    "Rids skindet i tern uden at skære i kødet. Steg skindside ned først, så fedtet smelter. Glasur af port og figner reduceres til blank sirup — pensl til sidst, ellers brænder sukkeret.",
  "rodvinskage-med-mork-chokolade":
    "Rødvin fremhæver chokoladens dybde uden at smage direkte af alkohol. Brug en frugtig, ikke for tannin-tung rødvin. Kagen skal være svampet — undgå overbagning.",
  "moscato-dasti-sorbet":
    "Moscato d'Asti er sød og mousserende — alkohol og brus forsvinder delvist ved frysning. Smag siruppen til før frysning; for sød bliver flad, for syrlig bliver skarp. Rør et par gange under frysning eller brug ismaskine.",
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
    slug: "kyllingeleverparfait-med-portvinsgele",
    title: "Chicken Liver Parfait med portvinsgelé",
    description:
      "Silkeblød kyllingelevermousse toppet med blank portvinsgelé. Opskrift til 6–8 som forret — klassisk feststart med hedvin.",
    tags: ["opskrift", "forret", "lever", "portvin", "parfait", "fest", "jul", "pate"],
    prepTime: "PT35M",
    cookTime: "PT25M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Rød portvin — ruby til gele, evt. tawny i moussen",
      amount: "150 ml port til gele + 2 spsk i mousse",
      note: "Portvin giver sødme og farve til geleen og dybde til levermoussen.",
    },
    wineToDrink: {
      guideSlug: "portvin-til-ost",
      searchQuery: "portvin tawny ruby parfait forret",
      searchMax: 200,
      label: "portvin til parfait",
    },
    relatedGuides: [
      "portvin-til-ost",
      "bedste-portvin",
      "hvad-er-portvin",
      "sadan-serverer-du-portvin",
    ],
    ingredients: [
      "400 g kyllingelever, renset",
      "200 g usaltet smør, blødt",
      "2 skalotteløg, finthakkede",
      "1 fed hvidløg, finthakket",
      "2 spsk cognac eller brandy",
      "2 spsk portvin (til mousse)",
      "1 tsk timianblade",
      "½ tsk salt",
      "Peber",
      "Evt. en knivspids muskatnød",
      "Portvinsgelé: 150 ml rød portvin, 2 blade gelatine (eller 1 tsk pulver), 1 tsk sukker",
      "Toast og cornichons til servering",
    ],
    instructions: [
      "Udblød gelatine i koldt vand 5 minutter (hvis blade).",
      "Steg skalotteløg og hvidløg bløde i lidt smør (3–4 min). Tilsæt lever og timian — steg 3–4 minutter, til leveren er brun udvendig men stadig rosa indeni. Tag af varmen.",
      "Flambér eller tilsæt cognac og port. Blend lever med resten af smørret til silkeblød mousse. Si gennem en fin si. Smag til med salt, peber og muskat.",
      "Fordel moussen i glas eller en form. Køl mindst 2 timer, til den er stiv.",
      "Varm port og sukker til det næsten koger. Tag af, rør gelatine i til opløst. Køl til lunkent.",
      "Hæld gele over moussen i et tyndt lag. Køl mindst 2 timer mere (gerne overnight). Server med toast.",
    ],
    intro: `**Chicken Liver Parfait med portvinsgelé** er festforrettens silkebløde klassiker: lysegul mousse under et blankt låg af rød portvinsgelé. Mere raffineret end [pâté med morkel og rødvin](/opskrifter/pate-med-morkel-og-rodvin), og et naturligt match til [portvinsglaserede figner](/opskrifter/portvinsglaserede-figner-med-gedeost) på samme bord. Laves gerne dagen før — så er du klar, når gæsterne kommer.`,
    why: `Lever er fed og intens. **Portvin** giver sødme og frugt, der klæder leverens jernsmag, og geleen giver kontrast i tekstur. Ruby er frugtig og farverig til gele; tawny er nøddeagtig i moussen. Se [hvad er portvin](/guides/hvad-er-portvin) og [portvin til ost](/guides/portvin-til-ost).`,
    tips: [
      ["Si moussen", "Ellers bliver den grynet af hinder."],
      ["Rosa midte", "Overstegt lever = grå, tør parfait."],
      ["Lunken gele", "For varm gele smelter moussen."],
      ["Overnight", "Smager og skærer bedst dagen efter."],
    ],
    serving: `Server med ristet brioche eller toast, cornichons og evt. [portvinsglaserede figner](/opskrifter/portvinsglaserede-figner-med-gedeost). Lille glas tawny port ved siden af.`,
    mistakes: [
      "Overstegt lever — bitter, grå mousse.",
      "Gele hældt på varm mousse — synker ned.",
      "For tyk gelélåg — gummiagtigt.",
      "At springe sin over — grynet tekstur.",
    ],
    storage: `Køleskab 4–5 dage tildækket. Frys mousse uden gele op til 1 måned; tilsæt gele efter optøning.`,
    glass: `Tawny eller ruby port — se [bedste portvin](/guides/bedste-portvin) og [sådan serverer du portvin](/guides/sadan-serverer-du-portvin).`,
    faq: [
      [
        "Kan jeg bruge andelever?",
        "Ja — endnu mere luksuriøst. Samme teknik, evt. lidt mindre smør.",
      ],
      [
        "Hvilken port til gele?",
        "Ruby giver flot farve. Tawny er mere nøddeagtig og brunere.",
      ],
      [
        "Skal der gelatine i?",
        "Ja til et stift låg. Agar kan bruges vegetarisk — følg pakkens dosering.",
      ],
      [
        "Hvor længe i forvejen?",
        "Gerne dagen før. Minimum 4 timer i køleskab efter gele.",
      ],
    ],
  }),

  r({
    slug: "roedkaal-med-portvin",
    title: "Hjemmelavet rødkål med portvin",
    description:
      "Klassisk julerødkål opgraderet med portvin, der balancerer eddike og æbler. Opskrift til 6–8 — dybere end rødvin-varianten.",
    tags: ["opskrift", "rødkål", "portvin", "jul", "tilbehør", "dansk"],
    prepTime: "PT20M",
    cookTime: "PT75M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Rød portvin — ruby eller tawny",
      amount: "150 ml portvin",
      note: "Portvin giver sødme og dybde, der balancerer eddikens syre i den klassiske julerødkål.",
    },
    wineToDrink: {
      guideSlug: "vin-til-juleaften",
      searchQuery: "julerødkål portvin pinot noir spätburgunder",
      searchMax: 180,
      label: "vin til julemad",
    },
    relatedGuides: [
      "vin-til-juleaften",
      "vin-til-julemad-den-store-guide",
      "vin-til-flaesketesteg",
      "bedste-portvin",
    ],
    ingredients: [
      "1,2 kg rødkål, finthakket",
      "150 ml rød portvin",
      "2 dl æbleeddike eller rødvinseddike",
      "2 æbler, skrællet og hakket",
      "1 løg, finthakket",
      "2 spsk smør",
      "3 spsk sukker",
      "2 laurbærblade",
      "4 nelliker",
      "1 kanelstang (valgfrit)",
      "1 tsk salt",
      "Peber",
    ],
    instructions: [
      "Smelt smør i en stor gryde. Svits løg 3–4 minutter. Tilsæt rødkål og æbler — vend rundt 5 minutter.",
      "Hæld portvin og eddike i. Tilsæt sukker, laurbær, nelliker, kanel, salt og peber.",
      "Simr under låg 60–75 minutter på lav varme. Rør af og til. Kålen skal være mør men ikke grød.",
      "Smag til — mere sukker, eddike eller port efter behov. Fjern laurbær, nelliker og kanel.",
      "Server lun eller kold. Smager bedst dagen efter.",
    ],
    intro: `**Hjemmelavet rødkål med portvin** er opgraderingen af den danske juleklassiker. Hvor [rødkål med rødvin](/opskrifter/roedkaal-med-rodvin) giver frugt og syre, giver portvin ekstra dybde og en blød sødme, der balancerer eddiken. Perfekt til [glaseret skinke med Madeira](/opskrifter/glaseret-skinke-med-madeirasauce), flæskesteg eller and.`,
    why: `Rødkål + eddike er syrligt. **Portvin** tilføjer koncentreret frugt og sødme uden at gøre retten til dessert. Ruby er frugtig; tawny er mere nøddeagtig. Se [vin til juleaften](/guides/vin-til-juleaften) og [bedste portvin](/guides/bedste-portvin).`,
    tips: [
      ["Finthakket", "Jævn tekstur og kortere kogetid."],
      ["Dagen efter", "Smager dybere efter en nat i køleskab."],
      ["Balance", "Smag til — for syrlig: sukker/port. For sød: eddike."],
      ["Fedt", "En klat andefedt eller smør gør den rundere."],
    ],
    serving: `Klassisk til flæskesteg, and, gås eller skinke. Til jul: brune kartofler og brun sovs. Se også [brune kartofler med rødvin](/opskrifter/brune-kartoffler-med-rodvin).`,
    mistakes: [
      "For kort kogning — rå, hård kål.",
      "For meget sukker — marmelade-agtig.",
      "At glemme at smage til — ubalanceret syre.",
      "For høj varme — brændt bund.",
    ],
    storage: `Køleskab 5–7 dage. Frys op til 3 måneder. Genvarm blidt.`,
    glass: `Match hovedretten — pinot noir til and, Riesling eller let rød til flæskesteg. Se [vin til julemad](/guides/vin-til-julemad-den-store-guide).`,
    faq: [
      [
        "Kan jeg bruge rødvin i stedet?",
        "Ja — se [rødkål med rødvin](/opskrifter/roedkaal-med-rodvin). Port giver mere dybde.",
      ],
      [
        "Ruby eller tawny?",
        "Ruby er frugtigere og klassisk til rødkål. Tawny er blødere og nøddeagtig.",
      ],
      [
        "Skal der æbler i?",
        "Ja — de giver sødme og body. Pærer fungerer også.",
      ],
      [
        "Kan den laves en uge før jul?",
        "Absolut — den bliver kun bedre. Frys gerne i portioner.",
      ],
    ],
  }),

  r({
    slug: "andebryst-med-portvins-og-figneglasering",
    title: "Andebryst med portvins- og figneglasering",
    description:
      "Stegt andebryst med blank glasur af portvin og figner. Opskrift til 4 — moderne klassiker til jul og Mortensaften.",
    tags: ["opskrift", "and", "portvin", "figner", "jul", "mortensaften", "hovedret", "fest"],
    prepTime: "PT20M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Rød portvin — ruby eller tawny",
      amount: "150 ml portvin til glasur",
      note: "Portvin og figner reduceres til sød-syrlig glasur, der balancerer andefedtet.",
    },
    wineToDrink: {
      guideSlug: "vin-til-and",
      searchQuery: "andebryst pinot noir portvin spätburgunder",
      searchMax: 220,
      label: "vin til and",
    },
    relatedGuides: [
      "vin-til-and",
      "vin-til-juleand",
      "pinot-noir-til-and",
      "portvin-til-ost",
    ],
    ingredients: [
      "4 andebryst à ca. 180–200 g",
      "150 ml rød portvin",
      "8–10 tørrede figner, hakket (eller 6 friske i kvarte)",
      "1 dl kyllinge- eller andefond",
      "1 spsk balsamicoeddike",
      "1 spsk smør",
      "1 kvist timian",
      "Salt og peber",
    ],
    instructions: [
      "Rids skindet på andebrystene i tern uden at skære i kødet. Salt og peber.",
      "Læg brysterne skindside ned i kold pande. Steg på medium varme 8–10 minutter, til skindet er sprødt og fedtet er smeltet ud. Hæld overskydende fedt fra undervejs.",
      "Vend brysterne og steg 2–4 minutter på kødsiden til kerne ca. 54–57 °C (rosa). Tag op og hvil under folie.",
      "Hæld det meste fedt fra panden. Tilsæt port, figner, fond, balsamico og timian. Kog ind 5–7 minutter til blank glasur. Pisk smør i.",
      "Skær andebryst i skiver. Pensl eller server med figne-portvinsglasuren.",
    ],
    intro: `**Andebryst med portvins- og figneglasering** er den moderne klassiker til jul og Mortensaften: sprødt skind, rosa kød og en blank glasur, hvor portvinens sødme møder fignernes dybde. Tæt på [andebryst med brombær-rødvinssauce](/opskrifter/andebryst-med-brombaer-rodvinssauce) og [andebær-portvinsauce](/opskrifter/andebaer-portvin-sauce), men her er fignerne i centrum — som i [portvinsglaserede figner](/opskrifter/portvinsglaserede-figner-med-gedeost).`,
    why: `Andefedt er rigt. **Portvin** og figner giver sødme og syre, der skærer igennem. Reduktionen bliver til glasur, ikke til tynd sauce. Se [vin til and](/guides/vin-til-and) og [pinot noir til and](/guides/pinot-noir-til-and).`,
    tips: [
      ["Start i kold pande", "Fedtet smelter langsomt — sprødere skind."],
      ["Termometer", "54–57 °C for rosa. Andebryst tørrer hurtigt over 60 °C."],
      ["Glasur", "Skal coat'e en ske. For tynd: kog mere."],
      ["Hvile", "5–8 minutter før udskæring."],
    ],
    serving: `Server med kartoffelmos, [rødkål med portvin](/opskrifter/roedkaal-med-portvin) eller rodfrugter. Til jul: brune kartofler.`,
    mistakes: [
      "For høj varme fra start — brændt skind, rå midte.",
      "Overstegning — tørt bryst.",
      "Glasur for tidligt på panden med bryst i — brændt sukker.",
      "For sød glasur uden balsamico — klaimatisk.",
    ],
    storage: `Køleskab 2 dage. Genvarm bryst kort skindside ned; sauce separat. Frys sauce 1 måned.`,
    glass: `Pinot noir, Spätburgunder eller elegant Bourgogne — se [vin til and](/guides/vin-til-and) og [vin til juleand](/guides/vin-til-juleand).`,
    faq: [
      [
        "Tørrede eller friske figner?",
        "Tørrede giver mere koncentration. Friske er friskere — begge virker.",
      ],
      [
        "Kan jeg bruge andesteg i stedet?",
        "Ja — se [andesteg med port og hvidvin](/opskrifter/andesteg-med-port-og-hvidvin). Glasuren kan pensles til sidst.",
      ],
      [
        "Ruby eller tawny port?",
        "Ruby er frugtigere til glasur. Tawny er mere nøddeagtig.",
      ],
      [
        "Hvad med skindet?",
        "Rids og steg skindside ned — det er halvdelen af oplevelsen.",
      ],
    ],
  }),

  r({
    slug: "rodvinskage-med-mork-chokolade",
    title: "Rødvinskage med mørk chokolade",
    description:
      "Svampet skærekage hvor rødvin fremhæver chokoladens dybe noter. Opskrift til 10–12 skiver — kaffe- og dessertkage uden rå alkoholsmaq.",
    tags: ["opskrift", "dessert", "kage", "rødvin", "chokolade", "bagning"],
    prepTime: "PT25M",
    cookTime: "PT50M",
    servings: 12,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin — merlot, shiraz eller ung tempranillo (ikke for tannin-tung)",
      amount: "2 dl rødvin",
      note: "Rødvin forstærker kakaoens dybde og holder kagen saftig — smager ikke af rå alkohol efter bagning.",
    },
    wineToDrink: {
      guideSlug: "portvin-til-chokolade",
      searchQuery: "portvin chokolade dessertvin rødvinskage",
      searchMax: 200,
      label: "vin til chokoladekage",
    },
    relatedGuides: [
      "portvin-til-chokolade",
      "vin-til-chokolademousse",
      "vin-til-dessert-og-kransekage",
      "bedste-dessertvin",
    ],
    ingredients: [
      "2 dl frugtig rødvin",
      "200 g mørk chokolade (60–70 %), hakket",
      "200 g smør",
      "250 g sukker",
      "3 æg",
      "250 g hvedemel",
      "2 spsk kakao",
      "2 tsk bagepulver",
      "1 tsk vaniljesukker",
      "1 knivspids salt",
      "Evt. flormelis til drys",
    ],
    instructions: [
      "Forvarm ovn til 175 °C. Smør en springform (ca. 24 cm) og læg bagepapir i bunden.",
      "Smelt smør og chokolade over vandbad. Tag af. Rør sukker i, derefter æg ét ad gangen.",
      "Bland mel, kakao, bagepulver, vanilje og salt. Vend i chokoladeblandingen skiftevis med rødvin, til dejen er ensartet.",
      "Hæld i formen. Bag 45–55 minutter, til en pind kommer næsten ren ud (gerne lidt fugtig midte).",
      "Køl i formen 15 minutter, tag ud og køl helt. Drys flormelis ved servering.",
    ],
    intro: `**Rødvinskage med mørk chokolade** er den svampede skærekage, hvor vinen løfter kakaoen uden at smage af alkohol. Et søskende til [chokolademousse med portvin](/opskrifter/chokolademousse-med-portvin) og [chokolade-trøfler med portvin](/opskrifter/chokolade-trofler-med-portvin) — men her er det en skærekage til kaffen eller dessertbordet.`,
    why: `Rødvinens **syre og frugt** fremhæver chokoladens dybe noter, ligesom kaffe gør i mange chokoladekager. Alkoholen bager delvist væk; smagen bliver rund. Undgå meget egede, tannin-tunge vine. Se [portvin til chokolade](/guides/portvin-til-chokolade) og [vin til chokolademousse](/guides/vin-til-chokolademousse).`,
    tips: [
      ["Chokolade", "60–70 % — for mørk bliver bitter, for lys bliver sød."],
      ["Vin", "Frugtig merlot/shiraz. Undgå dyr Barolo i kagen."],
      ["Bagning", "Hellere lidt underbagt end tør."],
      ["Dagen efter", "Smager ofte bedre og er nemmere at skære."],
    ],
    serving: `Server med flødeskum, creme fraiche eller vaniljeis. Til dessertvin: tawny port eller [zabaglione](/opskrifter/zabaglione-med-hvidvin) ved siden af.`,
    mistakes: [
      "Overbagning — tør kage.",
      "For tannin-tung vin — bitter eftersmag.",
      "At erstatte al væske med vin uden fedt — flad krumme.",
      "For lav chokoladeprocent — sukkerbombe.",
    ],
    storage: `Lufttæt 4–5 dage ved stuetemperatur. Frys skiver op til 2 måneder.`,
    glass: `Tawny port, Banyuls eller kaffe. Se [portvin til chokolade](/guides/portvin-til-chokolade) og [dessertvin](/guides/bedste-dessertvin).`,
    faq: [
      [
        "Smager kagen af vin?",
        "Nej — mere af dyb chokolade. Børn og gæster opdager det sjældent.",
      ],
      [
        "Kan jeg bruge portvin i dejen?",
        "Ja, 1–1½ dl tawny/ruby i stedet for noget af rødvinen — lidt sødere resultat.",
      ],
      [
        "Glutenfri?",
        "Prøv en 1:1 glutenfri melblanding; teksturen kan blive lidt mere smuldret.",
      ],
      [
        "Kan den bages som muffins?",
        "Ja — ca. 18–22 minutter ved 175 °C.",
      ],
    ],
  }),

  r({
    slug: "moscato-dasti-sorbet",
    title: "Moscato d'Asti sorbet",
    description:
      "Forfriskende issorbet lavet på sød, mousserende Moscato d'Asti. Opskrift til 6 — festlig dessert på under en time aktiv tid.",
    tags: ["opskrift", "dessert", "sorbet", "moscato", "mousserende", "italiensk", "fest"],
    prepTime: "PT20M",
    cookTime: "PT10M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Moscato d'Asti — sød, let mousserende italiensk hvidvin",
      amount: "5 dl Moscato d'Asti",
      note: "Moscato d'Asti er både væske og smag i sorbeten — sødme, blomst og let brus.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "moscato d asti dessertvin prosecco",
      searchMax: 180,
      label: "vin til dessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "bedste-dessertvin",
      "vin-til-italiensk-mad",
    ],
    ingredients: [
      "5 dl Moscato d'Asti, kold",
      "100 g sukker",
      "1 dl vand",
      "Saft af 1 citron",
      "Evt. 1 spsk vodka (holder sorbeten blødere)",
      "Friske bær til servering",
    ],
    instructions: [
      "Kog sukker og vand til sukkeret er opløst (2–3 min). Køl helt af. Rør citronsaft i.",
      "Bland siruppen med Moscato d'Asti (og evt. vodka). Smag til — skal være lidt for sød, da frysning dæmper sødmen.",
      "Hæld i ismaskine og kern efter maskinens anvisning. Uden maskine: frys i flad bakke, riv/rør med gaffel hver 30–40 min i 3–4 timer.",
      "Server straks, eller frys lufttæt op til 1 uge. Tag ud 5–10 min før servering.",
      "Pynt med friske bær.",
    ],
    intro: `**Moscato d'Asti sorbet** er den lette, festlige dessert, hvor den søde piemontesiske mousserende vin bliver til is. Tæt på [champagne-jordbærsorbet](/opskrifter/champagne-jordbaersorbet), men med Moscatos blomster- og ferskensmag. Perfekt efter en tung hovedret — eller som pause mellem [zabaglione](/opskrifter/zabaglione-med-hvidvin) og kaffen.`,
    why: `Moscato d'Asti har **lav alkohol, høj sødme og aroma**. I sorbet giver den smag, som vand+sukker ikke kan. Brus forsvinder delvist; det er normalt. Lidt citron holder smagen skarp. Se [dessertvin](/guides/bedste-dessertvin) og [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    tips: [
      ["Kold vin", "Bevarer mere aroma."],
      ["For sød sirup", "Frysning dæmper sødme — smag til før frysning."],
      ["Vodka", "Valgfri — sænker frysepunktet, blødere scoop."],
      ["Ismaskine", "Giver finest tekstur, men gaffel-metoden virker."],
    ],
    serving: `Server i kolde glas med bær eller et stænk ekstra Moscato over. Passer til [mousserende vingelé med bær](/opskrifter/mousserende-vingele-med-friske-baer).`,
    mistakes: [
      "For lidt sukker — iset, hård sorbet.",
      "At koge vinen — aroma forsvinder.",
      "At servere lige fra dybfrys — for hård; lad den stå 5–10 min.",
      "Meget sød dessertvin uden citron — flad smag.",
    ],
    storage: `Fryser 1 uge lufttæt. Bedst inden for 3–4 dage. Omrør/skrabe før servering hvis den er meget hård.`,
    glass: `Samme Moscato d'Asti i glasset — eller et glas Prosecco. Se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      [
        "Kan jeg bruge Prosecco?",
        "Ja, men tilsæt mere sukker — Prosecco er tørrere. Moscato er sødere fra start.",
      ],
      [
        "Er der alkohol i den færdige sorbet?",
        "Noget forsvinder ikke ved frysning. Den er ikke alkoholfri.",
      ],
      [
        "Uden ismaskine?",
        "Ja — frys og rør med gaffel flere gange, eller blend den næsten færdige is kort.",
      ],
      [
        "Kan jeg tilsætte frugtpuré?",
        "Ja — fersken eller jordbær (1–2 dl) passer godt. Reducer evt. lidt sukker.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "portvin-til-ost": [
    { slug: "kyllingeleverparfait-med-portvinsgele", label: "Kyllingeleverparfait med portvinsgelé" },
    { slug: "andebryst-med-portvins-og-figneglasering", label: "Andebryst med portvins-figneglasering" },
  ],
  "bedste-portvin": [
    { slug: "kyllingeleverparfait-med-portvinsgele", label: "Kyllingeleverparfait med portvinsgelé" },
    { slug: "roedkaal-med-portvin", label: "Rødkål med portvin" },
  ],
  "hvad-er-portvin": [
    { slug: "kyllingeleverparfait-med-portvinsgele", label: "Kyllingeleverparfait med portvinsgelé" },
  ],
  "sadan-serverer-du-portvin": [
    { slug: "kyllingeleverparfait-med-portvinsgele", label: "Kyllingeleverparfait med portvinsgelé" },
  ],
  "vin-til-juleaften": [
    { slug: "roedkaal-med-portvin", label: "Rødkål med portvin" },
    { slug: "andebryst-med-portvins-og-figneglasering", label: "Andebryst med portvins-figneglasering" },
  ],
  "vin-til-julemad-den-store-guide": [
    { slug: "roedkaal-med-portvin", label: "Rødkål med portvin" },
  ],
  "vin-til-flaesketesteg": [
    { slug: "roedkaal-med-portvin", label: "Rødkål med portvin" },
  ],
  "vin-til-and": [
    { slug: "andebryst-med-portvins-og-figneglasering", label: "Andebryst med portvins-figneglasering" },
  ],
  "vin-til-juleand": [
    { slug: "andebryst-med-portvins-og-figneglasering", label: "Andebryst med portvins-figneglasering" },
  ],
  "pinot-noir-til-and": [
    { slug: "andebryst-med-portvins-og-figneglasering", label: "Andebryst med portvins-figneglasering" },
  ],
  "portvin-til-chokolade": [
    { slug: "rodvinskage-med-mork-chokolade", label: "Rødvinskage med mørk chokolade" },
  ],
  "vin-til-chokolademousse": [
    { slug: "rodvinskage-med-mork-chokolade", label: "Rødvinskage med mørk chokolade" },
  ],
  "vin-til-dessert-og-kransekage": [
    { slug: "rodvinskage-med-mork-chokolade", label: "Rødvinskage med mørk chokolade" },
    { slug: "moscato-dasti-sorbet", label: "Moscato d'Asti sorbet" },
  ],
  "bedste-dessertvin": [
    { slug: "moscato-dasti-sorbet", label: "Moscato d'Asti sorbet" },
    { slug: "rodvinskage-med-mork-chokolade", label: "Rødvinskage med mørk chokolade" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "moscato-dasti-sorbet", label: "Moscato d'Asti sorbet" },
  ],
};
