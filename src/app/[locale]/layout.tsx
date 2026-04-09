import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";
import itMessages from "../../../messages/it.json";
import enMessages from "../../../messages/en.json";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieBanner } from "~/components/CookieBanner";
import { ChatBot } from "~/components/ChatBot";
import "../globals.css";

const allMessages: Record<string, typeof itMessages> = { it: itMessages, en: enMessages };

const onest = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  return {
    title: {
      default: title,
      template: "%s | animal.ia",
    },
    description,
    openGraph: {
      title,
      description,
      siteName: "animal.ia",
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = allMessages[locale];

  return (
    <html
      lang={locale}
      className={`${onest.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main" className="skip-link">
            {locale === "it" ? "Salta al contenuto" : "Skip to content"}
          </a>
          {children}
          <CookieBanner />
          <ChatBot />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
