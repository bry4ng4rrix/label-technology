import type { Metadata } from "next";
import Image from "next/image";

import WhyMadagascar from "@/components/callcenter/WhyMadagascar";
import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Link from "next/link";

import PerformanceChart from "@/components/callcenter/PerformanceChartWrapper";

export const metadata: Metadata = {
  title: "Call Center 50 Postes FR/EN — Prospection B2B & Support Client",
  description: "Externalisez votre call center à Antananarivo. 50 postes opérationnels, bilingue FR/EN, 24h/24. Prospection B2B, qualification de fichiers, support client. Activation < 2h.",
};

const METRICS = [
  { value: "50",    label: "postes opérationnels" },
  { value: "FR/EN", label: "bilingue certifié" },
  { value: "24h/24",label: "disponibilité" },
  { value: "<2h",   label: "délai d'activation" },
];

const FORMULES = [
  {
    name: "Starter",
    seats: "5 postes",
    desc: "Pour tester et démarrer rapidement",
    items: ["Qualification de fichiers B2B", "Support entrant FR", "Reporting hebdomadaire", "Superviseur dédié"],
    cta: "Demander un devis",
    featured: false,
  },
  {
    name: "Business",
    seats: "10–20 postes",
    desc: "Pour une externalisation structurée",
    items: ["Prospection B2B sortante", "Support FR/EN", "Dashboard temps réel", "Reporting quotidien", "Formation personnalisée", "SLA garanti"],
    cta: "Demander un devis",
    featured: true,
  },
  {
    name: "Enterprise",
    seats: "20–50 postes",
    desc: "Pour une équipe dédiée complète",
    items: ["Équipe 100% dédiée", "Multi-campagnes", "Reporting sur mesure", "Intégration CRM", "Chef de projet dédié", "Astreinte 24h/24"],
    cta: "Nous contacter",
    featured: false,
  },
];

const TESTIMONIALS = [
  { quote: "On a confié notre prospection B2B à Label Technology il y a 8 mois. Notre pipeline commercial a augmenté de 65%. Les agents parlent un français impeccable et comprennent parfaitement nos produits.", author: "François B.", role: "Directeur Commercial", company: "SaaS B2B, Lyon" },
  { quote: "Notre support client 7j/7 est géré depuis Antananarivo. Le taux de satisfaction est passé de 78% à 94% en 3 mois. On ne savait pas qu'une externalisation pouvait être aussi fluide.", author: "Amélie D.", role: "Head of Customer Success", company: "E-commerce, Paris" },
  { quote: "Activation en moins de 48h, équipe formée en une semaine. Pour notre campagne de requalification de fichiers, le résultat était au-dessus de nos objectifs dès le premier mois.", author: "Christophe M.", role: "Responsable Développement", company: "Groupe assurance, France" },
];

const FAQ = [
  { q: "En combien de temps peut-on démarrer une campagne ?", a: "Activation possible en moins de 2h pour les formules Starter avec fichiers fournis. Pour les campagnes Business et Enterprise avec formation produit, comptez 2 à 5 jours ouvrés. On forme nos agents sur votre offre avant le premier appel." },
  { q: "Quel niveau de français parlent vos agents ?", a: "Nos agents sont sélectionnés sur leur niveau de français oral et écrit, formés aux accents régionaux français et aux codes culturels. La grande majorité de nos clients constatent que leurs interlocuteurs ne perçoivent pas la différence avec un centre en France." },
  { q: "Comment fonctionne le reporting ?", a: "Dashboard en temps réel accessible 24h/24, rapport quotidien par email, réunion de suivi hebdomadaire. Vous voyez en direct les volumes traités, les taux de conversion et la qualité des appels enregistrés." },
  { q: "Peut-on intégrer votre équipe à notre CRM ?", a: "Oui — intégration Salesforce, HubSpot, Pipedrive, Zoho et la plupart des CRM du marché. Pour les formules Enterprise, on configure l'accès direct à vos outils pour une synchronisation en temps réel." },
];

