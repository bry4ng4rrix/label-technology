import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";
import ProjetsList from "@/components/projets/ProjetsList";
import PageHero from "@/components/shared/PageHero";
import { supabase, type Project } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Nos Réalisations — Projets web, marketing, ERP",
  description:
    "Découvrez les projets réalisés par Label Technology : développement web & mobile, marketing digital, digitalisation. Réalisations détaillées avec métriques.",
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
      <PageHero
        eyebrow="Réalisations"
        title={
          <>
            Ce qu&apos;on a
            <br />
            <span className="gradient-text-light">déjà construit.</span>
          </>
        }
        description={`${projets.length} projets sélectionnés. Filtrez par domaine. Chaque chiffre est mesuré, pas estimé.`}
      />

      <ProjetsList projets={projets} />
      <CtaSection />
    </main>
  );
}
