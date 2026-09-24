import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import type { ServiceSlug } from "@/lib/service-themes";
import { getTheme } from "@/lib/service-themes";

export type HeroStat = { value: string; label: string };

/**
 * Hero éditorial : photographie plein cadre, halo d'accent derrière le sujet,
 * titre très grand sur trois lignes, puis accroche, CTA et bandeau de
 * statistiques en verre. La photo est traitée (voile + teinte) pour appartenir
 * à l'identité du service plutôt que d'être un simple fond.
 */
export default function EditorialHero({
  slug,
  eyebrow,
  title,
  description,
  stats,
  image,
  primary = { href: "/contact", label: "Démarrer un projet" },
  secondary = { href: "/projets", label: "Voir nos réalisations" },
}: {
  slug: ServiceSlug;
  eyebrow: string;
  title: ReactNode;
  description: string;
  stats?: HeroStat[];
  image: { src: string; alt: string };
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  const { pattern } = getTheme(slug);

  return (
    <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-ink pt-32 pb-16 text-white sm:min-h-[95vh] sm:pb-20 lg:pb-24">
      {/* Photographie plein cadre */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src={image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Traitement : lisibilité, puis identité du service */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/80 to-ink/45" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-transparent" />
        <div
          className="absolute inset-0 mix-blend-color"
          style={{ background: "var(--svc)", opacity: 0.35 }}
        />
        {/* Halo d'accent derrière le titre */}
        <div
          className="svc-blob top-[6%] -left-[10%] h-[560px] w-[620px]"
          style={{ background: "color-mix(in srgb, var(--svc) 55%, transparent)", opacity: 0.35 }}
        />
        <div className="svc-pattern" data-pattern={pattern} style={{ opacity: 0.35 }} />
      </div>

      <div className="container-x relative w-full">
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <p className="svc-badge">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: "var(--svc)" }}
                />
                {eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              {/* Grande typographie éditoriale — le titre porte la page */}
              <h1 className="font-display mt-8 text-[clamp(2.5rem,1.2rem+4.6vw,5.25rem)] leading-[0.98] font-bold tracking-[-0.035em] text-balance text-white">
                {title}
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-8 max-w-xl text-[clamp(1rem,0.95rem+0.3vw,1.1875rem)] leading-relaxed text-white/70">
                {description}
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="xl"
                  className="rounded-full border-0 text-ink shadow-[0_16px_46px_-16px_var(--svc)] hover:-translate-y-px"
                  style={{ background: "var(--svc)" }}
                >
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="glass" className="rounded-full">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {stats && stats.length > 0 && (
            <Reveal delay={0.34}>
              <dl className="glass-card grid grid-cols-2 overflow-hidden" data-tone="dark">
                {stats.map((s) => (
                  <div key={s.label} className="svc-stat py-6">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span
                        className="font-display block tracking-tight text-balance"
                        style={{ color: "var(--svc)" }}
                      >
                        <span className={s.value.length > 8 ? "text-base" : "text-2xl"}>
                          {s.value}
                        </span>
                      </span>
                      <span className="mt-1 block text-[11px] font-medium text-balance text-white/55">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
