"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
import { mockDocuments } from "~/data/mock-data";
import type { PetDocument } from "~/data/types";

const typeIcons: Record<string, string> = {
  passport: "🛂",
  vaccination_card: "💉",
  microchip: "📡",
  adoption: "🏠",
  other: "📄",
};

const typeColors: Record<string, string> = {
  passport: "bg-giraffe/15",
  vaccination_card: "bg-sunset/15",
  microchip: "bg-giraffe-light/40",
  adoption: "bg-sunset-light/30",
  other: "bg-secondary",
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
  const [docs, setDocs] = useState<PetDocument[]>(mockDocuments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "" as string });

  function addDocument() {
    if (!form.name || !form.type) return;
    const newDoc: PetDocument = {
      id: `doc-${Date.now()}`,
      petId: "pet-1",
      type: form.type as PetDocument["type"],
      name: form.name,
      uploadDate: new Date().toISOString().split("T")[0]!,
      fileUrl: "#",
    };
    setDocs([...docs, newDoc]);
    setForm({ name: "", type: "" });
    setDialogOpen(false);
  }

  return (
    <div className="px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
              {isIt ? "Archivio Documenti" : "Document Archive"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {isIt ? "Tutti i documenti del tuo pet al sicuro" : "All your pet's documents safe and secure"}
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="inline-flex h-14 shrink-0 items-center justify-center rounded-full bg-warm px-8 text-base font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02]">
              📎 {isIt ? "Carica" : "Upload"}
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-warm">
                  {isIt ? "Carica Documento" : "Upload Document"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label className="mb-2 block">{isIt ? "Nome documento" : "Document name"}</Label>
                  <Input
                    className="h-12 rounded-2xl"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isIt ? "Es. Passaporto di Luna" : "E.g. Luna's Passport"}
                  />
                </div>
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
                  <Label className="mb-2 block">{isIt ? "File" : "File"}</Label>
                  <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/30 px-6 py-10">
                    <div className="text-center">
                      <span className="text-4xl">📎</span>
                      <p className="mt-3 text-base text-muted-foreground">
                        {isIt ? "Trascina o clicca" : "Drag or click"}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">PDF, JPG, PNG (max 10MB)</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex h-14 w-full items-center justify-center rounded-full bg-warm px-8 text-base font-semibold text-cream transition-all hover:bg-warm/90 disabled:opacity-40"
                  onClick={addDocument}
                  disabled={!form.name || !form.type}
                >
                  {isIt ? "Carica Documento" : "Upload Document"}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="rounded-3xl border border-border/60 bg-card p-7 transition-all hover:border-warm/30 hover:shadow-lg"
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${typeColors[doc.type]} text-3xl`}>
                {typeIcons[doc.type]}
              </div>
              <p className="mb-2 text-lg font-semibold text-warm">{doc.name}</p>
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-warm">
                {typeLabels[doc.type]?.[locale as "it" | "en"]}
              </span>
              <p className="mt-4 text-sm text-muted-foreground">
                {isIt ? "Caricato il" : "Uploaded"} {doc.uploadDate}
              </p>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card/50 p-12 text-center transition-all hover:border-warm/30 hover:bg-card"
          >
            <span className="mb-3 text-5xl">➕</span>
            <p className="text-base font-semibold text-muted-foreground">
              {isIt ? "Aggiungi documento" : "Add document"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
