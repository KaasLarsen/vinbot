import { NextRequest, NextResponse } from "next/server";
import { runSearch } from "@/lib/search/engine";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const qRaw = (req.nextUrl.searchParams.get("q") || "").trim();
    const maxParam = req.nextUrl.searchParams.get("max");
    const budgetMaxParam = maxParam ? parseInt(maxParam, 10) : null;

    const result = await runSearch(qRaw, Number.isFinite(budgetMaxParam) ? budgetMaxParam : null);
    return NextResponse.json(result);
  } catch (e) {
    console.error("[search] fatal:", e);
    return NextResponse.json({
      source: "error" as const,
      products: [],
      meta: { feeds_total: 0, feeds_ok: 0, feeds_failed: 0, priceMin: null, priceMax: null },
    });
  }
}
