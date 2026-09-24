#!/usr/bin/env node
/** Verificer at alle drinks har et tilhørende billede i public/images/drinks/. */
import fs from "node:fs";
import path from "node:path";

const DRINKS_DIR = path.join(process.cwd(), "content", "drinks");
const IMAGES_DIR = path.join(process.cwd(), "public", "images", "drinks");

const slugs = fs
  .readdirSync(DRINKS_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""));

const missing = slugs.filter((slug) => !fs.existsSync(path.join(IMAGES_DIR, `${slug}.jpg`)));

if (missing.length === 0) {
  console.log(`OK: ${slugs.length} drink-billeder fundet.`);
  process.exit(0);
}

console.error(`Mangler ${missing.length} billeder:`);
for (const slug of missing.sort()) {
  console.error(`  - ${slug}.jpg`);
}
process.exit(1);
