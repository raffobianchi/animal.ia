import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { OnboardingWizard } from "~/components/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <OnboardingWizard />
      </main>
      <Footer />
    </>
  );
}
