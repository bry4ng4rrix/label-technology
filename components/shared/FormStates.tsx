import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** Bandeau d'erreur non anxiogène. */
export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="animate-fadein mb-6 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/6 p-4 text-sm text-destructive"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/** Écran de succès : icône, titre, message. */
export function FormSuccess({
  title,
  message,
  children,
}: {
  title: string;
  message?: string;
  children?: ReactNode;
}) {
  return (
    <div className="glass-strong animate-fadeup flex flex-col items-center gap-5 rounded-3xl px-8 py-16 text-center">
      <div className="relative flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/15 [animation-iteration-count:1]" />
        <CheckCircle2 className="size-8" strokeWidth={1.8} />
      </div>
      <div className="space-y-2">
        <h2 className="font-display text-2xl tracking-tight text-foreground">{title}</h2>
        {message && (
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
            {message}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

/** Label de champ uniforme (eyebrow discret). */
export function FieldLabel({
  htmlFor,
  children,
  optional,
  className,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
  className?: string;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className={cn("label-tag text-[11px] text-muted-foreground", className)}
    >
      {children}
      {optional && (
        <span className="ml-auto text-[10px] font-medium tracking-normal text-muted-foreground/60 normal-case">
          Optionnel
        </span>
      )}
    </Label>
  );
}

/** Conteneur de formulaire (carte de verre). */
export function FormCard({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass-strong rounded-3xl p-6 sm:p-8 lg:p-10", className)}>
      <div className="mb-8">
        {eyebrow && <p className="label-tag mb-2 text-brand">{eyebrow}</p>}
        <h2 className="font-display text-2xl tracking-tight text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}
