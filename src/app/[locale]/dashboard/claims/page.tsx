"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { mockClaims } from "~/data/mock-data";

const statusColors: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  denied: "bg-red-100 text-red-800",
  paid: "bg-giraffe/20 text-warm",
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
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm">
            {isIt ? "I tuoi Sinistri" : "Your Claims"}
          </h1>
          <p className="text-muted-foreground">
            {isIt ? "Gestisci e monitora le tue richieste di rimborso" : "Manage and track your reimbursement requests"}
          </p>
        </div>
        <Link
          href={`/${locale}/dashboard/claims/new`}
          className={cn(buttonVariants(), "bg-giraffe text-warm hover:bg-giraffe-dark")}
        >
          {isIt ? "+ Nuovo Sinistro" : "+ New Claim"}
        </Link>
      </div>

      <div className="space-y-4">
        {mockClaims.map((claim) => (
          <Link key={claim.id} href={`/${locale}/dashboard/claims/${claim.id}`}>
            <Card className="transition-shadow hover:shadow-md cursor-pointer">
              <CardContent className="flex items-center justify-between py-5">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-medium text-warm truncate">
                    {claim.description}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {claim.submittedDate} · {claim.vetName} · €{claim.amount}
                  </p>
                </div>
                <Badge className={cn("shrink-0", statusColors[claim.status])}>
                  {statusLabels[claim.status]?.[locale as "it" | "en"]}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
