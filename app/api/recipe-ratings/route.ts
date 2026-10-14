import { NextRequest, NextResponse } from "next/server";

import { getDrinkBySlug } from "@/lib/content/drinks";
import { getRecipeBySlug } from "@/lib/content/recipes";
import { isRecipeRatingKind, type RecipeRatingKind } from "@/lib/recipe-ratings/format";
import {
  getCachedRecipeRatingSummary,
  readVoterRating,
  saveRecipeRating,
} from "@/lib/recipe-ratings/store";
import { hashVoterId, readOrCreateVoterId, VOTER_COOKIE, voterCookieOptions } from "@/lib/recipe-ratings/voter";
import { hasSupabaseServiceRole } from "@/lib/supabase/service";

export const dynamic = "force-dynamic";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 30;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const cur = rateBuckets.get(ip);
  if (!cur || now > cur.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (cur.count >= RATE_MAX) return false;
  cur.count += 1;
  return true;
}

function contentExists(kind: RecipeRatingKind, slug: string): boolean {
  if (kind === "drink") return getDrinkBySlug(slug) != null;
  return getRecipeBySlug(slug) != null;
}

function parseSlug(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const slug = value.trim();
  if (!slug || slug.length > 200) return null;
  return slug;
}

export async function GET(req: NextRequest) {
  const kindRaw = req.nextUrl.searchParams.get("kind");
  const slug = parseSlug(req.nextUrl.searchParams.get("slug"));
  if (!isRecipeRatingKind(kindRaw) || !slug || !contentExists(kindRaw, slug)) {
    return NextResponse.json({ error: "Ukendt opskrift." }, { status: 404 });
  }

  const summary = await getCachedRecipeRatingSummary(kindRaw, slug);
  let myRating: number | null = null;
  const voter = readOrCreateVoterId(req.cookies.get(VOTER_COOKIE)?.value);
  if (!voter.isNew && hasSupabaseServiceRole()) {
    myRating = await readVoterRating(kindRaw, slug, hashVoterId(voter.id));
  }

  return NextResponse.json({ average: summary.average, count: summary.count, myRating });
}

export async function POST(req: NextRequest) {
  if (!rateLimit(clientIp(req))) {
    return NextResponse.json({ error: "For mange stemmer lige nu. Prøv igen om et øjeblik." }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldigt JSON." }, { status: 400 });
  }

  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "Ugyldig stemme." }, { status: 400 });
  }

  const body = raw as { kind?: unknown; slug?: unknown; rating?: unknown };
  const slug = parseSlug(body.slug);
  const rating = typeof body.rating === "number" ? body.rating : Number(body.rating);
  if (!isRecipeRatingKind(body.kind) || !slug || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Ugyldig stemme." }, { status: 400 });
  }
  if (!contentExists(body.kind, slug)) {
    return NextResponse.json({ error: "Ukendt opskrift." }, { status: 404 });
  }
  if (!hasSupabaseServiceRole()) {
    return NextResponse.json({ error: "Stemmer er ikke tilgængelige lige nu." }, { status: 503 });
  }

  const voter = readOrCreateVoterId(req.cookies.get(VOTER_COOKIE)?.value);
  const result = await saveRecipeRating({
    kind: body.kind,
    slug,
    rating,
    voterHash: hashVoterId(voter.id),
    ip: clientIp(req),
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  const res = NextResponse.json({
    average: result.summary.average,
    count: result.summary.count,
    myRating: result.myRating,
  });
  if (voter.isNew) {
    res.cookies.set(VOTER_COOKIE, voter.id, voterCookieOptions());
  }
  return res;
}
