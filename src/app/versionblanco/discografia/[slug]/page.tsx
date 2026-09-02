import { notFound } from "next/navigation";
import { PlaylistPageShell } from "@/components/playlist-page-shell";
import { Footer } from "@/components/footer";
import { AlbumCover } from "@/components/album-cover";
import { getAlbumBySlug } from "@/lib/albums";
import { getAppleMusicEmbed, getSpotifyEmbed } from "@/lib/embeds";

export default async function VersionBlancoAlbumPage({
  params,
}: PageProps<"/versionblanco/discografia/[slug]">) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) notFound();

  const spotifyEmbed = album.show_spotify
    ? getSpotifyEmbed(album.spotify_url)
    : null;
  const appleMusicEmbed = album.show_apple_music
    ? getAppleMusicEmbed(album.apple_music_url)
    : null;

  return (
    <PlaylistPageShell>
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 gap-10 items-start">
          <div className="max-w-sm mx-auto sm:mx-0 w-full">
            <AlbumCover album={album} priority />
          </div>
          <div>
            <h2 className="font-display text-3xl mb-2">
              {album.artist_names.join(", ")}
            </h2>
            <p className="text-muted mb-6">{album.title}</p>

            <dl className="space-y-2 text-sm mb-8">
              {album.role && (
                <div>
                  <dd>{album.role}</dd>
                </div>
              )}
              {album.release_year && (
                <div className="flex gap-2">
                  <dt className="text-muted w-28 shrink-0">Año</dt>
                  <dd>{album.release_year}</dd>
                </div>
              )}
              {album.label && (
                <div className="flex gap-2">
                  <dt className="text-muted w-28 shrink-0">Sello</dt>
                  <dd>{album.label}</dd>
                </div>
              )}
            </dl>

            {(spotifyEmbed || appleMusicEmbed) && (
              <div className="space-y-6 mb-8">
                {spotifyEmbed && (
                  <iframe
                    title={`Spotify — ${album.title}`}
                    src={spotifyEmbed.src}
                    width="100%"
                    height={spotifyEmbed.height}
                    style={{ borderRadius: 12 }}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                )}
                {appleMusicEmbed && (
                  <iframe
                    title={`Apple Music — ${album.title}`}
                    src={appleMusicEmbed.src}
                    width="100%"
                    height={appleMusicEmbed.height}
                    style={{ borderRadius: 12, overflow: "hidden" }}
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                    loading="lazy"
                  />
                )}
              </div>
            )}

            {album.youtube_url && (
              <a
                href={album.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs tracking-[0.2em] uppercase text-accent hover:text-accent-soft transition-colors border border-accent-soft/50 px-4 py-2"
              >
                YouTube
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </PlaylistPageShell>
  );
}
