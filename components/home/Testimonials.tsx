import { Quote } from "lucide-react";
import PhotoPanel from "@/components/services/PhotoPanel";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "@/components/shared/SectionHeader";
import { supabase, type Testimonial } from "@/lib/supabase";

export default async function Testimonials() {
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("context", "home")
    .eq("published", true)
    .order("order", { ascending: true })
    .returns<Testimonial[]>();

  const TESTIMONIALS = (data ?? []).map((t) => ({
    quote: t.quote,
    author: t.author,
    role: t.role,
    company: t.company,
    tag: t.tag ?? "",
    color: t.color ?? "var(--brand)",
  }));

  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="surface-light section relative overflow-hidden">
      <div className="container-x">
        <SectionHeader
          eyebrow="Témoignages clients"
          title={
            <>
              Des résultats, <span className="gradient-text">pas des promesses.</span>
            </>
          }
        />

        {/* Visuel d'ouverture, avant les témoignages */}
        <Reveal className="mb-14">
          <PhotoPanel
            src="/images/pages/testimonials.jpg"
            alt="Réunion de travail avec un client"
            ratio="16/9"
            tone="light"
            tint="soft"
            quality={60}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="rounded-[2rem] sm:aspect-[21/9]"
            overlay={
              <div className="flex h-full items-end p-6 sm:p-10">
                <div className="glass-card max-w-md p-6" data-tone="dark">
                  <p className="font-display text-lg leading-snug font-semibold text-white sm:text-xl">
                    Ce que nos clients retiennent, ce n&apos;est pas la technologie.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    C&apos;est d&apos;avoir eu un interlocuteur qui comprenait leur
                    métier et qui a tenu ses délais.
                  </p>
                </div>
              </div>
            }
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <figure
                className="card-premium group flex h-full flex-col p-7"
                style={{ ["--accent" as string]: t.color }}
              >
                <div className="mb-6 flex items-center justify-between">
                  {t.tag ? (
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase"
                      style={{ backgroundColor: `${t.color}1a`, color: t.color }}
                    >
                      {t.tag}
                    </span>
                  ) : (
                    <span />
                  )}
                  <Quote
                    className="size-5 opacity-30 transition-opacity duration-300 group-hover:opacity-70"
                    style={{ color: t.color }}
                  />
                </div>

                <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-border/70 pt-5">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.author.trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {t.author}
                    </span>
                    <span className="block text-xs leading-snug text-muted-foreground">
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
