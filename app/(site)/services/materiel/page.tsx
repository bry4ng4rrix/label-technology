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
import MaterielChart from "@/components/services/MaterielChartWrapper";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Vente Matériel Informatique — PC, Réseau, Infrastructure",
  description: "Ordinateurs, réseau, périphériques, serveurs. Marques professionnelles, installation sur site, maintenance. Devis en 4h depuis Antananarivo.",
  alternates: {
    canonical: "https://labeltechnology.mg/services/materiel",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/services/materiel",
    siteName: "Label Technology",
    title: "Vente Matériel Informatique — PC, Réseau, Infrastructure | Label Technology",
    description:
      "Ordinateurs, réseau, périphériques, serveurs. Marques professionnelles, installation sur site, maintenance. Devis en 4h.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matériel Informatique — PC, Réseau | Label Technology",
    description:
      "Ordinateurs, réseau, périphériques. Marques pro, installation, maintenance. Devis en 4h Antananarivo.",
  },
};

const METRICS = [
  { v: "25+", l: "marques partenaires" },
  { v: "4h", l: "délai de devis" },
  { v: "3 ans", l: "garantie constructeur" },
  { v: "Antananarivo", l: "livraison & installation" },
];

const CATEGORIES = [
  { icon: "💻", title: "Ordinateurs & Workstations", desc: "PC de bureau, laptops, stations de travail haute performance. Marques professionnelles : Lenovo, HP, Dell. Garanties constructeur incluses, livraison et mise en service sur site." },
  { icon: "🖥", title: "Écrans & Périphériques", desc: "Moniteurs simple et multi-écrans, claviers, souris ergonomiques, casques audio professionnels. Configurations adaptées à chaque poste de travail et à chaque utilisateur." },
  { icon: "🌐", title: "Réseau & Infrastructure", desc: "Switches, routeurs, points d'accès WiFi entreprise, câblage structuré. Installation et configuration réseau complète par nos techniciens certifiés." },
  { icon: "🖨", title: "Impression & Numérisation", desc: "Imprimantes laser, multifonctions, scanners documentaires haute vitesse. Contrats de maintenance disponibles pour une disponibilité continue de votre parc d'impression." },
  { icon: "🔌", title: "Alimentation & Sécurité", desc: "Onduleurs UPS, parasurtenseurs, disques durs et solutions de sauvegarde automatisée. Protégez votre infrastructure contre les coupures de courant et les pertes de données." },
  { icon: "🛠", title: "Maintenance & Support", desc: "Contrats de maintenance préventive et corrective. Hotline technique dédiée, interventions sur site dans Antananarivo et les régions. Temps de réponse garanti en moins de 4h." },
];

const PROCESS = [
  { num: "01", title: "Audit des besoins", desc: "Analyse de votre parc existant, besoins par poste de travail, contraintes de budget et de délais. On recommande ce qui est utile, pas ce qui coûte le plus cher." },
  { num: "02", title: "Devis & sélection", desc: "Devis détaillé avec alternatives comparées, rapport coût/performance, garanties constructeur. Validation avec vous avant toute commande — aucune surprise à la livraison." },
  { num: "03", title: "Livraison & installation", desc: "Livraison sur site Antananarivo et régions. Installation, configuration complète, intégration réseau. Tout est opérationnel et testé avant que notre équipe reparte." },
  { num: "04", title: "Support continu", desc: "Hotline technique dédiée, interventions préventives planifiées, garantie de remplacement rapide en cas de panne. Un interlocuteur unique pour tout votre parc informatique." },
];

const TESTIMONIALS = [
  { quote: "Ils ont équipé nos 25 postes en 2 semaines, configuration réseau incluse. Tout fonctionnait parfaitement dès le premier jour. Service irréprochable.", author: "Ravo M.", role: "Directeur Général", company: "Cabinet expertise comptable, Antananarivo" },
  { quote: "Notre infrastructure réseau datait de 2015. Ils l'ont modernisée sans interruption pendant que nos équipes travaillaient. Zéro downtime pendant les 3 jours de travaux.", author: "Jean-Luc T.", role: "Responsable IT", company: "ONG internationale, Madagascar" },
  { quote: "Le contrat de maintenance est ce qu'on a de mieux fait. Un technicien sur site en moins de 4h pour chaque incident. On n'a plus de journées perdues à cause d'une panne.", author: "Nirina A.", role: "Responsable des opérations", company: "Entreprise logistique, Antananarivo" },
];

