import { NextRequest, NextResponse } from "next/server";
import { loadWineCatalog } from "@/lib/vine/catalog";
import { matchCatalogFromLabelText } from "@/lib/label-scan/match-catalog";
import { extractWineFromLabelImage, hasOpenAiVision } from "@/lib/label-scan/vision";
import type { LabelScanErrorBody, LabelScanSuccess } from "@/lib/label-scan/types";

export const dynamic = "force-dynamic";
/** Vision + katalog kan tage et par sekunder. */
export const maxDuration = 30;

const MAX_IMAGE_CHARS = 2_500_000; // ~1.8 MB base64

function err(status: number, body: LabelScanErrorBody) {
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { image?: string; text?: string };
    const image = typeof body.image === "string" ? body.image.trim() : "";
    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!image && !text) {
      return err(400, { ok: false, code: "bad_request", error: "Send et billede eller OCR-tekst." });
    }
    if (image && image.length > MAX_IMAGE_CHARS) {
      return err(413, {
        ok: false,
        code: "too_large",
        error: "Billedet er for stort. Prøv at holde telefonen tættere på etiketten.",
      });
    }
    if (image && !image.startsWith("data:image/")) {
      return err(400, {
        ok: false,
        code: "bad_request",
        error: "Ugyldigt billede. Tag et nyt foto.",
      });
    }

    let rawText = "";
    let method: LabelScanSuccess["method"] = "text";
    let queryHint = "";

    if (image && hasOpenAiVision()) {
      const guess = await extractWineFromLabelImage(image);
      if (guess?.rawText) {
        rawText = guess.rawText;
        queryHint = guess.query;
        method = "vision";
      }
    }

    if (!rawText && text) {
      rawText = text;
      method = "ocr";
    }

    // Vision mangler/fejlede → bed klienten om OCR (tesseract i browseren).
    if (!rawText && image) {
      return err(422, {
        ok: false,
        code: "need_ocr",
        error: "Serveren kunne ikke aflæse billedet. Klienten skal køre OCR.",
      });
    }

    if (!rawText) {
      return err(422, {
        ok: false,
        code: "no_text",
        error: "Kunne ikke læse etiketten. Prøv skarpere lys, eller søg manuelt.",
      });
    }

    const catalog = await loadWineCatalog();
    const matched = matchCatalogFromLabelText(catalog.wines, rawText);
    const query = queryHint.trim() || matched.query;

    const payload: LabelScanSuccess = {
      ok: true,
      query,
      rawText,
      method,
      match: matched.match,
      alternatives: matched.alternatives,
    };
    return NextResponse.json(payload);
  } catch (e) {
    console.error("[label-scan] fatal:", e);
    return err(500, {
      ok: false,
      code: "server",
      error: "Noget gik galt under genkendelsen. Prøv igen.",
    });
  }
}

/** GET: status — om vision er konfigureret (ingen hemmeligheder). */
export async function GET() {
  return NextResponse.json({
    vision: hasOpenAiVision(),
    ocrFallback: true,
  });
}
