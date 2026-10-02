import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("title") || "Heavy Steel Fabrication";
  const title = raw.slice(0, 90).toUpperCase();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A1622",
          color: "#F3F2F2",
          padding: 72,
          borderLeft: "20px solid #00508E",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#5AA6E6", fontWeight: 700 }}>
          PARASMANI ENGINEERING PVT. LTD.
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 0.98, letterSpacing: -3, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8C9AA8", letterSpacing: 3 }}>
          <span>INTEGRITY · OWNERSHIP · EXCELLENCE · CARE</span>
          <span style={{ color: "#FF8A2A" }}>VIRAMGAM, GUJARAT</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
