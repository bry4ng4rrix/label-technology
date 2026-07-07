"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export type TestimonialFormState = {
  status: "idle" | "error";
  message?: string;
};

function readTestimonialFormData(formData: FormData) {
  const quote = String(formData.get("quote") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim();
  const color = String(formData.get("color") ?? "").trim();
  const gradientColor = String(formData.get("gradientColor") ?? "").trim();
  const context = String(formData.get("context") ?? "home").trim();
  const order = Number(formData.get("order") ?? 0);
  const published = formData.get("published") === "on";

  if (!quote || !author || !role || !company) {
    return { error: "Veuillez remplir tous les champs obligatoires." } as const;
  }

  return {
    data: {
      quote,
      author,
      role,
      company,
      tag: tag || null,
      color: color || null,
      gradient_color: gradientColor || null,
      context: context || "home",
      order: Number.isFinite(order) ? order : 0,
      published,
    },
  } as const;
}

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/about");
}

export async function createTestimonial(
  prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();

  const result = readTestimonialFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const { error } = await supabase.from("testimonials").insert(result.data);
  if (error) {
    return { status: "error", message: "Une erreur est survenue lors de la création." };
  }

  revalidatePublicPages();
  redirect("/setting/testimonials");
}

export async function updateTestimonial(
  id: string,
  prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();

  const result = readTestimonialFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const { error } = await supabase.from("testimonials").update(result.data).eq("id", id);
  if (error) {
    return { status: "error", message: "Une erreur est survenue lors de la mise à jour." };
  }

  revalidatePublicPages();
  redirect("/setting/testimonials");
}

export async function deleteTestimonial(id: string): Promise<void> {
  await requireAdmin();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePublicPages();
  revalidatePath("/setting/testimonials");
}
