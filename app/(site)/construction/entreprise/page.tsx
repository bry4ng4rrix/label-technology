import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/shared/FaqSection";
import ActivityNotice from "@/components/construction/ActivityNotice";
import ConstructionCta from "@/components/construction/ConstructionCta";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bâtiment Entreprise — Construction Commerciale & Industrielle",
  description:
    "Construction et aménagement de bâtiments pour entreprises à Madagascar : gros œuvre, second œuvre, locaux commerciaux et industriels. Un interlocuteur unique du permis à la livraison.",
  keywords: [
    "construction entreprise Madagascar",
    "bâtiment commercial Antananarivo",
    "gros œuvre Madagascar",
    "second œuvre Madagascar",
    "construction industrielle Madagascar",
    "aménagement bureaux Madagascar",
    "entreprise de bâtiment Antananarivo",
    "BTP entreprise Madagascar",
  ],
  alternates: {
    canonical: "https://labeltechnology.mg/construction/entreprise",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/construction/entreprise",
    siteName: "Label Technology",
    title: "Bâtiment Entreprise — Construction Commerciale & Industrielle | Label Technology",
    description:
      "Gros œuvre, second œuvre, locaux commerciaux et industriels. Un interlocuteur unique du permis à la livraison.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bâtiment Entreprise — Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bâtiment Entreprise | Label Technology",
    description: "Gros œuvre, second œuvre, aménagement de locaux. Depuis Antananarivo.",
    images: ["/og-image.png"],
  },
};

const QUALITES = [
  { icon: "🎯", l: "Approche structurée" },
  { icon: "🛠", l: "Solutions sur mesure" },
  { icon: "📋", l: "Suivi de projet" },
  { icon: "💻", l: "Technologie & construction" },
];

const SERVICES = [
  { icon: "🏗", title: "Gros œuvre", desc: "Fondations, structure, maçonnerie, charpente. La base solide sur laquelle repose tout le reste du projet." },
  { icon: "🧱", title: "Second œuvre", desc: "Cloisons, revêtements, menuiseries, finitions. Un chantier suivi jusqu'au dernier détail avant livraison." },
  { icon: "🏢", title: "Aménagement de locaux", desc: "Bureaux, showrooms, ateliers, entrepôts. Conception d'espaces fonctionnels adaptés à votre activité." },
  { icon: "🔌", title: "Coordination corps d'état", desc: "Électricité, plomberie, climatisation, réseaux. Un seul interlocuteur pour coordonner l'ensemble des intervenants." },
  { icon: "📋", title: "Extension & réhabilitation", desc: "Agrandissement, mise aux normes, rénovation de bâtiments existants sans interrompre votre activité." },
  { icon: "✅", title: "Suivi & conformité", desc: "Respect des normes en vigueur, suivi de chantier régulier, réception avec levée de réserves." },
];

const PROCESS = [
  { num: "01", title: "Étude & devis", desc: "Analyse du besoin, visite du site, esquisse et devis détaillé sous 48h." },
  { num: "02", title: "Planification", desc: "Planning de chantier, coordination des corps d'état, démarches administratives si nécessaires." },
  { num: "03", title: "Construction", desc: "Gros œuvre puis second œuvre, avec points d'étape réguliers et photos de suivi." },
  { num: "04", title: "Livraison", desc: "Réception des travaux, levée de réserves, remise des documents techniques du bâtiment." },
];

