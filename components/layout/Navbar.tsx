"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu } from "lucide-react";
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

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const activeTheme = mounted ? (resolvedTheme ?? theme) : "light";

  useEffect(() => setMounted(true), []);

  const links = [
    { name: "Projets", href: "/projets" },
    { name: "À propos", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Recrutement", href: "/recru" },
  ];

  const services = [
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

  const constructionServices = [
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
      labelFr: "Projets BTP",
      labelEn: "Réalisations chantiers",
    },
  ];

  return (
    /* Pas de text-white global — le Viewport du NavigationMenu gère ses propres couleurs */
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur border-b border-white/10">
      <div className="max-w-8xl mx-auto h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src={
                activeTheme === "light"
                  ? "/images/logo_dark.png"
                  : "/images/logo_light.png"
              }
              alt="Label Technology"
              width={200}
              height={60}
              className="h-10 w-auto"
              loading="eager"
            />
            <div className=" text-white font-semibold text-xl tracking-tight">
              Label <span className="text-blue-400">Technology</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* NavigationMenu isolé — text-white explicite sur le trigger uniquement */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-md font-semibold text-white/80  hover:bg-white/10 focus:bg-white/10 data-open:bg-white/10">
                    Services IT
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-0 shadow-lg bg-slate-300/95 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-0">
                    <ul className="grid w-[420px] gap-1 p-3 md:w-[520px] md:grid-cols-2 lg:w-[640px] ">
                      {services.map((service) => (
                        <ListItem
                          key={service.key}
                          title={service.labelFr}
                          href={service.href}
                        >
                          {service.labelEn}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* constructions  */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-md -mx-7 font-semibold text-white/80  hover:bg-white/10 focus:bg-white/10 data-open:bg-white/10">
                    Genie Civil
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="border-0 shadow-lg bg-slate-300/95 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-0">
                    <ul className="grid w-[420px] gap-1 p-3 md:w-[520px] md:grid-cols-2 lg:w-[640px] ">
                      {constructionServices.map((service) => (
                        <ListItem
                          key={service.key}
                          title={service.labelFr}
                          href={service.href}
                        >
                          {service.labelEn}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-md gap-5 font-semibold space-x-10 text-white/70 hover:text-white transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              className="bg-brand hover:bg-brand-lt text-white border-0 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-brand/30"
            >
              <Link href="/contact">Démarrer un projet</Link>
            </Button>
          </div>

          {/* Mobile — Sheet */}
          <div className="md:hidden flex items-center gap-2 ">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 text-white/80 hover:text-white hover:bg-white/10"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 bg-slate-950/90 backdrop-blur-lg border-white/10 text-white"
              >
                <SheetHeader>
                  <SheetTitle className="text-left text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider px-2 mb-2">
                    Services IT
                  </p>
                  {services.map((service) => (
                    <Button
                      key={service.key}
                      variant="ghost"
                      asChild
                      className="h-12 justify-start gap-5 font-normal text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link href={service.href}>{service.labelFr}</Link>
                    </Button>
                  ))}
                  <Separator className="my-3 bg-white/10" />
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider px-2 mb-2">
                    Services Constructions
                  </p>
                  {constructionServices.map((service) => (
                    <Button
                      key={service.key}
                      variant="ghost"
                      asChild
                      className="h-12 justify-start gap-5 font-normal text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link href={service.href}>{service.labelFr}</Link>
                    </Button>
                  ))}
                  <Separator className="my-3 bg-white/10" />
                  {links.map((link) => (
                    <Button
                      key={link.name}
                      variant="ghost"
                      asChild
                      className="h-12 justify-start font-normal text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </Button>
                  ))}
                  <Separator className="my-3 bg-white/10" />
                  <Button
                    asChild
                    className="h-12 bg-brand hover:bg-brand-lt text-white mt-1 transition-all duration-200"
                  >
                    <Link href="/contact">Démarrer un projet</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

function ListItem({
  title,
  children,
  href,
  badge,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; badge?: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none rounded-md p-3 transition-colors hover:bg-accent focus:bg-accent"
        >
          <div className="flex items-center gap-2 mb-0.5">
            {/* text-foreground explicite — ne dépend pas du parent nav */}
            <span className="text-sm font-medium leading-none text-foreground">
              {title}
            </span>
            {badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500 text-white font-semibold">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default Navbar;
