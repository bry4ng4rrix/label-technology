import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Contact — Démarrez votre projet avec Label Technology",
  description:
    "Contactez Label Technology pour démarrer votre projet. Développement web, call center, marketing digital, ERP. Réponse sous 72h. Antananarivo, Madagascar.",
  keywords: [
    "contact Label Technology",
    "devis Label Technology",
    "devis développement web Madagascar",
    "devis call center Madagascar",
    "devis marketing digital Madagascar",
    "devis ERP Madagascar",
    "devis externalisation Madagascar",
    "contacter agence web Madagascar",
    "demande de projet Madagascar",
    "devis gratuit informatique Madagascar",
    "Label Technology Antananarivo",
    "contact@labeltechnology.mg",
  ],
  alternates: {
    canonical: "https://labeltechnology.mg/contact",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/contact",
    siteName: "Label Technology",
    title: "Contact — Démarrez votre projet avec Label Technology",
    description:
      "Contactez Label Technology pour démarrer votre projet. Réponse sous 72h. Antananarivo, Madagascar.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Label Technology",
    description:
      "Contactez-nous pour votre projet tech. Réponse sous 72h. Antananarivo, Madagascar.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <main>
      <section className="min-h-screen px-6 pt-28 pb-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div>
              <Reveal>
                <p className="label-tag mb-4" style={{ color: "var(--brand)" }}>CONTACT</p>
                <h1 className="font-display text-5xl md:text-6xl mb-6 leading-tight text-foreground">
                  Parlons de<br />votre projet.
                </h1>
                <p className="text-base font-light leading-relaxed mb-12 text-muted-foreground">
                  Décrivez-nous votre besoin. Un expert vous répond sous 72h avec
                  une proposition concrète — pas un formulaire générique.
                </p>
              </Reveal>

              <div className="space-y-6">
                {[
                  { icon: "📍", label: "Adresse", content: "Akany Riandrano, Manajak Ilafy\nAntananarivo Avaradrano, Madagascar" },
                  { icon: "📞", label: "Téléphone", href: "tel:+261340503129", linkText: "+261 34 05 031 29" },
                  { icon: "✉️", label: "Email", href: "mailto:contact@labeltechnology.mg", linkText: "contact@labeltechnology.mg" },
                  { icon: "🕐", label: "Horaires", content: "Lun–Ven : 08h00 – 18h00 (UTC+3)\nCall Center : 24h/24, 7j/7" },
                ].map((item, i) => (
                  <Reveal key={item.label} delay={0.15 + i * 0.08} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-medium text-sm mb-1 text-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-light hover:underline" style={{ color: "var(--brand)" }}>
                          {item.linkText}
                        </a>
                      ) : (
                        <p className="text-sm font-light text-muted-foreground whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
