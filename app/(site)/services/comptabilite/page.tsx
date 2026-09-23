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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        size="lg"
        eyebrow="COMPTABILITÉ & REPORTING"
        title={
          <>
            Vos chiffres,
            <br />
            <span className="gradient-text-light">enfin lisibles.</span>
          </>
        }
        description="Saisie comptable, rapprochements bancaires, reporting mensuel et tableaux de bord dirigeants. Des décisions fondées sur des données fiables, disponibles avant le 5 du mois."
        image={{ src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=700&fit=crop&q=80", alt: "Comptabilité et reporting financier", priority: true }}
        actions={
          <>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Demander un devis
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
          <SectionHeader eyebrow="NOS PRESTATIONS" title="La comptabilité qui libère du temps." />
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

      {/* Stats section */}
      <section className="surface-dark noise hairline-top section-sm relative overflow-hidden">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="animate-fadeup label-tag mb-4 inline-flex items-center gap-2.5 text-brand-glow"><span className="h-px w-6 bg-brand-glow/70" />IMPACT CONCRET</p>
            <h2 className="animate-fadeup-d1 h2-display text-white mb-6">
              Moins de temps sur les chiffres,<br />plus de temps pour décider.
            </h2>
            <p className="prose-body animate-fadeup-d2 mb-8 text-white/60">
              L'externalisation comptable réduit vos coûts fixes, élimine les
              risques d'erreur et vous donne accès à un reporting mensuel
              structuré — sans recruter ni former un comptable en interne.
            </p>
            <div className="space-y-5">
              {[
                { l: "Réduction du délai de clôture mensuelle", v: "−60%" },
                { l: "Conformité fiscale garantie", v: "100%" },
                { l: "Disponibilité du reporting avant J+5", v: "98%" },
              ].map((s, i) => (
                <div key={i} className="glass-dark animate-fadeup flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-white/8"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                  <span className="text-sm text-white/55">{s.l}</span>
                  <span className="font-display text-lg font-bold text-brand-glow">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-dark animate-fadeup-d2 rounded-3xl p-6 sm:p-8">
            <p className="label-tag mb-6 text-brand-glow">COMPARATIF — INTERNE VS EXTERNALISÉ</p>
            <div className="space-y-5">
              {[
                { label: "Coût mensuel estimé", interne: "800–1 500€", externe: "250–600€" },
                { label: "Délai de reporting", interne: "10–15 jours", externe: "Avant J+5" },
                { label: "Risque d'erreur", interne: "Dépend du profil", externe: "Double contrôle systématique" },
                { label: "Disponibilité", interne: "Congés, turnover", externe: "Continuité garantie" },
              ].map((r, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 border-b border-white/6 pb-4 text-sm">
                  <span className="text-white/50">{r.label}</span>
                  <span className="text-center text-white/50">{r.interne}</span>
                  <span className="text-center font-medium text-brand-glow">{r.externe}</span>
                </div>
              ))}
              <div className="label-tag grid grid-cols-3 gap-2 text-white/25">
                <span></span>
                <span className="text-center">EN INTERNE</span>
                <span className="text-center text-brand-glow">EXTERNALISÉ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-background">
        <div className="container-x">
          <SectionHeader eyebrow="NOTRE MÉTHODE" title="Simple, régulier, sans surprise." />
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
