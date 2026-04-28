import { createHash } from "crypto";

import { normalize } from "@/lib/search/helpers";

/** URL-sikker slug: små bogstaver, bindestreg, ingen duplicate consecutive dashes. */
export function slugifyReadable(s: string, maxLen = 56): string {
  const n = normalize(s)
    .replace(/[^a-z0-9æøå]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (n.length <= maxLen) return n || "vin";
  return n.slice(0, maxLen).replace(/-+$/g, "") || "vin";
}

export function shortHash(input: string, len = 8): string {
  return createHash("sha256").update(input).digest("hex").slice(0, len);
}

/** Stabil slug: læsbart prefiks + kort hash af id (undgår kollisioner). */
export function wineSlugFromId(canonicalId: string, displayTitle: string, brand: string): string {
  const base = slugifyReadable(`${brand} ${displayTitle}`, 48);
  const h = shortHash(canonicalId, 8);
  return `${base}-${h}`;
}
