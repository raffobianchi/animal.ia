"use client";

import { useEffect, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { btnGhost, btnPrimary } from "~/lib/ui";
import { completeOnboarding } from "~/lib/actions";
import type { QuoteBreakdown } from "~/data/pricing";

type StoredQuote = {
  form: {
    species: "dog" | "cat";
    breedId: string;
    ageYears: number;
    region: string;
  };
  quote: QuoteBreakdown;
  microchipCode?: string;
};

export function OnboardingWizard() {
  const t = useTranslations("onboarding");
  const tr = useTranslations("onboarding.review");
  const tq = useTranslations("quote");
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  const [stored, setStored] = useState<StoredQuote | null>(null);
  const [petName, setPetName] = useState("");
  const [microchipCode, setMicrochipCode] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const raw = sessionStorage.getItem("animalia.quote");
      if (raw) {
        const parsed = JSON.parse(raw) as StoredQuote;
        setStored(parsed);
        if (parsed.microchipCode) setMicrochipCode(parsed.microchipCode);
      }
    } catch {
      /* ignore */
    }
  }, []);

  if (!hydrated) return null;

  // Missing-quote state: send user back to the homepage quote wizard
  if (!stored) {
    return (
      <div className="w-full max-w-xl rounded-3xl bg-card p-10 text-center shadow-xl md:p-14">
        <div className="mb-6 text-6xl">🦒</div>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-warm md:text-4xl">
          {tr("noQuoteTitle")}
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">{tr("noQuoteSubtitle")}</p>
        <Link href={`/${locale}#quote`} className={btnPrimary}>
          {tr("noQuoteCta")} →
        </Link>
      </div>
    );
  }

  // Completion splash
  if (completed) {
    return (
      <div className="w-full max-w-xl rounded-3xl bg-card p-12 text-center shadow-xl md:p-16">
        <div className="mb-6 text-7xl">🎉</div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-warm md:text-4xl">
          {t("complete.title")}
        </h2>
        <p className="mb-10 text-lg text-muted-foreground">{t("complete.subtitle")}</p>
        <button
          type="button"
          className={btnPrimary}
          onClick={() => router.push(`/${locale}/dashboard`)}
        >
          {t("complete.cta")} →
        </button>
      </div>
    );
  }

  const { form, quote } = stored;
  const canSubmit = petName.trim() && ownerName.trim() && ownerEmail.trim();

  function submit() {
    if (!canSubmit) return;
    startTransition(async () => {
      await completeOnboarding({
        ownerName: ownerName.trim(),
        ownerEmail: ownerEmail.trim(),
        petName: petName.trim(),
        microchipCode: microchipCode.trim() || undefined,
        quoteForm: form,
        quote,
      });
      try {
        sessionStorage.removeItem("animalia.quote");
      } catch {
        /* ignore */
      }
      setCompleted(true);
    });
  }

  return (
    <div className="w-full max-w-2xl rounded-3xl bg-card p-8 shadow-xl md:p-12">
      <h2 className="mb-2 text-3xl font-bold tracking-tight text-warm md:text-4xl">
        {tr("title")}
      </h2>
      <p className="mb-8 text-lg text-muted-foreground">{tr("subtitle")}</p>

      {/* Quote summary */}
      <div className="mb-8 rounded-2xl border border-border/60 bg-secondary/40 p-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {tr("yourQuote")}
        </p>
        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight text-warm">
            €{quote.finalMonthly.toFixed(2)}
          </span>
          <span className="text-base text-muted-foreground">/ {tr("monthly")}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {tq(`breeds.${form.breedId}`)} · {tq(`regions.${form.region}`)} ·{" "}
          {form.ageYears} {form.ageYears === 1 ? "anno" : "anni"}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-5">
        <div>
          <Label htmlFor="petName" className="mb-2 block text-base">
            {tr("petNameLabel")}
          </Label>
          <Input
            id="petName"
            className="h-14 rounded-2xl text-base"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder={tr("petNamePlaceholder")}
          />
        </div>
        <div>
          <Label htmlFor="microchipCode" className="mb-2 block text-base">
            {tr("microchipLabel")}
          </Label>
          <Input
            id="microchipCode"
            className="h-14 rounded-2xl text-base"
            value={microchipCode}
            onChange={(e) => setMicrochipCode(e.target.value)}
            placeholder={tr("microchipPlaceholder")}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="ownerName" className="mb-2 block text-base">
              {tr("ownerName")}
            </Label>
            <Input
              id="ownerName"
              className="h-14 rounded-2xl text-base"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ownerEmail" className="mb-2 block text-base">
              {tr("ownerEmail")}
            </Label>
            <Input
              id="ownerEmail"
              type="email"
              className="h-14 rounded-2xl text-base"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <Link href={`/${locale}#quote`} className={`${btnGhost} flex-1 text-center`}>
            ← {tq("recalc")}
          </Link>
          <button
            type="button"
            className={`${btnPrimary} flex-1`}
            disabled={!canSubmit || isPending}
            onClick={submit}
          >
            {isPending ? tr("creating") : `${tr("finishCta")} →`}
          </button>
        </div>
      </div>
    </div>
  );
}
