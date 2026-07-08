import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";
import ProjetsList from "@/components/projets/ProjetsList";
import { supabase, type Project } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Nos Réalisations — Projets web, call center, marketing, ERP",
  description:
    "Découvrez les projets réalisés par Label Technology : développement web & mobile, call center B2B, marketing digital, digitalisation. 13 réalisations détaillées avec métriques.",
};

export default async function ProjetsPage() {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("order", { ascending: true })
    .returns<Project[]>();
  const projets = data ?? [];

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden grid-bg px-6"
        style={{
          backgroundColor: "var(--ink)",
          minHeight: "52vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Halo bleu centré */}
        <div
          className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(46,85,212,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full py-28">
          <p
            className="label-tag mb-5 animate-fadeup"
            style={{ color: "var(--brand-lt)" }}
          >
            RÉALISATIONS
          </p>
          <h1 className="h1-display text-white mb-6 animate-fadeup-d1">
            Ce qu&apos;on a
            <br />
            <span className="bg-linear-to-r from-blue-500  to-emerald-500 bg-clip-text text-transparent">
              déjà construit.
            </span>
          </h1>
          <p className="text-white/55 text-lg font-light max-w-xl animate-fadeup-d2">
            {projets.length} projets sélectionnés. Filtrez par domaine. Chaque chiffre est
            mesuré, pas estimé.
          </p>
        </div>
      </section>

      <ProjetsList projets={projets} />
      <CtaSection />
    </main>
  );
}
