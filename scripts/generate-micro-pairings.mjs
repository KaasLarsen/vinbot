/**
 * Generér mikro-parringsguides fra scripts/micro-pairings-catalog.mjs.
 *
 *   node scripts/generate-micro-pairings.mjs --check
 *   node scripts/generate-micro-pairings.mjs --self-test
 *   node scripts/generate-micro-pairings.mjs --registry-only
 *   node scripts/generate-micro-pairings.mjs
 *   node scripts/generate-micro-pairings.mjs --only vin-til-lasagne-med-kylling
 *   node scripts/generate-micro-pairings.mjs --force
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import readingTime from "reading-time";
import { MICRO_DISHES as MICRO_DISHES_BASE } from "./micro-pairings-catalog.mjs";
import { MICRO_DISHES_EXTRA } from "./micro-pairings-catalog-extra.mjs";

const MICRO_DISHES = [...MICRO_DISHES_BASE, ...MICRO_DISHES_EXTRA];

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const guidesDir = path.join(root, "content/guides");
const registryPath = path.join(root, "lib/growth/micro-pairings.ts");

const MIN_WORDS = 120;
const MAX_WORDS = 280;
const MAX_JACCARD = 0.55;
const SECTION_MIN = { why: 70, pitfalls: 28 };

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!/^[A-Z0-9_]+$/.test(key)) continue;
    if (process.env[key]) continue;
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env"));

function parseArgs(argv) {
  const only = [];
  let check = false;
  let selfTest = false;
  let force = false;
  let registryOnly = false;
  let limit = Infinity;
  let concurrency = 3;
  let offset = 0;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--check") check = true;
    else if (arg === "--self-test") selfTest = true;
    else if (arg === "--force") force = true;
    else if (arg === "--registry-only") registryOnly = true;
    else if (arg === "--only") only.push(...(argv[++i] || "").split(",").filter(Boolean));
    else if (arg === "--limit") limit = Number(argv[++i] || "0");
    else if (arg === "--offset") offset = Number(argv[++i] || "0");
    else if (arg === "--concurrency") concurrency = Math.max(1, Number(argv[++i] || "1"));
    else if (arg.startsWith("--only=")) only.push(...arg.slice(7).split(",").filter(Boolean));
  }
  return { check, selfTest, force, registryOnly, only: new Set(only), limit, offset, concurrency };
}

export function fitDescription(raw, dish, defaultWine, altWine, avoidWine) {
  const clean = (value) =>
    String(value || "")
      .replace(/\s+/g, " ")
      .replace(/[«»]/g, '"')
      .trim();
  let d = clean(raw);
  const mentionsWine = fold(d).includes(fold(defaultWine));
  const usable = d.length >= 140 && d.length <= 180 && mentionsWine && !/søg flasken|brede guide/i.test(d);
  if (!usable) {
    d = `Vin til ${dish}: ${defaultWine} som default og ${altWine} som alternativ. Undgå ${avoidWine}, når sovs og tilbehør flytter glasset.`;
  }
  if (d.length > 165) {
    let cut = d.slice(0, 165);
    const sp = cut.lastIndexOf(" ");
    if (sp >= 150) cut = cut.slice(0, sp);
    d = cut.replace(/[,:;–—-]\s*$/u, "").trim();
  }
  const pads = [
    " Syre og frugt før tung tannin.",
    " Vælg efter sovsen.",
    " Hold glasset køligt.",
    " Match fedmen i sovsen.",
    " Mindre tannin i glasset.",
  ];
  for (const pad of pads) {
    if (d.length >= 150) break;
    const room = 165 - d.length;
    if (pad.length <= room) d = `${d}${pad}`.trim();
  }
  if (d.length > 165) d = d.slice(0, 165).replace(/\s+\S*$/, "").trim();
  if (d.length < 150 || /(?:Ok|Ja|Nu)\.\s*$/.test(d) || /!\s*$/.test(d)) {
    d = `Vin til ${dish}: ${defaultWine} som default og ${altWine} som alternativ. Undgå ${avoidWine}. Sovs og tilbehør styrer glasset.`;
    for (const pad of pads) {
      if (d.length >= 150) break;
      const room = 165 - d.length;
      if (pad.length <= room) d = `${d}${pad}`.trim();
    }
    if (d.length > 165) d = d.slice(0, 165).replace(/\s+\S*$/, "").trim();
  }
  return d;
}

export function fitAngle(angle, dish, delta) {
  let a = String(angle || "")
    .replace(/[:.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const weak = !a || a.length > 58 || fold(a).includes(fold(dish)) || /vinvalg/i.test(a);
  if (weak) a = String(delta || "").split(/[.!]/)[0].trim();
  if (a.length > 58) {
    const cut = a.slice(0, 58);
    const sp = cut.lastIndexOf(" ");
    a = (sp > 30 ? cut.slice(0, sp) : cut).trim();
  }
  if (!a) return "lettere valg end den brede guide";
  return a.charAt(0).toLowerCase() + a.slice(1);
}

function tokens(text) {
  return new Set(
    String(text)
      .toLowerCase()
      .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/[^a-zæøå0-9\s-]/gi, " ")
      .split(/\s+/)
      .filter((word) => word.length >= 5),
  );
}

function jaccard(a, b) {
  let inter = 0;
  for (const token of a) if (b.has(token)) inter += 1;
  const union = a.size + b.size - inter;
  return union ? inter / union : 0;
}

function sanitizeMarkdown(md) {
  return String(md || "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/<\/?[A-Za-z][^>]*>/g, "")
    .replace(/[{}]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function yamlQuote(value) {
  return JSON.stringify(String(value));
}

function readGuide(slug) {
  const full = path.join(guidesDir, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const parsed = matter(raw);
  return { raw, body: parsed.content, data: parsed.data };
}

function assertCatalog() {
  const errors = [];
  const seen = new Set();
  for (const dish of MICRO_DISHES) {
    if (seen.has(dish.slug)) errors.push(`dublet-slug ${dish.slug}`);
    seen.add(dish.slug);
    if (!dish.slug.startsWith("vin-til-")) errors.push(`${dish.slug} mangler vin-til-`);
    if (!readGuide(dish.parentSlug)) errors.push(`${dish.slug}: forælder mangler ${dish.parentSlug}`);
    for (const related of dish.related) {
      if (!readGuide(related.slug)) errors.push(`${dish.slug}: related mangler ${related.slug}`);
    }
    const wines = [dish.defaultWine, dish.altWine, dish.avoidWine].map((w) => w.toLowerCase());
    if (new Set(wines).size !== 3) errors.push(`${dish.slug}: default/alternativ/undgå skal være tre forskellige`);
    if (dish.searchQuery.trim().split(/\s+/).length < 2) errors.push(`${dish.slug}: searchQuery for kort`);
  }
  return errors;
}

function fold(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/['’]/g, "");
}

function includesWine(text, wine) {
  return fold(text).includes(fold(wine));
}

function normalizePitfalls(md) {
  const text = sanitizeMarkdown(md);
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const bullets = lines
    .map((line) => line.replace(/^[-*•]\s*/, "").replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 5);
  if (bullets.length >= 3) {
    return bullets.map((item) => `- ${item}`).join("\n");
  }
  // Split prose into short bullets if the model forgot list format.
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12)
    .slice(0, 5);
  if (sentences.length >= 3) {
    return sentences.map((item) => `- ${item.replace(/\.$/, "")}.`).join("\n");
  }
  return text;
}

