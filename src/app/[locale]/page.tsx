import { getLocale } from "next-intl/server";
import { Header } from "~/components/Header";
import { HeroSection } from "~/components/HeroSection";
import { FeaturesSection } from "~/components/FeaturesSection";
import { QuoteSection } from "~/components/QuoteSection";
import { Footer } from "~/components/Footer";
import { BASE_URL } from "~/lib/constants";

export default async function HomePage() {
  const locale = await getLocale();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "animal.ia",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      locale === "it"
        ? "Assicurazione e gestione salute per animali domestici"
        : "Pet insurance and health management",
    contactPoint: {
      "@type": "ContactPoint",
      email: "supporto@animal.ia",
      contactType: "customer service",
      availableLanguage: ["Italian", "English"],
    },
  };

  const insuranceProductJsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceProduct" as const,
    name: locale === "it" ? "Assicurazione Animali Domestici" : "Pet Insurance",
    description:
      locale === "it"
        ? "Polizza assicurativa per cani e gatti con copertura infortuni, malattie, chirurgia e assistenza 24/7."
        : "Insurance policy for dogs and cats covering accidents, illness, surgery, and 24/7 support.",
    provider: { "@type": "Organization", name: "animal.ia" },
    url: BASE_URL,
    category:
      locale === "it" ? "Assicurazione animali" : "Pet insurance",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "9.99",
      highPrice: "39.99",
      offerCount: "3",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(insuranceProductJsonLd),
        }}
      />
      <Header />
      <main id="main" className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
