#!/usr/bin/env node
/** Suppe-dessert huller: 3 nye klassikere + guide-recipe-links + FAQ.
 *  Billeder: generér madfotos (ikke create-recipe-placeholder-images) og kopiér til public/images/recipes/. */
import fs from "node:fs";
import path from "node:path";
import {
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
} from "./recipes-suppe-dessert-gap-data.mjs";

const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");
const GUIDE_LINKS_PATH = path.join(process.cwd(), "lib", "growth", "guide-recipe-links.ts");

function yamlQuote(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function yamlList(items, indent = 0) {
  const pad = " ".repeat(indent);
  return items.map((i) => `${pad}- ${yamlQuote(i)}`).join("\n");
}

function buildExpansion(r) {
  const dish = r.title.split("—")[0].trim();
  const guides = r.relatedGuides
    .slice(0, 2)
    .map((g) => `[${g}](/guides/${g})`)
    .join(" · ");
  const specific = SLUG_EXPANSIONS[r.slug] ?? "";
  return `## Planlægning og råvarer

${dish} starter med den rigtige flaske: ${r.wineInRecipe.amount}. ${r.wineInRecipe.style} er afgørende for slutresultatet — både smag og balance. Læs ${guides} og [madlavning med vin](/guides/sadan-bruger-du-vin-til-sauce-og-simren). Opskriften er sat til ${r.servings} ${r.servings === 1 ? "portion/glas" : "portioner"}.

${specific}

Vælg råvarer i god kvalitet: fond, smør, krydderier og likør gør større forskel end dyre «hverdagsvine» i gryden. Mål og smag til undervejs — især sødme og salt.

## Smagsbalance og justering

For syrlig: mere smør, sukker eller en snert fløde. For sød: mere eddike, citron eller tør vin. For tynd sauce: reducer længere. For kraftig drik: fortynd eller server i mindre glas. Til glasset (eller som drikkken selv): [${r.wineToDrink.label}](/guides/${r.wineToDrink.guideSlug}).`;
}

function buildFaq(r) {
  if (!r.faq?.length) return "";
  const items = r.faq
    .map(([q, a]) => `### ${q}\n\n${a}`)
    .join("\n\n");
  return `## Ofte stillede spørgsmål

${items}
`;
}

function buildBody(r) {
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
${buildExpansion(r)}

${buildClosing(r)}
`;
}

function buildClosing(r) {
  const tagStr = r.tags.filter((t) => t !== "opskrift").join(", ");
  return `## Afsluttende bemærkninger

Kategorier: ${tagStr}. ${r.wineInRecipe.note} Følg temperatur og tider — især ved smøremulsioner og varme drikke, der ikke må koge.

Relateret: [${r.wineToDrink.label}](/guides/${r.wineToDrink.guideSlug}). Stil: ${r.wineInRecipe.style.toLowerCase()}. God appetit — eller skål.`;
}

function buildMdx(r) {
  const fm = `---
title: ${yamlQuote(r.title)}
description: ${yamlQuote(r.description)}
slug: ${r.slug}
updated: ${yamlQuote(UPDATED)}
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

${buildBody(r)}`;
  return fm;
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
      if (content.includes(`slug: "${link.slug}"`) && content.includes(`"${guideSlug}"`)) {
        // May already exist under this guide — check more carefully
        const guideBlock = content.match(new RegExp(`"${guideSlug}":\\s*\\[[\\s\\S]*?\\n  \\],`));
        if (guideBlock && guideBlock[0].includes(`slug: "${link.slug}"`)) continue;
      }
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
  const mdx = buildMdx(recipe);
  const words = countBodyWords(mdx);
  if (words < 400) console.warn(`WARN: ${recipe.slug} har kun ${words} ord (krav: ≥400)`);
  fs.writeFileSync(filePath, mdx);
  created.push(recipe.slug);
  wordCounts.push({ slug: recipe.slug, words });
}

const linksAdded = updateGuideRecipeLinks(GUIDE_RECIPE_ADDITIONS);

console.log(`\nOpskrifter: ${created.length} oprettet, ${skipped.length} sprunget over.`);
console.log(`Guide-recipe-links: ${linksAdded} nye links.\n`);
for (const { slug, words } of wordCounts) console.log(`  - ${slug}.mdx (${words} ord)`);

if (created.length === 0 && skipped.length === 0) process.exit(1);
