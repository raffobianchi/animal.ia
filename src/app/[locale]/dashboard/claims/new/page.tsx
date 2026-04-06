"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

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
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-warm mb-2">
              {isIt ? "Sinistro Inviato!" : "Claim Submitted!"}
            </h2>
            <p className="text-muted-foreground mb-2">
              {isIt
                ? "Il tuo sinistro è stato registrato con successo."
                : "Your claim has been registered successfully."}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {isIt
                ? "Riferimento: CLM-2026-003"
                : "Reference: CLM-2026-003"}
            </p>
            <Button
              className="bg-giraffe text-warm hover:bg-giraffe-dark"
              onClick={() => router.push(`/${locale}/dashboard/claims`)}
            >
              {isIt ? "Vai ai Sinistri" : "Go to Claims"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-warm">
          {isIt ? "Apri un Sinistro" : "File a Claim"}
        </h1>
        <p className="text-muted-foreground">
          {isIt
            ? "Compila il modulo per richiedere un rimborso"
            : "Fill out the form to request a reimbursement"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isIt ? "Dettagli Sinistro" : "Claim Details"}</CardTitle>
          <CardDescription>
            {isIt
              ? "Descrivi l'accaduto e carica la documentazione"
              : "Describe what happened and upload documentation"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label htmlFor="description">
              {isIt ? "Descrizione dell'accaduto" : "Description of incident"}
            </Label>
            <Textarea
              id="description"
              placeholder={isIt ? "Cosa è successo..." : "What happened..."}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="incidentDate">
                {isIt ? "Data dell'incidente" : "Incident date"}
              </Label>
              <Input
                id="incidentDate"
                type="date"
                value={form.incidentDate}
                onChange={(e) => setForm({ ...form, incidentDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="vetName">
                {isIt ? "Nome del veterinario" : "Vet name"}
              </Label>
              <Input
                id="vetName"
                placeholder={isIt ? "Dr. ..." : "Dr. ..."}
                value={form.vetName}
                onChange={(e) => setForm({ ...form, vetName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="amount">
              {isIt ? "Importo richiesto (€)" : "Amount requested (€)"}
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          <div>
            <Label>{isIt ? "Documenti (fatture, ricevute)" : "Documents (invoices, receipts)"}</Label>
            <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-border px-6 py-10">
              <div className="text-center">
                <span className="text-3xl">📎</span>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isIt
                    ? "Trascina i file qui o clicca per caricare"
                    : "Drag files here or click to upload"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, PNG (max 10MB)
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              {isIt ? "Annulla" : "Cancel"}
            </Button>
            <Button
              className="flex-1 bg-giraffe text-warm hover:bg-giraffe-dark"
              onClick={() => setSubmitted(true)}
            >
              {isIt ? "Invia Sinistro" : "Submit Claim"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
