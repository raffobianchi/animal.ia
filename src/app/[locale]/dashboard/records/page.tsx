"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
    <div className="px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
              {isIt ? "Cartella Clinica" : "Medical Records"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {isIt ? "Cronologia visite e trattamenti" : "History of visits and treatments"}
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="inline-flex h-14 shrink-0 items-center justify-center rounded-full bg-warm px-8 text-base font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02]">
              + {isIt ? "Nuova Voce" : "New Entry"}
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-warm">
                  {isIt ? "Aggiungi Voce Clinica" : "Add Medical Entry"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label className="mb-2 block">{isIt ? "Tipo" : "Type"}</Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) => setForm({ ...form, type: v ?? "" })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl">
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
                  <Label className="mb-2 block">{isIt ? "Titolo" : "Title"}</Label>
                  <Input
                    className="h-12 rounded-2xl"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder={isIt ? "Es. Visita di controllo" : "E.g. Routine checkup"}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">{isIt ? "Descrizione" : "Description"}</Label>
                  <Textarea
                    className="min-h-24 rounded-2xl"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder={isIt ? "Dettagli..." : "Details..."}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">{isIt ? "Data" : "Date"}</Label>
                    <Input
                      type="date"
                      className="h-12 rounded-2xl"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">{isIt ? "Veterinario" : "Vet"}</Label>
                    <Input
                      className="h-12 rounded-2xl"
                      value={form.vetName}
                      onChange={(e) => setForm({ ...form, vetName: e.target.value })}
                      placeholder="Dr. ..."
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex h-14 w-full items-center justify-center rounded-full bg-warm px-8 text-base font-semibold text-cream transition-all hover:bg-warm/90 disabled:opacity-40"
                  onClick={addRecord}
                  disabled={!form.title || !form.type || !form.date}
                >
                  {isIt ? "Aggiungi" : "Add"}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-0">
          {records.map((record, i) => (
            <div key={record.id} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl">
                  {typeIcons[record.type]}
                </div>
                {i < records.length - 1 && <div className="my-2 w-0.5 flex-1 bg-border" />}
              </div>
              <div className="mb-6 flex-1 rounded-3xl border border-border/60 bg-card p-6 md:p-8">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-xl font-bold tracking-tight text-warm">{record.title}</h3>
                  <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-warm">
                    {typeLabels[record.type]?.[locale as "it" | "en"]}
                  </span>
                </div>
                <p className="mb-3 text-base text-muted-foreground">{record.description}</p>
                <p className="text-sm text-muted-foreground">
                  {record.date} · {record.vetName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
