import type { RecipeDifficulty } from "@/lib/content/recipe-types";

export function formatIsoDuration(iso?: string): string | null {
  if (!iso) return null;
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/i);
  if (!m) return iso;
  const parts: string[] = [];
  if (m[1]) parts.push(`${m[1]} t`);
  if (m[2]) parts.push(`${m[2]} min`);
  return parts.length > 0 ? parts.join(" ") : iso;
}

export function difficultyLabel(d?: RecipeDifficulty): string | null {
  if (!d) return null;
  const map: Record<RecipeDifficulty, string> = {
    easy: "Let",
    medium: "Mellem",
    hard: "Svær",
  };
  return map[d];
}
