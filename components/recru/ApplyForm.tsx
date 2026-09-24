"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitJobApplication, type ApplicationState } from "@/app/(site)/recru/postuler/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldLabel, FormCard, FormError, FormSuccess } from "@/components/shared/FormStates";
import { Loader2, Send, ShieldCheck } from "lucide-react";

const initialState: ApplicationState = { status: "idle" };

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
          Envoyer ma candidature
        </>
      )}
    </Button>
  );
}

export default function ApplyForm({
  jobOfferId,
  jobTitle,
}: {
  jobOfferId: string | null;
  jobTitle: string;
}) {
  const action = submitJobApplication.bind(null, jobOfferId, jobTitle);
  const [state, formAction] = useActionState(action, initialState);

  if (state.status === "success") {
    return <FormSuccess title="Candidature envoyée !" message={state.message} />;
  }

  return (
    <FormCard eyebrow="Formulaire de candidature" title={`Postuler — ${jobTitle}`}>
      <FormError message={state.status === "error" ? state.message : undefined} />

      <form action={formAction} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="fullName">Prénom &amp; Nom</FieldLabel>
            <Input required id="fullName" type="text" name="fullName" placeholder="Jean Dupont" autoComplete="name" />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="phone" optional>Téléphone</FieldLabel>
            <Input id="phone" type="tel" name="phone" placeholder="+261 3X XX XXX XX" autoComplete="tel" />
          </div>
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input required id="email" type="email" name="email" placeholder="jean@email.com" autoComplete="email" />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="cvUrl" optional>Lien vers votre CV</FieldLabel>
          <Input
            id="cvUrl"
            type="url"
            name="cvUrl"
            placeholder="https://drive.google.com/... ou linkedin.com/in/..."
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="message" optional>Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Quelques mots sur votre parcours et votre motivation…"
            className="resize-none"
          />
        </div>

        <div className="pt-2">
          <SubmitButton />
        </div>

        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-emerald-500" />
          Réponse sous 72h · Données protégées
        </p>
      </form>
    </FormCard>
  );
}
