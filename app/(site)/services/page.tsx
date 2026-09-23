import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CtaSection from "@/components/home/CtaSection";
import MetricsBand from "@/components/shared/MetricsBand";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

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

/* Hiérarchie éditoriale :
   - "core"  : expertises cœur, mises en avant (grandes cartes détaillées)
   - "other" : pôles complémentaires (cartes compactes)
   - "quote" : proposés sur devis, sans carte au même niveau que le cœur */
const SERVICES = [
  {
    tier: "core",
    tag: "DÉVELOPPEMENT",
    href: "/services/dev",
    title: "Web & Mobile",
    accroche: "On ne livre pas du code. On livre de la croissance.",
    desc: "Sites, applications web, mobiles, APIs. Next.js, React Native, Node.js. Standards ESN européenne, réactivité startup.",
    items: ["Sites & Apps Web", "Applications Mobiles", "APIs & Back-end", "E-commerce", "Refonte & Migration"],
  },
  {
    tier: "core",
    tag: "DIGITALISATION",
    href: "/services/digital",
    title: "Logiciels de Gestion",
    accroche: "Vos processus méritent mieux.",
    desc: "ERP, SIRH, GED, logiciels métier sur mesure. Odoo, SAP, solutions custom. Formation et conduite du changement incluses.",
    items: ["ERP & Odoo", "SIRH & Paie", "Gestion documentaire", "Logiciels métier", "Intégrations APIs"],
  },
  {
    tier: "other",
    tag: "MARKETING",
    href: "/services/marketing",
    title: "Marketing Digital",
    accroche: "Votre audience existe. On va la trouver.",
    desc: "SEO, Google Ads, Meta Ads, social media, email marketing. Stratégies mesurables, ROI tracé dès le premier brief.",
    items: ["SEO & Contenu", "Google & Meta Ads", "Social Media", "Email Marketing", "Analytics"],
  },
  {
    tier: "other",
    tag: "DONNÉES",
    href: "/services/data",
    title: "Traitement de Données",
    accroche: "Vos données sont un actif. On les rend exploitables.",
    desc: "Saisie, nettoyage, enrichissement, analyse, automatisation. Précision garantie, volumes importants, délais respectés.",
    items: ["Saisie & Collecte", "Nettoyage & Normalisation", "Analyse & DataViz", "Automatisation ETL", "Archivage RGPD"],
  },
  {
    tier: "quote",
    tag: "INFRASTRUCTURE",
    href: "/services/materiel",
    title: "Matériel Informatique",
    accroche: "Le bon matériel. Au juste prix.",
    desc: "Ordinateurs, réseau, serveurs, périphériques. Sélection professionnelle, installation et support sur Antananarivo.",
    items: ["PC & Workstations", "Réseau & WiFi", "Impression & Scan", "Onduleurs & Sauvegarde", "Maintenance IT"],
  },
  {
    tier: "quote",
    tag: "COMPTABILITÉ",
    href: "/services/comptabilite",
    title: "Comptabilité & Reporting",
    accroche: "Vos chiffres, enfin lisibles.",
    desc: "Saisie comptable, rapprochements bancaires, reporting mensuel et tableaux de bord. Disponible avant le 5 du mois.",
    items: ["Saisie comptable", "Rapprochements bancaires", "Reporting mensuel", "Tableaux de bord dirigeants", "Archivage RGPD"],
  },
] as const;

const CORE = SERVICES.filter((s) => s.tier === "core");
const OTHER = SERVICES.filter((s) => s.tier === "other");
const ON_QUOTE = SERVICES.filter((s) => s.tier === "quote");

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

      {/* ── Expertises cœur ── */}
      <section className="surface-light section relative">
        <div className="container-x">
          <SectionHeader
            eyebrow="Expertises cœur"
            title={
              <>
                Là où nous sommes <span className="gradient-text">les plus forts.</span>
              </>
            }
            description="Deux pôles concentrent l'essentiel de nos réalisations : le développement d'applications sur mesure et la digitalisation des processus de gestion."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {CORE.map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.08} className="h-full">
                <Link
                  href={s.href}
                  className="card-premium group flex h-full flex-col p-7 ring-1 ring-brand/25 sm:p-9"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="label-tag text-brand">{s.tag}</span>
                    <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-brand uppercase">
                      Expertise cœur
                    </span>
                  </div>
                  <h2 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="font-display mt-3 text-lg font-medium text-brand italic">
                    {s.accroche}
                  </p>
                  <p className="prose-body mt-5 flex-1 text-muted-foreground">{s.desc}</p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="link-arrow mt-8 text-sm text-brand">
                    Découvrir cette expertise
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pôles complémentaires ── */}
      <section className="section bg-background">
        <div className="container-x">
          <SectionHeader
            eyebrow="Pôles complémentaires"
            title="Ce qui vient en appui de vos projets."
            description="Mobilisés seuls ou en complément d'un projet de développement ou de digitalisation."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {OTHER.map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.08} className="h-full">
                <Link href={s.href} className="card-premium group flex h-full flex-col p-7">
                  <span className="label-tag mb-4 text-brand">{s.tag}</span>
                  <h3 className="h3-display text-foreground">{s.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <span className="link-arrow mt-6 text-sm text-brand">
                    Découvrir
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Sur devis — mention simple, sans carte au même niveau */}
          <Reveal delay={0.16} className="mt-10">
            <div className="rounded-2xl border border-dashed border-border bg-card/60 p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="label-tag mb-2 text-muted-foreground">Également sur devis</p>
                  <p className="text-sm text-muted-foreground">
                    Deux pôles mobilisés à la demande, selon le besoin et le volume.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {ON_QUOTE.map((s) => (
                    <li key={s.tag}>
                      <Link
                        href={s.href}
                        className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand"
                      >
                        {s.title}
                        <ArrowRight className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
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
