#!/usr/bin/env node
/**
 * DEPRECATED — kør ikke igen uden omskrivning.
 * Indsatte identiske skabelonafsnit på ~198 guides (AdSense «scaled content»-risiko).
 * Brug i stedet: node scripts/diversify-guide-templates.mjs (fjerner boilerplate).
 *
 * Udvider guides med 400–600 ord med kontekstuelt afsnit (mål: ≥620 ord).
 * Kør: node scripts/expand-guides-400-600.mjs
 * Dry-run: node scripts/expand-guides-400-600.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import readingTime from "reading-time";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const guidesDir = path.join(root, "content/guides");
const recipesDir = path.join(root, "content/recipes");
const linksFile = path.join(root, "lib/growth/guide-recipe-links.ts");

const MIN = 400;
const MAX_EXCL = 600; // udvid guides med < 600 ord
const TARGET = 650;
const dryRun = process.argv.includes("--dry-run");
const TODAY = "2026-06-07";

/** @type {Record<string, { slug: string; label: string }[]>} */
const guideRecipeLinks = {};
const linksSrc = fs.readFileSync(linksFile, "utf8");
for (const m of linksSrc.matchAll(/"([^"]+)":\s*\[([\s\S]*?)\],/g)) {
  const key = m[1];
  const items = [...m[2].matchAll(/\{\s*slug:\s*"([^"]+)",\s*label:\s*"([^"]+)"\s*\}/g)].map((x) => ({
    slug: x[1],
    label: x[2],
  }));
  if (items.length) guideRecipeLinks[key] = items;
}

const recipeSlugs = fs
  .readdirSync(recipesDir)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""));

function wordCount(body) {
  return readingTime(body).words;
}

function recipeLinksMd(slug, limit = 4) {
  const fromMap = guideRecipeLinks[slug] ?? [];
  let items = fromMap;
  if (items.length === 0 && slug.startsWith("vin-til-")) {
    const topic = slug.replace("vin-til-", "").split("-")[0];
    const hits = recipeSlugs.filter((r) => r.includes(topic)).slice(0, limit);
    items = hits.map((s) => ({ slug: s, label: s.replace(/-/g, " ") }));
  }
  if (items.length === 0) return "";
  const lines = items
    .slice(0, limit)
    .map((r) => `- [${r.label}](/opskrifter/${r.slug})`)
    .join("\n");
  return `\n${lines}\n`;
}

function expansionForGuide(slug, data, words) {
  const { title, hub, tags = [] } = data;
  const recipeBlock = recipeLinksMd(slug);
  const need = Math.max(80, TARGET - words);

  if (recipeBlock) {
    return {
      heading: "## Opskrifter med vin i gryden",
      body: `Når du har valgt vin til tallerkenen, kan **samme stil** ofte bruges i gryden — det giver dybde i saucen og en naturlig parring i glasset. Her er opskrifter på Vinbot, der matcher **${title.replace(/^Vin til /i, "").replace(/:.*/, "")}**:\n${recipeBlock}\nSe også [sådan bruger du vin til sauce og simren](/guides/sadan-bruger-du-vin-til-sauce-og-simren) for reduktion, fond og fejl at undgå.`,
    };
  }

  if (slug.startsWith("vin-til-")) {
    const dish = title.replace(/^Vin til\s*/i, "").split(":")[0].trim();
    return {
      heading: "## Konkret dansk hverdag ved bordet",
      body: `**${dish}** spises i Danmark både som hverdagsmad og til gæster — og menuen varierer (tilbehør, salt, fedme, sødme). Notér de **dominerende smage** på tallerkenen før du vælger flaske: er retten **fed og cremet**, **syrlig og frisk** eller **krydret og stærk**? Brug derefter [komplet guide til vin og mad](/guides/komplet-guide-til-vin-og-mad) som oversigt, og søg konkrete flasker via **[Vinbots søgning](/?q=${encodeURIComponent(dish.split(" ")[0])})** når du vil sammenligne pris hos danske forhandlere.`,
    };
  }

  if (slug.startsWith("bedste-")) {
    const style = title.replace(/^Bedste\s*/i, "").split(":")[0].trim();
    return {
      heading: "## Flasken til mad — ikke kun til glasset",
      body: `En god **${style}**-flaske til 80–200 kr kan ofte bruges **både i glasset og i gryden** — fx i tomatsauce, gryderet eller svampesovs. Vælg en vin med **frisk syre** og undgå meget tung fad, hvis saucen allerede er cremet. Til madmatch: [vin til pizza og pasta](/guides/vin-til-pizza-og-pasta), [vin til gryderet](/guides/vin-til-gryderet) og [opskrifter med vin](/opskrifter).`,
    };
  }

  if (slug.includes("-fra-") || tags.some((t) => ["rødvin", "hvidvin", "rosé", "bobler"].includes(t))) {
    const region = title.includes("fra") ? title.split("fra").pop().split(":")[0].trim() : "regionen";
    return {
      heading: "## Smag og mad i praksis",
      body: `Flasker fra **${region}** kan testes ved bordet med **enkel mad** før du investerer i dyrere årgange: tomatpasta, grillede grøntsager, fisk med citron eller moden ost. Notér om vinen har **nok syre** til retten og om **tannin eller sødme** dominerer. Sammenlign pris og stil via **[Vinbots søgning](/?q=${encodeURIComponent(title.split(" ")[0])})** — og læs [komplet guide til vin og mad](/guides/komplet-guide-til-vin-og-mad) for generelle parringsregler.`,
    };
  }

  if (slug.startsWith("vinregion-")) {
    const region = title.replace(/^Vinregion\s*/i, "").split(":")[0].trim();
    return {
      heading: "## Regionen på tallerkenen",
      body: `**${region}** producerer vine der ofte passer til **mad fra samme område** — ikke som regel, men som genvej: syre til fisk, tannin til kød, bobler til salt og fedme. Start med én hvid og én rød fra regionen til en **simpel middag** (pasta, kylling, ost) før du dykker ned i enkeltvin-marker. Se [komplet guide til vin og mad](/guides/komplet-guide-til-vin-og-mad) og [alle regioner](/regioner).`,
    };
  }

  if (slug.startsWith("hvad-er-") || hub === "vin-viden") {
    return {
      heading: "## Hvorfor det betyder noget i praksis",
      body: `**${title.split(":")[0].trim()}** påvirker, hvordan du **vælger, opbevarer og serverer** vin — og om en flaske smager som forventet til maden. Brug viden her sammen med [vin-brevkassen](/guides/vin-brevkassen) for hurtige svar og [opbevaring, temperatur og åbnet flaske](/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske) når flasken først er åben.`,
    };
  }

  if (hub === "mad-og-vin" || tags.includes("mad og vin")) {
    return {
      heading: "## Næste skridt til middagen",
      body: `Brug guiden som **beslutningsstøtte**, ikke som facit: smag på maden først (salt, fedme, syre, krydderi), vælg derefter vin med **matchende struktur**. Udforsk [opskrifter med vin i gryden](/opskrifter) for konkrete retter, og søg flasker på **[Vinbot](/)** når du vil sammenligne pris.`,
    };
  }

  return {
    heading: "## Praktisk på Vinbot",
    body: `Brug **${title.split(":")[0].trim()}** sammen med [komplet guide til vin og mad](/guides/komplet-guide-til-vin-og-mad) og [alle guides](/guides) når du vil gå videre fra overblik til konkret flaske. Søg via **[Vinbot](/?q=${encodeURIComponent(slug.replace(/-/g, " "))})** for at sammenligne tilbud hos danske forhandlere.`,
  };
}

