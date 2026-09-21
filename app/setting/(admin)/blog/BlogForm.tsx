"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Loader2 } from "lucide-react";
import type { BlogFormState } from "./actions";

type BlogInitialValues = {
  slug: string;
  tag: string;
  publishedAt: string;
  title: string;
  excerpt: string;
  body: string | null;
  readtime: string;
  published: boolean;
};

const EMPTY: BlogInitialValues = {
  slug: "",
  tag: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  title: "",
  excerpt: "",
  body: null,
  readtime: "5 min",
  published: true,
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {label}
    </Button>
  );
}

export default function BlogForm({
  initialValues = EMPTY,
  action,
  submitLabel,
}: {
  initialValues?: BlogInitialValues;
  action: (prevState: BlogFormState, formData: FormData) => Promise<BlogFormState>;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, { status: "idle" } as BlogFormState);

  return (
    <form action={formAction} className="max-w-3xl space-y-6 rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-8">
      {state.status === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/6 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL /blog/...) *</Label>
          <Input id="slug" name="slug" defaultValue={initialValues.slug} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tag">Tag *</Label>
          <Input id="tag" name="tag" defaultValue={initialValues.tag} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Titre *</Label>
        <Input id="title" name="title" defaultValue={initialValues.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Extrait *</Label>
        <Textarea id="excerpt" name="excerpt" rows={3} defaultValue={initialValues.excerpt} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Contenu de l&apos;article</Label>
        <Textarea id="body" name="body" rows={10} defaultValue={initialValues.body ?? ""} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="publishedAt">Date de publication</Label>
          <Input
            id="publishedAt"
            name="publishedAt"
            type="date"
            defaultValue={initialValues.publishedAt}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="readtime">Temps de lecture *</Label>
          <Input id="readtime" name="readtime" defaultValue={initialValues.readtime} required />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch id="published" name="published" defaultChecked={initialValues.published} />
        <Label htmlFor="published">Publié</Label>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-end">
        <Button variant="ghost" asChild>
          <Link href="/setting/blog">Annuler</Link>
        </Button>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
