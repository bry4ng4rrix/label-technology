import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

// Police d'accent pour les titres (h1/h2/CTA) — crée un vrai contraste
// hiérarchique avec le Plus Jakarta Sans utilisé pour le corps de texte.
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Label Technology — Partenaire Technologique Premium | Antananarivo",
    template: "%s | Label Technology",
  },
  description:
    "Label Technology : développement web & mobile, marketing digital, digitalisation, traitement de données. Depuis Antananarivo, pour la France et l'Afrique.",
  keywords: [
    "Label Technology",
    "développement web Madagascar",
    "agence web Madagascar",
    "marketing digital Madagascar",
    "externalisation Madagascar",
    "BPO Madagascar",
    "outsourcing Madagascar",
    "ERP Madagascar",
    "Odoo Madagascar",
    "traitement données Madagascar",
    "Antananarivo tech",
    "société informatique Antananarivo",
    "prestataire informatique Madagascar",
    "développement logiciel Madagascar",
    "externalisation France Madagascar",
    "partenaire technologique Madagascar",
    "agence digitale Antananarivo",
    "développeur web Antananarivo",
    "comptabilité externalisée Madagascar",
    "matériel informatique Antananarivo",
    "SIRH Madagascar",
    "digitalisation PME Madagascar",
    "Milson fanoela Bryan",
    "Bryan garrix",
    "fanoela Bryan",
    "garrix tech",
  ],
  authors: [{ name: "Label Technology", url: "https://labeltechnology.mg" }],
  creator: "Label Technology",
  publisher: "Label Technology",
  metadataBase: new URL("https://labeltechnology.mg"),
  alternates: {
    canonical: "https://labeltechnology.mg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg",
    siteName: "Label Technology",
    title: "Label Technology — Partenaire Technologique Premium | Antananarivo",
    description:
      "Développement web & mobile, marketing digital, ERP, traitement de données. Depuis Antananarivo, avec l'exigence d'un partenaire européen.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Label Technology — Partenaire Technologique Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Label Technology — Partenaire Technologique Premium",
    description:
      "Développement web, marketing digital, ERP. Depuis Antananarivo, pour la France et l'Afrique.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(jakarta.variable, sora.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
