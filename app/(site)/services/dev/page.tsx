import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Phone,
  Shield,
  ShoppingCart,
  Smartphone,
  Wrench,
  Zap,
} from "lucide-react";
import FaqSection from "@/components/shared/FaqSection";
import MetricsBand from "@/components/shared/MetricsBand";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "@/components/shared/SectionHeader";
import DevChart from "@/components/services/DevChartWrapper";
import { Button } from "@/components/ui/button";

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
    <main>
      <PageHero
        size="lg"
        eyebrow="Développement web & mobile"
        title={
          <>
            On ne livre pas du code.
            <br />
            <span className="gradient-text-light">On livre de la croissance.</span>
          </>
        }
        description="Web, mobile, API, e-commerce. Depuis Antananarivo, avec les standards d'une ESN européenne et les délais d'une startup. Devis gratuit en 72h."
        image={{ src: "/images/services/dev.jpg", alt: "Développement web & mobile — Label Technology", priority: true }}
        actions={
          <>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Démarrer un projet
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass" className="rounded-full">
              <Link href="/projets">Voir nos réalisations</Link>
            </Button>
          </>
        }
      />

      <MetricsBand items={METRICS} />

      {/* ── Services ── */}
      <section className="surface-light section relative">
        <div className="container-x">
          <SectionHeader
            eyebrow="Ce qu'on fait"
            title={
              <>
                Du code qui <span className="gradient-text">travaille pour vous.</span>
              </>
            }
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={i} delay={(i % 3) * 0.08} className="h-full">
                  <div
                    className="card-premium group flex h-full flex-col p-7"
                    style={{ ["--accent" as string]: s.color }}
                  >
                    <div
                      className="mb-5 flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
                      style={{ backgroundColor: `${s.color}14`, color: s.color }}
                    >
                      <Icon size={22} strokeWidth={1.6} />
                    </div>
                    <h3 className="h3-display text-foreground">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="surface-dark noise hairline-top relative overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-60" />
        <div className="container-x mb-8 text-center">
          <p className="label-tag inline-flex items-center gap-3 text-brand-glow">
            <span className="h-px w-6 bg-brand-glow/70" />
            Notre stack technique
            <span className="h-px w-6 bg-brand-glow/70" />
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
                  <span className="glass-dark rounded-full px-4 py-1.5 text-[13px] font-medium tracking-wide text-white/75">
                    {tech}
                  </span>
                  <span className="size-1 rounded-full bg-brand-glow/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Processus ── */}
      <section className="section bg-background">
        <div className="container-x">
          <SectionHeader
            eyebrow="Notre méthode"
            title={
              <>
                De l&apos;idée <span className="gradient-text">à la mise en ligne.</span>
              </>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} className="h-full">
                <div className="card-premium group flex h-full flex-col p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <span
                      className="font-display text-4xl leading-none text-foreground/15 transition-colors duration-300 group-hover:text-[var(--accent)]"
                      style={{ ["--accent" as string]: p.color }}
                    >
                      {p.step}
                    </span>
                    <span
                      className="size-2.5 rounded-full ring-4 ring-background"
                      style={{ backgroundColor: p.color }}
                    />
                  </div>
                  <div className="mb-5 h-0.5 w-8 rounded-full" style={{ backgroundColor: p.color }} />
                  <h3 className="h3-display text-foreground">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise ── */}
      <section className="surface-light section relative overflow-hidden">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="label-tag mb-4 inline-flex items-center gap-2.5 text-brand">
                <span className="h-px w-6 bg-brand/60" />
                Notre expertise
              </p>
              <h2 className="h2-display text-foreground">
                Une stack technique maîtrisée{" "}
                <span className="gradient-text">de bout en bout.</span>
              </h2>
              <p className="prose-body mt-6 text-muted-foreground">
                Pas de sous-traitance, pas de développeurs juniors sur vos
                projets critiques. Notre équipe maîtrise chaque couche de la
                stack — du design à l&apos;infrastructure.
              </p>

              <div className="mt-8 space-y-5">
                {STATS.map((s, i) => (
                  <div key={i}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-display font-bold text-brand">{s.value}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/8">
                      <div
                        className="svc-bar h-full rounded-full bg-linear-to-r from-brand to-brand-lt"
                        style={{ width: s.width, animationDelay: `${0.3 + i * 0.18}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-r-2xl border-l-2 border-brand bg-brand/5 p-5">
                <p className="font-display text-base leading-relaxed font-medium text-foreground italic">
                  &ldquo;Parce qu&apos;une technologie sans accompagnement
                  n&apos;est qu&apos;un coût. Nous en faisons un levier.&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="surface-dark noise relative overflow-hidden rounded-3xl p-3 sm:p-4">
                <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-70" />
                <DevChart />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      {/* ── CTA Final ── */}
      <section className="surface-dark noise hairline-top relative overflow-hidden py-24 sm:py-28 lg:py-36">
        <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-70" />
        <div
          aria-hidden
          className="halo -top-32 left-1/2 -z-10 h-[460px] w-[760px] -translate-x-1/2 bg-brand-lt/35"
        />
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">
                <span className="pulse-dot size-1.5 rounded-full bg-emerald-400" />
                Prêt à démarrer ?
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="h2-cta mt-7 text-white">
                Prêt à transformer{" "}
                <span className="gradient-text-light">votre idée en réalité ?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55">
                Discutons de votre projet. Premier devis gratuit en 72h — sans engagement.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="xl" variant="inverse" className="rounded-full">
                <Link href="/contact">
                  Demander un devis
                  <CheckCircle2 data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="glass" className="rounded-full">
                <a href="tel:+261340503129">
                  <Phone data-icon="inline-start" />
                  Appeler maintenant
                </a>
              </Button>
            </Reveal>
            <Reveal delay={0.4} className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["Pas d'engagement", "Devis gratuit", "Réponse sous 72h"].map((item) => (
                <span key={item} className="flex items-center gap-2 text-xs text-white/50">
                  <CheckCircle2 className="size-3.5 shrink-0 text-emerald-400/80" />
                  {item}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
