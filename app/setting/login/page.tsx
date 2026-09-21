import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="surface-dark noise relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden
        className="halo -top-32 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 bg-brand-lt/35"
      />
      <div
        aria-hidden
        className="halo -right-24 -bottom-24 -z-10 h-[320px] w-[420px] bg-indigo-500/20"
      />
      <LoginForm />
    </main>
  );
}
