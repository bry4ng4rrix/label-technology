import type { Metadata } from "next";

import BigStats from "@/components/services/BigStats";
import EditorialHero from "@/components/services/EditorialHero";
import EditorialRow from "@/components/services/EditorialRow";
import FeatureGrid from "@/components/services/FeatureGrid";
import PhotoBand from "@/components/services/PhotoBand";
import PhotoMosaic from "@/components/services/PhotoMosaic";
import SectionIntro from "@/components/services/SectionIntro";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceSteps from "@/components/services/ServiceSteps";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Comptabilité & Reporting — Saisie, Clôture, Tableaux de bord",
  description: "Saisie comptable, rapprochements bancaires, reporting financier mensuel, tableaux de bord dirigeants. Expertise comptable externalisée depuis Antananarivo.",
  alternates: {
    canonical: "https://labeltechnology.mg/services/comptabilite",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/services/comptabilite",
    siteName: "Label Technology",
    title: "Comptabilité & Reporting — Saisie, Clôture, Tableaux de bord | Label Technology",
    description:
      "Saisie comptable, rapprochements bancaires, reporting mensuel, tableaux de bord. Expertise comptable externalisée depuis Antananarivo.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comptabilité & Reporting | Label Technology",
    description:
      "Saisie comptable, rapprochements bancaires, reporting mensuel. Externalisé depuis Antananarivo.",
  },
};

const METRICS = [
  { v: "J+5", l: "livraison reporting" },
  { v: "100%", l: "conformité fiscale" },
  { v: "−60%", l: "temps de clôture" },
  { v: "3 ans", l: "d'expérience" },
];

const SERVICES = [
  { icon: "📒", title: "Saisie comptable", desc: "Enregistrement quotidien ou hebdomadaire de vos opérations comptables. Journaux d'achats, de ventes, de banque et d'opérations diverses. Saisie rigoureuse, vérifiée, conforme aux normes SYSCOHADA et françaises." },
  { icon: "🏦", title: "Rapprochements bancaires", desc: "Rapprochement mensuel entre vos relevés bancaires et votre comptabilité. Identification des écarts, correction des erreurs, soldes réconciliés à 100% avant transmission." },
  { icon: "📊", title: "Reporting financier", desc: "Liasses de synthèse mensuelle : compte de résultat, bilan provisoire, trésorerie prévisionnelle. Votre situation financière réelle, disponible avant le 5 de chaque mois." },
  { icon: "📋", title: "Déclarations fiscales", desc: "Préparation et suivi de vos déclarations TVA, IS et autres obligations fiscales. Respect des échéances légales, optimisation dans le cadre réglementaire." },
  { icon: "📈", title: "Tableaux de bord dirigeants", desc: "Indicateurs clés (CA, marges, charges, trésorerie) présentés de façon visuelle et synthétique. Des données qui permettent de décider vite — sans attendre l'expert-comptable annuel." },
  { icon: "🗂", title: "Archivage & conformité", desc: "Conservation sécurisée de vos pièces comptables numériques. Accès en ligne à l'historique complet, conformité aux durées légales de conservation selon le droit malgache et français." },
];

const PROCESS = [
  { num: "01", title: "Collecte des pièces", desc: "Transmission de vos factures, relevés et justificatifs via notre espace sécurisé. Scan physique ou envoi numérique — on s'adapte à votre organisation existante." },
  { num: "02", title: "Saisie & contrôle", desc: "Saisie des écritures comptables avec double vérification systématique. Chaque opération est rapprochée de son justificatif avant validation définitive." },
  { num: "03", title: "Clôture & reporting", desc: "Production des états financiers mensuels avant le 5 du mois suivant. Analyse des écarts significatifs, alertes en cas d'anomalie détectée." },
  { num: "04", title: "Revue & transmission", desc: "Rapport mensuel transmis à votre expert-comptable ou directement à la direction. Disponibilité pour répondre à toute question sur les chiffres produits." },
];

