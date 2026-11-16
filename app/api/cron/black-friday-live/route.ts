import { NextRequest, NextResponse } from "next/server";

import { getBlackFridayPhase } from "@/lib/black-friday/phase";
import { authorizeCron } from "@/lib/cron/auth";
import { isHeavyWorkPaused } from "@/lib/cron/pause-heavy";
import { warmAfterFeedChange } from "@/lib/cron/warm-feeds";

export const maxDuration = 120;

/**
 * Black Week cron (hver 3. time i vercel.json): warmer katalog + populære søgninger
 * i live-fase uden revalidateTag-stampede. Friskhed kommer fra 6h Data Cache TTL
 * + natlig force-cron. Uden for live / ved VINBOT_PAUSE_HEAVY → 204.
 */
export async function GET(req: NextRequest) {
  if (isHeavyWorkPaused()) {
    return new NextResponse(null, { status: 204 });
  }

  const denied = authorizeCron(req);
  if (denied) return denied;

  if (getBlackFridayPhase() !== "live") {
    return new NextResponse(null, { status: 204 });
  }

  const result = await warmAfterFeedChange({
    force: false,
    includeFeatured: false,
    includePriceSideEffects: false,
  });

  return NextResponse.json({
    ...result,
    phase: "live",
  });
}
