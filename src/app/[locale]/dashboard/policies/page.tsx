"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { mockPolicy, mockPet, planPricing } from "~/data/mock-data";
import { btnPrimary, dashContainer, dashPage } from "~/lib/ui";

export default function PoliciesPage() {
  const t = useTranslations("dashboard.policies");
  const params = useParams();
  const locale = params.locale as string;

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

        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
                {t("plan")} {planPricing[mockPolicy.plan]?.name}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("for")} {mockPet.name} · {mockPet.breed}
              </p>
            </div>
            <span className="rounded-full bg-giraffe/20 px-4 py-2 text-sm font-bold text-warm">
              ● {t("active")}
            </span>
          </div>

          <div className="mb-10 grid gap-5 sm:grid-cols-3">
            {[
              { label: t("monthlyPremium"), value: `€${mockPolicy.monthlyPremium}` },
              { label: t("startDate"), value: mockPolicy.startDate },
              { label: t("endDate"), value: mockPolicy.endDate },
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
              {mockPolicy.coverageDetails.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                  <span className="mt-0.5 text-giraffe-dark">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
