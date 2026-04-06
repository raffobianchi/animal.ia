"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { mockDocuments } from "~/data/mock-data";

const typeIcons: Record<string, string> = {
  passport: "🛂",
  vaccination_card: "💉",
  microchip: "📡",
  adoption: "🏠",
  other: "📄",
};

const typeLabels: Record<string, { it: string; en: string }> = {
  passport: { it: "Passaporto", en: "Passport" },
  vaccination_card: { it: "Libretto Vaccini", en: "Vaccination Card" },
  microchip: { it: "Microchip", en: "Microchip" },
  adoption: { it: "Adozione", en: "Adoption" },
  other: { it: "Altro", en: "Other" },
};

export default function DocumentsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isIt = locale === "it";

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm">
            {isIt ? "Archivio Documenti" : "Document Archive"}
          </h1>
          <p className="text-muted-foreground">
            {isIt ? "Tutti i documenti del tuo pet al sicuro" : "All your pet's documents safe and secure"}
          </p>
        </div>
        <Button className="bg-giraffe text-warm hover:bg-giraffe-dark">
          {isIt ? "📎 Carica" : "📎 Upload"}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockDocuments.map((doc) => (
          <Card key={doc.id} className="transition-shadow hover:shadow-md">
            <CardContent className="py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-giraffe/10 text-2xl">
                  {typeIcons[doc.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-warm truncate">{doc.name}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {typeLabels[doc.type]?.[locale as "it" | "en"]}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    {isIt ? "Caricato il" : "Uploaded"} {doc.uploadDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Upload placeholder card */}
        <Card className="border-2 border-dashed border-border/50 transition-colors hover:border-giraffe/30">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <span className="text-3xl mb-2">➕</span>
            <p className="text-sm font-medium text-muted-foreground">
              {isIt ? "Aggiungi documento" : "Add document"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
