import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import FaqSection from "@/components/shared/FaqSection";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import ActivityNotice from "@/components/construction/ActivityNotice";
import ConstructionCta from "@/components/construction/ConstructionCta";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travaux Routiers — Terrassement, Revêtement, Voirie",
  description:
    "Construction et réfection de routes à Madagascar : terrassement, chaussées, assainissement, signalisation. Suivi de chantier de bout en bout depuis Antananarivo.",
  keywords: [
    "travaux routiers Madagascar",
    "construction route Antananarivo",
    "terrassement Madagascar",
    "réfection voirie Madagascar",
    "entreprise travaux publics Madagascar",
    "revêtement chaussée Madagascar",
    "assainissement routier Madagascar",
    "BTP route Madagascar",
    "signalisation routière Madagascar",
  ],
  alternates: {
    canonical: "https://labeltechnology.mg/construction/route",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/construction/route",
    siteName: "Label Technology",
    title: "Travaux Routiers — Terrassement, Revêtement, Voirie | Label Technology",
    description:
      "Construction et réfection de routes à Madagascar : terrassement, chaussées, assainissement, signalisation.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Travaux Routiers — Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travaux Routiers | Label Technology",
    description: "Terrassement, chaussées, assainissement, signalisation. Depuis Antananarivo.",
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
  { icon: "🚜", title: "Terrassement & plateforme", desc: "Déblai, remblai, nivellement et préparation de plateforme avant construction. Étude de sol préalable pour sécuriser la suite du chantier." },
  { icon: "🛣", title: "Chaussées & revêtement", desc: "Construction et réfection de chaussées : couche de base, enrobé, pavage. Choix du revêtement adapté au trafic et au budget." },
  { icon: "💧", title: "Assainissement routier", desc: "Caniveaux, buses, ouvrages de drainage. Une route qui dure est une route qui évacue bien l'eau — c'est notre priorité dès l'étude." },
  { icon: "🚧", title: "Signalisation & marquage", desc: "Marquage au sol, panneaux, dispositifs de sécurité. Mise en conformité avec les normes en vigueur avant ouverture à la circulation." },
  { icon: "📐", title: "Étude & relevé topographique", desc: "Relevé terrain, étude de faisabilité, chiffrage détaillé. Un devis qui reflète la réalité du chantier, pas une estimation approximative." },
  { icon: "✅", title: "Contrôle qualité & réception", desc: "Contrôle continu pendant l'exécution, essais de compactage, levée de réserves. Dossier de chantier complet remis à la réception." },
];

const PROCESS = [
  { num: "01", title: "Étude & devis", desc: "Visite terrain, relevé topographique, étude de sol si nécessaire. Devis détaillé sous 48h, poste par poste." },
  { num: "02", title: "Planification", desc: "Planning de chantier, mobilisation des équipes et du matériel, coordination avec les riverains et autorités locales." },
  { num: "03", title: "Exécution", desc: "Terrassement, mise en œuvre du revêtement, assainissement. Contrôle qualité continu à chaque étape clé." },
  { num: "04", title: "Réception", desc: "Contrôle final, essais de conformité, levée de réserves. Remise du dossier de chantier complet." },
];

const FAQ = [
  { q: "Intervenez-vous sur des routes privées et des voiries d'entreprise ?", a: "Oui — accès de sites industriels, voiries de lotissements, parkings et voies internes. Le même niveau d'exigence que sur les chantiers publics." },
  { q: "Comment est établi le devis ?", a: "Après une visite terrain et un relevé topographique. Le devis détaille chaque poste (terrassement, revêtement, assainissement) pour une estimation fidèle au chantier réel." },
  { q: "Quels revêtements proposez-vous ?", a: "Enrobé, béton, pavage, selon le trafic attendu et le budget. On vous conseille la solution la plus adaptée plutôt que la plus chère." },
  { q: "Assurez-vous le suivi après la réception des travaux ?", a: "Oui, dans le cadre des garanties légales applicables. Un dossier de chantier complet vous est remis pour tout suivi ultérieur." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Travaux Routiers",
  url: "https://labeltechnology.mg/construction/route",
  description:
    "Construction et réfection de routes : terrassement, chaussées, assainissement, signalisation. Depuis Antananarivo, Madagascar.",
  provider: {
    "@type": "Organization",
    name: "Label Technology",
    url: "https://labeltechnology.mg",
  },
  areaServed: [{ "@type": "Country", name: "Madagascar" }],
  serviceType: "Travaux publics / BTP",
};

export default function RouteConstructionPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        size="lg"
        eyebrow={
          <>
            TRAVAUX ROUTIERS
            <span className="ml-2 rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium tracking-normal text-white/50 normal-case">
              Nouvelle activité — Construction &amp; Génie Civil
            </span>
          </>
        }
        title={
          <>
            Des routes qui
            <br />
            <span className="gradient-text-light">tiennent la distance.</span>
          </>
        }
        description="Terrassement, revêtement, assainissement, signalisation. Nous développons une offre autour d&apos;un suivi de chantier rigoureux, du relevé topographique à la réception des travaux."
        image={{ src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=700&fit=crop&q=80", alt: "Travaux routiers — chantier de voirie", priority: true }}
        actions={
          <>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Demander un devis
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass" className="rounded-full">
              <Link href="/construction">Découvrir l&apos;activité</Link>
            </Button>
          </>
        }
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
          <SectionHeader eyebrow="NOS PRESTATIONS" title="De la route au dossier de réception." />
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

      {/* Process */}
      <section className="section bg-background">
        <div className="container-x">
          <SectionHeader eyebrow="NOTRE MÉTHODE" title="Un chantier maîtrisé, du devis à la réception." />
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
    </main>
  );
}
