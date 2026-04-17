import { ImageResponse } from "next/og";
import { siteDescription, siteName } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteName} – vin til mad, humør og stemning`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(145deg, #1c1917 0%, #44403c 45%, #78350f 100%)",
          color: "#fafaf9",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 20,
              background: "#fafaf9",
              color: "#78350f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 700,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            V
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{siteName}</span>
            <span style={{ fontSize: 28, color: "#e7e5e4", fontWeight: 500 }}>Vin til mad, humør og stemning</span>
          </div>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 26,
            lineHeight: 1.45,
            color: "#d6d3d1",
            maxWidth: 920,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {siteDescription}
        </p>
      </div>
    ),
    { ...size },
  );
}
