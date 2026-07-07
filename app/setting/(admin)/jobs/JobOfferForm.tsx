"use client";

import { useActionState, useState } from "react";
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
import { AlertCircle, Loader2, Plus, X } from "lucide-react";
import type { JobOfferFormState } from "./actions";

type JobOfferInitialValues = {
  tag: string;
  title: string;
  contrat: string;
  lieu: string;
  niveau: string;
  desc: string;
  order: number;
  missions: string[];
  urgent: boolean;
  published: boolean;
};

const EMPTY: JobOfferInitialValues = {
  tag: "",
  title: "",
  contrat: "CDI · Temps plein",
  lieu: "Antananarivo",
  niveau: "",
  desc: "",
  order: 0,
  missions: [""],
  urgent: false,
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

export default function JobOfferForm({
  initialValues = EMPTY,
  action,
  submitLabel,
  serviceTags,
}: {
  initialValues?: JobOfferInitialValues;
  action: (prevState: JobOfferFormState, formData: FormData) => Promise<JobOfferFormState>;
  submitLabel: string;
  serviceTags: string[];
}) {
  const [state, formAction] = useActionState(action, { status: "idle" } as JobOfferFormState);
  const [missions, setMissions] = useState<string[]>(
    initialValues.missions.length ? initialValues.missions : [""]
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
          <Label htmlFor="tag">Domaine (service) *</Label>
          <Select name="tag" defaultValue={initialValues.tag}>
            <SelectTrigger id="tag">
              <SelectValue placeholder="Choisir un domaine" />
            </SelectTrigger>
            <SelectContent>
              {serviceTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="title">Titre du poste *</Label>
          <Input id="title" name="title" defaultValue={initialValues.title} required />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contrat">Contrat *</Label>
          <Input id="contrat" name="contrat" defaultValue={initialValues.contrat} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lieu">Lieu *</Label>
          <Input id="lieu" name="lieu" defaultValue={initialValues.lieu} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="niveau">Niveau requis *</Label>
          <Input id="niveau" name="niveau" defaultValue={initialValues.niveau} required />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="desc">Description *</Label>
        <Textarea id="desc" name="desc" rows={3} defaultValue={initialValues.desc} required />
      </div>

      <div className="space-y-1.5">
        <Label>Missions</Label>
        {missions.map((m, i) => (
          <div key={i} className="flex gap-2">
            <Input
              name="missions"
              value={m}
              onChange={(e) => {
                const next = [...missions];
                next[i] = e.target.value;
                setMissions(next);
              }}
              placeholder={`Mission ${i + 1}`}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setMissions(missions.filter((_, idx) => idx !== i))}
              disabled={missions.length <= 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setMissions([...missions, ""])}
        >
          <Plus className="mr-1 h-4 w-4" />
          Ajouter une mission
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="order">Ordre d&apos;affichage</Label>
          <Input id="order" name="order" type="number" defaultValue={initialValues.order} />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Switch id="urgent" name="urgent" defaultChecked={initialValues.urgent} />
          <Label htmlFor="urgent">Recrutement urgent</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="published" name="published" defaultChecked={initialValues.published} />
          <Label htmlFor="published">Publié</Label>
        </div>
      </div>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
