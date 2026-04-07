import { LegalLayout } from "~/components/LegalLayout";

export default async function GdprPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === "it";

  return (
    <LegalLayout
      title={isIt ? "Informativa GDPR" : "GDPR Notice"}
      updatedLabel={isIt ? "Ultimo aggiornamento: 6 aprile 2026" : "Last updated: April 6, 2026"}
    >
      <h2>{isIt ? "1. Il Nostro Impegno" : "1. Our Commitment"}</h2>
          <p>
            {isIt
              ? "animal.ia si impegna a proteggere i tuoi dati personali in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679) e con il Codice Privacy italiano (D.Lgs. 196/2003, come modificato dal D.Lgs. 101/2018)."
              : "animal.ia is committed to protecting your personal data in compliance with the General Data Protection Regulation (GDPR - EU Regulation 2016/679) and the Italian Privacy Code (Legislative Decree 196/2003, as amended by Legislative Decree 101/2018)."}
          </p>

          <h2>{isIt ? "2. I Tuoi Diritti GDPR" : "2. Your GDPR Rights"}</h2>
          <p>
            {isIt ? "In qualità di utente hai i seguenti diritti:" : "As a user, you have the following rights:"}
          </p>
          <ul>
            <li>
              <strong>{isIt ? "Diritto di accesso (Art. 15)" : "Right of access (Art. 15)"}</strong> —{" "}
              {isIt
                ? "Puoi richiedere una copia di tutti i dati personali che abbiamo su di te."
                : "You can request a copy of all personal data we hold about you."}
            </li>
            <li>
              <strong>{isIt ? "Diritto di rettifica (Art. 16)" : "Right to rectification (Art. 16)"}</strong> —{" "}
              {isIt
                ? "Puoi correggere dati imprecisi o incompleti."
                : "You can correct inaccurate or incomplete data."}
            </li>
            <li>
              <strong>{isIt ? "Diritto alla cancellazione (Art. 17)" : "Right to erasure (Art. 17)"}</strong> —{" "}
              {isIt
                ? "Puoi richiedere la cancellazione dei tuoi dati personali (diritto all'oblio)."
                : "You can request the deletion of your personal data (right to be forgotten)."}
            </li>
            <li>
              <strong>{isIt ? "Diritto alla limitazione (Art. 18)" : "Right to restriction (Art. 18)"}</strong> —{" "}
              {isIt
                ? "Puoi richiedere la limitazione del trattamento dei tuoi dati."
                : "You can request the restriction of processing of your data."}
            </li>
            <li>
              <strong>{isIt ? "Diritto alla portabilità (Art. 20)" : "Right to portability (Art. 20)"}</strong> —{" "}
              {isIt
                ? "Puoi richiedere i tuoi dati in un formato strutturato e leggibile da macchina."
                : "You can request your data in a structured, machine-readable format."}
            </li>
            <li>
              <strong>{isIt ? "Diritto di opposizione (Art. 21)" : "Right to object (Art. 21)"}</strong> —{" "}
              {isIt
                ? "Puoi opporti al trattamento dei tuoi dati per motivi legittimi."
                : "You can object to the processing of your data on legitimate grounds."}
            </li>
          </ul>

          <h2>{isIt ? "3. Come Esercitare i Tuoi Diritti" : "3. How to Exercise Your Rights"}</h2>
          <p>
            {isIt
              ? "Puoi esercitare i tuoi diritti in uno dei seguenti modi:"
              : "You can exercise your rights in one of the following ways:"}
          </p>
          <ul>
            <li>{isIt ? "Inviando un'email a: dpo@animal.ia" : "Sending an email to: dpo@animal.ia"}</li>
            <li>{isIt ? "Dalla sezione 'I miei dati' nella tua dashboard" : "From the 'My Data' section in your dashboard"}</li>
            <li>{isIt ? "Tramite posta raccomandata all'indirizzo della società" : "Via registered mail to the company address"}</li>
          </ul>
          <p>
            {isIt
              ? "Risponderemo alla tua richiesta entro 30 giorni. Se la richiesta è complessa, potremmo estendere il termine di ulteriori 60 giorni, informandoti tempestivamente."
              : "We will respond to your request within 30 days. If the request is complex, we may extend the deadline by an additional 60 days, notifying you promptly."}
          </p>

          <h2>{isIt ? "4. Data Protection Officer" : "4. Data Protection Officer"}</h2>
          <p>
            {isIt
              ? "Abbiamo nominato un Responsabile della Protezione dei Dati (DPO) che puoi contattare per qualsiasi questione relativa al trattamento dei tuoi dati personali:"
              : "We have appointed a Data Protection Officer (DPO) who you can contact for any issue related to the processing of your personal data:"}
          </p>
          <p>
            Email: dpo@animal.ia
          </p>

          <h2>{isIt ? "5. Trasferimento dei Dati" : "5. Data Transfer"}</h2>
          <p>
            {isIt
              ? "I tuoi dati sono conservati su server nell'Unione Europea. Nel caso in cui sia necessario trasferire dati al di fuori dello Spazio Economico Europeo, garantiremo livelli di protezione adeguati tramite clausole contrattuali standard approvate dalla Commissione Europea."
              : "Your data is stored on servers in the European Union. In cases where data transfer outside the European Economic Area is necessary, we will ensure adequate protection levels through standard contractual clauses approved by the European Commission."}
          </p>

          <h2>{isIt ? "6. Violazione dei Dati" : "6. Data Breach"}</h2>
          <p>
            {isIt
              ? "In caso di violazione dei dati personali, notificheremo l'autorità di controllo competente (Garante Privacy) entro 72 ore. Se la violazione comporta un rischio elevato per i tuoi diritti, sarai informato tempestivamente."
              : "In the event of a personal data breach, we will notify the competent supervisory authority (Italian Data Protection Authority) within 72 hours. If the breach poses a high risk to your rights, you will be notified promptly."}
          </p>

          <h2>{isIt ? "7. Reclami" : "7. Complaints"}</h2>
          <p>
            {isIt
              ? "Se ritieni che il trattamento dei tuoi dati violi il GDPR, hai il diritto di presentare un reclamo presso il Garante per la Protezione dei Dati Personali (www.garanteprivacy.it)."
              : "If you believe that the processing of your data violates the GDPR, you have the right to file a complaint with the Italian Data Protection Authority (Garante per la Protezione dei Dati Personali — www.garanteprivacy.it)."}
          </p>
    </LegalLayout>
  );
}
