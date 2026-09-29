#!/usr/bin/env node
/**
 * Removes content-tone waffle sections from recipes/drinks MDX:
 * ## Planlægning og råvarer, ## Smagsbalance og justering, ## Afsluttende bemærkninger
 *
 * Usage: node scripts/strip-recipe-waffle.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";

const dryRun = process.argv.includes("--dry-run");
const dirs = ["content/recipes", "content/drinks"];

const SECTION_RE =
  /^## (Planlægning og råvarer|Smagsbalance og justering|Afsluttende bemærkninger)\s*$/m;

function stripWaffle(body) {
  const lines = body.split("\n");
  const out = [];
  let skipping = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isH2 = /^## /.test(line);
    if (isH2) {
      if (
        /^## Planlægning og råvarer\s*$/.test(line) ||
        /^## Smagsbalance og justering\s*$/.test(line) ||
        /^## Afsluttende bemærkninger\s*$/.test(line)
      ) {
        skipping = true;
        continue;
      }
      skipping = false;
    }
    if (!skipping) out.push(line);
  }

  // Collapse excess blank lines at end / between sections
  return out.join("\n").replace(/\n{3,}/g, "\n\n").replace(/\n+$/, "\n");
}

let changed = 0;
let scanned = 0;

for (const dir of dirs) {
  const abs = path.resolve(dir);
  if (!fs.existsSync(abs)) continue;
  for (const name of fs.readdirSync(abs)) {
    if (!name.endsWith(".mdx")) continue;
    const file = path.join(abs, name);
    const raw = fs.readFileSync(file, "utf8");
    scanned++;
    if (!SECTION_RE.test(raw)) continue;

    const fmEnd = raw.indexOf("\n---\n", 3);
    if (fmEnd === -1) continue;
    const front = raw.slice(0, fmEnd + 5);
    const body = raw.slice(fmEnd + 5);
    const next = stripWaffle(body);
    if (next === body) continue;

    changed++;
    if (!dryRun) fs.writeFileSync(file, front + next);
  }
}

console.log(
  `${dryRun ? "[dry-run] " : ""}scanned ${scanned}, would change/changed ${changed}`
);
