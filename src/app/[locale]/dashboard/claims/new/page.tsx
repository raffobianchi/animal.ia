"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { btnGhost, btnPrimary, dashPage, inputBig } from "~/lib/ui";

export default function NewClaimPage() {
  const t = useTranslations("dashboard.newClaim");
  const tc = useTranslations("common");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    description: "",
    incidentDate: "",
    vetName: "",
    amount: "",
  });

  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-14">
        <div className="w-full max-w-xl rounded-3xl bg-card p-12 text-center shadow-xl md:p-16">
          <div className="mb-6 text-7xl">✅</div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-warm md:text-4xl">
            {t("doneTitle")}
          </h2>
          <p className="mb-2 text-lg text-muted-foreground">{t("doneSubtitle")}</p>
          <p className="mb-10 text-sm text-muted-foreground">{t("doneRef")}</p>
          <button className={btnPrimary} onClick={() => router.push(`/${locale}/dashboard/claims`)}>
            {t("goToClaims")} →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={dashPage}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-12">
          <div className="space-y-6">
            <div>
              <Label htmlFor="description" className="mb-2 block text-base">
                {t("description")}
              </Label>
              <Textarea
                id="description"
                className="min-h-32 rounded-2xl text-base"
                placeholder={t("descriptionPlaceholder")}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="incidentDate" className="mb-2 block text-base">
                  {t("incidentDate")}
                </Label>
                <Input
                  id="incidentDate"
                  type="date"
                  className={inputBig}
                  value={form.incidentDate}
                  onChange={(e) => setForm({ ...form, incidentDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="vetName" className="mb-2 block text-base">
                  {t("vetName")}
                </Label>
                <Input
                  id="vetName"
                  className={inputBig}
                  placeholder="Dr. ..."
                  value={form.vetName}
                  onChange={(e) => setForm({ ...form, vetName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="amount" className="mb-2 block text-base">
                {t("amount")}
              </Label>
              <Input
                id="amount"
                type="number"
                className={inputBig}
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>

            <div>
              <Label className="mb-2 block text-base">{t("uploadDocs")}</Label>
              <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/30 px-6 py-12">
                <div className="text-center">
                  <span className="text-4xl">📎</span>
                  <p className="mt-3 text-base text-muted-foreground">{t("dragFiles")}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("fileTypes")}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button className={`${btnGhost} flex-1`} onClick={() => router.back()}>
                {tc("cancel")}
              </button>
              <button className={`${btnPrimary} flex-1`} onClick={() => setSubmitted(true)}>
                {t("submit")} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
