import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/shared/Reveal";

export default function ConstructionCta() {
  return (
    <section className="surface-dark noise hairline-top relative overflow-hidden py-24 sm:py-28 lg:py-36">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden
        className="halo -top-32 left-1/2 -z-10 h-[460px] w-[760px] -translate-x-1/2 bg-brand-lt/35"
      />

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">
              <span className="size-1.5 rounded-full bg-gold" />
              Nouvelle activité — Construction &amp; Génie Civil
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="h2-cta mt-7 text-white">
              Vous avez un projet{" "}
              <span className="gradient-text-light">de construction ?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/55">
              Notre nouvelle activité Construction est ouverte aux projets et
              collaborations. Présentez-nous votre besoin afin d&apos;étudier
              ensemble les possibilités d&apos;accompagnement.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="xl" variant="inverse" className="rounded-full">
              <Link href="/contact">
                Présenter mon projet
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="glass" className="rounded-full">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
