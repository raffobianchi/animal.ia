import { getPrimaryPet, getDocuments } from "~/lib/queries";
import { dashContainer, dashPage } from "~/lib/ui";
import { DocumentsClient, type ClientDocument } from "~/components/dashboard/DocumentsClient";

export default async function DocumentsPage() {
  const pet = await getPrimaryPet();
  const rows = pet ? await getDocuments(pet.id) : [];
  const docs: ClientDocument[] = rows.map((d) => ({
    id: d.id,
    type: d.type,
    name: d.name,
    uploadDate: d.uploadDate.toISOString().slice(0, 10),
    fileUrl: d.fileUrl,
  }));

  return (
    <div className={dashPage}>
      <div className={dashContainer}>
        <DocumentsClient docs={docs} />
      </div>
    </div>
  );
}
