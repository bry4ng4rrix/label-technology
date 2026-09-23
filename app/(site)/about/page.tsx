import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import CtaSection from "@/components/home/CtaSection";
import MetricsBand from "@/components/shared/MetricsBand";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "@/components/shared/SectionHeader";

import GrowthChart from "@/components/apropos/GrowthChartWrapper";
import { supabase, type Testimonial } from "@/lib/supabase";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "À Propos — Label Technology, fondée en 2022 à Antananarivo",
  description:
    "4 ans d'expérience, 16+ collaborateurs, 6 pôles de services. Label Technology : la tech malgache au niveau européen. Notre histoire, nos valeurs, notre équipe.",
  alternates: {
    canonical: "https://labeltechnology.mg/about",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/about",
    siteName: "Label Technology",
    title: "À Propos — Label Technology, fondée en 2022 à Antananarivo",
    description:
      "4 ans d'expérience, 16+ collaborateurs, 6 pôles de services. Label Technology : la tech malgache au niveau européen.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos — Label Technology",
    description:
      "4 ans d'expérience, 16+ collaborateurs, 6 pôles de services. Label Technology depuis Antananarivo.",
  },
};

const VALEURS = [
  {
    num: "01",
    title: "Exigence",
    desc: "On ne livre pas ce qui est acceptable. On livre ce qui est excellent. Chaque projet sort avec la même attention, qu'il s'agisse d'une PME ou d'un grand compte.",
  },
  {
    num: "02",
    title: "Transparence",
    desc: "Pas de boîte noire. Vous voyez ce qui se passe, quand ça se passe. Reportings réguliers, communication directe, zéro surprise.",
  },
  {
    num: "03",
    title: "Réactivité",
    desc: "Madagascar = UTC+3. On travaille pendant vos heures de bureau. Délais tenus. Réponses rapides. Parce que votre temps a de la valeur.",
  },
  {
    num: "04",
    title: "Partenariat",
    desc: "On ne fait pas de la prestation. On construit des partenariats durables. Vos succès sont nos succès.",
  },
];

const CHIFFRES = [
  { value: "16+", label: "Collaborateurs" },
  { value: "4", label: "Ans d'expérience" },
  { value: "6", label: "Pôles de services" },
  { value: "FR/EN", label: "Bilingue certifié" },
  { value: "24h/24", label: "Disponibilité" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "À Propos — Label Technology",
  url: "https://labeltechnology.mg/about",
  description:
    "Label Technology, fondée en 2022 à Antananarivo. 16+ collaborateurs, 6 pôles de services, standards européens.",
  mainEntity: {
    "@type": "Organization",
    name: "Label Technology",
    foundingDate: "2022",
    foundingLocation: "Antananarivo, Madagascar",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 16 },
    url: "https://labeltechnology.mg",
  },
};

