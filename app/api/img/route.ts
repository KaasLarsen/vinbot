import { NextRequest, NextResponse } from "next/server";

/** Hold image-proxy billig: slow origins må ikke brænde default function duration. */
export const maxDuration = 10;

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

const FETCH_TIMEOUT_MS = 8_000;
const MAX_BYTES = 2 * 1024 * 1024;

function placeholderSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" rx="24" fill="#1a1a1f"/><g fill="#cfc8bf"><path d="M86 44h84v24c0 25-19 46-42 46s-42-21-42-46V44z"/><rect x="122" y="114" width="12" height="78" rx="6"/><rect x="94" y="194" width="68" height="10" rx="5"/></g></svg>`;
}

function placeholderResponse(maxAge = 600): NextResponse {
  return new NextResponse(placeholderSvg(), {
    status: 200,
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": `public, max-age=${maxAge}`,
    },
  });
}

/** Afvis non-http(s) og typiske private/loopback-hosts (basic SSRF-guard). */
function isBlockedHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/\.$/, "");
  if (!host) return true;
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) return true;
  if (host === "0.0.0.0" || host === "::" || host === "::1" || host === "[::1]") return true;
  if (host === "metadata.google.internal") return true;

  // IPv4 private / link-local / loopback
  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (ipv4) {
    const parts = ipv4.slice(1).map((p) => Number(p));
    if (parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
    const [a, b] = parts;
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }

  // IPv6 unique-local / link-local
  if (host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80")) return true;

  return false;
}

async function readBodyCapped(res: Response, maxBytes: number): Promise<Uint8Array | null> {
  const lenHeader = res.headers.get("content-length");
  if (lenHeader) {
    const len = Number(lenHeader);
    if (Number.isFinite(len) && len > maxBytes) return null;
  }

  if (!res.body) {
    const buf = new Uint8Array(await res.arrayBuffer());
    return buf.byteLength > maxBytes ? null : buf;
  }

  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > maxBytes) {
      try {
        await reader.cancel();
      } catch {
        /* ignore */
      }
      return null;
    }
    chunks.push(value);
  }

  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

export async function GET(req: NextRequest) {
  try {
    let src = req.nextUrl.searchParams.get("src")?.trim() || "";
    if (!src) return new NextResponse("missing src", { status: 400 });
    if (src.startsWith("//")) src = "https:" + src;
    const url = new URL(src);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return placeholderResponse();
    }
    if (isBlockedHost(url.hostname)) {
      return placeholderResponse();
    }

    async function go(ref?: string) {
      return fetch(url.toString(), {
        redirect: "follow",
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: {
          "user-agent": UA,
          accept: "image/avif,image/webp,image/*,*/*;q=0.8",
          ...(ref ? { referer: ref } : {}),
        },
      });
    }

    let r = await go();
    if (!r.ok) r = await go(url.origin);
    if (!r.ok) return placeholderResponse();

    const ct = r.headers.get("content-type") || "image/jpeg";
    const buf = await readBodyCapped(r, MAX_BYTES);
    if (!buf) return placeholderResponse();

    return new NextResponse(Buffer.from(buf), {
      status: 200,
      headers: {
        "content-type": ct,
        "cache-control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return placeholderResponse();
  }
}
