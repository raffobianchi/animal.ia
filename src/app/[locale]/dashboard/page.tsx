"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { mockPet, mockPolicy, mockClaims, planPricing } from "~/data/mock-data";
import { claimStatusBadge } from "~/lib/claim-status";
import { dashContainer, dashPage } from "~/lib/ui";

export default function DashboardPage() {
  const t = useTranslations("dashboard.overview");
  const ts = useTranslations("dashboard.claimStatus");
  const params = useParams();
  const locale = params.locale as string;

  const stats = [
    {
      icon: "🐾",
      label: t("yourPet"),
      value: mockPet.name,
      sub: `${mockPet.breed} · ${t("petAge", { age: mockPet.age })}`,
      color: "bg-giraffe/15",
    },
    {
      icon: "🛡️",
      label: t("activePlan"),
      value: planPricing[mockPolicy.plan]?.name ?? "",
      sub: `€${mockPolicy.monthlyPremium}${t("perMonth")}`,
      color: "bg-sunset/15",
    },
    {
      icon: "📝",
      label: t("totalClaims"),
      value: String(mockClaims.length),
      sub: t("totalClaimsSub"),
      color: "bg-giraffe-light/40",
    },
    {
      icon: "💰",
      label: t("reimbursed"),
      value: `€${mockClaims.filter((c) => c.status === "paid").reduce((s, c) => s + c.amount, 0)}`,
      sub: t("reimbursedSub"),
      color: "bg-sunset-light/30",
    },
  ];

  const actions = [
    {
      href: `/${locale}/dashboard/claims/new`,
      icon: "📝",
      title: t("fileClaim"),
      desc: t("fileClaimDesc"),
    },
    {
      href: `/${locale}/dashboard/documents`,
      icon: "📁",
      title: t("documents"),
      desc: t("documentsDesc"),
    },
    {
      href: `/${locale}/dashboard/records`,
      icon: "📋",
      title: t("records"),
      desc: t("recordsDesc"),
    },
  ];

  return (
    <div className={dashPage}>
      <div className={dashContainer}>
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {t("greeting")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-border/60 bg-card p-7 transition-all hover:shadow-lg"
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${s.color} text-3xl`}>
                {s.icon}
              </div>
              <p className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <p className="mb-1 text-3xl font-bold tracking-tight text-warm">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-warm">
                {t("recentClaims")}
              </h2>
              <Link
                href={`/${locale}/dashboard/claims`}
                className="text-base font-semibold text-warm hover:text-giraffe-dark"
              >
                {t("seeAll")} →
              </Link>
            </div>
            <div className="space-y-3">
              {mockClaims.map((claim) => (
                <Link
                  key={claim.id}
                  href={`/${locale}/dashboard/claims/${claim.id}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 p-5 transition-all hover:border-warm/30 hover:shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 line-clamp-1 text-base font-semibold text-warm">
                      {claim.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {claim.submittedDate} · €{claim.amount}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${claimStatusBadge[claim.status]}`}
                  >
                    {ts(claim.status)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-warm">
              {t("quickActions")}
            </h2>
            <div className="space-y-3">
              {actions.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 p-5 transition-all hover:border-warm/30 hover:shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-2xl">
                    {a.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-warm">{a.title}</p>
                    <p className="text-sm text-muted-foreground">{a.desc}</p>
                  </div>
                  <span className="text-warm">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
