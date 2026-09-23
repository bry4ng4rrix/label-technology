import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "@/components/shared/SectionHeader";
import TiltCard from "@/components/shared/TiltCard";
import { Button } from "@/components/ui/button";
import { supabase, type Service } from "@/lib/supabase";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export default async function ServicesGrid() {
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("order", { ascending: true })
    .returns<Service[]>();

  const services = data ?? [];
  /* Le champ « Mis en avant » de l'admin pilote la hiérarchie :
     les services cochés passent en grandes cartes, les autres en cartes
     compactes. Si aucun n'est coché, tout reste sur un pied d'égalité. */
  const core = services.filter((s) => s.featured);
  const rest = core.length ? services.filter((s) => !s.featured) : services;

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
          description={
            core.length
              ? "Deux expertises cœur — développement sur mesure et digitalisation — complétées par quatre pôles mobilisés selon le projet."
              : "Chaque expertise est portée par une équipe dédiée, avec les standards d'une ESN européenne et la réactivité d'une startup."
          }
          action={
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Démarrer un projet
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          }
        />

        {/* Expertises cœur — grandes cartes */}
        {core.length > 0 && (
          <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {core.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.07} className="h-full">
                <ServiceCard service={s} size="lg" />
              </Reveal>
            ))}
          </div>
        )}

        {/* Pôles complémentaires */}
        <div
          className={cn(
            "grid grid-cols-1 gap-5 sm:grid-cols-2",
            core.length ? "lg:grid-cols-4" : "lg:grid-cols-3",
          )}
        >
          {rest.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.07} className="h-full">
              <ServiceCard service={s} size={core.length ? "sm" : "lg"} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Carte de service — `lg` met en avant (visuel plein), `sm` reste compacte. */
function ServiceCard({ service: s, size }: { service: Service; size: "lg" | "sm" }) {
  const IconComponent = getIcon(s.icon);
  const large = size === "lg";

  return (
    <TiltCard
      href={`/services/${s.slug}`}
      maxTilt={large ? 5 : 3}
      className={cn(
        "group block overflow-hidden rounded-3xl bg-ink text-white shadow-lg ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-xl hover:ring-white/20",
        large ? "min-h-[420px]" : "min-h-[300px]",
      )}
    >
      {/* Photo de fond */}
      <Image
        src={s.image_url}
        alt=""
        fill
        sizes={
          large
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        className={cn(
          "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
          large ? "opacity-45" : "opacity-30",
        )}
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/85 to-ink/30" />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(80% 60% at 50% 100%, ${s.color}55 0%, transparent 70%)` }}
      />

      <div className={cn("relative z-10 flex h-full flex-col", large ? "p-7 sm:p-8" : "p-6")}>
        <div className="mb-auto flex items-start justify-between gap-3">
          <div
            className={cn(
              "tilt-layer flex items-center justify-center rounded-xl border border-white/10 shadow-md backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5",
              large ? "size-14" : "size-11",
            )}
            style={{ backgroundColor: `${s.color}26`, color: s.color }}
          >
            <IconComponent size={large ? 26 : 20} strokeWidth={1.6} />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {large && (
              <span className="rounded-full border border-white/12 bg-white/8 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/75 uppercase backdrop-blur-md">
                Expertise cœur
              </span>
            )}
            {s.badge && (
              <span
                className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md"
                style={{ backgroundColor: `${s.color}2e`, color: s.color }}
              >
                {s.badge}
              </span>
            )}
          </div>
        </div>

        <div className={large ? "pt-10" : "pt-8"}>
          <p className="label-tag mb-3 text-white/50">{s.tag}</p>
          <h3
            className={cn(
              "font-display leading-tight tracking-tight text-white",
              large ? "text-2xl sm:text-[1.75rem]" : "text-lg",
            )}
          >
            {s.headline} {s.headline_accent}
          </h3>
          <p
            className={cn(
              "mt-3 leading-relaxed text-white/60",
              large ? "line-clamp-3 text-[15px]" : "line-clamp-2 text-sm",
            )}
          >
            {s.desc}
          </p>
          <span className="link-arrow mt-5 text-sm text-white/80 group-hover:text-white">
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
  );
}
