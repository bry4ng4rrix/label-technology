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

import MaterielChart from "@/components/services/MaterielChartWrapper";
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        size="lg"
        eyebrow="VENTE DE MATÉRIEL INFORMATIQUE"
        title={
          <>
            Le bon matériel.
            <br />
            <span className="gradient-text-light">Au juste prix.</span>
          </>
        }
        description="Ordinateurs, réseau, périphériques, infrastructure serveur. Sélection professionnelle, conseil personnalisé, installation et support inclus sur Antananarivo."
        image={{ src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=700&fit=crop&q=80", alt: "Matériel informatique professionnel", priority: true }}
        actions={
          <>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Demander un devis
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

      {/* Catégories */}
      <section className="surface-light section relative">
        <div className="container-x">
          <SectionHeader eyebrow="NOS GAMMES" title="Équipement & Support IT." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <div key={i} className="card-premium animate-fadeup flex h-full flex-col p-7" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-brand/8 text-2xl leading-none">{c.icon}</span>
                <h3 className="h3-display mb-3 text-foreground">{c.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + Chart */}
      <section className="surface-dark noise hairline-top section-sm relative overflow-hidden">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="animate-fadeup label-tag mb-4 inline-flex items-center gap-2.5 text-brand-glow"><span className="h-px w-6 bg-brand-glow/70" />NOTRE PARC CLIENT</p>
            <h2 className="animate-fadeup-d1 h2-display text-white mb-6">
              Infrastructure IT<br />déployée et maintenue.
            </h2>
            <p className="prose-body animate-fadeup-d2 mb-8 text-white/60">
              Plus de 400 équipements déployés depuis 2022, pour des PME,
              ONG, établissements scolaires et administrations à Madagascar.
              Chaque installation est documentée et couverte par un contrat de suivi.
            </p>
            <div className="space-y-5">
              {[
                { l: "Équipements opérationnels sous contrat", v: "98%" },
                { l: "Pannes résolues en moins de 4h", v: "91%" },
                { l: "Clients avec contrat de maintenance actif", v: "76%" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="mb-1.5 flex justify-between">
                    <span className="text-sm text-white/55">{s.l}</span>
                    <span className="font-display text-sm text-brand-glow">{s.v}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div className="svc-bar h-full rounded-full" style={{ width: s.v, backgroundColor: "var(--brand-lt)", animationDelay: `${0.3 + i * 0.18}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <MaterielChart />
        </div>
      </section>

      {/* Process */}
      <section className="section bg-background">
        <div className="container-x">
          <SectionHeader eyebrow="COMMENT CA MARCHE" title="Du devis à l'installation." />
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
