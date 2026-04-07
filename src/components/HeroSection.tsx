"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

export function HeroSection() {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 md:px-10 md:pt-28 md:pb-36">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-giraffe/20 blur-3xl" />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-sunset/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-giraffe-light/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm">
            <span className="text-xl">🦒</span>
            <span className="text-sm font-medium text-warm">
              {locale === "it" ? "Assicurazione pet di nuova generazione" : "Next-gen pet insurance"}
            </span>
          </div>

          <h1 className="mx-auto mb-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-warm sm:text-6xl md:text-7xl lg:text-8xl">
            {t("title")}
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            {t("subtitle")}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/onboarding`}
              className="w-full rounded-full bg-warm px-10 py-5 text-lg font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02] sm:w-auto"
            >
              {t("cta")} →
            </Link>
            <Link
              href={`/${locale}#pricing`}
              className="w-full rounded-full border-2 border-warm/15 bg-card px-10 py-5 text-lg font-semibold text-warm transition-all hover:border-warm/30 hover:bg-card sm:w-auto"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              {locale === "it" ? "Senza pensieri" : "Hassle-free"}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡️</span>
              {locale === "it" ? "Sinistri in 5 minuti" : "Claims in 5 minutes"}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              {locale === "it" ? "Copertura completa" : "Full coverage"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
