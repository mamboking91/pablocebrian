import { BioEditor } from "@/components/admin/bio-editor";
import { getSiteContent } from "@/lib/site-content";
import { saveBio } from "./actions";

export const metadata = {
  title: "Admin · Bio",
};

export const dynamic = "force-dynamic";

export default async function AdminBioPage() {
  const content = (await getSiteContent("bio")) ?? "";

  return (
    <div>
      <h1 className="font-display text-2xl mb-2">Sobre mí</h1>
      <p className="text-sm text-muted mb-6">
        Este texto es el que aparece en la página pública “Sobre mí”.
      </p>
      <BioEditor initialContent={content} action={saveBio} />
    </div>
  );
}
