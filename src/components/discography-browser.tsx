"use client";

import { useMemo, useState } from "react";
import { Album } from "@/lib/types";
import { AlbumGrid } from "./album-grid";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function DiscographyBrowser({ albums }: { albums: Album[] }) {
  const [filter, setFilter] = useState<"todos" | "seleccion">("todos");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return albums.filter((album) => {
      const matchesFilter = filter === "todos" || album.featured;
      const matchesQuery =
        !normalizedQuery ||
        normalize(album.title).includes(normalizedQuery) ||
        album.artist_names.some((artist) =>
          normalize(artist).includes(normalizedQuery),
        );
      return matchesFilter && matchesQuery;
    });
  }, [albums, filter, query]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="relative w-full sm:w-64">
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
            className="w-full bg-background-elevated border border-border rounded-full pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("todos")}
            className={`text-xs tracking-[0.22em] uppercase px-5 py-2.5 rounded-full border transition-colors ${
              filter === "todos"
                ? "bg-accent border-accent text-background"
                : "border-white/25 text-white/70 hover:border-accent hover:text-accent"
            }`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setFilter("seleccion")}
            className={`text-xs tracking-[0.22em] uppercase px-5 py-2.5 rounded-full border transition-colors ${
              filter === "seleccion"
                ? "bg-accent border-accent text-background"
                : "border-white/25 text-white/70 hover:border-accent hover:text-accent"
            }`}
          >
            Selección
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-muted py-16">
          No se han encontrado discos con ese título o artista.
        </p>
      ) : (
        <AlbumGrid albums={visible} />
      )}
    </div>
  );
}
