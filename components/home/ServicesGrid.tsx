"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Phone,
  TrendingUp,
  RefreshCw,
  Database,
  Server,
  DollarSign,
  ArrowRight,
} from "lucide-react";

const SERVICES = [
  {
    id: "dev",
    href: "/services/dev",
    tag: "Développement",
    headline: "On ne livre pas du code.",
    headlineAccent: "On livre de la croissance.",
    desc: "Applications web & mobile sur mesure, ERP, CRM, plateformes métier. Du prototype au système d'information complet.",
    items: [
      "Sites & e-commerce",
      "Apps métier sur mesure",
      "Mobile iOS & Android",
      "APIs & intégrations",
    ],
    featured: false,
    color: "#3B82F6",
    icon: Code2,
  },
  {
    id: "callcenter",
    href: "/services/callcenter",
    tag: "Call Center",
    headline: "50 voix.",
    headlineAccent: "Votre support permanent.",
    desc: "Prospection B2B, qualification de fichiers, support client bilingue FR/EN depuis Antananarivo.",
    items: [
      "Prospection B2B",
      "Qualification de fichiers",
      "Support entrant & sortant",
      "Reporting temps réel",
    ],
    featured: false,
    badge: "50 postes",
    color: "#F59E0B",
    icon: Phone,
  },
  {
    id: "marketing",
    href: "/services/marketing",
    tag: "Marketing Digital",
    headline: "Votre audience existe déjà.",
    headlineAccent: "On va la trouver.",
    desc: "SEO, SEA, réseaux sociaux, analytics. Une stratégie orientée résultats mesurables.",
    items: [
      "SEO / SEA",
      "Réseaux sociaux",
      "Email marketing",
      "Analytics & reporting",
    ],
    featured: false,
    color: "#EC4899",
    icon: TrendingUp,
  },
  {
    id: "digital",
    href: "/services/digital",
    tag: "Digitalisation",
    headline: "Vos processus papier",
    headlineAccent: "coûtent de l'argent.",
    desc: "Audit, conseil, déploiement ERP/CRM, formation équipes. Transformation numérique complète.",
    items: [
      "Audit & conseil",
      "Déploiement ERP/CRM",
      "Automatisation (RPA)",
      "Formation & conduite",
    ],
    featured: false,
    color: "#10B981",
    icon: RefreshCw,
  },
  {
    id: "data",
    href: "/services/data",
    tag: "Traitement de données",
    headline: "Vos données dorment.",
    headlineAccent: "On les réveille.",
    desc: "Numérisation, saisie, nettoyage, structuration et analyse. Physique comme numérique.",
    items: [
      "Numérisation documents",
      "Nettoyage & déduplication",
      "Structuration & migration",
      "Visualisation & analyse",
    ],
    featured: false,
    color: "#8B5CF6",
    icon: Database,
  },
  {
    id: "materiel",
    href: "/services/materiel",
    tag: "Matériel IT",
    headline: "L'infrastructure",
    headlineAccent: "qui tient la route.",
    desc: "Ordinateurs, serveurs, réseau, périphériques. Conseil, livraison et installation B2B sur Antananarivo et régions.",
    items: [
      "Postes de travail & laptops",
      "Serveurs & NAS",
      "Réseau (Cisco, Ubiquiti)",
      "Installation & support",
    ],
    featured: false,
    color: "#06B6D4",
    icon: Server,
  },
  {
    id: "comptabilite",
    href: "/services/comptabilite",
    tag: "Comptabilité",
    headline: "Vos chiffres,",
    headlineAccent: "enfin lisibles.",
    desc: "Saisie comptable, rapprochements bancaires, reporting financier mensuel. Des décisions éclairées, fondées sur des données fiables.",
    items: [
      "Saisie comptable & TVA",
      "Rapprochements bancaires",
      "Reporting mensuel",
      "Tableaux de bord dirigeants",
    ],
    featured: false,
    color: "#EF4444",
    icon: DollarSign,
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 px-6 bg-background">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slide-down {
          animation: slideDown 0.6s ease-out forwards;
        }

        .animate-icon-float {
          animation: iconFloat 3s ease-in-out infinite;
        }

        .service-card {
          opacity: 0;
        }

        .service-card:nth-child(1) { animation: fadeInUp 0.6s ease-out 0.1s forwards; }
        .service-card:nth-child(2) { animation: fadeInUp 0.6s ease-out 0.2s forwards; }
        .service-card:nth-child(3) { animation: fadeInUp 0.6s ease-out 0.3s forwards; }
        .service-card:nth-child(4) { animation: fadeInUp 0.6s ease-out 0.4s forwards; }
        .service-card:nth-child(5) { animation: fadeInUp 0.6s ease-out 0.5s forwards; }
        .service-card:nth-child(6) { animation: fadeInUp 0.6s ease-out 0.6s forwards; }
        .service-card:nth-child(7) { animation: fadeInUp 0.6s ease-out 0.7s forwards; }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up,
          .animate-slide-down,
          .animate-icon-float,
          .service-card {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4 animate-slide-down">
          <div>
            <p className="text-xs font-semibold tracking-widest mb-3 text-primary/70 uppercase">
              NOS EXPERTISES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              7 expertises.
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                1 équipe.
              </span>
            </h2>
          </div>
          <Button
            className="text-xs px-6 py-3 bg-gray-100 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
            asChild
          >
            <Link href="/contact" className="flex items-center gap-2">
              DÉMARRER UN PROJET
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => {
            const IconComponent = s.icon;
            return (
              <Link key={s.id} href={s.href} className="group service-card">
                <Card className="relative h-full border border-border/40 rounded-xl shadow-md hover:scale-105 hover:shadow-xl hover:border-primary/30 transition-all duration-300 ease-out overflow-hidden">
                  {/* Background gradient effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top right, ${s.color}20 0%, transparent 70%)`,
                    }}
                  />

                  <CardHeader className="relative pb-4">
                    {/* Icon section */}
                    <div className="mb-4">
                      <div
                        className="inline-flex p-3 rounded-lg mb-4 animate-icon-float"
                        style={{
                          backgroundColor: `${s.color}15`,
                          color: s.color,
                        }}
                      >
                        <IconComponent size={24} strokeWidth={1.5} />
                      </div>
                    </div>

                    {s.badge && (
                      <Badge
                        className="absolute top-6 right-6 text-[10px] px-2 py-1 rounded-full border-0 font-semibold"
                        style={{
                          backgroundColor: `${s.color}20`,
                          color: s.color,
                        }}
                      >
                        {s.badge}
                      </Badge>
                    )}

                    <p className="text-[11px] font-semibold tracking-widest mb-3 text-muted-foreground uppercase">
                      {s.tag}
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold leading-tight text-foreground">
                      {s.headline}{" "}
                      <span style={{ color: s.color }}>{s.headlineAccent}</span>
                    </h3>
                  </CardHeader>

                  <CardContent className="relative flex-1 pb-4">
                    <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
                      {s.desc}
                    </p>

                    <ul className="space-y-2">
                      {s.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm text-muted-foreground group/item"
                        >
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover/item:scale-125"
                            style={{ backgroundColor: s.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="relative">
                    <span
                      className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2"
                      style={{ color: s.color }}
                    >
                      En savoir plus
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
