"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitJobApplication, type ApplicationState } from "@/app/(site)/recru/postuler/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Send, Loader2 } from "lucide-react";

const initialState: ApplicationState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-11 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 rounded-lg"
      style={{
        backgroundColor: pending ? "var(--brand-lt)" : "var(--brand)",
        color: "var(--white)",
      }}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Envoi en cours…
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Envoyer ma candidature
        </>
      )}
    </Button>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <Label htmlFor={htmlFor} className="label-tag" style={{ color: "var(--mid)" }}>
      {children}
    </Label>
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
    return (
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16 px-8 text-center">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ backgroundColor: "rgba(30,63,171,0.08)" }}
          >
            <CheckCircle className="w-8 h-8" style={{ color: "var(--brand)" }} />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl" style={{ color: "var(--ink)" }}>
              Candidature envoyée !
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--mid)" }}>
              {state.message}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md bg-white">
      <CardContent className="p-8">
        <div className="mb-8">
          <p className="label-tag mb-2" style={{ color: "var(--brand)" }}>
            Formulaire de candidature
          </p>
          <h2 className="font-display text-2xl" style={{ color: "var(--ink)" }}>
            Postuler — {jobTitle}
          </h2>
        </div>

        {state.status === "error" && (
          <div
            className="flex items-start gap-3 mb-6 p-4 rounded-lg text-sm"
            style={{ backgroundColor: "rgba(255,77,109,0.06)", color: "#dc2626" }}
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="fullName">Prénom &amp; Nom *</FieldLabel>
              <Input
                required
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Jean Dupont"
                className="h-10 bg-[var(--paper)] border-transparent focus-visible:border-[var(--brand)] focus-visible:ring-[var(--brand)]/20 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+261 34 05 031 29"
                className="h-10 bg-[var(--paper)] border-transparent focus-visible:border-[var(--brand)] focus-visible:ring-[var(--brand)]/20 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="email">Email *</FieldLabel>
            <Input
              required
              id="email"
              type="email"
              name="email"
              placeholder="jean@email.com"
              className="h-10 bg-[var(--paper)] border-transparent focus-visible:border-[var(--brand)] focus-visible:ring-[var(--brand)]/20 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="cvUrl">Lien vers votre CV</FieldLabel>
            <Input
              id="cvUrl"
              type="url"
              name="cvUrl"
              placeholder="https://drive.google.com/... ou linkedin.com/in/..."
              className="h-10 bg-[var(--paper)] border-transparent focus-visible:border-[var(--brand)] focus-visible:ring-[var(--brand)]/20 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Quelques mots sur votre parcours et votre motivation…"
              className="resize-none bg-[var(--paper)] border-transparent focus-visible:border-[var(--brand)] focus-visible:ring-[var(--brand)]/20 transition-colors"
            />
          </div>

          <div className="pt-1">
            <SubmitButton />
          </div>

          <p className="text-center text-xs" style={{ color: "var(--mid)" }}>
            Réponse sous 72h · Données protégées
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
