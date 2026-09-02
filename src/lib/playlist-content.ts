/**
 * Configuración de la playlist enlazada desde el menú principal, editable
 * desde /admin/playlist. Se guarda como JSON en site_content (key: "playlist").
 */

export type PlaylistProvider = "spotify" | "apple_music";

export interface PlaylistContent {
  provider: PlaylistProvider;
  url: string;
}

export const DEFAULT_PLAYLIST_CONTENT: PlaylistContent = {
  provider: "spotify",
  url: "",
};

export function parsePlaylistContent(raw: string | null): PlaylistContent {
  if (!raw) return DEFAULT_PLAYLIST_CONTENT;

  try {
    const parsed = JSON.parse(raw) as Partial<PlaylistContent>;
    return {
      provider: parsed.provider === "apple_music" ? "apple_music" : "spotify",
      url: parsed.url ?? DEFAULT_PLAYLIST_CONTENT.url,
    };
  } catch {
    return DEFAULT_PLAYLIST_CONTENT;
  }
}
