"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function HeroSection() {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-background px-4 py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-giraffe/10" />
        <div className="absolute -left-10 top-1/2 h-48 w-48 rounded-full bg-sunset/10" />
        <div className="absolute bottom-10 right-1/4 h-32 w-32 rounded-full bg-giraffe-light/20" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 text-6xl md:text-8xl">🦒</div>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-warm md:text-6xl">
          {t("title")}
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t("subtitle")}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/onboarding`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-giraffe px-8 text-lg font-semibold text-warm hover:bg-giraffe-dark"
            )}
          >
            {t("cta")}
          </Link>
          <Link
            href={`/${locale}#pricing`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-giraffe/30 px-8 text-lg text-warm hover:bg-giraffe/5"
            )}
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
