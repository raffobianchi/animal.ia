"use client";

import { useRouter } from "next/navigation";
import { btnAccent, btnPrimary } from "~/lib/ui";
import { cn } from "~/lib/utils";
import type { QuoteBreakdown } from "~/data/pricing";

type Props = {
  quoteData: {
    form: { species: "dog" | "cat"; gender: "male" | "female"; breedId: string; ageYears: number; region: string };
    quote: QuoteBreakdown;
  };
  locale: string;
  activateLabel: string;
  printLabel: string;
};

export function QuoteDetailActions({ quoteData, locale, activateLabel, printLabel }: Props) {
  const router = useRouter();

  function handleActivate() {
    sessionStorage.setItem(
      "animalia.quote",
      JSON.stringify({
        form: quoteData.form,
        quote: quoteData.quote,
        microchipCode: "",
      }),
    );
    router.push(`/${locale}/dashboard/policies/new`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <button type="button" className={cn(btnAccent, "flex-1 sm:flex-initial")} onClick={() => window.print()}>
        {printLabel}
      </button>
      <button type="button" className={cn(btnPrimary, "flex-1 sm:flex-initial")} onClick={handleActivate}>
        {activateLabel} &rarr;
      </button>
    </div>
  );
}
