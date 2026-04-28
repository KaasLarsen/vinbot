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

/**
 * Slår tekster fra flere butiks-feeds sammen til ét afsnit (uden åbenlys dublet).
 * Gør tynde produktsider tykkere når samme vin har lidt forskellig beskrivelse pr. merchant.
 */
export function combineRichDescriptions(candidates: string[], maxLen = 2800): string | null {
  const blocks = [...new Set(candidates.map(stripHtmlForDisplay).filter((c) => c.length >= 16))];
  if (!blocks.length) return null;
  blocks.sort((a, b) => b.length - a.length);

  let text = blocks[0];
  for (let i = 1; i < blocks.length && text.length < maxLen; i++) {
    const next = blocks[i];
    const probe = next.slice(0, Math.min(70, next.length)).toLowerCase();
    if (probe.length >= 24 && text.toLowerCase().includes(probe)) continue;

    const merged = `${text}\n\n${next}`;
    if (merged.length <= maxLen) {
      text = merged;
      continue;
    }
    const room = maxLen - text.length - 2;
    if (room > 140) {
      text = `${text}\n\n${next.slice(0, room).trim()}…`;
    }
    break;
  }

  if (text.length > maxLen) return `${text.slice(0, maxLen - 1).trim()}…`;
  return text;
}
