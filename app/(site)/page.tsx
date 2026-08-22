import type { Metadata } from "next";
import HeroSplit from "@/components/home/HeroSplit";
import Ticker from "@/components/home/Ticker";
import ServicesGrid from "@/components/home/ServicesGrid";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Label Technology — Votre Partenaire Technologique Premium",
  description:
    "Développement web & mobile, marketing digital, ERP, traitement de données. Depuis Antananarivo, pour la France et l'Afrique.",
  keywords: [
    "Label Technology",
    "Label Technologie",
    "Label Technologie Madagascar",
    "Label Technologie Antananarivo",
    "Label Technologie Ilafy",
    "Label Technologie Developpement web",
    "Label Technologie Developpeur",
    "Label Technologie Developpeur web",
    "Label Technologie Bryan",
    "Label Technologie Bryan Garrix",
    "Label Technologie Andry",
    "Label Technologie Oswald",
    "partenaire technologique Madagascar",
    "développement web Antananarivo",
    "agence web Madagascar",
    "BPO Madagascar",
    "outsourcing informatique Madagascar",
    "marketing digital Antananarivo",
    "ERP Madagascar",
    "traitement données Madagascar",
    "externalisation services France Madagascar",
    "société informatique Madagascar",
    "prestataire IT Madagascar",
    "développement application Madagascar",
  ],
  alternates: {
    canonical: "https://labeltechnology.mg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg",
    siteName: "Label Technology",
    title: "Label Technology — Votre Partenaire Technologique Premium",
    description:
      "Développement web & mobile, marketing digital, ERP, traitement de données. Depuis Antananarivo, pour la France et l'Afrique.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Label Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Label Technology — Votre Partenaire Technologique Premium",
    description:
      "Développement web, marketing digital, ERP. Depuis Antananarivo, pour la France et l'Afrique.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Label Technology",
  url: "https://labeltechnology.mg",
  logo: "https://labeltechnology.mg/logo-seal.svg",
  description:
    "Partenaire technologique premium basé à Antananarivo, Madagascar. Développement web & mobile, marketing digital, ERP, traitement de données, comptabilité externalisée.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Akany Riandrano, Manajak Ilafy",
    addressLocality: "Antananarivo Avaradrano",
    addressRegion: "Analamanga",
    addressCountry: "MG",
    postalCode: "101",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+261-34-05-031-29",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
      areaServed: ["MG", "FR", "BE", "CH"],
    },
    {
      "@type": "ContactPoint",
      email: "contact@labeltechnology.mg",
      contactType: "sales",
      availableLanguage: ["French", "English"],
    },
  ],
  sameAs: [],
  numberOfEmployees: { "@type": "QuantitativeValue", value: 60 },
  foundingDate: "2022",
  knowsAbout: [
    "Développement web",
    "Développement mobile",
    "Marketing digital",
    "SEO",
    "ERP Odoo",
    "SIRH",
    "Traitement de données",
    "BPO",
    "Externalisation",
    "Comptabilité externalisée",
    "Matériel informatique",
  ],
  areaServed: [
    { "@type": "Country", name: "Madagascar" },
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Belgique" },
    { "@type": "Country", name: "Suisse" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Label Technology",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Développement Web & Mobile",
          url: "https://labeltechnology.mg/services/dev",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Marketing Digital",
          url: "https://labeltechnology.mg/services/marketing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digitalisation & ERP",
          url: "https://labeltechnology.mg/services/digital",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Traitement de Données",
          url: "https://labeltechnology.mg/services/data",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Matériel Informatique",
          url: "https://labeltechnology.mg/services/materiel",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Comptabilité & Reporting",
          url: "https://labeltechnology.mg/services/comptabilite",
        },
      },
    ],
  },
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSplit />
      <Ticker />
      <ServicesGrid />
      <Process />
      <Testimonials />
      <CtaSection />
    </div>
  );
}
