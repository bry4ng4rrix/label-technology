"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, Briefcase, ArrowRight, Zap } from "lucide-react";
import FilterChips, { type ChipMeta } from "@/components/shared/FilterChips";

type Offre = {
  id: string;
  tag: string;
  title: string;
  contrat: string;
  lieu: string;
  niveau: string;
  desc: string;
  missions: string[];
  urgent?: boolean;
};

const TAG_META: Record<string, ChipMeta> = {
  DÉVELOPPEMENT: { color: "#3B82F6", bg: "rgba(59,130,246,0.10)" },
  MARKETING: { color: "#EC4899", bg: "rgba(236,72,153,0.10)" },
  DIGITALISATION: { color: "#10B981", bg: "rgba(16,185,129,0.10)" },
  DONNÉES: { color: "#8B5CF6", bg: "rgba(139,92,246,0.10)" },
  COMPTABILITÉ: { color: "#EF4444", bg: "rgba(239,68,68,0.10)" },
  INFRASTRUCTURE: { color: "#06B6D4", bg: "rgba(6,182,212,0.10)" },
};

export default function JobsList({ offres }: { offres: Offre[] }) {
  const [active, setActive] = useState("TOUS");

  const TAGS = ["TOUS", ...Array.from(new Set(offres.map((o) => o.tag)))];
  const counts = Object.fromEntries(
    TAGS.map((t) => [t, t === "TOUS" ? offres.length : offres.filter((o) => o.tag === t).length]),
  );

  const filtered = active === "TOUS" ? offres : offres.filter((o) => o.tag === active);

  return (
    <section className="surface-light section relative">
      <div className="container-x">
        <FilterChips
          tags={TAGS}
          active={active}
          onChange={setActive}
          counts={counts}
          meta={TAG_META}
          className="mb-12"
        />

        {filtered.length === 0 ? (
          <div className="card-premium mx-auto max-w-md p-10 text-center hover:translate-y-0">
            <Briefcase className="mx-auto mb-4 size-8 text-brand/50" strokeWidth={1.5} />
            <p className="font-display text-lg text-foreground">Aucune offre pour le moment.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Envoyez-nous une candidature spontanée, on grandit vite.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((o, i) => {
              const meta = TAG_META[o.tag] ?? { color: "var(--brand)", bg: "rgba(30,63,171,0.08)" };
              return (
                <article
                  key={o.id}
                  className="card-premium group animate-fadeup relative flex h-full flex-col p-7"
                  style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
                >
                  <Link
                    href={`/recru/postuler/${o.id}`}
                    className="absolute inset-0 z-10 rounded-[inherit] focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
                    aria-label={`Postuler — ${o.title}`}
                  />

                  <div className="mb-5 flex items-center justify-between gap-2">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase"
                      style={{ backgroundColor: meta.bg, color: meta.color }}
                    >
                      {o.tag}
                    </span>
                    {o.urgent && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold/12 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-gold uppercase">
                        <Zap className="size-3" strokeWidth={2.5} />
                        Urgent
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand">
                    {o.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
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

                  <p className="mt-4 line-clamp-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                    {o.desc}
                  </p>

                  {o.missions.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-4">
                      {o.missions.map((m, j) => (
                        <li
                          key={j}
                          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                          style={{ backgroundColor: meta.bg, color: meta.color }}
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span
                    className="link-arrow mt-6 text-sm"
                    style={{ color: meta.color }}
                  >
                    Postuler
                    <ArrowRight size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </article>
              );
            })}
          </div>
        )}

        <p className="meta mt-12 text-center tracking-wide">
          {filtered.length} offre{filtered.length > 1 ? "s" : ""} d&apos;emploi{" "}
          {active !== "TOUS" ? `· ${active}` : "· tous domaines"}
        </p>
      </div>
    </section>
  );
}
