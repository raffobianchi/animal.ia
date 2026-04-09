import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getQuote } from "~/lib/queries";
import { dashPage } from "~/lib/ui";
import type { QuoteBreakdown } from "~/data/pricing";
import { healthClass } from "~/data/pricing";
import { QuoteDetailActions } from "./actions-client";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function QuoteDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const t = await getTranslations("dashboard.preventivi");
  const tq = await getTranslations("quote");
  const quote = await getQuote(id);
  if (!quote) notFound();

  const breakdown: QuoteBreakdown = JSON.parse(quote.breakdownJson);
  const hClass = healthClass(breakdown.healthMult);

  const rows = [
    { label: tq("result.rowSpecies"), value: tq(`step1.species${breakdown.species === "dog" ? "Dog" : "Cat"}`) },
    { label: tq("result.rowGender"), value: tq(`step1.gender${breakdown.gender === "male" ? "Male" : "Female"}`) },
    { label: tq("result.rowStage"), value: tq(`stage.${breakdown.stage}`) },
    { label: tq("result.rowArea"), value: tq(`area.${breakdown.area}`) },
    { label: tq("result.rowBreedRisk"), value: tq(`breedRisk.${breakdown.breedRisk}`) },
    { label: tq("result.rowHealth"), value: tq(`health.${hClass}`) },
    { label: tq("result.rowAnnual"), value: `\u20AC${breakdown.finalAnnual.toFixed(2)}` },
  ];

  return (
    <div className={dashPage}>
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/${locale}/dashboard/preventivi`}
          className="mb-8 inline-flex items-center gap-2 text-base font-medium text-muted-foreground transition-colors hover:text-warm"
        >
          &larr; {t("back")}
        </Link>

        {/* Price header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {tq("result.title")}
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-7xl font-bold tracking-tight text-warm md:text-8xl">
              &euro;{breakdown.finalMonthly.toFixed(2)}
            </span>
            <span className="text-2xl text-muted-foreground">{tq("result.perMonth")}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            &euro;{breakdown.finalAnnual.toFixed(2)} {tq("result.perYear")} &middot;{" "}
            {tq("result.includes")}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {t("createdAt")} {quote.createdAt.toISOString().slice(0, 10)}
          </p>
        </div>

        {/* Breakdown */}
        <div className="mb-10 rounded-3xl border border-border/60 bg-card p-8">
          <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("breakdown")}
          </p>
          <dl className="space-y-4">
            {rows.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-4">
                <dt className="text-base text-muted-foreground">{r.label}</dt>
                <dd className="text-lg font-semibold text-warm">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Actions */}
        <QuoteDetailActions
          quoteData={{
            form: {
              species: quote.species as "dog" | "cat",
              gender: quote.gender as "male" | "female",
              breedId: quote.breedId,
              ageYears: quote.ageYears,
              region: quote.region,
            },
            quote: breakdown,
          }}
          locale={locale}
          activateLabel={t("activate")}
          printLabel={t("print")}
        />

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {tq("result.disclaimer")}
        </p>
      </div>
    </div>
  );
}
