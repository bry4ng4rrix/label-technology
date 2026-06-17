"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Zap,
  Wrench,
  ShoppingCart,
  Shield,
  CheckCircle2,
} from "lucide-react";

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
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL",
  "MongoDB", "React Native", "Tailwind CSS", "Docker", "AWS", "Vercel", "Figma",
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
    <div className="text-foreground min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden grid-bg"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-900/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
          <div className="max-w-3xl space-y-8">
            <p className="label-tag" style={{ color: "var(--brand-lt)" }}>
              DÉVELOPPEMENT WEB & MOBILE
            </p>
            <h1
              className="font-rostex text-white"
              style={{ fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1.05 }}
            >
              On ne livre pas du code.{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                On livre de la croissance.
              </span>
            </h1>
            <p className="text-white/50 font-light text-lg leading-relaxed max-w-xl">
              Web, mobile, API, e-commerce. Depuis Antananarivo, avec les
              standards d&apos;une ESN européenne et les délais d&apos;une
              startup. Devis gratuit en 72h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="font-medium"
                style={{ backgroundColor: "var(--brand-lt)", color: "#fff" }}
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Démarrer un projet
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/15 text-white/80 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/25"
              >
                <Link href="/projets">Voir nos réalisations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Métriques ── */}
      <section style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {METRICS.map((m, i) => (
              <div
                key={i}
                className="py-8 px-6 text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="font-display text-3xl sm:text-4xl mb-1"
                  style={{ color: "var(--brand-lt)" }}
                >
                  {m.value}
                </div>
                <div className="label-tag text-white/40 text-[10px]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="max-w-7xl mx-auto space-y-14">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>
              CE QU&apos;ON FAIT
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">
              Du code qui
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                travaille pour vous.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Card
                  key={i}
                  className="border border-border/50 hover:border-blue-400/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
                >
                  <CardHeader className="pb-3">
                    <div
                      className="inline-flex p-3 rounded-lg mb-3 w-fit"
                      style={{
                        backgroundColor: `${s.color}15`,
                        color: s.color,
                      }}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-lg text-foreground">
                      {s.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 grid-bg"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="max-w-7xl mx-auto space-y-8 text-center">
          <p className="label-tag" style={{ color: "var(--brand-lt)" }}>
            NOTRE STACK TECHNIQUE
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {TECH_STACK.map((tech, i) => (
              <Badge
                key={i}
                variant="outline"
                className="px-4 py-2 text-sm font-medium border-white/15 text-white/70 hover:border-blue-400/50 hover:text-white transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ── Processus ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-14">
          <div>
            <p className="label-tag mb-3" style={{ color: "#3B82F6" }}>
              NOTRE MÉTHODE
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">
              De l&apos;idée{" "}
              <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                à la mise en ligne.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
            {PROCESS.map((p, i) => (
              <div
                key={i}
                className="relative p-8 group hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}12 0%, transparent 70%)`,
                  }}
                />
                <div className="relative z-10">
                  <div
                    className="font-display text-6xl font-extrabold mb-5 leading-none"
                    style={{ color: p.color, opacity: 0.3 }}
                  >
                    {p.step}
                  </div>
                  <div
                    className="w-8 h-0.5 mb-5"
                    style={{ backgroundColor: p.color }}
                  />
                  <h3
                    className="font-display text-xl mb-3"
                    style={{ color: p.color }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expertise ── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>
                  NOTRE EXPERTISE
                </p>
                <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">
                  Une stack technique maîtrisée{" "}
                  <span style={{ color: "var(--brand-lt)" }}>
                    de bout en bout.
                  </span>
                </h2>
              </div>
              <p className="text-muted-foreground font-light leading-relaxed">
                Pas de sous-traitance, pas de développeurs juniors sur vos
                projets critiques. Notre équipe maîtrise chaque couche de la
                stack — du design à l&apos;infrastructure.
              </p>

              <div className="space-y-5">
                {STATS.map((s, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span
                        className="font-bold"
                        style={{ color: "var(--brand-lt)" }}
                      >
                        {s.value}
                      </span>
                    </div>
                    <div
                      className="w-full h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        style={{ width: s.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="p-5 rounded-lg border-l-2 font-light text-sm italic text-muted-foreground"
                style={{
                  borderColor: "var(--brand-lt)",
                  backgroundColor: "rgba(46,85,212,0.05)",
                }}
              >
                &ldquo;Parce qu&apos;une technologie sans accompagnement
                n&apos;est qu&apos;un coût. Nous en faisons un levier.&rdquo;
              </div>
            </div>

            <div
              className="hidden lg:flex h-80 rounded-sm items-center justify-center border"
              style={{
                backgroundColor: "rgba(0,0,0,0.04)",
                borderColor: "rgba(0,0,0,0.08)",
              }}
            >
              <Code2
                size={64}
                strokeWidth={0.8}
                style={{ color: "var(--brand-lt)", opacity: 0.25 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-14">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>
              TÉMOIGNAGES
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">
              Des résultats,
              <br />
              <span style={{ color: "var(--brand-lt)" }}>
                pas des promesses.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Card
                key={i}
                className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="pt-7 pb-6">
                  <div
                    className="font-display text-5xl leading-none mb-4 opacity-20"
                    style={{ color: t.color }}
                  >
                    &ldquo;
                  </div>
                  <p className="text-base leading-relaxed font-light text-foreground mb-6">
                    {t.quote}
                  </p>
                  <Separator className="mb-5" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {t.author}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 grid-bg"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand-lt)" }}>
              FAQ
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight">
              Questions fréquentes.
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-sm px-6 border"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                <AccordionTrigger className="py-6 hover:no-underline text-left">
                  <span className="font-semibold text-white/90 text-base">
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/50 pb-6 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="relative py-28 px-4 sm:px-6 overflow-hidden bg-[#080D1A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080D1A] via-[#0f1f5c] to-[#080D1A]" />
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <Badge
            variant="secondary"
            className="bg-white/8 text-white/60 border border-white/15 text-[10px] tracking-widest px-4 py-1.5 rounded-full"
          >
            PRÊT À DÉMARRER ?
          </Badge>

          <h2
            className="font-rostex text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05 }}
          >
            Prêt à transformer
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              votre idée en réalité ?
            </span>
          </h2>

          <p className="text-white/40 font-light text-base max-w-md mx-auto leading-relaxed">
            Discutons de votre projet. Premier devis gratuit en 72h — sans
            engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              asChild
              size="lg"
              className="bg-white text-slate-900 hover:bg-white/90 px-8 h-12 font-medium shadow-lg shadow-white/10 hover:scale-105 transition-all"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Demander un devis
                <CheckCircle2 className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/15 text-white/80 bg-white/5 hover:bg-white/10 hover:text-white px-8 h-12 hover:scale-105 transition-all"
            >
              <Link href="tel:+261">Appeler maintenant</Link>
            </Button>
          </div>

          <Separator className="bg-white/8 max-w-xs mx-auto mt-10" />

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-2">
            {["Pas d'engagement", "Devis gratuit", "Réponse sous 72h"].map(
              (item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/35 text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400/50 shrink-0" />
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
