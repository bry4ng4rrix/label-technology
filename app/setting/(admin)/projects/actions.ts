"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export type ProjectFormState = {
  status: "idle" | "error";
  message?: string;
};

function readProjectFormData(formData: FormData) {
  const tag = String(formData.get("tag") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const desc = String(formData.get("desc") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);
  const metrics = formData
    .getAll("metrics")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const published = formData.get("published") === "on";

  if (!tag || !title || !desc) {
    return { error: "Veuillez remplir tous les champs obligatoires." } as const;
  }

  return {
    data: {
      tag,
      title,
      desc,
      order: Number.isFinite(order) ? order : 0,
      metrics,
      published,
    },
  } as const;
}

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/projets");
}

export async function createProject(
  prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAdmin();

  const result = readProjectFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const { error } = await supabase.from("projects").insert(result.data);
  if (error) {
    return { status: "error", message: "Une erreur est survenue lors de la création." };
  }

  revalidatePublicPages();
  redirect("/setting/projects");
}

export async function updateProject(
  id: string,
  prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAdmin();

  const result = readProjectFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const { error } = await supabase.from("projects").update(result.data).eq("id", id);
  if (error) {
    return { status: "error", message: "Une erreur est survenue lors de la mise à jour." };
  }

  revalidatePublicPages();
  redirect("/setting/projects");
}

export async function deleteProject(id: string): Promise<void> {
  await requireAdmin();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePublicPages();
  revalidatePath("/setting/projects");
}
