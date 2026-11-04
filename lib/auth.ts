import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminHeaders, apiRequest, SESSION_COOKIE } from "@/lib/api";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // comme DUREE_SECONDES de backend/app/session.py

export async function getSession(): Promise<boolean> {
  const store = await cookies();
  if (!store.has(SESSION_COOKIE)) return false;
  const { error } = await apiRequest("/admin/site/session", "GET", undefined, await adminHeaders());
  return !error;
}

export async function requireAdmin(): Promise<void> {
  if (!(await getSession())) {
    redirect("/setting/login");
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
