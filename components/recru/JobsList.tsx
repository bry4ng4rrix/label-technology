"use client";

import { useState } from "react";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

type Offre = {
  tag: string;
  title: string;
  contrat: string;
  lieu: string;
  niveau: string;
  desc: string;
  missions: string[];
  urgent?: boolean;
};

const OFFRES: Offre[] = [
  {
    tag: "CALL CENTER",
    title: "Agent Call Center Bilingue FR/EN",
    contrat: "CDI · Temps plein",
    lieu: "Antananarivo",
    niveau: "Débutant accepté",
    desc: "Rejoignez notre plateau de 50 postes pour la prospection B2B et le support client de nos clients français et internationaux. Formation assurée dès l'intégration.",
    missions: [
      "Prospection B2B",
      "Support client FR/EN",
      "Qualification de fichiers",
      "Prise de rendez-vous",
    ],
    urgent: true,
  },
  {
    tag: "CALL CENTER",
    title: "Superviseur Plateau Call Center",
    contrat: "CDI · Temps plein",
    lieu: "Antananarivo",
    niveau: "2 ans d'expérience",
    desc: "Encadrez une équipe d'agents, suivez les indicateurs de performance et garantissez la qualité de service sur nos campagnes B2B et support client.",
    missions: [
      "Management d'équipe",
      "Suivi KPI",
      "Reporting client",
      "Formation continue",
    ],
    urgent: true,
  },
  {
    tag: "DÉVELOPPEMENT",
    title: "Développeur Full-Stack Next.js / Node.js",
    contrat: "CDI · Temps plein",
    lieu: "Antananarivo / Hybride",
    niveau: "2+ ans d'expérience",
    desc: "Concevez et développez des applications web et mobiles pour nos clients européens et africains. Stack moderne, standards de code exigeants.",
    missions: [
      "Développement Next.js/React",
      "APIs Node.js",
      "Revue de code",
      "Déploiement CI/CD",
    ],
  },
  {
    tag: "DÉVELOPPEMENT",
    title: "Développeur React Native",
    contrat: "CDI · Temps plein",
    lieu: "Antananarivo / Hybride",
    niveau: "1+ an d'expérience",
    desc: "Participez au développement d'applications mobiles iOS/Android pour des clients dans la logistique, l'e-commerce et les services.",
    missions: [
      "Développement React Native",
      "Intégration API",
      "Tests & débogage",
      "Publication stores",
    ],
  },
  {
    tag: "MARKETING",
    title: "Chargé(e) de Marketing Digital & SEO",
    contrat: "CDI · Temps plein",
    lieu: "Antananarivo",
    niveau: "1+ an d'expérience",
    desc: "Pilotez des campagnes SEO, Google Ads et social media pour des clients français et malgaches. Résultats mesurables, reporting mensuel.",
    missions: [
      "SEO & contenu",
      "Campagnes Google/Meta Ads",
      "Community management",
      "Analytics & reporting",
    ],
  },
  {
    tag: "DIGITALISATION",
    title: "Consultant ERP Odoo",
    contrat: "CDI · Temps plein",
    lieu: "Antananarivo",
    niveau: "2+ ans d'expérience",
    desc: "Accompagnez nos clients dans le déploiement et la configuration d'ERP Odoo : comptabilité, stocks, ventes, RH.",
    missions: [
      "Paramétrage Odoo",
      "Formation utilisateurs",
      "Migration de données",
      "Support post-déploiement",
    ],
  },
  {
    tag: "DONNÉES",
    title: "Data Analyst / Traitement de Données",
    contrat: "CDI · Temps plein",
    lieu: "Antananarivo",
    niveau: "Débutant accepté",
    desc: "Nettoyage, enrichissement et analyse de bases de données pour des clients en marketing direct et gestion de la relation client.",
    missions: [
      "Saisie & nettoyage",
      "Déduplication",
      "Analyse & dataviz",
      "Automatisation ETL",
    ],
  },
  {
    tag: "COMPTABILITÉ",
    title: "Comptable Externalisation FR",
    contrat: "CDI · Temps plein",
    lieu: "Antananarivo",
    niveau: "2+ ans d'expérience",
    desc: "Gérez la saisie comptable, les rapprochements bancaires et le reporting mensuel pour un portefeuille de clients français.",
    missions: [
      "Saisie comptable",
      "Rapprochements bancaires",
      "Reporting mensuel",
      "Relation client dédiée",
    ],
  },
  {
    tag: "INFRASTRUCTURE",
    title: "Technicien Support IT & Réseau",
    contrat: "CDI · Temps plein",
    lieu: "Antananarivo",
    niveau: "1+ an d'expérience",
    desc: "Installation et maintenance de parcs informatiques, réseaux et serveurs pour nos clients à Antananarivo.",
    missions: [
      "Installation postes & réseau",
      "Maintenance parc IT",
      "Support utilisateurs",
      "Câblage structuré",
    ],
  },
];

const TAGS = [
  "TOUS",
  "CALL CENTER",
  "DÉVELOPPEMENT",
  "MARKETING",
  "DIGITALISATION",
  "DONNÉES",
  "COMPTABILITÉ",
  "INFRASTRUCTURE",
];

