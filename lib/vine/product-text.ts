import { decodeHTMLEntities } from "@/lib/search/helpers";

/** Første fundne firecifrede årgang (19xx / 20xx) i titel. */
export function extractVintageYear(text: string): string | null {
  const m = text.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : null;
}

/** Fjerner HTML og kollapser whitespace; egnet til visning fra feeds. */
export function stripHtmlForDisplay(raw: string): string {
  let s = decodeHTMLEntities(raw);
  s = s.replace(/<[^>]*>/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

/** Vælg den længste ikke-tomme beskrivelse (typisk mest detaljer fra feed). */
export function pickBestDescription(candidates: string[], maxLen = 1800): string | null {
  const cleaned = candidates
    .map((c) => stripHtmlForDisplay(c))
    .filter((c) => c.length >= 12);
  if (!cleaned.length) return null;
  cleaned.sort((a, b) => b.length - a.length);
  const best = cleaned[0];
  if (best.length <= maxLen) return best;
  return `${best.slice(0, maxLen).trim()}…`;
}
