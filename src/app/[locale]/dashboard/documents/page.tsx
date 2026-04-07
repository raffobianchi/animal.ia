"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex shrink-0 items-center justify-center rounded-lg px-2.5 h-8 text-sm font-medium bg-giraffe text-warm hover:bg-giraffe-dark transition-colors">
            {isIt ? "📎 Carica" : "📎 Upload"}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-warm">
                {isIt ? "Carica Documento" : "Upload Document"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>{isIt ? "Nome documento" : "Document name"}</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={isIt ? "Es. Passaporto di Luna" : "E.g. Luna's Passport"}
                />
              </div>
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
                <Label>{isIt ? "File" : "File"}</Label>
                <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-border px-6 py-8">
                  <div className="text-center">
                    <span className="text-3xl">📎</span>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {isIt
                        ? "Trascina il file qui o clicca per caricare"
                        : "Drag file here or click to upload"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG (max 10MB)
                    </p>
                  </div>
                </div>
              </div>
              <Button
                className="w-full bg-giraffe text-warm hover:bg-giraffe-dark"
                onClick={addDocument}
                disabled={!form.name || !form.type}
              >
                {isIt ? "Carica Documento" : "Upload Document"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
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
        <Card
          className="border-2 border-dashed border-border/50 transition-colors hover:border-giraffe/30 cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
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
