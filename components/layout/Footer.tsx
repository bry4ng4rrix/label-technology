import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const LINKS = {
  Services: [
    { label: "Développement Web & Mobile", href: "/services/dev" },
    { label: "Marketing Digital", href: "/services/marketing" },
    { label: "Digitalisation", href: "/services/digital" },
    { label: "Traitement de données", href: "/services/data" },
    { label: "Matériel informatique", href: "/services/materiel" },
    { label: "Construction & Génie Civil", href: "/construction", badge: "Nouveau" },
  ],
  Entreprise: [
    { label: "À propos", href: "/about" },
    { label: "Nos projets", href: "/projets" },
    { label: "Blog", href: "/blog" },
    { label: "Recrutement", href: "/recru" },
    { label: "Contact", href: "/contact" },
    { label: "Mentions légales", href: "/mentions-legales" },
  ],
};

export default function Footer() {
  return (
    <footer className="surface-dark noise relative overflow-hidden text-white">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="halo -bottom-40 left-1/2 -z-10 h-[360px] w-[720px] -translate-x-1/2 bg-brand-lt/25"
      />

      <div className="container-x pt-16 pb-10 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Marque */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Accueil">
              <Image
                src="/images/logo_dark.png"
                alt=""
                width={200}
                height={133}
                className="h-10 w-auto rounded-md mix-blend-screen"
              />
              <span className="font-display text-lg font-semibold tracking-tight">
                Label <span className="text-brand-glow">Technology</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
              Votre partenaire technologique premium depuis Antananarivo,
              Madagascar. Développement, Marketing, Data et Matériel IT.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-glow" />
                <span>
                  Akany Riandrano, Manjaka Ilafy
                  <br />
                  Antananarivo Avaradrano, Madagascar
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-brand-glow" />
                <a href="tel:+261340503129" className="transition-colors hover:text-white">
                  +261 34 05 031 29
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-brand-glow" />
                <a
                  href="mailto:contact@labeltechnology.mg"
                  className="transition-colors hover:text-white"
                >
                  contact@labeltechnology.mg
                </a>
              </li>
            </ul>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-2 lg:col-start-7 lg:col-span-6">
            {Object.entries(LINKS).map(([section, items]) => (
              <div key={section}>
                <p className="label-tag mb-5 text-white/40">{section}</p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
                      >
                        <span className="relative">
                          {item.label}
                          <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-glow transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        </span>
                        {"badge" in item && item.badge && (
                          <span className="rounded-full bg-brand-lt/25 px-2 py-0.5 text-[10px] font-semibold text-brand-glow">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Label Technology · Consulting & Services · Antananarivo, Madagascar</p>
          <div className="flex items-center gap-2">
            <span className="pulse-dot inline-block size-1.5 rounded-full bg-emerald-400" />
            <span>labeltechnology.mg</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
