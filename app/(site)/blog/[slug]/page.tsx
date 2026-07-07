import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

  return (
    <main>
      <section
        className="relative min-h-[36vh] flex flex-col justify-center grid-bg px-6 pt-24 pb-12"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, var(--brand) 0%, transparent 70%)",
          }}
        />
        <Reveal className="relative max-w-3xl mx-auto w-full">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>
          <Badge
            variant="secondary"
            className="mb-4 text-[10px] px-2 py-0.5 rounded-sm"
            style={{ backgroundColor: "rgba(46,85,212,0.15)", color: "#8FA8F5" }}
          >
            {post.tag}
          </Badge>
          <h1
            className="font-display text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            {post.title}
          </h1>
          <p className="text-white/50 text-sm font-light">
            {new Date(post.published_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readtime}
          </p>
        </Reveal>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "var(--paper)" }}>
        <Reveal className="max-w-3xl mx-auto">
          <p
            className="text-lg font-light leading-relaxed mb-8"
            style={{ color: "var(--mid)" }}
          >
            {post.excerpt}
          </p>
          {post.body ? (
            <div className="space-y-5">
              {post.body.split("\n").filter(Boolean).map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base font-light leading-relaxed"
                  style={{ color: "var(--ink)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm italic" style={{ color: "var(--mid)" }}>
              Contenu complet à venir.
            </p>
          )}
        </Reveal>
      </section>
    </main>
  );
}
