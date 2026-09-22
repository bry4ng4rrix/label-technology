import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Newspaper } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import { supabase, type BlogPost } from "@/lib/supabase";

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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Blog Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Label Technology",
    description:
      "Articles techniques, retours d'expérience et analyses sectorielles depuis Antananarivo.",
    images: ["/og-image.png"],
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
    <main>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Insights &amp; <span className="gradient-text-light">expertise.</span>
          </>
        }
        description="Articles techniques, retours d'expérience, analyses sectorielles. Par l'équipe Label Technology."
        size="sm"
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
                    className="card-premium group flex h-full flex-col p-7"
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-brand/8 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-brand uppercase">
                        {a.tag}
                      </span>
                      <span className="meta flex items-center gap-1.5 whitespace-nowrap">
                        <Clock className="size-3" />
                        {a.readtime}
                      </span>
                    </div>
                    <h2 className="font-display text-xl leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand">
                      {a.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                      {a.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                      <span className="meta">{a.date}</span>
                      <span className="link-arrow text-sm text-brand">
                        Lire
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
