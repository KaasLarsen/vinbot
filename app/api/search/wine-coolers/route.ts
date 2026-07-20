import { NextRequest, NextResponse } from "next/server";
import { runWineCoolerSearch } from "@/lib/search/wine-cooler-engine";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const qRaw = (req.nextUrl.searchParams.get("q") || "").trim();
    const maxParam = req.nextUrl.searchParams.get("max");
    const budgetMaxParam = maxParam ? parseInt(maxParam, 10) : null;

    const result = await runWineCoolerSearch(qRaw, Number.isFinite(budgetMaxParam) ? budgetMaxParam : null);
    return NextResponse.json(result);
  } catch (e) {
    console.error("[wine-cooler-search] fatal:", e);
    return NextResponse.json({
      source: "error" as const,
      products: [],
      meta: {
        feeds_total: 1,
        feeds_ok: 0,
        feeds_failed: 1,
        priceMin: null,
        priceMax: null,
        matched_before_cap: 0,
        results_capped: false,
        merchant_browse: null,
        merchant_browse_tier: null,
      },
    });
  }
}
