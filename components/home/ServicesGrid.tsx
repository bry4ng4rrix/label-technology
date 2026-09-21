import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "@/components/shared/SectionHeader";
import TiltCard from "@/components/shared/TiltCard";
import { Button } from "@/components/ui/button";
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
    <section className="surface-light section relative overflow-hidden">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-70" />

      <div className="container-x">
        <SectionHeader
          eyebrow="Nos expertises"
          title={
            <>
              Six pôles, une seule équipe
              <span className="gradient-text">.</span>
            </>
          }
          description="Chaque expertise est portée par une équipe dédiée, avec les standards d'une ESN européenne et la réactivité d'une startup."
          action={
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Démarrer un projet
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(services ?? []).map((s, i) => {
            const IconComponent = getIcon(s.icon);
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.07} className="h-full">
                <TiltCard
                  href={`/services/${s.slug}`}
                  maxTilt={5}
                  className="group block min-h-[380px] overflow-hidden rounded-3xl bg-ink text-white shadow-lg ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-xl hover:ring-white/20"
                >
                  {/* Photo de fond */}
                  <Image
                    src={s.image_url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/85 to-ink/30" />
                  {/* Teinte de la couleur du service au survol */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(80% 60% at 50% 100%, ${s.color}55 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col p-6">
                    <div className="mb-auto flex items-start justify-between">
                      <div
                        className="tilt-layer flex size-12 items-center justify-center rounded-xl border border-white/10 shadow-md backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5"
                        style={{ backgroundColor: `${s.color}26`, color: s.color }}
                      >
                        <IconComponent size={22} strokeWidth={1.6} />
                      </div>
                      {s.badge && (
                        <span
                          className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md"
                          style={{ backgroundColor: `${s.color}2e`, color: s.color }}
                        >
                          {s.badge}
                        </span>
                      )}
                    </div>

                    <div className="pt-10">
                      <p className="label-tag mb-3 text-white/50">{s.tag}</p>
                      <h3 className="font-display text-[1.375rem] leading-tight tracking-tight text-white">
                        {s.headline} {s.headline_accent}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">
                        {s.desc}
                      </p>
                      <span
                        className="link-arrow mt-5 text-sm text-white/80 group-hover:text-white"
                      >
                        En savoir plus
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{ color: s.color }}
                        />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
