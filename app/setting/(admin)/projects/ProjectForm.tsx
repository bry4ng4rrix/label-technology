"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
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
    <form action={formAction} className="space-y-6 max-w-2xl">
      {state.status === "error" && (
        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="tag">Tag (domaine) *</Label>
          <Input id="tag" name="tag" defaultValue={initialValues.tag} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="order">Ordre d&apos;affichage</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={initialValues.order}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="title">Titre *</Label>
        <Input id="title" name="title" defaultValue={initialValues.title} required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="desc">Description *</Label>
        <Textarea id="desc" name="desc" rows={3} defaultValue={initialValues.desc} required />
      </div>

      <div className="space-y-1.5">
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

      <SubmitButton label={submitLabel} />
    </form>
  );
}
