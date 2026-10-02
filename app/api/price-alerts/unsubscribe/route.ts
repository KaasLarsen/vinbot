import { NextRequest, NextResponse } from "next/server";

import { unsubscribePriceAlert } from "@/lib/price-alerts/subscribe";
import { verifyPriceAlertToken } from "@/lib/price-alerts/token";

export const dynamic = "force-dynamic";

async function readToken(req: NextRequest): Promise<string> {
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = (await req.json().catch(() => null)) as { token?: unknown } | null;
    return typeof body?.token === "string" ? body.token : "";
  }
  const form = await req.formData();
  const token = form.get("token");
  return typeof token === "string" ? token : "";
}

export async function POST(req: NextRequest) {
  const token = (await readToken(req)).trim();
  const alertId = verifyPriceAlertToken(token);
  const wantsJson = (req.headers.get("content-type") || "").includes("application/json");

  if (!alertId) {
    if (wantsJson) {
      return NextResponse.json({ error: "Linket er ugyldigt." }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/prisfald/afmeld?error=1", req.url), 303);
  }

  const result = await unsubscribePriceAlert(alertId);
  if (result === "error") {
    if (wantsJson) {
      return NextResponse.json({ error: "Afmelding lykkedes ikke. Prøv igen." }, { status: 502 });
    }
    return NextResponse.redirect(new URL(`/prisfald/afmeld?token=${encodeURIComponent(token)}&error=1`, req.url), 303);
  }
  if (result === "missing") {
    if (wantsJson) {
      return NextResponse.json({ error: "Tilmeldingen blev ikke fundet." }, { status: 404 });
    }
    return NextResponse.redirect(new URL("/prisfald/afmeld?error=1", req.url), 303);
  }

  if (wantsJson) return NextResponse.json({ ok: true });
  return NextResponse.redirect(new URL("/prisfald/afmeld?done=1", req.url), 303);
}
