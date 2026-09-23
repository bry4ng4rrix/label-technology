"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const LINKS = [
  { name: "Projets", href: "/projets" },
  { name: "À propos", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Recrutement", href: "/recru" },
];

const SERVICES = [
  {
    key: "dev",
    href: "/services/dev",
    labelFr: "Développement",
    labelEn: "Web & Mobile",
  },
  {
    key: "marketing",
    href: "/services/marketing",
    labelFr: "Marketing Digital",
    labelEn: "SEO, Ads, Social",
  },
  {
    key: "digital",
    href: "/services/digital",
    labelFr: "Digitalisation",
    labelEn: "ERP, SIRH, RPA",
  },
  {
    key: "data",
    href: "/services/data",
    labelFr: "Traitement de données",
    labelEn: "Saisie, Nettoyage, Analyse",
  },
  {
    key: "materiel",
    href: "/services/materiel",
    labelFr: "Matériel IT",
    labelEn: "Réseau, Postes, Serveurs",
  },
  {
    key: "comptabilite",
    href: "/services/comptabilite",
    labelFr: "Comptabilité",
    labelEn: "Saisie, Reporting",
  },
];

const CONSTRUCTION = [
  {
    key: "route",
    href: "/construction/route",
    labelFr: "Route",
    labelEn: "Travaux routiers",
  },
  {
    key: "entreprise",
    href: "/construction/entreprise",
    labelFr: "Bâtiment Entreprise",
    labelEn: "Construction commerciale & industrielle",
  },
  {
    key: "projets",
    href: "/construction/projets",
    labelFr: "Nos futurs projets",
    labelEn: "Types de projets visés",
  },
];

/* Styles partagés des déclencheurs de menu (tous les états surchargent bg-muted) */
const TRIGGER =
  "h-9 rounded-full bg-transparent px-3.5 text-[0.9rem] font-medium text-white/75 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-open:bg-white/10 data-open:text-white data-open:hover:bg-white/14 data-open:focus:bg-white/14 data-popup-open:bg-white/10 data-popup-open:text-white data-popup-open:hover:bg-white/14";

