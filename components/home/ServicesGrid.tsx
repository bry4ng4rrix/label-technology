"use client";

import Image from "next/image";
import Link from "next/link";
import Aurora from "@/components/Aurora";
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
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=900&fit=crop&q=80",
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
    src: "/images/callcenter-fetra.png",
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
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=900&fit=crop&q=80",
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
    src: "/images/digitalisation.png",
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
    color: "var(--brand)",
    icon: Database,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=900&fit=crop&q=80",
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
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=900&fit=crop&q=80",
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
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=900&fit=crop&q=80",
  },
];

export default function ServicesGrid() {
  return (
    <section className="relative py-10 px-6 grid-bg overflow-hidden bg-gray-100 sm:py-16 lg:py-20">
      {/* Aurora background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* <Aurora /> */}
      </div>

      <div className="relative z-10 p-2 mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4 animate-slide-down">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-500 leading-tight">
              <span className="bg-gradient-to-r from-sky-700 to-green-600 bg-clip-text text-transparent">
                NOS EXPERTISES
              </span>
            </h2>
          </div>
          <Button
            className="text-xs px-6 py-3 h-14 bg-sky-500 hover:bg-sky-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => {
            const IconComponent = s.icon;
            return (
              <Link
                key={s.id}
                href={s.href}
                className="group service-card relative block h-full rounded-xl overflow-hidden ring-1 ring-white/10 bg-slate-950 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:ring-white/25
                shadow-sky-200 hover:shadow-xl"
              >
                {/* Photo de fond (comme l'arc du Hero) */}
                <Image
                  src={s.src}
                  alt={s.tag}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 16vw"
                  className="object-cover opacity-30 transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {/* Voile sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/50" />

                {/* Dégradé couleur au survol */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(180deg, transparent 40%, ${s.color}55 100%)`,
                  }}
                />

                <div className="relative z-10 flex h-full flex-col p-6">
                  {/* Icon section */}
                  <div className="mb-4">
                    <div
                      className="inline-flex p-3 rounded-lg mb-4 animate-icon-float shadow-md transition-all duration-300"
                      style={{
                        backgroundColor: `${s.color}25`,
                        color: s.color,
                      }}
                    >
                      <IconComponent size={24} strokeWidth={1.5} />
                    </div>
                  </div>

                  {s.badge && (
                    <Badge
                      className="absolute top-6 right-6 text-[10px] px-2 py-1 rounded-full border-0 font-semibold shadow-md transition-all duration-300"
                      style={{
                        backgroundColor: `${s.color}30`,
                        color: s.color,
                      }}
                    >
                      {s.badge}
                    </Badge>
                  )}

                  <p className="text-[11px] font-semibold tracking-widest mb-3 text-white/60 uppercase">
                    {s.tag}
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold leading-tight text-white">
                    {s.headline} <span>{s.headlineAccent}</span>
                  </h3>

                  <div className="flex-1 pt-4">
                    <p className="text-sm leading-relaxed mb-6 text-white/70">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-4">
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
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
