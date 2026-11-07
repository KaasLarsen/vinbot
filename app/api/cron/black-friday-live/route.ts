import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getBlackFridayPhase } from "@/lib/black-friday/phase";
import { warmPopularSearches } from "@/lib/search/warm-popular";
import { warmWineCatalog } from "@/lib/vine/catalog";

export const maxDuration = 120;

/**
 * Black Week cron (hver 3. time i vercel.json): revaliderer feeds i live-fase
 * og warmer katalog + populære søgninger, så traffic ikke stampeder cold rebuilds.
 * Uden for live returnerer 204 (næsten gratis).
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  const onVercel = Boolean(process.env.VERCEL);

  if (onVercel && !secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 503 });
  }
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (getBlackFridayPhase() !== "live") {
    return new NextResponse(null, { status: 204 });
  }

  revalidateTag("vinbot-feeds", "max");

  let catalogWines = 0;
  let catalogGeneratedAt: string | null = null;
  try {
    const catalog = await warmWineCatalog();
    catalogWines = catalog.wines.length;
    catalogGeneratedAt = catalog.generatedAt;
  } catch (err) {
    console.error("warmWineCatalog (bf-live):", err);
  }

  let searchWarm: Awaited<ReturnType<typeof warmPopularSearches>> | { error: string } = {
    feeds: [],
    wine: [],
    spirits: [],
  };
  try {
    searchWarm = await warmPopularSearches();
  } catch (err) {
    console.error("warmPopularSearches (bf-live):", err);
    searchWarm = { error: "warm search failed" };
  }

  return NextResponse.json({
    revalidated: true,
    phase: "live",
    catalogWines,
    catalogGeneratedAt,
    searchWarm,
  });
}
