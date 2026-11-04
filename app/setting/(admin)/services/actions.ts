"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { adminSend } from "@/lib/api";

export type ServiceFormState = {
  status: "idle" | "error";
  message?: string;
};

function readServiceFormData(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim();
  const headline = String(formData.get("headline") ?? "").trim();
  const headlineAccent = String(formData.get("headlineAccent") ?? "").trim();
  const desc = String(formData.get("desc") ?? "").trim();
  const color = String(formData.get("color") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const badgeRaw = String(formData.get("badge") ?? "").trim();
  const items = formData
    .getAll("items")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  if (!slug || !tag || !headline || !desc || !color || !icon || !imageUrl) {
    return { error: "Veuillez remplir tous les champs obligatoires." } as const;
  }

  return {
    data: {
      slug,
      tag,
      headline,
      headline_accent: headlineAccent,
      desc,
      color,
      icon,
      image_url: imageUrl,
      badge: badgeRaw || null,
      items,
      featured,
      published,
    },
  } as const;
}

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/services");
}

export async function createService(
  prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAdmin();

  const result = readServiceFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const error = await adminSend("/services", "POST", result.data);
  if (error) {
    return { status: "error", message: error };
  }

  revalidatePublicPages();
  redirect("/setting/services");
}

export async function updateService(
  id: string,
  prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAdmin();

  const result = readServiceFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const error = await adminSend(`/services/${id}`, "PUT", result.data);
  if (error) {
    return { status: "error", message: error };
  }

  revalidatePublicPages();
  redirect("/setting/services");
}

export async function deleteService(id: string): Promise<void> {
  await requireAdmin();
  const error = await adminSend(`/services/${id}`, "DELETE");
  if (error) throw new Error(error);
  revalidatePublicPages();
  revalidatePath("/setting/services");
}