export default function CallCenterPage() {
  return (
    <main>

      {/* Hero split */}
      <section className="relative overflow-hidden grid-bg" style={{ backgroundColor: "var(--ink)", minHeight: "70vh" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center" style={{ minHeight: "70vh" }}>
          <div className="py-28 lg:pr-12">
            <p className="label-tag mb-5" style={{ color: "var(--gold)" }}>CALL CENTER · 50 POSTES · ANTANANARIVO</p>
            <h1 className="font-display text-white mb-6 leading-tight" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
              50 voix.<br />
              <span style={{ color: "var(--gold)" }}>Votre support permanent.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl" style={{ lineHeight: 1.8 }}>
              Prospection B2B, qualification de fichiers, support client bilingue FR/EN.
              Une équipe dédiée, disponible 24h/24 — opérationnelle en moins de 2h.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}>
                Demander un devis gratuit →
              </Link>
              <a href="#formules"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm border border-white/25 text-white rounded-sm hover:border-white/60 transition-colors">
                Voir les formules
              </a>
            </div>
          </div>
          <div className="hidden lg:block relative" style={{ minHeight: "70vh" }}>
            <Image
              src="/images/callcenter-fetra.png"
              alt="Call center Label Technology — Antananarivo"
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
              <div className="font-display text-2xl text-white mb-1">{m.value}</div>
              <div className="label-tag text-white/55 text-[10px]">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE OFFRE</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Ce qu'on fait pour vous.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📋", title: "Qualification de fichiers B2B", desc: "Enrichissement, vérification et mise à jour de vos bases de données prospects. Chaque contact est vérifié, qualifié et annoté avant d'être remis à vos commerciaux. Taux de joignabilité garanti." },
              { icon: "📞", title: "Prospection commerciale", desc: "Campagnes sortantes sur la France, l'Europe et l'Afrique. Prise de rendez-vous qualifiés directement dans l'agenda de vos commerciaux. Scripts validés avec vous avant lancement." },
              { icon: "🎧", title: "Support client FR/EN", desc: "Traitement des appels entrants, gestion des réclamations, satisfaction client. Disponible 5j/7 ou 7j/7 selon votre besoin. Agents formés sur votre produit et vos procédures." },
              { icon: "📊", title: "Enquêtes & sondages", desc: "Études de satisfaction, enquêtes NPS, sondages marché téléphoniques. Résultats structurés, analysés et livrés avec recommandations opérationnelles." },
              { icon: "📅", title: "Prise de rendez-vous", desc: "Qualification des leads inbound et prise de RDV directe dans l'agenda de vos équipes commerciales. Taux de confirmation supérieur à 85% grâce à notre process de double validation." },
              { icon: "🔄", title: "Traitement des leads entrants", desc: "Requalification des demandes web, suivi des prospects chauds, relance automatisée. Aucun lead ne tombe dans l'oubli — chaque contact est tracé jusqu'à la conversion ou la clôture." },
            ].map((s, i) => (
              <div key={i} className="p-7 border border-border rounded-sm card-hover bg-card">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="font-display text-xl mb-3 text-foreground">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--gold)" }}>PERFORMANCE EN TEMPS RÉEL</p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight">
              Des chiffres,<br />pas des promesses.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8" style={{ lineHeight: 1.8 }}>
              2 500+ appels par semaine, 96% de satisfaction client,
              durée moyenne d'appel maîtrisée. Notre infrastructure de
              monitoring vous donne une visibilité totale sur les performances
              de votre campagne en temps réel.
            </p>
            <div className="space-y-3">
              {[
                { l: "Taux de décroché", v: "94%" },
                { l: "Satisfaction client moyenne", v: "96%" },
                { l: "Missions livrées dans les SLA", v: "98%" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-sm"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-white/50 text-sm">{s.l}</span>
                  <span className="font-display text-lg font-bold" style={{ color: "var(--gold)" }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-sm overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <PerformanceChart />
          </div>
        </div>
      </section>

      {/* Formules */}
      <section id="formules" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>FORMULES</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-foreground">
            Choisissez votre format.
          </h2>
          <p className="text-base mb-16 max-w-xl text-muted-foreground">
            Tous les tarifs sont sur devis — adaptés à votre volume, vos horaires et vos objectifs.
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-border/30">
            {FORMULES.map((f, i) => (
              <div key={i} className="p-8 flex flex-col"
                style={{ backgroundColor: f.featured ? "var(--ink)" : "var(--paper)" }}>
                {f.featured && (
                  <span className="label-tag text-[10px] px-2 py-1 self-start mb-4"
                    style={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}>
                    RECOMMANDÉ
                  </span>
                )}
                <p className="label-tag text-[10px] mb-2" style={{ color: f.featured ? "rgba(255,255,255,0.3)" : "var(--mid)" }}>
                  {f.seats}
                </p>
                <h3 className="font-display text-3xl mb-2" style={{ color: f.featured ? "var(--white)" : "var(--ink)" }}>
                  {f.name}
                </h3>
                <p className="text-sm mb-8" style={{ color: f.featured ? "rgba(255,255,255,0.5)" : "#374151" }}>
                  {f.desc}
                </p>
                <ul className="space-y-2.5 mb-10 flex-1">
                  {f.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm"
                      style={{ color: f.featured ? "rgba(255,255,255,0.7)" : "#374151" }}>
                      <span style={{ color: "var(--gold)" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className="text-center label-tag text-xs px-5 py-3 rounded-sm transition-all"
                  style={f.featured
                    ? { backgroundColor: "var(--gold)", color: "var(--ink)" }
                    : { border: "1.5px solid var(--brand)", color: "var(--brand)" }}>
                  {f.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyMadagascar />
      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />
      <CtaSection />
    </main>
  );
}
