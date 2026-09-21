import Link from "next/link";
import { supabase, countRows, type JobApplication } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminPageHeader from "./AdminPageHeader";
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
      <AdminPageHeader
        title="Dashboard"
        description="Gérez le contenu public du site labeltechnology.mg."
        actions={
          <p className="text-xs text-muted-foreground capitalize">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="group">
            <Card className="h-full transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-md">
              <CardContent className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm text-muted-foreground">{s.label}</p>
                  <p className="font-display mt-1.5 text-3xl font-semibold tracking-tight tabular-nums">
                    {s.count ?? "—"}
                  </p>
                  {s.highlight ? (
                    <Badge variant="destructive" className="mt-2.5">
                      {s.highlight}
                    </Badge>
                  ) : !s.ready ? (
                    <Badge variant="secondary" className="mt-2.5">
                      Bientôt
                    </Badge>
                  ) : (
                    <span className="mt-2.5 inline-flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      Gérer <ArrowRight className="size-3" />
                    </span>
                  )}
                </div>
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${s.color}`}
                >
                  <s.icon className="size-5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-semibold">Candidatures récentes</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/setting/jobs/candidatures">
                  Voir tout <ArrowRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
            <div className="mt-3 divide-y divide-border/70">
              {recentApplications.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                  <Inbox className="size-7 text-muted-foreground/50" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">
                    Aucune candidature reçue pour le moment.
                  </p>
                </div>
              )}
              {recentApplications.map((a) => (
                <Link
                  key={a.id}
                  href="/setting/jobs/candidatures"
                  className="-mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {a.full_name.trim().charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{a.full_name}</p>
                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <Mail className="size-3 shrink-0" />
                        {a.job_title}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      {timeAgo(a.created_at)}
                    </span>
                    <Badge variant={STATUS_VARIANT[a.status] ?? "outline"}>
                      {STATUS_LABELS[a.status] ?? a.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-display text-base font-semibold">Actions rapides</h2>
            <div className="mt-3 flex flex-col gap-2">
              {quickActions.map((a) => (
                <Button key={a.href} variant="outline" className="justify-start" asChild>
                  <Link href={a.href}>
                    <Plus className="size-4 text-muted-foreground" />
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
