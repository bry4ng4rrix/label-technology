import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Développement Web & Mobile — Next.js, React Native, Node.js",
  description:
    "Développement web et mobile sur mesure depuis Antananarivo. Sites, applications web, mobiles, APIs. Next.js, React Native, Node.js. Standards ESN européenne. Devis gratuit en 72h.",
  keywords: [
    "développement web Madagascar",
    "agence web Antananarivo",
    "développeur Next.js Madagascar",
    "développement application web Madagascar",
    "site internet Madagascar",
    "React Native Madagascar",
    "développement mobile Madagascar",
    "développement sur mesure Madagascar",
    "agence web pas cher qualité",
    "développeur freelance Madagascar",
    "développement logiciel Antananarivo",
    "Node.js Madagascar",
    "Python Django Madagascar",
    "e-commerce Madagascar",
    "application mobile iOS Android Madagascar",
    "API REST Madagascar",
    "Next.js React TypeScript",
    "développement SaaS Madagascar",
    "refonte site web Madagascar",
    "développeur full stack Madagascar",
  ],
  alternates: {
    canonical: "https://labeltechnology.mg/services/dev",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/services/dev",
    siteName: "Label Technology",
    title: "Développement Web & Mobile — Next.js, React Native | Label Technology",
    description:
      "Développement web et mobile sur mesure depuis Antananarivo. Sites, applications web, mobiles, APIs. Standards ESN européenne, délais startup.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Développement Web & Mobile — Label Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développement Web & Mobile | Label Technology",
    description:
      "Développement web, mobile, APIs. Next.js, React Native, Node.js. Depuis Antananarivo. Devis gratuit en 72h.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Développement Web & Mobile",
  url: "https://labeltechnology.mg/services/dev",
  description:
    "Développement de sites web, applications web et mobiles sur mesure. Technologies : Next.js, React, TypeScript, React Native, Node.js, Python, PostgreSQL.",
  provider: {
    "@type": "Organization",
    name: "Label Technology",
    url: "https://labeltechnology.mg",
  },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Belgique" },
    { "@type": "Country", name: "Madagascar" },
  ],
  serviceType: "Développement logiciel",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "800",
    description: "Projet à partir de 800€ — devis gratuit en 72h",
  },
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
