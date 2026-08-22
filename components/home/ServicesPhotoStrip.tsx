"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const PHOTOS = [
  {
    id: "dev",
    href: "/services/dev",
    tag: "Développement",
    color: "#3B82F6",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=1100&fit=crop&q=80",
    alt: "Développement web & mobile — Label Technology",
  },
  {
    id: "marketing",
    href: "/services/marketing",
    tag: "Marketing Digital",
    color: "#EC4899",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=1100&fit=crop&q=80",
    alt: "Marketing digital — Label Technology",
  },
  {
    id: "digital",
    href: "/services/digital",
    tag: "Digitalisation",
    color: "#10B981",
    src: "/images/digitalisation.png",
    alt: "Digitalisation & ERP — Label Technology",
  },
  {
    id: "data",
    href: "/services/data",
    tag: "Traitement de données",
    color: "var(--brand-lt)",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=1100&fit=crop&q=80",
    alt: "Traitement de données — Label Technology",
  },
  {
    id: "materiel",
    href: "/services/materiel",
    tag: "Matériel IT",
    color: "#06B6D4",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=1100&fit=crop&q=80",
    alt: "Matériel informatique — Label Technology",
  },
  {
    id: "comptabilite",
    href: "/services/comptabilite",
    tag: "Comptabilité",
    color: "#EF4444",
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=1100&fit=crop&q=80",
    alt: "Comptabilité & reporting — Label Technology",
  },
];

export default function ServicesPhotoStrip() {
  return (
    <section className="relative bg-white">
      {/* Carte overlay "Nos expertises" */}
      <Reveal className="relative z-20 md:absolute md:bottom-10 md:left-8 md:max-w-sm">
        <div
          className="mx-6 md:mx-0 -mt-10 md:mt-0 p-7 rounded-xl shadow-2xl"
          style={{ backgroundColor: "var(--brand)" }}
        >
          <p className="label-tag text-white/60 mb-2">NOS EXPERTISES</p>
          <h2 className="font-display text-white text-3xl md:text-4xl mb-5 leading-tight">
            Nos solutions
          </h2>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-white/90 active:scale-95 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-105"
          >
            EN SAVOIR PLUS
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </Reveal>

      {/* Bande photo */}
      <div className="flex h-[260px] sm:h-[340px] md:h-[420px] overflow-x-auto md:overflow-visible snap-x snap-mandatory">
        {PHOTOS.map((p, i) => (
          <Reveal
            key={p.id}
            delay={i * 0.06}
            className="relative flex-1 min-w-[45%] sm:min-w-[30%] md:min-w-0 snap-start"
          >
            <Link
              href={p.href}
              className="group relative block w-full h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 45vw, 15vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(180deg, transparent 40%, ${p.color}CC 100%)` }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span
                  className="label-tag text-[10px] text-white inline-block px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
                >
                  {p.tag}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
