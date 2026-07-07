import Link from "next/link";
import { prisma } from "@/lib/db";
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
import DeleteServiceButton from "./DeleteServiceButton";

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            La grille &laquo;&nbsp;NOS EXPERTISES&nbsp;&raquo; affichée sur la page d&apos;accueil.
          </p>
        </div>
        <Button asChild>
          <Link href="/setting/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau service
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border bg-card">
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
                  {s.headline} {s.headlineAccent}
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
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
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
