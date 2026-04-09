import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUserId } from "~/lib/auth";
import { getAllVets } from "~/lib/queries";
import { VetSearchClient } from "~/components/VetSearchClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.vet" });
  return { title: t("title"), description: t("description") };
}

export default async function VetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Auth guard
  try {
    await getCurrentUserId();
  } catch {
    redirect(`/${locale}/login?returnTo=/vet`);
  }

  const vets = await getAllVets();

  return <VetSearchClient initialVets={vets} />;
}
