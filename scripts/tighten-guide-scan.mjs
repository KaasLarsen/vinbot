#!/usr/bin/env node
/**
 * Mechanical content-tone pass for guides that still look encyclopedic:
 * - Cap consecutive wine-style bullets at 3 per ## section
 * - Convert "## Læs mere" middot chains to bullet lists
 * - Ensure ## Læs mere i klyngen naming when section is Læs mere
 * - Lightly reduce **** spam (leave alone if already sparse)
 *
 * Does NOT invent new recommendations — only trims structure.
 * Usage: node scripts/tighten-guide-scan.mjs [--dry-run] [--glob 'vin-til-*.mdx']
 */
import fs from "node:fs";
import path from "node:path";

const dryRun = process.argv.includes("--dry-run");
const globArg = process.argv.find((a) => a.startsWith("--glob="))?.slice(7) ?? "vin-til-*.mdx";
const dir = path.join(process.cwd(), "content", "guides");

function matchGlob(name, pattern) {
  // very small glob: prefix*suffix
  const [pre, ...rest] = pattern.split("*");
  const suf = rest.join("*");
  return name.startsWith(pre) && name.endsWith(suf);
}

function tightenBody(body) {
  let lines = body.split("\n");
  const out = [];
  let bulletRun = 0;
  let inSection = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (/^## /.test(line)) {
      bulletRun = 0;
      inSection = true;
      // Normalize Læs mere heading
      if (/^## Læs mere\s*$/i.test(line) || /^## Videre\s*$/i.test(line)) {
        line = "## Læs mere i klyngen";
      }
    }

    // Convert middot-only "læs mere" paragraphs to bullets
    if (
      !line.startsWith("#") &&
      !line.startsWith("<") &&
      !line.startsWith("|") &&
      !line.startsWith("-") &&
      (line.match(/\]\(\/guides\//g) || []).length >= 3 &&
      line.includes(" · ")
    ) {
      const parts = line.split(/\s*·\s*/);
      for (const p of parts) {
        const t = p.trim().replace(/^\[/, "- [");
        if (t.includes("](/guides/")) out.push(t.startsWith("- ") ? t : `- ${t}`);
      }
      continue;
    }

    // Cap wine-ish bullets: lines starting with - **Something**
    if (/^\s*-\s+\*\*/.test(line)) {
      bulletRun++;
      if (bulletRun > 3) continue;
    } else if (line.trim() !== "") {
      bulletRun = 0;
    }

    out.push(line);
  }

  let text = out.join("\n").replace(/\n{3,}/g, "\n\n");

  // If Læs mere section exists but items are still middot on one line under the heading, split
  text = text.replace(
    /(## Læs mere i klyngen\n\n)([^\n#]+·[^\n]+)/,
    (_, h, row) => {
      const items = row
        .split(/\s*·\s*/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => (p.startsWith("- ") ? p : `- ${p}`));
      return h + items.join("\n");
    }
  );

  return text.replace(/\n+$/, "\n");
}

let changed = 0;
let scanned = 0;
for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith(".mdx")) continue;
  if (!matchGlob(name, globArg)) continue;
  const file = path.join(dir, name);
  const raw = fs.readFileSync(file, "utf8");
  scanned++;
  const fmEnd = raw.indexOf("\n---\n", 3);
  if (fmEnd === -1) continue;
  const front = raw.slice(0, fmEnd + 5);
  const body = raw.slice(fmEnd + 5);
  const next = tightenBody(body);
  if (next === body) continue;
  changed++;
  if (!dryRun) fs.writeFileSync(file, front + next);
}

console.log(`${dryRun ? "[dry-run] " : ""}scanned ${scanned}, changed ${changed}`);
