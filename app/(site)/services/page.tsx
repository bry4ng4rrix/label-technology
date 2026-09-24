import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BigStats from "@/components/services/BigStats";
import EditorialHero from "@/components/services/EditorialHero";
import PhotoPanel from "@/components/services/PhotoPanel";
import SectionIntro from "@/components/services/SectionIntro";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceScope, { scopeStyle } from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import Reveal from "@/components/shared/Reveal";
import { getTheme, type ServiceSlug } from "@/lib/service-themes";
import { OG_IMAGE } from "@/lib/seo";

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
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Services — 6 Expertises Tech | Label Technology",
    description:
      "Développement web, marketing digital, ERP, données, matériel, comptabilité. Depuis Antananarivo.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services Label Technology",
  url: "https://labeltechnology.mg/services",
  description:
    "6 pôles d'expertise technologique depuis Antananarivo, Madagascar.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Développement Web & Mobile",
      url: "https://labeltechnology.mg/services/dev",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Marketing Digital",
      url: "https://labeltechnology.mg/services/marketing",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Digitalisation & ERP",
      url: "https://labeltechnology.mg/services/digital",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Traitement de Données",
      url: "https://labeltechnology.mg/services/data",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Matériel Informatique",
      url: "https://labeltechnology.mg/services/materiel",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Comptabilité & Reporting",
      url: "https://labeltechnology.mg/services/comptabilite",
    },
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
    items: [
      "Sites & Apps Web",
      "Applications Mobiles",
      "APIs & Back-end",
      "E-commerce",
      "Refonte & Migration",
    ],
  },
  {
    tier: "core",
    tag: "DIGITALISATION",
    href: "/services/digital",
    title: "Logiciels de Gestion",
    accroche: "Vos processus méritent mieux.",
    desc: "ERP, SIRH, GED, logiciels métier sur mesure. Odoo, SAP, solutions custom. Formation et conduite du changement incluses.",
    items: [
      "ERP & Odoo",
      "SIRH & Paie",
      "Gestion documentaire",
      "Logiciels métier",
      "Intégrations APIs",
    ],
  },
  {
    tier: "other",
    tag: "MARKETING",
    href: "/services/marketing",
    title: "Marketing Digital",
    accroche: "Votre audience existe. On va la trouver.",
    desc: "SEO, Google Ads, Meta Ads, social media, email marketing. Stratégies mesurables, ROI tracé dès le premier brief.",
    items: [
      "SEO & Contenu",
      "Google & Meta Ads",
      "Social Media",
      "Email Marketing",
      "Analytics",
    ],
  },
  {
    tier: "other",
    tag: "DONNÉES",
    href: "/services/data",
    title: "Traitement de Données",
    accroche: "Vos données sont un actif. On les rend exploitables.",
    desc: "Saisie, nettoyage, enrichissement, analyse, automatisation. Précision garantie, volumes importants, délais respectés.",
    items: [
      "Saisie & Collecte",
      "Nettoyage & Normalisation",
      "Analyse & DataViz",
      "Automatisation ETL",
      "Archivage RGPD",
    ],
  },
  {
    tier: "quote",
    tag: "INFRASTRUCTURE",
    href: "/services/materiel",
    title: "Matériel Informatique",
    accroche: "Le bon matériel. Au juste prix.",
    desc: "Ordinateurs, réseau, serveurs, périphériques. Sélection professionnelle, installation et support sur Antananarivo.",
    items: [
      "PC & Workstations",
      "Réseau & WiFi",
      "Impression & Scan",
      "Onduleurs & Sauvegarde",
      "Maintenance IT",
    ],
  },
  {
    tier: "quote",
    tag: "COMPTABILITÉ",
    href: "/services/comptabilite",
    title: "Comptabilité & Reporting",
    accroche: "Vos chiffres, enfin lisibles.",
    desc: "Saisie comptable, rapprochements bancaires, reporting mensuel et tableaux de bord. Disponible avant le 5 du mois.",
    items: [
      "Saisie comptable",
      "Rapprochements bancaires",
      "Reporting mensuel",
      "Tableaux de bord dirigeants",
      "Archivage RGPD",
    ],
  },
] as const;

const CORE = SERVICES.filter((s) => s.tier === "core");
const OTHER = SERVICES.filter((s) => s.tier === "other");
const ON_QUOTE = SERVICES.filter((s) => s.tier === "quote");

/** Chaque bloc adopte la couleur du service qu'il présente. */
function slugOf(href: string): ServiceSlug {
  return href.replace("/services/", "") as ServiceSlug;
}

