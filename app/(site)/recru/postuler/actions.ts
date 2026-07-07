"use server";

import { supabase } from "@/lib/supabase";

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

  const { error } = await supabase.from("job_applications").insert({
    job_offer_id: jobOfferId,
    job_title: jobTitle,
    full_name: fullName,
    email,
    phone: phone || null,
    cv_url: cvUrl || null,
    message: message || null,
    status: "nouveau",
  });

  if (error) {
    return {
      status: "error",
      message: "Erreur lors de l'envoi. Veuillez réessayer ou nous écrire directement.",
    };
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "site@labeltechnology.mg",
        to: "contact@labeltechnology.mg",
        subject: `Nouvelle candidature — ${jobTitle}`,
        text: `Candidat: ${fullName}\nEmail: ${email}\nTéléphone: ${phone || "—"}\nCV: ${cvUrl || "—"}\nOffre: ${jobTitle}\n\n${message}`,
      });
    } catch {
      // La candidature est déjà enregistrée en base ; l'email n'est qu'une notification best-effort.
    }
  }

  return {
    status: "success",
    message: "Votre candidature a bien été envoyée. Nous revenons vers vous sous 72h.",
  };
}
