import type { Metadata } from "next";
import Image from "next/image";

import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Link from "next/link";

import DataChart from "@/components/services/DataChartWrapper";

export const metadata: Metadata = {
  title: "Traitement de Données — Saisie, Nettoyage, Analyse | Label Technology",
  description: "Saisie de données, nettoyage, normalisation, analyse et datavisualisation. Précision garantie à 99,5%. Depuis Antananarivo, pour clients MG/AF/EU.",
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

export default function DataPage() {
  return (
    <main>

      {/* Hero split */}
      <section className="relative overflow-hidden grid-bg" style={{ backgroundColor: "var(--ink)", minHeight: "70vh" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center" style={{ minHeight: "70vh" }}>
          <div className="py-28 lg:pr-12">
            <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>TRAITEMENT DE DONNÉES</p>
            <h1 className="font-display text-white mb-6 leading-tight" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
              Vos données sont un actif.<br />
              <span style={{ color: "var(--brand-lt)" }}>On les rend exploitables.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl" style={{ lineHeight: 1.8 }}>
              Saisie, nettoyage, analyse, automatisation. Une équipe spécialisée
              pour traiter des volumes importants avec une précision garantie à 99,5%.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--brand)", color: "#fff" }}>
                Parler de mon projet →
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative" style={{ minHeight: "70vh" }}>
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=700&fit=crop&q=80"
              alt="Traitement et analyse de données"
              fill
              className="object-cover"
              style={{ opacity: 0.45 }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--ink) 0%, transparent 55%)" }} />
          </div>
        </div>
      </section>

      {/* Métriques */}
      <section style={{ backgroundColor: "var(--brand)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
          {METRICS.map((m, i) => (
            <div key={i} className="text-center py-6 px-4">
              <div className="font-display text-2xl text-white mb-1">{m.v}</div>
              <div className="label-tag text-white/55 text-[10px]">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOS PRESTATIONS</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            De la donnée brute à la décision.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-7 border border-border rounded-sm card-hover bg-card">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="font-display text-xl mb-3 text-foreground">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand-lt)" }}>EN CHIFFRES</p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight">
              Volume, rigueur<br />et confidentialité.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8" style={{ lineHeight: 1.8 }}>
              Nos équipes traitent des millions d'entrées chaque mois pour des clients
              en France, en Belgique et à Madagascar. Chaque mission est documentée,
              traçable et conforme aux exigences RGPD.
            </p>
            <div className="space-y-4">
              {[
                { l: "Précision moyenne sur saisie", v: "99.7%" },
                { l: "Missions livrées dans les délais", v: "98%" },
                { l: "Clients avec contrat récurrent", v: "72%" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/50 text-sm">{s.l}</span>
                    <span className="font-display text-sm" style={{ color: "var(--brand-lt)" }}>{s.v}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width: s.v, backgroundColor: "var(--brand-lt)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DataChart />
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE MÉTHODE</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Rigueur à chaque étape.
          </h2>
          <div className="grid md:grid-cols-4 gap-px bg-border/30">
            {PROCESS.map((p, i) => (
              <div key={i} className="p-8 bg-card">
                <div className="font-display text-5xl mb-6 opacity-15" style={{ color: "var(--brand)", lineHeight: 1 }}>{p.num}</div>
                <div className="w-8 h-0.5 mb-5" style={{ backgroundColor: "var(--brand)" }} />
                <h3 className="font-display text-lg mb-3 text-foreground">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>{p.desc}</p>
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
