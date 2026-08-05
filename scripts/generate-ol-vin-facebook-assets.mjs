#!/usr/bin/env node
/**
 * Genererer Facebook-profil- og cover-billeder til Øl & Vin × Vinbot.dk.
 * Kør: node scripts/generate-ol-vin-facebook-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.join(process.cwd(), "public", "images", "ol-vin");
const HERO_SRC = path.join(process.cwd(), "public", "images", "hero", "hero-vin-atmosphere.jpg");

const COLORS = {
  stone900: "#1c1917",
  stone700: "#44403c",
  burgundy: "#78350f",
  cream: "#fafaf9",
  creamMuted: "#e7e5e4",
  rose: "#9f1239",
};

/** Vinbot robot + vinglas (fra components/vinbot-logo.tsx), skaleret. */
function vinbotLogoSvg(size, color = COLORS.cream) {
  const s = size / 32;
  return `
    <g transform="scale(${s})" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <rect x="5" y="10.5" width="12" height="13.5" rx="2.75" ry="2.75" />
      <path d="M11 10.5V7" />
      <circle cx="11" cy="5.35" r="1.15" />
      <circle cx="9.35" cy="15.25" r="1.15" fill="${color}" stroke="none" />
      <circle cx="12.65" cy="15.25" r="1.15" fill="${color}" stroke="none" />
      <path d="M8.85 17.5q2.15-1.05 4.3 0" />
      <path d="M17 15.85 Q19 14.75 21.4 14.6" />
      <path d="M21.5 11.5L21.5 14Q24.5 16.5 27.5 14L27.5 11.5" />
      <path d="M24.5 16.5v6" />
      <path d="M22.25 23h4.5" />
    </g>`;
}

async function generateAvatar() {
  const size = 400;
  const logoSize = 72;
  const logoX = (size - logoSize) / 2;
  const logoY = 72;

  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.stone900}"/>
      <stop offset="55%" stop-color="${COLORS.stone700}"/>
      <stop offset="100%" stop-color="${COLORS.burgundy}"/>
    </linearGradient>
    <linearGradient id="badge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${COLORS.rose}"/>
      <stop offset="100%" stop-color="${COLORS.burgundy}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  <!-- subtil vin-ring -->
  <circle cx="${size / 2}" cy="${size / 2}" r="168" fill="none" stroke="${COLORS.cream}" stroke-opacity="0.06" stroke-width="1"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="140" fill="none" stroke="${COLORS.cream}" stroke-opacity="0.04" stroke-width="1"/>
  <!-- logo -->
  <g transform="translate(${logoX}, ${logoY})">
    ${vinbotLogoSvg(logoSize)}
  </g>
  <!-- Øl & Vin -->
  <text x="${size / 2}" y="210" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="600"
    fill="${COLORS.cream}" letter-spacing="1">${escapeXml("Øl & Vin")}</text>
  <!-- divider -->
  <line x1="${size / 2 - 48}" y1="228" x2="${size / 2 + 48}" y2="228"
    stroke="${COLORS.cream}" stroke-opacity="0.35" stroke-width="1"/>
  <!-- Vinbot.dk badge -->
  <rect x="${size / 2 - 72}" y="248" width="144" height="28" rx="14" fill="url(#badge)"/>
  <text x="${size / 2}" y="267" text-anchor="middle"
    font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="11"
    font-weight="700" fill="${COLORS.cream}" letter-spacing="2.5">VINBOT.DK</text>
</svg>`;

  const outPath = path.join(OUT_DIR, "ol-vin-avatar.png");
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log("Avatar:", outPath);
  return outPath;
}

async function generateCover() {
  const width = 1640;
  const height = 624;
  const leftWidth = Math.round(width * 0.42);

  // Venstre panel: gradient + typografi
  const leftSvg = `
