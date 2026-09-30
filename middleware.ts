import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { siteUrl } from "@/lib/site";

function withPathnameHeader(request: NextRequest): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

/** Apex → www (canonical host) + pathname til `not-found.tsx` under `/vine/[slug]`. */
export async function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === "vinbot.dk") {
    const url = request.nextUrl.clone();
    url.hostname = "www.vinbot.dk";
    return NextResponse.redirect(url, 308);
  }

  const isPartnerPath = request.nextUrl.pathname.startsWith("/partnere");
  const isVinePath = request.nextUrl.pathname.startsWith("/vine/");

  let response = isVinePath ? withPathnameHeader(request) : NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (supabaseUrl && supabaseKey && isPartnerPath) {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });
    await supabase.auth.getUser();
  }

  if (request.nextUrl.pathname === "/" && request.nextUrl.searchParams.get("q")?.trim()) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
    response.headers.set("Link", `<${siteUrl}>; rel="canonical"`);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
