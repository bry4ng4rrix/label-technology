"use client";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Projet = {
  tag: string;
  title: string;
  desc: string;
  metrics: string[];
  color: string;
};

const PROJETS: Projet[] = [
  {
    tag: "DÉVELOPPEMENT",
    title: "Application de gestion de boutique cosmétique & habillement",
    desc: "Solution de gestion de magasin en temps réel pour une boutique de cosmétique et prêt-à-porter. Gestion des stocks, des commerçants, transferts de produits par employé et chat intégré.",
    metrics: [
      "Flux de stock en temps réel",
      "Chat client intégré",
      "Gestion multi-commerçants",
    ],
    color: "var(--ink)",
  },
  {
    tag: "CALL CENTER",
    title: "Prospection B2B France — Secteur Immobilier",
    desc: "Campagne de qualification de fichiers et prise de rendez-vous pour un réseau d'agences immobilières français. 3 mois, 12 agents dédiés, 400+ RDV qualifiés livrés.",
    metrics: ["400+ RDV qualifiés", "12 agents", "3 mois"],
    color: "var(--brand)",
  },
  {
    tag: "CALL CENTER",
    title: "Support client multicanal — E-commerce FR",
    desc: "Gestion des appels entrants, emails et chat pour une boutique en ligne française. 98% de satisfaction client mesuré sur 6 mois.",
    metrics: ["98% satisfaction", "8 agents", "6 mois"],
    color: "var(--brand)",
  },
  {
    tag: "DÉVELOPPEMENT",
    title: "Plateforme de gestion RH — Secteur Education",
    desc: "Application web de gestion du personnel pour un réseau d'écoles privées à Madagascar. 500 utilisateurs, gestion des contrats, paie et congés.",
    metrics: ["500 utilisateurs", "React + Node.js", "6 mois"],
    color: "var(--ink)",
  },
  {
    tag: "DÉVELOPPEMENT",
    title: "Application mobile logistique iOS/Android",
    desc: "Application React Native de suivi de flotte et gestion des livraisons. Synchronisation temps réel, offline-first, 200 chauffeurs.",
    metrics: ["200 utilisateurs", "React Native", "4 mois"],
    color: "var(--ink)",
  },
  {
    tag: "MARKETING",
    title: "Refonte SEO & campagnes Google Ads",
    desc: "Audit SEO complet, refonte de la stratégie de contenu et gestion de campagnes Google Ads pour un e-commerçant français. +180% de trafic organique.",
    metrics: ["+180% trafic", "+45% conversions", "6 mois"],
    color: "var(--brand)",
  },
  {
    tag: "MARKETING",
    title: "Stratégie social media B2B — LinkedIn",
    desc: "Community management et stratégie de contenu LinkedIn pour un cabinet de conseil. Audience triplée, 15 leads qualifiés par mois.",
    metrics: ["×3 audience", "15 leads/mois", "4 mois"],
    color: "var(--brand)",
  },
  {
    tag: "DIGITALISATION",
    title: "Déploiement ERP Odoo — PME Madagascar",
    desc: "Migration d'un système papier vers Odoo pour une entreprise de distribution. Comptabilité, stocks, achats et ventes centralisés. Formation de 30 employés.",
    metrics: ["30 utilisateurs", "Odoo", "4 mois"],
    color: "var(--ink)",
  },
  {
    tag: "DIGITALISATION",
    title: "SIRH sur mesure — Réseau d'hôtels",
    desc: "Logiciel de gestion RH adapté au droit malgache pour un groupe hôtelier. Bulletins de paie, gestion des plannings, suivi des absences.",
    metrics: ["250 employés", "Sur mesure", "5 mois"],
    color: "var(--ink)",
  },
  {
    tag: "DONNÉES",
    title: "Traitement & enrichissement base CRM",
    desc: "Nettoyage et enrichissement d'une base de 50 000 contacts pour une société de marketing direct. Déduplication, vérification emails, enrichissement secteur.",
    metrics: ["50 000 contacts", "98% précision", "3 semaines"],
    color: "var(--brand)",
  },
  {
    tag: "DONNÉES",
    title: "Numérisation archives documentaires",
    desc: "12 ans d'archives papier numérisés, indexés et classés en GED pour un cabinet notarial. Recherche full-text, conformité RGPD.",
    metrics: ["80 000 docs", "GED complète", "2 mois"],
    color: "var(--brand)",
  },
  {
    tag: "INFRASTRUCTURE",
    title: "Équipement réseau bureau — Antananarivo",
    desc: "Installation complète réseau WiFi, câblage structuré, NAS et postes de travail pour un cabinet de 25 personnes.",
    metrics: ["25 postes", "Infrastructure complète", "2 semaines"],
    color: "var(--ink)",
  },
  {
    tag: "INFRASTRUCTURE",
    title: "Infrastructure réseau ONG internationale",
    desc: "Modernisation complète de l'infrastructure réseau d'une ONG internationale, 3 sites à Antananarivo. Zéro downtime pendant les travaux.",
    metrics: ["3 sites", "Cisco", "3 semaines"],
    color: "var(--ink)",
  },
];

