"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/setting/actions/auth";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import {
  LayoutDashboard,
  Boxes,
  Briefcase,
  Users,
  Newspaper,
  MessageSquareQuote,
  Settings2,
  Inbox,
  LogOut,
  ExternalLink,
} from "lucide-react";

const NAV = [
  { href: "/setting", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/setting/services", label: "Services", icon: Boxes },
  { href: "/setting/projects", label: "Projets", icon: Briefcase },
  { href: "/setting/jobs", label: "Offres d'emploi", icon: Users },
  { href: "/setting/jobs/candidatures", label: "Candidatures", icon: Inbox },
  { href: "/setting/blog", label: "Blog", icon: Newspaper },
  { href: "/setting/testimonials", label: "Témoignages", icon: MessageSquareQuote },
  { href: "/setting/content", label: "Contenu", icon: Settings2 },
] as const;

function isMatch(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const activeHref = NAV.filter((item) =>
    isMatch(pathname, item.href, "exact" in item ? item.exact : false)
  ).sort(
    (a, b) => b.href.length - a.href.length
  )[0]?.href;

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r bg-card">
      <div className="flex items-center justify-between gap-2 border-b p-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            LT
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Label Technology</p>
            <p className="text-xs text-muted-foreground">Administration</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV.map((item) => {
          const active = item.href === activeHref;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 border-t p-3">
        <Button variant="ghost" className="w-full justify-start gap-2.5 text-sm font-medium" asChild>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Voir le site
          </a>
        </Button>
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </form>
      </div>
    </aside>
  );
}
