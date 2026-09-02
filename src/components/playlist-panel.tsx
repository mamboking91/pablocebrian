"use client";

import { usePlaylist } from "@/components/playlist-context";
import { getActivePlaylistUrl } from "@/lib/playlist-content";
import { getAppleMusicEmbed, getSpotifyEmbed } from "@/lib/embeds";

/** Ocupa el espacio restante bajo el menú, centrado dentro de él. */
export function PlaylistPanel() {
  const { content, open } = usePlaylist();
  const activeUrl = getActivePlaylistUrl(content);

  if (!open || !activeUrl) return null;

  const embed =
    content.provider === "apple_music"
      ? getAppleMusicEmbed(activeUrl)
      : getSpotifyEmbed(activeUrl);

  const title =
    content.provider === "apple_music" ? "Playlist — Apple Music" : "Playlist — Spotify";
  const allow =
    content.provider === "apple_music"
      ? "autoplay *; encrypted-media *; fullscreen *; clipboard-write"
      : "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";

  return (
    <div className="fade-in-up flex-1 min-h-0 w-full border-t border-border bg-background-elevated overflow-y-auto">
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 py-6 sm:px-8">
        <div className="text-center text-[10px] tracking-[0.34em] uppercase text-muted">
          Playlist
        </div>
        <div className="w-full">
          {embed ? (
            <iframe
              title={title}
              src={embed.src}
              width="100%"
              height={embed.height}
              style={{ borderRadius: 12 }}
              allow={allow}
              loading="lazy"
            />
          ) : (
            <p className="py-6 text-center text-xs text-muted">
              El enlace de la playlist no es válido.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
