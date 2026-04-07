"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const COOKIE_KEY = "animal-ia-cookie-consent";

export function CookieBanner() {
  const params = useParams();
  const locale = (params.locale as string) ?? "it";
  const isIt = locale === "it";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept(value: "all" | "essential") {
    localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border bg-card p-4 shadow-lg md:bottom-6 md:left-6 md:right-auto md:max-w-md md:rounded-2xl md:border">
      <div className="mb-3">
        <p className="text-sm font-medium text-warm mb-1">
          🍪 {isIt ? "Questo sito utilizza cookie" : "This site uses cookies"}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {isIt
            ? "Utilizziamo cookie tecnici necessari e, con il tuo consenso, cookie analitici per migliorare la tua esperienza. "
            : "We use necessary technical cookies and, with your consent, analytics cookies to improve your experience. "}
          <Link
            href={`/${locale}/cookies`}
            className="text-giraffe underline hover:text-giraffe-dark"
          >
            {isIt ? "Scopri di più" : "Learn more"}
          </Link>
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 text-xs"
          onClick={() => accept("essential")}
        >
          {isIt ? "Solo essenziali" : "Essential only"}
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-giraffe text-warm hover:bg-giraffe-dark text-xs"
          onClick={() => accept("all")}
        >
          {isIt ? "Accetta tutti" : "Accept all"}
        </Button>
      </div>
    </div>
  );
}
