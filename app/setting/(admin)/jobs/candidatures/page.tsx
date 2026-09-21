import Link from "next/link";
import { supabase, type JobApplication } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle2, Inbox, Sparkles, Users } from "lucide-react";
import ApplicationsTable from "./ApplicationsTable";
import AdminPageHeader from "../../AdminPageHeader";

export default async function CandidaturesAdminPage() {
  const { data } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<JobApplication[]>();
  const applications = data ?? [];

  const count = (status: string) => applications.filter((a) => a.status === status).length;
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const stats = [
    {
      label: "Total",
      value: applications.length,
      hint: `${applications.filter((a) => new Date(a.created_at).getTime() >= sevenDaysAgo).length} cette semaine`,
      icon: Inbox,
    },
    {
      label: "Nouvelles",
      value: count("nouveau"),
      hint: "à traiter",
      icon: Sparkles,
      accent: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "En entretien",
      value: count("entretien"),
      hint: `${count("contacté")} contacté${count("contacté") > 1 ? "s" : ""}`,
      icon: Users,
      accent: "text-violet-600 dark:text-violet-400",
    },
    {
      label: "Acceptées",
      value: count("accepté"),
      hint: `${count("refusé")} refusée${count("refusé") > 1 ? "s" : ""}`,
      icon: CheckCircle2,
      accent: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Candidatures"
        description="Toutes les réponses reçues via le formulaire de candidature du site public."
        actions={
          <Button variant="outline" asChild>
            <Link href="/setting/jobs">
              <Briefcase />
              Offres d&apos;emploi
            </Link>
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, hint, icon: Icon, accent }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
              <Icon className={`size-5 ${accent ?? "text-muted-foreground"}`} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold tracking-tight tabular-nums">{value}</span>
                <span className="truncate text-xs text-muted-foreground">{hint}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <ApplicationsTable data={applications} />
      </div>
    </div>
  );
}
