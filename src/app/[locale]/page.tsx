import { Header } from "~/components/Header";
import { HeroSection } from "~/components/HeroSection";
import { FeaturesSection } from "~/components/FeaturesSection";
import { QuoteSection } from "~/components/QuoteSection";
import { Footer } from "~/components/Footer";

export default function HomePage() {
  return (
    <>
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
