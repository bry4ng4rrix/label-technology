import Link from "next/link";
import { supabase, type JobApplication } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Briefcase, FileText, Mail, Phone } from "lucide-react";
import StatusSelect from "./StatusSelect";
import DeleteApplicationButton from "./DeleteApplicationButton";

export default async function CandidaturesAdminPage() {
  const { data } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<JobApplication[]>();
  const applications = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Candidatures</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Toutes les réponses reçues via le formulaire de candidature du site public.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/setting/jobs">
            <Briefcase className="mr-2 h-4 w-4" />
            Offres d&apos;emploi
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidat</TableHead>
              <TableHead>Offre</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Reçu le</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  <div className="font-medium">{a.full_name}</div>
                  <div className="mt-0.5 flex flex-col gap-0.5 text-xs text-muted-foreground">
                    <a href={`mailto:${a.email}`} className="flex items-center gap-1 hover:text-foreground">
                      <Mail className="h-3 w-3" />
                      {a.email}
                    </a>
                    {a.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {a.phone}
                      </span>
                    )}
                    {a.cv_url && (
                      <a
                        href={a.cv_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-foreground"
                      >
                        <FileText className="h-3 w-3" />
                        CV
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-[180px] text-sm">{a.job_title}</TableCell>
                <TableCell className="max-w-[260px] text-sm text-muted-foreground">
                  {a.message ? (
                    <p className="line-clamp-3">{a.message}</p>
                  ) : (
                    <span className="italic">—</span>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                  {new Date(a.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <StatusSelect id={a.id} status={a.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DeleteApplicationButton id={a.id} fullName={a.full_name} />
                </TableCell>
              </TableRow>
            ))}
            {applications.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  Aucune candidature reçue pour le moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
