"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

const primaryBtn =
  "inline-flex h-14 items-center justify-center rounded-full bg-warm px-8 text-base font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02]";
const ghostBtn =
  "inline-flex h-14 items-center justify-center rounded-full border-2 border-warm/15 bg-card px-8 text-base font-semibold text-warm transition-all hover:border-warm/30";

export default function NewClaimPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const isIt = locale === "it";
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    description: "",
    incidentDate: "",
    vetName: "",
    amount: "",
  });

  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-14">
        <div className="w-full max-w-xl rounded-3xl bg-card p-12 text-center shadow-xl md:p-16">
          <div className="mb-6 text-7xl">✅</div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {isIt ? "Sinistro Inviato!" : "Claim Submitted!"}
          </h2>
          <p className="mb-2 text-lg text-muted-foreground">
            {isIt ? "Il tuo sinistro è stato registrato." : "Your claim has been registered."}
          </p>
          <p className="mb-10 text-sm text-muted-foreground">
            {isIt ? "Riferimento: CLM-2026-003" : "Reference: CLM-2026-003"}
          </p>
          <button className={primaryBtn} onClick={() => router.push(`/${locale}/dashboard/claims`)}>
            {isIt ? "Vai ai Sinistri" : "Go to Claims"} →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {isIt ? "Apri un Sinistro" : "File a Claim"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isIt ? "Compila il modulo per il rimborso" : "Fill out the form for reimbursement"}
          </p>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <div className="space-y-6">
            <div>
              <Label htmlFor="description" className="mb-2 block text-base">
                {isIt ? "Descrizione dell'accaduto" : "Description of incident"}
              </Label>
              <Textarea
                id="description"
                className="min-h-32 rounded-2xl text-base"
                placeholder={isIt ? "Cosa è successo..." : "What happened..."}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="incidentDate" className="mb-2 block text-base">
                  {isIt ? "Data dell'incidente" : "Incident date"}
                </Label>
                <Input
                  id="incidentDate"
                  type="date"
                  className="h-14 rounded-2xl text-base"
                  value={form.incidentDate}
                  onChange={(e) => setForm({ ...form, incidentDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="vetName" className="mb-2 block text-base">
                  {isIt ? "Nome del veterinario" : "Vet name"}
                </Label>
                <Input
                  id="vetName"
                  className="h-14 rounded-2xl text-base"
                  placeholder="Dr. ..."
                  value={form.vetName}
                  onChange={(e) => setForm({ ...form, vetName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="amount" className="mb-2 block text-base">
                {isIt ? "Importo richiesto (€)" : "Amount requested (€)"}
              </Label>
              <Input
                id="amount"
                type="number"
                className="h-14 rounded-2xl text-base"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>

            <div>
              <Label className="mb-2 block text-base">
                {isIt ? "Documenti (fatture, ricevute)" : "Documents (invoices, receipts)"}
              </Label>
              <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/30 px-6 py-12">
                <div className="text-center">
                  <span className="text-4xl">📎</span>
                  <p className="mt-3 text-base text-muted-foreground">
                    {isIt ? "Trascina i file qui o clicca" : "Drag files here or click"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">PDF, JPG, PNG (max 10MB)</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button className={`${ghostBtn} flex-1`} onClick={() => router.back()}>
                {isIt ? "Annulla" : "Cancel"}
              </button>
              <button className={`${primaryBtn} flex-1`} onClick={() => setSubmitted(true)}>
                {isIt ? "Invia Sinistro" : "Submit Claim"} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
