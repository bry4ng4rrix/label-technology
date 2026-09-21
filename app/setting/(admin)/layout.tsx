import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar, { AdminTopbar } from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await getSession())) {
    redirect("/setting/login");
  }

  return (
    <div className="surface-light flex min-h-screen">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
