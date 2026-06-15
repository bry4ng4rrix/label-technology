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
        className="relative min-h-[50vh] flex flex-col justify-center grid-bg px-6 pt-24 pb-16"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, var(--brand) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>
            RÉALISATIONS
          </p>
          <h1
            className="font-display text-white mb-6 leading-tight"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Ce qu'on a<br />
            <span style={{ color: "var(--brand-lt)" }}>déjà construit.</span>
          </h1>
          <p className="text-white/60 text-lg font-light max-w-xl">
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
