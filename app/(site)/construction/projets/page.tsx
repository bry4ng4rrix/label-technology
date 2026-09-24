import type { Metadata } from "next";
import ProjectTypesGrid from "@/components/construction/ProjectTypesGrid";
import ActivityNotice from "@/components/construction/ActivityNotice";
import ConstructionCta from "@/components/construction/ConstructionCta";
import EditorialHero from "@/components/services/EditorialHero";
import PhotoBand from "@/components/services/PhotoBand";
import ServiceScope from "@/components/services/ServiceScope";

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
    <ServiceScope slug="index" as="main">
      <EditorialHero
        slug="index"
        eyebrow="Nouvelle activité — Construction & Génie Civil"
        title={
          <>
            Les projets que nous
            <br />
            <span className="gradient-text-svc-light">souhaitons accompagner.</span>
          </>
        }
        description="Notre activité Construction est en développement. Voici les types de projets vers lesquels nous orientons progressivement notre expertise, depuis Antananarivo."
        image={{ src: "/images/construction/projets-hero.jpg", alt: "Projet de construction en perspective" }}
        primary={{ href: "/contact", label: "Présenter mon projet" }}
        secondary={{ href: "/construction", label: "Découvrir l'activité" }}
      />

      <section className="surface-light section relative">
        <div className="container-x">
          <ProjectTypesGrid />
        </div>
      </section>

      <PhotoBand
        tint="normal"
        image={{ src: "/images/construction/projets-band.jpg", alt: "Chantier de construction en cours" }}
        eyebrow="Notre ambition"
        title={<>Bâtir une expertise,<br />projet après projet.</>}
        stats={[
          { value: "8", label: "types de projets visés" },
          { value: "2026", label: "lancement de l'activité" },
          { value: "72h", label: "réponse à votre demande" },
        ]}
      >
        Notre portefeuille de réalisations se construira progressivement. Chaque
        projet accepté est étudié en amont, avec les mêmes exigences de
        préparation et de documentation que nos activités technologiques.
      </PhotoBand>

      <ActivityNotice />
      <ConstructionCta />
    </ServiceScope>
  );
}
