import type { Metadata } from "next";
import FaqSection from "@/components/shared/FaqSection";
import EditorialHero from "@/components/services/EditorialHero";
import PhotoBand from "@/components/services/PhotoBand";
import ServiceScope from "@/components/services/ServiceScope";
import SectionHeader from "@/components/shared/SectionHeader";
import ActivityNotice from "@/components/construction/ActivityNotice";
import ConstructionCta from "@/components/construction/ConstructionCta";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bâtiment Entreprise — Construction Commerciale & Industrielle",
  description:
    "Construction et aménagement de bâtiments pour entreprises à Madagascar : gros œuvre, second œuvre, locaux commerciaux et industriels. Un interlocuteur unique du permis à la livraison.",
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
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bâtiment Entreprise | Label Technology",
    description: "Gros œuvre, second œuvre, aménagement de locaux. Depuis Antananarivo.",
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
    <ServiceScope slug="index" as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <EditorialHero
        slug="index"
        eyebrow={
          <>
            BÂTIMENT ENTREPRISE
            <span className="ml-2 rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium tracking-normal text-white/50 normal-case">
              Nouvelle activité — Construction &amp; Génie Civil
            </span>
          </>
        }
        title={
          <>
            Vos locaux,
            <br />
            <span className="gradient-text-svc-light">construits pour durer.</span>
          </>
        }
        description="Gros œuvre, second œuvre, aménagement de locaux commerciaux et industriels. Nous développons une offre pensée pour un interlocuteur unique, du permis à la livraison."
        image={{ src: "/images/construction/entreprise-hero.jpg", alt: "Bâtiment professionnel en construction" }}
        primary={{ href: "/contact", label: "Parler de votre projet" }}
        secondary={{ href: "/construction", label: "Découvrir l'activité" }}
      />

      <section className="surface-dark hairline-top relative">
        <div className="container-x py-8 sm:py-10">
          <ul className="glass-dark grid grid-cols-2 overflow-hidden rounded-2xl md:grid-cols-4">
            {QUALITES.map((q, i) => (
              <li
                key={i}
                className="relative flex items-center justify-center gap-3 px-4 py-5 text-center [&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:inset-y-4 [&:not(:first-child)]:before:left-0 [&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:bg-white/10"
              >
                <span className="text-lg leading-none">{q.icon}</span>
                <span className="label-tag text-white/80">{q.l}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="surface-light section relative">
        <div className="container-x">
          <SectionHeader eyebrow="NOS PRESTATIONS" title="Du permis à la livraison." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div key={i} className="card-premium animate-fadeup flex h-full flex-col p-7" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand/8 text-2xl leading-none">{s.icon}</span>
                <h3 className="h3-display mb-3 text-foreground">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau photographique */}
      <PhotoBand
        tint="normal"
        image={{ src: "/images/construction/entreprise-band.jpg", alt: "Structure de bâtiment commercial" }}
        eyebrow="Bâtiment professionnel"
        title={<>Du permis de construire<br />à la remise des clés.</>}
        stats={[
          { value: "1", label: "interlocuteur unique" },
          { value: "4", label: "étapes de suivi" },
          { value: "72h", label: "délai de réponse" },
        ]}
      >
        Locaux commerciaux, bureaux, entrepôts : un interlocuteur unique pour le suivi administratif, technique et financier de votre projet.
      </PhotoBand>

      {/* Process */}
      <section className="section bg-background">
        <div className="container-x">
          <SectionHeader eyebrow="NOTRE MÉTHODE" title="Un projet, un interlocuteur." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={i} className="card-premium svc-step animate-fadeup flex h-full flex-col p-7" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="svc-step-num font-display mb-6 text-5xl leading-none text-brand">{p.num}</div>
                <div className="svc-step-line mb-5 h-0.5 w-8 origin-left rounded-full bg-brand" />
                <h3 className="h3-display mb-3 text-foreground">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ActivityNotice />
      <FaqSection items={FAQ} />
      <ConstructionCta />
    </ServiceScope>
  );
}
