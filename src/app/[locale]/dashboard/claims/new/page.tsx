"use client";

import { useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { btnGhost, btnPrimary, dashPage, inputBig } from "~/lib/ui";
import { createClaim } from "~/lib/actions";

type Uploaded = { url: string; name: string };

export default function NewClaimPage() {
  const t = useTranslations("dashboard.newClaim");
  const tc = useTranslations("common");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploads, setUploads] = useState<Uploaded[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    description: "",
    incidentDate: "",
    vetName: "",
    amount: "",
  });

  async function onFilesPicked(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    const next: Uploaded[] = [];
    for (const file of Array.from(files)) {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({ error: "Upload failed" }));
        setError(msg.error ?? "Upload failed");
        return;
      }
      const { url, name } = (await res.json()) as Uploaded;
      next.push({ url, name });
    }
    setUploads((prev) => [...prev, ...next]);
  }

  function onSubmit() {
    if (!form.description || !form.incidentDate || !form.amount) return;
    startTransition(async () => {
      try {
        await createClaim({
          description: form.description,
          incidentDate: form.incidentDate,
          vetName: form.vetName,
          amount: Number(form.amount),
          documents: uploads.map((u) => u.url),
        });
        setSubmitted(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed");
      }
    });
  }

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
          <button
            type="button"
            className={btnPrimary}
            onClick={() => router.push(`/${locale}/dashboard/claims`)}
          >
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
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => onFilesPicked(e.target.files)}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/30 px-6 py-12 transition-colors hover:border-warm/40"
              >
                <div className="text-center">
                  <span className="text-4xl">📎</span>
                  <p className="mt-3 text-base text-muted-foreground">{t("dragFiles")}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("fileTypes")}</p>
                </div>
              </button>
              {uploads.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {uploads.map((u) => (
                    <li
                      key={u.url}
                      className="flex items-center gap-3 rounded-2xl border border-border/60 px-4 py-3 text-sm"
                    >
                      <span className="text-lg">📄</span>
                      <span className="flex-1 truncate text-warm">{u.name}</span>
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          setUploads((prev) => prev.filter((x) => x.url !== u.url))
                        }
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                className={`${btnGhost} flex-1`}
                onClick={() => router.back()}
              >
                {tc("cancel")}
              </button>
              <button
                type="button"
                className={`${btnPrimary} flex-1`}
                disabled={
                  isPending ||
                  !form.description ||
                  !form.incidentDate ||
                  !form.amount
                }
                onClick={onSubmit}
              >
                {isPending ? "…" : `${t("submit")} →`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
