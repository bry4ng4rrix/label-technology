import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Développement Web & Mobile — Next.js, React Native, Node.js",
  description:
    "Développement web et mobile sur mesure depuis Antananarivo. Sites, applications web, mobiles, APIs. Next.js, React Native, Node.js. Standards ESN européenne. Devis gratuit en 72h.",
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
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développement Web & Mobile | Label Technology",
    description:
      "Développement web, mobile, APIs. Next.js, React Native, Node.js. Depuis Antananarivo. Devis gratuit en 72h.",
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
