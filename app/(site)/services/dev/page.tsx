import {
  Code2,
  Shield,
  ShoppingCart,
  Smartphone,
  Wrench,
  Zap,
} from "lucide-react";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceBackground from "@/components/services/ServiceBackground";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceStatBars from "@/components/services/ServiceStatBars";
import ServiceSteps from "@/components/services/ServiceSteps";
import DevChart from "@/components/services/DevChartWrapper";

const METRICS = [
  { value: "800€", label: "projet à partir de" },
  { value: "3–6 sem.", label: "délai site vitrine" },
  { value: "99%", label: "satisfaction client" },
  { value: "72h", label: "devis gratuit" },
];

const SERVICES = [
  {
    icon: Code2,
    title: "Sites & Applications Web",
    desc: "De la landing page au SaaS complexe. React, Next.js, architecture scalable. Core Web Vitals au vert et Lighthouse > 90.",
    color: "#3B82F6",
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    desc: "iOS & Android natifs ou React Native cross-platform. UX pensée pour la conversion, déploiement App Store et Google Play.",
    color: "#8B5CF6",
  },
  {
    icon: Zap,
    title: "APIs & Back-end",
    desc: "Node.js, Python, bases de données relationnelles et NoSQL. Architecture microservices ou monolithe selon vos besoins.",
    color: "#F5A623",
  },
  {
    icon: Wrench,
    title: "Refonte & Migration",
    desc: "Legacy à moderniser ? Reprendre, ré-architecturer, migrer sans interruption. Vos utilisateurs ne voient rien.",
    color: "#10B981",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    desc: "Shopify, WooCommerce, solutions sur mesure. Tunnel optimisé, intégrations paiement, gestion stocks temps réel.",
    color: "#EC4899",
  },
  {
    icon: Shield,
    title: "Audit & Sécurité",
    desc: "Revue de code, audit sécurité, tests pénétration applicatifs. Données protégées par des experts certifiés.",
    color: "#06B6D4",
  },
];

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Fastapi",
  "Django",
  "Rest Framework",
  "Supabase",
  "PostgreSQL",
  "MongoDB",
  "React Native",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "Vercel",
  "Figma",
];

const PROCESS = [
  {
    step: "01",
    title: "Audit & cadrage",
    desc: "Analyse profonde de votre existant, définition des user stories, architecture technique.",
    color: "#3B82F6",
  },
  {
    step: "02",
    title: "Design & prototypage",
    desc: "Maquettes Figma, charte graphique, parcours utilisateur, responsive design — avant la première ligne de code.",
    color: "#F5A623",
  },
  {
    step: "03",
    title: "Développement itératif",
    desc: "Sprints de 2 semaines avec démos régulières. Vous voyez l'application prendre forme et pouvez ajuster.",
    color: "#EC4899",
  },
  {
    step: "04",
    title: "Livraison & suivi",
    desc: "Production, formation équipes, documentation complète. Disponibles pour maintenance et évolutions.",
    color: "#10B981",
  },
];

const STATS = [
  { label: "Livraisons dans les délais", value: "96%", width: "96%" },
  { label: "Clients satisfaits ou remboursés", value: "100%", width: "100%" },
  { label: "Projets avec maintenance active", value: "78%", width: "78%" },
];

const TESTIMONIALS = [
  {
    quote:
      "L'équipe a livré notre plateforme RH en 4 mois, dans les délais et budget. Qualité niveau ESN parisienne, tiers du prix.",
    author: "Marc D.",
    role: "DSI",
    company: "Groupe éducatif, Madagascar",
    color: "var(--brand-lt)",
  },
  {
    quote:
      "Notre site e-commerce refondu de A à Z. Résultat : +65% conversions et 3x plus rapide.",
    author: "Sophie L.",
    role: "Directrice Marketing",
    company: "Retailer FR, Paris",
    color: "var(--gold)",
  },
  {
    quote:
      "Modernisation API legacy en microservices sans interruption. Migration transparente pour 8K utilisateurs.",
    author: "Thomas K.",
    role: "CTO",
    company: "SaaS B2B, France",
    color: "#10B981",
  },
];

const FAQ = [
  {
    q: "Quels sont vos délais typiques pour un projet web ?",
    a: "Site vitrine : 3-6 semaines. Application web : 2-6 mois selon complexité. Planning détaillé au cadrage, respecté garanti.",
  },
  {
    q: "Travaillez-vous avec des technologies spécifiques ou vous adaptez-vous ?",
    a: "Maîtrise Next.js, React, Node.js, PostgreSQL, React Native. Adaptation possible à votre stack existante si nécessaire.",
  },
  {
    q: "Comment se déroule la collaboration à distance ?",
    a: "Daily standup optionnel, démos hebdomadaires, Slack dédié. UTC+3 (2h décalage Paris en été). Nos clients oublient qu'on est à Madagascar.",
  },
  {
    q: "Proposez-vous de la maintenance après livraison ?",
    a: "Oui, contrat mensuel ou tickets à la demande. Réponse 24h bugs critiques, 48h demandes standard.",
  },
];

