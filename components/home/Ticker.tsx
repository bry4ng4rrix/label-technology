"use client";

const ITEMS = [
  "Développement Web & Mobile",
  "Call Center 50 postes FR/EN",
  "Marketing Digital & SEO",
  "Digitalisation & Logiciels",
  "Traitement de données",
  "Vente Matériel Informatique",
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden py-3 border-y border-white/10"
      style={{ backgroundColor: "var(--brand)" }}
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="font-display text-white text-sm tracking-wide uppercase">
              {item}
            </span>
            <span className="text-white/40 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
