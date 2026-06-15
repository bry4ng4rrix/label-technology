"use server";

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

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "site@labeltechnology.mg",
        to: "contact@labeltechnology.mg",
        subject: `Nouveau message de ${name} — ${service || "Non précisé"}`,
        text: `Nom: ${name}\nEntreprise: ${company}\nEmail: ${email}\nService: ${service}\n\n${message}`,
      });
    } catch {
      return { status: "error", message: "Erreur lors de l'envoi. Veuillez réessayer ou nous appeler directement." };
    }
  }

  return {
    status: "success",
    message: "Votre message a bien été envoyé. Un expert vous répond sous 24h.",
  };
}
