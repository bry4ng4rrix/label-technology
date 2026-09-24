import Reveal from "@/components/shared/Reveal";

export type Step = { num: string; title: string; desc: string };

/**
 * Processus en étapes — composition asymétrique : la numérotation vit dans
 * une colonne étroite, le texte respire à côté, et une ligne d'accent relie
 * les étapes sur desktop.
 */
export default function ServiceSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div
        aria-hidden
        className="absolute top-[3.5rem] right-10 left-10 hidden h-px xl:block"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--svc) 45%, transparent), transparent)",
        }}
      />
      {steps.map((s, i) => (
        <Reveal key={s.num} delay={i * 0.08} className="h-full">
          <li className="glass-card group flex h-full flex-col p-7">
            <div className="mb-6 flex items-center justify-between">
              <span
                className="font-display text-4xl leading-none transition-colors duration-300"
                style={{ color: "color-mix(in srgb, var(--svc) 30%, transparent)" }}
              >
                {s.num}
              </span>
              <span
                className="relative z-10 size-3 rounded-full ring-4 ring-background transition-transform duration-300 group-hover:scale-125"
                style={{ background: "var(--svc)" }}
              />
            </div>
            <h3 className="h3-display text-foreground">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
