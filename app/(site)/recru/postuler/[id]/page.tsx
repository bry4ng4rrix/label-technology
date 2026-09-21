import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Briefcase } from "lucide-react";
import ApplyForm from "@/components/recru/ApplyForm";
import Reveal from "@/components/shared/Reveal";
import { supabase, type JobOffer } from "@/lib/supabase";

async function getOffer(id: string) {
  const { data } = await supabase
    .from("job_offers")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .returns<JobOffer[]>()
    .maybeSingle();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const offer = await getOffer(id);
  if (!offer) return {};

  return {
    title: `Postuler — ${offer.title}`,
    robots: { index: false, follow: true },
  };
}

export default async function PostulerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const offer = await getOffer(id);
  if (!offer) notFound();

  return (
    <main>
      <section className="surface-light relative min-h-screen overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
        <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-60" />
        <div
          aria-hidden
          className="halo -top-32 right-0 -z-10 h-[420px] w-[560px] bg-brand-lt/15"
        />

        <div className="container-x">
          <div className="grid items-start gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <Reveal>
                <Link
                  href="/recru"
                  className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="size-4" />
                  Retour aux offres
                </Link>
                <p className="label-tag mb-5 inline-flex items-center gap-2.5 text-brand">
                  <span className="h-px w-6 bg-brand/60" />
                  {offer.tag}
                </p>
                <h1 className="h2-display text-foreground">{offer.title}</h1>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {[
                    { icon: MapPin, label: offer.lieu },
                    { icon: Clock, label: offer.contrat },
                    { icon: Briefcase, label: offer.niveau },
                  ].map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm"
                    >
                      <Icon className="size-3.5 text-brand" strokeWidth={2} />
                      {label}
                    </li>
                  ))}
                </ul>

                <p className="prose-body mt-8 text-muted-foreground">{offer.desc}</p>

                {offer.missions.length > 0 && (
                  <div className="mt-8">
                    <p className="label-tag mb-3 text-muted-foreground">Missions</p>
                    <ul className="flex flex-wrap gap-2">
                      {offer.missions.map((m) => (
                        <li
                          key={m}
                          className="rounded-full bg-brand/8 px-3 py-1.5 text-xs font-medium text-brand"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <ApplyForm jobOfferId={offer.id} jobTitle={offer.title} />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
