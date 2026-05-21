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

/** Samlet tilberedningstid i minutter fra ISO 8601 prep + cook. */
export function recipeTotalMinutes(prep?: string, cook?: string): number | null {
  function parse(iso?: string): number {
    if (!iso) return 0;
    const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/i);
    if (!m) return 0;
    return (Number(m[1] || 0) * 60) + Number(m[2] || 0);
  }
  const total = parse(prep) + parse(cook);
  return total > 0 ? total : null;
}

export function formatTotalTime(prep?: string, cook?: string): string | null {
  const mins = recipeTotalMinutes(prep, cook);
  if (mins == null) return null;
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} t ${m} min` : `${h} t`;
}
