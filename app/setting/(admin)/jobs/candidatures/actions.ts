"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function updateApplicationStatus(id: string, status: string): Promise<void> {
  await requireAdmin();
  await supabase.from("job_applications").update({ status }).eq("id", id);
  revalidatePath("/setting/jobs/candidatures");
}

export async function deleteApplication(id: string): Promise<void> {
  await requireAdmin();
  await supabase.from("job_applications").delete().eq("id", id);
  revalidatePath("/setting/jobs/candidatures");
}
