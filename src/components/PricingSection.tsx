"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

const plans = ["basic", "standard", "premium"] as const;

export function PricingSection() {
  const t = useTranslations("pricing");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section id="pricing" className="bg-secondary/40 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center md:mb-20">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-warm md:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground md:text-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {plans.map((plan) => {
            const isPopular = plan === "standard";
            return (
              <div
                key={plan}
                className={`relative flex flex-col rounded-3xl p-8 transition-all md:p-10 ${
                  isPopular
                    ? "bg-warm text-cream shadow-2xl md:scale-105"
                    : "border border-border/60 bg-card hover:shadow-lg"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-giraffe px-5 py-2 text-sm font-bold text-warm">
                    ★ {t("standard.popular")}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`mb-2 text-2xl font-semibold ${isPopular ? "text-cream" : "text-warm"}`}>
                    {t(`${plan}.name`)}
                  </h3>
                  <p className={`text-base ${isPopular ? "text-cream/70" : "text-muted-foreground"}`}>
                    {t(`${plan}.description`)}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-6xl font-bold tracking-tight ${isPopular ? "text-cream" : "text-warm"}`}>
                      €{t(`${plan}.price`)}
                    </span>
                    <span className={isPopular ? "text-cream/60" : "text-muted-foreground"}>
                      /{t("monthly")}
                    </span>
                  </div>
                </div>

                <ul className="mb-10 flex-1 space-y-4">
                  {(t.raw(`${plan}.features`) as string[]).map((feature: string, i: number) => (
                    <li
                      key={i}
                      className={`flex items-start gap-3 text-base ${isPopular ? "text-cream/90" : "text-muted-foreground"}`}
                    >
                      <span className={isPopular ? "text-giraffe" : "text-giraffe-dark"}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/onboarding`}
                  className={`block rounded-full px-6 py-4 text-center text-base font-semibold transition-all ${
                    isPopular
                      ? "bg-giraffe text-warm hover:bg-giraffe-dark hover:scale-[1.02]"
                      : "bg-warm text-cream hover:bg-warm/90 hover:scale-[1.02]"
                  }`}
                >
                  {t("cta")}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
