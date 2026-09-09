import { put, list } from "@vercel/blob";

import { copenhagenParts } from "@/lib/home-moment";
import type { WineCatalog } from "@/lib/vine/types";

const BLOB_PATH = "vinbot/price-history-v1.json";
const MAX_DAYS = 90;
const MAX_WINES = 4000;

export type PriceDayPoint = {
  s: string;
  p: number;
  m: number;
};

export type PriceHistoryBlob = {
  days: Record<string, PriceDayPoint[]>;
};

function copenhagenDay(now: Date): string {
  const p = copenhagenParts(now);
  const mm = String(p.month).padStart(2, "0");
  const dd = String(p.day).padStart(2, "0");
  return `${p.year}-${mm}-${dd}`;
}

function pruneDays(days: Record<string, PriceDayPoint[]>, keepDay: string): Record<string, PriceDayPoint[]> {
  const keys = Object.keys(days).sort();
  const next: Record<string, PriceDayPoint[]> = {};
  for (const k of keys) {
    if (k > keepDay) continue;
    next[k] = days[k]!;
  }
  const sorted = Object.keys(next).sort();
  while (sorted.length > MAX_DAYS) {
    const drop = sorted.shift();
    if (drop) delete next[drop];
  }
  return next;
}

function snapshotFromCatalog(catalog: WineCatalog): PriceDayPoint[] {
  const priced = catalog.wines
    .map((w) => {
      const prices = w.offers.map((o) => o.price).filter((n): n is number => typeof n === "number");
      if (prices.length === 0) return null;
      const min = Math.min(...prices);
      return { s: w.slug, p: min, m: w.offers.length, prefer: w.offers.length >= 2 };
    })
    .filter((x): x is { s: string; p: number; m: number; prefer: boolean } => Boolean(x))
    .sort((a, b) => Number(b.prefer) - Number(a.prefer) || a.s.localeCompare(b.s))
    .slice(0, MAX_WINES)
    .map(({ s, p, m }) => ({ s, p, m }));
  return priced;
}

async function readExisting(token: string): Promise<PriceHistoryBlob> {
  try {
    const listed = await list({ prefix: BLOB_PATH, token, limit: 10 });
    const hit = listed.blobs.find((b) => b.pathname === BLOB_PATH);
    if (!hit) return { days: {} };
    const res = await fetch(hit.url, { cache: "no-store" });
    if (!res.ok) return { days: {} };
    const json = (await res.json()) as PriceHistoryBlob;
    return json?.days ? json : { days: {} };
  } catch {
    return { days: {} };
  }
}

/** Gemmer ét kompakt dags-snapshot. No-op uden BLOB_READ_WRITE_TOKEN. */
export async function recordDailyPriceSnapshot(catalog: WineCatalog, now: Date = new Date()): Promise<{
  ok: boolean;
  skipped?: string;
  day?: string;
  wines?: number;
}> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return { ok: false, skipped: "missing-token" };

  const day = copenhagenDay(now);
  const existing = await readExisting(token);
  if (existing.days[day]?.length) {
    return { ok: true, skipped: "already-recorded", day, wines: existing.days[day]!.length };
  }

  const points = snapshotFromCatalog(catalog);
  const days = pruneDays({ ...existing.days, [day]: points }, day);

  await put(BLOB_PATH, JSON.stringify({ days }), {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });

  return { ok: true, day, wines: points.length };
}
