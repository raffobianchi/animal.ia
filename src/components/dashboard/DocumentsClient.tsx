"use client";

import { useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
import { createDocument } from "~/lib/actions";
import { btnPrimary } from "~/lib/ui";

const typeIcons: Record<string, string> = {
  passport: "🛂",
  vaccination_card: "💉",
  microchip: "📡",
  adoption: "🏠",
  other: "📄",
};

const typeColors: Record<string, string> = {
  passport: "bg-giraffe/15",
  vaccination_card: "bg-sunset/15",
  microchip: "bg-giraffe-light/40",
  adoption: "bg-sunset-light/30",
  other: "bg-secondary",
};

const typeKeys = ["passport", "vaccination_card", "microchip", "adoption", "other"] as const;

export type ClientDocument = {
  id: string;
  type: string;
  name: string;
  uploadDate: string;
  fileUrl: string;
};

export function DocumentsClient({ docs }: { docs: ClientDocument[] }) {
  const t = useTranslations("dashboard.documents");
  const tt = useTranslations("dashboard.documents.types");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ name: "", type: "" });
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(f: File | null) {
    setUploadError(null);
    setFile(f);
    if (f && !form.name) setForm((prev) => ({ ...prev, name: f.name }));
  }

  function onSubmit() {
    if (!form.name || !form.type || !file) return;
    startTransition(async () => {
      setUploadError(null);
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({ error: "Upload failed" }));
        setUploadError(msg.error ?? "Upload failed");
        return;
      }
      const { url } = (await res.json()) as { url: string };
      await createDocument({ name: form.name, type: form.type, fileUrl: url });
      setForm({ name: "", type: "" });
      setFile(null);
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
          <DialogTrigger className={`${btnPrimary} shrink-0`}>📎 {t("upload")}</DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-warm">{t("uploadTitle")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label className="mb-2 block">{t("name")}</Label>
                <Input
                  className="h-12 rounded-2xl"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t("namePlaceholder")}
                />
              </div>
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
                <Label className="mb-2 block">{t("file")}</Label>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/30 px-6 py-10 transition-colors hover:border-warm/40"
                >
                  <div className="text-center">
                    <span className="text-4xl">📎</span>
                    {file ? (
                      <p className="mt-3 text-base font-medium text-warm">{file.name}</p>
                    ) : (
                      <>
                        <p className="mt-3 text-base text-muted-foreground">{t("dragFile")}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{t("fileTypes")}</p>
                      </>
                    )}
                  </div>
                </button>
                {uploadError && (
                  <p className="mt-2 text-sm text-destructive">{uploadError}</p>
                )}
              </div>
              <button
                type="button"
                className={`${btnPrimary} w-full`}
                onClick={onSubmit}
                disabled={isPending || !form.name || !form.type || !file}
              >
                {isPending ? "…" : t("uploadCta")}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <a
            key={doc.id}
            href={doc.fileUrl && doc.fileUrl !== "#" ? doc.fileUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-3xl border border-border/60 bg-card p-7 transition-all hover:border-warm/30 hover:shadow-lg"
          >
            <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${typeColors[doc.type]} text-3xl`}>
              {typeIcons[doc.type]}
            </div>
            <p className="mb-2 text-lg font-semibold text-warm">{doc.name}</p>
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-warm">
              {tt(doc.type)}
            </span>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("uploadedOn")} {doc.uploadDate}
            </p>
          </a>
        ))}

        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card/50 p-12 text-center transition-all hover:border-warm/30 hover:bg-card"
        >
          <span className="mb-3 text-5xl">➕</span>
          <p className="text-base font-semibold text-muted-foreground">{t("addDoc")}</p>
        </button>
      </div>
    </>
  );
}
