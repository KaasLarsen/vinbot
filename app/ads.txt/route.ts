import { NextResponse } from "next/server";
import { getAdsenseAdsTxtBody } from "@/lib/adsense-config";

/** AdSense crawlers skal kunne hente ads.txt med 200 og text/plain — én kilde med pub fra NEXT_PUBLIC_ADSENSE_CLIENT. */
export function GET() {
  return new NextResponse(getAdsenseAdsTxtBody(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
