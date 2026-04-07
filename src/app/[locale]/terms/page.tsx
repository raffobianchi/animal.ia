import { LegalLayout } from "~/components/LegalLayout";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === "it";

  return (
    <LegalLayout
      title={isIt ? "Termini di Servizio" : "Terms of Service"}
      updatedLabel={isIt ? "Ultimo aggiornamento: 6 aprile 2026" : "Last updated: April 6, 2026"}
    >
      <h2>{isIt ? "1. Accettazione dei Termini" : "1. Acceptance of Terms"}</h2>
          <p>
            {isIt
              ? "Utilizzando il servizio animal.ia, accetti di essere vincolato dai presenti Termini di Servizio. Se non accetti questi termini, ti preghiamo di non utilizzare il servizio."
              : "By using the animal.ia service, you agree to be bound by these Terms of Service. If you do not accept these terms, please do not use the service."}
          </p>

          <h2>{isIt ? "2. Descrizione del Servizio" : "2. Service Description"}</h2>
          <p>
            {isIt
              ? "animal.ia è una piattaforma digitale che permette di: gestire polizze assicurative per animali domestici, conservare cartelle cliniche e documenti, aprire e monitorare sinistri, interagire con un assistente AI per domande frequenti."
              : "animal.ia is a digital platform that allows you to: manage pet insurance policies, store medical records and documents, file and track claims, interact with an AI assistant for frequently asked questions."}
          </p>

          <h2>{isIt ? "3. Registrazione e Account" : "3. Registration and Account"}</h2>
          <p>
            {isIt
              ? "Per utilizzare il servizio devi creare un account fornendo informazioni accurate e aggiornate. Sei responsabile della sicurezza delle tue credenziali di accesso e di tutte le attività che avvengono sotto il tuo account."
              : "To use the service you must create an account by providing accurate and up-to-date information. You are responsible for the security of your login credentials and all activities that occur under your account."}
          </p>

          <h2>{isIt ? "4. Polizze Assicurative" : "4. Insurance Policies"}</h2>
          <p>
            {isIt
              ? "Le polizze assicurative offerte tramite animal.ia sono fornite da compagnie assicurative partner. animal.ia agisce come intermediario digitale. I termini specifici della copertura sono definiti nel contratto di polizza."
              : "Insurance policies offered through animal.ia are provided by partner insurance companies. animal.ia acts as a digital intermediary. Specific coverage terms are defined in the policy contract."}
          </p>

          <h2>{isIt ? "5. Pagamenti e Rimborsi" : "5. Payments and Refunds"}</h2>
          <p>
            {isIt
              ? "I pagamenti vengono elaborati tramite fornitori di pagamento sicuri. I premi assicurativi sono stabiliti dalla compagnia assicurativa partner. Le politiche di rimborso seguono le condizioni della polizza sottoscritta."
              : "Payments are processed through secure payment providers. Insurance premiums are set by the partner insurance company. Refund policies follow the conditions of the subscribed policy."}
          </p>

          <h2>{isIt ? "6. Contenuti dell'Utente" : "6. User Content"}</h2>
          <p>
            {isIt
              ? "Sei responsabile dei documenti e delle informazioni che carichi sulla piattaforma. Garantisci che i contenuti caricati sono accurati e che hai il diritto di condividerli."
              : "You are responsible for the documents and information you upload to the platform. You guarantee that uploaded content is accurate and that you have the right to share it."}
          </p>

          <h2>{isIt ? "7. Limitazione di Responsabilità" : "7. Limitation of Liability"}</h2>
          <p>
            {isIt
              ? "animal.ia non è responsabile per: decisioni prese in base alle informazioni fornite dall'assistente AI, ritardi nell'elaborazione dei sinistri da parte delle compagnie assicurative, perdita di dati dovuta a cause di forza maggiore."
              : "animal.ia is not liable for: decisions made based on information provided by the AI assistant, delays in claim processing by insurance companies, data loss due to force majeure."}
          </p>

          <h2>{isIt ? "8. Recesso e Cancellazione" : "8. Withdrawal and Cancellation"}</h2>
          <p>
            {isIt
              ? "Puoi cancellare il tuo account in qualsiasi momento dalle impostazioni del profilo. La cancellazione dell'account non annulla automaticamente le polizze assicurative attive. Hai diritto di recesso entro 14 giorni dall'attivazione di un nuovo servizio."
              : "You can delete your account at any time from your profile settings. Account deletion does not automatically cancel active insurance policies. You have the right of withdrawal within 14 days of activating a new service."}
          </p>

          <h2>{isIt ? "9. Modifiche ai Termini" : "9. Changes to Terms"}</h2>
          <p>
            {isIt
              ? "Ci riserviamo il diritto di modificare questi termini. Le modifiche significative verranno comunicate via email almeno 30 giorni prima dell'entrata in vigore."
              : "We reserve the right to modify these terms. Significant changes will be communicated via email at least 30 days before they take effect."}
          </p>

          <h2>{isIt ? "10. Legge Applicabile" : "10. Governing Law"}</h2>
          <p>
            {isIt
              ? "I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il Foro di Milano."
              : "These terms are governed by Italian law. For any dispute, the Court of Milan has jurisdiction."}
          </p>

          <h2>{isIt ? "11. Contatti" : "11. Contact"}</h2>
          <p>
            {isIt
              ? "Per domande sui termini di servizio: legal@animal.ia"
              : "For questions about terms of service: legal@animal.ia"}
          </p>
    </LegalLayout>
  );
}
