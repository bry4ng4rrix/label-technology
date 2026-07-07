import Link from "next/link";
import { supabase, type JobOffer } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Inbox } from "lucide-react";
import DeleteJobOfferButton from "./DeleteJobOfferButton";

export default async function JobsAdminPage() {
  const [{ data }, { count: newApplications }] = await Promise.all([
    supabase.from("job_offers").select("*").order("order", { ascending: true }).returns<JobOffer[]>(),
    supabase
      .from("job_applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "nouveau"),
  ]);
  const offers = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Offres d&apos;emploi</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Les offres affichées sur la page &laquo;&nbsp;Recrutement&nbsp;&raquo;.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/setting/jobs/candidatures">
              <Inbox className="mr-2 h-4 w-4" />
              Candidatures
              {!!newApplications && (
                <Badge className="ml-2">{newApplications}</Badge>
              )}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/setting/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle offre
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tag</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="text-sm text-muted-foreground">{o.tag}</TableCell>
                <TableCell className="font-medium">{o.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{o.lieu}</TableCell>
                <TableCell className="space-x-1">
                  {o.urgent && <Badge variant="secondary">Urgent</Badge>}
                  <Badge variant={o.published ? "default" : "outline"}>
                    {o.published ? "Publié" : "Brouillon"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/setting/jobs/${o.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteJobOfferButton id={o.id} title={o.title} />
                </TableCell>
              </TableRow>
            ))}
            {offers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  Aucune offre pour le moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
