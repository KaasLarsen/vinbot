import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

import {
  EMPTY_RECIPE_RATING,
  recipeRatingCacheTag,
  recipeRatingPath,
  summarizeRatings,
  type RecipeRatingKind,
  type RecipeRatingSummary,
} from "@/lib/recipe-ratings/format";
import { hashIp } from "@/lib/recipe-ratings/voter";
import { createSupabaseServiceClient, hasSupabaseServiceRole } from "@/lib/supabase/service";

const NEW_VOTERS_PER_IP_PER_HOUR = 30;

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

export async function readRecipeRatingSummary(
  kind: RecipeRatingKind,
  slug: string,
): Promise<RecipeRatingSummary> {
  if (!hasSupabaseServiceRole()) return EMPTY_RECIPE_RATING;
  try {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from("recipe_ratings")
      .select("rating")
      .eq("kind", kind)
      .eq("slug", slug);
    if (error || !data) return EMPTY_RECIPE_RATING;
    return summarizeRatings(data.map((row) => Number(row.rating)));
  } catch {
    return EMPTY_RECIPE_RATING;
  }
}

export async function readVoterRating(
  kind: RecipeRatingKind,
  slug: string,
  voterHash: string,
): Promise<number | null> {
  if (!hasSupabaseServiceRole()) return null;
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("recipe_ratings")
    .select("rating")
    .eq("kind", kind)
    .eq("slug", slug)
    .eq("voter_hash", voterHash)
    .maybeSingle();
  if (error || !data) return null;
  return Number(data.rating);
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
  if (!hasSupabaseServiceRole()) {
    return { ok: false, status: 503, message: "Stemmer er ikke tilgængelige lige nu." };
  }

  const supabase = createSupabaseServiceClient();
  const ipHash = hashIp(input.ip);

  const { data: existing, error: existingError } = await supabase
    .from("recipe_ratings")
    .select("id")
    .eq("kind", input.kind)
    .eq("slug", input.slug)
    .eq("voter_hash", input.voterHash)
    .maybeSingle();

  if (existingError) {
    return { ok: false, status: 500, message: "Kunne ikke gemme din stemme. Prøv igen." };
  }

  if (!existing) {
    const allowed = await allowNewVoter(ipHash, input.voterHash);
    if (!allowed) {
      return { ok: false, status: 429, message: "For mange stemmer lige nu. Prøv igen om et øjeblik." };
    }
    const { error: insertError } = await supabase.from("recipe_ratings").insert({
      kind: input.kind,
      slug: input.slug,
      voter_hash: input.voterHash,
      ip_hash: ipHash,
      rating: input.rating,
    });
    if (insertError && insertError.code !== "23505") {
      return { ok: false, status: 500, message: "Kunne ikke gemme din stemme. Prøv igen." };
    }
    if (insertError?.code === "23505") {
      const updated = await updateRating(input);
      if (!updated) return { ok: false, status: 500, message: "Kunne ikke gemme din stemme. Prøv igen." };
    }
  } else {
    const updated = await updateRating(input);
    if (!updated) return { ok: false, status: 500, message: "Kunne ikke gemme din stemme. Prøv igen." };
  }

  const summary = await readRecipeRatingSummary(input.kind, input.slug);
  revalidateTag(recipeRatingCacheTag(input.kind, input.slug), { expire: 0 });
  revalidatePath(recipeRatingPath(input.kind, input.slug));

  return { ok: true, summary, myRating: input.rating };
}

async function updateRating(input: {
  kind: RecipeRatingKind;
  slug: string;
  rating: number;
  voterHash: string;
}): Promise<boolean> {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase
    .from("recipe_ratings")
    .update({ rating: input.rating, updated_at: new Date().toISOString() })
    .eq("kind", input.kind)
    .eq("slug", input.slug)
    .eq("voter_hash", input.voterHash);
  return !error;
}

async function allowNewVoter(ipHash: string, voterHash: string): Promise<boolean> {
  const supabase = createSupabaseServiceClient();
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("recipe_ratings")
    .select("voter_hash")
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (error || !data) return false;
  const voters = new Set(data.map((row) => String(row.voter_hash)));
  if (voters.has(voterHash)) return true;
  return voters.size < NEW_VOTERS_PER_IP_PER_HOUR;
}
