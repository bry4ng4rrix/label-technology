import Image from "next/image";
import Link from "next/link";
import Aurora from "@/components/Aurora";
import Reveal from "@/components/shared/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase, type Service } from "@/lib/supabase";
import { getIcon } from "@/lib/icons";

export default async function ServicesGrid() {
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("order", { ascending: true })
    .returns<Service[]>();

  return (
    <section className="relative py-10 px-6 grid-bg overflow-hidden bg-gray-100 sm:py-16 lg:py-20">
      {/* Aurora background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* <Aurora /> */}
      </div>

      <div className="relative z-10 p-2 mx-auto">
        {/* Section header */}
        <Reveal className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <h2 className="h2-display uppercase">
              <span className="bg-linear-to-r from-brand to-brand-lt bg-clip-text text-transparent">
                Nos expertises
              </span>
            </h2>
          </div>
          <Button
            className="text-xs px-6 py-3 h-14 bg-brand hover:bg-brand-lt rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand/30 font-semibold"
            asChild
          >
            <Link href="/contact" className="flex items-center gap-2">
              DÉMARRER UN PROJET
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(services ?? []).map((s, i) => {
            const IconComponent = getIcon(s.icon);
            return (
              <Reveal key={s.id} delay={(i % 4) * 0.08} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group service-card relative block h-full rounded-xl overflow-hidden ring-1 ring-white/10 bg-slate-950 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:ring-white/25
                shadow-sky-200 hover:shadow-xl"
                >
                  {/* Photo de fond (comme l'arc du Hero) */}
                  <Image
                    src={s.image_url}
                    alt={s.tag}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 16vw"
                    className="object-cover opacity-30 transition-transform duration-500 ease-out group-hover:scale-110"
                  />

                  {/* Voile sombre pour la lisibilité du texte */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/85 to-slate-950/50" />

                  {/* Dégradé couleur au survol */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(180deg, transparent 40%, ${s.color}55 100%)`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col p-6">
                    {/* Icon section */}
                    <div className="mb-4">
                      <div
                        className="inline-flex p-3 rounded-lg mb-4 animate-icon-float shadow-md transition-all duration-300"
                        style={{
                          backgroundColor: `${s.color}25`,
                          color: s.color,
                        }}
                      >
                        <IconComponent size={24} strokeWidth={1.5} />
                      </div>
                    </div>

                    {s.badge && (
                      <Badge
                        className="absolute top-6 right-6 text-[10px] px-2 py-1 rounded-full border-0 font-semibold shadow-md transition-all duration-300"
                        style={{
                          backgroundColor: `${s.color}30`,
                          color: s.color,
                        }}
                      >
                        {s.badge}
                      </Badge>
                    )}

                    <p className="text-[11px] font-semibold tracking-widest mb-3 text-white/60 uppercase">
                      {s.tag}
                    </p>

                    <h3 className="text-xl md:text-2xl font-bold leading-tight text-white">
                      {s.headline} <span>{s.headline_accent}</span>
                    </h3>

                    <div className="flex-1 pt-4">
                      <p className="text-sm leading-relaxed mb-6 text-white/70">
                        {s.desc}
                      </p>
                    </div>

                    <div className="pt-4">
                      <span
                        className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2"
                        style={{ color: s.color }}
                      >
                        En savoir plus
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
