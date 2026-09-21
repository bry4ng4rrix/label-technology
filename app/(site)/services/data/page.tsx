import type { Metadata } from "next";

import { ArrowRight } from "lucide-react";
import CtaSection from "@/components/home/CtaSection";
import MetricsBand from "@/components/shared/MetricsBand";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Link from "next/link";

import DataChart from "@/components/services/DataChartWrapper";

export const metadata: Metadata = {
  title: "Traitement de Données — Saisie, Nettoyage, Analyse",
  description: "Saisie de données, nettoyage, normalisation, analyse et datavisualisation. Précision garantie à 99,5%. Depuis Antananarivo, pour clients MG/AF/EU.",
  keywords: [
    "traitement données Madagascar",
    "saisie données Antananarivo",
    "data entry Madagascar",
    "nettoyage données Madagascar",
    "data cleansing Madagascar",
    "analyse données Madagascar",
    "data processing Madagascar",
    "BPO données Madagascar",
    "numérisation documents Madagascar",
    "automatisation données Madagascar",
    "ETL Madagascar",
    "datavisualisation Madagascar",
    "enrichissement données Madagascar",
    "conformité RGPD Madagascar",
    "traitement données offshore",
    "veille concurrentielle Madagascar",
    "archivage données Madagascar",
    "big data Madagascar",
    "Python data Madagascar",
    "saisie données France Madagascar",
  ],
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Traitement de Données — Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traitement de Données | Label Technology",
    description:
      "Saisie, nettoyage, normalisation, analyse. Précision 99,5% garantie. Depuis Antananarivo.",
    images: ["/og-image.png"],
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        size="lg"
        eyebrow="TRAITEMENT DE DONNÉES"
        title={
          <>
            Vos données sont un actif.
            <br />
            <span className="gradient-text-light">On les rend exploitables.</span>
          </>
        }
        description="Saisie, nettoyage, analyse, automatisation. Une équipe spécialisée pour traiter des volumes importants avec une précision garantie à 99,5%."
        image={{ src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=700&fit=crop&q=80", alt: "Traitement et analyse de données", priority: true }}
        actions={
          <>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Parler de mon projet
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass" className="rounded-full">
              <Link href="/projets">Voir nos réalisations</Link>
            </Button>
          </>
        }
      />

      <MetricsBand items={METRICS.map((m) => ({ value: m.v, label: m.l }))} />

      {/* Services */}
      <section className="surface-light section relative">
        <div className="container-x">
          <SectionHeader eyebrow="NOS PRESTATIONS" title="De la donnée brute à la décision." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div key={i} className="card-premium animate-fadeup flex h-full flex-col p-7" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand/8 text-2xl leading-none">{s.icon}</span>
                <h3 className="h3-display mb-3 text-foreground">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="surface-dark noise hairline-top section-sm relative overflow-hidden">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="animate-fadeup label-tag mb-4 inline-flex items-center gap-2.5 text-brand-glow"><span className="h-px w-6 bg-brand-glow/70" />EN CHIFFRES</p>
            <h2 className="animate-fadeup-d1 h2-display text-white mb-6">
              Volume, rigueur<br />et confidentialité.
            </h2>
            <p className="prose-body animate-fadeup-d2 mb-8 text-white/60">
              Nos équipes traitent des millions d'entrées chaque mois pour des clients
              en France, en Belgique et à Madagascar. Chaque mission est documentée,
              traçable et conforme aux exigences RGPD.
            </p>
            <div className="space-y-5">
              {[
                { l: "Précision moyenne sur saisie", v: "99.7%" },
                { l: "Missions livrées dans les délais", v: "98%" },
                { l: "Clients avec contrat récurrent", v: "72%" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="mb-1.5 flex justify-between">
                    <span className="text-sm text-white/55">{s.l}</span>
                    <span className="font-display text-sm text-brand-glow">{s.v}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div className="svc-bar h-full rounded-full" style={{ width: s.v, backgroundColor: "var(--brand-lt)", animationDelay: `${0.3 + i * 0.18}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DataChart />
        </div>
      </section>

      {/* Process */}
      <section className="section bg-background">
        <div className="container-x">
          <SectionHeader eyebrow="NOTRE MÉTHODE" title="Rigueur à chaque étape." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={i} className="card-premium svc-step animate-fadeup flex h-full flex-col p-7" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="svc-step-num font-display mb-6 text-5xl leading-none text-brand">{p.num}</div>
                <div className="svc-step-line mb-5 h-0.5 w-8 origin-left rounded-full bg-brand" />
                <h3 className="h3-display mb-3 text-foreground">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />
      <CtaSection />
    </main>
  );
}
