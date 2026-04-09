"use client";

import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { QuoteWizard } from "~/components/QuoteWizard";
import { saveQuote } from "~/lib/actions";
import { dashContainer, dashPage } from "~/lib/ui";

export default function NewPreventivoPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations("dashboard.preventivi");

  return (
    <div className={dashPage}>
      <div className={dashContainer}>
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {t("new")}
          </h1>
        </div>
        <QuoteWizard
          onSave={async (form, quote) => {
            await saveQuote({
              species: form.species,
              gender: form.gender,
              breedId: form.breedId,
              ageYears: form.ageYears,
              region: form.region,
              health: form.health,
              breakdown: quote,
            });
            router.push(`/${locale}/dashboard/preventivi`);
          }}
        />
      </div>
    </div>
  );
}
