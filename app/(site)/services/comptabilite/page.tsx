import type { Metadata } from "next";

import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceStatBars from "@/components/services/ServiceStatBars";
import ServiceSteps from "@/components/services/ServiceSteps";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Comptabilité & Reporting — Saisie, Clôture, Tableaux de bord",
  description: "Saisie comptable, rapprochements bancaires, reporting financier mensuel, tableaux de bord dirigeants. Expertise comptable externalisée depuis Antananarivo.",
  alternates: {
    canonical: "https://labeltechnology.mg/services/comptabilite",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/services/comptabilite",
    siteName: "Label Technology",
    title: "Comptabilité & Reporting — Saisie, Clôture, Tableaux de bord | Label Technology",
    description:
      "Saisie comptable, rapprochements bancaires, reporting mensuel, tableaux de bord. Expertise comptable externalisée depuis Antananarivo.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comptabilité & Reporting | Label Technology",
    description:
      "Saisie comptable, rapprochements bancaires, reporting mensuel. Externalisé depuis Antananarivo.",
  },
};

const METRICS = [
  { v: "J+5", l: "livraison reporting" },
  { v: "100%", l: "conformité fiscale" },
  { v: "−60%", l: "temps de clôture" },
  { v: "3 ans", l: "d'expérience" },
];

const SERVICES = [
  { icon: "📒", title: "Saisie comptable", desc: "Enregistrement quotidien ou hebdomadaire de vos opérations comptables. Journaux d'achats, de ventes, de banque et d'opérations diverses. Saisie rigoureuse, vérifiée, conforme aux normes SYSCOHADA et françaises." },
  { icon: "🏦", title: "Rapprochements bancaires", desc: "Rapprochement mensuel entre vos relevés bancaires et votre comptabilité. Identification des écarts, correction des erreurs, soldes réconciliés à 100% avant transmission." },
  { icon: "📊", title: "Reporting financier", desc: "Liasses de synthèse mensuelle : compte de résultat, bilan provisoire, trésorerie prévisionnelle. Votre situation financière réelle, disponible avant le 5 de chaque mois." },
  { icon: "📋", title: "Déclarations fiscales", desc: "Préparation et suivi de vos déclarations TVA, IS et autres obligations fiscales. Respect des échéances légales, optimisation dans le cadre réglementaire." },
  { icon: "📈", title: "Tableaux de bord dirigeants", desc: "Indicateurs clés (CA, marges, charges, trésorerie) présentés de façon visuelle et synthétique. Des données qui permettent de décider vite — sans attendre l'expert-comptable annuel." },
  { icon: "🗂", title: "Archivage & conformité", desc: "Conservation sécurisée de vos pièces comptables numériques. Accès en ligne à l'historique complet, conformité aux durées légales de conservation selon le droit malgache et français." },
];

const PROCESS = [
  { num: "01", title: "Collecte des pièces", desc: "Transmission de vos factures, relevés et justificatifs via notre espace sécurisé. Scan physique ou envoi numérique — on s'adapte à votre organisation existante." },
  { num: "02", title: "Saisie & contrôle", desc: "Saisie des écritures comptables avec double vérification systématique. Chaque opération est rapprochée de son justificatif avant validation définitive." },
  { num: "03", title: "Clôture & reporting", desc: "Production des états financiers mensuels avant le 5 du mois suivant. Analyse des écarts significatifs, alertes en cas d'anomalie détectée." },
  { num: "04", title: "Revue & transmission", desc: "Rapport mensuel transmis à votre expert-comptable ou directement à la direction. Disponibilité pour répondre à toute question sur les chiffres produits." },
];

const TESTIMONIALS = [
  { quote: "On externalisait notre saisie comptable en interne à un employé à mi-temps. Depuis qu'on travaille avec Label Technology, le reporting est disponible le 4 du mois, sans relance, sans erreur. On a réaffecté cet employé à un poste à valeur ajoutée.", author: "Lanto R.", role: "Directrice Financière", company: "Groupe retail, Antananarivo" },
  { quote: "Notre clôture mensuelle prenait 8 jours. Elle prend maintenant 2 jours. L'équipe comprend les spécificités SYSCOHADA et peut aussi gérer la présentation selon les normes françaises pour nos actionnaires européens.", author: "Jean-Marc V.", role: "DAF", company: "Filiale industrielle, Madagascar" },
  { quote: "Les tableaux de bord qu'ils produisent sont clairs, visuels, lisibles par mes équipes commerciales. Je n'ai plus besoin d'attendre l'expert-comptable pour savoir où on en est.", author: "Sonia A.", role: "CEO", company: "Cabinet conseil, Antananarivo" },
];

