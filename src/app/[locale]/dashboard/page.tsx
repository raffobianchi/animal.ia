"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { mockPet, mockPolicy, mockClaims, planPricing } from "~/data/mock-data";

const statusColors: Record<string, string> = {
  active: "bg-giraffe/20 text-warm",
  submitted: "bg-sunset/15 text-warm",
  under_review: "bg-giraffe-light/40 text-warm",
  approved: "bg-giraffe/20 text-warm",
  denied: "bg-destructive/15 text-destructive",
  paid: "bg-warm text-cream",
};

export default function DashboardPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isIt = locale === "it";

  const stats = [
    {
      icon: "🐾",
      label: isIt ? "Il tuo pet" : "Your pet",
      value: mockPet.name,
      sub: `${mockPet.breed} · ${mockPet.age} ${isIt ? "anni" : "years"}`,
      color: "bg-giraffe/15",
    },
    {
      icon: "🛡️",
      label: isIt ? "Piano attivo" : "Active plan",
      value: planPricing[mockPolicy.plan]?.name ?? "",
      sub: `€${mockPolicy.monthlyPremium}/${isIt ? "mese" : "month"}`,
      color: "bg-sunset/15",
    },
    {
      icon: "📝",
      label: isIt ? "Sinistri totali" : "Total claims",
      value: String(mockClaims.length),
      sub: isIt ? "Negli ultimi 12 mesi" : "In the last 12 months",
      color: "bg-giraffe-light/40",
    },
    {
      icon: "💰",
      label: isIt ? "Rimborsato" : "Reimbursed",
      value: `€${mockClaims.filter((c) => c.status === "paid").reduce((s, c) => s + c.amount, 0)}`,
      sub: isIt ? "Totale ricevuto" : "Total received",
      color: "bg-sunset-light/30",
    },
  ];

  return (
    <div className="px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {isIt ? "Ciao! 👋" : "Hello! 👋"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isIt ? "Ecco un riepilogo del tuo account" : "Here's a summary of your account"}
          </p>
        </div>

        {/* Stat cards */}
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
          {/* Recent claims */}
          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-warm">
                {isIt ? "Sinistri Recenti" : "Recent Claims"}
              </h2>
              <Link
                href={`/${locale}/dashboard/claims`}
                className="text-base font-semibold text-warm hover:text-giraffe-dark"
              >
                {isIt ? "Vedi tutti →" : "See all →"}
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
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${statusColors[claim.status]}`}
                  >
                    {claim.status.replace("_", " ")}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-3xl border border-border/60 bg-card p-8">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-warm">
              {isIt ? "Azioni Rapide" : "Quick Actions"}
            </h2>
            <div className="space-y-3">
              {[
                {
                  href: `/${locale}/dashboard/claims/new`,
                  icon: "📝",
                  title: isIt ? "Apri Sinistro" : "File a Claim",
                  desc: isIt ? "Invia una nuova richiesta di rimborso" : "Submit a new reimbursement request",
                },
                {
                  href: `/${locale}/dashboard/documents`,
                  icon: "📁",
                  title: isIt ? "Documenti" : "Documents",
                  desc: isIt ? "Gestisci i documenti del tuo pet" : "Manage your pet's documents",
                },
                {
                  href: `/${locale}/dashboard/records`,
                  icon: "📋",
                  title: isIt ? "Cartella Clinica" : "Medical Records",
                  desc: isIt ? "Visualizza la storia clinica" : "View clinical history",
                },
              ].map((a) => (
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
