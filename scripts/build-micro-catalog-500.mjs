/**
 * Byg ~500 ekstra mikro-retter og skriv scripts/micro-pairings-catalog-extra.mjs.
 * Kør: node scripts/build-micro-catalog-500.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MICRO_DISHES as EXISTING } from "./micro-pairings-catalog.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const guidesDir = path.join(root, "content/guides");
const outPath = path.join(root, "scripts/micro-pairings-catalog-extra.mjs");

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parentExists(slug) {
  return fs.existsSync(path.join(guidesDir, `${slug}.mdx`));
}

function parentLabelFromSlug(slug) {
  const food = slug.replace(/^vin-til-/, "").replace(/-/g, " ");
  return `Vin til ${food}`;
}

/** Wine profiles keyed by modifier style. */
const PROFILES = {
  lighterRed: {
    defaultWine: "pinot noir",
    altWine: "gamay",
    avoidWine: "cabernet sauvignon",
    searchQuery: "pinot noir gamay",
  },
  juicyRed: {
    defaultWine: "garnacha",
    altWine: "barbera",
    avoidWine: "malbec",
    searchQuery: "garnacha barbera",
  },
  spicyRed: {
    defaultWine: "syrah",
    altWine: "malbec",
    avoidWine: "pinot noir",
    searchQuery: "syrah malbec",
  },
  sweetSpice: {
    defaultWine: "riesling",
    altWine: "gewürztraminer",
    avoidWine: "cabernet sauvignon",
    searchQuery: "riesling gewurztraminer",
  },
  freshWhite: {
    defaultWine: "sauvignon blanc",
    altWine: "albariño",
    avoidWine: "chardonnay",
    searchQuery: "sauvignon blanc albarino",
  },
  creamyWhite: {
    defaultWine: "chardonnay",
    altWine: "pinot blanc",
    avoidWine: "sauvignon blanc",
    searchQuery: "chardonnay pinot blanc",
  },
  herbalWhite: {
    defaultWine: "vermentino",
    altWine: "sauvignon blanc",
    avoidWine: "primitivo",
    searchQuery: "vermentino sauvignon blanc",
  },
  bubbles: {
    defaultWine: "cava",
    altWine: "crémant",
    avoidWine: "malbec",
    searchQuery: "cava cremant",
  },
  rose: {
    defaultWine: "rosé",
    altWine: "gamay",
    avoidWine: "cabernet sauvignon",
    searchQuery: "rose gamay",
  },
  italianTomato: {
    defaultWine: "sangiovese",
    altWine: "barbera",
    avoidWine: "riesling",
    searchQuery: "sangiovese barbera",
  },
  umamiRed: {
    defaultWine: "pinot noir",
    altWine: "nebbiolo",
    avoidWine: "zinfandel",
    searchQuery: "pinot noir nebbiolo",
  },
  bbqSweet: {
    defaultWine: "zinfandel",
    altWine: "riesling",
    avoidWine: "cabernet sauvignon",
    searchQuery: "zinfandel riesling",
  },
  saltyFish: {
    defaultWine: "albariño",
    altWine: "muscadet",
    avoidWine: "pinot noir",
    searchQuery: "albarino muscadet",
  },
  coconutCurry: {
    defaultWine: "riesling",
    altWine: "gewürztraminer",
    avoidWine: "sauvignon blanc",
    searchQuery: "riesling gewurztraminer",
  },
  lemonHerb: {
    defaultWine: "sauvignon blanc",
    altWine: "assyrtiko",
    avoidWine: "chardonnay",
    searchQuery: "sauvignon blanc assyrtiko",
  },
  blueCheese: {
    defaultWine: "riesling",
    altWine: "portvin",
    avoidWine: "cabernet sauvignon",
    searchQuery: "riesling portvin",
  },
  mushroom: {
    defaultWine: "pinot noir",
    altWine: "chardonnay",
    avoidWine: "cabernet sauvignon",
    searchQuery: "pinot noir chardonnay",
  },
  chiliHeat: {
    defaultWine: "riesling",
    altWine: "rosé",
    avoidWine: "zinfandel",
    searchQuery: "riesling rose",
  },
  smoky: {
    defaultWine: "syrah",
    altWine: "tempranillo",
    avoidWine: "sauvignon blanc",
    searchQuery: "syrah tempranillo",
  },
  creamyPasta: {
    defaultWine: "chardonnay",
    altWine: "soave",
    avoidWine: "cabernet sauvignon",
    searchQuery: "chardonnay soave",
  },
};

/**
 * Bases: parent must exist. dishStem is the food name after "vin til ".
 * modifiers: { part, slugPart?, profile, delta, tags?, relatedSlug? }
 */
