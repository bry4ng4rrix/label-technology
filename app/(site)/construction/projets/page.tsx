import type { Metadata } from "next";
import ProjectTypesGrid from "@/components/construction/ProjectTypesGrid";
import ActivityNotice from "@/components/construction/ActivityNotice";
import ConstructionCta from "@/components/construction/ConstructionCta";
import PageHero from "@/components/shared/PageHero";

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
      <PageHero
        eyebrow="Nouvelle activité — Construction & Génie Civil"
        title={
          <>
            Les projets que nous
            <br />
            <span className="gradient-text-light">souhaitons accompagner.</span>
          </>
        }
        description="Notre activité Construction est en développement. Voici les types de projets vers lesquels nous orientons progressivement notre expertise, depuis Antananarivo."
      />

      <section className="surface-light section relative">
        <div className="container-x">
          <ProjectTypesGrid />
        </div>
      </section>

      <ActivityNotice />
      <ConstructionCta />
    </main>
  );
}
