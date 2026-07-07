"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
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
import { AlertCircle, Loader2 } from "lucide-react";
import type { TestimonialFormState } from "./actions";

type TestimonialInitialValues = {
  quote: string;
  author: string;
  role: string;
  company: string;
  tag: string | null;
  color: string | null;
  gradientColor: string | null;
  context: string;
  order: number;
  published: boolean;
};

const EMPTY: TestimonialInitialValues = {
  quote: "",
  author: "",
  role: "",
  company: "",
  tag: null,
  color: "#3B82F6",
  gradientColor: null,
  context: "home",
  order: 0,
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

export default function TestimonialForm({
  initialValues = EMPTY,
  action,
  submitLabel,
}: {
  initialValues?: TestimonialInitialValues;
  action: (
    prevState: TestimonialFormState,
    formData: FormData
  ) => Promise<TestimonialFormState>;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {
    status: "idle",
  } as TestimonialFormState);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {state.status === "error" && (
        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="quote">Citation *</Label>
        <Textarea id="quote" name="quote" rows={4} defaultValue={initialValues.quote} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="author">Auteur *</Label>
          <Input id="author" name="author" defaultValue={initialValues.author} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="role">Fonction *</Label>
          <Input id="role" name="role" defaultValue={initialValues.role} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="company">Entreprise *</Label>
          <Input id="company" name="company" defaultValue={initialValues.company} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tag">Tag (optionnel)</Label>
          <Input id="tag" name="tag" defaultValue={initialValues.tag ?? ""} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="color">Couleur d&apos;accent (hex, optionnel)</Label>
          <Input id="color" name="color" defaultValue={initialValues.color ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gradientColor">Dégradé (classes Tailwind, optionnel)</Label>
          <Input
            id="gradientColor"
            name="gradientColor"
            placeholder="from-amber-500/20 to-yellow-600/10"
            defaultValue={initialValues.gradientColor ?? ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="context">Emplacement d&apos;affichage</Label>
          <Select name="context" defaultValue={initialValues.context}>
            <SelectTrigger id="context">
              <SelectValue placeholder="Choisir un emplacement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Accueil</SelectItem>
              <SelectItem value="about">À propos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="order">Ordre d&apos;affichage</Label>
          <Input id="order" name="order" type="number" defaultValue={initialValues.order} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch id="published" name="published" defaultChecked={initialValues.published} />
        <Label htmlFor="published">Publié</Label>
      </div>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
