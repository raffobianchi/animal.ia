"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { btnGhost, btnPrimary, dashContainer, dashPage } from "~/lib/ui";

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

export default function NewPolicyPage() {
  const t = useTranslations("dashboard.newPolicy");
  const tp = useTranslations("pricing");
  const tc = useTranslations("common");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [selected, setSelected] = useState<string>("");
  const [step, setStep] = useState<"select" | "confirm" | "done">("select");

  const selectedPlan = plans.find((p) => p.key === selected);
  const planName = (key: string) => tp(`${key}.name`);

  if (step === "done") {
    return (
      <div className={`${dashPage} flex flex-1 items-center justify-center`}>
        <div className="w-full max-w-xl rounded-3xl bg-card p-12 text-center shadow-xl md:p-16">
          <div className="mb-6 text-7xl">🎉</div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("doneTitle")}
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            {t("doneSubtitle", { plan: planName(selected) })}
          </p>
          <button className={btnPrimary} onClick={() => router.push(`/${locale}/dashboard/policies`)}>
            {t("goToPolicies")} →
          </button>
        </div>
      </div>
    );
  }

  if (step === "confirm" && selectedPlan) {
    return (
      <div className={dashPage}>
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {t("confirmTitle")}
          </h1>
          <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-warm">{t("summary")}</h2>
            <div className="mb-8 space-y-5 text-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{tp("monthly")}</span>
                <span className="font-semibold text-warm">{planName(selectedPlan.key)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">€/{tp("monthly")}</span>
                <span className="font-semibold text-warm">€{selectedPlan.price}</span>
              </div>
              <div className="flex items-end justify-between border-t border-border pt-5">
                <span className="text-muted-foreground">{t("annualTotal")}</span>
                <span className="text-3xl font-bold tracking-tight text-warm">
                  €{(selectedPlan.price * 12).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className={`${btnGhost} flex-1`} onClick={() => setStep("select")}>
                ← {tc("back")}
              </button>
              <button className={`${btnPrimary} flex-1`} onClick={() => setStep("done")}>
                💳 {t("confirmPay")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={dashPage}>
      <div className={dashContainer}>
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
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
                    : isPopular
                      ? "border-2 border-giraffe bg-card hover:shadow-lg"
                      : "border border-border/60 bg-card hover:shadow-lg"
                }`}
                onClick={() => setSelected(plan.key)}
              >
                {isPopular && !isSelected && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-giraffe px-5 py-2 text-sm font-bold text-warm">
                    ★ {t("popular")}
                  </div>
                )}
                <h3 className={`mb-3 text-2xl font-semibold ${isSelected ? "text-cream" : "text-warm"}`}>
                  {planName(plan.key)}
                </h3>
                <div className="mb-6 flex items-baseline gap-2">
                  <span className={`text-5xl font-bold tracking-tight ${isSelected ? "text-cream" : "text-warm"}`}>
                    €{plan.price}
                  </span>
                  <span className={isSelected ? "text-cream/60" : "text-muted-foreground"}>
                    /{tp("monthly")}
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
          <button className={btnPrimary} disabled={!selected} onClick={() => setStep("confirm")}>
            {t("continue")} →
          </button>
        </div>
      </div>
    </div>
  );
}
