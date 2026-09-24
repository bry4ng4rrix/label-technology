import type { Metadata } from "next";

import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceSteps from "@/components/services/ServiceSteps";
import MarketingChart from "@/components/services/MarketingChartWrapper";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Marketing Digital — SEO, Google Ads, Social Media",
  description:
    "Stratégie digitale, SEO, publicité payante, social media, email marketing. Résultats mesurables depuis Antananarivo. Audit gratuit en 72h.",
  alternates: {
    canonical: "https://labeltechnology.mg/services/marketing",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/services/marketing",
    siteName: "Label Technology",
    title:
      "Marketing Digital — SEO, Google Ads, Social Media | Label Technology",
    description:
      "Stratégie digitale, SEO, publicité payante, social media, email marketing. Résultats mesurables depuis Antananarivo.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Digital — SEO, Google Ads | Label Technology",
    description:
      "SEO, Google Ads, Meta Ads, social media, email marketing. Audit gratuit en 72h depuis Antananarivo.",
  },
};

const METRICS = [
  { v: "+180%", l: "trafic SEO moyen" },
  { v: "×2.4", l: "amélioration CPA" },
  { v: "6 mois", l: "résultats durables" },
  { v: "MG/AF/EU", l: "marchés couverts" },
];

const SERVICES = [
  {
    icon: "🎯",
    title: "Stratégie digitale",
    desc: "Audit complet de présence, positionnement concurrentiel, plan d'action sur 90 jours. On définit les canaux qui convertissent pour votre marché, pas les canaux à la mode du moment.",
  },
  {
    icon: "🔍",
    title: "SEO & Contenu",
    desc: "Référencement naturel long terme. Audit technique approfondi, stratégie de mots-clés, production de contenus optimisés. Des résultats durables qui ne disparaissent pas quand vous coupez le budget.",
  },
  {
    icon: "📣",
    title: "Publicité digitale",
    desc: "Google Ads, Meta Ads, LinkedIn Ads. Campagnes orientées ROI avec suivi de conversion précis. Chaque euro dépensé est tracé, analysé et optimisé en continu.",
  },
  {
    icon: "📱",
    title: "Social Media",
    desc: "Community management, création de contenus visuels, calendrier éditorial mensuel. Une présence cohérente sur les réseaux pertinents pour votre audience, pas sur tous les réseaux.",
  },
  {
    icon: "📧",
    title: "Email Marketing",
    desc: "Newsletters segmentées, séquences automation, nurturing de leads. Des messages qui arrivent au bon moment, à la bonne personne, avec le bon message.",
  },
  {
    icon: "📊",
    title: "Analytics & Reporting",
    desc: "Tableaux de bord sur mesure, attribution multi-touch, rapport mensuel détaillé. Vous savez exactement ce qui fonctionne, ce qui ne fonctionne pas — et pourquoi.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Audit de présence",
    desc: "Analyse SEO technique, audit des comptes publicitaires existants, benchmark concurrentiel sur vos 5 principaux concurrents. On part de ce qui existe pour construire dessus, pas à côté.",
  },
  {
    num: "02",
    title: "Stratégie & plan d'action",
    desc: "Ciblage audience précis, sélection des canaux prioritaires, objectifs SMART avec KPIs chiffrés. Un plan sur 90 jours, réaliste, mesurable et révisable.",
  },
  {
    num: "03",
    title: "Exécution & optimisation",
    desc: "Création de contenus, lancement des campagnes, A/B testing hebdomadaire. On optimise en continu en fonction des données réelles, pas des intuitions.",
  },
  {
    num: "04",
    title: "Reporting & itération",
    desc: "Rapport mensuel détaillé avec capture d'écran des performances, call de suivi de 30 minutes. Transparence totale sur ce qui fonctionne — et ce qu'on améliore.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "En 6 mois de SEO, notre trafic organique a augmenté de 180%. On apparaît maintenant sur des requêtes qu'on n'aurait jamais imaginé atteindre seuls.",
    author: "Camille R.",
    role: "CEO",
    company: "E-commerce mode, France",
  },
  {
    quote:
      "Les campagnes Google Ads ont divisé notre coût d'acquisition par 2,4 en 3 mois. L'équipe sait exactement quels leviers actionner et ne dépense pas pour dépenser.",
    author: "Antoine M.",
    role: "Directeur Commercial",
    company: "SaaS B2B, Lyon",
  },
  {
    quote:
      "On leur a confié notre stratégie social media de A à Z. Notre communauté LinkedIn a triplé en 4 mois avec un engagement qu'on n'avait jamais eu.",
    author: "Nadia B.",
    role: "Responsable Marketing",
    company: "Cabinet conseil, Paris",
  },
];

