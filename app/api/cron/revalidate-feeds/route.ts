import { NextRequest, NextResponse } from "next/server";

import { authorizeCron, wantsForceRevalidate } from "@/lib/cron/auth";
import { isHeavyWorkPaused } from "@/lib/cron/pause-heavy";
import { warmAfterFeedChange } from "@/lib/cron/warm-feeds";

/**
 * Feed keep-warm / (sjælden) force-revalidate.
 * - På Vercel: sæt CRON_SECRET — Vercel Cron sender `Authorization: Bearer <CRON_SECRET>`.
 * - Lokalt (uden VERCEL): tilladt uden secret så I kan køre `curl localhost:3000/...` under udvikling.
 * - Default (hver 12. time): warm uden revalidateTag — undgår Fluid stampede under trafik.
 * - `?force=1` (natlig cron): invalider tag + sekventiel warm.
 * - `VINBOT_PAUSE_HEAVY=1`: øjeblikkelig 204 nødstop.
 */
export const maxDuration = 120;

export async function GET(req: NextRequest) {
  if (isHeavyWorkPaused()) {
    return new NextResponse(null, { status: 204 });
  }

  const denied = authorizeCron(req);
  if (denied) return denied;

  const force = wantsForceRevalidate(req);
  const result = await warmAfterFeedChange({
    force,
    includeFeatured: true,
    includePriceSideEffects: true,
  });

  return NextResponse.json(result);
}
