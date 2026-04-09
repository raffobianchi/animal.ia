"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import {
  BREEDS,
  HEALTH_DEFAULTS,
  REGIONS,
  breedsForSpecies,
  computeQuote,
  healthClass,
  type HealthAnswers,
  type QuoteBreakdown,
  type Region,
  type Species,
  type VetVisits,
} from "~/data/pricing";
import { btnGhost, btnPrimary, inputBig } from "~/lib/ui";
import { cn } from "~/lib/utils";

const TOTAL_STEPS = 3;

type FormState = {
  species: Species;
  breedId: string;
  ageYears: string;
  microchipCode: string;
  region: Region | "";
  health: HealthAnswers;
};

const initial: FormState = {
  species: "dog",
  breedId: "non_pedigree_dog",
  ageYears: "",
  microchipCode: "",
  region: "",
  health: HEALTH_DEFAULTS,
};

export function QuoteWizard() {
  const t = useTranslations("quote");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [showResult, setShowResult] = useState(false);

  // Reset breed when species changes
  function setSpecies(species: Species) {
    setForm((f) => ({
      ...f,
      species,
      breedId: species === "dog" ? "non_pedigree_dog" : "non_pedigree_cat",
    }));
  }

  const ageNum = Number(form.ageYears);
  const ageValid = form.ageYears !== "" && Number.isFinite(ageNum) && ageNum >= 0 && ageNum < 30;
  const step1Valid = ageValid && !!form.breedId;
  const step2Valid = !!form.region;

  const quote: QuoteBreakdown | null = useMemo(() => {
    if (!step1Valid || !step2Valid) return null;
    try {
      return computeQuote({
        species: form.species,
        breedId: form.breedId,
        ageYears: ageNum,
        region: form.region as Region,
        health: form.health,
      });
    } catch {
      return null;
    }
  }, [form, ageNum, step1Valid, step2Valid]);

  function activate() {
    if (!quote) return;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "animalia.quote",
        JSON.stringify({ form: { ...form, ageYears: ageNum }, quote, microchipCode: form.microchipCode })
      );
    }
    router.push(`/${locale}/onboarding`);
  }

  // ── Result view ───────────────────────────────────────────────────────────
  if (showResult && quote) {
    return <ResultCard quote={quote} onEdit={() => setShowResult(false)} onActivate={activate} />;
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-border/60 bg-card p-6 shadow-xl md:p-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>{t("step", { step, total: TOTAL_STEPS })}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-giraffe transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Pet */}
      {step === 1 && (
        <>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("step1.title")}
          </h2>
          <p className="mb-8 text-base text-muted-foreground md:text-lg">{t("step1.subtitle")}</p>

          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("step1.species")}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["dog", "cat"] as const).map((s) => {
                const active = form.species === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpecies(s)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center justify-center gap-3 rounded-2xl border-2 px-6 py-5 text-base font-semibold transition-all",
                      active
                        ? "border-warm bg-warm text-cream shadow-md"
                        : "border-border bg-card text-warm hover:border-warm/40"
                    )}
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {s === "dog" ? "🐶" : "🐱"}
                    </span>
                    {t(`step1.species${s === "dog" ? "Dog" : "Cat"}`)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="breed"
              className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {t("step1.breed")}
            </label>
            <select
              id="breed"
              value={form.breedId}
              onChange={(e) => setForm({ ...form, breedId: e.target.value })}
              className={cn(inputBig, "w-full border border-border bg-card px-4")}
            >
              {breedsForSpecies(form.species).map((b) => (
                <option key={b.id} value={b.id}>
                  {t(`breeds.${b.id}`)}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-muted-foreground">{t("step1.breedHelp")}</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="age"
              className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {t("step1.age")}
            </label>
            <input
              id="age"
              type="number"
              inputMode="numeric"
              min={0}
              max={29}
              step={1}
              placeholder={t("step1.agePlaceholder")}
              value={form.ageYears}
              onChange={(e) => setForm({ ...form, ageYears: e.target.value })}
              className={cn(inputBig, "w-full border border-border bg-card px-4")}
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="microchip"
              className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {t("step1.microchip")}
            </label>
            <input
              id="microchip"
              type="text"
              inputMode="numeric"
              placeholder={t("step1.microchipPlaceholder")}
              value={form.microchipCode}
              onChange={(e) => setForm({ ...form, microchipCode: e.target.value })}
              className={cn(inputBig, "w-full border border-border bg-card px-4")}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className={btnPrimary}
              disabled={!step1Valid}
              onClick={() => setStep(2)}
            >
              {t("next")} →
            </button>
          </div>
        </>
      )}

      {/* Step 2: Region */}
      {step === 2 && (
        <>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("step2.title")}
          </h2>
          <p className="mb-8 text-base text-muted-foreground md:text-lg">{t("step2.subtitle")}</p>

          <div className="mb-8">
            <label
              htmlFor="region"
              className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {t("step2.region")}
            </label>
            <select
              id="region"
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value as Region })}
              className={cn(inputBig, "w-full border border-border bg-card px-4")}
            >
              <option value="">{t("step2.regionPlaceholder")}</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {t(`regions.${r.id}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button type="button" className={btnGhost} onClick={() => setStep(1)}>
              ← {t("back")}
            </button>
            <button
              type="button"
              className={btnPrimary}
              disabled={!step2Valid}
              onClick={() => setStep(3)}
            >
              {t("next")} →
            </button>
          </div>
        </>
      )}

      {/* Step 3: Health */}
      {step === 3 && (
        <>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("step3.title")}
          </h2>
          <p className="mb-8 text-base text-muted-foreground md:text-lg">{t("step3.subtitle")}</p>

          <div className="space-y-6">
            {(
              [
                ["previousSurgery", "previousSurgery"],
                ["chronicCondition", "chronicCondition"],
                ["regularMedication", "regularMedication"],
              ] as const
            ).map(([key, k]) => (
              <YesNo
                key={key}
                label={t(`step3.${k}`)}
                yes={t("step3.yes")}
                no={t("step3.no")}
                value={form.health[key]}
                onChange={(v) => setForm({ ...form, health: { ...form.health, [key]: v } })}
              />
            ))}

            <div>
              <p className="mb-3 text-base font-medium text-warm">{t("step3.vetVisits")}</p>
              <div className="grid grid-cols-3 gap-3">
                {(["0-1", "2-4", "5+"] as const).map((v) => {
                  const active = form.health.vetVisits === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, health: { ...form.health, vetVisits: v as VetVisits } })
                      }
                      aria-pressed={active}
                      className={cn(
                        "rounded-2xl border-2 px-4 py-4 text-base font-semibold transition-all",
                        active
                          ? "border-warm bg-warm text-cream"
                          : "border-border bg-card text-warm hover:border-warm/40"
                      )}
                    >
                      {t(`vetVisits.${v}`)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button type="button" className={btnGhost} onClick={() => setStep(2)}>
              ← {t("back")}
            </button>
            <button
              type="button"
              className={btnPrimary}
              disabled={!quote}
              onClick={() => setShowResult(true)}
            >
              {t("next")} →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

function YesNo({
  label,
  yes,
  no,
  value,
  onChange,
}: {
  label: string;
  yes: string;
  no: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-base font-medium text-warm">{label}</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { v: true, label: yes },
          { v: false, label: no },
        ].map(({ v, label: l }) => {
          const active = value === v;
          return (
            <button
              key={String(v)}
              type="button"
              onClick={() => onChange(v)}
              aria-pressed={active}
              className={cn(
                "rounded-2xl border-2 px-4 py-4 text-base font-semibold transition-all",
                active
                  ? "border-warm bg-warm text-cream"
                  : "border-border bg-card text-warm hover:border-warm/40"
              )}
            >
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({
  quote,
  onEdit,
  onActivate,
}: {
  quote: QuoteBreakdown;
  onEdit: () => void;
  onActivate: () => void;
}) {
  const t = useTranslations("quote");
  const hClass = healthClass(quote.healthMult);

  const rows: { label: string; value: string }[] = [
    { label: t("result.rowSpecies"), value: t(`step1.species${quote.species === "dog" ? "Dog" : "Cat"}`) },
    { label: t("result.rowStage"), value: t(`stage.${quote.stage}`) },
    { label: t("result.rowArea"), value: t(`area.${quote.area}`) },
    { label: t("result.rowBreedRisk"), value: t(`breedRisk.${quote.breedRisk}`) },
    { label: t("result.rowHealth"), value: t(`health.${hClass}`) },
    { label: t("result.rowAnnual"), value: `€${quote.finalAnnual.toFixed(2)}` },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-border/60 bg-card p-6 shadow-2xl md:p-12">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("result.title")}
        </p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-7xl font-bold tracking-tight text-warm md:text-8xl">
            €{quote.finalMonthly.toFixed(2)}
          </span>
          <span className="text-2xl text-muted-foreground">{t("result.perMonth")}</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          €{quote.finalAnnual.toFixed(2)} {t("result.perYear")} · {t("result.includes")}
        </p>
      </div>

      <div className="mb-8 rounded-2xl bg-secondary/60 p-6">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("result.breakdown")}
        </p>
        <dl className="space-y-3">
          {rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-muted-foreground">{r.label}</dt>
              <dd className="text-base font-semibold text-warm">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" className={cn(btnGhost, "flex-1")} onClick={onEdit}>
          ← {t("recalc")}
        </button>
        <button type="button" className={cn(btnPrimary, "flex-1")} onClick={onActivate}>
          {t("activate")} →
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground">{t("result.disclaimer")}</p>
    </div>
  );
}
