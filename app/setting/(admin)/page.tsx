import Link from "next/link";
import { supabase, countRows, type JobApplication } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Boxes,
  Briefcase,
  Users,
  Newspaper,
  MessageSquareQuote,
  Settings2,
  Inbox,
  ArrowRight,
  Plus,
  Mail,
} from "lucide-react";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  nouveau: "outline",
  "contacté": "secondary",
  entretien: "secondary",
  "accepté": "default",
  "refusé": "destructive",
};

const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  "contacté": "Contacté",
  entretien: "Entretien",
  "accepté": "Accepté",
  "refusé": "Refusé",
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 30) return `il y a ${days} j`;
  const months = Math.round(days / 30);
  return `il y a ${months} mois`;
}

export default async function AdminDashboard() {
  const [
    servicesCount,
    projectsCount,
    jobsCount,
    postsCount,
    testimonialsCount,
    applicationsCount,
    newApplicationsCount,
    recentApplications,
  ] = await Promise.all([
    countRows("services"),
    countRows("projects"),
    countRows("job_offers"),
    countRows("blog_posts"),
    countRows("testimonials"),
    countRows("job_applications"),
    supabase
      .from("job_applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "nouveau")
      .then((r) => r.count ?? 0),
    supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)
      .returns<JobApplication[]>()
      .then((r) => r.data ?? []),
  ]);

  const sections = [
    {
      href: "/setting/services",
      label: "Services",
      icon: Boxes,
      count: servicesCount,
      ready: true,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      href: "/setting/projects",
      label: "Projets",
      icon: Briefcase,
      count: projectsCount,
      ready: true,
      color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    {
      href: "/setting/jobs",
      label: "Offres d'emploi",
      icon: Users,
      count: jobsCount,
      ready: true,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      href: "/setting/jobs/candidatures",
      label: "Candidatures",
      icon: Inbox,
      count: applicationsCount,
      ready: true,
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      highlight: newApplicationsCount > 0 ? `${newApplicationsCount} nouvelle(s)` : undefined,
    },
    {
      href: "/setting/blog",
      label: "Blog",
      icon: Newspaper,
      count: postsCount,
      ready: true,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
      href: "/setting/testimonials",
      label: "Témoignages",
      icon: MessageSquareQuote,
      count: testimonialsCount,
      ready: true,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      href: "/setting/content",
      label: "Contenu du site",
      icon: Settings2,
      count: null,
      ready: false,
      color: "bg-muted text-muted-foreground",
    },
  ];

  const quickActions = [
    { href: "/setting/services/new", label: "Nouveau service" },
    { href: "/setting/projects/new", label: "Nouveau projet" },
    { href: "/setting/jobs/new", label: "Nouvelle offre d'emploi" },
    { href: "/setting/blog/new", label: "Nouvel article" },
    { href: "/setting/testimonials/new", label: "Nouveau témoignage" },
  ];

  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez le contenu public du site labeltechnology.mg.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="group">
            <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
              <CardContent className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-muted-foreground">{s.label}</p>
                  <p className="mt-1.5 text-3xl font-semibold tabular-nums">{s.count ?? "—"}</p>
                  {s.highlight ? (
                    <Badge variant="destructive" className="mt-2 text-[10px]">
                      {s.highlight}
                    </Badge>
                  ) : !s.ready ? (
                    <Badge variant="secondary" className="mt-2 text-[10px]">
                      Bientôt
                    </Badge>
                  ) : (
                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      Gérer <ArrowRight className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Candidatures récentes</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/setting/jobs/candidatures">
                  Voir tout <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <div className="mt-3 divide-y">
              {recentApplications.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Aucune candidature reçue pour le moment.
                </p>
              )}
              {recentApplications.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.full_name}</p>
                    <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                      <Mail className="h-3 w-3 shrink-0" />
                      {a.job_title}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs text-muted-foreground">{timeAgo(a.created_at)}</span>
                    <Badge variant={STATUS_VARIANT[a.status] ?? "outline"}>
                      {STATUS_LABELS[a.status] ?? a.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-base font-semibold">Actions rapides</h2>
            <div className="mt-3 flex flex-col gap-2">
              {quickActions.map((a) => (
                <Button key={a.href} variant="outline" className="justify-start" asChild>
                  <Link href={a.href}>
                    <Plus className="h-4 w-4" />
                    {a.label}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
