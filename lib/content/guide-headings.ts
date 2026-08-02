export type GuideTocItem = {
  id: string;
  text: string;
};

/** Minimum H2-count before a table of contents is shown. */
export const GUIDE_TOC_MIN_HEADINGS = 6;

/** Stable, URL-safe id from heading text (Danish-friendly). */
export function slugifyGuideHeading(text: string): string {
  const base = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return base || "sektion";
}

/** Strip light markdown from an H2 line (bold/italics/code). */
function cleanHeadingText(raw: string): string {
  return raw
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

/**
 * Extract `##` headings from guide MDX body for TOC + matching h2 ids.
 * Duplicate titles get `-2`, `-3`, … suffixes.
 */
export function extractGuideToc(body: string): GuideTocItem[] {
  const seen = new Map<string, number>();
  const items: GuideTocItem[] = [];

  for (const match of body.matchAll(/^##[ \t]+(.+)$/gm)) {
    const text = cleanHeadingText(match[1] ?? "");
    if (!text) continue;

    const base = slugifyGuideHeading(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    const id = count === 1 ? base : `${base}-${count}`;
    items.push({ id, text });
  }

  return items;
}
