"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { btnPrimary, inputBig } from "~/lib/ui";

export default function LoginPage() {
  const t = useTranslations("login");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/${locale}/dashboard`);
  }

  return (
    <>
      <Header />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20 md:py-28">
        {/* Background blob */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-giraffe/20 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-sunset/15 blur-3xl" />
        </div>

        <div className="relative w-full max-w-md rounded-3xl bg-card p-10 shadow-xl md:p-12">
          <div className="mb-10 text-center">
            <div className="mb-5 text-6xl">🦒</div>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-warm md:text-4xl">
              {t("title")}
            </h1>
            <p className="text-base text-muted-foreground">{t("subtitle")}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="mb-2 block text-base">
                {t("email")}
              </Label>
              <Input
                id="email"
                type="email"
                className={inputBig}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2 block text-base">
                {t("password")}
              </Label>
              <Input
                id="password"
                type="password"
                className={inputBig}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={`${btnPrimary} mt-2 w-full`}>
              {t("submit")} →
            </button>
          </form>

          <p className="mt-8 text-center text-base text-muted-foreground">
            {t("noAccount")}{" "}
            <Link
              href={`/${locale}/onboarding`}
              className="font-semibold text-warm hover:text-giraffe-dark"
            >
              {t("signup")}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
