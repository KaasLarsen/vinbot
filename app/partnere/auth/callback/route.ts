import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { siteUrl } from "@/lib/site";

export async function GET(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL("/partnere/login", siteUrl));
  }

  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/partnere/dashboard";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  return NextResponse.redirect(new URL("/partnere/login?error=auth", origin));
}
