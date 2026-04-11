import { NextRequest, NextResponse } from "next/server";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

function placeholderSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" rx="24" fill="#1a1a1f"/><g fill="#cfc8bf"><path d="M86 44h84v24c0 25-19 46-42 46s-42-21-42-46V44z"/><rect x="122" y="114" width="12" height="78" rx="6"/><rect x="94" y="194" width="68" height="10" rx="5"/></g></svg>`;
}

export async function GET(req: NextRequest) {
  try {
    let src = req.nextUrl.searchParams.get("src")?.trim() || "";
    if (!src) return new NextResponse("missing src", { status: 400 });
    if (src.startsWith("//")) src = "https:" + src;
    const url = new URL(src);

    async function go(ref?: string) {
      return fetch(url.toString(), {
        redirect: "follow",
        headers: {
          "user-agent": UA,
          accept: "image/avif,image/webp,image/*,*/*;q=0.8",
          ...(ref ? { referer: ref } : {}),
        },
      });
    }

    let r = await go();
    if (!r.ok) r = await go(url.origin);
    if (!r.ok) {
      return new NextResponse(placeholderSvg(), {
        status: 200,
        headers: {
          "content-type": "image/svg+xml",
          "cache-control": "public, max-age=600",
        },
      });
    }
    const ct = r.headers.get("content-type") || "image/jpeg";
    const buf = new Uint8Array(await r.arrayBuffer());
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "content-type": ct,
        "cache-control": "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse(placeholderSvg(), {
      status: 200,
      headers: { "content-type": "image/svg+xml" },
    });
  }
}
