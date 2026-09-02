"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { PlaylistContent } from "@/lib/playlist-content";

interface PlaylistContextValue {
  content: PlaylistContent;
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const PlaylistContext = createContext<PlaylistContextValue | null>(null);

export function PlaylistProvider({
  content,
  children,
}: {
  content: PlaylistContent;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el reproductor al navegar a otra página, ajustando el estado
  // durante el render (en vez de en un efecto) para no dispararse él solo
  // al montar — el provider nunca se desmonta, así que esto solo ocurre en
  // una navegación real.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <PlaylistContext.Provider
      value={{
        content,
        open,
        toggle: () => setOpen((o) => !o),
        close: () => setOpen(false),
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const ctx = useContext(PlaylistContext);
  if (!ctx) {
    throw new Error("usePlaylist debe usarse dentro de PlaylistProvider");
  }
  return ctx;
}