const TAG_META: Record<string, { color: string; bg: string; border: string }> =
  {
    "CALL CENTER": {
      color: "#F59E0B",
      bg: "rgba(245,158,11,0.10)",
      border: "rgba(245,158,11,0.30)",
    },
    DÉVELOPPEMENT: {
      color: "#3B82F6",
      bg: "rgba(59,130,246,0.10)",
      border: "rgba(59,130,246,0.30)",
    },
    MARKETING: {
      color: "#EC4899",
      bg: "rgba(236,72,153,0.10)",
      border: "rgba(236,72,153,0.30)",
    },
    DIGITALISATION: {
      color: "#10B981",
      bg: "rgba(16,185,129,0.10)",
      border: "rgba(16,185,129,0.30)",
    },
    DONNÉES: {
      color: "#8B5CF6",
      bg: "rgba(139,92,246,0.10)",
      border: "rgba(139,92,246,0.30)",
    },
    COMPTABILITÉ: {
      color: "#EF4444",
      bg: "rgba(239,68,68,0.10)",
      border: "rgba(239,68,68,0.30)",
    },
    INFRASTRUCTURE: {
      color: "#06B6D4",
      bg: "rgba(6,182,212,0.10)",
      border: "rgba(6,182,212,0.30)",
    },
  };

export default function JobsList() {
  const [active, setActive] = useState("TOUS");

  const filtered =
    active === "TOUS" ? OFFRES : OFFRES.filter((o) => o.tag === active);

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "var(--paper)" }}>
      <style>{`
        @keyframes jobFadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .job-card {
          opacity: 0;
          animation: jobFadeInUp 0.5s ease-out forwards;
        }
        .job-card:nth-child(1)  { animation-delay: 0.04s; }
        .job-card:nth-child(2)  { animation-delay: 0.08s; }
        .job-card:nth-child(3)  { animation-delay: 0.12s; }
        .job-card:nth-child(4)  { animation-delay: 0.16s; }
        .job-card:nth-child(5)  { animation-delay: 0.20s; }
        .job-card:nth-child(6)  { animation-delay: 0.24s; }
        .job-card:nth-child(7)  { animation-delay: 0.28s; }
        .job-card:nth-child(8)  { animation-delay: 0.32s; }
        .job-card:nth-child(9)  { animation-delay: 0.36s; }

        .job-filter-btn {
          transition: all 0.2s ease;
        }
        .job-filter-btn:hover {
          transform: translateY(-1px);
        }
        .job-filter-btn.active {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .job-card:hover {
          border-color: var(--tag-color) !important;
          box-shadow: 0 20px 40px -12px color-mix(in srgb, var(--tag-color) 35%, transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .job-card { animation: none !important; opacity: 1 !important; transform: none !important; }
          .job-filter-btn:hover, .job-filter-btn.active { transform: none !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-14">
          {TAGS.map((tag) => {
            const isActive = active === tag;
            const meta = TAG_META[tag];
            const count =
              tag === "TOUS"
                ? OFFRES.length
                : OFFRES.filter((o) => o.tag === tag).length;

            return (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className={`job-filter-btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-colors${isActive ? " active" : ""}`}
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
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(0,0,0,0.07)",
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
          {filtered.map((o, i) => {
            const meta = TAG_META[o.tag] ?? {
              color: "var(--brand)",
              bg: "rgba(30,63,171,0.08)",
            };
            return (
              <article
                key={`${active}-${i}`}
                className="job-card group flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl  hover:-translate-y-1.5 transition-all duration-300"
                style={
                  {
                    borderColor: meta.border,
                    "--tag-color": meta.color,
                  } as React.CSSProperties
                }
              >
                <div className="p-6 flex flex-col flex-1">
                  {/* Tag + urgent */}
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <span
                      className="label-tag text-[10px] px-2.5 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: meta.bg, color: meta.color }}
                    >
                      {o.tag}
                    </span>
                    {o.urgent && (
                      <span
                        className="label-tag text-[10px] px-2.5 py-1 rounded-full font-semibold"
                        style={{
                          backgroundColor: "rgba(245,166,35,0.12)",
                          color: "var(--gold)",
                        }}
                      >
                        RECRUTEMENT URGENT
                      </span>
                    )}
                  </div>

                  {/* Titre */}
                  <h3
                    className="font-display text-base font-semibold leading-snug mb-3"
                    style={{ color: "var(--ink)" }}
                  >
                    {o.title}
                  </h3>

                  {/* Meta ligne */}
                  <div
                    className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-xs"
                    style={{ color: "var(--mid)" }}
                  >
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} strokeWidth={2} />
                      {o.lieu}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} strokeWidth={2} />
                      {o.contrat}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={12} strokeWidth={2} />
                      {o.niveau}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm font-light leading-relaxed flex-1"
                    style={{ color: "var(--mid)" }}
                  >
                    {o.desc}
                  </p>

                  {/* Missions */}
                  <div
                    className="mt-5 pt-4 border-t flex flex-wrap gap-2"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    {o.missions.map((m, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Postuler */}
                  <a
                    href={`mailto:contact@labeltechnology.mg?subject=${encodeURIComponent("Candidature — " + o.title)}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                    style={{ color: meta.color }}
                  >
                    Postuler
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </a>
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
          {filtered.length} offre{filtered.length > 1 ? "s" : ""} d&apos;emploi{" "}
          {active !== "TOUS" ? `· ${active}` : "· tous domaines"}
        </p>
      </div>
    </section>
  );
}
