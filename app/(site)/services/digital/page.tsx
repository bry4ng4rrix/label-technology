import type { Metadata } from "next";

import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Reveal from "@/components/shared/Reveal";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceCta from "@/components/services/ServiceCta";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceStatBars from "@/components/services/ServiceStatBars";
import ServiceSteps from "@/components/services/ServiceSteps";
import DigitalChart from "@/components/services/DigitalChartWrapper";
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

      <ServiceHero
        slug="digital"
        eyebrow="Digitalisation & logiciels de gestion"
        title={
          <>
            Vos processus méritent
            <br />
            <span className="gradient-text-svc-light">mieux.</span>
          </>
        }
        description="ERP, SIRH, GED, logiciels métier sur mesure. On transforme vos processus manuels en flux automatisés — sans casser ce qui fonctionne déjà."
        primary={{ href: "/contact", label: "Analyser mes processus" }}
        stats={METRICS.map((m) => ({ value: m.v, label: m.l }))}
      />

      {/* Prestations */}
      <ServiceSection
        slug="digital"
        eyebrow="Nos solutions"
        title={
          <>
            Automatiser <span className="gradient-text-svc">pour mieux travailler.</span>
          </>
        }
        description="Des outils qui épousent votre façon de travailler, pas l'inverse — avec la formation et la conduite du changement incluses."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
              <ServiceCard icon={<span className="text-2xl leading-none">{s.icon}</span>} title={s.title}>
                {s.desc}
              </ServiceCard>
            </Reveal>
          ))}
        </div>
      </ServiceSection>

      {/* En chiffres */}
      <ServiceSection
        slug="digital"
        tone="dark"
        eyebrow="Avant / après"
        title={
          <>
            Ce que la digitalisation
            <br />
            change concrètement.
          </>
        }
        description="Mesures relevées auprès de nos clients PME après trois mois d'utilisation. La digitalisation ne réduit pas seulement le temps de travail — elle réduit les erreurs et améliore la traçabilité."
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ServiceStatBars
            items={[
              { label: "Réduction des erreurs de saisie", value: "94%" },
              { label: "Gain sur le délai de clôture", value: "70%" },
              { label: "Satisfaction des équipes RH", value: "85%" },
            ]}
          />
          <Reveal delay={0.15}>
            <DigitalChart />
          </Reveal>
        </div>
      </ServiceSection>

      {/* Méthode */}
      <ServiceSection
        slug="digital"
        tone="plain"
        eyebrow="Notre méthode"
        title="Une transition sans turbulences."
        description="On avance par paliers, en gardant vos équipes opérationnelles à chaque étape."
      >
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
