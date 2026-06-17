import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import ServicesGrid from "@/components/home/ServicesGrid";
import CallCenterHighlight from "@/components/home/CallCenterHighlight";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Label Technology — Votre Partenaire Technologique Premium",
  description:
    "Call center 50 postes FR/EN, développement web & mobile, marketing digital, ERP, traitement de données. Depuis Antananarivo, pour la France et l'Afrique.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Label Technology",
  url: "https://labeltechnology.mg",
  logo: "https://labeltechnology.mg/logo-seal.svg",
  description:
    "Partenaire technologique premium basé à Antananarivo, Madagascar.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Akany Riandrano, Manajak Ilafy",
    addressLocality: "Antananarivo Avaradrano",
    addressCountry: "MG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+261-34-05-031-29",
    contactType: "customer service",
    availableLanguage: ["French", "English"],
  },
  sameAs: [],
  numberOfEmployees: { "@type": "QuantitativeValue", value: 60 },
  foundingDate: "2022",
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Ticker />
      <ServicesGrid />
      <Process />
      <CallCenterHighlight />
      <Testimonials />
      <CtaSection />
    </div>
  );
}
