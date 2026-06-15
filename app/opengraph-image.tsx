import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Label Technology — Partenaire Technologique Premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0F1E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(30,63,171,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,63,171,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "60%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(30,63,171,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Logo top-left */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "#1E3FAB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 20,
              color: "white",
            }}
          >
            LT
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 20, letterSpacing: 2 }}>LABEL</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: 3 }}>TECHNOLOGY</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
          <div style={{ color: "#2E55D4", fontSize: 14, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase" }}>
            Antananarivo · Madagascar · International
          </div>
          <div style={{ color: "white", fontWeight: 800, fontSize: 56, lineHeight: 1.1, letterSpacing: -1 }}>
            Votre partenaire<br />
            <span style={{ color: "#2E55D4" }}>technologique</span> premium
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, fontWeight: 300, marginTop: 8 }}>
            Développement · Call Center 50P · Marketing · ERP · Data
          </div>
        </div>

        {/* Bottom metrics */}
        <div style={{ display: "flex", gap: 40, position: "relative" }}>
          {[
            { v: "50", l: "postes Call Center" },
            { v: "6", l: "expertises" },
            { v: "FR/EN", l: "bilingue" },
            { v: "4 ans", l: "expérience" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ color: "#2E55D4", fontWeight: 800, fontSize: 28 }}>{m.v}</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>{m.l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
