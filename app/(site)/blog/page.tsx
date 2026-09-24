import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Newspaper } from "lucide-react";
import EditorialHero from "@/components/services/EditorialHero";
import PhotoPanel from "@/components/services/PhotoPanel";
import ServiceScope from "@/components/services/ServiceScope";
import Reveal from "@/components/shared/Reveal";
import { supabase, type BlogPost } from "@/lib/supabase";
import { accentFor, coverFor } from "@/lib/tag-covers";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — Insights & expertise tech",
  description:
    "Articles techniques, retours d'expérience et analyses sectorielles par l'équipe Label Technology : développement web & mobile, digitalisation, données.",
  alternates: {
    canonical: "https://labeltechnology.mg/blog",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/blog",
    siteName: "Label Technology",
    title: "Blog — Insights & expertise tech",
    description:
      "Articles techniques, retours d'expérience et analyses sectorielles par l'équipe Label Technology.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Label Technology",
    description:
      "Articles techniques, retours d'expérience et analyses sectorielles depuis Antananarivo.",
  },
};

export default async function BlogPage() {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .returns<BlogPost[]>();

  const ARTICLES = (data ?? []).map((p) => ({
    slug: p.slug,
    tag: p.tag,
    date: new Date(p.published_at).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    }),
    title: p.title,
    excerpt: p.excerpt,
    readtime: p.readtime,
  }));

  return (
    <ServiceScope slug="index" as="main">
      <EditorialHero
        slug="index"
        eyebrow="Blog"
        title={
          <>
            Insights &amp;
            <br />
            <span className="gradient-text-svc-light">expertise.</span>
          </>
        }
        description="Articles techniques, retours d'expérience et analyses sectorielles, écrits par les équipes qui livrent les projets."
        image={{ src: "/images/blog/hero.jpg", alt: "Bureau d'écriture et de recherche" }}
        primary={{ href: "/contact", label: "Parler d'un projet" }}
        secondary={{ href: "/services", label: "Voir nos services" }}
      />

      {/* Articles */}
      <section className="surface-light section">
        <div className="container-x">
          {ARTICLES.length === 0 ? (
            <div className="card-premium mx-auto max-w-md p-10 text-center hover:translate-y-0">
              <Newspaper className="mx-auto mb-4 size-8 text-brand/50" strokeWidth={1.5} />
              <p className="font-display text-lg text-foreground">Aucun article pour le moment.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Revenez bientôt — l&apos;équipe prépare de nouveaux contenus.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ARTICLES.map((a, i) => (
                <Reveal key={a.slug} delay={(i % 3) * 0.08} className="h-full">
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group flex h-full flex-col"
                    style={{ ["--svc" as string]: accentFor(a.tag) }}
                  >
                    <PhotoPanel
                      src={coverFor(a.tag)}
                      alt=""
                      ratio="16/9"
                      tone="light"
                      tint="soft"
                      quality={60}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="rounded-2xl"
                    />
                    <div className="mt-6 flex flex-1 flex-col">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span
                          className="rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase"
                          style={{
                            background: "color-mix(in srgb, var(--svc) 14%, transparent)",
                            color: "color-mix(in srgb, var(--svc) 75%, black)",
                          }}
                        >
                          {a.tag}
                        </span>
                        <span className="meta flex items-center gap-1.5 whitespace-nowrap">
                          <Clock className="size-3" />
                          {a.readtime}
                        </span>
                      </div>
                      <h2 className="font-display text-xl leading-snug tracking-tight text-foreground transition-colors group-hover:text-[color-mix(in_srgb,var(--svc)_75%,black)]">
                        {a.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                        {a.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                        <span className="meta">{a.date}</span>
                        <span
                          className="link-arrow text-sm font-semibold"
                          style={{ color: "color-mix(in srgb, var(--svc) 75%, black)" }}
                        >
                          Lire
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </ServiceScope>
  );
}
