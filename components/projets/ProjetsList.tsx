"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import FilterChips, { type ChipMeta } from "@/components/shared/FilterChips";
import PhotoPanel from "@/components/services/PhotoPanel";
import { coverFor } from "@/lib/tag-covers";

type Projet = {
  tag: string;
  title: string;
  desc: string;
  metrics: string[];
};

const TAG_META: Record<string, ChipMeta> = {
  DÉVELOPPEMENT: { color: "#3B82F6", bg: "rgba(59,130,246,0.10)" },
  MARKETING: { color: "#EC4899", bg: "rgba(236,72,153,0.10)" },
  DIGITALISATION: { color: "#10B981", bg: "rgba(16,185,129,0.10)" },
  DONNÉES: { color: "#8B5CF6", bg: "rgba(139,92,246,0.10)" },
  INFRASTRUCTURE: { color: "#06B6D4", bg: "rgba(6,182,212,0.10)" },
};

export default function ProjetsList({ projets }: { projets: Projet[] }) {
  const [active, setActive] = useState("TOUS");

  const TAGS = ["TOUS", ...Array.from(new Set(projets.map((p) => p.tag)))];
  const counts = Object.fromEntries(
    TAGS.map((t) => [t, t === "TOUS" ? projets.length : projets.filter((p) => p.tag === t).length]),
  );

  const filtered = active === "TOUS" ? projets : projets.filter((p) => p.tag === active);

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

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const meta = TAG_META[p.tag] ?? { color: "var(--brand)", bg: "rgba(30,63,171,0.08)" };
            return (
              <div
                key={`${active}-${i}`}
                className="animate-fadeup h-full"
                style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
              >
                <article
                  className="group flex h-full flex-col"
                  style={{ ["--svc" as string]: meta.color }}
                >
                  <PhotoPanel
                    src={coverFor(p.tag)}
                    alt=""
                    ratio="16/9"
                    tone="light"
                    tint="soft"
                    quality={60}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="rounded-2xl"
                  />
                  <div className="mt-6 flex flex-1 flex-col">
                    <div className="mb-4 flex items-center justify-between">
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        {p.tag}
                      </span>
                    </div>

                    <h2 className="font-display text-lg leading-snug tracking-tight text-foreground">
                      {p.title}
                    </h2>

                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>

                    {p.metrics.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2 border-t border-border/70 pt-5">
                        {p.metrics.map((m, j) => (
                          <li
                            key={j}
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                            style={{ backgroundColor: meta.bg, color: meta.color }}
                          >
                            <CheckCircle2 size={11} strokeWidth={2.5} />
                            {m}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <p className="meta mt-12 text-center tracking-wide">
          {filtered.length} réalisation{filtered.length > 1 ? "s" : ""}{" "}
          {active !== "TOUS" ? `· ${active}` : "· tous domaines"}
        </p>
      </div>
    </section>
  );
}
