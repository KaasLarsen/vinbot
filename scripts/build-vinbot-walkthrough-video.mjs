#!/usr/bin/env node
/**
 * Bygger MP4 til sociale medier (Facebook m.m.) fra walkthrough-skærmbilleder.
 * Kør: node scripts/build-vinbot-walkthrough-video.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "marketing", "video-source");
const outFile = path.join(root, "marketing", "vinbot-saadan-bruger-du.mp4");

const SLIDES = [
  {
    file: "01-forside-desktop.png",
    step: "Trin 1",
    title: "Find vin på sekunder",
    body: "Søg på ret, drue, stemning eller budget hos danske forhandlere.",
  },
  {
    file: "02-sogeresultater-desktop.png",
    step: "Trin 2",
    title: "Filtrér resultaterne",
    body: "Vælg stil, forhandler og pris — klik videre til butikken.",
  },
  {
    file: "03-guide-grill.png",
    step: "Trin 3",
    title: "Læs vinguider",
    body: "Guides om madparring, druer og regioner — skrevet af Vinbot.",
  },
  {
    file: "05-opskrifter.png",
    step: "Trin 4",
    title: "Opskrifter med vin",
    body: "Klassiske retter hvor vinen er i gryden — med filtre og søgning.",
  },
  {
    file: "04-vinkoleskabe.png",
    step: "Trin 5",
    title: "Vinkøleskabe",
    body: "Søg modeller hos Vinkøleskabet.dk — integrerbar, fritstående og lagring.",
  },
  {
    file: "01-forside-desktop.png",
    step: "",
    title: "Prøv Vinbot i dag",
    body: "vinbot.dk — gratis inspiration og vinsøgning.",
  },
];

const SECONDS = 7;
const W = 1280;
const H = 720;

function buildSegment(slide, index, tmpDir) {
  const input = path.join(srcDir, slide.file);
  if (!fs.existsSync(input)) throw new Error(`Mangler billede: ${input}`);
  const out = path.join(tmpDir, `seg-${String(index).padStart(2, "0")}.mp4`);

  const filters = [
    `scale=${W}:${H}:force_original_aspect_ratio=decrease`,
    `pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=0x1c1917`,
  ].join(",");

  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-loop",
      "1",
      "-i",
      input,
      "-t",
      String(SECONDS),
      "-vf",
      filters,
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-r",
      "30",
      out,
    ],
    { stdio: "inherit" },
  );

  return out;
}

function concatSegments(segments, listFile, out) {
  fs.writeFileSync(listFile, segments.map((s) => `file '${s.replace(/'/g, "'\\''")}'`).join("\n"));
  execFileSync(
    ffmpegPath,
    ["-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", out],
    { stdio: "inherit" },
  );
}

if (!ffmpegPath) {
  console.error("ffmpeg-static ikke fundet.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vinbot-video-"));
const listFile = path.join(tmpDir, "concat.txt");

try {
  console.log("Bygger segmenter…");
  const segments = SLIDES.map((slide, i) => buildSegment(slide, i, tmpDir));
  console.log("Samler video…");
  concatSegments(segments, listFile, outFile);
  const mb = (fs.statSync(outFile).size / (1024 * 1024)).toFixed(1);
  console.log(`\nFærdig: ${outFile} (${mb} MB, ${SLIDES.length * SECONDS}s)`);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
