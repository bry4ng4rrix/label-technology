"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

type Projet = {
  tag: string;
  title: string;
  desc: string;
  metrics: string[];
};

const PROJETS: Projet[] = [
  {
    tag: "DÉVELOPPEMENT",
    title: "Application de gestion de boutique cosmétique & habillement",
    desc: "Solution de gestion de magasin en temps réel pour une boutique de cosmétique et prêt-à-porter. Gestion des stocks, des commerçants, transferts de produits par employé et chat intégré.",
    metrics: ["Flux de stock en temps réel", "Chat client intégré", "Gestion multi-commerçants"],
  },
  {
    tag: "CALL CENTER",
    title: "Prospection B2B France — Secteur Immobilier",
    desc: "Campagne de qualification de fichiers et prise de rendez-vous pour un réseau d'agences immobilières français. 3 mois, 12 agents dédiés, 400+ RDV qualifiés livrés.",
    metrics: ["400+ RDV qualifiés", "12 agents", "3 mois"],
  },
  {
    tag: "CALL CENTER",
    title: "Support client multicanal — E-commerce FR",
    desc: "Gestion des appels entrants, emails et chat pour une boutique en ligne française. 98% de satisfaction client mesuré sur 6 mois.",
    metrics: ["98% satisfaction", "8 agents", "6 mois"],
  },
  {
    tag: "DÉVELOPPEMENT",
    title: "Plateforme de gestion RH — Secteur Education",
    desc: "Application web de gestion du personnel pour un réseau d'écoles privées à Madagascar. 500 utilisateurs, gestion des contrats, paie et congés.",
    metrics: ["500 utilisateurs", "React + Node.js", "6 mois"],
  },
  {
    tag: "DÉVELOPPEMENT",
    title: "Application mobile logistique iOS/Android",
    desc: "Application React Native de suivi de flotte et gestion des livraisons. Synchronisation temps réel, offline-first, 200 chauffeurs.",
    metrics: ["200 utilisateurs", "React Native", "4 mois"],
  },
  {
    tag: "MARKETING",
    title: "Refonte SEO & campagnes Google Ads",
    desc: "Audit SEO complet, refonte de la stratégie de contenu et gestion de campagnes Google Ads pour un e-commerçant français. +180% de trafic organique.",
    metrics: ["+180% trafic", "+45% conversions", "6 mois"],
  },
  {
    tag: "MARKETING",
    title: "Stratégie social media B2B — LinkedIn",
    desc: "Community management et stratégie de contenu LinkedIn pour un cabinet de conseil. Audience triplée, 15 leads qualifiés par mois.",
    metrics: ["×3 audience", "15 leads/mois", "4 mois"],
  },
  {
    tag: "DIGITALISATION",
    title: "Déploiement ERP Odoo — PME Madagascar",
    desc: "Migration d'un système papier vers Odoo pour une entreprise de distribution. Comptabilité, stocks, achats et ventes centralisés. Formation de 30 employés.",
    metrics: ["30 utilisateurs", "Odoo", "4 mois"],
  },
  {
    tag: "DIGITALISATION",
    title: "SIRH sur mesure — Réseau d'hôtels",
    desc: "Logiciel de gestion RH adapté au droit malgache pour un groupe hôtelier. Bulletins de paie, gestion des plannings, suivi des absences.",
    metrics: ["250 employés", "Sur mesure", "5 mois"],
  },
  {
    tag: "DONNÉES",
    title: "Traitement & enrichissement base CRM",
    desc: "Nettoyage et enrichissement d'une base de 50 000 contacts pour une société de marketing direct. Déduplication, vérification emails, enrichissement secteur.",
    metrics: ["50 000 contacts", "98% précision", "3 semaines"],
  },
  {
    tag: "DONNÉES",
    title: "Numérisation archives documentaires",
    desc: "12 ans d'archives papier numérisés, indexés et classés en GED pour un cabinet notarial. Recherche full-text, conformité RGPD.",
    metrics: ["80 000 docs", "GED complète", "2 mois"],
  },
  {
    tag: "INFRASTRUCTURE",
    title: "Équipement réseau bureau — Antananarivo",
    desc: "Installation complète réseau WiFi, câblage structuré, NAS et postes de travail pour un cabinet de 25 personnes.",
    metrics: ["25 postes", "Infrastructure complète", "2 semaines"],
  },
  {
    tag: "INFRASTRUCTURE",
    title: "Infrastructure réseau ONG internationale",
    desc: "Modernisation complète de l'infrastructure réseau d'une ONG internationale, 3 sites à Antananarivo. Zéro downtime pendant les travaux.",
    metrics: ["3 sites", "Cisco", "3 semaines"],
  },
];

