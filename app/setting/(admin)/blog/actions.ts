"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export type BlogFormState = {
  status: "idle" | "error";
  message?: string;
};

function readBlogFormData(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim();
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const readtime = String(formData.get("readtime") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!slug || !tag || !title || !excerpt || !readtime) {
    return { error: "Veuillez remplir tous les champs obligatoires." } as const;
  }

  return {
    data: {
      slug,
      tag,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
      title,
      excerpt,
      body: body || null,
      readtime,
      published,
    },
  } as const;
}

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/blog");
}

export async function createBlogPost(
  prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  await requireAdmin();

  const result = readBlogFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const { error } = await supabase.from("blog_posts").insert(result.data);
  if (error) {
    return { status: "error", message: "Ce slug est déjà utilisé par un autre article." };
  }

  revalidatePublicPages();
  redirect("/setting/blog");
}

export async function updateBlogPost(
  id: string,
  prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  await requireAdmin();

  const result = readBlogFormData(formData);
  if ("error" in result) return { status: "error", message: result.error };

  const { error } = await supabase.from("blog_posts").update(result.data).eq("id", id);
  if (error) {
    return { status: "error", message: "Ce slug est déjà utilisé par un autre article." };
  }

  revalidatePublicPages();
  redirect("/setting/blog");
}

export async function deleteBlogPost(id: string): Promise<void> {
  await requireAdmin();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePublicPages();
  revalidatePath("/setting/blog");
}
