import type { Metadata } from "next";

import { ArrowRight } from "lucide-react";
import CtaSection from "@/components/home/CtaSection";
import MetricsBand from "@/components/shared/MetricsBand";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Link from "next/link";

import DigitalChart from "@/components/services/DigitalChartWrapper";

export const metadata: Metadata = {
  title: "Digitalisation & ERP — Odoo, SIRH, Logiciels métier",
  description: "ERP, SIRH, GED, logiciels métier sur mesure. Déploiement Odoo, automatisation des processus, intégration de systèmes. Depuis Antananarivo.",
  keywords: [
    "ERP Madagascar",
    "Odoo Madagascar",
    "SIRH Madagascar",
    "digitalisation PME Madagascar",
    "logiciel gestion Madagascar",
    "déploiement ERP Antananarivo",
    "logiciel métier sur mesure Madagascar",
    "GED Madagascar",
    "gestion documentaire Madagascar",
    "automatisation processus Madagascar",
    "intégration CRM ERP Madagascar",
    "transformation digitale Madagascar",
    "logiciel RH Madagascar",
    "Odoo intégrateur Madagascar",
    "digitalisation entreprise Antananarivo",
    "SAP Madagascar",
    "conduite du changement Madagascar",
    "PME digitalisation Madagascar",
    "gestion entreprise logiciel Madagascar",
    "externalisation IT Madagascar",
  ],
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Digitalisation & ERP — Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitalisation & ERP — Odoo, SIRH | Label Technology",
    description:
      "ERP, SIRH, GED, logiciels métier sur mesure. Déploiement Odoo, automatisation. Depuis Antananarivo.",
    images: ["/og-image.png"],
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        size="lg"
        eyebrow="DIGITALISATION & LOGICIELS DE GESTION"
        title={
          <>
            Vos processus méritent
            <br />
            <span className="gradient-text-light">mieux.</span>
          </>
        }
        description="ERP, SIRH, GED, logiciels métier sur mesure. On transforme vos processus manuels en flux automatisés — sans casser ce qui fonctionne déjà."
        image={{ src: "/images/digitalisation.png", alt: "Digitalisation et ERP — Label Technology", priority: true }}
        actions={
          <>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Analyser mes processus
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass" className="rounded-full">
              <Link href="/projets">Voir nos réalisations</Link>
            </Button>
          </>
        }
      />

      <MetricsBand items={METRICS.map((m) => ({ value: m.v, label: m.l }))} />

      {/* Services */}
      <section className="surface-light section relative">
        <div className="container-x">
          <SectionHeader eyebrow="NOS SOLUTIONS" title="Automatiser pour mieux travailler." />
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

      {/* Chart avant/après */}
      <section className="surface-light section-sm relative">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="animate-fadeup label-tag mb-4 inline-flex items-center gap-2.5 text-brand"><span className="h-px w-6 bg-brand/60" />AVANT / APRÈS</p>
            <h2 className="animate-fadeup-d1 h2-display mb-6 text-foreground">
              Ce que la digitalisation<br />change concrètement.
            </h2>
            <p className="prose-body animate-fadeup-d2 mb-8 text-muted-foreground">
              Ces données sont issues de mesures réalisées auprès de nos clients PME
              après 3 mois d'utilisation. La digitalisation ne réduit pas seulement
              le temps de travail — elle réduit aussi les erreurs et améliore la traçabilité.
            </p>
            <div className="space-y-3">
              {[
                { label: "Réduction des erreurs de saisie", val: "−94%" },
                { label: "Délai de clôture comptable", val: "−70%" },
                { label: "Satisfaction des équipes RH", val: "+85%" },
              ].map((s, i) => (
                <div key={i} className="card-premium animate-fadeup flex items-center justify-between p-4 hover:translate-y-0"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="font-display text-lg font-bold text-brand">{s.val}</span>
                </div>
              ))}
            </div>
            <div className="animate-fadeup-d3 mt-6 rounded-r-2xl border-l-2 border-brand bg-brand/5 p-5">
              <p className="font-display text-base leading-relaxed font-medium text-foreground italic">
                "Nous n'ajoutons pas un outil à votre quotidien, nous bâtissons les fondations de votre expansion."
              </p>
            </div>
          </div>
          <DigitalChart />
        </div>
      </section>

      {/* Process */}
      <section className="section bg-background">
        <div className="container-x">
          <SectionHeader eyebrow="NOTRE MÉTHODE" title="Une transition sans turbulences." />
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

      <MiniTestimonials items={TESTIMONIALS} />
      <FaqSection items={FAQ} />
      <CtaSection />
    </main>
  );
}
