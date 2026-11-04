"use server";

import { apiSend } from "@/lib/api";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name    = formData.get("name")    as string;
  const company = formData.get("company") as string;
  const email   = formData.get("email")   as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { status: "error", message: "Veuillez remplir tous les champs obligatoires." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Adresse email invalide." };
  }

  const error = await apiSend("/api/site/contact", "POST", {
    name,
    email,
    message,
    company: company ?? "",
    service: service ?? "",
  });
  if (error) {
    return { status: "error", message: error };
  }

  return {
    status: "success",
    message: "Votre message a bien été envoyé. Un expert vous répond sous 24h.",
  };
}
