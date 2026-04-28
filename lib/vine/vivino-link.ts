/** Eksternt link til Vivino-søgning (score og detaljer vises på vivino.com). */
export function vivinoSearchUrl(displayTitle: string): string {
  const q = displayTitle.trim();
  return `https://www.vivino.com/search/wines?q=${encodeURIComponent(q)}`;
}
