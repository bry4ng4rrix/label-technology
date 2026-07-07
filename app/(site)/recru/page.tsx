import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import JobsList from "@/components/recru/JobsList";
import { supabase, type JobOffer } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Recrutement — Offres d'emploi Label Technology",
  description:
    "Rejoignez Label Technology à Antananarivo : offres d'emploi en Call Center, Développement, Marketing Digital, Digitalisation, Data, Comptabilité et Infrastructure IT.",
  keywords: [
    "recrutement Madagascar",
    "offre d'emploi Antananarivo",
    "emploi call center Madagascar",
    "emploi développeur Madagascar",
    "recrutement Label Technology",
  ],
  alternates: {
    canonical: "https://labeltechnology.mg/recru",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/recru",
    siteName: "Label Technology",
    title: "Recrutement — Offres d'emploi Label Technology",
    description:
      "Rejoignez une équipe de 60+ collaborateurs à Antananarivo. Call Center, Développement, Marketing, Data, Comptabilité, Infrastructure.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Recrutement Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recrutement | Label Technology",
    description:
      "Découvrez nos offres d'emploi à Antananarivo, tous domaines confondus.",
    images: ["/og-image.png"],
  },
};

export default async function RecruPage() {
  const { data } = await supabase
    .from("job_offers")
    .select("*")
    .eq("published", true)
    .order("order", { ascending: true })
    .returns<JobOffer[]>();
  const offres = data ?? [];

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden grid-bg px-6"
        style={{
          backgroundColor: "var(--ink)",
          minHeight: "52vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Halo bleu centré */}
        <div
          className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(46,85,212,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full py-28">
          <p
            className="label-tag mb-5 animate-fadeup"
            style={{ color: "var(--brand-lt)" }}
          >
            RECRUTEMENT
          </p>
          <h1 className="h1-display text-white mb-6 animate-fadeup-d1">
            Construisez la suite
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              avec nous.
            </span>
          </h1>
          <p className="text-white/55 text-lg font-light max-w-xl animate-fadeup-d2">
            60+ collaborateurs, 7 expertises. Call Center, Développement,
            Marketing, Digitalisation, Data, Comptabilité, Infrastructure —
            toutes nos offres, à Antananarivo.
          </p>
        </div>
      </section>

      <JobsList offres={offres} />

      {/* CTA candidature spontanée */}
      <section className="relative py-28 px-6 overflow-hidden bg-[#080D1A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080D1A] via-[#0f1f5c] to-[#080D1A]" />
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/25 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-80px] w-[400px] h-[350px] bg-indigo-700/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-60px] w-[320px] h-[280px] bg-violet-700/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p
            className="label-tag mb-6 animate-fadeup"
            style={{ color: "var(--brand-lt)" }}
          >
            AUCUNE OFFRE NE CORRESPOND ?
          </p>
          <h2 className="h2-cta text-white mb-5 animate-fadeup-d1">
            Envoyez-nous
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              une candidature spontanée.
            </span>
          </h2>
          <p className="text-white/40 font-light text-base max-w-lg mx-auto mb-10 leading-relaxed animate-fadeup-d2">
            On grandit vite et de nouveaux postes s&apos;ouvrent régulièrement.
            Parlez-nous de vous, on revient vers vous sous 72h.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fadeup-d3">
            <a
              href="mailto:contact@labeltechnology.mg?subject=Candidature%20spontan%C3%A9e"
              className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-white/92 active:scale-95 px-8 h-12 font-medium rounded-lg shadow-lg shadow-white/10 transition-all duration-200 hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              contact@labeltechnology.mg
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/15 text-white/80 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/25 px-8 h-12 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
