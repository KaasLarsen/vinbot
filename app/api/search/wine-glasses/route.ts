import { NextResponse } from "next/server";
import { runWineGlassSearch } from "@/lib/search/wine-glass-engine";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "vinglas";
    const maxRaw = searchParams.get("max");
    const max = maxRaw != null && maxRaw !== "" ? Number(maxRaw) : null;
    const result = await runWineGlassSearch(q, Number.isFinite(max) ? max : null);
    return NextResponse.json(result);
  } catch (e) {
    console.error("[wine-glass-search] fatal:", e);
    return NextResponse.json({ source: "error", products: [], meta: null }, { status: 500 });
  }
}
