"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Album } from "@/lib/types";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function AdminAlbumsTable({
  albums,
  deleteAlbum,
}: {
  albums: Album[];
  deleteAlbum: (id: string) => Promise<void>;
}) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return albums;
    return albums.filter(
      (album) =>
        normalize(album.title).includes(q) ||
        album.artist_names.some((artist) => normalize(artist).includes(q)),
    );
  }, [albums, query]);

  return (
    <div>
      <div className="relative w-full sm:w-72 mb-6">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título o artista…"
          className="input pl-10 rounded-full"
        />
      </div>

      {visible.length === 0 ? (
        <p className="text-muted text-sm">
          {albums.length === 0
            ? "Todavía no hay discos."
            : "Ningún disco coincide con la búsqueda."}
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted border-b border-border">
              <th className="py-2 pr-4" />
              <th className="py-2 pr-4">Título</th>
              <th className="py-2 pr-4">Artista(s)</th>
              <th className="py-2 pr-4">Destacado</th>
              <th className="py-2 pr-4">Publicado</th>
              <th className="py-2 pr-4" />
            </tr>
          </thead>
          <tbody>
            {visible.map((album) => (
              <tr key={album.id} className="border-b border-border/60">
                <td className="py-2 pr-4">
                  <div className="relative w-11 h-11 bg-background-elevated border border-border overflow-hidden shrink-0">
                    {album.cover_url ? (
                      <Image
                        src={album.cover_url}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                </td>
                <td className="py-2 pr-4">{album.title}</td>
                <td className="py-2 pr-4 text-muted">
                  {album.artist_names.join(", ")}
                </td>
                <td className="py-2 pr-4">{album.featured ? "Sí" : "—"}</td>
                <td className="py-2 pr-4">{album.published ? "Sí" : "—"}</td>
                <td className="py-2 pr-4">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/discos/${album.id}`}
                      className="text-accent hover:text-accent-soft transition-colors"
                    >
                      Editar
                    </Link>
                    <form
                      action={async () => {
                        if (
                          !window.confirm(
                            `¿Eliminar "${album.title}"? Esta acción no se puede deshacer.`,
                          )
                        ) {
                          return;
                        }
                        await deleteAlbum(album.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
