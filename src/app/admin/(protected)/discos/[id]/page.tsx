import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Album } from "@/lib/types";
import { AlbumForm } from "@/components/admin/album-form";
import { BackLink } from "@/components/admin/back-link";
import { updateAlbum, deleteAlbum } from "../actions";

export const metadata = {
  title: "Admin · Editar disco",
};

export default async function EditarDiscoPage({
  params,
}: PageProps<"/admin/discos/[id]">) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  const album = data as Album;
  const updateAlbumWithId = updateAlbum.bind(null, id);
  const deleteAlbumWithId = deleteAlbum.bind(null, id);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <BackLink href="/admin/discos" />
        <h1 className="font-display text-2xl">Editar disco</h1>
      </div>
      <AlbumForm
        album={album}
        action={updateAlbumWithId}
        deleteAction={deleteAlbumWithId}
      />
    </div>
  );
}
