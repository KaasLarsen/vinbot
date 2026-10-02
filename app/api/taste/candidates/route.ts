import { NextResponse } from "next/server";
import { loadTasteCandidates } from "@/lib/taste/load-candidates";

/** CDN-cache — undgå at genbygge hele vin-kataloget på hvert wizard-åbn. */
export const revalidate = 3600;

export async function GET() {
  try {
    const candidates = await loadTasteCandidates(8);
    return NextResponse.json(
      { candidates },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (e) {
    console.error("[taste/candidates]", e);
    return NextResponse.json({ candidates: [], error: "failed" }, { status: 500 });
  }
}
