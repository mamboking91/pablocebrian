"use client";

import { usePlaylist } from "@/components/playlist-context";
import { getActivePlaylistUrl } from "@/lib/playlist-content";

export function PlaylistNavLink({ className }: { className: string }) {
  const { content, open, toggle } = usePlaylist();

  if (!getActivePlaylistUrl(content)) return null;

  return (
    <li>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={`${className} ${open ? "text-accent" : ""}`}
      >
        Playlist
      </button>
    </li>
  );
}