const TAGS = [
  "TOUS",
  "CALL CENTER",
  "DÉVELOPPEMENT",
  "MARKETING",
  "DIGITALISATION",
  "DONNÉES",
  "INFRASTRUCTURE",
];

const TAG_COLORS: Record<string, string> = {
  "CALL CENTER": "var(--brand)",
  DÉVELOPPEMENT: "var(--ink)",
  MARKETING: "var(--brand)",
  DIGITALISATION: "var(--ink)",
  DONNÉES: "var(--brand)",
  INFRASTRUCTURE: "var(--ink)",
};

export default function ProjetsList() {
  const [active, setActive] = useState("TOUS");

  const filtered =
    active === "TOUS" ? PROJETS : PROJETS.filter((p) => p.tag === active);

  return (
    <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-12">
          {TAGS.map((tag) => (
            <Button
              key={tag}
              onClick={() => setActive(tag)}
              size="sm"
              variant={active === tag ? "default" : "outline"}
              className="rounded-sm transition-all text-xs"
              style={
                active === tag
                  ? {
                      backgroundColor: "var(--brand)",
                      color: "var(--white)",
                      borderColor: "var(--brand)",
                    }
                  : { color: "var(--mid)", borderColor: "rgba(0,0,0,0.12)" }
              }
            >
              {tag}
              {tag !== "TOUS" && (
                <span className="ml-2 opacity-60">
                  ({PROJETS.filter((p) => p.tag === tag).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Grille */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <Card
              key={`${active}-${i}`}
              className="border rounded-xl hover:scale-[1.03] hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col h-full overflow-hidden"
              style={{
                borderColor: "rgba(0,0,0,0.08)",
                backgroundColor: "var(--white)",
              }}
            >
              <CardHeader className="p-7 pb-4">
                <CardAction>
                  <Badge
                    variant="secondary"
                    className="label-tag text-[10px] px-2 py-0.5 rounded-sm border-0 font-medium text-white shrink-0"
                    style={{
                      backgroundColor: TAG_COLORS[p.tag] || "var(--brand)",
                    }}
                  >
                    {p.tag}
                  </Badge>
                </CardAction>
                <CardTitle
                  className="font-display text-lg leading-snug font-semibold"
                  style={{ color: "var(--ink)" }}
                >
                  {p.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-7 pb-4 flex-1">
                <CardDescription
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "var(--mid)" }}
                >
                  {p.desc}
                </CardDescription>
              </CardContent>

              <CardFooter className="px-7 py-5 bg-muted/50 border-t flex flex-wrap gap-2 mt-auto">
                {p.metrics.map((m, j) => (
                  <Badge
                    key={j}
                    variant="outline"
                    className="text-[11px] px-2.5 py-0.5 rounded-sm border-brand/20 bg-brand/5 font-normal text-brand"
                    style={{
                      backgroundColor: "rgba(30,63,171,0.06)",
                      color: "var(--brand)",
                    }}
                  >
                    {m}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>

        <p
          className="text-center mt-12 text-sm font-light"
          style={{ color: "var(--mid)" }}
        >
          {filtered.length} réalisation{filtered.length > 1 ? "s" : ""}{" "}
          {active !== "TOUS" ? `en ${active.toLowerCase()}` : "au total"}
        </p>
      </div>
    </section>
  );
}
