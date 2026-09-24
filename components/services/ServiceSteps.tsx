import PhotoPanel from "@/components/services/PhotoPanel";
import Reveal from "@/components/shared/Reveal";

export type Step = {
  num: string;
  title: string;
  desc: string;
  /** Photographie de l'étape. Sans elle, la carte reste typographique. */
  image?: { src: string; alt: string };
};

/**
 * Processus en étapes.
 *
 * - avec `image` : la photo occupe le haut de la carte et porte la
 *   numérotation, posée dans le voile sombre du bas ;
 * - sans `image` : numérotation et texte seuls, reliés par une ligne d'accent
 *   sur desktop.
 */
export default function ServiceSteps({ steps }: { steps: Step[] }) {
  const withPhotos = steps.some((s) => s.image);

  return (
    <ol className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {/* Fil conducteur entre les étapes — masqué quand les photos occupent
          déjà le haut des cartes. */}
      {!withPhotos && (
        <div
          aria-hidden
          className="absolute top-[3.5rem] right-10 left-10 hidden h-px xl:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--svc) 45%, transparent), transparent)",
          }}
        />
      )}
      {steps.map((s, i) => (
        <Reveal key={s.num} delay={i * 0.08} className="h-full">
          <li className="glass-card group flex h-full flex-col overflow-hidden">
            {s.image ? (
              <>
                <div className="relative">
                  <PhotoPanel
                    src={s.image.src}
                    alt={s.image.alt}
                    ratio="16/9"
                    tint="soft"
                    quality={60}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="rounded-none shadow-none ring-0"
                  />
                  <span
                    aria-hidden
                    className="font-display absolute bottom-3 left-5 text-4xl leading-none text-white/95 drop-shadow-[0_2px_12px_rgb(0_0_0/0.6)]"
                  >
                    {s.num}
                  </span>
                  <span
                    aria-hidden
                    className="absolute top-4 right-5 size-2.5 rounded-full ring-3 ring-black/25 transition-transform duration-300 group-hover:scale-125"
                    style={{ background: "var(--svc)" }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 pt-6">
                  <h3 className="h3-display text-foreground">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col p-7">
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
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            )}
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
