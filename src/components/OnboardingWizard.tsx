"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
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

const TOTAL_STEPS = 4;

const primaryBtn =
  "inline-flex h-14 items-center justify-center rounded-full bg-warm px-8 text-base font-semibold text-cream transition-all hover:bg-warm/90 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100";
const ghostBtn =
  "inline-flex h-14 items-center justify-center rounded-full border-2 border-warm/15 bg-card px-8 text-base font-semibold text-warm transition-all hover:border-warm/30";

export function OnboardingWizard() {
  const t = useTranslations("onboarding");
  const tp = useTranslations("pricing");
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const [owner, setOwner] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [pet, setPet] = useState({ name: "", species: "", breed: "", age: "", weight: "" });
  const [health, setHealth] = useState({
    vaccinated: "",
    sterilized: "",
    chronicConditions: "",
    allergies: "",
  });
  const [selectedPlan, setSelectedPlan] = useState("");

  if (completed) {
    return (
      <div className="w-full max-w-xl rounded-3xl bg-card p-12 text-center shadow-xl md:p-16">
        <div className="mb-6 text-7xl">🎉</div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-warm md:text-4xl">
          {t("complete.title")}
        </h2>
        <p className="mb-10 text-lg text-muted-foreground">
          {t("complete.subtitle")}
        </p>
        <button
          type="button"
          className={primaryBtn}
          onClick={() => router.push(`/${locale}/dashboard`)}
        >
          {t("complete.cta")} →
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-3xl bg-card p-8 shadow-xl md:p-12">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-3 flex justify-between text-sm font-medium text-muted-foreground">
          <span>{t("progress", { step, total: TOTAL_STEPS })}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-giraffe transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Account */}
      {step === 1 && (
        <>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("step1.title")}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">{t("step1.subtitle")}</p>
          <div className="space-y-5">
            <div>
              <Label htmlFor="name" className="mb-2 block text-base">{t("step1.name")}</Label>
              <Input
                id="name"
                className="h-14 rounded-2xl text-base"
                value={owner.name}
                onChange={(e) => setOwner({ ...owner, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block text-base">{t("step1.email")}</Label>
              <Input
                id="email"
                type="email"
                className="h-14 rounded-2xl text-base"
                value={owner.email}
                onChange={(e) => setOwner({ ...owner, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2 block text-base">{t("step1.password")}</Label>
              <Input
                id="password"
                type="password"
                className="h-14 rounded-2xl text-base"
                value={owner.password}
                onChange={(e) => setOwner({ ...owner, password: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="mb-2 block text-base">{t("step1.confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                className="h-14 rounded-2xl text-base"
                value={owner.confirmPassword}
                onChange={(e) => setOwner({ ...owner, confirmPassword: e.target.value })}
              />
            </div>
            <button type="button" className={`${primaryBtn} mt-4 w-full`} onClick={() => setStep(2)}>
              {t("step1.next")} →
            </button>
          </div>
        </>
      )}

      {/* Step 2: Pet info */}
      {step === 2 && (
        <>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("step2.title")}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">{t("step2.subtitle")}</p>
          <div className="space-y-5">
            <div>
              <Label htmlFor="petName" className="mb-2 block text-base">{t("step2.petName")}</Label>
              <Input
                id="petName"
                className="h-14 rounded-2xl text-base"
                value={pet.name}
                onChange={(e) => setPet({ ...pet, name: e.target.value })}
              />
            </div>
            <div>
              <Label className="mb-2 block text-base">{t("step2.species")}</Label>
              <Select
                value={pet.species}
                onValueChange={(v) => setPet({ ...pet, species: v ?? "" })}
              >
                <SelectTrigger className="h-14 rounded-2xl text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["dog", "cat", "rabbit", "bird", "other"] as const).map((s) => (
                    <SelectItem key={s} value={s}>
                      {t(`step2.speciesOptions.${s}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="breed" className="mb-2 block text-base">{t("step2.breed")}</Label>
              <Input
                id="breed"
                className="h-14 rounded-2xl text-base"
                value={pet.breed}
                onChange={(e) => setPet({ ...pet, breed: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="mb-2 block text-base">{t("step2.age")}</Label>
                <Input
                  id="age"
                  type="number"
                  className="h-14 rounded-2xl text-base"
                  value={pet.age}
                  onChange={(e) => setPet({ ...pet, age: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="weight" className="mb-2 block text-base">{t("step2.weight")}</Label>
                <Input
                  id="weight"
                  type="number"
                  className="h-14 rounded-2xl text-base"
                  value={pet.weight}
                  onChange={(e) => setPet({ ...pet, weight: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" className={`${ghostBtn} flex-1`} onClick={() => setStep(1)}>
                ← {t("step2.back")}
              </button>
              <button type="button" className={`${primaryBtn} flex-1`} onClick={() => setStep(3)}>
                {t("step2.next")} →
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 3: Health */}
      {step === 3 && (
        <>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("step3.title")}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">{t("step3.subtitle")}</p>
          <div className="space-y-6">
            {(["vaccinated", "sterilized", "chronicConditions"] as const).map((field) => (
              <div key={field}>
                <Label className="mb-3 block text-base">{t(`step3.${field}`)}</Label>
                <div className="flex gap-3">
                  {(["yes", "no"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`flex-1 rounded-2xl border-2 px-6 py-4 text-base font-semibold transition-all ${
                        health[field] === val
                          ? "border-warm bg-warm text-cream"
                          : "border-border bg-card text-warm hover:border-warm/40"
                      }`}
                      onClick={() => setHealth({ ...health, [field]: val })}
                    >
                      {t(`step3.${val}`)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <Label htmlFor="allergies" className="mb-2 block text-base">{t("step3.allergies")}</Label>
              <Textarea
                id="allergies"
                className="min-h-28 rounded-2xl text-base"
                placeholder={t("step3.allergiesPlaceholder")}
                value={health.allergies}
                onChange={(e) => setHealth({ ...health, allergies: e.target.value })}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" className={`${ghostBtn} flex-1`} onClick={() => setStep(2)}>
                ← {t("step3.back")}
              </button>
              <button type="button" className={`${primaryBtn} flex-1`} onClick={() => setStep(4)}>
                {t("step3.next")} →
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 4: Plan selection */}
      {step === 4 && (
        <>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("step4.title")}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">{t("step4.subtitle")}</p>
          <div className="space-y-4">
            {(["basic", "standard", "premium"] as const).map((plan) => (
              <button
                key={plan}
                type="button"
                className={`w-full rounded-2xl border-2 p-6 text-left transition-all ${
                  selectedPlan === plan
                    ? "border-warm bg-warm/5 shadow-md"
                    : "border-border bg-card hover:border-warm/30"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-warm">
                    {tp(`${plan}.name`)}
                  </span>
                  <span className="text-2xl font-bold text-warm">
                    €{tp(`${plan}.price`)}
                    <span className="text-sm font-normal text-muted-foreground">/{tp("monthly")}</span>
                  </span>
                </div>
                <p className="mt-2 text-base text-muted-foreground">
                  {tp(`${plan}.description`)}
                </p>
              </button>
            ))}
            <div className="flex gap-3 pt-4">
              <button type="button" className={`${ghostBtn} flex-1`} onClick={() => setStep(3)}>
                ← {t("step4.back")}
              </button>
              <button
                type="button"
                className={`${primaryBtn} flex-1`}
                disabled={!selectedPlan}
                onClick={() => setCompleted(true)}
              >
                {t("step4.finish")} →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
