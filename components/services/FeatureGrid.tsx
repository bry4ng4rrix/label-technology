import type { ReactNode } from "react";
import PhotoPanel from "@/components/services/PhotoPanel";
import Reveal from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

export type Feature = {
  icon?: ReactNode;
  title: string;
  desc: string;
  /** Photographie propre à la prestation. Sans elle, la carte reste typographique. */
  image?: { src: string; alt: string };
};

/**
 * Liste de prestations.
 *
 * - avec `image` : carte photo — visuel traité aux couleurs du service, pastille
 *   d'icône en verre débordant sur la photo, puis titre et description ;
 * - sans `image` : composition typographique filetée, sans cadre.
 *
 * Dans les deux cas, pas de carte encadrée : on reste sur une mise en page
 * éditoriale plutôt qu'une grille de cartes SaaS.
 */
export default function FeatureGrid({
  items,
  tone = "light",
  columns = 3,
}: {
  items: Feature[];
  tone?: "light" | "dark";
  columns?: 2 | 3;
}) {
  const dark = tone === "dark";
  const withPhotos = items.some((i) => i.image);

  return (
    <div
      className={cn(
        "grid",
        withPhotos ? "gap-x-6 gap-y-12 sm:gap-y-14" : "gap-x-10 gap-y-12",
        columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2",
      )}
    >
      {items.map((f, i) => (
        <Reveal key={f.title} delay={(i % 3) * 0.08} className="group h-full">
          {f.image ? (
            <article className="flex h-full flex-col">
              <div className="relative">
                <PhotoPanel
                  src={f.image.src}
                  alt={f.image.alt}
                  ratio="4/3"
                  tone={tone}
                  tint="soft"
                  quality={60}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="rounded-2xl"
                />
                {f.icon && (
                  /* Pastille de verre à cheval sur la photo */
                  <span
                    className="svc-icon absolute -bottom-5 left-5 size-12 backdrop-blur-xl [&_svg]:size-5.5"
                    aria-hidden
                  >
                    {f.icon}
                  </span>
                )}
              </div>

              <h3
                className={cn(
                  "font-display mt-10 text-lg leading-snug font-semibold tracking-tight sm:text-xl",
                  dark ? "text-white" : "text-foreground",
                )}
              >
                {f.title}
              </h3>
              <p
                className={cn(
                  "mt-3 text-[15px] leading-relaxed",
                  dark ? "text-white/60" : "text-muted-foreground",
                )}
              >
                {f.desc}
              </p>
            </article>
          ) : (
            <div
              className={cn(
                "flex h-full flex-col border-t pt-7 transition-colors duration-300",
                dark ? "border-white/12 group-hover:border-white/30" : "border-border",
              )}
            >
              {f.icon && (
                <span className="svc-icon mb-6 size-12 text-2xl [&_svg]:size-5.5" aria-hidden>
                  {f.icon}
                </span>
              )}
              <h3
                className={cn(
                  "font-display text-lg leading-snug font-semibold tracking-tight sm:text-xl",
                  dark ? "text-white" : "text-foreground",
                )}
              >
                {f.title}
              </h3>
              <p
                className={cn(
                  "mt-3 text-[15px] leading-relaxed",
                  dark ? "text-white/60" : "text-muted-foreground",
                )}
              >
                {f.desc}
              </p>
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
