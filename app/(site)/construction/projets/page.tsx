import type { Metadata } from "next";
import ProjectTypesGrid from "@/components/construction/ProjectTypesGrid";
import ActivityNotice from "@/components/construction/ActivityNotice";
import ConstructionCta from "@/components/construction/ConstructionCta";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Les projets que nous souhaitons accompagner — Construction BTP",
  description:
    "Label Technology développe une nouvelle activité Construction & Génie Civil à Madagascar. Découvrez les types de projets que nous souhaitons accompagner : résidentiel, professionnel, infrastructures, rénovation.",
  alternates: {
    canonical: "https://labeltechnology.mg/construction/projets",
  },
};

export default function ConstructionProjetsPage() {
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
        <div
          className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(46,85,212,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <Reveal className="relative max-w-7xl mx-auto w-full">
          <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>
            NOUVELLE ACTIVITÉ — CONSTRUCTION &amp; GÉNIE CIVIL
          </p>
          <h1 className="h1-display text-white mb-6">
            Les projets que nous<br />
            <span style={{ color: "var(--brand-lt)" }}>souhaitons accompagner.</span>
          </h1>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
            Notre activité Construction est en développement. Voici les
            types de projets vers lesquels nous orientons progressivement
            notre expertise, depuis Antananarivo.
          </p>
        </Reveal>
      </section>

      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <ProjectTypesGrid />
      </section>

      <ActivityNotice />
      <ConstructionCta />
    </main>
  );
}
