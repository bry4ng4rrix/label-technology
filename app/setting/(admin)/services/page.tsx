import Link from "next/link";
import { supabase, type Service } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import AdminPageHeader from "../AdminPageHeader";
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
import DeleteServiceButton from "./DeleteServiceButton";

export default async function ServicesAdminPage() {
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("order", { ascending: true })
    .returns<Service[]>();
  const services = data ?? [];

  return (
    <div>
      <AdminPageHeader
        title={<>Services</>}
        description={<>La grille &laquo;&nbsp;NOS EXPERTISES&nbsp;&raquo; affichée sur la page d&apos;accueil.</>}
        actions={
          <>
            <Button asChild>
              <Link href="/setting/services/new">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau service
              </Link>
            </Button>
          </>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Couleur</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  <span
                    className="inline-block h-4 w-4 rounded-full border"
                    style={{ backgroundColor: s.color }}
                  />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{s.tag}</TableCell>
                <TableCell className="font-medium">
                  {s.headline} {s.headline_accent}
                </TableCell>
                <TableCell className="space-x-1">
                  {s.featured && <Badge variant="secondary">Mis en avant</Badge>}
                  <Badge variant={s.published ? "default" : "outline"}>
                    {s.published ? "Publié" : "Brouillon"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/setting/services/${s.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteServiceButton id={s.id} headline={s.headline} />
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  Aucun service pour le moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
