#!/usr/bin/env node
/** Opret minimale JPEG-pladsholdere (1200×900) for opskrifter uden billede. */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");
const IMAGES_DIR = path.join(process.cwd(), "public", "images", "recipes");

// Minimal valid 1×1 grey JPEG (base64)
const MINI_JPEG_B64 =
  "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function createPlaceholderImage(outPath) {
  const tmpPath = outPath.replace(/\.jpg$/, ".tmp.jpg");
  fs.writeFileSync(tmpPath, Buffer.from(MINI_JPEG_B64, "base64"));
  try {
    execSync(`sips -z 900 1200 "${tmpPath}" --out "${outPath}"`, { stdio: "pipe" });
  } finally {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
}

ensureDir(IMAGES_DIR);

const slugs = fs
  .readdirSync(RECIPES_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""));

const created = [];
const skipped = [];

for (const slug of slugs) {
  const outPath = path.join(IMAGES_DIR, `${slug}.jpg`);
  if (fs.existsSync(outPath)) {
    skipped.push(slug);
    continue;
  }
  createPlaceholderImage(outPath);
  created.push(slug);
}

console.log(`Placeholder images: ${created.length} created, ${skipped.length} already existed.`);
if (created.length) {
  console.log("Created:");
  for (const slug of created.sort()) console.log(`  - ${slug}.jpg`);
}
