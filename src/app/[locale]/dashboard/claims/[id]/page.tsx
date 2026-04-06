"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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

const dotColors: Record<string, string> = {
  submitted: "bg-blue-500",
  under_review: "bg-yellow-500",
  approved: "bg-green-500",
  denied: "bg-red-500",
  paid: "bg-giraffe",
};

export default function ClaimDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const isIt = locale === "it";
  const claimId = params.id as string;

  const claim = mockClaims.find((c) => c.id === claimId);

  if (!claim) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-muted-foreground">
          {isIt ? "Sinistro non trovato" : "Claim not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push(`/${locale}/dashboard/claims`)}
      >
        ← {isIt ? "Torna ai Sinistri" : "Back to Claims"}
      </Button>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm">{claim.description}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isIt ? "Riferimento" : "Reference"}: {claim.id.toUpperCase()}
          </p>
        </div>
        <Badge className={cn("text-sm", statusColors[claim.status])}>
          {statusLabels[claim.status]?.[locale as "it" | "en"]}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{isIt ? "Dettagli" : "Details"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{isIt ? "Data Incidente" : "Incident Date"}</span>
              <span className="font-medium text-warm">{claim.incidentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{isIt ? "Data Invio" : "Submitted"}</span>
              <span className="font-medium text-warm">{claim.submittedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{isIt ? "Veterinario" : "Vet"}</span>
              <span className="font-medium text-warm">{claim.vetName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{isIt ? "Importo" : "Amount"}</span>
              <span className="font-bold text-warm text-lg">€{claim.amount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{isIt ? "Documenti" : "Documents"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {claim.documents.map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm"
              >
                <span>📄</span>
                <span className="text-warm">{doc}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Status timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {isIt ? "Cronologia Stato" : "Status Timeline"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {claim.statusHistory.map((entry, i) => (
              <div key={i} className="flex gap-4">
                {/* Timeline line and dot */}
                <div className="flex flex-col items-center">
                  <div className={cn("h-3 w-3 rounded-full shrink-0 mt-1.5", dotColors[entry.status])} />
                  {i < claim.statusHistory.length - 1 && (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-6">
                  <p className="font-medium text-sm text-warm">
                    {statusLabels[entry.status]?.[locale as "it" | "en"]}
                  </p>
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                  <p className="text-sm text-muted-foreground mt-1">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
