import { NextRequest, NextResponse } from "next/server";

import { authorizeCron } from "@/lib/cron/auth";
import { isHeavyWorkPaused } from "@/lib/cron/pause-heavy";
import { warmAfterFeedChange } from "@/lib/cron/warm-feeds";

/**
 * Natlig force-revalidate (se vercel.json `30 3 * * *`).
 * Samme logik som `/api/cron/revalidate-feeds?force=1` — egen path fordi
 * Vercel Cron ikke altid bevarer query-strings.
 */
export const maxDuration = 120;

export async function GET(req: NextRequest) {
  if (isHeavyWorkPaused()) {
    return new NextResponse(null, { status: 204 });
  }

  const denied = authorizeCron(req);
  if (denied) return denied;

  const result = await warmAfterFeedChange({
    force: true,
    includeFeatured: true,
    includePriceSideEffects: true,
  });

  return NextResponse.json(result);
}
