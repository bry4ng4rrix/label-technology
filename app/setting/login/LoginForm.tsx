"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "@/app/setting/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const initialState: LoginState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full rounded-xl">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connexion…
        </>
      ) : (
        "Se connecter"
      )}
    </Button>
  );
}

export default function LoginForm() {
  const [state, action] = useActionState(login, initialState);

  return (
    <div className="animate-fadeup relative w-full max-w-sm rounded-3xl border border-white/10 bg-ink-2/70 p-8 text-white shadow-2xl backdrop-blur-2xl">
      <div className="absolute top-4 right-4 [&_button]:text-white/70 [&_button:hover]:bg-white/10 [&_button:hover]:text-white">
        <ThemeToggle />
      </div>
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-brand-lt font-display text-base font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_8px_24px_-8px_rgb(46_85_212/0.8)]">
          LT
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold tracking-tight">Administration</h1>
          <p className="mt-1 text-sm text-white/50">Label Technology — /setting</p>
        </div>
      </div>

      {state.status === "error" && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <form action={action} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password" className="label-tag text-[11px] text-white/50">
            <Lock className="size-3" />
            Mot de passe
          </Label>
          <Input
            required
            id="password"
            name="password"
            type="password"
            autoFocus
            placeholder="••••••••"
            className="h-11 border-white/12 bg-white/5 text-white placeholder:text-white/30 hover:border-white/25 focus-visible:border-brand-glow focus-visible:bg-white/8 focus-visible:ring-brand-glow/25"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
