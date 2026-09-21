"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/setting/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
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
  Menu,
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

function useActiveHref() {
  const pathname = usePathname();
  return NAV.filter((item) =>
    isMatch(pathname, item.href, "exact" in item ? item.exact : false),
  ).sort((a, b) => b.href.length - a.href.length)[0]?.href;
}

function Brand() {
  return (
    <Link href="/setting" className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-brand to-brand-lt text-sm font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_4px_12px_-4px_rgb(46_85_212/0.6)]">
        LT
      </div>
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-semibold tracking-tight">Label Technology</p>
        <p className="text-[11px] text-muted-foreground">Administration</p>
      </div>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const activeHref = useActiveHref();
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.map((item) => {
        const active = item.href === activeHref;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150",
              active
                ? "bg-primary/10 text-primary dark:bg-primary/15"
                : "text-foreground/70 hover:bg-muted hover:text-foreground dark:hover:bg-white/6",
            )}
          >
            <span
              className={cn(
                "absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary transition-opacity",
                active ? "opacity-100" : "opacity-0",
              )}
            />
            <item.icon
              className={cn(
                "size-4 transition-colors",
                active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function FooterActions() {
  return (
    <div className="flex flex-col gap-0.5">
      <Button variant="ghost" className="w-full justify-start gap-3 text-foreground/70" asChild>
        <a href="/" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="size-4 text-muted-foreground" />
          Voir le site
        </a>
      </Button>
      <form action={logout}>
        <Button
          type="submit"
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4" />
          Déconnexion
        </Button>
      </form>
    </div>
  );
}

/** Barre latérale (desktop) */
export default function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl lg:flex">
      <div className="flex items-center justify-between gap-2 border-b border-sidebar-border px-5 py-4">
        <Brand />
        <ThemeToggle />
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <p className="label-tag mb-2 px-3 text-muted-foreground/70">Contenu</p>
        <NavLinks />
      </div>
      <div className="border-t border-sidebar-border p-3">
        <FooterActions />
      </div>
    </aside>
  );
}

/** Barre supérieure (mobile / tablette) avec menu en tiroir */
export function AdminTopbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-sidebar-border bg-background/80 px-4 backdrop-blur-xl lg:hidden">
      <Brand />
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-xs p-0">
            <SheetHeader className="border-b px-5 py-4">
              <SheetTitle className="text-left">
                <Brand />
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-3">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
            <div className="border-t p-3">
              <FooterActions />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
