/** Session-kontekst fra mad-picker — bruges af scan-resultat (ikke fuld historik). */

export const FOOD_SESSION_KEY = "vinbot.foodSession.v1";

export type FoodSessionContext = {
  dishId: string;
  dishLabel: string;
  searchQuery: string;
  updatedAt: string;
};

export function getFoodSessionContext(): FoodSessionContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(FOOD_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FoodSessionContext;
    if (!parsed?.dishLabel) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setFoodSessionContext(ctx: Omit<FoodSessionContext, "updatedAt">): void {
  if (typeof window === "undefined") return;
  try {
    const payload: FoodSessionContext = { ...ctx, updatedAt: new Date().toISOString() };
    sessionStorage.setItem(FOOD_SESSION_KEY, JSON.stringify(payload));
  } catch {
    /* private mode */
  }
}
