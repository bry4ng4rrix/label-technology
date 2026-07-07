import { createClient } from "@supabase/supabase-js";

export type Service = {
  id: string;
  slug: string;
  order: number;
  tag: string;
  headline: string;
  headline_accent: string;
  desc: string;
  items: string[];
  featured: boolean;
  badge: string | null;
  color: string;
  icon: string;
  image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  metrics: string[];
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type JobOffer = {
  id: string;
  tag: string;
  title: string;
  contrat: string;
  lieu: string;
  niveau: string;
  desc: string;
  missions: string[];
  urgent: boolean;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  tag: string;
  published_at: string;
  title: string;
  excerpt: string;
  body: string | null;
  readtime: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  tag: string | null;
  color: string | null;
  gradient_color: string | null;
  context: string;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type JobApplication = {
  id: string;
  job_offer_id: string | null;
  job_title: string;
  full_name: string;
  email: string;
  phone: string | null;
  cv_url: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
}

// Server-only client using the service role key — bypasses RLS.
// Never import this file from a Client Component.
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

export async function countRows(table: string): Promise<number> {
  const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
  return count ?? 0;
}
