import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getPrimaryPet, getClaims } from "~/lib/queries";
import { claimStatusBadge } from "~/lib/claim-status";
import { btnPrimary, dashContainer, dashPage } from "~/lib/ui";

type Props = { params: Promise<{ locale: string }> };

export default async function ClaimsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("dashboard.claims");
  const ts = await getTranslations("dashboard.claimStatus");
  const pet = await getPrimaryPet();
  const claims = pet ? await getClaims(pet.id) : [];

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
          <Link href={`/${locale}/dashboard/claims/new`} className={btnPrimary}>
            + {t("new")}
          </Link>
        </div>

        <div className="space-y-4">
          {claims.map((claim) => {
            const status = claim.status as keyof typeof claimStatusBadge;
            return (
              <Link
                key={claim.id}
                href={`/${locale}/dashboard/claims/${claim.id}`}
                className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card p-6 transition-all hover:border-warm/30 hover:shadow-lg sm:flex-row sm:items-center md:p-8"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl">
                  📝
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-lg font-semibold text-warm">{claim.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.submittedDate.toISOString().slice(0, 10)} · {claim.vetName} · €{claim.amount}
                  </p>
                </div>
                <span
                  className={`shrink-0 self-start rounded-full px-4 py-2 text-xs font-bold ${claimStatusBadge[status]}`}
                >
                  {ts(claim.status)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
