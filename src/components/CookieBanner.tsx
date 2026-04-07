"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";

const COOKIE_KEY = "animal-ia-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const params = useParams();
  const locale = (params.locale as string) ?? "it";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept(value: "all" | "essential") {
    localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] rounded-3xl border border-border/60 bg-card p-6 shadow-2xl md:bottom-8 md:left-8 md:right-auto md:max-w-md md:p-7">
      <div className="mb-5">
        <p className="mb-2 text-base font-bold text-warm">🍪 {t("title")}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("body")}{" "}
          <Link
            href={`/${locale}/cookies`}
            className="font-semibold text-warm underline hover:text-giraffe-dark"
          >
            {t("learnMore")}
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full border-2 border-warm/15 bg-card px-6 text-sm font-semibold text-warm transition-all hover:border-warm/30"
          onClick={() => accept("essential")}
        >
          {t("essential")}
        </button>
        <button
          type="button"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-warm px-6 text-sm font-semibold text-cream transition-all hover:bg-warm/90"
          onClick={() => accept("all")}
        >
          {t("acceptAll")}
        </button>
      </div>
    </div>
  );
}
