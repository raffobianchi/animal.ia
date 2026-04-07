"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { mockPolicy, mockPet, planPricing } from "~/data/mock-data";

export default function PoliciesPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isIt = locale === "it";

  return (
    <div className="px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
              {isIt ? "Le tue Polizze" : "Your Policies"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {isIt ? "Gestisci le tue coperture assicurative" : "Manage your insurance coverage"}
            </p>
          </div>
          <Link
            href={`/${locale}/dashboard/policies/new`}
            className="inline-flex h-14 items-center justify-center rounded-full bg-warm px-8 text-base font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02]"
          >
            + {isIt ? "Nuova Polizza" : "New Policy"}
          </Link>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
                {isIt ? "Piano" : "Plan"} {planPricing[mockPolicy.plan]?.name}
              </h2>
              <p className="text-lg text-muted-foreground">
                {isIt ? "Per" : "For"} {mockPet.name} · {mockPet.breed}
              </p>
            </div>
            <span className="rounded-full bg-giraffe/20 px-4 py-2 text-sm font-bold text-warm">
              ● {isIt ? "Attiva" : "Active"}
            </span>
          </div>

          <div className="mb-10 grid gap-5 sm:grid-cols-3">
            {[
              { label: isIt ? "Premio Mensile" : "Monthly Premium", value: `€${mockPolicy.monthlyPremium}` },
              { label: isIt ? "Data Inizio" : "Start Date", value: mockPolicy.startDate },
              { label: isIt ? "Scadenza" : "End Date", value: mockPolicy.endDate },
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
            <p className="mb-5 text-base font-semibold text-warm">
              {isIt ? "Cosa copre:" : "What's covered:"}
            </p>
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
