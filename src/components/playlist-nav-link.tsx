"use client";

import { usePlaylist } from "@/components/playlist-context";

export function PlaylistNavLink({ className }: { className: string }) {
  const { content, open, toggle } = usePlaylist();

  if (!content.url) return null;

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
