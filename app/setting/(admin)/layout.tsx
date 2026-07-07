import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logout } from "@/app/setting/actions/auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Boxes,
  Briefcase,
  Users,
  Newspaper,
  MessageSquareQuote,
  Settings2,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/setting", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/setting/services", label: "Services", icon: Boxes },
  { href: "/setting/projects", label: "Projets", icon: Briefcase },
  { href: "/setting/jobs", label: "Emplois", icon: Users },
  { href: "/setting/blog", label: "Blog", icon: Newspaper },
  { href: "/setting/testimonials", label: "Témoignages", icon: MessageSquareQuote },
  { href: "/setting/content", label: "Contenu", icon: Settings2 },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await getSession())) {
    redirect("/setting/login");
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="flex w-60 shrink-0 flex-col border-r bg-card">
        <div className="border-b p-5">
          <p className="text-sm font-semibold">Label Technology</p>
          <p className="text-xs text-muted-foreground">Administration</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-3">
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start gap-2.5 text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