const CONTENT =
  "group-data-[viewport=false]/navigation-menu:mt-3 group-data-[viewport=false]/navigation-menu:rounded-2xl group-data-[viewport=false]/navigation-menu:bg-ink-2 group-data-[viewport=false]/navigation-menu:text-white group-data-[viewport=false]/navigation-menu:shadow-xl group-data-[viewport=false]/navigation-menu:ring-white/10";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque navigation
  useEffect(() => setOpen(false), [pathname]);

  const servicesActive = isActive(pathname, "/services");
  const constructionActive = isActive(pathname, "/construction");

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div className="container-x relative flex h-16 items-center justify-between rounded-2xl">
        {/* Fond de verre : couche séparée pour que les menus déroulants
            (descendants) ne soient pas affectés par le backdrop-filter. */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 ease-out",
            scrolled
              ? "border-white/12 bg-ink/88 shadow-[0_1px_0_rgb(255_255_255/0.06)_inset,0_16px_40px_-16px_rgb(0_0_0/0.55)] backdrop-blur-xl"
              : "border-white/8 bg-ink/72 shadow-[0_1px_0_rgb(255_255_255/0.05)_inset] backdrop-blur-lg",
          )}
        />
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 rounded-full py-1 pr-2 focus-visible:ring-3 focus-visible:ring-white/30 focus-visible:outline-none"
          aria-label="Label Technology — Accueil"
        >
          <Image
            src="/images/logo_dark.png"
            alt=""
            width={200}
            height={133}
            className="h-9 w-auto rounded-md mix-blend-screen transition-transform duration-300 group-hover:scale-105"
            loading="eager"
            priority
          />
          <span className="font-display text-[1.05rem] font-semibold tracking-tight text-white">
            Label <span className="text-brand-glow">Technology</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(TRIGGER, servicesActive && "text-white")}
                >
                  Services IT
                </NavigationMenuTrigger>
                <NavigationMenuContent className={CONTENT}>
                  <MegaMenu
                    title="Services IT"
                    subtitle="Six expertises, une seule équipe."
                    items={SERVICES}
                    footer={{
                      href: "/services",
                      label: "Voir tous les services",
                    }}
                    pathname={pathname}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* genie civil  */}
          {/* 
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(TRIGGER, constructionActive && "text-white")}
                >
                  Génie Civil
                </NavigationMenuTrigger>
                <NavigationMenuContent className={CONTENT}>
                  <MegaMenu
                    title="Construction & Génie Civil"
                    subtitle="Nouvelle activité."
                    items={CONSTRUCTION}
                    footer={{ href: "/construction", label: "Découvrir l'activité" }}
                    pathname={pathname}
                    compact
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}

          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-9 items-center rounded-full px-3.5 text-[0.9rem] font-medium transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:ring-3 focus-visible:ring-white/30 focus-visible:outline-none",
                  active ? "text-white" : "text-white/75",
                )}
              >
                {link.name}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-glow transition-all duration-300",
                    active ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild size="default" className="rounded-full pl-5">
            <Link href="/contact">
              Démarrer un projet
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white/85 hover:bg-white/10 hover:text-white"
                aria-label="Ouvrir le menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[86vw] max-w-sm border-white/10 bg-ink/95 p-0 text-white backdrop-blur-2xl"
            >
              <SheetHeader className="flex-row items-center justify-between border-b border-white/8 px-5 py-3">
                <SheetTitle className="text-left font-display text-base text-white">
                  Label <span className="text-brand-glow">Technology</span>
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                  aria-label="Fermer le menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-4" />
                </Button>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-3 py-4">
                <MobileGroup
                  label="Services IT"
                  items={SERVICES}
                  pathname={pathname}
                />
                <Separator className="my-3 bg-white/8" />
                <MobileGroup
                  label="Construction & Génie Civil"
                  badge="Nouveau"
                  items={CONSTRUCTION}
                  pathname={pathname}
                />
                <Separator className="my-3 bg-white/8" />
                <div className="flex flex-col gap-0.5">
                  {LINKS.map((link) => {
                    const active = isActive(pathname, link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex h-12 items-center justify-between rounded-xl px-3 text-[15px] font-medium transition-colors",
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/80 hover:bg-white/8 hover:text-white",
                        )}
                      >
                        {link.name}
                        <ArrowUpRight className="size-4 text-white/35" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/8 p-4">
                <Button asChild size="lg" className="w-full rounded-xl">
                  <Link href="/contact">
                    Démarrer un projet
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

/* ------------------------------------------------------------------------ */

type MenuItem = { key: string; href: string; labelFr: string; labelEn: string };

function MegaMenu({
  title,
  subtitle,
  items,
  footer,
  pathname,
  compact,
}: {
  title: string;
  subtitle: string;
  items: MenuItem[];
  footer: { href: string; label: string };
  pathname: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn("w-[440px] p-2", !compact && "md:w-[560px] lg:w-[640px]")}
    >
      <div className="flex items-baseline justify-between px-3 pt-2 pb-1">
        <p className="label-tag text-brand-glow">{title}</p>
        <p className="text-xs text-white/55">{subtitle}</p>
      </div>
      <ul className={cn("grid gap-1 p-1", !compact && "md:grid-cols-2")}>
        {items.map((item) => (
          <ListItem
            key={item.key}
            title={item.labelFr}
            href={item.href}
            active={isActive(pathname, item.href)}
          >
            {item.labelEn}
          </ListItem>
        ))}
      </ul>
      <div className="mt-1 border-t border-white/8 px-3 py-2.5">
        <NavigationMenuLink
          asChild
          className="link-arrow w-fit rounded-md p-0 text-sm text-white/70 hover:bg-transparent hover:text-white focus:bg-transparent"
        >
          <Link href={footer.href}>
            {footer.label}
            <ArrowRight className="size-3.5" />
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  active,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; active?: boolean }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        asChild
        className={cn(
          "group/item block rounded-xl p-3 transition-colors duration-200 hover:bg-white/8 focus:bg-white/8 in-data-[slot=navigation-menu-content]:rounded-xl",
          active && "bg-white/6",
        )}
      >
        <Link href={href} aria-current={active ? "page" : undefined}>
          <div className="mb-1 flex items-center gap-2">
            <span
              className={cn(
                "size-1.5 rounded-full transition-colors",
                active
                  ? "bg-brand-glow"
                  : "bg-white/20 group-hover/item:bg-brand-glow",
              )}
            />
            <span className="text-sm font-semibold text-white">{title}</span>
          </div>
          <p className="pl-3.5 text-xs leading-snug text-white/50">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function MobileGroup({
  label,
  badge,
  items,
  pathname,
}: {
  label: string;
  badge?: string;
  items: MenuItem[];
  pathname: string;
}) {
  return (
    <div>
      <p className="label-tag mb-2 flex items-center gap-2 px-3 text-white/55">
        {label}
        {badge && (
          <span className="rounded-full bg-brand-lt/25 px-2 py-0.5 text-[10px] tracking-normal text-brand-glow normal-case">
            {badge}
          </span>
        )}
      </p>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col justify-center gap-0.5 rounded-xl px-3 py-2.5 transition-colors",
                active ? "bg-white/10" : "hover:bg-white/8",
              )}
            >
              <span className="text-[15px] font-medium text-white">
                {item.labelFr}
              </span>
              <span className="text-xs text-white/45">{item.labelEn}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
