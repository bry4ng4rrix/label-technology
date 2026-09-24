import {
  Code2,
  Shield,
  ShoppingCart,
  Smartphone,
  Wrench,
  Zap,
} from "lucide-react";

import BigStats from "@/components/services/BigStats";
import EditorialHero from "@/components/services/EditorialHero";
import EditorialRow from "@/components/services/EditorialRow";
import FeatureGrid from "@/components/services/FeatureGrid";
import PhotoBand from "@/components/services/PhotoBand";
import PhotoMosaic from "@/components/services/PhotoMosaic";
import SectionIntro from "@/components/services/SectionIntro";
import ServiceBackground from "@/components/services/ServiceBackground";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceSteps from "@/components/services/ServiceSteps";
import DevChart from "@/components/services/DevChartWrapper";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";

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
      <EditorialHero
        slug="dev"
        eyebrow="Développement web & mobile"
        title={
          <>
            On ne livre
            <br />
            pas du code.
            <br />
            <span className="gradient-text-svc-light">On livre de la croissance.</span>
          </>
        }
        description="Web, mobile, API, e-commerce. Depuis Antananarivo, avec les standards d'une ESN européenne et les délais d'une startup. Devis gratuit en 72h."
        image={{ src: "/images/services/dev/hero.jpg", alt: "Code source affiché sur un écran de développement" }}
        stats={METRICS.map((m) => ({ value: m.value, label: m.label }))}
      />

      {/* Ce qu'on fait */}
      <ServiceSection slug="dev">
        <SectionIntro
          eyebrow="Ce qu'on fait"
          title={
            <>
              Du code qui
              <br />
              <span className="gradient-text-svc">travaille pour vous.</span>
            </>
          }
          description="Six familles de projets, une seule équipe senior. Pas de sous-traitance, pas de juniors sur vos projets critiques — les personnes qui cadrent sont celles qui développent."
        />
        <FeatureGrid
          items={SERVICES.map((s, i) => {
            const Icon = s.icon;
            return {
              icon: <Icon strokeWidth={1.6} />,
              title: s.title,
              desc: s.desc,
              image: {
                src: `/images/services/dev/feature-${i + 1}.jpg`,
                alt: s.title,
              },
            };
          })}
        />
      </ServiceSection>

      {/* Rangée éditoriale */}
      <ServiceSection slug="dev" tone="plain">
        <EditorialRow
          eyebrow="Méthode de travail"
          title={
            <>
              Vous ne découvrez pas
              <br />
              le résultat à la livraison.
            </>
          }
          points={[
            "Sprints de deux semaines avec démo à chaque fin de cycle",
            "Maquettes validées avant la première ligne de code",
            "Documentation et formation des équipes à la livraison",
          ]}
          image={{
            src: "/images/services/dev/row.jpg",
            alt: "Développeurs au travail sur un projet",
          }}
          stat={{ value: "96 %", label: "livraisons dans les délais annoncés" }}
          cta={{ href: "/projets", label: "Voir nos réalisations" }}
          ratio="5/4"
          reverse
        >
          Un projet qui dérape se repère dans les deux premières semaines, pas au
          bout de trois mois. Les démos régulières vous laissent ajuster le tir
          pendant qu&apos;il est encore temps — et sans surcoût.
        </EditorialRow>
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


      {/* Deuxième rangée éditoriale — photo à gauche */}
      <ServiceSection slug="dev">
        <EditorialRow
          reverse
          eyebrow="Qualité de code"
          title={
            <>
              Le code qu'on écrit,
              <br />
              quelqu'un devra le relire.
            </>
          }
          points={[
            "Revue de code systématique avant chaque fusion",
            "Tests automatisés sur les parcours critiques",
            "Documentation technique livrée avec le projet",
          ]}
          image={{ src: "/images/services/dev/row2.jpg", alt: "Éditeur de code avec coloration syntaxique" }}
          stat={{ value: "100 %", label: "du code livré vous appartient" }}
          ratio="4/3"
        >
          Un projet ne s'arrête pas à la mise en ligne. On écrit pour la personne qui reprendra le code dans deux ans — y compris si ce n'est pas nous.
        </EditorialRow>
      </ServiceSection>

      {/* Bandeau photographique — temps fort éditorial */}
      <PhotoBand
        image={{ src: "/images/services/dev/band.jpg", alt: "Espace de travail lumineux d'une équipe technique" }}
        eyebrow="Notre façon de travailler"
        title={<>Une équipe senior,<br />pas un plateau de juniors.</>}
        stats={[
          { value: "3–6 sem.", label: "site vitrine" },
          { value: "2–6 mois", label: "application métier" },
          { value: "72h", label: "devis détaillé" },
        ]}
      >
        Les personnes qui cadrent votre projet sont celles qui le développent. Pas d'intermédiaire, pas de transfert de dossier en cours de route.
      </PhotoBand>

      {/* Chiffres en très grande typo */}
      <BigStats
        slug="dev"
        items={STATS.map((s) => ({ value: s.value, label: s.label }))}
        caption="Pas de sous-traitance, pas de développeurs juniors sur vos projets critiques. Notre équipe maîtrise chaque couche — du design à l'infrastructure."
      />

      {/* Expertise */}
      <ServiceSection slug="dev" tone="dark">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <DevChart />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label-tag mb-4" style={{ color: "var(--svc)" }}>
              Notre expertise
            </p>
            <h2 className="font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-white">
              Une stack maîtrisée
              <br />
              de bout en bout.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
              Niveau de maîtrise par domaine, mesuré sur nos projets livrés.
              Là où nous ne sommes pas les meilleurs, nous le disons.
            </p>
            <div className="glass-card mt-8 rounded-l-md p-5" data-tone="dark" style={{ borderLeft: "2px solid var(--svc)" }}>
              <p className="font-display text-base leading-relaxed font-medium text-white/85 italic">
                &ldquo;Parce qu&apos;une technologie sans accompagnement n&apos;est
                qu&apos;un coût. Nous en faisons un levier.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </ServiceSection>


      {/* Mosaïque asymétrique */}
      <ServiceSection slug="dev" tone="plain">
        <PhotoMosaic
          eyebrow="Du design au déploiement"
          title={
            <>
              On couvre toute
              <br />
              la chaîne.
            </>
          }
          images={[
            { src: "/images/services/dev/mosaic-a.jpg", alt: "Développeur concentré devant son écran" },
            { src: "/images/services/dev/mosaic-b.jpg", alt: "Interface applicative en cours de test" },
          ]}
        >
          Maquettes Figma, développement, intégration continue, mise en production, supervision. Un seul interlocuteur du premier atelier jusqu'au premier utilisateur.
        </PhotoMosaic>
      </ServiceSection>

      {/* Méthode */}
      <ServiceSection slug="dev" tone="plain">
        <SectionIntro
          eyebrow="Notre méthode"
          title={
            <>
              De l&apos;idée
              <br />
              <span className="gradient-text-svc">à la mise en ligne.</span>
            </>
          }
          description="Quatre étapes, un interlocuteur unique, et une application que vous voyez prendre forme au lieu de la découvrir à la livraison."
        />
        <ServiceSteps steps={PROCESS.map((p) => ({ num: p.step, title: p.title, desc: p.desc }))} />
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