const TAGS = ["TOUS", "CALL CENTER", "DÉVELOPPEMENT", "MARKETING", "DIGITALISATION", "DONNÉES", "INFRASTRUCTURE"];

const TAG_META: Record<string, { color: string; bg: string }> = {
  "CALL CENTER":    { color: "#F59E0B", bg: "rgba(245,158,11,0.10)" },
  "DÉVELOPPEMENT":  { color: "#3B82F6", bg: "rgba(59,130,246,0.10)" },
  "MARKETING":      { color: "#EC4899", bg: "rgba(236,72,153,0.10)" },
  "DIGITALISATION": { color: "#10B981", bg: "rgba(16,185,129,0.10)" },
  "DONNÉES":        { color: "#8B5CF6", bg: "rgba(139,92,246,0.10)" },
  "INFRASTRUCTURE": { color: "#06B6D4", bg: "rgba(6,182,212,0.10)" },
};

export default function ProjetsList() {
  const [active, setActive] = useState("TOUS");

  const filtered = active === "TOUS" ? PROJETS : PROJETS.filter((p) => p.tag === active);

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "var(--paper)" }}>
      <style>{`
        @keyframes projFadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .proj-card {
          opacity: 0;
          animation: projFadeInUp 0.5s ease-out forwards;
        }
        .proj-card:nth-child(1)  { animation-delay: 0.04s; }
        .proj-card:nth-child(2)  { animation-delay: 0.08s; }
        .proj-card:nth-child(3)  { animation-delay: 0.12s; }
        .proj-card:nth-child(4)  { animation-delay: 0.16s; }
        .proj-card:nth-child(5)  { animation-delay: 0.20s; }
        .proj-card:nth-child(6)  { animation-delay: 0.24s; }
        .proj-card:nth-child(7)  { animation-delay: 0.28s; }
        .proj-card:nth-child(8)  { animation-delay: 0.32s; }
        .proj-card:nth-child(9)  { animation-delay: 0.36s; }
        .proj-card:nth-child(10) { animation-delay: 0.40s; }
        .proj-card:nth-child(11) { animation-delay: 0.44s; }
        .proj-card:nth-child(12) { animation-delay: 0.48s; }
        .proj-card:nth-child(13) { animation-delay: 0.52s; }

        .proj-filter-btn {
          transition: all 0.2s ease;
        }
        .proj-filter-btn:hover {
          transform: translateY(-1px);
        }
        .proj-filter-btn.active {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        @media (prefers-reduced-motion: reduce) {
          .proj-card { animation: none !important; opacity: 1 !important; transform: none !important; }
          .proj-filter-btn:hover, .proj-filter-btn.active { transform: none !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-14">
          {TAGS.map((tag) => {
            const isActive = active === tag;
            const meta = TAG_META[tag];
            const count = tag === "TOUS" ? PROJETS.length : PROJETS.filter((p) => p.tag === tag).length;

            return (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className={`proj-filter-btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-colors${isActive ? " active" : ""}`}
                style={
                  isActive
                    ? {
                        backgroundColor: meta ? meta.color : "var(--brand)",
                        borderColor: meta ? meta.color : "var(--brand)",
                        color: "#fff",
                      }
                    : {
                        backgroundColor: "transparent",
                        borderColor: "rgba(0,0,0,0.12)",
                        color: "var(--mid)",
                      }
                }
              >
                {tag}
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    backgroundColor: isActive ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.07)",
                    color: isActive ? "#fff" : "var(--mid)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grille */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => {
            const meta = TAG_META[p.tag] ?? { color: "var(--brand)", bg: "rgba(30,63,171,0.08)" };
            return (
              <article
                key={`${active}-${i}`}
                className="proj-card group flex flex-col bg-white rounded-xl overflow-hidden border border-black/6 hover:border-transparent hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Barre colorée en haut */}
                <div className="h-1 w-full" style={{ backgroundColor: meta.color }} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="label-tag text-[10px] px-2.5 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: meta.bg, color: meta.color }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  {/* Titre */}
                  <h3
                    className="font-display text-base font-semibold leading-snug mb-3"
                    style={{ color: "var(--ink)" }}
                  >
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-light leading-relaxed flex-1" style={{ color: "var(--mid)" }}>
                    {p.desc}
                  </p>

                  {/* Métriques */}
                  <div
                    className="mt-5 pt-4 border-t flex flex-wrap gap-2"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    {p.metrics.map((m, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        <CheckCircle2 size={10} strokeWidth={2.5} />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Compteur */}
        <p
          className="text-center mt-12 text-xs font-light tracking-wide"
          style={{ color: "var(--mid)" }}
        >
          {filtered.length} réalisation{filtered.length > 1 ? "s" : ""}{" "}
          {active !== "TOUS" ? `· ${active}` : "· tous domaines"}
        </p>
      </div>
    </section>
  );
}
