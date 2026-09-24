/** Fibermaxxing recipes batch 2 — svampe, salater, snacks. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-24";

export const SLUG_EXPANSIONS = {
  "hvidvins-confiterede-portobellos":
    "Portobellos langsomt confiteret i olie, hvidvin og hvidløg — mør som steak. Adskilt fra grillede-portobello-med-parmesan.",
  "sprodstegte-oestershatte-med-bearnaise":
    "Østershatte stegt sprøde som bacon med hvidvins-bearnaise. Link til bearnaisesauce-med-hvidvin.",
  "raamarineret-spidskaalssalat":
    "Spidskål masseret med hindbær-rødvinsvinaigrette — maksimal crunch.",
  "broccolisalat-med-portvins-baconjam":
    "Broccolisalat med cremefraiche og portvins-baconmarmelade. Link til portvins-baconmarmelade.",
  "hvidvinssyltede-sennepsfro":
    "Sennepsfrø syltet i hvidvinslage — caviar-style pop. Adskilt fra sherrysyltede-sennepsfro.",
  "fuldkorns-taralli-med-hvidvin":
    "Taralli på fuldkornsmel med hvidvin — fiber-opgradering af taralli-med-hvidvin.",
  "ristede-graeskarkerner-i-rodvinssalt":
    "Græskarkerner ristet og vendt i salt infuseret med reduceret rødvin.",
  "grov-focaccia-med-hvidvin":
    "Focaccia på groft mel vædet med hvidvin og rosmarin. Variant af focaccia-med-hvidvin.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "fibermaxxing-vinost-gront": [
    { slug: "hvidvins-confiterede-portobellos", label: "Confiterede portobellos" },
    { slug: "raamarineret-spidskaalssalat", label: "Råmarineret spidskålssalat" },
    { slug: "fuldkorns-taralli-med-hvidvin", label: "Fuldkorns-taralli" },
    { slug: "grov-focaccia-med-hvidvin", label: "Grov focaccia" },
  ],
  "vin-til-crunch": [
    { slug: "raamarineret-spidskaalssalat", label: "Spidskålssalat" },
    { slug: "sprodstegte-oestershatte-med-bearnaise", label: "Sprøde østershatte" },
    { slug: "hvidvinssyltede-sennepsfro", label: "Hvidvinssyltede sennepsfrø" },
    { slug: "ristede-graeskarkerner-i-rodvinssalt", label: "Græskarkerner i rødvinssalt" },
    { slug: "fuldkorns-taralli-med-hvidvin", label: "Fuldkorns-taralli" },
  ],
  "umami-uden-koed-vin": [
    { slug: "hvidvins-confiterede-portobellos", label: "Confiterede portobellos" },
    { slug: "sprodstegte-oestershatte-med-bearnaise", label: "Østershatte med béarnaise" },
    { slug: "broccolisalat-med-portvins-baconjam", label: "Broccolisalat med baconjam" },
  ],
  "vin-til-svampe": [
    { slug: "hvidvins-confiterede-portobellos", label: "Confiterede portobellos" },
    { slug: "sprodstegte-oestershatte-med-bearnaise", label: "Sprøde østershatte" },
  ],
  "vin-til-tapas": [
    { slug: "fuldkorns-taralli-med-hvidvin", label: "Fuldkorns-taralli" },
    { slug: "ristede-graeskarkerner-i-rodvinssalt", label: "Græskarkerner" },
    { slug: "hvidvinssyltede-sennepsfro", label: "Syltede sennepsfrø" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "grov-focaccia-med-hvidvin", label: "Grov focaccia" },
    { slug: "fuldkorns-taralli-med-hvidvin", label: "Fuldkorns-taralli" },
  ],
};

export const RECIPES = [
  r({
    slug: "hvidvins-confiterede-portobellos",
    title: "Hvidvins-confiterede portobellosvampe",
    description:
      "Store portobellos langsomt tilberedt i olivenolie, hvidvin og hvidløg til mør, steak-agtig struktur. Opskrift til 4.",
    tags: ["opskrift", "portobello", "hvidvin", "vegetar", "fibermaxxing", "umami", "confit"],
    prepTime: "PT10M",
    cookTime: "PT50M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Soave, Vermentino, Pinot Grigio eller Chablis",
      amount: "1,5 dl hvidvin",
      note: "Hvidvin + olie confiterer svampene møre og aromatiske.",
    },
    wineToDrink: {
      guideSlug: "umami-uden-koed-vin",
      searchQuery: "chardonnay portobello vegetar",
      searchMax: 150,
      label: "umami uden kød",
    },
    relatedGuides: [
      "umami-uden-koed-vin",
      "vin-til-svampe",
      "fibermaxxing-vinost-gront",
      "vin-til-vegetar-og-gront",
    ],
    ingredients: [
      "4 store portobellosvampe, stilke fjernet",
      "2 dl olivenolie (nok til at dække delvist)",
      "1,5 dl tør hvidvin",
      "6 fed hvidløg, knuste",
      "2 kviste timian, 1 rosmarinkvist",
      "1 tsk peberkorn, salt",
      "Evt. citronskal",
    ],
    instructions: [
      "Læg portobellos i ovnfast fad (tæt). Fordel hvidløg, urter, peber. Hæld olie og hvidvin over — væsken skal nå midt på svampene.",
      "Confit i ovn 140 °C 40–50 min, vend én gang, til helt møre og koncentrerede.",
      "Tag op. Reducér lidt af lagen i pande hvis ønsket. Salt. Server hele eller skåret.",
    ],
    intro: `**Hvidvins-confiterede portobellos** er den **møre steak-erstatning**: langsom olie+vin gør strukturen silkøs. Adskilt fra [grillede portobellos med parmesan](/opskrifter/grillede-portobello-med-parmesan) — her er det confit, ikke grill. Læs [umami uden kød](/guides/umami-uden-koed-vin).`,
    why: `Lav temperatur + fedt + vin = **ekstraktion uden udtørring**. Hvidløg og urter trækker ind i kødet.`,
    tips: [
      ["Ikke for høj ovn", "Steger i stedet for confit."],
      ["Skrab gerne lameller", "Mindre vand."],
      ["Gem olie", "Til toast og salat."],
      ["Salt til sidst", "Trækker mindre væske undervejs."],
    ],
    serving: `På toast, med kartoffelmos, eller skåret over [byg-otto](/opskrifter/byg-otto-med-hvidvin-og-svampe).`,
    mistakes: [
      "For lidt væske — tørre kanter.",
      "At koge hårdt på komfur (anden teknik).",
      "For tynde champignon i stedet (bliver væk).",
      "At smide confit-olien ud.",
    ],
    storage: `Køleskab i olien 5 dage. Genopvarm forsigtigt.`,
    glass: `Chablis eller let chardonnay — eller pinot hvis du vil have rødt til umami.`,
    faq: [
      ["Grill efter confit?", "Ja — 1 min pr. side for røg."],
      ["Kun olie?", "Mister vin-aroma; tilsæt i det mindste lidt vin/eddike."],
      ["Shiitake?", "Ja i blandingen — portobello er stjernen for «steak»."],
    ],
  }),

  r({
    slug: "sprodstegte-oestershatte-med-bearnaise",
    title: "Sprødstegte østershatte med hvidvins-bearnaise",
    description:
      "Østershatte flået i strimler og stegt sprøde som bacon, serveret med hvidvins-béarnaise. Opskrift til 4.",
    tags: ["opskrift", "østershatte", "bearnaise", "hvidvin", "vegetar", "fibermaxxing", "umami"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin til béarnaise (hvidvinseddike/vin) + evt. skvæt i panden",
      amount: "Som i bearnaisesauce + evt. 2 spsk",
      note: "Sprøde østershatte + klassisk hvidvins-béarnaise.",
    },
    wineToDrink: {
      guideSlug: "vin-til-crunch",
      searchQuery: "chablis bearnaise champagne",
      searchMax: 150,
      label: "vin til crunch",
    },
    relatedGuides: [
      "vin-til-crunch",
      "umami-uden-koed-vin",
      "vin-til-svampe",
      "fibermaxxing-vinost-gront",
    ],
    ingredients: [
      "400 g østershatte",
      "2 spsk olie + 1 spsk smør",
      "Salt, peber",
      "1 portion hvidvins-béarnaise (se bearnaisesauce-med-hvidvin) eller god færdig béarnaise med estragon",
      "Evt. citronsaft",
    ],
    instructions: [
      "Riv østershatte i lange strimler på langs. Tør godt.",
      "Steg i hold på høj varme i olie/smør uden at røre de første 2–3 min. Vend, steg til kanterne er dybt brune og sprøde. Salt.",
      "Lav eller varm hvidvins-béarnaise (bearnaisesauce-med-hvidvin).",
      "Anret svampe, dryp béarnaise over (eller dip). Evt. citron.",
    ],
    intro: `**Sprødstegte østershatte med béarnaise** er vegetar-bacon: flåede hatte steges til **knasende kanter**, så dunkes i [hvidvins-béarnaise](/opskrifter/bearnaisesauce-med-hvidvin). Læs [vin til crunch](/guides/vin-til-crunch).`,
    why: `Østershatte har **fiberstruktur**, der sprødsteger; béarnaise giver fedme og estragon, som vinens syre skærer.`,
    tips: [
      ["Tørre svampe", "Vand = damp."],
      ["Ikke overfyld panden", "Ellers koges de."],
      ["Ro i starten", "Kontaktvarme = skorpe."],
      ["Béarnaise ikke kogende", "Skiller."],
    ],
    serving: `Forret, snack eller topping på [byg-otto](/opskrifter/byg-otto-med-hvidvin-og-svampe) / bøf (flexitar).`,
    mistakes: [
      "Lav varme hele vejen.",
      "At hakke i tern (mindre bacon-effekt).",
      "Kold béarnaise lige fra køl på varme svampe uden opvarmning.",
      "For meget salt før stegning (trækker væske).",
    ],
    storage: `Svampe bedst friske. Béarnaise samme dag.`,
    glass: `Chablis, Champagne eller Grüner — syre til sauce-fedme.`,
    faq: [
      ["Airfryer?", "Ja med olie-spray — hold øje."],
      ["Uden béarnaise?", "Aioli + estragon, eller bare citron."],
      ["Andre svampe?", "Shiitake kan — østershatte er bedst til «bacon»."],
    ],
  }),

  r({
    slug: "raamarineret-spidskaalssalat",
    title: "Råmarineret spidskålssalat med hindbær-vineddike",
    description:
      "Snittet spidskål masseret med vinaigrette af frugtig rødvin og hindbær — maksimal crunch. Opskrift til 4.",
    tags: ["opskrift", "spidskål", "salat", "rødvin", "vegetar", "fibermaxxing", "crunch"],
    prepTime: "PT20M",
    cookTime: "PT0M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin + rødvinseddike / hindbæreddike",
      amount: "0,5 dl rødvin + 2 spsk eddike",
      note: "Vin og eddike masseres ind i kålen — bevarer crunch, giver syre.",
    },
    wineToDrink: {
      guideSlug: "vin-til-crunch",
      searchQuery: "sauvignon blanc kål salat cava",
      searchMax: 120,
      label: "vin til crunch",
    },
    relatedGuides: [
      "vin-til-crunch",
      "fibermaxxing-vinost-gront",
      "vin-til-vegetar-og-gront",
    ],
    ingredients: [
      "1 spidskål, fint snittet",
      "0,5 dl frugtig rødvin",
      "2 spsk rødvins- eller hindbæreddike",
      "3 spsk olivenolie",
      "1 tsk honning eller sukker",
      "1 lille skalotteløg, finthakket",
      "Håndfuld friske/frosne hindbær (valgfrit)",
      "Salt, peber, evt. dijon",
      "Evt. ristede mandler eller frø",
    ],
    instructions: [
      "Pisk vin, eddike, olie, honning, skalotteløg, salt, peber (og dijon).",
      "Masser dressingen ind i spidskål 2–3 min med hænderne — kålen skal blødgøres let men knase.",
      "Vend hindbær og nødder/frø i. Smag til. Server med det samme eller efter 10 min.",
    ],
    intro: `**Råmarineret spidskålssalat** er crunch i ren form: masseret kål med **hindbær-vinvinaigrette**. Kontrast til [braiseret spidskål](/opskrifter/braiseret-spidskaal-i-hvidvin), hvor kålen er mør. Læs [vin til crunch](/guides/vin-til-crunch).`,
    why: `Syre **blødgør fibre** uden varme — maksimal knas, frisk frugt.`,
    tips: [
      ["Fint snit", "Tykkere bånd = sejere."],
      ["Massage", "Uden massage er dressingen kun på overfladen."],
      ["Ikke for sød", "Honning er balance, ikke dessert."],
      ["Bobler i glasset", "Cava/Champagne elsker kålcrunch."],
    ],
    serving: `Til grill, burger eller som let hovedret med ost. Top med [hvidvinssyltede sennepsfrø](/opskrifter/hvidvinssyltede-sennepsfro).`,
    mistakes: [
      "At lade salaten trække i timer (mister crunch).",
      "For meget olie.",
      "At bruge hvidkål uden at justere (sejere).",
      "Sød vin i dressingen uden eddike.",
    ],
    storage: `Bedst samme dag. Rester 1 dag — stadig god, mindre knas.`,
    glass: `Sauvignon Blanc, Grüner eller Brut Cava 6–9 °C.`,
    faq: [
      ["Uden hindbær?", "Kun eddike + vin — stadig godt."],
      ["Rosévin?", "Ja i dressingen."],
      ["Spidskål vs. hvidkål?", "Spidskål er sødere og mørere i rå form."],
    ],
  }),

  r({
    slug: "broccolisalat-med-portvins-baconjam",
    title: "Broccolisalat med portvins-baconjam",
    description:
      "Grove broccolibuketter med cremefraiche, toppet med portvins-baconmarmelade. Opskrift til 4.",
    tags: ["opskrift", "broccoli", "portvin", "salat", "bacon", "fibermaxxing"],
    prepTime: "PT20M",
    cookTime: "PT5M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Portvin via baconmarmelade",
      amount: "Efter portvins-baconmarmelade-opskrift",
      note: "Portvinens sødme-salt i baconjam møder rå broccoli-crunch.",
    },
    wineToDrink: {
      guideSlug: "fibermaxxing-vinost-gront",
      searchQuery: "grüner veltliner broccoli",
      searchMax: 120,
      label: "fibermaxxing vinøst grønt",
    },
    relatedGuides: [
      "fibermaxxing-vinost-gront",
      "vin-til-crunch",
      "umami-uden-koed-vin",
      "vin-til-vegetar-og-gront",
    ],
    ingredients: [
      "1 stort broccoli-hoved i små buketter (+ evt. skrællet stok i tern)",
      "1,5 dl cremefraiche eller yoghurt",
      "1 spsk citronsaft",
      "0,5 dl portvins-baconmarmelade",
      "2 spsk solsikkekerner eller mandler, ristede",
      "Salt, peber, evt. rødløg i tynde ringe",
    ],
    instructions: [
      "Blanchér broccoli 60–90 sek i saltet vand (valgfrit — eller brug helt rå). Koldtskyld, tør.",
      "Vend med cremefraiche, citron, salt og peber.",
      "Top med lun eller rumtempereret portvins-baconmarmelade og kerner. Evt. rødløg.",
    ],
    intro: `**Broccolisalat med portvins-baconjam** er salt-sød crunch: grove buketter møder den syndige [portvins-baconmarmelade](/opskrifter/portvins-baconmarmelade). Fibermaxxing med et flexitar-twist. Læs [fibermaxxing](/guides/fibermaxxing-vinost-gront).`,
    why: `Broccoli giver **rå struktur**; baconjam giver umami og sødme fra portvin — kontrast der mætter.`,
    tips: [
      ["Små buketter", "Nemmere at spise."],
      ["Tør broccoli", "Ellers fortyndes dressingen."],
      ["Jam til sidst", "Beholder karakter."],
      ["Grüner i glasset", "Peberagtig syre til broccoli."],
    ],
    serving: `Til grill, burger eller madpakke. Vegetar: brug [rødvins-løgkompot](/opskrifter/rodvins-loegkompot) i stedet for baconjam.`,
    mistakes: [
      "Overkogt broccoli — mister crunch.",
      "For kold, stiv jam lige fra køl (varm let).",
      "For meget cremefraiche.",
      "At blande jam helt ind (mister top-kontrast).",
    ],
    storage: `Salat uden jam 1 dag. Top frisk ved servering.`,
    glass: `Grüner Veltliner eller crisp chardonnay — eller let rød til bacon-sødme.`,
    faq: [
      ["Helt vegetarisk?", "Ja — løgkompot eller svampe-jam."],
      ["Uden blanchering?", "Ja — mere bitter/crunchy."],
      ["Færdig baconjam?", "Kan — men portvins-versionen er pointen."],
    ],
  }),

  r({
    slug: "hvidvinssyltede-sennepsfro",
    title: "Hvidvinssyltede sennepsfrø (caviar-style)",
    description:
      "Hele sennepsfrø syltet i hvidvinslage — syrligt pop til grønt, supper og tapas. Opskrift til 1 glas.",
    tags: ["opskrift", "sennepsfrø", "hvidvin", "syltet", "vegetar", "fibermaxxing", "tapas"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 12,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Muscadet, Sauvignon eller Pinot Grigio",
      amount: "1 dl hvidvin + 0,5 dl hvidvinseddike",
      note: "Hvidvinslage sylter frøene til caviar-agtigt pop. Adskilt fra sherry-versionen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-crunch",
      searchQuery: "muscadet champagne snack",
      searchMax: 100,
      label: "vin til crunch",
    },
    relatedGuides: [
      "vin-til-crunch",
      "fibermaxxing-vinost-gront",
      "vin-til-tapas",
    ],
    ingredients: [
      "80 g sennepsfrø (gule, eller blandet)",
      "1 dl tør hvidvin",
      "0,5 dl hvidvinseddike",
      "2 spsk sukker",
      "0,5 tsk salt",
      "Evt. 1 laurbærblad, lidt peber",
    ],
    instructions: [
      "Bring vin, eddike, sukker, salt og krydderier i kog.",
      "Tilsæt sennepsfrø. Simr blidt 8–12 min, til frøene er bløde udenpå med bid indeni.",
      "Hæld i rent glas. Køl. Klar efter et par timer — bedst efter 1 dag.",
    ],
    intro: `**Hvidvinssyltede sennepsfrø** er **caviar-style pop** til grillgrønt og supper. Søskende til [sherrysyltede sennepsfrø](/opskrifter/sherrysyltede-sennepsfro) — her er lagen lysere og skarpere. Læs [vin til crunch](/guides/vin-til-crunch).`,
    why: `Hele frø giver **tekstur**; hvidvin giver floral syre frem for sherryens nød.`,
    tips: [
      ["Simre blidt", "Hård kog = sprængte frø."],
      ["Smag lagen", "Skal være sød-syrlig."],
      ["Sterilt glas", "Længere holdbarhed."],
      ["Start småt", "Stærk smag — en tsk rækker langt."],
    ],
    serving: `På [blomkålssteak](/opskrifter/grillet-blomkaalssteak-med-rodvinssauce), toast, ost, æggemad.`,
    mistakes: [
      "For kort kogning — hårde frø.",
      "For lang — mos.",
      "At bruge færdig sennep i stedet for frø.",
      "At glemme sukker (for skarp).",
    ],
    storage: `Køleskab 3–4 uger i lagen.`,
    glass: `Muscadet, Champagne eller fino — aperitivo.`,
    faq: [
      ["Sherry-version?", "[Sherrysyltede sennepsfrø](/opskrifter/sherrysyltede-sennepsfro)."],
      ["Brune frø?", "Stærkere — bland med gule."],
      ["Uden sukker?", "Brug lidt honning — balancen mangler ellers."],
    ],
  }),

  r({
    slug: "fuldkorns-taralli-med-hvidvin",
    title: "Fuldkorns-taralli med hvidvin",
    description:
      "Sprøde taralli bagt på fuldkornsmel med hvidvin og olivenolie — fiber-aperitivo. Opskrift til ca. 40 stk.",
    tags: ["opskrift", "taralli", "fuldkorn", "hvidvin", "vegetar", "fibermaxxing", "snack"],
    prepTime: "PT30M",
    cookTime: "PT35M",
    servings: 10,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør italiensk hvid — Verdicchio, Trebbiano eller Pinot Grigio",
      amount: "1 dl hvidvin i dejen",
      note: "Hvidvin i fuldkornsdej — aroma og sprødhed.",
    },
    wineToDrink: {
      guideSlug: "vin-til-tapas",
      searchQuery: "verdicchio aperitivo taralli",
      searchMax: 120,
      label: "vin til tapas",
    },
    relatedGuides: [
      "fibermaxxing-vinost-gront",
      "vin-til-crunch",
      "vin-til-italiensk-mad",
      "vin-til-tapas",
    ],
    ingredients: [
      "250 g fuldkornshvedemel (eller 150 g fuldkorn + 100 g tipo 00)",
      "1 dl tør hvidvin",
      "0,8 dl olivenolie",
      "1 tsk salt",
      "1 tsk fennikelfrø eller sort peber",
      "Evt. 0,5 tsk tørgær (valgfrit til lettere dej)",
    ],
    instructions: [
      "Ælt mel, vin, olie, salt og fennikel til fast dej (5–8 min). Hvile 20 min.",
      "Rul pølser, form ringe. Kog i hold i letsaltet vand til de flyder (1–2 min). Dryp af.",
      "Bag 180 °C 25–35 min til dybt gyldne og tørre. Køl på rist.",
    ],
    intro: `**Fuldkorns-taralli med hvidvin** er fiber-opgraderingen af klassiske [taralli med hvidvin](/opskrifter/taralli-med-hvidvin): samme metode, grovere mel, mere bid. Læs [fibermaxxing](/guides/fibermaxxing-vinost-gront).`,
    why: `Fuldkorn giver **nød og fiber**; hvidvin holder dejen sprød og aromatisk.`,
    tips: [
      ["Bland mel", "100 % fuldkorn kan være tørt — tilsæt skvæt vin/olie."],
      ["Kog først", "Klassisk taralli-trin."],
      ["Gennembag", "Bløde midter = ikke holdbare."],
      ["Lufttæt dåse", "Holder uger."],
    ],
    serving: `Aperitivo med oliven og ost. Perfekt til [ristede græskarkerner](/opskrifter/ristede-graeskarkerner-i-rodvinssalt) på samme bræt.`,
    mistakes: [
      "For våd dej — ringe mister form.",
      "At springe kogningen over.",
      "For lav bagetid.",
      "At opbevare bløde.",
    ],
    storage: `Lufttæt 2–3 uger. Frys rå formede og bag fra frossen.`,
    glass: `Verdicchio, Prosecco Brut eller let pecorino-vin.`,
    faq: [
      ["Kun hvedemel?", "Se [taralli-med-hvidvin](/opskrifter/taralli-med-hvidvin)."],
      ["Glutenfri?", "Svært — anden snack."],
      ["Uden fennikel?", "Rosmarin eller chili."],
    ],
  }),

  r({
    slug: "ristede-graeskarkerner-i-rodvinssalt",
    title: "Ristede græskarkerner i rødvinssalt",
    description:
      "Græskarkerner ristet sprøde og vendt i salt infuseret med reduceret rødvin. Opskrift til 1 skål snack.",
    tags: ["opskrift", "græskarkerner", "rødvin", "snack", "vegetar", "fibermaxxing", "barsnack"],
    prepTime: "PT5M",
    cookTime: "PT25M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin til reduktion",
      amount: "1 dl rødvin",
      note: "Rødvin reduceres og blandes i salt — kernerne får vinøs skorpe.",
    },
    wineToDrink: {
      guideSlug: "vin-til-crunch",
      searchQuery: "fino sherry snack nødder",
      searchMax: 100,
      label: "vin til crunch",
    },
    relatedGuides: [
      "vin-til-crunch",
      "fibermaxxing-vinost-gront",
      "vin-til-tapas",
    ],
    ingredients: [
      "200 g græskarkerner (uden skal)",
      "1 dl rødvin",
      "1 spsk olie",
      "1 tsk flagesalt (eller 0,75 tsk fint)",
      "Evt. røget paprika, chili, rosmarin",
    ],
    instructions: [
      "Kog rødvin ind til 1–2 spsk tyk sirup. Køl let.",
      "Vend kerner med olie. Rist på pande eller ovn 160 °C 12–18 min under omrøring til gyldne.",
      "Bland salt med vinreduktion (og krydderier). Vend over varme kerner. Køl — bliver sprødere.",
    ],
    intro: `**Ristede græskarkerner i rødvinssalt** er den ultimative **barsnack**: fiber, knas, vinøst salt. Læs [vin til crunch](/guides/vin-til-crunch).`,
    why: `Reduktion giver **frugt og farve** til saltet; kernerne bærer crunch uden kød.`,
    tips: [
      ["Pas på brand", "Kerner går fra gyldne til brændte hurtigt."],
      ["Salt på varme", "Hæfter bedre."],
      ["Tynd reduktion", "For våd = bløde kerner."],
      ["Lufttæt", "Mister crunch i åben skål."],
    ],
    serving: `Snack til vin, på salater, eller på [broccolisalat](/opskrifter/broccolisalat-med-portvins-baconjam).`,
    mistakes: [
      "At hælde hele deciliter vin over uden reduktion.",
      "For høj ovntemperatur.",
      "At salte før ristning (kan brænde).",
      "At gemme dem fugtigt.",
    ],
    storage: `Lufttæt dåse 1–2 uger.`,
    glass: `Fino sherry, let rød eller Cava — snack-parring.`,
    faq: [
      ["Solsikkekerner?", "Ja — kortere ristetid."],
      ["Uden vin?", "Almindeligt salt — mister pointen."],
      ["Airfryer?", "Ja 150 °C, ryst ofte."],
    ],
  }),

  r({
    slug: "grov-focaccia-med-hvidvin",
    title: "Grov focaccia vædet med hvidvin og rosmarin",
    description:
      "Madbrød på groft mel, hvor dej og overflade vædes med hvidvin, olivenolie og rosmarin. Opskrift til 1 bradepande.",
    tags: ["opskrift", "focaccia", "fuldkorn", "hvidvin", "vegetar", "fibermaxxing", "brød"],
    prepTime: "PT25M",
    cookTime: "PT25M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin — Pinot Grigio, Verdicchio eller Trebbiano",
      amount: "80 ml i dej + 40 ml til overflade",
      note: "Hvidvin + olie emulsion væder grov focaccia før bagning.",
    },
    wineToDrink: {
      guideSlug: "vin-til-italiensk-mad",
      searchQuery: "pinot grigio focaccia",
      searchMax: 120,
      label: "vin til italiensk mad",
    },
    relatedGuides: [
      "fibermaxxing-vinost-gront",
      "vin-til-italiensk-mad",
      "vin-til-vegetar-og-gront",
    ],
    ingredients: [
      "300 g fuldkornshvedemel + 200 g tipo 00 (eller stærkt hvedemel)",
      "7 g tørgær",
      "3 dl lunkent vand",
      "80 ml tør hvidvin",
      "1 dl olivenolie (fordelt)",
      "2 tsk salt",
      "2 spsk frisk rosmarin",
      "Flagesalt til toppen",
      "40 ml hvidvin + 2 spsk olie til pensling",
    ],
    instructions: [
      "Rør gær i vand. Ælt med mel, 80 ml vin, 4 spsk olie og salt til blød dej. Hæv 60–90 min.",
      "Smør bradepande. Fordel dej, dimple med fingre. Hæv 30 min.",
      "Pisk 40 ml vin + 2 spsk olie. Pensl/sprøjt over. Rosmarin og flagesalt.",
      "Bag 220 °C 20–25 min til gylden. Køl kort på rist.",
    ],
    intro: `**Grov focaccia med hvidvin** er fiber-søsteren til [focaccia vædet med hvidvin](/opskrifter/focaccia-med-hvidvin): mere fuldkorn, samme vin+olie-trick, rosmarin i fokus. Læs [fibermaxxing](/guides/fibermaxxing-vinost-gront).`,
    why: `Fuldkorn giver **dybde og fiber**; hvidvin holder krummen saftig og aromatisk.`,
    tips: [
      ["Ikke for tæt dej", "Mere vand/vin hvis mel suger."],
      ["Dimples", "Klassiske focaccia-huller."],
      ["Høj varme", "Sprød bund."],
      ["Spis samme dag", "Ellers rist skiver."],
    ],
    serving: `Til [kikærte-cassoulet](/opskrifter/kikaerte-cassoulet-med-hvidvin), supper og dip i olie.`,
    mistakes: [
      "For meget fuldkorn uden ekstra væske.",
      "At springe anden hævning over.",
      "Lav ovntemperatur.",
      "At glemme salt i dejen.",
    ],
    storage: `Lufttæt 2 dage. Frys skiver. Rist før servering.`,
    glass: `Samme hvidvin som i dejen — eller Chianti til dunkning med olie.`,
    faq: [
      ["Kun hvidt mel?", "[Focaccia-med-hvidvin](/opskrifter/focaccia-med-hvidvin)."],
      ["Surdej?", "Ja — tilpas væske og tid."],
      ["Uden rosmarin?", "Timian eller oliven på toppen."],
    ],
  }),
];
