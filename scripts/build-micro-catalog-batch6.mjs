/**
 * Batch 6: ~250 mikro-retter (flere varianter på underfyldte forældre).
 * Kør: node scripts/build-micro-catalog-batch6.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MICRO_DISHES as BASE } from "./micro-pairings-catalog.mjs";
import { MICRO_DISHES_EXTRA as EXTRA } from "./micro-pairings-catalog-extra.mjs";
import { MICRO_DISHES_BATCH3 as BATCH3 } from "./micro-pairings-catalog-batch3.mjs";
import { MICRO_DISHES_BATCH4 as BATCH4 } from "./micro-pairings-catalog-batch4.mjs";
import { MICRO_DISHES_BATCH5 as BATCH5 } from "./micro-pairings-catalog-batch5.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const guidesDir = path.join(root, "content/guides");
const outPath = path.join(root, "scripts/micro-pairings-catalog-batch6.mjs");
const EXISTING = [...BASE, ...EXTRA, ...BATCH3, ...BATCH4, ...BATCH5];
const TARGET = 250;

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

const PROFILES = {
  lighterRed: { defaultWine: "pinot noir", altWine: "gamay", avoidWine: "cabernet sauvignon", searchQuery: "pinot noir gamay" },
  juicyRed: { defaultWine: "garnacha", altWine: "barbera", avoidWine: "malbec", searchQuery: "garnacha barbera" },
  spicyRed: { defaultWine: "syrah", altWine: "malbec", avoidWine: "pinot noir", searchQuery: "syrah malbec" },
  sweetSpice: { defaultWine: "riesling", altWine: "gewürztraminer", avoidWine: "cabernet sauvignon", searchQuery: "riesling gewurztraminer" },
  freshWhite: { defaultWine: "sauvignon blanc", altWine: "albariño", avoidWine: "chardonnay", searchQuery: "sauvignon blanc albarino" },
  creamyWhite: { defaultWine: "chardonnay", altWine: "pinot blanc", avoidWine: "sauvignon blanc", searchQuery: "chardonnay pinot blanc" },
  herbalWhite: { defaultWine: "vermentino", altWine: "sauvignon blanc", avoidWine: "primitivo", searchQuery: "vermentino sauvignon blanc" },
  bubbles: { defaultWine: "cava", altWine: "crémant", avoidWine: "malbec", searchQuery: "cava cremant" },
  rose: { defaultWine: "rosé", altWine: "gamay", avoidWine: "cabernet sauvignon", searchQuery: "rose gamay" },
  italianTomato: { defaultWine: "sangiovese", altWine: "barbera", avoidWine: "riesling", searchQuery: "sangiovese barbera" },
  umamiRed: { defaultWine: "pinot noir", altWine: "nebbiolo", avoidWine: "zinfandel", searchQuery: "pinot noir nebbiolo" },
  bbqSweet: { defaultWine: "zinfandel", altWine: "riesling", avoidWine: "cabernet sauvignon", searchQuery: "zinfandel riesling" },
  saltyFish: { defaultWine: "albariño", altWine: "muscadet", avoidWine: "pinot noir", searchQuery: "albarino muscadet" },
  coconutCurry: { defaultWine: "riesling", altWine: "gewürztraminer", avoidWine: "sauvignon blanc", searchQuery: "riesling gewurztraminer" },
  lemonHerb: { defaultWine: "sauvignon blanc", altWine: "assyrtiko", avoidWine: "chardonnay", searchQuery: "sauvignon blanc assyrtiko" },
  blueCheese: { defaultWine: "riesling", altWine: "portvin", avoidWine: "cabernet sauvignon", searchQuery: "riesling portvin" },
  mushroom: { defaultWine: "pinot noir", altWine: "chardonnay", avoidWine: "cabernet sauvignon", searchQuery: "pinot noir chardonnay" },
  chiliHeat: { defaultWine: "riesling", altWine: "rosé", avoidWine: "zinfandel", searchQuery: "riesling rose" },
  smoky: { defaultWine: "syrah", altWine: "tempranillo", avoidWine: "sauvignon blanc", searchQuery: "syrah tempranillo" },
  sherry: { defaultWine: "fino sherry", altWine: "manzanilla", avoidWine: "malbec", searchQuery: "fino sherry manzanilla" },
  sweetDessert: { defaultWine: "sauternes", altWine: "moscatel", avoidWine: "cabernet sauvignon", searchQuery: "sauternes moscatel" },
  germanWhite: { defaultWine: "riesling", altWine: "silvaner", avoidWine: "malbec", searchQuery: "riesling silvaner" },
  greekWhite: { defaultWine: "assyrtiko", altWine: "moschofilero", avoidWine: "cabernet sauvignon", searchQuery: "assyrtiko moschofilero" },
  portuguese: { defaultWine: "vinho verde", altWine: "alvarinho", avoidWine: "malbec", searchQuery: "vinho verde alvarinho" },
  nordic: { defaultWine: "riesling", altWine: "pinot noir", avoidWine: "zinfandel", searchQuery: "riesling pinot noir" },
};

/** [parentSlug, dishStem, tag, mods] — 4 nye, unikke mods pr. forælder */
const BASES = [
  ["vin-til-gas", "gås", "gås", [
    ["med æblemostglasur", "sweetSpice", "Æblemost. Riesling. Cabernet bliver bitter."],
    ["med rødkål og æbler", "lighterRed", "Rødkål. Pinot. Cabernet er for tanninrig."],
    ["med kastanjepuré", "umamiRed", "Kastanjer. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med appelsin og krydderi", "sweetSpice", "Appelsin. Gewürztraminer. Cabernet bliver bitter."],
    ["med sprød skind og sennep", "juicyRed", "Sennep. Garnacha. Cabernet er for tanninrig."],
    ["med svesker og port", "bbqSweet", "Svesker. Zinfandel. Tør pinot mister grebet."],
  ]],
  ["vin-til-studenterfest", "studenterfest", "fest", [
    ["med tacos buffet", "chiliHeat", "Tacos. Riesling. Zinfandel forstærker varmen."],
    ["med poke bowls", "freshWhite", "Poke. Sauvignon. Malbec er for tung."],
    ["med cheesecake", "sweetDessert", "Cheesecake. Moscatel. Tør cabernet bliver bitter."],
    ["med grillspyd", "bbqSweet", "Grill. Zinfandel. Tør pinot mister grebet."],
  ]],
  ["vin-til-indisk-mad", "indisk mad", "indisk", [
    ["med tikka masala mild", "coconutCurry", "Mild creme. Riesling. Tør sauvignon bliver skarp."],
    ["med saag paneer", "freshWhite", "Spinat. Sauvignon. Malbec er for tung."],
    ["med vindaloo hot", "chiliHeat", "Vindaloo. Riesling. Zinfandel forstærker varmen."],
    ["med mango lassi dessert", "sweetDessert", "Mango. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-thai-mad", "thai mad", "thai", [
    ["med massaman", "coconutCurry", "Massaman. Riesling. Tør sauvignon bliver skarp."],
    ["med som tum", "freshWhite", "Syre. Sauvignon. Malbec er for tung."],
    ["med pad see ew", "umamiRed", "Sød soya. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med tom yum hot", "chiliHeat", "Chili/syre. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-japansk-mad", "japansk mad", "japansk", [
    ["med katsu curry", "sweetSpice", "Katsu. Riesling. Cabernet bliver bitter."],
    ["med yakitori tare", "umamiRed", "Tare. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med spicy mayo roll", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med matcha dessert", "sweetDessert", "Matcha. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-koreansk-mad", "koreansk mad", "koreansk", [
    ["med bibimbap", "umamiRed", "Bibimbap. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med bulgogi", "bbqSweet", "Bulgogi. Zinfandel. Tør pinot mister grebet."],
    ["med kimchi jjigae", "chiliHeat", "Kimchi. Riesling. Zinfandel forstærker varmen."],
    ["med hotteok", "sweetDessert", "Sød. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-kinesisk-mad", "kinesisk mad", "kinesisk", [
    ["med mapo tofu", "chiliHeat", "Sichuan. Riesling. Zinfandel forstærker varmen."],
    ["med peking duck wraps", "sweetSpice", "Sød glaze. Riesling. Cabernet bliver bitter."],
    ["med hot pot mild", "umamiRed", "Bouillon. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med sesame balls", "sweetDessert", "Sesam. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-vietnamesisk-mad", "vietnamesisk mad", "vietnamesisk", [
    ["med bun bo hue mild", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med com tam", "umamiRed", "Grillet kød. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med ca ri ga", "coconutCurry", "Karry. Riesling. Tør sauvignon bliver skarp."],
    ["med che ba mau", "sweetDessert", "Sød. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-mexicansk-mad", "mexicansk mad", "mexicansk", [
    ["med birria", "spicyRed", "Birria. Syrah. Let pinot drukner."],
    ["med ceviche tostadas", "freshWhite", "Ceviche. Sauvignon. Malbec er for tung."],
    ["med chile relleno", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med flan", "sweetDessert", "Flan. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-mexicansk-mad-og-tacos", "taco", "mexicansk", [
    ["med lengua", "spicyRed", "Lengua. Syrah. Let pinot drukner."],
    ["med cauliflower", "herbalWhite", "Blomkål. Vermentino. Primitivo er for tung."],
    ["med salsa verde hot", "chiliHeat", "Salsa. Riesling. Zinfandel forstærker varmen."],
    ["med street corn salad", "freshWhite", "Majs/lime. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-spansk-mad", "spansk mad", "spansk", [
    ["med tortilla española", "herbalWhite", "Kartoffel/æg. Vermentino. Primitivo er for tung."],
    ["med gambas al ajillo", "saltyFish", "Hvidløg/rejer. Albariño. Pinot overdøver."],
    ["med albondigas", "italianTomato", "Kødboller. Sangiovese. Riesling matcher dårligt."],
    ["med churros chocolate", "sweetDessert", "Churros. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-portugisisk-mad", "portugisisk mad", "portugisisk", [
    ["med pastel de nata", "sweetDessert", "Nata. Moscatel. Tør cabernet bliver bitter."],
    ["med ameijoas", "portuguese", "Muslinger. Vinho verde. Malbec er for tung."],
    ["med cataplana", "saltyFish", "Fiskesuppe. Albariño. Pinot overdøver."],
    ["med piri piri kylling", "chiliHeat", "Piri piri. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-graesk-mad", "græsk mad", "græsk", [
    ["med souvlaki kylling", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["med spanakopita", "greekWhite", "Spinat/feta. Assyrtiko. Cabernet er for tung."],
    ["med grilled octopus", "saltyFish", "Blæksprutte. Albariño. Pinot overdøver."],
    ["med baklava", "sweetDessert", "Baklava. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-tyrkisk-mad", "tyrkisk mad", "tyrkisk", [
    ["med iskender", "spicyRed", "Iskender. Syrah. Let pinot drukner."],
    ["med mercimek corbasi", "herbalWhite", "Linser. Vermentino. Primitivo er for tung."],
    ["med cig kofte", "chiliHeat", "Krydder. Riesling. Zinfandel forstærker varmen."],
    ["med kunefe", "sweetDessert", "Künefe. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-libanesisk-mad", "libanesisk mad", "libanesisk", [
    ["med kibbeh", "juicyRed", "Kibbeh. Garnacha. Cabernet er for tanninrig."],
    ["med fattoush ekstra", "lemonHerb", "Sumak. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med shish taouk", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["med knafeh", "sweetDessert", "Knafeh. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-marokkansk-mad", "marokkansk mad", "marokkansk", [
    ["med chicken tagine citron", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med lamb couscous", "spicyRed", "Lam. Syrah. Let pinot drukner."],
    ["med harira", "chiliHeat", "Harira. Riesling. Zinfandel forstærker varmen."],
    ["med honey pastry", "sweetDessert", "Honning. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-afrikansk-mad", "afrikansk mad", "afrikansk", [
    ["med egusi stew", "coconutCurry", "Nødder. Riesling. Tør sauvignon bliver skarp."],
    ["med suya spice", "chiliHeat", "Suya. Riesling. Zinfandel forstærker varmen."],
    ["med grilled plantain", "sweetSpice", "Plantain. Riesling. Cabernet bliver bitter."],
    ["med coconut rice pudding", "sweetDessert", "Kokos. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-brasiliansk-mad", "brasiliansk mad", "brasiliansk", [
    ["med picanha salt crust", "spicyRed", "Picanha. Syrah. Let pinot drukner."],
    ["med acaraje", "bubbles", "Friture. Cava. Tung malbec bliver bitter."],
    ["med moqueca mild", "coconutCurry", "Kokos. Riesling. Tør sauvignon bliver skarp."],
    ["med brigadeiro", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-argentinsk-mad", "argentinsk mad", "argentinsk", [
    ["med choripan chimichurri", "herbalWhite", "Chimichurri. Vermentino. Primitivo er for tung."],
    ["med milanesa", "juicyRed", "Paneret. Garnacha. Cabernet er for tanninrig."],
    ["med locro mild", "juicyRed", "Locro. Barbera. Cabernet er for tanninrig."],
    ["med alfajores", "sweetDessert", "Alfajores. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-peruviansk-mad", "peruviansk mad", "peruviansk", [
    ["med lomo saltado", "umamiRed", "Lomo. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med aji de gallina", "creamyWhite", "Creme. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med causa lime", "freshWhite", "Lime. Sauvignon. Malbec er for tung."],
    ["med suspiro limeño", "sweetDessert", "Sød. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-caribisk-mad", "caribisk mad", "caribisk", [
    ["med oxtail stew", "spicyRed", "Oxtail. Syrah. Let pinot drukner."],
    ["med escovitch fish", "chiliHeat", "Chili/eddike. Riesling. Zinfandel forstærker varmen."],
    ["med callaloo", "herbalWhite", "Grønt. Vermentino. Primitivo er for tung."],
    ["med rum cake", "sweetDessert", "Romkage. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-asiatisk-mad", "asiatisk mad", "asiatisk", [
    ["med satay peanut ekstra", "sweetSpice", "Peanut. Riesling. Cabernet bliver bitter."],
    ["med green papaya salad", "freshWhite", "Papaya. Sauvignon. Malbec er for tung."],
    ["med coconut ice cream", "sweetDessert", "Kokos. Moscatel. Tør cabernet bliver bitter."],
    ["med chili crisp noodles", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-italiensk-mad", "italiensk mad", "italiensk", [
    ["med saltimbocca", "lighterRed", "Saltimbocca. Pinot. Cabernet er for tanninrig."],
    ["med cacio e pepe", "creamyWhite", "Ost/peber. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med arrabbiata", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med panna cotta", "sweetDessert", "Panna cotta. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-klassisk-fransk-mad", "fransk mad", "fransk", [
    ["med blanquette", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med cassoulet", "juicyRed", "Cassoulet. Garnacha. Cabernet er for tanninrig."],
    ["med salade nicoise", "freshWhite", "Salat. Sauvignon. Malbec er for tung."],
    ["med île flottante", "sweetDessert", "Dessert. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-provencalsk-mad", "provencalsk mad", "provence", [
    ["med bouillabaisse mild", "saltyFish", "Fiskesuppe. Albariño. Pinot overdøver."],
    ["med tapenade toast", "herbalWhite", "Oliven. Vermentino. Primitivo er for tung."],
    ["med grilled lamb herbes", "spicyRed", "Urter/lam. Syrah. Let pinot drukner."],
    ["med lavender honey dessert", "sweetDessert", "Honning. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-amerikansk-comfort-mad", "amerikansk comfort", "amerikansk", [
    ["med meatloaf gravy", "juicyRed", "Meatloaf. Garnacha. Cabernet er for tanninrig."],
    ["med fried chicken spicy", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med clam chowder", "creamyWhite", "Chowder. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med pecan pie", "sweetDessert", "Pecan. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-tapas", "tapas", "spansk", [
    ["med pan con tomate", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med padron peppers", "herbalWhite", "Peber. Vermentino. Primitivo er for tung."],
    ["med spicy chorizo", "chiliHeat", "Chorizo. Riesling. Zinfandel forstærker varmen."],
    ["med crema catalana tapas", "sweetDessert", "Crema. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-salat", "salat", "salat", [
    ["med halloumi grill", "freshWhite", "Halloumi. Sauvignon. Malbec er for tung."],
    ["med crispy bacon", "juicyRed", "Bacon. Gamay. Cabernet er for tanninrig."],
    ["med chili crunch", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med mango og rejer", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
  ]],
  ["vin-til-suppe", "suppe", "suppe", [
    ["med miso", "umamiRed", "Miso. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med pumpkin cream", "creamyWhite", "Græskar. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med spicy tomato", "chiliHeat", "Chili/tomat. Riesling. Zinfandel forstærker varmen."],
    ["med fish soup", "saltyFish", "Fisk. Albariño. Pinot overdøver."],
  ]],
  ["vin-til-gryderet", "gryderet", "gryde", [
    ["med okse og øl", "spicyRed", "Øl. Syrah. Let pinot drukner."],
    ["med kylling og citron", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med lam og rosmarin", "spicyRed", "Lam. Syrah. Let pinot drukner."],
    ["med vegetarisk linse", "herbalWhite", "Linser. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-julefrokost", "julefrokost", "jul", [
    ["med æbleflæsk", "sweetSpice", "Æble/flæsk. Riesling. Cabernet bliver bitter."],
    ["med røget ål", "umamiRed", "Ål. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med risalamande shot", "sweetDessert", "Risalamande. Moscatel. Tør cabernet bliver bitter."],
    ["med stærk sennepssild", "nordic", "Sennep/sild. Riesling. Zinfandel er for sød."],
  ]],
  ["vin-til-stegt-flaesk", "stegt flæsk", "flæsk", [
    ["med peberrodssauce", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med æblemos", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med chilihonning", "chiliHeat", "Chilihonning. Riesling. Zinfandel forstærker varmen."],
    ["med bearnaise", "creamyWhite", "Bearnaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-flaesketesteg", "flæskesteg", "flæskesteg", [
    ["med peberrod", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med æbleflæsk side", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med chili marmelade", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med trøffelsauce", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-poelser-og-kartoffel", "pølser", "pølser", [
    ["med sauerkraut", "germanWhite", "Surkål. Riesling. Malbec er for tung."],
    ["med chili relish", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med æblekompot", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med sennep og toast", "juicyRed", "Sennep. Gamay. Cabernet bliver bitter."],
  ]],
  ["vin-til-vildt", "vildt", "vildt", [
    ["med solbærglaze", "sweetSpice", "Solbær. Riesling. Cabernet bliver bitter."],
    ["med selleri og trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chili chokolade", "spicyRed", "Chili/chokolade. Syrah. Let pinot drukner."],
    ["med æble og selleri", "lighterRed", "Æble. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-and", "and", "and", [
    ["med hoisin wraps", "sweetSpice", "Hoisin. Riesling. Cabernet bliver bitter."],
    ["med figen", "sweetDessert", "Figen. Moscatel. Tør cabernet bliver bitter."],
    ["med chili glaze", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med selleripuré", "lighterRed", "Selleri. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-rejer", "rejer", "skaldyr", [
    ["med garlic butter", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med cocktail sauce", "bubbles", "Cocktail. Cava. Tung malbec bliver bitter."],
    ["med green curry", "coconutCurry", "Karry. Riesling. Tør sauvignon bliver skarp."],
    ["med chili garlic", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-torsk", "torsk", "fisk", [
    ["med bacon og ærter", "juicyRed", "Bacon. Gamay. Cabernet er for tanninrig."],
    ["med miso glaze", "umamiRed", "Miso. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chili og lime", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med beurre blanc ekstra", "creamyWhite", "Beurre blanc. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-karryretter", "karryret", "karry", [
    ["med thai rød mild", "coconutCurry", "Kokos. Riesling. Tør sauvignon bliver skarp."],
    ["med japansk katsu", "sweetSpice", "Sød. Riesling. Cabernet bliver bitter."],
    ["med indisk vindaloo tip", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med mango chutney side", "sweetSpice", "Mango. Gewürztraminer. Cabernet bliver bitter."],
  ]],
  ["vin-til-shakshuka", "shakshuka", "mellemøstlig", [
    ["med labneh", "freshWhite", "Labneh. Sauvignon. Malbec er for tung."],
    ["med merguez", "spicyRed", "Merguez. Syrah. Let pinot drukner."],
    ["med harissa ekstra hot", "chiliHeat", "Harissa. Riesling. Zinfandel forstærker varmen."],
    ["med avocado", "freshWhite", "Avocado. Sauvignon. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-nachos", "nachos", "mexicansk", [
    ["med carne asada", "spicyRed", "Carne. Syrah. Let pinot drukner."],
    ["med elote topping", "freshWhite", "Majs. Sauvignon. Malbec er for tung."],
    ["med queso fundido", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med mango salsa", "sweetSpice", "Mango. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-mac-and-cheese", "mac and cheese", "ost", [
    ["med lobster", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med kimchi", "chiliHeat", "Kimchi. Riesling. Zinfandel forstærker varmen."],
    ["med BBQ brisket", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
    ["med trøffel og champignon", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-pulled-pork", "pulled pork", "bbq", [
    ["med pineapple salsa", "sweetSpice", "Ananas. Riesling. Cabernet bliver bitter."],
    ["med chipotle", "chiliHeat", "Chipotle. Riesling. Zinfandel forstærker varmen."],
    ["med mustard sauce", "juicyRed", "Sennep. Barbera. Cabernet bliver bitter."],
    ["med pickle slaw", "freshWhite", "Pickles. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-gazpacho", "gazpacho", "spansk", [
    ["med crab", "saltyFish", "Krabbe. Albariño. Pinot overdøver."],
    ["med smoked paprika", "smoky", "Paprika. Syrah. Sauvignon bliver skarp."],
    ["med watermelon chili", "chiliHeat", "Chili/melon. Riesling. Zinfandel forstærker varmen."],
    ["med burrata", "creamyWhite", "Burrata. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-juleand", "juleand", "jul", [
    ["med portvinsglasur", "sweetSpice", "Port. Riesling. Cabernet bliver bitter."],
    ["med selleri og æble", "lighterRed", "Selleri/æble. Pinot. Cabernet er for tanninrig."],
    ["med chili marmelade", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med trøffel jus", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-oksekoed", "oksekød", "oksekød", [
    ["med miso butter", "umamiRed", "Miso. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med salsa verde", "herbalWhite", "Salsa verde. Vermentino. Primitivo er for tung."],
    ["med chili dry rub", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med bone marrow", "spicyRed", "Marv. Syrah. Let pinot drukner."],
  ]],
  ["vin-til-oksefilet", "oksefilet", "oksekød", [
    ["med café de paris", "creamyWhite", "Urtesmør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med green peppercorn", "spicyRed", "Peber. Syrah. Let pinot drukner."],
    ["med blue cheese crust", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
    ["med soy ginger", "umamiRed", "Soya. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-svinekoed", "svinekød", "svinekød", [
    ["med maple glaze", "bbqSweet", "Maple. Zinfandel. Tør pinot mister grebet."],
    ["med fennikel frø", "herbalWhite", "Fennikel. Vermentino. Primitivo er for tung."],
    ["med gochujang", "chiliHeat", "Gochujang. Riesling. Zinfandel forstærker varmen."],
    ["med sage butter", "creamyWhite", "Sage. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-vegetar", "vegetarret", "vegetar", [
    ["med halloumi steaks", "freshWhite", "Halloumi. Sauvignon. Malbec er for tung."],
    ["med mushroom wellington", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med harissa roasted veg", "chiliHeat", "Harissa. Riesling. Zinfandel forstærker varmen."],
    ["med coconut dal", "coconutCurry", "Dal. Riesling. Tør sauvignon bliver skarp."],
  ]],
  ["vin-til-vegetariske-og-veganske-retter", "vegansk ret", "vegansk", [
    ["med jackfruit taco", "chiliHeat", "Jackfruit. Riesling. Zinfandel forstærker varmen."],
    ["med cashew cream pasta", "creamyWhite", "Cashew. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med grilled tofu poke", "freshWhite", "Tofu. Sauvignon. Malbec er for tung."],
    ["med date caramel dessert", "sweetDessert", "Dadler. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-mozzarella-og-burrata", "burrata", "ost", [
    ["med peach og prosciutto", "rose", "Fersken. Rosé. Cabernet er for tung."],
    ["med roasted peppers", "italianTomato", "Peber. Sangiovese. Riesling matcher dårligt."],
    ["med chili crisp", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med balsamico strawberries", "sweetDessert", "Jordbær. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-parmesan", "parmesan", "ost", [
    ["med aged balsamic", "italianTomato", "Balsamico. Barbera. Riesling matcher dårligt."],
    ["med walnut bread", "umamiRed", "Valnød. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chili honey drizzle", "chiliHeat", "Chilihonning. Riesling. Zinfandel forstærker varmen."],
    ["med dried figs", "sweetDessert", "Figen. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-cheddar", "cheddar", "ost", [
    ["med onion jam", "sweetSpice", "Løgmarmelade. Riesling. Cabernet bliver bitter."],
    ["med smoked almonds", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
    ["med hot honey", "chiliHeat", "Honning/chili. Riesling. Zinfandel forstærker varmen."],
    ["med apple pie side", "sweetDessert", "Æble. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-feta", "feta", "ost", [
    ["med roasted beets", "freshWhite", "Rødbede. Sauvignon. Malbec er for tung."],
    ["med oregano oil", "greekWhite", "Oregano. Assyrtiko. Cabernet er for tung."],
    ["med spicy cucumber", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med honey baklava crumbs", "sweetDessert", "Honning. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-vesterhavsost", "vesterhavsost", "ost", [
    ["med dark chocolate", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med mustard seeds", "germanWhite", "Sennep. Riesling. Malbec er for tung."],
    ["med smoked salt", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
    ["med pear chutney", "sweetSpice", "Pære. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-gammel-knas", "gammel knas", "ost", [
    ["med quince paste", "sweetDessert", "Kvæde. Moscatel. Tør cabernet bliver bitter."],
    ["med rye crackers", "nordic", "Rug. Riesling. Zinfandel er for sød."],
    ["med hot pepper jelly", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med caramelized onion", "sweetSpice", "Løg. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-hard-ost", "hård ost", "ost", [
    ["med cherry compote", "sweetDessert", "Kirsebær. Moscatel. Tør cabernet bliver bitter."],
    ["med rosemary crackers", "herbalWhite", "Rosmarin. Vermentino. Primitivo er for tung."],
    ["med spicy mustard", "juicyRed", "Sennep. Gamay. Cabernet bliver bitter."],
    ["med cocoa nibs", "sweetDessert", "Kakao. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-hele-ostebordet", "ostebord", "ost", [
    ["med sparkling start", "bubbles", "Bobler. Cava. Tung malbec er for meget."],
    ["med sweet finish", "sweetDessert", "Sød. Sauternes. Tør cabernet bliver bitter."],
    ["med spicy accompaniments", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med smoked meats", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
  ]],
  ["vin-til-foie-gras", "foie gras", "foie", [
    ["med cherry reduction", "sweetDessert", "Kirsebær. Sauternes. Tør cabernet bliver bitter."],
    ["med gingerbread", "sweetSpice", "Ingefær. Gewürztraminer. Cabernet bliver bitter."],
    ["med smoked salt", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
    ["med passionfruit", "sweetSpice", "Passion. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-tatar-og-carpaccio", "tatar", "tatar", [
    ["med quail egg", "lighterRed", "Æg. Pinot. Cabernet er for tanninrig."],
    ["med yuzu", "freshWhite", "Yuzu. Sauvignon. Malbec er for tung."],
    ["med chili crisp", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med black garlic", "umamiRed", "Hvidløg. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-bearnaise", "bearnaise-ret", "sauce", [
    ["til grillspyd", "juicyRed", "Grill. Garnacha. Cabernet er for tanninrig."],
    ["til laks", "creamyWhite", "Laks. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["til pommes frites", "bubbles", "Pommes. Cava. Tung malbec bliver bitter."],
    ["til grøntsager", "herbalWhite", "Grønt. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-romantisk-middag", "romantisk middag", "middag", [
    ["med scallops", "creamyWhite", "Kammusling. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med lamb chops", "spicyRed", "Lam. Syrah. Let pinot drukner."],
    ["med chocolate souffle", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med caviar blinis", "bubbles", "Kaviar. Crémant. Tung malbec er for meget."],
  ]],
  ["vin-til-juleaften", "juleaften", "jul", [
    ["med medister side", "juicyRed", "Medister. Gamay. Cabernet er for tanninrig."],
    ["med æbleskiver dessert", "sweetDessert", "Æbleskiver. Moscatel. Tør cabernet bliver bitter."],
    ["med peberrodssild", "nordic", "Sild. Riesling. Zinfandel er for sød."],
    ["med trøffelmos", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-nytaar-og-nytaarsmenu", "nytårsmenu", "nytår", [
    ["med lobster thermidor", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med wagyu", "spicyRed", "Wagyu. Syrah. Let pinot drukner."],
    ["med champagne sorbet", "bubbles", "Sorbet. Cava. Tung malbec er for meget."],
    ["med truffle risotto", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-sankt-hans", "sankt hans", "sommer", [
    ["med grilled salmon", "saltyFish", "Laks. Albariño. Pinot overdøver."],
    ["med berry pavlova", "sweetDessert", "Bær. Moscatel. Tør cabernet bliver bitter."],
    ["med spicy wings", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med herb salad", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-brunch", "brunch", "brunch", [
    ["med french toast", "sweetDessert", "French toast. Moscatel. Tør cabernet bliver bitter."],
    ["med smoked trout", "saltyFish", "Ørred. Albariño. Pinot overdøver."],
    ["med spicy bloody mary eggs", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med mushroom omelette", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-piknik", "piknik", "piknik", [
    ["med prosciutto melon", "rose", "Melon. Rosé. Cabernet er for tung."],
    ["med chicken salad wraps", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["med chocolate cookies", "sweetDessert", "Cookies. Moscatel. Tør cabernet bliver bitter."],
    ["med spicy olives", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-haveselskab", "haveselskab", "haveselskab", [
    ["med grilled prawns", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med berry tart", "sweetDessert", "Tærte. Moscatel. Tør cabernet bliver bitter."],
    ["med herb focaccia", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
    ["med spicy aioli fries", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-mellemoestlig-mad", "mellemøstlig mad", "mellemøstlig", [
    ["med manakeesh", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
    ["med grilled halloumi", "freshWhite", "Halloumi. Sauvignon. Malbec er for tung."],
    ["med spicy muhammara", "chiliHeat", "Muhammara. Riesling. Zinfandel forstærker varmen."],
    ["med rose water dessert", "sweetDessert", "Rosenvand. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-georgisk-mad", "georgisk mad", "georgisk", [
    ["med lobio", "herbalWhite", "Bønner. Vermentino. Primitivo er for tung."],
    ["med ojakhuri", "spicyRed", "Kød. Syrah. Let pinot drukner."],
    ["med adjika heat", "chiliHeat", "Adjika. Riesling. Zinfandel forstærker varmen."],
    ["med churchkhela board", "sweetDessert", "Churchkhela. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-andalusisk-mad", "andalusisk mad", "andalusisk", [
    ["med pescaíto lemon", "bubbles", "Friture. Cava. Tung malbec bliver bitter."],
    ["med oxtail rabo", "spicyRed", "Hale. Syrah. Let pinot drukner."],
    ["med spicy gazpacho", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med tocino de cielo", "sweetDessert", "Sød. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-catalansk-mad", "catalansk mad", "catalansk", [
    ["med calcots romesco", "herbalWhite", "Romesco. Vermentino. Primitivo er for tung."],
    ["med butifarra negra", "spicyRed", "Pølse. Syrah. Let pinot drukner."],
    ["med spicy escalivada", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med mel i mato honey", "sweetDessert", "Honning. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-baskisk-mad", "baskisk mad", "baskisk", [
    ["med gilda pintxo", "sherry", "Oliven/ansjos. Fino. Malbec er for tung."],
    ["med kokotxas", "creamyWhite", "Sauce. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med spicy piperrada", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med burnt basque cheesecake", "sweetDessert", "Cheesecake. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-venetiansk-mad", "venetiansk mad", "venetiansk", [
    ["med cicchetti", "bubbles", "Cicchetti. Cava. Tung malbec er for meget."],
    ["med bigoli duck", "umamiRed", "And. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med spicy polenta", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med buranelli cookies", "sweetDessert", "Cookies. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-piemonte-mad", "piemonte mad", "piemonte", [
    ["med plin ravioli", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med finanziera", "umamiRed", "Indmad. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med spicy bagna", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med gianduja", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-australsk-bbq", "australsk bbq", "bbq", [
    ["med kangaroo steak", "spicyRed", "Kænguru. Syrah. Let pinot drukner."],
    ["med barramundi", "saltyFish", "Fisk. Albariño. Pinot overdøver."],
    ["med spicy bush rub", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med lamington", "sweetDessert", "Lamington. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-oksekoed-i-sauce", "oksekød i sauce", "oksekød", [
    ["med madeira", "umamiRed", "Madeira. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med stroganoff twist", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med spicy tomato ragout", "chiliHeat", "Chili/tomat. Riesling. Zinfandel forstærker varmen."],
    ["med herb jus", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-gule-aerter", "gule ærter", "gule ærter", [
    ["med medister ekstra", "juicyRed", "Medister. Gamay. Cabernet er for tanninrig."],
    ["med mustard cream", "germanWhite", "Sennep. Riesling. Malbec er for tung."],
    ["med chili oil", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med smoked bacon", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
  ]],
  ["vin-til-medister", "medister", "medister", [
    ["med onion gravy", "juicyRed", "Gravy. Garnacha. Cabernet er for tanninrig."],
    ["med pickled beet", "freshWhite", "Rødbede. Sauvignon. Malbec er for tung."],
    ["med chili mustard", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med apple mustard", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-sild", "sild", "sild", [
    ["med beetroot cream", "nordic", "Rødbede. Riesling. Zinfandel er for sød."],
    ["med curry apple", "sweetSpice", "Karry/æble. Riesling. Cabernet bliver bitter."],
    ["med chili pickle", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med mustard dill", "freshWhite", "Dild. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-stjerneskud", "stjerneskud", "fisk", [
    ["med lobster topping", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med spicy remoulade", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med green asparagus", "lemonHerb", "Asparges. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med caviar tip", "bubbles", "Kaviar. Cava. Tung malbec er for meget."],
  ]],
  ["vin-til-tarteletter", "tarteletter", "tarteletter", [
    ["med lobster filling", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med mushroom madeira", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med spicy chicken", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med herb vegetable", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-gulasch", "gulasch", "gulasch", [
    ["med spaetzle", "juicyRed", "Spaetzle. Garnacha. Cabernet er for tanninrig."],
    ["med smoked paprika hot", "chiliHeat", "Paprika. Riesling. Zinfandel forstærker varmen."],
    ["med sour cream dill", "creamyWhite", "Creme. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med pickled cucumber", "freshWhite", "Syltet. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-boef-stroganoff", "stroganoff", "oksekød", [
    ["med brandy flame", "spicyRed", "Brandy. Syrah. Let pinot drukner."],
    ["med wild mushrooms", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med spicy paprika", "chiliHeat", "Paprika. Riesling. Zinfandel forstærker varmen."],
    ["med egg noodles butter", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-peberboef", "peberbøf", "oksekød", [
    ["med cognac cream", "creamyWhite", "Cognac. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med triple pepper", "spicyRed", "Peber. Syrah. Let pinot drukner."],
    ["med chili butter", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med herb fries", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-roastbeef", "roastbeef", "oksekød", [
    ["med horseradish foam", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med gravy yorkshire", "juicyRed", "Gravy. Garnacha. Cabernet er for tanninrig."],
    ["med spicy mustard crust", "chiliHeat", "Sennep/chili. Riesling. Zinfandel forstærker varmen."],
    ["med herb oil", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-okseskank", "okseskank", "oksekød", [
    ["med orange zest", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
    ["med polenta truffle", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med spicy tomato base", "chiliHeat", "Chili/tomat. Riesling. Zinfandel forstærker varmen."],
    ["med root mash", "juicyRed", "Rodfrugt. Garnacha. Cabernet er for tanninrig."],
  ]],
  ["vin-til-svinemoerbrad", "svinemørbrad", "svinekød", [
    ["med cider pan sauce", "sweetSpice", "Cider. Riesling. Cabernet bliver bitter."],
    ["med mustard crust", "juicyRed", "Sennep. Barbera. Cabernet bliver bitter."],
    ["med chili apricot", "chiliHeat", "Chili/abrikos. Riesling. Zinfandel forstærker varmen."],
    ["med sage pancetta", "umamiRed", "Sage. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-svinekam", "svinekam", "svinekød", [
    ["med crackling chili salt", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med fennel apple", "sweetSpice", "Fennikel/æble. Riesling. Cabernet bliver bitter."],
    ["med mustard gravy", "juicyRed", "Sennep. Gamay. Cabernet bliver bitter."],
    ["med herb stuffing", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-kalvemoerbrad", "kalvemørbrad", "kalv", [
    ["med morel cream", "mushroom", "Moraller. Pinot. Cabernet er for tanninrig."],
    ["med lemon capers", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med chili oil tip", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med marsala", "umamiRed", "Marsala. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-dyreryg", "dyreryg", "vildt", [
    ["med blackberry", "sweetSpice", "Brombær. Riesling. Cabernet bliver bitter."],
    ["med juniper cream", "spicyRed", "Enebær. Syrah. Let pinot drukner."],
    ["med chili cacao", "spicyRed", "Chili/kakao. Malbec. Let pinot drukner."],
    ["med celeriac puree", "lighterRed", "Selleri. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-lys-fisk", "lys fisk", "fisk", [
    ["med brown butter", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med salsa criolla", "freshWhite", "Salsa. Sauvignon. Malbec er for tung."],
    ["med chili sesame", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med herb crust", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-grillet-fisk", "grillet fisk", "fisk", [
    ["med mango chili salsa", "chiliHeat", "Mango/chili. Riesling. Zinfandel forstærker varmen."],
    ["med olive tapenade", "herbalWhite", "Oliven. Vermentino. Primitivo er for tung."],
    ["med miso butter", "umamiRed", "Miso. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med lemon thyme", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-tunboef", "tunbøf", "fisk", [
    ["med ponzu", "freshWhite", "Ponzu. Sauvignon. Malbec er for tung."],
    ["med black pepper crust", "spicyRed", "Peber. Syrah. Let pinot drukner."],
    ["med spicy mayo", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med avocado wasabi", "freshWhite", "Wasabi. Sauvignon. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-blaeksprutte", "blæksprutte", "skaldyr", [
    ["med romesco", "herbalWhite", "Romesco. Vermentino. Primitivo er for tung."],
    ["med ink pasta", "umamiRed", "Blæk. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chili garlic oil", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med lemon oregano", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-krebse", "krebs", "skaldyr", [
    ["med dill cream", "freshWhite", "Dild. Sauvignon. Malbec er for tung."],
    ["med garlic butter bath", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med spicy cajun", "chiliHeat", "Cajun. Riesling. Zinfandel forstærker varmen."],
    ["med lemon aioli", "bubbles", "Aioli. Cava. Tung malbec bliver bitter."],
  ]],
  ["vin-til-aeggekage-og-frittata", "frittata", "æg", [
    ["med smoked salmon", "saltyFish", "Laks. Albariño. Pinot overdøver."],
    ["med spicy nduja", "chiliHeat", "Nduja. Riesling. Zinfandel forstærker varmen."],
    ["med goat cheese herbs", "freshWhite", "Gedeost. Sauvignon. Malbec er for tung."],
    ["med mushroom truffle", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-crepes-og-pandekager", "pandekager", "dessert", [
    ["med salted caramel", "sweetDessert", "Karamel. Sauternes. Tør cabernet bliver bitter."],
    ["med lemon sugar extra", "sweetSpice", "Citron. Riesling. Cabernet bliver bitter."],
    ["med ham cheese savory", "creamyWhite", "Skinke/ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med berry compote", "sweetDessert", "Bær. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-roedgroed", "rødgrød", "dessert", [
    ["med almond milk", "sweetDessert", "Mandel. Moscatel. Tør cabernet bliver bitter."],
    ["med lime zest", "sweetSpice", "Lime. Riesling. Cabernet bliver bitter."],
    ["med chili strawberry", "chiliHeat", "Chili/jordbær. Riesling. Zinfandel forstærker varmen."],
    ["med vanilla ice extra", "sweetDessert", "Vanilje. Sauternes. Tør rød bliver bitter."],
  ]],
  ["vin-til-koldskaal", "koldskål", "dessert", [
    ["med strawberry crush", "sweetDessert", "Jordbær. Moscatel. Tør cabernet bliver bitter."],
    ["med lemon zest", "sweetSpice", "Citron. Riesling. Cabernet bliver bitter."],
    ["med cardamom", "sweetSpice", "Kardemomme. Gewürztraminer. Cabernet bliver bitter."],
    ["med biscuit crumble", "sweetDessert", "Kiks. Sauternes. Tør rød bliver bitter."],
  ]],
  ["vin-til-kransekage", "kransekage", "dessert", [
    ["med dark chocolate dip", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med orange blossom", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
    ["med coffee glaze", "sweetDessert", "Kaffe. Sauternes. Tør rød bliver bitter."],
    ["med cherry jam", "sweetDessert", "Kirsebær. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-dessert-og-kransekage", "dessert", "dessert", [
    ["med berry pavlova", "sweetDessert", "Pavlova. Moscatel. Tør cabernet bliver bitter."],
    ["med salted caramel tart", "sweetDessert", "Karamel. Sauternes. Tør rød bliver bitter."],
    ["med citrus posset", "sweetSpice", "Citrus. Riesling. Cabernet bliver bitter."],
    ["med chocolate fondant", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-efterarsmad", "efterårsret", "efterår", [
    ["med squash risotto", "creamyWhite", "Squash. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med game sausage", "spicyRed", "Vildtpølse. Syrah. Let pinot drukner."],
    ["med chili roasted squash", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med apple crumble", "sweetDessert", "Æble. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-sommer", "sommerret", "sommer", [
    ["med grilled peaches", "rose", "Fersken. Rosé. Cabernet er for tung."],
    ["med seafood platter", "saltyFish", "Skaldyr. Albariño. Pinot overdøver."],
    ["med spicy watermelon salad", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med berry fool", "sweetDessert", "Bær. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-frokost", "frokostret", "frokost", [
    ["med open sandwich salmon", "saltyFish", "Laks. Albariño. Pinot overdøver."],
    ["med grilled cheese tomato", "italianTomato", "Tomat/ost. Sangiovese. Riesling matcher dårligt."],
    ["med spicy chicken wrap", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med fruit yogurt bowl", "freshWhite", "Yoghurt. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-glogg", "gløgg-aften", "jul", [
    ["med gingerbread men", "sweetSpice", "Ingefær. Gewürztraminer. Cabernet bliver bitter."],
    ["med blue cheese bites", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
    ["med chili chocolate", "chiliHeat", "Chili/chokolade. Riesling. Zinfandel forstærker varmen."],
    ["med almond cake", "sweetDessert", "Mandel. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-konfirmation", "konfirmation", "fest", [
    ["med cold roastbeef", "lighterRed", "Roastbeef. Pinot. Cabernet er for tanninrig."],
    ["med shrimp cocktail", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med berry pavlova", "sweetDessert", "Pavlova. Moscatel. Tør cabernet bliver bitter."],
    ["med cheese canapes", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-osso-buco", "osso buco", "oksekød", [
    ["med saffron risotto extra", "creamyWhite", "Saffron. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med spicy tomato base", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med gremolata lemon heavy", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med bone marrow toast", "umamiRed", "Marv. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-gaas", "gås classic", "gås", [
    ["med quince", "sweetSpice", "Kvæde. Riesling. Cabernet bliver bitter."],
    ["med red cabbage bacon", "juicyRed", "Bacon/rødkål. Garnacha. Cabernet er for tanninrig."],
    ["med chili plum", "chiliHeat", "Blomme/chili. Riesling. Zinfandel forstærker varmen."],
    ["med chestnut stuffing", "umamiRed", "Kastanjer. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-aebleskiver", "æbleskiver", "dessert", [
    ["med caramel sauce", "sweetDessert", "Karamel. Sauternes. Tør cabernet bliver bitter."],
    ["med raspberry jam", "sweetDessert", "Hindbær. Moscatel. Tør rød bliver bitter."],
    ["med chili chocolate dip", "chiliHeat", "Chili/chokolade. Riesling. Zinfandel forstærker varmen."],
    ["med orange zest sugar", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-asiatisk-takeaway-dumplings-sushi-ramen", "asiatisk takeaway", "asiatisk", [
    ["med spicy miso ramen", "chiliHeat", "Miso/chili. Riesling. Zinfandel forstærker varmen."],
    ["med salmon avocado roll", "saltyFish", "Laks. Albariño. Pinot overdøver."],
    ["med pork gyoza", "umamiRed", "Gyoza. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med mango sticky rice", "sweetDessert", "Mango. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-fars-dag", "fars dag", "fest", [
    ["med tomahawk", "spicyRed", "Tomahawk. Syrah. Let pinot drukner."],
    ["med smoked brisket", "bbqSweet", "Brisket. Zinfandel. Tør pinot mister grebet."],
    ["med spicy nachos", "chiliHeat", "Nachos. Riesling. Zinfandel forstærker varmen."],
    ["med whiskey caramel dessert", "sweetDessert", "Karamel. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-mors-dag", "mors dag", "fest", [
    ["med lobster salad", "saltyFish", "Hummer. Albariño. Pinot overdøver."],
    ["med champagne strawberries", "sweetDessert", "Jordbær. Moscatel. Tør cabernet bliver bitter."],
    ["med herb roasted chicken", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["med goat cheese tart", "freshWhite", "Gedeost. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-crunch", "crunch snack", "snack", [
    ["med truffle chips", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med wasabi peas", "freshWhite", "Wasabi. Sauvignon. Malbec er for tung."],
    ["med spicy corn nuts", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med caramel popcorn", "sweetDessert", "Karamel. Moscatel. Tør cabernet bliver bitter."],
  ]],
];

function buildDish(parentSlug, dishStem, tag, modPart, profileKey, delta) {
  const profile = PROFILES[profileKey];
  if (!profile) throw new Error(`unknown profile ${profileKey} for ${modPart}`);
  const dish = `${dishStem} ${modPart}`.replace(/\s+/g, " ").trim();
  const slug = `vin-til-${slugify(dish)}`;
  return {
    slug,
    dish,
    label: `Vin til ${dish}`,
    parentSlug,
    parentLabel: parentLabelFromSlug(parentSlug),
    delta,
    defaultWine: profile.defaultWine,
    altWine: profile.altWine,
    avoidWine: profile.avoidWine,
    searchQuery: profile.searchQuery,
    tags: [tag, "mad og vin"],
    related: [{ slug: parentSlug, label: parentLabelFromSlug(parentSlug) }],
  };
}

function main() {
  const seen = new Set(EXISTING.map((d) => d.slug));
  const out = [];

  for (const [parentSlug, dishStem, tag, mods] of BASES) {
    if (!parentExists(parentSlug)) {
      console.warn(`skip missing parent ${parentSlug}`);
      continue;
    }
    for (const [modPart, profileKey, delta] of mods) {
      if (out.length >= TARGET) break;
      const dish = buildDish(parentSlug, dishStem, tag, modPart, profileKey, delta);
      if (seen.has(dish.slug)) continue;
      const wines = [dish.defaultWine, dish.altWine, dish.avoidWine].map((w) => w.toLowerCase());
      if (new Set(wines).size !== 3) {
        console.warn(`skip ${dish.slug}: duplicate wines`);
        continue;
      }
      seen.add(dish.slug);
      out.push(dish);
    }
    if (out.length >= TARGET) break;
  }

  fs.writeFileSync(
    outPath,
    `/**
 * Auto-genereret af scripts/build-micro-catalog-batch6.mjs
 * ${out.length} mikro-retter (batch 6).
 */

export const MICRO_DISHES_BATCH6 = ${JSON.stringify(out, null, 2)};
`,
  );
  console.log(`skrev ${out.length} retter til ${path.relative(root, outPath)}`);
  console.log(`total katalog herefter: ${EXISTING.length + out.length}`);
  console.log(`unikke forældre: ${new Set(out.map((d) => d.parentSlug)).size}`);
}

main();