export default function ServicesPage() {
  return (
    <ServiceScope slug="index" as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <EditorialHero
        slug="index"
        eyebrow="Nos expertises"
        title={
          <>
            Six expertises.
            <br />
            <span className="gradient-text-svc-light">Une seule équipe.</span>
          </>
        }
        description="Développement, Marketing, Digitalisation, Données, Matériel, Comptabilité. Une couverture complète depuis Antananarivo — deux pôles cœur, quatre en appui."
        image={{
          src: "/images/services/index/hero.jpg",
          alt: "Espace de travail de l'équipe Label Technology",
        }}
        stats={[
          { value: "16+", label: "collaborateurs" },
          { value: "6", label: "expertises" },
          { value: "FR/EN", label: "bilingue" },
          { value: "72h", label: "de réponse" },
        ]}
      />

      {/* Expertises cœur — deux grands blocs éditoriaux alternés */}
      <ServiceSection slug="index">
        <SectionIntro
          eyebrow="Expertises cœur"
          title={
            <>
              Là où nous sommes
              <br />
              <span className="gradient-text-svc">les plus forts.</span>
            </>
          }
          description="Deux pôles concentrent l'essentiel de nos réalisations : le développement d'applications sur mesure et la digitalisation des processus de gestion. C'est là que notre équipe senior est la plus profonde."
        />

        <div className="space-y-20 sm:space-y-28">
          {CORE.map((s, i) => {
            const slug = slugOf(s.href);
            const theme = getTheme(slug);
            const reverse = i % 2 === 1;
            return (
              <div key={s.tag} style={scopeStyle(slug)}>
                <div
                  className={`grid items-center gap-10 lg:gap-16 ${
                    reverse
                      ? "lg:grid-cols-[1fr_0.9fr]"
                      : "lg:grid-cols-[0.9fr_1fr]"
                  }`}
                >
                  <Reveal className={reverse ? "lg:order-2" : "lg:order-1"}>
                    <p
                      className="label-tag mb-4"
                      style={{ color: "var(--svc)" }}
                    >
                      {s.tag}
                    </p>
                    <h3 className="font-display text-[clamp(1.75rem,1.25rem+1.9vw,2.75rem)] leading-[1.05] font-bold tracking-[-0.03em] text-foreground">
                      {s.title}
                    </h3>
                    <p
                      className="font-display mt-4 text-lg font-medium italic"
                      style={{ color: "var(--svc)" }}
                    >
                      {s.accroche}
                    </p>
                    <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground"
                          style={{
                            borderColor: `color-mix(in srgb, ${theme.accent} 28%, transparent)`,
                            background: `color-mix(in srgb, ${theme.accent} 7%, transparent)`,
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={s.href}
                      className="link-arrow mt-8 text-sm font-semibold"
                      style={{ color: "var(--svc)" }}
                    >
                      Découvrir cette expertise
                      <ArrowRight className="size-4" />
                    </Link>
                  </Reveal>

                  <Reveal
                    delay={0.1}
                    className={reverse ? "lg:order-1" : "lg:order-2"}
                  >
                    <PhotoPanel
                      src={`/images/services/${slug}/hero.jpg`}
                      alt={`Illustration — ${s.title}`}
                      ratio="4/3"
                      tone="light"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </ServiceSection>

      {/* Pôles complémentaires — liste éditoriale filetée */}
      <ServiceSection slug="index" tone="plain">
        <SectionIntro
          eyebrow="Pôles complémentaires"
          title="Ce qui vient en appui de vos projets."
          description="Mobilisés seuls ou en complément d'un projet de développement ou de digitalisation."
        />

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {OTHER.map((s, i) => (
            <Reveal key={s.tag} delay={i * 0.08}>
              <Link
                href={s.href}
                className="group block"
                style={scopeStyle(slugOf(s.href))}
              >
                <PhotoPanel
                  src={`/images/services/index/pole-${slugOf(s.href)}.jpg`}
                  alt={`Illustration — ${s.title}`}
                  ratio="16/9"
                  tone="light"
                  tint="soft"
                  quality={65}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="mb-7 rounded-2xl"
                />
                <div className="border-t border-border pt-7 transition-colors group-hover:border-[var(--svc)]">
                  <p className="label-tag mb-3" style={{ color: "var(--svc)" }}>
                    {s.tag}
                  </p>
                  <h3 className="font-display text-xl leading-snug font-semibold tracking-tight text-foreground sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                  <span
                    className="link-arrow mt-5 text-sm font-semibold"
                    style={{ color: "var(--svc)" }}
                  >
                    Découvrir
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Sur devis — mention discrète */}
        <Reveal delay={0.16} className="mt-16">
          <div className="glass-card p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="label-tag mb-2 text-muted-foreground">
                  Également sur devis
                </p>
                <p className="text-sm text-muted-foreground">
                  Deux pôles mobilisés à la demande, selon le besoin et le
                  volume.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {ON_QUOTE.map((s) => (
                  <li key={s.tag}>
                    <Link
                      href={s.href}
                      className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-[var(--svc)]"
                      style={scopeStyle(slugOf(s.href))}
                    >
                      {s.title}
                      <ArrowRight className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--svc)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </ServiceSection>

      <BigStats
        slug="index"
        items={[
          { value: "16+", label: "Collaborateurs à Antananarivo" },
          { value: "4 ans", label: "D'expérience depuis 2022" },
          { value: "FR/EN", label: "Équipe bilingue certifiée" },
          { value: "<72h", label: "Délai de réponse garanti" },
        ]}
        caption="Une seule équipe, un seul interlocuteur, quel que soit le nombre de pôles mobilisés sur votre projet."
      />

      <ServiceCta
        slug="index"
        title={
          <>
            Un besoin, plusieurs pôles.{" "}
            <span className="gradient-text-svc-light">
              Un seul interlocuteur.
            </span>
          </>
        }
        description="Décrivez votre besoin : on vous dit sous 72h quelles expertises mobiliser, et ce que ça coûte."
        secondary={{ href: "/projets", label: "Voir nos réalisations" }}
      />
    </ServiceScope>
  );
}
