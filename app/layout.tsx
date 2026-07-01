import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const rytech = localFont({
  src: "../public/fonts/Rytech.ttf",
  variable: "--font-rytech",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Label Technology — Partenaire Technologique Premium | Antananarivo",
    template: "%s | Label Technology",
  },
  description:
    "Label Technology : développement web & mobile, call center 50 postes FR/EN, marketing digital, digitalisation, traitement de données. Depuis Antananarivo, pour la France et l'Afrique.",
  keywords: [
    "Label Technology",
    "call center Madagascar",
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
    "call center Antananarivo",
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
      "Développement web & mobile, call center 50 postes FR/EN, marketing digital, ERP, traitement de données. Depuis Antananarivo, avec l'exigence d'un partenaire européen.",
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
      "Call center 50P, développement web, marketing digital, ERP. Depuis Antananarivo, pour la France et l'Afrique.",
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
      className={cn(jakarta.variable, rytech.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
          storageKey="label-theme"
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
