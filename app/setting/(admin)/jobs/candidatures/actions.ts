"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { adminSend } from "@/lib/api";

export async function updateApplicationStatus(id: string, status: string): Promise<void> {
  await requireAdmin();
  const error = await adminSend(`/job-applications/${id}`, "PATCH", { status });
  if (error) throw new Error(error);
  revalidatePath("/setting/jobs/candidatures");
}

export async function deleteApplication(id: string): Promise<void> {
  await requireAdmin();
  const error = await adminSend(`/job-applications/${id}`, "DELETE");
  if (error) throw new Error(error);
  revalidatePath("/setting/jobs/candidatures");
}
