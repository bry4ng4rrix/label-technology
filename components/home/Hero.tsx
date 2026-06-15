"use client";
import React from "react";
import Aurora from "@/components/Aurora";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Hero = () => {
  const STATS = [
    { value: "50", label: "postes Call Center" },
    { value: "7", label: "domaines d'expertise" },
    { value: "FR/EN", label: "bilingue certifié" },
    { value: "72h", label: "délai de réponse" },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-slate-950 dark:bg-slate-800">
      <div className="absolute inset-0">
        <Aurora />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-start px-4">
        <div className="max-w-4xl  space-y-6">
          <p className="font-semibold text-white/70">
            Antananarivo · Madagascar · International
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-rostex text-white">
            La technologie au services{" "}
            <span className="text-blue-500"> de votre croissance.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 ">
            Développement web, Call Center 50 postes FR/EN, Marketing digital,
            Digitalisation, Traitement de données, Matériel IT & Comptabilité —
            une seule équipe, sept expertises, des résultats mesurables.
          </p>
          <p className="text-lg md:text-xl text-white/70 ">
            "Votre vision, notre expertise : l'alliance qui transforme le
            potentiel en performance."
          </p>
          <div className="flex space-x-4">
            <Button
              className="h-14 text-medium bg-blue-500 text-white hover:scale-105 transition-all duration-300"
              size="lg"
            >
              <Link href="/contact">Demarrer un projets</Link>
            </Button>
            <Button
              className="h-14 text-medium hover:scale-105 transition-all duration-300"
              variant="outline"
              size="lg"
            >
              Call Center 50 postes
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-sm overflow-hidden animate-fadeup-d5 mt-10">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="px-6 py-5 text-center hover:bg-white/5 transition-colors"
              style={{ backgroundColor: "var(--ink)" }}
            >
              <div
                className=" text-3xl mb-1"
                style={{ color: "var(--brand-lt)" }}
              >
                {stat.value}
              </div>
              <div className="text-white/50 text-xs label-tag">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
