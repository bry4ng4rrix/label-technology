"use client";

import Image from "next/image";
import DotField from "@/components/DotField";

const STATS = [
  { value: "50", label: "postes Call Center" },
  { value: "7", label: "domaines d'expertise" },
  { value: "FR/EN", label: "bilingue certifié" },
  { value: "72h", label: "délai de réponse" },
];

const HeroSplit = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 px-4 sm:px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Fond animé */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(168, 85, 247, 0.35)"
          gradientTo="rgba(180, 151, 207, 0.25)"
          glowColor="#120F17"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center">
        {/* Colonne texte (gauche) */}
        <div>
          <p className="animate-fadeup-d1 inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-800 bg-white px-4 py-1.5 rounded-full w-fit mb-6">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--gold)" }}
            />
            Label Technology
          </p>

          <h1
            className="animate-fadeup-d2 font-display mb-5 text-white"
            style={{ fontSize: "clamp(1.875rem, 1.2rem + 2.4vw, 3.25rem)" }}
          >
            Votre vision, notre expertise : l&apos;alliance qui transforme le{" "}
            <span className="bg-linear-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              potentiel en performance.
            </span>{" "}
          </h1>

          <p className="animate-fadeup-d3 text-sm md:text-base mb-9 max-w-xl text-gray-300">
            Développement web, Call Center 50 postes FR/EN, Marketing digital,
            Digitalisation, Traitement de données, Matériel IT & Comptabilité —
            une seule équipe, sept expertises, des résultats mesurables.
          </p>

          {/* Stats */}
          <div className="animate-fadeup-d4 grid grid-cols-4 gap-px rounded-xl overflow-hidden bg-slate-800/30 backdrop-blur-2xl border border-white/10 max-w-lg">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="px-4 py-3 text-center hover:bg-white/5 transition-colors"
              >
                <div
                  className="text-xl md:text-2xl mb-0.5"
                  style={{ color: "var(--brand-lt)" }}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-[9px] label-tag">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne photos (droite) */}
        <div className="animate-fadeup-d5 relative h-105 sm:h-120 md:h-140">
          {/* Décor pointillé */}
          <div
            className="pointer-events-none absolute -top-6 right-8 h-28 w-28 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* Grande photo, en bas à gauche */}
          <div className="absolute left-0 bottom-0 h-[70%] w-[58%] rounded-4xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <Image
              src="/images/services/dev.jpg"
              alt="Équipe développement Label Technology"
              fill
              sizes="(max-width: 1024px) 60vw, 320px"
              className="object-cover"
              priority
            />
          </div>

          {/* Photo ronde, en haut à droite */}
          <div className="absolute top-0 right-0 h-[44%] w-[44%] rounded-full overflow-hidden ring-4 ring-slate-950 shadow-xl">
            <Image
              src="/images/services/call.jpg"
              alt="Call center Label Technology"
              fill
              sizes="(max-width: 1024px) 45vw, 240px"
              className="object-cover"
            />
          </div>

          {/* Petite photo carrée, au centre droit */}
          <div className="absolute top-[46%] right-[6%] h-[26%] w-[30%] rounded-2xl overflow-hidden ring-4 ring-slate-950 shadow-xl">
            <Image
              src="/images/services/it.jpg"
              alt="Matériel IT Label Technology"
              fill
              sizes="(max-width: 1024px) 30vw, 180px"
              className="object-cover"
            />
          </div>

          {/* Photo basse, milieu droit — chevauchement */}
          <div className="absolute bottom-0 right-[8%] h-[30%] w-[34%] rounded-2xl overflow-hidden ring-4 ring-slate-950 shadow-xl">
            <Image
              src="/images/services/mark.jpg"
              alt="Marketing digital Label Technology"
              fill
              sizes="(max-width: 1024px) 34vw, 200px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplit;