export default function DevPage() {
  return (
    <ServiceScope slug="dev" as="main">
      <ServiceHero
        slug="dev"
        eyebrow="Développement web & mobile"
        title={
          <>
            On ne livre pas du code.
            <br />
            <span className="gradient-text-svc-light">On livre de la croissance.</span>
          </>
        }
        description="Web, mobile, API, e-commerce. Depuis Antananarivo, avec les standards d'une ESN européenne et les délais d'une startup. Devis gratuit en 72h."
        stats={METRICS}
      />

      {/* Ce qu'on fait */}
      <ServiceSection
        slug="dev"
        eyebrow="Ce qu'on fait"
        title={
          <>
            Du code qui <span className="gradient-text-svc">travaille pour vous.</span>
          </>
        }
        description="Six familles de projets, une seule équipe senior — pas de sous-traitance, pas de juniors sur vos projets critiques."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
                <ServiceCard
                  icon={<Icon strokeWidth={1.6} />}
                  title={s.title}
                  style={{ ["--svc" as string]: s.color }}
                >
                  {s.desc}
                </ServiceCard>
              </Reveal>
            );
          })}
        </div>
      </ServiceSection>

      {/* Stack technique — bandeau défilant */}
      <section className="relative overflow-hidden py-16 text-white sm:py-20">
        <ServiceBackground slug="dev" tone="dark" intensity="soft" />
        <div aria-hidden className="svc-rule absolute inset-x-0 top-0" />

        <div className="container-x mb-8 text-center">
          <p className="label-tag inline-flex items-center gap-3" style={{ color: "var(--svc)" }}>
            <span className="h-px w-6" style={{ background: "color-mix(in srgb, var(--svc) 70%, transparent)" }} />
            Notre stack technique
            <span className="h-px w-6" style={{ background: "color-mix(in srgb, var(--svc) 70%, transparent)" }} />
          </p>
        </div>

        <div className="space-y-3 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          {[false, true].map((reverse, row) => (
            <div
              key={row}
              aria-hidden={row === 1}
              className="flex whitespace-nowrap will-change-transform"
              style={{ animation: `ticker ${reverse ? 36 : 30}s linear infinite${reverse ? " reverse" : ""}` }}
            >
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <span key={i} className="inline-flex items-center gap-4 px-4">
                  <span className="glass-card rounded-full px-4 py-1.5 text-[13px] font-medium tracking-wide text-white/80" data-tone="dark">
                    {tech}
                  </span>
                  <span className="size-1 rounded-full" style={{ background: "color-mix(in srgb, var(--svc) 60%, transparent)" }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Méthode */}
      <ServiceSection
        slug="dev"
        tone="plain"
        eyebrow="Notre méthode"
        title={
          <>
            De l&apos;idée <span className="gradient-text-svc">à la mise en ligne.</span>
          </>
        }
        description="Sprints de deux semaines, démos régulières, et une application que vous voyez prendre forme au lieu de la découvrir à la livraison."
      >
        <ServiceSteps steps={PROCESS.map((p) => ({ num: p.step, title: p.title, desc: p.desc }))} />
      </ServiceSection>

      {/* Expertise — composition asymétrique */}
      <ServiceSection
        slug="dev"
        tone="dark"
        eyebrow="Notre expertise"
        title={
          <>
            Une stack maîtrisée
            <br />
            de bout en bout.
          </>
        }
        description="Pas de sous-traitance, pas de développeurs juniors sur vos projets critiques. Notre équipe maîtrise chaque couche — du design à l'infrastructure."
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <ServiceStatBars items={STATS.map((s) => ({ label: s.label, value: s.value }))} />
            <Reveal delay={0.3}>
              <div
                className="glass-card mt-8 rounded-l-md p-5"
                data-tone="dark"
                style={{ borderLeft: "2px solid var(--svc)" }}
              >
                <p className="font-display text-base leading-relaxed font-medium text-white/85 italic">
                  &ldquo;Parce qu&apos;une technologie sans accompagnement n&apos;est
                  qu&apos;un coût. Nous en faisons un levier.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <DevChart />
          </Reveal>
        </div>
      </ServiceSection>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      <ServiceCta
        slug="dev"
        title={
          <>
            Prêt à transformer{" "}
            <span className="gradient-text-svc-light">votre idée en réalité ?</span>
          </>
        }
        description="Décrivez votre projet : premier devis gratuit en 72h, sans engagement."
        primary={{ href: "/contact", label: "Demander un devis" }}
        points={["Pas d'engagement", "Devis gratuit", "Réponse sous 72h"]}
      />
    </ServiceScope>
  );
}
