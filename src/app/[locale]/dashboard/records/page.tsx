import { getPrimaryPet, getMedicalRecords } from "~/lib/queries";
import { dashPage } from "~/lib/ui";
import { RecordsClient, type ClientRecord } from "~/components/dashboard/RecordsClient";

export default async function RecordsPage() {
  const pet = await getPrimaryPet();
  const rows = pet ? await getMedicalRecords(pet.id) : [];
  const records: ClientRecord[] = rows.map((r) => ({
    id: r.id,
    type: r.type,
    title: r.title,
    description: r.description,
    vetName: r.vetName,
    date: r.date.toISOString().slice(0, 10),
  }));

  return (
    <div className={dashPage}>
      <div className="mx-auto max-w-4xl">
        <RecordsClient records={records} />
      </div>
    </div>
  );
}
