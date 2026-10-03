/**
 * Batch 3: ~500 mikro-retter i nye områder (ikke pizza/burger-tungt).
 * Kør: node scripts/build-micro-catalog-batch3.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MICRO_DISHES as BASE } from "./micro-pairings-catalog.mjs";
import { MICRO_DISHES_EXTRA as EXTRA } from "./micro-pairings-catalog-extra.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const guidesDir = path.join(root, "content/guides");
const outPath = path.join(root, "scripts/micro-pairings-catalog-batch3.mjs");
const EXISTING = [...BASE, ...EXTRA];

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

/** [parentSlug, dishStem, tag, mods: [part, profile, delta]] */
const BASES = [
  ["vin-til-smorrebrod", "smørrebrød", "smørrebrød", [
    ["med sild", "nordic", "Sild er fed og syrlig. Riesling. Zinfandel er for sød."],
    ["med roastbeef og remoulade", "lighterRed", "Roastbeef. Pinot. Kraftig cabernet overdøver."],
    ["med leverpostej", "juicyRed", "Leverpostej. Gamay. Skarp sauvignon er forkert."],
    ["med rejer og mayonnaise", "saltyFish", "Rejer. Albariño. Rødvin overdøver."],
    ["med laks og dild", "freshWhite", "Laks og dild. Sauvignon. Malbec er for tung."],
    ["med kartoffelsalat", "bubbles", "Kartoffelsalat. Cava. Tung shiraz bliver bitter."],
    ["med æbleflæsk", "sweetSpice", "Æble og flæsk. Riesling. Cabernet bliver bitter."],
    ["med røget ål", "umamiRed", "Røget ål. Pinot. Sauvignon bliver metallisk."],
    ["med mørbradbøf", "spicyRed", "Mørbrad. Syrah. Let pinot drukner."],
    ["med hønsesalat", "creamyWhite", "Hønsesalat. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med tartelettestykke", "creamyWhite", "Tarteletfyld. Chardonnay. Cabernet er for tanninrig."],
    ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-stegt-flaesk", "stegt flæsk", "flæsk", [
    ["med persillesauce", "freshWhite", "Persillesauce. Sauvignon. Malbec er for tung."],
    ["med brun sovs", "lighterRed", "Brun sovs. Pinot. Skarp sauvignon er forkert."],
    ["med æbler", "sweetSpice", "Æbler. Riesling. Cabernet bliver bitter."],
    ["med sennep", "juicyRed", "Sennep. Gamay. Kraftig cabernet bliver bitter."],
    ["med rødkål", "lighterRed", "Rødkål. Pinot. Zinfandel er for sød."],
    ["ekstra sprødt med fløde", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med kartofler og baconfedt", "juicyRed", "Baconfedt. Barbera. Let pinot kan mangle fylde."],
    ["med remoulade", "bubbles", "Remoulade. Cava. Tung rød bliver bitter."],
  ]],
  ["vin-til-flaesketesteg", "flæskesteg", "flæskesteg", [
    ["med rødkål", "lighterRed", "Rødkål. Pinot. Cabernet er for tanninrig."],
    ["med brunede kartofler", "juicyRed", "Søde kartofler. Gamay. Skarp sauvignon er forkert."],
    ["med æblesauce", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med sprød svær og sennep", "juicyRed", "Sennep. Barbera. Kraftig malbec er for tung."],
    ["kold med remoulade", "bubbles", "Kold flæskesteg. Cava. Tung shiraz bliver bitter."],
    ["med svesker", "bbqSweet", "Svesker. Zinfandel. Tør pinot mister grebet."],
    ["med selleri i fløde", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["juleagtig med krydderier", "sweetSpice", "Krydderi. Gewürztraminer. Cabernet bliver bitter."],
  ]],
  ["vin-til-skipperlabskovs", "skipperlabskovs", "labskovs", [
    ["med oksekød", "juicyRed", "Okse. Garnacha. Let pinot drukner."],
    ["med pølser", "juicyRed", "Pølser. Barbera. Cabernet er for tanninrig."],
    ["med sennep på siden", "germanWhite", "Sennep. Riesling. Malbec er for tung."],
    ["ekstra peber", "spicyRed", "Peber. Syrah. Let gamay drukner."],
    ["med syltede rødbeder", "lighterRed", "Rødbeder. Pinot. Zinfandel er for sød."],
    ["med rugbrød og smør", "nordic", "Rugbrød. Riesling. Kraftig cabernet overdøver."],
  ]],
  ["vin-til-gule-aerter", "gule ærter", "gule ærter", [
    ["med medister", "juicyRed", "Medister. Gamay. Skarp sauvignon er forkert."],
    ["med flæsk", "lighterRed", "Flæsk. Pinot. Cabernet er for tanninrig."],
    ["med sennep", "germanWhite", "Sennep. Riesling. Malbec er for tung."],
    ["med thyme og løg", "herbalWhite", "Urter. Vermentino. Kraftig primitivo er for tung."],
    ["ekstra peberrod", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med bacon", "juicyRed", "Bacon. Barbera. Let pinot kan mangle fylde."],
  ]],
  ["vin-til-medister", "medister", "medister", [
    ["med kartofler og gravy", "juicyRed", "Gravy. Gamay. Skarp sauvignon er forkert."],
    ["med æbler", "sweetSpice", "Æbler. Riesling. Cabernet bliver bitter."],
    ["med rødkål", "lighterRed", "Rødkål. Pinot. Zinfandel er for sød."],
    ["grillet med sennep", "germanWhite", "Sennep. Riesling. Malbec er for tung."],
    ["med persillesauce", "freshWhite", "Persille. Sauvignon. Kraftig rød overdøver."],
    ["i tomatsauce", "italianTomato", "Tomat. Barbera. Riesling matcher dårligt."],
  ]],
  ["vin-til-poelser-og-kartoffel", "pølser", "pølser", [
    ["med kartoffelsalat", "bubbles", "Kartoffelsalat. Cava. Tung shiraz bliver bitter."],
    ["med sennep og relish", "germanWhite", "Sennep. Riesling. Cabernet bliver bitter."],
    ["chorizo-stil", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
    ["med surkål", "germanWhite", "Surkål. Riesling. Malbec er for tung."],
    ["med BBQ", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
    ["med chili mayo", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med ostesauce", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med linser", "juicyRed", "Linser. Garnacha. Let gamay kan mangle fylde."],
  ]],
  ["vin-til-sild", "sild", "sild", [
    ["i karrymayonnaise", "sweetSpice", "Karrymayo. Riesling. Cabernet bliver bitter."],
    ["marineret med løg", "nordic", "Eddike. Riesling. Rødvin bliver bitter."],
    ["røget med æg", "creamyWhite", "Røg og æg. Chardonnay. Malbec er for tung."],
    ["med karrysalat", "sweetSpice", "Karrysalat. Gewürztraminer. Cabernet fejler."],
    ["med rugbrød og smør", "freshWhite", "Klassisk. Sauvignon. Kraftig rød overdøver."],
    ["med æble og creme fraiche", "nordic", "Æble. Riesling. Zinfandel er for sød."],
  ]],
  ["vin-til-stjerneskud", "stjerneskud", "stjerneskud", [
    ["med remoulade", "bubbles", "Remoulade. Cava. Rødvin bliver bitter."],
    ["med asparges", "freshWhite", "Asparges. Sauvignon. Fad chardonnay fejler."],
    ["med rejer ekstra", "saltyFish", "Rejer. Albariño. Malbec er for tung."],
    ["med citronmayo", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med kaviar", "bubbles", "Kaviar. Crémant. Tung rød overdøver."],
    ["med avocado", "freshWhite", "Avocado. Sauvignon. Primitivo er for tung."],
  ]],
  ["vin-til-tarteletter", "tarteletter", "tarteletter", [
    ["med høns i asparges", "creamyWhite", "Høns og asparges. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Rødvin overdøver."],
    ["med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med kylling og karry", "sweetSpice", "Karry. Riesling. Cabernet bliver bitter."],
    ["vegetariske med ærter", "freshWhite", "Ærter. Sauvignon. Malbec er for tung."],
    ["med skinke og ost", "juicyRed", "Skinke. Gamay. Kraftig cabernet er for hård."],
  ]],
  ["vin-til-frikadeller", "frikadeller", "frikadeller", [
    ["med karrysauce", "sweetSpice", "Karry. Riesling. Cabernet bliver bitter."],
    ["med agurkesalat", "nordic", "Agurkesalat. Riesling. Tung shiraz bliver bitter."],
    ["i tomatsauce med pasta", "italianTomato", "Tomat. Barbera. Riesling matcher dårligt."],
    ["med peberrod", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med bearnaise", "creamyWhite", "Bearnaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med rødbedesalat", "lighterRed", "Rødbeder. Pinot. Zinfandel er for sød."],
  ]],
  ["vin-til-gulasch", "gulasch", "gulasch", [
    ["ungarsk med paprika", "spicyRed", "Paprika. Syrah. Let pinot drukner."],
    ["med kartoffelknödel", "juicyRed", "Knödel. Barbera. Skarp sauvignon er forkert."],
    ["mild med creme fraiche", "creamyWhite", "Creme. Chardonnay. Cabernet er for tanninrig."],
    ["extra stærk", "chiliHeat", "Chili. Riesling. Tør rød forstærker varmen."],
    ["med oksehaler", "spicyRed", "Oksehale. Malbec. Let gamay drukner."],
    ["vegetarisk med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-boef-stroganoff", "stroganoff", "stroganoff", [
    ["klassisk med creme", "creamyWhite", "Creme. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med ekstra peber", "spicyRed", "Peber. Syrah. Let pinot drukner."],
    ["med svampe tungt", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med ris og dild", "lighterRed", "Dild. Pinot. Zinfandel er for sød."],
    ["med sennep", "juicyRed", "Sennep. Gamay. Kraftig cabernet bliver bitter."],
    ["med cornichoner", "freshWhite", "Syrlige cornichoner. Sauvignon. Tung malbec er for meget."],
  ]],
  ["vin-til-osso-buco", "osso buco", "osso buco", [
    ["med gremolata", "italianTomato", "Gremolata. Sangiovese. Riesling matcher dårligt."],
    ["med saffranrisotto", "creamyWhite", "Saffran. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["ekstra tomat", "italianTomato", "Tomat. Barbera. Let pinot drukner."],
    ["med rodfrugter", "juicyRed", "Rodfrugter. Garnacha. Cabernet er for tanninrig."],
    ["med citron og persille", "lemonHerb", "Citron. Vermentino. Kraftig malbec overdøver."],
    ["langtidssimret kraftig", "spicyRed", "Kraftig braise. Syrah. Let gamay drukner."],
  ]],
  ["vin-til-peberboef", "peberbøf", "peberbøf", [
    ["med cognacsovs", "spicyRed", "Cognac. Syrah. Let pinot drukner."],
    ["med flødepeber", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["extra peber", "spicyRed", "Peber. Malbec. Gamay drukner."],
    ["med pommes og salat", "juicyRed", "Klassisk. Garnacha. Riesling matcher dårligt."],
    ["med bearnaise ved siden", "creamyWhite", "Bearnaise. Chardonnay. Skarp hvid skærer for hårdt."],
    ["med grøn peber", "lighterRed", "Grøn peber. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-roastbeef", "roastbeef", "roastbeef", [
    ["kold med remoulade", "bubbles", "Kold roastbeef. Cava. Tung shiraz bliver bitter."],
    ["med peberrod", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med bearnaise", "creamyWhite", "Bearnaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med rødvinssauce", "spicyRed", "Rødvinssauce. Syrah. Let pinot drukner."],
    ["med sennep", "juicyRed", "Sennep. Gamay. Kraftig cabernet bliver bitter."],
    ["med trøffelmayo", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-okseskank", "okseskank", "okseskank", [
    ["med rodfrugtmos", "spicyRed", "Rodfrugt. Syrah. Let pinot drukner."],
    ["med rødvinssauce", "spicyRed", "Rødvin. Malbec. Gamay drukner."],
    ["med gremolata", "italianTomato", "Gremolata. Sangiovese. Riesling matcher dårligt."],
    ["med selleripure", "creamyWhite", "Selleri. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med chili og krydderi", "chiliHeat", "Chili. Riesling. Tør rød forstærker varmen."],
  ]],
  ["vin-til-svinemoerbrad", "svinemørbrad", "svinemørbrad", [
    ["med æbler", "sweetSpice", "Æbler. Riesling. Cabernet bliver bitter."],
    ["med sennepssauce", "juicyRed", "Sennep. Gamay. Kraftig cabernet bliver bitter."],
    ["med flødesovs", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["fyldt med svesker", "bbqSweet", "Svesker. Zinfandel. Tør pinot mister grebet."],
    ["grillet med rosmarin", "lighterRed", "Rosmarin. Pinot. Kraftig shiraz overdøver."],
    ["med peberfrugt", "juicyRed", "Peberfrugt. Garnacha. Let pinot kan mangle frugt."],
  ]],
  ["vin-til-svinekam", "svinekam", "svinekam", [
    ["med sprød svær", "juicyRed", "Svær. Barbera. Skarp sauvignon er forkert."],
    ["med æblekompot", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med sennepsskorpe", "germanWhite", "Sennep. Riesling. Malbec er for tung."],
    ["med rødkål", "lighterRed", "Rødkål. Pinot. Zinfandel er for sød."],
    ["med flødekartofler", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med BBQ-glasur", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
  ]],
  ["vin-til-kalvemoerbrad", "kalvemørbrad", "kalv", [
    ["med morelsauce", "mushroom", "Moraller. Pinot. Cabernet er for tanninrig."],
    ["med citronsmør", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med bearnaise", "creamyWhite", "Bearnaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med trøffel", "umamiRed", "Trøffel. Nebbiolo. Zinfandel bliver marmeladeagtig."],
    ["med tomatconcasse", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med peber", "spicyRed", "Peber. Syrah. Let gamay drukner."],
  ]],
  ["vin-til-vildt", "vildt", "vildt", [
    ["rådyr med bær", "lighterRed", "Bær. Pinot. Cabernet er for tanninrig."],
    ["vildsvin med krydderi", "spicyRed", "Krydderi. Syrah. Let gamay drukner."],
    ["med enebær", "lighterRed", "Enebær. Pinot. Zinfandel er for sød."],
    ["med chokolade i sauce", "bbqSweet", "Chokolade. Zinfandel. Skarp hvid bliver metallisk."],
    ["med rodfrugter", "juicyRed", "Rodfrugt. Barbera. Riesling matcher dårligt."],
    ["med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med rødvinssauce", "spicyRed", "Rødvin. Malbec. Let pinot drukner."],
    ["med æbler", "sweetSpice", "Æbler. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-dyreryg", "dyreryg", "dyreryg", [
    ["med bærcompote", "lighterRed", "Bær. Pinot. Cabernet er for tanninrig."],
    ["med peberrod", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med trøffelsauce", "umamiRed", "Trøffel. Nebbiolo. Zinfandel bliver marmeladeagtig."],
    ["med rodfrugtmos", "juicyRed", "Rodfrugt. Garnacha. Skarp sauvignon er forkert."],
    ["med enebær", "lighterRed", "Enebær. Pinot. Kraftig shiraz overdøver."],
    ["med rødvin", "spicyRed", "Rødvin. Syrah. Let gamay drukner."],
  ]],
  ["vin-til-kalkun", "kalkun", "kalkun", [
    ["med tranebær", "sweetSpice", "Tranebær. Riesling. Cabernet bliver bitter."],
    ["med farce og urter", "lighterRed", "Urter. Pinot. Kraftig malbec er for tung."],
    ["med gravy", "creamyWhite", "Gravy. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["grillet med chili", "chiliHeat", "Chili. Riesling. Tør rød forstærker varmen."],
    ["med pesto", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
    ["med citron og timian", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-gaas", "gås", "gås", [
    ["med æbler", "sweetSpice", "Æbler. Riesling. Cabernet bliver bitter."],
    ["med rødkål", "lighterRed", "Rødkål. Pinot. Zinfandel er for sød."],
    ["med svesker", "bbqSweet", "Svesker. Zinfandel. Tør pinot mister grebet."],
    ["med kastanjer", "juicyRed", "Kastanjer. Barbera. Skarp sauvignon er forkert."],
    ["med sprød skind", "lighterRed", "Fed skind. Pinot. Cabernet er for tanninrig."],
    ["med appelsin", "sweetSpice", "Appelsin. Gewürztraminer. Cabernet bliver bitter."],
  ]],
  ["vin-til-juleand", "juleand", "juleand", [
    ["med kirsebær", "lighterRed", "Kirsebær. Pinot. Cabernet er for tanninrig."],
    ["med rødkål og brunede kartofler", "juicyRed", "Sød tilbehør. Gamay. Skarp sauvignon er forkert."],
    ["med appelsinglasur", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
    ["med svesker og æbler", "bbqSweet", "Svesker. Zinfandel. Tør pinot mister grebet."],
    ["med peberrod", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["ekstra fed med sauce", "creamyWhite", "Fed sauce. Chardonnay. Skarp hvid skærer for hårdt."],
  ]],
  ["vin-til-julefrokost", "julefrokost", "julefrokost", [
    ["med sild og snapsbord", "nordic", "Sild. Riesling. Tung rød bliver bitter."],
    ["med leverpostej og bacon", "juicyRed", "Leverpostej. Gamay. Cabernet er for tanninrig."],
    ["med ribbensteg", "lighterRed", "Ribbensteg. Pinot. Zinfandel er for sød."],
    ["med risalamande", "sweetDessert", "Risalamande. Sauternes. Tør cabernet bliver bitter."],
    ["med laks", "saltyFish", "Laks. Albariño. Malbec er for tung."],
    ["med medister", "juicyRed", "Medister. Barbera. Skarp sauvignon er forkert."],
    ["med ost og kiks", "blueCheese", "Ost. Riesling. Tør cabernet bliver bitter."],
    ["med æbleskiver", "sweetDessert", "Æbleskiver. Moscatel. Kraftig rød er forkert."],
  ]],
  ["vin-til-paaske-og-paaskefrokost", "påskefrokost", "påske", [
    ["med lam", "spicyRed", "Lam. Syrah. Let pinot drukner."],
    ["med æg og rejer", "saltyFish", "Æg og rejer. Albariño. Rødvin overdøver."],
    ["med laks", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["med tarteletter", "creamyWhite", "Tarteletter. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med sild", "nordic", "Sild. Riesling. Tung shiraz bliver bitter."],
    ["med asparges", "freshWhite", "Asparges. Sauvignon. Fad chardonnay fejler."],
  ]],
  ["vin-til-mortensaften", "mortensaften", "mortensaften", [
    ["med and og æbler", "lighterRed", "And og æble. Pinot. Cabernet er for tanninrig."],
    ["med rødkål", "juicyRed", "Rødkål. Gamay. Skarp sauvignon er forkert."],
    ["med svesker", "bbqSweet", "Svesker. Zinfandel. Tør pinot mister grebet."],
    ["med kastanjer", "mushroom", "Kastanjer. Pinot. Cabernet er for tanninrig."],
    ["med appelsin", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
    ["med peberrod", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-asparges", "asparges", "asparges", [
    ["med hollandaise", "creamyWhite", "Hollandaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med skinke", "lighterRed", "Skinke. Pinot. Kraftig malbec er for tung."],
    ["med æg", "freshWhite", "Æg. Sauvignon. Fad chardonnay bliver smørret."],
    ["grillet med citron", "lemonHerb", "Citron. Assyrtiko. Malbec er forkert."],
    ["med parmesan", "herbalWhite", "Parmesan. Vermentino. Primitivo er for tung."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Rødvin overdøver."],
  ]],
  ["vin-til-gazpacho", "gazpacho", "gazpacho", [
    ["klassisk tomat", "sherry", "Tomatkold. Fino. Malbec er for tung."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Rødvin overdøver."],
    ["extra chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med avocado", "freshWhite", "Avocado. Sauvignon. Kraftig rød er forkert."],
    ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Fad chardonnay bliver smørret."],
    ["med agurk tungt", "herbalWhite", "Agurk. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-ceviche", "ceviche", "ceviche", [
    ["med chili og lime", "chiliHeat", "Chili og lime. Riesling. Rødvin forstærker brændingen."],
    ["med mango", "sweetSpice", "Mango. Gewürztraminer. Cabernet bliver bitter."],
    ["med avocado", "freshWhite", "Avocado. Sauvignon. Malbec er for tung."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med kokos", "coconutCurry", "Kokos. Riesling. Tør sauvignon bliver skarp."],
    ["med majs og koriander", "lemonHerb", "Koriander. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-muslinger", "muslinger", "muslinger", [
    ["i hvidvin", "saltyFish", "Hvidvin. Muscadet. Rødvin overdøver."],
    ["med creme og hvidløg", "creamyWhite", "Creme. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med tomat og chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med thai-kokos", "coconutCurry", "Kokos. Riesling. Malbec er for tung."],
    ["grillet med aioli", "bubbles", "Aioli. Cava. Tung rød bliver bitter."],
    ["med safran", "herbalWhite", "Safran. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-oesters", "østers", "østers", [
    ["naturel med citron", "saltyFish", "Citron. Muscadet. Rødvin duer ikke."],
    ["med mignonette", "freshWhite", "Eddike. Sauvignon. Fad chardonnay bliver smørret."],
    ["gratin med smør", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med caviar", "bubbles", "Caviar. Champagne-stil / crémant. Tung rød overdøver."],
    ["asiatisk med soya", "umamiRed", "Soya. Pinot. Sauvignon bliver metallisk."],
  ]],
  ["vin-til-hummer", "hummer", "hummer", [
    ["med smør", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med citronmayo", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["grillet med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["i thermidor", "creamyWhite", "Thermidor. Chardonnay. Pinot kan også — undgå malbec."],
    ["med avocado", "freshWhite", "Avocado. Sauvignon. Kraftig rød er forkert."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-krebse", "krebs", "krebs", [
    ["med dildmayo", "nordic", "Dild. Riesling. Tung rød overdøver."],
    ["med aioli", "bubbles", "Aioli. Cava. Malbec er for tung."],
    ["i flødesovs", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med citron", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["grillet med hvidløg", "saltyFish", "Hvidløg. Albariño. Rødvin overdøver."],
  ]],
  ["vin-til-blaeksprutte", "blæksprutte", "blæksprutte", [
    ["grillet med citron", "saltyFish", "Citron. Albariño. Rødvin overdøver."],
    ["i tomatsauce", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med aioli", "bubbles", "Aioli. Cava. Tung shiraz bliver bitter."],
    ["asiatisk med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med blækrisotto", "herbalWhite", "Blæk. Vermentino. Malbec er for tung."],
    ["friteret med remoulade", "bubbles", "Friture. Crémant. Rødvin bliver bitter."],
  ]],
  ["vin-til-tunboef", "tunbøf", "tun", [
    ["sesamcrusted", "umamiRed", "Sesam. Pinot. Cabernet er for tanninrig."],
    ["med soya og ingefær", "sweetSpice", "Soya. Riesling. Tør sauvignon bliver metallisk."],
    ["med salsa verde", "lemonHerb", "Salsa verde. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med chili mayo", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med avocado", "freshWhite", "Avocado. Sauvignon. Malbec er for tung."],
    ["med bearnaise", "creamyWhite", "Bearnaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-lys-fisk", "lys fisk", "fisk", [
    ["med beurre blanc", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med salsa verde", "lemonHerb", "Urter. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med tomatconcasse", "freshWhite", "Tomat. Albariño. Tung rød drukner."],
    ["grillet med citron", "lemonHerb", "Citron. Sauvignon. Malbec er forkert."],
    ["i kokoskarry", "coconutCurry", "Kokos. Riesling. Cabernet bliver bitter."],
    ["med kapers", "saltyFish", "Kapers. Muscadet. Zinfandel duer ikke."],
  ]],
  ["vin-til-grillet-fisk", "grillet fisk", "grillet fisk", [
    ["med citron og urter", "lemonHerb", "Urter. Sauvignon. Fad chardonnay bliver smørret."],
    ["med chiliolie", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med aioli", "bubbles", "Aioli. Cava. Tung rød bliver bitter."],
    ["med soya", "umamiRed", "Soya. Pinot. Sauvignon bliver metallisk."],
    ["med tomatsalsa", "freshWhite", "Tomat. Albariño. Malbec er for tung."],
    ["med dildsmør", "creamyWhite", "Dildsmør. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-fondue", "fondue", "fondue", [
    ["oste-fondue klassisk", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med champagne", "bubbles", "Bobler skærer fedmen. Cava. Tung malbec er for meget."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["chokolade-fondue", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med kød og bouillon", "lighterRed", "Bouillonkød. Pinot. Kraftig shiraz overdøver."],
    ["asiatisk med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
  ]],
  ["vin-til-raclette", "raclette", "raclette", [
    ["klassisk med kartofler", "creamyWhite", "Ost og kartoffel. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med spegepølse", "juicyRed", "Pølse. Gamay. Cabernet er for tanninrig."],
    ["med pickles", "bubbles", "Pickles. Cava. Tung shiraz bliver bitter."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med skinke", "lighterRed", "Skinke. Pinot. Kraftig malbec er for tung."],
  ]],
  ["vin-til-quiche", "quiche", "quiche", [
    ["lorraine med bacon", "lighterRed", "Bacon. Pinot. Cabernet er for tanninrig."],
    ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Fad chardonnay bliver smørret."],
    ["med spinat", "herbalWhite", "Spinat. Vermentino. Primitivo er for tung."],
    ["med laks", "saltyFish", "Laks. Albariño. Malbec er for tung."],
    ["med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med tomat og mozzarella", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
  ]],
  ["vin-til-aeggekage-og-frittata", "frittata", "frittata", [
    ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Fad chardonnay bliver smørret."],
    ["med chorizo", "spicyRed", "Chorizo. Syrah. Let pinot drukner."],
    ["med svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med laks og dild", "saltyFish", "Laks. Albariño. Malbec er for tung."],
    ["med tomat og basilikum", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
  ]],
  ["vin-til-crepes-og-pandekager", "pandekager", "pandekager", [
    ["salte med skinke og ost", "juicyRed", "Skinke og ost. Gamay. Cabernet er for tanninrig."],
    ["med svampecreme", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["søde med lemon", "sweetDessert", "Sød lemon. Moscatel. Tør cabernet bliver bitter."],
    ["med chokolade", "sweetDessert", "Chokolade. Sauternes. Kraftig rød er forkert."],
    ["med røget laks", "saltyFish", "Laks. Albariño. Malbec er for tung."],
    ["med gedeost og honning", "freshWhite", "Gedeost og honning. Sauvignon. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-falafel-og-hummus", "falafel", "falafel", [
    ["med tahin", "herbalWhite", "Tahin. Vermentino. Malbec er for tung."],
    ["med harissa", "chiliHeat", "Harissa. Riesling. Cabernet forstærker varmen."],
    ["med granatæble", "juicyRed", "Granatæble. Garnacha. Skarp sauvignon er forkert."],
    ["med pickles", "freshWhite", "Pickles. Sauvignon. Kraftig rød bliver bitter."],
    ["med lammekød ved siden", "spicyRed", "Lam. Syrah. Let pinot drukner."],
    ["med avocado", "freshWhite", "Avocado. Sauvignon. Primitivo er for tung."],
  ]],
  ["vin-til-couscous", "couscous", "couscous", [
    ["marokkansk med lam", "spicyRed", "Lam. Syrah. Let pinot drukner."],
    ["med grøntsager og harissa", "chiliHeat", "Harissa. Riesling. Cabernet forstærker varmen."],
    ["med kylling og citron", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med fisk", "saltyFish", "Fisk. Albariño. Malbec er for tung."],
    ["med tørret frugt", "sweetSpice", "Sød frugt. Gewürztraminer. Cabernet bliver bitter."],
    ["med chili og koriander", "chiliHeat", "Chili. Riesling. Tør rød forstærker varmen."],
  ]],
  ["vin-til-kartoffelmad", "kartoffelmad", "kartoffel", [
    ["gratineret med ost", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med bacon", "juicyRed", "Bacon. Gamay. Cabernet er for tanninrig."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med chiliolie", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med røget laks", "saltyFish", "Laks. Albariño. Malbec er for tung."],
    ["med pesto", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-tomatsuppe", "tomatsuppe", "tomatsuppe", [
    ["med basilikum", "italianTomato", "Basilikum. Sangiovese. Riesling matcher dårligt."],
    ["med fløde", "creamyWhite", "Fløde. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Fad chardonnay bliver smørret."],
    ["med bacon", "juicyRed", "Bacon. Barbera. Let pinot kan mangle fylde."],
    ["med pesto", "herbalWhite", "Pesto. Vermentino. Malbec er for tung."],
  ]],
  // Cuisine hubs
  ["vin-til-graesk-mad", "græsk mad", "græsk", [
    ["moussaka", "spicyRed", "Moussaka. Syrah. Let pinot drukner."],
    ["souvlaki med tzatziki", "greekWhite", "Tzatziki. Assyrtiko. Malbec er for tung."],
    ["grillet blæksprutte", "saltyFish", "Blæksprutte. Assyrtiko. Rødvin overdøver."],
    ["spanakopita", "freshWhite", "Spinat og feta. Moschofilero. Kraftig rød overdøver."],
    ["gyros med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["feta og vandmelon", "rose", "Feta og melon. Rosé. Tung cabernet er forkert."],
    ["lamb kleftiko", "spicyRed", "Lam. Xinomavro-stil / syrah. Let gamay drukner."],
    ["grillet fisk med oregano", "greekWhite", "Oregano. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-spansk-mad", "spansk mad", "spansk", [
    ["patatas bravas", "chiliHeat", "Bravas. Riesling. Cabernet forstærker varmen."],
    ["pulpo a la gallega", "saltyFish", "Blæksprutte. Albariño. Tung rød overdøver."],
    ["jamón og manchego", "juicyRed", "Skinke og ost. Garnacha. Skarp sauvignon er forkert."],
    ["gazpacho", "sherry", "Gazpacho. Fino. Malbec er for tung."],
    ["fabada", "spicyRed", "Bønner og chorizo. Tempranillo. Let pinot drukner."],
    ["croquetas", "bubbles", "Croquetas. Cava. Tung shiraz bliver bitter."],
    ["paella valenciana", "herbalWhite", "Paella. Verdejo. Malbec er for tung."],
    ["chorizo al vino", "spicyRed", "Chorizo. Tempranillo. Let gamay drukner."],
  ]],
  ["vin-til-portugisisk-mad", "portugisisk mad", "portugisisk", [
    ["bacalhau", "portuguese", "Bacalhau. Vinho verde. Malbec er for tung."],
    ["peri-peri kylling", "chiliHeat", "Peri-peri. Riesling. Cabernet forstærker varmen."],
    ["sardin på grill", "saltyFish", "Sardin. Alvarinho. Rødvin overdøver."],
    ["francesinha", "juicyRed", "Francesinha. Garnacha. Let pinot drukner."],
    ["caldo verde", "freshWhite", "Caldo verde. Vinho verde. Kraftig rød er for tung."],
    ["pastel de nata", "sweetDessert", "Pastel. Moscatel. Tør cabernet bliver bitter."],
    ["porco preto", "spicyRed", "Porco preto. Syrah. Let gamay drukner."],
    ["ameijoas", "saltyFish", "Muslinger. Alvarinho. Malbec er for tung."],
  ]],
  ["vin-til-marokkansk-mad", "marokkansk mad", "marokkansk", [
    ["lammetagine med abrikos", "sweetSpice", "Abrikos. Gewürztraminer. Cabernet bliver bitter."],
    ["kylling med citron og oliven", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["couscous med harissa", "chiliHeat", "Harissa. Riesling. Cabernet forstærker varmen."],
    ["fisketagine", "saltyFish", "Fisk. Albariño. Malbec er for tung."],
    ["kefta med tomat", "spicyRed", "Kefta. Syrah. Let pinot drukner."],
    ["grøntsagstagine", "herbalWhite", "Grønt. Vermentino. Kraftig primitivo er for tung."],
    ["med dadler og mandler", "sweetSpice", "Dadler. Riesling. Cabernet bliver bitter."],
    ["med yoghurt og mynte", "freshWhite", "Mynte. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-libanesisk-mad", "libanesisk mad", "libanesisk", [
    ["kibbeh", "lighterRed", "Kibbeh. Pinot. Cabernet er for tanninrig."],
    ["fattoush", "freshWhite", "Fattoush. Sauvignon. Kraftig rød overdøver."],
    ["shawarma med hvidløg", "herbalWhite", "Hvidløg. Vermentino. Malbec er for tung."],
    ["labneh med chiliolie", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["grillet lam", "spicyRed", "Lam. Syrah. Let gamay drukner."],
    ["hummus med kød", "juicyRed", "Hummus og kød. Garnacha. Skarp sauvignon er forkert."],
    ["tabbouleh", "lemonHerb", "Tabbouleh. Assyrtiko. Fad chardonnay bliver smørret."],
    ["baklava", "sweetDessert", "Baklava. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-tyrkisk-mad", "tyrkisk mad", "tyrkisk", [
    ["adana kebab", "spicyRed", "Adana. Syrah. Let pinot drukner."],
    ["lahmacun", "italianTomato", "Lahmacun. Barbera. Riesling matcher dårligt."],
    ["imam bayildi", "herbalWhite", "Aubergine. Vermentino. Malbec er for tung."],
    ["pide med ost", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["köfte med yoghurt", "lighterRed", "Yoghurt. Pinot. Kraftig cabernet overdøver."],
    ["fisk med citron", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["menemen", "freshWhite", "Æg og tomat. Sauvignon. Tung rød er for meget."],
    ["baklava", "sweetDessert", "Baklava. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-koreansk-mad", "koreansk mad", "koreansk", [
    ["bulgogi", "bbqSweet", "Sød bulgogi. Zinfandel. Tør pinot mister grebet."],
    ["kimchi jjigae", "chiliHeat", "Kimchi. Riesling. Cabernet forstærker varmen."],
    ["bibimbap", "sweetSpice", "Bibimbap. Riesling. Cabernet bliver bitter."],
    ["korean fried chicken", "chiliHeat", "Fried chicken. Riesling. Tør rød forstærker varmen."],
    ["japchae", "herbalWhite", "Japchae. Vermentino. Malbec er for tung."],
    ["samgyeopsal", "juicyRed", "Samgyeopsal. Garnacha. Skarp sauvignon er forkert."],
    ["tteokbokki", "chiliHeat", "Tteokbokki. Riesling. Cabernet forstærker varmen."],
    ["haemul pajeon", "saltyFish", "Pandekage med skaldyr. Albariño. Rødvin overdøver."],
  ]],
  ["vin-til-kinesisk-mad", "kinesisk mad", "kinesisk", [
    ["mapo tofu", "chiliHeat", "Mapo. Riesling. Cabernet forstærker varmen."],
    ["pekingand", "bbqSweet", "Pekingand. Zinfandel. Tør pinot mister grebet."],
    ["sweet and sour", "sweetSpice", "Sød-syrlig. Riesling. Cabernet bliver bitter."],
    ["kung pao kylling", "chiliHeat", "Kung pao. Riesling. Tør rød forstærker varmen."],
    ["xiaolongbao", "lighterRed", "Dumplings. Pinot. Kraftig malbec er for tung."],
    ["char siu", "bbqSweet", "Char siu. Riesling. Cabernet bliver bitter."],
    ["hot pot", "chiliHeat", "Hot pot. Riesling. Cabernet forstærker varmen."],
    ["dampet fisk", "saltyFish", "Dampet fisk. Albariño. Malbec er for tung."],
  ]],
  ["vin-til-vietnamesisk-mad", "vietnamesisk mad", "vietnamesisk", [
    ["banh mi", "freshWhite", "Banh mi. Sauvignon. Malbec er for tung."],
    ["bun cha", "lighterRed", "Bun cha. Pinot. Kraftig cabernet overdøver urterne."],
    ["goi cuon", "freshWhite", "Goi cuon. Sauvignon. Tung rød er forkert."],
    ["ca ri ga", "coconutCurry", "Karry. Riesling. Cabernet bliver bitter."],
    ["com tam", "sweetSpice", "Com tam. Riesling. Cabernet bliver bitter."],
    ["bun bo hue", "chiliHeat", "Bun bo hue. Riesling. Tør rød forstærker varmen."],
    ["cha gio", "bubbles", "Cha gio. Cava. Tung shiraz bliver bitter."],
    ["ca kho to", "umamiRed", "Ca kho. Pinot. Sauvignon bliver metallisk."],
  ]],
  ["vin-til-japansk-mad", "japansk mad", "japansk", [
    ["tonkatsu", "bubbles", "Tonkatsu. Cava. Tung rød bliver bitter."],
    ["yakitori", "lighterRed", "Yakitori. Pinot. Kraftig malbec er for tung."],
    ["okonomiyaki", "sweetSpice", "Okonomiyaki. Riesling. Cabernet bliver bitter."],
    ["gyoza", "herbalWhite", "Gyoza. Vermentino. Malbec er for tung."],
    ["unagi don", "bbqSweet", "Unagi. Zinfandel. Tør pinot mister grebet."],
    ["karaage", "bubbles", "Karaage. Crémant. Tung shiraz bliver bitter."],
    ["nabemono", "umamiRed", "Nabe. Pinot. Sauvignon bliver skarp."],
    ["sashimi blanding", "saltyFish", "Sashimi. Albariño. Rødvin overdøver."],
  ]],
  ["vin-til-asiatisk-mad", "asiatisk mad", "asiatisk", [
    ["satay med peanut", "sweetSpice", "Peanut. Riesling. Cabernet bliver bitter."],
    ["stir-fry med ingefær", "lemonHerb", "Ingefær. Sauvignon. Fad chardonnay bliver smørret."],
    ["sød chili rejer", "chiliHeat", "Sød chili. Riesling. Cabernet forstærker varmen."],
    ["miso-aubergine", "umamiRed", "Miso. Pinot. Sauvignon bliver metallisk."],
    ["kokosris med karry", "coconutCurry", "Kokos. Riesling. Tør sauvignon bliver skarp."],
    ["tempura grønt", "bubbles", "Tempura. Cava. Tung malbec er for meget."],
    ["teriyaki laks", "sweetSpice", "Teriyaki. Gewürztraminer. Cabernet bliver bitter."],
    ["kimchi-agtig salat", "chiliHeat", "Kimchi. Riesling. Tør rød forstærker varmen."],
  ]],
  ["vin-til-afrikansk-mad", "afrikansk mad", "afrikansk", [
    ["jollof rice", "chiliHeat", "Jollof. Riesling. Cabernet forstærker varmen."],
    ["bobotie", "sweetSpice", "Bobotie. Gewürztraminer. Cabernet bliver bitter."],
    ["peri-peri kylling", "chiliHeat", "Peri-peri. Riesling. Tør rød forstærker varmen."],
    ["tagine-inspireret lam", "spicyRed", "Lam. Syrah. Let pinot drukner."],
    ["injera med linsewats", "juicyRed", "Linser. Garnacha. Skarp sauvignon er forkert."],
    ["grillet fisk med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["peanut stew", "sweetSpice", "Peanut. Riesling. Cabernet bliver bitter."],
    ["samosa-agtig snack", "bubbles", "Friture. Cava. Tung shiraz bliver bitter."],
  ]],
  ["vin-til-argentinsk-mad", "argentinsk mad", "argentinsk", [
    ["asado", "spicyRed", "Asado. Malbec. Let pinot drukner."],
    ["empanadas med okse", "juicyRed", "Empanadas. Garnacha. Skarp sauvignon er forkert."],
    ["chimichurri tungt", "spicyRed", "Chimichurri. Malbec. Blød merlot bliver flad."],
    ["provoleta", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["locro", "spicyRed", "Locro. Syrah. Let gamay drukner."],
    ["fisk med lime", "freshWhite", "Lime. Sauvignon. Malbec er for tung."],
    ["dulce de leche dessert", "sweetDessert", "Dulce. Moscatel. Tør cabernet bliver bitter."],
    ["choripan", "bbqSweet", "Choripan. Zinfandel. Tør pinot mister grebet."],
  ]],
  ["vin-til-brasiliansk-mad", "brasiliansk mad", "brasiliansk", [
    ["feijoada", "spicyRed", "Feijoada. Syrah. Let pinot drukner."],
    ["picanha", "spicyRed", "Picanha. Malbec. Gamay drukner."],
    ["moqueca", "coconutCurry", "Moqueca. Riesling. Cabernet bliver bitter."],
    ["coxinha", "bubbles", "Coxinha. Cava. Tung shiraz bliver bitter."],
    ["churrasco kylling", "bbqSweet", "Churrasco. Zinfandel. Tør pinot mister grebet."],
    ["vatapá", "coconutCurry", "Vatapá. Gewürztraminer. Cabernet bliver bitter."],
    ["brigadeiro", "sweetDessert", "Brigadeiro. Moscatel. Tør cabernet bliver bitter."],
    ["grillet fisk med dendê", "sweetSpice", "Dendê. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-peruviansk-mad", "peruviansk mad", "peruviansk", [
    ["ceviche klassisk", "saltyFish", "Ceviche. Albariño. Rødvin duer ikke."],
    ["lomo saltado", "spicyRed", "Lomo saltado. Syrah. Let pinot drukner."],
    ["aji de gallina", "creamyWhite", "Aji de gallina. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["anticuchos", "smoky", "Anticuchos. Syrah. Sauvignon bliver skarp."],
    ["causa", "freshWhite", "Causa. Sauvignon. Malbec er for tung."],
    ["rocoto relleno", "chiliHeat", "Rocoto. Riesling. Cabernet forstærker varmen."],
    ["tiradito", "lemonHerb", "Tiradito. Assyrtiko. Fad chardonnay bliver smørret."],
    ["chicha-inspireret dessert", "sweetDessert", "Sød dessert. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-caribisk-mad", "caribisk mad", "caribisk", [
    ["jerk kylling", "chiliHeat", "Jerk. Riesling. Cabernet forstærker varmen."],
    ["rum-glasur ribs", "bbqSweet", "Rum-glasur. Zinfandel. Tør pinot mister grebet."],
    ["fisk med mango salsa", "sweetSpice", "Mango. Gewürztraminer. Cabernet bliver bitter."],
    ["rice and peas", "coconutCurry", "Kokos. Riesling. Tør sauvignon bliver skarp."],
    ["plantain og chili", "chiliHeat", "Plantain. Riesling. Cabernet forstærker varmen."],
    ["grillet rejer", "saltyFish", "Rejer. Albariño. Malbec er for tung."],
    ["curry ged", "spicyRed", "Ged. Syrah. Let pinot drukner."],
    ["sød dessert med kokos", "sweetDessert", "Kokos. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-klassisk-fransk-mad", "fransk mad", "fransk", [
    ["coq au vin", "lighterRed", "Coq au vin. Pinot. Cabernet er for tanninrig."],
    ["boeuf bourguignon", "spicyRed", "Bourguignon. Syrah. Let gamay drukner."],
    ["moules frites", "saltyFish", "Moules. Muscadet. Rødvin overdøver."],
    ["ratatouille", "herbalWhite", "Ratatouille. Vermentino. Malbec er for tung."],
    ["duck confit", "lighterRed", "Confit. Pinot. Kraftig cabernet overdøver."],
    ["onion soup", "juicyRed", "Løgsuppe. Gamay. Skarp sauvignon er forkert."],
    ["steak frites", "spicyRed", "Steak frites. Malbec. Let pinot drukner."],
    ["creme brulee", "sweetDessert", "Creme brulee. Sauternes. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-provencalsk-mad", "provencalsk mad", "provence", [
    ["bouillabaisse", "saltyFish", "Bouillabaisse. Rosé eller albariño — undgå malbec."],
    ["ratatouille", "rose", "Ratatouille. Rosé. Kraftig cabernet er for tung."],
    ["grillet fisk med aioli", "bubbles", "Aioli. Cava. Tung rød bliver bitter."],
    ["lam med urter", "lighterRed", "Urter. Pinot. Kraftig shiraz overdøver."],
    ["salade nicoise", "freshWhite", "Nicoise. Sauvignon. Malbec er for tung."],
    ["pissaladiere", "herbalWhite", "Pissaladiere. Vermentino. Primitivo er for tung."],
    ["tomater farcies", "italianTomato", "Fyldte tomater. Sangiovese. Riesling matcher dårligt."],
    ["ost og honning", "sweetDessert", "Ost og honning. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-alsace-mad", "alsace-mad", "alsace", [
    ["choucroute", "germanWhite", "Choucroute. Riesling. Malbec er for tung."],
    ["tarte flambée", "freshWhite", "Flammkuchen. Silvaner. Kraftig rød overdøver."],
    ["baeckeoffe", "juicyRed", "Baeckeoffe. Pinot. Cabernet er for tanninrig."],
    ["spaetzle med ost", "creamyWhite", "Ost. Pinot blanc. Skarp sauvignon skærer for hårdt."],
    ["foie gras", "sweetDessert", "Foie. Sauternes. Tør cabernet bliver bitter."],
    ["munster ost", "germanWhite", "Munster. Gewürztraminer. Cabernet bliver bitter."],
  ]],
  ["vin-til-bourgogne-mad", "bourgogne-mad", "bourgogne", [
    ["escargot", "creamyWhite", "Escargot. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["boeuf bourguignon", "lighterRed", "Bourguignon. Pinot. Cabernet er for tanninrig."],
    ["oeufs en meurette", "lighterRed", "Oeufs en meurette. Pinot. Zinfandel er for sød."],
    ["gougeres", "bubbles", "Gougeres. Crémant. Tung malbec er for meget."],
    ["dijon kylling", "creamyWhite", "Dijon. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["svampe i creme", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-italiensk-mad", "italiensk mad", "italiensk", [
    ["osso buco", "italianTomato", "Osso buco. Sangiovese. Riesling matcher dårligt."],
    ["vitello tonnato", "freshWhite", "Vitello tonnato. Vermentino. Malbec er for tung."],
    ["saltimbocca", "lighterRed", "Saltimbocca. Pinot. Kraftig cabernet overdøver."],
    ["melanzane", "italianTomato", "Melanzane. Barbera. Riesling matcher dårligt."],
    ["cacio e pepe", "creamyWhite", "Cacio e pepe. Verdicchio. Cabernet er for tanninrig."],
    ["porchetta", "juicyRed", "Porchetta. Sangiovese. Skarp sauvignon er forkert."],
    ["tiramisu", "sweetDessert", "Tiramisu. Moscatel. Tør cabernet bliver bitter."],
    ["fritto misto", "bubbles", "Fritto. Prosecco/cava. Tung rød bliver bitter."],
  ]],
  ["vin-til-sicilianske-retter", "siciliansk mad", "siciliansk", [
    ["pasta alla norma", "italianTomato", "Norma. Nero d'Avola-stil / sangiovese. Riesling matcher dårligt."],
    ["caponata", "herbalWhite", "Caponata. Grillo/vermentino. Malbec er for tung."],
    ["swordfish", "saltyFish", "Sværdfisk. Albariño. Rødvin overdøver."],
    ["arancini", "bubbles", "Arancini. Cava. Tung shiraz bliver bitter."],
    ["cannoli", "sweetDessert", "Cannoli. Moscatel. Tør cabernet bliver bitter."],
    ["sardiner med rosiner", "sweetSpice", "Rosiner. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-toscansk-mad", "toscansk mad", "toscansk", [
    ["bistecca", "spicyRed", "Bistecca. Sangiovese/syrah. Let pinot drukner."],
    ["pappa al pomodoro", "italianTomato", "Tomat. Chianti-stil. Riesling matcher dårligt."],
    ["ribollita", "juicyRed", "Ribollita. Sangiovese. Skarp sauvignon er forkert."],
    ["crostini med lever", "lighterRed", "Lever. Pinot. Kraftig cabernet overdøver."],
    ["pici cacio e pepe", "creamyWhite", "Cacio e pepe. Vermentino. Malbec er for tung."],
    ["cantucci og vin santo", "sweetDessert", "Cantucci. Vin santo / moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-polsk-mad", "polsk mad", "polsk", [
    ["pierogi med kød", "juicyRed", "Pierogi. Gamay. Cabernet er for tanninrig."],
    ["bigos", "spicyRed", "Bigos. Syrah. Let pinot drukner."],
    ["zurek", "freshWhite", "Zurek. Riesling. Malbec er for tung."],
    ["schabowy", "bubbles", "Schnitzel. Cava. Tung shiraz bliver bitter."],
    ["golabki", "italianTomato", "Golabki. Barbera. Riesling matcher dårligt."],
    ["pierogi med ost", "creamyWhite", "Ost. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-ungarsk-mad", "ungarsk mad", "ungarsk", [
    ["gulyas", "spicyRed", "Gulyas. Syrah. Let pinot drukner."],
    ["paprikash med kylling", "creamyWhite", "Paprikash. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["langos", "bubbles", "Langos. Cava. Tung malbec er for meget."],
    ["hortobagyi", "juicyRed", "Hortobagyi. Garnacha. Skarp sauvignon er forkert."],
    ["dobos", "sweetDessert", "Dobos. Moscatel. Tør cabernet bliver bitter."],
    ["halaszle", "saltyFish", "Fiskesuppe. Furmint/riesling — undgå malbec."],
  ]],
  ["vin-til-svensk-mad", "svensk mad", "svensk", [
    ["köttbullar", "lighterRed", "Köttbullar. Pinot. Cabernet er for tanninrig."],
    ["gravad laks", "nordic", "Gravad laks. Riesling. Tung rød overdøver."],
    ["jägerschnitzel", "mushroom", "Jägerschnitzel. Pinot. Cabernet er for tanninrig."],
    ["räksmörgås", "saltyFish", "Räksmörgås. Albariño. Malbec er for tung."],
    ["prinsesstårta", "sweetDessert", "Prinsesstårta. Moscatel. Tør cabernet bliver bitter."],
    ["surströmming-bord", "nordic", "Syrlig fisk. Riesling. Rødvin bliver bitter."],
  ]],
  ["vin-til-norsk-mad", "norsk mad", "norsk", [
    ["rakfisk", "nordic", "Rakfisk. Riesling. Tung rød bliver bitter."],
    ["fårikål", "juicyRed", "Fårikål. Pinot/gamay. Cabernet er for tanninrig."],
    ["laks med dild", "freshWhite", "Laks. Sauvignon. Malbec er for tung."],
    ["kjøttkaker", "lighterRed", "Kjøttkaker. Pinot. Kraftig shiraz overdøver."],
    ["reker med mayonnaise", "saltyFish", "Reker. Albariño. Rødvin overdøver."],
    ["vafler med brunost", "sweetDessert", "Brunost. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-oktoberfest-mad", "oktoberfest", "oktoberfest", [
    ["bratwurst", "germanWhite", "Bratwurst. Riesling. Malbec er for tung."],
    ["schweinshaxe", "juicyRed", "Haxe. Pinot. Cabernet er for tanninrig."],
    ["pretzel med sennep", "bubbles", "Pretzel. Cava. Tung shiraz bliver bitter."],
    ["sauerkraut tungt", "germanWhite", "Sauerkraut. Silvaner. Malbec er for tung."],
    ["schnitzel", "bubbles", "Schnitzel. Crémant. Tung rød bliver bitter."],
    ["obatzda", "creamyWhite", "Obatzda. Pinot blanc. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-amerikansk-comfort-mad", "amerikansk comfort", "amerikansk", [
    ["meatloaf", "juicyRed", "Meatloaf. Zinfandel/garnacha. Skarp sauvignon er forkert."],
    ["fried chicken", "bubbles", "Fried chicken. Cava. Tung shiraz bliver bitter."],
    ["mac and cheese med bacon", "creamyWhite", "Mac. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["bbq brisket", "bbqSweet", "Brisket. Zinfandel. Tør pinot mister grebet."],
    ["clam chowder", "creamyWhite", "Chowder. Chardonnay. Malbec er for tung."],
    ["buffalo wings", "chiliHeat", "Buffalo. Riesling. Cabernet forstærker varmen."],
    ["apple pie", "sweetDessert", "Apple pie. Moscatel. Tør cabernet bliver bitter."],
    ["caesar salad", "freshWhite", "Caesar. Sauvignon. Kraftig rød overdøver."],
  ]],
  ["vin-til-brittisk-mad", "britisk mad", "britisk", [
    ["fish and chips", "bubbles", "Fish and chips. Cava. Tung rød bliver bitter."],
    ["shepherd pie", "juicyRed", "Shepherd pie. Gamay. Cabernet er for tanninrig."],
    ["sunday roast", "spicyRed", "Sunday roast. Syrah. Let pinot drukner."],
    ["bangers and mash", "juicyRed", "Bangers. Barbera. Skarp sauvignon er forkert."],
    ["ploughmans", "freshWhite", "Ploughmans. Sauvignon. Fad chardonnay bliver smørret."],
    ["sticky toffee", "sweetDessert", "Sticky toffee. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-krydret-og-staerk-mad", "stærk mad", "stærk", [
    ["indisk vindaloo", "chiliHeat", "Vindaloo. Riesling. Cabernet forstærker varmen."],
    ["sichuan", "chiliHeat", "Sichuan. Riesling. Tør rød forstærker varmen."],
    ["thai green curry hot", "coconutCurry", "Hot curry. Gewürztraminer. Cabernet bliver bitter."],
    ["hot wings", "chiliHeat", "Wings. Riesling. Cabernet forstærker varmen."],
    ["harissa lam", "spicyRed", "Harissa. Syrah. Let pinot drukner."],
    ["kimchi stew", "chiliHeat", "Kimchi. Riesling. Tør rød forstærker varmen."],
  ]],
  ["vin-til-blaaskimmelost", "blåskimmelost", "ost", [
    ["med portvin", "blueCheese", "Port. Riesling eller port — undgå cabernet."],
    ["med honning", "sweetDessert", "Honning. Sauternes. Tør cabernet bliver bitter."],
    ["med valnødder", "blueCheese", "Valnød. Riesling. Tør cabernet bliver bitter."],
    ["i burger", "blueCheese", "Burger. Riesling. Cabernet bliver bitter."],
    ["med pære", "sweetDessert", "Pære. Moscatel. Tør rød bliver bitter."],
    ["med chilihonning", "sweetSpice", "Chilihonning. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-gedeost", "gedeost", "ost", [
    ["grillet med honning", "freshWhite", "Honning. Sauvignon. Fad chardonnay bliver smørret."],
    ["i salat med rødbede", "freshWhite", "Rødbede. Sauvignon. Malbec er for tung."],
    ["med urteolie", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
    ["med chili", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["på toast med tomat", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med figner", "sweetDessert", "Figner. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-brie-og-camembert", "brie", "ost", [
    ["bagt med honning", "creamyWhite", "Honning. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med æble", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["friteret", "bubbles", "Friture. Cava. Tung rød bliver bitter."],
    ["med cranberry", "sweetDessert", "Cranberry. Moscatel. Tør cabernet bliver bitter."],
    ["på toast med bacon", "juicyRed", "Bacon. Gamay. Cabernet er for tanninrig."],
  ]],
  ["vin-til-chokolademousse", "chokolademousse", "dessert", [
    ["mørk chokolade", "sweetDessert", "Mørk chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med hindbær", "sweetDessert", "Hindbær. Sauternes. Tør rød bliver bitter."],
    ["med chili", "sweetSpice", "Chili. Riesling. Cabernet bliver bitter."],
    ["med kaffe", "sweetDessert", "Kaffe. Moscatel. Tør cabernet bliver bitter."],
    ["med mynte", "sweetDessert", "Mynte. Moscatel. Tør cabernet bliver bitter."],
    ["med salt karamel", "sweetDessert", "Karamel. Sauternes. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-risalamande", "risalamande", "dessert", [
    ["klassisk med kirsebærsauce", "sweetDessert", "Kirsebær. Sauternes. Tør cabernet bliver bitter."],
    ["med mandelsplitter", "sweetDessert", "Mandel. Moscatel. Tør rød bliver bitter."],
    ["med fløde ekstra", "sweetDessert", "Fløde. Sauternes. Cabernet er forkert."],
    ["med chokolade", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med appelsin", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
    ["med vanilje", "sweetDessert", "Vanilje. Moscatel. Tør cabernet bliver bitter."],
  ]],
  ["vin-til-aebleskiver", "æbleskiver", "dessert", [
    ["med syltetøj", "sweetDessert", "Syltetøj. Moscatel. Tør cabernet bliver bitter."],
    ["med flødeskum", "sweetDessert", "Fløde. Sauternes. Kraftig rød er forkert."],
    ["med kanel", "sweetSpice", "Kanel. Riesling. Cabernet bliver bitter."],
    ["med chokolade", "sweetDessert", "Chokolade. Moscatel. Tør cabernet bliver bitter."],
    ["med æblekompot", "sweetDessert", "Æble. Sauternes. Tør rød bliver bitter."],
    ["med citron", "sweetSpice", "Citron. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-roedgroed", "rødgrød", "dessert", [
    ["med fløde", "sweetDessert", "Fløde. Sauternes. Tør cabernet bliver bitter."],
    ["med vaniljeis", "sweetDessert", "Vanilje. Moscatel. Kraftig rød er forkert."],
    ["ekstra syrlig", "sweetSpice", "Syre. Riesling. Cabernet bliver bitter."],
    ["med mandelsplitter", "sweetDessert", "Mandel. Moscatel. Tør cabernet bliver bitter."],
    ["med hindbær tungt", "sweetDessert", "Hindbær. Sauternes. Tør rød bliver bitter."],
    ["med mynte", "sweetSpice", "Mynte. Riesling. Cabernet bliver bitter."],
  ]],
  ["vin-til-brunch", "brunch", "brunch", [
    ["æg benedict", "creamyWhite", "Hollandaise. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["avocado toast", "freshWhite", "Avocado. Sauvignon. Malbec er for tung."],
    ["røget laks", "saltyFish", "Laks. Albariño. Rødvin overdøver."],
    ["pancakes med sirup", "sweetDessert", "Sirup. Moscatel. Tør cabernet bliver bitter."],
    ["shakshuka-agtig", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["bacon og æg", "juicyRed", "Bacon. Gamay. Cabernet er for tanninrig."],
  ]],
  ["vin-til-piknik", "piknik", "piknik", [
    ["med cold cuts", "rose", "Cold cuts. Rosé. Kraftig cabernet er for tung."],
    ["med gedeost", "freshWhite", "Gedeost. Sauvignon. Fad chardonnay bliver smørret."],
    ["med kyllingesalat", "lighterRed", "Kylling. Pinot. Malbec er for tung."],
    ["med jordbær", "sweetDessert", "Jordbær. Moscatel. Tør cabernet bliver bitter."],
    ["med røget laks", "saltyFish", "Laks. Albariño. Rødvin overdøver."],
    ["med chili snacks", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
  ]],
  ["vin-til-haveselskab", "haveselskab", "haveselskab", [
    ["med grillpølser", "juicyRed", "Pølser. Gamay. Cabernet er for tanninrig."],
    ["med jordbærkage", "sweetDessert", "Kage. Moscatel. Tør cabernet bliver bitter."],
    ["med rejer", "saltyFish", "Rejer. Albariño. Malbec er for tung."],
    ["med salatbuffet", "freshWhite", "Salat. Sauvignon. Kraftig rød overdøver."],
    ["med chili-ost", "chiliHeat", "Chili. Riesling. Cabernet forstærker varmen."],
    ["med rosélæskende snacks", "rose", "Snacks. Rosé. Tung malbec er for meget."],
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

  // Top up to ~500 with modifiers on underused cuisine/danish parents
  const TOPUP_PARENTS = [
    ["vin-til-mellemoestlig-mad", "mellemøstlig mad", "mellemøstlig"],
    ["vin-til-georgisk-mad", "georgisk mad", "georgisk"],
    ["vin-til-andalusisk-mad", "andalusisk mad", "andalusisk"],
    ["vin-til-catalansk-mad", "catalansk mad", "catalansk"],
    ["vin-til-baskisk-mad", "baskisk mad", "baskisk"],
    ["vin-til-venetiansk-mad", "venetiansk mad", "venetiansk"],
    ["vin-til-piemonte-mad", "piemonte-mad", "piemonte"],
    ["vin-til-australsk-bbq", "australsk bbq", "bbq"],
    ["vin-til-tatar-og-carpaccio", "tatar", "tatar"],
    ["vin-til-foie-gras", "foie gras", "foie"],
    ["vin-til-mozzarella-og-burrata", "burrata", "ost"],
    ["vin-til-parmesan", "parmesan", "ost"],
    ["vin-til-cheddar", "cheddar", "ost"],
    ["vin-til-feta", "feta", "ost"],
    ["vin-til-vesterhavsost", "vesterhavsost", "ost"],
    ["vin-til-gammel-knas", "gammel knas", "ost"],
    ["vin-til-hard-ost", "hård ost", "ost"],
    ["vin-til-hele-ostebordet", "ostebord", "ost"],
    ["vin-til-oksekoed", "oksekød", "oksekød"],
    ["vin-til-oksekoed-i-sauce", "oksekød i sauce", "oksekød"],
    ["vin-til-oksefilet", "oksefilet", "oksekød"],
    ["vin-til-svinekoed", "svinekød", "svinekød"],
    ["vin-til-vegetar", "vegetarret", "vegetar"],
    ["vin-til-vegetariske-og-veganske-retter", "vegansk ret", "vegansk"],
    ["vin-til-bearnaise", "bearnaise-ret", "sauce"],
    ["vin-til-koldskaal", "koldskål", "dessert"],
    ["vin-til-kransekage", "kransekage", "dessert"],
    ["vin-til-dessert-og-kransekage", "dessert", "dessert"],
    ["vin-til-efterarsmad", "efterårsret", "efterår"],
    ["vin-til-efteraar", "efterårsret", "efterår"],
    ["vin-til-sommer", "sommerret", "sommer"],
    ["vin-til-frokost", "frokostret", "frokost"],
    ["vin-til-romantisk-middag", "romantisk middag", "middag"],
  ];

  const TOPUP_MODS = [
    ["med citron", "lemonHerb", "Citron vil have høj syre. Sauvignon. Fadlagret chardonnay bliver smørret."],
    ["med chili", "chiliHeat", "Chili kræver frugt. Riesling. Tør cabernet forstærker brændingen."],
    ["med fløde", "creamyWhite", "Fløde dæmper syren. Chardonnay. Skarp sauvignon skærer sovsen over."],
    ["med urter", "herbalWhite", "Urter. Vermentino. Kraftig primitivo er for tung."],
    ["med svampe", "mushroom", "Svampe-umami. Pinot. Cabernet er for tanninrig."],
    ["med honning", "sweetSpice", "Honning. Riesling. Tør cabernet bliver bitter."],
    ["med røg", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
    ["med tomatsauce", "italianTomato", "Tomat. Sangiovese. Riesling matcher dårligt."],
    ["med aioli", "bubbles", "Aioli. Cava. Tung rød bliver bitter."],
    ["med pesto", "herbalWhite", "Pesto. Vermentino. Primitivo er for tung."],
    ["med lime", "freshWhite", "Lime. Sauvignon. Malbec er for tung."],
    ["med trøffel", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med BBQ", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
    ["med kokos", "coconutCurry", "Kokos. Riesling. Tør sauvignon bliver skarp."],
    ["med sennep", "juicyRed", "Sennep. Gamay. Kraftig cabernet bliver bitter."],
    ["med blåskimmel", "blueCheese", "Blåskimmel. Riesling. Tør cabernet bliver bitter."],
  ];

  for (const [parentSlug, stem, tag] of TOPUP_PARENTS) {
    if (!parentExists(parentSlug)) continue;
    for (const [modPart, profileKey, delta] of TOPUP_MODS) {
      if (out.length >= 520) break;
      const dish = buildDish(parentSlug, stem, tag, modPart, profileKey, delta);
      if (seen.has(dish.slug)) continue;
      seen.add(dish.slug);
      out.push(dish);
    }
  }

  fs.writeFileSync(
    outPath,
    `/**
 * Auto-genereret af scripts/build-micro-catalog-batch3.mjs
 * ${out.length} mikro-retter i nye områder (batch 3).
 */

export const MICRO_DISHES_BATCH3 = ${JSON.stringify(out, null, 2)};
`,
  );
  console.log(`skrev ${out.length} retter til ${path.relative(root, outPath)}`);
  console.log(`total katalog herefter: ${EXISTING.length + out.length}`);
  const parents = [...new Set(out.map((d) => d.parentSlug))];
  console.log(`unikke forældre i batch3: ${parents.length}`);
}

main();
