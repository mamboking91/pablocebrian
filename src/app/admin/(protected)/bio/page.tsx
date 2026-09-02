import { BioContentEditor } from "@/components/admin/bio-content-editor";
import { getSiteContent } from "@/lib/site-content";
import { parseBioContent } from "@/lib/bio-content";
import { saveBioContent } from "./actions";

export const metadata = {
  title: "Admin · Bio",
};

export const dynamic = "force-dynamic";

export default async function AdminBioPage() {
  const raw = await getSiteContent("bio_structured");
  const content = parseBioContent(raw);

  return (
    <div>
      <h1 className="font-display text-2xl mb-2">Sobre mí</h1>
      <p className="text-sm text-muted mb-6">
        Este contenido es el que aparece en la página pública &ldquo;Sobre
        mí&rdquo;.
        Puedes añadir, editar, reordenar o eliminar cualquier sección, y
        cambiar la foto.
      </p>
      <BioContentEditor initialContent={content} action={saveBioContent} />
    </div>
  );
}