const FAQ = [
  {
    q: "En combien de temps voit-on des résultats SEO ?",
    a: "Les premiers signaux positifs apparaissent en 3 à 4 mois. Un positionnement solide se construit sur 6 à 12 mois. C'est pour ça qu'on combine souvent SEO et campagnes payantes au démarrage pour couvrir les deux horizons de temps.",
  },
  {
    q: "Quel budget minimum pour les campagnes Google Ads ?",
    a: "On recommande un minimum de 500€/mois de budget publicitaire pour avoir des données statistiquement significatives. Nos honoraires de gestion viennent en sus. En dessous de ce seuil, l'optimisation est difficile.",
  },
  {
    q: "Travaillez-vous sur des marchés en dehors de la France ?",
    a: "Oui — France, Belgique, Suisse, Afrique francophone, Madagascar. Notre équipe bilingue FR/EN couvre aussi les marchés anglophones. Nos campagnes sont localisées culturellement, pas juste traduites.",
  },
  {
    q: "Proposez-vous des contrats sans engagement ?",
    a: "Oui. Des missions ponctuelles (audit, stratégie) et des retainers mensuels avec préavis de 30 jours. Notre rétention vient de nos résultats, pas de clauses contractuelles.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Marketing Digital",
  url: "https://labeltechnology.mg/services/marketing",
  description:
    "Service de marketing digital complet : SEO, Google Ads, Meta Ads, social media, email marketing. Stratégies mesurables orientées ROI depuis Antananarivo.",
  provider: {
    "@type": "Organization",
    name: "Label Technology",
    url: "https://labeltechnology.mg",
  },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Belgique" },
    { "@type": "Country", name: "Suisse" },
    { "@type": "Country", name: "Madagascar" },
    { "@type": "Continent", name: "Afrique" },
  ],
  serviceType: "Marketing digital",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Marketing Digital",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO & Référencement naturel",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Google Ads & Meta Ads" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Social Media Management" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Email Marketing & Automation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Analytics & Reporting" },
      },
    ],
  },
};

export default function MarketingPage() {
  return (
    <ServiceScope slug="marketing" as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ServiceHero
        slug="marketing"
        eyebrow="Marketing digital"
        title={
          <>
            Votre audience existe.
            <br />
            <span className="gradient-text-svc-light">On va la trouver.</span>
          </>
        }
        description="SEO, publicité digitale, social media, email marketing. Des stratégies mesurables, pas des promesses. On parle ROI dès le premier brief."
        primary={{ href: "/contact", label: "Obtenir un audit gratuit" }}
        stats={METRICS.map((m) => ({ value: m.v, label: m.l }))}
      />

      {/* Expertises */}
      <ServiceSection
        slug="marketing"
        eyebrow="Nos expertises"
        title={
          <>
            Du trafic <span className="gradient-text-svc">à la conversion.</span>
          </>
        }
        description="Cinq leviers activés ensemble ou séparément, toujours pilotés par la même équipe et les mêmes indicateurs."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
              <ServiceCard icon={<span className="text-2xl leading-none">{s.icon}</span>} title={s.title}>
                {s.desc}
              </ServiceCard>
            </Reveal>
          ))}
        </div>
      </ServiceSection>

      {/* Résultats — composition asymétrique */}
      <ServiceSection
        slug="marketing"
        tone="dark"
        eyebrow="Résultats prouvés"
        title={
          <>
            Des chiffres,
            <br />
            pas des estimations.
          </>
        }
        description="Moyennes constatées chez nos clients après six mois de collaboration. Chaque campagne est différente — la méthode, elle, produit des résultats systématiquement mesurables."
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div
              className="glass-card rounded-l-md p-6"
              data-tone="dark"
              style={{ borderLeft: "2px solid var(--svc)" }}
            >
              <p className="text-[15px] leading-relaxed text-white/75">
                &ldquo;On s&apos;engage sur des KPIs chiffrés dès le départ. Si on ne les
                atteint pas au bout de 3 mois, on travaille gratuitement jusqu&apos;à
                ce que ce soit le cas.&rdquo;
              </p>
              <p className="mt-3 text-xs text-white/45">— Engagement Label Technology</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <MarketingChart />
          </Reveal>
        </div>
      </ServiceSection>

      {/* Approche */}
      <ServiceSection
        slug="marketing"
        tone="plain"
        eyebrow="Notre approche"
        title="De l'audit aux résultats."
        description="Quatre étapes, des indicateurs posés dès le cadrage, et un reporting qui ne cache rien."
      >
        <ServiceSteps steps={PROCESS.map((p) => ({ num: p.num, title: p.title, desc: p.desc }))} />
      </ServiceSection>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      <ServiceCta
        slug="marketing"
        title={
          <>
            Votre audience vous cherche.{" "}
            <span className="gradient-text-svc-light">Soyez trouvable.</span>
          </>
        }
        description="Audit gratuit de votre présence digitale sous 72h : ce qui fonctionne, ce qui fuit, et par quoi commencer."
        primary={{ href: "/contact", label: "Obtenir mon audit gratuit" }}
      />
    </ServiceScope>
  );
}
