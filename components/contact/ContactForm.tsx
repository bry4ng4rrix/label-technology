"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Send, Loader2 } from "lucide-react";

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-11 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 rounded-lg transition-all duration-300 ease-in-out"
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
          Envoyer le message
        </>
      )}
    </Button>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className="label-tag"
      style={{ color: "var(--mid)" }}
    >
      {children}
    </Label>
  );
}

export default function ContactForm() {
  const [state, action] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return (
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16 px-8 text-center">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ backgroundColor: "rgba(30,63,171,0.08)" }}
          >
            <CheckCircle
              className="w-8 h-8"
              style={{ color: "var(--brand)" }}
            />
          </div>
          <div className="space-y-2">
            <h2
              className="font-display text-2xl"
              style={{ color: "var(--ink)" }}
            >
              Message envoyé !
            </h2>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--mid)" }}
            >
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
        {/* Header */}
        <div className="mb-8">
          <p className="label-tag mb-2" style={{ color: "var(--brand)" }}>
            Formulaire de contact
          </p>
          <h2 className="font-display text-2xl" style={{ color: "var(--ink)" }}>
            Parlons de votre projet
          </h2>
        </div>

        {/* Error banner */}
        {state.status === "error" && (
          <div
            className="flex items-start gap-3 mb-6 p-4 rounded-lg text-sm"
            style={{
              backgroundColor: "rgba(255,77,109,0.06)",
              color: "#dc2626",
            }}
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        <form action={action} className="space-y-5">
          {/* Nom & Entreprise */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="name">Prénom &amp; Nom *</FieldLabel>
              <Input
                required
                id="name"
                type="text"
                name="name"
                placeholder="Jean Dupont"
                className="h-10 bg-[var(--paper)] border-transparent focus-visible:border-[var(--brand)] focus-visible:ring-[var(--brand)]/20 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <FieldLabel htmlFor="company">Entreprise</FieldLabel>
              <Input
                id="company"
                type="text"
                name="company"
                placeholder="Votre société"
                className="h-10 bg-[var(--paper)] border-transparent focus-visible:border-[var(--brand)] focus-visible:ring-[var(--brand)]/20 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <FieldLabel htmlFor="email">Email professionnel *</FieldLabel>
            <Input
              required
              id="email"
              type="email"
              name="email"
              placeholder="jean@entreprise.com"
              className="h-10 bg-[var(--paper)] border-transparent focus-visible:border-[var(--brand)] focus-visible:ring-[var(--brand)]/20 transition-colors"
            />
          </div>

          {/* Service */}
          <div className="space-y-1.5">
            <FieldLabel htmlFor="service">Service concerné</FieldLabel>
            <Select name="service">
              <SelectTrigger
                id="service"
                className="h-10 bg-[var(--paper)] border-transparent focus:border-[var(--brand)] focus:ring-[var(--brand)]/20 transition-colors"
              >
                <SelectValue placeholder="Choisir un service…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Call Center">Call Center</SelectItem>
                <SelectItem value="Développement Web & Mobile">
                  Développement Web &amp; Mobile
                </SelectItem>
                <SelectItem value="Marketing Digital">
                  Marketing Digital
                </SelectItem>
                <SelectItem value="Digitalisation">
                  Digitalisation &amp; ERP
                </SelectItem>
                <SelectItem value="Traitement de données">
                  Traitement de données
                </SelectItem>
                <SelectItem value="Matériel informatique">
                  Matériel informatique
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <FieldLabel htmlFor="message">Votre message *</FieldLabel>
            <Textarea
              required
              id="message"
              name="message"
              rows={5}
              placeholder="Décrivez votre projet ou votre besoin…"
              className="resize-none bg-[var(--paper)] border-transparent focus-visible:border-[var(--brand)] focus-visible:ring-[var(--brand)]/20 transition-colors"
            />
          </div>

          {/* Séparateur discret */}
          <div className="pt-1">
            <SubmitButton />
          </div>

          <p className="text-center text-xs" style={{ color: "var(--mid)" }}>
            Réponse sous 24h · Données protégées
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
