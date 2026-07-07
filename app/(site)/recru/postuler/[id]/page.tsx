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
      <section className="min-h-screen px-6 pt-28 pb-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <Link
                  href="/recru"
                  className="mb-6 inline-flex items-center gap-2 text-sm hover:underline"
                  style={{ color: "var(--mid)" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour aux offres
                </Link>
                <p className="label-tag mb-4" style={{ color: "var(--brand)" }}>
                  {offer.tag}
                </p>
                <h1 className="font-display text-4xl md:text-5xl mb-6 leading-tight text-foreground">
                  {offer.title}
                </h1>
                <div
                  className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-sm"
                  style={{ color: "var(--mid)" }}
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} strokeWidth={2} />
                    {offer.lieu}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} strokeWidth={2} />
                    {offer.contrat}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={14} strokeWidth={2} />
                    {offer.niveau}
                  </span>
                </div>
                <p className="text-base font-light leading-relaxed mb-8 text-muted-foreground">
                  {offer.desc}
                </p>
                {offer.missions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-3 text-foreground">Missions</p>
                    <div className="flex flex-wrap gap-2">
                      {offer.missions.map((m) => (
                        <span
                          key={m}
                          className="text-xs font-medium px-3 py-1.5 rounded-full"
                          style={{ backgroundColor: "rgba(30,63,171,0.08)", color: "var(--brand)" }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
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
