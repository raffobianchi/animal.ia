"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

const plans = ["basic", "standard", "premium"] as const;

export function PricingSection() {
  const t = useTranslations("pricing");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section id="pricing" className="bg-secondary/30 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-warm md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const isPopular = plan === "standard";
            return (
              <Card
                key={plan}
                className={`relative flex flex-col ${
                  isPopular
                    ? "border-giraffe shadow-lg ring-1 ring-giraffe/20"
                    : "border-border/50"
                }`}
              >
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-giraffe text-warm">
                    {t("standard.popular")}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-warm">
                    {t(`${plan}.name`)}
                  </CardTitle>
                  <CardDescription>{t(`${plan}.description`)}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold text-warm">
                      €{t(`${plan}.price`)}
                    </span>
                    <span className="text-muted-foreground">
                      /{t("monthly")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="mb-8 flex-1 space-y-3">
                    {(
                      t.raw(`${plan}.features`) as string[]
                    ).map((feature: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 text-giraffe">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/onboarding`}
                    className={cn(
                      buttonVariants({
                        variant: isPopular ? "default" : "outline",
                      }),
                      "w-full",
                      isPopular && "bg-giraffe text-warm hover:bg-giraffe-dark"
                    )}
                  >
                    {t("cta")}
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
