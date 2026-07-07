import Link from "next/link";
import { supabase, type Project } from "@/lib/supabase";
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
import { Plus, Pencil } from "lucide-react";
import DeleteProjectButton from "./DeleteProjectButton";

export default async function ProjectsAdminPage() {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("order", { ascending: true })
    .returns<Project[]>();
  const projects = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projets</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Les réalisations affichées sur la page &laquo;&nbsp;Nos réalisations&nbsp;&raquo;.
          </p>
        </div>
        <Button asChild>
          <Link href="/setting/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau projet
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tag</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="text-sm text-muted-foreground">{p.tag}</TableCell>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>
                  <Badge variant={p.published ? "default" : "outline"}>
                    {p.published ? "Publié" : "Brouillon"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/setting/projects/${p.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteProjectButton id={p.id} title={p.title} />
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  Aucun projet pour le moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
