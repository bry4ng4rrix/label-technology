import PhotoPanel from "@/components/services/PhotoPanel";
import Reveal from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * Mosaïque asymétrique : une photo haute et une photo large, décalées, avec
 * un bloc de texte qui vient s'intercaler. Évite l'effet « galerie » aligné
 * et garde le rythme éditorial de la page.
 */
export default function PhotoMosaic({
  images,
  eyebrow,
  title,
  children,
  tone = "light",
}: {
  images: [{ src: string; alt: string }, { src: string; alt: string }];
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <Reveal>
        {eyebrow && (
          <p className="label-tag mb-4" style={{ color: "var(--svc)" }}>
            {eyebrow}
          </p>
        )}
        <h3
          className={cn(
            "font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-balance",
            dark ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h3>
        {children && (
          <div
            className={cn(
              "mt-5 max-w-lg text-[15px] leading-relaxed",
              dark ? "text-white/60" : "text-muted-foreground",
            )}
          >
            {children}
          </div>
        )}
      </Reveal>

      {/* Deux photos décalées verticalement — composition asymétrique */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        <Reveal delay={0.08} className="pt-8 sm:pt-12">
          <PhotoPanel
            src={images[0].src}
            alt={images[0].alt}
            ratio="3/4"
            tone={tone}
            sizes="(max-width: 1024px) 45vw, 26vw"
          />
        </Reveal>
        <Reveal delay={0.16}>
          <PhotoPanel
            src={images[1].src}
            alt={images[1].alt}
            ratio="4/3"
            tone={tone}
            sizes="(max-width: 1024px) 45vw, 26vw"
          />
        </Reveal>
      </div>
    </div>
  );
}
