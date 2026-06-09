import { NextRequest, NextResponse } from "next/server";
import { searchNavSuggestions } from "@/lib/nav-search";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim();
  const mode = req.nextUrl.searchParams.get("mode") === "guides" ? "guides" : "vin";
  const limitRaw = parseInt(req.nextUrl.searchParams.get("limit") || "8", 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 12) : 8;

  const suggestions = searchNavSuggestions(q, mode, limit);
  return NextResponse.json({ q, mode, suggestions });
}
