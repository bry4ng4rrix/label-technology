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
import DigitalChart from "@/components/services/DigitalChartWrapper";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Digitalisation & ERP — Odoo, SIRH, Logiciels métier",
  description: "ERP, SIRH, GED, logiciels métier sur mesure. Déploiement Odoo, automatisation des processus, intégration de systèmes. Depuis Antananarivo.",
  alternates: {
    canonical: "https://labeltechnology.mg/services/digital",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/services/digital",
    siteName: "Label Technology",
    title: "Digitalisation & ERP — Odoo, SIRH, Logiciels métier | Label Technology",
    description:
      "ERP, SIRH, GED, logiciels métier sur mesure. Déploiement Odoo, automatisation des processus. Depuis Antananarivo.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitalisation & ERP — Odoo, SIRH | Label Technology",
    description:
      "ERP, SIRH, GED, logiciels métier sur mesure. Déploiement Odoo, automatisation. Depuis Antananarivo.",
  },
};

const METRICS = [
  { v: "−75%", l: "temps opérationnel" },
  { v: "4–8 sem.", l: "déploiement Odoo" },
  { v: "0", l: "interruption de service" },
  { v: "3 mois", l: "support post-déploiement" },
];

const SERVICES = [
  { icon: "🗂", title: "ERP & Gestion intégrée", desc: "Odoo, SAP, solutions sur mesure. Unifiez comptabilité, stocks, RH et ventes dans un seul outil adapté à votre réalité métier. Fini les fichiers Excel en parallèle et les données en double." },
  { icon: "📋", title: "Gestion documentaire", desc: "GED complète, workflows de validation configurables, signature électronique juridiquement valide. Plus de papier, plus de doublons, plus de temps perdu à chercher un fichier au fond d'un serveur." },
  { icon: "👥", title: "SIRH & Paie", desc: "Logiciels RH adaptés au droit malgache et français. Gestion des congés, bulletins de paie conformes, contrats dématérialisés, suivi des formations — pour vos équipes locales et expatriées." },
  { icon: "🏪", title: "Logiciels métier", desc: "Applications sur mesure pour votre secteur : retail, santé, éducation, services publics, immobilier. Quand aucun logiciel standard ne couvre exactement votre cas, on le code pour vous." },
  { icon: "🔗", title: "Intégrations & APIs", desc: "Connectez vos outils existants entre eux. CRM, ERP, e-commerce, comptabilité — on crée les ponts entre vos systèmes pour éliminer les resaisies et les erreurs de synchronisation." },
  { icon: "🎓", title: "Formation & accompagnement", desc: "L'outil ne suffit pas. On accompagne vos équipes avec des formations sur mesure, des guides utilisateur clairs et un suivi post-déploiement de 3 mois minimum pour garantir l'adoption." },
];

const PROCESS = [
  { num: "01", title: "Cartographie des processus", desc: "Audit de vos flux existants, identification des goulots d'étranglement et des tâches manuelles répétitives. On comprend votre métier en profondeur avant de proposer quoi que ce soit." },
  { num: "02", title: "Choix & paramétrage", desc: "Sélection de la solution adaptée (standard ou sur mesure), paramétrage selon votre organisation et vos règles métier, intégration avec vos systèmes et données existants." },
  { num: "03", title: "Déploiement progressif", desc: "Migration module par module, tests avec vos données réelles, ajustements itératifs. Pas de bascule brutale — une transition maîtrisée qui préserve votre activité quotidienne." },
  { num: "04", title: "Formation & support", desc: "Formation de vos équipes sur site ou en visio, documentation utilisateur rédigée pour des non-techniciens, support réactif pendant 3 mois minimum après la mise en production." },
];

const TESTIMONIALS = [
  { quote: "On gérait notre PME avec 7 fichiers Excel différents. Après le déploiement Odoo avec Label Technology, tout est centralisé. On a gagné 15h de travail par semaine dès le premier mois.", author: "Pierre F.", role: "Gérant", company: "Distribution B2B, Madagascar" },
  { quote: "La migration de notre système de paie a été parfaitement gérée. Zéro erreur sur les 45 bulletins du premier mois, et nos RH sont autonomes en deux semaines.", author: "Hanta R.", role: "DRH", company: "Réseau d'écoles, Antananarivo" },
  { quote: "Ils ont connecté notre CRM Salesforce à notre ERP en 3 semaines. Les synchronisations qui nous prenaient 2h par jour sont maintenant entièrement automatiques.", author: "Laurent V.", role: "Operations Manager", company: "Filiale française, Madagascar" },
];

