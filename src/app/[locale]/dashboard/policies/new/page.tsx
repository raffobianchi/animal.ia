"use client";

import { useEffect, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { btnPrimary, dashPage } from "~/lib/ui";
import { completeOnboarding } from "~/lib/actions";
import type { QuoteBreakdown } from "~/data/pricing";

type StoredQuote = {
  form: {
    species: "dog" | "cat";
    breedId: string;
    ageYears: number;
    region: string;
  };
  quote: QuoteBreakdown;
};

export default function NewPolicyPage() {
  const t = useTranslations("dashboard.newPolicy");
  const tq = useTranslations("quote");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [hydrated, setHydrated] = useState(false);
  const [stored, setStored] = useState<StoredQuote | null>(null);
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const raw = sessionStorage.getItem("animalia.quote");
      if (raw) setStored(JSON.parse(raw) as StoredQuote);
    } catch {
      /* ignore */
    }
  }, []);

  function activate() {
    if (!stored) return;
    startTransition(async () => {
      await completeOnboarding({
        ownerName: "—",
        ownerEmail: "demo@animal.ia",
        petName: stored.form.breedId,
        quoteForm: stored.form,
        quote: stored.quote,
      });
      try {
        sessionStorage.removeItem("animalia.quote");
      } catch {
        /* ignore */
      }
      setDone(true);
    });
  }

  if (!hydrated) return null;

  // Done splash
  if (done) {
    return (
      <div className={`${dashPage} flex flex-1 items-center justify-center`}>
        <div className="w-full max-w-xl rounded-3xl bg-card p-12 text-center shadow-xl md:p-16">
          <div className="mb-6 text-7xl">🎉</div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("doneTitle")}
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">{t("doneSubtitle")}</p>
          <button
            type="button"
            className={btnPrimary}
            onClick={() => router.push(`/${locale}/dashboard/policies`)}
          >
            {t("goToPolicies")} →
          </button>
        </div>
      </div>
    );
  }

  // No quote — redirect to homepage
  if (!stored) {
    return (
      <div className={`${dashPage} flex flex-1 items-center justify-center`}>
        <div className="w-full max-w-xl rounded-3xl bg-card p-10 text-center shadow-xl md:p-14">
          <div className="mb-6 text-6xl">🦒</div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("noQuoteTitle")}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">{t("noQuoteSubtitle")}</p>
          <Link href={`/${locale}#quote`} className={btnPrimary}>
            {t("noQuoteCta")} →
          </Link>
        </div>
      </div>
    );
  }

  const { form, quote } = stored;

  return (
    <div className={dashPage}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          {/* Quote summary */}
          <div className="mb-8 rounded-2xl bg-secondary/40 p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("yourQuote")}
            </p>
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-warm">
                €{quote.finalMonthly.toFixed(2)}
              </span>
              <span className="text-base text-muted-foreground">/ {t("monthly")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              €{quote.finalAnnual.toFixed(2)} / {t("annual")}
            </p>
          </div>

          {/* Details */}
          <div className="mb-8 space-y-3 text-base">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{tq("result.rowSpecies")}</span>
              <span className="font-semibold text-warm">{tq(`breeds.${form.breedId}`)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{tq("result.rowArea")}</span>
              <span className="font-semibold text-warm">{tq(`regions.${form.region}`)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{tq("result.rowStage")}</span>
              <span className="font-semibold text-warm">
                {form.ageYears} {form.ageYears === 1 ? "anno" : "anni"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className={`${btnPrimary} w-full`}
            onClick={activate}
            disabled={isPending}
          >
            {isPending ? t("confirming") : `${t("confirmPay")} →`}
          </button>
        </div>
      </div>
    </div>
  );
}
