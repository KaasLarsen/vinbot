#!/usr/bin/env node
/** Verificer at alle opskrifter har et tilhørende billede i public/images/recipes/. */
import fs from "node:fs";
import path from "node:path";

const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");
const IMAGES_DIR = path.join(process.cwd(), "public", "images", "recipes");

const slugs = fs
  .readdirSync(RECIPES_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""));

const missing = slugs.filter((slug) => !fs.existsSync(path.join(IMAGES_DIR, `${slug}.jpg`)));

if (missing.length === 0) {
  console.log(`OK: ${slugs.length} opskriftsbilleder fundet.`);
  process.exit(0);
}

console.error(`Mangler ${missing.length} billeder:`);
for (const slug of missing.sort()) {
  console.error(`  - ${slug}.jpg`);
}
process.exit(1);
