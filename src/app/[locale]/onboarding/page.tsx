import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { OnboardingWizard } from "~/components/OnboardingWizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.onboarding" });
  return { title: t("title"), description: t("description") };
}

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
