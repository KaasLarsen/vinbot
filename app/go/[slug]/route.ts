import { NextResponse } from "next/server";

import { createSupabaseAnonClient } from "@/lib/supabase/anon";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  createSupabaseServiceClient,
  hasSupabaseServiceRole,
} from "@/lib/supabase/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(req: Request, context: RouteContext) {
  if (!isSupabaseConfigured()) {
    return badRequest("CPC-tracking er ikke konfigureret.", 503);
  }

  const { slug: rawSlug } = await context.params;
  const slug = decodeURIComponent(rawSlug || "").trim().toLowerCase();
  if (!slug) return badRequest("Ugyldig partner.");

  const url = new URL(req.url);
  const target = url.searchParams.get("url")?.trim() || "";
  const placement = url.searchParams.get("placement")?.trim() || null;

  if (!target || !/^https?:\/\//i.test(target)) {
    return badRequest("Manglende eller ugyldig url-parameter.");
  }

  const supabase = hasSupabaseServiceRole()
    ? createSupabaseServiceClient()
    : createSupabaseAnonClient();

  const { error } = await supabase.rpc("log_cpc_click", {
    p_slug: slug,
    p_target_url: target,
    p_placement: placement,
    p_referer: req.headers.get("referer"),
    p_user_agent: req.headers.get("user-agent"),
  });

  if (error) {
    const msg = error.message || "";
    if (msg.includes("partner_unavailable")) {
      return badRequest("Partner er ikke aktiv.", 404);
    }
    if (msg.includes("url_not_allowed") || msg.includes("invalid_url")) {
      return badRequest("URL er ikke tilladt for denne partner.", 400);
    }
    console.error("log_cpc_click failed:", error);
    return badRequest("Kunne ikke registrere klik.", 502);
  }

  return NextResponse.redirect(target, 302);
}
