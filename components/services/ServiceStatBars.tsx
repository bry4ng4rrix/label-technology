import Reveal from "@/components/shared/Reveal";

export type StatBar = { label: string; value: string };

/** Barres de progression aux couleurs du service (section « en chiffres »). */
export default function ServiceStatBars({ items }: { items: StatBar[] }) {
  return (
    <div className="space-y-5">
      {items.map((s, i) => (
        <Reveal key={s.label} delay={0.1 + i * 0.08}>
          <div className="mb-1.5 flex justify-between">
            <span className="text-sm text-white/60">{s.label}</span>
            <span className="font-display text-sm" style={{ color: "var(--svc)" }}>
              {s.value}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="svc-bar h-full rounded-full"
              style={{
                width: s.value,
                background: "linear-gradient(90deg, var(--svc-2), var(--svc))",
                animationDelay: `${0.3 + i * 0.18}s`,
              }}
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
