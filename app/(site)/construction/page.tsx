import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EditorialHero from "@/components/services/EditorialHero";
import PhotoBand from "@/components/services/PhotoBand";
import ServiceScope from "@/components/services/ServiceScope";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectTypesGrid from "@/components/construction/ProjectTypesGrid";
import ActivityNotice from "@/components/construction/ActivityNotice";
import ConstructionCta from "@/components/construction/ConstructionCta";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Construction & Génie Civil — Nouvelle activité | Label Technology",
  description:
    "Label Technology développe une nouvelle expertise dédiée à la construction, au génie civil et aux infrastructures à Madagascar. Découvrez notre approche et nos domaines d'intervention.",
  alternates: {
    canonical: "https://labeltechnology.mg/construction",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/construction",
    siteName: "Label Technology",
    title: "Construction & Génie Civil — Nouvelle activité | Label Technology",
    description:
      "Label Technology développe une nouvelle expertise dédiée à la construction, au génie civil et aux infrastructures à Madagascar.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction & Génie Civil | Label Technology",
    description: "Une nouvelle expertise dédiée à la construction et au génie civil, depuis Antananarivo.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Domaines d'intervention — Construction Label Technology",
  url: "https://labeltechnology.mg/construction",
  description: "Nouvelle activité Construction & Génie Civil de Label Technology, en développement, depuis Antananarivo, Madagascar.",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Bâtiment Entreprise", url: "https://labeltechnology.mg/construction/entreprise" },
    { "@type": "ListItem", position: 2, name: "Travaux Routiers", url: "https://labeltechnology.mg/construction/route" },
  ],
};

const DOMAINES = [
  {
    num: "01",
    title: "Construction de bâtiments",
    desc: "Accompagnement de projets de construction résidentielle, commerciale et professionnelle.",
    href: "/construction/entreprise",
  },
  {
    num: "02",
    title: "Génie civil",
    desc: "Solutions et accompagnement autour des ouvrages, structures et infrastructures de génie civil.",
  },
  {
    num: "03",
    title: "Études techniques",
    desc: "Analyse des besoins, préparation du projet et orientation vers les solutions techniques adaptées.",
  },
  {
    num: "04",
    title: "Terrassement",
    desc: "Préparation et aménagement des terrains nécessaires à la réalisation des projets.",
  },
  {
    num: "05",
    title: "Structures",
    desc: "Solutions autour des fondations, structures en béton armé et éléments porteurs.",
  },
  {
    num: "06",
    title: "Travaux publics",
    desc: "Développement progressif d'une offre dédiée aux infrastructures, voiries et aménagements.",
    href: "/construction/route",
  },
  {
    num: "07",
    title: "Assainissement",
    desc: "Solutions liées au drainage, à l'évacuation des eaux et aux infrastructures d'assainissement.",
  },
  {
    num: "08",
    title: "Rénovation",
    desc: "Accompagnement de projets de rénovation, réhabilitation et amélioration de bâtiments existants.",
  },
];

const APPROCHE = [
  { num: "01", title: "Comprendre", desc: "Identifier précisément les besoins, les objectifs et les contraintes du projet." },
  { num: "02", title: "Étudier", desc: "Analyser le contexte du projet et définir les orientations techniques pertinentes." },
  { num: "03", title: "Planifier", desc: "Structurer les différentes étapes nécessaires à la réalisation." },
  { num: "04", title: "Coordonner", desc: "Assurer une communication claire entre les différents intervenants du projet." },
  { num: "05", title: "Accompagner", desc: "Suivre l'évolution du projet et maintenir une vision globale de ses objectifs." },
];

const TECH_ITEMS = [
  "Digitalisation des documents",
  "Gestion numérique des projets",
  "Suivi des travaux",
  "Gestion documentaire",
  "Tableaux de bord",
  "Collecte de données terrain",
  "Automatisation administrative",
  "Applications métier",
  "Suivi des ressources",
  "Reporting",
];

