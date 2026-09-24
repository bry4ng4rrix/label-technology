import type { Metadata } from "next";

import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceMetrics from "@/components/services/ServiceMetrics";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceStatBars from "@/components/services/ServiceStatBars";
import ServiceSteps from "@/components/services/ServiceSteps";
import DataChart from "@/components/services/DataChartWrapper";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Traitement de Données — Saisie, Nettoyage, Analyse",
  description: "Saisie de données, nettoyage, normalisation, analyse et datavisualisation. Précision garantie à 99,5%. Depuis Antananarivo, pour clients MG/AF/EU.",
  alternates: {
    canonical: "https://labeltechnology.mg/services/data",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/services/data",
    siteName: "Label Technology",
    title: "Traitement de Données — Saisie, Nettoyage, Analyse | Label Technology",
    description:
      "Saisie de données, nettoyage, normalisation, analyse. Précision garantie à 99,5%. Depuis Antananarivo.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traitement de Données | Label Technology",
    description:
      "Saisie, nettoyage, normalisation, analyse. Précision 99,5% garantie. Depuis Antananarivo.",
  },
};

const METRICS = [
  { v: "99.5%", l: "précision garantie" },
  { v: "48h", l: "délai standard" },
  { v: "−80%", l: "temps de traitement" },
  { v: "RGPD", l: "conformité données" },
];

const SERVICES = [
  { icon: "🔄", title: "Saisie & collecte", desc: "Numérisation de documents, saisie structurée, OCR et traitement de formulaires. Précision supérieure à 99,5% garantie, délais respectés, volumes illimités. Double contrôle systématique sur les missions critiques." },
  { icon: "🧹", title: "Nettoyage & normalisation", desc: "Déduplication, mise en conformité, enrichissement et standardisation de bases de données. Vos données brutes transformées en un actif fiable, exploitable et documenté." },
  { icon: "📊", title: "Analyse & datavisualisation", desc: "Tableaux de bord sur mesure, rapports automatisés, visualisations interactives. De la donnée brute à l'insight décisionnel — présentés de façon claire pour vos équipes métier." },
  { icon: "🤖", title: "Traitement automatisé", desc: "Scripts Python/R, pipelines ETL, automatisation des flux de données récurrents. Réduisez le temps de traitement de 80% tout en améliorant la fiabilité et la traçabilité." },
  { icon: "📋", title: "Recherche & veille", desc: "Recherches documentaires approfondies, veille concurrentielle mensuelle, benchmarks sectoriels sur mesure. Livrés structurés, sourcés et prêts à l'usage pour vos décisions stratégiques." },
  { icon: "🔒", title: "Gestion & archivage", desc: "Structuration, classification, archivage conforme RGPD. Vos données accessibles en quelques secondes, sécurisées, auditables et conformes aux exigences légales européennes et malgaches." },
];

const PROCESS = [
  { num: "01", title: "Cadrage & format", desc: "Analyse de vos sources de données, formats existants, volumes et contraintes de confidentialité. On définit la structure de sortie exacte avant de commencer — pas après." },
  { num: "02", title: "Traitement & contrôle qualité", desc: "Saisie ou transformation avec double contrôle qualité indépendant. Rapport d'avancement quotidien pour les missions longues. Taux d'erreur garanti inférieur à 0,5%." },
  { num: "03", title: "Livraison structurée", desc: "Export dans le format qui vous convient : Excel, CSV, JSON, base de données SQL. Documentation complète des transformations appliquées, des règles de gestion et des anomalies détectées." },
  { num: "04", title: "Validation & ajustements", desc: "Revue avec vous, corrections si nécessaire, documentation finale de livraison. On ne considère la mission terminée qu'à votre validation complète." },
];

const TESTIMONIALS = [
  { quote: "50 000 contacts nettoyés et enrichis en 3 semaines. Le taux de délivrabilité de nos campagnes email est passé de 67% à 94%. Retour sur investissement immédiat.", author: "Julien P.", role: "Head of Growth", company: "Marketing direct, France" },
  { quote: "Ils ont numérisé 12 ans d'archives papier en 2 mois. Chaque document est indexé, recherchable, conforme RGPD. On a enfin une base documentaire exploitable.", author: "Isabelle C.", role: "Directrice Administrative", company: "Cabinet notarial, Lyon" },
  { quote: "Notre rapport de veille concurrentielle mensuel prenait 3 jours à produire en interne. Label Technology le livre en 48h, plus complet et mieux structuré.", author: "Kevin A.", role: "Directeur Stratégie", company: "Groupe industriel, Madagascar" },
];