/** Une photographie par étape du processus. */
const STEP_SHOTS = [
  { src: "/images/services/comptabilite/step-1.jpg", alt: "Pièces comptables et calculatrice sur un bureau" },
  { src: "/images/services/comptabilite/step-2.jpg", alt: "Saisie des écritures sur un ordinateur portable" },
  { src: "/images/services/comptabilite/step-3.jpg", alt: "Clôture mensuelle et arrêté des comptes" },
  { src: "/images/services/comptabilite/step-4.jpg", alt: "Revue des chiffres présentée en salle de réunion" },
];


const TESTIMONIALS = [
  { quote: "On externalisait notre saisie comptable en interne à un employé à mi-temps. Depuis qu'on travaille avec Label Technology, le reporting est disponible le 4 du mois, sans relance, sans erreur. On a réaffecté cet employé à un poste à valeur ajoutée.", author: "Lanto R.", role: "Directrice Financière", company: "Groupe retail, Antananarivo" },
  { quote: "Notre clôture mensuelle prenait 8 jours. Elle prend maintenant 2 jours. L'équipe comprend les spécificités SYSCOHADA et peut aussi gérer la présentation selon les normes françaises pour nos actionnaires européens.", author: "Jean-Marc V.", role: "DAF", company: "Filiale industrielle, Madagascar" },
  { quote: "Les tableaux de bord qu'ils produisent sont clairs, visuels, lisibles par mes équipes commerciales. Je n'ai plus besoin d'attendre l'expert-comptable pour savoir où on en est.", author: "Sonia A.", role: "CEO", company: "Cabinet conseil, Antananarivo" },
];

const FAQ = [
  { q: "Travaillez-vous avec des entreprises françaises soumises aux normes françaises ?", a: "Oui. Notre équipe maîtrise les deux référentiels : SYSCOHADA pour Madagascar et le Plan Comptable Général (PCG) pour la France. On peut produire des états financiers conformes à l'un ou l'autre selon vos besoins." },
  { q: "Comment nous transmettez-vous les documents à traiter ?", a: "Via un espace sécurisé (Google Drive partagé ou plateforme dédiée). Vos factures, relevés et justificatifs sont déposés en ligne — on s'occupe du reste. Pas de transfert papier nécessaire." },
  { q: "Pouvez-vous travailler avec notre logiciel comptable existant ?", a: "On s'adapte à la plupart des logiciels courants : Sage, QuickBooks, EBP, Odoo, Cegid. Si vous n'avez pas de logiciel, on peut recommander une solution adaptée à votre volume et votre budget." },
  { q: "La comptabilité externalisée remplace-t-elle un expert-comptable ?", a: "Non — on est complémentaires. On prend en charge la saisie quotidienne et le reporting de gestion, ce qui allège considérablement le travail de votre expert-comptable et réduit vos honoraires annuels." },
];

