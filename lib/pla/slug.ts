import { shortHash, slugifyReadable } from "@/lib/vine/slug";

/** PLA-slugs uden æ/ø/å — ellers 404 når Google/crawlers encoder path. */
export function plaProductSlug(shopUrl: string, title: string): string {
  const ascii = slugifyReadable(title, 48)
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${ascii || "vin"}-${shortHash(shopUrl, 8)}`;
}

export function decodePlaSlugParam(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}
