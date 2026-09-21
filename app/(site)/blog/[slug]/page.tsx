import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import { supabase, type BlogPost } from "@/lib/supabase";

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
    <main>
      <PageHero
        size="sm"
        back={{ href: "/blog", label: "Retour au blog" }}
        eyebrow={post.tag}
        title={<span className="h2-display block">{post.title}</span>}
      >
        <Reveal delay={0.2}>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {post.readtime}
            </span>
          </p>
        </Reveal>
      </PageHero>

      <section className="surface-light section">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl">
            <p className="lead border-l-2 border-brand/40 pl-5 text-foreground/80">
              {post.excerpt}
            </p>
            {post.body ? (
              <div className="prose-body mt-10 space-y-6 text-foreground/85">
                {post.body
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
            ) : (
              <p className="mt-10 text-sm text-muted-foreground italic">
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
