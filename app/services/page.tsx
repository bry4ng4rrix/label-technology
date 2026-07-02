import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Nos Services — 7 Expertises Tech depuis Antananarivo",
  description:
    "Développement web & mobile, call center 50 postes, marketing digital, ERP, traitement de données, matériel informatique, comptabilité. Une couverture complète depuis Antananarivo.",
  keywords: [
    "services informatiques Madagascar",
    "prestations externalisation Madagascar",
    "agence complète Madagascar",
    "7 expertises Madagascar",
    "développement web Madagascar",
    "call center Madagascar",
    "marketing digital Madagascar",
    "ERP Madagascar",
    "traitement données Madagascar",
    "matériel informatique Madagascar",
    "comptabilité externalisée Madagascar",
    "BPO Madagascar",
    "outsourcing Madagascar",
    "prestataire IT Antananarivo",
    "services tech Antananarivo",
  ],
  alternates: {
    canonical: "https://labeltechnology.mg/services",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/services",
    siteName: "Label Technology",
    title: "Nos Services — 7 Expertises Tech depuis Antananarivo",
    description:
      "Développement web & mobile, call center 50 postes, marketing digital, ERP, traitement de données, matériel informatique, comptabilité.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Services Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Services — 7 Expertises Tech | Label Technology",
    description:
      "Développement web, call center, marketing digital, ERP, données, matériel, comptabilité. Depuis Antananarivo.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services Label Technology",
  url: "https://labeltechnology.mg/services",
  description: "7 pôles d'expertise technologique depuis Antananarivo, Madagascar.",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Développement Web & Mobile", url: "https://labeltechnology.mg/services/dev" },
    { "@type": "ListItem", position: 2, name: "Call Center 50 Postes FR/EN", url: "https://labeltechnology.mg/services/callcenter" },
    { "@type": "ListItem", position: 3, name: "Marketing Digital", url: "https://labeltechnology.mg/services/marketing" },
    { "@type": "ListItem", position: 4, name: "Digitalisation & ERP", url: "https://labeltechnology.mg/services/digital" },
    { "@type": "ListItem", position: 5, name: "Traitement de Données", url: "https://labeltechnology.mg/services/data" },
    { "@type": "ListItem", position: 6, name: "Matériel Informatique", url: "https://labeltechnology.mg/services/materiel" },
    { "@type": "ListItem", position: 7, name: "Comptabilité & Reporting", url: "https://labeltechnology.mg/services/comptabilite" },
  ],
};

const SERVICES = [
  {
    tag: "DÉVELOPPEMENT",
    href: "/services/dev",
    title: "Web & Mobile",
    accroche: "On ne livre pas du code. On livre de la croissance.",
    desc: "Sites, applications web, mobiles, APIs. Next.js, React Native, Node.js. Standards ESN européenne, réactivité startup.",
    items: ["Sites & Apps Web", "Applications Mobiles", "APIs & Back-end", "E-commerce", "Refonte & Migration"],
    featured: true,
  },
  {
    tag: "CALL CENTER",
    href: "/services/callcenter",
    title: "Call Center 50P",
    accroche: "Madagascar n'est pas un plan B. C'est un avantage compétitif.",
    desc: "50 postes opérationnels, bilingue FR/EN, disponibles 24h/24. Prospection B2B, support client, qualification de fichiers.",
    items: ["Prospection B2B", "Support FR/EN", "Qualification fichiers", "Prise de RDV", "Enquêtes & sondages"],
    featured: false,
  },
  {
    tag: "MARKETING",
    href: "/services/marketing",
    title: "Marketing Digital",
    accroche: "Votre audience existe. On va la trouver.",
    desc: "SEO, Google Ads, Meta Ads, social media, email marketing. Stratégies mesurables, ROI tracé dès le premier brief.",
    items: ["SEO & Contenu", "Google & Meta Ads", "Social Media", "Email Marketing", "Analytics"],
    featured: false,
  },
  {
    tag: "DIGITALISATION",
    href: "/services/digital",
    title: "Logiciels de Gestion",
    accroche: "Vos processus méritent mieux.",
    desc: "ERP, SIRH, GED, logiciels métier sur mesure. Odoo, SAP, solutions custom. Formation et conduite du changement incluses.",
    items: ["ERP & Odoo", "SIRH & Paie", "Gestion documentaire", "Logiciels métier", "Intégrations APIs"],
    featured: false,
  },
  {
    tag: "DONNÉES",
    href: "/services/data",
    title: "Traitement de Données",
    accroche: "Vos données sont un actif. On les rend exploitables.",
    desc: "Saisie, nettoyage, enrichissement, analyse, automatisation. Précision garantie, volumes importants, délais respectés.",
    items: ["Saisie & Collecte", "Nettoyage & Normalisation", "Analyse & DataViz", "Automatisation ETL", "Archivage RGPD"],
    featured: false,
  },
  {
    tag: "INFRASTRUCTURE",
    href: "/services/materiel",
    title: "Matériel Informatique",
    accroche: "Le bon matériel. Au juste prix.",
    desc: "Ordinateurs, réseau, serveurs, périphériques. Sélection professionnelle, installation et support sur Antananarivo.",
    items: ["PC & Workstations", "Réseau & WiFi", "Impression & Scan", "Onduleurs & Sauvegarde", "Maintenance IT"],
    featured: false,
  },
  {
    tag: "COMPTABILITÉ",
    href: "/services/comptabilite",
    title: "Comptabilité & Reporting",
    accroche: "Vos chiffres, enfin lisibles.",
    desc: "Saisie comptable, rapprochements bancaires, reporting mensuel et tableaux de bord. Disponible avant le 5 du mois.",
    items: ["Saisie comptable", "Rapprochements bancaires", "Reporting mensuel", "Tableaux de bord dirigeants", "Archivage RGPD"],
    featured: false,
  },
];

export default function ServicesPage() {
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
          <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>NOS EXPERTISES</p>
          <h1 className="font-display text-white mb-6 leading-tight" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            7 expertises.<br />
            <span style={{ color: "var(--brand-lt)" }}>1 équipe.</span>
          </h1>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
            Développement, Call Center, Marketing, Digitalisation, Données, Matériel, Comptabilité.
            Une couverture complète depuis Antananarivo.
          </p>
        </Reveal>
      </section>

      {/* Grid services */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={(i % 3) * 0.1} className="h-full">
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
        </div>
      </section>

      {/* Bande chiffres */}
      <section style={{ backgroundColor: "var(--brand)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {[
            { v: "60+", l: "Collaborateurs" },
            { v: "4 ans", l: "D'expérience" },
            { v: "FR/EN", l: "Bilingue certifié" },
            { v: "<72h", l: "Délai de réponse" },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center py-8">
              <div className="font-display text-3xl text-white mb-1">{m.v}</div>
              <div className="label-tag text-white/50 text-[10px]">{m.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
