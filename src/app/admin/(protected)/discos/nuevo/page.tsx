import { AlbumForm } from "@/components/admin/album-form";
import { BackLink } from "@/components/admin/back-link";
import { createAlbum } from "../actions";

export const metadata = {
  title: "Admin · Nuevo disco",
};

export default function NuevoDiscoPage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <BackLink href="/admin/discos" />
        <h1 className="font-display text-2xl">Nuevo disco</h1>
      </div>
      <AlbumForm action={createAlbum} />
    </div>
  );
}
