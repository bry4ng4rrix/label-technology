import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ARTICLES = [
  {
    tag: "CALL CENTER",
    date: "Mai 2026",
    title:
      "Externaliser son call center à Madagascar : ce que personne ne vous dit",
    excerpt:
      "Madagascar n'est pas le premier pays qui vient à l'esprit pour l'externalisation. C'est exactement pourquoi les entreprises qui y vont en premier gardent un avantage compétitif durable.",
    readtime: "5 min",
  },
  {
    tag: "DÉVELOPPEMENT",
    date: "Avril 2026",
    title: "Next.js 14 : pourquoi on a migré tous nos projets clients dessus",
    excerpt:
      "App Router, Server Components, performances Core Web Vitals. Retour d'expérience après 12 mois de projets en production sur Next.js 14.",
    readtime: "8 min",
  },
  {
    tag: "DIGITALISATION",
    date: "Avril 2026",
    title: "ERP sur mesure vs Odoo : comment choisir pour une PME ?",
    excerpt:
      "La question revient sur chaque projet de digitalisation. Voici notre grille de décision après avoir déployé les deux solutions pour des dizaines d'entreprises.",
    readtime: "6 min",
  },
  {
    tag: "MARKETING",
    date: "Mars 2026",
    title: "SEO pour entreprises B2B : les 3 erreurs qui coûtent cher",
    excerpt:
      "Le SEO B2B n'obéit pas aux mêmes règles que le B2C. Volume faible, intentions précises, cycle long. Voici ce qu'on ne corrige plus chez nos clients.",
    readtime: "4 min",
  },
  {
    tag: "DONNÉES",
    date: "Mars 2026",
    title: "Comment nettoyer une base CRM de 50 000 contacts en 3 semaines",
    excerpt:
      "Déduplication, validation emails, enrichissement sectoriel. Le processus exact qu'on a utilisé pour un client marketing direct.",
    readtime: "7 min",
  },
  {
    tag: "STRATÉGIE",
    date: "Février 2026",
    title: "Pourquoi Antananarivo devient le hub tech de l'océan Indien",
    excerpt:
      "Universités techniques, vivier de talents bilingues, coûts compétitifs. Les données derrière la montée en puissance de la tech malgache.",
    readtime: "5 min",
  },
];

export default function BlogPage() {
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
        <div className="relative max-w-7xl mx-auto w-full">
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
        </div>
      </section>

      {/* Articles */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((a, i) => (
              <Card key={i} className="flex flex-col bg-card border-border">
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
