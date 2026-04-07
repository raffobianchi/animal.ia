"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { mockClaims } from "~/data/mock-data";

const statusColors: Record<string, string> = {
  submitted: "bg-sunset/15 text-warm",
  under_review: "bg-giraffe-light/40 text-warm",
  approved: "bg-giraffe/20 text-warm",
  denied: "bg-destructive/15 text-destructive",
  paid: "bg-warm text-cream",
};

const statusLabels: Record<string, { it: string; en: string }> = {
  submitted: { it: "Inviato", en: "Submitted" },
  under_review: { it: "In Revisione", en: "Under Review" },
  approved: { it: "Approvato", en: "Approved" },
  denied: { it: "Rifiutato", en: "Denied" },
  paid: { it: "Pagato", en: "Paid" },
};

export default function ClaimsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isIt = locale === "it";

  return (
    <div className="px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
              {isIt ? "I tuoi Sinistri" : "Your Claims"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {isIt ? "Gestisci e monitora le tue richieste" : "Manage and track your requests"}
            </p>
          </div>
          <Link
            href={`/${locale}/dashboard/claims/new`}
            className="inline-flex h-14 items-center justify-center rounded-full bg-warm px-8 text-base font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02]"
          >
            + {isIt ? "Nuovo Sinistro" : "New Claim"}
          </Link>
        </div>

        <div className="space-y-4">
          {mockClaims.map((claim) => (
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
                  {claim.submittedDate} · {claim.vetName} · €{claim.amount}
                </p>
              </div>
              <span
                className={`shrink-0 self-start rounded-full px-4 py-2 text-xs font-bold ${statusColors[claim.status]}`}
              >
                {statusLabels[claim.status]?.[locale as "it" | "en"]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
