"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const otherLocale = locale === "it" ? "en" : "it";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <span className="text-3xl">🦒</span>
          <span className="text-2xl font-bold tracking-tight text-warm">
            animal<span className="text-giraffe">.ia</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href={`/${locale}#features`}
            className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("features")}
          </Link>
          <Link
            href={`/${locale}#pricing`}
            className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("pricing")}
          </Link>
          <Link
            href={`/${locale}#faq`}
            className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("faq")}
          </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={`/${otherLocale}`}
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/login`}
            className="text-base font-medium text-warm transition-colors hover:text-giraffe-dark"
          >
            {t("login")}
          </Link>
          <Link
            href={`/${locale}/onboarding`}
            className="rounded-full bg-warm px-6 py-3 text-base font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02]"
          >
            {t("signup")}
          </Link>
        </div>

        <button
          className="rounded-full p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            <Link href={`/${locale}#features`} className="text-lg font-medium text-warm" onClick={() => setMenuOpen(false)}>
              {t("features")}
            </Link>
            <Link href={`/${locale}#pricing`} className="text-lg font-medium text-warm" onClick={() => setMenuOpen(false)}>
              {t("pricing")}
            </Link>
            <Link href={`/${locale}#faq`} className="text-lg font-medium text-warm" onClick={() => setMenuOpen(false)}>
              {t("faq")}
            </Link>
            <Link href={`/${otherLocale}`} className="text-lg font-medium text-muted-foreground">
              {otherLocale.toUpperCase()}
            </Link>
            <div className="flex flex-col gap-3 pt-3">
              <Link
                href={`/${locale}/login`}
                className="rounded-full border border-border px-6 py-3.5 text-center text-base font-semibold text-warm"
              >
                {t("login")}
              </Link>
              <Link
                href={`/${locale}/onboarding`}
                className="rounded-full bg-warm px-6 py-3.5 text-center text-base font-semibold text-cream"
              >
                {t("signup")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
