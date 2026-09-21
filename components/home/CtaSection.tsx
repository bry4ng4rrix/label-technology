import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/Reveal";

const REASSURANCE = [
  "Réponse sous 72h garantie",
  "Devis gratuit et sans engagement",
  "Interlocuteur dédié dès le premier échange",
];

export default function CtaSection() {
  return (
    <section className="surface-dark noise hairline-top relative overflow-hidden py-24 sm:py-28 lg:py-36">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden
        className="halo -top-32 left-1/2 -z-10 h-[460px] w-[760px] -translate-x-1/2 bg-brand-lt/35"
      />
      <div
        aria-hidden
        className="halo -bottom-24 -left-24 -z-10 h-[320px] w-[420px] bg-indigo-600/20"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">
              <span className="pulse-dot size-1.5 rounded-full bg-emerald-400" />
              Prêt à démarrer ?
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="h2-cta mt-7 text-white">
              Votre projet mérite mieux{" "}
              <span className="gradient-text-light">qu&apos;une agence généraliste.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-display mt-6 text-lg font-medium text-brand-glow/80 italic sm:text-xl">
              Quittez la posture d&apos;acheteur. Prenez la place de partenaire.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/55">
              Décrivez-nous votre besoin. On vous répond sous 72h avec une
              proposition concrète — pas un formulaire de plus.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="xl" variant="inverse" className="rounded-full">
              <Link href="/contact">
                Parlons-en
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="glass" className="rounded-full">
              <Link href="/services">Voir nos services</Link>
            </Button>
          </Reveal>

          <Reveal delay={0.5} className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {REASSURANCE.map((item) => (
              <span key={item} className="flex items-center gap-2 text-xs text-white/50">
                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-400/80" />
                {item}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
