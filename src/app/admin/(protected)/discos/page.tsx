import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Album } from "@/lib/types";

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl">Discos</h1>
        <Link
          href="/admin/discos/nuevo"
          className="text-xs uppercase tracking-wide bg-accent text-background px-4 py-2 hover:bg-accent-soft transition-colors"
        >
          + Añadir disco
        </Link>
      </div>

      {albums.length === 0 ? (
        <p className="text-muted text-sm">Todavía no hay discos.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted border-b border-border">
              <th className="py-2 pr-4">Título</th>
              <th className="py-2 pr-4">Artista(s)</th>
              <th className="py-2 pr-4">Destacado</th>
              <th className="py-2 pr-4">Publicado</th>
              <th className="py-2 pr-4" />
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.id} className="border-b border-border/60">
                <td className="py-2 pr-4">{album.title}</td>
                <td className="py-2 pr-4 text-muted">
                  {album.artist_names.join(", ")}
                </td>
                <td className="py-2 pr-4">{album.featured ? "Sí" : "—"}</td>
                <td className="py-2 pr-4">{album.published ? "Sí" : "—"}</td>
                <td className="py-2 pr-4 text-right">
                  <Link
                    href={`/admin/discos/${album.id}`}
                    className="text-accent hover:text-accent-soft transition-colors"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
