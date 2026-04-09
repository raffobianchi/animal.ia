import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { LoginForm } from "~/components/LoginForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.login" });
  return { title: t("title"), description: t("description") };
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20 md:py-28">
        {/* Background blob */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-giraffe/20 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-sunset/15 blur-3xl" />
        </div>

        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
