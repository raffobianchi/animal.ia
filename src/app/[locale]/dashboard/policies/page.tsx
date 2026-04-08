import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getPrimaryPet, getActivePolicy } from "~/lib/queries";
import { btnPrimary, dashContainer, dashPage } from "~/lib/ui";

type Props = { params: Promise<{ locale: string }> };

export default async function PoliciesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("dashboard.policies");
  const pet = await getPrimaryPet();
  const policy = pet ? await getActivePolicy(pet.id) : null;
  const coverage: string[] = policy ? JSON.parse(policy.coverageJson) : [];

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
          <Link href={`/${locale}/dashboard/policies/new`} className={btnPrimary}>
            + {t("new")}
          </Link>
        </div>

        {policy && pet ? (
          <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
                  {t("plan")} {policy.plan}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("for")} {pet.name} · {pet.breed}
                </p>
              </div>
              <span className="rounded-full bg-giraffe/20 px-4 py-2 text-sm font-bold text-warm">
                ● {t("active")}
              </span>
            </div>

            <div className="mb-10 grid gap-5 sm:grid-cols-3">
              {[
                { label: t("monthlyPremium"), value: `€${policy.monthlyPremium.toFixed(2)}` },
                { label: t("startDate"), value: policy.startDate.toISOString().slice(0, 10) },
                { label: t("endDate"), value: policy.endDate.toISOString().slice(0, 10) },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-secondary/50 p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-warm">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-5 text-base font-semibold text-warm">{t("covered")}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {coverage.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="mt-0.5 text-giraffe-dark">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">{t("noPolicy") ?? "No active policy."}</p>
        )}
      </div>
    </div>
  );
}
