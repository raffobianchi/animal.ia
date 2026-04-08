import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getClaim } from "~/lib/queries";
import { claimStatusBadge, claimStatusDot } from "~/lib/claim-status";
import { dashPage } from "~/lib/ui";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function ClaimDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const t = await getTranslations("dashboard.claims");
  const ts = await getTranslations("dashboard.claimStatus");
  const claim = await getClaim(id);
  if (!claim) notFound();

  const status = claim.status as keyof typeof claimStatusBadge;
  const documents: string[] = JSON.parse(claim.documentsJson);

  return (
    <div className={dashPage}>
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/${locale}/dashboard/claims`}
          className="mb-8 inline-flex items-center gap-2 text-base font-medium text-muted-foreground transition-colors hover:text-warm"
        >
          ← {t("back")}
        </Link>

        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
              {claim.description}
            </h1>
            <p className="text-base text-muted-foreground">
              {t("reference")}: {claim.id.toUpperCase()}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold ${claimStatusBadge[status]}`}>
            {ts(claim.status)}
          </span>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-warm">{t("details")}</h2>
            <div className="space-y-4">
              {[
                { label: t("incidentDate"), value: claim.incidentDate.toISOString().slice(0, 10) },
                { label: t("submitted"), value: claim.submittedDate.toISOString().slice(0, 10) },
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
              {documents.map((doc, i) => (
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
            {claim.history.map((entry, i) => {
              const s = entry.status as keyof typeof claimStatusDot;
              return (
                <div key={entry.id} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className={`mt-1.5 h-4 w-4 shrink-0 rounded-full ring-4 ring-secondary ${claimStatusDot[s]}`} />
                    {i < claim.history.length - 1 && (
                      <div className="my-2 w-0.5 flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-lg font-semibold text-warm">{ts(entry.status)}</p>
                    <p className="mb-1 text-sm text-muted-foreground">
                      {entry.date.toISOString().slice(0, 10)}
                    </p>
                    <p className="text-base text-muted-foreground">{entry.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
