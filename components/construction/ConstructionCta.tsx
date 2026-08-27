"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

export default function ConstructionCta() {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-[#080D1A]">
      <div className="absolute inset-0 bg-linear-to-br from-[#080D1A] via-[#0f1f5c] to-[#080D1A]" />
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/25 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <Reveal>
          <Badge
            variant="secondary"
            className="mb-6 bg-white/8 text-white/60 border border-white/15 text-[10px] tracking-widest px-4 py-1.5 rounded-full"
          >
            NOUVELLE ACTIVITÉ — CONSTRUCTION &amp; GÉNIE CIVIL
          </Badge>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="h2-cta text-white mb-6">
            Vous avez un projet
            <br />
            <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              de construction ?
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-white/50 font-light text-base max-w-lg mx-auto mb-12 leading-relaxed">
            Notre nouvelle activité Construction est ouverte aux projets et
            collaborations. Présentez-nous votre besoin afin d&apos;étudier
            ensemble les possibilités d&apos;accompagnement.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-slate-900 hover:bg-white/92 active:scale-95 px-8 h-12 font-medium rounded-lg shadow-lg shadow-white/10 transition-all duration-200 hover:scale-105"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Présenter mon projet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/15 text-white/80 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/25 px-8 h-12 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
