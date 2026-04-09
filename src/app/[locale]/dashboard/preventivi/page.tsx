import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getQuotes } from "~/lib/queries";
import { btnPrimary, dashContainer, dashPage } from "~/lib/ui";

type Props = { params: Promise<{ locale: string }> };

export default async function PreventiviPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("dashboard.preventivi");
  const tb = await getTranslations("quote");
  const quotes = await getQuotes();

  return (
    <div className={dashPage}>
      <div className={dashContainer}>
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link href={`/${locale}/dashboard/preventivi/new`} className={btnPrimary}>
            + {t("new")}
          </Link>
        </div>

        {quotes.length === 0 ? (
          <div className="rounded-3xl border border-border/60 bg-card p-12 text-center">
            <p className="mb-2 text-3xl">💰</p>
            <p className="mb-4 text-lg text-muted-foreground">{t("empty")}</p>
            <Link href={`/${locale}/dashboard/preventivi/new`} className={btnPrimary}>
              {t("emptyCta")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quotes.map((q) => (
              <Link
                key={q.id}
                href={`/${locale}/dashboard/preventivi/${q.id}`}
                className="group rounded-3xl border border-border/60 bg-card p-7 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="text-3xl font-bold tracking-tight text-warm">
                    &euro;{q.monthlyPremium.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">{t("perMonth")}</span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    {q.species === "dog" ? "🐶" : "🐱"}{" "}
                    {tb(`breeds.${q.breedId}`)} &middot;{" "}
                    {tb(`regions.${q.region}`)}
                  </p>
                  <p>
                    {t("createdAt")} {q.createdAt.toISOString().slice(0, 10)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
