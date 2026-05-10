#!/usr/bin/env node
/**
 * Ordoptælling pr. MDX-guide (samme logik som getGuideWordCount i lib/content/guides.ts).
 * Bruges til at overvåge tynde sider ift. AdSense / indeksering.
 *
 *   node scripts/audit-guide-word-counts.mjs
 *   node scripts/audit-guide-word-counts.mjs --list-lt400
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import readingTime from "reading-time";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const guidesDir = path.join(root, "content/guides");

const MIN_INDEXABLE = 400;
const MID = 800;

const listLt400 = process.argv.includes("--list-lt400");

const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"));

let lt400 = 0;
let between = 0;
let gte800 = 0;
/** @type {{ slug: string; words: number }[]} */
const thinList = [];

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(guidesDir, file), "utf8");
  const words = readingTime(matter(raw).content).words;
  if (words < MIN_INDEXABLE) {
    lt400++;
    thinList.push({ slug, words });
  } else if (words < MID) between++;
  else gte800++;
}

thinList.sort((a, b) => a.words - b.words || a.slug.localeCompare(b.slug, "da"));

console.log("Vinbot guide word-count audit (body only, excl. frontmatter)");
console.log(`  < ${MIN_INDEXABLE} ord (noindex-tynde): ${lt400}`);
console.log(`  ${MIN_INDEXABLE}–${MID - 1} ord:              ${between}`);
console.log(`  ≥ ${MID} ord:                      ${gte800}`);
console.log(`  Total filer:                   ${files.length}`);

if (listLt400 && thinList.length) {
  console.log("\nTynde slugs (stigende ordantal):");
  for (const { slug, words } of thinList) {
    console.log(`  ${words}\t${slug}`);
  }
}
