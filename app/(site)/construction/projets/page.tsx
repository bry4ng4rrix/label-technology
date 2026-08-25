import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";
import ConstructionProjetsList from "@/components/construction/ProjetsList";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Nos Réalisations BTP — Route & Bâtiment Entreprise",
  description:
    "Découvrez les chantiers réalisés par Label Technology Construction : travaux routiers, construction et aménagement de bâtiments pour entreprises à Madagascar.",
  alternates: {
    canonical: "https://labeltechnology.mg/construction/projets",
  },
};

const PROJETS = [
  { tag: "ROUTE", title: "Réfection de voirie d'accès — Zone industrielle", desc: "Réfection complète de la voirie d'accès d'une zone industrielle à Antananarivo : terrassement, revêtement enrobé, assainissement.", metrics: ["Chantier phasé", "Assainissement complet", "6 semaines"] },
  { tag: "ROUTE", title: "Aménagement de voirie — Lotissement privé", desc: "Construction de la voirie interne d'un lotissement résidentiel : chaussée, drainage, signalisation et marquage au sol.", metrics: ["Voirie interne", "Marquage & signalisation", "8 semaines"] },
  { tag: "ENTREPRISE", title: "Extension d'entrepôt logistique", desc: "Extension d'un entrepôt de stockage pour une société de distribution, avec coordination des corps d'état sans interruption d'activité.", metrics: ["Sans interruption d'activité", "Gros œuvre + second œuvre", "4 mois"] },
  { tag: "ENTREPRISE", title: "Aménagement de bureaux — Société de services", desc: "Réaménagement complet d'un plateau de bureaux : cloisonnement, électricité, climatisation, finitions sur mesure.", metrics: ["Plateau de bureaux", "Corps d'état coordonnés", "6 semaines"] },
];

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
            RÉALISATIONS BTP
          </p>
          <h1 className="h1-display text-white mb-6">
            Nos chantiers.<br />
            <span style={{ color: "var(--brand-lt)" }}>Route & bâtiment.</span>
          </h1>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
            Travaux routiers et constructions pour entreprises réalisés
            depuis Antananarivo.
          </p>
        </Reveal>
      </section>

      <ConstructionProjetsList projets={PROJETS} />

      <CtaSection />
    </main>
  );
}
