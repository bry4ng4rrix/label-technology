import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";
import ProjetsList from "@/components/projets/ProjetsList";
import EditorialHero from "@/components/services/EditorialHero";
import ServiceScope from "@/components/services/ServiceScope";
import { supabase, type Project } from "@/lib/supabase";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Nos Réalisations — Projets web, marketing, ERP",
  description:
    "Découvrez les projets réalisés par Label Technology : développement web & mobile, marketing digital, digitalisation. Réalisations détaillées avec métriques.",
  alternates: {
    canonical: "https://labeltechnology.mg/projets",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/projets",
    siteName: "Label Technology",
    title: "Nos Réalisations — Projets web, marketing, ERP",
    description:
      "Les projets réalisés par Label Technology : développement web & mobile, marketing digital, digitalisation. Chaque chiffre est mesuré.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Réalisations | Label Technology",
    description:
      "Développement web & mobile, marketing digital, digitalisation. Réalisations détaillées avec métriques.",
  },
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
    <ServiceScope slug="index" as="main">
      <EditorialHero
        slug="index"
        eyebrow="Réalisations"
        title={
          <>
            Ce qu&apos;on a
            <br />
            <span className="gradient-text-svc-light">déjà construit.</span>
          </>
        }
        description={`${projets.length} projets sélectionnés. Filtrez par domaine. Chaque chiffre est mesuré, pas estimé.`}
        image={{ src: "/images/pages/projets-hero.jpg", alt: "Équipe au travail sur des projets clients" }}
        primary={{ href: "/contact", label: "Démarrer un projet" }}
        secondary={{ href: "/services", label: "Voir nos services" }}
      />

      <ProjetsList projets={projets} />
      <CtaSection />
    </ServiceScope>
  );
}
