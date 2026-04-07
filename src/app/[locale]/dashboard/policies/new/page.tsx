"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

const primaryBtn =
  "inline-flex h-14 items-center justify-center rounded-full bg-warm px-8 text-base font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100";
const ghostBtn =
  "inline-flex h-14 items-center justify-center rounded-full border-2 border-warm/15 bg-card px-8 text-base font-semibold text-warm transition-all hover:border-warm/30";

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
      <div className="flex flex-1 items-center justify-center px-6 py-14">
        <div className="w-full max-w-xl rounded-3xl bg-card p-12 text-center shadow-xl md:p-16">
          <div className="mb-6 text-7xl">🎉</div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {isIt ? "Polizza Attivata!" : "Policy Activated!"}
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            {isIt
              ? `Il tuo piano ${planNames[selected]?.it} è ora attivo.`
              : `Your ${planNames[selected]?.en} plan is now active.`}
          </p>
          <button className={primaryBtn} onClick={() => router.push(`/${locale}/dashboard/policies`)}>
            {isIt ? "Vai alle Polizze" : "Go to Policies"} →
          </button>
        </div>
      </div>
    );
  }

  if (step === "confirm" && selectedPlan) {
    return (
      <div className="px-6 py-14 md:px-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {isIt ? "Conferma Acquisto" : "Confirm Purchase"}
          </h1>
          <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-warm">
              {isIt ? "Riepilogo Ordine" : "Order Summary"}
            </h2>
            <div className="mb-8 space-y-5 text-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isIt ? "Piano" : "Plan"}</span>
                <span className="font-semibold text-warm">
                  {planNames[selectedPlan.key]?.[locale as "it" | "en"]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isIt ? "Premio Mensile" : "Monthly Premium"}</span>
                <span className="font-semibold text-warm">€{selectedPlan.price}</span>
              </div>
              <div className="flex items-end justify-between border-t border-border pt-5">
                <span className="text-muted-foreground">{isIt ? "Totale Annuo" : "Annual Total"}</span>
                <span className="text-3xl font-bold tracking-tight text-warm">
                  €{(selectedPlan.price * 12).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className={`${ghostBtn} flex-1`} onClick={() => setStep("select")}>
                ← {isIt ? "Indietro" : "Back"}
              </button>
              <button className={`${primaryBtn} flex-1`} onClick={() => setStep("done")}>
                💳 {isIt ? "Conferma e Paga" : "Confirm & Pay"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {isIt ? "Scegli un Piano" : "Choose a Plan"}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isIt ? "Seleziona la copertura ideale per il tuo pet" : "Select the ideal coverage for your pet"}
          </p>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isSelected = selected === plan.key;
            const isPopular = "popular" in plan && plan.popular;
            return (
              <button
                key={plan.key}
                type="button"
                className={`relative flex flex-col rounded-3xl p-8 text-left transition-all md:p-10 ${
                  isSelected
                    ? "bg-warm text-cream shadow-2xl scale-[1.02]"
                    : "border border-border/60 bg-card hover:shadow-lg"
                }`}
                onClick={() => setSelected(plan.key)}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-giraffe px-5 py-2 text-sm font-bold text-warm">
                    ★ {isIt ? "Più Popolare" : "Most Popular"}
                  </div>
                )}
                <h3 className={`mb-3 text-2xl font-semibold ${isSelected ? "text-cream" : "text-warm"}`}>
                  {planNames[plan.key]?.[locale as "it" | "en"]}
                </h3>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className={`text-5xl font-bold tracking-tight ${isSelected ? "text-cream" : "text-warm"}`}>
                    €{plan.price}
                  </span>
                  <span className={isSelected ? "text-cream/60" : "text-muted-foreground"}>
                    /{isIt ? "mese" : "month"}
                  </span>
                </div>
                <ul className="flex-1 space-y-3">
                  {plan.features[locale as "it" | "en"].map((f, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-3 text-base ${isSelected ? "text-cream/90" : "text-muted-foreground"}`}
                    >
                      <span className={isSelected ? "text-giraffe" : "text-giraffe-dark"}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button className={primaryBtn} disabled={!selected} onClick={() => setStep("confirm")}>
            {isIt ? "Continua" : "Continue"} →
          </button>
        </div>
      </div>
    </div>
  );
}
