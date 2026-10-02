import { NextResponse } from "next/server";
import { loadWineCatalog } from "@/lib/vine/catalog";
import { pickTasteCandidates } from "@/lib/taste/candidates";
import { proxyImg } from "@/lib/search/helpers";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET() {
  try {
    const { wines } = await loadWineCatalog();
    const candidates = pickTasteCandidates(wines, 8).map((c) => ({
      ...c,
      image: c.image ? proxyImg(c.image) : null,
    }));
    return NextResponse.json({ candidates });
  } catch (e) {
    console.error("[taste/candidates]", e);
    return NextResponse.json({ candidates: [] }, { status: 500 });
  }
}
