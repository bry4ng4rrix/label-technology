import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import EditorialHero from "@/components/services/EditorialHero";
import Reveal from "@/components/shared/Reveal";
import { supabase, type BlogPost } from "@/lib/supabase";
import { accentFor, coverFor } from "@/lib/blog-covers";

async function getPost(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .returns<BlogPost[]>()
    .maybeSingle();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://labeltechnology.mg/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `https://labeltechnology.mg/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const date = new Date(post.published_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="svc-scope" style={{ ["--svc" as string]: accentFor(post.tag) }}>
      <EditorialHero
        slug="index"
        eyebrow={post.tag}
        title={post.title}
        description={post.excerpt}
        image={{ src: coverFor(post.tag), alt: "" }}
        primary={{ href: "/contact", label: "Parler d'un projet" }}
        secondary={{ href: "/blog", label: "Tous les articles" }}
      />

      {/* Métadonnées de l'article, juste sous le hero */}
      <div className="surface-light border-b border-border/70">
        <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Calendar className="size-3.5" style={{ color: "var(--svc)" }} />
            {date}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="size-3.5" style={{ color: "var(--svc)" }} />
            {post.readtime}
          </span>
        </div>
      </div>

      <section className="surface-light section">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl">
            {post.body ? (
              <div className="prose-body space-y-6 text-foreground/85">
                {post.body
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Contenu complet à venir.
              </p>
            )}

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-8">
              <Link href="/blog" className="link-arrow text-sm text-brand">
                <ArrowLeft className="size-4" />
                Tous les articles
              </Link>
              <Link href="/contact" className="link-arrow text-sm text-muted-foreground hover:text-foreground">
                Discuter de ce sujet avec nous
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
