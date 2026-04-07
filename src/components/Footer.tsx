"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("common");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <footer className="bg-warm px-6 py-20 text-cream md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2.5">
              <span className="text-3xl">🦒</span>
              <span className="text-2xl font-bold tracking-tight">
                animal<span className="text-giraffe">.ia</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-lg text-cream/60">{t("tagline")}</p>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-cream/40">
              {t("product")}
            </h4>
            <nav className="flex flex-col gap-3 text-base text-cream/70">
              <Link href={`/${locale}#features`} className="hover:text-cream">
                {tn("features")}
              </Link>
              <Link href={`/${locale}#quote`} className="hover:text-cream">
                {tn("pricing")}
              </Link>
              <Link href={`/${locale}/onboarding`} className="hover:text-cream">
                {t("getStarted")}
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-cream/40">
              {t("legal")}
            </h4>
            <nav className="flex flex-col gap-3 text-base text-cream/70">
              <Link href={`/${locale}/privacy`} className="hover:text-cream">
                {t("privacy")}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-cream">
                {t("terms")}
              </Link>
              <Link href={`/${locale}/cookies`} className="hover:text-cream">
                {t("cookies")}
              </Link>
              <Link href={`/${locale}/gdpr`} className="hover:text-cream">
                {t("gdpr")}
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-cream/50">
            © {new Date().getFullYear()} animal.ia — {t("rights")}
          </p>
          <p className="text-sm text-cream/50">{tc("madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
