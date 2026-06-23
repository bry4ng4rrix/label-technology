import type { Metadata } from "next";
import Image from "next/image";

import CtaSection from "@/components/home/CtaSection";
import MiniTestimonials from "@/components/shared/MiniTestimonials";

import GrowthChart from "@/components/apropos/GrowthChartWrapper";

export const metadata: Metadata = {
  title: "À Propos — Label Technology, fondée en 2022 à Antananarivo",
  description:
    "4 ans d'expérience, 60+ collaborateurs, 6 pôles de services. Label Technology : la tech malgache au niveau européen. Notre histoire, nos valeurs, notre équipe.",
};

const EQUIPE = [
  {
    photo: "/images/team/handry.png",
    nom: "Handry R.",
    role: "Fondateur & CEO",
    desc: "Vision stratégique, développement commercial international. 4 ans à construire Label Technology depuis Antananarivo.",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80",
    nom: "Fafah O. ",
    role: "Lead Développeur",
    desc: "Architecte des projets sur , Java , Node.js, Python, PostgreSQL. Certifié AWS Solutions Architect.",
  },
  {
    photo: "/images/team/dina.png",
    nom: "Dina R.",
    role: "Responsable Opérations",
    desc: "Supervision des 50 agents. Standards qualité, formation continue, SLA clients. Ancienne consultante CCaaS Paris.",
  },
  {
    photo: "/images/team/sarah.png",
    nom: "Sarah R .",
    role: "Head of Digital",
    desc: "SEO, Ads, social media. Ex-agence digitale à Bruxelles. Gère les stratégies digitales de nos clients FR/EU.",
  },
  {
    photo: "/images/team/bryan.png",
    nom: "Bryan F . ",
    role: "Developpeur Full Stack",
    desc: "Developpement web et mobile. Expert React, Next.js, Python , Flutter , VPS. Ancien développeur freelance pour des clients internationaux.",
  },
];

const TEMOIGNAGES_CLIENTS = [
  {
    quote:
      "En 18 mois de partenariat, Label Technology est devenu une extension naturelle de notre équipe. Réactivité, qualité, transparence — c'est rare de trouver les trois ensemble.",
    author: "François D.",
    role: "CEO",
    company: "Startup B2B, Paris",
  },
  {
    quote:
      "On a commencé par un projet de développement web, puis on leur a confié notre call center, puis notre SEO. Aujourd'hui ils gèrent 3 pôles pour nous. C'est la définition d'un partenaire.",
    author: "Marie-Claire V.",
    role: "COO",
    company: "Groupe retail, Lyon",
  },
  {
    quote:
      "La combinaison de talent local et standards européens qu'ils proposent est vraiment unique en Afrique de l'Est. On les recommande systématiquement à notre réseau.",
    author: "Dr. Andry R.",
    role: "Président",
    company: "Association Tech Madagascar",
  },
];

const VALEURS = [
  {
    num: "01",
    title: "Exigence",
    desc: "On ne livre pas ce qui est acceptable. On livre ce qui est excellent. Chaque projet sort avec la même attention, qu'il s'agisse d'une PME ou d'un grand compte.",
  },
  {
    num: "02",
    title: "Transparence",
    desc: "Pas de boîte noire. Vous voyez ce qui se passe, quand ça se passe. Reportings réguliers, communication directe, zéro surprise.",
  },
  {
    num: "03",
    title: "Réactivité",
    desc: "Madagascar = UTC+3. On travaille pendant vos heures de bureau. Délais tenus. Réponses rapides. Parce que votre temps a de la valeur.",
  },
  {
    num: "04",
    title: "Partenariat",
    desc: "On ne fait pas de la prestation. On construit des partenariats durables. Vos succès sont nos succès.",
  },
];

const CHIFFRES = [
  { value: "60+", label: "Collaborateurs" },
  { value: "4", label: "Ans d'expérience" },
  { value: "50", label: "Postes Call Center" },
  { value: "7", label: "Pôles de services" },
  { value: "FR/EN", label: "Bilingue certifié" },
  { value: "24h/24", label: "Disponibilité" },
];

