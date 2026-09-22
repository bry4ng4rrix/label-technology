import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CtaSection from "@/components/home/CtaSection";
import MetricsBand from "@/components/shared/MetricsBand";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nos Services — 6 Expertises Tech depuis Antananarivo",
  description:
    "Développement web & mobile, marketing digital, ERP, traitement de données, matériel informatique, comptabilité. Une couverture complète depuis Antananarivo.",
  alternates: {
    canonical: "https://labeltechnology.mg/services",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/services",
    siteName: "Label Technology",
    title: "Nos Services — 6 Expertises Tech depuis Antananarivo",
    description:
      "Développement web & mobile, marketing digital, ERP, traitement de données, matériel informatique, comptabilité.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Services Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Services — 6 Expertises Tech | Label Technology",
    description:
      "Développement web, marketing digital, ERP, données, matériel, comptabilité. Depuis Antananarivo.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services Label Technology",
  url: "https://labeltechnology.mg/services",
  description: "6 pôles d'expertise technologique depuis Antananarivo, Madagascar.",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Développement Web & Mobile", url: "https://labeltechnology.mg/services/dev" },
    { "@type": "ListItem", position: 2, name: "Marketing Digital", url: "https://labeltechnology.mg/services/marketing" },
    { "@type": "ListItem", position: 3, name: "Digitalisation & ERP", url: "https://labeltechnology.mg/services/digital" },
    { "@type": "ListItem", position: 4, name: "Traitement de Données", url: "https://labeltechnology.mg/services/data" },
    { "@type": "ListItem", position: 5, name: "Matériel Informatique", url: "https://labeltechnology.mg/services/materiel" },
    { "@type": "ListItem", position: 6, name: "Comptabilité & Reporting", url: "https://labeltechnology.mg/services/comptabilite" },
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

      <PageHero
        eyebrow="Nos expertises"
        title={
          <>
            6 expertises.
            <br />
            <span className="gradient-text-light">1 équipe.</span>
          </>
        }
        description="Développement, Marketing, Digitalisation, Données, Matériel, Comptabilité. Une couverture complète depuis Antananarivo."
        actions={
          <>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Démarrer un projet
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass" className="rounded-full">
              <Link href="/projets">Voir nos réalisations</Link>
            </Button>
          </>
        }
      />

      {/* Grille services */}
      <section className="surface-light section relative">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href={s.href}
                  className={cn(
                    "card-premium group flex h-full flex-col p-7 sm:p-8",
                    s.featured && "ring-1 ring-brand/30",
                  )}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="label-tag text-brand">{s.tag}</span>
                    {s.featured && (
                      <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-brand uppercase">
                        Phare
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-2xl tracking-tight text-foreground">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium text-brand/80 italic">{s.accroche}</p>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.items.map((item, j) => (
                      <li
                        key={j}
                        className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="link-arrow mt-7 text-sm text-brand">
                    Découvrir
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MetricsBand
        items={[
          { value: "16+", label: "Collaborateurs" },
          { value: "4 ans", label: "D'expérience" },
          { value: "FR/EN", label: "Bilingue certifié" },
          { value: "<72h", label: "Délai de réponse" },
        ]}
      />

      <CtaSection />
    </main>
  );
}
