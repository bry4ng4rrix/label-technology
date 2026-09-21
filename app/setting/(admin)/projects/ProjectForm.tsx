"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Loader2, Plus, X } from "lucide-react";
import type { ProjectFormState } from "./actions";

type ProjectInitialValues = {
  tag: string;
  title: string;
  desc: string;
  order: number;
  metrics: string[];
  published: boolean;
};

const EMPTY: ProjectInitialValues = {
  tag: "",
  title: "",
  desc: "",
  order: 0,
  metrics: [""],
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

export default function ProjectForm({
  initialValues = EMPTY,
  action,
  submitLabel,
}: {
  initialValues?: ProjectInitialValues;
  action: (prevState: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, { status: "idle" } as ProjectFormState);
  const [metrics, setMetrics] = useState<string[]>(
    initialValues.metrics.length ? initialValues.metrics : [""]
  );

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
          <Label htmlFor="tag">Tag (domaine) *</Label>
          <Input id="tag" name="tag" defaultValue={initialValues.tag} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Ordre d&apos;affichage</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={initialValues.order}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Titre *</Label>
        <Input id="title" name="title" defaultValue={initialValues.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="desc">Description *</Label>
        <Textarea id="desc" name="desc" rows={3} defaultValue={initialValues.desc} required />
      </div>

      <div className="space-y-2">
        <Label>Métriques / résultats</Label>
        {metrics.map((m, i) => (
          <div key={i} className="flex gap-2">
            <Input
              name="metrics"
              value={m}
              onChange={(e) => {
                const next = [...metrics];
                next[i] = e.target.value;
                setMetrics(next);
              }}
              placeholder={`Métrique ${i + 1}`}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setMetrics(metrics.filter((_, idx) => idx !== i))}
              disabled={metrics.length <= 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setMetrics([...metrics, ""])}
        >
          <Plus className="mr-1 h-4 w-4" />
          Ajouter une métrique
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Switch id="published" name="published" defaultChecked={initialValues.published} />
        <Label htmlFor="published">Publié</Label>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-end">
        <Button variant="ghost" asChild>
          <Link href="/setting/projects">Annuler</Link>
        </Button>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
