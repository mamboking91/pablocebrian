const SPOTIFY_EMBED_TYPES = [
  "track",
  "album",
  "playlist",
  "artist",
  "episode",
  "show",
] as const;

export type SpotifyEmbed = { src: string; height: number };
export type AppleMusicEmbed = { src: string; height: number };
export type SpotifyUrlRef = { type: string; id: string };

export function parseSpotifyUrl(url: string | null): SpotifyUrlRef | null {
  if (!url) return null;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (!parsed.hostname.endsWith("open.spotify.com")) return null;

  const segments = parsed.pathname.split("/").filter(Boolean);
  const typeIndex = segments.findIndex((segment) =>
    (SPOTIFY_EMBED_TYPES as readonly string[]).includes(segment),
  );
  if (typeIndex === -1) return null;

  const type = segments[typeIndex];
  const id = segments[typeIndex + 1];
  if (!id) return null;

  return { type, id };
}

export function getSpotifyEmbed(url: string | null): SpotifyEmbed | null {
  const ref = parseSpotifyUrl(url);
  if (!ref) return null;

  return {
    src: `https://open.spotify.com/embed/${ref.type}/${ref.id}`,
    height: ref.type === "track" || ref.type === "episode" ? 152 : 352,
  };
}

export function getAppleMusicEmbed(url: string | null): AppleMusicEmbed | null {
  if (!url) return null;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (!parsed.hostname.endsWith("music.apple.com")) return null;

  parsed.hostname = "embed.music.apple.com";
  const isSingleSong = parsed.searchParams.has("i");

  return {
    src: parsed.toString(),
    height: isSingleSong ? 175 : 450,
  };
}
