import { AlbumForm } from "@/components/admin/album-form";
import { createAlbum } from "../actions";

export const metadata = {
  title: "Admin · Nuevo disco",
};

export default function NuevoDiscoPage() {
  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Nuevo disco</h1>
      <AlbumForm action={createAlbum} />
    </div>
  );
}
