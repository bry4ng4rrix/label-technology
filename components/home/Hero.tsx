"use client";

import Image from "next/image";
import Link from "next/link";
import Aurora from "@/components/Aurora";
import {
  DevIllustration,
  CallCenterIllustration,
  ITIllustration,
  DataIllustration,
} from "@/components/home/illustrations";

const STATS = [
  { value: "50", label: "postes Call Center" },
  { value: "7", label: "domaines d'expertise" },
  { value: "FR/EN", label: "bilingue certifié" },
  { value: "72h", label: "délai de réponse" },
];

const PHOTOS = [
  {
    id: "dev",
    href: "/services/dev",
    tag: "Développement",
    color: "#3B82F6",
    Illustration: DevIllustration,
    alt: "Développement web & mobile — Label Technology",
    h: "h-[220px] sm:h-[260px] md:h-[300px] lg:h-[440px]",
  },
  {
    id: "callcenter",
    href: "/services/callcenter",
    tag: "Call Center",
    color: "#F59E0B",
    Illustration: CallCenterIllustration,
    alt: "Call center 50 postes — Label Technology",
    h: "h-[255px] sm:h-[295px] md:h-[335px] lg:h-[475px]",
  },
  {
    id: "digital",
    href: "/services/digital",
    tag: "Digitalisation",
    color: "#10B981",
    src: "/images/services/digit.jpg",
    alt: "Digitalisation & ERP — Label Technology",
    h: "h-[310px] sm:h-[350px] md:h-[290px] lg:h-[620px]",
  },
  {
    id: "materiel",
    href: "/services/materiel",
    tag: "Matériel IT",
    color: "#06B6D4",
    Illustration: ITIllustration,
    alt: "Matériel informatique — Label Technology",
    h: "h-[255px] sm:h-[295px] md:h-[335px] lg:h-[475px]",
  },

  {
    id: "data",
    href: "/services/data",
    tag: "Traitement de données",
    color: "#22C55E",
    Illustration: DataIllustration,
    alt: "Traitement de données — Label Technology",
    h: "h-[220px] sm:h-[260px] md:h-[300px] lg:h-[440px]",
  },
];

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-20">
      <div className="absolute inset-0">{/* <Aurora /> */}</div>

      {/* Zone visuelle : arc de photos en fond, texte par-dessus */}
      <div className="relative mb-14 md:mb-20">
        {/* Arc de photos (fond) */}
        <div className="animate-fadeup-d5 absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
          {PHOTOS.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={`group relative block flex-1 min-w-0 ${p.h} rounded-2xl overflow-hidden ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-2 hover:ring-white/25 ${
                /* Sur mobile, 7 tuiles côte à côte deviennent des lamelles
                   illisibles : on n'en garde que 4, l'arc complet revient dès sm. */
                i >= 4 ? "hidden sm:block" : ""
              }`}
            >
              {"Illustration" in p && p.Illustration ? (
                <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110 opacity-60">
                  <p.Illustration color={p.color} />
                </div>
              ) : (
                <Image
                  src={p.src!}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1200px) 13vw, 240px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 opacity-30"
                />
              )}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(180deg, transparent 45%, ${p.color}CC 100%)`,
                }}
              />
              <span className="absolute inset-x-0 bottom-2 px-1 text-center text-[9px] md:text-[10px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                {p.tag}
              </span>
            </Link>
          ))}
        </div>

        {/* Voile sombre pour la lisibilité du texte */}
        <div className="absolute inset-0  pointer-events-none" />

        {/* Texte central */}
        <div className="relative z-10 max-w-7xl mx-auto text-center py-16 md:py-24">
          <p className="animate-fadeup-d1 text-xs md:text-sm font-semibold text-slate-800 bg-white backdrop-blur-2xl mx-auto px-4 py-1.5 rounded-full w-fit mb-6">
            " Label Technology"
          </p>
          <h1 className="animate-fadeup-d2 h1-display mb-5 text-white">
            Votre vision, notre expertise :{" "}
            <span className="bg-linear-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              l'alliance qui transforme le potentiel en performance.
            </span>
          </h1>
          <p className="animate-fadeup-d3 text-sm  mb-9 max-w-2xl mx-auto text-gray-200">
            Développement web, Call Center 50 postes FR/EN, Marketing digital,
            Digitalisation, Traitement de données, Matériel IT & Comptabilité —
            une seule équipe, sept expertises, des résultats mesurables.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden animate-fadeup-d5 bg-slate-800/30 backdrop-blur-2xl border border-white/10">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="px-6 py-5 text-center hover:bg-white/5 transition-colors"
          >
            <div
              className="text-2xl md:text-3xl mb-1"
              style={{ color: "var(--brand-lt)" }}
            >
              {stat.value}
            </div>
            <div className="text-white/50 text-[10px] label-tag">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
