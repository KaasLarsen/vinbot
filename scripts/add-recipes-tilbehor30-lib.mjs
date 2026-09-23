/** Shared MDX builder for vin-tilbehør batches. */
import fs from "node:fs";
import path from "node:path";

const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");
const GUIDE_LINKS_PATH = path.join(process.cwd(), "lib", "growth", "guide-recipe-links.ts");

function yamlQuote(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function yamlList(items, indent = 0) {
  const pad = " ".repeat(indent);
  return items.map((i) => `${pad}- ${yamlQuote(i)}`).join("\n");
}

function buildExpansion(r, SLUG_EXPANSIONS) {
  const dish = r.title.split("—")[0].trim();
  const guides = r.relatedGuides
    .slice(0, 2)
    .map((g) => `[${g}](/guides/${g})`)
    .join(" · ");
  const specific = SLUG_EXPANSIONS[r.slug] ?? "";
  return `## Planlægning og råvarer

${dish} med vin i gryden starter med at vælge rigtig flaske til ${r.wineInRecipe.amount.toLowerCase()}. ${r.wineInRecipe.style} giver den syre og frugt, som retten har brug for — det er ikke snik-snak, men smagsbalance mod fedt, salt og krydderier. Læs ${guides} og [madlavning med vin i sauce](/guides/sadan-bruger-du-vin-til-sauce-og-simren) for baggrund. Opskriften er til ${r.servings} personer; prep og koketid følger frontmatter.

${specific}

## Smagsbalance og justering

Smag til undervejs: mangler dybde, reducer længere. For tung eller sød, tilsæt frisk syre — citron, eddike eller urter. Vin i gryden skal smage integreret, aldrig rå alkohol. Samme princip som [rødvinsgelé til charcuteri](/opskrifter/roedvinsgele-til-charcuteri) og [hvidvins-abrikoskompot](/opskrifter/hvidvins-abrikoskompot). Til glasset: [${r.wineToDrink.label}](/guides/${r.wineToDrink.guideSlug}) — match syre og frugt til det, du har i gryden. Mange tilbehør smager bedre næste dag; se opbevaring ovenfor.`;
}

function buildFaq(r) {
  if (!r.faq?.length) return "";
  const items = r.faq.map(([q, a]) => `### ${q}\n\n${a}`).join("\n\n");
  return `## Ofte stillede spørgsmål

${items}
`;
}

function buildClosing(r) {
  const tagStr = r.tags.filter((t) => t !== "opskrift").join(", ");
  return `## Afsluttende bemærkninger

Opskriften hører hjemme i kategorierne ${tagStr} — og viser, at vin i gryden ikke kun er til franske gryderetter. ${r.wineInRecipe.note} Første gang du laver retten, følg mængden vin nøje; derefter kan du justere efter smag. Smag til, før du serverer, og spørg dig selv om der mangler syre, salt eller frugt — små justeringer gør stor forskel.

Har du rester af samme flaske, brug den i glasset via [${r.wineToDrink.label}](/guides/${r.wineToDrink.guideSlug}). Alternativt søg efter vine med samme profil: ${r.wineInRecipe.style.toLowerCase()}. Læs også de relaterede guider i frontmatter for flere parringsidéer. God appetit — og læs trinene én gang igennem, før du starter, så kogetiden falder naturligt.`;
}

function buildBody(r, SLUG_EXPANSIONS) {
  const tips = r.tips.map(([t, d]) => `- **${t}:** ${d}`).join("\n");
  const mistakes = r.mistakes.map((m) => `- ${m}`).join("\n");
  return `${r.intro}

## ${r.whyTitle}

${r.why}

## Tips til perfekt resultat

${tips}

## Tilbehør og servering

${r.serving}

## Fejl at undgå

${mistakes}

## Opbevaring og variationer

${r.storage}

## Vin i glasset

${r.glass}

${buildFaq(r)}
${buildExpansion(r, SLUG_EXPANSIONS)}

${buildClosing(r)}
`;
}

function buildMdx(r, UPDATED, SLUG_EXPANSIONS) {
  return `---
title: ${yamlQuote(r.title)}
description: ${yamlQuote(r.description)}
slug: ${r.slug}
updated: ${yamlQuote(UPDATED)}
published: ${yamlQuote(UPDATED)}
tags: [${r.tags.map(yamlQuote).join(", ")}]
prepTime: ${yamlQuote(r.prepTime)}
cookTime: ${yamlQuote(r.cookTime)}
servings: ${r.servings}
difficulty: ${r.difficulty}
wineInRecipe:
  style: ${yamlQuote(r.wineInRecipe.style)}
  amount: ${yamlQuote(r.wineInRecipe.amount)}
  note: ${yamlQuote(r.wineInRecipe.note)}
wineToDrink:
  guideSlug: ${r.wineToDrink.guideSlug}
  searchQuery: ${yamlQuote(r.wineToDrink.searchQuery)}
  searchMax: ${r.wineToDrink.searchMax}
  label: ${yamlQuote(r.wineToDrink.label)}
relatedGuides:
${yamlList(r.relatedGuides, 2)}
ingredients:
${yamlList(r.ingredients, 2)}
instructions:
${yamlList(r.instructions, 2)}
---

${buildBody(r, SLUG_EXPANSIONS)}`;
}

function countBodyWords(mdx) {
  const parts = mdx.split("---");
  const body = parts.slice(2).join("---").trim();
  return body.split(/\s+/).filter(Boolean).length;
}

function updateGuideRecipeLinks(additions) {
  let content = fs.readFileSync(GUIDE_LINKS_PATH, "utf8");
  let added = 0;

  for (const [guideSlug, links] of Object.entries(additions)) {
    for (const link of links) {
      const guideBlock = content.match(new RegExp(`"${guideSlug}":\\s*\\[[\\s\\S]*?\\n  \\],`));
      if (guideBlock && guideBlock[0].includes(`slug: "${link.slug}"`)) continue;
      const keyRe = new RegExp(`"${guideSlug}":\\s*\\[`);
      if (keyRe.test(content)) {
        const insertRe = new RegExp(`("${guideSlug}":\\s*\\[[\\s\\S]*?)(\\n  \\],)`);
        if (insertRe.test(content) && !content.match(new RegExp(`"${guideSlug}":[\\s\\S]*?slug: "${link.slug}"`))) {
          content = content.replace(
            insertRe,
            `$1\n    { slug: "${link.slug}", label: ${JSON.stringify(link.label)} },$2`,
          );
          added++;
        }
      } else {
        const closing = content.lastIndexOf("\n};");
        const entry = `  "${guideSlug}": [\n    { slug: "${link.slug}", label: ${JSON.stringify(link.label)} },\n  ],\n`;
        content = content.slice(0, closing) + entry + content.slice(closing);
        added++;
      }
    }
  }

  fs.writeFileSync(GUIDE_LINKS_PATH, content);
  return added;
}

export function r(opts) {
  return {
    slug: opts.slug,
    title: opts.title,
    description: opts.description,
    tags: opts.tags,
    prepTime: opts.prepTime ?? "PT15M",
    cookTime: opts.cookTime ?? "PT30M",
    servings: opts.servings ?? 8,
    difficulty: opts.difficulty ?? "easy",
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

export function runBatch({ RECIPES, GUIDE_RECIPE_ADDITIONS, SLUG_EXPANSIONS, UPDATED, label }) {
  const force = process.argv.includes("--force");
  if (!fs.existsSync(RECIPES_DIR)) fs.mkdirSync(RECIPES_DIR, { recursive: true });

  const created = [];
  const skipped = [];
  const wordCounts = [];

  for (const recipe of RECIPES) {
    const filePath = path.join(RECIPES_DIR, `${recipe.slug}.mdx`);
    if (fs.existsSync(filePath) && !force) {
      skipped.push(recipe.slug);
      continue;
    }
    const mdx = buildMdx(recipe, UPDATED, SLUG_EXPANSIONS);
    const words = countBodyWords(mdx);
    if (words < 400) console.warn(`WARN: ${recipe.slug} har kun ${words} ord (krav: ≥400)`);
    fs.writeFileSync(filePath, mdx);
    created.push(recipe.slug);
    wordCounts.push({ slug: recipe.slug, words });
  }

  const linksAdded = updateGuideRecipeLinks(GUIDE_RECIPE_ADDITIONS);

  console.log(`\n${label}: ${created.length} oprettet, ${skipped.length} sprunget over.`);
  console.log(`Guide-recipe-links: ${linksAdded} nye links.\n`);
  for (const { slug, words } of wordCounts) console.log(`  - ${slug}.mdx (${words} ord)`);
}
