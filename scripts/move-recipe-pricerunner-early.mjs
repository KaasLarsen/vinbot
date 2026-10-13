#!/usr/bin/env node
/**
 * Flyt "## Vin i glasset"-sektionen (inkl. PriceRunner) frem lige efter intro
 * i opskrifter, hvor den ligger sent og indeholder PriceRunnerProduct.
 *
 * Dry-run: node scripts/move-recipe-pricerunner-early.mjs
 * Write:   node scripts/move-recipe-pricerunner-early.mjs --write
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("content/recipes");
const WRITE = process.argv.includes("--write");

function splitFrontmatter(raw) {
  if (!raw.startsWith("---\n")) return null;
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) return null;
  return {
    fm: raw.slice(0, end + 5),
    body: raw.slice(end + 5),
  };
}

/** Extract "## Vin i glasset" through the line before the next ## heading. */
function extractVinIGlasset(body) {
  const re = /^## Vin i glasset\s*\n[\s\S]*?(?=^## |\Z)/m;
  const m = body.match(re);
  if (!m) return null;
  return { block: m[0], index: m.index, length: m[0].length };
}

function alreadyEarly(body, blockIndex) {
  // Early = before the second ## heading (intro + at most one other section).
  const headings = [...body.matchAll(/^## /gm)];
  if (headings.length === 0) return true;
  const first = headings[0].index;
  // If Vin i glasset is the first heading, already early.
  if (blockIndex === first) return true;
  // If it's the second heading and starts within ~800 chars of first, treat as early enough.
  if (headings.length >= 2 && blockIndex === headings[1].index && blockIndex - first < 800) {
    return true;
  }
  return false;
}

function insertAfterIntro(bodyWithoutBlock, block) {
  const trimmedBlock = block.replace(/\s+$/, "") + "\n\n";
  // Intro ends at first ## heading.
  const firstHeading = bodyWithoutBlock.search(/^## /m);
  if (firstHeading === -1) {
    return bodyWithoutBlock.replace(/\s+$/, "") + "\n\n" + trimmedBlock;
  }
  const intro = bodyWithoutBlock.slice(0, firstHeading).replace(/\s+$/, "");
  const rest = bodyWithoutBlock.slice(firstHeading);
  return `${intro}\n\n${trimmedBlock}${rest}`;
}

let scanned = 0;
let moved = 0;
let skipped = 0;

for (const name of fs.readdirSync(ROOT).sort()) {
  if (!name.endsWith(".mdx")) continue;
  const filePath = path.join(ROOT, name);
  const raw = fs.readFileSync(filePath, "utf8");
  if (!raw.includes("<PriceRunnerProduct")) continue;
  scanned += 1;

  const parts = splitFrontmatter(raw);
  if (!parts) {
    skipped += 1;
    continue;
  }

  const extracted = extractVinIGlasset(parts.body);
  if (!extracted) {
    skipped += 1;
    continue;
  }
  if (!extracted.block.includes("<PriceRunnerProduct")) {
    skipped += 1;
    continue;
  }
  if (alreadyEarly(parts.body, extracted.index)) {
    skipped += 1;
    continue;
  }

  const without = parts.body.slice(0, extracted.index) + parts.body.slice(extracted.index + extracted.length);
  const newBody = insertAfterIntro(without, extracted.block);
  const next = parts.fm + newBody;

  if (WRITE) {
    fs.writeFileSync(filePath, next.endsWith("\n") ? next : `${next}\n`, "utf8");
  }
  moved += 1;
  console.log(`${WRITE ? "moved" : "would-move"}: ${name}`);
}

console.log(`\nscanned=${scanned} moved=${moved} skipped=${skipped} write=${WRITE}`);