<svg width="${leftWidth}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.stone900}"/>
      <stop offset="60%" stop-color="${COLORS.stone700}"/>
      <stop offset="100%" stop-color="${COLORS.burgundy}" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect width="${leftWidth}" height="${height}" fill="url(#panel)"/>
  <!-- dekorativ linje -->
  <line x1="72" y1="200" x2="72" y2="420" stroke="${COLORS.rose}" stroke-width="3" stroke-opacity="0.7"/>
  <!-- V-mark -->
  <rect x="72" y="88" width="52" height="52" rx="12" fill="${COLORS.cream}"/>
  <text x="98" y="124" text-anchor="middle"
    font-family="ui-sans-serif, system-ui, sans-serif" font-size="32" font-weight="700"
    fill="${COLORS.burgundy}">V</text>
  <!-- headline -->
  <text x="140" y="118"
    font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700"
    fill="${COLORS.cream}" letter-spacing="-0.5">${escapeXml("Øl & Vin")}</text>
  <text x="72" y="178"
    font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="28"
    font-weight="500" fill="${COLORS.creamMuted}">Tilbud, tips &amp; gode fund</text>
  <text x="72" y="228"
    font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="22"
    font-weight="400" fill="${COLORS.cream}" fill-opacity="0.75">en del af Vinbot.dk</text>
  <!-- subtil tagline -->
  <text x="72" y="290"
    font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="17"
    fill="${COLORS.creamMuted}" fill-opacity="0.65">Vin til mad, humør og stemning</text>
</svg>`;

  const leftPanel = await sharp(Buffer.from(leftSvg)).png().toBuffer();

  // Højre side: hero-foto beskåret + varm overlay
  const rightWidth = width - leftWidth;
  const photo = await sharp(HERO_SRC)
    .resize(rightWidth + 120, height, { fit: "cover", position: "right" })
    .extract({ left: 60, top: 0, width: rightWidth, height })
    .modulate({ brightness: 0.92, saturation: 1.08 })
    .toBuffer();

  // Gradient-blend mellem panel og foto
  const blendSvg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${COLORS.stone900}" stop-opacity="0.85"/>
      <stop offset="8%" stop-color="${COLORS.stone900}" stop-opacity="0.4"/>
      <stop offset="18%" stop-color="${COLORS.stone900}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="70%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect x="${leftWidth - 80}" y="0" width="200" height="${height}" fill="url(#fade)"/>
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#bottom)"/>
</svg>`;
  const blendLayer = await sharp(Buffer.from(blendSvg)).png().toBuffer();

  // Subtil robot-refleksion i vinglas-området (easter egg)
  const reflectionSize = 90;
  const reflectionX = leftWidth + Math.round(rightWidth * 0.55);
  const reflectionY = Math.round(height * 0.38);
  const reflectionSvg = `
<svg width="${reflectionSize}" height="${reflectionSize}" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(9, 9)" opacity="0.22">
    ${vinbotLogoSvg(reflectionSize - 18, "#fffbeb")}
  </g>
</svg>`;
  const reflection = await sharp(Buffer.from(reflectionSvg)).png().toBuffer();

  const outPath = path.join(OUT_DIR, "ol-vin-cover.png");
  await sharp({
    create: { width, height, channels: 4, background: COLORS.stone900 },
  })
    .composite([
      { input: leftPanel, left: 0, top: 0 },
      { input: photo, left: leftWidth, top: 0 },
      { input: blendLayer, left: 0, top: 0 },
      { input: reflection, left: reflectionX, top: reflectionY, blend: "over" },
    ])
    .png()
    .toFile(outPath);

  console.log("Cover:", outPath);
  return outPath;
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function generatePreviews() {
  const avatarSrc = path.join(OUT_DIR, "ol-vin-avatar.png");
  const coverSrc = path.join(OUT_DIR, "ol-vin-cover.png");

  // Profil: cirkulær crop 170×170 (Facebook desktop)
  await sharp(avatarSrc)
    .resize(170, 170, { fit: "cover" })
    .composite([
      {
        input: Buffer.from(`
<svg width="170" height="170"><circle cx="85" cy="85" r="85" fill="white"/></svg>`),
        blend: "dest-in",
      },
    ])
    .png()
    .toFile(path.join(OUT_DIR, "_preview-avatar-circle.png"));

  // Cover: desktop 820×312
  await sharp(coverSrc)
    .resize(820, 312, { fit: "cover", position: "left" })
    .png()
    .toFile(path.join(OUT_DIR, "_preview-cover-desktop.png"));

  // Cover: mobil 640×360 (center crop)
  await sharp(coverSrc)
    .resize(640, 360, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(OUT_DIR, "_preview-cover-mobile.png"));

  console.log("Previews saved in", OUT_DIR);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await generateAvatar();
  await generateCover();
  await generatePreviews();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
