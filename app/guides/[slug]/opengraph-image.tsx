import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getGuideSlugs } from "@/lib/content/guides";
import { siteName, siteUrl } from "@/lib/site";

export const runtime = "nodejs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const guidesDir = path.join(process.cwd(), "content/guides");

function hubLabel(hub: string): string {
  const m: Record<string, string> = {
    "mad-og-vin": "Mad & vin",
    "humoer-og-vin": "Humør & vin",
    saeson: "Sæson",
    druesorter: "Druesorter",
    regioner: "Regioner",
  };
  return m[hub] || hub;
}

export async function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const host = (() => {
    try {
      return new URL(siteUrl).hostname;
    } catch {
      return "vinbot.dk";
    }
  })();
  const full = path.join(guidesDir, `${slug}.mdx`);
  let title = "Guide";
  let hubLine: string | null = null;
  if (fs.existsSync(full)) {
    const { data } = matter(fs.readFileSync(full, "utf8"));
    const d = data as { title?: string; hub?: string };
    title = d.title || title;
    if (d.hub) hubLine = hubLabel(d.hub);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(160deg, #fffbeb 0%, #fecaca55 40%, #fff 100%)",
          border: "1px solid #e7e5e4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#78350f",
              color: "#fffbeb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            V
          </div>
          <span style={{ fontSize: 22, fontWeight: 600, color: "#78350f", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            {siteName}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, justifyContent: "center" }}>
          {hubLine ? (
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "#9f1239",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {hubLine}
            </span>
          ) : null}
          <h1
            style={{
              margin: 0,
              fontSize: title.length > 80 ? 44 : 52,
              lineHeight: 1.15,
              fontWeight: 700,
              color: "#1c1917",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {title}
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: 20, color: "#78716c", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
          {host} · Dansk vin-inspiration
        </p>
      </div>
    ),
    { ...size },
  );
}
