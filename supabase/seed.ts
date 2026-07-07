import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import {
  services,
  projectTagMeta,
  projects,
  jobTagMeta,
  jobOffers,
  blogPosts,
  testimonials,
} from "./seed-data";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

async function upsert(table: string, rows: Record<string, unknown>[], conflictKey: string) {
  const { error } = await supabase.from(table).upsert(rows, { onConflict: conflictKey });
  if (error) throw new Error(`Seeding "${table}" failed: ${error.message}`);
  console.log(`Seeded ${rows.length} row(s) into ${table}.`);
}

async function main() {
  await upsert("services", services, "slug");
  await upsert("tag_meta", [...projectTagMeta, ...jobTagMeta], "kind,name");
  await upsert("blog_posts", blogPosts, "slug");

  // projects, job_offers and testimonials have no natural unique key in the seed data,
  // so we only insert them if the table is currently empty (avoids duplicating on re-run).
  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });
  if (!projectCount) {
    const { error } = await supabase.from("projects").insert(projects);
    if (error) throw new Error(`Seeding "projects" failed: ${error.message}`);
    console.log(`Seeded ${projects.length} row(s) into projects.`);
  }

  const { count: jobCount } = await supabase
    .from("job_offers")
    .select("*", { count: "exact", head: true });
  if (!jobCount) {
    const { error } = await supabase.from("job_offers").insert(jobOffers);
    if (error) throw new Error(`Seeding "job_offers" failed: ${error.message}`);
    console.log(`Seeded ${jobOffers.length} row(s) into job_offers.`);
  }

  const { count: testimonialCount } = await supabase
    .from("testimonials")
    .select("*", { count: "exact", head: true });
  if (!testimonialCount) {
    const { error } = await supabase.from("testimonials").insert(testimonials);
    if (error) throw new Error(`Seeding "testimonials" failed: ${error.message}`);
    console.log(`Seeded ${testimonials.length} row(s) into testimonials.`);
  }

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
