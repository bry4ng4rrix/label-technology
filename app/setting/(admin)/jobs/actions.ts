"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export type JobOfferFormState = {
  status: "idle" | "error";
  message?: string;
};

function readJobOfferFormData(formData: FormData) {
  const tag = String(formData.get("tag") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const contrat = String(formData.get("contrat") ?? "").trim();
  const lieu = String(formData.get("lieu") ?? "").trim();
  const niveau = String(formData.get("niveau") ?? "").trim();
  const desc = String(formData.get("desc") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);
  const missions = formData
    .getAll("missions")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const urgent = formData.get("urgent") === "on";
  const published = formData.get("published") === "on";

  if (!tag || !title || !contrat || !lieu || !niveau || !desc) {
    return { error: "Veuillez remplir tous les champs obligatoires." } as const;
  }

  return {
    data: {
      tag,
      title,
      contrat,
      lieu,
      niveau,
      desc,
      order: Number.isFinite(order) ? order : 0,
      missions,
      urgent,
      published,
    },
  } as const;
}

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/recru");
}

export async function createJobOffer(
  prevState: JobOfferFormState,
  formData: FormData
): Promise<JobOfferFormState> {
  await requireAdmin();

  const result = readJobOfferFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const { error } = await supabase.from("job_offers").insert(result.data);
  if (error) {
    return { status: "error", message: "Une erreur est survenue lors de la création." };
  }

  revalidatePublicPages();
  redirect("/setting/jobs");
}

export async function updateJobOffer(
  id: string,
  prevState: JobOfferFormState,
  formData: FormData
): Promise<JobOfferFormState> {
  await requireAdmin();

  const result = readJobOfferFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const { error } = await supabase.from("job_offers").update(result.data).eq("id", id);
  if (error) {
    return { status: "error", message: "Une erreur est survenue lors de la mise à jour." };
  }

  revalidatePublicPages();
  redirect("/setting/jobs");
}

export async function deleteJobOffer(id: string): Promise<void> {
  await requireAdmin();
  await supabase.from("job_offers").delete().eq("id", id);
  revalidatePublicPages();
  revalidatePath("/setting/jobs");
}