const FAQ = [
  { q: "Travaillez-vous avec des entreprises françaises soumises aux normes françaises ?", a: "Oui. Notre équipe maîtrise les deux référentiels : SYSCOHADA pour Madagascar et le Plan Comptable Général (PCG) pour la France. On peut produire des états financiers conformes à l'un ou l'autre selon vos besoins." },
  { q: "Comment nous transmettez-vous les documents à traiter ?", a: "Via un espace sécurisé (Google Drive partagé ou plateforme dédiée). Vos factures, relevés et justificatifs sont déposés en ligne — on s'occupe du reste. Pas de transfert papier nécessaire." },
  { q: "Pouvez-vous travailler avec notre logiciel comptable existant ?", a: "On s'adapte à la plupart des logiciels courants : Sage, QuickBooks, EBP, Odoo, Cegid. Si vous n'avez pas de logiciel, on peut recommander une solution adaptée à votre volume et votre budget." },
  { q: "La comptabilité externalisée remplace-t-elle un expert-comptable ?", a: "Non — on est complémentaires. On prend en charge la saisie quotidienne et le reporting de gestion, ce qui allège considérablement le travail de votre expert-comptable et réduit vos honoraires annuels." },
];

const COMPARATIF = [
  { label: "Coût mensuel estimé", interne: "800–1 500 €", externe: "250–600 €" },
  { label: "Délai de reporting", interne: "10–15 jours", externe: "Avant J+5" },
  { label: "Risque d'erreur", interne: "Dépend du profil", externe: "Double contrôle systématique" },
  { label: "Disponibilité", interne: "Congés, turnover", externe: "Continuité garantie" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Comptabilité & Reporting",
  url: "https://labeltechnology.mg/services/comptabilite",
  description:
    "Saisie comptable, rapprochements bancaires, reporting financier mensuel et tableaux de bord dirigeants. Conformes SYSCOHADA et PCG français. Reporting disponible avant J+5.",
  provider: {
    "@type": "Organization",
    name: "Label Technology",
    url: "https://labeltechnology.mg",
  },
  areaServed: [
    { "@type": "Country", name: "Madagascar" },
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Belgique" },
  ],
  serviceType: "Comptabilité externalisée / BPO finance",
};

export default function ComptabilitePage() {
  return (
    <ServiceScope slug="comptabilite" as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ServiceHero
        slug="comptabilite"
        eyebrow="Comptabilité & reporting"
        title={
          <>
            Vos chiffres,
            <br />
            <span className="gradient-text-svc-light">enfin lisibles.</span>
          </>
        }
        description="Saisie comptable, rapprochements bancaires, reporting mensuel et tableaux de bord dirigeants. Des décisions fondées sur des données fiables, disponibles avant le 5 du mois."
        primary={{ href: "/contact", label: "Demander un devis" }}
        stats={METRICS.map((m) => ({ value: m.v, label: m.l }))}
      />

      {/* Prestations */}
      <ServiceSection
        slug="comptabilite"
        eyebrow="Nos prestations"
        title={
          <>
            La comptabilité <span className="gradient-text-svc">qui libère du temps.</span>
          </>
        }
        description="Externalisez la saisie et le contrôle, gardez la décision — avec un reporting mensuel qui arrive avant le 5."
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

      {/* En chiffres */}
      <ServiceSection
        slug="comptabilite"
        tone="dark"
        eyebrow="Impact concret"
        title={
          <>
            Moins de temps sur les chiffres,
            <br />
            plus de temps pour décider.
          </>
        }
        description="L'externalisation comptable réduit vos coûts fixes, élimine les risques d'erreur et vous donne accès à un reporting mensuel structuré — sans recruter ni former un comptable en interne."
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ServiceStatBars
            items={[
              { label: "Réduction du délai de clôture mensuelle", value: "60%" },
              { label: "Conformité fiscale garantie", value: "100%" },
              { label: "Disponibilité du reporting avant J+5", value: "98%" },
            ]}
          />
          <Reveal delay={0.15}>
            {/* Comparatif interne / externalisé — carte de verre, pas de graphique ici */}
            <div className="glass-card p-6 sm:p-8" data-tone="dark">
              <p className="label-tag mb-6" style={{ color: "var(--svc)" }}>
                Comparatif — interne vs externalisé
              </p>
              <div className="space-y-5">
                {COMPARATIF.map((r) => (
                  <div key={r.label} className="grid grid-cols-3 gap-2 border-b border-white/8 pb-4 text-sm">
                    <span className="text-white/55">{r.label}</span>
                    <span className="text-center text-white/45">{r.interne}</span>
                    <span className="text-center font-medium" style={{ color: "var(--svc)" }}>
                      {r.externe}
                    </span>
                  </div>
                ))}
                <div className="label-tag grid grid-cols-3 gap-2 text-white/35">
                  <span />
                  <span className="text-center">En interne</span>
                  <span className="text-center" style={{ color: "var(--svc)" }}>
                    Externalisé
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </ServiceSection>

      {/* Méthode */}
      <ServiceSection
        slug="comptabilite"
        tone="plain"
        eyebrow="Notre méthode"
        title="Simple, régulier, sans surprise."
        description="Un rythme mensuel cadré, les mêmes livrables chaque mois, aux mêmes dates."
      >
        <ServiceSteps steps={PROCESS.map((p) => ({ num: p.num, title: p.title, desc: p.desc }))} />
      </ServiceSection>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      <ServiceCta
        slug="comptabilite"
        title={
          <>
            Reprenez la main <span className="gradient-text-svc-light">sur vos chiffres.</span>
          </>
        }
        description="Parlons de votre volume et de vos échéances : on vous propose un forfait mensuel clair sous 72h."
      />
    </ServiceScope>
  );
}
