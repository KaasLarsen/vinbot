export type NormalizedSearchArgs = {
  q: string;
  budgetMin: number | null;
  budgetMax: number | null;
  key: string;
};

/** Stabil nøgle for identiske søgninger. Query er case- og whitespace-insensitiv. */
export function normalizeSearchArgs(
  q: string,
  budgetMin: number | null,
  budgetMax: number | null,
): NormalizedSearchArgs {
  const query = q.trim().toLowerCase().replace(/\s+/g, " ");
  const min = budgetMin != null && Number.isFinite(budgetMin) ? budgetMin : null;
  const max = budgetMax != null && Number.isFinite(budgetMax) ? budgetMax : null;
  return {
    q: query,
    budgetMin: min,
    budgetMax: max,
    key: `${query}|${min ?? ""}|${max ?? ""}`,
  };
}

export function searchCacheKey(
  q: string,
  budgetMin: number | null,
  budgetMax: number | null,
): string {
  return normalizeSearchArgs(q, budgetMin, budgetMax).key;
}
