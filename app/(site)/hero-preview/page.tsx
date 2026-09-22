import type { Metadata } from "next";
import HeroSplit from "@/components/home/HeroSplit";

/* Page de prévisualisation interne : elle duplique le hero de l'accueil,
   on la retire de l'index pour éviter le contenu dupliqué. */
export const metadata: Metadata = {
  title: "Aperçu hero",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  return <HeroSplit />;
}