const FAQ = [
  { q: "Comment garantissez-vous la qualité des données saisies ?", a: "Double saisie indépendante sur les missions critiques, contrôle qualité à chaque étape, rapport d'erreurs fourni à la livraison. On garantit un taux de précision supérieur à 99,5% sur les missions de saisie structurée." },
  { q: "Quels volumes pouvez-vous traiter ?", a: "De 10 000 à plusieurs millions d'entrées selon le type de traitement. Notre équipe peut scaler en 48h si le volume augmente pendant la mission. Pas de surcoût pour les volumes importants." },
  { q: "Comment sont protégées nos données sensibles ?", a: "Accès restreint aux données, NDA systématique, données traitées sur serveurs sécurisés. Nos processus sont conformes RGPD pour les données de citoyens européens. Audit de sécurité disponible sur demande." },
  { q: "Dans quels formats livrez-vous les données ?", a: "Excel, CSV, JSON, SQL, Google Sheets, ou directement dans votre CRM/base de données via API. On s'adapte à vos outils existants, pas l'inverse." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Traitement de Données",
  url: "https://labeltechnology.mg/services/data",
  description:
    "Service de traitement de données : saisie, nettoyage, normalisation, analyse et datavisualisation. Précision garantie à 99,5%. Conforme RGPD.",
  provider: {
    "@type": "Organization",
    name: "Label Technology",
    url: "https://labeltechnology.mg",
  },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Belgique" },
    { "@type": "Country", name: "Madagascar" },
  ],
  serviceType: "Traitement de données / BPO",
};

export default function DataPage() {
  return (
    <ServiceScope slug="data" as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ServiceHero
        slug="data"
        eyebrow="Traitement de données"
        title={
          <>
            Vos données sont un actif.
            <br />
            <span className="gradient-text-light">On les rend exploitables.</span>
          </>
        }
        description="Saisie, nettoyage, analyse, automatisation. Une équipe spécialisée pour traiter des volumes importants avec une précision garantie à 99,5 %."
        primary={{ href: "/contact", label: "Parler de mon projet" }}
        stats={METRICS.map((m) => ({ value: m.v, label: m.l }))}
      />

      <ServiceMetrics slug="data" items={METRICS.map((m) => ({ value: m.v, label: m.l }))} />

      {/* Prestations */}
      <ServiceSection
        slug="data"
        eyebrow="Nos prestations"
        title={
          <>
            De la donnée brute <span className="gradient-text">à la décision.</span>
          </>
        }
        description="Six prestations qui couvrent tout le cycle de vie de vos données, de la collecte à l'archivage conforme."
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

      {/* En chiffres — composition asymétrique */}
      <ServiceSection
        slug="data"
        tone="dark"
        eyebrow="En chiffres"
        title={
          <>
            Volume, rigueur
            <br />
            et confidentialité.
          </>
        }
        description="Nos équipes traitent des millions d'entrées chaque mois pour des clients en France, en Belgique et à Madagascar. Chaque mission est documentée, traçable et conforme au RGPD."
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ServiceStatBars
            items={[
              { label: "Précision moyenne sur saisie", value: "99.7%" },
              { label: "Missions livrées dans les délais", value: "98%" },
              { label: "Clients avec contrat récurrent", value: "72%" },
            ]}
          />
          <Reveal delay={0.15}>
            <DataChart />
          </Reveal>
        </div>
      </ServiceSection>

      {/* Méthode */}
      <ServiceSection
        slug="data"
        tone="plain"
        eyebrow="Notre méthode"
        title="Rigueur à chaque étape."
        description="Quatre étapes, un format de sortie défini avant de commencer, et une validation finale de votre côté."
      >
        <ServiceSteps steps={PROCESS.map((p) => ({ num: p.num, title: p.title, desc: p.desc }))} />
      </ServiceSection>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      <ServiceCta
        slug="data"
        title={
          <>
            Vos données dorment quelque part.{" "}
            <span className="gradient-text-light">On les réveille.</span>
          </>
        }
        description="Envoyez-nous un échantillon : on vous dit sous 72h ce qu'on peut en tirer, avec un devis chiffré."
      />
    </ServiceScope>
  );
}
