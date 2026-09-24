import type { Metadata } from "next";

import BigStats from "@/components/services/BigStats";
import EditorialHero from "@/components/services/EditorialHero";
import EditorialRow from "@/components/services/EditorialRow";
import FeatureGrid from "@/components/services/FeatureGrid";
import PhotoBand from "@/components/services/PhotoBand";
import PhotoMosaic from "@/components/services/PhotoMosaic";
import SectionIntro from "@/components/services/SectionIntro";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceSteps from "@/components/services/ServiceSteps";
import MarketingChart from "@/components/services/MarketingChartWrapper";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
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

      <EditorialHero
        slug="marketing"
        eyebrow="Marketing digital"
        title={
          <>
            Votre audience<br />existe déjà.
            <br />
            <span className="gradient-text-svc-light">On va la trouver.</span>
          </>
        }
        description="SEO, publicité digitale, social media, email marketing. Des stratégies mesurables, pas des promesses. On parle ROI dès le premier brief."
        image={{ src: "/images/services/marketing/hero.jpg", alt: "Tableau de bord d'analyse d'audience" }}
        primary={{ href: "/contact", label: "Obtenir un audit gratuit" }}
        stats={METRICS.map((m) => ({ value: m.v, label: m.l }))}
      />

      {/* Prestations — en-tête asymétrique + colonnes filetées */}
      <ServiceSection slug="marketing">
        <SectionIntro
          eyebrow="Nos expertises"
          title={
            <>
              Du trafic
              <br />
              <span className="gradient-text-svc">à la conversion.</span>
            </>
          }
          description="Cinq leviers activés ensemble ou séparément, toujours pilotés par la même équipe et les mêmes indicateurs — pas de silo entre acquisition et conversion."
        />
        <FeatureGrid
          items={SERVICES.map((s) => ({
            icon: <span className="text-2xl leading-none">{s.icon}</span>,
            title: s.title,
            desc: s.desc,
          }))}
        />
      </ServiceSection>

      {/* Rangée éditoriale : texte ↔ photo */}
      <ServiceSection slug="marketing" tone="plain">
        <EditorialRow
          eyebrow="Acquisition mesurable"
          title={
            <>
              Un visiteur qui ne convertit pas
              <br />
              est une dépense.
            </>
          }
          points={[
            "KPIs chiffrés posés dès le cadrage, pas après",
            "Tableau de bord partagé, accessible en continu",
            "Arbitrage budgétaire mensuel sur les canaux",
          ]}
          image={{
            src: "/images/services/marketing/row.jpg",
            alt: "Analyse de performance sur écran",
          }}
          stat={{ value: "−38 %", label: "coût par lead après six mois" }}
          cta={{ href: "/contact", label: "Demander mon audit" }}
          ratio="5/4"
        >
          On s'engage sur des indicateurs chiffrés dès le départ. Si on ne les atteint pas au bout de trois mois, on travaille gratuitement jusqu'à ce que ce soit le cas.
        </EditorialRow>
      </ServiceSection>


      {/* Deuxième rangée éditoriale — photo à gauche */}
      <ServiceSection slug="marketing">
        <EditorialRow
          reverse
          eyebrow="Pilotage"
          title={
            <>
              Ce qui se mesure
              <br />
              se pilote.
            </>
          }
          points={[
            "Tableau de bord partagé, mis à jour en continu",
            "Arbitrage budgétaire mensuel entre les canaux",
            "Attribution claire de chaque euro dépensé",
          ]}
          image={{ src: "/images/services/marketing/row2.jpg", alt: "Tableau de bord d'analyse d'audience" }}
          stat={{ value: "+180 %", label: "trafic organique sur douze mois" }}
          ratio="4/3"
        >
          On ne vous envoie pas un rapport PDF en fin de mois. Vous avez accès au tableau de bord en permanence, avec les mêmes chiffres que nous.
        </EditorialRow>
      </ServiceSection>

      {/* Bandeau photographique — temps fort éditorial */}
      <PhotoBand
        slug="marketing"
        image={{ src: "/images/services/marketing/band.jpg", alt: "Équipe en session de travail collaboratif" }}
        eyebrow="Notre engagement"
        title={<>Des KPIs chiffrés<br />dès le premier brief.</>}
        stats={[
          { value: "×2,4", label: "coût par acquisition" },
          { value: "6 mois", label: "résultats durables" },
          { value: "MG/AF/EU", label: "marchés couverts" },
        ]}
      >
        Si les objectifs ne sont pas atteints au bout de trois mois, on continue sans facturer jusqu'à ce qu'ils le soient.
      </PhotoBand>

      {/* Chiffres en très grande typo */}
      <BigStats
        slug="marketing"
        items={[
          { value: "+180 %", label: "Trafic SEO moyen sur douze mois" },
          { value: "×2,4", label: "Amélioration du coût par acquisition" },
          { value: "6 mois", label: "Délai moyen pour des résultats durables" },
          { value: "MG/AF/EU", label: "Marchés couverts par nos campagnes" },
        ]}
        caption="Moyennes constatées chez nos clients après six mois de collaboration. Chaque campagne est différente — la méthode, elle, produit des résultats systématiquement mesurables."
      />

      {/* Analyse — photo à gauche cette fois */}
      <ServiceSection slug="marketing" tone="dark">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <MarketingChart />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label-tag mb-4" style={{ color: "var(--svc)" }}>
              Résultats prouvés
            </p>
            <h2 className="font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-white">
              Des chiffres,
              <br />
              pas des estimations.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
              Performance par canal sur l'ensemble de nos campagnes. Le référencement naturel reste le levier le plus rentable à moyen terme.
            </p>
          </Reveal>
        </div>
      </ServiceSection>



      {/* Mosaïque asymétrique */}
      <ServiceSection slug="marketing" tone="plain">
        <PhotoMosaic
          eyebrow="Stratégie & contenu"
          title={
            <>
              Une audience ne s'achète pas,
              <br />
              elle se construit.
            </>
          }
          images={[
            { src: "/images/services/marketing/mosaic-a.jpg", alt: "Atelier de stratégie sur tableau" },
            { src: "/images/services/marketing/mosaic-b.jpg", alt: "Réunion d'équipe marketing" },
          ]}
        >
          Contenu éditorial, référencement naturel, campagnes payantes et réseaux sociaux travaillent ensemble. Le payant amorce, l'organique installe.
        </PhotoMosaic>
      </ServiceSection>

      {/* Méthode */}
      <ServiceSection slug="marketing" tone="plain">
        <SectionIntro
          eyebrow="Notre approche"
          title="De l'audit aux résultats."
          description="Quatre étapes, des indicateurs posés dès le cadrage, et un reporting qui ne cache rien."
        />
        <ServiceSteps steps={PROCESS.map((p) => ({ num: p.num, title: p.title, desc: p.desc }))} />
      </ServiceSection>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      <ServiceCta
        slug="marketing"
        title={
          <>
            Votre audience vous cherche. <span className="gradient-text-svc-light">Soyez trouvable.</span>
          </>
        }
        description="Audit gratuit de votre présence digitale sous 72h : ce qui fonctionne, ce qui fuit, et par quoi commencer."
      />
    </ServiceScope>
  );
}
