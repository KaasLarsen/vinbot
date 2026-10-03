/**
 * Batch 5: ~250 mikro-retter (ubrugte forældre + flere varianter).
 * Kør: node scripts/build-micro-catalog-batch5.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MICRO_DISHES as BASE } from "./micro-pairings-catalog.mjs";
import { MICRO_DISHES_EXTRA as EXTRA } from "./micro-pairings-catalog-extra.mjs";
import { MICRO_DISHES_BATCH3 as BATCH3 } from "./micro-pairings-catalog-batch3.mjs";
import { MICRO_DISHES_BATCH4 as BATCH4 } from "./micro-pairings-catalog-batch4.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const guidesDir = path.join(root, "content/guides");
const outPath = path.join(root, "scripts/micro-pairings-catalog-batch5.mjs");
const EXISTING = [...BASE, ...EXTRA, ...BATCH3, ...BATCH4];
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

/** Unused + underused parents with dish-specific mods */
const BASES = [
  ["vin-til-asiatisk-takeaway-dumplings-sushi-ramen", "asiatisk takeaway", "asiatisk", [
    ["dumplings dampede", "freshWhite", "Damp. Sauvignon. Malbec er for tung."],
    ["sushi nigiri", "saltyFish", "Sushi. Albariño. Pinot overdøver."],
    ["ramen med chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["fritterede wontons", "bubbles", "Friture. Cava. Tung malbec bliver bitter."],
    ["teriyaki kylling", "sweetSpice", "Sød soya. Riesling. Cabernet bliver bitter."],
    ["spicy tuna roll", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["gyoza stegte", "bubbles", "Stegt. Cava. Cabernet er for tanninrig."],
    ["miso ramen", "umamiRed", "Miso. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-fars-dag", "fars dag", "fest", [
    ["med steak", "spicyRed", "Steak. Syrah. Let pinot drukner."],
    ["med burger", "juicyRed", "Burger. Garnacha. Cabernet er for tanninrig."],
    ["med BBQ ribs", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
    ["med chili wings", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med chokoladekage", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med røget ost", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
  ]],
  ["vin-til-mors-dag", "mors dag", "fest", [
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med asparges", "lemonHerb", "Asparges. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med bobler og snacks", "bubbles", "Snacks. Cava. Tung malbec er for meget."],
    ["med jordbærdessert", "sweetDessert", "Jordbær. Moscatel. Tør cabernet bliver bitter."],
    ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Malbec er for tung."],
    ["med kylling i fløde", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-fastelavn", "fastelavn", "fest", [
    ["med fastelavnsboller", "sweetDessert", "Boller. Moscatel. Tør cabernet bliver bitter."],
    ["med flødecreme", "sweetDessert", "Fløde. Sauternes. Tør rød bliver bitter."],
    ["med chokolade", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med syltetøj", "sweetDessert", "Syltetøj. Sauternes. Cabernet bliver bitter."],
    ["med kanel", "sweetSpice", "Kanel. Riesling. Cabernet bliver bitter."],
    ["med mandel", "sweetDessert", "Mandel. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-gas", "gås", "gås", [
    ["med æbler", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med rødkål", "lighterRed", "Rødkål. Pinot. Cabernet er for tanninrig."],
    ["med svesker", "bbqSweet", "Svesker. Zinfandel. Tør pinot mister grebet."],
    ["med kastanjer", "umamiRed", "Kastanjer. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med appelsin", "sweetSpice", "Appelsin. Gewürztraminer. Cabernet bliver bitter."],
    ["med sprød skind", "juicyRed", "Fedme. Garnacha. Cabernet er for tanninrig."],
  ]],
  ["vin-til-pinse-og-kristi-himmelfart", "pinse", "fest", [
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med asparges", "lemonHerb", "Asparges. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med grill", "juicyRed", "Grill. Garnacha. Cabernet er for tanninrig."],
    ["med jordbær", "sweetDessert", "Jordbær. Moscatel. Tør cabernet bliver bitter."],
    ["med kyllingesalat", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
  ]],
  ["vin-til-pakkeleg", "pakkeleg", "jul", [
    ["med pebernødder", "sweetSpice", "Krydderi. Gewürztraminer. Cabernet bliver bitter."],
    ["med ost", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chokolade", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med nødder", "sweetDessert", "Nødder. Moscatel. Tør cabernet bliver bitter."],
    ["med chili-snacks", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med kransekagebidder", "sweetDessert", "Kransekage. Sauternes. Tør rød bliver bitter."],
  ]],
  ["vin-til-sommerbryllup", "sommerbryllup", "fest", [
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med kylling", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["med dessertbuffet", "sweetDessert", "Dessert. Moscatel. Tør cabernet bliver bitter."],
    ["med ost", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med rosé-menu", "rose", "Rosé-menu. Rosé. Cabernet er for tung."],
  ]],
  ["vin-til-svigerforaeldre-besog", "svigerforældre besøg", "middag", [
    ["med roastbeef", "lighterRed", "Roastbeef. Pinot. Cabernet er for tanninrig."],
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med kylling i fløde", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med ostebord", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chokolademousse", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med asparges forret", "lemonHerb", "Asparges. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-supermarkedets-ostebord", "supermarked ostebord", "ost", [
    ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
    ["med brie", "creamyWhite", "Brie. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med cheddar", "juicyRed", "Cheddar. Garnacha. Cabernet er for tanninrig."],
    ["med feta", "greekWhite", "Feta. Assyrtiko. Cabernet er for tung."],
    ["med honning og nødder", "sweetSpice", "Honning. Riesling. Cabernet bliver bitter."],
    ["med chili chips", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-crunch", "crunch snack", "snack", [
    ["med chips og dip", "bubbles", "Chips. Cava. Tung malbec er for meget."],
    ["med nachos", "chiliHeat", "Nachos. Riesling. Zinfandel forstærker varmen."],
    ["med popcorn salt", "bubbles", "Popcorn. Crémant. Cabernet er forkert."],
    ["med nødder", "umamiRed", "Nødder. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med oliven", "sherry", "Oliven. Fino. Malbec er for tung."],
    ["med chili crisps", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-vinkyndig-gave", "vinkyndig gave-aften", "gave", [
    ["med ost", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chokolade", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med nødder", "sweetSpice", "Nødder. Riesling. Cabernet bliver bitter."],
    ["med charcuteri", "juicyRed", "Charcuteri. Garnacha. Cabernet er for tanninrig."],
    ["med foie gras", "sweetDessert", "Foie. Sauternes. Tør cabernet bliver bitter."],
    ["med trøffel snacks", "umamiRed", "Trøffel. Nebbiolo. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-grillet-gront", "grillet grønt", "vegetar", [
    ["med pesto", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
    ["med feta", "greekWhite", "Feta. Assyrtiko. Cabernet er for tung."],
    ["med chiliolie", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med tahin", "freshWhite", "Tahin. Sauvignon. Malbec er for tung."],
    ["med balsamico", "italianTomato", "Balsamico. Sangiovese. Riesling matcher dårligt."],
    ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Fad chardonnay bliver smørret."],
    ["med miso", "umamiRed", "Miso. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med citron og urter", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-fisk-og-chips", "fisk og chips", "fisk", [
    ["med remoulade", "bubbles", "Remoulade. Cava. Tung malbec bliver bitter."],
    ["med citronmayo", "freshWhite", "Citron. Sauvignon. Fad chardonnay bliver smørret."],
    ["med chili mayo", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med mushy peas", "herbalWhite", "Ærter. Vermentino. Primitivo er for tung."],
    ["med eddike", "lemonHerb", "Eddike. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med tartarsauce", "bubbles", "Tartar. Crémant. Cabernet er for tanninrig."],
  ]],
  ["vin-til-butter-chicken", "butter chicken", "indisk", [
    ["ekstra cremet", "coconutCurry", "Fløde. Riesling. Tør sauvignon bliver skarp."],
    ["med mere chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med naan og smør", "sweetSpice", "Smør/sød. Gewürztraminer. Cabernet bliver bitter."],
    ["med spinach side", "freshWhite", "Spinat. Sauvignon. Malbec er for tung."],
    ["mild version", "creamyWhite", "Mild. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med mango chutney", "sweetSpice", "Mango. Riesling. Cabernet bliver bitter."],
  ]],
];

/** Extra mods on parents that already have ~6 children */
const EXPANSIONS = [
  ["vin-til-paella", "paella", "spansk", [
    ["med chorizo ekstra", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
    ["vegetarisk med artiskok", "herbalWhite", "Artiskok. Vermentino. Primitivo er for tung."],
    ["med blæksprutte", "saltyFish", "Blæksprutte. Albariño. Pinot overdøver."],
    ["sort med blæk", "umamiRed", "Blæk. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-ramen", "ramen", "asiatisk", [
    ["tonkotsu fed", "umamiRed", "Fed bouillon. Pinot. Zinfandel bliver marmeladeagtig."],
    ["shoyu klassisk", "freshWhite", "Soya. Sauvignon. Malbec er for tung."],
    ["med blødt æg", "creamyWhite", "Æg. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med chili oil ekstra", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-pulled-pork", "pulled pork", "bbq", [
    ["med coleslaw", "bbqSweet", "Sød/syrlig. Zinfandel. Tør pinot mister grebet."],
    ["med jalapeños", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["på brioche", "juicyRed", "Brioche. Garnacha. Cabernet er for tanninrig."],
    ["med æbleeddike", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-nachos", "nachos", "mexicansk", [
    ["med guacamole tungt", "freshWhite", "Avocado. Sauvignon. Malbec er for tung."],
    ["med pulled chicken", "chiliHeat", "Chili/kylling. Riesling. Zinfandel forstærker varmen."],
    ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
    ["vegetariske med bønner", "italianTomato", "Bønner/tomat. Sangiovese. Riesling matcher dårligt."],
  ]],
  ["vin-til-svampe", "svampe", "svampe", [
    ["stegt med hvidløg", "herbalWhite", "Hvidløg. Vermentino. Primitivo er for tung."],
    ["i fløde på toast", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["grillet med citron", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med soya og ingefær", "umamiRed", "Soya. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-ribeye", "ribeye", "oksekød", [
    ["med chimichurri", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
    ["med blåskimmel smør", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
    ["med pebercrust", "spicyRed", "Peber. Syrah. Let pinot drukner."],
    ["med trøffelsmør", "umamiRed", "Trøffel. Nebbiolo. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-lam", "lam", "lam", [
    ["med myntesauce", "herbalWhite", "Mynte. Vermentino. Primitivo er for tung."],
    ["med harissa", "chiliHeat", "Harissa. Riesling. Zinfandel forstærker varmen."],
    ["med rosmarin og hvidløg", "spicyRed", "Rosmarin. Syrah. Let pinot drukner."],
    ["med yoghurt og gurkemeje", "coconutCurry", "Yoghurt. Riesling. Tør sauvignon bliver skarp."],
  ]],
  ["vin-til-and", "and", "and", [
    ["med kirsebærsauce", "sweetSpice", "Kirsebær. Riesling. Cabernet bliver bitter."],
    ["med appelsin", "sweetSpice", "Appelsin. Gewürztraminer. Cabernet bliver bitter."],
    ["konfit med salat", "lighterRed", "Konfit. Pinot. Cabernet er for tanninrig."],
    ["med ingefærglasur", "sweetSpice", "Ingefær. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-mac-and-cheese", "mac and cheese", "ost", [
    ["med bacon", "juicyRed", "Bacon. Garnacha. Cabernet er for tanninrig."],
    ["med jalapeño", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med hummertopping", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-moussaka", "moussaka", "græsk", [
    ["med mere kanel", "sweetSpice", "Kanel. Gewürztraminer. Cabernet bliver bitter."],
    ["vegetarisk med linser", "italianTomato", "Linser. Sangiovese. Riesling matcher dårligt."],
    ["med feta på toppen", "greekWhite", "Feta. Assyrtiko. Cabernet er for tung."],
    ["ekstra aubergine", "herbalWhite", "Aubergine. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-shakshuka", "shakshuka", "mellemøstlig", [
    ["med feta", "greekWhite", "Feta. Assyrtiko. Cabernet er for tung."],
    ["ekstra chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med chorizo", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
    ["med spinat", "herbalWhite", "Spinat. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-kebab-og-shawarma", "kebab", "mellemøstlig", [
    ["kylling med hvidløgssauce", "juicyRed", "Hvidløg. Garnacha. Cabernet er for tanninrig."],
    ["lam med chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["falafel wrap", "herbalWhite", "Falafel. Vermentino. Primitivo er for tung."],
    ["med pickles tungt", "freshWhite", "Pickles. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-dim-sum", "dim sum", "kinesisk", [
    ["siu mai", "freshWhite", "Damp. Sauvignon. Malbec er for tung."],
    ["har gow", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["char siu bao", "sweetSpice", "Sød. Riesling. Cabernet bliver bitter."],
    ["chili dumpling", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-pho", "pho", "vietnamesisk", [
    ["med oksekød rare", "umamiRed", "Okse. Pinot. Zinfandel bliver marmeladeagtig."],
    ["kylling pho", "freshWhite", "Kylling. Sauvignon. Malbec er for tung."],
    ["ekstra chili og lime", "chiliHeat", "Chili/lime. Riesling. Zinfandel forstærker varmen."],
    ["med sennepgrønt", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-hummer", "hummer", "skaldyr", [
    ["grillet med smør", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med aioli", "bubbles", "Aioli. Cava. Tung malbec bliver bitter."],
    ["i tomatsauce", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med chili og lime", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-oesters", "østers", "skaldyr", [
    ["med mignonette", "bubbles", "Eddike. Cava. Tung malbec er for meget."],
    ["grillet med smør", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med chili sauce", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med citron kun", "saltyFish", "Citron. Albariño. Pinot overdøver."],
  ]],
  ["vin-til-muslinger", "muslinger", "skaldyr", [
    ["i hvidvin", "freshWhite", "Hvidvin. Sauvignon. Malbec er for tung."],
    ["med chorizo", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
    ["med kokos og chili", "coconutCurry", "Kokos/chili. Riesling. Tør sauvignon bliver skarp."],
    ["med fløde og urter", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-ceviche", "ceviche", "skaldyr", [
    ["med grapefrugt", "freshWhite", "Grapefrugt. Sauvignon. Malbec er for tung."],
    ["med passionfrugt", "sweetSpice", "Passion. Riesling. Cabernet bliver bitter."],
    ["med blæksprutte", "saltyFish", "Blæksprutte. Albariño. Pinot overdøver."],
    ["ekstra koriander", "herbalWhite", "Koriander. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-gazpacho", "gazpacho", "spansk", [
    ["med rejer", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Fad chardonnay bliver smørret."],
    ["med sherryeddike", "sherry", "Sherry. Fino. Malbec er for tung."],
    ["med melon", "sweetSpice", "Melon. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-asparges", "asparges", "grønt", [
    ["med brunet smør", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med gedeostcreme", "freshWhite", "Gedeost. Sauvignon. Malbec er for tung."],
    ["med bacon", "juicyRed", "Bacon. Gamay. Cabernet er for tanninrig."],
    ["med miso", "umamiRed", "Miso. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-fondue", "fondue", "ost", [
    ["med cornichoner", "freshWhite", "Syrligt. Sauvignon. Malbec er for tung."],
    ["med spegepølse", "juicyRed", "Pølse. Garnacha. Cabernet er for tanninrig."],
    ["med chiliolie", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med hvidløgsbrød", "creamyWhite", "Hvidløg. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-raclette", "raclette", "ost", [
    ["med kartofler ekstra", "creamyWhite", "Kartofler. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med cornichoner", "freshWhite", "Syrligt. Sauvignon. Malbec er for tung."],
    ["med røget skinke", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
    ["med chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-quiche", "quiche", "æg", [
    ["med bacon og løg", "juicyRed", "Bacon. Gamay. Cabernet er for tanninrig."],
    ["med laks og dild ekstra", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med broccoli", "herbalWhite", "Broccoli. Vermentino. Primitivo er for tung."],
    ["med chili og cheddar", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-falafel-og-hummus", "falafel", "mellemøstlig", [
    ["med amba", "sweetSpice", "Amba. Riesling. Cabernet bliver bitter."],
    ["med zhug", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med aubergine", "herbalWhite", "Aubergine. Vermentino. Primitivo er for tung."],
    ["med yoghurt dressing", "freshWhite", "Yoghurt. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-couscous", "couscous", "mellemøstlig", [
    ["med merguez", "spicyRed", "Merguez. Syrah. Let pinot drukner."],
    ["med citron og oliven", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med græskar", "creamyWhite", "Græskar. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med harissa ekstra", "chiliHeat", "Harissa. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-tomatsuppe", "tomatsuppe", "suppe", [
    ["med grillede ostemadder", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med basilikumpesto", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
    ["med chiliolie", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
  ]],
  ["vin-til-kartoffelmad", "kartoffelmad", "kartoffel", [
    ["med remoulade og bacon", "juicyRed", "Bacon. Gamay. Cabernet er for tanninrig."],
    ["med røget laks", "saltyFish", "Laks. Albariño. Pinot overdøver."],
    ["med chili mayo", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-kalkun", "kalkun", "kalkun", [
    ["med tranebær", "sweetSpice", "Tranebær. Riesling. Cabernet bliver bitter."],
    ["med sage stuffing", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
    ["med flødesovs", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["røget kalkun", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
  ]],
  ["vin-til-juleand", "juleand", "jul", [
    ["med svesker og æbler", "sweetSpice", "Svesker. Riesling. Cabernet bliver bitter."],
    ["med rødkål ekstra", "lighterRed", "Rødkål. Pinot. Cabernet er for tanninrig."],
    ["med appelsinglasur", "sweetSpice", "Appelsin. Gewürztraminer. Cabernet bliver bitter."],
    ["med kastanjepuré", "umamiRed", "Kastanjer. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-paaske-og-paaskefrokost", "påskefrokost", "påske", [
    ["med lammekølle", "spicyRed", "Lam. Syrah. Let pinot drukner."],
    ["med sild og æg", "nordic", "Sild. Riesling. Zinfandel er for sød."],
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med påskekylling", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-mortensaften", "mortensaften", "gås", [
    ["med æbler og svesker", "sweetSpice", "Æble/svesker. Riesling. Cabernet bliver bitter."],
    ["med rødkål", "lighterRed", "Rødkål. Pinot. Cabernet er for tanninrig."],
    ["med brunede kartofler", "juicyRed", "Søde kartofler. Garnacha. Cabernet er for tanninrig."],
    ["med stegt and alternativ", "lighterRed", "And. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-alsace-mad", "alsace mad", "alsace", [
    ["med munster ekstra", "germanWhite", "Munster. Riesling. Malbec er for tung."],
    ["med baeckeoffe", "juicyRed", "Baeckeoffe. Garnacha. Cabernet er for tanninrig."],
    ["med tarte flambée bacon", "juicyRed", "Bacon. Barbera. Cabernet er for tanninrig."],
    ["med choucroute fisk", "freshWhite", "Fisk/surkål. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-bourgogne-mad", "bourgogne mad", "bourgogne", [
    ["med escargot ekstra", "creamyWhite", "Escargot. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med coq au vin", "lighterRed", "Coq au vin. Pinot. Cabernet er for tanninrig."],
    ["med gougères", "bubbles", "Gougères. Cava. Tung malbec er for meget."],
    ["med dijon kylling", "creamyWhite", "Dijon. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-sicilianske-retter", "siciliansk mad", "siciliansk", [
    ["med sardiner rosiner", "sweetSpice", "Sød/salt. Riesling. Cabernet bliver bitter."],
    ["med caponata ekstra", "italianTomato", "Caponata. Sangiovese. Riesling matcher dårligt."],
    ["med swordfish chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med cannoli", "sweetDessert", "Cannoli. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-toscansk-mad", "toscansk mad", "toscansk", [
    ["med ribollita ekstra", "italianTomato", "Ribollita. Sangiovese. Riesling matcher dårligt."],
    ["med bistecca", "spicyRed", "Bistecca. Syrah. Let pinot drukner."],
    ["med crostini lever", "umamiRed", "Lever. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med cantucci", "sweetDessert", "Cantucci. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-polsk-mad", "polsk mad", "polsk", [
    ["med bigos", "juicyRed", "Bigos. Garnacha. Cabernet er for tanninrig."],
    ["med pierogi ost", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med barszcz", "freshWhite", "Rødbede. Sauvignon. Malbec er for tung."],
    ["med kielbasa grill", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
  ]],
  ["vin-til-ungarsk-mad", "ungarsk mad", "ungarsk", [
    ["med gulyás ekstra", "spicyRed", "Gulyás. Syrah. Let pinot drukner."],
    ["med paprikash", "juicyRed", "Paprika. Garnacha. Cabernet er for tanninrig."],
    ["med lángos", "bubbles", "Lángos. Cava. Tung malbec bliver bitter."],
    ["med dobos", "sweetDessert", "Dobos. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-svensk-mad", "svensk mad", "svensk", [
    ["med köttbullar ekstra", "juicyRed", "Köttbullar. Gamay. Cabernet er for tanninrig."],
    ["med gravad laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med räksmörgås", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med prinsesstårta", "sweetDessert", "Kage. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-norsk-mad", "norsk mad", "norsk", [
    ["med røget laks ekstra", "saltyFish", "Laks. Albariño. Pinot overdøver."],
    ["med kjøttkaker", "juicyRed", "Kjøttkaker. Gamay. Cabernet er for tanninrig."],
    ["med fenalår", "lighterRed", "Fenalår. Pinot. Cabernet er for tanninrig."],
    ["med multekrem", "sweetDessert", "Multer. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-oktoberfest-mad", "oktoberfest mad", "tysk", [
    ["med schweinshaxe", "juicyRed", "Haxe. Garnacha. Cabernet er for tanninrig."],
    ["med weisswurst", "germanWhite", "Weisswurst. Silvaner. Malbec er for tung."],
    ["med pretzels og sennep", "germanWhite", "Sennep. Riesling. Malbec er for tung."],
    ["med apfelstrudel", "sweetDessert", "Strudel. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-brittisk-mad", "britisk mad", "britisk", [
    ["med sunday roast", "juicyRed", "Roast. Garnacha. Cabernet er for tanninrig."],
    ["med shepherd pie", "juicyRed", "Pie. Barbera. Cabernet er for tanninrig."],
    ["med sticky toffee", "sweetDessert", "Toffee. Moscatel. Tør cabernet bliver bitter."],
    ["med ploughmans", "freshWhite", "Ost/pickle. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-krydret-og-staerk-mad", "stærk mad", "stærk", [
    ["med gochujang", "chiliHeat", "Gochujang. Riesling. Zinfandel forstærker varmen."],
    ["med sriracha mayo", "chiliHeat", "Sriracha. Riesling. Zinfandel forstærker varmen."],
    ["med cayenne stege", "spicyRed", "Cayenne. Syrah. Let pinot drukner."],
    ["med mango chili", "sweetSpice", "Mango/chili. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-blaaskimmelost", "blåskimmelost", "ost", [
    ["med dadler", "sweetDessert", "Dadler. Moscatel. Tør cabernet bliver bitter."],
    ["med selleri", "freshWhite", "Selleri. Sauvignon. Malbec er for tung."],
    ["med chutney", "sweetSpice", "Chutney. Riesling. Cabernet bliver bitter."],
    ["bagt med nødder", "blueCheese", "Nødder. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-gedeost", "gedeost", "ost", [
    ["med rødbede hummus", "freshWhite", "Rødbede. Sauvignon. Malbec er for tung."],
    ["med rosiner", "sweetSpice", "Rosiner. Riesling. Cabernet bliver bitter."],
    ["grillet med pesto", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
    ["med blomme", "sweetDessert", "Blomme. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-brie-og-camembert", "brie", "ost", [
    ["med figenmarmelade", "sweetDessert", "Figen. Moscatel. Tør cabernet bliver bitter."],
    ["med rosmarin", "herbalWhite", "Rosmarin. Vermentino. Primitivo er for tung."],
    ["med chilihonning", "chiliHeat", "Chilihonning. Riesling. Zinfandel forstærker varmen."],
    ["i salat med nødder", "freshWhite", "Salat. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-chokolademousse", "chokolademousse", "dessert", [
    ["med appelsin", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
    ["med whisky noter", "sweetDessert", "Whisky. Moscatel. Tør cabernet bliver bitter."],
    ["med hasselnød", "sweetDessert", "Hasselnød. Sauternes. Tør rød bliver bitter."],
    ["med espresso", "sweetDessert", "Espresso. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-risalamande", "risalamande", "dessert", [
    ["med kirsebær ekstra syrlige", "sweetSpice", "Syrlige kirsebær. Riesling. Cabernet bliver bitter."],
    ["med kokos", "sweetDessert", "Kokos. Moscatel. Tør cabernet bliver bitter."],
    ["med rom", "sweetDessert", "Rom. Sauternes. Tør rød bliver bitter."],
    ["med pistacie", "sweetDessert", "Pistacie. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-aebleskiver", "æbleskiver", "dessert", [
    ["med vaniljesukker", "sweetDessert", "Vanilje. Moscatel. Tør cabernet bliver bitter."],
    ["med nutella", "sweetDessert", "Nutella. Sauternes. Tør rød bliver bitter."],
    ["med æble og kanel ekstra", "sweetSpice", "Æble/kanel. Riesling. Cabernet bliver bitter."],
    ["med fløde og bær", "sweetDessert", "Bær. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-roedgroed", "rødgrød", "dessert", [
    ["med vaniljecreme", "sweetDessert", "Vanilje. Sauternes. Tør cabernet bliver bitter."],
    ["med rabarber", "sweetSpice", "Rabarber. Riesling. Cabernet bliver bitter."],
    ["med kokosflager", "sweetDessert", "Kokos. Moscatel. Tør rød bliver bitter."],
    ["kold med is", "sweetDessert", "Is. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-brunch", "brunch", "brunch", [
    ["med croque monsieur", "juicyRed", "Croque. Garnacha. Cabernet er for tanninrig."],
    ["med granola og yoghurt", "freshWhite", "Yoghurt. Sauvignon. Malbec er for tung."],
    ["med chorizo scramble", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
    ["med mimosa-stemning", "bubbles", "Bobler. Cava. Tung malbec er for meget."],
  ]],
  ["vin-til-piknik", "piknik", "piknik", [
    ["med baguette og ost", "freshWhite", "Ost. Sauvignon. Malbec er for tung."],
    ["med kyllingewraps", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["med melon og skinke", "rose", "Melon. Rosé. Cabernet er for tung."],
    ["med brownie", "sweetDessert", "Brownie. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-haveselskab", "haveselskab", "haveselskab", [
    ["med grilled corn", "creamyWhite", "Majs. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med ceviche cups", "saltyFish", "Ceviche. Albariño. Pinot overdøver."],
    ["med ostesticks", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med sommerdessert", "sweetDessert", "Dessert. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-skipperlabskovs", "skipperlabskovs", "labskovs", [
    ["med bacon ekstra", "juicyRed", "Bacon. Barbera. Cabernet er for tanninrig."],
    ["med gulerødder søde", "sweetSpice", "Sød. Riesling. Cabernet bliver bitter."],
    ["vegetarisk med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med chili flakes", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-medister", "medister", "medister", [
    ["med kartoffelmos", "juicyRed", "Mos. Gamay. Cabernet er for tanninrig."],
    ["med persillesauce", "freshWhite", "Persille. Sauvignon. Malbec er for tung."],
    ["med æblekompot ekstra", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["grillet med sennep", "juicyRed", "Sennep. Barbera. Cabernet bliver bitter."],
  ]],
  ["vin-til-sild", "sild", "sild", [
    ["med karrycreme ekstra", "sweetSpice", "Karry. Riesling. Cabernet bliver bitter."],
    ["med tomat og løg", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med chili marinade", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med dildmayo", "freshWhite", "Dild. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-stjerneskud", "stjerneskud", "fisk", [
    ["med rejer og asparges", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med citron og kapers", "lemonHerb", "Kapers. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med chili mayo", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med avocado creme", "freshWhite", "Avocado. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-tarteletter", "tarteletter", "tarteletter", [
    ["med høns i asparges ekstra", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med svampe og madeira", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med rejer og dild", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med karry og æble", "sweetSpice", "Karry. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-gulasch", "gulasch", "gulasch", [
    ["med mere paprika", "spicyRed", "Paprika. Syrah. Let pinot drukner."],
    ["med kartoffel ekstra", "juicyRed", "Kartoffel. Garnacha. Cabernet er for tanninrig."],
    ["med chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med creme fraiche", "creamyWhite", "Creme. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-boef-stroganoff", "stroganoff", "oksekød", [
    ["med champignon ekstra", "mushroom", "Champignon. Pinot. Cabernet er for tanninrig."],
    ["med dijon", "juicyRed", "Dijon. Barbera. Cabernet bliver bitter."],
    ["med paprika", "spicyRed", "Paprika. Syrah. Let pinot drukner."],
    ["med ris og dild ekstra", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-peberboef", "peberbøf", "oksekød", [
    ["med cognac flambé", "spicyRed", "Cognac. Syrah. Let pinot drukner."],
    ["med creme ekstra", "creamyWhite", "Creme. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med grøn peber", "spicyRed", "Peber. Malbec. Let pinot drukner."],
    ["med pommes", "juicyRed", "Pommes. Garnacha. Cabernet er for tanninrig."],
  ]],
  ["vin-til-roastbeef", "roastbeef", "oksekød", [
    ["med peberrodcreme ekstra", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med remoulade", "bubbles", "Remoulade. Cava. Tung malbec bliver bitter."],
    ["varm med gravy", "juicyRed", "Gravy. Garnacha. Cabernet er for tanninrig."],
    ["med trøffelmayo ekstra", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-okseskank", "okseskank", "oksekød", [
    ["med gremolata", "herbalWhite", "Gremolata. Vermentino. Primitivo er for tung."],
    ["med rodfrugter ekstra", "juicyRed", "Rodfrugt. Garnacha. Cabernet er for tanninrig."],
    ["med mørk øl i sauce", "spicyRed", "Øl. Syrah. Let pinot drukner."],
    ["med polenta", "creamyWhite", "Polenta. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-svinemoerbrad", "svinemørbrad", "svinekød", [
    ["med blåskimmel sauce", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
    ["med æblecidersauce", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med pesto crust", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
    ["med BBQ rub", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
  ]],
  ["vin-til-svinekam", "svinekam", "svinekød", [
    ["med æblemostglasur", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med fennikel", "herbalWhite", "Fennikel. Vermentino. Primitivo er for tung."],
    ["med chili glaze", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med svampesauce", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-kalvemoerbrad", "kalvemørbrad", "kalv", [
    ["med morelsauce", "mushroom", "Moraller. Pinot. Cabernet er for tanninrig."],
    ["med citronbutter", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med trøffel", "umamiRed", "Trøffel. Nebbiolo. Zinfandel bliver marmeladeagtig."],
    ["med paprika creme", "creamyWhite", "Paprika. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-dyreryg", "dyreryg", "vildt", [
    ["med solbær", "sweetSpice", "Solbær. Riesling. Cabernet bliver bitter."],
    ["med selleripuré", "lighterRed", "Selleri. Pinot. Cabernet er for tanninrig."],
    ["med chokolade tip", "spicyRed", "Chokolade. Syrah. Let pinot drukner."],
    ["med enebrær ekstra", "spicyRed", "Enebær. Malbec. Let pinot drukner."],
  ]],
  ["vin-til-tunboef", "tunbøf", "fisk", [
    ["med wasabi mayo", "freshWhite", "Wasabi. Sauvignon. Malbec er for tung."],
    ["med sesam og soya", "umamiRed", "Soya. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chili crunch", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med citronbutter", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-lys-fisk", "lys fisk", "fisk", [
    ["med beurre blanc", "creamyWhite", "Beurre blanc. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med salsa verde", "herbalWhite", "Salsa verde. Vermentino. Primitivo er for tung."],
    ["med chili og lime", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med kapers og citron", "lemonHerb", "Kapers. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-grillet-fisk", "grillet fisk", "fisk", [
    ["med chimichurri", "herbalWhite", "Chimichurri. Vermentino. Primitivo er for tung."],
    ["med mango salsa", "freshWhite", "Mango. Sauvignon. Malbec er for tung."],
    ["med chili rub", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med smør og dild", "creamyWhite", "Smør/dild. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-krebse", "krebs", "skaldyr", [
    ["med dildmayo", "freshWhite", "Dild. Sauvignon. Malbec er for tung."],
    ["med aioli", "bubbles", "Aioli. Cava. Tung malbec bliver bitter."],
    ["med chiliolie", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med citronbutter", "creamyWhite", "Citronbutter. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-blaeksprutte", "blæksprutte", "skaldyr", [
    ["grillet med paprika", "spicyRed", "Paprika. Syrah. Let pinot drukner."],
    ["i blækrisotto ekstra", "umamiRed", "Blæk. Pinot. Zinfandel bliver marmeladeagtig."],
    ["friteret med lemon", "bubbles", "Friture. Cava. Tung malbec bliver bitter."],
    ["med chili og hvidløg", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-crepes-og-pandekager", "pandekager", "dessert", [
    ["med nutella og banan", "sweetDessert", "Nutella. Moscatel. Tør cabernet bliver bitter."],
    ["med citron og sukker", "sweetSpice", "Citron. Riesling. Cabernet bliver bitter."],
    ["salte med skinke ost", "creamyWhite", "Skinke/ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med bær og fløde", "sweetDessert", "Bær. Sauternes. Tør rød bliver bitter."],
  ]],
  ["vin-til-aeggekage-og-frittata", "frittata", "æg", [
    ["med gedeost ekstra", "freshWhite", "Gedeost. Sauvignon. Malbec er for tung."],
    ["med chorizo ekstra", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
    ["med spinat og feta", "greekWhite", "Feta. Assyrtiko. Cabernet er for tung."],
    ["med svampe og urter", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-osso-buco", "osso buco", "oksekød", [
    ["med gremolata ekstra", "herbalWhite", "Gremolata. Vermentino. Primitivo er for tung."],
    ["med saffron risotto", "creamyWhite", "Saffron. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med tomat tungt", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med appelsinskal", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-ost-og-ostebord", "ostebord", "ost", [
    ["med komte tungt", "umamiRed", "Comté. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med frugtbrød", "sweetSpice", "Frugtbrød. Riesling. Cabernet bliver bitter."],
    ["med membraillo", "sweetDessert", "Marmelade. Moscatel. Tør cabernet bliver bitter."],
    ["med chili gelé", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-studenterfest", "studenterfest", "fest", [
    ["med hotdogs", "juicyRed", "Hotdogs. Garnacha. Cabernet er for tanninrig."],
    ["med sushi bakke", "saltyFish", "Sushi. Albariño. Pinot overdøver."],
    ["med brownie bites", "sweetDessert", "Brownie. Moscatel. Tør cabernet bliver bitter."],
    ["med spicy snacks", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
];

function buildDish(parentSlug, dishStem, tag, modPart, profileKey, delta) {
  const profile = PROFILES[profileKey];
  if (!profile) throw new Error(`unknown profile ${profileKey}`);
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

function tryPush(out, seen, dish) {
  if (out.length >= TARGET) return false;
  if (seen.has(dish.slug)) return true;
  const wines = [dish.defaultWine, dish.altWine, dish.avoidWine].map((w) => w.toLowerCase());
  if (new Set(wines).size !== 3) {
    console.warn(`skip ${dish.slug}: duplicate wines`);
    return true;
  }
  seen.add(dish.slug);
  out.push(dish);
  return true;
}

function main() {
  const seen = new Set(EXISTING.map((d) => d.slug));
  const out = [];

  for (const [parentSlug, dishStem, tag, mods] of [...BASES, ...EXPANSIONS]) {
    if (!parentExists(parentSlug)) {
      console.warn(`skip missing parent ${parentSlug}`);
      continue;
    }
    for (const [modPart, profileKey, delta] of mods) {
      const dish = buildDish(parentSlug, dishStem, tag, modPart, profileKey, delta);
      if (!tryPush(out, seen, dish)) break;
    }
    if (out.length >= TARGET) break;
  }

  fs.writeFileSync(
    outPath,
    `/**
 * Auto-genereret af scripts/build-micro-catalog-batch5.mjs
 * ${out.length} mikro-retter (batch 5).
 */

export const MICRO_DISHES_BATCH5 = ${JSON.stringify(out, null, 2)};
`,
  );
  console.log(`skrev ${out.length} retter til ${path.relative(root, outPath)}`);
  console.log(`total katalog herefter: ${EXISTING.length + out.length}`);
  console.log(`unikke forældre: ${new Set(out.map((d) => d.parentSlug)).size}`);
}

main();