export default async function AProposPage() {
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("context", "about")
    .eq("published", true)
    .order("order", { ascending: true })
    .returns<Testimonial[]>();
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="À propos"
        title={
          <>
            Antananarivo.
            <br />
            <span className="gradient-text-light">Standards européens.</span>
          </>
        }
        description="Fondée il y a 4 ans à Madagascar, Label Technology est aujourd'hui un partenaire technologique de référence pour les entreprises françaises, africaines et malgaches."
        aside={
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="absolute inset-0 rounded-[2rem] bg-brand-lt/30 blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-2xl">
              <Image
                src="/images/services/digit.jpg"
                alt="L'équipe Label Technology au travail dans ses locaux d'Antananarivo"
                fill
                sizes="(max-width: 1024px) 0px, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
              <div className="glass-dark absolute right-4 bottom-4 left-4 rounded-2xl p-4">
                <p className="label-tag text-brand-glow">Depuis 2022</p>
                <p className="mt-1 font-display text-lg text-white">16+ talents, 6 pôles, 1 exigence.</p>
              </div>
            </div>
          </div>
        }
      />

      <MetricsBand items={CHIFFRES} />

      {/* Notre histoire */}
      <section className="surface-light section relative overflow-hidden">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="label-tag mb-4 inline-flex items-center gap-2.5 text-brand">
                <span className="h-px w-6 bg-brand/60" />
                Notre histoire
              </p>
              <h2 className="h2-display text-foreground">
                Né à Madagascar.
                <br />
                <span className="gradient-text">Pensé pour le monde.</span>
              </h2>
              <p className="font-display mt-6 border-l-2 border-brand/40 pl-5 text-lg leading-snug font-medium text-brand">
                &ldquo;Notre plus belle réussite n&apos;est pas ce que nous vendons,
                c&apos;est ce que vous devenez.&rdquo;
              </p>
              <div className="prose-body mt-8 space-y-4 text-muted-foreground">
                <p>
                  Label Technology a été fondée avec une conviction simple :
                  Madagascar dispose d&apos;un vivier de talents extraordinaire —
                  ingénieux, bilingues, réactifs — que les entreprises
                  européennes et africaines ignorent encore trop souvent.
                </p>
                <p>
                  En 4 ans, nous avons construit une équipe de 16 collaborateurs
                  couvrant 6 pôles de services complémentaires : développement
                  web et mobile, marketing digital, digitalisation, traitement
                  de données, vente de matériel informatique et comptabilité
                  externalisée.
                </p>
                <p>
                  Notre modèle : externalisation de qualité, à coût compétitif,
                  avec la transparence et l&apos;exigence d&apos;un partenaire interne.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="card-premium p-4 hover:translate-y-0 sm:p-6">
                <GrowthChart />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Manifeste */}
      <section className="surface-dark noise hairline-top relative overflow-hidden py-24 sm:py-28">
        <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-60" />
        <div
          aria-hidden
          className="halo top-1/2 left-1/2 -z-10 h-[360px] w-[640px] -translate-x-1/2 -translate-y-1/2 bg-brand-lt/25"
        />
        <Reveal className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-tag mb-8 inline-flex items-center gap-3 text-brand-glow">
              <span className="h-px w-6 bg-brand-glow/70" />
              Notre engagement
              <span className="h-px w-6 bg-brand-glow/70" />
            </p>
            <blockquote className="font-display text-[clamp(1.25rem,1rem+1.4vw,1.875rem)] leading-[1.45] font-medium tracking-tight text-white">
              &ldquo;Sur notre marché, tout le monde vend des produits. Nous avons
              choisi une autre voie. Nous pensons qu&apos;une solution n&apos;a de valeur
              que si elle est maîtrisée, alignée avec vos objectifs et génératrice
              de valeur concrète. C&apos;est pourquoi nous ne vendons rien : nous nous
              associons à votre croissance.&rdquo;
            </blockquote>
            <p className="label-tag mt-8 text-white/55">
              — Label Technology · Notre engagement depuis 2022
            </p>
          </div>
        </Reveal>
      </section>

      {/* Valeurs */}
      <section className="section bg-background">
        <div className="container-x">
          <SectionHeader eyebrow="Nos valeurs" title="Ce qui nous guide." />
          <div className="grid gap-5 md:grid-cols-2">
            {VALEURS.map((v, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div className="card-premium group flex h-full gap-6 p-7 sm:p-8">
                  <span className="font-display text-4xl leading-none text-brand/15 transition-colors duration-300 group-hover:text-brand/60">
                    {v.num}
                  </span>
                  <div>
                    <h3 className="h3-display text-foreground">{v.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nouvelles orientations */}
      <section className="surface-light section relative overflow-hidden">
        <div
          aria-hidden
          className="halo -right-20 -bottom-20 -z-10 h-[320px] w-[420px] bg-gold/10"
        />
        <Reveal className="container-x">
          <div className="glass-strong mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-12">
            <p className="label-tag mb-4 text-brand">Nouvelles orientations</p>
            <h2 className="h2-display text-foreground">Au-delà du numérique.</h2>
            <p className="prose-body mt-6 text-muted-foreground">
              Label Technology développe progressivement de nouvelles
              expertises afin d&apos;accompagner ses clients sur des
              problématiques allant au-delà du numérique.
            </p>
            <p className="prose-body mt-4 text-muted-foreground">
              Parmi ces nouvelles orientations figure le développement
              d&apos;une activité dédiée à la Construction et au Génie Civil.
            </p>
            <Link href="/construction" className="link-arrow mt-8 text-sm text-brand">
              Découvrir notre activité Construction
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <MiniTestimonials items={testimonials ?? []} />
      <CtaSection />
    </main>
  );
}
