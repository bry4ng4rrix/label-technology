import type { Metadata } from "next";
import Image from "next/image";

import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Link from "next/link";

import DevChart from "@/components/services/DevChartWrapper";

export const metadata: Metadata = {
  title: "Développement Web & Mobile — Next.js, React, Node.js",
  description: "Sites web, applications mobiles, APIs, e-commerce. Stack Next.js/React/Node.js. Standards ESN européenne, délais startup. Devis gratuit en 72h depuis Antananarivo.",
};

const METRICS = [
  { v: "800€", l: "projet à partir de" },
  { v: "3–6 sem.", l: "délai site vitrine" },
  { v: "99%", l: "satisfaction client" },
  { v: "72h", l: "devis gratuit" },
];

const SERVICES = [
  { icon: "🌐", title: "Sites & Applications Web", desc: "De la landing page au SaaS complexe. React, Next.js, architecture scalable. Livré avec les performances Core Web Vitals au vert et un score Lighthouse supérieur à 90." },
  { icon: "📱", title: "Applications Mobiles", desc: "iOS & Android natifs ou React Native cross-platform. UX pensée pour la conversion, pas pour l'esthétique seule. Déploiement App Store et Google Play inclus." },
  { icon: "⚡", title: "APIs & Back-end", desc: "Node.js, Python, bases de données relationnelles et NoSQL. Architecture microservices ou monolithe — selon ce que votre usage justifie, pas selon la mode." },
  { icon: "🔧", title: "Refonte & Migration", desc: "Legacy à moderniser ? On reprend l'existant, on le ré-architecture, on migre sans interruption de service. Vos utilisateurs ne voient rien, vous gagnez tout." },
  { icon: "🛒", title: "E-commerce", desc: "Shopify, WooCommerce, solutions sur mesure. Tunnel d'achat optimisé, intégrations paiement locales et internationales, gestion stocks en temps réel." },
  { icon: "🔒", title: "Audit & Sécurité", desc: "Revue de code, audit de sécurité, tests de pénétration applicatifs. Vos données et celles de vos clients, protégées par des experts certifiés." },
];

const STACK = ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "React Native", "Tailwind CSS", "Docker", "AWS", "Vercel", "Figma"];

const PROCESS = [
  { num: "01", title: "Audit & cadrage", desc: "Analyse de votre existant, définition des user stories, architecture technique. On ne code pas avant d'avoir compris votre métier en profondeur." },
  { num: "02", title: "Design & prototypage", desc: "Maquettes Figma validées avec vous. Charte graphique, parcours utilisateur, responsive design — avant la première ligne de code." },
  { num: "03", title: "Développement itératif", desc: "Sprints de 2 semaines avec démos régulières. Vous voyez l'application prendre forme et pouvez ajuster à chaque étape." },
  { num: "04", title: "Livraison & suivi", desc: "Mise en production, formation de vos équipes, documentation complète. On reste disponibles pour la maintenance et les évolutions." },
];

const TESTIMONIALS = [
  { quote: "L'équipe a livré notre plateforme RH en 4 mois, dans les délais et dans le budget. La qualité du code et l'architecture sont au niveau d'une ESN parisienne, pour un tiers du prix.", author: "Marc D.", role: "DSI", company: "Groupe éducatif, Madagascar" },
  { quote: "Notre site e-commerce a été refondu de A à Z. Résultat : +65% de conversions et un temps de chargement divisé par 3. On travaille maintenant sur la version mobile.", author: "Sophie L.", role: "Directrice Marketing", company: "Retailer FR, Paris" },
  { quote: "Ils ont modernisé notre API legacy en microservices sans une seule interruption de service. Migration transparente pour nos 8 000 utilisateurs quotidiens.", author: "Thomas K.", role: "CTO", company: "SaaS B2B, France" },
];