function insertExpansion(body, section) {
  const block = `\n${section.heading}\n\n${section.body}\n`;
  const anchors = ["\n## Søg", "\n## Læs mere i klyngen", "\n## Læs mere", "\n## Flere dybdeguider"];
  for (const a of anchors) {
    const i = body.indexOf(a);
    if (i !== -1) return body.slice(0, i) + block + body.slice(i);
  }
  return body.trimEnd() + block;
}

const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"));
let updated = 0;
let skipped = 0;

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const fp = path.join(guidesDir, file);
  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);
  const words = wordCount(content);

  if (words < MIN || words >= MAX_EXCL) continue;

  let newContent = content;
  const hasFirst =
    content.includes("## Opskrifter med vin i gryden") ||
    content.includes("## Konkret dansk hverdag ved bordet") ||
    content.includes("## Flasken til mad") ||
    content.includes("## Smag og mad i praksis") ||
    content.includes("## Hvorfor det betyder noget i praksis");

  if (!hasFirst) {
    const section = expansionForGuide(slug, data, words);
    newContent = insertExpansion(content, section);
  }

  // Anden blok hvis stadig under TARGET
  if (wordCount(newContent) < TARGET && !newContent.includes("## Budget, temperatur og fejl")) {
    const dish = data.title?.split(":")[0]?.trim() ?? slug;
    const second = {
      heading: "## Budget, temperatur og fejl",
      body: `**Budget:** De fleste danske hjemmescenarier omkring **${dish.replace(/^Vin til /i, "").replace(/^Bedste /i, "")}** klares med **80–200 kr** flasker — investér i dyrere vin til gæster, ikke til hverdagsgryde. **Temperatur:** Afkøl hvid og bobler **8–11 °C**; let rød **13–16 °C** når retten er salt eller fed. **Fejl:** For høj alkohol til stærk chili, for stram tannin til cremet sauce, og for neutral «supermarked-hvid» til sød-soja eller komplekse juleretter. Gem [komplet guide til vin og mad](/guides/komplet-guide-til-vin-og-mad) som bookmark.`,
    };
    newContent = insertExpansion(newContent, second);
  }

  // Tredje blok til resterende under 600 ord
  if (wordCount(newContent) < MAX_EXCL && !newContent.includes("## Sådan tester du matchet hjemme")) {
    const topic = (data.title ?? slug).split(":")[0].trim();
    const third = {
      heading: "## Sådan tester du matchet hjemme",
      body: `Lav en **enkel testmiddag** omkring **${topic}**: én ret, to flasker (én med høj syre, én med mere krop), og notér hvilken der **balancerer** salt, fedme og sødme bedst. Del gerne en halv flaske til gryden og resten til glasset — se [opskrifter](/opskrifter) for inspiration. Når du har fundet stilen, brug **[Vinbots søgning](/)** til at finde samme profil til bedre pris næste gang.`,
    };
    newContent = insertExpansion(newContent, third);
  }

  const newWords = wordCount(newContent);

  if (!dryRun) {
    data.updated = TODAY;
    const out = matter.stringify(newContent, data);
    fs.writeFileSync(fp, out);
  }
  updated++;
  if (dryRun && updated <= 5) {
    console.log(`[dry] ${slug}: ${words} → ${newWords} (${section.heading})`);
  }
}

console.log(dryRun ? `Dry-run: ville opdatere ${updated} guides (skipped ${skipped})` : `Opdateret ${updated} guides (skipped ${skipped})`);
