import type { Metadata } from "next";
import Image from "next/image";
import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comptabilité & Reporting — Saisie, Clôture, Tableaux de bord | Label Technology",
  description: "Saisie comptable, rapprochements bancaires, reporting financier mensuel, tableaux de bord dirigeants. Expertise comptable externalisée depuis Antananarivo.",
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

export default function ComptabilitePage() {
  return (
    <main>

      {/* Hero split */}
      <section className="relative overflow-hidden grid-bg" style={{ backgroundColor: "var(--ink)", minHeight: "70vh" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center" style={{ minHeight: "70vh" }}>
          <div className="py-28 lg:pr-12">
            <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>COMPTABILITÉ & REPORTING</p>
            <h1 className="font-display text-white mb-6 leading-tight" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
              Vos chiffres,<br />
              <span style={{ color: "var(--brand-lt)" }}>enfin lisibles.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl" style={{ lineHeight: 1.8 }}>
              Saisie comptable, rapprochements bancaires, reporting mensuel
              et tableaux de bord dirigeants. Des décisions fondées sur des
              données fiables, disponibles avant le 5 du mois.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--brand)", color: "#fff" }}>
                Demander un devis →
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative" style={{ minHeight: "70vh" }}>
            <Image
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=700&fit=crop&q=80"
              alt="Comptabilité et reporting financier"
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
            La comptabilité qui libère du temps.
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

      {/* Stats section */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand-lt)" }}>IMPACT CONCRET</p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight">
              Moins de temps sur les chiffres,<br />plus de temps pour décider.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8" style={{ lineHeight: 1.8 }}>
              L'externalisation comptable réduit vos coûts fixes, élimine les
              risques d'erreur et vous donne accès à un reporting mensuel
              structuré — sans recruter ni former un comptable en interne.
            </p>
            <div className="space-y-4">
              {[
                { l: "Réduction du délai de clôture mensuelle", v: "−60%" },
                { l: "Conformité fiscale garantie", v: "100%" },
                { l: "Disponibilité du reporting avant J+5", v: "98%" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-sm"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-white/50 text-sm">{s.l}</span>
                  <span className="font-display text-lg font-bold" style={{ color: "var(--brand-lt)" }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="label-tag text-[10px] mb-6" style={{ color: "var(--brand-lt)" }}>COMPARATIF — INTERNE VS EXTERNALISÉ</p>
            <div className="space-y-5">
              {[
                { label: "Coût mensuel estimé", interne: "800–1 500€", externe: "250–600€" },
                { label: "Délai de reporting", interne: "10–15 jours", externe: "Avant J+5" },
                { label: "Risque d'erreur", interne: "Dépend du profil", externe: "Double contrôle systématique" },
                { label: "Disponibilité", interne: "Congés, turnover", externe: "Continuité garantie" },
              ].map((r, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 text-sm border-b pb-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span className="text-white/40">{r.label}</span>
                  <span className="text-white/40 text-center">{r.interne}</span>
                  <span className="font-medium text-center" style={{ color: "var(--brand-lt)" }}>{r.externe}</span>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-2 text-[10px] label-tag" style={{ color: "rgba(255,255,255,0.2)" }}>
                <span></span>
                <span className="text-center">EN INTERNE</span>
                <span className="text-center" style={{ color: "var(--brand-lt)" }}>EXTERNALISÉ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE MÉTHODE</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Simple, régulier, sans surprise.
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
