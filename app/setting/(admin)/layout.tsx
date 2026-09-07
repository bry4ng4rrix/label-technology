import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await getSession())) {
    redirect("/setting/login");
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
