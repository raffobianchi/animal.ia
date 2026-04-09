"use client";

import { useTranslations } from "next-intl";
import { cn } from "~/lib/utils";
import type { VetWithDistance } from "~/lib/geo";

type Props = {
  vets: VetWithDistance[];
  selectedVetId: string | null;
  onVetSelect: (id: string) => void;
};

export function VetList({ vets, selectedVetId, onVetSelect }: Props) {
  const t = useTranslations("vet");

  if (vets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="mb-4 text-5xl">🔍</span>
        <p className="text-lg font-semibold text-warm">{t("noResults")}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("noResultsDesc")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {vets.map((vet) => (
        <button
          key={vet.id}
          type="button"
          onClick={() => onVetSelect(vet.id)}
          className={cn(
            "rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:shadow-md",
            selectedVetId === vet.id && "border-giraffe ring-2 ring-giraffe/30",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base font-semibold text-warm">
                  {vet.name}
                </h3>
                {vet.emergency && (
                  <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                    {t("emergency")}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {vet.address}, {vet.city}
              </p>
            </div>
            {vet.distance > 0 && (
              <span className="shrink-0 text-sm font-medium text-giraffe-dark">
                {vet.distance.toFixed(1)} km
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <a
              href={`tel:${vet.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium text-warm underline-offset-2 hover:underline"
            >
              {vet.phone}
            </a>
            {vet.website && (
              <a
                href={vet.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-giraffe-dark underline-offset-2 hover:underline"
              >
                {t("website")}
              </a>
            )}
          </div>

          {vet.specialties.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {vet.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-warm-light"
                >
                  {t(`specialties.${s}`)}
                </span>
              ))}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
