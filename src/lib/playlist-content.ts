/**
 * Configuración de la playlist enlazada desde el menú principal, editable
 * desde /admin/playlist. Se pueden guardar enlaces de Spotify y de Apple
 * Music a la vez; `provider` marca cuál de los dos se muestra en la web.
 * Se guarda como JSON en site_content (key: "playlist").
 */

export type PlaylistProvider = "spotify" | "apple_music";

export interface PlaylistContent {
  /** Cuál de los dos enlaces está activo (se muestra/reproduce) en la web. */
  provider: PlaylistProvider;
  spotifyUrl: string;
  appleMusicUrl: string;
}

export const DEFAULT_PLAYLIST_CONTENT: PlaylistContent = {
  provider: "spotify",
  spotifyUrl: "",
  appleMusicUrl: "",
};

/** El enlace del proveedor actualmente seleccionado, o "" si no hay ninguno. */
export function getActivePlaylistUrl(content: PlaylistContent): string {
  return content.provider === "apple_music" ? content.appleMusicUrl : content.spotifyUrl;
}

export function parsePlaylistContent(raw: string | null): PlaylistContent {
  if (!raw) return DEFAULT_PLAYLIST_CONTENT;

  try {
    const parsed = JSON.parse(raw) as Partial<PlaylistContent> & { url?: string };
    return {
      provider: parsed.provider === "apple_music" ? "apple_music" : "spotify",
      // "url" es el campo único que usaba la versión anterior de este editor;
      // se conserva por compatibilidad con contenido ya guardado.
      spotifyUrl:
        parsed.spotifyUrl ??
        (parsed.provider !== "apple_music" ? parsed.url : undefined) ??
        DEFAULT_PLAYLIST_CONTENT.spotifyUrl,
      appleMusicUrl:
        parsed.appleMusicUrl ??
        (parsed.provider === "apple_music" ? parsed.url : undefined) ??
        DEFAULT_PLAYLIST_CONTENT.appleMusicUrl,
    };
  } catch {
    return DEFAULT_PLAYLIST_CONTENT;
  }
}
