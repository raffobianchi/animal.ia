"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

const plans = [
  {
    key: "basic",
    price: 9.99,
    features: {
      it: ["Copertura infortuni", "Archivio documenti", "Cartella clinica base", "Assistente AI"],
      en: ["Accident coverage", "Document archive", "Basic medical records", "AI Assistant"],
    },
  },
  {
    key: "standard",
    price: 19.99,
    popular: true,
    features: {
      it: ["Tutto del piano Base", "Copertura malattie", "Sinistri illimitati", "Supporto prioritario", "Promemoria vaccini"],
      en: ["Everything in Basic", "Illness coverage", "Unlimited claims", "Priority support", "Vaccine reminders"],
    },
  },
  {
    key: "premium",
    price: 34.99,
    features: {
      it: ["Tutto del piano Standard", "Copertura dentale", "Visite specialistiche", "Terapie riabilitative", "Assistenza telefonica 24/7"],
      en: ["Everything in Standard", "Dental coverage", "Specialist visits", "Rehabilitation therapy", "24/7 phone support"],
    },
  },
] as const;

const planNames: Record<string, { it: string; en: string }> = {
  basic: { it: "Base", en: "Basic" },
  standard: { it: "Standard", en: "Standard" },
  premium: { it: "Premium", en: "Premium" },
};

export default function NewPolicyPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const isIt = locale === "it";
  const [selected, setSelected] = useState<string>("");
  const [step, setStep] = useState<"select" | "confirm" | "done">("select");

  const selectedPlan = plans.find((p) => p.key === selected);

  if (step === "done") {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-warm mb-2">
              {isIt ? "Polizza Attivata!" : "Policy Activated!"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isIt
                ? `Il tuo piano ${planNames[selected]?.it} è ora attivo.`
                : `Your ${planNames[selected]?.en} plan is now active.`}
            </p>
            <Button
              className="bg-giraffe text-warm hover:bg-giraffe-dark"
              onClick={() => router.push(`/${locale}/dashboard/policies`)}
            >
              {isIt ? "Vai alle Polizze" : "Go to Policies"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "confirm" && selectedPlan) {
    return (
      <div className="p-6 md:p-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-warm mb-6">
          {isIt ? "Conferma Acquisto" : "Confirm Purchase"}
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>{isIt ? "Riepilogo Ordine" : "Order Summary"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{isIt ? "Piano" : "Plan"}</span>
              <span className="font-medium text-warm">
                {planNames[selectedPlan.key]?.[locale as "it" | "en"]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{isIt ? "Premio Mensile" : "Monthly Premium"}</span>
              <span className="font-medium text-warm">€{selectedPlan.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{isIt ? "Totale Annuo" : "Annual Total"}</span>
              <span className="font-bold text-warm text-lg">
                €{(selectedPlan.price * 12).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <Button
                className="w-full bg-giraffe text-warm hover:bg-giraffe-dark"
                onClick={() => setStep("done")}
              >
                {isIt ? "💳 Conferma e Paga" : "💳 Confirm & Pay"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setStep("select")}
              >
                {isIt ? "Torna Indietro" : "Go Back"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-warm">
          {isIt ? "Scegli un Piano" : "Choose a Plan"}
        </h1>
        <p className="text-muted-foreground">
          {isIt ? "Seleziona la copertura ideale per il tuo pet" : "Select the ideal coverage for your pet"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {plans.map((plan) => (
          <Card
            key={plan.key}
            className={cn(
              "relative cursor-pointer transition-all",
              selected === plan.key
                ? "border-giraffe ring-2 ring-giraffe/20"
                : "border-border/50 hover:border-giraffe/30"
            )}
            onClick={() => setSelected(plan.key)}
          >
            {"popular" in plan && plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-giraffe text-warm">
                {isIt ? "Più Popolare" : "Most Popular"}
              </Badge>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-warm">
                {planNames[plan.key]?.[locale as "it" | "en"]}
              </CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-warm">€{plan.price}</span>
                <span className="text-muted-foreground">/{isIt ? "mese" : "month"}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features[locale as "it" | "en"].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-0.5 text-giraffe">✓</span> {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          className="bg-giraffe text-warm hover:bg-giraffe-dark px-8"
          disabled={!selected}
          onClick={() => setStep("confirm")}
        >
          {isIt ? "Continua" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
