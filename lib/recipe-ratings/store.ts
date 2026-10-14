import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

import {
  EMPTY_RECIPE_RATING,
  recipeRatingCacheTag,
  recipeRatingPath,
  roundRating,
  type RecipeRatingKind,
  type RecipeRatingSummary,
} from "@/lib/recipe-ratings/format";
import { hashIp } from "@/lib/recipe-ratings/voter";
import { createSupabaseAnonClient } from "@/lib/supabase/anon";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function getCachedRecipeRatingSummary(
  kind: RecipeRatingKind,
  slug: string,
): Promise<RecipeRatingSummary> {
  return unstable_cache(
    () => readRecipeRatingSummary(kind, slug),
    ["recipe-rating-summary", kind, slug],
    { tags: [recipeRatingCacheTag(kind, slug)], revalidate: false },
  )();
}

function parseSummary(data: unknown): RecipeRatingSummary {
  if (!data || typeof data !== "object") return EMPTY_RECIPE_RATING;
  const row = data as { count?: unknown; average?: unknown };
  const count = Number(row.count);
  if (!Number.isFinite(count) || count <= 0) return EMPTY_RECIPE_RATING;
  const average = row.average == null ? null : Number(row.average);
  if (average == null || !Number.isFinite(average)) return EMPTY_RECIPE_RATING;
  return { average: roundRating(average), count };
}

export async function readRecipeRatingSummary(
  kind: RecipeRatingKind,
  slug: string,
): Promise<RecipeRatingSummary> {
  if (!isSupabaseConfigured()) return EMPTY_RECIPE_RATING;
  try {
    const supabase = createSupabaseAnonClient();
    const { data, error } = await supabase.rpc("recipe_rating_summary", {
      p_kind: kind,
      p_slug: slug,
    });
    if (error) return EMPTY_RECIPE_RATING;
    return parseSummary(data);
  } catch {
    return EMPTY_RECIPE_RATING;
  }
}

export async function readVoterRating(
  kind: RecipeRatingKind,
  slug: string,
  voterHash: string,
): Promise<number | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createSupabaseAnonClient();
  const { data, error } = await supabase.rpc("recipe_rating_mine", {
    p_kind: kind,
    p_slug: slug,
    p_voter_hash: voterHash,
  });
  if (error || data == null) return null;
  const rating = Number(data);
  return Number.isInteger(rating) ? rating : null;
}

export type SaveRecipeRatingResult =
  | { ok: true; summary: RecipeRatingSummary; myRating: number }
  | { ok: false; status: number; message: string };

export async function saveRecipeRating(input: {
  kind: RecipeRatingKind;
  slug: string;
  rating: number;
  voterHash: string;
  ip: string;
}): Promise<SaveRecipeRatingResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, status: 503, message: "Stemmer er ikke tilgængelige lige nu." };
  }

  const supabase = createSupabaseAnonClient();
  const { data, error } = await supabase.rpc("recipe_rating_cast", {
    p_kind: input.kind,
    p_slug: input.slug,
    p_voter_hash: input.voterHash,
    p_ip_hash: hashIp(input.ip),
    p_rating: input.rating,
  });

  if (error) {
    console.error("recipe_rating_cast:", error.message);
    const message = error.message || "";
    if (message.includes("rate_limited")) {
      return { ok: false, status: 429, message: "For mange stemmer lige nu. Prøv igen om et øjeblik." };
    }
    return { ok: false, status: 500, message: "Kunne ikke gemme din stemme. Prøv igen." };
  }

  const summary = parseSummary(data);
  revalidateTag(recipeRatingCacheTag(input.kind, input.slug), { expire: 0 });
  revalidatePath(recipeRatingPath(input.kind, input.slug));

  return { ok: true, summary, myRating: input.rating };
}
