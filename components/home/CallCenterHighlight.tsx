"use client";

import { Suspense, lazy } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const PerformanceChart = lazy(() => import("@/components/callcenter/PerformanceChart"));

const METRICS = [
  { value: "50",     label: "postes opérationnels" },
  { value: "FR/EN",  label: "bilingue certifié" },
  { value: "24h/24", label: "disponibilité" },
  { value: "100%",   label: "reporting client" },
];

export default function CallCenterHighlight() {
  return (
    <section className="py-24 px-6 grid-bg" style={{ backgroundColor: "var(--ink)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — texte & métriques */}
          <div>
            <p className="label-tag mb-4" style={{ color: "var(--gold)" }}>CALL CENTER · 50 POSTES</p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">
              Madagascar n&apos;est pas<br />
              <span style={{ color: "var(--gold)" }}>un plan B.</span><br />
              C&apos;est un avantage.
            </h2>
            <p className="text-white/50 font-light leading-relaxed mb-10 max-w-md">
              Même fuseau horaire que Paris. Maîtrise parfaite du français et de l&apos;anglais.
              Coûts jusqu&apos;à 60% inférieurs à l&apos;Europe. 50 postes opérationnels, reporting temps réel.
            </p>

            <div className="grid grid-cols-2 gap-px bg-white/10 mb-10">
              {METRICS.map((m, i) => (
                <div key={i} className="py-6 px-5" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <div className="font-display text-3xl mb-1" style={{ color: "var(--gold)" }}>
                    {m.value}
                  </div>
                  <div className="label-tag text-white/40 text-[10px]">{m.label}</div>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="rounded-sm font-medium text-sm hover:opacity-90"
              style={{ backgroundColor: "var(--gold)", color: "var(--ink)" }}
            >
              <Link href="/services/callcenter">
                Découvrir l&apos;offre Call Center →
              </Link>
            </Button>
          </div>

          {/* Right — Graphique de performance */}
          <div
            className="rounded-sm overflow-hidden border"
            style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            <Suspense fallback={
              <div className="h-64 p-6 space-y-3">
                <Skeleton className="h-4 w-1/3 bg-white/10" />
                <Skeleton className="h-48 w-full bg-white/5" />
              </div>
            }>
              <PerformanceChart />
            </Suspense>
          </div>

        </div>
      </div>
    </section>
  );
}
