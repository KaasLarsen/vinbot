/** Personlig smagsprofil — gemmes i localStorage (samme enhed/browser). */

export type TasteRatedWine = {
  slug: string;
  title: string;
  brand: string;
  image: string | null;
  /** true = elsker, false = nej tak */
  liked: boolean;
};

export type TasteStyleKey = "red" | "white" | "rose" | "sparkling" | "champagne";

export type TasteVector = {
  styles: Partial<Record<TasteStyleKey, number>>;
  /** Normaliserede tokens (drue, region, stil-hints). */
  tokens: Record<string, number>;
  body: number;
  oak: number;
};

export type TasteProfile = {
  version: 1;
  updatedAt: string;
  ratings: TasteRatedWine[];
  vector: TasteVector;
};

export type TasteCandidate = {
  slug: string;
  title: string;
  brand: string;
  image: string | null;
  styleHint: string | null;
};
