import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/shared/Reveal";

type PageHeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Colonne droite (image, illustration, composant) en layout "split". */
  aside?: ReactNode;
  /** Image de fond plein cadre, atténuée (layout "cover"). */
  image?: { src: string; alt: string; priority?: boolean };
  back?: { href: string; label: string };
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

const SIZES = {
  sm: "pt-28 pb-14 sm:pt-32 sm:pb-16",
  md: "pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24",
  lg: "pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-32",
};

/**
 * En-tête de page unifié : surface encre ambiante, grille fondue, halo,
 * hiérarchie eyebrow → h1 → lead → actions. Utilisé par toutes les pages
 * internes pour garantir une cohérence visuelle.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  image,
  back,
  size = "md",
  align = "left",
  className,
  children,
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "surface-dark noise relative overflow-hidden text-white",
        SIZES[size],
        className,
      )}
    >
      {/* Couches d'ambiance */}
      <div aria-hidden className="grid-fade absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="halo -top-40 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 bg-brand-lt/30"
      />
      <div
        aria-hidden
        className="halo -right-24 bottom-0 -z-10 h-[320px] w-[420px] bg-indigo-500/15"
      />

      {image && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt=""
            fill
            priority={image.priority}
            sizes="100vw"
            className="object-cover opacity-50 lg:opacity-70"
          />
          <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/30" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/60" />
        </div>
      )}

      <div
        className={cn(
          "container-x relative",
          aside && "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16",
        )}
      >
        <div className={cn(centered && "mx-auto max-w-3xl text-center")}>
          {back && (
            <Reveal>
              <Link
                href={back.href}
                className="mb-8 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
              >
                <ArrowLeft className="size-4" />
                {back.label}
              </Link>
            </Reveal>
          )}

          {eyebrow && (
            <Reveal>
              <p
                className={cn(
                  "label-tag mb-6 inline-flex items-center gap-2.5 text-brand-glow",
                  centered && "justify-center",
                )}
              >
                <span className="h-px w-6 bg-brand-glow/70" />
                {eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.06}>
            <h1 className="h1-display text-white">{title}</h1>
          </Reveal>

          {description && (
            <Reveal delay={0.14}>
              <p
                className={cn(
                  "lead mt-6 max-w-2xl text-white/65",
                  centered && "mx-auto",
                )}
              >
                {description}
              </p>
            </Reveal>
          )}

          {actions && (
            <Reveal delay={0.22}>
              <div
                className={cn(
                  "mt-10 flex flex-wrap items-center gap-3",
                  centered && "justify-center",
                )}
              >
                {actions}
              </div>
            </Reveal>
          )}

          {children}
        </div>

        {aside && (
          <Reveal delay={0.2} className="relative hidden lg:block">
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}