function buildBody(sections) {
  return `## Hvorfor

${sections.why}

## Pas på

${sections.pitfalls}
`;
}

function buildMdx(dish, title, description, body) {
  const tags = dish.tags.map((tag) => `  - ${yamlQuote(tag)}`).join("\n");
  return `---
title: ${yamlQuote(title)}
description: ${yamlQuote(description)}
slug: ${dish.slug}
tags:
${tags}
updated: "2026-10-03"
published: "2026-10-02"
hub: mad-og-vin
searchQuery: ${yamlQuote(dish.searchQuery)}
---

${body.trim()}
`;
}

function writeRegistry() {
  const items = MICRO_DISHES.filter((dish) => fs.existsSync(path.join(guidesDir, `${dish.slug}.mdx`))).map(
    (dish) => ({
      slug: dish.slug,
      label: dish.label,
      parentSlug: dish.parentSlug,
      parentLabel: dish.parentLabel,
      dish: dish.dish,
      delta: dish.delta,
      defaultWine: dish.defaultWine,
      altWine: dish.altWine,
      avoidWine: dish.avoidWine,
      searchQuery: dish.searchQuery,
    }),
  );
  const file = `/** Auto-genereret af scripts/generate-micro-pairings.mjs. Ret kataloget og kør scriptet igen. */

export type MicroPairing = {
  slug: string;
  label: string;
  parentSlug: string;
  parentLabel: string;
  dish: string;
  delta: string;
  defaultWine: string;
  altWine: string;
  avoidWine: string;
  searchQuery: string;
};

export const MICRO_PAIRINGS: MicroPairing[] = ${JSON.stringify(items, null, 2)};

export function microPairingBySlug(slug: string): MicroPairing | undefined {
  return MICRO_PAIRINGS.find((item) => item.slug === slug);
}

export function microPairingsForParent(parentSlug: string): MicroPairing[] {
  return MICRO_PAIRINGS.filter((item) => item.parentSlug === parentSlug);
}
`;
  fs.writeFileSync(registryPath, file);
  return items.length;
}

