"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Loader2, Plus, X } from "lucide-react";
import { ICON_NAMES } from "@/lib/icons";
import type { ServiceFormState } from "./actions";

type ServiceInitialValues = {
  slug: string;
  tag: string;
  headline: string;
  headlineAccent: string;
  desc: string;
  color: string;
  icon: string;
  imageUrl: string;
  badge: string | null;
  items: string[];
  featured: boolean;
  published: boolean;
};

const EMPTY: ServiceInitialValues = {
  slug: "",
  tag: "",
  headline: "",
  headlineAccent: "",
  desc: "",
  color: "#3B82F6",
  icon: ICON_NAMES[0],
  imageUrl: "",
  badge: null,
  items: [""],
  featured: false,
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

export default function ServiceForm({
  initialValues = EMPTY,
  action,
  submitLabel,
}: {
  initialValues?: ServiceInitialValues;
  action: (prevState: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, { status: "idle" } as ServiceFormState);
  const [items, setItems] = useState<string[]>(
    initialValues.items.length ? initialValues.items : [""]
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
          <Label htmlFor="slug">Slug (URL /services/...) *</Label>
          <Input id="slug" name="slug" defaultValue={initialValues.slug} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tag">Tag *</Label>
          <Input id="tag" name="tag" defaultValue={initialValues.tag} required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="headline">Titre (ligne 1) *</Label>
          <Input id="headline" name="headline" defaultValue={initialValues.headline} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="headlineAccent">Titre (ligne 2, accent)</Label>
          <Input
            id="headlineAccent"
            name="headlineAccent"
            defaultValue={initialValues.headlineAccent}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="desc">Description *</Label>
        <Textarea id="desc" name="desc" rows={3} defaultValue={initialValues.desc} required />
      </div>

      <div className="space-y-2">
        <Label>Points clés</Label>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input
              name="items"
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                setItems(next);
              }}
              placeholder={`Point ${i + 1}`}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setItems(items.filter((_, idx) => idx !== i))}
              disabled={items.length <= 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setItems([...items, ""])}
        >
          <Plus className="mr-1 h-4 w-4" />
          Ajouter un point
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="color">Couleur (hex) *</Label>
          <Input id="color" name="color" defaultValue={initialValues.color} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Icône *</Label>
          <Select name="icon" defaultValue={initialValues.icon}>
            <SelectTrigger className="w-full" id="icon">
              <SelectValue placeholder="Choisir une icône" />
            </SelectTrigger>
            <SelectContent>
              {ICON_NAMES.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="imageUrl">URL image *</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={initialValues.imageUrl} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="badge">Badge (optionnel)</Label>
          <Input id="badge" name="badge" defaultValue={initialValues.badge ?? ""} />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Switch id="featured" name="featured" defaultChecked={initialValues.featured} />
          <Label htmlFor="featured">Mis en avant</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="published" name="published" defaultChecked={initialValues.published} />
          <Label htmlFor="published">Publié</Label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-end">
        <Button variant="ghost" asChild>
          <Link href="/setting/services">Annuler</Link>
        </Button>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