const FAQ = [
  { q: "Gérez-vous les démarches administratives (permis de construire) ?", a: "Nous vous accompagnons dans la constitution du dossier et le suivi des démarches auprès des autorités compétentes, en fonction du type de projet." },
  { q: "Pouvez-vous intervenir sur un bâtiment existant sans interrompre l'activité ?", a: "Oui — on planifie le chantier par phases pour minimiser l'impact sur votre exploitation, avec des horaires adaptés si nécessaire." },
  { q: "Combien de temps prend un projet de construction commerciale type ?", a: "Cela dépend de la surface et de la complexité. Après l'étude initiale, on vous remet un planning prévisionnel détaillé avant tout engagement." },
  { q: "Fournissez-vous une garantie après la livraison ?", a: "Oui, dans le cadre des garanties légales applicables au type de travaux réalisés. Un dossier technique complet vous est remis à la réception." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Bâtiment Entreprise",
  url: "https://labeltechnology.mg/construction/entreprise",
  description:
    "Construction et aménagement de bâtiments pour entreprises : gros œuvre, second œuvre, locaux commerciaux et industriels. Depuis Antananarivo, Madagascar.",
  provider: {
    "@type": "Organization",
    name: "Label Technology",
    url: "https://labeltechnology.mg",
  },
  areaServed: [{ "@type": "Country", name: "Madagascar" }],
  serviceType: "Construction commerciale et industrielle / BTP",
};

export default function EntrepriseConstructionPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero split */}
      <section className="relative overflow-hidden grid-bg" style={{ backgroundColor: "var(--ink)", minHeight: "70vh" }}>
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center" style={{ minHeight: "70vh" }}>
          <div className="relative z-10 py-28 lg:pr-12">
            <p className="animate-fadeup label-tag mb-3" style={{ color: "var(--brand-lt)" }}>BÂTIMENT ENTREPRISE</p>
            <p className="animate-fadeup text-white/40 text-xs font-light tracking-wide mb-5">
              Nouvelle activité — Construction &amp; Génie Civil
            </p>
            <h1 className="animate-fadeup-d1 h1-display text-white mb-6">
              Vos locaux,<br />
              <span className="bg-linear-to-r from-[var(--brand)] to-[var(--brand-lt)] bg-clip-text text-transparent">construits pour durer.</span>
            </h1>
            <p className="animate-fadeup-d2 text-white/70 text-lg leading-relaxed mb-10 max-w-xl" style={{ lineHeight: 1.8 }}>
              Gros œuvre, second œuvre, aménagement de locaux commerciaux et
              industriels. Nous développons une offre pensée pour un
              interlocuteur unique, du permis à la livraison.
            </p>
            <div className="animate-fadeup-d3 flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm transition-all hover:opacity-90 hover:scale-105 duration-300"
                style={{ backgroundColor: "var(--brand)", color: "#fff" }}>
                Demander un devis →
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 z-0 lg:relative lg:inset-auto h-full" style={{ minHeight: "70vh" }}>
            <Image
              src="https://images.unsplash.com/photo-1541976590-713941681591?w=900&h=700&fit=crop&q=80"
              alt="Chantier de construction bâtiment entreprise"
              fill
              className="object-cover"
              style={{ opacity: 10 }}
            />
            <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(180deg, var(--ink) 0%, rgba(10,14,26,0.7) 40%, var(--ink) 100%)" }} />
            <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, var(--ink) 0%, transparent 55%)" }} />
          </div>
        </div>
      </section>

      {/* Qualités */}
      <section style={{ backgroundColor: "var(--brand)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
          {QUALITES.map((q, i) => (
            <div key={i} className="animate-fadeup flex items-center justify-center gap-2 text-center py-6 px-4" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-lg">{q.icon}</span>
              <span className="label-tag text-white text-[11px]">{q.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="animate-fadeup label-tag mb-3" style={{ color: "var(--brand)" }}>NOS PRESTATIONS</p>
          <h2 className="animate-fadeup-d1 font-display text-4xl md:text-5xl mb-16 bg-linear-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Du permis à la livraison.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <div key={i} className="animate-fadeup p-7 border border-border rounded-sm card-hover bg-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="svc-icon-float text-3xl mb-4 block">{s.icon}</span>
                <h3 className="font-display text-xl mb-3 text-foreground">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="animate-fadeup label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE MÉTHODE</p>
          <h2 className="animate-fadeup-d1 font-display text-4xl md:text-5xl mb-16 text-foreground">
            Un projet, un interlocuteur.
          </h2>
          <div className="grid md:grid-cols-4 gap-px bg-border/30">
            {PROCESS.map((p, i) => (
              <div key={i} className="svc-step animate-fadeup p-8 bg-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="svc-step-num font-display text-5xl mb-6" style={{ color: "var(--brand)", lineHeight: 1, opacity: 0.3 }}>{p.num}</div>
                <div className="svc-step-line w-8 h-0.5 mb-5" style={{ backgroundColor: "var(--brand)" }} />
                <h3 className="font-display text-lg mb-3 text-foreground">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ActivityNotice />
      <FaqSection items={FAQ} />
      <ConstructionCta />
    </main>
  );
}
