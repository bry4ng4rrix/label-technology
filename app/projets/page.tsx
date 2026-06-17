import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";
import ProjetsList from "@/components/projets/ProjetsList";

export const metadata: Metadata = {
  title: "Nos Réalisations — Projets web, call center, marketing, ERP",
  description:
    "Découvrez les projets réalisés par Label Technology : développement web & mobile, call center B2B, marketing digital, digitalisation. 13 réalisations détaillées avec métriques.",
};

export default function ProjetsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden grid-bg px-6"
        style={{ backgroundColor: "var(--ink)", minHeight: "52vh", display: "flex", alignItems: "center" }}
      >
        {/* Halo bleu centré */}
        <div
          className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(46,85,212,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full py-28">
          <p className="label-tag mb-5 animate-fadeup" style={{ color: "var(--brand-lt)" }}>
            RÉALISATIONS
          </p>
          <h1
            className="font-display text-white mb-6 leading-tight animate-fadeup-d1"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Ce qu&apos;on a
            <br />
            <span style={{ color: "var(--brand-lt)" }}>déjà construit.</span>
          </h1>
          <p className="text-white/55 text-lg font-light max-w-xl animate-fadeup-d2">
            13 projets sélectionnés. Filtrez par domaine. Chaque chiffre est
            mesuré, pas estimé.
          </p>
        </div>
      </section>

      <ProjetsList />
      <CtaSection />
    </main>
  );
}
