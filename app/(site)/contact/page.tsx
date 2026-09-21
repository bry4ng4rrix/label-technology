import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Contact — Démarrez votre projet avec Label Technology",
  description:
    "Contactez Label Technology pour démarrer votre projet. Développement web, marketing digital, ERP. Réponse sous 72h. Antananarivo, Madagascar.",
  keywords: [
    "contact Label Technology",
    "devis Label Technology",
    "devis développement web Madagascar",
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

const INFOS = [
  {
    icon: MapPin,
    label: "Adresse",
    content: "Akany Riandrano, Manajak Ilafy\nAntananarivo Avaradrano, Madagascar",
  },
  { icon: Phone, label: "Téléphone", href: "tel:+261340503129", linkText: "+261 34 05 031 29" },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:contact@labeltechnology.mg",
    linkText: "contact@labeltechnology.mg",
  },
  { icon: Clock, label: "Horaires", content: "Lun–Ven : 08h00 – 18h00 (UTC+3)" },
];

export default function ContactPage() {
  return (
    <main>
      <section className="surface-light relative min-h-screen overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
        <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-60" />
        <div
          aria-hidden
          className="halo -top-32 right-0 -z-10 h-[420px] w-[560px] bg-brand-lt/15"
        />

        <div className="container-x">
          <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Colonne gauche */}
            <div>
              <Reveal>
                <p className="label-tag mb-5 inline-flex items-center gap-2.5 text-brand">
                  <span className="h-px w-6 bg-brand/60" />
                  Contact
                </p>
                <h1 className="h1-display text-foreground">
                  Parlons de
                  <br />
                  <span className="gradient-text">votre projet.</span>
                </h1>
                <p className="lead mt-6 max-w-md text-muted-foreground">
                  Décrivez-nous votre besoin. Un expert vous répond sous 72h avec
                  une proposition concrète — pas un formulaire générique.
                </p>
              </Reveal>

              <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {INFOS.map((item, i) => (
                  <Reveal key={item.label} delay={0.12 + i * 0.07}>
                    <li className="card-premium flex items-start gap-4 p-4 hover:translate-y-0">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/8 text-brand">
                        <item.icon className="size-4.5" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <p className="label-tag mb-1 text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                          >
                            {item.linkText}
                          </a>
                        ) : (
                          <p className="text-sm whitespace-pre-line text-foreground/85">
                            {item.content}
                          </p>
                        )}
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Formulaire */}
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
