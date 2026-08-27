import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import ProjectTypesGrid from "@/components/construction/ProjectTypesGrid";
import ActivityNotice from "@/components/construction/ActivityNotice";
import ConstructionCta from "@/components/construction/ConstructionCta";

export const metadata: Metadata = {
  title: "Construction & Génie Civil — Nouvelle activité | Label Technology",
  description:
    "Label Technology développe une nouvelle expertise dédiée à la construction, au génie civil et aux infrastructures à Madagascar. Découvrez notre approche et nos domaines d'intervention.",
  keywords: [
    "construction Madagascar",
    "génie civil Madagascar",
    "BTP Madagascar",
    "construction Antananarivo",
    "entreprise construction Madagascar",
    "projets immobiliers Madagascar",
    "infrastructure Madagascar",
    "travaux publics Madagascar",
    "étude construction Madagascar",
  ],
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Construction & Génie Civil — Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction & Génie Civil | Label Technology",
    description: "Une nouvelle expertise dédiée à la construction et au génie civil, depuis Antananarivo.",
    images: ["/og-image.png"],
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="relative min-h-[65vh] flex flex-col justify-center grid-bg px-6 pt-24 pb-16"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, var(--brand) 0%, transparent 70%)" }}
        />
        <Reveal className="relative max-w-7xl mx-auto w-full">
          <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>
            NOUVELLE ACTIVITÉ — CONSTRUCTION &amp; GÉNIE CIVIL
          </p>
          <h1 className="h1-display text-white mb-6">
            Construire<br />
            <span style={{ color: "var(--brand-lt)" }}>les projets de demain.</span>
          </h1>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl mb-10">
            Label Technology développe une nouvelle expertise dédiée au génie
            civil, à la construction et aux infrastructures, avec une approche
            centrée sur la qualité, la précision et la maîtrise du projet.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm transition-all hover:opacity-90 hover:scale-105 duration-300"
              style={{ backgroundColor: "var(--brand)", color: "#fff" }}
            >
              Parler de votre projet →
            </Link>
            <Link
              href="#domaines"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all"
            >
              Découvrir nos expertises
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Présentation */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>PRÉSENTATION</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-foreground">
              Une nouvelle expertise pour accompagner vos projets.
            </h2>
            <div className="space-y-5 text-[15px] md:text-lg font-light leading-relaxed text-muted-foreground" style={{ lineHeight: 1.8 }}>
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
      <section id="domaines" className="py-24 px-6 bg-background scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOS DOMAINES D&apos;INTERVENTION</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-foreground">
              Nos domaines d&apos;intervention.
            </h2>
            <p className="text-[15px] mb-16 max-w-xl text-muted-foreground">
              Une offre en construction pensée pour répondre progressivement
              aux différents besoins de nos futurs clients.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
            {DOMAINES.map((d, i) => {
              const content = (
                <>
                  <div className="font-display text-3xl mb-4" style={{ color: "var(--brand)", opacity: 0.3 }}>{d.num}</div>
                  <h3 className="font-display text-lg mb-2 text-foreground">{d.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>{d.desc}</p>
                  {d.href && (
                    <span className="inline-flex items-center gap-2 text-xs font-medium mt-4" style={{ color: "var(--brand)" }}>
                      En savoir plus →
                    </span>
                  )}
                </>
              );
              return (
                <Reveal key={i} delay={i * 0.05} className="bg-card">
                  {d.href ? (
                    <Link href={d.href} className="group block p-7 h-full card-hover">
                      {content}
                    </Link>
                  ) : (
                    <div className="p-7 h-full">{content}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notre approche */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE MÉTHODE</p>
            <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
              Une approche structurée avant chaque projet.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-5 gap-px bg-border/30">
            {APPROCHE.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} className="p-7 bg-card h-full">
                <div className="font-display text-4xl mb-5" style={{ color: "var(--brand)", opacity: 0.3 }}>{p.num}</div>
                <h3 className="font-display text-base mb-2 text-foreground">{p.title}</h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi cette activité */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--ink)" }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="label-tag mb-6" style={{ color: "var(--brand-lt)" }}>POURQUOI LA CONSTRUCTION ?</p>
          <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-6" style={{ lineHeight: 1.8 }}>
            Les projets de construction nécessitent aujourd&apos;hui plus
            qu&apos;une simple exécution technique. Ils demandent de la
            préparation, de la coordination, de la documentation et une
            vision globale du projet.
          </p>
          <p className="text-white/50 text-base font-light leading-relaxed" style={{ lineHeight: 1.8 }}>
            Label Technology souhaite progressivement mettre son savoir-faire
            organisationnel et technologique au service de ce secteur afin de
            contribuer à des projets plus structurés, mieux suivis et mieux
            documentés.
          </p>
        </Reveal>
      </section>

      {/* Technologie + Construction */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE DIFFÉRENCE</p>
              <h2 className="font-display text-4xl md:text-5xl mb-6 text-foreground leading-tight">
                Quand la technologie<br />rencontre la construction.
              </h2>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground mb-4" style={{ lineHeight: 1.8 }}>
                Notre différence&nbsp;: ne pas opposer technologie et
                construction. Nous cherchons à rapprocher les deux pour
                rendre les projets plus simples à suivre, plus transparents
                et mieux structurés.
              </p>
              <p className="font-display text-lg italic text-muted-foreground">
                &laquo;&nbsp;Le chantier est physique. Son pilotage peut être
                numérique.&nbsp;&raquo;
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {TECH_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-light border border-border rounded-sm bg-card text-foreground"
                  >
                    <span style={{ color: "var(--gold)" }}>◆</span>
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Types de projets ciblés */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <Reveal className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>À VENIR</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Les projets que nous souhaitons accompagner.
          </h2>
        </Reveal>
        <ProjectTypesGrid />
      </section>

      <ActivityNotice />
      <ConstructionCta />
    </main>
  );
}
