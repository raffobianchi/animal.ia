import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalLayout } from "~/components/LegalLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.privacy" });
  return { title: t("title"), description: t("description") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === "it";

  return (
    <LegalLayout
      title={isIt ? "Informativa sulla Privacy" : "Privacy Policy"}
      updatedLabel={isIt ? "Ultimo aggiornamento: 6 aprile 2026" : "Last updated: April 6, 2026"}
    >
      <h2>{isIt ? "1. Titolare del Trattamento" : "1. Data Controller"}</h2>
          <p>
            {isIt
              ? "Il titolare del trattamento dei dati personali è animal.ia S.r.l., con sede in Italia. Per qualsiasi richiesta relativa ai tuoi dati personali, puoi contattarci a: privacy@animal.ia"
              : "The data controller is animal.ia S.r.l., based in Italy. For any request regarding your personal data, you can contact us at: privacy@animal.ia"}
          </p>

          <h2>{isIt ? "2. Dati Raccolti" : "2. Data We Collect"}</h2>
          <p>
            {isIt ? "Raccogliamo i seguenti dati:" : "We collect the following data:"}
          </p>
          <ul>
            <li>{isIt ? "Dati identificativi: nome, cognome, email" : "Identity data: first name, last name, email"}</li>
            <li>{isIt ? "Dati del pet: nome, specie, razza, età, peso, stato di salute" : "Pet data: name, species, breed, age, weight, health status"}</li>
            <li>{isIt ? "Dati sanitari del pet: cartella clinica, vaccini, allergie" : "Pet health data: medical records, vaccines, allergies"}</li>
            <li>{isIt ? "Documenti caricati: passaporto del pet, certificati" : "Uploaded documents: pet passport, certificates"}</li>
            <li>{isIt ? "Dati assicurativi: polizze, sinistri, pagamenti" : "Insurance data: policies, claims, payments"}</li>
            <li>{isIt ? "Dati di navigazione: cookie, indirizzo IP, dispositivo" : "Browsing data: cookies, IP address, device information"}</li>
          </ul>

          <h2>{isIt ? "3. Finalità del Trattamento" : "3. Purpose of Processing"}</h2>
          <ul>
            <li>{isIt ? "Erogazione del servizio (gestione account, polizze, sinistri)" : "Service delivery (account management, policies, claims)"}</li>
            <li>{isIt ? "Comunicazioni relative al servizio" : "Service-related communications"}</li>
            <li>{isIt ? "Adempimenti di legge e obblighi contrattuali" : "Legal and contractual obligations"}</li>
            <li>{isIt ? "Miglioramento del servizio e analisi statistiche anonimizzate" : "Service improvement and anonymized statistical analysis"}</li>
          </ul>

          <h2>{isIt ? "4. Base Giuridica" : "4. Legal Basis"}</h2>
          <p>
            {isIt
              ? "Il trattamento dei tuoi dati si basa su: consenso esplicito, esecuzione del contratto, obblighi di legge e legittimo interesse del titolare."
              : "Your data processing is based on: explicit consent, contract execution, legal obligations, and legitimate interest of the controller."}
          </p>

          <h2>{isIt ? "5. Conservazione dei Dati" : "5. Data Retention"}</h2>
          <p>
            {isIt
              ? "I dati personali sono conservati per la durata del rapporto contrattuale e per i successivi 10 anni come previsto dalla normativa vigente. I dati di navigazione sono conservati per un massimo di 12 mesi."
              : "Personal data is retained for the duration of the contractual relationship and for 10 years thereafter as required by law. Browsing data is retained for a maximum of 12 months."}
          </p>

          <h2>{isIt ? "6. Condivisione dei Dati" : "6. Data Sharing"}</h2>
          <p>
            {isIt
              ? "I tuoi dati possono essere condivisi con: compagnie assicurative partner per l'emissione delle polizze, fornitori di servizi IT, autorità competenti quando richiesto dalla legge. Non vendiamo mai i tuoi dati a terzi."
              : "Your data may be shared with: partner insurance companies for policy issuance, IT service providers, competent authorities when required by law. We never sell your data to third parties."}
          </p>

          <h2>{isIt ? "7. I Tuoi Diritti" : "7. Your Rights"}</h2>
          <p>
            {isIt
              ? "Hai il diritto di: accedere ai tuoi dati, rettificarli, cancellarli, limitarne il trattamento, opporti al trattamento, richiedere la portabilità. Puoi esercitare i tuoi diritti contattandoci a privacy@animal.ia"
              : "You have the right to: access your data, rectify it, delete it, restrict processing, object to processing, request portability. You can exercise your rights by contacting us at privacy@animal.ia"}
          </p>

          <h2>{isIt ? "8. Contatti" : "8. Contact"}</h2>
          <p>
            {isIt
              ? "Per qualsiasi domanda sulla privacy, scrivi a privacy@animal.ia o al nostro DPO (Data Protection Officer) a dpo@animal.ia"
              : "For any privacy questions, write to privacy@animal.ia or our DPO (Data Protection Officer) at dpo@animal.ia"}
          </p>
    </LegalLayout>
  );
}
