#!/usr/bin/env node
/**
 * Proxy for GSC gap-analyse når Performance-CSV ikke er tilgængelig:
 * sammenligner legacy vin-til HTML med nuværende vin-til-*.mdx guides.
 *
 * Kør: node scripts/legacy-vin-til-gap.mjs
 * Output: docs/gsc-vin-til-gap-backlog.md
 *
 * Med GSC-CSV: brug scripts/vin-til-gsc-gap.mjs i stedet.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const legacyDir = path.join(root, "legacy/pages/vin-til");
const guidesDir = path.join(root, "content/guides");
const outFile = path.join(root, "docs/gsc-vin-til-gap-backlog.md");

function asciiSlugPart(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function loadCurrentSlugs() {
  return new Set(
    fs
      .readdirSync(guidesDir)
      .filter((f) => f.startsWith("vin-til-") && f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, "")),
  );
}

function loadLegacyTopics() {
  if (!fs.existsSync(legacyDir)) return [];
  return fs
    .readdirSync(legacyDir)
    .filter((f) => f.endsWith(".html") && f !== "index.html")
    .map((f) => f.replace(/\.html$/, ""));
}

function findMatch(topic, slugs) {
  const direct = `vin-til-${topic}`;
  if (slugs.has(direct)) return { tier: "exact", slug: direct };

  for (const slug of slugs) {
    const suf = slug.slice("vin-til-".length);
    if (suf === topic || suf.startsWith(`${topic}-`) || topic.startsWith(`${suf}-`)) {
      return { tier: "exact", slug };
    }
  }

  const topicTok = topic.split("-").filter(Boolean);
  let best = null;
  let bestScore = 0;
  for (const slug of slugs) {
    const sufTok = slug.slice("vin-til-".length).split("-").filter(Boolean);
    let overlap = 0;
    for (const t of topicTok) {
      if (sufTok.some((s) => s === t || s.includes(t) || t.includes(s))) overlap++;
    }
    const score = overlap / Math.max(topicTok.length, sufTok.length, 1);
    if (score > bestScore) {
      bestScore = score;
      best = slug;
    }
  }
  if (bestScore >= 0.45 && best) return { tier: "weak", slug: best };
  return { tier: null };
}

const slugs = loadCurrentSlugs();
const legacy = loadLegacyTopics();
const rows = legacy.map((topic) => ({
  topic,
  suggested: `vin-til-${topic}`,
  ...findMatch(topic, slugs),
}));

const gaps = rows.filter((r) => r.tier === null);
const weak = rows.filter((r) => r.tier === "weak");
const covered = rows.filter((r) => r.tier === "exact");

const suggestedNew = gaps.map((g) => ({
  slug: g.suggested,
  legacy: g.topic,
  note: "Verificér med GSC før skrivning",
}));

const md = `# Vin-til gap-backlog (legacy + GSC workflow)

Genereret: ${new Date().toISOString().slice(0, 10)}

## Sådan bruger du denne liste

1. **Med GSC-data (prioritet):** Eksporter Performance → Queries fra Search Console og kør:
   \`\`\`bash
   node scripts/vin-til-gsc-gap.mjs ~/Downloads/Queries.csv --min-impressions=10
   \`\`\`
2. **Uden GSC:** Brug «Legacy huller» nedenfor som kandidater — skriv kun guide hvis søgeintent ikke dækkes af svag match.
3. **Regel:** Ny \`vin-til-*\` guide kun ved ≥10–20 GSC-visninger/måned OG ingen stærk eksisterende slug.

## Status

| Metric | Antal |
|--------|-------|
| Nuværende \`vin-til-*\` guides | ${slugs.size} |
| Legacy \`vin-til/\` emner | ${legacy.length} |
| Dækket (exact/strong) | ${covered.length} |
| Svag match (tjek manuelt) | ${weak.length} |
| Mulige huller fra legacy | ${gaps.length} |

## Legacy huller (prioriter efter GSC)

| Foreslået slug | Legacy emne | Note |
|----------------|-------------|------|
${gaps.map((g) => `| \`${g.suggested}\` | ${g.topic} | Verificér impressions i GSC |`).join("\n")}

## Svage match (ofte dækket — undgå duplikat)

| Legacy emne | Eksisterende slug |
|-------------|-------------------|
${weak.map((g) => `| ${g.topic} | \`${g.slug}\` |`).join("\n")}

## Anbefalede næste emner (SEO-sprint)

Baseret på legacy-huller og [seo-keyword-gap-matrix.md](./seo-keyword-gap-matrix.md):

1. \`vin-til-bolognese\` — tjek om [vin-til-lasagne](/guides/vin-til-lasagne) + [vin-til-pizza-og-pasta](/guides/vin-til-pizza-og-pasta) dækker intent; opret kun ved GSC-hul.
2. \`vin-til-pasta-tomat\` — overlap med pizza/pasta-hub; udvid eksisterende guide frem for ny URL.
3. \`vin-til-vegetarretter\` — [vin-til-vegetar-og-gront](/guides/vin-til-vegetar-og-gront) dækker sandsynligvis; redirect-intent internt.
4. \`vin-til-picnic\` — dækket af [vin-til-piknik](/guides/vin-til-piknik).
5. \`vin-til-romantisk-middag\` — overvej under [humoer-og-vin](/humoer-og-vin) hvis GSC viser volumen.

## Efter deploy

- Genindsend \`sitemap-mad-og-vin.xml\` (eller relevant guide-sitemap) i GSC
- URL-inspektion på nye/udvidede guides (se [gsc-index-priority.md](./gsc-index-priority.md))
`;

fs.writeFileSync(outFile, md);
console.log(`Skrev ${outFile}`);
console.log(`  Huller: ${gaps.length}, svage: ${weak.length}, dækket: ${covered.length}`);
