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
      className="overflow-hidden py-4 border-y border-white/10"
      style={{ backgroundColor: "var(--ink)" }}
    >
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
    </div>
  );
}
