import { wineStyleOfBlob } from "@/lib/search/wine-style";

/** Stil-filter på vin-katalog hub (UI). */
export type VineCatalogStyleFilter = "alle" | "bobler" | "rose" | "hvid" | "rod";

/** Gættet stil til én vin (null = vises kun under «Alle»). */
export type VineWineStyleGuess = Exclude<VineCatalogStyleFilter, "alle"> | null;

export function vineCatalogStyleFromBlob(blob: string): VineWineStyleGuess {
  const w = wineStyleOfBlob(blob);
  if (!w) return null;
  if (w === "champagne" || w === "sparkling") return "bobler";
  if (w === "rose") return "rose";
  if (w === "white") return "hvid";
  if (w === "red") return "rod";
  return null;
}
