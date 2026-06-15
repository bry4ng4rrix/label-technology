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
import { ArrowRight } from "lucide-react";
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
    color: "var(--brand)",
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
    color: "var(--gold)",
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
    color: "var(--coral)",
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
    color: "var(--brand-lt)",
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
    color: "var(--brand)",
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
    color: "var(--brand-lt)",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>
              NOS EXPERTISES
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              7 expertises.
              <br />
              <span style={{ color: "var(--brand)" }}>1 équipe.</span>
            </h2>
          </div>
          <Button
            className="text-xs px-5 py-2.5 border-2 rounded-sm transition-all duration-300 hover:scale-105 "
            variant="outline"
          >
            <Link href="/contact" className="flex items-center gap-2">
              DÉMARRER UN PROJET
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Link key={s.id} href={s.href} className="group">
              <Card className="relative h-full  border-0 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
                <CardHeader className="pb-3">
                  {s.badge && (
                    <Badge
                      className="absolute top-6 right-6 label-tag text-[10px] px-2 py-1 rounded-sm border-0"
                      style={{
                        backgroundColor: "var(--gold)",
                        color: "var(--ink)",
                      }}
                    >
                      {s.badge}
                    </Badge>
                  )}
                  <p className="label-tag text-[10px] mb-2 text-muted-foreground">
                    {s.tag}
                  </p>
                  <h3 className="font-display text-2xl leading-tight text-foreground">
                    {s.headline}{" "}
                    <span style={{ color: s.color }}>{s.headlineAccent}</span>
                  </h3>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <p
                    className="text-[15px] leading-relaxed mb-6 text-muted-foreground"
                    style={{ lineHeight: 1.7 }}
                  >
                    {s.desc}
                  </p>

                  <ul className="space-y-1.5">
                    {s.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span style={{ color: s.color }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <span
                    className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: s.color }}
                  >
                    En savoir plus →
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
