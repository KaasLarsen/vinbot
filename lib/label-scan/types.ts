/** Resultat af etiket-genkendelse + katalog-match. */

export type LabelScanMatch = {
  slug: string;
  displayTitle: string;
  brand: string;
  score: number;
  lowestPrice: number | null;
  merchantCount: number;
  image: string | null;
};

export type LabelScanSuccess = {
  ok: true;
  /** Bedste bud på søgestreng (til fallback `/?q=`). */
  query: string;
  /** Rå tekst fra vision/OCR (til debug/UI). */
  rawText: string;
  /** Metode brugt til tekst-udtræk. */
  method: "vision" | "ocr" | "text";
  /** Stærkt katalog-match → klient bør gå til `/vine/[slug]`. */
  match: LabelScanMatch | null;
  /** Næste bud (til «mente du…» hvis vi senere vil vise dem). */
  alternatives: LabelScanMatch[];
};

export type LabelScanErrorBody = {
  ok: false;
  error: string;
  code?: "bad_request" | "too_large" | "vision_failed" | "no_text" | "need_ocr" | "server";
};