const BASES = [
  {
    parentSlug: "vin-til-pizza",
    dishStem: "pizza",
    tag: "pizza",
    related: [{ slug: "vin-til-italiensk-mad", label: "Vin til italiensk mad" }],
    mods: [
      ["med pepperoni", "chiliHeat", "Pepperoni tilføjer fedt og krydderi, så vinen skal have frugt og lidt sødme frem for tør tannin."],
      ["med trøffel", "umamiRed", "Trøffel er umami. Let pinot følger svampen bedre end kraftig pizza-zinfandel."],
      ["med skaldyr", "saltyFish", "Skaldyrspizza vil have salt, frisk hvid. Tung rød drukner rejerne."],
      ["med pesto", "herbalWhite", "Pesto er urter og olie, ikke tomat. Vermentino slår sangiovese her."],
      ["med chilihonning", "sweetSpice", "Chilihonning er sød varme. Halvtør riesling dæmper. Tør cabernet bliver bitter."],
      ["bianca med svampe", "mushroom", "Hvid pizza uden tomat. Pinot eller cremet chardonnay, ikke chianti."],
      ["med burrata", "creamyWhite", "Burrata er blød fedme. Syrefuld chardonnay skærer. Tung malbec er for meget."],
      ["med ananas", "sweetSpice", "Sød ananas på pizza. Halvtør riesling. Kraftig rød bliver bitter mod frugten."],
      ["med gedeost", "freshWhite", "Gedeost og syre. Sauvignon blanc. Fadlagret chardonnay bliver smørret."],
      ["med nduja", "spicyRed", "Nduja er krydret og fed. Saftig syrah. Tynd pinot drukner."],
      ["med rucola og parmesan", "italianTomato", "Rucola bitterhed og parmesan. Sangiovese med syre. Blød merlot bliver flad."],
      ["med kylling og BBQ", "bbqSweet", "Sød BBQ på kyllingepizza. Zinfandel eller riesling. Tannin-tung cabernet fejler."],
    ],
  },
  {
    parentSlug: "vin-til-burger",
    dishStem: "burger",
    tag: "burger",
    related: [{ slug: "vin-til-boeff", label: "Vin til bøf" }],
    mods: [
      ["med cheddar og bacon", "juicyRed", "Cheddar og bacon er fedt og røg. Saftig garnacha. Let pinot drukner."],
      ["med chili mayo", "chiliHeat", "Chili mayo er cremet varme. Halvtør riesling. Knastør cabernet forstærker brændingen."],
      ["med karamelliseret løg", "juicyRed", "Søde løg vil have frugtig rød. Barbera. Skarp sauvignon skærer forkert."],
      ["med spejlæg", "lighterRed", "Æg gør burgeren blødere. Let pinot. Kraftig malbec bliver tung."],
      ["med pulled pork", "bbqSweet", "Pulled pork er sød og fed. Zinfandel. Tør pinot mister grebet."],
      ["med halloumi", "lemonHerb", "Salt halloumi. Assyrtiko eller sauvignon. Sød zinfandel bliver klæbrig."],
      ["med kimchi", "sweetSpice", "Kimchi er syre og chili. Riesling. Tør cabernet bliver metallisk."],
      ["med bearnaise", "creamyWhite", "Bearnaise er smør og estragon. Chardonnay. Skarp sauvignon slår sovsen i stykker."],
      ["med rødløg og pickles", "bubbles", "Syre og sprødhed. Bobler skærer. Tung shiraz bliver bitter."],
      ["med pesto og mozzarella", "herbalWhite", "Pesto uden okseumami. Vermentino. Zinfandel er for sød og tung."],
      ["med chorizo", "spicyRed", "Chorizo er krydret fedt. Syrah. Let gamay drukner."],
      ["med hummus og falafel", "freshWhite", "Vegetarisk umami uden kød. Sauvignon. Malbec er for tung."],
    ],
  },
  {
    parentSlug: "vin-til-pizza-og-pasta",
    dishStem: "pasta",
    tag: "pasta",
    related: [{ slug: "vin-til-italiensk-mad", label: "Vin til italiensk mad" }],
    mods: [
      ["med arrabbiata", "chiliHeat", "Arrabbiata er chili og tomat. Halvtør riesling eller saftig barbera. Tung cabernet forstærker varmen."],
      ["med vongole", "saltyFish", "Muslinger og hvidløg. Albariño. Rødvin til kødsauce duer ikke."],
      ["med trøffelcreme", "mushroom", "Trøffelcreme er umami og fedme. Pinot. Cabernet bliver bitter."],
      ["med aubergine og ricotta", "herbalWhite", "Grønt og blød ost. Vermentino. Kraftig primitivo overdøver."],
      ["med laks og dild", "lemonHerb", "Laks og dild. Sauvignon. Zinfandel hører til kødpasta."],
      ["med chorizo og tomat", "spicyRed", "Chorizo i tomat. Syrah. Let pinot drukner."],
      ["med citron og rejer", "saltyFish", "Citron og rejer. Albariño. Fadlagret chardonnay bliver tung."],
      ["med spenat og gorgonzola", "blueCheese", "Blåskimmel og spenat. Halvtør riesling. Tør cabernet bliver bitter."],
      ["med kylling og pesto", "herbalWhite", "Pesto og kylling uden tomat. Vermentino. Sangiovese er for tanninrig."],
      ["med oksehaleragu", "spicyRed", "Kraftig ragu. Syrah eller malbec. Let gamay drukner."],
      ["med ærter og mynte", "freshWhite", "Ærter og mynte. Sauvignon. Fad chardonnay bliver smørret."],
      ["alla norma", "italianTomato", "Aubergine og tomat. Sangiovese. Riesling matcher dårligt."],
    ],
  },
  {
    parentSlug: "vin-til-risotto",
    dishStem: "risotto",
    tag: "risotto",
    related: [{ slug: "vin-til-italiensk-mad", label: "Vin til italiensk mad" }],
    mods: [
      ["med svampe", "mushroom", "Svampe-umami. Pinot. Cabernet er for tanninrig."],
      ["med saffran og skaldyr", "saltyFish", "Saffran og skaldyr. Albariño. Tung rød drukner."],
      ["med asparges", "freshWhite", "Asparges og bitterhed. Sauvignon. Fad chardonnay fejler."],
      ["med radicchio", "herbalWhite", "Radicchio bitterhed. Vermentino. Sød zinfandel bliver klæbrig."],
      ["med citron og rejer", "lemonHerb", "Citron og rejer. Assyrtiko. Malbec er forkert stil."],
      ["med gorgonzola", "blueCheese", "Gorgonzola i risotto. Halvtør riesling. Tør cabernet bliver bitter."],
      ["med rødvin og okse", "spicyRed", "Okse og rødvin i gryden. Syrah. Let pinot drukner."],
      ["med ærter og mynte", "freshWhite", "Ærter og mynte. Sauvignon. Primitivo er for tung."],
      ["med hummer", "creamyWhite", "Hummer og smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["med trøffel", "umamiRed", "Trøffel. Nebbiolo eller pinot. Zinfandel bliver marmeladeagtig."],
    ],
  },
  {
    parentSlug: "vin-til-tacos",
    dishStem: "tacos",
    tag: "tacos",
    related: [{ slug: "vin-til-mexicansk-mad", label: "Vin til mexicansk mad" }],
    mods: [
      ["med pulled pork", "bbqSweet", "Sød pulled pork. Zinfandel. Tør pinot mister grebet."],
      ["med fisk og lime", "saltyFish", "Fisk og lime. Albariño. Malbec er for tung."],
      ["med chorizo", "spicyRed", "Chorizo. Syrah. Let gamay drukner."],
      ["med rejer og chili", "chiliHeat", "Rejer og chili. Riesling. Muscadet forstærker brændingen."],
      ["med svampe og chipotle", "smoky", "Røg og svampe. Tempranillo. Sauvignon bliver skarp."],
      ["med kylling og mango", "sweetSpice", "Mango og kylling. Gewürztraminer. Cabernet bliver bitter."],
      ["med bønner og majs", "juicyRed", "Bønner og majs uden kød. Garnacha. Tung malbec er for meget."],
      ["med barbacoa", "spicyRed", "Barbacoa er dyb og fed. Malbec. Let pinot drukner."],
      ["med avocado og salsa verde", "freshWhite", "Salsa verde og avocado. Sauvignon. Zinfandel er for sød."],
      ["med lam og myntesalsa", "lighterRed", "Lam og mynte. Pinot. Kraftig cabernet overdøver mynten."],
    ],
  },
  {
    parentSlug: "vin-til-sushi",
    dishStem: "sushi",
    tag: "sushi",
    related: [{ slug: "vin-til-japansk-mad", label: "Vin til japansk mad" }],
    mods: [
      ["med laks og avocado", "freshWhite", "Fed laks og avocado. Sauvignon. Tung rød duer ikke."],
      ["med ål og teriyaki", "sweetSpice", "Sød teriyaki. Riesling. Tør champagne bliver skarp."],
      ["med spicy tuna", "chiliHeat", "Krydret mayo. Riesling. Knastør muscadet forstærker chilien."],
      ["med tempura", "bubbles", "Friture. Bobler skærer. Malbec er forkert."],
      ["med unagi", "sweetSpice", "Sød ål. Gewürztraminer. Cabernet bliver bitter."],
      ["nigiri med kammusling", "saltyFish", "Sød kammusling. Albariño. Rødvin overdøver."],
      ["med wasabi og ingefær", "lemonHerb", "Wasabi-varme. Assyrtiko. Fad chardonnay bliver tung."],
      ["vegetarisk med avocado", "herbalWhite", "Vegetarisk sushi. Vermentino. Primitivo er for tung."],
      ["med blæksprutte", "saltyFish", "Blæksprutte. Muscadet. Zinfandel duer ikke."],
      ["med spicy mayo og rejer", "chiliHeat", "Fed mayo og chili. Riesling. Tør cabernet fejler."],
    ],
  },
  {
    parentSlug: "vin-til-grill-og-bbq",
    dishStem: "grillmad",
    tag: "grill",
    related: [{ slug: "vin-til-grill-og-bbq", label: "Vin til grill og BBQ" }],
    mods: [
      ["kylling med citron", "lemonHerb", "Citronkylling på grill. Sauvignon. Shiraz er for tung."],
      ["laks med dildsmør", "freshWhite", "Laks og dild. Albariño. Zinfandel hører til kød."],
      ["majs med chipotle", "chiliHeat", "Sød majs og røgchili. Riesling. Cabernet bliver bitter."],
      ["spareribs med cola-glasur", "bbqSweet", "Sød glasur. Zinfandel. Tør pinot mister grebet."],
      ["grøntsager med tahin", "herbalWhite", "Tahin og grillgrønt. Vermentino. Malbec er for tung."],
      ["lammekølle med rosmarin", "spicyRed", "Lam og rosmarin. Syrah. Let gamay drukner."],
      ["rejer med hvidløg", "saltyFish", "Hvidløgsrejer. Albariño. Rødvin overdøver."],
      ["pølser med sennep", "juicyRed", "Sennep og pølse. Gamay. Kraftig cabernet bliver bitter."],
      ["okse med chimichurri", "spicyRed", "Chimichurri er urter og syre. Malbec. Blød merlot bliver flad."],
      ["halloumi med honning", "lemonHerb", "Salt ost og honning. Assyrtiko. Sauternes er for sød."],
      ["aubergine med miso", "umamiRed", "Miso-umami. Pinot. Sauvignon bliver metallisk."],
      ["and med kirsebærglasur", "lighterRed", "And og kirsebær. Pinot. Cabernet er for tanninrig."],
    ],
  },
  {
    parentSlug: "vin-til-kylling-og-lyst-koed",
    dishStem: "kylling",
    tag: "kylling",
    related: [{ slug: "vin-til-kylling-og-lyst-koed", label: "Vin til kylling og lyst kød" }],
    mods: [
      ["i citronsauce", "lemonHerb", "Citron. Sauvignon. Fad chardonnay bliver smørret."],
      ["i kokoskarry", "coconutCurry", "Kokos og karry. Riesling. Tør sauvignon bliver skarp."],
      ["i flødesovs med svampe", "mushroom", "Fløde og svampe. Pinot eller chardonnay. Cabernet er for tung."],
      ["friteret med sød chili", "sweetSpice", "Sød chili. Gewürztraminer. Cabernet bliver bitter."],
      ["grillet med harissa", "chiliHeat", "Harissa-varme. Riesling. Tør malbec forstærker chilien."],
      ["i tomatsauce med basilikum", "italianTomato", "Tomat og basilikum. Sangiovese. Riesling matcher dårligt."],
      ["med mango chutney", "sweetSpice", "Mango. Riesling. Cabernet bliver bitter."],
      ["i dijonsauce", "creamyWhite", "Dijon og fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["med pesto og mozzarella", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
      ["i teriyaki", "sweetSpice", "Sød soja. Riesling. Tør sauvignon bliver metallisk."],
      ["med rosmarin og hvidløg", "lighterRed", "Urter og grill. Pinot. Kraftig shiraz overdøver."],
      ["i rød curry", "coconutCurry", "Rød curry og kokos. Gewürztraminer. Cabernet fejler."],
    ],
  },
  {
    parentSlug: "vin-til-fisk-og-skaldyr",
    dishStem: "fisk",
    tag: "fisk",
    related: [{ slug: "vin-til-fisk-og-skaldyr", label: "Vin til fisk og skaldyr" }],
    mods: [
      ["med beurre blanc", "creamyWhite", "Smørsovs. Chardonnay. Skarp sauvignon slår smørret."],
      ["med salsa verde", "lemonHerb", "Urter og syre. Assyrtiko. Fad chardonnay bliver tung."],
      ["i kokossauce", "coconutCurry", "Kokos. Riesling. Tør sauvignon bliver skarp."],
      ["med tomatsalsa", "freshWhite", "Tomat og fisk. Albariño. Tung rød drukner."],
      ["grillet med citron", "lemonHerb", "Grill og citron. Sauvignon. Malbec er forkert."],
      ["med hollandaise", "creamyWhite", "Hollandaise. Chardonnay. Pinot noir kan også, men skarp hvid skærer for hårdt."],
      ["i rød karry", "coconutCurry", "Karryvarme. Gewürztraminer. Cabernet bliver bitter."],
      ["med kapers og smør", "saltyFish", "Kapers. Muscadet. Zinfandel duer ikke."],
      ["med miso-glasur", "umamiRed", "Miso. Pinot. Sauvignon bliver metallisk."],
      ["cevichestil med chili", "chiliHeat", "Rå syre og chili. Riesling. Rødvin forstærker brændingen."],
    ],
  },
  {
    parentSlug: "vin-til-laks",
    dishStem: "laks",
    tag: "laks",
    related: [{ slug: "vin-til-fisk-og-skaldyr", label: "Vin til fisk og skaldyr" }],
    mods: [
      ["med hollandaise", "creamyWhite", "Hollandaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["røget med dild", "freshWhite", "Røg og dild. Sauvignon. Tung rød overdøver."],
      ["med teriyaki", "sweetSpice", "Sød soja. Riesling. Tør sauvignon bliver metallisk."],
      ["med pesto", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
      ["i ovn med citron", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
      ["med mango salsa", "sweetSpice", "Mango. Riesling. Cabernet bliver bitter."],
      ["med bearnaise", "creamyWhite", "Bearnaise. Chardonnay. Let pinot kan også — undgå cabernet."],
      ["grilleret med soya", "umamiRed", "Soya-umami. Pinot. Sauvignon bliver metallisk."],
      ["med creme fraiche og rejer", "saltyFish", "Rejer og creme. Albariño. Malbec er forkert."],
      ["med chili og lime", "chiliHeat", "Chili og lime. Riesling. Tør cabernet forstærker varmen."],
    ],
  },
  {
    parentSlug: "vin-til-boeff",
    dishStem: "bøf",
    tag: "bøf",
    related: [{ slug: "vin-til-oksekoed", label: "Vin til oksekød" }],
    mods: [
      ["med bearnaise", "creamyWhite", "Bearnaise. Chardonnay eller let merlot — undgå skarp sauvignon."],
      ["med pebersovs", "spicyRed", "Peber. Syrah. Tynd pinot drukner."],
      ["med chimichurri", "spicyRed", "Chimichurri. Malbec. Blød merlot bliver flad."],
      ["tartar med æggeblomme", "lighterRed", "Tatar. Pinot. Kraftig cabernet overdøver."],
      ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling eller port. Tør cabernet bliver bitter."],
      ["med trøffelsmør", "umamiRed", "Trøffel. Nebbiolo. Zinfandel bliver marmeladeagtig."],
      ["med rødvinssauce", "spicyRed", "Rødvinssauce. Syrah. Let gamay drukner."],
      ["med salsa verde", "lighterRed", "Urter og syre. Pinot. Tung shiraz overdøver urterne."],
      ["med svampesauce", "mushroom", "Svampe. Pinot. Sauvignon er for skarp."],
      ["med BBQ-glasur", "bbqSweet", "Sød BBQ. Zinfandel. Tør pinot mister grebet."],
    ],
  },
  {
    parentSlug: "vin-til-chili-con-carne",
    dishStem: "chili",
    tag: "chili",
    related: [{ slug: "vin-til-mexicansk-mad", label: "Vin til mexicansk mad" }],
    mods: [
      ["med mørk chokolade", "bbqSweet", "Chokolade. Primitivo. Skarp hvid bliver metallisk."],
      ["med majs og bønner", "juicyRed", "Sød majs. Gamay. Tung shiraz er for meget."],
      ["extra stærk", "chiliHeat", "Høj chili. Riesling. Tør cabernet forstærker brændingen."],
      ["med chorizo", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
      ["med søde kartofler", "juicyRed", "Sød kartoffel. Garnacha. Cabernet bliver bitter."],
      ["med avocado og lime", "freshWhite", "Lime og fedme. Sauvignon. Malbec er for tung."],
      ["med kylling", "sweetSpice", "Kyllingchili. Riesling. Tung malbec er for meget."],
      ["med røget paprika", "smoky", "Røg. Tempranillo. Sauvignon bliver skarp."],
    ],
  },
  {
    parentSlug: "vin-til-lasagne",
    dishStem: "lasagne",
    tag: "lasagne",
    related: [{ slug: "vin-til-bolognese", label: "Vin til bolognese" }],
    mods: [
      ["med svampe og ost", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
      ["med fisk og rejer", "saltyFish", "Fiskelasagne. Albariño. Rødvin overdøver."],
      ["med and", "lighterRed", "And. Pinot. Kraftig primitivo er for tung."],
      ["med pesto og ricotta", "herbalWhite", "Pesto. Vermentino. Sangiovese er for tanninrig uden kød."],
      ["med chili og krydderi", "chiliHeat", "Chili i sovsen. Riesling. Tør cabernet forstærker varmen."],
      ["med gulerod og selleri", "italianTomato", "Sødrod i sovsen. Barbera. Tung malbec er for meget."],
      ["med mozzarella og basilikum", "italianTomato", "Frisk ost og basilikum. Sangiovese. Riesling matcher dårligt."],
      ["med vildt", "spicyRed", "Vildt. Syrah. Let gamay drukner."],
    ],
  },
  {
    parentSlug: "vin-til-carbonara",
    dishStem: "carbonara",
    tag: "carbonara",
    related: [{ slug: "vin-til-pizza-og-pasta", label: "Vin til pizza og pasta" }],
    mods: [
      ["med svampe", "mushroom", "Svampe uden klassisk guanciale-fokus. Pinot. Cabernet er for tung."],
      ["med ærter", "freshWhite", "Ærter tilføjer sødme. Soave. Fad chardonnay bliver tung."],
      ["med rejer", "saltyFish", "Rejer i carbonara-stil. Albariño. Rødvin duer ikke."],
      ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
      ["med chili", "chiliHeat", "Chili. Riesling. Tør cabernet forstærker varmen."],
      ["med asparges", "freshWhite", "Asparges. Sauvignon. Fad chardonnay fejler."],
    ],
  },
  {
    parentSlug: "vin-til-wok",
    dishStem: "wok",
    tag: "wok",
    related: [{ slug: "vin-til-asiatisk-mad", label: "Vin til asiatisk mad" }],
    mods: [
      ["med kylling og cashew", "sweetSpice", "Sød cashew-wok. Riesling. Cabernet bliver bitter."],
      ["med okse og østerssovs", "umamiRed", "Østerssovs. Pinot. Gewürztraminer er for sød her."],
      ["med rejer og chili", "chiliHeat", "Chili-rejer. Riesling. Muscadet forstærker brændingen."],
      ["med tofu og sesam", "herbalWhite", "Sesam og tofu. Vermentino. Malbec er for tung."],
      ["med and og hoisin", "bbqSweet", "Hoisin-sødme. Zinfandel. Tør pinot mister grebet."],
      ["med grøntsager og ingefær", "lemonHerb", "Ingefær. Sauvignon. Fad chardonnay bliver tung."],
      ["med nudler og peanut", "sweetSpice", "Peanut. Riesling. Cabernet bliver bitter."],
      ["med laks og teriyaki", "sweetSpice", "Teriyaki. Gewürztraminer. Tør sauvignon bliver metallisk."],
    ],
  },
  {
    parentSlug: "vin-til-ramen",
    dishStem: "ramen",
    tag: "ramen",
    related: [{ slug: "vin-til-japansk-mad", label: "Vin til japansk mad" }],
    mods: [
      ["tonkotsu", "umamiRed", "Fed tonkotsu. Pinot. Sauvignon bliver skarp."],
      ["spicy miso", "chiliHeat", "Miso og chili. Riesling. Cabernet forstærker varmen."],
      ["shoyu med æg", "lighterRed", "Shoyu. Pinot. Kraftig malbec er for tung."],
      ["med kylling", "freshWhite", "Kyllingeramen. Sauvignon. Tung rød drukner bouillonen."],
      ["vegetarisk med svampe", "mushroom", "Svampebouillon. Pinot. Zinfandel er for sød."],
      ["med rejer og chiliolie", "chiliHeat", "Chiliolie. Riesling. Tør muscadet forstærker brændingen."],
    ],
  },
  {
    parentSlug: "vin-til-paella",
    dishStem: "paella",
    tag: "paella",
    related: [{ slug: "vin-til-spansk-mad", label: "Vin til spansk mad" }],
    mods: [
      ["med skaldyr", "saltyFish", "Skaldyr. Albariño. Tempranillo er for tung."],
      ["med chorizo og kylling", "spicyRed", "Chorizo. Garnacha. Let pinot drukner."],
      ["vegetarisk med grøntsager", "herbalWhite", "Grønt. Verdejo. Malbec er for tung."],
      ["med blæksprutte", "saltyFish", "Blæksprutte. Albariño. Rødvin overdøver."],
      ["sort med blæksprutteblæk", "freshWhite", "Sort paella. Albariño. Kraftig rød drukner."],
      ["med kanin", "lighterRed", "Kanin. Pinot. Cabernet er for tanninrig."],
    ],
  },
  {
    parentSlug: "vin-til-indisk-mad",
    dishStem: "indisk mad",
    tag: "indisk",
    related: [{ slug: "vin-til-karryretter", label: "Vin til karryretter" }],
    mods: [
      ["butter chicken", "coconutCurry", "Cremet tomato-butter. Riesling. Cabernet bliver bitter."],
      ["lamb rogan josh", "spicyRed", "Lam og krydderi. Syrah. Let pinot drukner."],
      ["palak paneer", "herbalWhite", "Spinat og paneer. Vermentino. Malbec er for tung."],
      ["tikka masala med kylling", "sweetSpice", "Sød cremet masala. Gewürztraminer. Cabernet fejler."],
      ["vindaloo", "chiliHeat", "Høj varme. Riesling. Tør rød forstærker chilien."],
      ["dal med kokos", "coconutCurry", "Dal og kokos. Riesling. Sauvignon bliver skarp."],
      ["samosa med chutney", "sweetSpice", "Chutney. Riesling. Cabernet bliver bitter."],
      ["tandoori kylling", "rose", "Røg og krydderi. Rosé. Tung cabernet overdøver."],
    ],
  },
  {
    parentSlug: "vin-til-thai-mad",
    dishStem: "thai mad",
    tag: "thai",
    related: [{ slug: "vin-til-asiatisk-mad", label: "Vin til asiatisk mad" }],
    mods: [
      ["grøn karry med kylling", "coconutCurry", "Grøn karry. Riesling. Cabernet bliver bitter."],
      ["pad thai", "sweetSpice", "Sød-syrlig pad thai. Riesling. Tør cabernet fejler."],
      ["tom yum", "lemonHerb", "Syre og chili. Assyrtiko. Fad chardonnay bliver tung."],
      ["massaman med okse", "coconutCurry", "Massaman. Gewürztraminer. Pinot kan mangle fylde — undgå cabernet."],
      ["som tum", "chiliHeat", "Papayasalat. Riesling. Rødvin forstærker chilien."],
      ["rejer med chili og lime", "chiliHeat", "Chili og lime. Riesling. Muscadet forstærker brændingen."],
      ["kokossuppe med kylling", "coconutCurry", "Kokos. Riesling. Sauvignon bliver skarp."],
      ["basilikum-wok med kylling", "herbalWhite", "Thaisk basilikum. Vermentino. Malbec er for tung."],
    ],
  },
  {
    parentSlug: "vin-til-mexicansk-mad",
    dishStem: "mexicansk mad",
    tag: "mexicansk",
    related: [{ slug: "vin-til-tacos", label: "Vin til tacos" }],
    mods: [
      ["enchiladas med ost", "juicyRed", "Ost og chili. Garnacha. Let pinot drukner."],
      ["guacamole og chips", "freshWhite", "Avocado. Sauvignon. Tung rød er forkert."],
      ["mole med kylling", "bbqSweet", "Mole og chokolade. Zinfandel. Skarp hvid bliver metallisk."],
      ["quesadilla med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
      ["fajitas med okse", "spicyRed", "Fajitas. Syrah. Let gamay drukner."],
      ["ceviche mexicansk stil", "saltyFish", "Lime og fisk. Albariño. Rødvin duer ikke."],
      ["elote", "chiliHeat", "Majs, chili, lime. Riesling. Cabernet bliver bitter."],
      ["burrito med bønner", "juicyRed", "Bønner. Barbera. Tung malbec er for meget."],
    ],
  },
  {
    parentSlug: "vin-til-salat",
    dishStem: "salat",
    tag: "salat",
    related: [{ slug: "vin-til-vegetar-og-gront", label: "Vin til vegetar og grønt" }],
    mods: [
      ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Fad chardonnay bliver smørret."],
      ["med laks", "saltyFish", "Laks. Albariño. Rødvin overdøver."],
      ["med kylling og sennep", "lighterRed", "Sennep. Pinot. Kraftig shiraz er for tung."],
      ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Tør cabernet bliver bitter."],
      ["med rejer og avocado", "saltyFish", "Rejer. Albariño. Malbec er forkert."],
      ["med quinoa og lime", "lemonHerb", "Lime. Sauvignon. Primitivo er for tung."],
      ["med bacon og æg", "lighterRed", "Bacon. Gamay. Cabernet er for tanninrig."],
      ["med halloumi", "lemonHerb", "Halloumi. Assyrtiko. Sød zinfandel bliver klæbrig."],
    ],
  },
  {
    parentSlug: "vin-til-suppe",
    dishStem: "suppe",
    tag: "suppe",
    related: [{ slug: "vin-til-gryderet", label: "Vin til gryderet" }],
    mods: [
      ["tomatsuppe med basilikum", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
      ["græskarsuppe", "creamyWhite", "Sød græskar. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["fiskesuppe", "saltyFish", "Fisk. Albariño. Rødvin drukner."],
      ["karrysuppe med kokos", "coconutCurry", "Kokoskarry. Riesling. Cabernet bliver bitter."],
      ["svampesuppe", "mushroom", "Svampe. Pinot. Sauvignon er for skarp."],
      ["gulaschsuppe", "spicyRed", "Paprika. Syrah. Let pinot drukner."],
      ["hønsekødssuppe", "lighterRed", "Høns. Pinot. Kraftig malbec er for tung."],
      ["chili-suppe", "chiliHeat", "Chili. Riesling. Tør rød forstærker varmen."],
    ],
  },
  {
    parentSlug: "vin-til-gryderet",
    dishStem: "gryderet",
    tag: "gryderet",
    related: [{ slug: "vin-til-oksekoed", label: "Vin til oksekød" }],
    mods: [
      ["med oksehaler", "spicyRed", "Oksehale. Syrah. Let gamay drukner."],
      ["med kylling og citron", "lemonHerb", "Citron. Sauvignon. Fad chardonnay bliver tung."],
      ["med lam og abrikos", "bbqSweet", "Sød abrikos. Zinfandel. Tør pinot mister grebet."],
      ["med svinekæber", "juicyRed", "Svinekæber. Barbera. Skarp sauvignon er forkert."],
      ["vegetarisk med linser", "juicyRed", "Linser. Garnacha. Tung malbec er for meget."],
      ["med fisk og fennikel", "saltyFish", "Fisk. Albariño. Rødvin overdøver."],
      ["med chorizo og bønner", "spicyRed", "Chorizo. Tempranillo. Let pinot drukner."],
      ["med kokos og karry", "coconutCurry", "Kokos. Riesling. Cabernet bliver bitter."],
    ],
  },
  {
    parentSlug: "vin-til-frikadeller",
    dishStem: "frikadeller",
    tag: "frikadeller",
    related: [{ slug: "vin-til-svinekoed", label: "Vin til svinekød" }],
    mods: [
      ["med brun sovs", "lighterRed", "Brun sovs. Pinot. Skarp sauvignon er forkert."],
      ["med remoulade", "bubbles", "Remoulade. Cava. Tung rød bliver bitter."],
      ["med kartofler og persillesauce", "freshWhite", "Persille. Sauvignon. Malbec er for tung."],
      ["med tomatsauce", "italianTomato", "Tomat. Barbera. Riesling matcher dårligt."],
      ["med karry", "sweetSpice", "Karry. Riesling. Cabernet bliver bitter."],
      ["med svampesauce", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ],
  },
  {
    parentSlug: "vin-til-pulled-pork",
    dishStem: "pulled pork",
    tag: "pulled pork",
    related: [{ slug: "vin-til-grill-og-bbq", label: "Vin til grill og BBQ" }],
    mods: [
      ["med coleslaw", "bubbles", "Coleslaw-syre. Cava. Tung shiraz bliver bitter."],
      ["med jalapeños", "chiliHeat", "Jalapeño. Riesling. Cabernet forstærker varmen."],
      ["med æbleglaze", "sweetSpice", "Æble. Riesling. Tør pinot mister grebet."],
      ["i brioche med pickles", "bbqSweet", "Pickles og sødhed. Zinfandel. Cabernet bliver bitter."],
      ["med sennepssauce", "juicyRed", "Sennep. Gamay. Kraftig cabernet er for hård."],
      ["tacos-stil", "chiliHeat", "Taco-krydderi. Riesling. Malbec kan virke tung."],
    ],
  },
  {
    parentSlug: "vin-til-nachos",
    dishStem: "nachos",
    tag: "nachos",
    related: [{ slug: "vin-til-mexicansk-mad", label: "Vin til mexicansk mad" }],
    mods: [
      ["med guacamole", "freshWhite", "Avocado. Sauvignon. Tung rød er forkert."],
      ["med pulled chicken", "chiliHeat", "Kylling og chili. Riesling. Cabernet forstærker varmen."],
      ["med chorizo", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
      ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Tør cabernet bliver bitter."],
      ["vegetariske med bønner", "juicyRed", "Bønner. Garnacha. Malbec er for tung."],
      ["med salsa verde", "lemonHerb", "Salsa verde. Assyrtiko. Fad chardonnay bliver tung."],
    ],
  },
  {
    parentSlug: "vin-til-tapas",
    dishStem: "tapas",
    tag: "tapas",
    related: [{ slug: "vin-til-spansk-mad", label: "Vin til spansk mad" }],
    mods: [
      ["med patatas bravas", "chiliHeat", "Bravas-chili. Riesling. Cabernet forstærker varmen."],
      ["med gambas al ajillo", "saltyFish", "Hvidløgsrejer. Albariño. Rødvin overdøver."],
      ["med chorizo al vino", "spicyRed", "Chorizo. Tempranillo. Let pinot drukner."],
      ["med tortilla española", "freshWhite", "Æg og kartoffel. Verdejo. Tung malbec er for meget."],
      ["med manchego og membrillo", "juicyRed", "Ost og kvæde. Garnacha. Skarp sauvignon er forkert."],
      ["med boquerones", "saltyFish", "Ansjos. Muscadet. Rødvin duer ikke."],
      ["med albóndigas", "italianTomato", "Kødboller i tomat. Tempranillo. Riesling matcher dårligt."],
      ["med pulpo a la gallega", "saltyFish", "Blæksprutte. Albariño. Kraftig rød overdøver."],
    ],
  },
  {
    parentSlug: "vin-til-ost-og-ostebord",
    dishStem: "ostebord",
    tag: "ost",
    related: [{ slug: "vin-til-ost-og-ostebord", label: "Vin til ost og ostebord" }],
    mods: [
      ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling eller port. Tør cabernet bliver bitter."],
      ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Fad chardonnay bliver smørret."],
      ["med brie", "creamyWhite", "Brie. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["med cheddar", "juicyRed", "Cheddar. Garnacha. Let pinot kan mangle fylde — undgå riesling."],
      ["med parmesan", "italianTomato", "Parmesan. Sangiovese. Sød zinfandel bliver klæbrig."],
      ["med vesterhavsost", "lighterRed", "Kraftig dansk ost. Pinot. Skarp sauvignon er forkert."],
    ],
  },
  {
    parentSlug: "vin-til-svampe",
    dishStem: "svamperet",
    tag: "svampe",
    related: [{ slug: "vin-til-vegetar-og-gront", label: "Vin til vegetar og grønt" }],
    mods: [
      ["stegt med hvidløg", "herbalWhite", "Hvidløg. Vermentino. Malbec er for tung."],
      ["i flødesovs", "mushroom", "Fløde. Pinot. Cabernet er for tanninrig."],
      ["grillet med miso", "umamiRed", "Miso. Nebbiolo. Sauvignon bliver metallisk."],
      ["med polenta", "creamyWhite", "Polenta. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["i risotto", "mushroom", "Risotto. Pinot. Zinfandel er for sød."],
      ["med æg og toast", "lighterRed", "Æg. Gamay. Kraftig cabernet overdøver."],
    ],
  },
  {
    parentSlug: "vin-til-vegetar-og-gront",
    dishStem: "vegetarret",
    tag: "vegetar",
    related: [{ slug: "vin-til-vegetar", label: "Vin til vegetar" }],
    mods: [
      ["linsebolognese", "italianTomato", "Linser og tomat. Barbera. Tung malbec er for meget."],
      ["ratatouille", "herbalWhite", "Urter og aubergine. Vermentino. Cabernet er for tanninrig."],
      ["fyldt peberfrugt", "juicyRed", "Sød peber. Garnacha. Let pinot kan mangle frugt."],
      ["grøntsagsgrateng", "creamyWhite", "Ostgrateng. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["falafel tallerken", "freshWhite", "Falafel. Sauvignon. Malbec er for tung."],
      ["buddha bowl med chili", "chiliHeat", "Chili. Riesling. Tør rød forstærker varmen."],
      ["svampeburger", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
      ["aubergineparm", "italianTomato", "Aubergine og tomat. Sangiovese. Riesling matcher dårligt."],
    ],
  },
  {
    parentSlug: "vin-til-karryretter",
    dishStem: "karry",
    tag: "karry",
    related: [{ slug: "vin-til-indisk-mad", label: "Vin til indisk mad" }],
    mods: [
      ["gul karry med kylling", "coconutCurry", "Gul karry. Riesling. Sauvignon bliver skarp."],
      ["rød karry med and", "sweetSpice", "And og rød karry. Gewürztraminer. Cabernet bliver bitter."],
      ["grøn karry med tofu", "coconutCurry", "Tofu. Riesling. Malbec er for tung."],
      ["korma med lam", "creamyWhite", "Mild korma. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["madras med okse", "chiliHeat", "Madras-varme. Riesling. Tør rød forstærker chilien."],
      ["fiskekarry", "saltyFish", "Fisk. Albariño eller riesling — undgå cabernet."],
    ],
  },
  {
    parentSlug: "vin-til-ribeye",
    dishStem: "ribeye",
    tag: "bøf",
    related: [{ slug: "vin-til-boeff", label: "Vin til bøf" }],
    mods: [
      ["med salt og peber", "spicyRed", "Ren ribeye. Syrah. Let pinot drukner."],
      ["med blåskimmelsmør", "blueCheese", "Blåskimmel. Riesling. Tør cabernet bliver bitter."],
      ["med chimichurri", "spicyRed", "Chimichurri. Malbec. Blød merlot bliver flad."],
      ["med bearnaise", "creamyWhite", "Bearnaise. Chardonnay kan følge sovsen — undgå skarp sauvignon."],
      ["med trøffel", "umamiRed", "Trøffel. Nebbiolo. Zinfandel bliver marmeladeagtig."],
      ["med BBQ", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
    ],
  },
  {
    parentSlug: "vin-til-torsk",
    dishStem: "torsk",
    tag: "torsk",
    related: [{ slug: "vin-til-fisk-og-skaldyr", label: "Vin til fisk og skaldyr" }],
    mods: [
      ["med remoulade", "bubbles", "Remoulade. Cava. Rødvin bliver bitter."],
      ["med hollandaise", "creamyWhite", "Hollandaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["med tomatsalsa", "freshWhite", "Tomat. Albariño. Tung rød drukner."],
      ["med bacon og ærter", "lighterRed", "Bacon. Pinot. Cabernet er for tanninrig."],
      ["med karry", "sweetSpice", "Karry. Riesling. Cabernet bliver bitter."],
      ["grillet med citron", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ],
  },
  {
    parentSlug: "vin-til-rejer",
    dishStem: "rejer",
    tag: "rejer",
    related: [{ slug: "vin-til-fisk-og-skaldyr", label: "Vin til fisk og skaldyr" }],
    mods: [
      ["i hvidløgssmør", "creamyWhite", "Hvidløgssmør. Chardonnay. Skarp sauvignon kan også — undgå malbec."],
      ["med chili og lime", "chiliHeat", "Chili. Riesling. Muscadet forstærker brændingen."],
      ["i kokoskarry", "coconutCurry", "Kokos. Riesling. Cabernet bliver bitter."],
      ["grillet med paprika", "rose", "Paprika. Rosé. Tung cabernet overdøver."],
      ["i tomatsauce", "italianTomato", "Tomat. Vermentino eller sangiovese — undgå portvin."],
      ["med aioli", "bubbles", "Aioli. Cava. Rødvin bliver bitter."],
    ],
  },
  {
    parentSlug: "vin-til-lam",
    dishStem: "lam",
    tag: "lam",
    related: [{ slug: "vin-til-oksekoed", label: "Vin til oksekød" }],
    mods: [
      ["med rosmarin", "spicyRed", "Rosmarin. Syrah. Let gamay drukner."],
      ["med myntesauce", "lighterRed", "Mynte. Pinot. Kraftig cabernet overdøver mynten."],
      ["med aprikosglasur", "bbqSweet", "Aprikos. Zinfandel. Tør pinot mister grebet."],
      ["i tagine", "sweetSpice", "Sød krydderi. Gewürztraminer. Cabernet bliver bitter."],
      ["med hvidløg og citron", "lemonHerb", "Citron. Assyrtiko til lettere snitte — undgå portvin."],
      ["med ratatouille", "herbalWhite", "Grønt. Vermentino eller grenache — undgå icewine."],
    ],
  },
  {
    parentSlug: "vin-til-and",
    dishStem: "and",
    tag: "and",
    related: [{ slug: "vin-til-juleand", label: "Vin til juleand" }],
    mods: [
      ["med kirsebærsauce", "lighterRed", "Kirsebær. Pinot. Cabernet er for tanninrig."],
      ["med appelsin", "sweetSpice", "Appelsin. Riesling. Tør cabernet bliver bitter."],
      ["konfiteret med linser", "juicyRed", "Linser. Barbera. Let gamay kan mangle fylde."],
      ["med hoisin", "bbqSweet", "Hoisin. Zinfandel. Tør pinot mister grebet."],
      ["med rødkål", "lighterRed", "Rødkål. Pinot. Sauvignon er for skarp."],
      ["grillet med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ],
  },
  {
    parentSlug: "vin-til-mac-and-cheese",
    dishStem: "mac and cheese",
    tag: "mac and cheese",
    related: [{ slug: "vin-til-amerikansk-comfort-mad", label: "Vin til amerikansk comfort mad" }],
    mods: [
      ["med bacon", "juicyRed", "Bacon. Garnacha. Skarp sauvignon er forkert."],
      ["med hummer", "creamyWhite", "Hummer. Chardonnay. Pinot kan også — undgå cabernet."],
      ["med jalapeño", "chiliHeat", "Jalapeño. Riesling. Cabernet forstærker varmen."],
      ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
      ["med broccoli", "freshWhite", "Broccoli. Sauvignon. Tung malbec er for meget."],
      ["med pulled pork", "bbqSweet", "Pulled pork. Zinfandel. Tør pinot mister grebet."],
    ],
  },
  {
    parentSlug: "vin-til-moussaka",
    dishStem: "moussaka",
    tag: "moussaka",
    related: [{ slug: "vin-til-graesk-mad", label: "Vin til græsk mad" }],
    mods: [
      ["med lam", "spicyRed", "Lam. Xinomavro-stil / syrah. Let pinot drukner."],
      ["vegetarisk med linser", "juicyRed", "Linser. Garnacha. Tung malbec er for meget."],
      ["med ekstra bechamel", "creamyWhite", "Ekstra bechamel. Chardonnay. Skarp sauvignon skærer for hårdt."],
      ["med gedeost", "freshWhite", "Gedeost. Assyrtiko. Fad chardonnay bliver smørret."],
      ["med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
      ["med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ],
  },
  {
    parentSlug: "vin-til-shakshuka",
    dishStem: "shakshuka",
    tag: "shakshuka",
    related: [{ slug: "vin-til-brunch", label: "Vin til brunch" }],
    mods: [
      ["med feta", "freshWhite", "Feta. Assyrtiko. Tung rød overdøver."],
      ["med chorizo", "spicyRed", "Chorizo. Garnacha. Let pinot drukner."],
      ["med avocado", "herbalWhite", "Avocado. Vermentino. Malbec er for tung."],
      ["extra stærk", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
      ["med lammekød", "spicyRed", "Lam. Syrah. Let gamay drukner."],
      ["med auberginer", "italianTomato", "Aubergine. Sangiovese. Riesling matcher dårligt."],
    ],
  },
  {
    parentSlug: "vin-til-kebab-og-shawarma",
    dishStem: "shawarma",
    tag: "shawarma",
    related: [{ slug: "vin-til-mellemoestlig-mad", label: "Vin til mellemøstlig mad" }],
    mods: [
      ["kylling med hvidløgsauce", "freshWhite", "Hvidløg. Sauvignon. Tung malbec er for meget."],
      ["lam med tahin", "lighterRed", "Tahin. Pinot. Cabernet er for tanninrig."],
      ["med harissa", "chiliHeat", "Harissa. Riesling. Cabernet forstærker varmen."],
      ["med pickles og chili", "chiliHeat", "Pickles. Riesling. Tør rød bliver bitter."],
      ["falafel wrap", "herbalWhite", "Falafel. Vermentino. Malbec er for tung."],
      ["med granatæble", "juicyRed", "Granatæble. Garnacha. Skarp sauvignon er forkert."],
    ],
  },
  {
    parentSlug: "vin-til-dim-sum",
    dishStem: "dim sum",
    tag: "dim sum",
    related: [{ slug: "vin-til-kinesisk-mad", label: "Vin til kinesisk mad" }],
    mods: [
      ["med dumpling i chiliolie", "chiliHeat", "Chiliolie. Riesling. Cabernet forstærker varmen."],
      ["med siu mai", "lighterRed", "Siu mai. Pinot. Tung malbec er for meget."],
      ["med rejedumplings", "saltyFish", "Rejer. Albariño. Rødvin overdøver."],
      ["med sticky ribs", "bbqSweet", "Sød ribs. Zinfandel. Tør pinot mister grebet."],
      ["vegetariske dumplings", "herbalWhite", "Grønt. Vermentino. Cabernet er for tanninrig."],
      ["med char siu", "bbqSweet", "Char siu. Riesling. Cabernet bliver bitter."],
    ],
  },
  {
    parentSlug: "vin-til-pho",
    dishStem: "pho",
    tag: "pho",
    related: [{ slug: "vin-til-vietnamesisk-mad", label: "Vin til vietnamesisk mad" }],
    mods: [
      ["med okse", "lighterRed", "Okse-pho. Pinot. Kraftig cabernet overdøver urterne."],
      ["med kylling", "freshWhite", "Kylling. Sauvignon. Malbec er for tung."],
      ["extra stærk", "chiliHeat", "Chili. Riesling. Tør rød forstærker varmen."],
      ["med rejer", "saltyFish", "Rejer. Albariño. Rødvin overdøver."],
      ["med svampe", "mushroom", "Svampe. Pinot. Zinfandel er for sød."],
      ["med hoisin og lime", "sweetSpice", "Hoisin og lime. Riesling. Cabernet bliver bitter."],
    ],
  },
];

function buildDish(base, modPart, profileKey, delta) {
  const profile = PROFILES[profileKey];
  if (!profile) throw new Error(`unknown profile ${profileKey}`);
  const dish = `${base.dishStem} ${modPart}`.replace(/\s+/g, " ").trim();
  const slug = `vin-til-${slugify(dish)}`;
  const tags = [base.tag, "mad og vin"];
  const related = base.related || [];
  // Prefer a related that exists; filter later
  return {
    slug,
    dish,
    label: `Vin til ${dish}`,
    parentSlug: base.parentSlug,
    parentLabel: parentLabelFromSlug(base.parentSlug),
    delta,
    defaultWine: profile.defaultWine,
    altWine: profile.altWine,
    avoidWine: profile.avoidWine,
    searchQuery: profile.searchQuery,
    tags,
    related,
  };
}

function main() {
  const existingSlugs = new Set(EXISTING.map((d) => d.slug));
  const out = [];
  const seen = new Set(existingSlugs);

  for (const base of BASES) {
    if (!parentExists(base.parentSlug)) {
      console.warn(`skip base, missing parent: ${base.parentSlug}`);
      continue;
    }
    for (const [modPart, profileKey, delta] of base.mods) {
      const dish = buildDish(base, modPart, profileKey, delta);
      if (seen.has(dish.slug)) continue;
      // related must exist
      dish.related = (dish.related || []).filter((r) => parentExists(r.slug));
      if (dish.related.length === 0) {
        dish.related = [{ slug: base.parentSlug, label: parentLabelFromSlug(base.parentSlug) }];
      }
      const wines = [dish.defaultWine, dish.altWine, dish.avoidWine].map((w) => w.toLowerCase());
      if (new Set(wines).size !== 3) {
        console.warn(`skip ${dish.slug}: duplicate wines`);
        continue;
      }
      seen.add(dish.slug);
      out.push(dish);
    }
  }

  // Top up to ~500 with extra modifier crosses on high-traffic parents
  const EXTRA_PARENTS = [
    ["vin-til-pizza", "pizza", "pizza"],
    ["vin-til-burger", "burger", "burger"],
    ["vin-til-pizza-og-pasta", "pasta", "pasta"],
    ["vin-til-kylling-og-lyst-koed", "kylling", "kylling"],
    ["vin-til-grill-og-bbq", "grillret", "grill"],
    ["vin-til-fisk-og-skaldyr", "fiskeret", "fisk"],
    ["vin-til-tacos", "taco", "tacos"],
    ["vin-til-risotto", "risotto", "risotto"],
    ["vin-til-bolognese", "bolognese", "bolognese"],
    ["vin-til-spareribs", "spareribs", "spareribs"],
    ["vin-til-butter-chicken", "butter chicken", "butter chicken"],
    ["vin-til-ceviche", "ceviche", "ceviche"],
    ["vin-til-gazpacho", "gazpacho", "gazpacho"],
    ["vin-til-quiche", "quiche", "quiche"],
    ["vin-til-fondue", "fondue", "fondue"],
    ["vin-til-raclette", "raclette", "raclette"],
    ["vin-til-poelser-og-kartoffel", "pølser", "pølser"],
    ["vin-til-stegt-flaesk", "stegt flæsk", "flæsk"],
    ["vin-til-flaesketesteg", "flæskesteg", "flæskesteg"],
    ["vin-til-medister", "medister", "medister"],
    ["vin-til-gulasch", "gulasch", "gulasch"],
    ["vin-til-boef-stroganoff", "stroganoff", "stroganoff"],
    ["vin-til-osso-buco", "osso buco", "osso buco"],
    ["vin-til-peberboef", "peberbøf", "peberbøf"],
    ["vin-til-roastbeef", "roastbeef", "roastbeef"],
    ["vin-til-tunboef", "tunbøf", "tun"],
    ["vin-til-falafel-og-hummus", "falafel", "falafel"],
    ["vin-til-couscous", "couscous", "couscous"],
    ["vin-til-tomatsuppe", "tomatsuppe", "suppe"],
  ];

  const EXTRA_MODS = [
    ["med ekstra chili", "chiliHeat", "Ekstra chili kræver frugt og lidt sødme. Halvtør riesling. Tør cabernet forstærker brændingen."],
    ["med hvidløg", "herbalWhite", "Hvidløg skruer urterne op. Vermentino. Tung malbec overdøver."],
    ["med citron", "lemonHerb", "Citron vil have høj syre. Sauvignon. Fadlagret chardonnay bliver smørret."],
    ["med fløde", "creamyWhite", "Fløde dæmper syren. Chardonnay. Skarp sauvignon skærer sovsen over."],
    ["med svampe", "mushroom", "Svampe-umami. Pinot. Cabernet er for tanninrig."],
    ["med BBQ-sovs", "bbqSweet", "Sød BBQ. Zinfandel. Tør pinot mister grebet."],
    ["med pesto", "herbalWhite", "Pesto er urter og olie. Vermentino. Kraftig primitivo er for tung."],
    ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Tør cabernet bliver bitter."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med kokos", "coconutCurry", "Kokos. Riesling. Tør sauvignon bliver skarp."],
    ["med lime og koriander", "freshWhite", "Lime. Sauvignon. Tung rød er forkert."],
    ["med røget paprika", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
    ["med honningglasur", "sweetSpice", "Honning. Riesling. Tør cabernet bliver bitter."],
    ["med sennep", "juicyRed", "Sennep. Gamay. Kraftig cabernet bliver bitter."],
    ["med aioli", "bubbles", "Aioli. Cava. Tung rød bliver bitter."],
    ["med salsa verde", "lemonHerb", "Salsa verde. Assyrtiko. Fad chardonnay bliver tung."],
    ["med mangochutney", "sweetSpice", "Mango. Gewürztraminer. Cabernet bliver bitter."],
    ["med jalapeño", "chiliHeat", "Jalapeño. Riesling. Cabernet forstærker varmen."],
    ["med bacon", "juicyRed", "Bacon. Garnacha. Let pinot kan mangle fylde."],
    ["med avocado", "freshWhite", "Avocado. Sauvignon. Malbec er for tung."],
  ];

  for (const [parentSlug, stem, tag] of EXTRA_PARENTS) {
    if (!parentExists(parentSlug)) continue;
    for (const [modPart, profileKey, delta] of EXTRA_MODS) {
      if (out.length >= 520) break;
      const base = {
        parentSlug,
        dishStem: stem,
        tag,
        related: [{ slug: parentSlug, label: parentLabelFromSlug(parentSlug) }],
      };
      const dish = buildDish(base, modPart, profileKey, delta);
      if (seen.has(dish.slug)) continue;
      if (EXISTING.some((e) => e.slug === dish.slug)) continue;
      seen.add(dish.slug);
      out.push(dish);
    }
  }

  const file = `/**
 * Auto-genereret af scripts/build-micro-catalog-500.mjs
 * ${out.length} ekstra mikro-retter (ud over base-kataloget).
 */
/** @typedef {import('./micro-pairings-catalog.mjs').MicroDish} MicroDish */

/** @type {import('./micro-pairings-catalog.mjs').MicroDish[]} */
export const MICRO_DISHES_EXTRA = ${JSON.stringify(out, null, 2)};
`;

  // Fix typedef - MicroDish isn't exported as type from mjs. Simpler export:
  const file2 = `/**
 * Auto-genereret af scripts/build-micro-catalog-500.mjs
 * ${out.length} ekstra mikro-retter (ud over base-kataloget).
 */

/** @type {import('./micro-pairings-catalog.mjs').MICRO_DISHES extends Array<infer T> ? T[] : never} */
export const MICRO_DISHES_EXTRA = ${JSON.stringify(out, null, 2)};
`;

  fs.writeFileSync(
    outPath,
    `/**
 * Auto-genereret af scripts/build-micro-catalog-500.mjs
 * ${out.length} ekstra mikro-retter (ud over base-kataloget).
 */

export const MICRO_DISHES_EXTRA = ${JSON.stringify(out, null, 2)};
`,
  );
  console.log(`skrev ${out.length} ekstra retter til ${path.relative(root, outPath)}`);
  console.log(`total med eksisterende: ${EXISTING.length + out.length}`);
}

main();
