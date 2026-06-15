"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: "var(--coral)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="label-tag text-white/60 mb-6">PRÊT À DÉMARRER ?</p>

        <h2
          className="font-rostex text-white mb-5"
          style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.0 }}
        >
          Votre projet mérite mieux qu&apos;une agence généraliste.
        </h2>

        <p className="text-white/80 text-xl italic mb-8 font-display">
          Quittez la posture d&apos;acheteur. Prenez la place de partenaire.
        </p>

        <p className="text-white/70 font-light text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Décrivez-nous votre besoin. On vous répond sous 72h avec une
          proposition concrète — pas un formulaire de plus.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button className="bg-white hover:bg-gray-50 active:scale-95 px-8 py-4 h-auto text-sm font-medium rounded-lg hover:scale-105">
            <Link href="/contact">Parlons-en</Link>
            <ArrowRight className=" w-4 h-4" />
          </Button>

          <Button
            asChild
            variant="outline"
            className="text-white  px-8 py-4 h-auto text-sm font-light rounded-lg bg-transparent hover:scale-105 hover:text-white"
          >
            <Link href="/services/callcenter">
              Voir l&apos;offre Call Center
            </Link>
          </Button>
        </div>

        {/* Réassurance */}
        <div className="mt-14 flex flex-wrap justify-center gap-8">
          {[
            "Réponse sous 72h garantie",
            "Devis gratuit et sans engagement",
            "Interlocuteur dédié dès le premier échange",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-white/60 text-xs"
            >
              <span className="text-white/40">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
