/**
 * Batch 7: ~100 mikro-retter på underfyldte danske forældre-guides.
 * Kør: node scripts/build-micro-catalog-batch7.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MICRO_DISHES as BASE } from "./micro-pairings-catalog.mjs";
import { MICRO_DISHES_EXTRA as EXTRA } from "./micro-pairings-catalog-extra.mjs";
import { MICRO_DISHES_BATCH3 as BATCH3 } from "./micro-pairings-catalog-batch3.mjs";
import { MICRO_DISHES_BATCH4 as BATCH4 } from "./micro-pairings-catalog-batch4.mjs";
import { MICRO_DISHES_BATCH5 as BATCH5 } from "./micro-pairings-catalog-batch5.mjs";
import { MICRO_DISHES_BATCH6 as BATCH6 } from "./micro-pairings-catalog-batch6.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const guidesDir = path.join(root, "content/guides");
const outPath = path.join(root, "scripts/micro-pairings-catalog-batch7.mjs");
const EXISTING = [...BASE, ...EXTRA, ...BATCH3, ...BATCH4, ...BATCH5, ...BATCH6];
const TARGET = 100;

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
  sweetDessert: { defaultWine: "sauternes", altWine: "moscatel", avoidWine: "cabernet sauvignon", searchQuery: "sauternes moscatel" },
  germanWhite: { defaultWine: "riesling", altWine: "silvaner", avoidWine: "malbec", searchQuery: "riesling silvaner" },
  nordic: { defaultWine: "riesling", altWine: "pinot noir", avoidWine: "zinfandel", searchQuery: "riesling pinot noir" },
};

/** [parentSlug, dishStem, tag, mods] — 4 nye, unikke mods pr. forælder (ikke allerede i batch 1–6) */
const BASES = [
  ["vin-til-skipperlabskovs", "skipperlabskovs", "labskovs", [
    ["med oksehale og mørk sauce", "spicyRed", "Oksehale. Syrah. Let pinot drukner."],
    ["med chili og krydderier", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med karry og æble", "sweetSpice", "Karry/æble. Riesling. Cabernet bliver bitter."],
    ["med trøffelolie tip", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-gule-aerter", "gule ærter", "gule ærter", [
    ["med stegt løg og æbleeddike", "germanWhite", "Eddike/løg. Riesling. Malbec er for tung."],
    ["med røget medisterpølse", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
    ["med stærk sennep og chili", "chiliHeat", "Chili/sennep. Riesling. Zinfandel forstærker varmen."],
    ["med selleri og persille", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-medister", "medister", "medister", [
    ["med brun sovs og løg", "juicyRed", "Sovs. Garnacha. Cabernet er for tanninrig."],
    ["med æblemos og kanel", "sweetSpice", "Æble. Riesling. Cabernet bliver bitter."],
    ["med peberrod og creme", "freshWhite", "Peberrod. Sauvignon. Malbec er for tung."],
    ["med BBQ-glasur", "bbqSweet", "BBQ. Zinfandel. Tør pinot mister grebet."],
  ]],
  ["vin-til-sild", "sild", "sild", [
    ["med tomatsild klassisk", "nordic", "Tomat. Riesling. Zinfandel er for sød."],
    ["med solbærmarmelade", "sweetSpice", "Solbær. Riesling. Cabernet bliver bitter."],
    ["med wasabi mayo", "freshWhite", "Wasabi. Sauvignon. Malbec er for tung."],
    ["med røget paprika", "smoky", "Paprika. Syrah. Sauvignon bliver skarp."],
  ]],
  ["vin-til-stjerneskud", "stjerneskud", "fisk", [
    ["med hummerhaler", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med chili-remoulade", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med grønne asparges og citron", "lemonHerb", "Asparges. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med stjerneskud-bobler tip", "bubbles", "Friture. Cava. Tung malbec er for meget."],
  ]],
  ["vin-til-tarteletter", "tarteletter", "tarteletter", [
    ["med hummer og cognac", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med portvins-svampe", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med kylling og harissa", "chiliHeat", "Harissa. Riesling. Zinfandel forstærker varmen."],
    ["med ærter og mynte", "herbalWhite", "Mynte. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-gulasch", "gulasch", "gulasch", [
    ["med spätzle og smør", "juicyRed", "Spätzle. Garnacha. Cabernet er for tanninrig."],
    ["med røget paprika ekstra hot", "chiliHeat", "Paprika. Riesling. Zinfandel forstærker varmen."],
    ["med creme fraiche og dild", "creamyWhite", "Creme. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med syltede agurker", "freshWhite", "Syltet. Sauvignon. Malbec er for tung."],
  ]],
  ["vin-til-boef-stroganoff", "stroganoff", "oksekød", [
    ["med cognac flamberet", "spicyRed", "Cognac. Syrah. Let pinot drukner."],
    ["med skovsvampe tungt", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
    ["med ungarnsk paprika hot", "chiliHeat", "Paprika. Riesling. Zinfandel forstærker varmen."],
    ["med smørrede æggenudler", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
  ]],
  ["vin-til-peberboef", "peberbøf", "oksekød", [
    ["med madeira-fløde", "creamyWhite", "Madeira. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med fire peberkorntyper", "spicyRed", "Peber. Syrah. Let pinot drukner."],
    ["med chili-smør", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med rosmarin-pommes", "herbalWhite", "Rosmarin. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-roastbeef", "roastbeef", "oksekød", [
    ["med peberrodsskum", "freshWhite", "Peberrod. Sauvignon. Fad chardonnay bliver smørret."],
    ["med yorkshire gravy", "juicyRed", "Gravy. Garnacha. Cabernet er for tanninrig."],
    ["med chili-sennepsskorpe", "chiliHeat", "Sennep/chili. Riesling. Zinfandel forstærker varmen."],
    ["med persilleolie", "herbalWhite", "Persille. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-okseskank", "okseskank", "oksekød", [
    ["med appelsinskal og nellike", "sweetSpice", "Appelsin. Riesling. Cabernet bliver bitter."],
    ["med trøffelpolenta", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med stærk tomatsauce", "chiliHeat", "Chili/tomat. Riesling. Zinfandel forstærker varmen."],
    ["med rodfrugtpuré og smør", "juicyRed", "Rodfrugt. Garnacha. Cabernet er for tanninrig."],
  ]],
  ["vin-til-svinemoerbrad", "svinemørbrad", "svinekød", [
    ["med æblecider-sauce", "sweetSpice", "Cider. Riesling. Cabernet bliver bitter."],
    ["med grov sennepsskorpe", "juicyRed", "Sennep. Barbera. Cabernet bliver bitter."],
    ["med abrikos og chili", "chiliHeat", "Chili/abrikos. Riesling. Zinfandel forstærker varmen."],
    ["med salvie og pancetta", "umamiRed", "Salvie. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-svinekam", "svinekam", "svinekød", [
    ["med chili-salt på svær", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med fennikel og æble", "sweetSpice", "Fennikel/æble. Riesling. Cabernet bliver bitter."],
    ["med senneps-gravy", "juicyRed", "Sennep. Gamay. Cabernet bliver bitter."],
    ["med urtefyld", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-kalvemoerbrad", "kalvemørbrad", "kalv", [
    ["med fløde og moraller", "mushroom", "Moraller. Pinot. Cabernet er for tanninrig."],
    ["med citron og kapers", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
    ["med chiliolie tip", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med marsala-sauce", "umamiRed", "Marsala. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-dyreryg", "dyreryg", "vildt", [
    ["med brombærsauce", "sweetSpice", "Brombær. Riesling. Cabernet bliver bitter."],
    ["med enebærcreme", "spicyRed", "Enebær. Syrah. Let pinot drukner."],
    ["med chili og kakao", "spicyRed", "Chili/kakao. Malbec. Let pinot drukner."],
    ["med selleripuré", "lighterRed", "Selleri. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-gaas", "gås", "gås", [
    ["med kvædekompot", "sweetSpice", "Kvæde. Riesling. Cabernet bliver bitter."],
    ["med rødkål og bacon", "juicyRed", "Bacon/rødkål. Garnacha. Cabernet er for tanninrig."],
    ["med blomme og chili", "chiliHeat", "Blomme/chili. Riesling. Zinfandel forstærker varmen."],
    ["med kastanjefyld", "umamiRed", "Kastanjer. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-lys-fisk", "lys fisk", "fisk", [
    ["med brunt smør og nødder", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med salsa criolla", "freshWhite", "Salsa. Sauvignon. Malbec er for tung."],
    ["med chili og sesam", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med urteskorpe", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
  ]],
  ["vin-til-grillet-fisk", "grillet fisk", "fisk", [
    ["med mango-chilisalsa", "chiliHeat", "Mango/chili. Riesling. Zinfandel forstærker varmen."],
    ["med oliven-tapenade", "herbalWhite", "Oliven. Vermentino. Primitivo er for tung."],
    ["med miso-smør", "umamiRed", "Miso. Pinot. Zinfandel bliver marmeladeagtig."],
    ["med citron og timian", "lemonHerb", "Citron. Assyrtiko. Fad chardonnay bliver smørret."],
  ]],
  ["vin-til-brunch", "brunch", "brunch", [
    ["med french toast og bær", "sweetDessert", "French toast. Moscatel. Tør cabernet bliver bitter."],
    ["med røget ørred", "saltyFish", "Ørred. Albariño. Pinot overdøver."],
    ["med spicy bloody mary æg", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med svampeomelet", "mushroom", "Svampe. Pinot. Cabernet er for tanninrig."],
  ]],
  ["vin-til-piknik", "piknik", "piknik", [
    ["med prosciutto og melon", "rose", "Melon. Rosé. Cabernet er for tung."],
    ["med kyllingesalat wraps", "lighterRed", "Kylling. Pinot. Cabernet er for tanninrig."],
    ["med chokolade-cookies", "sweetDessert", "Cookies. Moscatel. Tør cabernet bliver bitter."],
    ["med spicy oliven", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-haveselskab", "haveselskab", "haveselskab", [
    ["med grillede rejer", "saltyFish", "Rejer. Albariño. Pinot overdøver."],
    ["med bærtærte", "sweetDessert", "Tærte. Moscatel. Tør cabernet bliver bitter."],
    ["med urte-focaccia", "herbalWhite", "Urter. Vermentino. Primitivo er for tung."],
    ["med spicy aioli-fritter", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
  ]],
  ["vin-til-julemad-den-store-guide", "julemad", "jul", [
    ["med risalamande og kirsebær", "sweetDessert", "Risalamande. Moscatel. Tør cabernet bliver bitter."],
    ["med brunede kartofler og flæsk", "juicyRed", "Flæsk. Garnacha. Cabernet er for tanninrig."],
    ["med peberrodssild ekstra", "nordic", "Sild/peberrod. Riesling. Zinfandel er for sød."],
    ["med trøffelmos side", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-nytarsaften", "nytårsaften", "nytår", [
    ["med hummer thermidor", "creamyWhite", "Hummer. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med wagyu tip", "spicyRed", "Wagyu. Syrah. Let pinot drukner."],
    ["med champagne-sorbet", "bubbles", "Sorbet. Cava. Tung malbec er for meget."],
    ["med trøffelrisotto", "umamiRed", "Trøffel. Pinot. Zinfandel bliver marmeladeagtig."],
  ]],
  ["vin-til-ost-og-ostebord", "ostebord", "ost", [
    ["med bobler som start", "bubbles", "Bobler. Cava. Tung malbec er for meget."],
    ["med sød afslutning", "sweetDessert", "Sød. Sauternes. Tør cabernet bliver bitter."],
    ["med spicy tilbehør", "chiliHeat", "Chili. Riesling. Zinfandel forstærker varmen."],
    ["med røget charcuteri", "smoky", "Røg. Syrah. Sauvignon bliver skarp."],
  ]],
  ["vin-til-krebse", "krebs", "skaldyr", [
    ["med dildcreme", "freshWhite", "Dild. Sauvignon. Malbec er for tung."],
    ["med hvidløgssmør-bad", "creamyWhite", "Smør. Chardonnay. Skarp sauvignon skærer for hårdt."],
    ["med cajun-krydderi", "chiliHeat", "Cajun. Riesling. Zinfandel forstærker varmen."],
    ["med citron-aioli", "bubbles", "Aioli. Cava. Tung malbec bliver bitter."],
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
      if (seen.has(dish.slug)) {
        console.warn(`skip duplicate slug ${dish.slug}`);
        continue;
      }
      if (fs.existsSync(path.join(guidesDir, `${dish.slug}.mdx`))) {
        console.warn(`skip existing mdx ${dish.slug}`);
        continue;
      }
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
 * Auto-genereret af scripts/build-micro-catalog-batch7.mjs
 * ${out.length} mikro-retter (batch 7).
 */

export const MICRO_DISHES_BATCH7 = ${JSON.stringify(out, null, 2)};
`,
  );
  console.log(`skrev ${out.length} retter til ${path.relative(root, outPath)}`);
  console.log(`total katalog herefter: ${EXISTING.length + out.length}`);
  console.log(`unikke forældre: ${new Set(out.map((d) => d.parentSlug)).size}`);
}

main();
