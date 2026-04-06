"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const otherLocale = locale === "it" ? "en" : "it";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="text-2xl">🦒</span>
          <span className="text-xl font-bold text-warm">
            animal<span className="text-giraffe">.ia</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={`/${locale}#features`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("features")}
          </Link>
          <Link
            href={`/${locale}#pricing`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("pricing")}
          </Link>
          <Link
            href={`/${locale}#faq`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("faq")}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={`/${otherLocale}`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/login`}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            {t("login")}
          </Link>
          <Link
            href={`/${locale}/onboarding`}
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-giraffe text-warm hover:bg-giraffe-dark"
            )}
          >
            {t("signup")}
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href={`/${locale}#features`}
              className="text-sm text-muted-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {t("features")}
            </Link>
            <Link
              href={`/${locale}#pricing`}
              className="text-sm text-muted-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {t("pricing")}
            </Link>
            <Link
              href={`/${locale}#faq`}
              className="text-sm text-muted-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {t("faq")}
            </Link>
            <Link
              href={`/${otherLocale}`}
              className="text-sm font-medium text-muted-foreground"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <div className="flex gap-2 pt-2">
              <Link
                href={`/${locale}/login`}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                {t("login")}
              </Link>
              <Link
                href={`/${locale}/onboarding`}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "bg-giraffe text-warm hover:bg-giraffe-dark"
                )}
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
