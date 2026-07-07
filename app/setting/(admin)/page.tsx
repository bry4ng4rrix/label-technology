import Link from "next/link";
import { countRows } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes, Briefcase, Users, Newspaper, MessageSquareQuote, Settings2, Inbox } from "lucide-react";

export default async function AdminDashboard() {
  const [
    servicesCount,
    projectsCount,
    jobsCount,
    postsCount,
    testimonialsCount,
    applicationsCount,
  ] = await Promise.all([
    countRows("services"),
    countRows("projects"),
    countRows("job_offers"),
    countRows("blog_posts"),
    countRows("testimonials"),
    countRows("job_applications"),
  ]);

  const sections = [
    { href: "/setting/services", label: "Services", icon: Boxes, count: servicesCount, ready: true },
    { href: "/setting/projects", label: "Projets", icon: Briefcase, count: projectsCount, ready: true },
    { href: "/setting/jobs", label: "Offres d'emploi", icon: Users, count: jobsCount, ready: true },
    { href: "/setting/jobs/candidatures", label: "Candidatures", icon: Inbox, count: applicationsCount, ready: true },
    { href: "/setting/blog", label: "Blog", icon: Newspaper, count: postsCount, ready: true },
    { href: "/setting/testimonials", label: "Témoignages", icon: MessageSquareQuote, count: testimonialsCount, ready: true },
    { href: "/setting/content", label: "Contenu du site", icon: Settings2, count: null, ready: false },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Gérez le contenu public du site labeltechnology.mg.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                  {s.label}
                </CardTitle>
                {!s.ready && (
                  <Badge variant="secondary" className="text-[10px]">
                    Bientôt
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  {s.count ?? "—"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {s.ready ? "élément(s) — cliquez pour gérer" : "élément(s) en base — édition à venir"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