function systemPrompt() {
  return `Du skriver korte danske mad-og-vin-mikroguides til Vinbot.
Tone: jordnær, scannbar, handlingsorienteret. Som en venlig rådgiver — ikke et leksikon.
Vinvalget (default, alternativ, undgå) vises allerede i UI. Gentag ikke alle tre i hvert afsnit.
Max 1-2 fede fraser pr. afsnit. Brug ** sparsomt.
Ingen producentnavne, ingen anmeldelser, ingen præcise flaskepriser. Grove bånd som «omkring 80-150 kr.» er ok.
Skriv ikke overskrifter, ikke «Læs mere», ikke søgelinks, ikke tabeller.
Skriv korrekt dansk. Brug «komplementere», ikke «komplimentere».
Svar kun med JSON:
{
  "angle": "kort vinkel efter kolon, max 55 tegn, uden kolon",
  "description": "150-165 tegn, med rettens navn og én ekstra vinkel",
  "why": "markdown, 2-3 korte afsnit om hvad der flytter vinen ift. forældre-guiden",
  "pitfalls": "markdown med 3-5 bullets om faldgruber"
}
why skal være ca. 80-140 ord. pitfalls 30-70 ord som bullets.
Samlet why + pitfalls: 120-240 ord.
angle må ikke gentage rettens navn. Skriv en vinkel om vinen, fx «lettere rød end til oksekød».
Nævn default-vinen kort i why — ikke alle tre vine i hvert afsnit.`;
}

function userPrompt(dish, parentTitle, parentExcerpt, previousIssue) {
  return `Ret: ${dish.dish}
Sidens label: ${dish.label}
Forældre-guide: ${parentTitle} (${dish.parentSlug})
Parrings-delta: ${dish.delta}
Default-vin: ${dish.defaultWine}
Alternativ: ${dish.altWine}
Undgå: ${dish.avoidWine}
Uddrag af forældre-teksten, som du ikke må kopiere:
${parentExcerpt}
${previousIssue ? `Forrige forsøg blev afvist: ${previousIssue}. Hold dig kort og scannbar.` : ""}`;
}

async function callOpenAi(dish, parentTitle, parentExcerpt, previousIssue) {
  const key = (process.env.OPENAI_API_KEY || "").trim().replace(/^["']|["']$/g, "").replace(/\s+/g, "");
  if (!key.startsWith("sk-")) {
    throw new Error("OPENAI_API_KEY mangler eller ligner ikke en nøgle.");
  }
  const model = (process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini").trim().replace(/^["']|["']$/g, "");
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      max_tokens: 1800,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt() },
        { role: "user", content: userPrompt(dish, parentTitle, parentExcerpt, previousIssue) },
      ],
    }),
  });
  const bodyText = await res.text();
  if (!res.ok) {
    throw new Error(`OpenAI HTTP ${res.status}: ${bodyText.slice(0, 300)}`);
  }
  const data = JSON.parse(bodyText);
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Tomt OpenAI-svar");
  return JSON.parse(content);
}

