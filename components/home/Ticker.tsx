"use client";

const ITEMS = [
  "Développement Web & Mobile",
  "Marketing Digital & SEO",
  "Digitalisation & Logiciels",
  "Traitement de données",
  "Vente Matériel Informatique",
];

const doubled = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-white/8 bg-ink py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: "ticker 32s linear infinite reverse" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span className="glass-dark rounded-full px-4 py-1.5 text-[13px] font-medium tracking-wide text-white/70">
              {item}
            </span>
            <span className="size-1 rounded-full bg-brand-glow/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
