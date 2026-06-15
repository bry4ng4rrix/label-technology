import type { Metadata } from "next";
import Image from "next/image";

import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Link from "next/link";

import MarketingChart from "@/components/services/MarketingChartWrapper";

export const metadata: Metadata = {
  title: "Marketing Digital — SEO, Google Ads, Social Media | Label Technology",
  description: "Stratégie digitale, SEO, publicité payante, social media, email marketing. Résultats mesurables depuis Antananarivo. Audit gratuit en 72h.",
};

const METRICS = [
  { v: "+180%", l: "trafic SEO moyen" },
  { v: "×2.4", l: "amélioration CPA" },
  { v: "6 mois", l: "résultats durables" },
  { v: "MG/AF/EU", l: "marchés couverts" },
];

const SERVICES = [
  { icon: "🎯", title: "Stratégie digitale", desc: "Audit complet de présence, positionnement concurrentiel, plan d'action sur 90 jours. On définit les canaux qui convertissent pour votre marché, pas les canaux à la mode du moment." },
  { icon: "🔍", title: "SEO & Contenu", desc: "Référencement naturel long terme. Audit technique approfondi, stratégie de mots-clés, production de contenus optimisés. Des résultats durables qui ne disparaissent pas quand vous coupez le budget." },
  { icon: "📣", title: "Publicité digitale", desc: "Google Ads, Meta Ads, LinkedIn Ads. Campagnes orientées ROI avec suivi de conversion précis. Chaque euro dépensé est tracé, analysé et optimisé en continu." },
  { icon: "📱", title: "Social Media", desc: "Community management, création de contenus visuels, calendrier éditorial mensuel. Une présence cohérente sur les réseaux pertinents pour votre audience, pas sur tous les réseaux." },
  { icon: "📧", title: "Email Marketing", desc: "Newsletters segmentées, séquences automation, nurturing de leads. Des messages qui arrivent au bon moment, à la bonne personne, avec le bon message." },
  { icon: "📊", title: "Analytics & Reporting", desc: "Tableaux de bord sur mesure, attribution multi-touch, rapport mensuel détaillé. Vous savez exactement ce qui fonctionne, ce qui ne fonctionne pas — et pourquoi." },
];

const PROCESS = [
  { num: "01", title: "Audit de présence", desc: "Analyse SEO technique, audit des comptes publicitaires existants, benchmark concurrentiel sur vos 5 principaux concurrents. On part de ce qui existe pour construire dessus, pas à côté." },
  { num: "02", title: "Stratégie & plan d'action", desc: "Ciblage audience précis, sélection des canaux prioritaires, objectifs SMART avec KPIs chiffrés. Un plan sur 90 jours, réaliste, mesurable et révisable." },
  { num: "03", title: "Exécution & optimisation", desc: "Création de contenus, lancement des campagnes, A/B testing hebdomadaire. On optimise en continu en fonction des données réelles, pas des intuitions." },
  { num: "04", title: "Reporting & itération", desc: "Rapport mensuel détaillé avec capture d'écran des performances, call de suivi de 30 minutes. Transparence totale sur ce qui fonctionne — et ce qu'on améliore." },
];

const TESTIMONIALS = [
  { quote: "En 6 mois de SEO, notre trafic organique a augmenté de 180%. On apparaît maintenant sur des requêtes qu'on n'aurait jamais imaginé atteindre seuls.", author: "Camille R.", role: "CEO", company: "E-commerce mode, France" },
  { quote: "Les campagnes Google Ads ont divisé notre coût d'acquisition par 2,4 en 3 mois. L'équipe sait exactement quels leviers actionner et ne dépense pas pour dépenser.", author: "Antoine M.", role: "Directeur Commercial", company: "SaaS B2B, Lyon" },
  { quote: "On leur a confié notre stratégie social media de A à Z. Notre communauté LinkedIn a triplé en 4 mois avec un engagement qu'on n'avait jamais eu.", author: "Nadia B.", role: "Responsable Marketing", company: "Cabinet conseil, Paris" },
];

const FAQ = [
  { q: "En combien de temps voit-on des résultats SEO ?", a: "Les premiers signaux positifs apparaissent en 3 à 4 mois. Un positionnement solide se construit sur 6 à 12 mois. C'est pour ça qu'on combine souvent SEO et campagnes payantes au démarrage pour couvrir les deux horizons de temps." },
  { q: "Quel budget minimum pour les campagnes Google Ads ?", a: "On recommande un minimum de 500€/mois de budget publicitaire pour avoir des données statistiquement significatives. Nos honoraires de gestion viennent en sus. En dessous de ce seuil, l'optimisation est difficile." },
  { q: "Travaillez-vous sur des marchés en dehors de la France ?", a: "Oui — France, Belgique, Suisse, Afrique francophone, Madagascar. Notre équipe bilingue FR/EN couvre aussi les marchés anglophones. Nos campagnes sont localisées culturellement, pas juste traduites." },
  { q: "Proposez-vous des contrats sans engagement ?", a: "Oui. Des missions ponctuelles (audit, stratégie) et des retainers mensuels avec préavis de 30 jours. Notre rétention vient de nos résultats, pas de clauses contractuelles." },
];

export default function MarketingPage() {
  return (
    <main>

      {/* Hero split */}
      <section className="relative overflow-hidden grid-bg" style={{ backgroundColor: "var(--ink)", minHeight: "70vh" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center" style={{ minHeight: "70vh" }}>
          <div className="py-28 lg:pr-12">
            <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>MARKETING DIGITAL</p>
            <h1 className="font-display text-white mb-6 leading-tight" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
              Votre audience existe.<br />
              <span style={{ color: "var(--brand-lt)" }}>On va la trouver.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl" style={{ lineHeight: 1.8 }}>
              SEO, publicité digitale, social media, email marketing.
              Des stratégies mesurables, pas des promesses. On parle ROI dès le premier brief.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--brand)", color: "#fff" }}>
                Obtenir un audit gratuit →
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative" style={{ minHeight: "70vh" }}>
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=700&fit=crop&q=80"
              alt="Marketing digital et analytics"
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
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOS EXPERTISES</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Du trafic à la conversion.
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

      {/* Chart résultats */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand-lt)" }}>RÉSULTATS PROUVÉS</p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight">
              Des chiffres,<br />pas des estimations.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6" style={{ lineHeight: 1.8 }}>
              Ces résultats sont des moyennes constatées sur nos clients après 6 mois
              de collaboration. Chaque campagne est différente — mais notre méthode,
              elle, produit des résultats systématiquement mesurables.
            </p>
            <div className="p-5 rounded-sm" style={{ backgroundColor: "rgba(46,85,212,0.12)", borderLeft: "3px solid var(--brand-lt)" }}>
              <p className="text-white/70 text-sm leading-relaxed">
                "On s'engage sur des KPIs chiffrés dès le départ. Si on ne les atteint pas
                au bout de 3 mois, on travaille gratuitement jusqu'à ce que ce soit le cas."
              </p>
              <p className="text-white/30 text-xs mt-2">— Engagement Label Technology</p>
            </div>
          </div>
          <MarketingChart />
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE APPROCHE</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            De l'audit aux résultats.
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
