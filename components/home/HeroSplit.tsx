"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import DotField from "@/components/DotField";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "16+", label: "collaborateurs" },
  { value: "6", label: "expertises" },
  { value: "FR/EN", label: "bilingue" },
  { value: "72h", label: "de réponse" },
];

/* Composition photo : position + profondeur (parallaxe) */
const PHOTOS = [
  {
    src: "/images/services/fetra.png",
    alt: "Équipe développement Label Technology",
    className: "left-0 bottom-0 h-[74%] w-[62%] rounded-[2rem]",
    depth: 10,
    glow: "#3B82F6",
    priority: true,
    sizes: "(max-width: 1024px) 62vw, 380px",
  },
  {
    src: "/images/services/digit.jpg",
    alt: "Équipe Label Technology",
    className: "top-0 right-0 h-[46%] w-[46%] rounded-full",
    depth: 22,
    glow: "#F59E0B",
    sizes: "(max-width: 1024px) 46vw, 280px",
  },
  {
    src: "/images/services/it.jpg",
    alt: "Matériel IT Label Technology",
    className: "top-[48%] right-[2%] h-[28%] w-[32%] rounded-2xl",
    depth: 34,
    glow: "#06B6D4",
    sizes: "(max-width: 1024px) 32vw, 200px",
  },
  {
    src: "/images/services/mark.jpg",
    alt: "Marketing digital Label Technology",
    className: "bottom-0 right-[4%] h-[32%] w-[36%] rounded-2xl",
    depth: 16,
    glow: "#8B5CF6",
    sizes: "(max-width: 1024px) 36vw, 220px",
  },
];

export default function HeroSplit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setParallax(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!parallax || !stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      stageRef.current.style.setProperty("--mx", mx.toFixed(3));
      stageRef.current.style.setProperty("--my", my.toFixed(3));
    },
    [parallax],
  );

  const onLeave = useCallback(() => {
    stageRef.current?.style.setProperty("--mx", "0");
    stageRef.current?.style.setProperty("--my", "0");
  }, []);

  return (
    <section className="surface-dark noise relative w-full overflow-hidden pt-32 pb-20 sm:pt-36 md:pt-44 md:pb-28">
      {/* Fond animé */}
      <div className="absolute inset-0 -z-10">
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
          gradientFrom="rgba(99, 120, 255, 0.32)"
          gradientTo="rgba(120, 160, 255, 0.18)"
          glowColor="#0B1226"
        />
      </div>
      <div
        aria-hidden
        className="halo -top-32 left-[10%] -z-10 h-[420px] w-[520px] bg-brand-lt/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-ink to-transparent"
      />

      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Texte */}
        <div>
          <p className="animate-fadeup-d1 glass-dark inline-flex w-fit items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-xs font-semibold text-white/85">
            <span className="flex size-5 items-center justify-center rounded-full bg-gold/20">
              <span className="size-1.5 rounded-full bg-gold" />
            </span>
            Label Technology · Antananarivo
          </p>

          <h1 className="h1-display animate-fadeup-d2 mt-7 text-[clamp(2.125rem,1.3rem+2.6vw,3.75rem)] text-white">
            Votre vision, notre expertise&nbsp;: l&apos;alliance qui transforme le{" "}
            <span className="gradient-text-light">
              potentiel en
              <Typewriter
                words={[" performance.", " réalité.", " succès.", " excellence.", " innovation."]}
                loop={1}
                typeSpeed={50}
                cursorStyle="|"
                cursorColor="#7EE7C9"
              />
            </span>
          </h1>

          <p className="lead animate-fadeup-d3 mt-6 max-w-xl text-white/65">
            Développement web, Marketing digital, Digitalisation, Traitement de
            données, Matériel IT &amp; Comptabilité — une seule équipe, six
            expertises, des résultats mesurables.
          </p>

          <div className="animate-fadeup-d4 mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Démarrer un projet
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass" className="rounded-full">
              <Link href="/services">Découvrir nos services</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-fadeup-d5 glass-dark mt-10 grid max-w-lg grid-cols-4 overflow-hidden rounded-2xl">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="relative px-2 py-4 text-center transition-colors hover:bg-white/5 sm:px-3 [&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:inset-y-3 [&:not(:first-child)]:before:left-0 [&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:bg-white/10"
              >
                <div className="font-display text-xl tracking-tight text-white md:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[10px] font-medium text-white/45 sm:text-[11px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Composition photos (parallaxe souris) */}
        <div
          ref={stageRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="animate-fadeup-d5 relative h-[420px] sm:h-[520px] md:h-[600px] lg:h-[620px]"
          style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}
        >
          <div
            aria-hidden
            className="absolute inset-[10%] -z-10 rounded-full bg-brand-lt/25 blur-[90px]"
          />
          {PHOTOS.map((p) => (
            <div
              key={p.src}
              className={`hero-photo group absolute ${p.className}`}
              style={{
                transform: parallax
                  ? `translate3d(calc(var(--mx) * ${-p.depth}px), calc(var(--my) * ${-p.depth}px), 0)`
                  : undefined,
                transition: "transform 420ms var(--motion-out)",
                ["--glow-color" as string]: p.glow,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[inherit] shadow-2xl ring-1 ring-white/15 transition-shadow duration-300 group-hover:shadow-[0_28px_70px_-12px_var(--glow-color)]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={p.sizes}
                  priority={p.priority}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 rounded-[inherit] bg-linear-to-t from-ink/35 via-transparent to-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
