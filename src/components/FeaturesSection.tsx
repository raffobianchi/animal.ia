"use client";

import { useTranslations } from "next-intl";

const featureKeys = [
  { key: "insurance", icon: "🛡️", color: "bg-giraffe/15", spans: "md:col-span-2" },
  { key: "records", icon: "📋", color: "bg-sunset/15", spans: "" },
  { key: "claims", icon: "📝", color: "bg-giraffe-light/30", spans: "" },
  { key: "chatbot", icon: "🤖", color: "bg-warm/5", spans: "md:col-span-2" },
  { key: "documents", icon: "📁", color: "bg-sunset-light/25", spans: "" },
  { key: "onboarding", icon: "✨", color: "bg-giraffe/15", spans: "" },
] as const;

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section id="features" className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl md:mb-20">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-warm md:text-6xl">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground md:text-2xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {featureKeys.map(({ key, icon, color, spans }) => (
            <div
              key={key}
              className={`${spans} group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:border-giraffe/40 hover:shadow-lg md:p-10`}
            >
              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${color} text-4xl`}>
                {icon}
              </div>
              <h3 className="mb-3 text-2xl font-semibold tracking-tight text-warm md:text-3xl">
                {t(`${key}.title`)}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
