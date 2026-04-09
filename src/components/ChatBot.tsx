"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { cn } from "~/lib/utils";

interface Message {
  role: "user" | "bot";
  text: string;
}

type ResponseKey = "coverage" | "claim" | "refund" | "cancel" | "vaccine" | "documents";

function matchKey(input: string): ResponseKey | null {
  const lower = input.toLowerCase();
  if (lower.match(/rimborso|refund|pagament|payment/)) return "refund";
  if (lower.match(/sinistro|claim|richiest/)) return "claim";
  if (lower.match(/coper|cover|piano|plan|includ/)) return "coverage";
  if (lower.match(/cancell|disdett|cancel|annull/)) return "cancel";
  if (lower.match(/vaccin|richiamo|booster/)) return "vaccine";
  if (lower.match(/document|passport|passaporto|certificat/)) return "documents";
  return null;
}

export function ChatBot() {
  const t = useTranslations("chatbot");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: t("greeting") },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const closeChat = useCallback(() => setOpen(false), []);

  // Escape key closes chat
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeChat();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeChat]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const key = matchKey(text);
    const response = key ? t(`responses.${key}`) : t("fallback");
    setMessages((prev) => [...prev, { role: "user", text }, { role: "bot", text: response }]);
    setInput("");
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-warm text-cream shadow-2xl transition-all hover:bg-warm/90 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-giraffe focus-visible:ring-offset-2 focus-visible:ring-offset-background md:bottom-8 md:right-8"
        aria-label={t("ariaLabel")}
        aria-expanded={open}
      >
        {open ? (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-3xl">💬</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
          className="fixed bottom-44 right-6 z-50 flex h-[32rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl md:bottom-28 md:right-8"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-warm px-6 py-5 text-cream">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-giraffe text-2xl">
              🦒
            </div>
            <div>
              <p className="text-base font-semibold">animal.ia</p>
              <p className="text-xs text-cream/60">{t("title")}</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-secondary/30 p-5" aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed",
                  msg.role === "bot"
                    ? "rounded-bl-md bg-card text-foreground shadow-sm"
                    : "ml-auto rounded-br-md bg-warm text-cream"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2 border-t border-border/60 p-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              aria-label={t("placeholder")}
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-giraffe"
            />
            <button
              type="submit"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-warm text-lg text-cream transition-all hover:bg-warm/90 hover:scale-105"
              aria-label="Send"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
