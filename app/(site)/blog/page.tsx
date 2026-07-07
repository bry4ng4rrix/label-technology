import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/shared/Reveal";
import { supabase, type BlogPost } from "@/lib/supabase";

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
      {/* Hero */}
      <section
        className="relative min-h-[40vh] flex flex-col justify-center grid-bg px-6 pt-24 pb-12"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, var(--brand) 0%, transparent 70%)",
          }}
        />
        <Reveal className="relative max-w-7xl mx-auto w-full">
          <p className="label-tag mb-5" style={{ color: "var(--brand-lt)" }}>
            BLOG
          </p>
          <h1
            className="font-display text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Insights &amp; expertise.
          </h1>
          <p className="text-white/60 text-base font-light max-w-xl">
            Articles techniques, retours d&apos;expérience, analyses
            sectorielles. Par l&apos;équipe Label Technology.
          </p>
        </Reveal>
      </section>

      {/* Articles */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.1} className="h-full">
                <Link href={`/blog/${a.slug}`} className="block h-full">
                  <Card className="flex flex-col h-full bg-card border-border transition-shadow hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5 rounded-sm"
                          style={{
                            backgroundColor: "rgba(30,63,171,0.08)",
                            color: "var(--brand)",
                          }}
                        >
                          {a.tag}
                        </Badge>
                        <span className="text-[11px] text-muted-foreground">
                          {a.date} · {a.readtime}
                        </span>
                      </div>
                      <CardTitle className="font-display text-lg leading-snug text-foreground">
                        {a.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 pt-0">
                      <p className="text-sm font-light leading-relaxed text-muted-foreground">
                        {a.excerpt}
                      </p>
                    </CardContent>

                    <CardFooter>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--brand)" }}
                      >
                        Lire l&apos;article →
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </Reveal>
            ))}
            {ARTICLES.length === 0 && (
              <p className="col-span-full py-10 text-center text-muted-foreground">
                Aucun article pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
