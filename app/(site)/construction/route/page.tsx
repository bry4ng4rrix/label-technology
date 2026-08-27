import type { Metadata } from "next";
import Image from "next/image";
import FaqSection from "@/components/shared/FaqSection";
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

      {/* Hero split */}
      <section className="relative overflow-hidden grid-bg" style={{ backgroundColor: "var(--ink)", minHeight: "70vh" }}>
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center" style={{ minHeight: "70vh" }}>
          <div className="relative z-10 py-28 lg:pr-12">
            <p className="animate-fadeup label-tag mb-3" style={{ color: "var(--brand-lt)" }}>TRAVAUX ROUTIERS</p>
            <p className="animate-fadeup text-white/40 text-xs font-light tracking-wide mb-5">
              Nouvelle activité — Construction &amp; Génie Civil
            </p>
            <h1 className="animate-fadeup-d1 h1-display text-white mb-6">
              Des routes qui<br />
              <span className="bg-linear-to-r from-[var(--brand)] to-[var(--brand-lt)] bg-clip-text text-transparent">tiennent la distance.</span>
            </h1>
            <p className="animate-fadeup-d2 text-white/70 text-lg leading-relaxed mb-10 max-w-xl" style={{ lineHeight: 1.8 }}>
              Terrassement, revêtement, assainissement, signalisation. Nous
              développons une offre autour d&apos;un suivi de chantier
              rigoureux, du relevé topographique à la réception des travaux.
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
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=700&fit=crop&q=80"
              alt="Travaux routiers — chantier de voirie"
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
            De la route au dossier de réception.
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
            Un chantier maîtrisé, du devis à la réception.
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

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />
      <CtaSection />
    </main>
  );
}
