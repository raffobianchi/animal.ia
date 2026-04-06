"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Separator } from "~/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <footer className="border-t border-border bg-warm px-4 py-12 text-cream">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦒</span>
            <span className="text-xl font-bold">
              animal<span className="text-giraffe">.ia</span>
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-cream/70">
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

        <Separator className="my-6 bg-cream/10" />

        <p className="text-center text-sm text-cream/50">
          © {new Date().getFullYear()} animal.ia — {t("rights")}
        </p>
      </div>
    </footer>
  );
}
