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
    <div className="relative w-full h-[calc(110vh-64px)] overflow-hidden bg-slate-950 dark:bg-slate-800">
      <div className="absolute inset-0">
        <Aurora />
      </div>
      <div className="relative my-20 sm:mt-10 z-10 flex flex-col items-center justify-center h-full text-center px-4 ">
        <div className="max-w-7xl px-10  space-y-2">
          <p className="animate-fadeup font-semibold text-white/70">
            Antananarivo · Madagascar · International
          </p>
          <p className="animate-fadeup-d1 text-sm  md:text-md text-white/70 ">
            "Votre vision, notre expertise : l'alliance qui transforme le
            potentiel en performance."
          </p>
          <h1 className="animate-fadeup-d2 text-5xl sm:text-6xl md:text-8xl font-bold mb-4  text-white">
            La technologie au services{" "}
            <span className="bg-linear-to-r from-blue-500  to-emerald-500 bg-clip-text text-transparent">
              {" "}
              de votre croissance.
            </span>
          </h1>
          <p className="animate-fadeup-d3 text-sm md:text-md text-gray-200 mb-8 max-w-3xl mx-auto">
            Développement web, Call Center 50 postes FR/EN, Marketing digital,
            Digitalisation, Traitement de données, Matériel IT & Comptabilité —
            une seule équipe, sept expertises, des résultats mesurables.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-sm overflow-hidden animate-fadeup-d5 my-10 ">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="px-6 py-5 text-center hover:bg-white/5 transition-colors"
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
