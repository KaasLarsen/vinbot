/**
 * Batch 4: ~250 mikro-retter på endnu ubrugte forældre.
 * Kør: node scripts/build-micro-catalog-batch4.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MICRO_DISHES as BASE } from "./micro-pairings-catalog.mjs";
import { MICRO_DISHES_EXTRA as EXTRA } from "./micro-pairings-catalog-extra.mjs";
import { MICRO_DISHES_BATCH3 as BATCH3 } from "./micro-pairings-catalog-batch3.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const guidesDir = path.join(root, "content/guides");
const outPath = path.join(root, "scripts/micro-pairings-catalog-batch4.mjs");
const EXISTING = [...BASE, ...EXTRA, ...BATCH3];
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

/** [parentSlug, dishStem, tag, mods] */
const BASES = [
  ["vin-til-mellemoestlig-mad", "mellemøstlig mad", "mellemøstlig", [
    ["hummus med chiliolie", "chiliHeat", "Chiliolie. Riesling. Zinfandel forstærker varmen."],
    ["falafel med tahin", "herbalWhite", "Tahin. Vermentino. Primitivo er for tung."],
    ["shawarma med hvidløg", "juicyRed", "Hvidløg. Garnacha. Let pinot drukner."],
    ["labneh med urter", "freshWhite", "Urter. Sauvignon. Malbec er for tung."],
    ["lamb kofta med yoghurt", "spicyRed", "Kofta. Syrah. Let pinot drukner."],
    ["fattoush med sumak", "lemonHerb", "Sumak. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-georgisk-mad", "georgisk mad", "georgisk", [
    ["khachapuri", "creamyWhite", "Ostebagt. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["khinkali", "juicyRed", "Dumplings. Barbera. Cabernet er for tanninrig."],
    ["ajapsandali", "herbalWhite", "Grønt. Vermentino. Primitivo er for tung."],
    ["mtsvadi grill", "spicyRed", "Grill. Syrah. Let pinot drukner."],
    ["pkhali med valnød", "freshWhite", "Valnød. Sauvignon. Malbec er for tung."],
    ["churchkhela dessert", "sweetDessert", "Sød. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-andalusisk-mad", "andalusisk mad", "andalusisk", [
    ["gazpacho", "sherry", "Kold tomat. Fino. Malbec er for tung."],
    ["pescaito frito", "bubbles", "Friture. Cava. Tung rød bliver bitter."],
    ["salmorejo", "sherry", "Flødeagtig tomat. Manzanilla. Cabernet er for kraftig."],
    ["berza med chorizo", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
    ["flamenquín", "juicyRed", "Fritteret. Garnacha. Cabernet er for tanninrig."],
    ["churros med chokolade", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-catalansk-mad", "catalansk mad", "catalansk", [
    ["pa amb tomàquet", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["escalivada", "herbalWhite", "Grillet grønt. Vermentino. Primitivo er for tung."],
    ["fideuà", "saltyFish", "Fisk/skaldyr. Albariño. Pinot overdøver."],
    ["botifarra med bønner", "juicyRed", "Pølse. Garnacha. Cabernet er for tanninrig."],
    ["crema catalana", "sweetDessert", "Cremet sød. Sauternes. Tør cabernet bliver bitter."],
    ["suquet de peix", "saltyFish", "Fiskesuppe. Muscadet. Malbec er for tung."],
  ]],
  ["vin-til-baskisk-mad", "baskisk mad", "baskisk", [
    ["pintxos med ansjos", "saltyFish", "Ansjos. Albariño. Pinot overdøver."],
    ["txuleton", "spicyRed", "Steg. Syrah. Let pinot drukner."],
    ["bacalao a la vizcaína", "freshWhite", "Torsk. Sauvignon. Fad chardonnay bliver smørret."],
    ["piperrada", "italianTomato", "Peber/tomat. Barbera. Riesling matcher dårligt."],
    ["goxua dessert", "sweetDessert", "Sød. Moscatel. Tør cabernet bliver bitter."],
    ["marmitako", "saltyFish", "Tunsuppe. Albariño. Malbec er for tung."],
  ]],
  ["vin-til-venetiansk-mad", "venetiansk mad", "venetiansk", [
    ["risotto al nero", "umamiRed", "Blæksprutte. Pinot. Zinfandel bliver marmeladeagtig."],
    ["fegato alla veneziana", "juicyRed", "Lever. Barbera. Cabernet er for tanninrig."],
    ["sarde in saor", "sweetSpice", "Sød/syrlig. Riesling. Cabernet bliver bitter."],
    ["baccalà mantecato", "creamyWhite", "Flødeagtig. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["risi e bisi", "freshWhite", "Ærter. Sauvignon. Malbec er for tung."],
    ["tiramisù", "sweetDessert", "Kaffe/sød. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-piemonte-mad", "piemonte mad", "piemonte", [
    ["vitello tonnato", "creamyWhite", "Tunmayo. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["brasato al barolo", "umamiRed", "Langtid. Nebbiolo. Zinfandel bliver marmeladeagtig."],
    ["bagna cauda", "herbalWhite", "Hvidløg/ansjos. Vermentino. Primitivo er for tung."],
    ["tajarin med smør", "creamyWhite", "Smør. Pinot blanc. Sauvignon skærer for hårdt."],
    ["carne cruda", "lighterRed", "Råt kød. Pinot. Cabernet er for tanninrig."],
    ["bonet dessert", "sweetDessert", "Chokolade/kaffe. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-australsk-bbq", "australsk bbq", "bbq", [
    ["beef ribs med BBQ", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
    ["snags på grill", "juicyRed", "Pølser. Garnacha. Cabernet er for tanninrig."],
    ["prawns med chili-lime", "chiliHeat", "Chili-lime. Riesling. Zinfandel forstærker varmen."],
    ["lamb chops med rosmarin", "spicyRed", "Lam. Syrah. Let pinot drukner."],
    ["corn med smør", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["pavlovamed frugt", "sweetDessert", "Frugt/sød. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-mexicansk-mad-og-tacos", "mexicansk mad", "mexicansk", [
    ["al pastor tacos", "chiliHeat", "Chili/ananas. Riesling. Zinfandel forstærker varmen."],
    ["carnitas", "juicyRed", "Fed svinekød. Garnacha. Cabernet er for tanninrig."],
    ["fish tacos med lime", "freshWhite", "Lime. Sauvignon. Malbec er for tung."],
    ["mole poblano", "sweetSpice", "Mole. Gewürztraminer. Cabernet bliver bitter."],
    ["elote med chili", "chiliHeat", "Chili/mayo. Riesling. Zinfandel forstærker varmen."],
    ["churros med cajeta", "sweetDessert", "Sød. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-tatar-og-carpaccio", "tatar", "tatar", [
    ["okse med kapers", "lighterRed", "Kapers. Pinot. Cabernet er for tanninrig."],
    ["laks med dild", "freshWhite", "Dild. Sauvignon. Malbec er for tung."],
    ["tun med soya", "umamiRed", "Soya. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med trøffelmayo", "umamiRed", "Trøffel. Nebbiolo. Zinfandel bliver marmeladeagtig."],
    ["med chiliolie", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["carpaccio med parmesan", "lighterRed", "Parmesan. Gamay. Cabernet er for tanninrig."],
  ]],
  ["vin-til-foie-gras", "foie gras", "foie", [
    ["med sauternes", "sweetDessert", "Klassisk sød. Sauternes. Tør cabernet bliver bitter."],
    ["med æblekompot", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["ristet på toast", "sweetDessert", "Toast/fedme. Moscatel. Tør rød bliver bitter."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med brioche", "sweetDessert", "Brioche. Sauternes. Cabernet er forkert."],
    ["med figensyltetøj", "sweetDessert", "Figen. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-oksekoed", "oksekød", "oksekød", [
    ["grillet medium", "spicyRed", "Grill. Syrah. Let pinot drukner."],
    ["med bearnaise", "creamyWhite", "Bearnaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med peberfløde", "spicyRed", "Peber. Malbec. Let pinot drukner."],
    ["langtid med rødvin", "umamiRed", "Rødvinssauce. Nebbiolo. Zinfandel bliver marmeladeagtig."],
    ["med chimichurri", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
    ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-oksefilet", "oksefilet", "oksekød", [
    ["med trøffelsauce", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med bearnaise", "juicyRed", "Bearnaise. Garnacha. Cabernet er for tanninrig."],
    ["grillet med urter", "lighterRed", "Urter. Pinot. Cabernet er for tanninrig."],
    ["med rødvinssauce", "spicyRed", "Sauce. Syrah. Let gamay drukner."],
    ["med peberrod", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-oksekoed-i-sauce", "oksekød i sauce", "oksekød", [
    ["creme sauce", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["tomatsauce", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["rødvinssauce", "spicyRed", "Rødvin. Syrah. Let pinot drukner."],
    ["pebersauce", "spicyRed", "Peber. Malbec. Let pinot drukner."],
    ["svampesauce", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["sennepssauce", "juicyRed", "Sennep. Barbera. Cabernet bliver bitter."],
  ]],
  ["vin-til-svinekoed", "svinekød", "svinekød", [
    ["med æble", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med sennep", "juicyRed", "Sennep. Gamay. Cabernet bliver bitter."],
    ["BBQ glasur", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
    ["med flødesovs", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["grillet med rosmarin", "herbalWhite", "Rosmarin. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-vegetar", "vegetarret", "vegetar", [
    ["grillede grøntsager", "herbalWhite", "Grillgrønt. Vermentino. Primitivo er for tung."],
    ["linser med tomat", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["svamperisotto", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["ostebagt aubergine", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["chili med bønner", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["rødbeder med gedeost", "freshWhite", "Gedeost. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-vegetariske-og-veganske-retter", "vegansk ret", "vegansk", [
    ["kokoskarry", "coconutCurry", "Kokos. Riesling. Tør sauvignon bliver skarp."],
    ["tofu med soya", "umamiRed", "Soya. Pinot. Zinfandel bliver marmeladeagtig."],
    ["ratatouille", "herbalWhite", "Grønt. Vermentino. Primitivo er for tung."],
    ["peanut stew", "chiliHeat", "Peanut/chili. Riesling. Zinfandel forstærker varmen."],
    ["rødbedebøf", "lighterRed", "Rødbede. Pinot. Cabernet er for tanninrig."],
    ["mango salsa skål", "freshWhite", "Mango/syre. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-mozzarella-og-burrata", "burrata", "ost", [
    ["med tomat og basilikum", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med pesto", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
    ["med chiliolie", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med prosciutto", "lighterRed", "Skinke. Pinot. Cabernet er for tanninrig."],
    ["bagt med honning", "sweetSpice", "Honning. Riesling. Cabernet bliver bitter."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-parmesan", "parmesan", "ost", [
    ["med honning", "sweetSpice", "Honning. Riesling. Cabernet bliver bitter."],
    ["med pære", "sweetDessert", "Pære. Moscatel. Tør cabernet bliver bitter."],
    ["med balsamico", "italianTomato", "Balsamico. Barbera. Riesling matcher dårligt."],
    ["på risotto", "creamyWhite", "Risotto. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med nødder", "umamiRed", "Nødder. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med trøffelhonning", "sweetSpice", "Trøffelhonning. Gewürztraminer. Cabernet bliver bitter."],
  ]],
  ["vin-til-cheddar", "cheddar", "ost", [
    ["moden med æble", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["i mac and cheese", "creamyWhite", "Flødeost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med chili jam", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["på burger", "juicyRed", "Burger. Garnacha. Cabernet er for tanninrig."],
    ["med pickles", "freshWhite", "Pickles. Sauvignon. Malbec er for tung."],
    ["røget cheddar", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
  ]],
  ["vin-til-feta", "feta", "ost", [
    ["grillet med honning", "sweetSpice", "Honning. Riesling. Cabernet bliver bitter."],
    ["i græsk salat", "greekWhite", "Salat. Assyrtiko. Cabernet er for tung."],
    ["med vandmelon", "freshWhite", "Vandmelon. Sauvignon. Malbec er for tung."],
    ["bagt med tomat", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med oliven og oregano", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-vesterhavsost", "vesterhavsost", "ost", [
    ["moden med æble", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med rugbrød", "nordic", "Rugbrød. Riesling. Zinfandel er for sød."],
    ["med honning", "sweetDessert", "Honning. Moscatel. Tør cabernet bliver bitter."],
    ["med pære", "freshWhite", "Pære. Sauvignon. Malbec er for tung."],
    ["med bacon", "juicyRed", "Bacon. Gamay. Cabernet er for tanninrig."],
    ["med syltede løg", "germanWhite", "Syrligt. Silvaner. Malbec er for tung."],
  ]],
  ["vin-til-gammel-knas", "gammel knas", "ost", [
    ["med æble", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med portvin", "blueCheese", "Port. Riesling/port. Cabernet bliver bitter."],
    ["med nødder", "umamiRed", "Nødder. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med rugbrød og smør", "nordic", "Rugbrød. Riesling. Zinfandel er for sød."],
    ["med chilihonning", "chiliHeat", "Chilihonning. Riesling. Zinfandel forstærker varmen."],
    ["med pære", "sweetDessert", "Pære. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-hard-ost", "hård ost", "ost", [
    ["med honning", "sweetSpice", "Honning. Riesling. Cabernet bliver bitter."],
    ["med nødder", "umamiRed", "Nødder. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med æble", "freshWhite", "Æble. Sauvignon. Malbec er for tung."],
    ["med balsamico", "italianTomato", "Balsamico. Barbera. Riesling matcher dårligt."],
    ["med trøffel", "umamiRed", "Trøffel. Nebbiolo. Zinfandel bliver marmeladeagtig."],
    ["med chutney", "sweetSpice", "Chutney. Gewürztraminer. Cabernet bliver bitter."],
  ]],
  ["vin-til-hele-ostebordet", "ostebord", "ost", [
    ["med blåskimmel tungt", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
    ["med gedeost tungt", "freshWhite", "Gedeost. Sauvignon. Malbec er for tung."],
    ["med hård ost tungt", "umamiRed", "Hård ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med søde vine", "sweetDessert", "Sød. Sauternes. Tør cabernet bliver bitter."],
    ["med chili snacks", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med frugt og nødder", "sweetSpice", "Frugt. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-bearnaise", "bearnaise-ret", "sauce", [
    ["til oksekød", "juicyRed", "Okse. Garnacha. Cabernet er for tanninrig."],
    ["til fisk", "creamyWhite", "Fisk. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["til asparges", "freshWhite", "Asparges. Sauvignon. Fad chardonnay bliver smørret."],
    ["til kylling", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["ekstra estragon", "herbalWhite", "Estragon. Vermentino. Primitivo er for tung."],
    ["til pommes", "bubbles", "Pommes. Cava. Tung malbec bliver bitter."],
  ]],
  ["vin-til-koldskaal", "koldskål", "dessert", [
    ["klassisk med kammerjunkere", "sweetDessert", "Sød. Moscatel. Tør cabernet bliver bitter."],
    ["med jordbær", "sweetDessert", "Jordbær. Sauternes. Tør rød bliver bitter."],
    ["med citron", "sweetSpice", "Citron. Riesling. Cabernet bliver bitter."],
    ["ekstra syrlig", "freshWhite", "Syre. Sauvignon. Malbec er for tung."],
    ["med vanilje", "sweetDessert", "Vanilje. Moscatel. Tør cabernet bliver bitter."],
    ["med mynte", "sweetSpice", "Mynte. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-kransekage", "kransekage", "dessert", [
    ["klassisk med glasur", "sweetDessert", "Glasur. Moscatel. Tør cabernet bliver bitter."],
    ["med marcipan tungt", "sweetDessert", "Marcipan. Sauternes. Tør rød bliver bitter."],
    ["med chokolade", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med kirsebær", "sweetDessert", "Kirsebær. Sauternes. Cabernet bliver bitter."],
    ["med appelsin", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
    ["med kaffe", "sweetDessert", "Kaffe. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-dessert-og-kransekage", "dessert", "dessert", [
    ["med chokolade", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med bær", "sweetDessert", "Bær. Sauternes. Tør rød bliver bitter."],
    ["med karamel", "sweetDessert", "Karamel. Sauternes. Cabernet bliver bitter."],
    ["med citrus", "sweetSpice", "Citrus. Riesling. Cabernet bliver bitter."],
    ["med vanilje", "sweetDessert", "Vanilje. Moscatel. Tør cabernet bliver bitter."],
    ["med nødder", "sweetDessert", "Nødder. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-efterarsmad", "efterårsret", "efterår", [
    ["med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med rodfrugter", "juicyRed", "Rodfrugt. Garnacha. Cabernet er for tanninrig."],
    ["med vildt", "spicyRed", "Vildt. Syrah. Let pinot drukner."],
    ["med æble", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med græskar", "creamyWhite", "Græskar. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-efteraar", "efterårsmenu", "efterår", [
    ["med vildt og bær", "spicyRed", "Vildt/bær. Syrah. Let pinot drukner."],
    ["med svampesuppe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med æbledessert", "sweetDessert", "Æble. Moscatel. Tør cabernet bliver bitter."],
    ["med stegt and", "lighterRed", "And. Pinot. Cabernet er for tanninrig."],
    ["med græskartærte", "creamyWhite", "Græskar. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med kastanjer", "umamiRed", "Kastanjer. Nebbiolo. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-sommer", "sommerret", "sommer", [
    ["med grillfisk", "saltyFish", "Fisk. Albariño. Pinot overdøver."],
    ["med salat og gedeost", "freshWhite", "Gedeost. Sauvignon. Malbec er for tung."],
    ["med jordbær", "sweetDessert", "Jordbær. Moscatel. Tør cabernet bliver bitter."],
    ["med chilirejer", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med cold cuts", "rose", "Cold cuts. Rosé. Cabernet er for tung."],
    ["med tomatsalat", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
  ]],
  ["vin-til-frokost", "frokostret", "frokost", [
    ["med smørrebrød", "nordic", "Smørrebrød. Riesling. Zinfandel er for sød."],
    ["med salat", "freshWhite", "Salat. Sauvignon. Malbec er for tung."],
    ["med quiche", "creamyWhite", "Quiche. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med supper", "lighterRed", "Suppe. Pinot. Cabernet er for tanninrig."],
    ["med ostemad", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chili sandwich", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-romantisk-middag", "romantisk middag", "middag", [
    ["med hummer", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med oksefilet", "spicyRed", "Okse. Syrah. Let pinot drukner."],
    ["med trøffelpasta", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chokoladedessert", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med østers", "bubbles", "Østers. Cava. Tung malbec er for meget."],
    ["med andebryst", "lighterRed", "And. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-juleaften", "juleaften", "jul", [
    ["med flæskesteg", "juicyRed", "Flæskesteg. Garnacha. Cabernet er for tanninrig."],
    ["med and", "lighterRed", "And. Pinot. Cabernet er for tanninrig."],
    ["med risalamande", "sweetDessert", "Risalamande. Sauternes. Tør cabernet bliver bitter."],
    ["med rødkål", "sweetSpice", "Rødkål. Riesling. Cabernet bliver bitter."],
    ["med sild", "nordic", "Sild. Riesling. Zinfandel er for sød."],
    ["med brunede kartofler", "sweetSpice", "Søde kartofler. Gewürztraminer. Cabernet bliver bitter."],
  ]],
  ["vin-til-julemad-den-store-guide", "julemad", "jul", [
    ["med medister", "juicyRed", "Medister. Gamay. Cabernet er for tanninrig."],
    ["med sild og snaps-agtig", "nordic", "Sild. Riesling. Zinfandel er for sød."],
    ["med leverpostej", "juicyRed", "Leverpostej. Barbera. Cabernet er for tanninrig."],
    ["med æbleskiver", "sweetDessert", "Æbleskiver. Moscatel. Tør cabernet bliver bitter."],
    ["med stegt and", "lighterRed", "And. Pinot. Cabernet er for tanninrig."],
    ["med gløgg-dessert", "sweetSpice", "Krydderi. Gewürztraminer. Cabernet bliver bitter."],
  ]],
  ["vin-til-nytaar-og-nytaarsmenu", "nytårsmenu", "nytår", [
    ["med champagne-østers", "bubbles", "Østers. Cava/crémant. Tung malbec er for meget."],
    ["med hummer", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med oksefilet", "spicyRed", "Okse. Syrah. Let pinot drukner."],
    ["med foie gras", "sweetDessert", "Foie. Sauternes. Tør cabernet bliver bitter."],
    ["med chokoladetærte", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med kaviar", "bubbles", "Kaviar. Crémant. Tung rød er forkert."],
  ]],
  ["vin-til-nytarsaften", "nytårsaften", "nytår", [
    ["med rejecocktail", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med steak", "spicyRed", "Steak. Syrah. Let pinot drukner."],
    ["med tarteletter", "creamyWhite", "Tarteletter. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med kransekage", "sweetDessert", "Kransekage. Moscatel. Tør cabernet bliver bitter."],
    ["med røget laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med chilirejer", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-glogg", "gløgg-aften", "jul", [
    ["med æbleskiver", "sweetDessert", "Æbleskiver. Moscatel. Tør cabernet bliver bitter."],
    ["med pebernødder", "sweetSpice", "Krydderi. Gewürztraminer. Cabernet bliver bitter."],
    ["med blåskimmel", "blueCheese", "Ost. Riesling. Cabernet bliver bitter."],
    ["med nødder og rosiner", "sweetDessert", "Nødder. Moscatel. Tør cabernet bliver bitter."],
    ["med brunsviger", "sweetDessert", "Brunsviger. Sauternes. Tør rød bliver bitter."],
    ["med chili-chokolade", "sweetSpice", "Chili/chokolade. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-sankt-hans", "sankt hans", "sommer", [
    ["med grillpølser", "juicyRed", "Pølser. Garnacha. Cabernet er for tanninrig."],
    ["med jordbærkage", "sweetDessert", "Kage. Moscatel. Tør cabernet bliver bitter."],
    ["med sild", "nordic", "Sild. Riesling. Zinfandel er for sød."],
    ["med salatbuffet", "freshWhite", "Salat. Sauvignon. Malbec er for tung."],
    ["med chilirejer", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med rosé snacks", "rose", "Snacks. Rosé. Cabernet er for tung."],
  ]],
  ["vin-til-konfirmation", "konfirmation", "fest", [
    ["med roastbeef", "lighterRed", "Roastbeef. Pinot. Cabernet er for tanninrig."],
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med tarteletter", "creamyWhite", "Tarteletter. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med kransekage", "sweetDessert", "Kransekage. Moscatel. Tør cabernet bliver bitter."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med ostebord", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-studenterfest", "studenterfest", "fest", [
    ["med pizza snacks", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med burger", "juicyRed", "Burger. Garnacha. Cabernet er for tanninrig."],
    ["med nachos chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med grill", "bbqSweet", "Grill. Zinfandel. Tør pinot mister grebet."],
    ["med kagebord", "sweetDessert", "Kage. Moscatel. Tør cabernet bliver bitter."],
    ["med chips og dip", "bubbles", "Snacks. Cava. Tung malbec er for meget."],
  ]],
  ["vin-til-sommerbryllup", "sommerbryllup", "fest", [
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med kylling", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["med dessertbuffet", "sweetDessert", "Dessert. Moscatel. Tør cabernet bliver bitter."],
    ["med ost", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med rosé-menu", "rose", "Rosé-menu. Rosé. Cabernet er for tung."],
  ]],
  ["vin-til-fars-dag", "fars dag", "fest", [
    ["med steak", "spicyRed", "Steak. Syrah. Let pinot drukner."],
    ["med burger", "juicyRed", "Burger. Garnacha. Cabernet er for tanninrig."],
    ["med BBQ ribs", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
    ["med øl-agtig ost", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chili wings", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med chokoladekage", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-mors-dag", "mors dag", "fest", [
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med asparges", "lemonHerb", "Asparges. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med bobler og snacks", "bubbles", "Snacks. Cava. Tung malbec er for meget."],
    ["med jordbærdessert", "sweetDessert", "Jordbær. Moscatel. Tør cabernet bliver bitter."],
    ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Malbec er for tung."],
    ["med kylling i fløde", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-gas", "gås", "gås", [
    ["med æbler", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med rødkål", "lighterRed", "Rødkål. Pinot. Cabernet er for tanninrig."],
    ["med svesker", "bbqSweet", "Svesker. Zinfandel. Tør pinot mister grebet."],
    ["med kastanjer", "umamiRed", "Kastanjer. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med appelsin", "sweetSpice", "Appelsin. Gewürztraminer. Cabernet bliver bitter."],
    ["med sprød skind", "juicyRed", "Fedme. Garnacha. Cabernet er for tanninrig."],
  ]],
  ["vin-til-fastelavn", "fastelavn", "fest", [
    ["med fastelavnsboller", "sweetDessert", "Boller. Moscatel. Tør cabernet bliver bitter."],
    ["med flødecreme", "sweetDessert", "Fløde. Sauternes. Tør rød bliver bitter."],
    ["med chokolade", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med syltetøj", "sweetDessert", "Syltetøj. Sauternes. Cabernet bliver bitter."],
    ["med kanel", "sweetSpice", "Kanel. Riesling. Cabernet bliver bitter."],
    ["med mandel", "sweetDessert", "Mandel. Moscatel. Tør cabernet bliver bitter."],
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
  ["vin-til-svigerforaeldre-besog", "svigerforældre besøg", "middag", [
    ["med roastbeef", "lighterRed", "Roastbeef. Pinot. Cabernet er for tanninrig."],
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med kylling i fløde", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med ostebord", "umamiRed", "Ost. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chokolademousse", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med asparagus forret", "lemonHerb", "Asparges. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-supermarkedets-ostebord", "supermarked ostebord", "ost", [
    ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Cabernet bliver bitter."],
    ["med brie", "creamyWhite", "Brie. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med cheddar", "juicyRed", "Cheddar. Garnacha. Cabernet er for tanninrig."],
    ["med feta", "greekWhite", "Feta. Assyrtiko. Cabernet er for tung."],
    ["med honning og nødder", "sweetSpice", "Honning. Riesling. Cabernet bliver bitter."],
    ["med chili chips", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-asiatisk-takeaway-dumplings-sushi-ramen", "asiatisk takeaway", "asiatisk", [
    ["dumplings dampede", "freshWhite", "Damp. Sauvignon. Malbec er for tung."],
    ["sushi nigiri", "saltyFish", "Sushi. Albariño. Pinot overdøver."],
    ["ramen med chili", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["fritterede wontons", "bubbles", "Friture. Cava. Tung malbec bliver bitter."],
    ["teriyaki kylling", "sweetSpice", "Sød soya. Riesling. Cabernet bliver bitter."],
    ["spicy tuna roll", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
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
  }

  fs.writeFileSync(
    outPath,
    `/**
 * Auto-genereret af scripts/build-micro-catalog-batch4.mjs
 * ${out.length} mikro-retter (batch 4).
 */

export const MICRO_DISHES_BATCH4 = ${JSON.stringify(out, null, 2)};
`,
  );
  console.log(`skrev ${out.length} retter til ${path.relative(root, outPath)}`);
  console.log(`total katalog herefter: ${EXISTING.length + out.length}`);
  const parents = [...new Set(out.map((d) => d.parentSlug))];
  console.log(`unikke forældre i batch4: ${parents.length}`);
  const pizza = out.filter((d) => /pizza|burger/.test(d.parentSlug)).length;
  console.log(`pizza/burger forældre-hits: ${pizza}`);
}

main();
