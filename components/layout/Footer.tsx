import Image from "next/image";
import Link from "next/link";

const LINKS = {
  Services: [
    { label: "Développement Web & Mobile", href: "/services/dev" },
    { label: "Call Center 50 postes",       href: "/services/callcenter" },
    { label: "Marketing Digital",           href: "/services/marketing" },
    { label: "Digitalisation",             href: "/services/digital" },
    { label: "Traitement de données",       href: "/services/data" },
    { label: "Matériel informatique",       href: "/services/materiel" },
  ],
  Entreprise: [
    { label: "À propos",     href: "/a-propos" },
    { label: "Nos projets",  href: "/projets" },
    { label: "Blog",         href: "/blog" },
    { label: "Contact",      href: "/contact" },
    { label: "Mentions légales", href: "/mentions-legales" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--ink)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo-navbar-white.svg"
              alt="Label Technology"
              width={180}
              height={34}
              className="mb-6"
            />
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs mb-6">
              Votre partenaire technologique premium depuis Antananarivo, Madagascar.
              Développement, Call Center, Marketing, Data et Matériel IT.
            </p>
            <div className="space-y-2 text-sm text-white/30">
              <p>Akany Riandrano, Manjaka Ilafy</p>
              <p>Antananarivo Avaradrano, Madagascar</p>
              <a
                href="tel:+261340503129"
                className="block hover:text-white/60 transition-colors"
              >
                +261 34 05 031 29
              </a>
              <a
                href="mailto:contact@labeltechnology.mg"
                className="block hover:text-white/60 transition-colors"
              >
                contact@labeltechnology.mg
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <p className="label-tag text-white/30 text-[10px] mb-5">{section.toUpperCase()}</p>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/40 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-wrap items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/20 text-xs">
            © 2026 Label Technology · Consulting & Services · Antananarivo, Madagascar
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot inline-block" />
            <span className="text-white/20 text-xs ml-1">labeltechnology.mg</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
