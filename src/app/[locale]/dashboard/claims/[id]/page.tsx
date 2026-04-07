"use client";

import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { mockClaims } from "~/data/mock-data";
import { claimStatusBadge, claimStatusDot } from "~/lib/claim-status";
import { dashPage } from "~/lib/ui";

export default function ClaimDetailPage() {
  const t = useTranslations("dashboard.claims");
  const ts = useTranslations("dashboard.claimStatus");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const claimId = params.id as string;

  const claim = mockClaims.find((c) => c.id === claimId);

  if (!claim) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <p className="text-lg text-muted-foreground">{t("notFound")}</p>
      </div>
    );
  }

  return (
    <div className={dashPage}>
      <div className="mx-auto max-w-4xl">
        <button
          className="mb-8 inline-flex items-center gap-2 text-base font-medium text-muted-foreground transition-colors hover:text-warm"
          onClick={() => router.push(`/${locale}/dashboard/claims`)}
        >
          ← {t("back")}
        </button>

        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
              {claim.description}
            </h1>
            <p className="text-base text-muted-foreground">
              {t("reference")}: {claim.id.toUpperCase()}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold ${claimStatusBadge[claim.status]}`}>
            {ts(claim.status)}
          </span>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-warm">{t("details")}</h2>
            <div className="space-y-4">
              {[
                { label: t("incidentDate"), value: claim.incidentDate },
                { label: t("submitted"), value: claim.submittedDate },
                { label: t("vet"), value: claim.vetName },
              ].map((d) => (
                <div key={d.label} className="flex justify-between">
                  <span className="text-base text-muted-foreground">{d.label}</span>
                  <span className="text-base font-semibold text-warm">{d.value}</span>
                </div>
              ))}
              <div className="flex items-end justify-between border-t border-border pt-4">
                <span className="text-base text-muted-foreground">{t("amount")}</span>
                <span className="text-2xl font-bold tracking-tight text-warm">€{claim.amount}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-warm">{t("documents")}</h2>
            <div className="space-y-3">
              {claim.documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 p-4 text-base"
                >
                  <span className="text-2xl">📄</span>
                  <span className="text-warm">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card p-8">
          <h2 className="mb-8 text-xl font-bold tracking-tight text-warm">{t("timeline")}</h2>
          <div className="space-y-0">
            {claim.statusHistory.map((entry, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className={`mt-1.5 h-4 w-4 shrink-0 rounded-full ring-4 ring-secondary ${claimStatusDot[entry.status]}`} />
                  {i < claim.statusHistory.length - 1 && (
                    <div className="my-2 w-0.5 flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-lg font-semibold text-warm">{ts(entry.status)}</p>
                  <p className="mb-1 text-sm text-muted-foreground">{entry.date}</p>
                  <p className="text-base text-muted-foreground">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