const FAQ = [
  { q: "Quels sont vos délais typiques pour un projet web ?", a: "Un site vitrine : 3 à 6 semaines. Une application web complète : 2 à 6 mois selon la complexité. On établit un planning détaillé lors du cadrage — et on le respecte." },
  { q: "Travaillez-vous avec des technologies spécifiques ou s'adaptez-vous ?", a: "On maîtrise Next.js, React, Node.js, PostgreSQL, React Native. On peut s'adapter à votre stack existante si nécessaire. On choisit toujours la technologie la plus adaptée à votre usage." },
  { q: "Comment se déroule la collaboration à distance ?", a: "Daily standup optionnel, démos hebdomadaires, Slack dédié. On est sur UTC+3 — 2h de décalage avec Paris en été. En pratique : nos clients oublient souvent qu'on est à Madagascar." },
  { q: "Proposez-vous de la maintenance après livraison ?", a: "Oui, sous forme de contrat mensuel ou de tickets à la demande. Réponse garantie sous 24h pour les bugs critiques, 48h pour les demandes standard." },
  { q: "Quel est le budget minimum pour un projet de développement ?", a: "Un site vitrine à partir de 800€. Une application web sur mesure entre 3 000€ et 15 000€. On établit un devis précis après le premier échange — gratuit et sans engagement." },
];

export default function DevPage() {
  return (
    <main>

      {/* Hero split */}
      <section className="relative overflow-hidden grid-bg" style={{ backgroundColor: "var(--ink)", minHeight: "70vh" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center" style={{ minHeight: "70vh" }}>
          <div className="py-28 lg:pr-12">
            <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>DÉVELOPPEMENT WEB & MOBILE</p>
            <h1 className="font-display text-white mb-6 leading-tight" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
              On ne livre pas du code.<br />
              <span style={{ color: "var(--brand-lt)" }}>On livre de la croissance.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl" style={{ lineHeight: 1.8 }}>
              Web, mobile, API, e-commerce. Depuis Antananarivo, avec les standards
              d'une ESN européenne et les délais d'une startup. Devis gratuit en 72h.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--brand)", color: "#fff" }}>
                Démarrer un projet →
              </Link>
              <Link href="/projets"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm border border-white/25 text-white rounded-sm hover:border-white/60 transition-colors">
                Voir nos réalisations
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative" style={{ minHeight: "70vh" }}>
            <Image
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=700&fit=crop&q=80"
              alt="Développement web et mobile"
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
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>CE QU'ON FAIT</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Du code qui travaille pour vous.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-7 border border-border rounded-sm card-hover bg-card">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="font-display text-xl mb-3 text-foreground">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart + résultats */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand-lt)" }}>NOTRE EXPERTISE</p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight">
              Une stack technique<br />maîtrisée de bout en bout.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6" style={{ lineHeight: 1.8 }}>
              Pas de sous-traitance, pas de développeurs juniors sur vos projets critiques.
              Notre équipe maîtrise chaque couche de la stack — du design à l'infrastructure.
            </p>
            <div className="space-y-3">
              {[
                { l: "Livraisons dans les délais", v: "96%" },
                { l: "Clients satisfaits ou remboursés", v: "100%" },
                { l: "Projets avec maintenance active", v: "78%" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <div className="h-full rounded-full" style={{ width: s.v, backgroundColor: "var(--brand-lt)" }} />
                  </div>
                  <span className="text-white/40 text-xs w-32 shrink-0">{s.l}</span>
                  <span className="font-display text-sm shrink-0" style={{ color: "var(--brand-lt)" }}>{s.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderLeft: "3px solid var(--brand-lt)" }}>
              <p className="text-white/70 text-sm italic leading-relaxed">
                "Parce qu'une technologie sans accompagnement n'est qu'un coût. Nous en faisons un levier."
              </p>
            </div>
          </div>
          <DevChart />
        </div>
      </section>

      {/* Stack */}
      <section className="py-16 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-8 text-center" style={{ color: "var(--brand)" }}>NOTRE STACK TECHNIQUE</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {STACK.map((tech, i) => (
              <span key={i} className="px-4 py-2 text-sm font-medium rounded-sm border"
                style={{ borderColor: "var(--brand)", color: "var(--brand)", backgroundColor: "rgba(30,63,171,0.04)" }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE MÉTHODE</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            De l'idée à la mise en ligne.
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
