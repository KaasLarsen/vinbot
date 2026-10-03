/** Auto-genereret af scripts/generate-micro-pairings.mjs. Ret kataloget og kør scriptet igen. */

export type MicroPairing = {
  slug: string;
  label: string;
  parentSlug: string;
  parentLabel: string;
  dish: string;
  delta: string;
  defaultWine: string;
  altWine: string;
  avoidWine: string;
  searchQuery: string;
};

export const MICRO_PAIRINGS: MicroPairing[] = [
  {
    "slug": "vin-til-lasagne-med-kylling",
    "label": "Vin til lasagne med kylling",
    "parentSlug": "vin-til-lasagne",
    "parentLabel": "Vin til lasagne",
    "dish": "lasagne med kylling",
    "delta": "Kylling er magrere end oksekød, så tanninen skal ned i forhold til klassisk kødsovs-lasagne.",
    "defaultWine": "pinot noir",
    "altWine": "gamay",
    "avoidWine": "primitivo",
    "searchQuery": "pinot noir gamay barbera"
  },
  {
    "slug": "vin-til-lasagne-med-spinat-og-ricotta",
    "label": "Vin til lasagne med spinat og ricotta",
    "parentSlug": "vin-til-lasagne",
    "parentLabel": "Vin til lasagne",
    "dish": "lasagne med spinat og ricotta",
    "delta": "Uden kød giver ricotta fedme og spinat grøn bitterhed. Hvidvin med syre slår rød tannin.",
    "defaultWine": "verdicchio",
    "altWine": "soave",
    "avoidWine": "cabernet sauvignon",
    "searchQuery": "verdicchio soave chardonnay"
  },
  {
    "slug": "vin-til-vegetarisk-lasagne-med-linser",
    "label": "Vin til vegetarisk lasagne med linser",
    "parentSlug": "vin-til-vegetar-og-gront",
    "parentLabel": "Vin til vegetar og grønt",
    "dish": "vegetarisk lasagne med linser",
    "delta": "Linser giver jord og umami uden kød. En syrerig let rød dur; tung malbec bliver for meget.",
    "defaultWine": "barbera",
    "altWine": "sangiovese",
    "avoidWine": "malbec",
    "searchQuery": "barbera sangiovese"
  },
  {
    "slug": "vin-til-bolognese-med-floede",
    "label": "Vin til bolognese med fløde",
    "parentSlug": "vin-til-bolognese",
    "parentLabel": "Vin til bolognese",
    "dish": "bolognese med fløde",
    "delta": "Fløde dæmper tomatsyren, så vinen skal være blødere end den skarpe sangiovese til ren tomatsovs.",
    "defaultWine": "dolcetto",
    "altWine": "barbera",
    "avoidWine": "nebbiolo",
    "searchQuery": "dolcetto barbera"
  },
  {
    "slug": "vin-til-pasta-med-pesto-og-kylling",
    "label": "Vin til pasta med pesto og kylling",
    "parentSlug": "vin-til-pizza-og-pasta",
    "parentLabel": "Vin til pizza og pasta",
    "dish": "pasta med pesto og kylling",
    "delta": "Pesto er urter, hvidløg og olie, ikke tomat. Hvidvin med urt og syre passer bedre end rød til pizzasovs.",
    "defaultWine": "vermentino",
    "altWine": "sauvignon blanc",
    "avoidWine": "primitivo",
    "searchQuery": "vermentino sauvignon blanc"
  },
  {
    "slug": "vin-til-pasta-med-svampe-og-floede",
    "label": "Vin til pasta med svampe og fløde",
    "parentSlug": "vin-til-carbonara",
    "parentLabel": "Vin til carbonara",
    "dish": "pasta med svampe og fløde",
    "delta": "Svampe-umami og fløde uden æg og guanciale. Let pinot slår den fyldige hvidvin til klassisk carbonara.",
    "defaultWine": "pinot noir",
    "altWine": "chardonnay",
    "avoidWine": "cabernet sauvignon",
    "searchQuery": "pinot noir chardonnay"
  },
  {
    "slug": "vin-til-carbonara-med-aerter",
    "label": "Vin til carbonara med ærter",
    "parentSlug": "vin-til-carbonara",
    "parentLabel": "Vin til carbonara",
    "dish": "carbonara med ærter",
    "delta": "Ærter tilføjer sødme og grønt, så vinen skal have mere syre end til ren carbonara.",
    "defaultWine": "soave",
    "altWine": "gavi",
    "avoidWine": "chardonnay",
    "searchQuery": "soave gavi"
  },
  {
    "slug": "vin-til-lasagne-med-okse-og-bechamel",
    "label": "Vin til lasagne med okse og bechamel",
    "parentSlug": "vin-til-lasagne",
    "parentLabel": "Vin til lasagne",
    "dish": "lasagne med okse og meget bechamel",
    "delta": "Ekstra bechamel-fedme kræver mere frugt og fylde end en tynd tomatlasagne.",
    "defaultWine": "montepulciano",
    "altWine": "sangiovese",
    "avoidWine": "sauvignon blanc",
    "searchQuery": "montepulciano sangiovese"
  },
  {
    "slug": "vin-til-burger-med-troeffelmayo",
    "label": "Vin til hjemmelavet burger med trøffelmayo",
    "parentSlug": "vin-til-burger",
    "parentLabel": "Vin til burger",
    "dish": "hjemmelavet burger med trøffelmayo",
    "delta": "Trøffelmayo er umami og fedme. Sød zinfandel bliver for marmeladeagtig. Pinot eller nebbiolo følger svampen.",
    "defaultWine": "pinot noir",
    "altWine": "nebbiolo",
    "avoidWine": "zinfandel",
    "searchQuery": "pinot noir nebbiolo"
  },
  {
    "slug": "vin-til-burger-med-avocado-og-jalapeno",
    "label": "Vin til burger med avocado og jalapeño",
    "parentSlug": "vin-til-burger",
    "parentLabel": "Vin til burger",
    "dish": "burger med avocado og jalapeño",
    "delta": "Jalapeño og avocado er frisk varme og grøn fedme. Halvtør riesling eller rosé slår zinfandel til baconburger.",
    "defaultWine": "riesling",
    "altWine": "rosé",
    "avoidWine": "zinfandel",
    "searchQuery": "riesling rose"
  },
  {
    "slug": "vin-til-kyllingeburger-med-avocado",
    "label": "Vin til kyllingeburger med avocado",
    "parentSlug": "vin-til-kylling-og-lyst-koed",
    "parentLabel": "Vin til kylling og lyst kød",
    "dish": "kyllingeburger med avocadocreme",
    "delta": "Kylling og avocado er magert og cremet uden oksekødets jern. Frisk hvid, ikke burger-zinfandel.",
    "defaultWine": "sauvignon blanc",
    "altWine": "riesling",
    "avoidWine": "zinfandel",
    "searchQuery": "sauvignon blanc riesling"
  },
  {
    "slug": "vin-til-vegetarburger-med-svampe",
    "label": "Vin til vegetarburger med svampe",
    "parentSlug": "vin-til-burger",
    "parentLabel": "Vin til burger",
    "dish": "vegetarburger med svampe",
    "delta": "Svampeburger har umami uden oksefede. Let pinot eller gamay, ikke kraftig malbec.",
    "defaultWine": "pinot noir",
    "altWine": "gamay",
    "avoidWine": "malbec",
    "searchQuery": "pinot noir gamay"
  },
  {
    "slug": "vin-til-burger-med-blaaskimmel",
    "label": "Vin til burger med blåskimmelost",
    "parentSlug": "vin-til-burger",
    "parentLabel": "Vin til burger",
    "dish": "burger med blåskimmelost",
    "delta": "Blåskimmel er salt og skarp. Halvtør riesling eller moden frugtig rød. Tør cabernet bliver bitter.",
    "defaultWine": "riesling",
    "altWine": "zinfandel",
    "avoidWine": "cabernet sauvignon",
    "searchQuery": "riesling zinfandel"
  },
  {
    "slug": "vin-til-fiskeburger-med-remoulade",
    "label": "Vin til fiskeburger med remoulade",
    "parentSlug": "vin-til-fisk-og-chips",
    "parentLabel": "Vin til fish and chips",
    "dish": "fiskeburger med remoulade",
    "delta": "Remoulade er fed og syrlig. Bobler eller albariño skærer fedmen. Rødvin til okseburger duer ikke.",
    "defaultWine": "albariño",
    "altWine": "cava",
    "avoidWine": "zinfandel",
    "searchQuery": "albarino cava"
  },
  {
    "slug": "vin-til-vegetarisk-chili-con-carne",
    "label": "Vin til vegetarisk chili con carne",
    "parentSlug": "vin-til-chili-con-carne",
    "parentLabel": "Vin til chili con carne",
    "dish": "vegetarisk chili con carne",
    "delta": "Bønner og røg uden oksekød. Saftig garnacha eller barbera, ikke den tunge malbec til kødbaseret chili.",
    "defaultWine": "garnacha",
    "altWine": "barbera",
    "avoidWine": "malbec",
    "searchQuery": "garnacha barbera"
  },
  {
    "slug": "vin-til-chili-med-chokolade",
    "label": "Vin til chili med chokolade",
    "parentSlug": "vin-til-chili-con-carne",
    "parentLabel": "Vin til chili con carne",
    "dish": "chili con carne med mørk chokolade",
    "delta": "Mørk chokolade i sovsen vil have moden, blød frugt. Primitivo følger kakaobitterheden. Skarp hvidvin gør den metallisk.",
    "defaultWine": "primitivo",
    "altWine": "zinfandel",
    "avoidWine": "sauvignon blanc",
    "searchQuery": "primitivo zinfandel"
  },
  {
    "slug": "vin-til-hvid-chili-med-kylling",
    "label": "Vin til hvid chili med kylling",
    "parentSlug": "vin-til-kylling-og-lyst-koed",
    "parentLabel": "Vin til kylling og lyst kød",
    "dish": "hvid chili med kylling",
    "delta": "Hvid chili er mild og cremet uden tomat. Halvtør riesling eller grüner. Malbec til rød chili er for tung.",
    "defaultWine": "riesling",
    "altWine": "grüner veltliner",
    "avoidWine": "malbec",
    "searchQuery": "riesling gruner veltliner"
  },
  {
    "slug": "vin-til-chili-med-majskolber",
    "label": "Vin til chili med majs",
    "parentSlug": "vin-til-chili-con-carne",
    "parentLabel": "Vin til chili con carne",
    "dish": "chili con carne med majs",
    "delta": "Majs tilføjer sødme ved siden af chilien. Let gamay frem for tung shiraz.",
    "defaultWine": "gamay",
    "altWine": "garnacha",
    "avoidWine": "shiraz",
    "searchQuery": "gamay garnacha"
  },
  {
    "slug": "vin-til-kylling-i-karry-med-kokos",
    "label": "Vin til kylling i karry med kokos",
    "parentSlug": "vin-til-karryretter",
    "parentLabel": "Vin til karryretter",
    "dish": "kylling i karry med kokosmælk",
    "delta": "Kokosmælk gør karryen rund og sød. Halvtør riesling eller gewürztraminer. Tør sauvignon bliver skarp mod chilien.",
    "defaultWine": "riesling",
    "altWine": "gewürztraminer",
    "avoidWine": "sauvignon blanc",
    "searchQuery": "riesling gewurztraminer"
  },
  {
    "slug": "vin-til-stegt-kylling-med-citron",
    "label": "Vin til stegt kylling med citron",
    "parentSlug": "vin-til-kylling-og-lyst-koed",
    "parentLabel": "Vin til kylling og lyst kød",
    "dish": "stegt kylling med citron",
    "delta": "Citron og stegeskorpe vil have høj syre. Sauvignon eller assyrtiko. Fadlagret chardonnay bliver smørret mod citronen.",
    "defaultWine": "sauvignon blanc",
    "altWine": "assyrtiko",
    "avoidWine": "chardonnay",
    "searchQuery": "sauvignon blanc assyrtiko"
  },
  {
    "slug": "vin-til-kylling-i-floedesovs",
    "label": "Vin til kylling i flødesovs",
    "parentSlug": "vin-til-kylling-og-lyst-koed",
    "parentLabel": "Vin til kylling og lyst kød",
    "dish": "kylling i flødesovs",
    "delta": "Flødesovs dækker den friske syre. Fyldig chardonnay eller let pinot. Skarp sauvignon skærer sovsen over.",
    "defaultWine": "chardonnay",
    "altWine": "pinot noir",
    "avoidWine": "sauvignon blanc",
    "searchQuery": "chardonnay pinot noir"
  },
  {
    "slug": "vin-til-butter-chicken-med-mangochutney",
    "label": "Vin til butter chicken med mangochutney",
    "parentSlug": "vin-til-butter-chicken",
    "parentLabel": "Vin til butter chicken",
    "dish": "butter chicken med mangochutney",
    "delta": "Mangochutney er sød og frugtig ved siden af den cremede sovs. Halvtør riesling. Tør cabernet forstærker chilien.",
    "defaultWine": "riesling",
    "altWine": "gewürztraminer",
    "avoidWine": "cabernet sauvignon",
    "searchQuery": "riesling gewurztraminer"
  },
  {
    "slug": "vin-til-kylling-i-tomatsovs-med-oliven",
    "label": "Vin til kylling i tomatsovs med oliven",
    "parentSlug": "vin-til-kylling-og-lyst-koed",
    "parentLabel": "Vin til kylling og lyst kød",
    "dish": "kylling i tomatsovs med oliven",
    "delta": "Tomat og oliven trækker retten mod middelhavet. Sangiovese eller nero d'avola, ikke den hvide til grillet kylling.",
    "defaultWine": "sangiovese",
    "altWine": "nero d'avola",
    "avoidWine": "riesling",
    "searchQuery": "sangiovese nero d'avola"
  },
  {
    "slug": "vin-til-pulled-chicken-med-bbq",
    "label": "Vin til pulled chicken med BBQ-sovs",
    "parentSlug": "vin-til-grill-og-bbq",
    "parentLabel": "Vin til grill og BBQ",
    "dish": "pulled chicken med BBQ-sovs",
    "delta": "Sød BBQ på kylling er ikke oksegrill. Halvtør riesling følger glasuren. Tannin-tung cabernet bliver bitter.",
    "defaultWine": "riesling",
    "altWine": "zinfandel",
    "avoidWine": "cabernet sauvignon",
    "searchQuery": "riesling zinfandel"
  },
  {
    "slug": "vin-til-spareribs-med-honning",
    "label": "Vin til spareribs med honning",
    "parentSlug": "vin-til-spareribs",
    "parentLabel": "Vin til spareribs",
    "dish": "spareribs med honningglasur",
    "delta": "Honningglasur er sød. Moden zinfandel eller halvtør riesling. Knastør cabernet smager bitter mod honningen.",
    "defaultWine": "zinfandel",
    "altWine": "riesling",
    "avoidWine": "cabernet sauvignon",
    "searchQuery": "zinfandel riesling"
  },
  {
    "slug": "vin-til-grillet-majs-med-chili-smoer",
    "label": "Vin til grillet majs med chilibutter",
    "parentSlug": "vin-til-grill-og-bbq",
    "parentLabel": "Vin til grill og BBQ",
    "dish": "grillet majs med chilibutter",
    "delta": "Majs, chili og smør er sødt, stærkt og fedt uden kød. Bobler eller albariño. Shiraz til bøf er for tung.",
    "defaultWine": "cava",
    "altWine": "albariño",
    "avoidWine": "shiraz",
    "searchQuery": "cava albarino"
  },
  {
    "slug": "vin-til-grillet-laks-med-dild",
    "label": "Vin til grillet laks med dild",
    "parentSlug": "vin-til-laks",
    "parentLabel": "Vin til laks",
    "dish": "grillet laks med dild",
    "delta": "Dild og grill vil have urtet, kølig hvid. Sauvignon eller albariño. Kraftig zinfandel hører til grillet kød, ikke til dild.",
    "defaultWine": "sauvignon blanc",
    "altWine": "albariño",
    "avoidWine": "zinfandel",
    "searchQuery": "sauvignon blanc albarino"
  },
  {
    "slug": "vin-til-entrecote-med-pebersovs",
    "label": "Vin til entrecôte med pebersovs",
    "parentSlug": "vin-til-boeff",
    "parentLabel": "Vin til bøf",
    "dish": "entrecôte med pebersovs",
    "delta": "Peber og fløde vil have krydret syrah eller malbec. Tynd pinot drukner i sovsen.",
    "defaultWine": "syrah",
    "altWine": "malbec",
    "avoidWine": "pinot noir",
    "searchQuery": "syrah malbec"
  },
  {
    "slug": "vin-til-poelsehorn-med-ketchup",
    "label": "Vin til pølsehorn med ketchup",
    "parentSlug": "vin-til-grill-og-bbq",
    "parentLabel": "Vin til grill og BBQ",
    "dish": "pølsehorn med ketchup og sennep",
    "delta": "Ketchup og sennep er sødt og syrligt. Lambrusco eller gamay. Kraftig shiraz bliver bitter mod ketchup.",
    "defaultWine": "lambrusco",
    "altWine": "gamay",
    "avoidWine": "shiraz",
    "searchQuery": "lambrusco gamay"
  },
  {
    "slug": "vin-til-grillet-halloumi-med-honning",
    "label": "Vin til grillet halloumi med honning",
    "parentSlug": "vin-til-grillet-gront",
    "parentLabel": "Vin til grillet grønt",
    "dish": "grillet halloumi med honning",
    "delta": "Salt ost og honning. Assyrtiko eller sauvignon skærer saltet. Sød sauternes er for meget til grillosten.",
    "defaultWine": "assyrtiko",
    "altWine": "sauvignon blanc",
    "avoidWine": "sauternes",
    "searchQuery": "assyrtiko sauvignon blanc"
  },
  {
    "slug": "vin-til-fiskefrikadeller-med-remoulade",
    "label": "Vin til fiskefrikadeller med remoulade",
    "parentSlug": "vin-til-fisk-og-skaldyr",
    "parentLabel": "Vin til fisk og skaldyr",
    "dish": "fiskefrikadeller med remoulade",
    "delta": "Remoulade er fed og eddikesyrlig. Albariño eller muscadet. Rødvin til kødfrikadeller duer ikke her.",
    "defaultWine": "albariño",
    "altWine": "muscadet",
    "avoidWine": "pinot noir",
    "searchQuery": "albarino muscadet"
  },
  {
    "slug": "vin-til-dampet-torsk-med-beurre-blanc",
    "label": "Vin til dampet torsk med beurre blanc",
    "parentSlug": "vin-til-torsk",
    "parentLabel": "Vin til torsk",
    "dish": "dampet torsk med beurre blanc",
    "delta": "Smørsovs vil have rund, kølig chardonnay. Skarp sauvignon slår smørret i stykker.",
    "defaultWine": "chardonnay",
    "altWine": "pinot blanc",
    "avoidWine": "sauvignon blanc",
    "searchQuery": "chardonnay pinot blanc"
  },
  {
    "slug": "vin-til-laks-med-teriyaki",
    "label": "Vin til laks med teriyaki",
    "parentSlug": "vin-til-laks",
    "parentLabel": "Vin til laks",
    "dish": "laks med teriyaki",
    "delta": "Teriyaki er sød soja. Halvtør riesling eller pinot. Tør sauvignon bliver metallisk mod sojaen.",
    "defaultWine": "riesling",
    "altWine": "pinot noir",
    "avoidWine": "sauvignon blanc",
    "searchQuery": "riesling pinot noir"
  },
  {
    "slug": "vin-til-rejer-med-hvidloeg-og-chili",
    "label": "Vin til rejer med hvidløg og chili",
    "parentSlug": "vin-til-rejer",
    "parentLabel": "Vin til rejer",
    "dish": "rejer med hvidløg og chili",
    "delta": "Hvidløg og chili skruer varmen op. Halvtør riesling dæmper. Knastør muscadet forstærker brændingen.",
    "defaultWine": "riesling",
    "altWine": "albariño",
    "avoidWine": "muscadet",
    "searchQuery": "riesling albarino"
  },
  {
    "slug": "vin-til-fish-and-chips-med-aertemos",
    "label": "Vin til fish and chips med ærtemos",
    "parentSlug": "vin-til-fisk-og-chips",
    "parentLabel": "Vin til fish and chips",
    "dish": "fish and chips med ærtemos",
    "delta": "Ærtemos er sød og blød ved siden af friture. Bobler skærer dej og ærter. Tør malbec duer ikke.",
    "defaultWine": "cava",
    "altWine": "crémant",
    "avoidWine": "malbec",
    "searchQuery": "cava cremant"
  },
  {
    "slug": "vin-til-sushi-med-krydret-tun",
    "label": "Vin til sushi med krydret tun",
    "parentSlug": "vin-til-sushi",
    "parentLabel": "Vin til sushi",
    "dish": "sushi med krydret tun",
    "delta": "Krydret mayo og tun er fedt og stærkt. Halvtør riesling. Tør champagne til klassisk nigiri bliver skarp her.",
    "defaultWine": "riesling",
    "altWine": "gewürztraminer",
    "avoidWine": "champagne",
    "searchQuery": "riesling gewurztraminer"
  },
  {
    "slug": "vin-til-tacos-med-kylling-og-lime",
    "label": "Vin til tacos med kylling og lime",
    "parentSlug": "vin-til-tacos",
    "parentLabel": "Vin til tacos",
    "dish": "tacos med kylling og lime",
    "delta": "Kylling og lime er lettere og mere syre end oksetacos. Sauvignon eller torrontés, ikke malbec.",
    "defaultWine": "sauvignon blanc",
    "altWine": "torrontés",
    "avoidWine": "malbec",
    "searchQuery": "sauvignon blanc torrontes"
  },
  {
    "slug": "vin-til-wok-med-okse-og-oestersovs",
    "label": "Vin til wok med okse og østerssovs",
    "parentSlug": "vin-til-wok",
    "parentLabel": "Vin til wok",
    "dish": "wok med oksekød og østerssovs",
    "delta": "Østerssovs er salt umami. Pinot noir eller let syrah. Sød gewürztraminer til en mild grøntsags-wok passer ikke.",
    "defaultWine": "pinot noir",
    "altWine": "syrah",
    "avoidWine": "gewürztraminer",
    "searchQuery": "pinot noir syrah"
  },
  {
    "slug": "vin-til-frikadeller-med-brun-sovs",
    "label": "Vin til frikadeller med brun sovs",
    "parentSlug": "vin-til-frikadeller",
    "parentLabel": "Vin til frikadeller",
    "dish": "frikadeller med brun sovs",
    "delta": "Brun sovs er fed og blød. Blød pinot eller gamay. Skarp sauvignon til syltede rødbeder er forkert her.",
    "defaultWine": "pinot noir",
    "altWine": "gamay",
    "avoidWine": "sauvignon blanc",
    "searchQuery": "pinot noir gamay"
  },
  {
    "slug": "vin-til-paella-med-skaldyr",
    "label": "Vin til paella med skaldyr",
    "parentSlug": "vin-til-paella",
    "parentLabel": "Vin til paella",
    "dish": "paella med skaldyr",
    "delta": "Skaldyr og safran uden kød. Albariño eller verdejo. Tempranillo til kød-paella bliver for tung.",
    "defaultWine": "albariño",
    "altWine": "verdejo",
    "avoidWine": "tempranillo",
    "searchQuery": "albarino verdejo"
  }
];

export function microPairingBySlug(slug: string): MicroPairing | undefined {
  return MICRO_PAIRINGS.find((item) => item.slug === slug);
}

export function microPairingsForParent(parentSlug: string): MicroPairing[] {
  return MICRO_PAIRINGS.filter((item) => item.parentSlug === parentSlug);
}
