/** Eksternt Vivino-link — ingen ratings kopieret til Vinbot (licens/KYK). */
export function vivinoSearchUrl(displayTitle: string): string {
  const q = displayTitle.trim();
  return `https://www.vivino.com/search/wines?q=${encodeURIComponent(q)}`;
}
