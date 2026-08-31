import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Album } from "@/lib/types";
import { AdminAlbumsTable } from "@/components/admin/admin-albums-table";
import { ToastListener } from "@/components/admin/toast-listener";
import { deleteAlbum, reorderAlbums, setAlbumFlag } from "./actions";

export const metadata = {
  title: "Admin · Discos",
};

export const dynamic = "force-dynamic";

export default async function AdminDiscosPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  const albums = data as Album[];

  return (
    <div>
      <Suspense fallback={null}>
        <ToastListener />
      </Suspense>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl">Discos</h1>
          <p className="text-xs text-muted mt-1">
            {albums.length} disco{albums.length === 1 ? "" : "s"} ·{" "}
            {albums.filter((a) => a.published).length} publicado
            {albums.filter((a) => a.published).length === 1 ? "" : "s"} ·{" "}
            {albums.filter((a) => a.featured).length} en Selección
          </p>
        </div>
        <Link
          href="/admin/discos/nuevo"
          className="shrink-0 whitespace-nowrap rounded-full text-[10px] sm:text-xs uppercase tracking-wide bg-accent text-background px-3 sm:px-4 py-2 hover:bg-accent-soft transition-colors"
        >
          + Añadir disco
        </Link>
      </div>

      <AdminAlbumsTable
        albums={albums}
        deleteAlbum={deleteAlbum}
        reorderAlbums={reorderAlbums}
        setAlbumFlag={setAlbumFlag}
      />
    </div>
  );
}
