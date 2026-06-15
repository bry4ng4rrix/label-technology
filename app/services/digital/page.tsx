import type { Metadata } from "next";
import Image from "next/image";

import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Link from "next/link";

import DigitalChart from "@/components/services/DigitalChartWrapper";

export const metadata: Metadata = {
  title: "Digitalisation & ERP — Odoo, SIRH, Logiciels métier | Label Technology",
  description: "ERP, SIRH, GED, logiciels métier sur mesure. Déploiement Odoo, automatisation des processus, intégration de systèmes. Depuis Antananarivo.",
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

export default function DigitalPage() {
  return (
    <main>

      {/* Hero split */}
      <section className="relative overflow-hidden grid-bg" style={{ backgroundColor: "var(--ink)", minHeight: "70vh" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center" style={{ minHeight: "70vh" }}>
          <div className="py-28 lg:pr-12">
            <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>DIGITALISATION & LOGICIELS DE GESTION</p>
            <h1 className="font-display text-white mb-6 leading-tight" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
              Vos processus méritent<br />
              <span style={{ color: "var(--brand-lt)" }}>mieux.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl" style={{ lineHeight: 1.8 }}>
              ERP, SIRH, GED, logiciels métier sur mesure. On transforme vos processus
              manuels en flux automatisés — sans casser ce qui fonctionne déjà.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--brand)", color: "#fff" }}>
                Analyser mes processus →
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center py-8">
            <Image
              src="/images/digitalisation.png"
              alt="Digitalisation et ERP — Label Technology"
              width={1330}
              height={1408}
              className="w-full h-auto rounded-sm"
              style={{ opacity: 0.9 }}
            />
          </div>
        </div>
      </section>

      {/* Métriques */}
      <section style={{ backgroundColor: "var(--brand)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
          {METRICS.map((m, i) => (
            <div key={i} className="text-center py-6 px-4">
              <div className="font-display text-2xl text-white mb-1">{m.v}</div>
              <div className="label-tag text-white/55 text-[10px]">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOS SOLUTIONS</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Automatiser pour mieux travailler.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-7 border border-border rounded-sm card-hover bg-card">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="font-display text-xl mb-3 text-foreground">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart avant/après */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>AVANT / APRÈS</p>
            <h2 className="font-display text-3xl md:text-4xl mb-6 leading-tight text-foreground">
              Ce que la digitalisation<br />change concrètement.
            </h2>
            <p className="text-base leading-relaxed mb-6 text-muted-foreground" style={{ lineHeight: 1.8 }}>
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
                <div key={i} className="flex items-center justify-between p-4 rounded-sm border"
                  style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "var(--white)" }}>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="font-display text-lg font-bold" style={{ color: "var(--brand)" }}>{s.val}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5" style={{ borderLeft: "3px solid var(--brand)", backgroundColor: "rgba(30,63,171,0.05)" }}>
              <p className="text-base italic leading-relaxed text-foreground">
                "Nous n'ajoutons pas un outil à votre quotidien, nous bâtissons les fondations de votre expansion."
              </p>
            </div>
          </div>
          <DigitalChart />
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE MÉTHODE</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Une transition sans turbulences.
          </h2>
          <div className="grid md:grid-cols-4 gap-px bg-border/30">
            {PROCESS.map((p, i) => (
              <div key={i} className="p-8 bg-card">
                <div className="font-display text-5xl mb-6 opacity-15" style={{ color: "var(--brand)", lineHeight: 1 }}>{p.num}</div>
                <div className="w-8 h-0.5 mb-5" style={{ backgroundColor: "var(--brand)" }} />
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
