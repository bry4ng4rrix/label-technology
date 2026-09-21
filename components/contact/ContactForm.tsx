"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldLabel, FormCard, FormError, FormSuccess } from "@/components/shared/FormStates";
import { Loader2, Send, ShieldCheck } from "lucide-react";

const initialState: ContactState = { status: "idle" };

const SERVICES = [
  { value: "Développement Web & Mobile", label: "Développement Web & Mobile" },
  { value: "Marketing Digital", label: "Marketing Digital" },
  { value: "Digitalisation", label: "Digitalisation & ERP" },
  { value: "Traitement de données", label: "Traitement de données" },
  { value: "Matériel informatique", label: "Matériel informatique" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full rounded-xl">
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Envoi en cours…
        </>
      ) : (
        <>
          <Send />
          Envoyer le message
        </>
      )}
    </Button>
  );
}

export default function ContactForm() {
  const [state, action] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return <FormSuccess title="Message envoyé !" message={state.message} />;
  }

  return (
    <FormCard eyebrow="Formulaire de contact" title="Parlons de votre projet">
      <FormError message={state.status === "error" ? state.message : undefined} />

      <form action={action} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="name">Prénom &amp; Nom</FieldLabel>
            <Input required id="name" type="text" name="name" placeholder="Jean Dupont" autoComplete="name" />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="company" optional>Entreprise</FieldLabel>
            <Input id="company" type="text" name="company" placeholder="Votre société" autoComplete="organization" />
          </div>
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="email">Email professionnel</FieldLabel>
          <Input required id="email" type="email" name="email" placeholder="jean@entreprise.com" autoComplete="email" />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="service" optional>Service concerné</FieldLabel>
          <Select name="service">
            <SelectTrigger id="service" className="h-11 w-full">
              <SelectValue placeholder="Choisir un service…" />
            </SelectTrigger>
            <SelectContent>
              {SERVICES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="message">Votre message</FieldLabel>
          <Textarea
            required
            id="message"
            name="message"
            rows={5}
            placeholder="Décrivez votre projet ou votre besoin…"
            className="resize-none"
          />
        </div>

        <div className="pt-2">
          <SubmitButton />
        </div>

        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-emerald-500" />
          Réponse sous 24h · Données protégées
        </p>
      </form>
    </FormCard>
  );
}
