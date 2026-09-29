#!/usr/bin/env node
/** Cleanup pass after structural rewrite: dedupe bullets, fix mashed inline lists. */
import fs from "node:fs";
import path from "node:path";

const dryRun = process.argv.includes("--dry-run");
const dir = path.join(process.cwd(), "content", "guides");
const glob = process.argv.find((a) => a.startsWith("--glob="))?.slice(7) ?? "*.mdx";

function matchGlob(name, pattern) {
  const [pre, ...rest] = pattern.split("*");
  const suf = rest.join("*");
  return name.startsWith(pre) && name.endsWith(suf);
}

function clean(body) {
  let lines = body.split("\n");
  const out = [];
  let prevBullet = null;

  for (let line of lines) {
    // Expand mashed "text. - **A**: … - **B**:" paragraphs into bullets
    if (
      !line.startsWith("#") &&
      !line.startsWith("|") &&
      !line.startsWith("<") &&
      !line.startsWith("-") &&
      (line.match(/ - \*\*/g) || []).length >= 2
    ) {
      const bits = line.split(/\s+-\s+(?=\*\*)/);
      const lead = bits[0].trim();
      if (lead && !lead.startsWith("-")) out.push(lead);
      for (let i = 1; i < bits.length && i <= 3; i++) {
        out.push(`- ${bits[i].trim()}`);
      }
      prevBullet = null;
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      const norm = line.replace(/\s+/g, " ").trim();
      if (norm === prevBullet) continue;
      // Drop empty label-only bullets
      if (/^-\s+\*\*[^*]+\*\*\s*:?\s*$/.test(norm)) continue;
      prevBullet = norm;
      out.push(line);
      continue;
    }
    prevBullet = null;
    out.push(line);
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").replace(/\n+$/, "\n");
}

let changed = 0;
for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith(".mdx") || !matchGlob(name, glob)) continue;
  const file = path.join(dir, name);
  const raw = fs.readFileSync(file, "utf8");
  const fmEnd = raw.indexOf("\n---\n", 3);
  if (fmEnd === -1) continue;
  const front = raw.slice(0, fmEnd + 5);
  const body = raw.slice(fmEnd + 5);
  const next = clean(body);
  if (next === body) continue;
  changed++;
  if (!dryRun) fs.writeFileSync(file, front + next);
}
console.log(`${dryRun ? "[dry-run] " : ""}changed ${changed}`);
