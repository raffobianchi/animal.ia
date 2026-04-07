"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const isIt = locale === "it";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/${locale}/dashboard`);
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">🦒</div>
            <CardTitle className="text-warm">{isIt ? "Accedi" : "Log In"}</CardTitle>
            <CardDescription>
              {isIt
                ? "Entra nel tuo account animal.ia"
                : "Sign in to your animal.ia account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-giraffe text-warm hover:bg-giraffe-dark"
              >
                {isIt ? "Accedi" : "Log In"}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {isIt ? "Non hai un account?" : "Don't have an account?"}{" "}
              <Link
                href={`/${locale}/onboarding`}
                className="text-giraffe font-medium hover:underline"
              >
                {isIt ? "Registrati" : "Sign up"}
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
