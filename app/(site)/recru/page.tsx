import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import JobsList from "@/components/recru/JobsList";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { supabase, type JobOffer } from "@/lib/supabase";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Recrutement — Offres d'emploi Label Technology",
  description:
    "Rejoignez Label Technology à Antananarivo : offres d'emploi en Développement, Marketing Digital, Digitalisation, Data, Comptabilité et Infrastructure IT.",
  alternates: {
    canonical: "https://labeltechnology.mg/recru",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/recru",
    siteName: "Label Technology",
    title: "Recrutement — Offres d'emploi Label Technology",
    description:
      "Rejoignez une équipe de 16+ collaborateurs à Antananarivo. Développement, Marketing, Data, Comptabilité, Infrastructure.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recrutement | Label Technology",
    description:
      "Découvrez nos offres d'emploi à Antananarivo, tous domaines confondus.",
  },
};

export default async function RecruPage() {
  const { data } = await supabase
    .from("job_offers")
    .select("*")
    .eq("published", true)
    .order("order", { ascending: true })
    .returns<JobOffer[]>();
  const offres = data ?? [];

  return (
    <main>
      <PageHero
        eyebrow="Recrutement"
        title={
          <>
            Construisez la suite
            <br />
            <span className="gradient-text-light">avec nous.</span>
          </>
        }
        description="16+ collaborateurs, 6 expertises. Développement, Marketing, Digitalisation, Data, Comptabilité, Infrastructure — toutes nos offres, à Antananarivo."
      />

      <JobsList offres={offres} />

      {/* CTA candidature spontanée — inutile si l'état vide l'affiche déjà */}
      {offres.length > 0 && (
      <section className="surface-dark noise hairline-top relative overflow-hidden py-24 sm:py-28 lg:py-32">
        <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-70" />
        <div
          aria-hidden
          className="halo -top-32 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 bg-brand-lt/30"
        />

        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-tag animate-fadeup mb-6 inline-flex items-center gap-2.5 text-brand-glow">
              <span className="h-px w-6 bg-brand-glow/70" />
              Aucune offre ne correspond ?
              <span className="h-px w-6 bg-brand-glow/70" />
            </p>
            <h2 className="h2-cta animate-fadeup-d1 text-white">
              Envoyez-nous{" "}
              <span className="gradient-text-light">une candidature spontanée.</span>
            </h2>
            <p className="animate-fadeup-d2 mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/55">
              On grandit vite et de nouveaux postes s&apos;ouvrent régulièrement.
              Parlez-nous de vous, on revient vers vous sous 72h.
            </p>

            <div className="animate-fadeup-d3 mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="xl" variant="inverse" className="rounded-full">
                <a href="mailto:recrutement@labeltechnology.mg?subject=Candidature%20spontan%C3%A9e">
                  <Mail data-icon="inline-start" />
                  recrutement@labeltechnology.mg
                </a>
              </Button>
              <Button asChild size="xl" variant="glass" className="rounded-full">
                <Link href="/contact">
                  Nous contacter
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      )}
    </main>
  );
}
