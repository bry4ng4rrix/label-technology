"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "@/app/setting/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Lock } from "lucide-react";

const initialState: LoginState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full h-11">
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
    <div className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-lg">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Lock className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Administration</h1>
          <p className="text-sm text-muted-foreground">
            Label Technology — /setting
          </p>
        </div>
      </div>

      {state.status === "error" && (
        <div className="mb-5 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <form action={action} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            required
            id="password"
            name="password"
            type="password"
            autoFocus
            placeholder="••••••••"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
