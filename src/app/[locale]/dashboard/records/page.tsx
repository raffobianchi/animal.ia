"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { mockMedicalRecords } from "~/data/mock-data";

const typeIcons: Record<string, string> = {
  visit: "🩺",
  vaccine: "💉",
  treatment: "💊",
  surgery: "🏥",
  checkup: "✅",
};

const typeLabels: Record<string, { it: string; en: string }> = {
  visit: { it: "Visita", en: "Visit" },
  vaccine: { it: "Vaccino", en: "Vaccine" },
  treatment: { it: "Terapia", en: "Treatment" },
  surgery: { it: "Intervento", en: "Surgery" },
  checkup: { it: "Controllo", en: "Checkup" },
};

export default function RecordsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isIt = locale === "it";

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-warm">
          {isIt ? "Cartella Clinica" : "Medical Records"}
        </h1>
        <p className="text-muted-foreground">
          {isIt ? "Cronologia delle visite e dei trattamenti" : "History of visits and treatments"}
        </p>
      </div>

      <div className="space-y-0">
        {mockMedicalRecords.map((record, i) => (
          <div key={record.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-giraffe/10 text-lg">
                {typeIcons[record.type]}
              </div>
              {i < mockMedicalRecords.length - 1 && (
                <div className="w-px flex-1 bg-border" />
              )}
            </div>
            <Card className="mb-4 flex-1">
              <CardContent className="py-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-warm">{record.title}</h3>
                  <Badge variant="secondary" className="shrink-0 ml-2 text-xs">
                    {typeLabels[record.type]?.[locale as "it" | "en"]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
                <p className="text-xs text-muted-foreground">
                  {record.date} · {record.vetName}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
