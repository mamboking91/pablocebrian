"use client";

import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { PlaylistPanel } from "@/components/playlist-panel";
import { usePlaylist } from "@/components/playlist-context";

/**
 * Envuelve el contenido propio de una página (todo lo que va bajo el menú
 * compartido) para que, al abrir "Playlist", ese contenido se oculte y el
 * reproductor ocupe el espacio restante — en vez de convivir con él.
 */
export function PlaylistPageShell({ children }: { children: ReactNode }) {
  const { open, content } = usePlaylist();
  const showPlaylist = open && !!content.url;

  return (
    <div
      className={
        showPlaylist ? "flex-1 flex flex-col h-dvh min-h-0 overflow-hidden" : "contents"
      }
    >
      <Nav />
      <div className={showPlaylist ? "hidden" : "contents"}>{children}</div>
      {showPlaylist && <PlaylistPanel />}
    </div>
  );
}
