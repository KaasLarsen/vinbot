#!/usr/bin/env node
/** Marinader batch 3: 5 nye klassikere + guide-recipe-links + FAQ.
 *  Billeder: generér madfotos (ikke create-recipe-placeholder-images) og kopiér til public/images/recipes/. */
import fs from "node:fs";
import path from "node:path";
import {
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
} from "./recipes-marinader-batch3-data.mjs";

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

${dish} starter med den rigtige flaske: ${r.wineInRecipe.amount}. ${r.wineInRecipe.style} giver syre og aroma, der mørner og bærer krydderierne ind i råvaren. Læs ${guides} og [madlavning med vin](/guides/sadan-bruger-du-vin-til-sauce-og-simren). Opskriften dækker ca. ${r.servings} portioner kød, fisk eller grønt — fordobl marinaden til større batch.

${specific}

Vælg råvarer der matcher stil: magert kød tåler kortere tid, federe udskæringer og grydekød tåler længere. Brug zip-lock eller skål med låg, så overfladen ikke tørrer. Vend undervejs, hvis kødet ikke er helt dækket. Salt i marinaden er en del af mørningen — justér mindre salt ved bordet.

## Smagsbalance og justering

For syrlig marinade: mere olie eller en snert honning. For mild: mere vin, eddike eller citrus. For salt: fortynd med olie og vin. Salt tidligt mørner, men tør altid overfladen før stegning eller grill — vådt kød damper. Til glasset: [${r.wineToDrink.label}](/guides/${r.wineToDrink.guideSlug}). Samme stil som i skålen er ofte det sikre valg. Se også [rødvinsmarinade til oksekød](/opskrifter/rodvinsmarinade-til-oksekod) for grundprincipper om tid, pose og genbrug af marinade.`;
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

Kategorier: ${tagStr}. Vinmarinade er en af de nemmeste måder at få dybde uden lang simring. ${r.wineInRecipe.note} Følg tiderne første gang; tynde udskæringer mørner hurtigere end tykke stege. Lav gerne dobbelt batch — halvdelen til kød, resten (ubesmittet) til reduktion eller pensling efter kogning.

Resten af flasken hører til glasset: [${r.wineToDrink.label}](/guides/${r.wineToDrink.guideSlug}). Stil: ${r.wineInRecipe.style.toLowerCase()}. Læs relaterede guider i frontmatter for flere parringer. God appetit — og husk at tørre råvaren før varme, så du får skorpe i stedet for damp.`;
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
