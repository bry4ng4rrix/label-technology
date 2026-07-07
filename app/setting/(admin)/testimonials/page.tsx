import Link from "next/link";
import { supabase, type Testimonial } from "@/lib/supabase";
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
import DeleteTestimonialButton from "./DeleteTestimonialButton";

export default async function TestimonialsAdminPage() {
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("context", { ascending: true })
    .order("order", { ascending: true })
    .returns<Testimonial[]>();
  const testimonials = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Témoignages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Les témoignages clients affichés sur l&apos;accueil et la page À propos.
          </p>
        </div>
        <Button asChild>
          <Link href="/setting/testimonials/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau témoignage
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Auteur</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.author}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{t.company}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {t.context === "about" ? "À propos" : "Accueil"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={t.published ? "default" : "outline"}>
                    {t.published ? "Publié" : "Brouillon"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/setting/testimonials/${t.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteTestimonialButton id={t.id} author={t.author} />
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  Aucun témoignage pour le moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
