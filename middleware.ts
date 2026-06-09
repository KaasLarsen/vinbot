import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Apex → www (canonical host) + pathname til `not-found.tsx` under `/vine/[slug]`. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === "vinbot.dk") {
    const url = request.nextUrl.clone();
    url.hostname = "www.vinbot.dk";
    return NextResponse.redirect(url, 308);
  }

  if (request.nextUrl.pathname.startsWith("/vine/")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", request.nextUrl.pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
