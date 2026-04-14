import { ImageResponse } from "next/og";

/** Browser + Google site icon (min. ~48px anbefales til søgeresultater). */
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#78350f",
          color: "#fffbeb",
          fontSize: 30,
          fontWeight: 700,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        V
      </div>
    ),
    { ...size },
  );
}
