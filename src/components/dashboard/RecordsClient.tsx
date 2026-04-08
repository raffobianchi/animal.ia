"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { createMedicalRecord } from "~/lib/actions";
import { btnPrimary } from "~/lib/ui";

const typeIcons: Record<string, string> = {
  visit: "🩺",
  vaccine: "💉",
  treatment: "💊",
  surgery: "🏥",
  checkup: "✅",
};

const typeKeys = ["visit", "vaccine", "treatment", "surgery", "checkup"] as const;

export type ClientRecord = {
  id: string;
  type: string;
  title: string;
  description: string;
  vetName: string;
  date: string; // ISO date (YYYY-MM-DD)
};

export function RecordsClient({ records }: { records: ClientRecord[] }) {
  const t = useTranslations("dashboard.records");
  const tt = useTranslations("dashboard.records.types");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    type: "",
    title: "",
    description: "",
    vetName: "",
    date: "",
  });

  function onSubmit() {
    if (!form.title || !form.type || !form.date) return;
    startTransition(async () => {
      await createMedicalRecord(form);
      setForm({ type: "", title: "", description: "", vetName: "", date: "" });
      setDialogOpen(false);
    });
  }

  return (
    <>
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-warm md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className={`${btnPrimary} shrink-0`}>+ {t("new")}</DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-warm">{t("addTitle")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label className="mb-2 block">{t("type")}</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v ?? "" })}
                >
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue placeholder={t("typePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {typeKeys.map((key) => (
                      <SelectItem key={key} value={key}>
                        {typeIcons[key]} {tt(key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block">{t("entryTitle")}</Label>
                <Input
                  className="h-12 rounded-2xl"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder={t("titlePlaceholder")}
                />
              </div>
              <div>
                <Label className="mb-2 block">{t("description")}</Label>
                <Textarea
                  className="min-h-24 rounded-2xl"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder={t("descriptionPlaceholder")}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">{t("date")}</Label>
                  <Input
                    type="date"
                    className="h-12 rounded-2xl"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">{t("vet")}</Label>
                  <Input
                    className="h-12 rounded-2xl"
                    value={form.vetName}
                    onChange={(e) => setForm({ ...form, vetName: e.target.value })}
                    placeholder="Dr. ..."
                  />
                </div>
              </div>
              <button
                type="button"
                className={`${btnPrimary} w-full`}
                onClick={onSubmit}
                disabled={isPending || !form.title || !form.type || !form.date}
              >
                {isPending ? "…" : t("add")}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-0">
        {records.map((record, i) => (
          <div key={record.id} className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-3xl">
                {typeIcons[record.type]}
              </div>
              {i < records.length - 1 && <div className="my-2 w-0.5 flex-1 bg-border" />}
            </div>
            <div className="mb-6 flex-1 rounded-3xl border border-border/60 bg-card p-6 md:p-8">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-xl font-bold tracking-tight text-warm">{record.title}</h3>
                <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-warm">
                  {tt(record.type)}
                </span>
              </div>
              <p className="mb-3 text-base text-muted-foreground">{record.description}</p>
              <p className="text-sm text-muted-foreground">
                {record.date} · {record.vetName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
