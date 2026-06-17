"use client";

const ITEMS = [
  "Développement Web & Mobile",
  "Call Center 50 postes FR/EN",
  "Marketing Digital & SEO",
  "Digitalisation & Logiciels",
  "Traitement de données",
  "Vente Matériel Informatique",
];

const doubled = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div
      className="overflow-hidden py-3 border-y border-white/10 space-y-2 grid-bg"
      style={{ backgroundColor: "var(--ink)" }}
    >
      {/* Row 1 — scrolls left */}
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-5">
            <span
              className="text-sm font-medium tracking-wide px-4 py-1.5 rounded-full border border-white/12 text-white/70"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              {item}
            </span>
            <span className="text-white/20 text-xs">◆</span>
          </span>
        ))}
      </div>

      {/* Row 2 — scrolls right */}
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 22s linear infinite reverse" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-5">
            <span
              className="text-sm font-medium tracking-wide px-4 py-1.5 rounded-full border border-blue-400/20 text-blue-300/60"
              style={{ backgroundColor: "rgba(59,130,246,0.06)" }}
            >
              {item}
            </span>
            <span className="text-blue-400/20 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
