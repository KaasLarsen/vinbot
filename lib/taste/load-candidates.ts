import { unstable_cache } from "next/cache";
import { loadWineCatalog } from "@/lib/vine/catalog";
import { proxyImg } from "@/lib/search/helpers";
import { pickTasteCandidates } from "@/lib/taste/candidates";
import type { TasteCandidate } from "@/lib/taste/types";

async function buildTasteCandidates(limit = 8): Promise<TasteCandidate[]> {
  const { wines } = await loadWineCatalog();
  return pickTasteCandidates(wines, limit).map((c) => ({
    ...c,
    image: c.image ? proxyImg(c.image) : null,
  }));
}

const getCachedTasteCandidates = unstable_cache(
  () => buildTasteCandidates(8),
  ["vinbot-taste-candidates-v2-bottles"],
  { revalidate: 3600, tags: ["vinbot-feeds"] },
);

/** Smagsprofil-kandidater fra vin-kataloget (billed-proxy URLs). */
export async function loadTasteCandidates(limit = 8): Promise<TasteCandidate[]> {
  if (limit === 8) {
    try {
      const cached = await getCachedTasteCandidates();
      if (cached.length > 0) return cached;
    } catch {
      // fall through
    }
  }
  return buildTasteCandidates(limit);
}