export default function ConstructionPage() {
  return (
    <ServiceScope slug="index" as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <EditorialHero
        slug="index"
        eyebrow="Nouvelle activité — Construction & Génie Civil"
        title={
          <>
            Construire
            <br />
            <span className="gradient-text-svc-light">les projets de demain.</span>
          </>
        }
        description="Label Technology développe une nouvelle expertise dédiée au génie civil, à la construction et aux infrastructures, avec une approche centrée sur la qualité, la précision et la maîtrise du projet."
        image={{ src: "/images/construction/hero.jpg", alt: "Chantier de construction en cours" }}
        primary={{ href: "/contact", label: "Parler de votre projet" }}
        secondary={{ href: "/construction", label: "Découvrir l'activité" }}
      />

      {/* Présentation */}
      <section className="surface-light section relative">
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl">
            <p className="label-tag mb-4 inline-flex items-center gap-2.5 text-brand">
              <span className="h-px w-6 bg-brand/60" />
              Présentation
            </p>
            <h2 className="h2-display text-foreground">
              Une nouvelle expertise pour accompagner vos projets.
            </h2>
            <div className="prose-body mt-8 space-y-5 text-muted-foreground md:text-lg">
              <p>
                Fort de son positionnement dans les services professionnels et
                technologiques, Label Technology développe progressivement une
                activité dédiée à la construction et au génie civil.
              </p>
              <p>
                Cette nouvelle offre a pour objectif d&apos;accompagner les
                particuliers, entreprises, promoteurs et organisations dans
                leurs projets de construction, d&apos;aménagement et
                d&apos;infrastructure.
              </p>
              <p>
                Notre ambition est de construire une expertise structurée
                autour d&apos;une approche rigoureuse&nbsp;: comprendre le
                besoin, étudier les contraintes, définir les solutions
                adaptées et accompagner la réalisation du projet.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Domaines d'intervention */}
      <section id="domaines" className="section scroll-mt-24 bg-background">
        <div className="container-x">
          <SectionHeader
            eyebrow="Nos domaines d'intervention"
            title="Nos domaines d'intervention."
            description="Une offre en construction pensée pour répondre progressivement aux différents besoins de nos futurs clients."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {DOMAINES.map((d, i) => {
              const content = (
                <>
                  <div className="font-display mb-5 text-3xl leading-none text-brand/25 transition-colors duration-300 group-hover:text-brand">
                    {d.num}
                  </div>
                  <h3 className="h3-display text-foreground">{d.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                  {d.href && (
                    <span className="link-arrow mt-5 text-xs text-brand">
                      En savoir plus
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </>
              );
              return (
                <Reveal key={i} delay={i * 0.05} className="h-full">
                  {d.href ? (
                    <Link href={d.href} className="card-premium group flex h-full flex-col p-7">
                      {content}
                    </Link>
                  ) : (
                    <div className="card-premium group flex h-full flex-col p-7">{content}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bandeau photographique */}
      <PhotoBand
        tint="normal"
        image={{ src: "/images/construction/band.jpg", alt: "Travaux d'infrastructure routière" }}
        eyebrow="Une activité en construction"
        title={<>Le chantier est physique.<br />Son pilotage peut être numérique.</>}
        stats={[
          { value: "2026", label: "lancement de l'activité" },
          { value: "8", label: "types de projets visés" },
          { value: "72h", label: "réponse à votre demande" },
        ]}
      >
        Nous mettons notre savoir-faire organisationnel et technologique au service du génie civil : préparation, coordination, documentation et suivi.
      </PhotoBand>

      {/* Notre approche */}
      <section className="surface-light section relative">
        <div className="container-x">
          <SectionHeader
            eyebrow="Notre méthode"
            title="Une approche structurée avant chaque projet."
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {APPROCHE.map((p, i) => (
              <Reveal key={i} delay={i * 0.06} className="h-full">
                <li className="card-premium group flex h-full flex-col p-6">
                  <div className="font-display mb-5 text-3xl leading-none text-brand/25 transition-colors duration-300 group-hover:text-brand">
                    {p.num}
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Pourquoi cette activité */}
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
              Pourquoi la construction ?
              <span className="h-px w-6 bg-brand-glow/70" />
            </p>
            <p className="font-display text-[clamp(1.125rem,1rem+1vw,1.5rem)] leading-[1.5] font-medium tracking-tight text-white">
              Les projets de construction nécessitent aujourd&apos;hui plus
              qu&apos;une simple exécution technique. Ils demandent de la
              préparation, de la coordination, de la documentation et une
              vision globale du projet.
            </p>
            <p className="prose-body mt-6 text-white/55">
              Label Technology souhaite progressivement mettre son savoir-faire
              organisationnel et technologique au service de ce secteur afin de
              contribuer à des projets plus structurés, mieux suivis et mieux
              documentés.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Technologie + Construction */}
      <section className="section bg-background">
        <div className="container-x">
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="label-tag mb-4 inline-flex items-center gap-2.5 text-brand">
                <span className="h-px w-6 bg-brand/60" />
                Notre différence
              </p>
              <h2 className="h2-display text-foreground">
                Quand la technologie
                <br />
                rencontre la construction.
              </h2>
              <p className="prose-body mt-6 text-muted-foreground">
                Notre différence&nbsp;: ne pas opposer technologie et
                construction. Nous cherchons à rapprocher les deux pour
                rendre les projets plus simples à suivre, plus transparents
                et mieux structurés.
              </p>
              <p className="font-display mt-6 border-l-2 border-brand/40 pl-5 text-lg font-medium text-brand italic">
                &laquo;&nbsp;Le chantier est physique. Son pilotage peut être
                numérique.&nbsp;&raquo;
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {TECH_ITEMS.map((item, i) => (
                  <li
                    key={i}
                    className="card-premium flex items-center gap-3 px-4 py-3.5 text-sm text-foreground hover:translate-y-0"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Types de projets ciblés */}
      <section className="surface-light section relative">
        <div className="container-x">
          <SectionHeader eyebrow="À venir" title="Les projets que nous souhaitons accompagner." />
          <ProjectTypesGrid />
        </div>
      </section>

      <ActivityNotice />
      <ConstructionCta />
    </ServiceScope>
  );
}
