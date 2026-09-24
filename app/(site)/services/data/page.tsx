import type { Metadata } from "next";

import BigStats from "@/components/services/BigStats";
import EditorialHero from "@/components/services/EditorialHero";
import EditorialRow from "@/components/services/EditorialRow";
import FeatureGrid from "@/components/services/FeatureGrid";
import SectionIntro from "@/components/services/SectionIntro";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceSteps from "@/components/services/ServiceSteps";
import DataChart from "@/components/services/DataChartWrapper";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
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

      <EditorialHero
        slug="data"
        eyebrow="Traitement de données"
        title={
          <>
            Vos données
            <br />
            sont un actif.
            <br />
            <span className="gradient-text-svc-light">On les rend exploitables.</span>
          </>
        }
        description="Saisie, nettoyage, analyse, automatisation. Une équipe spécialisée pour traiter des volumes importants avec une précision garantie à 99,5 %."
        image={{ src: "/images/services/data/hero.jpg", alt: "Tableaux de bord d'analyse de données" }}
        primary={{ href: "/contact", label: "Parler de mon projet" }}
        stats={METRICS.map((m) => ({ value: m.v, label: m.l }))}
      />

      {/* Prestations — en-tête asymétrique + colonnes filetées */}
      <ServiceSection slug="data">
        <SectionIntro
          eyebrow="Nos prestations"
          title={
            <>
              De la donnée brute
              <br />
              <span className="gradient-text-svc">à la décision.</span>
            </>
          }
          description="Six prestations qui couvrent tout le cycle de vie de vos données, de la collecte jusqu'à l'archivage conforme. Mobilisables séparément ou en chaîne complète."
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
      <ServiceSection slug="data" tone="plain">
        <EditorialRow
          eyebrow="Saisie & nettoyage"
          title={
            <>
              Une base fiable vaut mieux
              <br />
              qu&apos;une grande base.
            </>
          }
          points={[
            "Double saisie indépendante sur les missions critiques",
            "Déduplication, normalisation et enrichissement documentés",
            "Rapport d'anomalies fourni à chaque livraison",
          ]}
          image={{
            src: "/images/services/data/row.jpg",
            alt: "Saisie et contrôle de documents",
          }}
          stat={{ value: "99,7 %", label: "précision moyenne constatée" }}
          cta={{ href: "/contact", label: "Confier un jeu de données" }}
          ratio="5/4"
        >
          Un fichier de 50 000 contacts dont un tiers est erroné coûte plus cher
          qu&apos;il ne rapporte. On reprend la base ligne par ligne, on trace
          chaque transformation, et on vous rend un actif exploitable.
        </EditorialRow>
      </ServiceSection>

      {/* Chiffres en très grande typo */}
      <BigStats
        slug="data"
        items={[
          { value: "99,7 %", label: "Précision moyenne sur la saisie structurée" },
          { value: "98 %", label: "Missions livrées dans les délais annoncés" },
          { value: "72 %", label: "Clients avec un contrat récurrent" },
          { value: "RGPD", label: "Conformité sur l'ensemble des traitements" },
        ]}
        caption="Nos équipes traitent des millions d'entrées chaque mois pour des clients en France, en Belgique et à Madagascar. Chaque mission est documentée, traçable et auditable."
      />

      {/* Analyse — photo à gauche cette fois */}
      <ServiceSection slug="data" tone="dark">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <DataChart />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label-tag mb-4" style={{ color: "var(--svc)" }}>
              Répartition des missions
            </p>
            <h2 className="font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-white">
              Ce qu&apos;on traite
              <br />
              au quotidien.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
              La saisie reste le premier volume, mais l&apos;analyse et
              l&apos;automatisation progressent chaque année — c&apos;est là que
              la valeur se déplace pour nos clients.
            </p>
          </Reveal>
        </div>
      </ServiceSection>

      {/* Méthode */}
      <ServiceSection slug="data" tone="plain">
        <SectionIntro
          eyebrow="Notre méthode"
          title="Rigueur à chaque étape."
          description="Le format de sortie est défini avant de commencer, pas après. On ne considère la mission terminée qu'à votre validation complète."
        />
        <ServiceSteps steps={PROCESS.map((p) => ({ num: p.num, title: p.title, desc: p.desc }))} />
      </ServiceSection>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      <ServiceCta
        slug="data"
        title={
          <>
            Vos données dorment quelque part.{" "}
            <span className="gradient-text-svc-light">On les réveille.</span>
          </>
        }
        description="Envoyez-nous un échantillon : on vous dit sous 72h ce qu'on peut en tirer, avec un devis chiffré."
      />
    </ServiceScope>
  );
}