const FAQ = [
  { q: "Odoo ou solution sur mesure — comment choisir ?", a: "Odoo couvre 80% des besoins d'une PME standard, se déploie rapidement et coûte moins cher. Une solution sur mesure est justifiée quand vos processus sont réellement spécifiques. On vous aide à trancher honnêtement lors du cadrage — sans conflit d'intérêt commercial." },
  { q: "Combien de temps prend un déploiement ERP ?", a: "Un déploiement Odoo basique (comptabilité + stocks) : 4 à 8 semaines. Un ERP complet avec formation : 3 à 6 mois. On déploie module par module pour limiter les risques et permettre à vos équipes de s'adapter progressivement." },
  { q: "Peut-on conserver nos données existantes ?", a: "Oui, la migration des données est incluse dans tous nos projets. On nettoie, normalise et importe vos données existantes proprement. On ne démarre jamais de zéro sauf si vous le souhaitez explicitement." },
  { q: "Intervenez-vous en France pour des déploiements sur site ?", a: "La grande majorité de nos déploiements France se font à distance avec d'excellents résultats. Pour des formations sur site ou des projets complexes, une intervention physique est possible — à discuter lors du cadrage." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digitalisation & ERP",
  url: "https://labeltechnology.mg/services/digital",
  description:
    "Déploiement ERP (Odoo, SAP), SIRH, GED et logiciels métier sur mesure. Automatisation des processus, intégration de systèmes, formation et accompagnement.",
  provider: {
    "@type": "Organization",
    name: "Label Technology",
    url: "https://labeltechnology.mg",
  },
  areaServed: [
    { "@type": "Country", name: "Madagascar" },
    { "@type": "Country", name: "France" },
  ],
  serviceType: "ERP / Digitalisation",
};

export default function DigitalPage() {
  return (
    <ServiceScope slug="digital" as="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <EditorialHero
        slug="digital"
        eyebrow="Digitalisation & logiciels de gestion"
        title={
          <>
            Vos processus<br />méritent
            <br />
            <span className="gradient-text-svc-light">mieux.</span>
          </>
        }
        description="ERP, SIRH, GED, logiciels métier sur mesure. On transforme vos processus manuels en flux automatisés — sans casser ce qui fonctionne déjà."
        image={{ src: "/images/services/digital/hero.jpg", alt: "Équipe en réunion autour d'un outil de gestion" }}
        primary={{ href: "/contact", label: "Analyser mes processus" }}
        stats={METRICS.map((m) => ({ value: m.v, label: m.l }))}
      />

      {/* Prestations — en-tête asymétrique + colonnes filetées */}
      <ServiceSection slug="digital">
        <SectionIntro
          eyebrow="Nos solutions"
          title={
            <>
              Automatiser
              <br />
              <span className="gradient-text-svc">pour mieux travailler.</span>
            </>
          }
          description="Des outils qui épousent votre façon de travailler, pas l'inverse. Paramétrage, reprise de données, formation et conduite du changement sont inclus."
        />
        <FeatureGrid
          items={SERVICES.map((s, i) => ({
            icon: <span className="text-2xl leading-none">{s.icon}</span>,
            title: s.title,
            desc: s.desc,
            image: {
              src: `/images/services/digital/feature-${i + 1}.jpg`,
              alt: s.title,
            },
          }))}
        />
      </ServiceSection>

      {/* Rangée éditoriale : texte ↔ photo */}
      <ServiceSection slug="digital" tone="plain">
        <EditorialRow
          eyebrow="Conduite du changement"
          title={
            <>
              Un outil que personne n'utilise
              <br />
              ne sert à rien.
            </>
          }
          points={[
            "Reprise des données existantes, sans ressaisie",
            "Formation des équipes sur leurs cas réels",
            "Support post-déploiement pendant trois mois",
          ]}
          image={{
            src: "/images/services/digital/row.jpg",
            alt: "Collaboration autour d'ordinateurs portables",
          }}
          stat={{ value: "0", label: "interruption de service au déploiement" }}
          cta={{ href: "/contact", label: "Faire auditer mes processus" }}
          ratio="5/4"
        >
          La technique n'est que la moitié du travail. On déploie par paliers, en gardant vos équipes opérationnelles, et on reste disponible après la mise en production — c'est là que se joue l'adoption.
        </EditorialRow>
      </ServiceSection>


      {/* Deuxième rangée éditoriale — photo à gauche */}
      <ServiceSection slug="digital">
        <EditorialRow
          reverse
          eyebrow="Intégration"
          title={
            <>
              Votre ERP doit parler
              <br />
              à vos autres outils.
            </>
          }
          points={[
            "Connecteurs vers votre comptabilité et votre banque",
            "Synchronisation des données sans double saisie",
            "APIs documentées pour vos évolutions futures",
          ]}
          image={{ src: "/images/services/digital/row2.jpg", alt: "Équipe travaillant sur un outil de gestion" }}
          stat={{ value: "−94 %", label: "erreurs de saisie après intégration" }}
          ratio="4/3"
        >
          Un ERP isolé recrée les silos qu'il devait supprimer. On branche vos outils entre eux pour qu'une information saisie une fois circule partout.
        </EditorialRow>
      </ServiceSection>

      {/* Bandeau photographique — temps fort éditorial */}
      <PhotoBand
        image={{ src: "/images/services/digital/band.jpg", alt: "Open space d'une équipe en activité" }}
        eyebrow="Conduite du changement"
        title={<>La technique, c'est<br />la moitié du travail.</>}
        stats={[
          { value: "4–8 sem.", label: "déploiement Odoo" },
          { value: "0", label: "interruption de service" },
          { value: "3 mois", label: "support inclus" },
        ]}
      >
        Formation sur vos cas réels, accompagnement au démarrage et support pendant trois mois. L'adoption se joue là, pas dans le paramétrage.
      </PhotoBand>

      {/* Chiffres en très grande typo */}
      <BigStats
        slug="digital"
        items={[
          { value: "−94 %", label: "Réduction des erreurs de saisie" },
          { value: "−70 %", label: "Gain sur le délai de clôture" },
          { value: "+85 %", label: "Satisfaction des équipes RH" },
          { value: "4–8 sem.", label: "Déploiement Odoo moyen" },
        ]}
        caption="Mesures relevées auprès de nos clients PME après trois mois d'utilisation. La digitalisation ne réduit pas seulement le temps de travail — elle réduit les erreurs et améliore la traçabilité."
      />

      {/* Analyse — photo à gauche cette fois */}
      <ServiceSection slug="digital" tone="dark">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <DigitalChart />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label-tag mb-4" style={{ color: "var(--svc)" }}>
              Avant / après
            </p>
            <h2 className="font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-white">
              Ce que ça change
              <br />
              concrètement.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
              Heures passées chaque semaine sur les tâches administratives, avant et après digitalisation. Le temps récupéré retourne au métier.
            </p>
          </Reveal>
        </div>
      </ServiceSection>



      {/* Mosaïque asymétrique */}
      <ServiceSection slug="digital" tone="plain">
        <PhotoMosaic
          eyebrow="ERP, SIRH, GED"
          title={
            <>
              Un outil par besoin,
              <br />
              pas un besoin par outil.
            </>
          }
          images={[
            { src: "/images/services/digital/mosaic-a.jpg", alt: "Utilisatrice sur un logiciel de gestion" },
            { src: "/images/services/digital/mosaic-b.jpg", alt: "Postes de travail connectés" },
          ]}
        >
          Odoo, SAP ou développement sur mesure : on choisit après avoir compris vos processus, jamais avant. Le bon outil est celui que vos équipes utilisent vraiment.
        </PhotoMosaic>
      </ServiceSection>

      {/* Méthode */}
      <ServiceSection slug="digital" tone="plain">
        <SectionIntro
          eyebrow="Notre méthode"
          title="Une transition sans turbulences."
          description="On avance par paliers, en gardant vos équipes opérationnelles à chaque étape."
        />
        <ServiceSteps steps={PROCESS.map((p) => ({ num: p.num, title: p.title, desc: p.desc }))} />
      </ServiceSection>

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />

      <ServiceCta
        slug="digital"
        title={
          <>
            Vos processus papier <span className="gradient-text-svc-light">coûtent de l'argent.</span>
          </>
        }
        description="Décrivez-nous un processus qui vous pèse. On vous dit sous 72h ce qu'on peut automatiser, et ce que ça vous fait gagner."
      />
    </ServiceScope>
  );
}
