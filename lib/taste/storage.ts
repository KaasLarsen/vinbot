import type { TasteProfile, TasteRatedWine, TasteVector } from "./types";
import { buildTasteVector } from "./vector";

export const TASTE_PROFILE_KEY = "vinbot.tasteProfile.v1";
export const TASTE_PROFILE_EVENT = "vinbot-taste-profile-change";

export const MIN_LIKES_FOR_PROFILE = 3;

function emptyVector(): TasteVector {
  return { styles: {}, tokens: {}, body: 0, oak: 0 };
}

export function getStoredTasteProfile(): TasteProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(TASTE_PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TasteProfile;
    if (parsed?.version !== 1 || !Array.isArray(parsed.ratings)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function profileIsReady(profile: TasteProfile | null | undefined): boolean {
  if (!profile) return false;
  return profile.ratings.filter((r) => r.liked).length >= MIN_LIKES_FOR_PROFILE;
}

export function setStoredTasteProfile(ratings: TasteRatedWine[]): TasteProfile {
  const vector = buildTasteVector(ratings);
  const profile: TasteProfile = {
    version: 1,
    updatedAt: new Date().toISOString(),
    ratings,
    vector,
  };
  localStorage.setItem(TASTE_PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event(TASTE_PROFILE_EVENT));
  return profile;
}

export function clearStoredTasteProfile(): void {
  localStorage.removeItem(TASTE_PROFILE_KEY);
  window.dispatchEvent(new Event(TASTE_PROFILE_EVENT));
}

export function getTasteVectorOrNull(): TasteVector | null {
  const p = getStoredTasteProfile();
  if (!profileIsReady(p)) return null;
  return p?.vector ?? null;
}

/** Serialiserbar kontekst til API (chat) — ingen PII. */
export function tasteContextForApi(): {
  styles: TasteVector["styles"];
  tokens: string[];
  body: number;
  oak: number;
} | null {
  const v = getTasteVectorOrNull();
  if (!v) return null;
  const tokens = Object.entries(v.tokens)
    .filter(([, w]) => w > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([t]) => t);
  return { styles: v.styles, tokens, body: v.body, oak: v.oak };
}

export { emptyVector };