function validateDraft(dish, draft, parentBody) {
  const issues = [];
  const sections = {
    why: sanitizeMarkdown(draft.why),
    pitfalls: normalizePitfalls(draft.pitfalls),
  };
  for (const [key, min] of Object.entries(SECTION_MIN)) {
    const count = readingTime(sections[key] || "").words;
    if (count < min) issues.push(`${key} er ${count} ord, skal være mindst ${min}`);
  }
  const bulletCount = (sections.pitfalls.match(/^- /gm) || []).length;
  if (bulletCount < 3) issues.push(`pitfalls har ${bulletCount} bullets, skal være mindst 3`);
  const body = buildBody(sections);
  if (!includesWine(sections.why, dish.defaultWine)) {
    issues.push(`why mangler default ${dish.defaultWine}`);
  }
  const words = readingTime(body).words;
  if (words < MIN_WORDS || words > MAX_WORDS) issues.push(`ordtal ${words} uden for ${MIN_WORDS}-${MAX_WORDS}`);
  const overlap = jaccard(tokens(body), tokens(parentBody));
  if (overlap > MAX_JACCARD) issues.push(`for tæt på forældren (jaccard ${overlap.toFixed(2)})`);
  const title = `${dish.label}: ${fitAngle(draft.angle, dish.dish, dish.delta)}`;
  const description = fitDescription(draft.description, dish.dish, dish.defaultWine, dish.altWine, dish.avoidWine);
  if (description.length < 150 || description.length > 165) {
    issues.push(`description ${description.length} tegn`);
  }
  return { issues, title, description, body, words, overlap };
}

async function generateOne(dish) {
  const parent = readGuide(dish.parentSlug);
  const parentTitle = String(parent?.data?.title || dish.parentLabel);
  const parentExcerpt = String(parent?.body || "").replace(/\s+/g, " ").slice(0, 700);
  let previousIssue = "";
  let last = null;
  for (let attempt = 1; attempt <= 5; attempt++) {
    const draft = await callOpenAi(dish, parentTitle, parentExcerpt, previousIssue);
    last = validateDraft(dish, draft, parent?.body || "");
    if (last.issues.length === 0) return last;
    previousIssue = last.issues.join("; ");
    console.warn(`  forsøg ${attempt} afvist: ${previousIssue}`);
  }
  if (last && last.body.includes("## Hvorfor") && last.body.includes("## Pas på")) {
    const padded = padDraftBody(dish, last);
    const words = readingTime(padded.body).words;
    const bullets = (padded.body.match(/^- /gm) || []).length;
    if (
      words >= MIN_WORDS &&
      words <= MAX_WORDS &&
      bullets >= 3 &&
      padded.description.length >= 150 &&
      padded.description.length <= 165
    ) {
      return { ...padded, issues: [], words, overlap: last.overlap };
    }
  }
  return last;
}

