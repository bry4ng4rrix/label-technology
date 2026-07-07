import Link from "next/link";
import { supabase, type BlogPost } from "@/lib/supabase";
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
import DeleteBlogButton from "./DeleteBlogButton";

export default async function BlogAdminPage() {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false })
    .returns<BlogPost[]>();
  const posts = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Les articles affichés sur la page &laquo;&nbsp;Blog&nbsp;&raquo;.
          </p>
        </div>
        <Button asChild>
          <Link href="/setting/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tag</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="text-sm text-muted-foreground">{p.tag}</TableCell>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(p.published_at).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <Badge variant={p.published ? "default" : "outline"}>
                    {p.published ? "Publié" : "Brouillon"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/setting/blog/${p.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteBlogButton id={p.id} title={p.title} />
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  Aucun article pour le moment.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
