"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { mockPet, mockPolicy, mockClaims, planPricing } from "~/data/mock-data";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  denied: "bg-red-100 text-red-800",
  paid: "bg-giraffe/20 text-warm",
};

export default function DashboardPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isIt = locale === "it";

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-warm">
          {isIt ? "Ciao! 👋" : "Hello! 👋"}
        </h1>
        <p className="text-muted-foreground">
          {isIt
            ? "Ecco un riepilogo del tuo account"
            : "Here's a summary of your account"}
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl mb-1">🐾</div>
            <p className="text-2xl font-bold text-warm">{mockPet.name}</p>
            <p className="text-sm text-muted-foreground">
              {mockPet.breed} · {mockPet.age} {isIt ? "anni" : "years"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl mb-1">🛡️</div>
            <p className="text-2xl font-bold text-warm">
              {planPricing[mockPolicy.plan]?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              €{mockPolicy.monthlyPremium}/{isIt ? "mese" : "month"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl mb-1">📝</div>
            <p className="text-2xl font-bold text-warm">{mockClaims.length}</p>
            <p className="text-sm text-muted-foreground">
              {isIt ? "Sinistri totali" : "Total claims"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl mb-1">💰</div>
            <p className="text-2xl font-bold text-warm">
              €{mockClaims.filter((c) => c.status === "paid").reduce((s, c) => s + c.amount, 0)}
            </p>
            <p className="text-sm text-muted-foreground">
              {isIt ? "Rimborsato" : "Reimbursed"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent claims */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-warm">
              {isIt ? "Sinistri Recenti" : "Recent Claims"}
            </CardTitle>
            <Link
              href={`/${locale}/dashboard/claims`}
              className="text-sm text-giraffe hover:underline"
            >
              {isIt ? "Vedi tutti" : "See all"}
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockClaims.map((claim) => (
              <Link
                key={claim.id}
                href={`/${locale}/dashboard/claims/${claim.id}`}
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted"
              >
                <div>
                  <p className="text-sm font-medium text-warm line-clamp-1">
                    {claim.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {claim.submittedDate} · €{claim.amount}
                  </p>
                </div>
                <Badge className={cn("shrink-0", statusColors[claim.status])}>
                  {claim.status.replace("_", " ")}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-warm">
              {isIt ? "Azioni Rapide" : "Quick Actions"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href={`/${locale}/dashboard/claims/new`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full justify-start gap-3 h-auto py-3"
              )}
            >
              <span className="text-xl">📝</span>
              <div className="text-left">
                <p className="font-medium">
                  {isIt ? "Apri Sinistro" : "File a Claim"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isIt ? "Invia una nuova richiesta di rimborso" : "Submit a new reimbursement request"}
                </p>
              </div>
            </Link>
            <Link
              href={`/${locale}/dashboard/documents`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full justify-start gap-3 h-auto py-3"
              )}
            >
              <span className="text-xl">📁</span>
              <div className="text-left">
                <p className="font-medium">
                  {isIt ? "Documenti" : "Documents"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isIt ? "Gestisci i documenti del tuo pet" : "Manage your pet's documents"}
                </p>
              </div>
            </Link>
            <Link
              href={`/${locale}/dashboard/records`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full justify-start gap-3 h-auto py-3"
              )}
            >
              <span className="text-xl">📋</span>
              <div className="text-left">
                <p className="font-medium">
                  {isIt ? "Cartella Clinica" : "Medical Records"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isIt ? "Visualizza la storia clinica" : "View clinical history"}
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