const COMPARATIF = [
  { label: "Coût mensuel estimé", interne: "800–1 500 €", externe: "250–600 €" },
  { label: "Délai de reporting", interne: "10–15 jours", externe: "Avant J+5" },
  { label: "Risque d'erreur", interne: "Dépend du profil", externe: "Double contrôle systématique" },
  { label: "Disponibilité", interne: "Congés, turnover", externe: "Continuité garantie" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Comptabilité & Reporting",
  url: "https://labeltechnology.mg/services/comptabilite",
  description:
    "Saisie comptable, rapprochements bancaires, reporting financier mensuel et tableaux de bord dirigeants. Conformes SYSCOHADA et PCG français. Reporting disponible avant J+5.",
  provider: {
    "@type": "Organization",
    name: "Label Technology",
    url: "https://labeltechnology.mg",
  },
  areaServed: [
    { "@type": "Country", name: "Madagascar" },
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Belgique" },
  ],
  serviceType: "Comptabilité externalisée / BPO finance",
};

export default function ComptabilitePage() {
  return (
    <ServiceScope slug="comptabilite" as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <EditorialHero
        slug="comptabilite"
        eyebrow="Comptabilité & reporting"
        title={
          <>
            Vos chiffres,
            <br />
            <span className="gradient-text-svc-light">enfin lisibles.</span>
          </>
        }
        description="Saisie comptable, rapprochements bancaires, reporting mensuel et tableaux de bord dirigeants. Des décisions fondées sur des données fiables, disponibles avant le 5 du mois."
        image={{ src: "/images/services/comptabilite/hero.jpg", alt: "Documents comptables et calculatrice sur un bureau" }}
        primary={{ href: "/contact", label: "Demander un devis" }}
        stats={METRICS.map((m) => ({ value: m.v, label: m.l }))}
      />

      {/* Prestations — en-tête asymétrique + colonnes filetées */}
      <ServiceSection slug="comptabilite">
        <SectionIntro
          eyebrow="Nos prestations"
          title={
            <>
              La comptabilité
              <br />
              <span className="gradient-text-svc">qui libère du temps.</span>
            </>
          }
          description="Externalisez la saisie et le contrôle, gardez la décision. Le reporting mensuel arrive avant le 5, toujours au même format, toujours à la même date."
        />
        <FeatureGrid
          items={SERVICES.map((s, i) => ({
            icon: <span className="text-2xl leading-none">{s.icon}</span>,
            title: s.title,
            desc: s.desc,
            image: {
              src: `/images/services/comptabilite/feature-${i + 1}.jpg`,
              alt: s.title,
            },
          }))}
        />
      </ServiceSection>

      {/* Rangée éditoriale : texte ↔ photo */}
      <ServiceSection slug="comptabilite" tone="plain">
        <EditorialRow
          eyebrow="Interne vs externalisé"
          title={
            <>
              Un comptable en interne
              <br />
              coûte plus qu'il n'y paraît.
            </>
          }
          points={[
            "Coût mensuel de 250 à 600 € contre 800 à 1 500 € en interne",
            "Double contrôle systématique au lieu d'une saisie unique",
            "Continuité garantie — ni congés, ni turnover à gérer",
          ]}
          image={{
            src: "/images/services/comptabilite/row.jpg",
            alt: "Saisie et contrôle de documents comptables",
          }}
          stat={{ value: "J+5", label: "reporting disponible chaque mois" }}
          cta={{ href: "/contact", label: "Comparer avec ma situation" }}
          ratio="5/4"
        >
          Le calcul ne se limite pas au salaire : recrutement, formation, logiciel, congés, remplacement. L'externalisation transforme un coût fixe incertain en forfait mensuel prévisible.
        </EditorialRow>
      </ServiceSection>

      {/* Comparatif interne / externalisé */}
      <ServiceSection slug="comptabilite" tone="dark">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="label-tag mb-4" style={{ color: "var(--svc)" }}>
              Comparatif
            </p>
            <h2 className="font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-white">
              Ce que vous payez
              <br />
              vraiment, des deux côtés.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
              Les postes de coût ne se limitent pas au salaire. Voici la
              comparaison poste par poste, sur les quatre critères qui
              reviennent le plus souvent dans nos échanges.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card p-6 sm:p-8" data-tone="dark">
              <div className="label-tag mb-5 grid grid-cols-3 gap-2 text-white/40">
                <span />
                <span className="text-center">En interne</span>
                <span className="text-center" style={{ color: "var(--svc)" }}>
                  Externalisé
                </span>
              </div>
              <div className="space-y-5">
                {COMPARATIF.map((r) => (
                  <div
                    key={r.label}
                    className="grid grid-cols-3 gap-2 border-b border-white/8 pb-4 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-white/60">{r.label}</span>
                    <span className="text-center text-white/45">{r.interne}</span>
                    <span className="text-center font-medium" style={{ color: "var(--svc)" }}>
                      {r.externe}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </ServiceSection>


      {/* Deuxième rangée éditoriale — photo à gauche */}
      <ServiceSection slug="comptabilite">
        <EditorialRow
          reverse
          eyebrow="Reporting dirigeant"
          title={
            <>
              Un chiffre livré en retard
              <br />
              ne sert plus à décider.
            </>
          }
          points={[
            "Reporting mensuel disponible avant le 5",
            "Tableaux de bord adaptés à vos indicateurs",
            "Commentaire d'analyse joint à chaque envoi",
          ]}
          image={{ src: "/images/services/comptabilite/row2.jpg", alt: "Tableau de bord financier sur écran" }}
          stat={{ value: "98 %", label: "reportings livrés avant J+5" }}
          ratio="4/3"
        >
          La comptabilité n'est pas qu'une obligation légale. Livrée à temps et bien présentée, elle devient l'outil de pilotage le plus fiable dont vous disposez.
        </EditorialRow>
      </ServiceSection>

      {/* Bandeau photographique — temps fort éditorial */}
      <PhotoBand
        image={{ src: "/images/services/comptabilite/band.jpg", alt: "Équipe dirigeante en réunion de travail" }}
        eyebrow="Continuité"
        title={<>Ni congés, ni turnover,<br />ni période creuse.</>}
        stats={[
          { value: "100 %", label: "conformité fiscale" },
          { value: "J+5", label: "reporting mensuel" },
          { value: "3 ans", label: "archivage conforme" },
        ]}
      >
        Une équipe prend le relais d'une autre sans rupture. Vos échéances fiscales et sociales sont tenues, quoi qu'il arrive de notre côté.
      </PhotoBand>

      {/* Chiffres en très grande typo */}
      <BigStats
        slug="comptabilite"
        items={[
          { value: "−60 %", label: "Réduction du délai de clôture mensuelle" },
          { value: "100 %", label: "Conformité fiscale garantie" },
          { value: "98 %", label: "Reporting disponible avant J+5" },
          { value: "3 ans", label: "Archivage conforme RGPD" },
        ]}
        caption="L'externalisation comptable réduit vos coûts fixes, élimine les risques d'erreur et vous donne accès à un reporting structuré — sans recruter ni former un comptable en interne."
      />



      {/* Mosaïque asymétrique */}
      <ServiceSection slug="comptabilite" tone="plain">
        <PhotoMosaic
          eyebrow="Saisie & contrôle"
          title={
            <>
              Deux regards valent mieux
              <br />
              qu'une double saisie.
            </>
          }
          images={[
            { src: "/images/services/comptabilite/mosaic-a.jpg", alt: "Travail collaboratif sur des documents" },
            { src: "/images/services/comptabilite/mosaic-b.jpg", alt: "Analyse de données financières" },
          ]}
        >
          Chaque écriture passe par un contrôle indépendant. Les rapprochements bancaires sont faits mensuellement, pas en urgence à la clôture annuelle.
        </PhotoMosaic>
      </ServiceSection>

      {/* Méthode */}
      <ServiceSection slug="comptabilite" tone="plain">
        <SectionIntro
          eyebrow="Notre méthode"
          title="Simple, régulier, sans surprise."
          description="Un rythme mensuel cadré, les mêmes livrables chaque mois, aux mêmes dates."
        />
        <ServiceSteps steps={PROCESS.map((p, i) => ({ num: p.num, title: p.title, desc: p.desc, image: STEP_SHOTS[i] }))} />
      </ServiceSection>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      <ServiceCta
        slug="comptabilite"
        title={
          <>
            Reprenez la main <span className="gradient-text-svc-light">sur vos chiffres.</span>
          </>
        }
        description="Parlons de votre volume et de vos échéances : on vous propose un forfait mensuel clair sous 72h."
      />
    </ServiceScope>
  );
}
