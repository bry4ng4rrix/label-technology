"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Projet = {
  tag: string;
  title: string;
  desc: string;
  metrics: string[];
};

const TAG_META: Record<string, { color: string; bg: string; border: string }> =
  {
    ROUTE: {
      color: "#F97316",
      bg: "rgba(249,115,22,0.10)",
      border: "rgba(249,115,22,0.30)",
    },
    ENTREPRISE: {
      color: "#0EA5E9",
      bg: "rgba(14,165,233,0.10)",
      border: "rgba(14,165,233,0.30)",
    },
  };

export default function ConstructionProjetsList({ projets }: { projets: Projet[] }) {
  const [active, setActive] = useState("TOUS");

  const TAGS = ["TOUS", ...Array.from(new Set(projets.map((p) => p.tag)))];

  const filtered =
    active === "TOUS" ? projets : projets.filter((p) => p.tag === active);

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "var(--paper)" }}>
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all${isActive ? " -translate-y-px" : ""}`}
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
                className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
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
