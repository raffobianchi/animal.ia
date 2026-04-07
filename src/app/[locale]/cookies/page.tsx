import { LegalLayout } from "~/components/LegalLayout";

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === "it";

  return (
    <LegalLayout
      title="Cookie Policy"
      updatedLabel={isIt ? "Ultimo aggiornamento: 6 aprile 2026" : "Last updated: April 6, 2026"}
    >
      <h2>{isIt ? "1. Cosa Sono i Cookie" : "1. What Are Cookies"}</h2>
          <p>
            {isIt
              ? "I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti il nostro sito. Ci aiutano a far funzionare il sito correttamente e a migliorare la tua esperienza."
              : "Cookies are small text files that are stored on your device when you visit our website. They help us make the site work correctly and improve your experience."}
          </p>

          <h2>{isIt ? "2. Cookie Tecnici (Necessari)" : "2. Technical Cookies (Necessary)"}</h2>
          <p>
            {isIt
              ? "Questi cookie sono essenziali per il funzionamento del sito e non possono essere disabilitati. Includono:"
              : "These cookies are essential for the site to function and cannot be disabled. They include:"}
          </p>
          <ul>
            <li>{isIt ? "Cookie di sessione per mantenere il login" : "Session cookies to maintain login"}</li>
            <li>{isIt ? "Cookie di preferenza lingua (it/en)" : "Language preference cookie (it/en)"}</li>
            <li>{isIt ? "Cookie di sicurezza (CSRF)" : "Security cookies (CSRF)"}</li>
            <li>{isIt ? "Cookie di consenso cookie" : "Cookie consent cookie"}</li>
          </ul>

          <h2>{isIt ? "3. Cookie Analitici" : "3. Analytics Cookies"}</h2>
          <p>
            {isIt
              ? "Con il tuo consenso, utilizziamo cookie analitici per capire come i visitatori interagiscono con il sito. Questi dati sono anonimizzati e ci aiutano a migliorare il servizio."
              : "With your consent, we use analytics cookies to understand how visitors interact with the site. This data is anonymized and helps us improve the service."}
          </p>

          <h2>{isIt ? "4. Cookie di Terze Parti" : "4. Third-Party Cookies"}</h2>
          <p>
            {isIt
              ? "Alcuni servizi di terze parti possono impostare i propri cookie:"
              : "Some third-party services may set their own cookies:"}
          </p>
          <ul>
            <li>{isIt ? "Stripe — per l'elaborazione sicura dei pagamenti" : "Stripe — for secure payment processing"}</li>
            <li>{isIt ? "Supabase — per l'autenticazione e la gestione dei dati" : "Supabase — for authentication and data management"}</li>
          </ul>

          <h2>{isIt ? "5. Gestione dei Cookie" : "5. Managing Cookies"}</h2>
          <p>
            {isIt
              ? "Puoi gestire le tue preferenze sui cookie in qualsiasi momento tramite il banner dei cookie o le impostazioni del tuo browser. Tieni presente che disabilitare alcuni cookie potrebbe influire sulla funzionalità del sito."
              : "You can manage your cookie preferences at any time through the cookie banner or your browser settings. Please note that disabling some cookies may affect site functionality."}
          </p>

          <h2>{isIt ? "6. Durata dei Cookie" : "6. Cookie Duration"}</h2>
          <ul>
            <li>{isIt ? "Cookie di sessione: eliminati alla chiusura del browser" : "Session cookies: deleted when you close the browser"}</li>
            <li>{isIt ? "Cookie persistenti: da 30 giorni a 12 mesi" : "Persistent cookies: from 30 days to 12 months"}</li>
            <li>{isIt ? "Cookie di consenso: 12 mesi" : "Consent cookies: 12 months"}</li>
          </ul>

          <h2>{isIt ? "7. Contatti" : "7. Contact"}</h2>
          <p>
            {isIt
              ? "Per domande sui cookie: privacy@animal.ia"
              : "For questions about cookies: privacy@animal.ia"}
          </p>
    </LegalLayout>
  );
}
