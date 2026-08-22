"use client";

import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import DotField from "@/components/DotField";
import { Badge } from "@/components/ui/badge";
const STATS = [
  { value: "60+", label: "collaborateurs" },
  { value: "6", label: "domaines d'expertise" },
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

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              potentiel en
              <Typewriter
                words={[
                  " performance.",
                  " réalité.",
                  " succès.",
                  " excellence.",
                  " innovation.",
                ]}
                loop={1}
                typeSpeed={50}
                cursorStyle="|"
                cursorColor="#10B981"
              />
            </span>
          </h1>

          <p className="animate-fadeup-d3 text-sm md:text-base mb-9 max-w-xl text-gray-300">
            Développement web, Marketing digital, Digitalisation, Traitement de
            données, Matériel IT & Comptabilité — une seule équipe, six
            expertises, des résultats mesurables.
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
        <div className="animate-fadeup-d5 relative h-115 sm:h-130 md:h-155">
          {/* Grande photo, en bas à gauche */}
          <div
            className="group absolute left-0 bottom-0 h-[74%] w-[62%] hero-photo"
            style={{ "--shadow-color": "#3B82F6" } as React.CSSProperties}
          >
            <div className="relative h-full w-full rounded-4xl overflow-hidden ring-1 ring-white/10 shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_25px_60px_-8px_var(--shadow-color)]">
              <Image
                src="/images/services/garrix.jpg"
                alt="Équipe développement Label Technology"
                fill
                sizes="(max-width: 1024px) 62vw, 340px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Photo ronde, en haut à droite */}
          <div
            className="group absolute top-0 right-0 h-[46%] w-[46%] hero-photo"
            style={{ "--shadow-color": "#F59E0B" } as React.CSSProperties}
          >
            <div className="relative h-full w-full rounded-full overflow-hidden ring-4 ring-slate-950 shadow-xl transition-shadow duration-300 group-hover:shadow-[0_25px_60px_-8px_var(--shadow-color)]">
              <Image
                src="/images/services/callsy.png"
                alt="Équipe Label Technology"
                fill
                sizes="(max-width: 1024px) 46vw, 250px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Petite photo carrée, au centre droit */}
          <div
            className="group absolute top-[48%] right-[2%] h-[28%] w-[32%] hero-photo"
            style={{ "--shadow-color": "#06B6D4" } as React.CSSProperties}
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden ring-4 ring-slate-950 shadow-xl transition-shadow duration-300 group-hover:shadow-[0_25px_60px_-8px_var(--shadow-color)]">
              <Image
                src="/images/services/it.jpg"
                alt="Matériel IT Label Technology"
                fill
                sizes="(max-width: 1024px) 32vw, 190px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Photo basse, milieu droit — chevauchement */}
          <div
            className="group absolute bottom-0 right-[4%] h-[32%] w-[36%] hero-photo"
            style={{ "--shadow-color": "#8B5CF6" } as React.CSSProperties}
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden ring-4 ring-slate-950 shadow-xl transition-shadow duration-300 group-hover:shadow-[0_25px_60px_-8px_var(--shadow-color)]">
              <Image
                src="/images/services/mark.jpg"
                alt="Marketing digital Label Technology"
                fill
                sizes="(max-width: 1024px) 36vw, 210px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplit;
