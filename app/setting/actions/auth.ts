"use server";

import { timingSafeEqual } from "crypto";
import { redirect } from "next/navigation";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth";

export type LoginState = {
  status: "idle" | "error";
  message?: string;
};

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { status: "error", message: "ADMIN_PASSWORD n'est pas configuré." };
  }

  if (typeof password !== "string" || !safeCompare(password, adminPassword)) {
    return { status: "error", message: "Mot de passe incorrect." };
  }

  await setSessionCookie();
  redirect("/setting");
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect("/setting/login");
}
