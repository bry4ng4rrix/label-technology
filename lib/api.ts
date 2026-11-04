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

export type SiteStats = {
  services: number;
  projects: number;
  job_offers: number;
  blog_posts: number;
  testimonials: number;
  job_applications: number;
  settings: number;
  candidatures_nouvelles: number;
  dernieres_candidatures: JobApplication[];
};

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const SESSION_COOKIE = "admin_session";

const API_URL = process.env.NEXT_PUBLIC_LAURA_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_LAURA_URL must be set.");
}

// Server-only: never import this file from a Client Component (`import type` is fine).

/** Lecture : `null` sur 404. Toute autre erreur lève, pour que Next garde la
    dernière version de la page au lieu de mettre en cache une page vide. */
export async function apiGet<T>(path: string, init?: RequestInit): Promise<T | null> {
  const res = await fetch(`${API_URL}${path}`, init);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${path} : HTTP ${res.status}`);
  return res.json();
}

/** Appel dont on veut la réponse ou le message d'erreur à afficher. */
export async function apiRequest<T>(
  path: string,
  method: Method,
  body?: unknown,
  headers?: Record<string, string>
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (res.ok) return { data: res.status === 204 ? null : await res.json(), error: null };
    const { detail } = await res.json().catch(() => ({}));
    return { data: null, error: typeof detail === "string" ? detail : "Une erreur est survenue." };
  } catch {
    return { data: null, error: "Service indisponible, veuillez réessayer." };
  }
}

/** Écriture : renvoie le message d'erreur à afficher, `null` si tout va bien. */
export const apiSend = async (...args: Parameters<typeof apiRequest>) =>
  (await apiRequest(...args)).error;

/** Le cookie de session, renvoyé tel quel à l'API : c'est elle qui le vérifie. */
export async function adminHeaders() {
  // Import dynamique : `next/headers` ne se charge pas hors de Next (lib/api.test.mjs).
  const { cookies } = await import("next/headers");
  const session = (await cookies()).get(SESSION_COOKIE)?.value ?? "";
  return { Authorization: `Bearer ${session}` };
}

export const adminGet = async <T>(path: string) =>
  apiGet<T>(`/admin/site${path}`, { headers: await adminHeaders(), cache: "no-store" });

export const adminSend = async (path: string, method: Method, body?: unknown) =>
  apiSend(`/admin/site${path}`, method, body, await adminHeaders());
