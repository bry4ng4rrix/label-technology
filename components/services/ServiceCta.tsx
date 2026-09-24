import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ServiceBackground from "@/components/services/ServiceBackground";
import Reveal from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import type { ServiceSlug } from "@/lib/service-themes";

const DEFAULT_POINTS = [
  "Réponse sous 72h garantie",
  "Devis gratuit et sans engagement",
  "Interlocuteur dédié dès le premier échange",
];

/**
 * CTA de clôture d'une page service — même structure partout, couleur du
 * service. Remplace `CtaSection` (générique) sur les pages `services/`.
 */
export default function ServiceCta({
  slug,
  eyebrow = "Prêt à démarrer ?",
  title,
  description,
  primary = { href: "/contact", label: "Parlons-en" },
  secondary = { href: "/services", label: "Voir tous nos services" },
  points = DEFAULT_POINTS,
}: {
  slug: ServiceSlug;
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  points?: string[];
}) {
  return (
    <section className="relative overflow-hidden py-24 text-white sm:py-28 lg:py-36">
      <ServiceBackground slug={slug} tone="dark" intensity="normal" />
      <div aria-hidden className="svc-rule absolute inset-x-0 top-0" />

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="svc-badge">
              <span
                className="pulse-dot size-1.5 rounded-full"
                style={{ background: "var(--svc)" }}
              />
              {eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="h2-cta mt-7 text-white">{title}</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/60">
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
          </Reveal>

          <Reveal delay={0.4} className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {points.map((p) => (
              <span key={p} className="flex items-center gap-2 text-xs text-white/55">
                <CheckCircle2 className="size-3.5 shrink-0" style={{ color: "var(--svc)" }} />
                {p}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
