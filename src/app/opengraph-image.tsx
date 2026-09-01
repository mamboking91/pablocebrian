import { ImageResponse } from "next/og";

export const alt = "Pablo Cebrián — Productor musical";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 600,
            letterSpacing: 4,
          }}
        >
          PABLO CEBRIÁN
        </div>
        <div
          style={{
            display: "flex",
            width: 160,
            height: 2,
            background: "#b8860b",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 32,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "#b8860b",
          }}
        >
          Productor musical
        </div>
      </div>
    ),
    { ...size },
  );
}
