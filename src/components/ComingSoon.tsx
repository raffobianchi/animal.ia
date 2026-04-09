"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

type Section = "blog" | "shop" | "vet";

export function ComingSoon({ section }: { section: Section }) {
  const t = useTranslations("comingSoon");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <span className="mb-8 text-[8rem] leading-none" aria-hidden="true">
        🦒
      </span>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
        {t(`${section}.title`)}
      </h1>
      <p className="mb-2 text-2xl font-semibold text-giraffe">{t("subtitle")}</p>
      <p className="mb-10 max-w-md text-lg text-muted-foreground">
        {t("description")}
      </p>
      <Link
        href={`/${locale}`}
        className="rounded-full bg-warm px-8 py-4 text-base font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02]"
      >
        {t("cta")} →
      </Link>
    </div>
  );
}
