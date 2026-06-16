"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const REASSURANCE = [
  "Réponse sous 72h garantie",
  "Devis gratuit et sans engagement",
  "Interlocuteur dédié dès le premier échange",
];

export default function CtaSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-[#080D1A]">
      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080D1A] via-[#0f1f5c] to-[#080D1A]" />
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-80px] w-[400px] h-[350px] bg-indigo-700/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-40px] right-[-60px] w-[320px] h-[280px] bg-violet-700/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Badge
          variant="secondary"
          className="mb-6 bg-white/8 text-white/60 border border-white/15 text-[10px] tracking-widest px-4 py-1.5 rounded-full"
        >
          PRÊT À DÉMARRER ?
        </Badge>

        <h2
          className="font-rostex text-white mb-5"
          style={{ fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 1.05 }}
        >
          Votre projet mérite mieux
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            qu&apos;une agence généraliste.
          </span>
        </h2>

        <p className="text-blue-200/60 text-xl italic mb-8 font-display">
          Quittez la posture d&apos;acheteur. Prenez la place de partenaire.
        </p>

        <p className="text-white/40 font-light text-base max-w-lg mx-auto mb-12 leading-relaxed">
          Décrivez-nous votre besoin. On vous répond sous 72h avec une
          proposition concrète — pas un formulaire de plus.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-slate-900 hover:bg-white/92 active:scale-95 px-8 h-12 font-medium rounded-lg shadow-lg shadow-white/10 transition-all duration-200 hover:scale-105"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Parlons-en
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/15 text-white/80 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/25 px-8 h-12 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Link href="/services/callcenter">
              Voir l&apos;offre Call Center
            </Link>
          </Button>
        </div>

        <Separator className="my-10 bg-white/8 max-w-xs mx-auto" />

        {/* Réassurance */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {REASSURANCE.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white/35 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400/50 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
