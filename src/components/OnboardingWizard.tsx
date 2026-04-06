"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const TOTAL_STEPS = 4;

export function OnboardingWizard() {
  const t = useTranslations("onboarding");
  const tp = useTranslations("pricing");
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  // Form states (simulated — no real submission)
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
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mb-4 text-6xl">🎉</div>
          <CardTitle className="text-2xl text-warm">
            {t("complete.title")}
          </CardTitle>
          <CardDescription className="text-base">
            {t("complete.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="bg-giraffe text-warm hover:bg-giraffe-dark"
            onClick={() => router.push(`/${locale}`)}
          >
            {t("complete.cta")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg">
      {/* Progress */}
      <div className="px-6 pt-6">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>
            {t("progress", { step, total: TOTAL_STEPS })}
          </span>
        </div>
        <div className="h-2 rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-giraffe transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Account */}
      {step === 1 && (
        <>
          <CardHeader>
            <CardTitle className="text-warm">{t("step1.title")}</CardTitle>
            <CardDescription>{t("step1.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">{t("step1.name")}</Label>
              <Input
                id="name"
                value={owner.name}
                onChange={(e) => setOwner({ ...owner, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">{t("step1.email")}</Label>
              <Input
                id="email"
                type="email"
                value={owner.email}
                onChange={(e) => setOwner({ ...owner, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="password">{t("step1.password")}</Label>
              <Input
                id="password"
                type="password"
                value={owner.password}
                onChange={(e) => setOwner({ ...owner, password: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">{t("step1.confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={owner.confirmPassword}
                onChange={(e) =>
                  setOwner({ ...owner, confirmPassword: e.target.value })
                }
              />
            </div>
            <Button
              className="w-full bg-giraffe text-warm hover:bg-giraffe-dark"
              onClick={() => setStep(2)}
            >
              {t("step1.next")}
            </Button>
          </CardContent>
        </>
      )}

      {/* Step 2: Pet info */}
      {step === 2 && (
        <>
          <CardHeader>
            <CardTitle className="text-warm">{t("step2.title")}</CardTitle>
            <CardDescription>{t("step2.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="petName">{t("step2.petName")}</Label>
              <Input
                id="petName"
                value={pet.name}
                onChange={(e) => setPet({ ...pet, name: e.target.value })}
              />
            </div>
            <div>
              <Label>{t("step2.species")}</Label>
              <Select
                value={pet.species}
                onValueChange={(v) => setPet({ ...pet, species: v ?? "" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["dog", "cat", "rabbit", "bird", "other"] as const).map(
                    (s) => (
                      <SelectItem key={s} value={s}>
                        {t(`step2.speciesOptions.${s}`)}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="breed">{t("step2.breed")}</Label>
              <Input
                id="breed"
                value={pet.breed}
                onChange={(e) => setPet({ ...pet, breed: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">{t("step2.age")}</Label>
                <Input
                  id="age"
                  type="number"
                  value={pet.age}
                  onChange={(e) => setPet({ ...pet, age: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="weight">{t("step2.weight")}</Label>
                <Input
                  id="weight"
                  type="number"
                  value={pet.weight}
                  onChange={(e) => setPet({ ...pet, weight: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                {t("step2.back")}
              </Button>
              <Button
                className="flex-1 bg-giraffe text-warm hover:bg-giraffe-dark"
                onClick={() => setStep(3)}
              >
                {t("step2.next")}
              </Button>
            </div>
          </CardContent>
        </>
      )}

      {/* Step 3: Health */}
      {step === 3 && (
        <>
          <CardHeader>
            <CardTitle className="text-warm">{t("step3.title")}</CardTitle>
            <CardDescription>{t("step3.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(["vaccinated", "sterilized", "chronicConditions"] as const).map(
              (field) => (
                <div key={field}>
                  <Label className="mb-2 block">{t(`step3.${field}`)}</Label>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant={health[field] === "yes" ? "default" : "outline"}
                      className={
                        health[field] === "yes"
                          ? "bg-giraffe text-warm hover:bg-giraffe-dark"
                          : ""
                      }
                      onClick={() =>
                        setHealth({ ...health, [field]: "yes" })
                      }
                    >
                      {t("step3.yes")}
                    </Button>
                    <Button
                      size="sm"
                      variant={health[field] === "no" ? "default" : "outline"}
                      className={
                        health[field] === "no"
                          ? "bg-giraffe text-warm hover:bg-giraffe-dark"
                          : ""
                      }
                      onClick={() =>
                        setHealth({ ...health, [field]: "no" })
                      }
                    >
                      {t("step3.no")}
                    </Button>
                  </div>
                </div>
              )
            )}
            <div>
              <Label htmlFor="allergies">{t("step3.allergies")}</Label>
              <Textarea
                id="allergies"
                placeholder={t("step3.allergiesPlaceholder")}
                value={health.allergies}
                onChange={(e) =>
                  setHealth({ ...health, allergies: e.target.value })
                }
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                {t("step3.back")}
              </Button>
              <Button
                className="flex-1 bg-giraffe text-warm hover:bg-giraffe-dark"
                onClick={() => setStep(4)}
              >
                {t("step3.next")}
              </Button>
            </div>
          </CardContent>
        </>
      )}

      {/* Step 4: Plan selection */}
      {step === 4 && (
        <>
          <CardHeader>
            <CardTitle className="text-warm">{t("step4.title")}</CardTitle>
            <CardDescription>{t("step4.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(["basic", "standard", "premium"] as const).map((plan) => (
              <button
                key={plan}
                type="button"
                className={`w-full rounded-lg border p-4 text-left transition-colors ${
                  selectedPlan === plan
                    ? "border-giraffe bg-giraffe/5 ring-1 ring-giraffe/20"
                    : "border-border hover:border-giraffe/30"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-warm">
                    {tp(`${plan}.name`)}
                  </span>
                  <span className="text-lg font-bold text-giraffe">
                    €{tp(`${plan}.price`)}/{tp("monthly")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tp(`${plan}.description`)}
                </p>
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                {t("step4.back")}
              </Button>
              <Button
                className="flex-1 bg-giraffe text-warm hover:bg-giraffe-dark"
                disabled={!selectedPlan}
                onClick={() => setCompleted(true)}
              >
                {t("step4.finish")}
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