const FAQ = [
  { q: "Proposez-vous des marques spécifiques ou êtes-vous multi-marques ?", a: "On est multi-marques et on vous conseille la marque adaptée à votre usage et votre budget. On travaille principalement avec Lenovo, HP, Dell, Asus Pro pour les postes de travail, et Cisco, TP-Link Pro, Ubiquiti pour le réseau." },
  { q: "Intervenez-vous en dehors d'Antananarivo ?", a: "Oui, on intervient dans toute la région d'Antananarivo et dans les principales villes de Madagascar. Pour les zones éloignées, un déplacement est facturé selon la distance." },
  { q: "Quelle garantie sur le matériel vendu ?", a: "Tous nos équipements sont vendus avec la garantie constructeur (minimum 1 an, souvent 3 ans pour le professionnel). On propose en complément nos propres contrats de maintenance sur site." },
  { q: "Proposez-vous de la location de matériel ?", a: "Nous proposons la location longue durée (LLD) sur certaines gammes de postes de travail et d'imprimantes. C'est une option intéressante pour préserver votre trésorerie et renouveler régulièrement votre parc." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Vente Matériel Informatique",
  url: "https://labeltechnology.mg/services/materiel",
  description:
    "Vente et installation de matériel informatique professionnel à Antananarivo : PC, réseau, périphériques, serveurs, onduleurs. Maintenance et support inclus.",
  provider: {
    "@type": "Organization",
    name: "Label Technology",
    url: "https://labeltechnology.mg",
  },
  areaServed: [
    { "@type": "Country", name: "Madagascar" },
  ],
  serviceType: "Vente de matériel informatique",
  brand: [
    { "@type": "Brand", name: "Lenovo" },
    { "@type": "Brand", name: "HP" },
    { "@type": "Brand", name: "Dell" },
    { "@type": "Brand", name: "Cisco" },
  ],
};

export default function MaterielPage() {
  return (
    <ServiceScope slug="materiel" as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <EditorialHero
        slug="materiel"
        eyebrow="Vente de matériel informatique"
        title={
          <>
            Le bon matériel.
            <br />
            <span className="gradient-text-svc-light">Au juste prix.</span>
          </>
        }
        description="Ordinateurs, réseau, périphériques, infrastructure serveur. Sélection professionnelle, conseil personnalisé, installation et support inclus sur Antananarivo."
        image={{ src: "/images/services/materiel/hero.jpg", alt: "Carte électronique et composants informatiques" }}
        primary={{ href: "/contact", label: "Demander un devis" }}
        stats={METRICS.map((m) => ({ value: m.v, label: m.l }))}
      />

      {/* Prestations — en-tête asymétrique + colonnes filetées */}
      <ServiceSection slug="materiel">
        <SectionIntro
          eyebrow="Nos gammes"
          title={
            <>
              Équipement
              <br />
              <span className="gradient-text-svc">& support IT.</span>
            </>
          }
          description="Du poste de travail au serveur, avec l'installation, la configuration réseau et la maintenance derrière. Multi-marques : on conseille ce qui est utile, pas ce qui coûte le plus cher."
        />
        <FeatureGrid
          items={CATEGORIES.map((s, i) => ({
            icon: <span className="text-2xl leading-none">{s.icon}</span>,
            title: s.title,
            desc: s.desc,
            image: {
              src: `/images/services/materiel/feature-${i + 1}.jpg`,
              alt: s.title,
            },
          }))}
        />
      </ServiceSection>

      {/* Rangée éditoriale : texte ↔ photo */}
      <ServiceSection slug="materiel" tone="plain">
        <EditorialRow
          eyebrow="Infrastructure & réseau"
          title={
            <>
              Un parc bien installé
              <br />
              se fait oublier.
            </>
          }
          points={[
            "Câblage structuré et configuration réseau documentés",
            "Onduleurs et sauvegardes dimensionnés au besoin réel",
            "Contrat de maintenance avec intervention sous 4h",
          ]}
          image={{
            src: "/images/services/materiel/row.jpg",
            alt: "Baie de serveurs et câblage réseau",
          }}
          stat={{ value: "404", label: "équipements déployés depuis 2022" }}
          cta={{ href: "/contact", label: "Faire auditer mon parc" }}
          ratio="5/4"
        >
          On ne livre pas des cartons. On audite l'existant, on dimensionne, on installe, on configure — et on documente pour que votre équipe puisse reprendre la main à tout moment.
        </EditorialRow>
      </ServiceSection>


      {/* Deuxième rangée éditoriale — photo à gauche */}
      <ServiceSection slug="materiel">
        <EditorialRow
          reverse
          eyebrow="Maintenance"
          title={
            <>
              Un contrat de maintenance
              <br />
              coûte moins qu'une panne.
            </>
          }
          points={[
            "Intervention sur site garantie sous 4 heures",
            "Visites préventives planifiées à l'avance",
            "Remplacement rapide en cas de matériel hors service",
          ]}
          image={{ src: "/images/services/materiel/row2.jpg", alt: "Baie de serveurs et équipements réseau" }}
          stat={{ value: "91 %", label: "pannes résolues en moins de 4h" }}
          ratio="4/3"
        >
          Une journée d'arrêt coûte plus cher qu'une année de maintenance préventive. On documente chaque installation pour intervenir vite et bien.
        </EditorialRow>
      </ServiceSection>

      {/* Bandeau photographique — temps fort éditorial */}
      <PhotoBand
        image={{ src: "/images/services/materiel/band.jpg", alt: "Technicienne au travail sur du matériel" }}
        eyebrow="Notre approche"
        title={<>On conseille ce qui est utile,<br />pas ce qui coûte le plus cher.</>}
        stats={[
          { value: "25+", label: "marques partenaires" },
          { value: "4h", label: "délai de devis" },
          { value: "3 ans", label: "garantie constructeur" },
        ]}
      >
        Multi-marques par choix : Lenovo, HP, Dell, Cisco, Ubiquiti. On dimensionne selon votre usage réel, avec les alternatives comparées dans le devis.
      </PhotoBand>

      {/* Chiffres en très grande typo */}
      <BigStats
        slug="materiel"
        items={[
          { value: "404", label: "Équipements déployés et maintenus" },
          { value: "98 %", label: "Équipements opérationnels sous contrat" },
          { value: "91 %", label: "Pannes résolues en moins de 4 heures" },
          { value: "76 %", label: "Clients avec un contrat de maintenance" },
        ]}
        caption="Plus de 400 équipements déployés depuis 2022 pour des PME, ONG, établissements scolaires et administrations. Chaque installation est documentée et couverte par un contrat de suivi."
      />

      {/* Analyse — photo à gauche cette fois */}
      <ServiceSection slug="materiel" tone="dark">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <MaterielChart />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label-tag mb-4" style={{ color: "var(--svc)" }}>
              Notre parc client
            </p>
            <h2 className="font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-white">
              Infrastructure déployée
              <br />
              et maintenue.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
              Unités installées et maintenues depuis 2022, tous clients confondus. La maintenance représente aujourd'hui la majorité de notre activité.
            </p>
          </Reveal>
        </div>
      </ServiceSection>



      {/* Mosaïque asymétrique */}
      <ServiceSection slug="materiel" tone="plain">
        <PhotoMosaic
          eyebrow="Du poste au serveur"
          title={
            <>
              Tout le parc,
              <br />
              un seul interlocuteur.
            </>
          }
          images={[
            { src: "/images/services/materiel/mosaic-a.jpg", alt: "Couloir d'un espace de bureaux équipé" },
            { src: "/images/services/materiel/mosaic-b.jpg", alt: "Open space avec postes de travail" },
          ]}
        >
          Postes de travail, écrans, réseau, impression, onduleurs, sauvegarde. On livre, on installe, on configure — et on reste joignable après.
        </PhotoMosaic>
      </ServiceSection>

      {/* Méthode */}
      <ServiceSection slug="materiel" tone="plain">
        <SectionIntro
          eyebrow="Comment ça marche"
          title="Du devis à l'installation."
          description="Un interlocuteur unique, de l'audit du besoin jusqu'au support après installation."
        />
        <ServiceSteps steps={PROCESS.map((p) => ({ num: p.num, title: p.title, desc: p.desc }))} />
      </ServiceSection>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      <ServiceCta
        slug="materiel"
        title={
          <>
            Un parc à équiper <span className="gradient-text-svc-light">ou à moderniser ?</span>
          </>
        }
        description="Envoyez-nous votre besoin : devis détaillé sous 4h, avec les alternatives comparées et les garanties constructeur."
      />
    </ServiceScope>
  );
}
