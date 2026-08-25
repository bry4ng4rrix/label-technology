import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Construction BTP — Route & Bâtiment Entreprise depuis Antananarivo",
  description:
    "Travaux routiers et construction de bâtiments pour entreprises. Label Technology Construction accompagne vos projets BTP à Madagascar, du terrassement à la réception de chantier.",
  keywords: [
    "BTP Madagascar",
    "construction Antananarivo",
    "travaux routiers Madagascar",
    "entreprise de construction Madagascar",
    "bâtiment entreprise Madagascar",
    "gros œuvre Madagascar",
    "chantier Antananarivo",
  ],
  alternates: {
    canonical: "https://labeltechnology.mg/construction",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/construction",
    siteName: "Label Technology",
    title: "Construction BTP — Route & Bâtiment Entreprise depuis Antananarivo",
    description:
      "Travaux routiers et construction de bâtiments pour entreprises, depuis Antananarivo.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Construction Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction BTP | Label Technology",
    description: "Route, Bâtiment Entreprise. Depuis Antananarivo.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services Construction Label Technology",
  url: "https://labeltechnology.mg/construction",
  description: "Pôles de construction BTP depuis Antananarivo, Madagascar.",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Travaux Routiers", url: "https://labeltechnology.mg/construction/route" },
    { "@type": "ListItem", position: 2, name: "Bâtiment Entreprise", url: "https://labeltechnology.mg/construction/entreprise" },
  ],
};

const SERVICES = [
  {
    tag: "ROUTE",
    href: "/construction/route",
    title: "Travaux Routiers",
    accroche: "Des routes qui tiennent la distance.",
    desc: "Terrassement, revêtement, assainissement, signalisation. Suivi de chantier rigoureux, du relevé topographique à la réception.",
    items: ["Terrassement", "Chaussées & revêtement", "Assainissement routier", "Signalisation & marquage"],
    featured: true,
  },
  {
    tag: "ENTREPRISE",
    href: "/construction/entreprise",
    title: "Bâtiment Entreprise",
    accroche: "Vos locaux, construits pour durer.",
    desc: "Gros œuvre, second œuvre, aménagement de locaux commerciaux et industriels. Un interlocuteur unique du permis à la livraison.",
    items: ["Gros œuvre", "Second œuvre", "Aménagement de bureaux", "Coordination corps d'état"],
    featured: false,
  },
];

export default function ConstructionPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex flex-col justify-center grid-bg px-6 pt-24 pb-16"
        style={{ backgroundColor: "var(--ink)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, var(--brand) 0%, transparent 70%)" }} />
        <Reveal className="relative max-w-7xl mx-auto w-full">
          <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>CONSTRUCTION BTP</p>
          <h1 className="h1-display text-white mb-6">
            Route & bâtiment.<br />
            <span style={{ color: "var(--brand-lt)" }}>Une équipe terrain.</span>
          </h1>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
            Travaux routiers et construction de bâtiments pour entreprises.
            Depuis Antananarivo, pour vos chantiers à Madagascar.
          </p>
        </Reveal>
      </section>

      {/* Grid services */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 0.1} className="h-full">
                <Link href={s.href}
                  className="group p-8 border rounded-sm flex flex-col h-full transition-all card-hover bg-card"
                  style={{ borderColor: s.featured ? "var(--brand)" : "transparent" }}>
                  <span className="label-tag text-[10px] mb-3"
                    style={{ color: s.featured ? "var(--brand-lt)" : "var(--brand)" }}>
                    {s.tag}
                  </span>
                  <h2 className="font-display text-2xl mb-2 text-foreground">
                    {s.title}
                  </h2>
                  <p className="text-sm font-light italic mb-5 text-muted-foreground">
                    {s.accroche}
                  </p>
                  <p className="text-sm font-light leading-relaxed mb-6 flex-1 text-muted-foreground">
                    {s.desc}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span style={{ color: "var(--gold)" }}>◆</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="text-sm font-medium group-hover:gap-3 transition-all flex items-center gap-2"
                    style={{ color: s.featured ? "var(--brand-lt)" : "var(--brand)" }}>
                    Découvrir →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25} className="mt-10 text-center">
            <Link
              href="/construction/projets"
              className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
              style={{ color: "var(--brand)" }}
            >
              Voir nos réalisations chantiers →
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
