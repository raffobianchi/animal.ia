import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { ComingSoon } from "~/components/ComingSoon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.vet" });
  return { title: t("title"), description: t("description") };
}

export default function VetPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <ComingSoon section="vet" />
      </main>
      <Footer />
    </>
  );
}
