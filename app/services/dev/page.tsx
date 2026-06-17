"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  TrendingUp,
} from "lucide-react";

export default function DevPage() {
  const METRICS = [
    { value: "800€", label: "projet à partir de", icon: "💰" },
    { value: "3–6 sem.", label: "délai site vitrine", icon: "⏱️" },
    { value: "99%", label: "satisfaction client", icon: "⭐" },
    { value: "72h", label: "devis gratuit", icon: "✨" },
  ];

  const SERVICES = [
    {
      icon: Code2,
      title: "Sites & Applications Web",
      desc: "De la landing page au SaaS complexe. React, Next.js, architecture scalable. Core Web Vitals au vert et Lighthouse > 90.",
    },
    {
      icon: Smartphone,
      title: "Applications Mobiles",
      desc: "iOS & Android natifs ou React Native cross-platform. UX pensée pour la conversion, déploiement App Store et Google Play.",
    },
    {
      icon: Zap,
      title: "APIs & Back-end",
      desc: "Node.js, Python, bases de données relationnelles et NoSQL. Architecture microservices ou monolithe selon vos besoins.",
    },
    {
      icon: Wrench,
      title: "Refonte & Migration",
      desc: "Legacy à moderniser ? Reprendre, ré-architcter, migrer sans interruption. Vos utilisateurs ne voient rien.",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      desc: "Shopify, WooCommerce, solutions sur mesure. Tunnel optimisé, intégrations paiement, gestion stocks temps réel.",
    },
    {
      icon: Shield,
      title: "Audit & Sécurité",
      desc: "Revue de code, audit sécurité, tests pénétration applicatifs. Données protégées par des experts certifiés.",
    },
  ];

  const TECH_STACK = [
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "Django",
    "Restful APIs",
    "RestFramework",
    "PostgreSQL",
    "Supabase",
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
    },
    {
      step: "02",
      title: "Design & prototypage",
      desc: "Maquettes Figma, charte graphique, parcours utilisateur, responsive design — avant la première ligne de code.",
    },
    {
      step: "03",
      title: "Développement itératif",
      desc: "Sprints de 2 semaines avec démos régulières. Vous voyez l'application prendre forme et pouvez ajuster.",
    },
    {
      step: "04",
      title: "Livraison & suivi",
      desc: "Production, formation équipes, documentation complète. Disponibles pour maintenance et évolutions.",
    },
  ];

  const TESTIMONIALS = [
    {
      quote:
        "L'équipe a livré notre plateforme RH en 4 mois, dans les délais et budget. Qualité niveau ESN parisienne, tiers du prix.",
      author: "Marc D.",
      role: "DSI",
      company: "Groupe éducatif, Madagascar",
    },
    {
      quote:
        "Notre site e-commerce refondu de A à Z. Résultat : +65% conversions et 3x plus rapide.",
      author: "Sophie L.",
      role: "Directrice Marketing",
      company: "Retailer FR, Paris",
    },
    {
      quote:
        "Modernisation API legacy en microservices sans interruption. Migration transparente pour 8K utilisateurs.",
      author: "Thomas K.",
      role: "CTO",
      company: "SaaS B2B, France",
    },
  ];

  const FAQ = [
    {
      q: "Quels sont vos délais typiques pour un projet web ?",
      a: "Site vitrine : 3-6 semaines. Application web : 2-6 mois selon complexité. Planning détaillé au cadrage, respecté garantir.",
    },
    {
      q: "Travaillez-vous avec des technologies spécifiques ou vous adaptez-vous ?",
      a: "Maîtrise Next.js, React, Node.js, PostgreSQL, React Native. Adaptation possible à votre stack existante si nécessaire.",
    },
    {
      q: "Comment se déroule la collaboration à distance ?",
      a: "Daily standup optionnel, démos hebdomadaires, Slack dédié. UTC+3 (2h décalage Paris en été). Clients oublient qu'on est à Madagascar.",
    },
    {
      q: "Proposez-vous de la maintenance après livraison ?",
      a: "Oui, contrat mensuel ou tickets à la demande. Réponse 24h bugs critiques, 48h demandes standard.",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <Badge variant="secondary" className="w-fit">
                  DÉVELOPPEMENT WEB & MOBILE
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  On ne livre pas du code.
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent ml-2">
                    On livre de la croissance.
                  </span>
                </h1>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Web, mobile, API, e-commerce. Depuis Antananarivo, avec les
                standards d&apos;une ESN européenne et les délais d&apos;une
                startup. Devis gratuit en 72h.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Démarrer un projet
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link href="/projets">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Voir nos réalisations
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block relative h-96 rounded-lg overflow-hidden border border-border bg-card/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Code2 className="size-16 mx-auto text-primary opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    Développement web & mobile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-primary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12">
            {METRICS.map((m, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-3xl">{m.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">
                  {m.value}
                </div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="space-y-12">
            <div className="space-y-4">
              <Badge variant="secondary">CE QU'ON FAIT</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Du code qui travaille pour vous.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, i) => {
                const IconComponent = service.icon;
                return (
                  <Card
                    key={i}
                    className="border border-border hover:border-primary/50 transition-colors group"
                  >
                    <CardHeader>
                      <IconComponent className="size-8 text-primary mb-4" />
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {service.desc}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary">NOTRE EXPERTISE</Badge>
                <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                  Une stack technique maîtrisée de bout en bout.
                </h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Pas de sous-traitance, pas de développeurs juniors sur vos
                projets critiques. Notre équipe maîtrise chaque couche de la
                stack — du design à l&apos;infrastructure.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Livraisons dans les délais", value: "96%" },
                  { label: "Clients satisfaits ou remboursés", value: "100%" },
                  { label: "Projets avec maintenance active", value: "78%" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {stat.label}
                      </span>
                      <span className="font-bold text-primary">
                        {stat.value}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-card rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: stat.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-lg border border-primary/20 bg-primary/5">
                <p className="text-sm text-muted-foreground italic">
                  "Parce qu'une technologie sans accompagnement n'est qu'un
                  coût. Nous en faisons un levier."
                </p>
              </div>
            </div>

            <div className="relative h-96 rounded-lg border border-border bg-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background flex items-center justify-center">
                <TrendingUp className="size-24 text-primary opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Badge variant="secondary" className="mx-auto">
                NOTRE STACK TECHNIQUE
              </Badge>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {TECH_STACK.map((tech, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="px-4 py-2 text-sm font-medium"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="space-y-12">
            <div className="space-y-4">
              <Badge variant="secondary">NOTRE MÉTHODE</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                De l&apos;idée à la mise en ligne.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
              {PROCESS.map((p, i) => (
                <Card key={i} className="border-0 rounded-none">
                  <CardHeader>
                    <div className="text-6xl font-bold text-primary/20 leading-none mb-4">
                      {p.step}
                    </div>
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {p.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="space-y-12">
            <div className="space-y-2">
              <Badge variant="secondary">TÉMOIGNAGES</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Ce que nos clients disent.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Card key={i} className="border border-border">
                  <CardHeader>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <span key={j}>⭐</span>
                      ))}
                    </div>
                    <CardDescription className="text-base leading-relaxed text-foreground italic">
                      "{t.quote}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="font-semibold">{t.author}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="space-y-12">
            <div className="space-y-4">
              <Badge variant="secondary">FAQ</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Questions fréquentes.
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {FAQ.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="py-6 hover:no-underline">
                    <span className="text-left font-semibold text-lg">
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Prêt à transformer votre idée en réalité ?
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discutons de votre projet. Premier devis gratuit en 72h.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                Demander un devis
                <CheckCircle2 className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="tel:+261">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Appeler maintenant
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Pas d&apos;engagement. Pas de surprise. Juste du professionnel.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-muted-foreground text-sm">
            <p>
              © 2026 Dev Studio. Développement web & mobile premium.
              Antananarivo, Madagascar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