function padDraftBody(dish, draft) {
  let body = draft.body;
  let words = readingTime(body).words;
  const wineLabel = dish.defaultWine.charAt(0).toUpperCase() + dish.defaultWine.slice(1);
  const deltaClause = dish.delta.charAt(0).toLowerCase() + dish.delta.slice(1).replace(/\.$/, "");
  if (words < MIN_WORDS && body.includes("## Pas på")) {
    const pad =
      `${wineLabel} er det sikre valg her, fordi ${deltaClause}. ` +
      `Hold dig til det prisbånd, du normalt køber i, og lad sovsen styre stilvalget.`;
    body = body.replace("## Pas på", `${pad}\n\n## Pas på`);
    words = readingTime(body).words;
  }
  if (words < MIN_WORDS) {
    body += `\n\n${wineLabel} er default, fordi ${deltaClause}.`;
    words = readingTime(body).words;
  }
  while (words > MAX_WORDS) {
    const next = body.replace(/(\n\n[^\n]+)(\n\n## Pas på)/, "$2");
    if (next === body) break;
    body = next;
    words = readingTime(body).words;
  }
  // Ensure pitfalls has at least 3 bullets.
  if ((body.match(/^- /gm) || []).length < 3) {
    const extras = [
      `- Undgå ${dish.avoidWine} til denne variant.`,
      `- Vælg efter sovsen, ikke kun proteinen.`,
      `- Hold dig til lettere stil end den brede guide, hvis retten er mild.`,
    ];
    body = body.replace(/## Pas på\n\n/, `## Pas på\n\n${extras.join("\n")}\n`);
  }
  const description = fitDescription(draft.description, dish.dish, dish.defaultWine, dish.altWine, dish.avoidWine);
  return { ...draft, body, description };
}

function selfTest() {
  const samples = [
    fitDescription("For kort", "lasagne med kylling", "pinot noir", "gamay", "primitivo"),
    fitDescription(
      "Vin til lasagne med kylling: pinot noir frem for primitivo, fordi kyllingen er magrere end oksekødet og tanninen derfor skal ned i glasset ved bordet.",
      "lasagne med kylling",
      "pinot noir",
      "gamay",
      "primitivo",
    ),
    fitDescription("x".repeat(400), "chili", "garnacha", "barbera", "malbec"),
    fitAngle("vinvalg til lasagne med kylling", "lasagne med kylling", "Kylling er magrere end oksekød, så tanninen skal ned."),
  ];
  let failed = 0;
  for (const sample of samples.slice(0, 3)) {
    const ok = sample.length >= 150 && sample.length <= 165;
    console.log(`${ok ? "ok" : "fejl"} ${sample.length}: ${sample}`);
    if (!ok) failed += 1;
  }
  const angle = samples[3];
  const angleOk = angle.length <= 58 && !/vinvalg/i.test(angle);
  console.log(`${angleOk ? "ok" : "fejl"} angle: ${angle}`);
  if (!angleOk) failed += 1;
  if (failed) process.exit(1);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.selfTest) {
    selfTest();
    return;
  }
  const errors = assertCatalog();
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }
  console.log(`katalog ok: ${MICRO_DISHES.length} retter`);
  if (args.check) return;
  if (args.registryOnly) {
    const registered = writeRegistry();
    console.log(`register ${registered}`);
    return;
  }

  const selected = MICRO_DISHES.filter((dish) => args.only.size === 0 || args.only.has(dish.slug)).slice(
    args.offset,
    args.offset + args.limit,
  );
  let written = 0;
  let failed = 0;
  let skipped = 0;

  async function processDish(dish) {
    const target = path.join(guidesDir, `${dish.slug}.mdx`);
    if (fs.existsSync(target) && !args.force) {
      skipped += 1;
      return;
    }
    console.log(`skriver ${dish.slug}`);
    try {
      const draft = await generateOne(dish);
      if (!draft || draft.issues.length) {
        failed += 1;
        console.error(`fejlede ${dish.slug}: ${(draft?.issues || ["ukendt"]).join("; ")}`);
        return;
      }
      fs.writeFileSync(target, buildMdx(dish, draft.title, draft.description, draft.body));
      written += 1;
      console.log(`  ok ${draft.words} ord, jaccard ${draft.overlap.toFixed(2)}, desc ${draft.description.length}`);
    } catch (error) {
      failed += 1;
      console.error(`fejlede ${dish.slug}: ${error instanceof Error ? error.message : error}`);
    }
  }

  const queue = [...selected];
  const workers = Array.from({ length: Math.min(args.concurrency, queue.length || 1) }, async () => {
    while (queue.length) {
      const dish = queue.shift();
      if (!dish) break;
      await processDish(dish);
    }
  });
  await Promise.all(workers);

  const registered = writeRegistry();
  console.log(`skrev ${written}, sprang over ${skipped}, fejlede ${failed}, register ${registered}`);
  if (failed) process.exit(1);
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
