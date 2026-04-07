"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface Message {
  role: "user" | "bot";
  text: string;
}

const faqResponses: Record<string, { it: string; en: string }[]> = {
  coverage: [
    {
      it: "Il piano Base copre infortuni, archivio documenti, cartella clinica e assistente AI. Il piano Standard aggiunge copertura malattie, sinistri illimitati e supporto prioritario. Il Premium include anche copertura dentale, visite specialistiche e assistenza 24/7.",
      en: "The Basic plan covers accidents, document archive, medical records, and AI assistant. The Standard plan adds illness coverage, unlimited claims, and priority support. Premium also includes dental coverage, specialist visits, and 24/7 support.",
    },
  ],
  claim: [
    {
      it: "Per aprire un sinistro, vai nella sezione Sinistri della dashboard e clicca 'Nuovo Sinistro'. Compila il modulo con la descrizione, la data dell'incidente, il nome del veterinario e l'importo. Puoi allegare fatture e ricevute. Il sinistro verrà elaborato entro 5-10 giorni lavorativi.",
      en: "To file a claim, go to the Claims section of your dashboard and click 'New Claim'. Fill out the form with the description, incident date, vet name, and amount. You can attach invoices and receipts. The claim will be processed within 5-10 business days.",
    },
  ],
  refund: [
    {
      it: "Una volta approvato il sinistro, il rimborso viene inviato sul tuo conto entro 3-5 giorni lavorativi. Puoi monitorare lo stato nella pagina dettagli del sinistro.",
      en: "Once your claim is approved, the refund is sent to your account within 3-5 business days. You can track the status on the claim details page.",
    },
  ],
  cancel: [
    {
      it: "Puoi cancellare la tua polizza in qualsiasi momento dalle impostazioni del tuo account. Il recesso è gratuito entro i primi 14 giorni. Dopo, si applica un preavviso di 30 giorni.",
      en: "You can cancel your policy at any time from your account settings. Withdrawal is free within the first 14 days. After that, a 30-day notice period applies.",
    },
  ],
  vaccine: [
    {
      it: "Puoi registrare le vaccinazioni nella sezione Cartella Clinica. Se hai il piano Standard o Premium, riceverai promemoria automatici per i richiami vaccinali.",
      en: "You can log vaccinations in the Medical Records section. If you have the Standard or Premium plan, you'll receive automatic reminders for vaccine boosters.",
    },
  ],
  documents: [
    {
      it: "Nella sezione Documenti puoi caricare e archiviare passaporto del pet, libretto vaccinale, certificato microchip e altri documenti. Tutti i file sono crittografati e accessibili solo a te.",
      en: "In the Documents section you can upload and archive your pet's passport, vaccination booklet, microchip certificate, and other documents. All files are encrypted and accessible only to you.",
    },
  ],
};

function getResponse(input: string, locale: string): string {
  const lower = input.toLowerCase();
  const lang = locale as "it" | "en";

  if (lower.match(/coper|cover|piano|plan|includ/))
    return faqResponses.coverage[0]![lang];
  if (lower.match(/sinistro|claim|rimborso|refund|richiest/)) {
    if (lower.match(/rimborso|refund|pagament|payment/))
      return faqResponses.refund[0]![lang];
    return faqResponses.claim[0]![lang];
  }
  if (lower.match(/cancell|disdett|cancel|annull/))
    return faqResponses.cancel[0]![lang];
  if (lower.match(/vaccin|richiamo|booster/))
    return faqResponses.vaccine[0]![lang];
  if (lower.match(/document|passport|passaporto|certificat/))
    return faqResponses.documents[0]![lang];

  return locale === "it"
    ? "Non ho capito la tua domanda. Prova a chiedere informazioni su: copertura polizza, come aprire un sinistro, rimborsi, cancellazione, vaccini o documenti. Per assistenza diretta scrivi a supporto@animal.ia"
    : "I didn't understand your question. Try asking about: policy coverage, how to file a claim, refunds, cancellation, vaccines, or documents. For direct support email support@animal.ia";
}

export function ChatBot() {
  const params = useParams();
  const locale = (params.locale as string) ?? "it";
  const isIt = locale === "it";

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: isIt
        ? "Ciao! 🦒 Sono l'assistente di animal.ia. Come posso aiutarti?"
        : "Hi! 🦒 I'm the animal.ia assistant. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { role: "user", text };
    const botMsg: Message = { role: "bot", text: getResponse(text, locale) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 md:bottom-8 md:right-8",
          "bg-giraffe text-warm"
        )}
        aria-label="Chat"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl">💬</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl md:bottom-28 md:right-8">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-border bg-warm px-4 py-3 text-cream">
            <span className="text-xl">🦒</span>
            <div>
              <p className="text-sm font-semibold">animal.ia</p>
              <p className="text-xs text-cream/70">
                {isIt ? "Assistente AI" : "AI Assistant"}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                  msg.role === "bot"
                    ? "bg-secondary text-foreground rounded-bl-sm"
                    : "ml-auto bg-giraffe text-warm rounded-br-sm"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isIt ? "Scrivi un messaggio..." : "Type a message..."}
                className="flex-1 text-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-giraffe text-warm hover:bg-giraffe-dark shrink-0"
              >
                ➤
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
