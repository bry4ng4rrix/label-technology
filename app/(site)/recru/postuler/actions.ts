"use server";

import { apiSend } from "@/lib/api";

export type ApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitJobApplication(
  jobOfferId: string | null,
  jobTitle: string,
  prevState: ApplicationState,
  formData: FormData
): Promise<ApplicationState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const cvUrl = String(formData.get("cvUrl") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!fullName || !email) {
    return { status: "error", message: "Veuillez remplir tous les champs obligatoires." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Adresse email invalide." };
  }

  const error = await apiSend("/api/site/job-applications", "POST", {
    job_offer_id: jobOfferId,
    job_title: jobTitle,
    full_name: fullName,
    email,
    phone: phone || null,
    cv_url: cvUrl || null,
    message: message || null,
  });

  if (error) {
    return {
      status: "error",
      message: "Erreur lors de l'envoi. Veuillez réessayer ou nous écrire directement.",
    };
  }

  return {
    status: "success",
    message: "Votre candidature a bien été envoyée. Nous revenons vers vous sous 72h.",
  };
}
