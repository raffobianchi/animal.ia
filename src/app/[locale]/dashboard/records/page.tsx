"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { mockMedicalRecords } from "~/data/mock-data";
import type { MedicalRecord } from "~/data/types";

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
  const [records, setRecords] = useState<MedicalRecord[]>(mockMedicalRecords);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    type: "" as string,
    title: "",
    description: "",
    vetName: "",
    date: "",
  });

  function addRecord() {
    if (!form.title || !form.type || !form.date) return;
    const newRecord: MedicalRecord = {
      id: `rec-${Date.now()}`,
      petId: "pet-1",
      type: form.type as MedicalRecord["type"],
      title: form.title,
      description: form.description,
      vetName: form.vetName,
      date: form.date,
    };
    setRecords([newRecord, ...records]);
    setForm({ type: "", title: "", description: "", vetName: "", date: "" });
    setDialogOpen(false);
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm">
            {isIt ? "Cartella Clinica" : "Medical Records"}
          </h1>
          <p className="text-muted-foreground">
            {isIt ? "Cronologia delle visite e dei trattamenti" : "History of visits and treatments"}
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex shrink-0 items-center justify-center rounded-lg px-2.5 h-8 text-sm font-medium bg-giraffe text-warm hover:bg-giraffe-dark transition-colors">
            {isIt ? "+ Nuova Voce" : "+ New Entry"}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-warm">
                {isIt ? "Aggiungi Voce Clinica" : "Add Medical Entry"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>{isIt ? "Tipo" : "Type"}</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v ?? "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isIt ? "Seleziona tipo..." : "Select type..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(typeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {typeIcons[key]} {label[locale as "it" | "en"]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{isIt ? "Titolo" : "Title"}</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder={isIt ? "Es. Visita di controllo" : "E.g. Routine checkup"}
                />
              </div>
              <div>
                <Label>{isIt ? "Descrizione" : "Description"}</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder={isIt ? "Dettagli della visita..." : "Visit details..."}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isIt ? "Data" : "Date"}</Label>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{isIt ? "Veterinario" : "Vet"}</Label>
                  <Input
                    value={form.vetName}
                    onChange={(e) => setForm({ ...form, vetName: e.target.value })}
                    placeholder="Dr. ..."
                  />
                </div>
              </div>
              <Button
                className="w-full bg-giraffe text-warm hover:bg-giraffe-dark"
                onClick={addRecord}
                disabled={!form.title || !form.type || !form.date}
              >
                {isIt ? "Aggiungi" : "Add"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-0">
        {records.map((record, i) => (
          <div key={record.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-giraffe/10 text-lg">
                {typeIcons[record.type]}
              </div>
              {i < records.length - 1 && (
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