export default function AProposPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex flex-col justify-center grid-bg px-6 pt-24 pb-16"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, var(--brand) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto w-full">
          <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>
            À PROPOS
          </p>
          <h1
            className="font-display text-white mb-6 leading-tight"
            style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
          >
            Antananarivo.
            <br />
            <span style={{ color: "var(--brand-lt)" }}>
              Standards européens.
            </span>
          </h1>
          <p
            className="text-white/70 text-lg leading-relaxed max-w-2xl"
            style={{ lineHeight: 1.8 }}
          >
            Fondée il y a 4 ans à Madagascar, Label Technology est aujourd'hui
            un partenaire technologique de référence pour les entreprises
            françaises, africaines et malgaches.
          </p>
        </div>
      </section>

      {/* Chiffres */}
      <section style={{ backgroundColor: "var(--brand)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/10">
          {CHIFFRES.map((c, i) => (
            <div key={i} className="text-center py-7 px-4">
              <div className="font-display text-3xl text-white mb-1">
                {c.value}
              </div>
              <div className="label-tag text-white/50 text-[10px]">
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notre histoire */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label-tag mb-4" style={{ color: "var(--brand)" }}>
                NOTRE HISTOIRE
              </p>
              <h2 className="font-display text-4xl md:text-5xl mb-4 leading-tight text-foreground">
                Né à Madagascar.
                <br />
                <span style={{ color: "var(--brand)" }}>
                  Pensé pour le monde.
                </span>
              </h2>
              <p
                className="font-display text-xl mb-6 leading-snug"
                style={{ color: "var(--brand)" }}
              >
                "Notre plus belle réussite n'est pas ce que nous vendons,
                <br />
                c'est ce que vous devenez."
              </p>
              <div
                className="space-y-4 text-[15px] leading-relaxed text-muted-foreground"
                style={{ lineHeight: 1.8 }}
              >
                <p>
                  Label Technology a été fondée avec une conviction simple :
                  Madagascar dispose d'un vivier de talents extraordinaire —
                  ingénieux, bilingues, réactifs — que les entreprises
                  européennes et africaines ignorent encore trop souvent.
                </p>
                <p>
                  En 4 ans, nous avons construit une équipe de 60 collaborateurs
                  couvrant 6 pôles de services complémentaires : développement
                  web et mobile, call center 50 postes, marketing digital,
                  digitalisation, traitement de données et vente de matériel
                  informatique.
                </p>
                <p>
                  Notre modèle : externalisation de qualité, à coût compétitif,
                  avec la transparence et l'exigence d'un partenaire interne.
                </p>
              </div>
            </div>
            <GrowthChart />
          </div>
        </div>
      </section>

      {/* Manifeste */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-tag mb-8" style={{ color: "var(--brand-lt)" }}>
            NOTRE ENGAGEMENT
          </p>
          <blockquote
            className="font-display text-white mb-8 leading-relaxed"
            style={{ fontSize: "clamp(18px, 2.5vw, 28px)", lineHeight: 1.6 }}
          >
            "Sur notre marché, tout le monde vend des produits. Nous avons
            choisi une autre voie. Nous pensons qu'une solution n'a de valeur
            que si elle est maîtrisée, alignée avec vos objectifs et génératrice
            de valeur concrète. C'est pourquoi nous ne vendons rien : nous nous
            associons à votre croissance."
          </blockquote>
          <p
            className="label-tag text-[10px]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            — Label Technology · Notre engagement depuis 2022
          </p>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>
            NOS VALEURS
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-foreground">
            Ce qui nous guide.
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-black/5">
            {VALEURS.map((v, i) => (
              <div key={i} className="p-8 bg-card">
                <p
                  className="font-display text-5xl mb-4"
                  style={{ color: "rgba(30,63,171,0.12)" }}
                >
                  {v.num}
                </p>
                <h3 className="font-display text-2xl mb-3 text-foreground">
                  {v.title}
                </h3>
                <p
                  className="text-[15px] leading-relaxed text-muted-foreground"
                  style={{ lineHeight: 1.7 }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe dirigeante */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>
            L'ÉQUIPE
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-foreground">
            Les gens derrière le travail.
          </h2>
          <p className="text-[15px] mb-16 max-w-xl text-muted-foreground">
            7 pôles, 7 responsables, 60 collaborateurs. Une équipe construite
            sur la durée.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EQUIPE.map((m, i) => (
              <div
                key={i}
                className="p-7 border border-border rounded-sm card-hover bg-card"
              >
                <Image
                  src={m.photo}
                  alt={m.nom}
                  width={56}
                  height={56}
                  className="rounded-full h-14 w-14 object-cover mb-5"
                />
                <h3 className="font-display text-lg mb-0.5 text-foreground">
                  {m.nom}
                </h3>
                <p
                  className="label-tag text-[10px] mb-3"
                  style={{ color: "var(--brand)" }}
                >
                  {m.role}
                </p>
                <p
                  className="text-[15px] leading-relaxed text-muted-foreground"
                  style={{ lineHeight: 1.7 }}
                >
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MiniTestimonials items={TEMOIGNAGES_CLIENTS} />
      <CtaSection />
    </main>
  );
}
