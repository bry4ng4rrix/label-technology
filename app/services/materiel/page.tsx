import type { Metadata } from "next";
import Image from "next/image";

import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/shared/FaqSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";
import Link from "next/link";

import MaterielChart from "@/components/services/MaterielChartWrapper";

export const metadata: Metadata = {
  title: "Vente Matériel Informatique — PC, Réseau, Infrastructure | Label Technology",
  description: "Ordinateurs, réseau, périphériques, serveurs. Marques professionnelles, installation sur site, maintenance. Devis en 4h depuis Antananarivo.",
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

export default function MaterielPage() {
  return (
    <main>

      {/* Hero split */}
      <section className="relative overflow-hidden grid-bg" style={{ backgroundColor: "var(--ink)", minHeight: "70vh" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center" style={{ minHeight: "70vh" }}>
          <div className="py-28 lg:pr-12">
            <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>VENTE DE MATÉRIEL INFORMATIQUE</p>
            <h1 className="font-display text-white mb-6 leading-tight" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
              Le bon matériel.<br />
              <span style={{ color: "var(--brand-lt)" }}>Au juste prix.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl" style={{ lineHeight: 1.8 }}>
              Ordinateurs, réseau, périphériques, infrastructure serveur.
              Sélection professionnelle, conseil personnalisé, installation
              et support inclus sur Antananarivo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--brand)", color: "#fff" }}>
                Demander un devis →
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative" style={{ minHeight: "70vh" }}>
            <Image
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=700&fit=crop&q=80"
              alt="Matériel informatique professionnel"
              fill
              className="object-cover"
              style={{ opacity: 0.45 }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--ink) 0%, transparent 55%)" }} />
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

      {/* Catégories */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOS GAMMES</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Équipement & Support IT.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {CATEGORIES.map((c, i) => (
              <div key={i} className="p-7 border border-border rounded-sm card-hover bg-card">
                <span className="text-3xl mb-4 block">{c.icon}</span>
                <h3 className="font-display text-xl mb-3 text-foreground">{c.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + Chart */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-tag mb-3" style={{ color: "var(--brand-lt)" }}>NOTRE PARC CLIENT</p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight">
              Infrastructure IT<br />déployée et maintenue.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8" style={{ lineHeight: 1.8 }}>
              Plus de 400 équipements déployés depuis 2022, pour des PME,
              ONG, établissements scolaires et administrations à Madagascar.
              Chaque installation est documentée et couverte par un contrat de suivi.
            </p>
            <div className="space-y-4">
              {[
                { l: "Équipements opérationnels sous contrat", v: "98%" },
                { l: "Pannes résolues en moins de 4h", v: "91%" },
                { l: "Clients avec contrat de maintenance actif", v: "76%" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/50 text-sm">{s.l}</span>
                    <span className="font-display text-sm" style={{ color: "var(--brand-lt)" }}>{s.v}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width: s.v, backgroundColor: "var(--brand-lt)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <MaterielChart />
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>COMMENT CA MARCHE</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Du devis à l'installation.
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
