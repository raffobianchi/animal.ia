"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const featureKeys = [
  { key: "insurance", icon: "🛡️" },
  { key: "records", icon: "📋" },
  { key: "claims", icon: "📝" },
  { key: "chatbot", icon: "🤖" },
  { key: "documents", icon: "📁" },
  { key: "onboarding", icon: "✨" },
] as const;

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section id="features" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-warm md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map(({ key, icon }) => (
            <Card
              key={key}
              className="border-border/50 bg-card transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="mb-2 text-3xl">{icon}</div>
                <CardTitle className="text-lg text-warm">
                  {t(`${key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t(`${key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
