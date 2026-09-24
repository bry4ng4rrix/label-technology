import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ServiceBackground from "@/components/services/ServiceBackground";
import ServiceVisual from "@/components/services/ServiceVisual";
import Reveal from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import type { ServiceSlug } from "@/lib/service-themes";
import { cn } from "@/lib/utils";

export type HeroStat = { value: string; label: string };

/**
 * Hero de page service.
 *
 * Composition : badge de verre → titre dominant → accroche → deux CTA →
 * bandeau de statistiques, avec à droite une illustration SVG propre au
 * service posée sur une carte de verre. Le fond est entièrement en CSS.
 */
export default function ServiceHero({
  slug,
  eyebrow,
  title,
  description,
  stats,
  primary = { href: "/contact", label: "Démarrer un projet" },
  secondary = { href: "/projets", label: "Voir nos réalisations" },
  visual,
}: {
  slug: ServiceSlug;
  eyebrow: string;
  title: ReactNode;
  description: string;
  stats?: HeroStat[];
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  visual?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 text-white sm:pt-36 lg:pt-44 lg:pb-28">
      <ServiceBackground slug={slug} tone="dark" intensity="strong" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="svc-badge">
              <span
                className="flex size-5 items-center justify-center rounded-full"
                style={{ background: "color-mix(in srgb, var(--svc) 28%, transparent)" }}
              >
                <Sparkles className="size-3" style={{ color: "var(--svc)" }} />
              </span>
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="h1-display mt-7 text-[clamp(2.25rem,1.5rem+2.9vw,4rem)] text-white">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="lead mt-6 max-w-xl text-white/65">{description}</p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full border-0 text-ink shadow-[0_14px_40px_-14px_var(--svc)] hover:-translate-y-px"
                style={{ background: "var(--svc)" }}
              >
                <Link href={primary.href}>
                  {primary.label}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass" className="rounded-full">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            </div>
          </Reveal>

          {stats && stats.length > 0 && (
            <Reveal delay={0.3}>
              <dl
                className={cn(
                  "glass-card mt-12 grid max-w-xl overflow-hidden",
                  stats.length >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3",
                )}
                data-tone="dark"
              >
                {stats.map((s) => (
                  <div key={s.label} className="svc-stat">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="font-display block text-lg tracking-tight text-white sm:text-xl">
                        {s.value}
                      </span>
                      <span className="mt-0.5 block text-[10px] font-medium text-white/50 sm:text-[11px]">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.2} className="relative">
          <div
            aria-hidden
            className="absolute inset-6 -z-10 rounded-full blur-[70px]"
            style={{ background: "color-mix(in srgb, var(--svc) 35%, transparent)" }}
          />
          {visual ?? <ServiceVisual slug={slug} />}
        </Reveal>
      </div>
    </section>
  );
}
