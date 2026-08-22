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

const TAG_META: Record<string, { color: string; bg: string; border: string }> =
  {
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
    INFRASTRUCTURE: {
      color: "#06B6D4",
      bg: "rgba(6,182,212,0.10)",
      border: "rgba(6,182,212,0.30)",
    },
  };

export default function ProjetsList({ projets }: { projets: Projet[] }) {
  const [active, setActive] = useState("TOUS");

  const TAGS = ["TOUS", ...Array.from(new Set(projets.map((p) => p.tag)))];

  const filtered =
    active === "TOUS" ? projets : projets.filter((p) => p.tag === active);

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

        .proj-card:hover {
          border-color: var(--tag-color) !important;
          box-shadow: 0 20px 40px -12px color-mix(in srgb, var(--tag-color) 35%, transparent);
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
            const count =
              tag === "TOUS"
                ? projets.length
                : projets.filter((p) => p.tag === tag).length;

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
          {filtered.map((p, i) => {
            const meta = TAG_META[p.tag] ?? {
              color: "var(--brand)",
              bg: "rgba(30,63,171,0.08)",
            };
            return (
              <article
                key={`${active}-${i}`}
                className="proj-card group flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
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
                  <p
                    className="text-sm font-light leading-relaxed flex-1"
                    style={{ color: "var(--mid)" }}
                  >
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
