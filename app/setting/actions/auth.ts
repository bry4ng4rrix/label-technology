"use server";

import { redirect } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth";

export type LoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const { data, error } = await apiRequest<{ token: string }>("/api/site/session", "POST", {
    password: formData.get("password"),
  });

  if (!data) {
    return { status: "error", message: error ?? "Une erreur est survenue." };
  }

  await setSessionCookie(data.token);
  redirect("/setting");
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect("/setting/login");
}
