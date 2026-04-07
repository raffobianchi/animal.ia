"use client";

import { useTranslations } from "next-intl";
import { QuoteWizard } from "~/components/QuoteWizard";

export function QuoteSection() {
  const t = useTranslations("quote");

  return (
    <section id="quote" className="bg-secondary/40 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-warm md:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground md:text-2xl">
            {t("subtitle")}
          </p>
        </div>
        <QuoteWizard />
      </div>
    </section>
  );
}
